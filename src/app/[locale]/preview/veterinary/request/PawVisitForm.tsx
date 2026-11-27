'use client';
import { useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath } from '@/lib/verticals/veterinary/data';
import { AlertTriangle, PawPrint, CheckCircle2, ArrowUpRight, ShieldCheck, CalendarDays } from 'lucide-react';

const windows=[
 ['flexible','أي وقت مناسب','Flexible'],['morning','صباحًا','Morning'],['afternoon','بعد الظهر','Afternoon'],['evening','مساءً','Evening']
] as const;
const regions=['Cairo','Giza','Alexandria','Riyadh','Jeddah','Other'] as const;
export function PawVisitForm({locale,initialService=''}:{locale:Locale;initialService?:string}){
 const ar=locale==='ar';
 const initial=PAWWELL.services.find(s=>s.slug===initialService)||PAWWELL.services[0];
 const [species,setSpecies]=useState('dog');
 const [ageBand,setAgeBand]=useState('adult');
 const [serviceSlug,setServiceSlug]=useState(initial.slug);
 const [preferredDate,setPreferredDate]=useState('');
 const [preferredWindow,setPreferredWindow]=useState('flexible');
 const [visitPreference,setVisitPreference]=useState('clinic');
 const [region,setRegion]=useState('Cairo');
 const [guestName,setGuestName]=useState('');
 const [guestPhone,setGuestPhone]=useState('');
 const [consent,setConsent]=useState(false);
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState('');
 const [receipt,setReceipt]=useState('');
 const key=useRef<string|null>(null);
 const allowed=useMemo(()=>PAWWELL.services.filter(s=>s.species.includes(species)),[species]);
 const minDay=useMemo(()=>new Date().toISOString().slice(0,10),[]);
 const maxDay=useMemo(()=>new Date(Date.now()+90*86400000).toISOString().slice(0,10),[]);
 function chooseSpecies(value:string){setSpecies(value);const next=PAWWELL.services.find(s=>s.slug===serviceSlug);if(!next?.species.includes(value)){setServiceSlug(PAWWELL.services.find(s=>s.species.includes(value))?.slug||'wellness-visit');}}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(loading||receipt)return;
  setError('');setLoading(true);
  try{
   if(!key.current)key.current=crypto.randomUUID();
   const query=new URLSearchParams(window.location.search);
   const response=await fetch('/api/portfolio/veterinary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    flowType:'veterinary_visit_interest',clientRequestId:key.current,
    species,ageBand,serviceSlug,preferredDate,preferredWindow,visitPreference,region,
    guestName,guestPhone,consent,honeypot:'',
    utm:{source:query.get('utm_source')||'',medium:query.get('utm_medium')||'',campaign:query.get('utm_campaign')||''}
   })});
   const data=await response.json();
   if(!response.ok||!data.success)throw Error(data.code||'REQUEST_FAILED');
   setReceipt(String(data.refNumber));
  }catch{setError(ar?'تعذر حفظ الطلب. راجع البيانات وحاول مرة ثانية.':'Could not save the request. Check the information and retry.');}
  finally{setLoading(false);}
 }
 const field='block text-sm font-black text-[#24463D]';
 const input='mt-2 w-full rounded-xl bg-white border border-[#BBCFBB] px-4 py-3.5 text-sm text-[#24463D] focus-visible:outline focus-visible:outline-[#8C5A3A]';
 if(receipt)return <section role="status" aria-live="polite" className="rounded-[2rem] border border-[#A9CBB7] p-8 sm:p-12 bg-white shadow-xl text-center">
  <CheckCircle2 className="mx-auto text-[#3B7B58]" size={49}/><h2 className="text-2xl sm:text-3xl font-black mt-5">{ar?'تم تسجيل طلب الزيارة':'Visit interest saved'}</h2>
  <p className="text-sm leading-8 text-[#49665A] mt-5">{ar?'ده رقم مرجعي لتجربة موقع بيطري من مافكس فقط. لا توجد عيادة أو طبيب أو موعد محجوز بالفعل.':'Your request reference belongs to this Mavvix portfolio experience; no operating veterinary clinic or confirmed doctor appointment is involved.'}</p>
  <div className="rounded-xl mt-7 p-5 bg-[#EDF2E8] font-mono font-bold text-xl">{receipt}</div>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#24463D] text-white text-sm font-black">{ar?'اطلب تنفيذ موقع لعيادتك':'Build a site for your clinic'}<ArrowUpRight size={18}/></a>
 </section>;
 return <form onSubmit={submit} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_26px_80px_rgba(36,70,61,.1)] border border-[#D3E3D3]">
  <div className="bg-[#E8EFE4] p-7 sm:p-10"><PawPrint size={30} className="text-[#9A6040]"/><p className="text-xs uppercase tracking-widest font-black text-[#93583C] mt-4">A VISIT, THOUGHTFULLY PREPARED</p>
   <h2 className="text-2xl sm:text-3xl mt-3 font-black">{ar?'خلينا نبدأ بنوع صديقك':'Start with your companion'}</h2><p className="text-sm text-[#49665A] leading-8 mt-4">{ar?'اختار نوع الحيوان وسبب الزيارة وتفضيلك للموعد. الاستفسار لا يحجز طبيبًا فعليًا.':'Select a species, general care reason and a preferred visit window. This is not a real veterinary booking.'}</p>
  </div>
  <div className="p-6 sm:p-9 space-y-8">
   <fieldset><legend className="font-black text-sm mb-4">{ar?'01 / نوع الحيوان':'01 / Pet species'}</legend>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{PAWWELL.species.map(p=><button type="button" key={p.id} onClick={()=>chooseSpecies(p.id)} aria-pressed={species===p.id} className={'rounded-xl p-4 min-h-14 border text-sm font-bold '+(species===p.id?'bg-[#24463D] text-white border-[#24463D]':'bg-[#F7F9F5] border-[#D4E1D2]')}>{p[locale]}</button>)}</div>
   </fieldset>
   <div className="grid sm:grid-cols-2 gap-5">
    <label className={field}>{ar?'02 / الفئة العمرية':'02 / Age band'}<select aria-label={ar?'02 / الفئة العمرية':'02 / Age band'} value={ageBand} className={input} onChange={e=>setAgeBand(e.target.value)}>{PAWWELL.ageBands.map(a=><option key={a.id} value={a.id}>{a[locale]}</option>)}</select></label>
    <label className={field}>{ar?'03 / مجال الزيارة':'03 / Care service'}<select aria-label={ar?'03 / مجال الزيارة':'03 / Care service'} value={serviceSlug} className={input} onChange={e=>setServiceSlug(e.target.value)}>{allowed.map(s=><option key={s.slug} value={s.slug}>{s.title[locale]}</option>)}</select></label>
    <label className={field}>{ar?'04 / يوم مفضل (غير مؤكد)':'04 / Preferred day (not confirmed)'}<input aria-label={ar?'04 / يوم مفضل':'04 / Preferred day'} type="date" required min={minDay} max={maxDay} value={preferredDate} className={input} onChange={e=>setPreferredDate(e.target.value)}/></label>
    <label className={field}>{ar?'05 / فترة مفضلة':'05 / Preferred time window'}<select aria-label={ar?'05 / فترة مفضلة':'05 / Preferred time window'} value={preferredWindow} className={input} onChange={e=>setPreferredWindow(e.target.value)}>{windows.map(([id,arabic,english])=><option key={id} value={id}>{ar?arabic:english}</option>)}</select></label>
    <label className={field}>{ar?'06 / المنطقة العامة':'06 / General region'}<select aria-label={ar?'06 / المنطقة العامة':'06 / General region'} value={region} className={input} onChange={e=>setRegion(e.target.value)}>{regions.map(r=><option key={r}>{r}</option>)}</select></label>
    <label className={field}>{ar?'07 / وسيلة الزيارة':'07 / Visit preference'}<select aria-label={ar?'07 / وسيلة الزيارة':'07 / Visit preference'} value={visitPreference} className={input} onChange={e=>setVisitPreference(e.target.value)}><option value="clinic">{ar?'زيارة عيادة إذا توفر مقدم خدمة':'Clinic visit if offered'}</option><option value="unsure">{ar?'أحتاج أعرف الخيارات':'Need help choosing'}</option></select></label>
    <label className={field}>{ar?'اسم ولي أمر الحيوان':'Pet guardian name'}<input aria-label={ar?'اسم ولي أمر الحيوان':'Pet guardian name'} autoComplete="name" required minLength={2} maxLength={110} value={guestName} className={input} onChange={e=>setGuestName(e.target.value)}/></label>
    <label className={field}>{ar?'رقم تواصل':'Contact number'}<input aria-label={ar?'رقم تواصل':'Contact number'} type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{8,24}" value={guestPhone} className={input} onChange={e=>setGuestPhone(e.target.value)}/></label>
   </div>
   <div className="flex gap-3 items-start rounded-xl bg-[#F8E7DA] p-5"><AlertTriangle size={24} className="shrink-0 text-[#89452F]"/><p className="text-sm leading-8 text-[#653C2C]">{ar?'لو الحيوان عنده مشكلة تنفس شديدة أو تشنجات أو نزيف أو تسمم أو غير قادر يتبول، تواصل فورًا مع طوارئ بيطرية فعلية. لا تنتظر رد هذا النموذج.':'For severe breathing issues, seizures, bleeding, poisoning or inability to urinate, contact an actual emergency veterinary provider. Never wait for this form.'}</p></div>
   <label className="flex gap-3 text-sm items-start leading-8 text-[#3B5D51]"><input aria-label={ar?'الموافقة على شروط الاستفسار والتواصل':'Consent to administrative showcase contact terms'} type="checkbox" required className="accent-[#24463D] mt-2" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ بيانات التواصل العامة لتجربة طلب الزيارة فقط، ولن أرسل تفاصيل تشخيص أو صور أو ملفات طبية خاصة.':'I consent to saving basic contact details for this example request. I will not submit clinical histories, diagnostic files or private pet images.'}</span></label>
   {error&&<p role="alert" className="text-red-800 p-4 bg-red-50 rounded-xl text-sm">{error}</p>}
   <button disabled={loading||!consent} type="submit" className="w-full rounded-full bg-[#24463D] px-8 py-4 min-h-14 text-sm font-black text-white disabled:opacity-40 hover:bg-[#35594B]">{loading?(ar?'جاري حفظ الطلب':'Saving your request...'):(ar?'احفظ طلب الزيارة':'Save visit preference')}</button>
  </div>
 </form>;
}
