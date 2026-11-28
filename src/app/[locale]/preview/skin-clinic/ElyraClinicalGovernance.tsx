import type { Locale } from '@/lib/i18n/config';
import {
  ShieldAlert,
  Stethoscope,
  Lock,
  FileCheck2,
  Check,
  HeartHandshake
} from 'lucide-react';
import Link from 'next/link';
import { elyraPath } from '@/lib/verticals/skin-clinic/data';

interface GovernancePillar {
  number: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  icon: typeof Stethoscope;
  description: { ar: string; en: string };
  standards: { ar: string[]; en: string[] };
}

const PILLARS: readonly GovernancePillar[] = [
  {
    number: '01',
    title: {
      ar: 'الحدود السريرية والأخلاقيات الطبية',
      en: 'Ethical Clinical Boundaries'
    },
    subtitle: {
      ar: 'فصل تام بين المعلومات التثقيفية والقرار العلاجي',
      en: 'Strict delineation between editorial education and diagnosis'
    },
    icon: ShieldAlert,
    description: {
      ar: 'نرفض تماماً تقديم استشارات أو تشخيصات عبر الإنترنت أو نشر صور مقارنة مضللة تخفي آثار التعديل الرقمي. لا توجد نتائج مضمونة في طب الجلد، وقرار العلاج ينبع دائماً من تقييم سريري موضوعي.',
      en: 'We strictly reject online diagnoses, unverified digital before/after galleries, or misleading guarantees. Medical dermatology operates under evidence-based guidelines and individualized in-person evaluations.'
    },
    standards: {
      ar: [
        'حظر تقديم التشخيص أو وصف العلاج عن بُعد دون فحص',
        'خلو الموقع من صور المقارنات الرقمية المعدلة أو المبالغ فيها',
        'الشفافية التامة في توضيح التوقعات والآثار المحتملة'
      ],
      en: [
        'Zero remote diagnoses or prescriptions without direct examination',
        'Complete absence of manipulated or filtered comparative marketing imagery',
        'Transparent disclosure of potential side effects and healing timelines'
      ]
    }
  },
  {
    number: '02',
    title: {
      ar: 'تقييم يقوده أطباء جلدية مؤهلون',
      en: 'Physician-Led Consultations'
    },
    subtitle: {
      ar: 'إشراف طبي كامل على كافة الخطوات الإجرائية والتجميلية',
      en: 'Licensed dermatological oversight on all clinical pathways'
    },
    icon: Stethoscope,
    description: {
      ar: 'أي مناقشة لاختيار أجهزة الليزر، التقشير الكيميائي، أو الحقن التجميلي يقودها أطباء معتمدون يضعون سلامة الحاجز الجلدي وتاريخ المريض فوق أي رغبة إجرائية سريعة.',
      en: 'Every consideration of energy-based devices, chemical peels, or aesthetic injectables is directed by credentialed dermatologists who prioritize skin integrity and patient health history over procedural volume.'
    },
    standards: {
      ar: [
        'أطباء جلدية مرخصون ومتمرسون في تقييم الحالات',
        'مراجعة شاملة للتاريخ المرضي والحساسيات والدهانات الحالية',
        'تحديد الجلسات والمسافات الزمنية وفقاً لرد فعل البشرة الفعلي'
      ],
      en: [
        'Board-certified dermatologists supervising every procedural tier',
        'Rigorous review of systemic health history, allergies and active topicals',
        'Procedural pacing calibrated to biological skin healing milestones'
      ]
    }
  },
  {
    number: '03',
    title: {
      ar: 'الخصوصية التامة وتقليل البيانات',
      en: 'Privacy by Design & Data Minimization'
    },
    subtitle: {
      ar: 'عدم جمع أو تخزين أي سجلات صحية في النماذج العامة',
      en: 'Zero medical records, photos or health history in public forms'
    },
    icon: Lock,
    description: {
      ar: 'نموذج التواصل على هذا الموقع مخصص للتنسيق الإداري الهاتفي فقط. لا يُسمح بإرسال صور شخصية أو تقارير مخبرية أو أعراض مرضية عبر القنوات العامة غير المشفرة، حمايةً لسرية المريض التامة.',
      en: 'Public enquiry forms are strictly limited to administrative callback scheduling. Under no circumstances are photos, laboratory reports, or clinical symptoms collected or stored via unencrypted public channels.'
    },
    standards: {
      ar: [
        'جمع الاسم ورقم الهاتف والفترة المفضلة فقط دون بيانات صحية',
        'حظر قنوات رفع الصور أو الملفات أو حقول النصوص المفتوحة',
        'حماية الخصوصية ومنع إرسال السياق الطبي لأي منصات إعلانية'
      ],
      en: [
        'Intake strictly limited to name, contact phone, and preferred window',
        'Zero open text areas, file attachments, or photo upload mechanisms',
        'Complete isolation preventing medical data leakage to advertising scripts'
      ]
    }
  },
  {
    number: '04',
    title: {
      ar: 'الاختيار المستنير والرعاية المستمرة',
      en: 'Informed Consent & Continuity of Care'
    },
    subtitle: {
      ar: 'حق المريض في معرفة البدائل والتكاليف ومراحل التعافي',
      en: 'Comprehensive transparency on alternatives, costs and follow-up'
    },
    icon: FileCheck2,
    description: {
      ar: 'يحصل المريض على شرح مفصل لخيارات العلاج والبدائل غير التداخلية، وتكلفة الإجراءات، وفترة التوقف عن العمل أو التعافي، مع خطة متابعة مباشرة ومستمرة حتى استقرار النتائج.',
      en: 'Patients receive transparent discussions regarding non-invasive alternatives, associated financial commitments, social downtime expectations, and structured post-procedure check-ins.'
    },
    standards: {
      ar: [
        'شرح واضح لفترات النقاهة وتجنب الشمس بعد كل جلسة',
        'خطة رعاية وترميم منزلي داعمة ومحددة للمنتجات المسموحة',
        'إتاحة قنوات تواصل واضحة لمتابعة أي أعراض غير متوقعة'
      ],
      en: [
        'Explicit post-procedure downtime and photo-protection instructions',
        'Detailed home barrier replenishment protocol with approved gentle topicals',
        'Accessible clinic follow-up channels for monitoring unexpected skin reactivity'
      ]
    }
  }
];

export function ElyraClinicalGovernance({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="clinical-governance-standards"
      className="bg-[#DCE6DA] py-16 sm:py-24 border-b border-[#BACBB8]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#754458]">
            {ar ? '٠٦ / معايير الحوكمة السريرية' : '06 / CLINICAL GOVERNANCE & ETHICS'}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#352B39]">
            {ar ? 'أربعة مبادئ تحكم ممارستنا السريرية' : 'Four pillars of dermatological integrity'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3D4D3A]">
            {ar
              ? 'في طب الجلد والتجميل، الثقة تبدأ من الصدق والشفافية. نلتزم بمعايير أخلاقية صارمة تضع سلامة المريض فوق كل اعتبار وتضمن رعاية مهنية مستدامة.'
              : 'In aesthetic dermatology, true excellence is built on integrity, clinical restraint, and absolute data protection. Our governance model guarantees patient-first medical standards.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="bg-[#F7F3EF] border border-[#BACBB8] rounded-t-3xl p-7 sm:p-9 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-[#754458] font-bold">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#DCE6DA] flex items-center justify-center text-[#754458]">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#352B39]">
                    {pillar.title[locale]}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#754458]">
                    {pillar.subtitle[locale]}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-[#50434F]">
                    {pillar.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#D6C9CD]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#352B39] mb-3">
                    {ar ? 'ضوابط الالتزام' : 'Governance Standards'}
                  </p>
                  <ul className="space-y-2.5">
                    {pillar.standards[locale].map((std, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#352B39] leading-relaxed">
                        <Check size={14} className="text-[#754458] shrink-0 mt-0.5" />
                        <span>{std}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#352B39] text-white p-8 sm:p-10 rounded-t-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <HeartHandshake size={32} className="text-[#DCE6DA] shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">
                {ar ? 'الرعاية تبدأ بالاستماع والتفاهم المشترك' : 'Dermatology grounded in patient understanding'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#E8DFE2] leading-relaxed max-w-2xl">
                {ar
                  ? 'إذا كنت تبحث عن استشارة جلدية متأنية توازن بين العلم والأمان التام، يسعدنا استقبال استفسارك الإداري المبدئي للتنسيق.'
                  : 'For considered dermatological evaluations balancing medical rigor with tranquil care, request an initial administrative callback.'}
              </p>
            </div>
          </div>
          <Link
            href={elyraPath(locale, 'contact')}
            className="shrink-0 inline-flex items-center gap-2 bg-[#DCE6DA] text-[#352B39] hover:bg-white px-6 py-3.5 text-sm font-bold transition-colors"
          >
            {ar ? 'طلب تواصل إداري' : 'Request Callback'}
          </Link>
        </div>
      </div>
    </section>
  );
}
