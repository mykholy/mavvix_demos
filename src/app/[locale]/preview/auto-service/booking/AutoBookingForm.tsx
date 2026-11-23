'use client';
import { useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { AUTO_SERVICE } from '@/lib/verticals/auto-service/data';
import { CheckCircle2, ArrowUpRight, AlertTriangle } from 'lucide-react';

export function AutoBookingForm({locale,initialService=''}:{locale:Locale;initialService?:string}){
 const ar=locale==='ar';
 const [serviceSlug,setServiceSlug]=useState(initialService||AUTO_SERVICE.services[0].slug);
 const [make,setMake]=useState('Toyota');
 const [model,setModel]=useState('');
 const [year,setYear]=useState(String(new Date().getFullYear()-3));
 const [category,setCategory]=useState('maintenance');
 const [preferredDate,setPreferredDate]=useState('');
 const [preferredWindow,setPreferredWindow]=useState('flexible');
 const [region,setRegion]=useState('');
 const [guestName,setGuestName]=useState('');
 const [guestPhone,setGuestPhone]=useState('');
 const [consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [receipt,setReceipt]=useState('');
 const id=useRef<string|null>(null);
 const minDate=useMemo(()=>new Date().toISOString().slice(0,10),[]);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||receipt)return;
  setError('');setBusy(true);
  try {
   if(!id.current)id.current=crypto.randomUUID();
   const query=new URLSearchParams(window.location.search);
   const utm={source:query.get('utm_source')||'',medium:query.get('utm_medium')||'',campaign:query.get('utm_campaign')||'',content:query.get('utm_content')||'',term:query.get('utm_term')||''};
   const res=await fetch('/api/portfolio/auto-service',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    flowType:'auto_service_request',clientRequestId:id.current,serviceSlug,make,model,year:Number(year),
    category,preferredDate,preferredWindow,region,guestName,guestPhone,consent,honeypot:'',utm
   })});
   const body=await res.json();
   if(!res.ok||!body.success)throw new Error(body.code||'REQUEST_FAILED');
   setReceipt(body.refNumber);
  }catch(err){setError(ar?'تعذر تسجيل الطلب. تأكد من البيانات وجرب مرة أخرى.':'Your request could not be saved. Check the details and try again.');}
  finally {setBusy(false);}
 }
 const input='mt-2 block w-full rounded-xl bg-white border border-stone-300 px-4 py-3.5 text-[#1A1C20] text-sm focus:outline-[#FB6935]';
 const label='block text-xs font-extrabold text-[#303338]';
 const options={category:[
  ['maintenance',ar?'صيانة دورية':'Routine maintenance'],['inspection',ar?'كشف وفحص':'Inspection'],['warning',ar?'لمبة تحذير':'Warning light'],['safety',ar?'فرامل وثبات':'Safety / steering'],['comfort',ar?'تكييف وراحة':'Cabin comfort'],['other',ar?'استفسار آخر':'Other']],
  time:[['flexible',ar?'مرن / يحتاج تنسيق':'Flexible / to arrange'],['morning',ar?'صباحًا':'Morning'],['afternoon',ar?'بعد الظهر':'Afternoon'],['evening',ar?'مساءً':'Evening']]
 };
 if(receipt)return <div role="status" aria-live="polite" className="rounded-3xl bg-white p-8 sm:p-12 border-2 border-emerald-500 shadow-xl text-center">
  <CheckCircle2 className="mx-auto text-emerald-600" size={46}/><h2 className="text-2xl font-black mt-4">{ar?'تم تسجيل الاستفسار':'Request recorded'}</h2>
  <p className="text-sm text-stone-600 mt-3 leading-7">{ar?'تم حفظ نموذج الطلب في تجربة الموقع. لا يوجد موعد حقيقي مؤكد، ويلزم التواصل مع مشغّل الورشة عند تطبيقها فعليًا.':'Your request was saved in this showcase experience. This does not confirm a workshop booking, price or service.'}</p>
  <p className="mt-6 rounded-xl p-4 bg-stone-100 text-lg font-mono font-bold">{receipt}</p>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} className="mt-6 inline-flex gap-2 items-center rounded-full bg-[#FB6935] text-black px-6 py-3 font-bold text-sm" target="_blank" rel="noopener noreferrer">{ar?'محتاج موقع مشابه لنشاطك؟':'Want a website like this?'}<ArrowUpRight size={17}/></a>
 </div>;
 return <form onSubmit={submit} className="bg-[#F3F0E9] border border-[#DAD4CA] rounded-[2rem] p-5 sm:p-9 shadow-[0_24px_80px_rgba(0,0,0,.08)] space-y-7">
  <div><p className="text-[#E15A29] font-extrabold text-xs tracking-[.18em] uppercase">SERVICE INTAKE / 01</p><h2 className="text-2xl sm:text-3xl font-black mt-2">{ar?'قولنا عربيتك محتاجة إيه':'Tell us about your vehicle'}</h2>
   <p className="text-sm mt-2 leading-7 text-stone-600">{ar?'اختار الخدمة ونوع العربية والموعد المفضل لتجربة نموذج الطلب؛ لا يتم تأكيد حجز حقيقي.':'Choose a service, vehicle and preferred time to experience the request flow. No real appointment is confirmed.'}</p></div>
  <div className="grid sm:grid-cols-2 gap-5">
   <label className={label}>{ar?'الخدمة المطلوبة':'Service'}
    <select required className={input} value={serviceSlug} onChange={e=>setServiceSlug(e.target.value)}>{AUTO_SERVICE.services.map(s=><option value={s.slug} key={s.slug}>{s.title[locale]}</option>)}</select>
   </label>
   <label className={label}>{ar?'نوع الاستفسار':'Concern'}
    <select className={input} value={category} onChange={e=>setCategory(e.target.value)}>{options.category.map(([v,t])=><option value={v} key={v}>{t}</option>)}</select>
   </label>
   <label className={label}>{ar?'الشركة المصنعة':'Make'}
    <select className={input} value={make} onChange={e=>setMake(e.target.value)}>{AUTO_SERVICE.brands.map(m=><option key={m}>{m}</option>)}</select>
   </label>
   <label className={label}>{ar?'الموديل':'Model'}<input required maxLength={70} minLength={2} placeholder={ar?'مثال: Corolla':'e.g. Corolla'} className={input} value={model} onChange={e=>setModel(e.target.value)}/></label>
   <label className={label}>{ar?'سنة الصنع':'Model year'}<input type="number" min="1980" max={new Date().getFullYear()+1} required className={input} value={year} onChange={e=>setYear(e.target.value)}/></label>
   <label className={label}>{ar?'المنطقة (بدون عنوان شخصي)':'Service area (no home address)'}<input required maxLength={90} minLength={2} className={input} placeholder={ar?'مثال: مدينة نصر':'e.g. Nasr City'} value={region} onChange={e=>setRegion(e.target.value)}/></label>
   <label className={label}>{ar?'يوم مفضل (اختياري)':'Preferred date (optional)'}<input type="date" min={minDate} className={input} value={preferredDate} onChange={e=>setPreferredDate(e.target.value)}/></label>
   <label className={label}>{ar?'فترة مفضلة':'Preferred window'}<select className={input} value={preferredWindow} onChange={e=>setPreferredWindow(e.target.value)}>{options.time.map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
   <label className={label}>{ar?'الاسم':'Name'}<input required maxLength={100} minLength={2} autoComplete="name" className={input} value={guestName} onChange={e=>setGuestName(e.target.value)}/></label>
   <label className={label}>{ar?'رقم للتواصل':'Phone'}<input required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" className={input} value={guestPhone} onChange={e=>setGuestPhone(e.target.value)}/></label>
  </div>
  <label className="flex gap-3 items-start text-xs leading-6 text-stone-600"><input type="checkbox" className="mt-1 accent-[#FB6935]" checked={consent} required onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على تسجيل بيانات التواصل المقدمة لغرض تجربة الطلب والمتابعة. لن أرسل رقم شاسيه أو بيانات حساسة.':'I consent to saving the provided contact details for this website request experience. No chassis number or sensitive information.'}</span></label>
  <div className="rounded-xl bg-white p-4 text-xs leading-6 flex gap-3 text-[#574534] border border-orange-200"><AlertTriangle size={20} className="shrink-0 text-[#DA683C]"/><span>{ar?'تنبيه: طلب توضيحي، لا توجد ورشة مشغّلة تستقبل هذه المواعيد أو تقدم إصلاحًا فعليًا حاليًا.':'This is an illustrative request, not a real mechanic booking or guarantee of repair.'}</span></div>
  {error&&<p role="alert" className="text-sm text-red-700 bg-red-50 p-3 rounded-lg">{error}</p>}
  <button type="submit" disabled={busy||!consent} className="w-full rounded-xl bg-[#FB6935] px-6 py-4 text-black font-extrabold text-sm disabled:opacity-40 hover:bg-[#FF855E] focus-visible:ring-4 focus-visible:ring-[#FB6935]/30">{busy?(ar?'جارٍ تسجيل الطلب...':'Saving request...'):(ar?'سجّل طلب الفحص':'Save inspection request')}</button>
 </form>;
}
