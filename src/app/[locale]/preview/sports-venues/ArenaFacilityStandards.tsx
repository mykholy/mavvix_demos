'use client';

import React from 'react';
import {
  ShieldCheck,
  Zap,
  HeartPulse,
  CalendarCheck2,
  CheckCircle2,
  Trophy,
  Activity,
  Layers
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface ArenaPillar {
  id: string;
  code: string;
  icon: typeof ShieldCheck;
  title: { ar: string; en: string };
  tagline: { ar: string; en: string };
  description: { ar: string; en: string };
  criteria: Array<{ ar: string; en: string }>;
}

const ARENA_PILLARS: ArenaPillar[] = [
  {
    id: 'surface-tech',
    code: 'TURF-01',
    icon: Layers,
    title: {
      ar: 'أرضيات معتمدة وممتصة للصدمات',
      en: 'Certified Shock-Absorptive Surfaces'
    },
    tagline: {
      ar: 'حماية المفاصل وارتداد كروي مطابق للمواصفات الدولية',
      en: 'Joint impact protection & true international ball rebound'
    },
    description: {
      ar: 'تعتمد الملاعب نجيل صناعي مونوفيلامنت هجين مدعوم بوسادات امتصاص صدمات (Shockpad) لتقليل إجهاد الركبتين، أو باركيه خشب مابل كندي صلب للصالات المغلقة مطابق للمعيار الألماني DIN 18032.',
      en: 'Courts integrate dual-density synthetic monofilament turf over elastomeric shockpads to mitigate ligament strain, alongside DIN 18032 sprung Canadian maple hardwood in indoor arenas.'
    },
    criteria: [
      {
        ar: 'طبقة امتصاص صدمات سفلية تعزل الصدمات وتقلل مخاطر إصابات الرباط الصليبي',
        en: 'Continuous subterranean shockpad attenuating impact forces to protect cruciate ligaments'
      },
      {
        ar: 'ألياف عشب صناعي ناعمة غير مسببة للخدوش الجلدية عند الانزلاق أثناء اللعب',
        en: 'Skin-friendly non-abrasive monofilament fibers engineered against friction turf burns'
      },
      {
        ar: 'توزيع دوري ومنتظم لحبيبات المطاط والرمل لضمان استواء السطح وسرعة دوران الكرة',
        en: 'Automated weekly infill grooming maintaining uniform surface level and authentic roll'
      }
    ]
  },
  {
    id: 'anti-glare-lighting',
    code: 'LUX-02',
    icon: Zap,
    title: {
      ar: 'إنارة كاشفة خالية من الوهج ٥٠٠+ لوكس',
      en: 'Anti-Glare 500+ Lux Stadium Illumination'
    },
    tagline: {
      ar: 'رؤية ليلية فائقة الوضوح دون إجهاد لأعين اللاعبين',
      en: 'Optically shielded uniform brightness eliminating player eye glare'
    },
    description: {
      ar: 'أعمدة إنارة LED مبرمجة هندسيًا بزوايا سقوط متقاطعة تغطي كافة زوايا الملعب دون خلق مناطق ظل عمياء، مع عدسات عاكسة تمنع إبهار اللاعبين أثناء متابعة الكرات العالية.',
      en: 'Engineered cross-beam LED stadium fixtures eliminating blind shadows across corner flags and penalty boxes, equipped with anti-glare louvers to protect player tracking during high aerial balls.'
    },
    criteria: [
      {
        ar: 'شدة إضاءة لا تقل عن ٥٠٠ لوكس للمباريات الودية و٧٥0 لوكس لملاعب البادل والتنس',
        en: 'Minimum 500 Lux luminance for recreational football and 750 Lux for padel and tennis'
      },
      {
        ar: 'معامل تجانس ضوئي (Uniformity) يفوق ٠.٧ عبر مساحة الملعب بأكمله',
        en: 'Photometric uniformity ratio exceeding 0.7 across the entirety of the playing grid'
      },
      {
        ar: 'مصابيح مقاومة للمطر والغبار (IP66) مع أنظمة تشغيل احتياطية ضد انقطاع التيار',
        en: 'IP66 weather-sealed solid-state fixtures backed by auxiliary surge suppression'
      }
    ]
  },
  {
    id: 'medical-safety',
    code: 'SAFE-03',
    icon: HeartPulse,
    title: {
      ar: 'السلامة الميدانية وحماية المحيط',
      en: 'Perimeter Protection & Emergency Care'
    },
    tagline: {
      ar: 'مصدات إسفنجية ومحطة إسعافات أولية مجهزة',
      en: 'High-density collision pads & on-site automated defibrillator'
    },
    description: {
      ar: 'تبطين الأعمدة وجدران الملاعب بمصدات إسفنجية عالية الكثافة لحماية اللاعبين عند الاندفاع السريع، مع توفير حقيبة إسعافات متكاملة وجهاز إنعاش قلبي ومسار مخصص لسيارات الطوارئ.',
      en: 'Structural columns and court enclosures feature high-density closed-cell impact foam, complemented by a certified trauma first-aid station, automated external defibrillator, and clear ambulance access.'
    },
    criteria: [
      {
        ar: 'مصدات حماية حول القوائم وشباك الصد الجانبية لمنع الاصطدام بالجدران الصلبة',
        en: 'Perimeter crash padding on goalposts and lateral fences cushioning high-speed momentum'
      },
      {
        ar: 'صيدلية طوارئ ميدانية مجهزة بكمادات ثلج فورية، أربطة ضاغطة، وجهاز قياس أكسجين',
        en: 'On-site trauma kit stocked with instant cryo-packs, compression wraps, and pulse oximeter'
      },
      {
        ar: 'بوابات خروج طوارئ عريضة ومضاءة تضمن الإخلاء الآمن والسريع عند اللزوم',
        en: 'Wide illuminated emergency egress routes ensuring unhindered rapid evacuation'
      }
    ]
  },
  {
    id: 'transparent-booking',
    code: 'BOOK-04',
    icon: CalendarCheck2,
    title: {
      ar: 'تنظيم الحجوزات ومنع التداخل',
      en: 'Transparent Scheduling & Anti-Ghosting'
    },
    tagline: {
      ar: 'احترام مواعيد الفرق ووقت الإحماء والتسليم',
      en: 'Guaranteed court handover times & transparent cancellation rules'
    },
    description: {
      ar: 'إدارة أوقات المباريات بجدول زمني صارم يفصل بين فترات اللعب بفاصل ٥ دقائق للتسليم والإحماء، مع إشعار مكتوب بتأكيد التوقيت وشروط الاسترداد أو الإلغاء الشفافة.',
      en: 'Strict fixture scheduling incorporating 5-minute buffer transitions for clean court changeovers, transparent cancellation timelines, and zero double-booking practices.'
    },
    criteria: [
      {
        ar: 'فاصل زمني منظم بين كل حجزين يضمن نظافة الملعب واستلام الكرات والسترات',
        en: 'Scheduled 5-minute handover buffer guaranteeing pitch clearance, bibs and balls hygiene'
      },
      {
        ar: 'تأكيد الحجز برقم مرجعي واضح يوثق اسم الفريق وموعد البداية والنهاية',
        en: 'Documented booking voucher detailing squad name, start/end timestamps, and assigned pitch'
      },
      {
        ar: 'سياسة واضحة للتعامل مع تقلبات الطقس الشديدة أو الأمطار بما يضمن حقوق اللاعبين',
        en: 'Structured inclement weather policy safeguarding player rescheduling entitlements'
      }
    ]
  }
];

export function ArenaFacilityStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="arena-facility-standards"
      className="py-20 sm:py-28 bg-[#0E1726] text-white border-t border-[#1B2B45] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[#10B981] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#10B981]" />
            {ar ? 'ميثاق الجودة الرياضية' : 'ATHLETIC FACILITY CHARTER'}
          </p>
          <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
            {ar ? (
              <>
                أربعة معايير لا نساوم عليها. <span className="text-[#10B981]">لتجربة لعب آمنة واحترافية.</span>
              </>
            ) : (
              <>
                Four Standards of Excellence. <span className="text-[#10B981]">Safe & Professional Play.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#CBD5E1] text-sm sm:text-base leading-8">
            {ar
              ? 'تعتمد الملاعب الرياضية المدارة باحترافية على معايير سلامة هندسية تحمي اللاعبين من الإصابات وتضمن بيئة تنافسية منظمة وممتعة.'
              : 'Professionally operated sports venues are anchored by certified shockpad engineering, anti-glare illumination, and transparent schedule management.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {ARENA_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-[#131E31] border border-[#2A3F60] p-8 rounded-[2rem] hover:border-[#10B981]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#2A3F60]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0C131F] border border-[#3A537C] flex items-center justify-center text-[#10B981]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-black text-[#10B981]">
                          {pillar.code}
                        </span>
                        <h3 className="font-black text-lg text-white">
                          {pillar.title[locale]}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-bold text-[#E2E8F0] uppercase tracking-wide">
                    {pillar.tagline[locale]}
                  </p>

                  <p className="mt-3 text-sm text-[#94A3B8] leading-7">
                    {pillar.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#2A3F60]">
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">
                    {ar ? 'معايير التحقق والاعتماد الميداني:' : 'Operational Verification Standards:'}
                  </p>
                  <ul className="space-y-2">
                    {pillar.criteria.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                        <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                        <span>{item[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
