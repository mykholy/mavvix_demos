'use client';

import React, { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Scissors,
  Gem,
  Flower2,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  Heart
} from 'lucide-react';
import Link from 'next/link';

interface SalonSpaTreatmentCalibratorProps {
  locale: Locale;
}

interface PathwayOption {
  id: string;
  category: 'hair' | 'nails' | 'facial' | 'spa';
  name: { ar: string; en: string };
  durationMinutes: number;
  intensity: { ar: string; en: string };
  consultationSteps: { ar: string[]; en: string[] };
  prepGuidance: { ar: string; en: string };
  aftercare: { ar: string; en: string };
}

const PATHWAYS: PathwayOption[] = [
  {
    id: 'precision-cut-finish',
    category: 'hair',
    name: {
      ar: 'قص وتشكيل الشعر الهندسي مع التصفيف بالهواء',
      en: 'Precision Architectural Haircut & Volume Blowout'
    },
    durationMinutes: 60,
    intensity: { ar: 'عناية تفصيلية ومظهر متجدد', en: 'Detailed styling & refreshed contour' },
    consultationSteps: {
      ar: [
        'تحليل ملمس الشعر وكثافة الخصلات ونمط النمو الطبيعي',
        'مواءمة القصة المقترحة مع أسلوب الحياة وسهولة التصفيف المنزلي',
        'تحديد المنتجات التصفيفية المغذية وحماية أطراف الشعر من الحرارة'
      ],
      en: [
        'Assessment of hair texture, growth whorls, and strand density',
        'Aligning shape with home styling time and maintenance routine',
        'Selection of heat-protective botanicals and strand conditioners'
      ]
    },
    prepGuidance: {
      ar: 'يفضل الحضور بدون مستحضرات تصفيف ثقيلة لتسهيل الفحص الواقعي لطبيعة الشعر.',
      en: 'Arrive with hair free of heavy build-up products to inspect natural texture.'
    },
    aftercare: {
      ar: 'استخدام شامبو خالٍ من الكبريتات وترطيب الأطراف أسبوعياً ببلسم مغذٍ.',
      en: 'Utilize sulfate-free cleansing and a weekly botanical hydrating treatment.'
    }
  },
  {
    id: 'artisan-nail-lacquer',
    category: 'nails',
    name: {
      ar: 'مانيكير روسي راقٍ مع تشكيل الحواف وطلاء جل علاجي',
      en: 'Artisanal Contour Manicure & Breathable Treatment Lacquer'
    },
    durationMinutes: 75,
    intensity: { ar: 'دقة مجهرية وحماية للظفر الطبيعي', en: 'Micro-precision & natural plate protection' },
    consultationSteps: {
      ar: [
        'فحص صحة الظفر والجلد المحيط واستبعاد أي علامات فطرية أو حساسية',
        'اختيار الشكل الهندسي الأنسب (بيضاوي، لوزي، مربع ناعم)',
        'استعراض لوحة الألوان واختيار تركيبة طلاء آمنة تدعم صحة الظفر'
      ],
      en: [
        'Hygiene screening of cuticles and nail bed health',
        'Selecting the optimal architectural shape (oval, almond, soft square)',
        'Color palette matching with breathable, nutrient-rich formulations'
      ]
    },
    prepGuidance: {
      ar: 'تجنب قص الجلد المحيط في المنزل قبل 48 ساعة من الجلسة لتفادي التهيج.',
      en: 'Avoid aggressive DIY cuticle trimming for 48 hours prior to service.'
    },
    aftercare: {
      ar: 'تطبيق زيت اللوز العضوي على الجلد المحيط مرتين يومياً للحفاظ على النضارة.',
      en: 'Apply organic cuticle elixir twice daily to maintain barrier elasticity.'
    }
  },
  {
    id: 'botanical-radiance-facial',
    category: 'facial',
    name: {
      ar: 'طقس الإشراق النباتي وترطيب خلايا البشرة العميق',
      en: 'Botanical Radiance & Cellular Hydration Ritual'
    },
    durationMinutes: 90,
    intensity: { ar: 'استرخاء عميق وتجديد لنضارة البشرة', en: 'Deep restorative glow & moisture balance' },
    consultationSteps: {
      ar: [
        'استبيان نوع البشرة ومدى حساسيتها تجاه الزيوت الأساسية والخلاصات النباتية',
        'تنظيف لطيف وإزالة الشوائب السطحية بمستحلبات طبيعية متوازنة الحموضة',
        'تدليك لمفاوي للوجه يعزز الدورة الدموية ويهدئ ملامح الإجهاد'
      ],
      en: [
        'Skin sensitivity profiling regarding essential oils and active botanicals',
        'Gentle cleansing with pH-balanced floral hydrosols and non-abrasive clays',
        'Acupressure facial lymphatic massage releasing jaw and forehead tension'
      ]
    },
    prepGuidance: {
      ar: 'التوقف عن استخدام المقشرات الكيميائية القوية (مثل أحماض ريتينول) قبل يومين.',
      en: 'Discontinue potent chemical exfoliants or retinoids for 48 hours beforehand.'
    },
    aftercare: {
      ar: 'تجنب التعرض المباشر لأشعة الشمس الحارقة واستخدام واقٍ شمسي مرطب غني.',
      en: 'Shield skin from harsh sunlight and maintain rich barrier hydration.'
    }
  },
  {
    id: 'volcanic-stone-serenity',
    category: 'spa',
    name: {
      ar: 'جلسة تدليك استرخائي بأحجار البازلت البركانية الدافئة',
      en: 'Heated Basalt Stone Sensory Relaxation Massage'
    },
    durationMinutes: 90,
    intensity: { ar: 'هدوء حسي شامل وإزالة للشد العضلي', en: 'Comprehensive tension relief & calm reset' },
    consultationSteps: {
      ar: [
        'معايرة درجة حرارة الأحجار ومراجعة أي قيود صحية أو ضغط دم مرتفع',
        'تخصيص مزيج الزيوت العطرية العضوية (اللافندر، البابونج، خشب الصندل)',
        'تحديد مناطق التركيز (الكتفين، أسفل الظهر، راحة القدمين)'
      ],
      en: [
        'Calibrating thermal stone temperatures and health safety constraints',
        'Customizing calming botanical aromatherapies (lavender, chamomile, sandalwood)',
        'Focusing on key areas of localized postural strain and tension'
      ]
    },
    prepGuidance: {
      ar: 'شرب كوب من الماء وتناول وجبة خفيفة قبل موعد الجلسة بساعة واحدة.',
      en: 'Hydrate well and enjoy a light snack at least one hour before the session.'
    },
    aftercare: {
      ar: 'الحفاظ على الدفء وشرب شاي الأعشاب المهدئ والامتناع عن الإجهاد البدني.',
      en: 'Stay warm, drink calming herbal tea, and rest to prolong therapeutic relaxation.'
    }
  }
];

export function SalonSpaTreatmentCalibrator({ locale }: SalonSpaTreatmentCalibratorProps) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'hair' | 'nails' | 'facial' | 'spa'>('hair');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('precision-cut-finish');
  const [includeOccasionPrep, setIncludeOccasionPrep] = useState<boolean>(false);

  const activePathway =
    PATHWAYS.find((p) => p.id === selectedPathwayId) ||
    PATHWAYS.find((p) => p.category === activeTab) ||
    PATHWAYS[0];

  const totalMinutes = activePathway.durationMinutes + (includeOccasionPrep ? 30 : 0);

  const handleTabChange = (category: 'hair' | 'nails' | 'facial' | 'spa') => {
    setActiveTab(category);
    const firstOfCategory = PATHWAYS.find((p) => p.category === category);
    if (firstOfCategory) {
      setSelectedPathwayId(firstOfCategory.id);
    }
  };

  return (
    <div
      data-sector-specific="velora-treatment-calibrator"
      className="bg-[#FFFDF9] rounded-3xl border border-[#E6D8D5] shadow-[0_20px_60px_rgba(75,40,52,0.06)] overflow-hidden p-6 sm:p-10 lg:p-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EADBD8]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#854D5C]">
            <Sparkles size={15} className="text-[#A46D7B]" />
            {ar ? 'معايرة مسار العناية الشخصية' : 'Personalized Treatment Calibrator'}
          </div>
          <h3 className="velora-display text-2xl sm:text-4xl font-semibold text-[#4B2834] mt-3">
            {ar ? 'صممي تجربة الجمال التي تناسب وقتك واحتياجك' : 'Curate the Beauty Ritual That Fits Your Tempo'}
          </h3>
          <p className="text-sm text-[#704E59] leading-7 mt-2 max-w-2xl">
            {ar
              ? 'حددي فئة الخدمة للاطلاع على تسلسل الاستشارة المهنية، متطلبات التحضير، والمدة الزمنية التقديرية بدقة وشفافية كاملة.'
              : 'Explore the structured consultation sequence, preparation guidelines, and realistic durations before booking your enquiry.'}
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#F6ECE8] rounded-2xl self-start md:self-auto">
          {[
            { id: 'hair', labelAr: 'الشعر', labelEn: 'Hair', icon: Scissors },
            { id: 'nails', labelAr: 'الأظافر', labelEn: 'Nails', icon: Gem },
            { id: 'facial', labelAr: 'البشرة', labelEn: 'Facial', icon: Sparkles },
            { id: 'spa', labelAr: 'الاسترخاء', labelEn: 'Spa & Body', icon: Flower2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id as 'hair' | 'nails' | 'facial' | 'spa')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#4B2834] text-white shadow-sm'
                    : 'text-[#6E4D5B] hover:text-[#4B2834] hover:bg-white/60'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={14} />
                <span>{ar ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 pt-8">
        {/* Left column: Selected pathway details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FCF8F5] border border-[#EBDCD9]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#854D5C] uppercase tracking-wider block">
                  {ar ? 'الطقس المختار' : 'Active Experience'}
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#4B2834] mt-1">
                  {ar ? activePathway.name.ar : activePathway.name.en}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEDBD7] text-[#4B2834] shrink-0">
                {ar ? activePathway.intensity.ar : activePathway.intensity.en}
              </span>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E8D9D6]">
              <h5 className="text-xs font-bold text-[#704E59] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers size={14} className="text-[#985A69]" />
                {ar ? 'مراحل الاستشارة والتنفيذ الحرفي' : 'Consultation & Execution Sequence'}
              </h5>
              <div className="space-y-2.5">
                {(ar ? activePathway.consultationSteps.ar : activePathway.consultationSteps.en).map(
                  (step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs leading-6 text-[#563440]">
                      <span className="w-5 h-5 rounded-full bg-[#E8D4D0] text-[#4B2834] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#E8D9D6]">
              <div className="p-3.5 rounded-xl bg-white border border-[#E9DBD8]">
                <span className="text-[11px] font-bold text-[#854D5C] flex items-center gap-1.5 mb-1.5">
                  <Info size={13} className="text-[#985A69]" />
                  {ar ? 'إرشادات ما قبل الجلسة' : 'Preparation Note'}
                </span>
                <p className="text-xs leading-5 text-[#634650]">
                  {ar ? activePathway.prepGuidance.ar : activePathway.prepGuidance.en}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E9DBD8]">
                <span className="text-[11px] font-bold text-[#854D5C] flex items-center gap-1.5 mb-1.5">
                  <Heart size={13} className="text-[#985A69]" />
                  {ar ? 'العناية المنزلية اللاحقة' : 'Aftercare Support'}
                </span>
                <p className="text-xs leading-5 text-[#634650]">
                  {ar ? activePathway.aftercare.ar : activePathway.aftercare.en}
                </p>
              </div>
            </div>
          </div>

          {/* Add-on toggle for occasion styling */}
          <div className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#ECD9D6] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                id="occasion-toggle"
                type="checkbox"
                checked={includeOccasionPrep}
                onChange={(e) => setIncludeOccasionPrep(e.target.checked)}
                className="w-4 h-4 text-[#4B2834] rounded accent-[#4B2834] cursor-pointer"
              />
              <label htmlFor="occasion-toggle" className="text-xs text-[#563440] font-bold cursor-pointer">
                {ar
                  ? 'إضافة باقة اللمسات الاحتفالية النهائية (+30 دقيقة للمناسبات والتصوير)'
                  : 'Add Occasion Touch-up & Final Setting (+30 mins for events & photo readiness)'}
              </label>
            </div>
            <span className="text-xs font-mono font-bold text-[#854D5C] shrink-0">
              +30 {ar ? 'دقيقة' : 'mins'}
            </span>
          </div>
        </div>

        {/* Right column: Summary & Consultation Callout */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#4B2834] text-white">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-wider uppercase mb-5">
              <Clock size={13} className="text-[#F1D1D8]" />
              {ar ? 'الوقت الإجمالي التقديري' : 'Calculated Session Window'}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="velora-display text-5xl sm:text-6xl font-normal text-[#FAE9E5]">
                {totalMinutes}
              </span>
              <span className="text-sm font-bold text-[#E5C1C8]">
                {ar ? 'دقيقة تخطيطية' : 'indicative minutes'}
              </span>
            </div>

            <p className="text-xs text-[#EAD0D5] leading-6 mt-4">
              {ar
                ? 'تساعد هذه المعايرة في تخصيص نافذة زمنية مريحة دون تسرع، وتمنحك وقتاً كافياً للاستشارة الهادئة قبل بدء الخدمة.'
                : 'Provides a relaxed, unhurried time block ensuring personal attention and thorough consultation prior to application.'}
            </p>

            <div className="mt-6 pt-6 border-t border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#F5E2E6]">
                <ShieldCheck size={16} className="text-[#F1C3CD] shrink-0" />
                <span>{ar ? 'تعقيم طبي شامل لكافة الأدوات المعدنية' : 'Autoclave-grade instrument sterilization'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5E2E6]">
                <CheckCircle2 size={16} className="text-[#F1C3CD] shrink-0" />
                <span>{ar ? 'استشارة حساسية مجانية قبل تطبيق أي منتج' : 'Complimentary sensitivity patch consultation'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5E2E6]">
                <Calendar size={16} className="text-[#F1C3CD] shrink-0" />
                <span>{ar ? 'مواعيد مرنة تحفظ خصوصيتك وراحتك' : 'Exclusive reserved slots respecting your tranquility'}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15">
            <Link
              href={`/${locale}/preview/salon-spa/booking?service=${activePathway.id}`}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#FAE9E5] text-[#4B2834] font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
            >
              <span>{ar ? 'متابعة استفسار الموعد بهذا التفضيل' : 'Enquire With This Calibrated Edit'}</span>
              <Arrow size={15} />
            </Link>
            <p className="text-[10px] text-center text-[#E0B5BF] mt-3">
              {ar
                ? 'تسجيل اهتمام توضيحي في موقع مافكس — لا يتم خصم مالي أو حجز إلزامي'
                : 'Mavvix concept demonstration — no financial charge or confirmed booking'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
