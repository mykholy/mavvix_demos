import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import fitness from '../../../data/verticals/fitness.json';

const text=z.string().trim();
const intake=z.object({
 flowType:z.literal('fitness_trial_interest'),
 clientRequestId:z.string().uuid(),
 serviceSlug:text.min(3).max(100),
 level:z.enum(['beginner','returning','intermediate']),
 goal:z.enum(['general_fitness','strength_skill','mobility','group_motivation','exploring']),
 requestType:z.enum(['trial','class_interest','membership_interest','private_intro']),
 preferredDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal('')),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 daysPerWeek:z.number().int().min(1).max(5),
 region:z.enum(['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other']),
 guestName:text.min(2).max(110),
 guestPhone:text.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),honeypot:z.literal('').optional().default(''),
 utm:z.object({source:text.max(100).optional(),medium:text.max(100).optional(),campaign:text.max(100).optional()}).optional().default({}),
}).strict();
const fail=(code:string,status=400)=>NextResponse.json({success:false,code},{status});
export async function handleFitnessRequest(request:Request){
 const allowed=checkRateLimit('portfolio:fitness:'+getRequestIdentity(request),6,60000);
 if(!allowed.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(allowed.retryAfter)}});
 try {
  const raw=await request.text();
  if(raw.length>16000)return fail('PAYLOAD_TOO_LARGE',413);
  const parsed=intake.safeParse(JSON.parse(raw));
  if(!parsed.success)return fail('INVALID_FIELDS');
  const v=parsed.data;
  const course=fitness.services.find(s=>s.slug===v.serviceSlug);
  if(!course||!course.levels.includes(v.level))return fail('COURSE_LEVEL_MISMATCH');
  if(v.preferredDate){
   const date=new Date(v.preferredDate+'T12:00:00Z');
   if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==v.preferredDate)return fail('INVALID_DATE');
   const days=(date.getTime()-Date.now())/86400000;
   if(days<-.5||days>90)return fail('INVALID_DATE');
  }
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='fitness' AND slug=? AND active=1").get(v.serviceSlug))
   return fail('COURSE_UNAVAILABLE');
  const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('fitness',v.clientRequestId) as {ref_number:string}|undefined;
  if(old)return NextResponse.json({success:true,refNumber:old.ref_number,duplicate:true,status:'pending_operator_confirmation'});
  const ref='MVX-PUL-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={courseSlug:v.serviceSlug,courseName:course.title,level:v.level,goal:v.goal,requestType:v.requestType,
   preferredDate:v.preferredDate||null,preferredWindow:v.preferredWindow,daysPerWeek:v.daysPerWeek,region:v.region,
   disclosure:'Illustrative gym studio; no class roster, trainer, membership, health assessment or booking has been confirmed.'};
  const saved=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
   (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
   VALUES (?,?,?,?,?,?,?,?,?,?)`).run('fit_'+crypto.randomUUID(),ref,'fitness','fitness_trial_interest',
    v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(saved.changes===0){
   const row=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('fitness',v.clientRequestId) as {ref_number:string}|undefined;
   return row?NextResponse.json({success:true,refNumber:row.ref_number,duplicate:true,status:'pending_operator_confirmation'}):fail('NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'Illustrative request saved only; no coach availability, membership, class or fee confirmed.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return fail('INVALID_JSON');
  console.error('Fitness request failed',error instanceof Error?error.name:'Unknown');
  return fail('NOT_SAVED',500);
 }
}
