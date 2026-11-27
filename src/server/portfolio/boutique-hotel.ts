import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit,getRequestIdentity } from '@/lib/security/rate-limit';
import catalog from '../../../data/verticals/boutique-hotel.json';
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const schema=z.object({flowType:z.literal('hotel_stay_request'),clientRequestId:z.string().uuid(),serviceSlug:z.string().min(3).max(80),checkIn:date,checkOut:date,adults:z.number().int().min(1).max(4),children:z.number().int().min(0).max(3),guestName:z.string().trim().min(2).max(100),guestPhone:z.string().trim().regex(/^\+?[0-9\s()-]{8,24}$/),consent:z.literal(true),honeypot:z.literal('').optional().default('')}).strict();
const day=86400000;
const failure=(code:string,status=400)=>NextResponse.json({success:false,code},{status,headers:{'Cache-Control':'no-store'}});
function parseDay(s:string){const d=new Date(s+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===s?d.getTime():NaN;}
export async function handleHotelStay(req:Request){
 const rate=checkRateLimit('portfolio:boutique-hotel:'+getRequestIdentity(req),10,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter),'Cache-Control':'no-store'}});
 try{
 const raw=await req.text();if(raw.length>6000)return failure('TOO_LARGE',413);
 const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return failure('INVALID_FIELDS');const v=parsed.data;
 const service=catalog.services.find(s=>s.slug===v.serviceSlug);if(!service)return failure('UNKNOWN_ROOM');
 if(v.adults+v.children>service.maxGuests)return failure('OCCUPANCY_EXCEEDED');
 const from=parseDay(v.checkIn),to=parseDay(v.checkOut),today=parseDay(new Date().toISOString().slice(0,10)),nights=(to-from)/day;
 if(!Number.isFinite(from)||!Number.isFinite(to)||from<today||from>today+366*day||nights<1||nights>30)return failure('INVALID_STAY_DATES');
 const db=getDb();if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='boutique-hotel' AND slug=? AND active=1").get(v.serviceSlug))return failure('ROOM_UNAVAILABLE',503);
 const find=()=>db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('boutique-hotel',v.clientRequestId) as {ref_number:string}|undefined;
 const response=(refNumber:string,duplicate=false)=>NextResponse.json({success:true,refNumber,status:'pending_operator_confirmation',...(duplicate?{duplicate:true}:{})},{status:duplicate?200:201,headers:{'Cache-Control':'no-store'}});
 const prev=find();if(prev)return response(prev.ref_number,true);
 const ref='MVX-OAS-'+crypto.randomBytes(5).toString('hex').toUpperCase();
 const payload={serviceSlug:v.serviceSlug,checkIn:v.checkIn,checkOut:v.checkOut,nights,adults:v.adults,children:v.children,notice:'Stay enquiry only; no live availability, rate, payment or confirmed reservation.'};
 const saved=db.prepare('INSERT OR IGNORE INTO portfolio_requests (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id) VALUES (?,?,?,?,?,?,?,?,?,?)').run('oas_'+crypto.randomUUID(),ref,'boutique-hotel','hotel_stay_request',v.guestName,v.guestPhone,JSON.stringify(payload),'{}',new Date().toISOString(),v.clientRequestId);
 if(saved.changes===0){const existing=find();return existing?response(existing.ref_number,true):failure('SAVE_FAILED',500);}
 return response(ref);
 }catch(e){if(e instanceof SyntaxError)return failure('INVALID_JSON');console.error('Oasis stay intake failed',e instanceof Error?e.name:'unknown');return failure('SAVE_FAILED',500);}
}
