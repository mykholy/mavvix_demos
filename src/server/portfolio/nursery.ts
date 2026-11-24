import crypto from 'node:crypto';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getDb} from '@/lib/db';
import {checkRateLimit,getRequestIdentity} from '@/lib/security/rate-limit';
import bloom from '../../../data/verticals/nursery.json';
const text=z.string().trim();
const schema=z.object({
 flowType:z.literal('nursery_visit_interest'),clientRequestId:z.string().uuid(),
 ageBand:z.enum(['1-2','2-3','3-5']),serviceSlug:text.min(3).max(80),
 requestType:z.enum(['visit','admission','information']),region:z.enum(['Cairo','Giza','Alexandria','Delta','Riyadh','Jeddah','Other']),
 preferredDate:z.union([z.literal(''),z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).optional().default(''),
 preferredWindow:z.enum(['flexible','morning','afternoon']),guestName:text.min(2).max(100),
 guestPhone:text.regex(/^\+?[0-9\s()-]{8,24}$/),consent:z.literal(true),honeypot:z.literal('').optional().default(''),
 utm:z.object({source:text.max(100).optional(),medium:text.max(100).optional(),campaign:text.max(100).optional()}).optional().default({})
}).strict();
const bad=(code:string,status=400)=>NextResponse.json({success:false,code},{status});
export async function handleNurseryVisit(req:Request){
 const limit=checkRateLimit('portfolio:nursery:'+getRequestIdentity(req),6,60_000);
 if(!limit.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 try{
 const raw=await req.text();if(raw.length>9000)return bad('PAYLOAD_TOO_LARGE',413);
 const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return bad('INVALID_FIELDS');
 const v=parsed.data;const service=bloom.services.find(p=>p.slug===v.serviceSlug);
 if(!service||(service.ageBand!=='all'&&service.ageBand!==v.ageBand))return bad('AGE_PROGRAM_MISMATCH');
 if(v.preferredDate){const date=new Date(v.preferredDate+'T12:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==v.preferredDate)return bad('INVALID_DATE');const days=(date.getTime()-Date.now())/86400000;if(days<-.5||days>90)return bad('INVALID_DATE');}
 const db=getDb();if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='nursery' AND slug=? AND active=1").get(v.serviceSlug))return bad('PROGRAMME_UNAVAILABLE');
 const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('nursery',v.clientRequestId) as {ref_number:string}|undefined;
 if(old)return NextResponse.json({success:true,duplicate:true,refNumber:old.ref_number,status:'pending_operator_confirmation'});
 const ref='MVX-BLM-'+crypto.randomBytes(5).toString('hex').toUpperCase();
 // Strict allowlist: only age band and adult guardian contact; no child name/DOB/health/documents.
 const payload={ageBand:v.ageBand,serviceSlug:v.serviceSlug,requestType:v.requestType,region:v.region,preferredDate:v.preferredDate||null,preferredWindow:v.preferredWindow,notice:'Illustrative guardian enquiry only; no real nursery capacity, admission or visit is confirmed.'};
 const inserted=db.prepare(`INSERT OR IGNORE INTO portfolio_requests(id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id) VALUES(?,?,?,?,?,?,?,?,?,?)`).run('blm_'+crypto.randomUUID(),ref,'nursery','nursery_visit_interest',v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
 if(inserted.changes===0){const previous=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('nursery',v.clientRequestId) as {ref_number:string}|undefined;return previous?NextResponse.json({success:true,duplicate:true,refNumber:previous.ref_number,status:'pending_operator_confirmation'}):bad('NOT_SAVED',500);}
 return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',message:'Guardian enquiry saved; no place or actual visit is confirmed.'},{status:201});
 }catch(e){if(e instanceof SyntaxError)return bad('BAD_JSON');console.error('BloomSteps enquiry failed',e instanceof Error?e.name:'Unknown');return bad('NOT_SAVED',500);}
}
