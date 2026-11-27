'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { PawPrint, Heart, ShieldCheck, Stethoscope, Clock, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Dog, Cat, Rabbit, Bird, Activity, Sparkles } from 'lucide-react';
import { pawPath } from '@/lib/verticals/veterinary/data';

interface CareProtocol {
  speciesId: 'dog' | 'cat' | 'rabbit' | 'bird';
  speciesNameAr: string;
  speciesNameEn: string;
  lifeStages: {
    stageId: 'young' | 'adult' | 'senior';
    titleAr: string;
    titleEn: string;
    ageSpanAr: string;
    ageSpanEn: string;
    summaryAr: string;
    summaryEn: string;
    estimatedVisitFeeEgp: number;
    vaccineProtocolsAr: string[];
    vaccineProtocolsEn: string[];
    examMilestonesAr: string[];
    examMilestonesEn: string[];
  }[];
}

const CARE_PROTOCOLS: CareProtocol[] = [
  {
    speciesId: 'dog',
    speciesNameAr: 'الكلاب',
    speciesNameEn: 'Canine Care',
    lifeStages: [
      {
        stageId: 'young',
        titleAr: 'مرحلة الجراء والتأسيس المناعي',
        titleEn: 'Puppyhood & Core Immunity',
        ageSpanAr: 'من عمر ٦ أسابيع إلى ١٢ شهرًا',
        ageSpanEn: '6 weeks to 12 months',
        summaryAr: 'تأسيس المناعة الأساسية بجرعات التطعيم الثماني، فحص الأسنان اللبنية، وبروتوكول مكافحة الطفيليات الدورية.',
        summaryEn: 'Establishing maternal antibody transitions with core DHPP vaccines, deciduous teeth monitoring, and deworming schedules.',
        estimatedVisitFeeEgp: 450,
        vaccineProtocolsAr: ['التطعيم الثماني الأساسي (DHPP)', 'لقاح السعار المعتمد عند عمر ۳ شهور', 'جرعات طارد الديدان المعوية كل ۳ أسابيع'],
        vaccineProtocolsEn: ['Core DHPP series (Distemper, Parvo, Adenovirus)', 'Rabies booster from 12 weeks of age', 'Intestinal parasite deworming every 3-4 weeks'],
        examMilestonesAr: ['تقييم إغلاق اليافوخ وفحص العظام والمفاصل', 'متابعة بزوغ الأسنان والتأكد من عدم احتباس اللبنية', 'فحص السرة والخصيتين للذكور واستبعاد الفتق'],
        examMilestonesEn: ['Fontanelle closure and musculoskeletal development check', 'Deciduous teeth retention assessment', 'Umbilical hernia and testicular descent evaluation']
      },
      {
        stageId: 'adult',
        titleAr: 'السنوات النشطة والحفاظ على الوزن',
        titleEn: 'Adult Vitality & Weight Control',
        ageSpanAr: 'من عمر سنة إلى ٧ سنوات',
        ageSpanEn: '1 to 7 years',
        summaryAr: 'الفحص الدوري السنوي، تنظيف الأسنان بالسونار، ضبط مؤشر كتلة الجسم للوقاية من إجهاد المفاصل.',
        summaryEn: 'Annual comprehensive health audits, ultrasonic dental prophylaxis, and body condition scoring to prevent joint strain.',
        estimatedVisitFeeEgp: 400,
        vaccineProtocolsAr: ['الجرعة التنشيطية السنوية للثماني والسعار', 'برنامج مكافحة البراغيث والقراد الشهري', 'تحليل براز دوري سنوي للكشف عن الطفيليات'],
        vaccineProtocolsEn: ['Annual DHPP and Rabies booster administration', 'Broad-spectrum external flea and tick prophylaxis', 'Annual fecal flotation screening for internal parasites'],
        examMilestonesAr: ['تقييم مؤشر وزن الجسم (BCS) والكتلة العضلية', 'فحص صحة اللثة ودرجة ترسب الجير (درجة ١ إلى ٤)', 'تسمع ضربات القلب وفحص صوت الصمامات الرئوية'],
        examMilestonesEn: ['Body Condition Score (BCS 1-9) audit', 'Gingivitis and calculus staging examination', 'Cardiopulmonary auscultation for murmurs or arrhythmias']
      },
      {
        stageId: 'senior',
        titleAr: 'سنوات الخبرة وصحة الأعضاء الحيوية',
        titleEn: 'Senior Care & Organ Function',
        ageSpanAr: 'أكبر من ٧ سنوات',
        ageSpanEn: '7+ years',
        summaryAr: 'فحوصات نصف سنوية للكشف المبكر عن وظائف الكلى والكبد، ومتابعة مرونة مفاصل الورك والركبة.',
        summaryEn: 'Biannual geriatric wellness screening focusing on renal filtration, hepatic enzymes, and arthritis management.',
        estimatedVisitFeeEgp: 650,
        vaccineProtocolsAr: ['تطعيمات مخصصة حسب الحالة المناعية العامة', 'مكملات دعم المفاصل والأوميغا ٣ المعتمدة', 'مراقبة ضغط الدم والوظائف الحيوية'],
        vaccineProtocolsEn: ['Individualized core boosters adjusted for immune health', 'Veterinary-grade joint chondroprotectants', 'Regular blood pressure and vital signs monitoring'],
        examMilestonesAr: ['تحليل شامل لإنزيمات الكبد ومستوى الكرياتينين', 'فحص مرونة مفصل الحوض وعلامات تآكل الغضاريف', 'فحص قاع العين ورصد علامات إعتام عدسة العين'],
        examMilestonesEn: ['Comprehensive renal/hepatic blood biochemistry panel', 'Orthopedic stifle and hip palpation for osteoarthritis', 'Ophthalmic lens clarity and nuclear sclerosis review']
      }
    ]
  },
  {
    speciesId: 'cat',
    speciesNameAr: 'القطط',
    speciesNameEn: 'Feline Care',
    lifeStages: [
      {
        stageId: 'young',
        titleAr: 'القطط الصغيرة وتأسيس العادات',
        titleEn: 'Kittenhood & Fear-Free Bonding',
        ageSpanAr: 'من عمر شهرين إلى سنة',
        ageSpanEn: '8 weeks to 12 months',
        summaryAr: 'بروتوكول التطعيم الرباعي الأساسي، فحص الفطريات الجلدية بمصباح وود، والتغذية المتوازنة للنمو.',
        summaryEn: 'Core feline panleukopenia and respiratory viral series, Woods lamp dermatophyte screening, and growth nutrition.',
        estimatedVisitFeeEgp: 420,
        vaccineProtocolsAr: ['التطعيم الرباعي الأساسي للقطط (FVRCP)', 'لقاح السعار المعتمد للقطط', 'مضادات الديدان المعوية وقطرات الأذن الوقائية'],
        vaccineProtocolsEn: ['FVRCP core viral series (Panleukopenia, Calici, Herpes)', 'Rabies vaccine tailored for feline safety', 'Intestinal dewormer and prophylactic otic mite check'],
        examMilestonesAr: ['فحص الأذنين بالمجهر لاستبعاد حشرات الأذن (Ear Mites)', 'فحص الأسنان ونظافة اللثة ونمو الفك', 'فحص الجلد والشعر لضمان خلوه من الفطريات'],
        examMilestonesEn: ['Microscopic otic examination for Otodectes cynotis', 'Gingival health and occlusal development audit', 'Dermatological coat inspection and fungal screening']
      },
      {
        stageId: 'adult',
        titleAr: 'الحفاظ على المسالك البولية والوزن',
        titleEn: 'Adult Wellness & Urinary Health',
        ageSpanAr: 'من عمر سنة إلى ٩ سنوات',
        ageSpanEn: '1 to 9 years',
        summaryAr: 'حماية الجهاز البولي السفلي (FLUTD)، تنظيم استهلاك الماء، ومكافحة كرات الشعر والترسبات الجيرية.',
        summaryEn: 'Feline lower urinary tract health management, moisture optimization, and ultrasonic plaque management.',
        estimatedVisitFeeEgp: 380,
        vaccineProtocolsAr: ['الجرعة التنشيطية السنوية للرباعي والسعار', 'مضاد الطفيليات الشهرية موضعي الرقبة', 'فحص دوري لكريات الدم البيضاء والصفائح'],
        vaccineProtocolsEn: ['Annual FVRCP and Rabies core recall', 'Monthly topical spot-on external parasite control', 'Periodic complete blood count baseline screening'],
        examMilestonesAr: ['جس المثانة البولية للتأكد من المرونة وغياب الحصوات', 'فحص الأسنان الخلفية لرصد آفات الامتصاص (FORL)', 'تقييم لمعان الفراء وغياب القشرة أو الحكة'],
        examMilestonesEn: ['Urinary bladder palpation for discomfort or sediment', 'Inspection for feline odontoclastic resorptive lesions', 'Coat shine, hydration turgor, and skin elasticity audit']
      },
      {
        stageId: 'senior',
        titleAr: 'السن المتقدم والكشف الكلوي المبكر',
        titleEn: 'Senior Care & Renal Longevity',
        ageSpanAr: 'أكبر من ٩ سنوات',
        ageSpanEn: '9+ years',
        summaryAr: 'مراقبة وظائف الكلى واختبار SDMA للكشف المبكر، فحص ضغط الدم، ومتابعة هرمونات الغدة الدرقية.',
        summaryEn: 'Early renal biomarker (SDMA) detection, indirect systolic blood pressure measurement, and total T4 screening.',
        estimatedVisitFeeEgp: 620,
        vaccineProtocolsAr: ['جرعات لقاحات مخصصة بناءً على نمط الحياة المنزلي', 'نظام غذائي علاجي منخفض الفوسفور للكلى', 'مكملات الترطيب ومضادات الأكسدة السريرية'],
        vaccineProtocolsEn: ['Lifestyle-calibrated core revaccination protocol', 'Renal dietary phosphate management strategy', 'Hydration pacing and cellular antioxidant support'],
        examMilestonesAr: ['تحليل مستوى SDMA واليوريا والكرياتينين بالدم', 'قياس ضغط الدم الشرياني بالموجات فوق الصوتية (Doppler)', 'فحص هرمون الغدة الدرقية (Total T4) لاستبعاد التضخم'],
        examMilestonesEn: ['Serum SDMA and creatinine renal filtration evaluation', 'Doppler systolic blood pressure measurement', 'Total T4 hormone assay for feline hyperthyroidism']
      }
    ]
  },
  {
    speciesId: 'rabbit',
    speciesNameAr: 'الأرانب',
    speciesNameEn: 'Lagomorph Care',
    lifeStages: [
      {
        stageId: 'young',
        titleAr: 'الأرانب الصغيرة وتوازن الألياف',
        titleEn: 'Juvenile Rabbit Diet & Caecal Flora',
        ageSpanAr: 'حتى عمر ٦ أشهر',
        ageSpanEn: 'Up to 6 months',
        summaryAr: 'تثقيف غذائي بالألياف العشبية الطويلة بنسبة ٨٠٪، وفحص إطباق القواطع اللانهائية النمو.',
        summaryEn: 'High-fiber timothy hay feeding protocols (80%+), incisor malocclusion prevention, and caecal flora stabilization.',
        estimatedVisitFeeEgp: 350,
        vaccineProtocolsAr: ['لقاح الحمى النزفية الفيروسية (RHDV1/2)', 'مضادات الكوكسيديا الدورية بالأعشاب', 'فحص الطفيليات الجلدية والأذنية'],
        vaccineProtocolsEn: ['Rabbit Haemorrhagic Disease (RHDV 1 & 2) vaccination', 'Coccidiosis gut health preventive screening', 'Otic Psoroptes cuniculi mite exclusion test'],
        examMilestonesAr: ['فحص طول القواطع العلوية والسفلية وزوايا التآكل', 'جس البطن والتأكد من ليونة الأعور والنشاط المعوي', 'فحص فتحات الأنف والعيون للتأكد من خلوها من الإفرازات'],
        examMilestonesEn: ['Incisor alignment, length, and occlusal wear planes', 'Gentle abdominal palpation for caecal motility', 'Nares and lacrimal duct inspection for discharge']
      },
      {
        stageId: 'adult',
        titleAr: 'صحة الأضراس الخلفية وحركة الأمعاء',
        titleEn: 'Adult Gastrointestinal & Molar Health',
        ageSpanAr: 'من ٦ أشهر إلى ٥ سنوات',
        ageSpanEn: '6 months to 5 years',
        summaryAr: 'تنظير الأضراس الخلفية بالمنظار الفموي المتخصص، ومراقبة حركة الجهاز الهضمي والنشاط.',
        summaryEn: 'Otoscopic cheek teeth examination for sharp molar spurs and continuous gastrointestinal stasis prevention.',
        estimatedVisitFeeEgp: 320,
        vaccineProtocolsAr: ['التطعيم السنوي للنزف الفيروسي الفئة الثانية', 'إرشادات النظافة والتطهير البيئي للقفص', 'فحص دوري لحبيبات الفضلات الطبيعية'],
        vaccineProtocolsEn: ['Annual RHDV2 booster immunization', 'Housing sanitation and ambient temperature guidance', 'Fecal pellet size and fiber consistency evaluation'],
        examMilestonesAr: ['تنظير التيجان السريرية للأضراس الداخلية برفق', 'فحص باطن كعب القدمين لاستبعاد تقرحات العرقوب', 'متابعة وتوثيق الوزن على ميزان رقمي حساس'],
        examMilestonesEn: ['Endoscopic cheek tooth coronal ridge evaluation', 'Hock pododermatitis (sore hocks) ulcerative grading', 'Precision digital gram-scale weight monitoring']
      },
      {
        stageId: 'senior',
        titleAr: 'السن المتقدم والمفاصل وصحة العمود الفقري',
        titleEn: 'Senior Mobility & Renal Hydration',
        ageSpanAr: 'أكبر من ٥ سنوات',
        ageSpanEn: '5+ years',
        summaryAr: 'فحص مرونة الظهر والأطراف الخلفية، مراقبة استهلاك الماء، والكشف عن رواسب الكالسيوم البولية.',
        summaryEn: 'Spinal mobility evaluation, urine calcium sludge screening, and low-entry litterbox adjustments.',
        estimatedVisitFeeEgp: 480,
        vaccineProtocolsAr: ['الجرعات الوقائية وفق إرشادات الطبيب المشرف', 'مضادات أكسدة عشبية معتمدة لدعم المناعة', 'مكملات دعم حركة الجهاز الهضمي الطبيعية'],
        vaccineProtocolsEn: ['Tailored preventive updates from real clinician', 'Veterinary botanical antioxidant support', 'Natural motility pacing and digestive hydration balance'],
        examMilestonesAr: ['تحليل فحص البول لرصد تراكم أملاح الكالسيوم', 'فحص حركة الفقرات القطنية والورك للأرانب المتقدمة', 'فحص نظافة المنطقة التناسلية والعناية الذاتية'],
        examMilestonesEn: ['Urinalysis for calcium carbonate sludge or crystals', 'Lumbar vertebral flexibility and posture audit', 'Perineal cleanliness and cecotrophy capability check']
      }
    ]
  },
  {
    speciesId: 'bird',
    speciesNameAr: 'الطيور',
    speciesNameEn: 'Avian Care',
    lifeStages: [
      {
        stageId: 'young',
        titleAr: 'تأسيس التغذية وفحص الريش',
        titleEn: 'Juvenile Avian Nutrition & Plumage',
        ageSpanAr: 'حتى عمر سنة',
        ageSpanEn: 'Up to 1 year',
        summaryAr: 'فحص الحوصلة وتناسق الريش، وفحص المناقير وتوجيه المربي لنظام غذائي غني بالبذور والمغذيات.',
        summaryEn: 'Crop function check, feather follicle condition, beak symmetry, and transition to pellet-based balanced nutrition.',
        estimatedVisitFeeEgp: 320,
        vaccineProtocolsAr: ['فحص مجهري للفضلات لاستبعاد الطفيليات وحيدة الخلية', 'إرشادات التعقيم والتنظيف الدوري للقفص والمجاثم', 'فيتامينات دعم تبديل الريش وتشكيل الكيراتين'],
        vaccineProtocolsEn: ['Direct fecal wet mount and Gram stain for protozoa', 'Perch diameter ergonomics and enclosure hygiene advice', 'Molt support and keratin synthesis supplementation'],
        examMilestonesAr: ['فحص امتلاء الحوصلة وتفريغها الطبيعي', 'فحص فتحات الأنف ونمو المنقار المتناسق', 'فحص ريش الأجنحة واستبعاد حشرات الريش'],
        examMilestonesEn: ['Crop palpation and normal emptying motility review', 'Nasal cere and beak symmetry inspection', 'Plumage follicle and feather mite microscopic exclusion']
      },
      {
        stageId: 'adult',
        titleAr: 'السنوات النشطة وصحة الجهاز التنفسي',
        titleEn: 'Adult Respiratory & Beak Integrity',
        ageSpanAr: 'من سنة إلى ٧ سنوات',
        ageSpanEn: '1 to 7 years',
        summaryAr: 'تسمع الأكياس الهوائية، تقييم تماثل المنقار والأظافر، والتأكد من نقاء فتحات التنفس.',
        summaryEn: 'Air sac auscultation, rhamphotheca symmetry, and environmental toxin (Teflon/aerosol) safety education.',
        estimatedVisitFeeEgp: 300,
        vaccineProtocolsAr: ['الفحص السنوي الوقائي الشامل للطيور', 'تحليل عينة مسحة الحوصلة الدورية', 'إرشادات الحماية من أبخرة الطهي والمواد المتطايرة'],
        vaccineProtocolsEn: ['Annual comprehensive avian wellness audit', 'Periodic crop cytology and bacterial flora screen', 'Household polytetrafluoroethylene (PTFE) hazard review'],
        examMilestonesAr: ['تسمع الرئتين والأكياس الهوائية للتأكد من خلوها من الصفير', 'فحص فتحات الأنف والجيوب تحت الحجاج', 'فحص باطن أصابع القدم والمفاصل لاستبعاد التقرحات'],
        examMilestonesEn: ['Respiratory and thoracic air sac auscultation', 'Infraorbital sinus and cere clarity inspection', 'Plantar surface and pododermatitis evaluation']
      },
      {
        stageId: 'senior',
        titleAr: 'الطيور المعمرة وصحة المفاصل والمناعة',
        titleEn: 'Geriatric Avian Longevity',
        ageSpanAr: 'أكبر من ٧ سنوات',
        ageSpanEn: '7+ years',
        summaryAr: 'متابعة وظائف الكبد وحفظ وزن الجسم على ميزان الغرام الدقيق، وتعديل المجاثم لتناسب المفاصل.',
        summaryEn: 'Hepatic lipidosis monitoring, exact gram scale weight curves, and soft-padded perch adaptations.',
        estimatedVisitFeeEgp: 450,
        vaccineProtocolsAr: ['فحوصات دم متخصصة لحجم الطائر ونوعه', 'مكملات دعم الكبد ومضادات الأكسدة الطبيعية', 'تعديل بيئة القفص لتسهيل الوصول للأكل والماء'],
        vaccineProtocolsEn: ['Micro-volume avian blood chemistry profiles', 'Hepatoprotective silymarin and vitamin E therapy', 'Accessible low-impact perching and feeding geometry'],
        examMilestonesAr: ['تسجيل الوزن بالجرام لملاحظة فقدان الكتلة العضلية', 'فحص مرونة المفاصل وأصابع القدم لراحة الوقوف', 'فحص العيون ورصد وضوح الرؤية وردود الفعل العصبية'],
        examMilestonesEn: ['Precision gram-weight tracking for pectoral muscle loss', 'Toe grip strength and digital joint mobility assessment', 'Ocular clarity and light-reflex response confirmation']
      }
    ]
  }
];

export function PawWellCareProtocolCalibrator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedSpecies, setSelectedSpecies] = useState<'dog' | 'cat' | 'rabbit' | 'bird'>('dog');
  const [selectedStage, setSelectedStage] = useState<'young' | 'adult' | 'senior'>('young');

  const currentProtocol = CARE_PROTOCOLS.find(p => p.speciesId === selectedSpecies) || CARE_PROTOCOLS[0];
  const currentStage = currentProtocol.lifeStages.find(s => s.stageId === selectedStage) || currentProtocol.lifeStages[0];

  const speciesList: { id: 'dog' | 'cat' | 'rabbit' | 'bird'; nameAr: string; nameEn: string; Icon: any }[] = [
    { id: 'dog', nameAr: 'كلاب', nameEn: 'Dogs', Icon: Dog },
    { id: 'cat', nameAr: 'قطط', nameEn: 'Cats', Icon: Cat },
    { id: 'rabbit', nameAr: 'أرانب', nameEn: 'Rabbits', Icon: Rabbit },
    { id: 'bird', nameAr: 'طيور', nameEn: 'Birds', Icon: Bird }
  ];

  return (
    <div className="bg-[#FAF8F2] border-2 border-[#24463D]/15 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(36,70,61,0.08)]">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE5] border border-[#24463D]/20 text-xs font-black text-[#24463D] uppercase tracking-wider">
          <Stethoscope className="w-3.5 h-3.5 text-[#24463D]" />
          <span>{isAr ? 'أداة معايرة الرعاية البيطرية حسب النوع والعمر' : 'Species & Life-Stage Preventive Protocol Calibrator'}</span>
        </div>
        <h2 className="paw-display text-3xl sm:text-5xl font-black text-[#24463D] leading-tight">
          {isAr ? 'بروتوكول الرعاية المخصص لصديقك الأليف' : 'Calibrated Care Protocols for Every Companion'}
        </h2>
        <p className="text-[#45645A] text-sm sm:text-base leading-relaxed">
          {isAr
            ? 'تختلف الاحتياجات السريرية والتطعيمات وبرامج الفحص بحسب الفصيلة ومرحلة النمو. استخدم المعاير التفاعلي لاستكشاف المحاور التي يناقشها الطبيب البيطري الحقيقي.'
            : 'Clinical checklists, core immunizations, and screening frequencies vary substantially by species and physiological life stage. Explore evidence-based focus points for your upcoming consultation.'}
        </p>
      </div>

      {/* Step 1: Species Selector */}
      <div className="mt-10 pt-8 border-t border-[#24463D]/15 space-y-3">
        <label className="block text-xs font-black uppercase tracking-wider text-[#915736]">
          {isAr ? '١. حدد نوع الحيوان الأليف' : '1. Select Companion Species'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {speciesList.map(({ id, nameAr, nameEn, Icon }) => {
            const active = selectedSpecies === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedSpecies(id)}
                aria-pressed={active}
                aria-label={isAr ? `اختيار ${nameAr}` : `Select ${nameEn}`}
                className={`flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all ${
                  active
                    ? 'bg-[#24463D] text-white border-[#24463D] shadow-md scale-[1.02]'
                    : 'bg-white text-[#24463D] border-[#D9E6D7] hover:border-[#24463D]/40 hover:bg-[#F2F6ED]'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#F3B98E]' : 'text-[#467262]'}`} />
                <span>{isAr ? nameAr : nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Life Stage Selector */}
      <div className="mt-8 space-y-3">
        <label className="block text-xs font-black uppercase tracking-wider text-[#915736]">
          {isAr ? '٢. حدد المرحلة العمرية' : '2. Select Physiological Life Stage'}
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {currentProtocol.lifeStages.map(s => {
            const active = selectedStage === s.stageId;
            return (
              <button
                key={s.stageId}
                type="button"
                onClick={() => setSelectedStage(s.stageId)}
                aria-pressed={active}
                aria-label={isAr ? `مرحلة ${s.titleAr}` : `Stage ${s.titleEn}`}
                className={`p-3 sm:p-5 rounded-2xl border-2 text-start transition-all ${
                  active
                    ? 'bg-[#F3B98E]/25 border-[#915736] text-[#24463D] shadow-sm'
                    : 'bg-white border-[#D9E6D7] text-[#45645A] hover:bg-[#FAFBF7]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs font-mono font-bold uppercase ${active ? 'text-[#915736]' : 'text-slate-500'}`}>
                    {s.stageId.toUpperCase()}
                  </span>
                  {active && <CheckCircle2 className="w-4 h-4 text-[#915736] shrink-0" />}
                </div>
                <div className="font-extrabold text-sm sm:text-base text-[#24463D] mt-2">
                  {isAr ? s.titleAr : s.titleEn}
                </div>
                <div className="text-xs text-[#5C7A6E] mt-1 font-medium">
                  {isAr ? s.ageSpanAr : s.ageSpanEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div className="mt-10 bg-white border border-[#24463D]/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
        {/* Card Header & Scope Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#24463D]/10">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#915736]">
              {isAr ? currentProtocol.speciesNameAr : currentProtocol.speciesNameEn} // {isAr ? currentStage.titleAr : currentStage.titleEn}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#24463D]">
              {isAr ? currentStage.titleAr : currentStage.titleEn}
            </h3>
            <p className="text-[#45645A] text-sm sm:text-base max-w-2xl leading-relaxed">
              {isAr ? currentStage.summaryAr : currentStage.summaryEn}
            </p>
          </div>

          <div className="bg-[#F9F6EE] border border-[#E0D8C5] rounded-2xl p-5 text-center lg:text-end shrink-0">
            <div className="text-xs font-bold text-[#875231] uppercase tracking-wider">
              {isAr ? 'قيمة الاستشارة التقديرية' : 'Estimated Visit Range'}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#24463D] mt-1">
              {currentStage.estimatedVisitFeeEgp} <span className="text-sm font-bold text-[#45645A]">{isAr ? 'ج.م' : 'EGP'}</span>
            </div>
            <div className="text-[11px] text-[#6E887E] mt-1">
              {isAr ? 'إرشادية توضيحية لمركز طبي حقيقي' : 'Illustrative concept benchmark'}
            </div>
          </div>
        </div>

        {/* Dual Grid: Protocols & Milestones */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Column 1: Core Immunizations & Prophylaxis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black text-[#24463D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#915736]" />
              <span>{isAr ? 'البروتوكولات الوقائية والتطعيمات' : 'Immunizations & Prophylactic Shield'}</span>
            </div>
            <ul className="space-y-3">
              {(isAr ? currentStage.vaccineProtocolsAr : currentStage.vaccineProtocolsEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#35584A] bg-[#F5F8F2] p-3.5 rounded-xl border border-[#DDE7D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#24463D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Clinical Physical Examination Milestones */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black text-[#24463D] uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#24463D]" />
              <span>{isAr ? 'فحوصات الطبيب البيطري السريرية' : 'Clinical Physical Exam Milestones'}</span>
            </div>
            <ul className="space-y-3">
              {(isAr ? currentStage.examMilestonesAr : currentStage.examMilestonesEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#35584A] bg-[#F9F6EE] p-3.5 rounded-xl border border-[#E8DFC9]">
                  <PawPrint className="w-4 h-4 text-[#915736] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA & Disclaimer Row */}
        <div className="pt-6 border-t border-[#24463D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#52685C] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#24463D] shrink-0" />
            <span>{isAr ? 'هذا المعاير لتنظيم الأسئلة وليس بديلاً عن كشف الطبيب البيطري الحقيقي.' : 'Guidance model only. Examinations and prescriptions require a licensed veterinarian.'}</span>
          </div>

          <Link
            href={`${pawPath(locale, 'request')}?species=${selectedSpecies}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#24463D] text-white px-8 py-4 rounded-full font-black text-sm hover:bg-[#35584A] transition-colors"
          >
            <span>{isAr ? 'طلب استفسار زيارة لهذا النوع' : 'Request Consultation For This Species'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
