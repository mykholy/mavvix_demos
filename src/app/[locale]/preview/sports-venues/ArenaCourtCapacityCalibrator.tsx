'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Users,
  Clock,
  SunMedium,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Sparkles,
  Zap,
  ShieldCheck,
  Footprints
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { arenaPath } from '@/lib/verticals/sports-venues/data';

interface CourtProfile {
  id: string;
  code: string;
  name: { ar: string; en: string };
  badge: { ar: string; en: string };
  summary: { ar: string; en: string };
  dimensions: string;
  recommendedSquad: number;
  maxSquad: number;
  footwearRule: { ar: string; en: string };
  surfaceSpec: { ar: string; en: string };
  lightingLux: number;
  rulesChecklist: Array<{ ar: string; en: string }>;
}

const COURT_PROFILES: CourtProfile[] = [
  {
    id: 'football-five',
    code: 'PITCH-5A',
    name: {
      ar: 'ملعب خماسي – عشب صناعي هجين',
      en: 'Five-a-Side Hybrid Turf'
    },
    badge: {
      ar: 'عشب شوك باد ٥٠ ملم',
      en: '50mm Shockpad Turf'
    },
    summary: {
      ar: 'أرضية عشب صناعي ناعم مدعومة بطبقة ممتصة للصدمات، مع شبكات مرمى مقواة وإنارة متكاملة.',
      en: 'High-resilience artificial monofilament turf on elastic shockpad layer with reinforced goal nets.'
    },
    dimensions: '20 × 40 m',
    recommendedSquad: 10,
    maxSquad: 14,
    footwearRule: {
      ar: 'أحذية ترتان أو كوتشيات استوكات مطاطية متعددة (TF/AG)؛ ممنوع الأحذية الحديدية',
      en: 'Turf trainers or multi-ground molded studs (TF/AG); metal screw-in studs strictly prohibited'
    },
    surfaceSpec: {
      ar: 'عشب مونوفيلامنت هجين مع حشوة رمل سيليكا ومطاط EPDM عالي المرونة',
      en: 'Monofilament hybrid fibers with washed silica sand and resilient EPDM rubber infill'
    },
    lightingLux: 500,
    rulesChecklist: [
      {
        ar: 'مباراة خماسية من فريقين (٥ ضد ٥) بما في ذلك حراس المرمى مع إتاحة ٤ تبديلات حرة',
        en: 'Two balanced squads of 5 (including goalkeepers) with rolling substitutions up to 14 players'
      },
      {
        ar: 'الكرة المعتمدة مقاس ٤ منخفضة الارتداد (Low Bounce) للتحكم الدقيق على الأرضية',
        en: 'Regulation Size 4 low-bounce futsal ball for enhanced technical control on turf'
      },
      {
        ar: 'حماية كاملة حول محيط الملعب بشباك أمان علوية وجانبية بارتفاع ٦ أمتار',
        en: 'Full perimeter and ceiling containment netting up to 6m height preventing ball exit'
      }
    ]
  },
  {
    id: 'football-seven',
    code: 'PITCH-7A',
    name: {
      ar: 'ملعب سباعي – نجيل دولي معتمد',
      en: 'Seven-a-Side Match Pitch'
    },
    badge: {
      ar: 'مساحة موسعة للبطولات',
      en: 'Tournament Match Grid'
    },
    summary: {
      ar: 'مساحة موسعة تتيح بناء اللعب التكتيكي والسرعات العالية، مجهزة لبطولات الشركات والفرق.',
      en: 'Expanded playing field enabling tactical ball circulation and high-tempo league tournaments.'
    },
    dimensions: '35 × 55 m',
    recommendedSquad: 14,
    maxSquad: 18,
    footwearRule: {
      ar: 'أحذية نجيل صناعي معتمدة (AG) أو كوتش ترتان؛ ارتداء واقي الساقين موصى به بشدة',
      en: 'Artificial grass cleats (AG) or turf shoes; shin guards strongly recommended for match play'
    },
    surfaceSpec: {
      ar: 'نجيل صناعي معتمد مطابق للمواصفات الدولية مع تصريف مياه تحت أرضي متقدم',
      en: 'FIFA-certified artificial turf with dual-density sub-base and advanced subterranean drainage'
    },
    lightingLux: 600,
    rulesChecklist: [
      {
        ar: 'تشكيلة سباعية متوازنة (٧ ضد ٧) مع مساحة مناسبة للجري والتحولات الهجومية',
        en: 'Seven players per side (7v7) offering optimal tactical spacing and transition sprints'
      },
      {
        ar: 'الكرة المعتمدة مقاس ٥ قياسية مطابقة لضغط الهواء المعتمد دوليًا',
        en: 'Standard regulation Size 5 football calibrated to official match inflation pressure'
      },
      {
        ar: 'منطقة إحماء فنية مخصصة على جانبي الملعب للبدلاء لتجنب الإصابات العضلية',
        en: 'Designated technical warm-up zones along touchlines for substitutes prior to entry'
      }
    ]
  },
  {
    id: 'padel-panoramic',
    code: 'PADEL-PRO',
    name: {
      ar: 'ملعب بادل – زجاج بانورامي احترافي',
      en: 'Panoramic Glass Padel Court'
    },
    badge: {
      ar: 'معايير FIP الدولية',
      en: 'FIP-Standard Arena'
    },
    summary: {
      ar: 'هيكل حديدي مجلفن وزجاج حراري مقسى ١٢ ملم مع أرضية عشب محبب فائق النعومة.',
      en: '12mm tempered safety glass with laser-cut structural pillars and textured blue monofilament turf.'
    },
    dimensions: '10 × 20 m',
    recommendedSquad: 4,
    maxSquad: 6,
    footwearRule: {
      ar: 'أحذية بادل أو تنس أرضي بنقشة متعرجة (Herringbone) تضمن الثبات والدوران الآمن',
      en: 'Padel or clay-court tennis footwear with herringbone tread for pivot grip and joint safety'
    },
    surfaceSpec: {
      ar: 'عشب نسيجي ناعم مع رمل سيليكا متجانس يوفر ارتدادًا متماثلاً وثابتًا للكرة',
      en: 'FIP textured synthetic turf with micro-silica dressing delivering uniform rebound'
    },
    lightingLux: 750,
    rulesChecklist: [
      {
        ar: 'نظام لعب زوجي رسمي (لاعبان ضد لاعبين) مع استخدام مضارب بادل وكور معتمدة',
        en: 'Official doubles match format (2v2) utilizing certified padel racquets and pressurized balls'
      },
      {
        ar: 'أعمدة إنارة خالية من الوهج البصري (Anti-Glare) بزوايا مائلة لخدمة الكرات العالية واللوب',
        en: 'Anti-glare column fixtures oriented to prevent player blindness during high lobs and smashes'
      },
      {
        ar: 'أبواب خروج سريعة مطابقة لاشتراطات السلامة واللعب الخارجي الاحترافي',
        en: 'Regulation emergency egress gates enabling external play and recovery shots safely'
      }
    ]
  },
  {
    id: 'indoor-basketball',
    code: 'INDOOR-FIBA',
    name: {
      ar: 'صالة مغطاة – باركيه خشبي معتمد',
      en: 'FIBA Hardwood Indoor Arena'
    },
    badge: {
      ar: 'أرضية خشب مابل ممتصة للصدمات',
      en: 'Cushioned Maple Parquet'
    },
    summary: {
      ar: 'صالة مكيفة ومغلقة بأرضية خشبية معتمدة لكرة السلة والطائرة واليد مع لوحات إلكترونية.',
      en: 'Climate-controlled multi-sport hall with DIN 18032 spring-mounted hardwood parquet flooring.'
    },
    dimensions: '15 × 28 m',
    recommendedSquad: 10,
    maxSquad: 15,
    footwearRule: {
      ar: 'أحذية كرة سلة داخلية نظيفة خالية من العلامات (Non-Marking Outsole) فقط',
      en: 'Indoor basketball court sneakers with non-marking rubber outsoles strictly required'
    },
    surfaceSpec: {
      ar: 'خشب مابل كندي صلب مدعوم بنظام نوابض ووسائد مطاطية لحماية الركبتين والعمود الفقري',
      en: 'Canadian hard maple flooring on subfloor elastomeric shock pads to minimize joint impact'
    },
    lightingLux: 700,
    rulesChecklist: [
      {
        ar: 'تخطيط رسمي ثلاثي الأبعاد معتمد لكرة السلة والكرة الطائرة وكرة اليد',
        en: 'Official multi-sport line markings for basketball, volleyball, and handball competition'
      },
      {
        ar: 'أبراج سلة هيدروليكية متحركة مع حواف زنبركية ومصدات حماية إسفنجية سميكة',
        en: 'Hydraulic breakaway rims with padded stanchions exceeding safety collision standards'
      },
      {
        ar: 'تكييف هواء مركزي يحافظ على درجة حرارة ٢٢ درجة مئوية ونسبة رطوبة ثابتة للأرضية',
        en: 'Precision HVAC maintaining 22°C and controlled humidity to prevent floor slickness'
      }
    ]
  }
];

export function ArenaCourtCapacityCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [selectedCourtId, setSelectedCourtId] = useState('football-five');
  const [sessionDuration, setSessionDuration] = useState('90'); // '60', '90', '120'
  const [lightingSlot, setLightingSlot] = useState('prime'); // 'daylight', 'prime', 'late'

  const activeCourt =
    COURT_PROFILES.find((c) => c.id === selectedCourtId) || COURT_PROFILES[0];

  // Dynamic calculations
  let calculatedLux = activeCourt.lightingLux;
  if (lightingSlot === 'daylight') calculatedLux = Math.round(calculatedLux * 0.4);
  if (lightingSlot === 'late') calculatedLux = Math.round(calculatedLux * 1.15);

  const durationMin = Number(sessionDuration);
  const rotationInterval = Math.round(durationMin / 3);

  return (
    <section
      data-sector-specific="arena-court-calibrator"
      className="py-20 sm:py-28 bg-[#0C131F] text-white relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="absolute -start-28 -top-28 w-96 h-96 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute end-0 bottom-0 w-80 h-80 rounded-full bg-[#2A3F60]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[#10B981] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#10B981]" />
            {ar ? 'معاير حجز الملاعب وسعة الفرق' : 'COURT CAPACITY & FIXTURE CALIBRATOR'}
          </p>
          <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
            {ar ? (
              <>
                جهّز مباراتك صح. <span className="text-[#10B981]">المساحة، الإضاءة، وشروط الأرضية.</span>
              </>
            ) : (
              <>
                Calibrate Your Fixture. <span className="text-[#10B981]">Surface, Lux & Squad Scale.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#E2E8F0] text-sm sm:text-base leading-8">
            {ar
              ? 'اختر نوع الملعب المطلوب وحدد مدة الحجز ووقت الإضاءة لتتعرف على معايير الأحذية المسموحة، السعة الموصى بها للاعبين، ومواصفات الإنارة قبل تقديم طلب استفسار الحجز.'
              : 'Select your preferred sporting court to calibrate squad capacity, recommended footwear regulations, LED lux intensity, and turnover intervals before submitting your booking request.'}
          </p>
        </div>

        {/* 4 Court Profiles Selector Tabs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {COURT_PROFILES.map((court) => {
            const active = court.id === selectedCourtId;
            return (
              <button
                key={court.id}
                type="button"
                onClick={() => setSelectedCourtId(court.id)}
                className={`p-6 text-start rounded-[1.75rem] transition-all border-2 flex flex-col justify-between ${
                  active
                    ? 'bg-[#131E31] border-[#10B981] shadow-[0_12px_32px_rgba(16,185,129,0.22)]'
                    : 'bg-[#0E1726]/80 border-[#2A3F60] hover:bg-[#162338] hover:border-[#10B981]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#10B981]">
                      {court.code}
                    </span>
                    <span className="text-[10px] font-bold text-[#CBD5E1] bg-[#1B2B45] px-2.5 py-1 rounded-full">
                      {court.badge[locale]}
                    </span>
                  </div>
                  <h3 className="font-black text-base text-white mt-4 leading-snug">
                    {court.name[locale]}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">
                    {court.summary[locale]}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2A3F60]/60 flex items-center justify-between text-xs font-mono text-[#CBD5E1]">
                  <span>{ar ? 'الأبعاد الرسمية:' : 'Grid Scale:'}</span>
                  <span className="text-white font-bold">{court.dimensions}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Calibrator Console */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8">
          {/* Controls & Surface Specifications */}
          <div className="bg-[#131E31] border border-[#2A3F60] p-6 sm:p-8 rounded-[2rem] space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2A3F60]">
              <Sliders size={20} className="text-[#10B981]" />
              <h4 className="font-bold text-lg text-white">
                {ar ? 'معايير التوقيت وظروف الإضاءة' : 'Fixture Duration & Lighting Parameters'}
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="calibrator-duration"
                  className="block text-xs font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {ar ? 'مدة الحجز المقترحة' : 'Match Duration'}
                </label>
                <select
                  id="calibrator-duration"
                  aria-label={ar ? 'مدة الحجز المقترحة' : 'Match Duration'}
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full bg-[#0C131F] border border-[#3A537C] text-white p-3.5 text-sm rounded-xl focus-visible:outline-2 focus-visible:outline-[#10B981]"
                >
                  <option value="60">{ar ? '٦٠ دقيقة (مباراة ودية سريعة)' : '60 Minutes (Standard Quick Match)'}</option>
                  <option value="90">{ar ? '٩٠ دقيقة (وقت مثالي للتبديلات)' : '90 Minutes (Optimal Squad Match)'}</option>
                  <option value="120">{ar ? '١٢٠ دقيقة (دورة مصغرة أو تدريب مكثف)' : '120 Minutes (Mini Tournament / Drill)'}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calibrator-lighting"
                  className="block text-xs font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {ar ? 'فترة الحجز ونمط الإنارة' : 'Schedule & Lighting Slot'}
                </label>
                <select
                  id="calibrator-lighting"
                  aria-label={ar ? 'فترة الحجز ونمط الإنارة' : 'Schedule & Lighting Slot'}
                  value={lightingSlot}
                  onChange={(e) => setLightingSlot(e.target.value)}
                  className="w-full bg-[#0C131F] border border-[#3A537C] text-white p-3.5 text-sm rounded-xl focus-visible:outline-2 focus-visible:outline-[#10B981]"
                >
                  <option value="daylight">{ar ? 'عصراً (ضوء طبيعي + إنارة تمهيدية)' : 'Late Afternoon (Natural Light + Low Lux)'}</option>
                  <option value="prime">{ar ? 'مساءً – الذروة (إنارة كاشفة كاملة ٥٠٠+ لوكس)' : 'Prime Evening (High-Lux Anti-Glare LED)'}</option>
                  <option value="late">{ar ? 'سهرة متأخرة (أقصى سطوع للاستاد)' : 'Late Night (Maximum Stadium Illumination)'}</option>
                </select>
              </div>
            </div>

            {/* Footwear & Surface Standards */}
            <div className="bg-[#0C131F] p-5 rounded-2xl border border-[#2A3F60] space-y-3">
              <div className="flex items-center gap-2">
                <Footprints size={18} className="text-[#10B981]" />
                <p className="text-xs uppercase font-mono tracking-widest text-[#10B981] font-bold">
                  {ar ? 'شروط الأحذية الإلزامية للأرضية' : 'MANDATORY FOOTWEAR SPECIFICATION'}
                </p>
              </div>
              <p className="text-sm text-[#E2E8F0] leading-relaxed">
                {activeCourt.footwearRule[locale]}
              </p>
              <div className="pt-2 border-t border-[#1B2B45] text-xs text-[#94A3B8]">
                <span className="font-mono text-[#CBD5E1] block mb-1">
                  {ar ? 'مواصفة النجيل / الأرضية:' : 'Surface Composition:'}
                </span>
                <span>{activeCourt.surfaceSpec[locale]}</span>
              </div>
            </div>

            {/* Safety & Rules Checklist */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                {ar ? 'معايير التنظيم والسلامة داخل الملعب' : 'Court Regulation & Safety Highlights'}
              </p>
              <ul className="space-y-2.5">
                {activeCourt.rulesChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#E2E8F0]">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Calibrated Telemetry & Booking Preparation */}
          <div className="bg-[#0E1726] border border-[#2A3F60] p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2A3F60]">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#94A3B8] font-bold block">
                    {ar ? 'مؤشرات الملعب التشغيلية' : 'CALIBRATED PITCH METRICS'}
                  </span>
                  <h4 className="font-black text-xl text-white mt-1">
                    {activeCourt.name[locale]}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#162338] border border-[#3A537C] flex items-center justify-center text-[#10B981]">
                  <Trophy size={22} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="my-6 grid grid-cols-2 gap-4">
                <div className="bg-[#0C131F] p-5 rounded-2xl border border-[#2A3F60] text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                    {ar ? 'سعة اللاعبين' : 'Squad Capacity'}
                  </p>
                  <p className="text-3xl font-black text-[#10B981] mt-2 font-mono">
                    {activeCourt.recommendedSquad}{' '}
                    <span className="text-xs font-normal text-white">
                      ({ar ? 'حتى' : 'max'} {activeCourt.maxSquad})
                    </span>
                  </p>
                  <p className="text-[11px] text-[#CBD5E1] mt-1">
                    {ar ? 'أساسيين وبدلاء' : 'Active + Substitutes'}
                  </p>
                </div>

                <div className="bg-[#0C131F] p-5 rounded-2xl border border-[#2A3F60] text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                    {ar ? 'مستوى الإنارة' : 'Lighting Lux'}
                  </p>
                  <p className="text-3xl font-black text-white mt-2 font-mono">
                    {calculatedLux}{' '}
                    <span className="text-xs font-normal text-[#10B981]">Lux</span>
                  </p>
                  <p className="text-[11px] text-[#CBD5E1] mt-1">
                    {ar ? 'كشافات LED مضادة للوهج' : 'Anti-glare uniform LED'}
                  </p>
                </div>
              </div>

              {/* Tactical Recommendations */}
              <div className="space-y-3">
                <div className="p-3.5 bg-[#0C131F] border border-[#2A3F60] rounded-xl flex items-start gap-3 text-xs text-[#E2E8F0] leading-relaxed">
                  <Clock size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    {ar
                      ? `فترة تبديل مقترحة كل ${rotationInterval} دقيقة للحفاظ على اللياقة البدنية والعدالة بين المشاركين.`
                      : `Recommended tactical rotation every ${rotationInterval} minutes to maintain high squad intensity.`}
                  </span>
                </div>
                <div className="p-3.5 bg-[#0C131F] border border-[#2A3F60] rounded-xl flex items-start gap-3 text-xs text-[#E2E8F0] leading-relaxed">
                  <ShieldCheck size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    {ar
                      ? 'الملعب مزود بصيدلية إسعافات أولية وجهاز قياس نبض وإنعاش قلبي متاح في مكتب إدارة الملعب.'
                      : 'Facility equipped with certified first-aid station and on-site automated external defibrillator (AED).'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA and Disclaimer */}
            <div className="mt-8 pt-6 border-t border-[#2A3F60]">
              <Link
                href={arenaPath(locale, 'book')}
                className="w-full py-4 px-6 bg-[#10B981] text-black font-black text-sm rounded-xl inline-flex items-center justify-center gap-3 hover:bg-[#22C55E] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>{ar ? 'ابدأ طلب استفسار حجز الملعب' : 'Initiate Court Booking Enquiry'}</span>
                <Arrow size={18} />
              </Link>

              {/* Strict Non-Binding Disclaimer */}
              <div className="mt-4 flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                <AlertTriangle size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                <span>
                  {ar
                    ? 'أداة استكشافية توضيحية لتنسيق مواعيد المباريات؛ ArenaHub نموذج موقع تجريبي من مافكس ولا يمتلك جدول مباريات حي أو حجزًا مؤكدًا فوريًا.'
                    : 'Exploratory booking calibrator for match planning; ArenaHub is a Mavvix website showcase and does not operate live court inventory or guarantee booking slots.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
