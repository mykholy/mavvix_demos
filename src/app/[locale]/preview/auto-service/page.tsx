import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, ArrowLeft, ArrowRight, Gauge, ShieldCheck, Wrench, ScanSearch, Activity,
 CalendarCheck2, ClipboardCheck, CarFront, BookOpen, CheckCircle2, AlertTriangle, Disc3, Settings2 } from 'lucide-react';
import { AUTO_SERVICE, autoPath, localized } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;
 const ar=params.locale==='ar';
 const title=ar?'موقع مركز صيانة سيارات متكامل | تجربة Torque Garage من مافكس':'Auto Service Website | Torque Garage Experience by Mavvix';
 const description=ar?'استكشف خدمات الصيانة وفحص الأعطال واختيار السيارة وطلب فحص منظم في تجربة موقع متخصصة صممتها مافكس.':'Explore a premium automotive service website with model-aware repair guides, inspection requests and informed vehicle service journeys.';
 return {title,description,openGraph:{title,description,type:'website'},twitter:{card:'summary_large_image',title,description}};
}
const PHOTO='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mechanic_repairing_car_engine.jpg/1280px-Mechanic_repairing_car_engine.jpg';
export default async function AutoServiceHome(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',Arrow=ar?ArrowLeft:ArrowRight;
 const services=AUTO_SERVICE.services,faq=AUTO_SERVICE.faq,articles=AUTO_SERVICE.articles;
 const stages=ar?[
  ['01','تسجيل الملاحظة','اكتب موديل العربية ومتى ظهر العطل، بدل تشخيص القطعة بالتخمين.'],
  ['02','تحديد نطاق الفحص','الفني المختص هو الذي يحدد الاختبارات المطلوبة ونتائجها الفعلية.'],
  ['03','اعتماد الأعمال','اسأل عن البنود والتكلفة ووقت التوريد قبل الموافقة.'],
  ['04','استلام وتوثيق','احتفظ بالفاتورة والأعمال المنفذة والملاحظات الموصى بها.']
 ]:[
  ['01','Capture the observation','Record the model and conditions instead of guessing the failed part.'],
  ['02','Scope the diagnostic work','A qualified technician should select the actual tests required.'],
  ['03','Approve the work','Ask for itemized scope, parts and timing before authorization.'],
  ['04','Document the outcome','Keep a clear maintenance record, invoice and recommendations.']
 ];
 return <div>
  {/* 01 - editorial hero */}
  <section data-sector-specific="hero" className="relative bg-[#11151A] overflow-hidden text-white">
   <div className="absolute inset-0 lg:start-[44%] opacity-50 lg:opacity-75"><img src={PHOTO} alt={ar?'صورة تحريرية حقيقية لميكانيكي يفحص محرك سيارة':'Editorial photograph of a mechanic inspecting a car engine'} className="h-full w-full object-cover" loading="eager"/></div>
   <div className="absolute inset-0 bg-gradient-to-r from-[#11151A] via-[#11151A]/95 to-[#11151A]/20" style={ar?{transform:'scaleX(-1)'}:{}}/>
   <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-32 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,.7fr)] gap-12 items-center">
    <div>
     <p className="text-[#FB6935] text-xs sm:text-sm tracking-[.22em] font-black uppercase">TORQUE / SERVICE BLUEPRINT</p>
     <h1 className="font-black mt-6 text-[clamp(2.7rem,6.5vw,6.3rem)] leading-[1.1] tracking-tight">{ar?<>مش كل عطل <span className="text-[#FB6935]">محتاج تغيير قطعة.</span></>:<>ENGINEER THE <span className="text-[#FB6935]">RIGHT REPAIR.</span></>}</h1>
     <p className="text-white/75 text-base sm:text-lg leading-9 mt-7 max-w-2xl">{ar?'اعرف الفرق بين العرض والسبب. اختار موديل عربيتك، اقرأ دليل الفحص، وجرّب تقديم طلب صيانة واضح من أول خطوة.':'Understand the difference between a symptom and its cause. Explore service dossiers, build a clear vehicle brief and submit a structured inspection enquiry.'}</p>
     <div className="mt-9 flex flex-wrap gap-3">
      <Link href={autoPath(locale,'booking')} className="bg-[#FB6935] text-[#161A20] rounded-xl px-7 py-4 font-black text-sm inline-flex gap-3 items-center hover:bg-orange-300">{ar?'ابدأ طلب فحص':'Start your inspection request'}<Arrow size={18}/></Link>
      <Link href={autoPath(locale,'services')} className="rounded-xl border border-white/40 text-white px-7 py-4 font-bold text-sm hover:bg-white/10">{ar?'تصفح التخصصات':'Browse service areas'}</Link>
     </div>
     <div className="mt-10 flex gap-6 text-xs font-semibold text-white/60"><span className="inline-flex items-center gap-2"><ScanSearch size={18} className="text-[#FB6935]"/>{ar?'اختار الخدمة المناسبة':'Service-first discovery'}</span><span className="inline-flex items-center gap-2"><ClipboardCheck size={18} className="text-[#FB6935]"/>{ar?'طلب مرجعي محفوظ':'Saved request reference'}</span></div>
    </div>
    <div className="hidden lg:block">
     <div className="rounded-[2rem] bg-[#1E252D]/90 border border-white/10 backdrop-blur-xl p-8 max-w-sm ms-auto shadow-2xl -rotate-2">
      <p className="text-[11px] uppercase tracking-[.25em] text-[#FB6935] font-black">{ar?'بطاقة استقبال السيارة':'VEHICLE INTAKE CARD'}</p>
      <div className="my-7 border-y border-dashed border-white/20 py-6 flex justify-between items-center"><CarFront size={66} strokeWidth={1} className="text-white/75"/><Gauge size={50} strokeWidth={1} className="text-[#FB6935]"/></div>
      <div className="text-sm space-y-5">{[['01',ar?'بيانات السيارة':'Vehicle profile'],['02',ar?'نوع التحذير':'Symptom category'],['03',ar?'نطاق الفحص':'Inspection scope'],['04',ar?'طلب ومتابعة':'Enquiry reference']].map(([n,t])=><div key={n} className="flex items-center gap-4"><span className="text-[#FB6935] font-mono">{n}</span><span className="text-white/80">{t}</span><CheckCircle2 size={16} className="ms-auto text-white/30"/></div>)}</div>
     </div>
    </div>
   </div>
  </section>
  {/* 02 - symptom-led orientation */}
  <section data-sector-specific="symptoms" className="bg-[#FB6935] text-[#11151A] py-12 sm:py-16">
   <div className="max-w-7xl px-5 sm:px-8 mx-auto grid lg:grid-cols-[.75fr_1.25fr] items-center gap-10">
    <div><p className="text-xs font-black tracking-widest uppercase">READ THE SIGNAL</p><h2 className="text-3xl sm:text-4xl font-black mt-2 leading-tight">{ar?'العربية بتديك إشارات. نفهمها الأول.':'Observe the signal, then investigate.'}</h2></div>
    <div className="grid sm:grid-cols-3 gap-3">
     {[[ar?'اهتزاز مع الفرامل':'Vibration under braking',ar?'سجّل السرعة والظروف':'Record speed and conditions'],
       [ar?'صوت على المطبات':'Noise over bumps',ar?'حدد مكان وتوقيت الصوت':'Note when and where'],
       [ar?'سخونة غير طبيعية':'Unusual overheating',ar?'توقف بأمان وتجنب المجازفة':'Stop safely and seek help']].map(([title,description])=><div key={title} className="p-5 rounded-xl border-2 border-[#161A20]/15 bg-[#FFC2AC]/50"><Activity size={25}/><h3 className="font-extrabold text-sm mt-4">{title}</h3><p className="text-xs leading-6 mt-2">{description}</p></div>)}
    </div>
   </div>
  </section>
  {/* 03 - Service dossiers */}
  <section data-sector-specific="repair-matrix" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
   <div className="flex flex-col md:flex-row items-start md:items-end gap-6 justify-between mb-10"><div><p className="text-[#D5552C] text-xs font-black tracking-widest uppercase">THE SERVICE MATRIX</p><h2 className="text-3xl sm:text-5xl font-black mt-4">{ar?'اعرف كل خدمة قبل ما تطلبها':'Know the work before you request it'}</h2><p className="mt-4 text-sm text-stone-600 max-w-2xl leading-8">{ar?'ثمانية مسارات مختلفة للفحص والصيانة، ولكل مسار شرح وملاحظات تساعدك تتكلم مع الفني بوضوح.':'Eight distinct inspection and maintenance areas with practical decision guides, not vague repair promises.'}</p></div><Link href={autoPath(locale,'services')} className="inline-flex gap-2 items-center text-sm font-black text-[#D5552C]">{ar?'كل الخدمات':'All service dossiers'}<Arrow size={16}/></Link></div>
   <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">{services.map((s,i)=><Link key={s.slug} href={autoPath(locale,'services/'+s.slug)} className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#FB6935] hover:shadow-2xl transition-all min-h-[235px] flex flex-col"><div className="flex justify-between items-center"><span className="font-mono text-xs text-[#D5552C]">FIELD / {String(i+1).padStart(2,'0')}</span><ArrowUpRight size={18} className="group-hover:translate-x-1 transition-transform"/></div><h3 className="text-xl font-black mt-7 leading-snug">{localized(s.title,locale)}</h3><p className="text-sm text-stone-600 leading-7 mt-3">{localized(s.summary,locale)}</p><span className="mt-auto pt-5 text-xs font-extrabold text-[#D5552C]">{ar?'افتح تفاصيل الفحص':'Read service dossier'}</span></Link>)}</div>
  </section>
  {/* 04 - critical safety */}
  <section data-sector-specific="safety" className="bg-[#212831] text-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[.15fr_1fr_.3fr] gap-8 items-center"><AlertTriangle size={52} className="text-[#FB6935]"/><div><h2 className="text-2xl sm:text-3xl font-black">{ar?'في علامات لا ينفع تستنى عليها':'Some warnings should not wait'}</h2><p className="mt-3 text-sm leading-8 text-white/65">{ar?'لمبة ضغط الزيت أو ارتفاع حرارة المحرك أو فقدان استجابة الفرامل قد تتطلب التوقف الآمن وعدم استكمال القيادة. دليل السيارة والمختص هما المرجع.':'Oil pressure, severe overheating and loss of braking response require safety-first decisions. Refer to the vehicle manual and an appropriate professional; never rely on a website to diagnose an emergency.'}</p></div><Link href={autoPath(locale,'diagnostics')} className="text-[#FB6935] text-sm font-black inline-flex gap-2 items-center">{ar?'دليل الأعراض':'Warning guide'}<Arrow size={18}/></Link></div></section>
  {/* 05 - package selection */}
  <section data-sector-specific="maintenance-paths" className="bg-white py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 items-center"><div><p className="text-[#D5552C] text-xs font-black tracking-widest">SERVICE WITHOUT GUESSWORK</p><h2 className="text-4xl font-black mt-5">{ar?'الصيانة الدورية مش باقة واحدة لكل العربيات':'Maintenance is not one-size-fits-all'}</h2><p className="text-stone-600 mt-5 leading-8">{ar?'مواصفات السوائل والفلاتر ومواعيد التغيير تختلف حسب الشركة والمحرك والظروف. بدل ما نعدك بسعر موحد، الموقع يوضح البيانات اللي تساعدك تطلب عرض واقعي.':'Fluid grades, filter compatibility and intervals depend on the engine and manufacturer. The right site captures useful context rather than displaying an unsupported flat repair price.'}</p><Link href={autoPath(locale,'packages')} className="inline-flex gap-2 text-sm font-extrabold bg-[#171A20] text-white rounded-xl px-6 py-4 mt-7">{ar?'شوف خطط الصيانة':'Compare maintenance paths'}<Arrow size={17}/></Link></div><div className="grid gap-4">{[[ar?'صيانة دورية':'Routine',ar?'الزيت والفلاتر وسجل العداد':'Oil, filters and mileage'],[ar?'فحص عطل':'Problem investigation',ar?'ملاحظات وأعراض واختبار مناسب':'Observations and planned tests'],[ar?'فحص قبل الشراء':'Before purchase',ar?'نقاط أمان وملكية منفصلة':'Mechanical and legal checklists']].map(([title,desc],i)=><div key={title} className="border border-stone-200 rounded-2xl p-6 flex items-center gap-5"><span className="font-mono text-3xl font-black text-[#FB6935]">0{i+1}</span><div><h3 className="font-extrabold">{title}</h3><p className="text-sm text-stone-600 mt-2">{desc}</p></div><CheckCircle2 className="ms-auto text-[#FB6935]"/></div>)}</div></div></div></section>
  {/* 06 - vehicle context */}
  <section data-sector-specific="vehicle-selection" className="bg-[#E7E0D3] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8"><div className="flex flex-wrap justify-between items-end gap-5"><div><p className="text-xs font-black text-[#D5552C] tracking-widest">VEHICLE PROFILE</p><h2 className="text-3xl font-black mt-3">{ar?'الموديل يغيّر طريقة الفحص':'Vehicle context changes the workflow'}</h2></div><Link href={autoPath(locale,'car-brands')} className="inline-flex gap-2 font-bold text-sm">{ar?'إزاي تختار بيانات عربيتك؟':'How vehicle identification works'}<Arrow size={17}/></Link></div><div className="mt-9 grid grid-cols-3 md:grid-cols-6 gap-3">{AUTO_SERVICE.brands.map(brand=><div key={brand} className="bg-white border border-stone-200 rounded-xl min-h-24 grid place-items-center text-lg font-black text-center px-2">{brand}</div>)}</div><p className="text-xs text-stone-600 mt-5">{localized(AUTO_SERVICE.modelNote,locale)}</p></div></section>
  {/* 07 - workflow */}
  <section data-sector-specific="service-process" className="py-20 max-w-7xl px-5 sm:px-8 mx-auto"><p className="text-[#D5552C] text-xs tracking-widest font-black">THE SERVICE PROCESS</p><h2 className="text-3xl sm:text-5xl font-black mt-4">{ar?'من أول ملاحظة لحد سجل واضح':'From symptom to documented decision'}</h2><div className="grid md:grid-cols-4 gap-4 mt-10">{stages.map(([n,t,d])=><div key={n} className="relative bg-[#161A20] text-white rounded-2xl p-6 min-h-60"><span className="text-[#FB6935] font-mono font-black text-4xl">{n}</span><h3 className="font-extrabold text-lg mt-8">{t}</h3><p className="text-sm text-white/65 leading-7 mt-3">{d}</p></div>)}</div><Link href={autoPath(locale,'process')} className="inline-flex gap-2 items-center text-[#D5552C] font-black text-sm mt-7">{ar?'اقرأ منهجية الطلب':'Read the full process'}<Arrow size={17}/></Link></section>
  {/* 08 - editorial image story */}
  <section data-sector-specific="editorial-photo" className="bg-[#14191F] text-white"><div className="grid lg:grid-cols-2 items-stretch"><div className="relative min-h-[360px] lg:min-h-[560px] overflow-hidden"><img src={PHOTO} loading="lazy" alt={ar?'صورة تحريرية مرخصة لمحرك سيارة يخضع للفحص':'CC0 editorial photograph of a mechanic at a vehicle engine'} className="absolute w-full h-full object-cover"/><div className="absolute bottom-4 left-4 text-[10px] bg-black/70 px-3 py-2 rounded">CC0 photo: Bembety / Wikimedia Commons · Editorial only</div></div><div className="px-6 sm:px-16 py-16 lg:py-24 flex flex-col justify-center"><p className="text-[#FB6935] text-xs tracking-[.2em] font-black">BEHIND THE HOOD</p><h2 className="text-3xl sm:text-5xl font-black mt-5">{ar?'مشهد حقيقي. والقرار لسه محتاج فحص.':'Real machinery. No invented repair promises.'}</h2><p className="mt-6 text-white/70 leading-9">{ar?'الصورة من مصدر تحريري مرخص وليست تصوير ورشة تحمل هذا الاسم. الأهم إن الموقع يساعد العميل يفهم خطوات الخدمة قبل الاستفسار، مع فصل المحتوى التعليمي عن أي تعاقد فعلي.':'This genuine CC0 automotive photograph is editorial, not evidence that Torque Garage is an operating workshop. The website demonstrates how a customer can understand a service scope without pretending a repair has happened.'}</p><a href="https://commons.wikimedia.org/wiki/File:Mechanic_repairing_car_engine.jpg" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-[#FB6935] text-xs font-bold">Photo source & public-domain statement <ArrowUpRight size={15}/></a></div></div></section>
  {/* 09 - editorial resources */}
  <section data-sector-specific="learning-resources" className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black text-[#D5552C] tracking-widest">FIELD NOTES</p><h2 className="text-3xl sm:text-4xl font-black mt-4">{ar?'معلومة أحسن من تخمين مكلف':'Clear guidance beats expensive guessing'}</h2></div><Link href={autoPath(locale,'resources')} className="text-sm text-[#D5552C] font-bold hidden sm:inline-flex gap-2 items-center">{ar?'كل المقالات':'View resources'}<Arrow size={16}/></Link></div><div className="grid md:grid-cols-3 gap-5 mt-9">{articles.map((a,i)=><Link href={autoPath(locale,'resources/'+a.slug)} key={a.slug} className="group bg-white border border-stone-200 rounded-2xl p-7 hover:shadow-xl transition-shadow"><span className="font-mono text-xs text-[#D5552C]">NOTE 0{i+1}</span><BookOpen size={29} className="mt-6"/><h3 className="font-extrabold text-lg mt-4 leading-7">{localized(a.title,locale)}</h3><p className="text-sm text-stone-600 leading-7 mt-3">{localized(a.summary,locale)}</p><span className="inline-flex mt-6 gap-2 text-xs font-bold text-[#D5552C]">{ar?'اقرأ الدليل':'Read guide'}<Arrow size={14}/></span></Link>)}</div></section>
  {/* 10 - FAQ */}
  <section data-sector-specific="buyer-questions" className="bg-[#EAE4D8] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.75fr_1.25fr] gap-10"><div><p className="font-mono text-[#D5552C] text-xs font-bold">BUYER CHECKLIST</p><h2 className="text-4xl font-black mt-4">{ar?'أسئلة مهم تعرف إجابتها':'Questions that matter before a workshop visit'}</h2></div><div className="space-y-3">{faq.map((f,i)=><details key={i} className="group rounded-xl bg-white p-5 border border-stone-200 open:shadow-md"><summary className="font-extrabold text-base cursor-pointer">{localized(f.q,locale)}</summary><p className="mt-3 text-sm leading-8 text-stone-600">{localized(f.a,locale)}</p></details>)}</div></div></section>
  {/* 11 - sales CTA */}
  <section data-sector-specific="conversion" className="relative overflow-hidden bg-[#FB6935] px-5 sm:px-8 py-20"><div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-8 items-center"><div><p className="uppercase text-xs font-extrabold tracking-widest">MAVVIX / BUILD YOUR OWN</p><h2 className="text-3xl sm:text-5xl font-black mt-4 max-w-3xl">{ar?'مركزك محتاج موقع يخلّي العميل يطلب الخدمة صح؟':'Want this level of clarity for your own workshop?'}</h2><p className="text-sm mt-5 leading-8 max-w-2xl">{ar?'مافكس تقدر تنفذ موقع لخدماتك الحقيقية وفروعك ومواعيدك، مع نظام استقبال طلبات مناسب لطريقة شغلك.':'Mavvix can adapt this interface for your real services, branches, availability rules and team workflows.'}</p></div><a target="_blank" rel="noopener noreferrer" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} className="inline-flex gap-3 items-center bg-[#161A20] text-white rounded-full px-9 py-5 font-black text-sm">{ar?'اطلب تنفيذ موقعك':'Discuss a site for your business'}<ArrowUpRight size={19}/></a></div></section>
 </div>;
}
