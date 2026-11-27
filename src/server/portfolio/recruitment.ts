import crypto from 'node:crypto';
import {z} from 'zod';
import {NextResponse} from 'next/server';
import {getDb} from '@/lib/db';
import {checkRateLimit,getRequestIdentity} from '@/lib/security/rate-limit';
import catalog from '../../../data/verticals/recruitment.json';
const common={clientRequestId:z.string().uuid(),guestName:z.string().trim().min(2).max(100),guestPhone:z.string().trim().regex(/^\+?[0-9\s()-]{8,24}$/),country:z.enum(['egypt','saudi-arabia','uae','other']),sector:z.enum(['technology','finance','operations','commercial','people','other']),consent:z.literal(true),honeypot:z.literal('').optional().default('')};
const employer=z.object({...common,flowType:z.literal('employer_hiring_brief'),serviceSlug:z.string().min(3).max(80),organization:z.string().trim().min(2).max(100),headcount:z.enum(['1','2-5','6-20','21-plus','unknown']),engagement:z.enum(['permanent','contract','advisory','unknown']),timeline:z.enum(['within-month','1-3-months','later','unknown'])}).strict();
const candidate=z.object({...common,flowType:z.literal('candidate_career_interest'),roleSlug:z.string().min(3).max(80),workPreference:z.enum(['onsite','hybrid','remote','flexible']),experienceBand:z.enum(['entry','mid','senior','flexible'])}).strict();
const schema=z.discriminatedUnion('flowType',[employer,candidate]);
const failure=(code:string,status=400)=>NextResponse.json({success:false,code},{status,headers:{'Cache-Control':'no-store'}});
export async function handleRecruitmentInterest(req:Request){
 const rate=checkRateLimit('portfolio:recruitment:'+getRequestIdentity(req),12,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter),'Cache-Control':'no-store'}});
 try{
 const raw=await req.text();if(raw.length>6000)return failure('TOO_LARGE',413);
 const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return failure('INVALID_FIELDS');const v=parsed.data;
 if(v.flowType==='employer_hiring_brief'){const service=catalog.services.find(s=>s.slug===v.serviceSlug&&s.category!=='candidate');if(!service)return failure('UNKNOWN_EMPLOYER_SERVICE');}
 else{const role=catalog.roles.find(r=>r.slug===v.roleSlug);if(!role)return failure('UNKNOWN_ROLE_PROFILE');if(v.sector!==role.sector)return failure('SECTOR_MISMATCH');}
 const serviceSlug=v.flowType==='employer_hiring_brief'?v.serviceSlug:'career-guidance';
 const db=getDb();if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='recruitment' AND slug=? AND active=1").get(serviceSlug))return failure('SERVICE_UNAVAILABLE',503);
 const find=()=>db.prepare('SELECT ref_number,flow_type FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('recruitment',v.clientRequestId) as {ref_number:string;flow_type:string}|undefined;
 const response=(refNumber:string,duplicate=false)=>NextResponse.json({success:true,refNumber,status:'pending_operator_confirmation',...(duplicate?{duplicate:true}:{})},{status:duplicate?200:201,headers:{'Cache-Control':'no-store'}});
 const prior=find();if(prior)return prior.flow_type===v.flowType?response(prior.ref_number,true):failure('REQUEST_TYPE_CONFLICT',409);
 const ref='MVX-TLX-'+crypto.randomBytes(5).toString('hex').toUpperCase();
 const payload=v.flowType==='employer_hiring_brief'?{serviceSlug,organization:v.organization,sector:v.sector,country:v.country,headcount:v.headcount,engagement:v.engagement,timeline:v.timeline,notice:'Employer scope enquiry only; no candidate search or placement confirmed.'}:{serviceSlug,roleSlug:v.roleSlug,sector:v.sector,country:v.country,workPreference:v.workPreference,experienceBand:v.experienceBand,notice:'Illustrative role interest only; no vacancy, application, interview, scoring or placement.'};
 const saved=db.prepare('INSERT OR IGNORE INTO portfolio_requests (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id) VALUES (?,?,?,?,?,?,?,?,?,?)').run('tlx_'+crypto.randomUUID(),ref,'recruitment',v.flowType,v.guestName,v.guestPhone,JSON.stringify(payload),'{}',new Date().toISOString(),v.clientRequestId);
 if(saved.changes===0){const p=find();return p?(p.flow_type===v.flowType?response(p.ref_number,true):failure('REQUEST_TYPE_CONFLICT',409)):failure('SAVE_FAILED',500);}return response(ref);
 }catch(e){if(e instanceof SyntaxError)return failure('INVALID_JSON');console.error('Talentyx intake failed',e instanceof Error?e.name:'unknown');return failure('SAVE_FAILED',500);}
}
