import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';
import lexora from '../../../data/verticals/law-firm.json';

const tiny=z.string().trim();
const schema=z.object({
 flowType:z.literal('legal_consultation_interest'),
 clientRequestId:z.string().uuid(),
 practiceSlug:tiny.min(4).max(90),
 jurisdiction:z.enum(['egypt','saudi-arabia','other']),
 clientType:z.enum(['individual','business','startup','nonprofit']),
 contactChannel:z.enum(['phone','email','whatsapp']),
 preferredWindow:z.enum(['morning','afternoon','evening','flexible']),
 // No case facts, adverse parties, identities, financial information, files, or deadlines.
 guestName:tiny.min(2).max(100),
 guestPhone:tiny.regex(/^\+?[0-9\s()-]{8,24}$/),
 consent:z.literal(true),
 honeypot:z.literal('').optional().default(''),
 utm:z.object({
  source:tiny.max(100).optional(),medium:tiny.max(100).optional(),campaign:tiny.max(100).optional()
 }).optional().default({}),
}).strict();

const fail=(code:string,status=400)=>NextResponse.json({success:false,code},{status});
/**
 * Domain boundary: no confidential case description is accepted, and no legal
 * representation, lawyer calendar, privilege or signed engagement is created.
 */
export async function handleLegalEnquiry(req:Request){
 const allowed=checkRateLimit('portfolio:law-firm:'+getRequestIdentity(req),6,60_000);
 if(!allowed.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(allowed.retryAfter)}});
 try{
  const raw=await req.text();if(raw.length>7500)return fail('TOO_LARGE',413);
  const parsed=schema.safeParse(JSON.parse(raw));
  if(!parsed.success)return fail('INVALID_FIELDS');
  const v=parsed.data;
  if(v.honeypot)return fail('INVALID_FIELDS');
  const dossier=lexora.services.find(s=>s.slug===v.practiceSlug);
  if(!dossier)return fail('INVALID_PRACTICE');
  const db=getDb();
  if(!db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='law-firm' AND slug=? AND active=1").get(v.practiceSlug))return fail('PRACTICE_UNAVAILABLE');
  const prior=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?')
    .get('law-firm',v.clientRequestId) as {ref_number:string}|undefined;
  if(prior)return NextResponse.json({success:true,refNumber:prior.ref_number,duplicate:true,status:'pending_operator_confirmation'});
  const reference='MVX-LEX-'+crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload={
   practiceSlug:v.practiceSlug,jurisdiction:v.jurisdiction,clientType:v.clientType,contactChannel:v.contactChannel,
   preferredWindow:v.preferredWindow,
   importantNotice:'Portfolio interest only. No legal engagement, attorney-client relationship, confidentiality privilege, representation, consultation, deadline monitoring or fee quote.'
  };
  const write=db.prepare(`INSERT OR IGNORE INTO portfolio_requests
    (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).run(
      'lex_'+crypto.randomUUID(),reference,'law-firm','legal_consultation_interest',
      v.guestName,v.guestPhone,JSON.stringify(payload),JSON.stringify(v.utm),
      new Date().toISOString(),v.clientRequestId);
  if(write.changes===0){
   const earlier=db.prepare('SELECT ref_number FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?')
      .get('law-firm',v.clientRequestId) as {ref_number:string}|undefined;
   return earlier?NextResponse.json({success:true,duplicate:true,refNumber:earlier.ref_number,status:'pending_operator_confirmation'}):fail('UNSAVED_REQUEST',500);
  }
  return NextResponse.json({success:true,refNumber:reference,status:'pending_operator_confirmation',
    message:'Your website showcase enquiry was recorded. No legal consultation or representation is confirmed.'},{status:201});
 }catch(e){
  if(e instanceof SyntaxError)return fail('INVALID_JSON');
  console.error('Lexora intake failed',e instanceof Error?e.name:'UNKNOWN');
  return fail('UNSAVED_REQUEST',500);
 }
}
