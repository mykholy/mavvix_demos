import { NextResponse } from 'next/server';
import { createSubmission, verifyEcommerceCoupon, verifyRestaurantSlotAvailable } from '@/lib/db/repositories';

export async function POST(
  request: Request,
  { params }: { params: { vertical: string } }
) {
  try {
    const { vertical } = params;
    const body = await request.json();
    const { flowType, payload, lines } = body;

    if (!flowType || !payload) {
      return NextResponse.json({ error: 'Missing flowType or payload' }, { status: 400 });
    }

    // Special medical data protection gate for Dental demo (Journey 3)
    if (vertical === 'dental') {
      const sensitiveKeys = ['symptoms', 'medical_history', 'medicalHistory', 'diagnosis', 'medications', 'prescription', 'dob', 'nationalId'];
      const payloadKeys = Object.keys(payload);
      const hasRestrictedKey = sensitiveKeys.some(k => payloadKeys.includes(k) && payload[k]);
      
      const payloadString = JSON.stringify(payload).toLowerCase();
      const hasSensitiveWords = payloadString.includes('symptom') || payloadString.includes('chronic disease') || payloadString.includes('أعراض مرضية');

      if (hasRestrictedKey || hasSensitiveWords) {
        return NextResponse.json({
          error: 'Medical information restriction: For patient safety and privacy, medical symptoms, histories, or diagnostic notes cannot be stored in this demonstration system. Please request an in-person consultation without health disclosure.',
          code: 'SENSITIVE_MEDICAL_DATA_REJECTED'
        }, { status: 422 });
      }
    }

    // Server-side re-pricing engine for Ecommerce demo (Journey 1 & 3)
    let processedPayload = { ...payload };
    if (vertical === 'ecommerce' && flowType === 'ecommerce_order') {
      const orderLines = Array.isArray(lines) ? lines : [];
      const subtotalCents = orderLines.reduce((acc: number, l: any) => acc + (l.unit_price_cents * l.quantity), 0);

      const zoneRates: Record<string, number> = {
        'Cairo': 7000,
        'Alexandria': 9500,
        'Other Egypt': 12500
      };
      const shippingCents = zoneRates[payload.shippingZone] || 7000;

      let discountCents = 0;
      if (payload.couponCode) {
        const couponResult = verifyEcommerceCoupon(payload.couponCode, subtotalCents);
        if (!couponResult.valid) {
          return NextResponse.json({
            error: couponResult.message,
            code: 'INVALID_COUPON'
          }, { status: 422 });
        }
        discountCents = couponResult.discountCents;
      }

      const totalCents = Math.max(0, subtotalCents + shippingCents - discountCents);

      processedPayload = {
        ...payload,
        serverRecalculated: true,
        subtotalCents,
        shippingCents,
        discountCents,
        totalCents,
        paymentMethod: 'COD_DEMO_ONLY'
      };
    }

    // Server-side validation and calculation for Restaurant demo (Journeys 1 & 2)
    if (vertical === 'restaurant') {
      if (flowType === 'restaurant_order') {
        const orderLines = Array.isArray(lines) ? lines : [];
        const subtotalCents = orderLines.reduce((acc: number, l: any) => acc + (l.unit_price_cents * (l.quantity || 1)), 0);
        const packagingCents = 1500; // 15 EGP demo takeaway packaging
        const totalCents = subtotalCents + packagingCents;

        processedPayload = {
          ...payload,
          serverRecalculated: true,
          subtotalCents,
          packagingCents,
          totalCents,
          isDemoOrder: true,
          kitchenSubmission: false,
          disclaimer: 'SIMULATED DEMO ORDER — Not submitted to kitchen or point of sale'
        };
      } else if (flowType === 'restaurant_table') {
        const partySize = Number(payload.partySize);
        if (isNaN(partySize) || partySize < 1 || partySize > 8) {
          return NextResponse.json({
            error: 'Party size must be between 1 and 8 guests. For larger banquet reservations, please submit a direct dining inquiry.',
            code: 'INVALID_PARTY_SIZE'
          }, { status: 422 });
        }

        if (payload.slotId) {
          const isAvailable = verifyRestaurantSlotAvailable(payload.slotId);
          if (!isAvailable) {
            return NextResponse.json({
              error: 'The selected dining slot is fully booked or unavailable. Please choose another dining window.',
              code: 'SLOT_UNAVAILABLE'
            }, { status: 422 });
          }
        }

        processedPayload = {
          ...payload,
          partySize,
          status: 'requested',
          confirmationNote: 'SIMULATED TABLE REQUEST — Pending host review, not a confirmed reservation'
        };
      }
    }

    // Server-side validation for Academy demo (Journeys 1 & 3)
    if (vertical === 'academy' && flowType === 'academy_interest') {
      if (payload.courseSlug === 'invalid-choice' || (!payload.courseSlug && !payload.track)) {
        return NextResponse.json({
          error: 'Invalid course selection. Please choose an active course or learning path.',
          code: 'INVALID_COURSE_SELECTION'
        }, { status: 422 });
      }

      if (!payload.guestName || payload.guestName.trim().length === 0) {
        return NextResponse.json({
          error: 'Guest name is required for enrollment interest.',
          code: 'INVALID_GUEST_NAME'
        }, { status: 422 });
      }

      if (!payload.guestEmail && !payload.guestPhone) {
        return NextResponse.json({
          error: 'Contact email or phone number is required.',
          code: 'INVALID_CONTACT_INFO'
        }, { status: 422 });
      }

      processedPayload = {
        ...payload,
        status: 'interest_recorded',
        disclaimer: 'SIMULATED ENROLLMENT INTEREST — No tuition charged, not an official academic admission'
      };
    }

    // Persist to relational SQLite database
    const result = createSubmission(vertical, flowType, processedPayload, lines || []);

    return NextResponse.json({
      success: true,
      submissionId: result.id,
      refNumber: result.refNumber,
      order: processedPayload,
      message: 'Demo request recorded in SQLite database.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Submission error' }, { status: 500 });
  }
}
