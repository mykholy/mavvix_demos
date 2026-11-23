'use client';
import { useMemo,useRef,useState } from 'react';
import { ARENA,arenaText } from '@/lib/verticals/sports-venues/data';
import type { Locale } from '@/lib/i18n/config';
import { Trophy, CalendarDays, CheckCircle2, AlertTriangle, Clock3, Users } from 'lucide-react';

const sessionLabels=[
 ['casual','مباراة عادية','Casual game'],
 ['training','تدريب','Practice'],
 ['friendly','مباراة ودية','Friendly match'],
 ['league_interest','استفسار عن دوري','League interest only']
] as const;
export function ArenaRequestForm({locale,initialCourt=''}:{locale:Locale;initialCourt?:string}){
 const ar=locale==='ar';
 const chosen=ARENA.services.find(s=>s.slug===initialCourt)||ARENA.services[0];
 const [serviceSlug,setServiceSlug]=useState(chosen.slug);
 const court=useMemo(()=>ARENA.services.find(s=>s.slug===serviceSlug)||ARENA.services[0],[serviceSlug]);
 const [duration,setDuration]=useState<number>(chosen.durations[0]);
 const [date,setDate]=useState('');
 const [start,setStart]=useState('18:30');
 const [region,setRegion]=useState('Cairo');
 const [sessionType,setSessionType]=useState('casual');
 const [name,setName]=useState(''),[phone,setPhone]=useState(''),[consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[receipt,setReceipt]=useState('');
 const key=useRef<string|null>(null);
 const minDate=useMemo(()=>new Date().toISOString().slice(0,10),[]);
 const maxDate=useMemo(()=>new Date(Date.now()+60*86400000).toISOString().slice(0,10),[]);
 const field='block text-xs font-black uppercase tracking-wider text-[#173D32]';
 const input='mt-2 w-full min-h-12 border-2 border-[#BECFC4] focus:border-[#275B40] bg-[#FFFDF7] rounded-md px-4 py-3 text-[#122D26] text-sm focus-visible:outline-[#F0B044]';
 function choose(slug:string){
  const next=ARENA.services.find(s=>s.slug===slug);
  if(!next)return;
  setServiceSlug(next.slug);setDuration(next.durations[0]);
 }
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||receipt)return;
  setBusy(true);setError('');
  try{
   if(!key.current)key.current=crypto.randomUUID();
   const query=new URLSearchParams(window.location.search);
   const body={flowType:'sports_venue_request',clientRequestId:key.current,serviceSlug,courtSlug:undefined,
    sport:court.sport,players:court.players,durationMinutes:duration,preferredDate:date,preferredStart:start,
    region,sessionType,guestName:name,guestPhone:phone,consent,honeypot:'',
    utm:{source:query.get('utm_source')||'',medium:query.get('utm_medium')||'',campaign:query.get('utm_campaign')||''}};
   const response=await fetch('/api/portfolio/sports-venues',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const result=await response.json();
   if(!response.ok||!result.success)throw Error(result.code||'REQUEST_NOT_SAVED');
   setReceipt(String(result.refNumber));
  }catch{setError(ar?'لم يتم حفظ الطلب. راجع اختيار الوقت والمدة والبيانات وحاول تاني.':'We could not save the request. Check court format, time, duration and contact details.');}
  finally{setBusy(false);}
 }
 if(receipt)return <section role="status" aria-live="polite" className="bg-[#F0B044] border-4 border-[#102B26] p-7 sm:p-12">
  <CheckCircle2 size={55} className="text-[#102B26]"/><h2 className="arena-display text-3xl sm:text-5xl font-black mt-7">{ar?'الطلب اتسجل':'REQUEST RECORDED'}</h2>
  <p className="text-sm leading-9 mt-5">{ar?'ده طلب وقت تفضيلي داخل تجربة مافكس. مفيش ملعب شغال أكد الحجز أو السعر أو طريقة الدفع.':'This is an illustrative preference request. No operating court has confirmed availability, price or payment.'}</p>
  <p className="mt-8 bg-[#102B26] text-white p-5 rounded-sm font-mono text-lg font-black">{receipt}</p>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center bg-[#102B26] text-white px-7 py-4 font-bold text-sm">{ar?'نفذ موقع لملعبك':'Build your venue website'}</a>
 </section>;
 return <form onSubmit={submit} className="bg-white border-2 border-[#C6D5CA] shadow-[0_24px_70px_rgba(9,38,31,.1)]">
  <div className="bg-[#102B26] text-white px-6 sm:px-9 py-7"><p className="text-[#F0B044] font-bold text-xs tracking-[.2em]">ARENA / GAME REQUEST</p><h2 className="arena-display text-3xl sm:text-4xl font-black mt-5">{ar?'كوّن المباراة في 3 خطوات':'BUILD YOUR GAME BRIEF'}</h2><p className="text-[#DFECE1] leading-8 text-sm mt-4">{ar?'اختار الصيغة والوقت والمجموعة، وبعدها هنحفظ تفضيلك كطلب تجريبي بدون أي حجز مؤكد.':'Select a play format, session preference and contact details to record a nonbinding enquiry.'}</p></div>
  <div className="p-5 sm:p-9 space-y-8">
   <fieldset><legend className={field}>{ar?'01 / اللعبة وصيغة الملعب':'01 / Sport & court format'}</legend>
    <div className="grid sm:grid-cols-2 gap-3 mt-4">{ARENA.services.map(s=><button key={s.slug} type="button" aria-pressed={serviceSlug===s.slug} onClick={()=>choose(s.slug)} className={'border-2 text-start p-4 min-h-[110px] '+(serviceSlug===s.slug?'bg-[#173F32] border-[#173F32] text-white':'bg-[#F5F8F4] border-[#CEDAD0] text-[#173F32]')}>
     <span className="block font-black text-sm leading-7">{arenaText(s.title,locale)}</span><span className={'mt-2 text-xs block '+(serviceSlug===s.slug?'text-[#F0D6A4]':'text-[#456653]')}>{s.sport==='padel'?'PADEL':'FOOTBALL'} · {s.players} {ar?'لاعب':'players'}</span>
    </button>)}</div>
   </fieldset>
   <div className="grid sm:grid-cols-2 gap-5">
    <label className={field}>{ar?'02 / عدد اللاعبين':'02 / Group size'}<div className="mt-2 min-h-12 bg-[#E6EFE5] border border-[#B7D0C1] px-5 py-3 text-base font-black flex items-center gap-3"><Users size={18}/>{court.players} {ar?'لاعب حسب صيغة اللعب':'players for this format'}</div></label>
    <label className={field}>{ar?'03 / المدة المطلوبة':'03 / Requested duration'}<select required className={input} value={duration} onChange={e=>setDuration(Number(e.target.value))}>{court.durations.map(m=><option key={m} value={m}>{m} {ar?'دقيقة':'min'}</option>)}</select></label>
    <label className={field}>{ar?'04 / يوم مفضل':'04 / Preferred date'}<input required type="date" min={minDate} max={maxDate} className={input} value={date} onChange={e=>setDate(e.target.value)}/></label>
    <label className={field}>{ar?'05 / وقت مفضل (مش موعد متاح)':'05 / Preferred start (not availability)'}<select required className={input} value={start} onChange={e=>setStart(e.target.value)}>{ARENA.windows.map(w=><option value={w} key={w}>{w}</option>)}</select></label>
    <label className={field}>{ar?'06 / منطقة الاستفسار':'06 / Enquiry region'}<select required className={input} value={region} onChange={e=>setRegion(e.target.value)}>{ARENA.regions.map(x=><option key={x}>{x}</option>)}</select></label>
    <label className={field}>{ar?'07 / طبيعة الجلسة':'07 / Play purpose'}<select className={input} value={sessionType} onChange={e=>setSessionType(e.target.value)}>{sessionLabels.map(([v,arabic,english])=><option value={v} key={v}>{ar?arabic:english}</option>)}</select></label>
    <label className={field}>{ar?'اسم للتواصل':'Contact name'}<input className={input} required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={e=>setName(e.target.value)}/></label>
    <label className={field}>{ar?'رقم موبايل':'Contact phone'}<input className={input} required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" value={phone} onChange={e=>setPhone(e.target.value)}/></label>
   </div>
   <label className="flex gap-3 text-sm leading-8 text-[#254D3B] items-start"><input className="accent-[#173F32] mt-2" type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ بيانات الطلب والتواصل داخل تجربة الموقع. لا أرسل بيانات أطفال أو بطاقات دفع.':'I consent to storing the entered contact details for this showcase enquiry, without payment or minors’ personal information.'}</span></label>
   <div className="flex gap-3 bg-[#FFF0D8] border-s-4 border-[#B97F1E] px-5 py-4 text-[#563F13] text-sm leading-8"><AlertTriangle className="shrink-0 mt-1" size={21}/><span>{ar?'المواعيد المعروضة أمثلة لوقت الطلب فقط؛ ملعب فعلي لا يؤكد هنا أي حجز أو إقامة دوري أو تأجير معدات.':'The selected time is illustrative. No operating venue has confirmed a court, league, equipment or price.'}</span></div>
   {error&&<p role="alert" className="bg-red-50 text-red-800 rounded-sm p-4 text-sm">{error}</p>}
   <button type="submit" disabled={busy||!consent} className="w-full bg-[#F0B044] text-[#102B26] min-h-14 px-6 py-4 font-black text-sm hover:bg-[#F6C26B] disabled:opacity-50">{busy?(ar?'جاري حفظ التفضيل':'SAVING...'):(ar?'سجل تفضيل الوقت':'SAVE MY TIME PREFERENCE')}</button>
  </div>
 </form>;
}
