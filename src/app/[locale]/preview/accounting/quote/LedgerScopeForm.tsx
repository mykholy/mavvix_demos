'use client';
import { useRef,useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LEDGERPOINT,ledgerText } from '@/lib/verticals/accounting/data';
import { CheckCircle2,ShieldCheck,AlertTriangle,ArrowUpRight,ClipboardCheck } from 'lucide-react';
const opts={
 countries:[['egypt','مصر','Egypt'],['saudi-arabia','السعودية','Saudi Arabia'],['other','أخرى','Other']] as const,
 entities:[['sole-proprietor','منشأة فردية','Sole proprietor'],['startup','مشروع ناشئ','Startup'],['sme','شركة صغيرة أو متوسطة','SME'],['professional-services','نشاط مهني','Professional services'],['other','أخرى','Other']] as const,
 volumes:[['under-50','أقل من 50 فاتورة تقريبًا','Under 50 invoices'],['50-200','50 إلى 200 فاتورة','50–200 invoices'],['201-1000','201 إلى 1000 فاتورة','201–1,000 invoices'],['over-1000','أكثر من 1000','More than 1,000']] as const,
 cadence:[['one-time','خدمة محددة مرة واحدة','One-off project'],['monthly','دورة شهرية','Monthly service'],['quarterly','مراجعة دورية','Quarterly review']] as const,
 systems:[['spreadsheets','جداول Excel','Spreadsheets'],['accounting-platform','برنامج محاسبة','Accounting software'],['erp','نظام ERP','ERP platform'],['not-started','لم نبدأ بعد','Not set up yet']] as const,
};
export function LedgerScopeForm({locale,initialService=''}:{locale:Locale;initialService?:string}){
 const ar=locale==='ar',first=LEDGERPOINT.services.some(x=>x.slug===initialService)?initialService:LEDGERPOINT.services[0].slug;
 const [serviceSlug,setServiceSlug]=useState(first),[country,setCountry]=useState('egypt'),[entityType,setEntityType]=useState('sme');
 const [volumeBand,setVolumeBand]=useState('under-50'),[cadence,setCadence]=useState('monthly'),[existingSystem,setExistingSystem]=useState('spreadsheets');
 const [guestName,setGuestName]=useState(''),[guestPhone,setGuestPhone]=useState(''),[consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[reference,setReference]=useState('');
 const key=useRef<string|null>(null);
 const select='mt-2 block w-full border border-[#B5CBCB] p-3.5 text-sm text-[#1C3343] bg-white focus-visible:outline-2 focus-visible:outline-[#147C82]';
 const label='text-xs font-black block text-[#274957]';
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||reference||!consent)return;
  setBusy(true);setError('');
  try{
   if(!key.current)key.current=crypto.randomUUID();
   const utm=new URLSearchParams(window.location.search);
   const body={flowType:'accounting_scope_request',clientRequestId:key.current,serviceSlug,country,entityType,volumeBand,cadence,
    existingSystem,guestName,guestPhone,consent,honeypot:'',
    utm:{source:utm.get('utm_source')||'',medium:utm.get('utm_medium')||'',campaign:utm.get('utm_campaign')||''}};
   const response=await fetch('/api/portfolio/accounting',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const data=await response.json();
   if(!response.ok||!data.success)throw Error(data.code||'SAVE_FAILED');
   setReference(data.refNumber);
  }catch{setError(ar?'تعذر حفظ الاستفسار. تأكد من بيانات التواصل وحاول مجددًا.':'The request could not be saved. Check the form and try again.');}
  finally{setBusy(false);}
 }
 if(reference)return <div role="status" aria-live="polite" className="bg-white border-2 border-[#50C2C3] p-8 sm:p-12 text-center"><CheckCircle2 size={48} className="mx-auto text-[#15858C]"/><h2 className="ledger-display mt-5 text-3xl">{ar?'تم حفظ استفسار نطاق العمل':'Your scope enquiry was saved'}</h2><p className="mt-5 text-[#455F6C] leading-8 text-sm">{ar?'الرقم مرجع لتجربة Mavvix، ولا يعني تعيين محاسب معتمد أو توقيع عقد أو موعد أو تحديد أتعاب.':'This is a Mavvix portfolio enquiry reference, not a licensed accountant assignment, appointment, signed engagement or a fee quote.'}</p><p className="mt-7 bg-[#E9F5F4] py-5 font-mono text-xl font-bold">{reference}</p><a target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 bg-[#1C3343] text-white px-7 py-4 text-sm font-bold" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'}>{ar?'عايز موقع زي ده لنشاطك؟':'Build a similar site for your business'}<ArrowUpRight size={17}/></a></div>;
 return <form onSubmit={submit} className="bg-[#F9FAF7] border border-[#CCDAD8] shadow-[0_24px_75px_rgba(28,51,67,.11)]">
  <div className="bg-[#1C3343] p-7 sm:p-10 text-white"><p className="text-[#89E5E2] text-xs font-bold tracking-widest">LEDGERPOINT / SCOPE DISCOVERY</p><h2 className="ledger-display text-3xl sm:text-4xl mt-5">{ar?'ابدأ من احتياج واضح':'First, describe the service scope'}</h2><p className="mt-5 text-[#D6E8E8] leading-8 text-sm">{ar?'فئات عامة فقط، من غير كشوف بنوك أو إقرارات أو أرقام رواتب أو بيانات عملاء.':'General categories only. Never upload financial statements, bank data, tax returns or identifiable payroll records.'}</p></div>
  <div className="p-7 sm:p-10 space-y-8">
   <fieldset><legend className="text-sm font-black mb-5">{ar?'01 / اختار الخدمة':'01 / Choose a service scope'}</legend><div className="grid sm:grid-cols-2 gap-3">{LEDGERPOINT.services.map(s=><button type="button" key={s.slug} aria-pressed={serviceSlug===s.slug} onClick={()=>setServiceSlug(s.slug)} className={'text-start border-2 p-4 text-sm font-bold min-h-[78px] '+(serviceSlug===s.slug?'bg-[#1C3343] border-[#1C3343] text-white':'bg-white border-[#CBDAD8] text-[#1C3343] hover:bg-[#EDF5F4]')}>{ledgerText(s.title,locale)}</button>)}</div></fieldset>
   <div className="grid sm:grid-cols-2 gap-5">
    <label className={label}>{ar?'الدولة':'Jurisdiction'}<select className={select} value={country} onChange={e=>setCountry(e.target.value)}>{opts.countries.map(([v,aa,en])=><option value={v} key={v}>{ar?aa:en}</option>)}</select></label>
    <label className={label}>{ar?'نوع المنشأة':'Entity category'}<select className={select} value={entityType} onChange={e=>setEntityType(e.target.value)}>{opts.entities.map(([v,aa,en])=><option value={v} key={v}>{ar?aa:en}</option>)}</select></label>
    <label className={label}>{ar?'عدد الفواتير الشهري تقريبًا':'Approximate monthly invoice count'}<select className={select} value={volumeBand} onChange={e=>setVolumeBand(e.target.value)}>{opts.volumes.map(([v,aa,en])=><option value={v} key={v}>{ar?aa:en}</option>)}</select></label>
    <label className={label}>{ar?'دورية الخدمة':'Service cadence'}<select className={select} value={cadence} onChange={e=>setCadence(e.target.value)}>{opts.cadence.map(([v,aa,en])=><option value={v} key={v}>{ar?aa:en}</option>)}</select></label>
    <label className={label}>{ar?'النظام الحالي':'Current records system'}<select className={select} value={existingSystem} onChange={e=>setExistingSystem(e.target.value)}>{opts.systems.map(([v,aa,en])=><option value={v} key={v}>{ar?aa:en}</option>)}</select></label>
   </div>
   <div className="grid sm:grid-cols-2 gap-5">
    <label className={label}>{ar?'اسم للتواصل':'Contact name'}<input required minLength={2} maxLength={110} autoComplete="name" className={select} value={guestName} onChange={e=>setGuestName(e.target.value)}/></label>
    <label className={label}>{ar?'رقم الهاتف':'Contact phone'}<input required type="tel" pattern="[+0-9 ()-]{8,24}" autoComplete="tel" className={select} value={guestPhone} onChange={e=>setGuestPhone(e.target.value)}/></label>
   </div>
   <div className="flex gap-3 items-start bg-[#E5F4F1] border-s-4 border-[#147C82] p-5"><ShieldCheck size={22} className="text-[#147C82] shrink-0"/><p className="text-sm text-[#274957] leading-8">{ar?'النموذج لا يطلب رقم تسجيل ضريبي أو ملف موظفين أو كشوف حساب أو أرصدة فعلية. تحديد السعر والالتزامات مسؤولية مشغّل مرخص عند التنفيذ الحقيقي.':'The example form does not accept tax IDs, employee files, bank statements or private balances. An actual qualified firm must approve fees and compliance obligations.'}</p></div>
   <label className="flex items-start gap-3 text-sm leading-8 text-[#274957]"><input required type="checkbox" className="accent-[#1C3343] mt-2" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ بيانات التواصل لأغراض تجربة هذا الطلب؛ لم أرسل أي معلومات مالية سرية.':'I consent to saving basic contact information for this example and have not submitted confidential financial records.'}</span></label>
   {error&&<p role="alert" className="bg-red-50 text-red-700 p-4 text-sm">{error}</p>}
   <button type="submit" disabled={busy||!consent} className="w-full bg-[#1C3343] text-white min-h-14 px-7 py-4 font-black text-sm disabled:opacity-40 hover:bg-[#294B60]">{busy?(ar?'جارٍ الحفظ':'Saving...'):(ar?'احفظ استفسار نطاق العمل':'Save scope enquiry')}</button>
  </div>
 </form>;
}
