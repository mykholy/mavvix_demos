import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  Users,
  Lock,
  HeartPulse,
  CheckCircle2,
  KeyRound,
  DoorClosed,
  FileCheck2
} from 'lucide-react';

interface SafeguardingPillar {
  code: string;
  icon: typeof ShieldCheck;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  description: { ar: string; en: string };
  standards: { ar: string; en: string }[];
}

const SAFEGUARDING_PILLARS: readonly SafeguardingPillar[] = [
  {
    code: 'SFG-01',
    icon: DoorClosed,
    title: { ar: 'الأمان المكاني ونقاط الدخول الآمنة', en: 'Controlled Access & Physical Safety' },
    category: { ar: 'سلامة المنشأة', en: 'Campus Infrastructure' },
    description: {
      ar: 'تصميم بيئي يراعي خصوصية وحماية الأطفال، يشمل بوابات دخول مزدوجة وحماية الأصابع على جميع الأبواب وزوايا مستديرة ناعمة للأثاث.',
      en: 'Physical campus safeguarding with double-gated entrances, finger-pinch door guards, shatter-resistant glass, and rounded furniture edges.'
    },
    standards: [
      { ar: 'بوابات أمنية محكمة تمنع خروج الأطفال دون مرافقة', en: 'Interlocked security gates preventing unaccompanied egress' },
      { ar: 'خلو الخامات والألعاب من الحواف الحادة والمواد السامة', en: 'Non-toxic certified paints and child-safe rounded furniture' },
      { ar: 'مسح يومي منظم لنقاط السلامة في الصباح وقبل الانصراف', en: 'Daily pre-session safety sweeps and hazards inspection' }
    ]
  },
  {
    code: 'RAT-02',
    icon: Users,
    title: { ar: 'نسب الإشراف والتناسب العمري', en: 'Strict Educator-to-Child Ratios' },
    category: { ar: 'الرعاية المستمرة', en: 'Staffing & Supervision' },
    description: {
      ar: 'الحفاظ على نسب إشراف دولية تضمن حصول كل طفل على اهتمام فردي متواصل ودعم عاطفي مستجيب لاحتياجاته النمائية.',
      en: 'Rigid adherence to early childhood staffing standards, ensuring individualized eye-level attention and continuous supervision.'
    },
    standards: [
      { ar: 'نسب إشراف محددة وفق المرحلة العمرية (١:٣ إلى ١:٨)', en: 'Tiered supervision ratios by age bracket (1:3 to 1:8)' },
      { ar: 'حصول جميع مقدمي الرعاية على شهادات الإسعافات الأولية للأطفال', en: 'Mandatory pediatric first-aid and CPR certifications for all staff' },
      { ar: 'فحص السجلات الجنائية والمهنية لجميع العاملين دون استثناء', en: 'Comprehensive background checks and vetting for all employees' }
    ]
  },
  {
    code: 'PRV-03',
    icon: Lock,
    title: { ar: 'خصوصية الطفل وحظر المستندات والبيانات الحساسة', en: 'Child Identity Privacy & Zero Public Intake' },
    category: { ar: 'أمن البيانات الأسرية', en: 'Privacy by Design' },
    description: {
      ar: 'حماية صارمة لبيانات الأطفال تمنع جمع الأسماء الكاملة أو الملفات الطبية أو شهادات الميلاد عبر نماذج الاستفسار العامة على الموقع.',
      en: 'Absolute child privacy safeguards prohibiting full names, medical histories, or birth certificates on public inquiry forms.'
    },
    standards: [
      { ar: 'اقتصار نموذج الزيارة على الفئة العمرية وبيانات ولي الأمر', en: 'Inquiry scope strictly limited to age band and guardian contact' },
      { ar: 'عدم نشر صور وجوه الأطفال إلا بموافقة كتابية صريحة وموثقة', en: 'No identifiable child photography without written parental consent' },
      { ar: 'قنوات مشفرة خاصة لملفات التسجيل عند التعاقد الفعلي', en: 'Encrypted private offline channels for official enrollment files' }
    ]
  },
  {
    code: 'EMG-04',
    icon: HeartPulse,
    title: { ar: 'بروتوكولات الطوارئ والاستلام المعتمد', en: 'Emergency Preparedness & Authorized Handover' },
    category: { ar: 'إجراءات الحماية', en: 'Handover Governance' },
    description: {
      ar: 'نظام صارم للتحقق من هوية الشخص المصرح له بالاستلام، مع خطة إخلاء وطوارئ معتمدة وتدريب دوري للأطفال والكوادر.',
      en: 'Strict authorized collection verification paired with approved evacuation routes, allergy segregation, and emergency protocols.'
    },
    standards: [
      { ar: 'تسليم الطفل حصرًا للأشخاص المسجلين ببطاقة هوية معتمدة', en: 'Child release exclusively to pre-authorized guardians with photo ID' },
      { ar: 'خطة إخلاء طوارئ واضحة مع تدريبات دورية كل فصل دراسي', en: 'Rehearsed emergency evacuation plans and seasonal drills' },
      { ar: 'بروتوكول صارم لعزل مسببات الحساسية الغذائية الموثقة', en: 'Documented allergen isolation protocol in dining areas' }
    ]
  }
];

export function BloomSafeguardingCharter({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="bloom-safeguarding-charter"
      className="py-20 sm:py-28 bg-[#FFF9EE] text-[#145960] border-y border-[#E8DFC9]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-[#A54F35] text-xs font-black tracking-[.2em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#A54F35]" />
            {ar ? 'ميثاق الأمان والرعاية الأسرية' : 'CHILD SAFEGUARDING & FAMILY TRUST CHARTER'}
          </p>
          <h2 className="bloom-display font-bold text-3xl sm:text-5xl mt-5 text-[#145960] leading-tight">
            {ar ? (
              <>
                أمان طفلك أولًا. <span className="text-[#A54F35]">بلا أي تهاون أو وعود شكلية.</span>
              </>
            ) : (
              <>
                Child Safety First. <span className="text-[#A54F35]">Rigorous Standards.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#2E4844] text-sm sm:text-base leading-8">
            {ar
              ? 'تعتمد جودة الحضانة الحقيقية على معايير الحماية والرقابة الصارمة، سلامة البيئة الفيزيائية، وحفظ خصوصية الأسرة والطفل قبل أي ديكور أو أنشطة ترفيهية.'
              : 'True early childhood excellence is defined by physical safeguarding protocols, transparent educator ratios, and uncompromised privacy protection.'}
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFEGUARDING_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                className="bg-white border-2 border-[#E0D7C4] rounded-[2rem] p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#145960] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#F0E8D7]">
                    <span className="font-mono text-xs font-bold text-[#145960] tracking-wider">
                      {pillar.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#145960] bg-[#E2ECEB] px-3 py-1 rounded-full">
                      {pillar.category[locale]}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5E5B7] text-[#145960] flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#145960] leading-snug">
                      {pillar.title[locale]}
                    </h3>
                    <p className="text-xs text-[#2E4844] leading-relaxed mt-3">
                      {pillar.description[locale]}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#F0E8D7]">
                  <p className="text-[11px] font-bold text-[#A54F35] uppercase tracking-wider mb-3">
                    {ar ? 'معايير التطبيق والتحقق' : 'Safeguarding Controls'}
                  </p>
                  <ul className="space-y-2.5">
                    {pillar.standards.map((std, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#2E4844]">
                        <CheckCircle2 size={14} className="text-[#145960] shrink-0 mt-0.5" />
                        <span className="leading-snug">{std[locale]}</span>
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
