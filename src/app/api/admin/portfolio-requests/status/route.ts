import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import crypto from 'node:crypto';
import { getDb } from '@/lib/db';
import { verifySessionToken } from '@/lib/security/auth';

export const runtime='nodejs';
const body=z.object({id:z.string().min(5).max(100),
 status:z.enum(['new','contacted','qualified','quoted','won','lost','archived']),notes:z.string().max(2000)}).strict();
export async function POST(request:Request){
 const token=(await cookies()).get('mavvix_admin_session')?.value;
 const admin=token?verifySessionToken(token):null;
 if(!admin)return NextResponse.json({error:'UNAUTHORIZED'},{status:401});
 if(admin.role==='viewer')return NextResponse.json({error:'FORBIDDEN'},{status:403});
 const origin=request.headers.get('origin');
 if(!origin||origin!==new URL(request.url).origin)return NextResponse.json({error:'ORIGIN_REQUIRED'},{status:403});
 try{
  const raw=await request.text();if(raw.length>6000)return NextResponse.json({error:'TOO_LARGE'},{status:413});
  const parsed=body.safeParse(JSON.parse(raw));if(!parsed.success)return NextResponse.json({error:'INVALID_REQUEST'},{status:400});
  const {id,status,notes}=parsed.data,db=getDb();
  const row=db.prepare('SELECT vertical_slug FROM portfolio_requests WHERE id=?').get(id) as {vertical_slug:string}|undefined;
  if(!row)return NextResponse.json({error:'NOT_FOUND'},{status:404});
  db.exec('BEGIN IMMEDIATE');
  try{
   db.prepare('UPDATE portfolio_requests SET status=?,staff_notes=? WHERE id=?').run(status,notes,id);
   db.prepare(`INSERT INTO admin_audit_log(id,admin_id,site_id,action,entity_type,entity_id,metadata_json)
    VALUES (?,?,?,?,?,?,?)`).run('audit_'+crypto.randomUUID(),admin.id,null,'portfolio_review','portfolio_request',id,JSON.stringify({status,vertical:row.vertical_slug}));
   db.exec('COMMIT');
  }catch(e){db.exec('ROLLBACK');throw e;}
  return NextResponse.json({success:true});
 }catch(e){return NextResponse.json({error:e instanceof SyntaxError?'BAD_JSON':'UPDATE_FAILED'},{status:e instanceof SyntaxError?400:500});}
}
