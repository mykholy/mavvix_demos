import type { Locale } from '@/lib/i18n/config';
import {
  Volume2,
  Clock,
  Lock,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { lumaPath } from '@/lib/verticals/events/data';

interface ProductionPillar {
  code: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  icon: typeof Volume2;
  description: { ar: string; en: string };
  checkpoints: { ar: string[]; en: string[] };
}

const PILLARS: readonly ProductionPillar[] = [
  {
    code: 'ENG-01',
    title: {
      ar: 'هندسة الصوتيات وتوزيع الإضاءة المعمارية',
      en: 'Acoustic Engineering & Lighting Design'
    },
    subtitle: {
      ar: 'وضوح صوتي مطلق لجميع الحاضرين دون ارتدادات مزعجة',
      en: 'Uniform speech intelligibility and calibrated theatrical illumination'
    },
    icon: Volume2,
    description: {
      ar: 'نعتمد نمذجة صوتية رقمية لقاعات المؤتمرات لتوزيع مصفوفات السماعات الموجهة (Line Arrays) بحيث يبلغ الصوت كل مقعد بنقاء تام. كما نصمم توزيع الإضاءة ببروتوكول DMX لتأطير المتحدثين ومنع الوهج في عدسات الكاميرات.',
      en: 'We implement predictive acoustic modeling for venue spaces to position line arrays with targeted dispersion. Lighting fixtures are digitally mapped via DMX protocol to frame keynote podiums and eliminate broadcast camera glare.'
    },
    checkpoints: {
      ar: [
        'معايرة مستويات ضغط الصوت (SPL) لمنع الصدى في القاعات الكبيرة',
        'توزيع إضاءة بدرجة حرارة لونية ثابتة مخصصة للبث والتصوير التلفزيوني',
        'شبكات طاقة احتياطية (UPS) مستقلة لحماية أجهزة البث وغرفة التحكم'
      ],
      en: [
        'Calibrated SPL levels preventing resonant flutter echoes in voluminous spaces',
        'Broadcast-grade color-temperature lighting preventing camera sensor banding',
        'Dedicated isolated UPS electrical drops safeguarding live transmission racks'
      ]
    }
  },
  {
    code: 'STG-02',
    title: {
      ar: 'إدارة المسرح والتحكم اللحظي في الفقرات',
      en: 'Run-of-Show Protocol & Stage Management'
    },
    subtitle: {
      ar: 'تزامن بالميلي ثانية بين المتحدثين والمحتوى والمؤثرات',
      en: 'Timecode-locked transitions between presenters, media cues, and stagecraft'
    },
    icon: Clock,
    description: {
      ar: 'الفعاليات الناجحة تدار بجداول زمنية دقيقة (Cue-to-Cue). يتولى مدير المسرح ومساعدوه توجيه المتحدثين من غرف الانتظار وتلقينهم الشاشات الأمامية وإدارة تسلسل الفيديوهات والجوائز دون أي تأخير.',
      en: 'Prestigious assemblies operate on strict cue-to-cue run-of-show choreography. Dedicated stage managers coordinate VIP green-room ingress, confidence monitor teleprompters, and real-time audio-visual rollouts.'
    },
    checkpoints: {
      ar: [
        'إجراء بروفات تقنية كاملة (Tech Rehearsals) للمتحدثين قبل انطلاق الفعالية',
        'قناة اتصال لاسلكي مشفرة بين مخرج العرض، غرفة الصوت، وفرق المسرح',
        'خطة استجابة فورية للتعامل مع أي تعديل طارئ في تسلسل المتحدثين'
      ],
      en: [
        'Comprehensive technical dry runs conducted prior to guest ingress',
        'Encrypted wireless multi-channel comms linking director, FOH audio, and backstage',
        'Redundant fallback staging cue sheets accommodating dynamic VIP schedule shifts'
      ]
    }
  },
  {
    code: 'PRV-03',
    title: {
      ar: 'حماية الخصوصية وبروتوكولات كبار الشخصيات',
      en: 'VIP Privacy & Discretion Protocols'
    },
    subtitle: {
      ar: 'أمان رقمي وميداني يعزل الحضور والمناقشات المؤسسية',
      en: 'Air-gapped attendee discretion and private executive salons'
    },
    icon: Lock,
    description: {
      ar: 'ندرك حساسية الفعاليات والاجتماعات الاستراتيجية. نطبق قيوداً صارمة على جمع بيانات الحضور، ونوفر مسارات دخول وخروج منفصلة لكبار الضيوف، مع اشتراط اتفاقيات سرية (NDAs) لجميع الفرق والموردين الميدانيين.',
      en: 'We recognize the confidential nature of enterprise summits. Our intake never captures sensitive attendee rosters, providing isolated VIP arrival gates, dedicated security vetting, and mandatory non-disclosure covenants across all event crew.'
    },
    checkpoints: {
      ar: [
        'حظر جمع قوائم الحضور أو الوثائق الشخصية في النماذج العامة',
        'تحديد مناطق مغلقة خالية من التصوير للمحادثات التنفيذية الخاصة',
        'توقيع اتفاقيات عدم إفصاح صارمة مع كافة الموردين والفرق التقنية'
      ],
      en: [
        'Strict exclusion of attendee identity dossiers from public-facing intake',
        'Demarcated secure zones free of unaccredited media capture for private dialogue',
        'Legally binding non-disclosure agreements executed with all third-party rigging crews'
      ]
    }
  },
  {
    code: 'SAF-04',
    title: {
      ar: 'أمان التعليق السقفي وسلامة مخارج الطوارئ',
      en: 'Structural Rigging & Emergency Safety'
    },
    subtitle: {
      ar: 'حسابات هندسية دقيقة للأحمال وامتثال تام للسلامة المهنية',
      en: 'Engineered point-load calculations and compliant egress corridors'
    },
    icon: ShieldAlert,
    description: {
      ar: 'لا يتم تركيب أي هياكل إضاءة معلقة (Truss) أو شاشات ضخمة إلا بعد اعتماد مخططات التحميل من مهندس إنشائي مؤهل ومطابقتها لمواصفات القاعة، مع الحفاظ الصارم على خلو مخارج الطوارئ وأنظمة إطفاء الحريق.',
      en: 'No overhead trusses or heavy flown LED arrays are raised without certified structural load-bearing calculations matching venue roof points. Unobstructed emergency egress widths and fire suppression clearances remain non-negotiable.'
    },
    checkpoints: {
      ar: [
        'شهادات فحص دورية لكافة روافع السلاسل والأسلاك الفولاذية (Cables & Motors)',
        'خلو تام لكافة ممرات الطوارئ وعلامات الإخلاء المضيئة من أي عوائق تجهيز',
        'استخدام مواد وديكورات معالجة بمثبطات اللهب المعتمدة رسمياً'
      ],
      en: [
        'Certified periodic inspection logs for all electric chain hoists and wire ropes',
        'Zero obstruction of emergency exit portals and luminous evacuation signage',
        'Mandatory usage of fire-retardant treated textiles and exhibition materials'
      ]
    }
  }
];

export function LumaProductionStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  return (
    <section
      data-sector-specific="luma-production-standards"
      className="bg-[#291C2D] text-[#FCF7F1] py-16 sm:py-24 border-b border-[#5A4650]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#5A4650]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-[.25em] text-[#DCB8A6]">
              {ar ? 'معايير الحوكمة والإنتاج الهندسي' : 'ENGINEERING & PRODUCTION GOVERNANCE'}
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              {ar ? 'أربعة ركائز لضمان نجاح كل فعالية' : 'Four pillars behind flawless execution'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#ECDDD8]">
              {ar
                ? 'خلف المشهد البصري الأنيق، تقف معايير تشغيلية صارمة في هندسة الصوت، إدارة العرض، حماية الخصوصية، والسلامة الإنشائية لضمان تجربة لا تشوبها شائبة.'
                : 'Behind every memorable occasion sits rigorous operational discipline: acoustic modeling, cue-to-cue stagecraft, executive privacy, and certified structural rigging.'}
            </p>
          </div>

          <div>
            <Link
              href={lumaPath(locale, 'production')}
              className="inline-flex items-center gap-2 border border-[#DCB8A6] text-[#DCB8A6] px-6 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-[#DCB8A6] hover:text-[#291C2D] transition-colors"
            >
              <span>{ar ? 'دليل الإنتاج الكامل' : 'Full Production Guide'}</span>
              <Arrow size={14} />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                className="bg-[#38263D] border border-[#5A4650] p-6 sm:p-8 flex flex-col justify-between hover:border-[#DCB8A6] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#5A4650]">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#291C2D] text-[#DCB8A6] border border-[#5A4650]">
                      {pillar.code}
                    </span>
                    <Icon size={24} className="text-[#DCB8A6]" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-medium text-white leading-snug">
                    {pillar.title[locale]}
                  </h3>
                  <p className="mt-2 text-xs font-bold text-[#DCB8A6]">
                    {pillar.subtitle[locale]}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#ECDDD8] leading-relaxed">
                    {pillar.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#5A4650] space-y-2.5">
                  {pillar.checkpoints[locale].map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs text-[#ECDDD8]">
                      <CheckCircle2 size={16} className="text-[#DCB8A6] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
