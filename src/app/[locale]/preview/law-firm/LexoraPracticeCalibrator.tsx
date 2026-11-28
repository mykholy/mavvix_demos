'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { lexoraPath } from '@/lib/verticals/law-firm/data';
import {
  Scale,
  Landmark,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Building2,
  ScrollText,
  BriefcaseBusiness,
  Gavel,
  CheckCircle2,
  Info,
  Globe2
} from 'lucide-react';

export type JurisdictionCode = 'egypt' | 'saudi' | 'cross_border';
export type PracticeCategory = 'corporate' | 'contracts' | 'employment' | 'disputes';

interface JurisdictionProfile {
  id: JurisdictionCode;
  labelAr: string;
  labelEn: string;
  taglineAr: string;
  taglineEn: string;
  authorityAr: string;
  authorityEn: string;
  primaryStatutesAr: string[];
  primaryStatutesEn: string[];
  arbitrationForumAr: string;
  arbitrationForumEn: string;
}

const JURISDICTIONS: Record<JurisdictionCode, JurisdictionProfile> = {
  egypt: {
    id: 'egypt',
    labelAr: 'جمهورية مصر العربية',
    labelEn: 'Arab Republic of Egypt',
    taglineAr: 'إطار قانوني مدني متكامل مع تشريعات حديثة للاستثمار والمحاكم الاقتصادية',
    taglineEn: 'Established civil law framework with modernized investment and economic court codes',
    authorityAr: 'الهيئة العامة للاستثمار والمناطق الحرة (GAFI) ومصلحة السجل التجاري',
    authorityEn: 'General Authority for Investment (GAFI) & Commercial Registry Authority',
    primaryStatutesAr: [
      'قانون الشركات رقم 159 لسنة 1981 وتعديلاته',
      'قانون الاستثمار الموحد رقم 72 لسنة 2017 ولائحته التنفيذية',
      'قانون المحاكم الاقتصادية رقم 120 لسنة 2008 وتعديلاته بالتقاضي الإلكتروني',
      'قانون العمل رقم 12 لسنة 2003 وتنظيم علاقات العمل الفردية والجماعية'
    ],
    primaryStatutesEn: [
      'Companies Law No. 159/1981 & applicable corporate amendments',
      'Investment Law No. 72/2017 & executive investment statutes',
      'Economic Courts Law No. 120/2008 & electronic litigation procedures',
      'Labor Law No. 12/2003 & unified workplace regulatory codes'
    ],
    arbitrationForumAr: 'مركز القاهرة الإقليمي للتحكيم التجاري الدولي (CRCICA)',
    arbitrationForumEn: 'Cairo Regional Centre for International Commercial Arbitration (CRCICA)'
  },
  saudi: {
    id: 'saudi',
    labelAr: 'المملكة العربية السعودية',
    labelEn: 'Kingdom of Saudi Arabia',
    taglineAr: 'بيئة استثمارية متطورة في إطار رؤية 2030 ونظام الشركات الجديد ونظام المعاملات المدنية',
    taglineEn: 'Dynamic commercial environment anchored by the New Companies Law & Civil Transactions Law',
    authorityAr: 'وزارة التجارة، ووزارة الاستثمار (MISA)، وهيئة السوق المالية (CMA)',
    authorityEn: 'Ministry of Commerce, Ministry of Investment (MISA), & Capital Market Authority (CMA)',
    primaryStatutesAr: [
      'نظام الشركات الجديد الصادر بالمرسوم الملكي م/132 لسنة 1443هـ',
      'نظام المعاملات المدنية الصادر بالمرسوم الملكي م/191 لسنة 1444هـ',
      'نظام المحاكم التجارية الصادر بالمرسوم الملكي م/93 لسنة 1441هـ',
      'نظام العمل الصادر بالمرسوم الملكي م/51 لسنة 1426هـ وتحديثاته'
    ],
    primaryStatutesEn: [
      'New Companies Law (Royal Decree M/132, 1443H)',
      'Civil Transactions Law (Royal Decree M/191, 1444H)',
      'Commercial Courts Law (Royal Decree M/93, 1441H)',
      'Saudi Labor Law (Royal Decree M/51, 1426H) & statutory updates'
    ],
    arbitrationForumAr: 'المركز السعودي للتحكيم التجاري (SCCA)',
    arbitrationForumEn: 'Saudi Center for Commercial Arbitration (SCCA)'
  },
  cross_border: {
    id: 'cross_border',
    labelAr: 'الأعمال العابرة للحدود',
    labelEn: 'Cross-Border & Regional',
    taglineAr: 'تنسيق متعدد الولايات القضائية واتفاقيات التجارة البينية وتجنب الازدواج الضريبي',
    taglineEn: 'Multi-jurisdictional alignment, international treaties, and bilateral trade protections',
    authorityAr: 'تنسيق مشترك مع المستشارين القانونيين المرخصين في كل دولة ذات اختصاص',
    authorityEn: 'Coordinated counsel alongside local qualified legal practitioners in each jurisdiction',
    primaryStatutesAr: [
      'اتفاقيات الاستثمار الثنائية والإقليمية المعمول بها (BITs)',
      'قواعد غرفة التجارة الدولية (ICC) وشروط التجارة الدولية (Incoterms 2020)',
      'اتفاقية نيويورك لعام 1958 للاعتراف بقرارات التحكيم الأجنبية وتنفيذها',
      'معايير التحويلات المالية وقواعد الامتثال للضريبة المستقطعة عبر الحدود'
    ],
    primaryStatutesEn: [
      'Applicable Bilateral & Regional Investment Treaties (BITs)',
      'International Chamber of Commerce (ICC) Rules & Incoterms 2020',
      '1958 New York Convention on Foreign Arbitral Awards Enforcement',
      'Cross-border withholding tax covenants & foreign exchange regulations'
    ],
    arbitrationForumAr: 'غرف التحكيم الدولية (ICC / LCIA / CRCICA / SCCA)',
    arbitrationForumEn: 'International Arbitration Venues (ICC / LCIA / CRCICA / SCCA)'
  }
};

interface ScopeMatrixItem {
  key: PracticeCategory;
  titleAr: string;
  titleEn: string;
  icon: typeof Building2;
  coreIssuesAr: string[];
  coreIssuesEn: string[];
  diligenceChecklistAr: string[];
  diligenceChecklistEn: string[];
}

const PRACTICE_SCOPES: ScopeMatrixItem[] = [
  {
    key: 'corporate',
    titleAr: 'تأسيس الشركات وحوكمة مجالس الإدارة',
    titleEn: 'Corporate Formation & Governance',
    icon: Building2,
    coreIssuesAr: [
      'تحديد الشكل القانوني الأنسب (شركة مساهمة، ذات مسؤولية محدودة، فرع أجنبي)',
      'صياغة عقود التأسيس والنظام الأساسي وسجلات الشركاء بدقة مانعة للنزاع',
      'حوكمة صلاحيات مجلس الإدارة والمديرين التنفيذيين والجمعيات العمومية',
      'إجراءات زيادة رأس المال ودخول الشركاء الاستراتيجيين واتفاقيات المساهمين'
    ],
    coreIssuesEn: [
      'Optimal entity structuring (Joint Stock Company, LLC, or Foreign Branch)',
      'Drafting Articles of Association, By-laws, and definitive shareholder registers',
      'Board governance frameworks, executive authority delegations, and AGM protocols',
      'Capital increase procedures, strategic equity entry, and Shareholders Agreements (SHA)'
    ],
    diligenceChecklistAr: [
      'تحديد هيكل الحصص ونسب التصويت وحالات الأغلبية الخاصة مسبقًا',
      'مراجعة سجل الأنشطة التجارية ومطابقتها للمتطلبات التنظيمية الدقيقة',
      'إعداد جدول الصلاحيات الإدارية والمالية للتوقيع على الحسابات والعقود'
    ],
    diligenceChecklistEn: [
      'Prior determination of shareholding ratios, voting thresholds, and supermajorities',
      'Alignment of corporate object codes with licensing and regulatory mandates',
      'Clear internal matrix of financial and administrative signing authorities'
    ]
  },
  {
    key: 'contracts',
    titleAr: 'العقود التجارية والاتفاقيات التشغيلية',
    titleEn: 'Commercial & Operating Agreements',
    icon: ScrollText,
    coreIssuesAr: [
      'اتفاقيات التوزيع والوكالات التجارية وعقود التوريد وسلاسل الإمداد',
      'شروط سقف المسؤولية التعاقدية والتعويضات الاتفاقية وتحديد نطاق الضرر',
      'آليات الدفعات المرتبطة بالتسليم المرحلي وضمانات حسن التنفيذ البنكية',
      'شروط الإنهاء للسبب والإنهاء للملاءمة وفترات الإخطار المسبق وآثار الفسخ'
    ],
    coreIssuesEn: [
      'Commercial distribution, franchise, agency, and supply chain master agreements',
      'Contractual liability caps, liquidated damages, and consequential loss disclaimers',
      'Milestone-linked payment triggers, retentions, and performance bond covenants',
      'Termination for breach vs. termination for convenience, notice periods, and post-exit IP'
    ],
    diligenceChecklistAr: [
      'التدقيق في توصيف مخرجات العمل بوضوح قاطع يمنع التأويل المختلف',
      'تحديد القانون الحاكم ومكان الاختصاص القضائي أو آلية التحكيم المختارة',
      'إدراج شروط الحفاظ على السرية وحماية الملكية الفكرية المتبادلة'
    ],
    diligenceChecklistEn: [
      'Exhaustive, unambiguous technical specifications for all commercial deliverables',
      'Explicit choice of substantive governing law and exclusive forum/arbitration seat',
      'Mutual non-disclosure and intellectual property reservation safeguards'
    ]
  },
  {
    key: 'employment',
    titleAr: 'علاقات العمل والامتثال التنظيمي',
    titleEn: 'Employment & Workplace Compliance',
    icon: BriefcaseBusiness,
    coreIssuesAr: [
      'صياغة عقود العمل النموذجية للكوادر القيادية والتنفيذية وفق الأنظمة المحلية',
      'لوائح تنظيم العمل الداخلية المعتمدة وسياسات الانضباط والجزاءات التأديبية',
      'شروط عدم المنافسة وسرية المعلومات ومشاريع الاختراع أثناء العمل',
      'التسويات الودية لإنهاء علاقات العمل ومكافأة نهاية الخدمة واشتراطات التأمينات'
    ],
    coreIssuesEn: [
      'Executive employment contracts aligned with statutory public policy mandates',
      'Approved internal labor regulations, disciplinary codes, and workplace grievances',
      'Enforceable non-compete covenants, trade secret confidentiality, and work-for-hire IP',
      'Separation agreements, severance/end-of-service benefits, and statutory social insurance'
    ],
    diligenceChecklistAr: [
      'مطابقة شروط العقد مع النصوص الآمرة في نظام العمل المعني دون انتقاص',
      'توثيق سجلات الحضور والإجازات والإنذارات الرسمية بمسار إجرائي مكتمل',
      'حصر البيانات الحساسة المتاحة للموظف لتحديد نطاق عدم المنافسة جغرافيًا وزمنيًا'
    ],
    diligenceChecklistEn: [
      'Full compliance with mandatory, non-waivable statutory labor entitlements',
      'Documented procedural trails for warnings, performance reviews, and statutory leaves',
      'Reasonable geographical and temporal limits on restrictive non-compete clauses'
    ]
  },
  {
    key: 'disputes',
    titleAr: 'فض المنازعات والتحكيم التجاري',
    titleEn: 'Dispute Resolution & Commercial Arbitration',
    icon: Gavel,
    coreIssuesAr: [
      'تقييم الموقف القانوني المبدئي واستراتيجيات التفاوض والتسوية الودية البديلة',
      'صياغة ومراجعة شرط التحكيم (Arbitration Clause) وقواعد المؤسسة التحكيمية',
      'إجراءات الحجوز التحفظية والأوامر الوقتية والمستعجلة لحماية الأصول المتنازع عليها',
      'تنفيذ الأحكام القضائية وقرارات التحكيم الأجنبية وفق الإجراءات التنفيذية المحلية'
    ],
    coreIssuesEn: [
      'Pre-action risk assessment, litigation avoidance, and structured settlement negotiation',
      'Drafting enforceable institutional arbitration agreements and appointing tribunals',
      'Interim protective relief, asset freezes, and emergency judicial orders',
      'Enforcement of domestic judgments and foreign arbitral awards under local enforcement codes'
    ],
    diligenceChecklistAr: [
      'حفظ ومطابقة كافة المراسلات المكتوبة وفواتير الأعمال ومحاضر التسليم الموقعة',
      'التحقق من صحة الإخطارات الرسمية وفق المواعيد المقررة قانونًا قبل اتخاذ أي إجراء',
      'تأكيد استيفاء شرط التفاوض الودي المتدرج إذا كان منصوصًا عليه في العقد'
    ],
    diligenceChecklistEn: [
      'Complete documentary preservation of signed invoices, correspondence, and variations',
      'Strict adherence to statutory formal notice protocols and limitation periods',
      'Compliance with multi-tiered dispute escalation clauses prior to formal filing'
    ]
  }
];

export function LexoraPracticeCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [jurisdiction, setJurisdiction] = useState<JurisdictionCode>('egypt');
  const [practice, setPractice] = useState<PracticeCategory>('corporate');

  const jurProfile = JURISDICTIONS[jurisdiction];
  const activeScope = PRACTICE_SCOPES.find(s => s.key === practice)!;
  const ActiveIcon = activeScope.icon;

  return (
    <section
      data-sector-specific="lexora-practice-calibrator"
      aria-label={ar ? 'مصفوفة التقييم القانوني والاختصاص القضائي' : 'Legal Assessment & Jurisdiction Matrix'}
      className="bg-[#FAF7F1] py-20 sm:py-28 border-b border-[#D5C8B5]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#775A2E] text-xs font-bold tracking-[.18em] uppercase">
            <Scale size={16} className="text-[#8B6E39]" />
            <span>{ar ? 'مصفوفة التقييم القانوني' : 'LEGAL PRACTICE MATRIX'}</span>
          </div>
          <h2 className="lexora-display text-3xl sm:text-5xl font-semibold text-[#251D34] mt-5 leading-tight">
            {ar ? (
              <>
                حدّد الاختصاص القضائي، <span className="text-[#84662F]">واستطلع متطلبات ملفك.</span>
              </>
            ) : (
              <>
                Select jurisdiction, <span className="text-[#84662F]">calibrate scope.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-8 text-[#3F314B]">
            {ar
              ? 'تختلف المتطلبات الإجرائية والنصوص الآمرة جذريًا بين مصر والسعودية والتعاملات الدولية. استخدم هذه المصفوفة لاستكشاف النقاط المحورية قبل الاستفسار.'
              : 'Procedural rules and public policy mandates vary materially between Egypt, Saudi Arabia, and cross-border ventures. Use this matrix to calibrate foundational priorities before initial consultation.'}
          </p>
        </div>

        {/* Level 1: Jurisdiction Switcher */}
        <div className="mt-12 bg-white border border-[#D5C8B5] p-3 sm:p-4 rounded-sm shadow-sm">
          <div className="text-xs font-bold text-[#3F314B] uppercase tracking-wider mb-3 px-2">
            {ar ? '01 / اختر الولاية القضائية المعنية' : '01 / Select Applicable Jurisdiction'}
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {(Object.keys(JURISDICTIONS) as JurisdictionCode[]).map(key => {
              const j = JURISDICTIONS[key];
              const isSelected = jurisdiction === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setJurisdiction(key)}
                  className={`text-start p-4 border-2 transition-all rounded-sm flex flex-col justify-between min-h-24 ${
                    isSelected
                      ? 'bg-[#251D34] border-[#251D34] text-white shadow-md'
                      : 'bg-[#FAF7F1] border-[#D5C8B5] text-[#251D34] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-sm sm:text-base">{ar ? j.labelAr : j.labelEn}</span>
                    {key === 'cross_border' ? (
                      <Globe2 size={18} className={isSelected ? 'text-[#E4CA91]' : 'text-[#775A2E]'} />
                    ) : (
                      <Landmark size={18} className={isSelected ? 'text-[#E4CA91]' : 'text-[#775A2E]'} />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 leading-relaxed ${
                      isSelected ? 'text-[#E8DDE9]' : 'text-[#3F314B]'
                    }`}
                  >
                    {ar ? j.taglineAr : j.taglineEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 2: Practice Area Tabs */}
        <div className="mt-8">
          <div className="text-xs font-bold text-[#3F314B] uppercase tracking-wider mb-3">
            {ar ? '02 / اختر المجال القانوني' : '02 / Select Practice Discipline'}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PRACTICE_SCOPES.map(s => {
              const isSelected = practice === s.key;
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setPractice(s.key)}
                  className={`p-4 border-2 text-start rounded-sm transition-all flex items-start gap-3 min-h-24 ${
                    isSelected
                      ? 'bg-[#251D34] border-[#251D34] text-white shadow-md'
                      : 'bg-white border-[#D5C8B5] text-[#251D34] hover:bg-[#FAF7F1]'
                  }`}
                >
                  <Icon
                    size={22}
                    className={`shrink-0 mt-0.5 ${isSelected ? 'text-[#E4CA91]' : 'text-[#775A2E]'}`}
                  />
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm leading-snug">
                      {ar ? s.titleAr : s.titleEn}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 3: Calibrated Strategic Output Matrix */}
        <div className="mt-8 bg-white border border-[#D5C8B5] p-6 sm:p-10 shadow-sm rounded-sm">
          {/* Header of Active Selection */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8DEC9]">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-[#FAF7F1] border border-[#D5C8B5] rounded-sm text-[#775A2E]">
                <ActiveIcon size={26} />
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#775A2E]">
                  {ar ? jurProfile.labelAr : jurProfile.labelEn}
                </span>
                <h3 className="lexora-display text-2xl sm:text-3xl font-bold text-[#251D34] mt-1">
                  {ar ? activeScope.titleAr : activeScope.titleEn}
                </h3>
              </div>
            </div>
            <Link
              href={lexoraPath(locale, `consultation?practice=${practice}&jurisdiction=${jurisdiction}`)}
              className="inline-flex items-center gap-2 bg-[#251D34] hover:bg-[#3F314B] text-white px-6 py-3 font-bold text-xs sm:text-sm rounded-sm transition-colors"
            >
              <span>{ar ? 'استفسار أولي لهذا المجال' : 'Enquire on this Discipline'}</span>
              <Arrow size={16} />
            </Link>
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Left: Core Legal Issues */}
            <div className="bg-[#FAF7F1] p-6 border border-[#E4D9C7] rounded-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#775A2E] uppercase tracking-wider mb-4">
                <FileCheck size={16} />
                <span>{ar ? 'المسائل الجوهرية ومواضع التدقيق' : 'Substantive Focus Points'}</span>
              </div>
              <ul className="space-y-3">
                {(ar ? activeScope.coreIssuesAr : activeScope.coreIssuesEn).map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-7 text-[#3F314B]">
                    <CheckCircle2 size={16} className="text-[#397D58] shrink-0 mt-1" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Diligence & Preparation Checklist */}
            <div className="bg-[#FAF7F1] p-6 border border-[#E4D9C7] rounded-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#775A2E] uppercase tracking-wider mb-4">
                <ShieldAlert size={16} />
                <span>{ar ? 'خطوات التحضير الداخلي للعميل' : 'Internal Preparation Checklist'}</span>
              </div>
              <ul className="space-y-3">
                {(ar ? activeScope.diligenceChecklistAr : activeScope.diligenceChecklistEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-7 text-[#3F314B]">
                    <span className="font-mono text-xs font-bold text-[#775A2E] bg-white px-2 py-0.5 border border-[#D5C8B5] rounded-sm shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Jurisdiction Reference Statutes */}
          <div className="mt-8 pt-6 border-t border-[#E8DEC9] grid sm:grid-cols-2 gap-6 text-xs text-[#3F314B]">
            <div>
              <span className="font-bold text-[#251D34] block mb-2">
                {ar ? 'الجهات التنظيمية والاختصاص الإداري:' : 'Competent Regulatory Bodies:'}
              </span>
              <p className="leading-6 bg-[#FAF7F1] p-3 border border-[#E4D9C7] rounded-sm">
                {ar ? jurProfile.authorityAr : jurProfile.authorityEn}
              </p>
            </div>
            <div>
              <span className="font-bold text-[#251D34] block mb-2">
                {ar ? 'مظلة التحكيم وفض النزاعات المعتمدة:' : 'Recognized Arbitration & Dispute Venue:'}
              </span>
              <p className="leading-6 bg-[#FAF7F1] p-3 border border-[#E4D9C7] rounded-sm">
                {ar ? jurProfile.arbitrationForumAr : jurProfile.arbitrationForumEn}
              </p>
            </div>
          </div>

          {/* Strict Ethics Disclaimer */}
          <div className="mt-6 p-4 bg-[#F2ECE1] border-s-4 border-[#775A2E] text-xs leading-6 text-[#3F314B] flex items-start gap-3">
            <Info size={18} className="text-[#775A2E] shrink-0 mt-0.5" />
            <span>
              {ar
                ? 'تنبيه مهني: المعلومات أعلاه للتوجيه المعرفي العام ولا تمثل رأيًا أو استشارة قانونية مخصصة لوضعك. تقديم الاستفسار الأولي لا ينشئ علاقة محامٍ وموكل أو سرية مهنية ما لم يتم فحص تعارض المصالح والتعاقد رسميًا.'
                : 'Professional Notice: The matrix above provides general orientation and does not constitute formal legal advice tailored to specific facts. Initial enquiries do not form an attorney-client relationship, representation, or privilege absent formal conflict clearance and engagement.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
