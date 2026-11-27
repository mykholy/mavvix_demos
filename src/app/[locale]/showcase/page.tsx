import { TALENTYX } from '@/lib/verticals/recruitment/data';
import { VOLTEDGE } from '@/lib/verticals/solar-energy/data';
import { OASIS } from '@/lib/verticals/boutique-hotel/data';
import { CLEARPATH } from '@/lib/verticals/diagnostics-lab/data';
import { ELYRA } from '@/lib/verticals/skin-clinic/data';
import { ROUTELINE } from '@/lib/verticals/logistics/data';
import { LUMA_EVENTS } from '@/lib/verticals/events/data';
import { NOMAD_ROUTES } from '@/lib/verticals/travel-agency/data';
import { MAVVIX_CONTACT } from '@/lib/business/mavvix-contact';
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
  FlaskConical,
  Hotel,
  Zap,
  Network,
  Layers,
  Database,
  Trophy,
  Compass,
  Truck
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
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
  },
  {
    number:'15',slug:'interiors-kitchens',
    name:{ar:'فورما أتيليه — مطابخ وتصميم داخلي',en:'Forma Atelier — Kitchen & Interior Design'},
    sector:{ar:'مطابخ وديكور وتخطيط مساحات',en:'Kitchen Design & Interior Planning'},
    icon:Palette,color:'#B9866B',bgColor:'bg-stone-50',borderColor:'border-stone-200',routesCount:25,
    tagline:{ar:'من تخطيط المطبخ والخامات إلى طلب تصميم بمقاسات استرشادية',en:'Architectural layout planning, materials and a measured design brief'},
    journeys:[
      {ar:'تخطيطات حرف L وU ومتوازي وجزيرة',en:'L, U, galley and island layout guidance'},
      {ar:'اختيار الخامات وأسطح العمل والميزانية',en:'Finish, countertop and budget preferences'},
      {ar:'طلب تصميم محفوظ دون سعر أو تصنيع مؤكد',en:'Validated persisted design brief without binding price'}
    ],
    features:['Layout-aware Wall Measurements','Material Selection','Nonbinding Design Brief']
  },
  {
    number:'16',slug:'nursery',
    name:{ar:'بلوم ستيبس — موقع حضانات ورياض أطفال',en:'BloomSteps — Premium Nursery & Early Years Website'},
    sector:{ar:'رياض أطفال وبرامج تعلم باللعب',en:'Nursery, Preschool & Early Years'},
    icon:GraduationCap,color:'#F5C04E',bgColor:'bg-amber-50',borderColor:'border-amber-200',routesCount:23,
    tagline:{ar:'الفئات العمرية والتعلم باللعب وطلب زيارة بموافقة ولي الأمر',en:'Age-led learning, safety-first storytelling and a guardian-only visit request'},
    journeys:[
      {ar:'8 ملفات برامج وتخصصات للطفولة المبكرة',en:'Eight original early-years program and activity dossiers'},
      {ar:'معلومات سلامة وروتين اليوم والعناية بالخصوصية',en:'Safeguarding, learning rhythm and child-privacy guidance'},
      {ar:'طلب زيارة محفوظ لولي الأمر دون بيانات شخصية عن الأطفال',en:'Consented guardian-only saved visit request with no child-identifiable details'}
    ],
    features:['Age-Band Guided Programs','Guardian Privacy-First Intake','Nonbinding Visit Request']
  },
  {
    number:'17',slug:'car-detailing',
    name:{ar:'جلوس باي — موقع عناية وتلميع السيارات',en:'GlossBay — Premium Car Detailing Website'},
    sector:{ar:'ديتيلنج وتنظيف وحماية السيارات',en:'Automotive Detailing, Cleaning & Paint Protection'},
    icon:Wrench,color:'#4CCBF4',bgColor:'bg-cyan-50',borderColor:'border-cyan-200',routesCount:26,
    tagline:{ar:'اختيار حجم السيارة وتفاصيل التلميع والإضافات مع طلب عرض غير ملزم',en:'Vehicle-size selector, treatment dossiers and a nonbinding quote enquiry builder'},
    journeys:[
      {ar:'10 خدمات تفصيلية تشمل الداخلية والطلاء وPPF والسيراميك',en:'Ten substantive wash, cabin, correction and protection dossiers'},
      {ar:'تحديد حجم العربية والإضافات وحالة السطح وتاريخ مفضل',en:'Select vehicle size, treatment, add-ons, surface condition and preferred day'},
      {ar:'حفظ استفسار برقم مرجعي بدون سعر وهمي أو حجز مؤكد',en:'Consent-based persisted request with no fabricated quote or appointment'}
    ],
    features:['Vehicle-size Service Scope','Paint Protection Education','Idempotent Quote Request']
  },
  {
    number:'18',slug:'physiotherapy',
    name:{ar:'موشن لاب — موقع العلاج الطبيعي والتأهيل',en:'Motion Lab — Premium Physiotherapy Website'},
    sector:{ar:'التقييم الوظيفي والتأهيل والحركة',en:'Functional Movement & Physiotherapy'},
    icon:HeartPulse,color:'#79C9C1',bgColor:'bg-emerald-50',borderColor:'border-emerald-200',routesCount:27,
    tagline:{ar:'استشارات أولية منظمة، خصوصية صحية، ومعلومات تأهيل متخصصة',en:'Clinician-aware first-visit enquiry, health privacy and original movement education'},
    journeys:[
      {ar:'10 ملفات تأهيل تعليمية عربية وإنجليزية بدون تشخيص أو وعود شفاء',en:'Ten bilingual rehabilitation service dossiers without diagnoses or recovery promises'},
      {ar:'زيارة أولى وتفضيلات عامة من غير تقارير أو بيانات طبية',en:'Privacy-first initial enquiry with no medical uploads or sensitive health records'},
      {ar:'طلب محفوظ برقم مرجعي من غير ادعاء وجود مركز أو معالج حقيقي',en:'Idempotent pending reference with no invented clinician, slot or medical outcome'}
    ],
    features:['Privacy-Minimal Assessment Enquiry','Movement Education','Qualified Operator Confirmation']
  },
  {
    number:'19',slug:'veterinary',
    name:{ar:'بوويل — تجربة موقع عيادة بيطرية',en:'PawWell — Veterinary Clinic Website Experience'},
    sector:{ar:'رعاية الحيوانات الأليفة والزيارة البيطرية',en:'Pet Wellness & Veterinary Care'},
    icon:HeartPulse,color:'#F3B98E',bgColor:'bg-emerald-50',borderColor:'border-emerald-200',routesCount:16,
    tagline:{ar:'رعاية تبدأ بفهم نوع الحيوان والعمر والزيارة المناسبة',en:'Pet-first care journeys, original service guides and nonbinding visit preferences'},
    journeys:[
      {ar:'8 ملفات رعاية متخصصة ومقالات توعوية',en:'Eight original pet-care dossiers and three authored guides'},
      {ar:'دليل تفاعلي يفلتر حسب نوع الحيوان',en:'Species-aware interactive service explorer'},
      {ar:'تقديم استفسار زيارة محفوظ برقم مرجعي دون طبيب أو موعد وهمي',en:'Idempotent pending visit request without invented clinicians'}
    ],
    features:['Pet-Species-Aware Care Explorer','Emergency Safety Boundary','Persistent Visit Enquiry']
  },
  {
    number:'20',slug:'law-firm',
    name:{ar:'ليكسورا كاونسل — موقع مكاتب المحاماة',en:'Lexora Counsel — Law Firm Website Experience'},
    sector:{ar:'المحاماة والخدمات القانونية للشركات',en:'Legal Practice, Contracts & Governance'},
    icon:ShieldCheck,color:'#B79B6A',bgColor:'bg-amber-50',borderColor:'border-amber-200',routesCount:24,
    tagline:{ar:'مجالات قانونية متخصصة مع استفسار أولي يحمي السرية',en:'Eight authored legal practice areas with a privacy-minimal initial enquiry'},
    journeys:[
      {ar:'8 ملفات مجالات قانونية مفصلة و3 مقالات مستقلة',en:'Eight substantive law practice dossiers and three bilingual original insights'},
      {ar:'تحديد نوع الخدمة والدولة والعميل دون جمع تفاصيل قضية',en:'Jurisdiction, practice and client category selection without confidential case data'},
      {ar:'استفسار محفوظ برقم مرجعي دون ادعاء محامٍ أو موعد مؤكد',en:'Consented pending-only request with no invented legal representation'}
    ],
    features:['Privacy-First Legal Intake','Jurisdiction-Aware Service Taxonomy','Idempotent Enquiry Receipt']
  },
  {
    number:'21',slug:'accounting',
    name:{ar:'ليدجر بوينت — موقع مكاتب المحاسبة',en:'LedgerPoint — Accounting Services Website'},
    sector:{ar:'مسك دفاتر وتسويات وتقارير للشركات',en:'Bookkeeping, Reconciliation & Business Reporting'},
    icon:Database,color:'#50C2C3',bgColor:'bg-teal-50',borderColor:'border-teal-200',routesCount:22,
    tagline:{ar:'نطاق خدمة محاسبية واضح ونموذج استفسار بدون جمع بيانات مالية حساسة',en:'Transparent accounting scopes and privacy-minimal business enquiries'},
    journeys:[
      {ar:'8 ملفات خدمات متخصصة وتسويات وتقارير وإعداد سجلات',en:'Eight original accounting service dossiers and three authored explainers'},
      {ar:'تحديد الدولة ونوع المنشأة وحجم المعاملات في فئات عامة',en:'Select jurisdiction, entity, invoice-volume band and existing system'},
      {ar:'استفسار محفوظ برقم مرجعي دون وعود مراجعة أو تسعير وهمي',en:'Idempotent pending-only scope request without invented audit credentials'}
    ],
    features:['Accounting Scope Explorer','Reconciliation Education','Minimal-PII Quote Flow']
  },
  {
    number:'22',slug:'travel-agency',
    name:{ar:'نوماد روتس — موقع سياحة وسفر',en:'Nomad Routes — Travel Planning Website'},
    sector:{ar:'رحلات ومقارنة وجهات وتخطيط سفر',en:'Itineraries, destinations and travel planning'},
    icon:Compass,color:'#A4492D',bgColor:'bg-amber-50',borderColor:'border-amber-200',routesCount:21,
    tagline:{ar:'رحلات تحريرية مخصصة حسب الوجهة والمدة والوتيرة مع طلب تخطيط آمن',en:'Editorial itineraries and a scoped, privacy-minimal travel planning request'},
    journeys:[
      {ar:'ثمانية مسارات سفر متميزة ودليل مقاصد مصر والسعودية',en:'Eight distinct journey dossiers for Egypt and Saudi Arabia'},
      {ar:'تصفية حسب نوع الرحلة ومراجعة المشمول والمستثنى',en:'Travel-style filtering and an inclusions checklist'},
      {ar:'استفسار تخطيط محفوظ دون تأكيد حجز أو سعر أو تأشيرة',en:'Persisted nonbinding enquiry without fake availability or price'}
    ],
    features:['Itinerary Explorer','Destination and Pace Guide','Validated Planning Enquiry']
  },
  {
    number:'23',slug:'events',
    name:{ar:'لوما — موقع تنظيم الحفلات والفعاليات',en:'Luma Events — Event Planning Website'},
    sector:{ar:'المؤتمرات والمعارض والمناسبات والإنتاج',en:'Conferences, celebrations, exhibitions and production'},
    icon:Sparkles,color:'#874F63',bgColor:'bg-rose-50',borderColor:'border-rose-200',routesCount:21,
    tagline:{ar:'تخطيط تجربة الضيوف والمكان والإنتاج واستفسار فعالية آمن',en:'Guest journey, venue and production planning with a scoped event brief'},
    journeys:[{ar:'ثماني تجارب متخصصة مع نطاق ومتطلبات واضحة',en:'Eight authored experience dossiers with planning checkpoints'},{ar:'تصفية أنواع الفعاليات ودليل المكان والإنتاج',en:'Event format filters, venue brief and production guide'},{ar:'استفسار محفوظ بدون حجز قاعة أو دفع وهمي',en:'Persisted nonbinding enquiry without fake venue booking or payments'}],
    features:['Event Format Explorer','Guest Journey & Production','Validated Event Brief']
  },
  {
    number:'24',slug:'logistics',
    name:{ar:'روت لاين — موقع الشحن واللوجستيات',en:'RouteLine Cargo — Freight & Logistics Website'},
    sector:{ar:'النقل البحري والجوي والبري والتخزين',en:'Ocean, air, road freight and support'},
    icon:Truck,color:'#31566C',bgColor:'bg-slate-50',borderColor:'border-slate-200',routesCount:21,
    tagline:{ar:'مقارنة وسائل الشحن ونطاق النقل وطلب عرض سعر منظم',en:'Freight mode comparison, service scope and structured quote enquiry'},
    journeys:[{ar:'ثمانية ملفات خدمات شحن متخصصة',en:'Eight freight and support service dossiers'},{ar:'مقارنة مراحل النقل والمسؤوليات والمشمول',en:'Transport milestones, responsibility and scope comparison'},{ar:'مرجع طلب محفوظ دون تتبع أو حجز وهمي',en:'Persisted enquiry reference, not simulated live tracking'}],
    features:['Freight Mode Explorer','Route & Scope Guide','Validated Freight Enquiry']
  },
  {
    number:'25',slug:'skin-clinic',
    name:{ar:'إيليرا — موقع الجلدية والتجميل',en:'Elyra Skin — Dermatology & Aesthetics Website'},
    sector:{ar:'الاستشارات الجلدية والتجميل الطبي',en:'Dermatology and aesthetic consultation'},
    icon:Sparkles,color:'#86566B',bgColor:'bg-rose-50',borderColor:'border-rose-200',routesCount:20,
    tagline:{ar:'رحلة استشارة وتواصل إداري مع مراعاة الخصوصية',en:'Consultation education and privacy-minimal callback journey'},
    journeys:[{ar:'ثمانية مجالات للاستشارة ومعلومات متخصصة',en:'Eight consultation pathways and editorial guidance'},{ar:'دليل الاختيار المستنير والخصوصية والمتابعة',en:'Informed choice, privacy and follow-up guidance'},{ar:'طلب تواصل محفوظ بدون أعراض أو حجز طبي وهمي',en:'Persisted callback without clinical data or fabricated appointments'}],
    features:['Consultation Explorer','Care Journey & Privacy','Administrative Callback']
  },
  {
    number:'26',slug:'diagnostics-lab',
    name:{ar:'كلير باث — موقع معامل التحاليل',en:'ClearPath Labs — Laboratory Website'},
    sector:{ar:'أقسام المعامل والتقارير والزيارات المنزلية',en:'Laboratory directory, reports and home collection information'},
    icon:FlaskConical,color:'#126B8A',bgColor:'bg-cyan-50',borderColor:'border-cyan-200',routesCount:22,
    tagline:{ar:'دليل متخصص للأقسام والتواصل الإداري مع مراعاة خصوصية التقارير',en:'Specialist laboratory directory and privacy-minimal administrative contact'},
    journeys:[{ar:'ثمانية مجالات معملية ومعلومات متخصصة',en:'Eight authored laboratory and access dossiers'},{ar:'رحلة العينة والتقرير ودليل الزيارة المنزلية',en:'Specimen-to-report journey and home collection guide'},{ar:'تواصل إداري محفوظ دون نتائج أو بيانات طبية',en:'Persisted administrative callback without results or clinical details'}],
    features:['Laboratory Directory','Private Report Guidance','Administrative Callback']
  },
  {
    number:'27',slug:'boutique-hotel',
    name:{ar:'أواسيس — موقع فنادق بوتيك',en:'Oasis & Co — Boutique Hotel Website'},
    sector:{ar:'الفنادق والغرف والأجنحة',en:'Boutique hospitality and accommodation'},
    icon:Hotel,color:'#46543C',bgColor:'bg-amber-50',borderColor:'border-amber-200',routesCount:22,
    tagline:{ar:'تجربة اختيار الإقامة ومقارنة الغرف وحفظ التفضيلات',en:'Room discovery, comparison and stay preference enquiry'},
    journeys:[{ar:'ثمانية أنواع إقامة بتفاصيل متخصصة',en:'Eight accommodation dossiers'},{ar:'مقارنة الغرف والضيوف ودليل الوصول والمائدة',en:'Room comparison, party fit, arrival and dining guidance'},{ar:'طلب إقامة محفوظ بالتواريخ والضيوف دون حجز مؤكد',en:'Persisted stay enquiry with dates and occupancy, no confirmed reservation'}],
    features:['Room Comparison','Hospitality Journal','Stay Enquiry']
  },
  {
    number:'28',slug:'solar-energy',
    name:{ar:'فولتيج — حلول الطاقة الشمسية',en:'VoltEdge Energy — Solar Solutions Website'},
    sector:{ar:'الطاقة الشمسية والتخزين والدراسات',en:'Solar generation, storage and assessments'},
    icon:Zap,color:'#12352D',bgColor:'bg-lime-50',borderColor:'border-lime-200',routesCount:21,
    tagline:{ar:'كتالوج حلول ودراسة نطاق المشروع دون وعود أو أسعار وهمية',en:'Solution discovery and structured project assessment without fabricated prices'},
    journeys:[{ar:'ثمانية حلول متخصصة للمنازل والمنشآت والمزارع',en:'Eight specialist solution dossiers'},{ar:'مراحل دراسة الموقع والجدوى والصيانة',en:'Site assessment, feasibility and maintenance pathway'},{ar:'طلب دراسة محفوظ بنطاق الاستهلاك والموقع والشبكة',en:'Persisted project scope with demand, site and grid context'}],
    features:['Solution Directory','Engineering Pathway','Assessment Intake']
  },
  {
    number:'29',slug:'recruitment',
    name:{ar:'تالنتكس — التوظيف والموارد البشرية',en:'Talentyx HR — Recruitment Website'},
    sector:{ar:'التوظيف والبحث التنفيذي واستشارات الموارد البشرية',en:'Recruitment, executive search and HR advisory'},
    icon:Network,color:'#3549A5',bgColor:'bg-indigo-50',borderColor:'border-indigo-200',routesCount:29,
    tagline:{ar:'رحلتان مستقلتان للشركات والمرشحين وملفات أدوار توضيحية',en:'Separate employer and candidate journeys with illustrative role profiles'},
    journeys:[{ar:'ثماني خدمات للتوظيف والاستشارات',en:'Eight specialist recruitment services'},{ar:'ستة ملفات أدوار قابلة للتصفية دون وظائف وهمية',en:'Six filterable role profiles, no fictitious vacancies'},{ar:'طلب شركة واهتمام مهني محفوظان بشكل مستقل',en:'Distinct persisted employer and candidate enquiries'}],
    features:['Employer Brief','Career Interest','Role Directory']
  }
];

/** Preview examples are not operating businesses. Canonicals become indexable only
 * after the owner configures the verified PUBLIC portfolio origin. */
export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

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

export default async function ShowcasePage(props: Props) {
  const params = await props.params;
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
              ? 'استعرض مواقع متخصصّة لمجالات مختلفة، واطلب تنفيذ موقع يناسب نشاطك وميزانيتك'
              : 'Explore custom industry website experiences and discuss a project for your business with Mavvix'}
          </span>
          <a
            href={`https://wa.me/${MAVVIX_CONTACT.whatsappNumber}?text=${encodeURIComponent(isAr?'أهلًا مافكس، عايز موقع احترافي لنشاطي بعد ما شوفت معرض المواقع.':'Hello Mavvix, I want a bespoke business website after browsing your industry portfolio.')}`}
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
              ? 'مجموعة مواقع متخصصة تختلف في التصميم والخدمات وطريقة استقبال الاستفسارات. جميعها أمثلة لما يمكن لمافكس تطويره لنشاطك، وليست شركات تشغيلية قائمة.'
              : 'Explore bespoke Arabic/English industry web experiences with specialized service journeys, realistic editorial content and saved requests. These are Mavvix portfolio concepts, not operating businesses.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <a
              href={`https://wa.me/${MAVVIX_CONTACT.whatsappNumber}?text=${encodeURIComponent(isAr?'أهلًا مافكس، عايز موقع احترافي لنشاطي بعد ما شوفت معرض المواقع.':'Hello Mavvix, I want a bespoke business website after browsing your industry portfolio.')}`}
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
              <span>{isAr ? 'محتوى ومسارات تفصيلية بالعربي والإنجليزي' : 'Bilingual Industry Journeys'}</span>
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
              {isAr ? 'استكشف مواقع القطاعات المختلفة' : 'Explore Industry Website Experiences'}
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
                  : d.slug==='interiors-kitchens'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#F4F0EA]"><img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kitchen_Design.jpg/960px-Kitchen_Design.jpg" alt={isAr?'صورة تحريرية لتصميم مطبخ':'Editorial kitchen design photograph'} className="h-full w-full object-cover"/></div>
                  : d.slug==='nursery'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#FFF5DA]"><img src="/assets/portfolio/montessori-shelves.webp" loading="lazy" decoding="async" className="w-full h-full object-cover" alt={isAr?'مواد تعليمية حقيقية من فصل مونتيسوري مستقل، لا يمثل حضانة بلوم ستيبس':'Real editorial Montessori learning materials in an unrelated classroom'}/></div>
                  : d.slug==='car-detailing'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#071424]"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Exterior_Car_detailing.png/1280px-Exterior_Car_detailing.png" loading="lazy" decoding="async" className="w-full h-full object-cover" alt={isAr?'صورة مرخصة حقيقية لسيارة خلال عمل ديتيلنج':'Genuine CC0 editorial car-detailing photograph'}/></div>
                  : d.slug==='physiotherapy'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#E5F2E9]"><img src="/assets/portfolio/physiotherapy.webp" loading="lazy" decoding="async" className="w-full h-full object-cover object-center" alt={isAr?'صورة تحريرية لمجال العلاج الطبيعي، ليست من مركز موشن لاب':'CC BY 4.0 editorial physiotherapy image; not Motion Lab staff or patients'}/></div>
                  : d.slug==='veterinary'
                  ? <div className="relative h-52 w-full overflow-hidden bg-[#E8EFE5]"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Veterinary_Office_with_dog.JPG/1280px-Veterinary_Office_with_dog.JPG" loading="lazy" decoding="async" className="h-full w-full object-cover" alt={isAr?'صورة حقيقية مرخصة لكلب في عيادة بيطرية مستقلة، ليست PawWell':'Real CC0 editorial dog photograph in an unrelated veterinary clinic'}/></div>
                  : d.slug==='law-firm'
                  ? <div className="relative h-52 bg-[#D6CAB8] overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canadian_law_books_%2831460630695%29.jpg/1280px-Canadian_law_books_%2831460630695%29.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt={isAr?'كتب قانونية حقيقية من كندا، صورة عامة مرخصة لا تتبع Lexora':'CC0 editorial Canadian law books, not an operating Lexora office'}/></div>
                  : d.slug==='recruitment'
                  ? <div className="relative h-52 bg-[#E8EEFF] overflow-hidden"><img src={TALENTYX.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={TALENTYX.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#17243E] text-white text-[10px] px-2 py-1"><a href={TALENTYX.media[0].creditUrl} className="underline">Amtec Photos</a> · <a href={TALENTYX.media[0].source} className="underline">{isAr?'المصدر':'Source'}</a> · <a href={TALENTYX.media[0].licenseUrl} className="underline">CC BY-SA 2.0</a> · {isAr?'اقتصاص':'Display crop'}</span></div>
                  : d.slug==='solar-energy'
                  ? <div className="relative h-52 bg-[#E0E9DB] overflow-hidden"><img src={VOLTEDGE.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={VOLTEDGE.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#12352D] text-white text-[10px] px-2 py-1"><a href={VOLTEDGE.media[0].source} className="underline">David Kosling / USDA</a> · <a href={VOLTEDGE.media[0].licenseUrl} className="underline">Public domain</a> · {isAr?'اقتصاص':'Display crop'}</span></div>
                  : d.slug==='boutique-hotel'
                  ? <div className="relative h-52 bg-[#E7DCC9] overflow-hidden"><img src={OASIS.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={OASIS.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#282A25] text-white text-[10px] px-2 py-1"><a href={OASIS.media[0].source} className="underline">Book Elizabeth</a> · <a href={OASIS.media[0].licenseUrl} className="underline">CC BY-SA 4.0</a> · {isAr?'اقتصاص':'Display crop'}</span></div>
                  : d.slug==='diagnostics-lab'
                  ? <div className="relative h-52 bg-[#E7F4F6] overflow-hidden"><img src={CLEARPATH.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={CLEARPATH.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#12334A] text-white text-[10px] px-2 py-1"><a href={CLEARPATH.media[0].source} className="underline">Belikov Maxim</a> · <a href={CLEARPATH.media[0].licenseUrl} className="underline">CC BY 4.0</a> · {isAr?'اقتصاص':'Display crop'}</span></div>
                  : d.slug==='skin-clinic'
                  ? <div className="relative h-52 bg-[#EEE3E7] overflow-hidden"><img src={ELYRA.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={ELYRA.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#352B39] text-white text-[10px] px-2 py-1">Shixart1985 · CC BY 2.0 · {isAr?'صورة تحريرية':'Editorial photo'}</span></div>
                  : d.slug==='logistics'
                  ? <div className="relative h-52 bg-[#DDE6E9] overflow-hidden"><img src={ROUTELINE.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={ROUTELINE.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#102A3A] text-white text-[10px] px-2 py-1">chuttersnap · CC0 · {isAr?'صورة تحريرية':'Editorial photograph'}</span></div>
                  : d.slug==='events'
                  ? <div className="relative h-52 bg-[#F1E4DF] overflow-hidden"><img src={LUMA_EVENTS.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={LUMA_EVENTS.media[0].alt[locale]}/><span className="absolute bottom-0 inset-x-0 bg-[#291C2D] text-white text-[10px] px-2 py-1">PattayaPatrol · CC BY-SA 4.0 · {isAr?'اقتصاص':'cropped'}</span></div>
                  : d.slug==='travel-agency'
                  ? <div className="relative h-52 bg-[#F4EBDD] overflow-hidden"><img src={NOMAD_ROUTES.media[0].url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={NOMAD_ROUTES.media[0].alt[locale]}/></div>
                  : d.slug==='accounting'
                  ? <div className="relative h-52 bg-[#D7E3DF] overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Desktop_with_laptop_and_calculator_%28Unsplash%29.jpg/1280px-Desktop_with_laptop_and_calculator_%28Unsplash%29.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt={isAr?'صورة مرخصة حقيقية لمكتب عليه آلة حاسبة ولابتوب لا يتبع LedgerPoint':'Real CC0 editorial office calculator photo unrelated to LedgerPoint clients'}/></div>
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

