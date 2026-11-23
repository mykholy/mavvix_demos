import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit,getRequestIdentity } from '@/lib/security/rate-limit';
import catalogue from '../../../data/verticals/furniture.json';

const text=z.string().trim();
const lineSchema=z.object({
 serviceSlug:text.min(3).max(80),
 room:z.enum(['living','bedroom','dining','workspace']),
 material:z.enum(['oak','walnut','engineered','linen','velvet','boucle']),
 finish:z.enum(['natural','sand','smoked','walnut','charcoal']),
 widthMm:z.number().int().min(250).max(5000),
 depthMm:z.number().int().min(200).max(4000),
 heightMm:z.number().int().min(250).max(4000),
 quantity:z.number().int().min(1).max(8),
}).strict();
const schema=z.object({
 flowType:z.literal('furniture_custom_quote_request'),
 clientRequestId:z.string().uuid(),
 items:z.array(lineSchema).min(1).max(6),
 deliveryZone:z.enum(['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other']),
 designStage:z.enum(['exploring','measurements_ready','consultation_requested']),
 guestName:text.min(2).max(120),
 guestPhone:text.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:text.max(100).optional(),medium:text.max(100).optional(),campaign:text.max(100).optional()}).optional().default({})
}).strict();
const bad=(code:string,status=400)=>NextResponse.json({success:false,code},{status});
export async function handleFurnitureQuote(req:Request){
 const rate=checkRateLimit('portfolio:furniture:'+getRequestIdentity(req),4,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter)}});
 try{
  const raw=await req.text();
  if(raw.length>22000)return bad('TOO_LARGE',413);
  const validation=schema.safeParse(JSON.parse(raw));
  if(!validation.success)return bad('INVALID_FIELDS');
  const v=validation.data;
  if(v.honeypot)return bad('INVALID_FIELDS');
  const seen=new Set<string>();
  for(const line of v.items){
   const product=catalogue.services.find(p=>p.slug===line.serviceSlug);
   if(!product)return bad('UNKNOWN_PRODUCT');
   if(product.room!==line.room||!product.materials.includes(line.material)||!product.finishes.includes(line.finish))return bad('INVALID_CONFIGURATION');
   const bounds=product.minMax;
   for(const [axis,value] of [['width',line.widthMm],['depth',line.depthMm],['height',line.heightMm]] as const){
    if(value<bounds[axis][0]||value>bounds[axis][1])return bad('DIMENSION_OUT_OF_RANGE');
   }
   // One item per product; configure distinct duplicates after owner approval.
   if(seen.has(line.serviceSlug))return bad('DUPLICATE_PRODUCT');
   seen.add(line.serviceSlug);
  }
  const db=getDb();
  for(const line of v.items){
   if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='furniture' AND slug=? AND active=1").get(line.serviceSlug))
    return bad('PRODUCT_UNAVAILABLE');
  }
  const prev=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('furniture',v.clientRequestId) as {ref_number:string}|undefined;
  if(prev)return NextResponse.json({success:true,refNumber:prev.ref_number,status:'pending_operator_confirmation',duplicate:true});
  const ref='MVX-OAK-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={items:v.items,deliveryZone:v.deliveryZone,designStage:v.designStage,totals:{
   units:v.items.reduce((total,x)=>total+x.quantity,0),distinctProducts:v.items.length},
   notice:'This is a nonbinding furniture specification request; no inventory, design drawings, production, price, payment or delivery is confirmed.'};
  const result=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
    (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).run('oak_'+crypto.randomUUID(),ref,'furniture','furniture_custom_quote_request',
     v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(result.changes===0){
   const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('furniture',v.clientRequestId) as {ref_number:string}|undefined;
   return old?NextResponse.json({success:true,refNumber:old.ref_number,status:'pending_operator_confirmation',duplicate:true}):bad('NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
    message:'Illustrative quote request saved; no item price or manufacturing order is confirmed.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return bad('INVALID_JSON');
  console.error('Furniture request error',error instanceof Error?error.name:'UNKNOWN');
  return bad('NOT_SAVED',500);
 }
}
