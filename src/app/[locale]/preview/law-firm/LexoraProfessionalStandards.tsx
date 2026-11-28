import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  LockKeyhole,
  Scale,
  Users2,
  FileSpreadsheet,
  AlertOctagon,
  CheckCircle2,
  Award,
  BookOpenCheck
} from 'lucide-react';

interface StandardPillar {
  number: string;
  titleAr: string;
  titleEn: string;
  headlineAr: string;
  headlineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: typeof ShieldCheck;
  standardsAr: string[];
  standardsEn: string[];
}

const PILLARS: StandardPillar[] = [
  {
    number: '01',
    titleAr: 'الحد الأدنى للبيانات وسرية التواصل',
    titleEn: 'Data Minimization & Intake Privacy',
    headlineAr: 'حماية الموكل تبدأ بما لا يُطلب عبر الموقع العام',
    headlineEn: 'Client protection begins with what is never collected publicly',
    descriptionAr:
      'لا نطلب ولا نقبل أسماء الخصوم أو أرقام القضايا أو مستندات النزاع السرية عبر النماذج الرقمية. الاستفسار الأولي يقتصر على تحديد المجال القانوني وبيانات الاتصال الأساسية فقط لتفادي إفشاء أسرار العمل.',
    descriptionEn:
      'We never request adverse party identities, court case IDs, or privileged documents through open web portals. Initial enquiries capture only high-level practice areas and verified contact details to preserve confidentiality.',
    icon: LockKeyhole,
    standardsAr: [
      'حظر رفع المستندات والعقود السرية على النماذج العامة',
      'تشفير بيانات الاستفسار وحفظها في قاعدة بيانات آمنة',
      'عدم إنشاء أي علاقة محامٍ وموكل بمجرد إرسال النموذج'
    ],
    standardsEn: [
      'Absolute prohibition of document uploads on public web forms',
      'Encrypted intake storage in isolated relational repository',
      'Explicit disclosure that submission creates no legal representation'
    ]
  },
  {
    number: '02',
    titleAr: 'فحص تعارض المصالح المسبق',
    titleEn: 'Strict Conflict of Interest Clearance',
    headlineAr: 'التحقق المؤسسي الصارم قبل استلام أي وقائع سرية',
    headlineEn: 'Formal institutional clearance before substantive fact disclosure',
    descriptionAr:
      'قبل الاطلاع على تفاصيل النزاع أو تقديم أي رأي قانوني، يجري فحص أسماء الأطراف وسجلات الموكلين الحاليين والسابقين للتأكد من انعدام أي تعارض مصالح محتمل، التزامًا بأعلى أمانة مهنية.',
    descriptionEn:
      'Prior to receiving substantive dispute facts or rendering advice, prospective counterparties are screened against current and historical client registers to identify and eliminate potential conflicts of interest.',
    icon: Users2,
    standardsAr: [
      'فحص اسم الكيان التجاري مقابل سجل الخصوم المعتمد',
      'بروتوكول فوري للامتناع والتنحي عند نشوء أدنى شبهة تعارض',
      'فصل سرية ملفات الشركات المتنافسة في القطاع ذاته'
    ],
    standardsEn: [
      'Screening commercial entities against formal counterparty registers',
      'Immediate recusal protocol upon any appearance of conflicting interest',
      'Information barriers between competitors operating in identical sectors'
    ]
  },
  {
    number: '03',
    titleAr: 'محامون مؤهلون ومرخصون محليًا',
    titleEn: 'Jurisdiction-Qualified Counsel Only',
    headlineAr: 'الرأي القانوني والمرافعة حق حصري للمحامين المعتمدين',
    headlineEn: 'Substantive advice and court advocacy restricted to accredited counsel',
    descriptionAr:
      'التمثيل القانوني والمرافعة وصياغة المذكرات القضائية تتم حصرًا بواسطة محامين مرخصين ومقيدين لدى نقابة المحامين المصرية أو وزارة العدل السعودية، وفق متطلبات كل ولاية قضائية.',
    descriptionEn:
      'Formal representation, judicial appearances, and statutory pleadings are handled exclusively by practitioners admitted to the Egyptian Bar Association or licensed by the Saudi Ministry of Justice.',
    icon: Award,
    standardsAr: [
      'التحقق من القيد النقابي والترخيص المهني الساري',
      'مطابقة الاختصاص النوعي والمكاني للنزاع مع ترخيص المحامي',
      'تأمين المسؤولية المهنية وتطبيق لوائح السلوك القانوني'
    ],
    standardsEn: [
      'Verification of active bar admission and ministerial licensing',
      'Strict alignment of practitioner qualification with court level',
      'Professional indemnity coverage and adherence to statutory codes of conduct'
    ]
  },
  {
    number: '04',
    titleAr: 'انعدام الوعود بالنتائج والتقييم الموضوعي',
    titleEn: 'Zero Outcome Guarantees & Objective Merits',
    headlineAr: 'المحاماة بذل عناية صادقة وليست تحقيق نتيجة مضمونة',
    headlineEn: 'Legal representation is a duty of diligent care, not guaranteed outcomes',
    descriptionAr:
      'نلتزم بالشفافية الكاملة مع العميل؛ لا نطلق وعودًا بنسب نجاح مصطنعة أو نتائج محسومة أمام القضاء. القرارات التجارية تبنى على تقييم مخاطر متزن وسيناريوهات قانونية واقعية.',
    descriptionEn:
      'We maintain total transparency: no fabricated win-rate percentages or judicial guarantees. Sound commercial and corporate decisions require sober risk assessments and realistic scenario modeling.',
    icon: Scale,
    standardsAr: [
      'حظر الدعاية المضللة ونسب كسب القضايا غير الحقيقية',
      'تقديم مصفوفة مخاطر واضحة لأفضل وأسوأ الاحتمالات القانونية',
      'أتعاب مهنية شفافة ومحددة النطاق دون مفاجآت تعاقدية'
    ],
    standardsEn: [
      'Absolute prohibition of misleading win rates or outcome promises',
      'Provision of candid best-case and worst-case risk assessment matrices',
      'Transparent, scope-defined professional fee schedules without hidden costs'
    ]
  }
];

export function LexoraProfessionalStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="lexora-professional-standards"
      aria-label={ar ? 'معايير الحوكمة وأخلاقيات الممارسة القانونية' : 'Legal Governance & Professional Standards'}
      className="bg-[#251D34] text-[#FAF7F1] py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#E4CA91] text-xs font-bold tracking-[.18em] uppercase">
            <BookOpenCheck size={16} />
            <span>{ar ? 'أخلاقيات الممارسة والحوكمة' : 'PROFESSIONAL ETHICS & GOVERNANCE'}</span>
          </div>
          <h2 className="lexora-display text-3xl sm:text-5xl font-semibold text-[#FAF7F1] mt-5 leading-tight">
            {ar ? (
              <>
                أربعة أركان مهنية <span className="text-[#D5BA84]">تحمي ثقة العميل وسرية ملفه.</span>
              </>
            ) : (
              <>
                Four governance pillars <span className="text-[#D5BA84]">protecting confidentiality and trust.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-8 text-[#E9DFEA]">
            {ar
              ? 'الموقع القانوني الرفيع يعكس وقار المهنة ومسؤوليتها الأخلاقية؛ لا دعاية تجارية مضللة ولا استدراج لبيانات الخصومة قبل فحص التعارض والتعاقد الرسمي.'
              : 'A prestigious legal presence mirrors the dignity and fiduciary gravity of the profession: zero misleading commercialism, no harvesting of dispute facts prior to formal conflict clearance.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {PILLARS.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="bg-[#2D233D] border border-[#4A3A5E] p-7 sm:p-9 rounded-sm flex flex-col justify-between hover:border-[#8E703A] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#4A3A5E]">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 bg-[#251D34] border border-[#5A4870] rounded-sm text-[#E4CA91]">
                        <Icon size={22} />
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-white">
                        {ar ? p.titleAr : p.titleEn}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#E4CA91] font-bold">
                      {p.number} / 04
                    </span>
                  </div>

                  <h4 className="lexora-display text-lg sm:text-xl font-semibold text-[#FAF7F1] mt-5 leading-snug">
                    {ar ? p.headlineAr : p.headlineEn}
                  </h4>

                  <p className="mt-3 text-xs sm:text-sm leading-7 text-[#D9C6D4]">
                    {ar ? p.descriptionAr : p.descriptionEn}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#4A3A5E]">
                  <span className="text-[11px] font-bold text-[#E4CA91] uppercase tracking-wider block mb-3">
                    {ar ? 'معايير الالتزام المؤسسي:' : 'Mandatory Governance Standards:'}
                  </span>
                  <ul className="space-y-2">
                    {(ar ? p.standardsAr : p.standardsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-[#E9DFEA]">
                        <CheckCircle2 size={15} className="text-[#397D58] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#2D233D] border border-[#4A3A5E] p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="p-3 bg-[#251D34] rounded-sm text-[#E4CA91] shrink-0">
              <ShieldCheck size={28} />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                {ar ? 'التزام قانوني صارم بالسرية المهنية' : 'Strict Professional Secrecy & Compliance'}
              </h4>
              <p className="text-xs text-[#D9C6D4] mt-1 leading-6">
                {ar
                  ? 'هذا النموذج التجريبي من مافكس يجسد أعلى معايير التصميم القانوني للشركات في مصر والسعودية والشرق الأوسط.'
                  : 'This commercial showcase by Mavvix demonstrates exemplary legal architecture for leading law firms in Egypt, Saudi Arabia, and the Middle East.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
