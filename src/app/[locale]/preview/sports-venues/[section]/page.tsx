import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,arenaPath,arenaText } from '@/lib/verticals/sports-venues/data';
import { ArrowUpRight,Trophy,Goal,Users,CalendarClock,Clock3,ShieldCheck,AlertTriangle,BookOpen,MapPinned,CheckCircle2,Target,Sun } from 'lucide-react';

const pages=['sports','schedule','pricing','leagues','coaches','process','about','contact'] as const;
type ArenaPage=typeof pages[number];
const titles:Record<ArenaPage,{ar:string;en:string}>={
 sports:{ar:'كرة القدم والبادل... صيغ لعب بقرار مختلف',en:'Football and padel, thoughtfully separated'},
 schedule:{ar:'اختيار الموعد بدون توافر وهمي',en:'A schedule experience without invented availability'},
 pricing:{ar:'سعر الملعب يبدأ من شروط واضحة',en:'Clear venue pricing begins with clear terms'},
 leagues:{ar:'كيف تنظم دوري ملاعب بطريقة احترافية؟',en:'How a venue website can organize leagues'},
 coaches:{ar:'الحصص والمدربون يحتاجون بيانات موثقة',en:'Coaches and sessions need verified operator data'},
 process:{ar:'من تحديد اللعبة لطلب الملعب',en:'From match format to a responsible request'},
 about:{ar:'Arena Courts تجربة من مافكس للملاعب',en:'Arena Courts, an editorial Mavvix concept'},
 contact:{ar:'موقع ملاعب يليق بنشاطك من مافكس',en:'A venue website worth showing your real players'}
};
export function generateStaticParams(){return pages.map(section=>({section}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;section:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 const page=titles[section as ArenaPage];return page?{title:page[locale]+' | Arena Courts',description:locale==='ar'?'تجربة تصميم موقع ملاعب كرة وبادل من مافكس مع محتوى حقيقي وطلبات بانتظار تأكيد المشغّل.':'A sports venue website concept from Mavvix with truthful sport format explanations and nonbinding request forms.',robots:{index:false,follow:false}}:{};
}
const process=[
 {title:{ar:'صيغة اللعب',en:'Decide the sport format'},body:{ar:'اختيار خماسي أو سباعي أو زوجي بادل يحدد العدد والمدة التقديرية.',en:'Five-a-side, seven-a-side and doubles padel demand distinct team sizes and preparation.'}},
 {title:{ar:'المدة والتوقيت',en:'Request the session window'},body:{ar:'حدد اليوم والوقت والمدة كتفضيلات ولا تفسّرها خانات شاغرة.',en:'Select a requested date, hour and duration without treating them as live inventory.'}},
 {title:{ar:'تسجيل الاستفسار',en:'Record the enquiry'},body:{ar:'اترك وسيلة تواصل وموافقة واضحة، ويُنشئ النظام رقمًا مرجعيًا.',en:'Provide consented contact details and receive a unique persisted request reference.'}},
 {title:{ar:'تأكيد المشغّل الفعلي',en:'Actual operator confirmation'},body:{ar:'وقت اللعب والإضاءة والمعدات والرسوم تعتمد على بيانات المنشأة الواقعية.',en:'Real availability, facilities, fees and policies are confirmed only by a live venue.'}},
];
const pricing=[
 {ar:'مدة اللعب وحدودها',en:'Time and session rules',bodyAr:'وضّح ما إذا كان وقت الإحماء داخل الجلسة، وما رسوم التأخير إن وجدت.',bodyEn:'Confirm whether warm-up counts within the session and how delays are handled.'},
 {ar:'سياسة الإلغاء',en:'Cancellation policy',bodyAr:'اسأل عن آخر وقت للإلغاء والاسترداد أو إمكانية تغيير الميعاد.',bodyEn:'Ask about the cut-off for cancellation, refunds or rescheduling.'},
 {ar:'معدات اختيارية',en:'Optional equipment',bodyAr:'اسأل إن كانت الكرات أو مضارب البادل أو الملابس متاحة وبكم.',bodyEn:'Ask whether balls, rackets or additional equipment are actually provided and their costs.'},
 {ar:'الدفع عند مشغل حقيقي',en:'Real operator payment',bodyAr:'الموقع لا يقبل عربونًا أو يخصم مبلغًا؛ أي دفع يحتاج مزودًا معتمدًا.',bodyEn:'This sample takes no deposits or payments. A real business requires a lawful checkout setup.'},
];
export default async function ArenaInfo(props:{params: Promise<{locale:Locale;section:string}>}) {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 if(!pages.includes(section as ArenaPage))notFound();
 const topic=section as ArenaPage,ar=locale==='ar';
 const h=(x:string)=><h2 className="arena-display text-3xl sm:text-5xl font-black">{x}</h2>;
 return <div>
  <section className="bg-[#102B26] text-white py-14 sm:py-24">
   <div className="max-w-7xl mx-auto px-5 sm:px-8"><nav className="text-xs text-[#D9EBDB]"><Link href={arenaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {titles[topic][locale]}</nav>
    <div className="grid lg:grid-cols-[1fr_.55fr] gap-10 items-end mt-14"><div><p className="uppercase text-xs font-black tracking-widest text-[#F0B044]">ARENA / {topic.toUpperCase()}</p><h1 className="arena-display text-4xl sm:text-7xl mt-6 leading-tight font-black">{titles[topic][locale]}</h1></div><p className="text-sm leading-9 text-[#D9EBDB]">{ar?'معلومات قطاعية للتوضيح ضمن تجربة مافكس. أي ملعب حقيقي يحتاج بياناته وخدماته المعتمدة قبل التشغيل.':'Part of a Mavvix portfolio: a sports venue website is only truly operational with real court data and owner-approved conditions.'}</p></div>
   </div>
  </section>
  {topic==='sports'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="text-[#395943] leading-9 max-w-3xl">{ar?'في الخماسي يكون العدد الأساسي عشرة لاعبين، وفي السباعي أربعة عشر لاعبًا، والبادل الزوجي أربع لاعبين. ده فرق بيؤثر على اختيار المكان والفترة المناسبة، لكنه لا يثبت سعة ملعب حقيقي.':'Conventional five-a-side means ten players in total, seven-a-side fourteen and padel doubles four. Those formats affect the enquiry, but they do not prove that any real court is suitable.'}</p>
    <div className="grid lg:grid-cols-2 gap-5 mt-12">{[[ar?'كرة قدم':'FOOTBALL',ar?'تدريب، خماسي، سباعي، مباراة مسائية':'5v5, 7v7, training and evening sessions','football',Goal],[ar?'بادل':'PADEL',ar?'زوجي، بداية للمبتدئ، جلسة اجتماعية، تدريب':'Doubles, introduction, friendly play and skill drills','padel',Target]].map(([name,description,sport,Icon],i)=><div key={i} className="border-2 border-[#CADACA] p-8 bg-white"><Icon size={37} className="text-[#315B43]"/><h2 className="arena-display text-3xl font-black mt-7">{name as string}</h2><p className="mt-4 leading-8 text-sm text-[#345943]">{description as string}</p><Link href={arenaPath(locale,'courts')+'?sport='+sport} className="font-black text-sm flex gap-2 mt-7">{ar?'اعرف صيغ اللعب':'Explore formats'}<ArrowUpRight size={17}/></Link></div>)}</div>
   </section>
  </>}
  {topic==='schedule'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.7fr_1.1fr] gap-10"><div>{h(ar?'فرق بين ساعة مفضلة وخانة متاحة':'PREFERENCE IS NOT LIVE INVENTORY')}<p className="mt-6 text-[#395943] leading-9">{ar?'الجدول الحقيقي يعتمد على مخزون ملاعب نشط وشروط تعارض واستثناءات ومزامنة طلبات العميل والموظف. نموذج Arena لا يعرف إذا كان أي ملعب متاحًا ويعتمد تسجيل التفضيلات فقط.':'A real venue calendar must synchronize actual court inventory, buffers, staff decisions and offline bookings. Arena has no such integration; no displayed hour is available or bookable by default.'}</p></div>
    <div className="border-2 border-[#BBCDBD] bg-white p-7 sm:p-9"><div className="flex items-center gap-3"><CalendarClock size={30} className="text-[#315B43]"/><p className="text-xs font-black tracking-widest">{ar?'نماذج لساعات الطلب فقط':'EXAMPLE TIME PREFERENCES ONLY'}</p></div><div className="grid grid-cols-2 gap-3 mt-8">{ARENA.windows.map(t=><div className="border border-[#B9CEBF] p-6 text-center font-mono text-2xl font-black" key={t}>{t}</div>)}</div><p className="mt-6 text-[#345943] leading-7 text-xs">{ar?'لا توجد إشارة متاح/محجوز لأننا لا نتصل بجدول ملعب حقيقي.':'No available/booked indicators because there is no real venue inventory.'}</p><Link href={arenaPath(locale,'book')} className="mt-8 inline-flex bg-[#102B26] px-6 py-4 text-white font-black text-sm">{ar?'حدد وقتًا تفضيليًا':'SAVE A TIME PREFERENCE'}</Link></div>
   </section>
  </>}
  {topic==='pricing'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="leading-9 max-w-3xl text-[#395943]">{ar?'الموقع التصوري لا يختلق أسعار حجز أو عروض اشتراكات. السعر المناسب يتحدد من نوع الملعب وموقعه وفترة اللعب وسياسة المعدات والمكان الفعلي، ويعتمد رسميًا من المالك.':'This concept does not fabricate court fees or discounts. The owner must approve pricing based on venue, sport, timing, amenities, extras and cancellation conditions.'}</p><div className="grid md:grid-cols-2 gap-5 mt-12">{pricing.map((x,i)=><article key={i} className="bg-white border border-[#BDD1BF] p-8"><span className="text-[#315B43] font-mono text-sm">POLICY / 0{i+1}</span><h2 className="arena-display text-2xl sm:text-3xl font-black mt-6">{ar?x.ar:x.en}</h2><p className="text-[#395943] leading-8 text-sm mt-5">{ar?x.bodyAr:x.bodyEn}</p></article>)}</div></section>
  </>}
  {topic==='leagues'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.75fr_1fr] gap-10"><div>{h(ar?'من جدول مباريات لدوري منظم':'A LEAGUE NEEDS MORE THAN A FIXTURE CARD')}<p className="mt-6 leading-9 text-[#395943]">{ar?'عند تنفيذ موقع لملعب حقيقي يمكن إضافة إعدادات الفرق وجدول الأدوار والشروط والنتائج المعتمدة. لكن لا يوجد دوري يعمل حاليًا ولا مراكز فرق أو رسوم تسجيل حقيقية.':'A real club may publish fixtures, groups, result approvals and owner-created participation rules. This portfolio concept does not operate any league, collect entry fees or fabricate team rankings.'}</p></div>
    <div className="grid gap-3">{[[ar?'تسجيل الفرق':'Team registration',ar?'أسماء وبيانات بعد موافقة النادي':'Owner-approved team roster'],[ar?'جدول المباريات':'Fixtures',ar?'حساب التعارضات قبل النشر':'Conflict-reviewed schedule'],[ar?'نتائج معتمدة':'Validated results',ar?'صلاحيات منظّم للنتائج':'Authorized result entry'],[ar?'شروط المشاركة':'Terms',ar?'إلغاء وعقوبات وقواعد حقيقية':'Real participation rules']].map(([a,b],i)=><div key={i} className="bg-white border border-[#C4D6C5] p-6 flex gap-5"><Trophy className="text-[#315B43] shrink-0"/><div><h3 className="font-black">{a}</h3><p className="text-sm text-[#395943] mt-3">{b}</p></div></div>)}</div></section>
  </>}
  {topic==='coaches'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><div className="max-w-4xl">{h(ar?'بدون أسماء مدربين مختلقة':'NEVER INVENT A COACH OR CREDENTIAL')}<p className="mt-6 text-[#395943] leading-9">{ar?'قسم المدربين مفيد جدًا لموقع ملعب يقدم تدريبًا فعليًا؛ لكنه يتطلب موافقة المدربين والصور وملخص الخبرة والمواعيد. في هذا المفهوم نعرض أصناف المهارات فقط.':'Coach profiles are valuable only when the venue truly employs or partners with those professionals and has consented photography, verified qualifications and operating schedules. Arena presents training formats, never fake staff biographies.'}</p></div>
    <div className="grid md:grid-cols-3 gap-5 mt-10">{[[ar?'تدريب كرة قدم':'Football techniques',ar?'التمرير والتحرك والتدرج في التدريب':'Movement, passing and structured practice','football-training'],[ar?'بادل للمبتدئين':'Padel introduction',ar?'القواعد والتمركز مع شريك الفريق':'Scoring and partner positioning','padel-intro'],[ar?'مهارات بادل':'Padel drills',ar?'الارتدادات والتواصل والسيطرة على الكرة':'Rebounds, coordination and rally control','padel-skills']].map(([name,description,slug],i)=><Link href={arenaPath(locale,'courts/'+slug)} key={i} className="bg-white border border-[#BFD2C2] p-8"><Target size={31} className="text-[#315B43]"/><h3 className="arena-display font-black text-2xl mt-9">{name}</h3><p className="text-sm text-[#395943] leading-8 mt-5">{description}</p><span className="mt-7 inline-flex gap-3 font-bold text-sm">{ar?'فهم الجلسة':'READ FORMAT'}<ArrowUpRight size={17}/></span></Link>)}</div></section>
  </>}
  {topic==='process'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><div className="max-w-4xl mb-10"><h2 className="arena-display text-4xl sm:text-5xl font-black">{ar?'رحلة مستخدم صريحة من البداية للنهاية':'A TRANSPARENT CONVERSION JOURNEY'}</h2><p className="mt-6 text-[#395943] leading-9">{ar?'في تجربة مافكس تصل الرحلة لتسجيل رقم مرجعي؛ لا يوجد نظام منشأة خارجية ينفذ حجزًا أو يخصم مقابلًا.':'In the Mavvix example, the journey ends at a saved reference. No external venue calendar or payment gateway completes a booking.'}</p></div><div className="space-y-4">{process.map((p,i)=><div key={i} className="grid lg:grid-cols-[105px_.7fr_1fr] items-start gap-7 bg-white border border-[#C4D6C5] p-7 sm:p-9"><span className="arena-display text-5xl text-[#326344] font-black">{String(i+1).padStart(2,'0')}</span><h2 className="arena-display text-3xl font-black">{p.title[locale]}</h2><p className="text-[#395943] text-sm leading-8">{p.body[locale]}</p></div>)}</div></section>
  </>}
  {topic==='about'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.8fr_1.1fr] gap-12"><div><Trophy size={57} className="text-[#326344]"/>{h(ar?'Arena موقع تصوّري من تصميم مافكس':'ARENA IS A MAVVIX DESIGN CONCEPT')}</div><div className="space-y-6 text-[#395943] leading-9 text-base"><p>{ar?'اسم Arena Courts والهوية المرئية مُصممان لاستعراض تجربة موقع ملاعب متخصصة قابلة للتطوير. صورة الملعب منشورة بترخيص عام، ولا تمثل منشأة تابعة لنا أو نشاطًا يبيع ملاعب فعليًا.':'Arena Courts is an original editorial identity for a Mavvix sports website experience. The real football photograph is public-domain editorial media and does not depict any Arena-owned facility.'}</p><p>{ar?'في مشروع عميل حقيقي يتم ربط الفروع ومواصفات الأرضية والجدول وأسعار الملاعب وتأكيد الرسائل بالبيانات التي يقدمها صاحب العمل، مع سياسات الخصوصية والتعاقد.':'A real operator’s website would use verified courts, owner-approved pricing, rights-cleared premises images, inventory integration and actual confirmation messaging before accepting bookings.'}</p></div></section>
  </>}
  {topic==='contact'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-10"><div>{h(ar?'خلّي ملاعبك تختار شكل موقعها الخاص':'BUILD THE REAL DIGITAL VENUE FOR YOUR BRAND')}<p className="mt-6 text-[#395943] leading-9">{ar?'شركة مافكس تقدر تبني موقع حجز ملاعب بعلامتك وبيانات ملاعبك الفعلية مع إمكانية ربط جدول ومتابعة طلبات وتحديد صلاحيات إدارة. التواصل هنا مع شركة برمجيات وليس مشغل ملعب.':'Mavvix can develop a real venue website with your identity, approved photos and court schedules, authenticated booking controls and meaningful conversion tracking. This contact reaches a software company, not a sports facility.'}</p><a className="inline-flex mt-8 bg-[#102B26] px-8 py-5 text-white gap-3 items-center font-black text-sm" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer">{ar?'اطلب عرض سعر للموقع':'REQUEST A SITE PROPOSAL'}<ArrowUpRight size={18}/></a></div>
    <div className="p-8 sm:p-12 bg-[#DDE9DC]"><h3 className="arena-display text-3xl font-black">{ar?'جهز معلومات المشروع':'OWNER-SUPPLIED BRIEF'}</h3>{[ar?'عدد الملاعب وصيغ اللعب المدعومة':'Actual court count and formats',ar?'الصور المرخصة ومواصفات الأرضية':'Approved photos and floor specifications',ar?'مواعيد العمل وقواعد التعارض':'Real schedules and conflict rules',ar?'سياسات الحجز والتعديل والإلغاء':'Booking, change and refund rules',ar?'وسيلة الدفع وحسابات التشغيل':'Payment provider and operator workflow'].map((s,i)=><div key={i} className="flex items-center gap-3 mt-6 text-sm"><CheckCircle2 size={19}/>{s}</div>)}</div>
   </section>
  </>}
  <section className="bg-[#F0B044] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-7"><div><p className="text-xs tracking-widest uppercase font-black">ARENA / NEXT MOVE</p><h2 className="arena-display text-3xl sm:text-4xl font-black mt-3">{ar?'اعرف صيغ الملاعب أو جهز تفضيل وقتك':'SELECT A FORMAT. PREPARE A REQUEST.'}</h2></div><div className="flex flex-wrap gap-3"><Link href={arenaPath(locale,'courts')} className="px-6 py-4 border-2 border-[#102B26] text-sm font-black">{ar?'دليل الصيغ':'COURT FORMATS'}</Link><Link href={arenaPath(locale,'book')} className="bg-[#102B26] text-white px-7 py-4 font-black text-sm">{ar?'نموذج الطلب':'REQUEST FORM'}</Link></div></div></section>
 </div>;
}
