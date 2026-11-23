import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import content from '../../../../data/verticals/home-maintenance.json';

const bounded=z.string().trim();
const schema=z.object({
 flowType:z.literal('home_maintenance_request'),
 clientRequestId:z.string().uuid(),
 serviceSlug:bounded.min(3).max(80),
 issue:z.enum(['not_working','leak','noise','poor_performance','installation','routine','other']),
 urgency:z.enum(['routine','priority','urgent']),
 region:z.enum(['Cairo','Giza','Alexandria','Other Egypt']),
 visitType:z.enum(['inspection','one_time','recurring']),
 preferredDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 propertyType:z.enum(['apartment','villa','office','shop','other']),
 guestName:bounded.min(2).max(110),
 guestPhone:bounded.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),honeypot:z.literal('').optional().default(''),
 utm:z.object({source:bounded.max(100).optional(),medium:bounded.max(100).optional(),campaign:bounded.max(100).optional()}).optional().default({}),
}).strict();

function reject(code:string,status=400){return NextResponse.json({success:false,code,message:code},{status});}
export async function handleHomeMaintenance(req:Request){
 const limit=checkRateLimit('portfolio:home-maintenance:'+getRequestIdentity(req),6,60_000);
 if(!limit.allowed)return NextResponse.json({code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 try{
  const raw=await req.text();if(raw.length>16000)return reject('TOO_LARGE',413);
  const validation=schema.safeParse(JSON.parse(raw));
  if(!validation.success)return reject('INVALID_FIELDS');
  const v=validation.data;
  if(!content.services.some(s=>s.slug===v.serviceSlug))return reject('INVALID_SERVICE');
  if(v.preferredDate){
   const d=new Date(v.preferredDate+'T12:00:00Z');
   if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==v.preferredDate)return reject('INVALID_DATE');
   const days=(d.getTime()-Date.now())/86400000;if(days<-.5||days>90)return reject('INVALID_DATE');
  }
  const db=getDb();
  const item=db.prepare('SELECT id FROM portfolio_services WHERE vertical_slug=? AND slug=? AND active=1').get('home-maintenance',v.serviceSlug);
  if(!item)return reject('UNAVAILABLE_SERVICE');
  const previous=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('home-maintenance',v.clientRequestId) as {ref_number:string}|undefined;
  if(previous)return NextResponse.json({success:true,refNumber:previous.ref_number,status:'pending_operator_confirmation',duplicate:true});
  const ref='MVX-HM-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={serviceSlug:v.serviceSlug,issue:v.issue,urgency:v.urgency,region:v.region,
   visitType:v.visitType,preferredDate:v.preferredDate||null,preferredWindow:v.preferredWindow,propertyType:v.propertyType,
   notice:'Portfolio request only; no technician dispatch, visit, cost, or emergency support confirmed'};
  const inserted=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
  (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
  VALUES (?,?,?,?,?,?,?,?,?,?)`).run('pmr_'+crypto.randomUUID(),ref,'home-maintenance','home_maintenance_request',
    v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(inserted.changes===0){
   const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('home-maintenance',v.clientRequestId) as {ref_number:string}|undefined;
   return old?NextResponse.json({success:true,refNumber:old.ref_number,status:'pending_operator_confirmation',duplicate:true}):reject('REQUEST_NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'Request saved in this portfolio experience; no technician appointment or emergency service is confirmed.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return reject('BAD_JSON');
  console.error('Home maintenance request failed',error instanceof Error?error.name:'Unknown');
  return reject('REQUEST_NOT_SAVED',500);
 }
}
