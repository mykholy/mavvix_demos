'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Calculator,
  FileSpreadsheet,
  Layers,
  RefreshCcw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Calendar,
  Building2,
  FileCheck2,
  PieChart
} from 'lucide-react';
import Link from 'next/link';
import { ledgerPath } from '@/lib/verticals/accounting/data';

interface EngagementPathway {
  slug: string;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  summary: { ar: string; en: string };
  primaryObjective: { ar: string; en: string };
  deliverables: { ar: string; en: string }[];
  governanceControls: { ar: string; en: string }[];
  baseCycleDays: number;
}

const ENGAGEMENT_PATHWAYS: readonly EngagementPathway[] = [
  {
    slug: 'bookkeeping',
    title: { ar: 'مسك الدفاتر والتسويات الشهرية', en: 'Monthly Bookkeeping & Reconciliations' },
    category: { ar: 'العمليات الأساسية', en: 'Core Operations' },
    summary: {
      ar: 'تسجيل الفواتير والمصروفات بدقة وفق دليل حسابات موحد مع تسوية دورية للمصارف والموردين.',
      en: 'Systematic transaction entry, chart-of-accounts discipline, and periodic bank/vendor reconciliations.'
    },
    primaryObjective: {
      ar: 'إقفال شهري منضبط يضمن خلو السجلات من المعاملات المعلقة أو غير المصنفة.',
      en: 'Disciplined monthly close ensuring zero unclassified transactions or unmapped ledger entries.'
    },
    deliverables: [
      { ar: 'ميزان مراجعة شهري متطابق', en: 'Reconciled monthly trial balance' },
      { ar: 'كشف تسوية البنك وحصر الفروقات', en: 'Bank reconciliation exception statement' },
      { ar: 'سجل المبيعات والمشتريات المفصل', en: 'Granular sales & purchases ledger' }
    ],
    governanceControls: [
      { ar: 'مطابقة المستند المصدر لكل قيد', en: 'Source document matched to every posting' },
      { ar: 'فصل صلاحيات التسجيل عن الاعتماد', en: 'Segregation of data entry and approval' }
    ],
    baseCycleDays: 4
  },
  {
    slug: 'controller',
    title: { ar: 'الإدارة المالية واستشارات التقارير', en: 'Financial Controller Advisory' },
    category: { ar: 'الرؤية الاستراتيجية', en: 'Strategic Insights' },
    summary: {
      ar: 'تحويل الأرقام الصامتة إلى لوحات قياس مالية وتقارير أداء تدعم اتخاذ قرارات التوسع والسيولة.',
      en: 'Transforming ledger data into executive KPI dashboards, cashflow runway forecasts, and margin analysis.'
    },
    primaryObjective: {
      ar: 'تمكين الإدارة من فهم ربحية القطاعات وتدفقات رأس المال العامل دون مفاجآت.',
      en: 'Empowering executive leadership with segment margins and working capital projections.'
    },
    deliverables: [
      { ar: 'حزمة التقارير الإدارية الشهرية (P&L, Cash Flow)', en: 'Monthly executive reporting deck (P&L, Cash Flow)' },
      { ar: 'تحليل الانحرافات عن الموازنة التقديرية', en: 'Budget variance & sensitivity analysis' },
      { ar: 'مؤشرات كفاءة رأس المال العامل', en: 'Working capital health metrics' }
    ],
    governanceControls: [
      { ar: 'تعريف موحد للمصطلحات والمؤشرات', en: 'Standardized KPI definitions across departments' },
      { ar: 'مراجعة دورية لسياسات الاعتراف بالإيراد', en: 'Periodic revenue recognition policy reviews' }
    ],
    baseCycleDays: 6
  },
  {
    slug: 'payroll',
    title: { ar: 'سجلات الرواتب والدعم النظامي', en: 'Payroll Accounting & Regulatory Support' },
    category: { ar: 'الامتثال التشغيلي', en: 'Operational Compliance' },
    summary: {
      ar: 'احتساب المستحقات والبدلات والخصومات ومطابقة مسيرات الرواتب تحت أعلى معايير الخصوصية.',
      en: 'Accrual calculations, statutory deductions, payroll journals, and strict confidentiality protocols.'
    },
    primaryObjective: {
      ar: 'ضمان دقة مسيرات الرواتب وتسويتها محاسبيًا مع الالتزام باللوائح والأنظمة العمالية السارية.',
      en: 'Ensuring flawless payroll ledger reconciliations aligned with statutory employment requirements.'
    },
    deliverables: [
      { ar: 'قيود استحقاق الرواتب والتأمينات', en: 'Accrual journal vouchers & social insurance entries' },
      { ar: 'ملف تسوية مخصصات نهاية الخدمة والإجازات', en: 'End-of-service and leave provision reconciliations' },
      { ar: 'مطابقة تحويلات الرواتب مع كشف الحساب', en: 'Salary disbursement bank match verification' }
    ],
    governanceControls: [
      { ar: 'تشفير بيانات الموظفين وسرية الرواتب', en: 'Encrypted employee data & restricted wage access' },
      { ar: 'توثيق موافقات مدراء الأقسام قبل الصرف', en: 'Departmental sign-offs prior to journal posting' }
    ],
    baseCycleDays: 3
  },
  {
    slug: 'audit-prep',
    title: { ar: 'جاهزية ملفات التدقيق السنوي', en: 'Year-End Audit Readiness & File Prep' },
    category: { ar: 'حوكمة والتزام', en: 'Governance & Assurance' },
    summary: {
      ar: 'إعداد الجداول التحليلية وتوثيق أدلة الإثبات لتسهيل مهمة المحاسب القانوني المستقل.',
      en: 'Curating audit workpapers, lead schedules, and corroborating evidence for independent statutory auditors.'
    },
    primaryObjective: {
      ar: 'تقليص وقت المراجعة الخارجية ومنع الملاحظات الجوهرية من خلال ملف تدقيق مكتمل الأركان.',
      en: 'Minimizing external audit friction and material adjustments via organized audit packs.'
    },
    deliverables: [
      { ar: 'ملف التدقيق السنوي الشامل (Audit Pack)', en: 'Comprehensive PBC (Provided by Client) audit binder' },
      { ar: 'جداول تحليلات الأصول الثابتة والإهلاك', en: 'Fixed asset register & depreciation schedules' },
      { ar: 'مصادقات الأرصدة البنكية والعملاء والموردين', en: 'Third-party confirmation log & circularization status' }
    ],
    governanceControls: [
      { ar: 'أرشفة رقمية منظمة ومفهرسة للمستندات', en: 'Indexed digital document provenance archiving' },
      { ar: 'توثيق سياسات الجرد وتقييم المخزون', en: 'Documented inventory observation & valuation rules' }
    ],
    baseCycleDays: 8
  }
];

export function LedgerScopeCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [pathwaySlug, setPathwaySlug] = useState<string>('bookkeeping');
  const [entityType, setEntityType] = useState<string>('sme');
  const [volumeBand, setVolumeBand] = useState<string>('50-200');
  const [cadence, setCadence] = useState<string>('monthly');
  const [currentSystem, setCurrentSystem] = useState<string>('spreadsheets');

  const currentPathway = ENGAGEMENT_PATHWAYS.find((p) => p.slug === pathwaySlug) || ENGAGEMENT_PATHWAYS[0];

  // Dynamic calculations based on operational variables
  const volumeMultiplier = volumeBand === 'under-50' ? 0.8 : volumeBand === '50-200' ? 1.0 : volumeBand === '201-1000' ? 1.4 : 1.9;
  const systemBuffer = currentSystem === 'erp' ? 0.9 : currentSystem === 'accounting-platform' ? 1.0 : currentSystem === 'spreadsheets' ? 1.3 : 1.5;
  const estimatedDays = Math.max(2, Math.round(currentPathway.baseCycleDays * volumeMultiplier * systemBuffer));

  return (
    <section
      data-sector-specific="ledger-scope-calibrator"
      className="py-20 sm:py-28 bg-[#142B37] text-white relative overflow-hidden"
    >
      <div
        className="absolute -start-32 -bottom-32 w-96 h-96 rounded-full bg-[#15858C]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute end-0 top-0 w-80 h-80 rounded-full bg-[#50C2C3]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[#65D4D2] text-xs font-bold tracking-[.2em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#65D4D2]" />
            {ar ? 'معاير نطاق الأعمال المحاسبية' : 'ACCOUNTING SCOPE CALIBRATOR'}
          </p>
          <h2 className="ledger-display font-black text-3xl sm:text-5xl mt-5 leading-tight text-white">
            {ar ? (
              <>
                حدّد نطاق عملك بدقة. <span className="text-[#65D4D2]">بشفافية ودون تعقيد.</span>
              </>
            ) : (
              <>
                Calibrate Your Accounting Scope. <span className="text-[#65D4D2]">Clarity First.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#C7DADB] text-sm sm:text-base leading-8">
            {ar
              ? 'اختر مسار الخدمة وحدّد حجم المعاملات ونوع المنشأة لتقدير دورة الإقفال الشهرية، متطلبات التوثيق، وضوابط الحوكمة الملائمة لنشاطك التجاري.'
              : 'Select an engagement pathway, volume band, and system maturity to project close cycles, document readiness, and essential governance controls.'}
          </p>
        </div>

        {/* 4 Pathway Selector Pills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {ENGAGEMENT_PATHWAYS.map((path) => {
            const active = path.slug === pathwaySlug;
            return (
              <button
                key={path.slug}
                type="button"
                onClick={() => setPathwaySlug(path.slug)}
                className={`p-5 text-start transition-all border ${
                  active
                    ? 'bg-[#1C3343] border-[#50C2C3] shadow-[0_8px_25px_rgba(80,194,195,0.15)] ring-1 ring-[#50C2C3]'
                    : 'bg-[#18313F]/60 border-[#2D4A59] hover:bg-[#1C3343] hover:border-[#4A6B7C]'
                }`}
              >
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7EE3DF] block mb-2 font-bold">
                  {path.category[locale]}
                </span>
                <p className="font-bold text-base text-white leading-snug">{path.title[locale]}</p>
                <p className="text-xs text-[#A2C2C8] mt-3 line-clamp-2 leading-relaxed">{path.summary[locale]}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Calibrator Grid */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8">
          {/* Controls Form */}
          <div className="bg-[#1C3343] border border-[#2D4A59] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2D4A59]">
              <Sliders size={20} className="text-[#65D4D2]" />
              <h3 className="font-bold text-lg text-white">
                {ar ? 'المحددات التشغيلية للمنشأة' : 'Operational Scope Parameters'}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="calibrator-entity-type"
                  className="block text-xs font-bold text-[#A2C2C8] mb-2 uppercase tracking-wider"
                >
                  {ar ? 'فئة المنشأة القانونية' : 'Legal Entity Type'}
                </label>
                <select
                  id="calibrator-entity-type"
                  aria-label={ar ? 'فئة المنشأة القانونية' : 'Legal Entity Type'}
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className="w-full bg-[#142B37] border border-[#3A5D6E] text-white p-3.5 text-sm focus-visible:outline-2 focus-visible:outline-[#50C2C3]"
                >
                  <option value="sole-proprietor">{ar ? 'منشأة فردية' : 'Sole Proprietorship'}</option>
                  <option value="startup">{ar ? 'شركة ناشئة تقنية' : 'Startup / Scale-up'}</option>
                  <option value="sme">{ar ? 'شركة تجارية صغيرة أو متوسطة' : 'SME Commercial Enterprise'}</option>
                  <option value="professional-services">
                    {ar ? 'مكتب مهني / استشاري' : 'Professional Services Practice'}
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calibrator-volume-band"
                  className="block text-xs font-bold text-[#A2C2C8] mb-2 uppercase tracking-wider"
                >
                  {ar ? 'حجم الفواتير والمعاملات شهريًا' : 'Monthly Transaction Volume'}
                </label>
                <select
                  id="calibrator-volume-band"
                  aria-label={ar ? 'حجم الفواتير والمعاملات شهريًا' : 'Monthly Transaction Volume'}
                  value={volumeBand}
                  onChange={(e) => setVolumeBand(e.target.value)}
                  className="w-full bg-[#142B37] border border-[#3A5D6E] text-white p-3.5 text-sm focus-visible:outline-2 focus-visible:outline-[#50C2C3]"
                >
                  <option value="under-50">{ar ? 'أقل من 50 حركة / فاتورة' : 'Under 50 transactions'}</option>
                  <option value="50-200">{ar ? '50 إلى 200 حركة / فاتورة' : '50–200 transactions'}</option>
                  <option value="201-1000">{ar ? '201 إلى 1,000 حركة / فاتورة' : '201–1,000 transactions'}</option>
                  <option value="over-1000">{ar ? 'أكثر من 1,000 حركة / فاتورة' : 'More than 1,000 transactions'}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calibrator-cadence"
                  className="block text-xs font-bold text-[#A2C2C8] mb-2 uppercase tracking-wider"
                >
                  {ar ? 'دورية التسليم والمراجعة' : 'Review & Reporting Cadence'}
                </label>
                <select
                  id="calibrator-cadence"
                  aria-label={ar ? 'دورية التسليم والمراجعة' : 'Review & Reporting Cadence'}
                  value={cadence}
                  onChange={(e) => setCadence(e.target.value)}
                  className="w-full bg-[#142B37] border border-[#3A5D6E] text-white p-3.5 text-sm focus-visible:outline-2 focus-visible:outline-[#50C2C3]"
                >
                  <option value="monthly">{ar ? 'دورة شهرية منتظمة' : 'Monthly Recurring Close'}</option>
                  <option value="quarterly">{ar ? 'مراجعة ربع سنوية' : 'Quarterly Milestone Review'}</option>
                  <option value="one-time">{ar ? 'مشروع مراجعة محدد لمرة واحدة' : 'One-off Special Scope Project'}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calibrator-system"
                  className="block text-xs font-bold text-[#A2C2C8] mb-2 uppercase tracking-wider"
                >
                  {ar ? 'بيئة التسجيل المحاسبي الحالية' : 'Current Record Keeping'}
                </label>
                <select
                  id="calibrator-system"
                  aria-label={ar ? 'بيئة التسجيل المحاسبي الحالية' : 'Current Record Keeping'}
                  value={currentSystem}
                  onChange={(e) => setCurrentSystem(e.target.value)}
                  className="w-full bg-[#142B37] border border-[#3A5D6E] text-white p-3.5 text-sm focus-visible:outline-2 focus-visible:outline-[#50C2C3]"
                >
                  <option value="spreadsheets">{ar ? 'جداول Excel أو Sheets' : 'Spreadsheets (Excel/Sheets)'}</option>
                  <option value="accounting-platform">{ar ? 'برنامج محاسبة سحابي' : 'Cloud Accounting Platform'}</option>
                  <option value="erp">{ar ? 'نظام ERP متكامل' : 'Integrated ERP System'}</option>
                  <option value="not-started">{ar ? 'لم نبدأ بعد / سجلات ورقية' : 'Not setup / Paper records'}</option>
                </select>
              </div>
            </div>

            {/* Target Objectives & Primary Focus */}
            <div className="bg-[#142B37] p-5 border border-[#274554]">
              <p className="text-xs uppercase font-mono tracking-widest text-[#65D4D2] font-bold">
                {ar ? 'الهدف المحوري لهذا المسار' : 'PRIMARY STRATEGIC OBJECTIVE'}
              </p>
              <p className="mt-2 text-sm text-[#D5E4E7] leading-relaxed">
                {currentPathway.primaryObjective[locale]}
              </p>
            </div>

            {/* Key Deliverables */}
            <div>
              <p className="text-xs font-bold text-[#A2C2C8] uppercase tracking-wider mb-3">
                {ar ? 'المخرجات والتقارير المستهدفة' : 'Core Deliverable Artifacts'}
              </p>
              <ul className="space-y-2">
                {currentPathway.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#D5E4E7]">
                    <CheckCircle2 size={16} className="text-[#65D4D2] shrink-0 mt-0.5" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projection Card */}
          <div className="bg-[#18313F] border border-[#2D4A59] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2D4A59]">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#65D4D2] font-bold block">
                    {ar ? 'تقدير المؤشرات التشغيلية' : 'OPERATIONAL ESTIMATES'}
                  </span>
                  <h4 className="font-bold text-xl text-white mt-1">{currentPathway.title[locale]}</h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1C3343] border border-[#3A5D6E] flex items-center justify-center text-[#65D4D2]">
                  <Calculator size={22} />
                </div>
              </div>

              {/* Stat metric */}
              <div className="my-6 p-6 bg-[#142B37] border border-[#274554] text-center">
                <p className="text-xs font-mono uppercase tracking-widest text-[#A2C2C8]">
                  {ar ? 'المدة التقديرية لدورة الإقفال والمراجعة' : 'Estimated Close & Review Window'}
                </p>
                <p className="text-4xl sm:text-5xl font-black text-[#65D4D2] mt-3 font-mono">
                  {estimatedDays}{' '}
                  <span className="text-base font-normal text-white">
                    {ar ? 'أيام عمل' : 'business days'}
                  </span>
                </p>
                <p className="text-xs text-[#8BA8B0] mt-2">
                  {ar
                    ? 'تبدأ بعد اكتمال استلام المستندات المصدرية وكشوف الحساب المطابقة'
                    : 'Commences upon receipt of complete source vouchers and bank statements'}
                </p>
              </div>

              {/* Essential Governance Controls */}
              <div>
                <p className="text-xs font-bold text-[#A2C2C8] uppercase tracking-wider mb-3">
                  {ar ? 'ضوابط الرقابة والحوكمة المقترحة' : 'Essential Governance Controls'}
                </p>
                <div className="space-y-3">
                  {currentPathway.governanceControls.map((ctrl, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-[#142B37] border border-[#254250] flex items-center gap-3 text-xs text-[#D5E4E7]"
                    >
                      <ShieldCheck size={18} className="text-[#65D4D2] shrink-0" />
                      <span>{ctrl[locale]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA and Disclaimer */}
            <div className="mt-8 pt-6 border-t border-[#2D4A59]">
              <Link
                href={ledgerPath(locale, 'quote')}
                className="w-full py-4 px-6 bg-[#6FD9D6] text-[#142B37] font-black text-sm inline-flex items-center justify-center gap-3 hover:bg-[#85E2DF] transition-colors"
              >
                <span>{ar ? 'جهّز استفسار نطاق العمل المحاسبي' : 'Request Tailored Scope Brief'}</span>
                <Arrow size={18} />
              </Link>

              {/* Strict Non-Binding Regulatory Caveat */}
              <div className="mt-4 flex items-start gap-2 text-xs text-[#8BA8B0] leading-relaxed">
                <AlertCircle size={15} className="text-[#65D4D2] shrink-0 mt-0.5" />
                <span>
                  {ar
                    ? 'أداة توضيحية لتقدير نطاق العمل فقط، ولا تعد استشارة ضريبية أو تدقيقًا قانونيًا معتمدًا أو عرض أسعار ملزمًا.'
                    : 'Illustrative accounting scope calibration only; does not constitute a certified public audit, tax advice, or fee quote.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
