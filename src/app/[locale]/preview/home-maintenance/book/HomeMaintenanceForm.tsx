'use client';
import { useRef, useState } from 'react';
import { HOME_CARE,careLocale } from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';
import { AlertTriangle, ArrowRight, Check, CheckCircle2, Phone, Wind, Wrench, Zap } from 'lucide-react';

const urgencyOptions=[
 ['routine','Routine','عادي'],
 ['priority','Priority','أولوية'],
 ['urgent','Urgent enquiry · not emergency dispatch','استفسار عاجل · ليس خدمة طوارئ'],
] as const;
const concerns=[
 ['not_working','Not functioning','مش شغال'],
 ['leak','Water / drain leak','تسريب'],
 ['noise','Noise / vibration','صوت أو اهتزاز'],
 ['poor_performance','Reduced performance','ضعف أداء'],
 ['installation','Installation request','تركيب'],
 ['routine','Routine service','صيانة دورية'],
 ['other','Other enquiry','استفسار آخر'],
] as const;
const windows=[
 ['flexible','To arrange','مرن'],
 ['morning','Morning','صباحًا'],
 ['afternoon','Afternoon','بعد الظهر'],
 ['evening','Evening','مساءً'],
] as const;
const property=[['apartment','Apartment','شقة'],['villa','Villa','فيلا'],['office','Office','مكتب'],['shop','Shop','محل'],['other','Other','أخرى']] as const;
export function HomeMaintenanceForm({locale,service=''}:{locale:Locale;service?:string}){
 const ar=locale==='ar';
 const [step,setStep]=useState(0),[chosen,setChosen]=useState(service||'ac-maintenance');
 const [issue,setIssue]=useState('not_working'),[urgency,setUrgency]=useState('routine');
 const [region,setRegion]=useState('Cairo'),[visitType,setVisitType]=useState('inspection'),
  [preferredWindow,setPreferredWindow]=useState('flexible'),[preferredDate,setPreferredDate]=useState(''),
  [propertyType,setPropertyType]=useState('apartment'),[guestName,setGuestName]=useState(''),[guestPhone,setGuestPhone]=useState('');
 const [consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[ref,setRef]=useState('');
 const id=useRef<string|null>(null);
 const input='mt-2 w-full bg-white border border-[#CBDAE6] rounded-2xl px-4 py-3.5 text-sm text-[#174E78] outline-offset-2 focus:outline-[#F7B347]';
 const field='text-xs font-black block text-[#285879]';
 const active='border-[#174E78] bg-[#E7F3FF] shadow-[0_2px_0_#174E78]';
 const inactive='border-[#D8E5F0] bg-white hover:border-[#174E78]';
 async function submit(){
  if(busy||ref||!consent)return;
  setError('');setBusy(true);
  try{
   if(!id.current)id.current=crypto.randomUUID();
   const query=new URLSearchParams(window.location.search);
   const response=await fetch('/api/portfolio/home-maintenance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    flowType:'home_maintenance_request',clientRequestId:id.current,serviceSlug:chosen,issue,urgency,region,visitType,
    preferredDate,preferredWindow,propertyType,guestName,guestPhone,consent,honeypot:'',
    utm:{source:query.get('utm_source')||'',medium:query.get('utm_medium')||'',campaign:query.get('utm_campaign')||''}
   })});
   const result=await response.json();
   if(!response.ok||!result.success)throw Error(result.code||'REQUEST_FAILED');
   setRef(result.refNumber);
  }catch{setError(ar?'مش قادرين نسجل الطلب. راجع البيانات وحاول مرة تانية.':'We could not save the request. Review the information and try again.');}
  finally{setBusy(false);}
 }
 if(ref)return <div className="rounded-[2rem] bg-white border-2 border-[#174E78] p-8 sm:p-12 shadow-xl text-center" role="status">
  <CheckCircle2 size={50} className="mx-auto text-[#279E69]"/><h2 className="text-2xl sm:text-3xl font-black mt-5">{ar?'اتسجل طلبك التجريبي':'Your request was saved'}</h2>
  <p className="mt-5 text-sm leading-8 text-[#527089]">{ar?'ده رقم مرجعي داخل تجربة الموقع. لم يتم إرسال فني ولا تأكيد زيارة أو تكلفة من مقدم خدمة حقيقي.':'This reference belongs to the website experience; no real technician, visit, emergency support or fee was confirmed.'}</p>
  <p className="font-mono font-bold text-xl tracking-wide mt-8 bg-[#EDF4F9] p-5 rounded-xl">{ref}</p>
  <a className="inline-flex items-center mt-7 rounded-full bg-[#174E78] text-white px-8 py-4 font-bold text-sm" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer">{ar?'نفّذ موقع زي ده لنشاطك':'Build a similar website'}</a>
 </div>;
 return <div className="bg-white rounded-[2rem] border border-[#D8E5F0] shadow-2xl overflow-hidden">
  <div className="bg-[#174E78] text-white px-6 sm:px-9 py-7"><p className="text-[#F7B347] text-xs font-bold tracking-widest uppercase">FIXORA / YOUR REQUEST</p><h2 className="text-2xl font-black mt-3">{ar?'التشخيص الصحيح يبدأ بسؤال واضح':'A better request starts with the right questions'}</h2>
   <div className="grid grid-cols-3 gap-3 mt-7">{[ar?'الخدمة':'Service',ar?'الموقع والوقت':'Location & timing',ar?'التواصل':'Contact'].map((l,i)=><button type="button" key={l} disabled={i>step} onClick={()=>setStep(i)} className={'min-h-10 rounded-lg text-xs font-bold border '+(i===step?'bg-[#F7B347] text-[#174E78] border-[#F7B347]':'border-white/30 text-white/70')}>{String(i+1).padStart(2,'0')} · {l}</button>)}</div>
  </div>
  <div className="p-6 sm:p-9">
   {step===0&&<div className="space-y-6">
    <h3 className="text-lg font-black">{ar?'نوع المشكلة والخدمة':'Tell us which service you need'}</h3>
    <div className="grid sm:grid-cols-2 gap-3">{HOME_CARE.services.map(s=><button type="button" key={s.slug} onClick={()=>setChosen(s.slug)} aria-pressed={chosen===s.slug} className={'text-start border-2 rounded-2xl p-4 min-h-20 transition '+(chosen===s.slug?active:inactive)}>
      <span className="text-sm font-extrabold block">{careLocale(s.title,locale)}</span><span className="mt-2 text-xs leading-5 text-[#527089] block">{careLocale(s.summary,locale)}</span>
     </button>)}</div>
    <label className={field}>{ar?'وصف نوع المشكلة':'Type of concern'}<select className={input} value={issue} onChange={e=>setIssue(e.target.value)}>{concerns.map(([v,en,arText])=><option value={v} key={v}>{ar?arText:en}</option>)}</select></label>
    <button type="button" onClick={()=>setStep(1)} className="w-full rounded-2xl bg-[#174E78] text-white font-black py-4 text-sm">{ar?'التالي: المنطقة والوقت':'Next: location and timing'}</button>
   </div>}
   {step===1&&<div className="space-y-6">
    <h3 className="text-lg font-black">{ar?'اختار المنطقة ودرجة الأولوية':'Set an approximate area and priority'}</h3>
    <p className="text-xs leading-7 text-[#527089]">{ar?'من غير عنوان الشقة أو أي أكواد دخول؛ ده نموذج استفسار فقط.':'General area only. Do not enter your address or building access codes.'}</p>
    <div className="grid sm:grid-cols-2 gap-5">
     <label className={field}>{ar?'المنطقة':'Region'}<select className={input} value={region} onChange={e=>setRegion(e.target.value)}>{HOME_CARE.options.regions.map(v=><option key={v}>{v}</option>)}</select></label>
     <label className={field}>{ar?'نوع المكان':'Property type'}<select className={input} value={propertyType} onChange={e=>setPropertyType(e.target.value)}>{property.map(([v,en,arText])=><option key={v} value={v}>{ar?arText:en}</option>)}</select></label>
     <label className={field}>{ar?'نوع الزيارة المطلوبة':'Visit type'}<select className={input} value={visitType} onChange={e=>setVisitType(e.target.value)}>{[['inspection',ar?'معاينة مبدئية':'Assessment'],['one_time',ar?'صيانة مرة واحدة':'One-off service'],['recurring',ar?'صيانة دورية':'Recurring preference']].map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
     <label className={field}>{ar?'تاريخ مفضل (اختياري)':'Preferred day (optional)'}<input type="date" className={input} min={new Date().toISOString().slice(0,10)} value={preferredDate} onChange={e=>setPreferredDate(e.target.value)}/></label>
     <label className={field}>{ar?'فترة':'Preferred window'}<select className={input} value={preferredWindow} onChange={e=>setPreferredWindow(e.target.value)}>{windows.map(([v,en,arText])=><option key={v} value={v}>{ar?arText:en}</option>)}</select></label>
     <label className={field}>{ar?'مستوى الاستعجال':'Priority'}<select className={input} value={urgency} onChange={e=>setUrgency(e.target.value)}>{urgencyOptions.map(([v,en,arText])=><option key={v} value={v}>{ar?arText:en}</option>)}</select></label>
    </div>
    <div className="flex gap-3 items-start bg-[#FFF4D6] p-5 rounded-xl border border-amber-200 text-[#66501D] text-xs leading-7"><AlertTriangle size={22} className="shrink-0"/><span>{ar?'الاستفسار العاجل لا يرسل فريق طوارئ. في مخاطر كهرباء أو غاز أو حريق ابتعد عن مصدر الخطر وتواصل مع الجهة المختصة فورًا.':'Urgent selection does not summon emergency services. For electrical, gas or fire hazards, move to safety and contact qualified local emergency response.'}</span></div>
    <div className="grid grid-cols-2 gap-3"><button type="button" onClick={()=>setStep(0)} className="border border-[#174E78] text-[#174E78] rounded-xl py-4 font-bold text-sm">{ar?'السابق':'Back'}</button><button type="button" onClick={()=>setStep(2)} className="bg-[#174E78] text-white rounded-xl py-4 font-bold text-sm">{ar?'التالي: بيانات التواصل':'Next: contact'}</button></div>
   </div>}
   {step===2&&<form onSubmit={e=>{e.preventDefault();void submit();}} className="space-y-6">
    <h3 className="text-lg font-black">{ar?'معلومات متابعة محدودة':'Minimal contact information'}</h3>
    <div className="grid sm:grid-cols-2 gap-5">
     <label className={field}>{ar?'الاسم':'Name'}<input required minLength={2} maxLength={110} autoComplete="name" className={input} value={guestName} onChange={e=>setGuestName(e.target.value)}/></label>
     <label className={field}>{ar?'رقم الهاتف':'Phone'}<input required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" className={input} value={guestPhone} onChange={e=>setGuestPhone(e.target.value)}/></label>
    </div>
    <label className="flex items-start gap-3 text-xs leading-7 text-[#527089]"><input className="mt-1 accent-[#174E78]" required type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ البيانات التي قدمتها لأغراض تجربة نموذج طلب الصيانة. لا أرسل عنواني الخاص أو أكواد دخول أو بيانات حساسة.':'I consent to storing the submitted contact details for this example request. I will not provide my full address, access codes or sensitive details.'}</span></label>
    {error&&<p role="alert" className="bg-red-50 text-red-700 text-sm p-4 rounded-xl">{error}</p>}
    <div className="grid grid-cols-2 gap-3"><button type="button" onClick={()=>setStep(1)} className="border border-[#174E78] rounded-xl py-4 text-[#174E78] font-bold text-sm">{ar?'السابق':'Back'}</button><button disabled={busy||!consent} type="submit" className="bg-[#F7B347] text-[#174E78] rounded-xl py-4 font-black text-sm disabled:opacity-40">{busy?(ar?'جارٍ الحفظ':'Saving...'):(ar?'حفظ الاستفسار':'Save request')}</button></div>
   </form>}
  </div>
 </div>;
}
