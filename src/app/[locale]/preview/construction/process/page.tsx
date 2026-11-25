import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  FileCheck2,
  HardHat,
  Ruler,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function ConstructionProcessPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const phases = [
    {
      num: '01',
      title: isAr ? 'المعاينة الهندسية وتحديد المحددات' : 'Site Survey & Boundary Inspection',
      lead: isAr ? 'فحص الموقع القائم، فحص التربة، مسارات التغذية والكهرباء، وتوثيق القيود التنظيمية.' : 'Comprehensive topographic audit, structural constraints assessment, and municipal utility validation.',
      deliverables: isAr
        ? ['تقرير المسح الطبوغرافي', 'مخطط مسارات حركة المعدات والتفريغ', 'تقرير المخاطر المكانية والإنشائية']
        : ['Topographic survey report', 'Site logistics & equipment routing diagram', 'Structural baseline & hazard register'],
      duration: isAr ? '3 — 7 أيام عمل' : '3 — 7 business days'
    },
    {
      num: '02',
      title: isAr ? 'إعداد جداول الكميات (BOQ) والمواصفات' : 'BOQ Formulation & Value Engineering',
      lead: isAr ? 'تفكيك بنود الأعمال وحساب الكميات بدقة، وربطها بالموردين وتحديد عينات المواد المعتمدة مسبقًا.' : 'Itemized quantity take-offs, commercial vendor qualification, and approved material schedule.',
      deliverables: isAr
        ? ['جدول الكميات الهندسي الموحد (BOQ)', 'كتيب المواصفات الفنية المعتمدة', 'جدول التدفقات النقدية المتوقعة للمشروع']
        : ['Unified Bill of Quantities (BOQ)', 'Approved technical material specs', 'Project milestone cash flow schedule'],
      duration: isAr ? '7 — 14 يوم عمل' : '7 — 14 business days'
    },
    {
      num: '03',
      title: isAr ? 'التوريد وإدارة سلاسل الإمداد المسبقة' : 'Procurement & Critical Path Sourcing',
      lead: isAr ? 'التعاقد المبكر على الخامات الحرجة وتوريدها لمستودعات مؤمنة لمنع تقلبات الأسعار أو تأخر الجدول.' : 'Pre-purchasing critical path materials to hedge price fluctuations and guarantee timely site arrival.',
      deliverables: isAr
        ? ['شهادات اعتماد المواد وتاريخ الإنتاج', 'سجل فحص العينات المطابقة للمواصفات', 'إذن دخول وتخزين الخامات بالموقع']
        : ['Material mill test certificates', 'Approved physical sample board register', 'Site storage & gate access permits'],
      duration: isAr ? 'مستمر طوال فترة المشروع' : 'Continuous milestone tracking'
    },
    {
      num: '04',
      title: isAr ? 'التنفيذ الإنشائي والرقابة اليومية' : 'Turnkey Site Execution & Supervision',
      lead: isAr ? 'إشراف هندسي يومي، ومراقبة نسب الإنجاز وفق المخطط الزمني، واختبارات الجودة المرحلية الصارمة.' : 'Daily on-site engineering oversight, quality hold-point inspections, and milestone progress logging.',
      deliverables: isAr
        ? ['تقارير الجودة اليومية والأسبوعية', 'سجلات اختبار مقاومة الخرسانة واللحامات', 'محاضر تسليم مراحل الأعمال الاستشارية']
        : ['Daily/weekly QA supervisor logs', 'Certified concrete & weld test records', 'Consultant phase approval sign-offs'],
      duration: isAr ? 'وفق حجم ونطاق المشروع' : 'Dependent on project scope'
    },
    {
      num: '05',
      title: isAr ? 'الفحص والتشغيل والتسليم النهائي' : 'Commissioning, Testing & As-Built Handover',
      lead: isAr ? 'تشغيل وتوازن الأنظمة الكهروميكانيكية، اختبارات تسريب العزل، وتسليم الرسومات التنفيذية الفعلية.' : 'Complete MEP system balancing, hydrostatic testing, and full handover of as-built architectural drawings.',
      deliverables: isAr
        ? ['المخططات التنفيذية الفعلية (As-Built Drawings)', 'كتيبات التشغيل والصيانة (O&M Manuals)', 'شهادات الضمان الصريح للأعمال المنفذة']
        : ['Full as-built CAD/BIM drawing set', 'Operation & maintenance (O&M) manuals', 'Explicit commercial contractor warranties'],
      duration: isAr ? '10 — 20 يوم عمل' : '10 — 20 business days'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
          EXECUTION DISCIPLINE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight">
          {isAr ? 'منهجية إدارة وتنفيذ المشروعات' : 'Project Methodology & Quality Gates'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'سلسلة واضحة من المراحل الهندسية المترابطة؛ لا ننتقل من مرحلة إلى التالية إلا بعد اعتماد مخرجات التسليم ومطابقتها للمقايسة.'
            : 'A transparent five-stage engineering governance protocol ensuring no critical step proceeds without certified milestone validation.'}
        </p>
      </div>

      {/* Downloadable Demo Artifact Sheet Notice */}
      <div className="bg-[#162327] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {isAr ? 'قائمة التحقق الهندسية للتسعير والمناقصات (DEMO Checklist)' : 'Tender Scoping & BOQ Checklist (DEMO Sheet)'}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isAr
                ? 'نموذج جدول المقايسة التوضيحي المعتمد لدى أطلس للبناء لحساب كميات الأعمال وتحديد المخاطر.'
                : 'Sample illustrative contractor scoping sheet detailing required inputs before final rate submission.'}
            </p>
          </div>
        </div>

        <Link
          href={`/${locale}/preview/construction/request-quote`}
          className="bg-[#D26A3B] hover:bg-[#b85629] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 shrink-0 uppercase tracking-wider"
        >
          <Download className="w-4 h-4" />
          <span>{isAr ? 'تطبيق عملي في المعالج' : 'Interactive Scope Wizard'}</span>
        </Link>
      </div>

      {/* Methodology Phases Sequence */}
      <div className="space-y-6">
        {phases.map((p) => (
          <div
            key={p.num}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm flex flex-col lg:flex-row items-start justify-between gap-8 hover:border-stone-400 transition-all"
          >
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[#162327] text-amber-400 font-mono font-black text-sm flex items-center justify-center">
                  {p.num}
                </span>
                <h3 className="text-xl font-bold text-[#162327]">
                  {p.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {p.lead}
              </p>

              <div className="inline-block bg-stone-100 text-stone-700 px-3 py-1 rounded text-xs font-mono font-medium">
                ⏱ {isAr ? 'المدة التقديرية:' : 'Typical Duration:'} {p.duration}
              </div>
            </div>

            {/* Deliverables Checklist Column */}
            <div className="w-full lg:w-80 bg-[#F2EFE9] border border-stone-300/80 rounded-xl p-5 space-y-3 shrink-0">
              <span className="text-[11px] font-mono font-bold text-[#D26A3B] uppercase tracking-wider block">
                {isAr ? 'مخرجات التسليم المعتمدة:' : 'Milestone Deliverables:'}
              </span>
              <ul className="space-y-2 text-xs text-stone-700">
                {p.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D26A3B] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-stone-300">
        <h3 className="text-xl font-bold text-[#162327] mb-3">
          {isAr ? 'هل تريد تطبيق هذه المنهجية على مشروعك؟' : 'Ready to Structure Your Project Milestones?'}
        </h3>
        <Link
          href={`/${locale}/preview/construction/request-quote`}
          className="inline-flex items-center gap-2 bg-[#D26A3B] hover:bg-[#b85629] text-white text-xs font-bold px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-sm transition-all"
        >
          <span>{isAr ? 'ابدأ معالج المناقصات والتسعير' : 'Start Tender Scope Builder'}</span>
          <Arrow className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

