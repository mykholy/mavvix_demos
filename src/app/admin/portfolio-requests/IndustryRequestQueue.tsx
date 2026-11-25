'use client';
import { useState } from 'react';

type RequestRow={id:string;ref_number:string;vertical_slug:string;flow_type:string;guest_name:string;guest_phone:string;status:string;created_at:string;staff_notes:string;payload:Record<string,unknown>;utm:Record<string,unknown>};
const states=['new','contacted','qualified','quoted','won','lost','archived'];
export function IndustryRequestQueue({requests,canEdit}:{requests:RequestRow[];canEdit:boolean}){
 const [rows,setRows]=useState(requests),[selected,setSelected]=useState<RequestRow|null>(null),
  [notes,setNotes]=useState(''),[status,setStatus]=useState('new'),[saving,setSaving]=useState(false),[error,setError]=useState('');
 function select(r:RequestRow){setSelected(r);setNotes(r.staff_notes||'');setStatus(r.status);setError('');}
 async function save(){
  if(!selected||!canEdit||saving)return;
  setSaving(true);setError('');
  try{const res=await fetch('/api/admin/portfolio-requests/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:selected.id,status,notes})});
   if(!res.ok)throw Error('Server rejected update');
   const next={...selected,status,staff_notes:notes};
   setSelected(next);setRows(p=>p.map(r=>r.id===next.id?next:r));
  }catch{setError('Unable to save. Please retry after verifying your session.');}
  finally{setSaving(false);}
 }
 return <div className="grid xl:grid-cols-[1.3fr_.9fr] gap-6">
  <div className="rounded-2xl overflow-x-auto border border-slate-800 bg-slate-900">
   <table className="w-full text-start text-xs"><thead className="bg-slate-950 text-slate-400"><tr>
    <th className="p-4 text-start">Reference</th><th className="p-4 text-start">Sector</th><th className="p-4 text-start">Contact</th><th className="p-4 text-start">Status</th><th className="p-4 text-start">Date</th><th className="p-4 text-start">Open</th>
   </tr></thead><tbody>{rows.map(r=><tr key={r.id} className="border-t border-slate-800 text-slate-300 hover:bg-slate-800/40"><td className="p-4 font-mono text-cyan-300">{r.ref_number}</td><td className="p-4">{r.vertical_slug}</td><td className="p-4">{r.guest_name}</td><td className="p-4">{r.status}</td><td className="p-4">{r.created_at}</td><td className="p-4"><button onClick={()=>select(r)} className="text-[#FB6935] hover:underline font-bold" type="button">Details</button></td></tr>)}</tbody></table>
   {!rows.length&&<p className="p-10 text-center text-slate-400">No industry requests submitted yet.</p>}
  </div>
  <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
   {!selected?<p className="text-slate-400 text-sm">Select a request to review its data and workflow origin.</p>:<div className="space-y-5">
    <div><p className="text-cyan-300 text-xs font-mono">{selected.ref_number}</p><h2 className="text-xl text-white font-bold mt-1">{selected.guest_name}</h2><a href={'tel:'+selected.guest_phone} className="text-sm text-slate-300 mt-2 inline-flex">{selected.guest_phone}</a></div>
    <div className="border-y border-slate-800 py-4 space-y-2"><p className="text-xs text-slate-400">Submitted details</p>{Object.entries(selected.payload).map(([key,val])=><div key={key} className="text-xs grid grid-cols-[.45fr_1fr] gap-3"><span className="text-slate-500">{key}</span><span className="text-slate-200 break-words">{typeof val==='string'||typeof val==='number'?String(val):JSON.stringify(val)}</span></div>)}</div>
    <div className="text-xs text-slate-500">Source: {JSON.stringify(selected.utm)}</div>
    <label className="block text-sm text-slate-300">Status<select disabled={!canEdit} className="block w-full mt-2 p-3 rounded-lg bg-slate-950 border border-slate-700" value={status} onChange={e=>setStatus(e.target.value)}>{states.map(x=><option key={x}>{x}</option>)}</select></label>
    <label className="block text-sm text-slate-300">Staff notes<textarea disabled={!canEdit} value={notes} maxLength={2000} onChange={e=>setNotes(e.target.value)} className="block w-full min-h-28 mt-2 p-3 rounded-lg bg-slate-950 border border-slate-700"/></label>
    {error&&<p role="alert" className="text-red-300 text-sm">{error}</p>}
    {canEdit?<button type="button" disabled={saving} onClick={save} className="bg-[#FB6935] text-black font-extrabold px-6 py-3 rounded-xl disabled:opacity-50">{saving?'Saving...':'Save review'}</button>:<p className="text-amber-300 text-xs">Viewer account: read-only.</p>}
   </div>}
  </aside>
 </div>;
}
