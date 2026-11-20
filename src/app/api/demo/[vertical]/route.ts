import { NextResponse } from 'next/server';
import { z } from 'zod';
import { queryOne } from '@/lib/db';
import { createSubmission, verifyEcommerceCoupon, verifyRestaurantSlotAvailable } from '@/lib/db/repositories';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
const flowBySector: Record<string, string> = {
  construction: 'construction_quote', industrial: 'industrial_rfq',
  'real-estate': 'real_estate_viewing', dental: 'dental_appointment',
  ecommerce: 'ecommerce_order', portfolio: 'portfolio_inquiry',
  restaurant: 'restaurant_order', academy: 'academy_interest',
};
const lineSchema = z.object({
  source_type: z.string().max(60).optional(),
  source_id: z.string().min(1).max(120),
  variant_id: z.string().max(120).nullish(),
  quantity: z.coerce.number().int().positive().max(10000),
  unit_price_cents: z.coerce.number().int().nonnegative().optional(),
  modifiers: z.array(z.object({ type: z.string().max(30).optional(), label: z.string().max(160).optional() }).passthrough()).max(20).optional(),
  snapshot: z.record(z.unknown()).optional(),
});
const bodySchema = z.object({
  flowType: z.string().min(1).max(80),
  payload: z.record(z.unknown()),
  lines: z.array(lineSchema).max(30).default([]),
});
const reject = (code: string, message: string, status = 422) => NextResponse.json({ error: message, code }, { status });
const cents = (x: number) => Number.isFinite(x) && Number.isSafeInteger(x) && x >= 0 && x <= 100000000000;

export async function POST(request: Request, { params }: { params: { vertical: string } }) {
  try {
    const rate = checkRateLimit('intake:' + getRequestIdentity(request), 12, 60_000);
    if (!rate.allowed) return NextResponse.json({ error: 'Please try again later' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
    const text = await request.text();
    if (text.length > 65536) return reject('TOO_LARGE', 'Request exceeds 64KB', 413);
    const parsed = bodySchema.safeParse(JSON.parse(text));
    if (!parsed.success) return reject('INVALID_REQUEST', 'Request fields or quantities are invalid', 400);

    const { vertical } = params;
    const { flowType } = parsed.data;
    const payload: any = parsed.data.payload;
    let lines: any[] = parsed.data.lines;
    if (flowBySector[vertical] !== flowType && !(vertical === 'restaurant' && flowType === 'restaurant_table')) {
      return reject('INVALID_FLOW', 'Unknown site or request type', 400);
    }

    // Prevent sensitive disclosures in the clinical enquiry, including common nested terms.
    if (vertical === 'dental') {
      const blocked = /symptom|diagnos|medication|prescription|medical.history|national.id|allerg|أعراض|تشخيص|علاج دوائي|تاريخ مرضي|رقم قومي/i;
      if (blocked.test(JSON.stringify(payload))) return reject('HEALTH_DATA', 'Please do not include medical details in this form.');
    }

    let order: Record<string, unknown> = { ...payload };

    if (flowType === 'ecommerce_order') {
      if (!lines.length) return reject('EMPTY_CART', 'Choose at least one product');
      let subtotal = 0;
      const trusted: any[] = [];
      for (const line of lines) {
        const row = queryOne<any>(
          "SELECT v.id, v.stock_qty, COALESCE(v.price_cents, i.base_price_cents) as price, i.id as item_id FROM catalog_variants v JOIN catalog_items i ON i.id = v.item_id JOIN demo_sites s ON s.id = i.site_id WHERE s.slug = 'ecommerce' AND i.status = 'published' AND v.active = 1 AND v.id = ? AND i.id = ?",
          [line.variant_id || '', line.source_id]
        );
        if (!row || row.stock_qty === null || row.stock_qty < line.quantity || !cents(row.price)) {
          return reject('ITEM_UNAVAILABLE', 'The selected variant or requested quantity is unavailable');
        }
        subtotal += row.price * line.quantity;
        trusted.push({ ...line, unit_price_cents: row.price, source_type: 'product_variant', source_id: row.item_id, variant_id: row.id });
      }
      if (!cents(subtotal)) return reject('INVALID_TOTAL', 'Invalid cart total');
      lines = trusted;
      const rates: Record<string, number> = { Cairo: 7000, Alexandria: 9500, 'Other Egypt': 12500 };
      if (!Object.prototype.hasOwnProperty.call(rates, payload.shippingZone)) return reject('ZONE_INVALID', 'Choose a delivery area');
      const shipping = rates[payload.shippingZone];
      let discount = 0;
      if (payload.couponCode) {
        if (typeof payload.couponCode !== 'string' || payload.couponCode.length > 32) return reject('COUPON_INVALID', 'Invalid coupon');
        const check = verifyEcommerceCoupon(payload.couponCode, subtotal);
        if (!check.valid) return reject('COUPON_INVALID', check.message);
        discount = check.discountCents;
      }
      order = { ...payload, serverRecalculated: true, subtotalCents: subtotal, shippingCents: shipping,
        discountCents: discount, totalCents: Math.max(0, subtotal + shipping - discount), paymentMethod: 'COD_PREVIEW_ONLY' };
    }

    if (flowType === 'industrial_rfq') {
      if (!lines.length) return reject('EMPTY_RFQ', 'Add at least one specification');
      for (const line of lines) {
        const row = queryOne<any>(
          "SELECT v.min_qty, v.pack_multiple, i.id FROM catalog_items i JOIN catalog_variants v ON v.item_id = i.id JOIN demo_sites s ON s.id = i.site_id WHERE s.slug = 'industrial' AND i.status = 'published' AND i.sku = ? AND v.active = 1 LIMIT 1",
          [line.source_id]
        );
        if (!row || line.quantity < row.min_qty || line.quantity % row.pack_multiple !== 0)
          return reject('MOQ_INVALID', 'Quantity does not satisfy the SKU minimum or packaging multiple');
        line.unit_price_cents = 0; // RFQ is not a payable purchase.
        line.variant_id = null;
      }
    }

    if (flowType === 'restaurant_order') {
      if (!lines.length) return reject('EMPTY_ORDER', 'Choose at least one dish');
      let subtotal = 0;
      for (const line of lines) {
        const dish = queryOne<any>(
          "SELECT id, price_cents FROM restaurant_dishes WHERE site_id = 'site-restaurant' AND id = ? AND available = 1",
          [line.source_id]
        );
        if (!dish) return reject('DISH_UNAVAILABLE', 'A selected dish is no longer available');
        let unitPrice = dish.price_cents;
        for (const mod of line.modifiers || []) {
          if (mod.type !== 'extra' && mod.type !== 'size') continue;
          if (!mod.label) return reject('INVALID_MODIFIER', 'Choose a valid option');
          const option = queryOne<any>(
            "SELECT price_delta_cents FROM dish_modifiers WHERE dish_id = ? AND available = 1 AND (label_ar = ? OR label_en = ?)",
            [dish.id, mod.label, mod.label]
          );
          if (!option && mod.type === 'extra') return reject('INVALID_MODIFIER', 'An addition is unavailable');
          if (option) unitPrice += option.price_delta_cents;
        }
        if (!cents(unitPrice)) return reject('INVALID_PRICE', 'Invalid dish price');
        line.unit_price_cents = unitPrice;
        subtotal += unitPrice * line.quantity;
      }
      if (!cents(subtotal)) return reject('INVALID_TOTAL', 'Invalid order total');
      order = { ...payload, subtotalCents: subtotal, packagingCents: 1500,
        totalCents: subtotal + 1500, kitchenSubmission: false, status: 'request_only' };
    }

    if (flowType === 'restaurant_table') {
      const guests = Number(payload.partySize);
      if (!Number.isInteger(guests) || guests < 1 || guests > 8) return reject('PARTY_SIZE', 'Choose 1–8 guests');
      if (typeof payload.slotId !== 'string' || typeof payload.branchId !== 'string' || typeof payload.date !== 'string')
        return reject('INVALID_SLOT', 'Choose a valid restaurant, date and time');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.date)) return reject('INVALID_DATE', 'Invalid reservation date');
      const slot = queryOne<any>("SELECT owner_id, status FROM demo_time_slots WHERE site_id = 'site-restaurant' AND id = ?", [payload.slotId]);
      if (!slot || slot.owner_id !== payload.branchId || !verifyRestaurantSlotAvailable(payload.slotId, payload.date))
        return reject('SLOT_UNAVAILABLE', 'The selected table time is not available');
      order = { ...payload, partySize: guests, status: 'requested', confirmationNote: 'Request only; no table is confirmed' };
      lines = [];
    }

    if (flowType === 'academy_interest') {
      if (typeof payload.guestName !== 'string' || !payload.guestName.trim() || (!payload.guestEmail && !payload.guestPhone))
        return reject('CONTACT_REQUIRED', 'Your name and contact information are required');
      if (payload.courseSlug) {
        const course = queryOne<any>("SELECT id FROM academy_courses WHERE site_id = 'site-academy' AND slug = ? AND status = 'published'", [payload.courseSlug]);
        if (!course) return reject('INVALID_COURSE', 'Choose an available course');
      } else if (!payload.track) return reject('INVALID_COURSE', 'Choose a course or track');
      order = { ...payload, status: 'interest_recorded' };
    }

    const result = createSubmission(vertical, flowType, order, lines);
    return NextResponse.json({ success: true, submissionId: result.id, refNumber: result.refNumber,
      receiptToken: result.accessToken, order, message: 'Request saved' });
  } catch (error) {
    console.error('Submission failed', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json({ error: 'Unable to record request' }, { status: 500 });
  }
}
