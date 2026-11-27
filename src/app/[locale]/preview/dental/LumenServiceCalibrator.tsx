'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { lumenPhotos } from './media';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  HeartPulse,
  Activity,
  CalendarCheck,
  CheckCircle2,
  Info,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface Pathway {
  id: string;
  slug: string;
  photoId: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  durationMin: string;
  comfortProtocolEn: string;
  comfortProtocolAr: string;
  descriptionEn: string;
  descriptionAr: string;
  indicativeFee: {
    amount: string;
    noteEn: string;
    noteAr: string;
  };
  clinicalInclusionsEn: string[];
  clinicalInclusionsAr: string[];
}

const CLINICAL_PATHWAYS: Pathway[] = [
  {
    id: 'aesthetic',
    slug: 'service-01',
    photoId: 'operatory',
    titleEn: 'Digital Smile Architecture & Porcelain Veneers',
    titleAr: 'تصميم الابتسامة الرقمي وقشور الخزف التجميلية',
    categoryEn: 'Aesthetic Dentistry',
    categoryAr: 'طب الأسنان التجميلي المتقدم',
    durationMin: '60–90 min per appointment',
    comfortProtocolEn: 'Computer-Assisted Local Wand Anesthesia & Nitrous Comfort Available',
    comfortProtocolAr: 'تخدير موضعي حاسوبي دقيق بدون ألم مع خيار الأكسجين المهدئ',
    descriptionEn: 'Micro-invasive cosmetic restoration tailored to natural facial symmetry. Utilizing high-resolution intraoral scanning to model individual smile contours with zero guesswork.',
    descriptionAr: 'ترميم تجميلي طفيف التوغل يعتمد على التناسق الطبيعي لملامح الوجه، باستخدام المسح الرقمي ثلاثي الأبعاد لتصميم خط الابتسامة دون تكهنات.',
    indicativeFee: {
      amount: '4,500 – 7,800 EGP',
      noteEn: 'Per porcelain veneer unit (includes 3D CAD/CAM mock-up & trial fitting)',
      noteAr: 'لكل سن من قشور البورسلين (يشمل نموذج التجربة الرقمي ثلاثي الأبعاد)'
    },
    clinicalInclusionsEn: [
      'Digital 3D Smile Simulation Scan',
      'Ultra-Thin Minimal-Prep Porcelain Fabrication',
      'Harmonized Shade Matching Under 5500K True Daylight',
      'Comprehensive Occlusal & Bite Alignment Verification'
    ],
    clinicalInclusionsAr: [
      'مسح رقمي ثلاثي الأبعاد لمحاكاة شكل الابتسامة',
      'تصنيع خزف فائق الدقة بسماكة ميكرونية محافظة',
      'مطابقة درجات اللون تحت ضوء النهار الطبيعي 5500 كلفن',
      'فحص توازن الإطباق وتوزيع قوى المضغ السليمة'
    ]
  },
  {
    id: 'implantology',
    slug: 'service-02',
    photoId: 'prosthetics',
    titleEn: 'Computer-Guided Implantology & Zirconia Crown',
    titleAr: 'زراعة الأسنان الموجهة حاسوبيًا والتيجان الزيركونية',
    categoryEn: 'Surgical Restorative Care',
    categoryAr: 'الجراحة الترميمية وزراعة الأسنان',
    durationMin: '45–60 min surgical phase',
    comfortProtocolEn: 'Single-Site Micro-Incision with Cryo-Swelling Reduction Protocol',
    comfortProtocolAr: 'شق جراحي ميكروني محدود مع كمادات علاج بارد لمنع التورم',
    descriptionEn: 'Biocompatible titanium or ceramic implant placement executed via 3D CBCT surgical guides. Engineered for immediate primary stability and lifelong osseointegration.',
    descriptionAr: 'تثبيت زرعات التيتانيوم الحيوية باستخدام أدلة جراحية ثلاثية الأبعاد مشتقة من الأشعة المقطعية، لتحقيق أعلى درجات الثبات الأولي والاندماج العظمي.',
    indicativeFee: {
      amount: '12,000 – 18,500 EGP',
      noteEn: 'Includes Swiss implant fixture, titanium abutment & CAD/CAM crown',
      noteAr: 'يشمل الزرعة السويسرية والدعامة والتاج الزيركوني المخرط بالكمبيوتر'
    },
    clinicalInclusionsEn: [
      'Low-Dose CBCT 3D Bone Density Diagnostic',
      'Custom Printed Surgical Precision Guide',
      'High-Grade Medical Titanium / Zirconia Fixture',
      'Post-Surgical Healing Cap & Laser Photobiomodulation'
    ],
    clinicalInclusionsAr: [
      'فحص مقطعي ثلاثي الأبعاد منخفض الإشعاع لقياس كثافة العظم',
      'دليل جراحي مطبوع بدقة لضمان زاوية وعمق الغرس المثالي',
      'زرعة تيتانيوم طبية عالية النقاوة معتمدة دوليًا',
      'غطاء التئام حيوي وجلسات ليزر لتسريع تعافي الأنسجة'
    ]
  },
  {
    id: 'hygiene',
    slug: 'service-03',
    photoId: 'hygiene',
    titleEn: 'Preventive Airflow Periodontal Debridement',
    titleAr: 'العناية الوقائية وتنظيف اللثة بتقنية الإيرفلو',
    categoryEn: 'Periodontal Wellness',
    categoryAr: 'صحة اللثة والطب الوقائي',
    durationMin: '40–50 min full mouth',
    comfortProtocolEn: 'Heated Water Delivery with Painless Magnetostrictive Tips',
    comfortProtocolAr: 'رذاذ ماء دافئ لطيف ورؤوس مغناطيسية دقيقة تمنع حساسية الأسنان',
    descriptionEn: 'Subgingival biofilm and calcified tartar removal utilizing fine glycine powder aerosol. Protects soft tissue and tooth enamel while resolving gingival inflammation.',
    descriptionAr: 'إزالة الرواسب الجيرية العميقة وتصبغات القهوة والتدخين باستخدام رذاذ مسحوق الجلايسين الناعم دون خدش المينا أو إيذاء اللثة.',
    indicativeFee: {
      amount: '950 – 1,600 EGP',
      noteEn: 'Complete ultrasonic scaling + Airflow polish + remineralizing fluoride',
      noteAr: 'تنظيف كامل بالموجات فوق الصوتية + تلميع إيرفلو + فلورايد مقوٍ للمينا'
    },
    clinicalInclusionsEn: [
      'Gentle Magnetostrictive Ultrasonic Calculus Removal',
      'Erythritol Biofilm Stain Disruption (Airflow)',
      'Interdental Micro-Polishing & Pocket Depth Charting',
      'Medical Grade Neutral Sodium Fluoride Enamel Varnish'
    ],
    clinicalInclusionsAr: [
      'إزالة التكلسات الجيرية بموجات فوق صوتية ناعمة',
      'تفتيت الأغشية البكتيرية والتصبغات برذاذ إريثريتول اللطيف',
      'قياس وتوثيق عمق جيوب اللثة لمتابعة التعافي الدوري',
      'تطبيق ورنيش الفلورايد الطبي لحماية عنق الأسنان من التحسس'
    ]
  },
  {
    id: 'ortho',
    slug: 'service-04',
    photoId: 'consultation',
    titleEn: 'Digital Clear Aligner Therapy & Retainers',
    titleAr: 'التقويم الشفاف الرقمي ومثبتات الأسنان الذكية',
    categoryEn: 'Orthodontic Alignment',
    categoryAr: 'تقويم الأسنان وتعديل الإطباق',
    durationMin: '30 min check-in visits',
    comfortProtocolEn: 'Smooth Scalloped Edge Trim & Zero Metal Bracket Irritation',
    comfortProtocolAr: 'حواف ناعمة مشذبة بدقة بالليزر لتجنب أي احتكاك مع الشفاه واللثة',
    descriptionEn: 'Virtually planned tooth movement using progressive transparent aligners. Removable for comfortable dining and optimal oral hygiene throughout treatment.',
    descriptionAr: 'تعديل اصطفاف الأسنان تدريجيًا بقوالب شفافة غير مرئية مصممة حاسوبيًا، قابلة للنزع أثناء الأكل وتنظيف الأسنان بسهولة تامة.',
    indicativeFee: {
      amount: '28,000 – 42,000 EGP',
      noteEn: 'Comprehensive full treatment case with multi-stage aligner series',
      noteAr: 'يشمل كامل مراحل العلاج وسلسلة القوالب والمثبت النهائي بعد العلاج'
    },
    clinicalInclusionsEn: [
      'Optical Intraoral 3D Digital Impression (No Messy Paste)',
      'ClinCheck Virtual 3D Movement Roadmap Preview',
      'Medical-Grade Multi-Layer Elastic Polyurethane Aligners',
      'Final Dual Vivera Clear Retainers for Lifetime Stability'
    ],
    clinicalInclusionsAr: [
      'أخذ مقاسات رقمي ضوئي بالكامل دون استخدام معجون الطبعات المزعج',
      'خريطة فيديو ثلاثية الأبعاد توضح مراحل حركة الأسنان خطوة بخطوة',
      'قوالب مصنوعة من بوليمر طبي مرن ومتين معتمد عالميًا',
      'زوج مثبتات شفاف مزدوج للحفاظ على ثبات النتيجة مدى الحياة'
    ]
  }
];

export default function LumenServiceCalibrator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeId, setActiveId] = useState<string>(CLINICAL_PATHWAYS[0].id);
  const activePathway = CLINICAL_PATHWAYS.find((p) => p.id === activeId) || CLINICAL_PATHWAYS[0];
  const photo = lumenPhotos.find((p) => p.id === activePathway.photoId) || lumenPhotos[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#CBDCD5] shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#CBDCD5]">
        <div>
          <span className="text-xs font-mono font-bold text-[#193A39] uppercase tracking-widest block mb-1">
            CLINICAL PATHWAYS & SPECIALIST PROTOCOLS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#193A39] tracking-tight">
            {isAr ? 'دليل المسارات العلاجية وبروتوكولات الراحة' : 'Clinical Treatment Pathways & Comfort Protocols'}
          </h2>
          <p className="text-[#3D5C58] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'استكشف مسارات العلاج التخصصية بشفافية كاملة: مواعيد الزيارات المتوقعة، وبروتوكول إدارة الألم والراحة، والمواصفات الفنية لكل إجراء.'
              : 'Explore specialized treatment pathways with clinical transparency: expected visit timelines, tailored comfort protocols, and procedure specifications.'}
          </p>
        </div>

        {/* Pathway Selector Bar */}
        <div className="flex items-center gap-1.5 bg-[#E4EFEA] p-1.5 rounded-xl overflow-x-auto max-w-full w-full lg:w-auto">
          {CLINICAL_PATHWAYS.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#193A39] text-white shadow-sm'
                    : 'text-[#3D5C58] hover:text-[#193A39] hover:bg-white'
                }`}
              >
                {isAr ? item.categoryAr : item.categoryEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Visual Card + Detailed Clinical Pathway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Clinical Operatory Visual (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-[#CBDCD5] shadow-md group">
            <Image
              src={photo.url}
              alt={isAr ? activePathway.titleAr : activePathway.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-4 start-4 flex items-center gap-2">
              <span className="bg-[#193A39]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-teal-800">
                LUMEN OPERATORY // CLASS B STERILE
              </span>
            </div>

            <div className="absolute bottom-4 start-4 end-4 text-white space-y-1">
              <span className="bg-[#3D5C58] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                {isAr ? activePathway.categoryAr : activePathway.categoryEn}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold">
                {isAr ? activePathway.titleAr : activePathway.titleEn}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#3D5C58] px-2">
            <span>{isAr ? 'أصول بصرية سريرية محلية مرخصة (WebP)' : 'Verified local clinical licensed WebP asset'}</span>
            <span>{photo.license} • {photo.author}</span>
          </div>
        </div>

        {/* Right Column: Treatment Breakdown & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-[#EDF5F2] p-6 rounded-2xl border border-[#CBDCD5] space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#193A39] uppercase tracking-wider block">
                {isAr ? activePathway.categoryAr : activePathway.categoryEn}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#193A39] mt-0.5">
                {isAr ? activePathway.titleAr : activePathway.titleEn}
              </h3>
              <p className="text-xs text-[#3D5C58] leading-relaxed mt-2">
                {isAr ? activePathway.descriptionAr : activePathway.descriptionEn}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#CBDCD5] text-xs">
              <div className="flex items-center gap-2 text-[#193A39]">
                <Clock className="w-4 h-4 text-[#193A39] shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#3D5C58] block">{isAr ? 'المدة التقديرية' : 'Visit Duration'}</span>
                  <span className="font-bold">{activePathway.durationMin}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#193A39]">
                <HeartPulse className="w-4 h-4 text-[#193A39] shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#3D5C58] block">{isAr ? 'بروتوكول الراحة' : 'Comfort'}</span>
                  <span className="font-bold text-[11px] truncate block max-w-[170px]">{isAr ? activePathway.comfortProtocolAr : activePathway.comfortProtocolEn}</span>
                </div>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#193A39] font-mono uppercase tracking-wider block">
                {isAr ? 'المواصفات السريرية المضمنة في الإجراء:' : 'Standard Clinical Protocol Inclusions:'}
              </span>
              <div className="space-y-1.5 text-xs text-[#3D5C58]">
                {(isAr ? activePathway.clinicalInclusionsAr : activePathway.clinicalInclusionsEn).map((inc, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#193A39] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicative Investment Card */}
            <div className="bg-white p-4 rounded-xl border border-[#CBDCD5] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#3D5C58] block font-semibold">{isAr ? 'الاستثمار الاسترشادي' : 'Indicative Investment'}</span>
                <span className="text-base font-black text-[#193A39] font-mono">{activePathway.indicativeFee.amount}</span>
                <span className="text-[10px] text-[#3D5C58] block mt-0.5">{isAr ? activePathway.indicativeFee.noteAr : activePathway.indicativeFee.noteEn}</span>
              </div>
            </div>

            {/* Honest Medical Advice Disclaimer */}
            <div className="flex items-start gap-2 bg-[#E4EFEA] p-3 rounded-lg text-[11px] text-[#3D5C58] leading-relaxed">
              <Info className="w-4 h-4 text-[#193A39] shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? 'المعلومات استرشادية فقط ولا تغني عن الفحص السريري المباشر والأشعة التشخيصية لتحديد ملاءمة الخطة الطبية لكل حالة.'
                  : 'Educational guidance only; does not substitute clinical and radiographic evaluation by a licensed dental professional.'}
              </span>
            </div>

            {/* Action CTA */}
            <Link
              href={`/${locale}/preview/dental/request-appointment?service=${activePathway.slug}`}
              className="w-full bg-[#193A39] hover:bg-[#122b2a] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{isAr ? 'طلب موعد استشارة سريرية لهذا الإجراء' : 'Request Consultation for This Procedure'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
