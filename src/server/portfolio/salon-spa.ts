import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import salon from '../../../data/verticals/salon-spa.json';

/**
 * Velora only records a preference enquiry. It has NO operator calendar, team roster
 * or payment processor and cannot return a confirmed salon booking.
 */
const small=z.string().trim();
const schema=z.object({
 flowType:z.literal('salon_appointment_interest'),
 clientRequestId:z.string().uuid(),
 serviceSlug:small.min(3).max(100),
 durationMinutes:z.coerce.number().int().min(15).max(240),
 staffPreference:z.enum(['any','hair-stylist','nail-artist','wellness-specialist']),
 preferredDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 region:z.enum(['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other']),
 occasion:z.enum(['everyday','occasion','bridal','self-care','unsure']),
 guestName:small.min(2).max(110),
 guestPhone:small.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({
  source:small.max(100).optional(),medium:small.max(100).optional(),campaign:small.max(100).optional(),
 }).optional().default({}),
}).strict();
const invalid=(code:string,status=400)=>NextResponse.json({success:false,code,message:code},{status});
const categoryPreference:Record<string,string>={
 hair:'hair-stylist',nails:'nail-artist',rituals:'wellness-specialist',
 occasion:'hair-stylist',face:'wellness-specialist',
};
export async function handleSalonAppointment(req:Request){
 const limit=checkRateLimit('portfolio:salon-spa:'+getRequestIdentity(req),6,60_000);
 if(!limit.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 try{
  const raw=await req.text();
  if(raw.length>14000)return invalid('TOO_LARGE',413);
  const result=schema.safeParse(JSON.parse(raw));
  if(!result.success)return invalid('INVALID_FIELDS');
  const v=result.data;
  if(v.honeypot)return invalid('INVALID_FIELDS');
  const service=salon.services.find(s=>s.slug===v.serviceSlug);
  if(!service)return invalid('UNKNOWN_SERVICE');
  if(!service.durations.includes(v.durationMinutes))return invalid('DURATION_MISMATCH');
  if(v.staffPreference!=='any'&&v.staffPreference!==categoryPreference[service.category])
   return invalid('STAFF_SPECIALITY_MISMATCH');
  const date=new Date(v.preferredDate+'T12:00:00Z');
  if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==v.preferredDate)
   return invalid('INVALID_DATE');
  const days=(date.getTime()-Date.now())/86400000;
  if(days<-.5||days>90)return invalid('INVALID_DATE');
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='salon-spa' AND slug=? AND active=1").get(v.serviceSlug))
   return invalid('SERVICE_UNAVAILABLE');
  const earlier=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('salon-spa',v.clientRequestId) as {ref_number:string}|undefined;
  if(earlier)return NextResponse.json({success:true,duplicate:true,refNumber:earlier.ref_number,status:'pending_operator_confirmation'});
  const id='vlr_'+crypto.randomUUID();
  const ref='MVX-VLR-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={serviceSlug:v.serviceSlug,serviceName:service.title,durationMinutes:v.durationMinutes,
   staffPreference:v.staffPreference,preferredDate:v.preferredDate,preferredWindow:v.preferredWindow,
   region:v.region,occasion:v.occasion,notes:'Illustrative enquiry only; no actual salon team, price or calendar availability.'};
  const write=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
   (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
   VALUES (?,?,?,?,?,?,?,?,?,?)`).run(id,ref,'salon-spa','salon_appointment_interest',
   v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(write.changes===0){
   const previous=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('salon-spa',v.clientRequestId) as {ref_number:string}|undefined;
   return previous?NextResponse.json({success:true,duplicate:true,refNumber:previous.ref_number,status:'pending_operator_confirmation'}):invalid('PERSISTENCE_FAILURE',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'Your request was saved in a Mavvix website experience. There is no confirmed appointment.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return invalid('INVALID_JSON');
  console.error('Salon experience request failed:',error instanceof Error?error.name:'Unknown');
  return invalid('PERSISTENCE_FAILURE',500);
 }
}
