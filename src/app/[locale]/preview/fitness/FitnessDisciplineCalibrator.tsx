'use client';

import React, { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Dumbbell,
  Activity,
  Footprints,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award
} from 'lucide-react';
import Link from 'next/link';

interface FitnessDisciplineCalibratorProps {
  locale: Locale;
}

interface DisciplinePathway {
  id: string;
  category: 'strength' | 'conditioning' | 'mobility' | 'functional';
  title: { ar: string; en: string };
  intensity: { ar: string; en: string };
  energySystem: { ar: string; en: string };
  durationMinutes: number;
  prerequisites: { ar: string[]; en: string[] };
  movementFocus: { ar: string[]; en: string[] };
  recoveryProtocol: { ar: string; en: string };
}

const DISCIPLINES: DisciplinePathway[] = [
  {
    id: 'compound-strength-foundations',
    category: 'strength',
    title: {
      ar: 'أساسيات القوة الحركية ورفع الأثقال الأولمبي',
      en: 'Compound Strength Foundations & Olympic Barbell'
    },
    intensity: { ar: 'شدة عصبية عالية مع تركيز ميكانيكي', en: 'High Neural Load & Biomechanical Focus' },
    energySystem: { ar: 'نظام الفوسفات (ATP-CP) والقوة القصوى', en: 'Phosphagen System (ATP-CP) & Peak Force' },
    durationMinutes: 60,
    prerequisites: {
      ar: [
        'القدرة على أداء القرفصاء بوزن الجسم مع ثبات الكاحل والحوض',
        'استقامة العمود الفقري والتحكم في مفصل الورك أثناء الانحناء',
        'غياب أي ألم حاد في أسفل الظهر أو مفصل الكتف'
      ],
      en: [
        'Bodyweight squat competency with stable ankle and pelvic control',
        'Neutral spine maintenance during Romanian hip hinge patterning',
        'Absence of acute lower back pain or shoulder impingement'
      ]
    },
    movementFocus: {
      ar: [
        'القرفصاء الخلفية بالبار (Back Squat) وضبط عمق النزول',
        'الرفعة الميتة التقليدية (Conventional Deadlift) وبداية السحب',
        'الضغط العسكري فوق الرأس (Overhead Press) مع قفل لوحي الكتف'
      ],
      en: [
        'Barbell back squats calibrating controlled eccentric depth',
        'Conventional barbell deadlifts focusing on bar path efficiency',
        'Overhead strict presses with thoracic extension and lockout'
      ]
    },
    recoveryProtocol: {
      ar: '48 إلى 72 ساعة راحة بين جلسات القوة العضلية القصوى لنفس المجموعة.',
      en: '48 to 72 hours restorative interval between heavy compound sessions.'
    }
  },
  {
    id: 'metabolic-conditioning-intervals',
    category: 'conditioning',
    title: {
      ar: 'فترات التحمل القلبي العضلي والقدرة الهوائية',
      en: 'Metabolic Conditioning & High-Yield Intervals'
    },
    intensity: { ar: 'نبض قلبي مرتفع وتحمل لاكتيكي متدرج', en: 'Elevated Heart Rate & Lactate Threshold' },
    energySystem: { ar: 'الجلايكوليز اللاهوائي والنظام الهوائي التأكسدي', en: 'Glycolytic & Oxidative Energy Systems' },
    durationMinutes: 45,
    prerequisites: {
      ar: [
        'جاهزية القلب والأوعية الدموية لمجهود متواصل لمدة 20 دقيقة',
        'إتقان وتيرة التنفس الإيقاعي أثناء أجهزة التجديف والدراجة',
        'القدرة على التحكم في معدل المجهود المدرك (RPE 7-8)'
      ],
      en: [
        'Cardiovascular base supporting 20 continuous minutes of work',
        'Rhythmic diaphragmatic breathing on ergometers and assault bikes',
        'Ability to self-regulate effort across Target RPE 7-8 zones'
      ]
    },
    movementFocus: {
      ar: [
        'فترات التجديف المائي (Rowing Intervals) بسرعة 500 متر',
        'دراجة الهواء الهجومية (Echo Bike Sprints) لتعزيز السعة القصوى',
        'تمارين وزن الجسم المتتابعة (Burpees & Box Step-overs)'
      ],
      en: [
        'Concept2 rowing interval splits targeting pace consistency',
        'Assault fan bike sprints driving peak aerobic output (VO2 max)',
        'Cadenced bodyweight burpee transitions and plyometric step-overs'
      ]
    },
    recoveryProtocol: {
      ar: 'ترطيب عميق مع الكهارل وجلسة مشي منخفض الشدة في اليوم التالي.',
      en: 'Electrolyte rehydration and low-intensity Zone 1 recovery walk.'
    }
  },
  {
    id: 'joint-mobility-longevity',
    category: 'mobility',
    title: {
      ar: 'جودة الحركة وصحة المفاصل واستعادة المرونة',
      en: 'Joint Articular Mobility & Movement Longevity'
    },
    intensity: { ar: 'شدة منخفضة مع تحكم عصبي عميق', en: 'Low Kinetic Stress & Deep Motor Control' },
    energySystem: { ar: 'استشفاء عصبي وتدفق دموي خفيف', en: 'Parasympathetic Recovery & Microcirculation' },
    durationMinutes: 45,
    prerequisites: {
      ar: [
        'مناسبة لكافة المستويات من المبتدئين حتى الرياضيين المحترفين',
        'الرغبة في معالجة تيبس الجلوس المكتبي الطويل ومشاكل القوام',
        'الملابس الرياضية المريحة الخالية من المشدات الضاغطة'
      ],
      en: [
        'Universally accessible from sedentary beginners to elite lifters',
        'Desire to alleviate postural tightness from extended desk posture',
        'Unrestrictive athletic wear allowing full unencumbered range'
      ]
    },
    movementFocus: {
      ar: [
        'دوران المفاصل المتحكم فيه (CARs) للكتفين والوركين والعمود الفقري',
        'تمدد السلسلة الخلفية وفتح عضلات الصدر والحجاب الحاجز',
        'تمارين توازن الكاحل وقوس القدم لمنع الإصابات الرياضية'
      ],
      en: [
        'Controlled Articular Rotations (CARs) for scapula, hip and thoracic spine',
        'Posterior fascial decompression and intercostal breathing drills',
        'Subtalar ankle eversion and arch activation preventing kinetic chain injury'
      ]
    },
    recoveryProtocol: {
      ar: 'يمكن ممارستها يومياً كطقس إحماء صباحي أو استشفاء نشط.',
      en: 'Safe for daily execution as a morning warm-up or post-training cool down.'
    }
  },
  {
    id: 'kettlebell-functional-hypertrophy',
    category: 'functional',
    title: {
      ar: 'التدريب الوظيفي بالكيتل بل وتضخيم العضلات المتناسق',
      en: 'Kettlebell Ballistics & Functional Hypertrophy'
    },
    intensity: { ar: 'قوة انفجارية وتحكم أحادي في الجذع', en: 'Explosive Hip Power & Unilateral Core Stability' },
    energySystem: { ar: 'هجين لاهوائي وهوائي مع حرق مستمر', en: 'Hybrid Anaerobic-Aerobic Power Output' },
    durationMinutes: 50,
    prerequisites: {
      ar: [
        'إتقان مفصل الورك (Hip Hinge) بقوة دون ثني زائد للركبتين',
        'قوة القبضة لحمل أوزان الكيتل بل الحديدية الملساء بأمان',
        'القدرة على شد عضلات البطن والأرداف في قمة كل حركة'
      ],
      en: [
        'Mastery of the hip hinge mechanic without excessive knee bend',
        'Grip endurance securely managing cast-iron kettlebell handles',
        'Solid gluteal and abdominal bracing at the terminal lockout apex'
      ]
    },
    movementFocus: {
      ar: [
        'أرجحة الكيتل بل الروسية بذراع واحدة (Single-Arm Swing)',
        'الرفعة التركية الكاملة (Turkish Get-Up) لثبات واستقرار الكتف',
        'القرفصاء الكأسية (Goblet Squat) مع عصر عضلات الفخذين'
      ],
      en: [
        'Single-arm Russian kettlebell swings synchronizing breath and hip snap',
        'Turkish Get-Up transitions fostering multi-planar shoulder stability',
        'Offset Goblet squats driving quad engagement and upright torso posture'
      ]
    },
    recoveryProtocol: {
      ar: '24 إلى 48 ساعة مع تمارين تمدد خفيفة لعضلات الألوية والكتفين.',
      en: '24 to 48 hours recovery with focused glute and lat stretching.'
    }
  }
];

export function FitnessDisciplineCalibrator({ locale }: FitnessDisciplineCalibratorProps) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [activeCategory, setActiveCategory] = useState<'strength' | 'conditioning' | 'mobility' | 'functional'>('strength');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('compound-strength-foundations');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);

  const activePathway =
    DISCIPLINES.find((p) => p.id === selectedPathwayId) ||
    DISCIPLINES.find((p) => p.category === activeCategory) ||
    DISCIPLINES[0];

  const handleCategoryChange = (cat: 'strength' | 'conditioning' | 'mobility' | 'functional') => {
    setActiveCategory(cat);
    const firstOfCat = DISCIPLINES.find((d) => d.category === cat);
    if (firstOfCat) {
      setSelectedPathwayId(firstOfCat.id);
    }
  };

  const calculatedWeeklyMinutes = activePathway.durationMinutes * daysPerWeek;

  return (
    <div
      data-sector-specific="pulse-discipline-calibrator"
      className="bg-[#141421] text-white rounded-none border-2 border-[#33314B] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden p-6 sm:p-10 lg:p-12"
    >
      {/* Header & Category Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#29273D]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#E0FE61]">
            <Zap size={15} />
            {ar ? 'معايرة مسار التدريب الرياضي التخصصي' : 'ATHLETIC DISCIPLINE CALIBRATOR'}
          </div>
          <h3 className="pulse-display text-3xl sm:text-5xl font-black mt-3 leading-tight tracking-tight text-white">
            {ar ? 'حدد هدفك التدريبي... وتدرّج بوعي حركي' : 'STRUCTURE YOUR EFFORT. TRAIN WITH PURPOSE.'}
          </h3>
          <p className="text-sm text-[#D4D1E2] leading-7 mt-2 max-w-2xl">
            {ar
              ? 'لا نبدأ بالوزن أو الشدة العشوائية؛ حدد المسار المناسب لخبرتك البدنية للاطلاع على المتطلبات الحركية ونظام الطاقة وجدول الاستشفاء الموصى به.'
              : 'Effort without calibration breeds burnout. Select your discipline to inspect movement prerequisites, energy systems, and evidence-based recovery intervals.'}
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#1F1D30] border border-[#33314B] self-start lg:self-auto">
          {[
            { id: 'strength', labelAr: 'القوة القصوى', labelEn: 'Strength', icon: Dumbbell },
            { id: 'conditioning', labelAr: 'اللياقة والتحمل', labelEn: 'Conditioning', icon: Activity },
            { id: 'mobility', labelAr: 'الحركة والمرونة', labelEn: 'Mobility', icon: Footprints },
            { id: 'functional', labelAr: 'الكيتل بل الوظيفي', labelEn: 'Functional', icon: Flame }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id as 'strength' | 'conditioning' | 'mobility' | 'functional')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#E0FE61] text-[#141421] shadow-sm'
                    : 'text-[#D4D1E2] hover:text-white hover:bg-white/10'
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
          <div className="p-6 sm:p-7 bg-[#1C1A2E] border-2 border-[#2F2C47]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-black text-[#A28BFF] uppercase tracking-wider block">
                  {ar ? 'المسار التدريبي المختار' : 'ACTIVE DISCIPLINE FOCUS'}
                </span>
                <h4 className="pulse-display text-xl sm:text-2xl font-black text-white mt-1">
                  {ar ? activePathway.title.ar : activePathway.title.en}
                </h4>
              </div>
              <span className="px-3 py-1 text-xs font-black bg-[#E0FE61] text-[#141421] shrink-0 uppercase tracking-wider">
                {activePathway.durationMinutes} {ar ? 'دقيقة' : 'MIN'}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#2D2A45]">
              <div className="p-3.5 bg-[#141421] border border-[#2B2942]">
                <span className="text-[11px] font-bold text-[#A28BFF] block mb-1">
                  {ar ? 'الشدة والحمل العصبي' : 'Neurological Intensity'}
                </span>
                <p className="text-xs font-bold text-[#E5E5F1]">
                  {ar ? activePathway.intensity.ar : activePathway.intensity.en}
                </p>
              </div>

              <div className="p-3.5 bg-[#141421] border border-[#2B2942]">
                <span className="text-[11px] font-bold text-[#A28BFF] block mb-1">
                  {ar ? 'نظام الطاقة المستهدف' : 'Target Energy System'}
                </span>
                <p className="text-xs font-bold text-[#E5E5F1]">
                  {ar ? activePathway.energySystem.ar : activePathway.energySystem.en}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#2D2A45]">
              <h5 className="text-xs font-black text-[#E0FE61] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers size={14} />
                {ar ? 'المهارات والحركات الأساسية للجلسة' : 'Primary Biomechanical Movements'}
              </h5>
              <div className="space-y-2.5">
                {(ar ? activePathway.movementFocus.ar : activePathway.movementFocus.en).map(
                  (move, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs leading-6 text-[#E0DFED]">
                      <span className="w-5 h-5 bg-[#2B2844] text-[#E0FE61] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{move}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#2D2A45]">
              <h5 className="text-xs font-black text-[#A28BFF] uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} />
                {ar ? 'متطلبات الأمان والجاهزية المسبقة' : 'Movement Safety Prerequisites'}
              </h5>
              <div className="space-y-2">
                {(ar ? activePathway.prerequisites.ar : activePathway.prerequisites.en).map(
                  (prereq, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs leading-5 text-[#C4C2D6]">
                      <span className="text-[#E0FE61] font-bold">✓</span>
                      <span>{prereq}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#2D2A45] flex items-start gap-3 p-3.5 bg-[#141421] border border-[#2B2942]">
              <Info size={16} className="text-[#E0FE61] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#A28BFF] block mb-0.5">
                  {ar ? 'بروتوكول الاستشفاء الموصى به' : 'Periodized Recovery Guideline'}
                </span>
                <p className="text-xs text-[#DCD9ED] leading-5">
                  {ar ? activePathway.recoveryProtocol.ar : activePathway.recoveryProtocol.en}
                </p>
              </div>
            </div>
          </div>

          {/* Days Per Week Calibrator Slider */}
          <div className="p-5 bg-[#1C1A2E] border-2 border-[#2F2C47]">
            <div className="flex items-center justify-between gap-4 mb-3">
              <label htmlFor="frequency-slider" className="text-xs font-black uppercase tracking-wider text-white">
                {ar ? 'عدد الأيام المتاحة للتمرين أسبوعياً' : 'Target Weekly Training Frequency'}
              </label>
              <span className="text-sm font-mono font-black text-[#E0FE61] bg-[#141421] px-3 py-1 border border-[#33314B]">
                {daysPerWeek} {ar ? 'أيام / أسبوع' : 'Days / Wk'}
              </span>
            </div>
            <input
              id="frequency-slider"
              type="range"
              min={1}
              max={5}
              step={1}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full accent-[#E0FE61] cursor-pointer h-2 bg-[#2E2B47] rounded-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#B5B2C9] mt-2">
              <span>1 {ar ? 'يوم' : 'Day'}</span>
              <span>2 {ar ? 'يومين' : 'Days'}</span>
              <span>3 {ar ? 'أيام' : 'Days'}</span>
              <span>4 {ar ? 'أيام' : 'Days'}</span>
              <span>5 {ar ? 'أيام' : 'Days'}</span>
            </div>
          </div>
        </div>

        {/* Right column: Weekly Investment & Trial Callout */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#E0FE61] text-[#141421] border-2 border-[#141421]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141421] text-[#E0FE61] text-[11px] font-black tracking-wider uppercase mb-5">
              <Clock size={13} />
              {ar ? 'حجم الجهد الأسبوعي المحسوب' : 'Weekly Training Volume'}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="pulse-display text-5xl sm:text-6xl font-black text-[#141421]">
                {calculatedWeeklyMinutes}
              </span>
              <span className="text-sm font-black text-[#141421] uppercase">
                {ar ? 'دقيقة نشاط مدروس' : 'Active Minutes / Week'}
              </span>
            </div>

            <p className="text-xs text-[#282638] leading-6 mt-4 font-bold">
              {ar
                ? 'يوفر هذا التوزيع توازناً مثالياً بين الإجهاد الحركي والاستشفاء العصبي، مما يمنع الإصابات ويحقق تطوراً تدريجياً مستداماً دون مبالغة.'
                : 'Calculates optimal stimulus-to-fatigue ratio, ensuring progressive overload while eliminating overtraining and joint wear.'}
            </p>

            <div className="mt-6 pt-6 border-t-2 border-[#141421]/20 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#141421] font-bold">
                <ShieldCheck size={16} className="text-[#141421] shrink-0" />
                <span>{ar ? 'إشراف كوتش معتمد على ضبط التكنيك' : 'Coach-supervised technique calibration'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#141421] font-bold">
                <Award size={16} className="text-[#141421] shrink-0" />
                <span>{ar ? 'فحص جاهزية حركة المفاصل في أول زيارة' : 'Kinetic movement screen on first arrival'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#141421] font-bold">
                <Calendar size={16} className="text-[#141421] shrink-0" />
                <span>{ar ? 'مرونة تبديل الأيام حسب التزام عملك' : 'Flexible schedule shifting around work rhythm'}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-[#141421]/20">
            <Link
              href={`/${locale}/preview/fitness/trial?defaultClass=${activePathway.id}`}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#141421] text-[#E0FE61] font-black text-xs uppercase tracking-wider hover:bg-black transition-all shadow-md"
            >
              <span>{ar ? 'طلب تجربة حصة بهذا التوزيع' : 'Request Trial With This Edit'}</span>
              <Arrow size={15} />
            </Link>
            <p className="text-[10px] text-center text-[#3B394E] mt-3 font-bold">
              {ar
                ? 'نموذج توضيحي من مافكس — لا يتم خصم اشتراك أو حجز نهائي دون تأكيد'
                : 'Mavvix concept demonstration — zero active fees or binding enrollment'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
