'use client';
import { useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { GLOSSBAY,glossText } from '@/lib/verticals/car-detailing/data';
import { CheckCircle2, ShieldAlert, Layers3, CalendarDays, CarFront, ArrowUpRight } from 'lucide-react';

const WINDOWS=[['flexible','الوقت مرن','Flexible'],['morning','صباحًا','Morning'],['afternoon','بعد الظهر','Afternoon'],['evening','مساءً','Evening']] as const;
const CONDITIONS=[['routine','عناية دورية','Routine care'],['heavily-soiled','اتساخ شديد','Heavy contamination'],['paint-marring','آثار خدوش سطحية','Possible paint marring'],['new-vehicle','سيارة حديثة','New vehicle'],['unsure','مش متأكد','Not sure']] as const;

export function GlossQuoteForm({locale,initial=''}:{locale:Locale;initial?:string}){
 const ar=locale==='ar';const valid=GLOSSBAY.services.find(x=>x.slug===initial);
 const [vehicleSize,setVehicleSize]=useState('sedan');
 const [treatment,setTreatment]=useState(valid?.slug||GLOSSBAY.services[0].slug);
 const [addons,setAddons]=useState<string[]>([]);
 const [condition,setCondition]=useState('routine');
 const [requestedDate,setRequestedDate]=useState('');
 const [requestedWindow,setRequestedWindow]=useState('flexible');
 const [city,setCity]=useState('Cairo');
 const [guestName,setGuestName]=useState('');
 const [guestPhone,setGuestPhone]=useState('');
 const [consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [receipt,setReceipt]=useState('');
 const requestId=useRef<string|null>(null);
 const minDate=useMemo(()=>new Date().toISOString().slice(0,10),[]);
 const maxDate=useMemo(()=>new Date(Date.now()+90*86400000).toISOString().slice(0,10),[]);
 const selected=GLOSSBAY.services.find(x=>x.slug===treatment)||GLOSSBAY.services[0];
 const label='block font-black text-sm text-[#D0E9F5]';
 const field='mt-2 block w-full bg-[#121F31] text-white border border-[#5D849A] rounded-lg px-4 py-3.5 focus-visible:ring-2 focus-visible:ring-[#4CCBF4] outline-none text-sm';
 function toggle(id:string){setAddons(items=>items.includes(id)?items.filter(x=>x!==id):[...items,id]);}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||receipt)return;
  setBusy(true);setError('');
  try{
   if(!requestId.current)requestId.current=crypto.randomUUID();
   const q=new URLSearchParams(window.location.search);
   const res=await fetch('/api/portfolio/car-detailing',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({flowType:'car_detailing_quote_request',clientRequestId:requestId.current,
      vehicleSize,treatment,addons,condition,requestedDate,requestedWindow,city,guestName,guestPhone,consent,honeypot:'',
      utm:{source:q.get('utm_source')||'',medium:q.get('utm_medium')||'',campaign:q.get('utm_campaign')||''}})});
   const data=await res.json();
   if(!res.ok||!data.success)throw Error(data.code||'REQUEST_FAILED');
   setReceipt(String(data.refNumber));
  }catch{setError(ar?'تعذر حفظ الطلب. راجع المقاس والخدمة والتاريخ والبيانات، ثم حاول مرة ثانية.':'Could not save your enquiry. Review vehicle size, service, date and contact details, then retry.');}
  finally{setBusy(false);}
 }
 if(receipt)return <section className="bg-[#0D1626] p-8 sm:p-12 rounded-xl text-center border-2 border-[#4CCBF4]" role="status" aria-live="polite">
  <CheckCircle2 size={52} className="text-[#4CCBF4] mx-auto"/><h2 className="gloss-display text-3xl sm:text-4xl font-black text-white mt-5">{ar?'استفسارك اتحفظ':'Your quote enquiry is saved'}</h2>
  <p className="text-[#D0E9F5] text-sm leading-8 mt-6">{ar?'الطلب داخل تجربة الموقع فقط. لا سعر معتمد، ولا ميعاد مؤكد، ولا ورشة GlossBay شغالة بالفعل.':'This is a website portfolio request. No actual studio, service appointment, quotation, vehicle treatment or technician is confirmed.'}</p>
  <p className="mt-8 font-mono tracking-wide text-xl text-[#4CCBF4] bg-[#13263A] border border-[#315C74] p-5 rounded-lg">{receipt}</p>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 gap-2 items-center rounded-full bg-[#4CCBF4] text-[#0D1626] px-8 py-4 font-black text-sm">{ar?'عايز موقع بنفس الفكرة؟':'Commission a site like this'}<ArrowUpRight size={17}/></a>
 </section>;
 return <form onSubmit={submit} className="bg-[#0D1626] rounded-xl border border-[#355B71] shadow-2xl text-white overflow-hidden">
  <div className="p-7 sm:p-9 border-b border-[#355B71]">
   <p className="text-[#82DCF8] text-xs font-mono tracking-[.2em] font-extrabold">DETAILING REQUEST // 01</p>
   <h2 className="gloss-display text-3xl sm:text-4xl font-black mt-4">{ar?'جهز مواصفات عربيتك':'Build your car-care brief'}</h2>
   <p className="text-[#C4DEE9] text-sm mt-4 leading-8">{ar?'حدد حجم السيارة والخدمة وأي إضافات. النتيجة استفسار محفوظ، مش عرض سعر ملزم أو حجز موعد فعلي.':'Choose size, treatment and optional work. You will receive a pending request reference, not a binding quote or real-time appointment.'}</p>
  </div>
  <div className="p-6 sm:p-9 space-y-8">
   <fieldset><legend className="font-black text-[#CFEAF5] text-sm">{ar?'01 — حجم السيارة':'01 — Vehicle size'}</legend>
    <div className="grid grid-cols-2 gap-2 mt-4">{GLOSSBAY.vehicleSizes.map(s=><button type="button" key={s.slug} aria-pressed={vehicleSize===s.slug} onClick={()=>setVehicleSize(s.slug)}
      className={'text-start px-4 py-4 rounded-lg min-h-16 border transition-colors text-sm font-bold '+(vehicleSize===s.slug?'bg-[#4CCBF4] text-[#0D1626] border-[#4CCBF4]':'bg-[#172B40] text-[#D0E9F5] border-[#355B71] hover:border-[#4CCBF4]')}>{glossText(s,locale)}</button>)}</div>
   </fieldset>
   <label className={label}>{ar?'02 — نوع الخدمة':'02 — Primary treatment'}<select required className={field} value={treatment} onChange={e=>setTreatment(e.target.value)}>{GLOSSBAY.services.map(s=><option key={s.slug} value={s.slug}>{glossText(s.title,locale)}</option>)}</select></label>
   <div className="bg-[#183148] border-s-4 border-[#4CCBF4] p-5"><p className="font-bold text-[#DCF3FC]">{glossText(selected.title,locale)}</p><p className="mt-3 text-sm text-[#C4DEE9] leading-7">{glossText(selected.summary,locale)}</p></div>
   <fieldset><legend className={label}>{ar?'03 — إضافات اختيارية':'03 — Optional extras'}</legend>
    <div className="mt-4 grid sm:grid-cols-2 gap-3">{GLOSSBAY.addons.map(a=><label key={a.slug} className={'cursor-pointer rounded-lg border p-4 flex gap-3 items-center text-sm font-bold '+(addons.includes(a.slug)?'border-[#4CCBF4] bg-[#1B4560]':'border-[#355B71] bg-[#172B40]')}>
     <input type="checkbox" className="accent-[#4CCBF4] w-5 h-5" checked={addons.includes(a.slug)} onChange={()=>toggle(a.slug)}/>{glossText(a,locale)}
    </label>)}</div>
   </fieldset>
   <div className="grid sm:grid-cols-2 gap-5">
    <label className={label}>{ar?'حالة السيارة':'Condition to assess'}<select className={field} value={condition} onChange={e=>setCondition(e.target.value)}>{CONDITIONS.map(([v,a,en])=><option value={v} key={v}>{ar?a:en}</option>)}</select></label>
    <label className={label}>{ar?'المنطقة العامة':'General region'}<select className={field} value={city} onChange={e=>setCity(e.target.value)}>{['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other'].map(c=><option key={c}>{c}</option>)}</select></label>
    <label className={label}>{ar?'تاريخ مفضل للاستفسار':'Preferred request date'}<input className={field} required type="date" min={minDate} max={maxDate} value={requestedDate} onChange={e=>setRequestedDate(e.target.value)}/></label>
    <label className={label}>{ar?'فترة مفضلة':'Preferred time window'}<select className={field} value={requestedWindow} onChange={e=>setRequestedWindow(e.target.value)}>{WINDOWS.map(([v,a,en])=><option value={v} key={v}>{ar?a:en}</option>)}</select></label>
    <label className={label}>{ar?'اسم للتواصل':'Contact name'}<input className={field} required minLength={2} maxLength={110} autoComplete="name" value={guestName} onChange={e=>setGuestName(e.target.value)}/></label>
    <label className={label}>{ar?'رقم الهاتف':'Contact phone'}<input className={field} required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" value={guestPhone} onChange={e=>setGuestPhone(e.target.value)}/></label>
   </div>
   <label className="flex items-start gap-3 text-xs leading-7 text-[#D0E9F5]"><input type="checkbox" required className="accent-[#4CCBF4] mt-1" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'موافق على حفظ بيانات الاتصال للتجربة فقط، ولن أرسل لوحة السيارة أو العنوان التفصيلي أو صور شخصية.':'I consent to saving the contact details for this website experience. I will not submit license plates, exact addresses or personal photographs.'}</span></label>
   <p className="text-sm leading-8 text-[#DAEFF7] border border-[#355B71] bg-[#183148] rounded-lg p-4 flex gap-3"><ShieldAlert size={21} className="shrink-0 text-[#82DCF8]"/>{ar?'لا يوجد سعر نهائي أو منتج حماية مضمون أو حجز حقيقي في هذه التجربة. نطاق العمل النهائي يحتاج معاينة وموافقة مشغل فعلي.':'No final price, real appointment, approved coating or operator warranty is supplied by this concept. An actual provider must confirm scope and terms.'}</p>
   {error&&<p role="alert" className="text-sm text-red-200 bg-red-950 p-4 rounded-lg">{error}</p>}
   <button disabled={busy||!consent} className="w-full min-h-14 bg-[#4CCBF4] hover:bg-[#82E5FC] disabled:opacity-50 rounded-lg px-6 py-4 text-[#0D1626] font-black text-sm">{busy?(ar?'جارٍ تسجيل الطلب...':'Saving request...'):(ar?'سجل طلب السعر الاسترشادي':'Save pending quote enquiry')}</button>
  </div>
 </form>;
}
