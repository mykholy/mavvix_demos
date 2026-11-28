import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  Users,
  Lock,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { nomadPath } from '@/lib/verticals/travel-agency/data';

interface EthicsPillar {
  code: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  icon: typeof Compass;
  description: { ar: string; en: string };
  checkpoints: { ar: string[]; en: string[] };
}

const PILLARS: readonly EthicsPillar[] = [
  {
    code: 'ETH-01',
    title: {
      ar: 'السفر البطيء وتجنب الجداول المزدحمة',
      en: 'Slow Travel & Mindful Pacing'
    },
    subtitle: {
      ar: 'وقت أطول للاستكشاف والراحة بدل حشر الزيارات المرهقة',
      en: 'Room for authentic discovery without checklist exhaustion'
    },
    icon: Compass,
    description: {
      ar: 'نؤمن بأن السفر الحقيقي ليس سباقاً لتسجيل النقاط. نخصص وقتاً كافياً لكل موقع تاريخي، ونفصل أيام التنقل الطويلة عن الجولات الميدانية، مع توفير مساحات حرة للاسترخاء والتأمل.',
      en: 'We believe genuine discovery is never a rushed marathon. We allocate generous time for each heritage site, separate transfer days from intensive touring, and protect unstructured leisure windows.'
    },
    checkpoints: {
      ar: [
        'تحديد حد أقصى للأنشطة اليومية لمنع الإرهاق الذهني والبدني',
        'توفير فترات راحة ظهيرة ملائمة للمناخ الحار في المواقع الأثرية',
        'تصميم مسارات مرنة تتكيف مع العائلات والأفراد الباحثين عن الهدوء'
      ],
      en: [
        'Sensible caps on daily monument visits preventing sensory fatigue',
        'Mandatory midday heat respites aligned with regional desert climate',
        'Adaptable flexible buffers for families and multi-generational groups'
      ]
    }
  },
  {
    code: 'LCL-02',
    title: {
      ar: 'الشراكة المجتمعية ودعم الحرف المحلية',
      en: 'Fair Community Value & Local Guides'
    },
    subtitle: {
      ar: 'الاستعانة بمرشدين مرخصين من أبناء المنطقة دون تسوق إجباري',
      en: 'Licensed native storytellers with zero commercial kickback detours'
    },
    icon: Users,
    description: {
      ar: 'رحلاتنا تدعم المجتمعات المحلية مباشرة: نعمل مع مرشدين أثريين مرخصين، نوجه الزوار إلى ورش الحرفيين التقليديين، ونرفض تماماً توجيه المسافرين إلى متاجر الهدايا الإجبارية القائمة على العمولات.',
      en: 'Our concepts channel value directly to host communities: partnering with certified local scholars, engaging traditional artisan ateliers, and strictly excluding coercive commission-driven tourist shops.'
    },
    checkpoints: {
      ar: [
        'مرشدون سياحيون مرخصون رسمياً ولديهم معرفة عميقة بالتاريخ المحلي',
        'دعم المطاعم العائلية والمقاهي التقليدية والمشاغل الحرفية الأصيلة',
        'حظر تام لأي محطات تسوق مفروضة لا تخدم مصلحة المسافر الحقيقية'
      ],
      en: [
        'Licensed professional Egyptologists and accredited Saudi heritage guides',
        'Direct patronization of family-owned eateries and verified craft guilds',
        'Complete prohibition of mandatory commercial kickback shopping stops'
      ]
    }
  },
  {
    code: 'PRV-03',
    title: {
      ar: 'الخصوصية التامة وعزل وثائق السفر',
      en: 'Privacy by Design & Identity Safeguards'
    },
    subtitle: {
      ar: 'لا نطلب جوازات السفر أو البطاقات الائتمانية في النماذج العامة',
      en: 'Zero passport or credit card collection in public planning forms'
    },
    icon: Lock,
    description: {
      ar: 'بياناتك الشخصية وخطط سفرك محمية بالكامل. لا يطلب نموذجنا العام أرقام جوازات السفر، الهويات الوطنية، أو بيانات الدفع، ونعزل استفسارات التخطيط عن أي شبكات تتبع أو إعلانات خارجية.',
      en: 'Your travel aspirations and private information remain confidential. Our public brief never requests passport numbers, civil IDs, or payment data, keeping planning dialogues decoupled from ad tracking networks.'
    },
    checkpoints: {
      ar: [
        'حظر جمع جوازات السفر أو الوثائق الحكومية عبر القنوات المفتوحة',
        'تشفير صارم لمعلومات التواصل الأساسية دون مشاركتها مع أطراف ثالثة',
        'التعامل المالي يتم عبر قنوات مصرفية موثوقة وعقود سفر مكتوبة فقط'
      ],
      en: [
        'Strict exclusion of travel documents or passports from open web forms',
        'Encrypted contact data never sold or syndicated to lead aggregators',
        'Any eventual payment handled exclusively through formal merchant contracts'
      ]
    }
  },
  {
    code: 'TRP-04',
    title: {
      ar: 'وضوح البنود وشروط الإلغاء والرسوم',
      en: 'Transparent Scope & Clear Contracts'
    },
    subtitle: {
      ar: 'تحديد دقيق للمشمول والمستثنى قبل توقيع أي اتفاق رسمي',
      en: 'Unambiguous demarcation of admissions, transfers, and contingencies'
    },
    icon: FileCheck,
    description: {
      ar: 'لا مفاجآت في الطريق. يجب أن يوضح أي عرض سياحي احترافي تفاصيل الإقامة، نوع الوجبات، تذاكر المواقع المشمولة، رسوم التصاريح، وسياسات التعديل أو الإلغاء المرنة قبل طلب أي دفعة مقدمة.',
      en: 'Zero unexpected arrival surcharges. Every genuine itinerary brief must delineate room categories, transport class, monument ticketing inclusions, and written cancellation terms before monetary commitment.'
    },
    checkpoints: {
      ar: [
        'جدول مكتوب يوضح تفاصيل الإقامة ووسائل النقل وتذاكر المزارات',
        'توضيح الرسوم الإضافية الاختيارية مثل ركوب المناطيد أو الغوص',
        'سياسة إلغاء وتعديل معلنة وواضحة تحمي حقوق المسافر والمشغل'
      ],
      en: [
        'Itemized schedule covering hotel tier, private transport, and entrance fees',
        'Explicit notation of optional excursions (hot-air balloons, dive charters)',
        'Transparent written cancellation and weather contingency policies'
      ]
    }
  }
];

export function NomadTravelEthics({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  return (
    <section
      data-sector-specific="nomad-travel-ethics"
      className="bg-[#18352E] text-[#FFF9F0] py-16 sm:py-24 border-b border-[#3D5249]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#3D5249]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-[.25em] text-[#E0AB6A]">
              {ar ? 'ميثاق السفر الأخلاقي والمسؤول' : 'ETHICAL TRAVEL CHARTER & STANDARDS'}
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              {ar ? 'أربعة مبادئ لتجربة سفر أصيلة' : 'Four principles behind thoughtful travel'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E7DDCF]">
              {ar
                ? 'نؤمن بأن قيمة الرحلة لا تُقاس بعدد الصور السريعة، بل بعمق التجربة، احترام المجتمعات المضيفة، والوضوح التام في كل خطوة.'
                : 'Meaningful travel is measured not by rushed photo stops, but by authentic cultural engagement, fair community value, and absolute transparency.'}
            </p>
          </div>

          <div>
            <Link
              href={nomadPath(locale, 'inclusions')}
              className="inline-flex items-center gap-2 border border-[#E0AB6A] text-[#E0AB6A] px-6 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-[#E0AB6A] hover:text-[#18352E] transition-colors"
            >
              <span>{ar ? 'معايير تفاصيل البرامج' : 'View Inclusions Charter'}</span>
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
                className="bg-[#244238] border border-[#3D5249] p-6 sm:p-8 flex flex-col justify-between hover:border-[#E0AB6A] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#3D5249]">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#18352E] text-[#E0AB6A] border border-[#3D5249]">
                      {pillar.code}
                    </span>
                    <Icon size={24} className="text-[#E0AB6A]" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-medium text-white leading-snug">
                    {pillar.title[locale]}
                  </h3>
                  <p className="mt-2 text-xs font-bold text-[#E0AB6A]">
                    {pillar.subtitle[locale]}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#E7DDCF] leading-relaxed">
                    {pillar.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#3D5249] space-y-2.5">
                  {pillar.checkpoints[locale].map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs text-[#E7DDCF]">
                      <CheckCircle2 size={16} className="text-[#E0AB6A] shrink-0 mt-0.5" />
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
