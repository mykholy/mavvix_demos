import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import content from '../../../data/verticals/physiotherapy.json';

/** Never gather clinical data or imply an appointment/diagnosis. */
const cleaned=z.string().trim();
const visits=['first-assessment','follow-up-interest'] as const;
const goals=['daily-movement','sport-readiness','workplace-function','general-education'] as const;
const zones=['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other'] as const;
const schema=z.object({
 flowType:z.literal('physiotherapy_assessment_interest'),
 clientRequestId:z.string().uuid(),
 serviceSlug:cleaned.min(4).max(80),
 visitType:z.enum(visits),
 goalType:z.enum(goals),
 preferredDate:cleaned.regex(/^\d{4}-\d{2}-\d{2}$/),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 region:z.enum(zones),
 guestName:cleaned.min(2).max(110),
 guestPhone:cleaned.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:cleaned.max(100).optional(),medium:cleaned.max(100).optional(),campaign:cleaned.max(100).optional()}).optional().default({}),
}).strict();
function response(code:string,status=400){return NextResponse.json({success:false,code},{status});}
export async function handlePhysiotherapyInterest(req:Request){
 const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return response('ORIGIN_MISMATCH',403);
 const limited=checkRateLimit('portfolio:physiotherapy:'+getRequestIdentity(req),5,60000);
 if(!limited.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(limited.retryAfter)}});
 try{
  if(!req.headers.get('content-type')?.includes('application/json'))return response('JSON_ONLY',415);
  const raw=await req.text();if(raw.length>12000)return response('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));
  if(!parsed.success)return response('INVALID_FIELDS');
  const v=parsed.data;
  if(v.honeypot)return response('INVALID_FIELDS');
  if(!content.services.some(s=>s.slug===v.serviceSlug))return response('UNKNOWN_SERVICE');
  const d=new Date(v.preferredDate+'T12:00:00Z');
  if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==v.preferredDate)return response('INVALID_DATE');
  const days=(d.getTime()-Date.now())/86400000;
  if(days<-.5||days>90)return response('INVALID_DATE');
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='physiotherapy' AND slug=? AND active=1").get(v.serviceSlug))return response('SERVICE_NOT_AVAILABLE');
  const lookup="SELECT ref_number FROM portfolio_requests WHERE vertical_slug='physiotherapy' AND client_request_id=?";
  const prev=db.prepare(lookup).get(v.clientRequestId) as {ref_number:string}|undefined;
  if(prev)return NextResponse.json({success:true,refNumber:prev.ref_number,duplicate:true,status:'pending_operator_confirmation'});
  const ref='MVX-ML-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={serviceSlug:v.serviceSlug,visitType:v.visitType,goalType:v.goalType,preferredDate:v.preferredDate,
   preferredWindow:v.preferredWindow,region:v.region,
   clinicStatus:'Concept only. No patient records collected, clinician assigned, assessment, diagnosis or medical care confirmed.'};
  const insert=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
    (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).run(
      'ml_'+crypto.randomUUID(),ref,'physiotherapy','physiotherapy_assessment_interest',
      v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId
    );
  if(insert.changes===0){const old=db.prepare(lookup).get(v.clientRequestId) as {ref_number:string}|undefined;
   return old?NextResponse.json({success:true,refNumber:old.ref_number,status:'pending_operator_confirmation',duplicate:true}):response('NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'A design-showcase enquiry was stored. No clinic appointment or professional care is confirmed.'},{status:201});
 }catch(e){
  if(e instanceof SyntaxError)return response('INVALID_JSON');
  console.error('Physiotherapy showcase enquiry:',e instanceof Error?e.name:'Unknown');
  return response('NOT_SAVED',500);
 }
}
