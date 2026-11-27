import crypto from 'node:crypto';
import {z} from 'zod';
import {NextResponse} from 'next/server';
import {getDb} from '@/lib/db';
import {checkRateLimit,getRequestIdentity} from '@/lib/security/rate-limit';
import catalog from '../../../data/verticals/wholesale.json';
const common={clientRequestId:z.string().uuid(),organization:z.string().trim().min(2).max(100),guestName:z.string().trim().min(2).max(100),guestPhone:z.string().trim().regex(/^\+?[0-9\s()-]{8,24}$/),country:z.enum(['egypt','saudi-arabia','uae','other']),consent:z.literal(true),honeypot:z.literal('').optional().default('')};
const buyer=z.object({...common,flowType:z.literal('wholesale_rfq'),buyerType:z.enum(['retailer','hospitality','office','distributor','other']),deliveryPreference:z.enum(['delivery','collection','undecided']),lines:z.array(z.object({serviceSlug:z.string().min(3).max(80),cartons:z.number().int().min(2).max(1000)}).strict()).min(1).max(8)}).strict();
const supplier=z.object({...common,flowType:z.literal('wholesale_supplier_interest'),category:z.enum(['packaging','hospitality','office','operations']),supplierType:z.enum(['manufacturer','distributor','importer','other']),coverage:z.enum(['local','national','regional','unknown'])}).strict();
const schema=z.discriminatedUnion('flowType',[buyer,supplier]);
const failure=(code:string,status=400)=>NextResponse.json({success:false,code},{status,headers:{'Cache-Control':'no-store'}});
export async function handleWholesaleRequest(req:Request){
 const rate=checkRateLimit('portfolio:wholesale:'+getRequestIdentity(req),14,60_000);if(!rate.allowed)return NextResponse.json({success:false,code:'RATE_LIMIT'},{status:429,headers:{'Retry-After':String(rate.retryAfter),'Cache-Control':'no-store'}});
 try{const raw=await req.text();if(raw.length>10000)return failure('TOO_LARGE',413);const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return failure('INVALID_FIELDS');const v=parsed.data;
 const db=getDb(),active=db.prepare("SELECT id FROM portfolio_services WHERE vertical_slug='wholesale' AND slug=? AND active=1");
 let payload:Record<string,unknown>;
 if(v.flowType==='wholesale_rfq'){if(new Set(v.lines.map(x=>x.serviceSlug)).size!==v.lines.length)return failure('DUPLICATE_LINES');let cartons=0,units=0;const lines=[];for(const line of v.lines){const item=catalog.services.find(s=>s.slug===line.serviceSlug);if(!item||!active.get(item.slug))return failure('UNKNOWN_ITEM');if(line.cartons<item.minCartons||line.cartons>item.maxCartons)return failure('INVALID_CARTON_QUANTITY');const calculated=line.cartons*item.unitsPerCarton;cartons+=line.cartons;units+=calculated;lines.push({serviceSlug:item.slug,sku:item.sku,cartons:line.cartons,unitsPerCarton:item.unitsPerCarton,illustrativeUnits:calculated});}if(cartons>2000)return failure('TOTAL_CARTONS_EXCEEDED');payload={organization:v.organization,country:v.country,buyerType:v.buyerType,deliveryPreference:v.deliveryPreference,lines,totalCartons:cartons,illustrativeTotalUnits:units,notice:'Illustrative RFQ only. No stock, confirmed price, purchase order, payment or delivery.'};}
 else{payload={organization:v.organization,country:v.country,category:v.category,supplierType:v.supplierType,coverage:v.coverage,notice:'Supplier contact interest only; no verification, listing, marketplace access or contract.'};}
 const find=()=>db.prepare('SELECT ref_number,flow_type FROM portfolio_requests WHERE vertical_slug=? AND client_request_id=?').get('wholesale',v.clientRequestId) as {ref_number:string;flow_type:string}|undefined;
 const response=(refNumber:string,duplicate=false)=>NextResponse.json({success:true,refNumber,status:'pending_operator_confirmation',...(duplicate?{duplicate:true}:{})},{status:duplicate?200:201,headers:{'Cache-Control':'no-store'}});
 const prior=find();if(prior)return prior.flow_type===v.flowType?response(prior.ref_number,true):failure('REQUEST_TYPE_CONFLICT',409);
 const ref='MVX-TBR-'+crypto.randomBytes(5).toString('hex').toUpperCase();const saved=db.prepare('INSERT OR IGNORE INTO portfolio_requests (id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,utm_json,consent_at,client_request_id) VALUES (?,?,?,?,?,?,?,?,?,?)').run('tbr_'+crypto.randomUUID(),ref,'wholesale',v.flowType,v.guestName,v.guestPhone,JSON.stringify(payload),'{}',new Date().toISOString(),v.clientRequestId);
 if(saved.changes===0){const p=find();return p?(p.flow_type===v.flowType?response(p.ref_number,true):failure('REQUEST_TYPE_CONFLICT',409)):failure('SAVE_FAILED',500);}return response(ref);
 }catch(e){if(e instanceof SyntaxError)return failure('INVALID_JSON');console.error('TradeBridge intake failed',e instanceof Error?e.name:'unknown');return failure('SAVE_FAILED',500);}
}
