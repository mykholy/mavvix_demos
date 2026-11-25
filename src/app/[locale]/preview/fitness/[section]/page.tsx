import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n/config';
import {PULSE,pulsePath,pulseText} from '@/lib/verticals/fitness/data';
import {ArrowUpRight,ShieldCheck,Activity,CheckCircle2,CalendarClock,Dumbbell,MapPin} from 'lucide-react';
const sectionData={
 memberships:{ar:'نظام العضوية: اسأل قبل ما تدفع',en:'Gym memberships: scope before payment',summaryAr:'العضوية الحقيقية تحدد الخدمات والفرع وساعات الاستخدام وقواعد التجميد والإلغاء والسعر وطريقة الدفع. لا توجد خطط مسعّرة أو دفعات في هذه التجربة.',summaryEn:'A real club membership must specify facilities, branches, access rules, freeze/cancellation terms and fees. This concept does not sell active memberships.',items:[
 ['تجربة أول حصة','Trial class interest','راجع نوع الحصة والمستوى قبل أي التزام.','Ask about class level, equipment and supervision before committing.'],
 ['حضور فئة محددة','Class package interest','اسأل عن عدد الحصص وشروط الغياب والمشاركة.','Clarify permitted class visits, cancellations and eligibility.'],
 ['استخدام المساحة','Open gym membership','تحقق من المرافق المعتمدة والأجهزة وساعات التشغيل.','Confirm actual facilities, equipment, opening hours and access terms.']]},
 schedule:{ar:'الجدول الأسبوعي: من الفكرة إلى تأكيد التوافر',en:'A weekly training schedule without fake availability',summaryAr:'الأسبوع المعروض مثال لتحسين فهم تنوع الحصص، وليس رزنامة عمل حقيقية أو وعدًا بسعة متاحة.',summaryEn:'The example schedule illustrates a balanced program mix, not actual live sessions, remaining spots or coach shifts.',items:[
 ['الحصص الجماعية','Group classes','السعة وعدد المشاركين والمدرب تتحدد من بيانات النادي الحقيقي.','Capacity and coaches must come from live operator information.'],
 ['مواعيد التجربة','Trial windows','اكتب الوقت المفضل فقط واستنى التأكيد الرسمي.','State a preferred time window, not a claimed reservation.'],
 ['إعادة الجدولة','Changes and cancellations','سياسة التعديل يجب أن تكون معتمدة ومعلنة من صاحب النادي.','Only operator-approved policies should govern cancellations.']]},
 coaching:{ar:'اختار التخصص المناسب للحصة',en:'Training specialisms, not fabricated coach profiles',summaryAr:'محتوى تخصصات المدربين يوضح طبيعة الخدمة، لكنه لا يفترض وجود موظفين أو شهادات أو صور أو أوقات عمل لم يتم توثيقها.',summaryEn:'Explain coaching competencies without fabricating named instructors, qualifications, portraits or duty rosters.',items:[
 ['أساسيات القوة','Strength skills','شرح الوقفة والمعدات والتدرج الآمن في الجهد.','Technique, supervised setup and appropriate effort variation.'],
 ['اللياقة الجماعية','Conditioning sessions','توضيح إيقاع الأنشطة والراحة وحدود مشاركة المبتدئين.','Effort pacing, rest and class alternatives for beginners.'],
 ['جودة الحركة','Movement practice','حركات مريحة ومناسبة للمستوى دون وعود علاجية.','Comfortable movements without clinical treatment claims.']]},
 'first-visit':{ar:'أول زيارة: حضر خطواتك مش مخاوفك',en:'First visit: clarity before intensity',summaryAr:'من المفيد معرفة موعد الوصول ومتطلبات الملابس وطريقة استخدام الأجهزة قبل الانضمام لأول حصة.',summaryEn:'A practical first-visit guide focuses on arrival preparation, class requirements and equipment orientation.',items:[
 ['حدد فئة مبدئية','Choose a first category','ابدأ بالحصة الأقرب لخبرتك وتفضيلك بدل مقارنة نفسك بالآخرين.','Select by actual experience, not comparison or appearance.'],
 ['تعرّف على المعدات','Ask about equipment','لا تستخدم أجهزة غير مألوفة دون توجيه مؤهل.','Ask trained staff before using unfamiliar machinery.'],
 ['راجع الحدود','Know your limits','الصفحة توجيهية وليست اختبار لياقة أو موافقة طبية.','General information, not a health or exercise readiness screening.']]},
 locations:{ar:'المقر الحقيقي يحتاج بيانات موثقة',en:'Real gym locations require verified operator data',summaryAr:'لا تعرض هذه التجربة أي فرع أو ساعة عمل أو رقم تواصل وهمي. عند التنفيذ التجاري يُضيف العميل الفروع المعتمدة والتجهيزات والصور الخاصة به.',summaryEn:'Pulse has no claimed operating venue or opening hours. A commissioned site requires approved branch, equipment and licensed facility media.',items:[
 ['بيانات الفرع','Branch identity','العنوان ووسيلة التواصل وساعات العمل المعتمدة.','Verified street address, contact and operating hours.'],
 ['تجهيزات حقيقية','Actual equipment','صوّر مرافق النادي التي يملكها بالفعل لا صورًا من أماكن أخرى.','Photograph facilities actually operated by the client.'],
 ['قدرة الاستقبال','Staff and class capacity','توافر الفصول يجب أن يرتبط بالجدول الفعلي.','Class capacity must be sourced from the real timetable.']]},
 process:{ar:'من استكشاف الحصة لطلب اهتمام محفوظ',en:'From program discovery to an idempotent enquiry',summaryAr:'الهدف هو تنظيم الاستفسار من أول اختيار حتى يظهر في لوحة متابعة محمية، دون إصدار عضوية أو حجز فعلي.',summaryEn:'A structured class enquiry is saved and reviewable by authorized staff, without issuing an access pass or confirming a class.',items:[
 ['اختيار البرنامج','Select class','القوة أو اللياقة أو الحركة مع مستوى خبرتك.','Choose a specific training topic and realistic experience level.'],
 ['تحديد التفضيل','State preferences','حدد نوع الاستفسار والمنطقة واليوم إن شئت.','Provide enquiry type, broad region and optional day preference.'],
 ['حفظ رقم مرجعي','Save reference','يحفظ النظام الطلب بمرجع واحد حتى لو أعيد الإرسال.','An idempotent request is stored; only an actual provider can fulfill it.']]},
 about:{ar:'هوية Pulse District: تصور من Mavvix',en:'Pulse District: an editorial Mavvix website identity',summaryAr:'هذا تصميم برمجي حقيقي له صفحات وحصص ونموذج استفسار، لكنه ليس ناديًا يعمل بالفعل ولا يمثل عملاء أو أعضاء أو مدربين.',summaryEn:'Pulse is a real engineered portfolio experience but not a licensed operating gym, a client case study, or a record of member outcomes.',items:[
 ['هوية أصلية','Bespoke art direction','حروف حركية كبيرة وألوان فحمية وبنفسجي وأخضر حمضي.','Kinetic typography and a distinct graphite, violet and lime system.'],
 ['محتوى مفصل','Service documentation','تسع حصص مكتوبة بمستويات ومتطلبات وأسئلة مناسبة.','Nine original service dossiers with suitability and planning context.'],
 ['تنفيذ عميل حقيقي','Production commissioning','استبدل الصور والمحتوى والجدول بالمواد المعتمدة من صاحب النشاط.','Replace all sample facts with the owner’s approved data and integrations.']]},
 contact:{ar:'نفّذ موقع جيم احترافي مع مافكس',en:'Commission a fitness business website with Mavvix',summaryAr:'نناقش معك الهوية والصفحات وجدول الحصص وطرق عرض الاشتراك ولوحة الإدارة والربط مع أي نظام تشغيل موجود بالفعل.',summaryEn:'Discuss your real program catalogue, trainer bios, schedule integrations, membership interest capture and brand direction with Mavvix.',items:[
 ['قائمة الخدمات','Actual services','قدّم أنواع الحصص التي تقدمها وأسعارها وشروطها الفعلية.','Supply approved classes, prices and service terms.'],
 ['بيانات التشغيل','Operational workflow','توافر المدربين والسعة والحجز والدفع تتطلب تكاملًا مع النظام الحقيقي.','Actual capacity and payment require real system integrations.'],
 ['صور بموافقة','Approved imagery','الصور الفعلية للمكان والفريق تحتاج حقوق استخدام واضحة.','Use original facility and consented staff media.']]}
} as const;
type Topic=keyof typeof sectionData;
export function generateStaticParams(){return Object.keys(sectionData).map(section=>({section}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;section:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 const d=sectionData[section as Topic];return d?{title:d[locale]+' | Pulse District',description:locale==='ar'?d.summaryAr:d.summaryEn,robots:{index:false}}:{};
}
export default async function FitnessTopic(props:{params: Promise<{locale:Locale;section:string}>}) {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 const topic=sectionData[section as Topic];if(!topic)notFound();const ar=locale==='ar';
 return <div>
  <section className="bg-[#141421] text-white border-b-[10px] border-[#E0FE61]">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-20"><nav className="text-xs text-[#D6D4E8]"><Link href={pulsePath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {topic[locale]}</nav><p className="font-mono text-[#E0FE61] mt-12 text-xs font-black tracking-widest">PULSE / {section.toUpperCase()}</p>
    <div className="grid lg:grid-cols-[1fr_.55fr] gap-10 mt-6 items-end"><h1 className="pulse-display font-black text-4xl sm:text-7xl uppercase leading-tight">{topic[locale]}</h1><p className="text-sm leading-9 text-[#E8E6F3]">{ar?topic.summaryAr:topic.summaryEn}</p></div></div>
  </section>
  <section data-sector-specific="gym-topic-explainer" className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><div className="grid lg:grid-cols-[.5fr_1fr] gap-10"><div><Activity size={36} className="text-[#5939B3]"/><h2 className="pulse-display text-3xl sm:text-4xl mt-6">{ar?'فكر في المطلوب قبل القرار':'QUESTIONS BEFORE YOU COMMIT'}</h2></div><div className="space-y-4">{topic.items.map(([a,b,c,d],i)=><article key={i} className="border-2 border-[#D6D4DF] bg-white p-7 grid md:grid-cols-[70px_1fr] gap-6"><span className="font-mono text-3xl text-[#5939B3] font-black">{String(i+1).padStart(2,'0')}</span><div><h3 className="text-xl font-black">{ar?a:b}</h3><p className="text-sm leading-9 text-[#3F3D50] mt-4">{ar?c:d}</p></div></article>)}</div></div></section>
  <section data-sector-specific="gym-topic-service-mapping" className="bg-[#E5E2F1] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="pulse-display text-3xl sm:text-5xl">{ar?'افهم الحصص المرتبطة بقرارك':'EXPLORE CLASSES BEFORE DECIDING.'}</h2><div className="grid md:grid-cols-3 gap-4 mt-10">{PULSE.services.slice(0,3).map(s=><Link href={pulsePath(locale,'classes/'+s.slug)} key={s.slug} className="bg-white border border-[#D3CEE2] p-7"><span className="font-mono text-xs text-[#5939B3]">PROGRAM FILE / {String(s.rank).padStart(2,'0')}</span><h3 className="font-black text-lg mt-5">{pulseText(s.title,locale)}</h3><p className="text-sm leading-8 mt-3 text-[#3F3D50]">{pulseText(s.summary,locale)}</p><span className="text-xs font-black mt-6 flex gap-2">{ar?'تفاصيل الحصة':'READ DOSSIER'}<ArrowUpRight size={16}/></span></Link>)}</div></div></section>
  <section data-sector-specific="gym-topic-operation" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-[auto_1fr] gap-7"><ShieldCheck size={35} className="text-[#5939B3]"/><div><h2 className="font-black text-2xl">{ar?'مهم: التنفيذ الحقيقي له شروطه':'Actual operations require an owner and real records'}</h2><p className="mt-5 text-sm leading-9 text-[#3F3D50] max-w-4xl">{ar?'Pulse تجربة موقع من Mavvix وليست اشتراكًا أو مقرًا أو حجزًا فعليًا. لا تعرض معلومات مدربين أو أسعارًا أو فروعًا أو مواعيد لم يؤكدها مشغل حقيقي.':'Pulse is a Mavvix concept, not an operational club, actual membership or booked session. Prices, employees, addresses and availability require independently verified owner information.'}</p></div></section>
  <section className="bg-[#E0FE61] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap gap-8 justify-between items-center"><div><p className="uppercase text-xs font-black tracking-widest">PULSE / NEXT STEP</p><h2 className="pulse-display font-black text-3xl sm:text-4xl mt-4">{ar?'جهز استفسار محدد بدل وعود غير واقعية':'MAKE A REQUEST, NOT A FALSE BOOKING.'}</h2></div><Link href={pulsePath(locale,'trial')} className="bg-[#141421] text-[#E0FE61] px-8 py-5 text-sm font-black flex gap-3">{ar?'جرّب نموذج الحصة':'START ENQUIRY'}<ArrowUpRight size={18}/></Link></div></section>
 </div>;
}
