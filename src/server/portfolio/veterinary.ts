import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'node:crypto';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import content from '../../../data/verticals/veterinary.json';

export const runtime='nodejs';
const simple=z.string().trim();
const requestSchema=z.object({
 flowType:z.literal('veterinary_visit_interest'),
 clientRequestId:z.string().uuid(),
 species:z.enum(['dog','cat','rabbit','bird','other']),
 ageBand:z.enum(['young','adult','senior','unknown']),
 serviceSlug:simple.min(3).max(85),
 visitPreference:z.enum(['clinic','unsure']),
 preferredDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 region:z.enum(['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other']),
 guestName:simple.min(2).max(110),
 guestPhone:simple.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:simple.max(100).optional(),medium:simple.max(100).optional(),campaign:simple.max(100).optional()}).strict().optional().default({}),
}).strict();
const reject=(code:string,status=400)=>NextResponse.json({success:false,code},{status});

/** Showcase-only veterinary enquiry. No clinical history, diagnosis, photos, live vet appointments or payment. */
export async function handleVeterinaryVisit(request:Request){
 const rate=checkRateLimit('portfolio:veterinary:'+getRequestIdentity(request),6,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter)}});
 try{
  const raw=await request.text();
  if(raw.length>14000)return reject('TOO_LARGE',413);
  const parsed=requestSchema.safeParse(JSON.parse(raw));
  if(!parsed.success)return reject('INVALID_FIELDS');
  const data=parsed.data;
  const selected=content.services.find(x=>x.slug===data.serviceSlug);
  if(!selected||!selected.species.includes(data.species))return reject('SERVICE_SPECIES_MISMATCH');
  const dt=new Date(data.preferredDate+'T12:00:00Z');
  if(!Number.isFinite(dt.getTime())||dt.toISOString().slice(0,10)!==data.preferredDate)return reject('INVALID_DATE');
  const days=(dt.getTime()-Date.now())/86400000;
  if(days<-.5||days>90)return reject('INVALID_DATE');
  const db=getDb();
  if(!db.prepare('SELECT id FROM portfolio_services WHERE vertical_slug=? AND slug=? AND active=1').get('veterinary',data.serviceSlug))
   return reject('SERVICE_NOT_PUBLISHED',404);
  const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?')
    .get('veterinary',data.clientRequestId) as {ref_number:string}|undefined;
  if(old)return NextResponse.json({success:true,duplicate:true,refNumber:old.ref_number,status:'pending_operator_confirmation'});
  const ref='MVX-VET-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={species:data.species,ageBand:data.ageBand,serviceSlug:data.serviceSlug,
   visitPreference:data.visitPreference,preferredDate:data.preferredDate,preferredWindow:data.preferredWindow,region:data.region,
   disclosure:'Showcase preference only, no veterinarian, actual appointment, clinical service or emergency response.'};
  const result=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
    (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).run('pet_'+crypto.randomUUID(),ref,'veterinary','veterinary_visit_interest',
   data.guestName,data.guestPhone,JSON.stringify(payload),JSON.stringify(data.utm),new Date().toISOString(),data.clientRequestId);
  if(result.changes===0){
   const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?')
    .get('veterinary',data.clientRequestId) as {ref_number:string}|undefined;
   return old?NextResponse.json({success:true,duplicate:true,refNumber:old.ref_number,status:'pending_operator_confirmation'}):reject('REQUEST_NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'This is a saved portfolio enquiry only. A real operating veterinary clinic has not confirmed any appointment.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return reject('BAD_JSON');
  console.error('Veterinary request failed',error instanceof Error?error.name:'Unknown');
  return reject('REQUEST_NOT_SAVED',500);
 }
}
