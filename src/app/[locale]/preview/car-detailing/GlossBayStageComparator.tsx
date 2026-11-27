'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { glossPath } from '@/lib/verticals/car-detailing/data';
import {
  Sparkles,
  ShieldCheck,
  Gauge,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  Flame,
  Zap
} from 'lucide-react';

interface StagePreset {
  id: string;
  stageCode: string;
  titleEn: string;
  titleAr: string;
  badgeEn: string;
  badgeAr: string;
  defectRemoval: number; // percentage
  paintLossMicrons: number; // microns of clear coat removed
  laborDurationEn: string;
  laborDurationAr: string;
  glossUnits: number; // GU on 60° gloss meter
  recommendedForEn: string;
  recommendedForAr: string;
  processSummaryEn: string;
  processSummaryAr: string;
  targetImperfectionsEn: string[];
  targetImperfectionsAr: string[];
  equipmentEn: string[];
  equipmentAr: string[];
}

const STAGE_PRESETS: StagePreset[] = [
  {
    id: 'stage-1',
    stageCode: 'STAGE 01',
    titleEn: 'Single-Step Surface Gloss Enhancement',
    titleAr: 'تحسين اللمعان السطحي أحادي المرحلة',
    badgeEn: 'Annual Refresh',
    badgeAr: 'تجديد سنوي معتدل',
    defectRemoval: 60,
    paintLossMicrons: 0.8,
    laborDurationEn: '4 - 6 Hours',
    laborDurationAr: '4 إلى 6 ساعات عمل',
    glossUnits: 84,
    recommendedForEn: 'Well-maintained modern vehicles with light automatic car wash marring and surface oxidation.',
    recommendedForAr: 'السيارات الحديثة التي خضعت لغسيل غير دقيق وتعاني من بهتان خفيف وسويرلز سطحية.',
    processSummaryEn: 'Fine finishing pad paired with micro-abrasive polishing compound, leveling minor wash haze while maximizing optical reflection and gloss depth without aggressively thinning the factory clear coat.',
    processSummaryAr: 'تطبيق وسادة صقل ناعمة مع مركب تلميع متناهي الصغر لمعالجة الضبابية السطحية وتعزيز اللمعان دون استنزاف طبقة الورنيش الأصلية.',
    targetImperfectionsEn: [
      'Microscopic wash haze & towel marks',
      'Light environmental mineral staining',
      'Surface oxidation dulling clear coat'
    ],
    targetImperfectionsAr: [
      'ضبابية الغسيل السطحي وآثار المناشف',
      'بقع مائية كلسية خفيفة غير محفورة',
      'أكسدة سطحية تؤثر على عمق اللون'
    ],
    equipmentEn: ['Random Orbital Buffer (15mm throw)', 'Ultra-fine Foam Polishing Pad', 'Dual-Spectrum Inspection Lamp'],
    equipmentAr: ['جهاز تلميع مداري عشوائي (15 مم)', 'وسادة رغوية ناعمة فائقة الصقل', 'إضاءة فحص ثنائية الطيف']
  },
  {
    id: 'stage-2',
    stageCode: 'STAGE 02',
    titleEn: 'Dual-Stage Precision Paint Correction',
    titleAr: 'تصحيح الطلاء المزدوج فائق الدقة',
    badgeEn: 'Enthusiast Standard',
    badgeAr: 'المعيار الاحترافي الموصى به',
    defectRemoval: 85,
    paintLossMicrons: 1.8,
    laborDurationEn: '8 - 12 Hours',
    laborDurationAr: '8 إلى 12 ساعة عمل',
    glossUnits: 93,
    recommendedForEn: 'Vehicles with moderate spider-webbing, distinct scratches, and dull reflections seeking showroom clarity before ceramic coating.',
    recommendedForAr: 'السيارات ذات الدوائر العنكبوتية الواضحة والخدوش المتوسطة قبل تطبيق طبقات النانو سيراميك.',
    processSummaryEn: 'Step 1 utilizes a medium microfiber cutting disc to eradicate etched defects and moderate swirls; Step 2 refines with a jewelers finishing pad to eliminate compounding haze and achieve a crystal-sharp reflection.',
    processSummaryAr: 'المرحلة الأولى تستخدم قرص قطع مايكروفايبر لإزالة الخدوش والسويرلز المحفورة؛ والمرحلة الثانية تصقل السطح بوسادة ناعمة لإنتاج لمعان مرآتي متكامل.',
    targetImperfectionsEn: [
      'Moderate swirl marks & circular scratches',
      'Acid rain etching & light bird dropping marks',
      'Factory orange peel micro-distortion'
    ],
    targetImperfectionsAr: [
      'دوائر عنكبوتية وخدوش دائرية متوسطة',
      'آثار المطر الحمضي وفضلات الطيور الخفيفة',
      'تشوهات سطحية في صفاء انعكاس الطلاء'
    ],
    equipmentEn: ['Rotary Pre-cut + Dual-Action Polish', 'Medium Microfiber Cutting Discs', 'Digital Ultrasonic Paint Depth Gauge'],
    equipmentAr: ['جهاز دوار للقطع + مداري للصقل', 'أقراص قطع مايكروفايبر متوسطة الكثافة', 'جهاز قياس سمك الطلاء الرقمي بالأمواج']
  },
  {
    id: 'stage-3',
    stageCode: 'STAGE 03',
    titleEn: 'Multi-Stage Concours Mirror Leveling',
    titleAr: 'تسوية وصقل كونكورس الشامل متعدد المراحل',
    badgeEn: 'Collector / Concours',
    badgeAr: 'سيارات المجموعات والمعارض',
    defectRemoval: 96,
    paintLossMicrons: 3.2,
    laborDurationEn: '16 - 24 Hours',
    laborDurationAr: '16 إلى 24 ساعة عمل متواصلة',
    glossUnits: 98,
    recommendedForEn: 'Exotics, classic restorations, and dark-colored show cars where total defect elimination and distortion-free optical clarity are paramount.',
    recommendedForAr: 'السيارات الرياضية الفارهة والكلاسيكية والألوان الداكنة التي تتطلب إزالة شاملة للعيوب وانعكاسًا خاليًا من أي تشوه.',
    processSummaryEn: 'Targeted spot damp-sanding (P2500 - P3000 grit) levels deep rids and heavy orange peel, followed by aggressive rotary compounding, intermediate orbital polishing, and ultra-fine finishing passes.',
    processSummaryAr: 'صنفرة رطبة دقيقة موضعية (حبيبات 2500 - 3000) لتسوية الخدوش العميقة وقشرة البرتقال، يعقبها قطع دوار قوي ثم مرحلتين من الصقل فائق النعومة.',
    targetImperfectionsEn: [
      'Random Isolated Deep Scratches (RIDS)',
      'Heavy clear coat orange peel texture',
      'Severe buffer trails and sanding marks'
    ],
    targetImperfectionsAr: [
      'خدوش عميقة معزولة غير واصلة لطبقة الأساس',
      'تموجات قشرة البرتقال في الورنيش التجاري',
      'علامات الهولوجرام الناتجة عن تلميع خاطئ سابق'
    ],
    equipmentEn: ['P2500/P3000 Micro-abrasive Sanding Foam', 'Rotary Buffer with Wool & Foam Heads', 'Spectrophotometer Gloss Analyzer'],
    equipmentAr: ['أقراص صنفرة مائية رغوية P2500/P3000', 'جهاز تلميع دوار برؤوس صوف ورغوة تخصصية', 'محلل لمعان رقمي طيفي 60 درجة']
  },
  {
    id: 'stage-4',
    stageCode: 'STAGE 04',
    titleEn: 'Self-Healing Thermoplastic PPF Shield',
    titleAr: 'درع الحماية الشفاف ذاتي الالتئام PPF',
    badgeEn: 'Physical Armor',
    badgeAr: 'حماية فيزيائية ضد الصدمات',
    defectRemoval: 100,
    paintLossMicrons: 0.0,
    laborDurationEn: '2 - 3 Days',
    laborDurationAr: '2 إلى 3 أيام عمل',
    glossUnits: 96,
    recommendedForEn: 'High-speed highway commuters and performance vehicles demanding genuine rock chip defense that ceramic coatings cannot provide.',
    recommendedForAr: 'السيارات المخصصة للسفر والسرعات العالية التي تحتاج درعًا فيزيائيًا حقيقيًا يصد الحصى والتطاير.',
    processSummaryEn: 'An 8-mil (200 micron) optical aliphatic polyurethane film fitted using CAD custom-cut templates. Heat-reactive top coat self-heals swirl marks under sunlight while absorbing high-velocity gravel impacts.',
    processSummaryAr: 'فيلم بولي يوريثين نقي بسماكة 200 ميكرون مقصوص بدقة رقمية CAD. تلتئم الخدوش الدقيقة ذاتياً عند التعرض لحرارة الشمس مع امتصاص ضربات الحصى المتطاير.',
    targetImperfectionsEn: [
      'High-velocity gravel & stone chipping',
      'Deep parking scrape abrasion resistance',
      'Harsh chemical solvent resistance'
    ],
    targetImperfectionsAr: [
      'ضربات الحصى والرمال المتطايرة على الطرق السريعة',
      'احتكاكات مواقف السيارات السطحية',
      'مقاومة الكيماويات والمذيبات القلوية والأسيدية'
    ],
    equipmentEn: ['CAD Precision Digital Plotter Software', 'Slip & Tack Application Solution Tanks', 'Digital Heat Induction Guns'],
    equipmentAr: ['برمجيات ومقصات CAD الرقمية المخصصة', 'منظومة سوائل التثبيت والتمديد الخالية من الرواسب', 'مسدسات تسخين رقمية لضبط الشد والالتئام']
  }
];

export default function GlossBayStageComparator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [activeStageId, setActiveStageId] = useState<string>('stage-2');

  const currentStage = STAGE_PRESETS.find((s) => s.id === activeStageId) || STAGE_PRESETS[1];

  return (
    <div className="bg-[#0D1626] rounded-3xl p-6 sm:p-10 border border-[#1E354D] text-white shadow-xl space-y-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E354D] w-full min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#4CCBF4] uppercase tracking-widest block">
              SURFACE RESTORATION & CORRECTION COMPARATOR
            </span>
            <span className="text-[10px] font-mono bg-[#4CCBF4]/10 text-[#4CCBF4] border border-[#4CCBF4]/30 px-2 py-0.5 rounded">
              LAB DATA
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 gloss-display">
            {isAr ? 'حاسبة مراحل تصحيح الطلاء ومعايرة حماية السطح' : 'Paint Correction Stage Comparator & Surface Calibration'}
          </h2>
          <p className="text-[#A7C4D5] text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            {isAr
              ? 'قارن بين مستويات إزالة العيوب الفعلية، واطلع على نسبة استهلاك طبقة الورنيش الأصلية (Clear Coat) وزمن العمل الفعلي المعتمد قبل اختيار باقة العناية.'
              : 'Compare measured defect removal rates, clear coat consumption in microns, labor requirements, and laboratory gloss metrics before commissioning your treatment.'}
          </p>
        </div>

        {/* Stage Selector Buttons (Wrapping on Mobile, Zero Overflow) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#08111F] p-1.5 rounded-xl border border-[#1E354D] max-w-full">
          {STAGE_PRESETS.map((preset) => {
            const isSelected = preset.id === activeStageId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActiveStageId(preset.id)}
                className={`text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#4CCBF4] text-[#08111F] shadow-sm font-black'
                    : 'text-[#A7C4D5] hover:text-white hover:bg-[#14293C]'
                }`}
              >
                <span>{preset.stageCode}</span>
                <span className="hidden sm:inline text-[10px] opacity-75">
                  ({preset.defectRemoval}%)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Technical Metrics & Measurement Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#08111F] rounded-2xl p-6 border border-[#1E354D] space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#4CCBF4] uppercase tracking-wider">
                {currentStage.stageCode} // {isAr ? currentStage.badgeAr : currentStage.badgeEn}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                {isAr ? currentStage.laborDurationAr : currentStage.laborDurationEn}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {isAr ? currentStage.titleAr : currentStage.titleEn}
            </h3>

            {/* Metric 1: Defect Removal Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A7C4D5]">{isAr ? 'نسبة إزالة الخدوش والسويرلز' : 'Defect Removal Efficiency'}</span>
                <span className="font-bold text-[#4CCBF4]">{currentStage.defectRemoval}%</span>
              </div>
              <div className="w-full bg-[#14293C] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-[#4CCBF4] h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentStage.defectRemoval}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Clear Coat Consumption in Microns */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A7C4D5]">{isAr ? 'استهلاك طبقة الورنيش الأصلية' : 'Clear Coat Consumption'}</span>
                <span className="font-bold text-amber-300">
                  {currentStage.paintLossMicrons} µm {isAr ? 'ميكرون' : 'microns'}
                </span>
              </div>
              <div className="w-full bg-[#14293C] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (currentStage.paintLossMicrons / 4.0) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-[#A7C4D5]/70 leading-relaxed">
                {isAr
                  ? 'سماكة الورنيش الإجمالي للمصنع تتراوح بين 35-50 ميكرون. يتم قياس كل لوح رقمياً قبل بدء الصقل.'
                  : 'Factory clear coat averages 35-50µm total. Ultrasonic measurement ensures safe thresholds.'}
              </p>
            </div>

            {/* Metric 3: Measured Gloss Units (GU) */}
            <div className="p-4 rounded-xl bg-[#14293C]/60 border border-[#1E354D] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4CCBF4]/10 text-[#4CCBF4] flex items-center justify-center">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#A7C4D5] font-mono">{isAr ? 'مقياس اللمعان الانعكاسي (60°)' : 'Specular Gloss Rating (60°)'}</div>
                  <div className="text-lg font-black text-white font-mono">{currentStage.glossUnits} GU</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-cyan-400/20 text-[#4CCBF4] px-2 py-1 rounded font-bold">
                {currentStage.glossUnits > 90 ? (isAr ? 'مرآتي' : 'Mirror Class') : (isAr ? 'عالي اللمعان' : 'High Gloss')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Process Description, Target Defects & Recommended Application (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#08111F] rounded-2xl p-6 sm:p-8 border border-[#1E354D] space-y-6">
            <div>
              <h4 className="text-xs font-mono font-bold text-[#4CCBF4] uppercase tracking-wider mb-2">
                {isAr ? 'منهجية العمل والأسلوب الفني' : 'Technical Methodology & Scope'}
              </h4>
              <p className="text-sm leading-relaxed text-[#D5E8F1]">
                {isAr ? currentStage.processSummaryAr : currentStage.processSummaryEn}
              </p>
            </div>

            {/* Target Imperfections Grid */}
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                {isAr ? 'العيوب المعالجة في هذه المرحلة' : 'Target Surface Imperfections Eliminated'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(isAr ? currentStage.targetImperfectionsAr : currentStage.targetImperfectionsEn).map((defect, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#14293C]/50 border border-[#1E354D] text-xs text-[#A7C4D5] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4CCBF4] shrink-0 mt-0.5" />
                    <span>{defect}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment & Standards Applied */}
            <div className="pt-4 border-t border-[#1E354D]">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                {isAr ? 'أدوات المعايرة وضبط الجودة' : 'Calibration Tools & Hardware Applied'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(isAr ? currentStage.equipmentAr : currentStage.equipmentEn).map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#14293C] text-xs font-mono text-[#D5E8F1] border border-[#1E354D]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Vehicle Profile & CTA */}
            <div className="pt-4 border-t border-[#1E354D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-md">
                <span className="text-[11px] font-mono text-[#4CCBF4] uppercase tracking-wider block font-bold">
                  {isAr ? 'التوافق المثالي' : 'Best Suited For'}
                </span>
                <p className="text-xs text-[#A7C4D5] mt-1 leading-relaxed">
                  {isAr ? currentStage.recommendedForAr : currentStage.recommendedForEn}
                </p>
              </div>

              <Link
                href={glossPath(locale, 'quote')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4CCBF4] hover:bg-[#7DE2FF] text-[#08111F] font-black text-xs transition-colors shrink-0"
              >
                <span>{isAr ? 'طلب معاينة وتحديد نطاق' : 'Build Treatment Brief'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
