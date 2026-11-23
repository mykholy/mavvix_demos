import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { SECTOR_IMAGES } from '@/lib/media/sector-images';
import Link from 'next/link';
import { MavvixHeader } from '@/components/shared/MavvixHeader';
import { MavvixFooter } from '@/components/shared/MavvixFooter';
import { ContactDock } from '@/components/shared/ContactDock';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import {
  Building2,
  Factory,
  Home,
  HeartPulse,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  GraduationCap,
  Wrench,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Database,
  Trophy
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

const demos = [
  {
    number: '01',
    slug: 'construction',
    name: { ar: 'أطلس للبناء والتطوير الهندسي', en: 'Atlas Structures & Contracting' },
    sector: { ar: 'مقاولات وهندسة وتجهيزات', en: 'Construction & Engineering' },
    icon: Building2,
    color: '#D26A3B',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    routesCount: 11,
    tagline: {
      ar: 'المشروع القوي يبدأ بتفاصيل واضحة ونطاق محدد',
      en: 'Build quality starts with a clear scope and transparent deliverables.'
    },
    journeys: [
      { ar: 'مستكشف المشاريع وتصفية المساحات ونوع الأعمال', en: 'Project explorer by sector, scope & area' },
      { ar: 'معالج تسعير المقاولات وحساب التكلفة التقديرية', en: 'Multi-step tender scope wizard & BOQ inquiry' },
      { ar: 'إيصال حفظ محلي في SQLite ومتابعة الطلبات', en: 'Persisted local SQLite quotation receipt' }
    ],
    features: ['Project Atlas Explorer', 'Interactive Scope Wizard', 'Deliverables Breakdown']
  },
  {
    number: '02',
    slug: 'industrial',
    name: { ar: 'فيرولاين للصناعات والتشكيل المعدني', en: 'Ferroline Industrial Supplies' },
    sector: { ar: 'مصانع وتوريدات هندسية وتصدير', en: 'Industrial & Manufacturing' },
    icon: Factory,
    color: '#DE9E37',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    routesCount: 11,
    tagline: {
      ar: 'المواصفات أولاً، ثم يبدأ التوريد بدقة قياسية',
      en: 'Specify accurately. Source confidently with full metallurgical compliance.'
    },
    journeys: [
      { ar: 'دليل المنتجات والمواصفات بالكود الصناعي ودرجة الصلب', en: 'Technical SKU catalog with grade & spec filters' },
      { ar: 'سلة طلب عروض أسعار متعددة البنود مع كميات الحد الأدنى', en: 'Multi-line RFQ basket with MOQ & pack rules' },
      { ar: 'مقارنة فنية مباشرة بين الخامات والشهادات القياسية', en: 'Side-by-side technical material comparator' }
    ],
    features: ['Technical SKU Dossier', 'Multi-line RFQ Basket', 'Specification Matrix']
  },
  {
    number: '03',
    slug: 'real-estate',
    name: { ar: 'ميريديان للتطوير والاستثمار العقاري', en: 'Meridian Residences & Developments' },
    sector: { ar: 'تطوير وتسويق عقاري فاخر', en: 'Luxury Real Estate' },
    icon: Home,
    color: '#A8764F',
    bgColor: 'bg-stone-50',
    borderColor: 'border-stone-200',
    routesCount: 12,
    tagline: {
      ar: 'مساحات تختارها بالمقارنة والبيانات الدقيقة، مش بالصور بس',
      en: 'Explore premier spaces with the engineering details that matter.'
    },
    journeys: [
      { ar: 'تصفية 24 وحدة حسب الميزانية والغرف ومخطط الدور', en: 'Filter 24 residential units by budget, area & floor' },
      { ar: 'مقارنة تفاعلية مباشرة بين 3 وحدات وجداول الأقساط', en: '3-unit side-by-side comparison & payment schedule' },
      { ar: 'طلب موعد معاينة خاصة مع حفظ الحالة محليًا', en: 'Simulated private viewing request & confirmation' }
    ],
    features: ['3-Unit Comparison Drawer', 'Installment Calculator', 'Floorplan Inspector']
  },
  {
    number: '04',
    slug: 'dental',
    name: { ar: 'لومِن لطب وجراحة الأسنان التخصصية', en: 'Lumen Dental Clinic & Specialists' },
    sector: { ar: 'عيادات ومراكز طبية تخصصية', en: 'Specialist Healthcare' },
    icon: HeartPulse,
    color: '#2A8E7D',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    routesCount: 11,
    tagline: {
      ar: 'اعرف تفاصيل الزيارة والتجهيزات قبل ما تطلب موعدك',
      en: 'Clear clinical information and transparent preparation before your visit.'
    },
    journeys: [
      { ar: 'مستكشف التخصصات وفريق الأطباء الاستشاريين', en: 'Specialty finder & consultant doctor profiles' },
      { ar: 'دليل الزيارة الأولى وإرشادات التحضير قبل الموعد', en: 'First-visit preparation guide & service dossier' },
      { ar: 'طلب موعد كشف تجريبي واختيار الفترة المفضلة', en: 'Appointment preference intake (no clinical PII)' }
    ],
    features: ['Doctor & Service Matcher', 'Patient Preparation Dossier', 'Intake Preference Scheduler']
  },
  {
    number: '05',
    slug: 'ecommerce',
    name: { ar: 'نوريا أتيليه للأزياء والمقتنيات', en: 'Noria Atelier Fashion & Objects' },
    sector: { ar: 'تجارة إلكترونية ومقتنيات فاخرة', en: 'Boutique E-commerce' },
    icon: ShoppingBag,
    color: '#9E472A',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    routesCount: 13,
    tagline: {
      ar: 'تفاصيل بسيطة. حضور مختلف. وحسابات سلة دقيقة',
      en: 'Considered pieces with accurate stock, multi-line cart, and simulated checkout.'
    },
    journeys: [
      { ar: 'تصفح التشكيلات واختيار المقاسات والخامات المتوفرة', en: 'Collection browser with real variant stock validation' },
      { ar: 'سلة مشتريات متعددة وحساب الشحن وكوبونات الخصم', en: 'Cart drawer with real discount logic & shipping rules' },
      { ar: 'إتمام طلب تجريبي بالدفع عند الاستلام مع إيصال محلي', en: 'Simulated cash-on-delivery checkout & SQLite order' }
    ],
    features: ['Variant Stock Matrix', 'Discount & Shipping Engine', 'Simulated Checkout Receipt']
  },
  {
    number: '06',
    slug: 'portfolio',
    name: { ar: 'سلمى حسن — استوديو التصميم المعماري', en: 'Salma Hassan Architecture Studio' },
    sector: { ar: 'بورتفوليو معماري واستشارات تصميمية', en: 'Design & Architecture Studio' },
    icon: Palette,
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    routesCount: 10,
    tagline: {
      ar: 'التصميم مش مجرد شكل؛ قرارات هندسية وراء كل تفصيلة',
      en: 'Good architecture makes deliberate design decisions visible.'
    },
    journeys: [
      { ar: 'دراسات حالة تفصيلية توضح البدائل المرفوضة والمختارة', en: 'In-depth case studies with decision rationale' },
      { ar: 'معرض مرئي تفاعلي وتبديل نمط العرض بين الشبكة والقائمة', en: 'Interactive gallery with grid/list mode toggle' },
      { ar: 'معالج صياغة ملخص المشروع المبدئي وطلب استشارة', en: 'Interactive brief configurator & studio intake' }
    ],
    features: ['Decision-Led Case Studies', 'Interactive Grid/List Explorer', 'Client Brief Builder']
  },
  {
    number: '07',
    slug: 'restaurant',
    name: { ar: 'سفرة زعفران — مطبخ شرقي أصيل', en: 'Saffron Table Heritage Dining' },
    sector: { ar: 'مطاعم وضيافة وتجارب طعام', en: 'Hospitality & Dining' },
    icon: UtensilsCrossed,
    color: '#C65D23',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    routesCount: 11,
    tagline: {
      ar: 'الأكل الأصيل يبدأ من اختيار المكونات والبهارات الطازجة',
      en: 'Heritage recipes prepared with deliberate seasonal craft and allergen clarity.'
    },
    journeys: [
      { ar: 'قائمة طعام تفاعلية مع تصفية مسببات الحساسية والأنظمة الغذائية', en: 'Dietary & allergen-filtered menu explorer' },
      { ar: 'تخصيص مكونات الطبق والإضافات وتحديث السعر فوريًا', en: 'Dish modifier customizer with live price updates' },
      { ar: 'طلب استلام تجريبي أو طلب حجز طاولة باختيار الفرع', en: 'Demo pickup order & table reservation request' }
    ],
    features: ['Allergen & Dietary Filters', 'Real-time Dish Customizer', 'Branch Table Request']
  },
  {
    number: '08',
    slug: 'academy',
    name: { ar: 'نوفا للتعلم والتدريب المهني المتقدم', en: 'Nova Learning Academy' },
    sector: { ar: 'تعليم مهني ومنصات تدريب احترافية', en: 'EdTech & Professional Academy' },
    icon: GraduationCap,
    color: '#4F46E5',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    routesCount: 12,
    tagline: {
      ar: 'ابدأ بدرس تجريبي حقيقي، واختبر فهمك وتتبع تقدمك',
      en: 'Experience a real interactive lesson, test your mastery, and track progress.'
    },
    journeys: [
      { ar: 'تصفح مسارات التعلم والمناهج التفصيلية للدورات', en: 'Curriculum explorer with syllabus & module breakdown' },
      { ar: 'مشغل درس تفاعلي متكامل مع اختبار فوري متعدد الخيارات', en: 'Fully functioning preview lesson with interactive quiz' },
      { ar: 'تسجيل نسبة الإنجاز والدرجة في SQLite وطلب الالتحاق', en: 'Persisted quiz score progress & enrollment interest' }
    ],
    features: ['Interactive Lesson Player', 'Scored Knowledge Quiz', 'Persistent Progress Tracker']
  },
  {
    number: '09',
    slug: 'auto-service',
    name: { ar: 'تورك جراج — موقع مراكز صيانة السيارات', en: 'Torque Garage — Automotive Service Experience' },
    sector: { ar: 'صيانة سيارات وفحص وتشخيص', en: 'Automotive Service & Inspection' },
    icon: Wrench,
    color: '#FB6935',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    routesCount: 13,
    tagline: { ar: 'افهم العلامة، اختار الخدمة، وسجّل طلب فحص واضح', en: 'Understand the symptom, select the service and save a structured inspection request.' },
    journeys: [
      { ar: 'ثمانية ملفات فنية لخدمات الصيانة', en: 'Eight authored technical service dossiers' },
      { ar: 'تحديد الماركة والموديل ومؤشر العطل', en: 'Vehicle make, model, warning category and service selection' },
      { ar: 'طلب محفوظ برقم مرجعي وينتظر تأكيد المشغّل', en: 'Persistent request reference with no false appointment confirmation' }
    ],
    features: ['Diagnostic Field Notes', 'Car Model Enquiry', 'Validated Request Workflow']

  },
  {
    number:'10',
    slug:'home-maintenance',
    name:{ar:'فكسورا كير — موقع شركات الصيانة والتكييف',en:'Fixora Care — Home Maintenance Website'},
    sector:{ar:'صيانة منزلية وتكييف وسباكة وكهرباء',en:'Home Services, AC, Plumbing & Electrical'},
    icon:Wrench,
    color:'#F7B347',
    bgColor:'bg-blue-50',
    borderColor:'border-blue-200',
    routesCount:14,
    tagline:{ar:'اختار مشكلة البيت وخطوات المعاينة في تجربة منظمة وآمنة',en:'Choose the issue and explore a safe, structured service request journey'},
    journeys:[
      {ar:'8 ملفات خدمات صيانة متخصصة بالتفاصيل',en:'Eight authored home-repair service dossiers'},
      {ar:'نموذج 3 مراحل: المشكلة، المنطقة، وسيلة التواصل',en:'Three-step issue, coverage and contact enquiry'},
      {ar:'حفظ الطلب برقم مرجعي دون ادعاء إرسال فني',en:'Persisted request with no false technician dispatch'}],
    features:['Safety-first Service Triage','Three-step Intake','Operator Confirmation Required']
  },
  {
    number:'11',slug:'salon-spa',
    name:{ar:'فيلورا بيوتي — موقع صالونات تجميل',en:'Velora Beauty — Premium Salon & Spa Website'},
    sector:{ar:'تجميل وعناية بالشعر والأظافر',en:'Salon, Hair & Nail Care'},
    icon:HeartPulse,color:'#9B6070',bgColor:'bg-rose-50',borderColor:'border-rose-200',routesCount:16,
    tagline:{ar:'قائمة عناية أنيقة ومجال للتخصص وتفضيلات المواعيد بلا وعود وهمية',en:'Editorial beauty stories, detailed service dossiers and honest appointment preferences'},
    journeys:[
      {ar:'10 خدمات محددة مع المدة والأسئلة والخطوات',en:'Ten original bilingual service dossiers and indicative durations'},
      {ar:'تصفية قائمة الخدمات بالأنواع وشرح تخصص كل مجال',en:'Beauty-service category explorer and role-specific guidance'},
      {ar:'استفسار محفوظ مع رقم مرجعي دون ادعاء تأكيد حجز',en:'Persisted pending-only appointment reference with consent and validation'}
    ],
    features:['Speciality-aware Intake','Beauty Editorial Journal','Pending-only Booking Flow']
  },
  {
    number:'12',slug:'fitness',
    name:{ar:'بالس ديستريكت — موقع جيم وحصص لياقة',en:'Pulse District — Premium Fitness Club Website'},
    sector:{ar:'جيم وعضويات وحصص تدريب جماعي',en:'Fitness, Membership & Group Classes'},
    icon:Wrench,color:'#8E6BFF',bgColor:'bg-violet-50',borderColor:'border-violet-200',routesCount:15,
    tagline:{ar:'حصص رياضية موضحة بالمستويات وطلب تجربة محفوظ بدون عضوية وهمية',en:'Kinetic fitness site with authored class guides and honest pending-only trial'},
    journeys:[
      {ar:'تصفح 9 حصص للقوة واللياقة والحركة حسب المستوى',en:'Nine original programs with experience-level selection'},
      {ar:'جدول توضيحي ومقارنة عضوية ومعلومات بداية التدريب',en:'Illustrative weekly timetable, memberships and first-visit preparation'},
      {ar:'استفسار محفوظ بمعرّف فريد وموافقة صريحة دون حجوزات وهمية',en:'Persisted class/trial enquiry with validation, consent and idempotency'}
    ],
    features:['Class-Level Selector','Pending-only Trial Request','Training Knowledge Journal']
  },
  {
    number:'13',slug:'sports-venues',
    name:{ar:'أرينا كورتس — موقع ملاعب كرة وبادل',en:'Arena Courts — Football & Padel Venue Website'},
    sector:{ar:'حجز ملاعب وصيغ اللعب',en:'Football & Padel Sports Venues'},
    icon:Trophy,color:'#F0B044',bgColor:'bg-emerald-50',borderColor:'border-emerald-200',routesCount:16,
    tagline:{ar:'ملعبك وقواعد اللعب وتفضيل الموعد، بدون حجز مؤكد',en:'Sport-format guides, team-size selection and transparent pending-only court requests'},
    journeys:[
      {ar:'ثمانية ملفات صيغ اللعب للخماسي والسباعي والبادل',en:'Eight independently authored football and padel format dossiers'},
      {ar:'اختيار العدد والوقت والمدة وفق قواعد كل صيغة',en:'Team count, requested time and allowable duration validation'},
      {ar:'رقم مرجعي محفوظ حتى يؤكد المشغّل الحقيقي',en:'Persisted booking-preference reference, never a fake reservation'}
    ],
    features:['Sport-aware Team Size','No Fake Availability','Owner-confirmed Booking Only']
  },
  {
    number:'14',slug:'furniture',
    name:{ar:'أوكلين ليفينج — أثاث حسب المقاس',en:'Oakline Living — Bespoke Furniture Website'},
    sector:{ar:'أثاث غرف ومعارض وتفصيل حسب الطلب',en:'Furniture, Room Planning & Custom Quotes'},
    icon:Home,color:'#BA9062',bgColor:'bg-amber-50',borderColor:'border-amber-200',routesCount:18,
    tagline:{ar:'كتالوج خامات ومقاسات وسلة تسعير متعددة القطع محفوظة',en:'Room-first furniture dossiers and multi-item material/dimension quote basket'},
    journeys:[
      {ar:'10 قطع مفصلة تشمل الغرف والخامات والأبعاد',en:'Ten original room-specific furniture design dossiers'},
      {ar:'اختيار خامة وتشطيب وثلاثة أبعاد لكل قطعة',en:'Compatible material, finish and full dimension selection per item'},
      {ar:'سلة تصل 6 قطع برقم مرجعي دون سعر مختلق',en:'Saved six-item RFQ with nonbinding reference, no fake stock or price'}
    ],
    features:['Material/Finish Validation','Multi-piece RFQ Basket','No Invented Inventory']
  }
];

/** Preview examples are not operating businesses. Canonicals become indexable only
 * after the owner configures the verified PUBLIC portfolio origin. */
export function generateMetadata({params:{locale}}:{params:{locale:Locale}}):Metadata {
 const ar=locale==='ar';
 const originValue=process.env.NEXT_PUBLIC_MAVVIX_SHOWCASE_ORIGIN || '';
 let origin='';
 try {const url=new URL(originValue);if(url.protocol==='https:')origin=url.origin;}catch{}
 const verifiedIndex=Boolean(origin)&&process.env.MAVVIX_INDEX_SHOWCASE==='true';
 const title=ar?`نماذج مواقع احترافية لقطاعات مختلفة | مافكس — ${demos.length} تجربة`:`Premium Industry Website Portfolio | Mavvix — ${demos.length} Experiences`;
 const description=ar?'استعرض مواقع قطاعات متعددة بالعربي والإنجليزي وتجارب تفاعلية لنماذج خدمات وحجوزات ومتاجر، وتواصل مع مافكس لتنفيذ موقع بهوية نشاطك الحقيقية.':'Explore bespoke bilingual industry website experiences by Mavvix, including service enquiry, retail and scheduling concepts. Commission an original site tailored to your real business.';
 return {
  title,description,
  robots:{index:verifiedIndex,follow:verifiedIndex},
  alternates:origin?{canonical:`${origin}/${locale}/showcase`,languages:{ar:`${origin}/ar/showcase`,en:`${origin}/en/showcase`}}:undefined,
  openGraph:{title,description,type:'website',siteName:'Mavvix Software',locale:ar?'ar_EG':'en_US',url:origin?`${origin}/${locale}/showcase`:undefined},
  twitter:{card:'summary_large_image',title,description}
 };
}

export default function ShowcasePage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';

  return (
    <div className="mavvix-showcase bg-slate-50 text-slate-900 min-h-screen flex flex-col">
      {/* Commercial Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {isAr ? 'عرض خاص' : 'Special Offer'}
          </span>
          <span>
            {isAr
              ? 'احصل على موقع رقمي متكامل لشركتك خلال 48 ساعة بواسطة Mavvix — جاهز للمبيعات والحملات الإعلانية'
              : 'Get a production-grade commercial platform for your business in 48 hours by Mavvix — ad campaign ready'}
          </span>
          <a
            href="https://wa.me/201017799042?text=%D8%A3%D9%87%D9%84%D9%8B%D8%A7%20%D9%85%D8%A7%D9%81%D9%83%D8%B3%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D9%88%D9%82%D8%B9%20%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%20%D9%84%D8%B4%D8%B1%D9%83%D8%AA%D9%8A%20%D8%AE%D9%84%D8%A7%D9%84%2048%20%D8%B3%D8%A7%D8%B9%D8%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cyan-200 font-bold ml-1"
          >
            {isAr ? 'تواصل معنا الآن ←' : 'Contact Us Now →'}
          </a>
        </div>
      </div>
      <MavvixHeader locale={locale} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-mavvix-navy to-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'تجارب رقمية متخصصة من مافيكس' : 'Digital Experience Portfolio • Crafted by Mavvix'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
            {isAr ? (
              <>مواقع أعمال حقيقية متكاملة، <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">وليست مجرد واجهات ثابتة</span></>
            ) : (
              <>Digital Experiences, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Not Dead Prototypes</span></>
            )}
          </h1>

          <p className="mt-6 text-slate-300 text-base sm:text-xl max-w-3xl leading-relaxed">
            {isAr
              ? 'ثمانية مواقع متخصصة؛ كل موقع يتميز بهوية بصرية مخصصة، ومسارات فرعية متعددة، وقاعدة بيانات SQLite حقيقية، ولوحة تحكم لإدارة المحتوى والطلبات.'
              : 'Eight meticulously crafted industry websites. Each demo features bespoke visual art direction, 10+ deep routes, persistent SQLite database state, and protected Content Studio.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <a
              href="https://wa.me/201017799042?text=%D8%A3%D9%87%D9%84%D9%8B%D8%A7%20%D9%85%D8%A7%D9%81%D9%83%D8%B3%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D9%88%D9%82%D8%B9%20%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%20%D9%84%D8%B4%D8%B1%D9%83%D8%AA%D9%8A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/20 active:scale-95"
            >
              <span>{isAr ? 'اطلب موقعك الآن على واتساب' : 'Order via WhatsApp'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'لوحة التحكم التجريبية' : 'Admin Demo Studio'}</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3.5 py-2 rounded-lg text-slate-200">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'قاعدة بيانات علائقية SQLite' : 'Persisted Relational SQLite'}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3.5 py-2 rounded-lg text-slate-200">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>{isAr ? '91 مسارًا تفاعليًا عربي/إنجليزي' : '91 Bilingual Route Patterns'}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3.5 py-2 rounded-lg text-slate-200">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'استوديو إدارة محتوى محمي' : 'Protected CMS Studio'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {isAr ? 'استكشف نماذج القطاعات الثمانية' : 'Explore All Eight Sector Demos'}
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              {isAr
                ? 'انقر على أي موقع لتصفح كافة مساراته واختبار رحلات العمل ونظام الطلبات التجريبي.'
                : 'Click any concept demo to inspect its deep routes, interactive workflows, and local state.'}
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded bg-slate-100 text-slate-700 border border-slate-300 w-fit">
            12 {isAr ? 'تجربة قطاعية، مع مواقع جديدة قيد الاختبار البصري' : 'Industry experiences, including newly built sites under visual QA'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {demos.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {d.slug==='auto-service'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#161A20]"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mechanic_repairing_car_engine.jpg/1280px-Mechanic_repairing_car_engine.jpg" loading="lazy" decoding="async" className="h-full w-full object-cover" alt={isAr?'صورة تحريرية لميكانيكي يفحص محرك سيارة':'Editorial photo of a mechanic examining a car engine'}/></div>
                  : d.slug==='home-maintenance'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#EEF7FC]"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/AirConditioner.jpg/1280px-AirConditioner.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt={isAr?'صورة تحريرية لمكيف هواء':'CC0 editorial air conditioning photo'} /></div>
                  : d.slug==='salon-spa'
                  ? <div className="relative h-52 bg-[#E9D9D8] overflow-hidden"><img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Getting_her_nails_painted_%28Unsplash%29.jpg/1280px-Getting_her_nails_painted_%28Unsplash%29.jpg" className="w-full h-full object-cover" alt={isAr?'صورة تحريرية للعناية بالأظافر':'CC0 editorial manicure photography'}/></div>
                  : d.slug==='fitness'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#141421]"><img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Fitness_Center_Equipment.jpg" alt={isAr?'أجهزة رياضية حقيقية من صورة CC0 تحريرية':'CC0 editorial photo of fitness equipment at an unrelated gym'} className="w-full h-full object-cover"/></div>
                  : d.slug==='sports-venues'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#102B26]"><img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pexels-jonathan-petersson-399187.jpg/1280px-Pexels-jonathan-petersson-399187.jpg" alt={isAr?'صورة تحريرية حقيقية لملعب ليلي':'CC0 real floodlit football pitch editorial photo'} className="w-full h-full object-cover"/></div>
                  : d.slug==='furniture'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#EDE3D4]"><img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Living_room_%28Unsplash%29.jpg/1280px-Living_room_%28Unsplash%29.jpg" alt={isAr?'صورة CC0 حقيقية لصالون بكنبة زرقاء':'CC0 editorial blue sofa living room'} className="h-full w-full object-cover"/></div>
                  : <SectorPhoto sector={d.slug as keyof typeof SECTOR_IMAGES} alt="" className="h-52 w-full" />}
                {/* Sector Overview */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: d.color }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                            VER-{d.number}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-mavvix-blue transition-colors">
                            {d.name[locale]}
                          </h3>
                          <span className="text-xs font-medium text-slate-500">
                            {d.sector[locale]}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full shrink-0 border border-slate-200">
                        {d.routesCount} {isAr ? 'مسارات' : 'Routes'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 italic mb-6 leading-relaxed">
                      "{d.tagline[locale]}"
                    </p>

                    {/* 3 Core Journeys */}
                    <div className="space-y-2 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {isAr ? 'رحلات الاستخدام المنفذة:' : 'Implemented Core Journeys:'}
                      </h4>
                      {d.journeys.map((j, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{j[locale]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Badges & Link */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {d.features.map((f, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/${locale}/preview/${d.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#08132D] hover:bg-[#17345D] transition-all shadow-sm shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ borderBottom: `3px solid ${d.color}` }}
                    >
                      <span>{isAr ? 'تصفح الموقع' : 'Explore Website'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Admin Studio Promotion Banner */}
      <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'إدارة وتحرير المحتوى الفعلي' : 'Client-Grade Content Studio'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {isAr ? 'هل تريد استكشاف لوحة التحكم وإدارة الطلبات؟' : 'Explore the Protected Content Studio & Orders'}
            </h3>
            <p className="text-slate-400 text-sm max-w-2xl">
              {isAr
                ? 'لوحة إدارة فعلية تتيح تعديل المحتوى ثنائي اللغة، ومراجعة طلبات عروض الأسعار والمواعيد، وسجل التدقيق لجميع القطاعات.'
                : 'Explore the architecture, bilingual content management, interactive flows, and industry-specific layouts behind each experience.'}
            </p>
          </div>
          <Link
            href="/admin"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-sm shrink-0"
          >
            {isAr ? 'الدخول للوحة الإدارة (Admin Studio)' : 'Open Admin Studio'}
          </Link>
        </div>
      </section>

      <ContactDock locale={locale} sector="construction" />
      <MavvixFooter locale={locale} />
    </div>
  );
}

