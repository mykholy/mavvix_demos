import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { getDb } from '@/lib/db';

export const runtime='nodejs';
function safeCell(value:unknown){
 let s=String(value??'').replace(/[\r\n]+/g,' ').slice(0,2000);
 if(/^[=+@\-\t\r]/.test(s))s="'"+s; // neutralize CSV formula injection
 return '"'+s.replace(/"/g,'""')+'"';
}
export async function GET(){
 const token=(await cookies()).get('mavvix_admin_session')?.value;
 const user=token?verifySessionToken(token):null;
 if(!user)return NextResponse.json({error:'UNAUTHORIZED'},{status:401});
 if(user.role==='viewer')return NextResponse.json({error:'FORBIDDEN'},{status:403});
 const rows=getDb().prepare(`SELECT ref_number,vertical_slug,flow_type,guest_name,guest_phone,status,staff_notes,utm_json,created_at
 FROM portfolio_requests ORDER BY created_at DESC LIMIT 2000`).all() as Array<Record<string,unknown>>;
 const header=['reference','sector','flow','contact_name','contact_phone','status','staff_notes','utm','created_at'];
 const csv='\uFEFF'+header.join(',')+'\r\n'+rows.map(row=>[row.ref_number,row.vertical_slug,row.flow_type,row.guest_name,row.guest_phone,row.status,row.staff_notes,row.utm_json,row.created_at].map(safeCell).join(',')).join('\r\n');
 return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="mavvix-portfolio-requests.csv"','Cache-Control':'no-store'}});
}
