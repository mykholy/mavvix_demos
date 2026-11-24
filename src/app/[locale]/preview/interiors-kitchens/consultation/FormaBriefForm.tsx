'use client';
import { useMemo,useRef,useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { FORMA,formaText } from '@/lib/verticals/interiors-kitchens/data';
import { Ruler,CheckCircle2,ArrowUpRight,AlertCircle,Grid2X2,PenTool } from 'lucide-react';

const layoutLabels:Record<string,{ar:string;en:string}>={
 L:{ar:'حرف L',en:'L-shaped'},U:{ar:'حرف U',en:'U-shaped'},galley:{ar:'متوازي',en:'Galley'},
 'single-wall':{ar:'حائط واحد',en:'Single-wall'},island:{ar:'مع جزيرة',en:'Island preference'},
};
const optionNames={
 finish:{matte:{ar:'مطفي',en:'Matte'},'wood-look':{ar:'تأثير خشب',en:'Wood-look'},lacquer:{ar:'لاكيه',en:'Lacquer'},mixed:{ar:'مزيج خامات',en:'Mixed material'}} as Record<string,{ar:string;en:string}>,
 countertop:{quartz:{ar:'كوارتز استرشادي',en:'Quartz concept'},'solid-surface':{ar:'سطح صناعي',en:'Solid surface'},laminate:{ar:'لامينيت',en:'Laminate'},undecided:{ar:'لسه بختار',en:'Undecided'}} as Record<string,{ar:string;en:string}>,
 budget:{researching:{ar:'بدور على أفكار',en:'Researching'},'under-100k-egp':{ar:'أقل من 100 ألف جنيه',en:'Below EGP 100k'},'100k-250k-egp':{ar:'100 إلى 250 ألف جنيه',en:'EGP 100k–250k'},'250k-plus-egp':{ar:'أكثر من 250 ألف جنيه',en:'EGP 250k+'},'quotation-needed':{ar:'محتاج مقايسة',en:'Need a real quote'}} as Record<string,{ar:string;en:string}>,
 timeline:{exploring:{ar:'بستكشف',en:'Exploring'},'1-3-months':{ar:'من 1 إلى 3 شهور',en:'1–3 months'},'3-6-months':{ar:'من 3 إلى 6 شهور',en:'3–6 months'},'6-months-plus':{ar:'بعد 6 شهور',en:'6+ months'}} as Record<string,{ar:string;en:string}>,
};
const wallCount:Record<string,number>={L:2,U:3,galley:2,'single-wall':1,island:2};
export function FormaBriefForm({locale,initial='l-shaped'}:{locale:Locale;initial?:string}){
 const ar=locale==='ar';const first=FORMA.services.some(s=>s.slug===initial)?initial:'l-shaped';
 const [serviceSlug,setServiceSlug]=useState(first),[layout,setLayout]=useState('L');
 const [lengths,setLengths]=useState([320,280,240]),[floorArea,setFloorArea]=useState(15);
 const [finish,setFinish]=useState('matte'),[countertop,setCountertop]=useState('undecided');
 const [budget,setBudget]=useState('researching'),[timeline,setTimeline]=useState('exploring'),[area,setArea]=useState('Cairo');
 const [name,setName]=useState(''),[phone,setPhone]=useState(''),[consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[ref,setRef]=useState('');
 const requestId=useRef<string|null>(null);
 const run=useMemo(()=>lengths.slice(0,wallCount[layout]).reduce((sum,x)=>sum+x,0),[layout,lengths]);
 const field='block text-sm font-extrabold text-[#473B37]';
 const input='block w-full mt-2 px-4 py-3.5 bg-[#FFFCF8] border border-[#BCAE9D] text-sm text-[#272827] focus-visible:outline-[#6C3538]';
 function layoutChange(value:string){setLayout(value);requestId.current=null;}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||ref)return;
  setBusy(true);setError('');
  try{
   if(!requestId.current)requestId.current=crypto.randomUUID();
   const q=new URLSearchParams(window.location.search);
   const body={
    flowType:'interior_design_brief',clientRequestId:requestId.current,serviceSlug,
    layout,wallLengthsCm:lengths.slice(0,wallCount[layout]),floorAreaSqm:floorArea,
    finish,countertop,budgetBand:budget,timeline,area,guestName:name,guestPhone:phone,
    honeypot:'',consent,utm:{source:q.get('utm_source')||'',medium:q.get('utm_medium')||'',campaign:q.get('utm_campaign')||''}
   };
   const response=await fetch('/api/portfolio/interiors-kitchens',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const result=await response.json();
   if(!response.ok||!result.success)throw new Error(result.code||'FAILED');
   setRef(result.refNumber);
  }catch{setError(ar?'تعذر حفظ الطلب. راجع المقاسات وتفاصيل التواصل ثم حاول مرة ثانية.':'Unable to save this brief. Check dimensions and contact information, then retry.');}
  finally{setBusy(false);}
 }
 if(ref)return <div role="status" aria-live="polite" className="p-10 sm:p-14 bg-[#FFFCF8] border-2 border-[#6C3538] text-center">
  <CheckCircle2 size={48} className="mx-auto text-[#547960]"/><h2 className="forma-display text-3xl sm:text-4xl mt-7">{ar?'تم حفظ فكرة المشروع':'Your design brief is saved'}</h2>
  <p className="text-[#58473E] leading-9 mt-5">{ar?'المرجع يخص تجربة الموقع فقط. لم تتم معاينة المنزل أو اعتماد المقاسات أو تصميم ثلاثي الأبعاد أو عرض سعر أو موعد حقيقي.':'This reference belongs to a Mavvix website experience. No real home survey, detailed plan, price, manufacturing order or appointment has been approved.'}</p>
  <p className="mt-7 p-4 bg-[#EFE5DA] font-mono font-extrabold text-xl">{ref}</p>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center bg-[#6C3538] px-8 py-4 text-white text-sm font-bold mt-8">{ar?'اطلب موقع زي ده لنشاطك':'Get a website for your studio'}<ArrowUpRight size={17}/></a>
 </div>;
 return <form onSubmit={submit} className="bg-[#FFFCF8] border border-[#CCBCAA] p-6 sm:p-10 space-y-8 shadow-[0_25px_80px_rgba(39,40,39,.07)]">
  <div className="border-b border-[#D7C8B9] pb-7"><p className="font-mono text-[#6C3538] text-xs font-bold tracking-widest">FORMA / DESIGN INTAKE — 01</p>
   <h2 className="forma-display text-3xl sm:text-4xl mt-4">{ar?'خلّينا نرسم أول تصور':'Start with an honest room brief'}</h2>
   <p className="text-[#65534B] text-sm leading-8 mt-4">{ar?'دي خطوة استكشافية، مش رسم معتمد للتصنيع أو حساب سعر.':'This is only a preliminary brief, not a measured production plan or binding quote.'}</p>
  </div>
  <div><label htmlFor="forma-design-scope" className={field}>{ar?'المجال أو نوع المشروع':'Design scope'}</label>
   <select id="forma-design-scope" className={input} value={serviceSlug} onChange={e=>setServiceSlug(e.target.value)}>{FORMA.services.map(s=><option key={s.slug} value={s.slug}>{formaText(s.title,locale)}</option>)}</select>
  </div>
  <fieldset><legend className={field}>{ar?'شكل المساحة المفضل':'Initial layout idea'}</legend>
   <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3">{FORMA.layouts.map(l=><button key={l} type="button" onClick={()=>layoutChange(l)} aria-pressed={layout===l}
    className={'p-3 min-h-16 text-xs font-black border-2 '+(layout===l?'bg-[#6C3538] border-[#6C3538] text-white':'border-[#CBB9AA] hover:bg-[#EEE4DA]')}>{layoutLabels[l][locale]}</button>)}</div>
  </fieldset>
  <div className="grid lg:grid-cols-[.85fr_1fr] gap-7 items-center p-6 bg-[#EFE5D9]">
   <div aria-label={ar?'رسم توضيحي لشكل المطبخ، ليس مخططًا تنفيذيا':'Schematic layout, not construction-ready plan'}>
    <svg width="100%" viewBox="0 0 220 220" role="img" aria-label={ar?'مخطط مبدئي لمواضع الخزائن':'Illustrative cabinet-run diagram'} className="max-w-[300px] mx-auto">
     <rect x="11" y="11" width="198" height="198" rx="4" fill="#F8F2E9" stroke="#9F8B77" strokeWidth="2"/>
     <rect x="17" y="17" width="186" height="186" fill="none" stroke="#CCBFAF" strokeDasharray="5 6" strokeWidth="2"/>
     <rect x="25" y="25" width="170" height="27" fill="#6C3538"/>
     {layout!=='single-wall'&&<rect x="25" y="25" width="27" height="170" fill="#6C3538"/>}
     {layout==='U'&&<rect x="169" y="25" width="26" height="170" fill="#6C3538"/>}
     {layout==='galley'&&<rect x="25" y="169" width="170" height="26" fill="#6C3538"/>}
     {layout==='island'&&<rect x="85" y="100" width="67" height="37" fill="#B9866B" stroke="#6C3538" strokeWidth="1.5"/>}
     <text x="111" y="118" dominantBaseline="middle" textAnchor="middle" fill="#272827" fontSize="10">FORMA</text>
     <text x="110" y="214" textAnchor="middle" fill="#6C3538" fontSize="9">NOT TO SCALE</text>
    </svg>
   </div>
   <div><h3 className="forma-display text-2xl font-bold">{ar?'تخطيط توضيحي قابل للتغيير':'Concept layout — subject to survey'}</h3>
    <p className="mt-3 text-[#5F5045] text-sm leading-8">{ar?'رسم مبسط لعدد جوانب الخزائن. لا يوضح فتحات الأجهزة أو مسافات الأمان؛ المتخصص يراجعها بعد قياس الموقع.':'A visual starting point for cabinet runs, not appliance locations or safe clearances. The operator must verify everything in a site survey.'}</p>
    <p className="text-xs font-mono mt-5 text-[#6C3538]">{ar?'أطوال حوائط مبدئية:':'Preliminary wall-run sum:'} <b>{run} cm</b></p>
   </div>
  </div>
  <fieldset><legend className={field}>{ar?'مقاسات استرشادية بالسنتيمتر (120 إلى 1200)':'Approximate wall lengths in centimetres (120–1200)'}</legend>
   <div className="grid sm:grid-cols-3 gap-4 mt-4">{Array.from({length:wallCount[layout]},(_,i)=><label key={i} className="text-xs font-semibold text-[#58473E]">
    {ar?'حائط':'Wall'} {i+1}
    <input required type="number" step="1" min="120" max="1200" value={lengths[i]} onChange={e=>setLengths(prev=>prev.map((x,k)=>k===i?Number(e.target.value):x))} className={input}/>
   </label>)}</div>
  </fieldset>
  <div className="grid sm:grid-cols-2 gap-6">
   <label className={field}>{ar?'مساحة الغرفة التقريبية (م²)':'Approximate room area (m²)'}<input type="number" required min="3" max="500" step=".5" className={input} value={floorArea} onChange={e=>setFloorArea(Number(e.target.value))}/></label>
   <label className={field}>{ar?'تشطيب الواجهات':'Cabinet face direction'}<select value={finish} onChange={e=>setFinish(e.target.value)} className={input}>{FORMA.finishFamilies.map(x=><option value={x} key={x}>{optionNames.finish[x][locale]}</option>)}</select></label>
   <label className={field}>{ar?'سطح العمل المفضل':'Countertop preference'}<select value={countertop} onChange={e=>setCountertop(e.target.value)} className={input}>{FORMA.countertops.map(x=><option value={x} key={x}>{optionNames.countertop[x][locale]}</option>)}</select></label>
   <label className={field}>{ar?'نطاق الميزانية (للتخطيط فقط)':'Planning budget band'}<select value={budget} onChange={e=>setBudget(e.target.value)} className={input}>{FORMA.budgetBands.map(x=><option value={x} key={x}>{optionNames.budget[x][locale]}</option>)}</select></label>
   <label className={field}>{ar?'الوقت المفضل للمشروع':'Intended timeline'}<select value={timeline} onChange={e=>setTimeline(e.target.value)} className={input}>{FORMA.timelines.map(x=><option value={x} key={x}>{optionNames.timeline[x][locale]}</option>)}</select></label>
   <label className={field}>{ar?'المنطقة العامة بدون عنوان':'General city / region, no street address'}<select value={area} onChange={e=>setArea(e.target.value)} className={input}>{FORMA.areas.map(x=><option value={x} key={x}>{x}</option>)}</select></label>
   <label className={field}>{ar?'الاسم':'Contact name'}<input value={name} onChange={e=>setName(e.target.value)} minLength={2} maxLength={110} required autoComplete="name" className={input}/></label>
   <label className={field}>{ar?'رقم الهاتف':'Contact phone'}<input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" minLength={8} maxLength={24} pattern="[+0-9 ()-]{8,24}" required autoComplete="tel" className={input}/></label>
  </div>
  <label className="flex gap-3 items-start text-sm text-[#58473E] leading-8"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-2 accent-[#6C3538]"/><span>{ar?'أوافق على حفظ معلومات التواصل والتفضيلات لهذا النموذج فقط. لا أقدم عنوان منزل كامل أو مخططًا سريًا أو بيانات ملكية.':'I consent to storing this example\'s contact and design preferences. I will not share a full street address, confidential plans or property documents.'}</span></label>
  <p className="border-s-4 border-[#B9866B] bg-[#F0E5DB] p-4 text-sm text-[#58473E] leading-8 flex gap-3"><AlertCircle size={22} className="shrink-0 mt-1"/>{ar?'لا يوجد عرض سعر نهائي ولا تصميم معماري معتمد؛ التوصيلات والتراخيص والمتطلبات الفنية يراجعها المشغل الفعلي.':'No final price, licensed engineering drawing or fabrication authorization is generated. A real operator must verify measurements, material specs and utilities.'}</p>
  {error&&<p role="alert" className="p-4 bg-red-50 text-red-700 text-sm">{error}</p>}
  <button disabled={!consent||busy} className="w-full min-h-14 bg-[#6C3538] text-white px-8 py-4 font-extrabold disabled:opacity-40" type="submit">{busy?(ar?'جارٍ حفظ الفكرة':'Saving brief'):(ar?'احفظ طلب استشارة التصميم':'Save design consultation brief')}</button>
 </form>;
}
