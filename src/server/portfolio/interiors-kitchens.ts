import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import forma from '../../../data/verticals/interiors-kitchens.json';

const t=z.string().trim();
const cm=z.coerce.number().int().min(120).max(1200);
const schema=z.object({
 flowType:z.literal('interior_design_brief'),
 clientRequestId:z.string().uuid(),
 serviceSlug:t.min(3).max(90),
 layout:z.enum(['L','U','galley','single-wall','island']),
 wallLengthsCm:z.array(cm).min(1).max(3),
 floorAreaSqm:z.coerce.number().min(3).max(500),
 finish:z.enum(['matte','wood-look','lacquer','mixed']),
 countertop:z.enum(['quartz','solid-surface','laminate','undecided']),
 budgetBand:z.enum(['researching','under-100k-egp','100k-250k-egp','250k-plus-egp','quotation-needed']),
 timeline:z.enum(['exploring','1-3-months','3-6-months','6-months-plus']),
 area:z.enum(['Cairo','Giza','Alexandria','Delta','Other Egypt','Riyadh','Jeddah','Other GCC']),
 guestName:t.min(2).max(110),
 guestPhone:t.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:t.max(100).optional(),medium:t.max(100).optional(),campaign:t.max(100).optional()}).optional().default({}),
}).strict();
function reject(code:string,status=400){return NextResponse.json({success:false,code},{status});}
const requiredWalls:Record<string,number>={'L':2,'U':3,'galley':2,'single-wall':1,'island':2};
export async function handleFormaBrief(request:Request){
 const limit=checkRateLimit('portfolio:interiors-kitchens:'+getRequestIdentity(request),5,60_000);
 if(!limit.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 try{
  const raw=await request.text();
  if(raw.length>13000)return reject('PAYLOAD_TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));
  if(!parsed.success)return reject('INVALID_REQUEST');
  const v=parsed.data;
  if(v.honeypot)return reject('INVALID_REQUEST');
  const service=forma.services.find(x=>x.slug===v.serviceSlug);
  if(!service)return reject('UNKNOWN_DESIGN_SCOPE');
  if(v.wallLengthsCm.length!==requiredWalls[v.layout])return reject('INVALID_WALL_COUNT');
  // The input is an illustrative room brief, NOT the measured site survey required for fabrication.
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='interiors-kitchens' AND slug=? AND active=1").get(v.serviceSlug))
   return reject('SCOPE_NOT_PUBLISHED',422);
  const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?')
   .get('interiors-kitchens',v.clientRequestId) as {ref_number:string}|undefined;
  if(old)return NextResponse.json({success:true,duplicate:true,refNumber:old.ref_number,status:'pending_operator_confirmation'});
  const ref='MVX-FRM-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={
   serviceSlug:v.serviceSlug,serviceName:service.title,layout:v.layout,
   preliminaryWallLengthsMm:v.wallLengthsCm.map(cm=>cm*10),
   preliminaryFloorAreaSqm:v.floorAreaSqm,finish:v.finish,countertop:v.countertop,
   budgetBand:v.budgetBand,timeline:v.timeline,area:v.area,
   disclaimer:'Initial concept preference only. No field measurement, 3D design, final quote, material order or installation is confirmed.'
  };
  const insert=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
   (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
   VALUES (?,?,?,?,?,?,?,?,?,?)`).run('frm_'+crypto.randomUUID(),ref,'interiors-kitchens','interior_design_brief',
   v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(insert.changes===0){
   const existing=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?')
    .get('interiors-kitchens',v.clientRequestId) as {ref_number:string}|undefined;
   return existing?NextResponse.json({success:true,duplicate:true,refNumber:existing.ref_number,status:'pending_operator_confirmation'}):reject('REQUEST_NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'Illustrative design brief saved. No survey, final price, design approval or appointment has been confirmed.'},{status:201});
 }catch(e){
  if(e instanceof SyntaxError)return reject('INVALID_JSON');
  console.error('Forma planning request failed',e instanceof Error?e.name:'Unknown');
  return reject('REQUEST_NOT_SAVED',500);
 }
}
