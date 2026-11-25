import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import catalog from '../../../data/verticals/car-detailing.json';

const trim=z.string().trim();
const serviceSlugs=catalog.services.map(s=>s.slug);
const addonSlugs=catalog.addons.map(a=>a.slug);
const sizeSlugs=catalog.vehicleSizes.map(s=>s.slug);
const schema=z.object({
 flowType:z.literal('car_detailing_quote_request'),
 clientRequestId:z.string().uuid(),
 vehicleSize:trim.refine(value=>sizeSlugs.includes(value),'Unknown vehicle size'),
 treatment:trim.refine(value=>serviceSlugs.includes(value),'Unknown treatment'),
 addons:z.array(trim.refine(value=>addonSlugs.includes(value),'Unknown add-on')).max(4).default([]),
 condition:z.enum(['routine','heavily-soiled','paint-marring','new-vehicle','unsure']),
 requestedDate:trim.regex(/^\d{4}-\d{2}-\d{2}$/),
 requestedWindow:z.enum(['morning','afternoon','evening','flexible']),
 city:z.enum(['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other']),
 guestName:trim.min(2).max(110),
 guestPhone:trim.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:trim.max(100).optional(),medium:trim.max(100).optional(),
   campaign:trim.max(100).optional()}).optional().default({}),
}).strict();

const deny=(code:string,status=400)=>NextResponse.json({success:false,code},{status});
export async function handleCarDetailingQuote(req:Request){
 const origin=req.headers.get('origin');
 if(origin&&origin!==new URL(req.url).origin)return deny('ORIGIN_DENIED',403);
 const identity='portfolio:car-detailing:'+getRequestIdentity(req);
 const limit=checkRateLimit(identity,5,60_000);
 if(!limit.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 try{
  if(!req.headers.get('content-type')?.includes('application/json'))return deny('JSON_ONLY',415);
  const raw=await req.text();if(raw.length>16000)return deny('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));
  if(!parsed.success)return deny('INVALID_FIELDS');
  const v=parsed.data;
  if(v.honeypot||new Set(v.addons).size!==v.addons.length)return deny('INVALID_FIELDS');
  const dt=new Date(v.requestedDate+'T12:00:00Z');
  if(!Number.isFinite(dt.getTime())||dt.toISOString().slice(0,10)!==v.requestedDate)return deny('INVALID_DATE');
  const days=(dt.getTime()-Date.now())/86400000;if(days<-.5||days>90)return deny('INVALID_DATE');
  if(v.treatment==='fleet-care'&&v.vehicleSize==='compact') {
   // Fleet operators can still use compact vehicles; this illustrates the absence
   // of arbitrary hidden vehicle-size restrictions in a commercial intake form.
  }
  const db=getDb();
  const service=db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='car-detailing' AND slug=? AND active=1").get(v.treatment);
  if(!service)return deny('SERVICE_UNAVAILABLE');
  const query="SELECT ref_number FROM portfolio_requests WHERE vertical_slug='car-detailing' AND client_request_id=?";
  const old=db.prepare(query).get(v.clientRequestId) as {ref_number:string}|undefined;
  if(old)return NextResponse.json({success:true,refNumber:old.ref_number,status:'pending_operator_confirmation',duplicate:true});
  const id='gbq_'+crypto.randomUUID();
  const reference='MVX-GB-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={
    vehicleSize:v.vehicleSize,treatment:v.treatment,addons:v.addons,condition:v.condition,
    requestedDate:v.requestedDate,requestedWindow:v.requestedWindow,city:v.city,
    scope:'Nonbinding car-care estimate enquiry; actual product, workshop, available time and final quote require a verified operator.',
    price:null,currency:null,operatorConfirmed:false,
  };
  const stored=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
    (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).run(
     id,reference,'car-detailing','car_detailing_quote_request',v.guestName,v.guestPhone,
     JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId
   );
  if(stored.changes===0){
    const existing=db.prepare(query).get(v.clientRequestId) as {ref_number:string}|undefined;
    if(existing)return NextResponse.json({success:true,refNumber:existing.ref_number,status:'pending_operator_confirmation',duplicate:true});
    return deny('UNABLE_TO_PERSIST',500);
  }
  return NextResponse.json({success:true,refNumber:reference,status:'pending_operator_confirmation',
    message:'Your sample request is stored. No service price, appointment, technician or vehicle treatment is confirmed.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return deny('INVALID_JSON');
  console.error('Car detailing portfolio request:',error instanceof Error?error.name:'Unknown');
  return deny('UNABLE_TO_PERSIST',500);
 }
}
