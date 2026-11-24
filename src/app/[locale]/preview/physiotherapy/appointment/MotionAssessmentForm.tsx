'use client';
import { useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { MOTION,motionText } from '@/lib/verticals/physiotherapy/data';
import { CheckCircle2,ShieldCheck,LockKeyhole,ArrowUpRight,CalendarDays,Footprints,HeartPulse,Info } from 'lucide-react';

const GOALS=[['daily-movement','وظائف الحياة اليومية','Daily movement'],['sport-readiness','العودة للنشاط','Sport return'],['workplace-function','أنشطة العمل','Workplace movement'],['general-education','فهم برنامج الحركة','Movement education']] as const;
const VISITS=[['first-assessment','زيارة تقييم أولى','Initial assessment interest'],['follow-up-interest','استفسار متابعة','Follow-up interest']] as const;
const WINDOWS=[['flexible','فترة مرنة','Flexible'],['morning','صباحًا','Morning'],['afternoon','بعد الظهر','Afternoon'],['evening','مساءً','Evening']] as const;
export function MotionAssessmentForm({locale,service='',goal=''}:{locale:Locale;service?:string;goal?:string}){
 const ar=locale==='ar';
 const [step,setStep]=useState(0);
 const [serviceSlug,setServiceSlug]=useState(MOTION.services.some(s=>s.slug===service)?service:'initial-movement-assessment');
 const [visitType,setVisitType]=useState('first-assessment');
 const [goalType,setGoalType]=useState(GOALS.some(x=>x[0]===goal)?goal:'daily-movement');
 const [preferredDate,setPreferredDate]=useState('');
 const [preferredWindow,setPreferredWindow]=useState('flexible');
 const [region,setRegion]=useState('Cairo');
 const [guestName,setGuestName]=useState('');
 const [guestPhone,setGuestPhone]=useState('');
 const [consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[reference,setReference]=useState('');
 const id=useRef<string|null>(null);
 const input='mt-2 min-h-12 w-full border border-[#9EBCAE] rounded-xl bg-white text-[#23443F] px-4 py-3 focus-visible:ring-2 focus-visible:ring-[#2D826C] outline-none text-sm';
 const label='block font-extrabold text-sm text-[#23443F]';
 const today=new Date().toISOString().slice(0,10),maxDate=new Date(Date.now()+90*86400000).toISOString().slice(0,10);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||reference)return;
  setBusy(true);setError('');
  try{
   if(!id.current)id.current=crypto.randomUUID();
   const q=new URLSearchParams(window.location.search);
   const res=await fetch('/api/portfolio/physiotherapy',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({flowType:'physiotherapy_assessment_interest',clientRequestId:id.current,serviceSlug,
      visitType,goalType,preferredDate,preferredWindow,region,guestName,guestPhone,consent,honeypot:'',
      utm:{source:q.get('utm_source')||'',medium:q.get('utm_medium')||'',campaign:q.get('utm_campaign')||''}})
   });
   const data=await res.json();if(!res.ok||!data.success)throw Error(data.code||'REQUEST_NOT_SAVED');
   setReference(data.refNumber);
  }catch{setError(ar?'مش قادرين نسجل الاستفسار. راجع البيانات وحاول مرة أخرى.':'Could not save the request. Review the service, date and contact details and retry.');}
  finally{setBusy(false);}
 }
 if(reference)return <div role="status" aria-live="polite" className="rounded-[2.3rem] border-2 border-[#82B69D] bg-white p-8 sm:p-12 shadow-xl text-center">
  <CheckCircle2 className="mx-auto text-[#287459]" size={51}/><h2 className="motion-display text-3xl sm:text-4xl font-black mt-6">{ar?'اتسجل استفسارك بنجاح':'Your enquiry is recorded'}</h2>
  <p className="text-[#46695C] text-sm leading-9 mt-6">{ar?'هذه تجربة موقع توضيحية. المرجع المحفوظ لا يخص موعدًا طبيًا حقيقيًا، ولم يتم تكليف معالج أو تقديم تشخيص أو خدمة.':'This is an illustrative website request. Your reference does not confirm an actual therapist, appointment, assessment, diagnosis or care.'}</p>
  <div className="bg-[#E5F1E9] p-5 mt-7 rounded-xl font-mono font-extrabold text-xl">{reference}</div>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex gap-2 items-center bg-[#23443F] text-white px-8 py-4 rounded-full font-bold text-sm">{ar?'نفّذ موقعًا مثل هذا':'Build a website like this'}<ArrowUpRight size={18}/></a>
 </div>;
 return <div className="rounded-[2.3rem] overflow-hidden border border-[#BAD4C1] bg-[#FCFDF8] shadow-[0_22px_70px_rgba(20,65,48,.1)]">
  <div className="bg-[#23443F] p-7 sm:p-9 text-white"><p className="font-mono uppercase tracking-[.2em] text-xs font-bold text-[#C3EDD4]">MOTION LAB // FIRST CONTACT</p><h2 className="motion-display text-3xl sm:text-4xl font-black mt-4">{ar?'نبدأ باستفسار واضح، مش تشخيص إلكتروني':'An informed enquiry, never a web diagnosis'}</h2>
   <div className="grid grid-cols-3 gap-2 mt-8">{[ar?'المجال':'Your interest',ar?'الوقت':'Timing',ar?'التواصل':'Contact'].map((t,i)=><button type="button" key={i} onClick={()=>setStep(i)} disabled={i>step} aria-current={step===i?'step':undefined} className={'min-h-12 rounded-full px-2 text-xs font-bold border '+(step===i?'bg-[#B7E3C9] text-[#16362F] border-[#B7E3C9]':'text-[#E9F7EE] border-[#729784]')}>{i+1} · {t}</button>)}</div>
  </div>
  <div className="p-6 sm:p-9">
   {step===0&&<div className="space-y-7">
    <div><h3 className="text-xl font-black">{ar?'اختار مجال استفسارك':'Choose a broad area of interest'}</h3><p className="text-[#46695C] leading-8 text-sm mt-3">{ar?'مش مطلوب تكتب أعراض أو تشخيصات أو تقدم أشعة أو تقارير.':'Please do not share symptoms, medical records, scans or diagnostic details.'}</p></div>
    <label className={label}>{ar?'الخدمة التي تريد معرفة تفاصيلها':'Service information'}<select className={input} required value={serviceSlug} onChange={e=>setServiceSlug(e.target.value)}>{MOTION.services.map(s=><option key={s.slug} value={s.slug}>{motionText(s.title,locale)}</option>)}</select></label>
    <fieldset><legend className={label}>{ar?'إيه هدفك العام؟':'Broad functional interest'}</legend><div className="grid sm:grid-cols-2 gap-3 mt-4">{GOALS.map(([v,a,en])=><button key={v} type="button" aria-pressed={goalType===v} onClick={()=>setGoalType(v)} className={'rounded-2xl border px-5 py-4 font-bold text-sm text-start '+(goalType===v?'bg-[#23443F] text-white border-[#23443F]':'bg-white border-[#AFCCB9] text-[#23443F]')}>{ar?a:en}</button>)}</div></fieldset>
    <label className={label}>{ar?'طبيعة الزيارة':'Visit preference'}<select className={input} value={visitType} onChange={e=>setVisitType(e.target.value)}>{VISITS.map(([v,a,en])=><option key={v} value={v}>{ar?a:en}</option>)}</select></label>
    <button type="button" onClick={()=>setStep(1)} className="w-full min-h-14 rounded-full bg-[#23443F] text-white font-black text-sm">{ar?'التالي: موعد مفضل':'Next: preferred timing'}</button>
   </div>}
   {step===1&&<div className="space-y-7"><h3 className="text-xl font-black">{ar?'تفضيلات تنظيمية فقط':'Administrative preferences only'}</h3>
    <div className="grid sm:grid-cols-2 gap-5">
     <label className={label}>{ar?'المنطقة العامة':'General area'}<select className={input} value={region} onChange={e=>setRegion(e.target.value)}>{MOTION.intake.regions.map(x=><option key={x}>{x}</option>)}</select></label>
     <label className={label}>{ar?'تاريخ تفضله':'Preferred day'}<input className={input} required type="date" value={preferredDate} min={today} max={maxDate} onChange={e=>setPreferredDate(e.target.value)}/></label>
     <label className={label}>{ar?'فترة مناسبة':'Preferred time window'}<select className={input} value={preferredWindow} onChange={e=>setPreferredWindow(e.target.value)}>{WINDOWS.map(([v,a,en])=><option key={v} value={v}>{ar?a:en}</option>)}</select></label>
    </div>
    <div className="bg-[#E6F3E9] p-5 rounded-2xl border border-[#B5D2BC] flex gap-3 text-sm leading-8"><CalendarDays size={24} className="shrink-0 text-[#287459]"/><p>{ar?'الموعد هنا تفضيل لاستفسار، وليس موعد تقييم تم التأكيد عليه من عيادة أو أخصائي.':'A preferred day is not a real clinical calendar slot. An actual licensed operator would need to confirm it.'}</p></div>
    <div className="grid grid-cols-2 gap-3"><button type="button" onClick={()=>setStep(0)} className="rounded-full border border-[#23443F] py-4 font-bold text-sm">{ar?'السابق':'Back'}</button><button type="button" onClick={()=>setStep(2)} disabled={!preferredDate} className="rounded-full bg-[#23443F] text-white py-4 font-bold text-sm disabled:opacity-50">{ar?'التالي: بيانات التواصل':'Next: contact'}</button></div>
   </div>}
   {step===2&&<form onSubmit={submit} className="space-y-7"><h3 className="text-xl font-black">{ar?'بيانات متابعة قليلة وبموافقتك':'Minimal, consented contact details'}</h3>
    <div className="grid sm:grid-cols-2 gap-5"><label className={label}>{ar?'اسم للتواصل':'Contact name'}<input required autoComplete="name" minLength={2} maxLength={110} className={input} value={guestName} onChange={e=>setGuestName(e.target.value)}/></label>
     <label className={label}>{ar?'رقم الهاتف':'Phone'}<input required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" className={input} value={guestPhone} onChange={e=>setGuestPhone(e.target.value)}/></label></div>
    <label className="flex gap-3 items-start text-sm leading-8 text-[#365C4F]"><input type="checkbox" required className="mt-1 accent-[#23443F]" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ الاسم ورقم الهاتف والاختيارات الإدارية لهذه التجربة. لا توجد سجلات مرضى، وأتجنب إرسال بيانات طبية أو هوية شخصية حساسة.':'I consent to storing my contact and administrative preferences for this showcase. No clinical records are requested; I will not enter sensitive health or identity information.'}</span></label>
    <div className="bg-[#E6F3E9] p-5 rounded-xl border-s-4 border-[#287459] flex gap-3 text-xs leading-8"><LockKeyhole className="text-[#287459] shrink-0" size={21}/>{ar?'التجربة ليست عيادة أو طوارئ أو منصة تشخيص طبي. اتصل بخدمات الطوارئ المحلية عند حدوث حالة عاجلة.':'This is not a clinic, medical emergency service or diagnosis platform. Contact appropriate local emergency services for urgent medical help.'}</div>
    {error&&<p role="alert" className="p-4 bg-red-50 text-red-800 text-sm">{error}</p>}
    <div className="grid grid-cols-2 gap-3"><button type="button" onClick={()=>setStep(1)} className="rounded-full border border-[#23443F] py-4 font-bold text-sm">{ar?'السابق':'Back'}</button><button disabled={busy||!consent} type="submit" className="rounded-full bg-[#23443F] text-white py-4 font-black text-sm disabled:opacity-40">{busy?(ar?'جارٍ الحفظ':'Saving...'):(ar?'احفظ الاستفسار':'Save enquiry')}</button></div>
   </form>}
  </div>
 </div>;
}
