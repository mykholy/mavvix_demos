'use client';
import { useMemo, useRef, useState } from 'react';
import { VELORA,veloraText } from '@/lib/verticals/salon-spa/data';
import type { Locale } from '@/lib/i18n/config';
import { ArrowUpRight, CheckCircle2, CalendarDays, Clock3, Sparkles, AlertCircle, Heart } from 'lucide-react';

const WINDOWS=[['flexible','موعد مرن','Flexible'],['morning','صباحًا','Morning'],['afternoon','بعد الظهر','Afternoon'],['evening','مساءً','Evening']] as const;
const EXPERTS=[['any','بدون تفضيل','No preference'],['hair-stylist','تخصص الشعر','Hair styling specialty'],
 ['nail-artist','تخصص الأظافر','Nail services specialty'],['wellness-specialist','جلسات العناية','Wellbeing ritual specialty']] as const;
const OCCASIONS=[['everyday','عناية يومية','Everyday'],['occasion','مناسبة خاصة','Special occasion'],
 ['bridal','تجهيز عروسة','Bridal styling'],['self-care','وقت لنفسي','Self-care'],['unsure','لم أقرر بعد','Not sure']] as const;
export function VeloraAppointmentForm({locale,initialService=''}:{locale:Locale;initialService?:string}){
 const ar=locale==='ar';
 const selectedInitial=VELORA.services.find(s=>s.slug===initialService)||VELORA.services[0];
 const [serviceSlug,setServiceSlug]=useState(selectedInitial.slug);
 const service=useMemo(()=>VELORA.services.find(s=>s.slug===serviceSlug)||VELORA.services[0],[serviceSlug]);
 const [duration,setDuration]=useState<number>(selectedInitial.durations[0]);
 const [staff,setStaff]=useState('any');
 const [date,setDate]=useState('');
 const [preferredWindow,setPreferredWindow]=useState('flexible');
 const [region,setRegion]=useState('Cairo');
 const [occasion,setOccasion]=useState('everyday');
 const [name,setName]=useState('');
 const [phone,setPhone]=useState('');
 const [consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[receipt,setReceipt]=useState('');
 const key=useRef<string|null>(null);
 const minDate=useMemo(()=>new Date().toISOString().slice(0,10),[]);
 const maxDate=useMemo(()=>new Date(Date.now()+90*86400000).toISOString().slice(0,10),[]);
 const expected=service.category==='hair'||service.category==='occasion'?'hair-stylist':service.category==='nails'?'nail-artist':'wellness-specialist';
 function choose(slug:string){
  const next=VELORA.services.find(s=>s.slug===slug);
  if(!next)return;
  setServiceSlug(next.slug);setDuration(next.durations[0]);setStaff('any');
 }
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||receipt)return;
  setError('');setBusy(true);
  try{
   if(!key.current)key.current=crypto.randomUUID();
   const params=new URLSearchParams(window.location.search);
   const body={flowType:'salon_appointment_interest',clientRequestId:key.current,serviceSlug,
    durationMinutes:duration,staffPreference:staff,preferredDate:date,preferredWindow:preferredWindow,region,occasion,
    guestName:name,guestPhone:phone,consent,honeypot:'',
    utm:{source:params.get('utm_source')||'',medium:params.get('utm_medium')||'',campaign:params.get('utm_campaign')||''}};
   const response=await fetch('/api/portfolio/salon-spa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const data=await response.json();
   if(!response.ok||!data.success)throw Error(data.code||'REQUEST_FAILED');
   setReceipt(String(data.refNumber));
  }catch{setError(ar?'تعذر تسجيل الطلب. راجعي الخدمة والمدة والتاريخ وحاولي مرة ثانية.':'Could not save the request. Check the service, duration, date and contact details.');}
  finally{setBusy(false);}
 }
 const field='block text-sm font-extrabold text-[#563440]';
 const input='mt-2 block w-full border border-[#CBB7BE] rounded-none bg-[#FFFDF9] px-4 py-3.5 text-[#4B2834] text-sm outline-offset-2 focus-visible:outline-[#8B5362]';
 if(receipt)return <section className="rounded-[2rem] bg-[#FFFDF9] border border-[#BA98A0] shadow-xl p-8 sm:p-12 text-center" role="status" aria-live="polite">
  <CheckCircle2 className="mx-auto text-[#32745B]" size={48}/><h2 className="velora-display text-3xl sm:text-4xl mt-6">{ar?'تم حفظ طلب الاهتمام':'Your enquiry has been saved'}</h2>
  <p className="text-[#6A4A54] text-sm leading-8 mt-6">{ar?'هذا رقم مرجعي لتجربة موقع من مافكس. لم يُحدد موعد مع صالون حقيقي، ولا تم اختيار موظف أو تأكيد خدمة.':'This reference is a Mavvix website demonstration record. No live salon, professional or appointment has been confirmed.'}</p>
  <div className="mt-8 bg-[#F5E9E7] p-5 font-mono text-xl font-bold tracking-wide">{receipt}</div>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 bg-[#4B2834] text-[#FFF9F4] font-bold text-sm">{ar?'اعملي موقع زي ده لصالونك':'Build a site like this for your salon'}<ArrowUpRight size={18}/></a>
 </section>;
 return <form onSubmit={submit} className="bg-[#FFFDF9] rounded-[2rem] border border-[#DCC8C5] shadow-[0_24px_90px_rgba(75,40,52,.08)] overflow-hidden">
  <div className="bg-[#F4E8E5] p-7 sm:p-9"><span className="uppercase tracking-[.25em] text-xs text-[#854D5C] font-bold">THE VELORA BOOKING EDIT</span><h2 className="velora-display text-3xl sm:text-4xl mt-4">{ar?'ابدئي باختيار التجربة المناسبة':'Curate your appointment enquiry'}</h2>
   <p className="mt-4 text-sm leading-8 text-[#694B55]">{ar?'حددي الخدمة والوقت المفضل عشان تجربة النموذج تكون واضحة. المواعيد والأشخاص هنا تفضيلات، مش تأكيدات حقيقية.':'Choose the service and preferred time so the request is structured. Durations are examples and do not represent an actual bookable salon calendar.'}</p>
  </div>
  <div className="p-6 sm:p-10 space-y-8">
   <fieldset><legend className="text-sm font-extrabold text-[#563440] mb-4">{ar?'01 / اختاري نوع الخدمة':'01 / Choose a treatment category'}</legend>
    <div className="grid sm:grid-cols-2 gap-3">{VELORA.services.map(s=><button type="button" key={s.slug} aria-pressed={s.slug===serviceSlug} onClick={()=>choose(s.slug)}
     className={'min-h-[80px] p-4 border text-start transition-colors '+(s.slug===serviceSlug?'bg-[#4B2834] border-[#4B2834] text-white':'bg-[#FFFDF9] border-[#DCC8C5] hover:bg-[#F4E8E5] text-[#4B2834]')}>
     <span className="block font-extrabold text-sm">{veloraText(s.title,locale)}</span><span className={'block mt-2 text-xs '+(s.slug===serviceSlug?'text-[#F9DEDC]':'text-[#6B5158]')}>{s.durations[0]}–{s.durations.at(-1)} {ar?'دقيقة تقديرية':'illustrative minutes'}</span>
    </button>)}</div>
   </fieldset>
   <div className="grid sm:grid-cols-2 gap-6">
    <label className={field}>{ar?'02 / مدة الخدمة (تقريبية)':'02 / Estimated duration'}<select className={input} value={duration} onChange={e=>setDuration(Number(e.target.value))}>{service.durations.map(m=><option value={m} key={m}>{m} {ar?'دقيقة':'minutes'}</option>)}</select></label>
    <label className={field}>{ar?'03 / تفضيل التخصص':'03 / Professional speciality preference'}<select className={input} value={staff} onChange={e=>setStaff(e.target.value)}>{EXPERTS.filter(([v])=>v==='any'||v===expected).map(([v,arText,en])=><option key={v} value={v}>{ar?arText:en}</option>)}</select></label>
    <label className={field}>{ar?'04 / اليوم المفضل':'04 / Preferred date'}<input type="date" min={minDate} max={maxDate} required className={input} value={date} onChange={e=>setDate(e.target.value)}/></label>
    <label className={field}>{ar?'05 / الفترة المناسبة':'05 / Time window'}<select className={input} value={preferredWindow} onChange={e=>setPreferredWindow(e.target.value)}>{WINDOWS.map(([v,arText,en])=><option key={v} value={v}>{ar?arText:en}</option>)}</select></label>
    <label className={field}>{ar?'06 / المنطقة العامة':'06 / General service region'}<select className={input} value={region} onChange={e=>setRegion(e.target.value)}>{['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other'].map(v=><option key={v}>{v}</option>)}</select></label>
    <label className={field}>{ar?'07 / طبيعة المناسبة':'07 / Reason for the visit'}<select className={input} value={occasion} onChange={e=>setOccasion(e.target.value)}>{OCCASIONS.map(([v,arText,en])=><option key={v} value={v}>{ar?arText:en}</option>)}</select></label>
    <label className={field}>{ar?'اسم للتواصل':'Contact name'}<input required minLength={2} maxLength={110} autoComplete="name" className={input} value={name} onChange={e=>setName(e.target.value)}/></label>
    <label className={field}>{ar?'رقم موبايل للتواصل':'Contact phone'}<input required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" className={input} value={phone} onChange={e=>setPhone(e.target.value)}/></label>
   </div>
   <label className="flex items-start gap-3 text-sm leading-7 text-[#64444F]"><input type="checkbox" required className="accent-[#4B2834] mt-1" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ بيانات الاتصال لهذا النموذج التوضيحي. لن أكتب بيانات صحية أو صور شخصية أو معلومات خاصة.':'I consent to saving contact information for this example. I will not share medical history, private images or sensitive personal details.'}</span></label>
   <div className="flex gap-3 p-5 bg-[#F4E8E5] text-[#563440] border-s-4 border-[#8B5362] text-sm leading-8"><AlertCircle className="shrink-0 mt-1" size={21}/><span>{ar?'اختيار التاريخ والمدة لا يؤكد وجود موظفة أو فرع أو وقت متاح؛ لا يتم دفع أي مبلغ أو تنفيذ حجز فعلي.':'Date and duration are preferences only. There is no actual salon staff availability, payment or confirmed appointment.'}</span></div>
   {error&&<p role="alert" className="p-4 bg-red-50 text-red-700 text-sm">{error}</p>}
   <button type="submit" disabled={busy||!consent} className="min-h-14 w-full rounded-full bg-[#4B2834] text-[#FFFDF9] font-extrabold text-sm px-7 py-4 hover:bg-[#6A3C4B] disabled:opacity-40 transition-colors">
    {busy?(ar?'جاري حفظ الطلب...':'Saving your enquiry...'):(ar?'احفظي طلب الاهتمام':'Save appointment enquiry')}
   </button>
  </div>
 </form>;
}
