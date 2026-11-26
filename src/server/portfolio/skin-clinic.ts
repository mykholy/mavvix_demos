import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';

const schema=z.object({
 flowType:z.literal('clinic_contact_request'),
 clientRequestId:z.string().uuid(),
 guestName:z.string().trim().min(2).max(100),
 guestPhone:z.string().trim().regex(/^\+?[0-9\s()-]{8,24}$/),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default('')
}).strict();
const failure=(code:string,status=400)=>NextResponse.json({success:false,code},{status,headers:{'Cache-Control':'no-store'}});
export async function handleSkinClinicContact(req:Request){
 const rate=checkRateLimit('portfolio:skin-clinic:'+getRequestIdentity(req),8,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter),'Cache-Control':'no-store'}});
 try{
  const raw=await req.text();if(raw.length>4000)return failure('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return failure('INVALID_FIELDS');
  const v=parsed.data;
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='skin-clinic' AND slug='consultation' AND active=1").get())return failure('CONTACT_UNAVAILABLE',503);
  const find=()=>db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('skin-clinic',v.clientRequestId) as {ref_number:string}|undefined;
  const duplicate=(ref:string)=>NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',duplicate:true},{headers:{'Cache-Control':'no-store'}});
  const existing=find();if(existing)return duplicate(existing.ref_number);
  const ref='MVX-ELY-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={serviceSlug:'consultation',preferredWindow:v.preferredWindow,notice:'Administrative callback only. No diagnosis, medical consultation, appointment or clinical data.'};
  const result=db.prepare('INSERT OR IGNORE INTO portfolio_requests (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id) VALUES (?,?,?,?,?,?,?,?,?,?)').run('ely_'+crypto.randomUUID(),ref,'skin-clinic','clinic_contact_request',v.guestName,v.guestPhone,JSON.stringify(payload),'{}',new Date().toISOString(),v.clientRequestId);
  if(result.changes===0){const previous=find();return previous?duplicate(previous.ref_number):failure('SAVE_FAILED',500);}
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation'},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch(e){if(e instanceof SyntaxError)return failure('INVALID_JSON');console.error('Elyra contact intake failed',e instanceof Error?e.name:'unknown');return failure('SAVE_FAILED',500);}
}
