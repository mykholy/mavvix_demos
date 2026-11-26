import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import catalog from '../../../data/verticals/logistics.json';

const text = z.string().trim();
const campaign = text.max(100).optional();
const requestSchema = z.object({
  flowType: z.literal('freight_quote_request'),
  clientRequestId: z.string().uuid(),
  serviceSlug: text.min(3).max(100),
  origin: z.enum(['egypt','saudi-arabia','uae','other']),
  destination: z.enum(['egypt','saudi-arabia','uae','other']),
  mode: z.enum(['ocean','air','road','support']),
  cargoType: z.enum(['general','packaged','palletized']),
  weightBand: z.enum(['under-100','100-499','500-1999','2000-plus','unknown']),
  scope: z.enum(['door-to-door','terminal-to-terminal','door-to-terminal','terminal-to-door','undecided']),
  preferredDate: text.regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
  guestName: text.min(2).max(110),
  guestPhone: text.regex(/^\+?[0-9\s()-]{8,24}$/),
  consent: z.literal(true),
  honeypot: z.literal('').optional().default(''),
  utm: z.object({source: campaign, medium: campaign, campaign}).strict().optional().default({}),
}).strict();
const failure = (code: string, status = 400) => NextResponse.json({success:false, code}, {status});
export async function handleFreightQuote(req: Request) {
  const rate = checkRateLimit('portfolio:logistics:' + getRequestIdentity(req), 8, 60_000);
  if (!rate.allowed) return NextResponse.json({success:false,code:'RATE_LIMIT'}, {status:429,headers:{'Retry-After':String(rate.retryAfter)}});
  try {
    const raw = await req.text();
    if (raw.length > 10000) return failure('TOO_LARGE',413);
    const parsed = requestSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return failure('INVALID_FIELDS');
    const v = parsed.data;
    const service = catalog.services.find(s => s.slug === v.serviceSlug);
    if (!service) return failure('UNKNOWN_SERVICE');
    if (service.category !== v.mode) return failure('MODE_MISMATCH');
    if ((v.mode === 'air' || v.mode === 'ocean') && v.origin === v.destination && v.origin !== 'other') return failure('ROUTE_REVIEW_REQUIRED');
    if (v.preferredDate) {
      const date = new Date(v.preferredDate + 'T00:00:00Z');
      const today = new Date(); today.setUTCHours(0,0,0,0);
      if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== v.preferredDate || date < today || date.getTime() - today.getTime() > 366 * 86400000) return failure('INVALID_DATE');
    }
    const db = getDb();
    if (!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='logistics' AND slug=? AND active=1").get(v.serviceSlug)) return failure('UNAVAILABLE_SERVICE');
    const findExisting = () => db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('logistics', v.clientRequestId) as {ref_number:string}|undefined;
    const prior = findExisting();
    if (prior) return NextResponse.json({success:true,refNumber:prior.ref_number,status:'pending_operator_confirmation',duplicate:true});
    const ref = 'MVX-RTL-' + crypto.randomBytes(5).toString('hex').toUpperCase();
    const payload = {serviceSlug:v.serviceSlug,origin:v.origin,destination:v.destination,mode:v.mode,cargoType:v.cargoType,weightBand:v.weightBand,scope:v.scope,preferredDate:v.preferredDate||null,notice:'Freight quote enquiry only. No carrier booking, movement, live tracking, price or payment confirmed.'};
    const inserted = db.prepare(`INSERT OR IGNORE INTO portfolio_requests (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id) VALUES (?,?,?,?,?,?,?,?,?,?)`).run('rline_'+crypto.randomUUID(),ref,'logistics','freight_quote_request',v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
    if (inserted.changes===0) {
      const existing = findExisting();
      if (existing) return NextResponse.json({success:true,refNumber:existing.ref_number,status:'pending_operator_confirmation',duplicate:true});
      return failure('SAVE_FAILED',500);
    }
    return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation'}, {status:201});
  } catch (e) {
    if (e instanceof SyntaxError) return failure('INVALID_JSON');
    console.error('RouteLine intake failed', e instanceof Error ? e.name : 'unknown');
    return failure('SAVE_FAILED',500);
  }
}
