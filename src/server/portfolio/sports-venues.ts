import crypto from 'node:crypto';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit,getRequestIdentity } from '@/lib/security/rate-limit';
import courts from '../../../data/verticals/sports-venues.json';

/** Book-court intent never promises a real available slot. */
const bounded=z.string().trim();
const schema=z.object({
 flowType:z.literal('sports_venue_request'),
 clientRequestId:z.string().uuid(),
 serviceSlug:bounded.min(3).max(80),
 sport:z.enum(['football','padel']),
 players:z.coerce.number().int().min(2).max(25),
 durationMinutes:z.coerce.number().int().min(45).max(150),
 preferredDate:bounded.regex(/^\d{4}-\d{2}-\d{2}$/),
 preferredStart:z.enum(['17:00','18:30','20:00','21:30']),
 region:z.enum(['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other']),
 sessionType:z.enum(['casual','training','friendly','league_interest']),
 guestName:bounded.min(2).max(100),
 guestPhone:bounded.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({source:bounded.max(100).optional(),medium:bounded.max(100).optional(),campaign:bounded.max(100).optional()}).optional().default({}),
}).strict();

const bad=(code:string,status=400)=>NextResponse.json({success:false,code},{status});
export async function handleArenaRequest(req:Request){
 const rate=checkRateLimit('portfolio:sports-venues:'+getRequestIdentity(req),6,60_000);
 if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter)}});
 try{
  const raw=await req.text();if(raw.length>14000)return bad('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return bad('INVALID_FIELDS');
  const v=parsed.data;
  if(v.honeypot)return bad('INVALID_FIELDS');
  const court=courts.services.find(s=>s.slug===v.serviceSlug);
  if(!court||court.sport!==v.sport)return bad('UNKNOWN_FORMAT');
  if(court.players!==v.players)return bad('TEAM_SIZE_MISMATCH');
  if(!court.durations.includes(v.durationMinutes))return bad('DURATION_MISMATCH');
  const dt=new Date(v.preferredDate+'T12:00:00Z');
  if(!Number.isFinite(dt.getTime())||dt.toISOString().slice(0,10)!==v.preferredDate)return bad('INVALID_DATE');
  const days=(dt.getTime()-Date.now())/86400000;
  if(days<-.5||days>60)return bad('INVALID_DATE');
  const db=getDb();
  const active=db.prepare('SELECT id FROM portfolio_services WHERE vertical_slug=? AND slug=? AND active=1').get('sports-venues',v.serviceSlug);
  if(!active)return bad('FORMAT_UNAVAILABLE');
  const old=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('sports-venues',v.clientRequestId) as {ref_number:string}|undefined;
  if(old)return NextResponse.json({success:true,refNumber:old.ref_number,status:'pending_operator_confirmation',duplicate:true});
  const ref='MVX-ARN-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={serviceSlug:v.serviceSlug,sport:v.sport,players:v.players,durationMinutes:v.durationMinutes,
   preferredDate:v.preferredDate,preferredStart:v.preferredStart,region:v.region,sessionType:v.sessionType,
   notice:'Editorial website enquiry only. No court availability, booking, venue, payment or event is confirmed.'};
  const inserted=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
   (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
   VALUES (?,?,?,?,?,?,?,?,?,?)`).run('arn_'+crypto.randomUUID(),ref,'sports-venues','sports_venue_request',
    v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),new Date().toISOString(),v.clientRequestId);
  if(inserted.changes===0){
   const existing=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('sports-venues',v.clientRequestId) as {ref_number:string}|undefined;
   return existing?NextResponse.json({success:true,refNumber:existing.ref_number,status:'pending_operator_confirmation',duplicate:true}):bad('NOT_SAVED',500);
  }
  return NextResponse.json({success:true,refNumber:ref,status:'pending_operator_confirmation',
   message:'Your requested time was saved in an illustrative Mavvix website. An actual operator has not confirmed a court.'},{status:201});
 }catch(error){
  if(error instanceof SyntaxError)return bad('INVALID_JSON');
  console.error('Arena request failed:',error instanceof Error?error.name:'Unknown');
  return bad('NOT_SAVED',500);
 }
}
