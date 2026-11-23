import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/db';
import { verifySessionToken } from '@/lib/security/auth';
import { IndustryRequestQueue } from './IndustryRequestQueue';
import { Inbox, Download } from 'lucide-react';

export const dynamic='force-dynamic';
export default function IndustryRequestsPage({searchParams}:{searchParams:{sector?:string}}){
 const token=cookies().get('mavvix_admin_session')?.value;
 const admin=token?verifySessionToken(token):null;
 if(!admin)redirect('/admin/login');
 const sector=(searchParams.sector||'').slice(0,64);
 const db=getDb();
 const rows=db.prepare(`SELECT id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,
  payload_json,utm_json,staff_notes,status,created_at,expires_at FROM portfolio_requests
  WHERE (? = '' OR vertical_slug = ?) ORDER BY created_at DESC LIMIT 300`).all(sector,sector) as Array<Record<string,unknown>>;
 const requests=rows.map(r=>({
   id:String(r.id),ref_number:String(r.ref_number),vertical_slug:String(r.vertical_slug),
   flow_type:String(r.flow_type),guest_name:String(r.guest_name),guest_phone:String(r.guest_phone),
   status:String(r.status),created_at:String(r.created_at),staff_notes:String(r.staff_notes||''),
   payload:JSON.parse(String(r.payload_json||'{}')) as Record<string,unknown>,
   utm:JSON.parse(String(r.utm_json||'{}')) as Record<string,unknown>,
  }));
 return <div className="space-y-7">
  <div className="flex flex-wrap gap-5 items-center justify-between">
   <div><h1 className="font-bold text-2xl text-white flex gap-2 items-center"><Inbox className="text-[#FB6935]"/> Industry enquiries</h1>
    <p className="text-sm text-slate-400 mt-2">Authenticated showcase queue. Requests are not real bookings; customer contact details require consent and retention review.</p>
   </div>
   {admin.role!=='viewer'&&<a href="/api/admin/portfolio-requests/export" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-semibold"><Download size={17}/> Export CSV (authorized)</a>}
  </div>
  <IndustryRequestQueue requests={requests} canEdit={admin.role==='owner'||admin.role==='editor'}/>
 </div>;
}
