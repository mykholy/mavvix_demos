import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Wind,Droplets,Zap,MapPin,ClipboardList,ShieldCheck,AlertTriangle,ArrowUpRight,CheckCircle2,CalendarCheck,Home,BookOpen } from 'lucide-react';
import { HOME_CARE,careLocale,maintenancePath } from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';

const routes=['ac','plumbing','electrical','coverage','pricing-guide','process','about','contact'] as const;
type Topic=typeof routes[number];
const headings:Record<Topic,{ar:string;en:string}>={
 ac:{ar:'خدمات التكييف وتوجيهات الفحص',en:'Air conditioning services and inspection guidance'},
 plumbing:{ar:'السباكة وفهم أعطال التسريب والصرف',en:'Plumbing, water leaks and drainage guidance'},
 electrical:{ar:'خدمات الكهرباء والوقاية من المخاطر',en:'Electrical care and safety-first service decisions'},
 coverage:{ar:'مناطق الخدمة وكيفية تنسيق الزيارة',en:'Planning service coverage and visit requests'},
 'pricing-guide':{ar:'دليل وضوح التسعير ونطاق الإصلاح',en:'Repair scope and pricing transparency'},
 process:{ar:'رحلة واضحة من الاستفسار لطلب المعاينة',en:'A thoughtful home service process'},
 about:{ar:'فكرة Fixora Care وتجربة الموقع',en:'About the Fixora Care web experience'},
 contact:{ar:'طلب تنفيذ موقع صيانة من مافكس',en:'Commission a home-maintenance website from Mavvix'},
};
const characteristics:Record<'ac'|'plumbing'|'electrical',{intro:{ar:string;en:string};warning:{ar:string;en:string};questions:{ar:string;en:string}[]}>={
 ac:{intro:{ar:'التكييف يجمع تدفق الهواء والتصريف والدائرة الكهربائية ووسيط التبريد. كل عنصر يحتاج فحصًا مناسبًا قبل تغيير أي جزء. الهدف إن العميل يعرف البيانات التي يذكرها في المكالمة، وليس تنفيذ إصلاح كهربائي أو التعامل مع الغاز دون متخصص.',en:'Air conditioner performance depends on airflow, drainage, electrical control and refrigerant. Each subsystem needs an appropriate assessment before replacement. The website helps a homeowner prepare a useful description rather than perform potentially unsafe repair work.'},
 warning:{ar:'التعامل مع دوائر الكهرباء ووسيط التبريد للمختصين. لا تحاول فتح وحدات ساخنة أو مكونات كهربائية غير معزولة.',en:'Electrical and refrigerant intervention requires qualified specialists. Avoid unqualified access to live or pressurized equipment.'},
 questions:[{ar:'هل التكييف بيدفع هواء لكنه مش بارد؟',en:'Does the unit move air without cooling it?'},{ar:'هل ظهر تسريب مياه داخل الغرفة؟',en:'Is there condensate leakage indoors?'},{ar:'هل المشكلة ظهرت بعد تركيب أو نقل؟',en:'Did symptoms appear after installation or relocation?'}]},
 plumbing:{intro:{ar:'مش كل رطوبة في الحائط ناتجة عن نفس المشكلة. أحيانًا تظهر مع صرف جهاز محدد وأحيانًا مع خط تغذية. نقطة البداية هي معرفة توقيت ظهور البلل والأجهزة المتأثرة، مع الانتباه للمخاطر الكهربائية.',en:'Moisture can originate from supply lines, drainage, appliances or condensation. Useful diagnosis begins with when water appears, which fixtures are affected and whether electric hazards are nearby, not automatic wall demolition.'},
 warning:{ar:'لو المياه قرب كابلات كهرباء أو أجهزة مبتلة، تجنب الاقتراب والتواصل مع متخصص. لا تخلط مواد تنظيف الصرف.',en:'If water contacts electrical equipment, stay clear and seek qualified help. Never mix drain-cleaning chemicals.'},
 questions:[{ar:'هل البلل بيظهر مع فتح الصنبور؟',en:'Does water appear when a tap runs?'},{ar:'هل الانسداد في مصرف واحد أو أكثر؟',en:'Does drainage affect one fixture or several?'},{ar:'هل سبق إصلاح نفس الخط؟',en:'Have repairs been attempted on the same pipe?'}]},
 electrical:{intro:{ar:'الأمان قبل أي تدخل. فصل قاطع باستمرار أو ارتفاع حرارة مقبس يحتاج فحصاً من مختص ومراعاة إجراءات العزل. لا تستخدم نموذج موقع لتلقي تعليمات توصيل أسلاك أو التعامل مع لوحات توزيع.',en:'Safety comes before repair. Repeated trips, overheated outlets or burning odors require qualified electricians and proper isolation. A public website should collect only general issue categories, not guide unqualified wiring work.'},
 warning:{ar:'في رائحة احتراق أو شرر أو صدمة، ابتعد عن مصدر الخطر واستعن بخدمات السلامة والطوارئ المحلية عند الحاجة.',en:'For sparks, shocks or burning smells, avoid the hazard and seek qualified local emergency assistance.'},
 questions:[{ar:'هل العطل بيحصل في غرفة واحدة؟',en:'Does it affect one room or several?'},{ar:'هل القاطع بيفصل عند تشغيل جهاز بعينه؟',en:'Is a breaker trip linked to one appliance?'},{ar:'هل توجد سخونة أو رائحة غير معتادة؟',en:'Is there unusual heat or odor?'}]},
};
export function generateStaticParams(){return routes.map(section=>({section}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;section:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 if(!routes.includes(section as Topic))return {};
 return {title:headings[section as Topic][locale]+' | Fixora Care',description:locale==='ar'?'محتوى توجيهي متخصص للصيانة المنزلية، وتقديم طلب معاينة غير مؤكد من تصميم مافكس.':'Detailed home maintenance buyer guidance and pending-only service request experience by Mavvix.'};
}
export default async function HomeMaintenanceTopic(props:{params: Promise<{locale:Locale;section:string}>}) {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 if(!routes.includes(section as Topic))notFound();
 const topic=section as Topic,ar=locale==='ar';
 const categories=(['ac','plumbing','electrical'] as const).includes(topic as 'ac'|'plumbing'|'electrical')?characteristics[topic as 'ac'|'plumbing'|'electrical']:null;
 const applicable=HOME_CARE.services.filter(s=>s.category===topic);
 const h=(x:string)=><h2 className="text-2xl sm:text-3xl font-black">{x}</h2>;
 return <div>
  <section className="bg-[#E7F2FA] border-b border-[#CFDFEB]"><div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-20">
   <nav className="text-xs text-[#6E8AA0]"><Link href={maintenancePath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {headings[topic][locale]}</nav>
   <div className="grid lg:grid-cols-[1.2fr_.55fr] gap-12 items-end mt-11"><div><span className="font-black text-xs text-[#D39421] tracking-widest">FIXORA SERVICE LIBRARY / {topic.toUpperCase()}</span><h1 className="font-black text-4xl sm:text-6xl leading-tight mt-5">{headings[topic][locale]}</h1></div><p className="leading-8 text-[#5B7E99] text-sm">{ar?'محتوى قطاعي توضيحي، لا يمثل فرعًا أو فنيًا حقيقيًا ولا يعد بحجز فوري.':'Educational content for a home-services portfolio; not a live repair service or confirmed appointment.'}</p></div>
  </div></section>
  {categories&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.45fr_1fr] gap-12"><div><p className="text-[#D39421] font-black text-xs">SAFETY-AWARE INFORMATION</p>{h(ar?'أهم حاجة نفهمها':'What matters before booking')}</div><p className="text-base sm:text-lg leading-[2.1] text-[#5B7E99]">{categories.intro[locale]}</p></section>
   <section className="bg-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="text-2xl font-black">{ar?'أسئلة تساعد تحدد نطاق الاستفسار':'Useful questions to prepare your enquiry'}</h2><div className="grid md:grid-cols-3 gap-4 mt-8">{categories.questions.map((q,i)=><div key={i} className="p-8 rounded-3xl bg-[#F4F8FB] border border-[#DDE8F1]"><span className="font-mono font-black text-[#D39421]">0{i+1}</span><h3 className="font-black text-lg leading-8 mt-6">{q[locale]}</h3><p className="mt-5 text-sm text-[#66869A] leading-7">{ar?'تقدر تذكر الملاحظة للمتخصص عند التواصل، بدون الدخول في تشخيص أو إجراء إصلاح بنفسك.':'Capture your observation for qualified staff; do not attempt unsafe fault finding on your own.'}</p></div>)}</div></div></section>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><div className="flex items-start gap-5 p-7 sm:p-10 bg-[#FFF2D5] rounded-[2rem]"><AlertTriangle size={32} className="text-[#AA7823] shrink-0"/><div><h2 className="text-xl font-black">{ar?'ملاحظة سلامة أساسية':'Safety comes first'}</h2><p className="mt-4 text-[#806527] leading-8 text-sm">{categories.warning[locale]}</p></div></div></section>
   <section className="bg-[#F1F7FC] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="text-2xl font-black">{ar?'خدمات مناسبة للمجال':'Service dossiers in this area'}</h2><div className="grid md:grid-cols-2 gap-4 mt-8">{applicable.map(s=><Link key={s.slug} href={maintenancePath(locale,'services/'+s.slug)} className="bg-white border border-[#DDE8F1] rounded-2xl p-7 flex items-center justify-between gap-5"><div><h3 className="font-black text-lg">{careLocale(s.title,locale)}</h3><p className="text-[#66869A] text-sm mt-3 leading-7">{careLocale(s.summary,locale)}</p></div><ArrowUpRight size={22} className="shrink-0"/></Link>)}</div></div></section>
  </>}
  {topic==='coverage'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-11"><div>{h(ar?'المناطق لا تعني توافر فني الآن':'Displayed regions are not live capacity')}<p className="mt-6 leading-9 text-[#5B7E99]">{ar?'عند تنفيذ موقع لشركة صيانة، لازم صاحب النشاط يحدد المدن والأحياء التي يمكن تغطيتها فعلاً، رسوم الزيارة وخدمة الطوارئ إن وجدت. داخل التجربة الحالية نستخدم نطاقات عامة لتسهيل فهم كيف ينظم النظام الطلب.':'Real service coverage requires the business owner to approve cities, technician rosters, service fees and any emergency response commitments. This example shows generic enquiry regions only.'}</p></div><div className="grid grid-cols-2 gap-3">{HOME_CARE.options.regions.map(r=><div key={r} className="bg-white border border-[#DCE8F1] p-7 rounded-2xl"><MapPin size={25} className="text-[#D39421]"/><h3 className="font-black mt-5">{r}</h3><p className="mt-4 text-xs text-[#66869A]">{ar?'منطقة استفسار':'Enquiry zone'}</p></div>)}</div></section>
   <section className="bg-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8">{h(ar?'قبل تأكيد المعاينة':'Before confirming an appointment')}<div className="grid md:grid-cols-3 gap-4 mt-8">{[ar?'هل المنطقة ضمن التغطية؟':'Is the region served?',ar?'هل يوجد مختص بهذه الخدمة؟':'Is the right technician available?',ar?'ما رسوم الزيارة والوقت المتفق؟':'What are confirmed fees and timing?'].map((t,i)=><div key={i} className="p-7 bg-[#F1F7FC] rounded-xl"><CheckCircle2 size={23} className="text-[#D39421]"/><h3 className="mt-4 font-bold">{t}</h3></div>)}</div></div></section>
  </>}
  {topic==='pricing-guide'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="max-w-4xl text-[#5B7E99] leading-9">{ar?'السعر النهائي للصيانة بيتأثر بتحديد العيب الحقيقي وحالة الجهاز والأجزاء والوقت وظروف المكان. أي رقم ثابت يتم عرضه قبل الفحص يحتاج شروط واضحة ومصدر معتمد من صاحب الشركة.':'Repair fees depend on verified cause, parts, labor, access and local operator terms. Published flat-rate claims need documented inclusions and exclusions approved by the real service company.'}</p><div className="grid lg:grid-cols-3 gap-5 mt-12">{[[ar?'المعاينة':'Assessment',ar?'هل رسوم الكشف مستقلة عن الإصلاح؟':'Are diagnostic visit fees distinct from repair work?'],[ar?'القطع والخامات':'Materials',ar?'هل السعر يشمل القطع وضمانها؟':'Does the fee include parts and their terms?'],[ar?'الموافقة':'Authorization',ar?'ازاي يتم طلب موافقة قبل أعمال إضافية؟':'How is approval obtained before any extra work?']].map(([x,y],i)=><article key={i} className="rounded-3xl bg-white border border-[#DDE8F1] p-8"><span className="font-mono text-3xl text-[#D39421] font-black">0{i+1}</span><h2 className="mt-7 font-black text-xl">{x}</h2><p className="text-sm leading-8 text-[#66869A] mt-4">{y}</p></article>)}</div></section>
  </>}
  {topic==='process'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 space-y-5">{[[ar?'اختيار التخصص':'Choose a trade',ar?'تكييف أو سباكة أو كهرباء، بحيث يراجع المختص المناسب وصف المشكلة.':'The selected trade helps the operator assign an appropriately skilled service provider.'],[ar?'تحديد الظروف':'Describe the conditions',ar?'نوع المشكلة ومستوى الاستعجال والمنطقة العامة مع تجنب بيانات البيت الخاصة.':'Record symptoms, general priority and area; avoid home access information.'],[ar?'تأكيد المشغّل':'Operator confirmation',ar?'الشركة الحقيقية تؤكد الوقت والمقابل والمهام قبل الزيارة.':'Actual provider confirms time, fees, technician availability and scope.'],[ar?'سجل الإنجاز':'Reviewable handover',ar?'عند التشغيل الفعلي يُوثّق ما تم تنفيذه والمواد وملاحظات المتابعة.':'Real fulfillment should document work completed, materials and follow-up advice.']].map(([x,y],i)=><div key={i} className="grid md:grid-cols-[85px_.65fr_1.1fr] gap-8 bg-white rounded-[2rem] border border-[#E1EDF5] p-7 sm:p-9"><span className="text-3xl text-[#D39421] font-mono font-black">{String(i+1).padStart(2,'0')}</span><h2 className="font-black text-xl">{x}</h2><p className="text-[#66869A] text-sm leading-8">{y}</p></div>)}</section>
  </>}
  {topic==='about'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.8fr_1.2fr] gap-14"><div>{h(ar?'مفهوم Fixora من مافكس':'Fixora is a Mavvix design concept')}<Home size={64} className="text-[#D39421] mt-10"/></div><div className="text-[#5B7E99] leading-9 space-y-5"><p>{ar?'Fixora Care اسم وهوية تحريرية توضح إمكانية بناء موقع منظم لشركة صيانة منزلية في مصر والخليج. لا يمثل فرعًا أو فنيين أو مواعيد حقيقية.':'Fixora Care is an editorial identity showing what Mavvix can build for a maintenance business in Egypt or GCC. It is not an actual provider with verified branches, staff or schedules.'}</p><p>{ar?'النسخة التجارية للعميل تستبدل الهوية بنشاطه الحقيقي وتضيف نطاق التغطية ووسائل الخدمة الرسمية وسياسة الزيارات وخطة المتابعة والتكامل مع النظام المناسب.':'A genuine client build would replace this sample branding with the real operator’s services, territory, consent policies, scheduling systems and appropriately permissioned photography.'}</p></div></section>
  </>}
  {topic==='contact'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-10"><div>{h(ar?'خلّي موقع شركتك يستقبل الطلبات بطريقة منظمة':'Build a clear service-request experience for your real business')}<p className="mt-5 leading-9 text-[#5B7E99]">{ar?'فريق مافكس بيناقش معاك ألوان وهُوية شركتك ونطاق الخدمات وجدول الفنيين وطريقة المتابعة ولوحة التحكم، حسب مشروعك. التواصل هنا مع مافكس فقط.':'Mavvix can design your actual service catalogue, approved service areas, scheduling integration and authorized lead workspace. This contact is with the software company, not a sample repair business.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex gap-2 rounded-xl bg-[#174E78] text-white p-4 font-bold text-sm">{ar?'اطلب عرض للموقع':'Request a development proposal'}<ArrowUpRight size={18}/></a></div><div className="bg-[#F1F7FC] rounded-3xl p-10"><p className="font-extrabold text-xl">{ar?'خلي عندك معلومات قبل الاجتماع':'Prepare your scope'}</p>{[ar?'الخدمات الفعلية التي تقدمها':'Actual services offered',ar?'الأحياء والمناطق المعتمدة':'Approved service coverage',ar?'نظام استقبال وتنفيذ الطلبات':'Current dispatch or scheduling software',ar?'أسعار ورسوم الزيارة الصحيحة':'Verified visit fees and terms',ar?'الصور والهوية التي تملك حقوقها':'Owned media and brand assets'].map(x=><p key={x} className="flex gap-3 text-sm items-start mt-5"><CheckCircle2 size={19} className="text-[#D39421] shrink-0"/>{x}</p>)}</div></section>
  </>}
  <section className="bg-[#F7B347] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap gap-5 items-center justify-between"><div><p className="font-black text-xs tracking-widest">FIXORA / REQUEST PATH</p><h2 className="text-2xl sm:text-3xl font-black mt-3">{ar?'احتاج توضيح خدمة بعينها؟':'Have a service enquiry to structure?'}</h2></div><Link href={maintenancePath(locale,'book')} className="px-7 py-4 rounded-full bg-[#174E78] text-white font-black text-sm inline-flex gap-2">{ar?'جهز طلب المعاينة':'Open request intake'}<ArrowUpRight size={17}/></Link></div></section>
 </div>;
}
