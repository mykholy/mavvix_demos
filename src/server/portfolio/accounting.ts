import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import catalog from '../../../data/verticals/accounting.json';

const clean=z.string().trim();
const schema=z.object({
 flowType:z.literal('accounting_scope_request'),
 clientRequestId:z.string().uuid(),
 serviceSlug:clean.min(3).max(100),
 country:z.enum(['egypt','saudi-arabia','other']),
 entityType:z.enum(['sole-proprietor','startup','sme','professional-services','other']),
 volumeBand:z.enum(['under-50','50-200','201-1000','over-1000']),
 cadence:z.enum(['one-time','monthly','quarterly']),
 existingSystem:z.enum(['spreadsheets','accounting-platform','erp','not-started']),
 guestName:clean.min(2).max(110),
 guestPhone:clean.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:clean.max(100).optional(),medium:clean.max(100).optional(),campaign:clean.max(100).optional()}).optional().default({}),
}).strict();
const failure=(code:string,status=400)=>NextResponse.json({success:false,code},{status});

/** No financial statements, bank balances, employee pay, tax numbers, tax returns or certified audit claims. */
export async function handleAccountingScope(req:Request){
 const limit=checkRateLimit('portfolio:accounting:'+getRequestIdentity(req),6,60_000);
 if(!limit.allowed)return NextResponse.json({code:'RATE_LIMIT',success:false},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 try{
  const raw=await req.text();if(raw.length>10000)return failure('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return failure('INVALID_FIELDS');
  const v=parsed.data;if(v.honeypot)return failure('INVALID_FIELDS');
  if(!catalog.services.some(x=>x.slug===v.serviceSlug))return failure('UNKNOWN_SERVICE');
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='accounting' AND slug=? AND active=1").get(v.serviceSlug))return failure('UNAVAILABLE_SERVICE');
  const prior=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('accounting',v.clientRequestId) as {ref_number:string}|undefined;
  if(prior)return NextResponse.json({success:true,refNumber:prior.ref_number,status:'pending_operator_confirmation',duplicate:true});
  const ref='MVX-LED-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={serviceSlug:v.serviceSlug,country:v.country,entityType:v.entityType,volumeBand:v.volumeBand,cadence:v.cadence,
   existingSystem:v.existingSystem,notice:'Illustrative Mavvix website request, not an accountant agreement, audit, tax return or a fee quotation'};
  const inserted=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
  (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
  VALUES (?,?,?,?,?,?,?,?,?,?)`).run('led_'+crypto.randomUUID(),ref,'accounting','accounting_scope_request',
   v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(inserted.changes===0){
   const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('accounting',v.clientRequestId) as {ref_number:string}|undefined;
   if(old)return NextResponse.json({success:true,duplicate:true,refNumber:old.ref_number,status:'pending_operator_confirmation'});
   return failure('SAVE_FAILED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',message:'Reference saved in an accounting website concept only. No real accountant engagement or price confirmed.'},{status:201});
 }catch(e){
  if(e instanceof SyntaxError)return failure('INVALID_JSON');
  console.error('LedgerPoint showcase intake failed',e instanceof Error?e.name:'unknown');
  return failure('SAVE_FAILED',500);
 }
}
