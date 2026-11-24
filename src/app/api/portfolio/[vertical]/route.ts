import { handleCarDetailingQuote } from '@/server/portfolio/car-detailing';
import {handleNurseryVisit} from '@/server/portfolio/nursery';
import { handleFormaBrief } from '@/server/portfolio/interiors-kitchens';
import { handleFurnitureQuote } from '@/server/portfolio/furniture';
import { handleArenaRequest } from '@/server/portfolio/sports-venues';
import { handleFitnessRequest } from '@/server/portfolio/fitness';
import { handleSalonAppointment } from '@/server/portfolio/salon-spa';
import { handleHomeMaintenance } from '@/server/portfolio/home-maintenance';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'node:crypto';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import autoData from '../../../../../data/verticals/auto-service.json';

export const runtime='nodejs';
const clean=z.string().trim();
const utmField=clean.max(100).optional().default('');
const schema=z.object({
 flowType:z.literal('auto_service_request'),
 clientRequestId:z.string().uuid(),
 guestName:clean.min(2).max(100),
 guestPhone:clean.regex(/^\+?[0-9\s()-]{8,24}$/),
 make:z.enum(['Toyota','Hyundai','Kia','Nissan','Chevrolet','MG']),
 model:clean.min(2).max(70),
 year:z.coerce.number().int().min(1980).max(2030),
 serviceSlug:clean.min(3).max(80),
 category:z.enum(['inspection','warning','maintenance','safety','comfort','other']),
 preferredDate:clean.regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 region:clean.min(2).max(90),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:utmField,medium:utmField,campaign:utmField,content:utmField,term:utmField}).optional().default({}),
}).strict();
function failure(code:string,status=422){return NextResponse.json({success:false,code,message:code},{status});}

export async function POST(req:Request,{params}:{params:{vertical:string}}){
 if(params.vertical==='car-detailing')return handleCarDetailingQuote(req);
 if(params.vertical==='nursery')return handleNurseryVisit(req);
 if(params.vertical==='interiors-kitchens')return handleFormaBrief(req);
 if(params.vertical==='furniture')return handleFurnitureQuote(req);
 if(params.vertical==='sports-venues')return handleArenaRequest(req);
 if(params.vertical==='home-maintenance')return handleHomeMaintenance(req);
 if(params.vertical==='salon-spa')return handleSalonAppointment(req);
 if(params.vertical==='fitness')return handleFitnessRequest(req);
 if(params.vertical!=='auto-service')return failure('UNKNOWN_VERTICAL',404);
 const rate=checkRateLimit('portfolio:auto-service:'+getRequestIdentity(req),6,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter)}});
 try{
  const raw=await req.text();if(raw.length>16000)return failure('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));
  if(!parsed.success)return failure('INVALID_FIELDS',400);
  const v=parsed.data;
  if(v.honeypot)return failure('INVALID_FIELDS',400);
  if(v.year>new Date().getFullYear()+1)return failure('INVALID_YEAR',400);
  if(!autoData.brands.includes(v.make))return failure('INVALID_MAKE');
  if(v.preferredDate){
   const d=new Date(v.preferredDate+'T12:00:00Z');
   if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==v.preferredDate)return failure('INVALID_DATE');
   const days=(d.getTime()-Date.now())/86400000;
   if(days<-.5||days>90)return failure('INVALID_DATE');
  }
  const db=getDb();
  const item=db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug = ? AND slug = ? AND active = 1").get('auto-service',v.serviceSlug);
  if(!item)return failure('UNKNOWN_SERVICE');
  const existing=db.prepare("SELECT ref_number FROM portfolio_requests WHERE vertical_slug = ? AND client_request_id = ?")
    .get('auto-service',v.clientRequestId) as {ref_number:string}|undefined;
  if(existing)return NextResponse.json({success:true,refNumber:existing.ref_number,status:'pending_operator_confirmation',duplicate:true});
  const id='psr_'+crypto.randomUUID();
  const ref='MVX-AS-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={make:v.make,model:v.model,year:v.year,serviceSlug:v.serviceSlug,category:v.category,
   preferredDate:v.preferredDate||null,preferredWindow:v.preferredWindow,region:v.region,
   notice:'Showcase enquiry only. No confirmed workshop booking, inspection, quotation or dispatch.'};
  const result=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
    (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).run(id,ref,'auto-service','auto_service_request',
      v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(result.changes===0){
   const prev=db.prepare("SELECT ref_number FROM portfolio_requests WHERE vertical_slug = ? AND client_request_id = ?")
     .get('auto-service',v.clientRequestId) as {ref_number:string}|undefined;
   if(prev)return NextResponse.json({success:true,refNumber:prev.ref_number,status:'pending_operator_confirmation',duplicate:true});
   return failure('REQUEST_NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'Your request has been saved for demonstration. This does not reserve a real service appointment.'},{status:201});
 }catch(e){
  if(e instanceof SyntaxError)return failure('INVALID_JSON',400);
  console.error('Auto service request failed',e instanceof Error?e.name:'UNKNOWN');
  return failure('REQUEST_NOT_SAVED',500);
 }
}
