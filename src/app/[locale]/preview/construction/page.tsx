import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import Link from 'next/link';
import { getProjects, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  HardHat,
  Ruler,
  Building,
  FileCheck2,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function ConstructionHomePage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const projects = getProjects('construction', locale).slice(0, 4);
  const articles = getEditorialPosts('construction', locale).slice(0, 3);

  const servicePillars = [
    {
      id: 'fit-out',
      title: isAr ? 'تجهيزات وتشطيبات المقرات الإدارية' : 'Commercial Fit-Out & Turnkey',
      desc: isAr ? 'تنفيذ مساحات العمل والمكاتب الإدارية وفق أعلى مواصفات العزل الصوتي والشبكات والتأثيث.' : 'High-specification commercial interiors, acoustic isolation, and workspace technical infrastructure.',
      icon: Building,
      href: `/${locale}/preview/construction/services/fit-out`,
    },
    {
      id: 'structural',
      title: isAr ? 'التنفيذ الإنشائي والهياكل الخرسانية' : 'Structural & Civil Construction',
      desc: isAr ? 'إشراف وتنفيذ كامل للأعمال الإنشائية، الأساسات، والهياكل الخرسانية والمعدنية المعتمدة.' : 'Full civil engineering execution, certified concrete superstructure, and groundworks management.',
      icon: Ruler,
      href: `/${locale}/preview/construction/services/structural`,
    },
    {
      id: 'mep',
      title: isAr ? 'الأعمال الكهروميكانيكية (MEP)' : 'MEP Contracting & Systems',
      desc: isAr ? 'تخطيط وتنفيذ شبكات التكييف المركزي، مكافحة الحريق، ومحطات الكهرباء المتطورة.' : 'HVAC plant design, fire suppression, low-current distribution, and building management integration.',
      icon: Layers,
      href: `/${locale}/preview/construction/services/mep`,
    },
    {
      id: 'value-engineering',
      title: isAr ? 'الهندسة القيمية وضبط التكاليف' : 'Value Engineering & BOQ Auditing',
      desc: isAr ? 'دراسة جداول الكميات والبدائل المعتمدة لتقليل التكاليف دون المساس بجودة وكفاءة المنشأة.' : 'BOQ optimization and material qualification to reduce expenditure without compromising safety.',
      icon: FileCheck2,
      href: `/${locale}/preview/construction/services/value-engineering`,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#162327] text-white pt-16 pb-24 border-b border-stone-800 overflow-hidden" style={getSectorHeroStyle('construction')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Right Asymmetric Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800/80 border border-stone-700 rounded text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>ATLAS / PROJECT DOSSIER 2026</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white">
                {isAr ? (
                  <>المشروع القوي <span className="text-[#D26A3B]">يبدأ بتفاصيل واضحة</span> ونطاق دقيق.</>
                ) : (
                  <>Build quality <span className="text-[#D26A3B]">starts with a clear scope</span> and precise execution.</>
                )}
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {isAr
                  ? 'شركة مقاولات هندسية متكاملة تقدم حلول التصميم والتنفيذ والتجهيز الإداري والسكني بأسلوب شفاف يربط كل بند بتكلفته وجدوله الزمني الحقيقي.'
                  : 'Delivering end-to-end contracting, high-end commercial fit-outs, and civil execution through rigorous transparent milestones and zero unquantified promises.'}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/preview/construction/projects`}
                  className="bg-[#D26A3B] hover:bg-[#b85629] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>{isAr ? 'استكشف أطلس المشاريع (12 مشروع)' : 'Explore Project Atlas (12 Projects)'}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/preview/construction/request-quote`}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded border border-stone-700 flex items-center gap-2 transition-all"
                >
                  <span>{isAr ? 'طلب تسعير مناقصة' : 'Tender Scope Builder'}</span>
                </Link>
              </div>
            </div>

            {/* Vertical Project Rail (Hero Signature Feature) */}
            <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
                <span className="font-mono text-amber-400 font-bold uppercase tracking-wider">
                  {isAr ? 'مشاريع مميزة قيد التنفيذ' : 'Selected Project Reference Rail'}
                </span>
                <span className="text-stone-500 font-mono">01 — 04</span>
              </div>

              <div className="space-y-3">
                {projects.map((p, idx) => (
                  <Link
                    key={p.id}
                    href={`/${locale}/preview/construction/projects/${p.slug}`}
                    className="block p-3.5 rounded-lg bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800 transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[11px] font-mono text-amber-500 font-bold">
                        REF // 0{idx + 1}
                      </span>
                      <span className="text-[11px] text-stone-400 font-medium capitalize">
                        {p.project_type} • {p.area_m2} m²
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                      {p.summary}
                    </p>
                  </Link>
                ))}
              </div>

              <Link
                href={`/${locale}/preview/construction/projects`}
                className="block text-center text-xs font-bold text-amber-400 hover:text-amber-300 pt-2 tracking-wider uppercase"
              >
                {isAr ? 'عرض كافة مشاريع الأطلس ←' : 'View Complete Project Atlas →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="construction" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="construction" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-60 text-center px-4">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>


      {/* Signature Pillar 01: Core Service Pathways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
              ENGINEERING CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#162327] tracking-tight">
              {isAr ? 'حزم الخدمات الهندسية المتخصصة' : 'Engineered Contracting Disciplines'}
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md">
            {isAr
              ? 'كل حزمة عمل تخضع لجداول فنية محددة ومخرجات تسليم موثقة لضمان دقة التنفيذ والتسعير.'
              : 'Each service package is backed by audited deliverables, exclusions, and dedicated engineering oversight.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicePillars.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-[#F2EFE9] group-hover:bg-[#D26A3B] text-[#D26A3B] group-hover:text-white flex items-center justify-center transition-colors mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#162327] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/${locale}/preview/construction/services`}
                    className="text-[#D26A3B] font-bold flex items-center gap-1 group-hover:underline"
                  >
                    <span>{isAr ? 'تفاصيل الحزمة' : 'Package Specs'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature Pillar 02: Selected Case Studies from SQLite */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
                DEMONSTRATED WORK
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#162327] tracking-tight">
                {isAr ? 'نماذج مشروعات الأطلس المعماري' : 'Curated Case Studies'}
              </h2>
            </div>
            <Link
              href={`/${locale}/preview/construction/projects`}
              className="text-xs font-bold uppercase tracking-wider text-[#D26A3B] hover:text-[#b85629] flex items-center gap-1"
            >
              <span>{isAr ? 'تصفح كل المشاريع (12)' : 'All 12 Projects'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((p, idx) => (
              <div
                key={p.id}
                className="bg-[#F2EFE9] border border-stone-300/80 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-stone-400 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs mb-3 text-stone-500 font-mono">
                    <span className="bg-stone-200 text-stone-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {p.project_type}
                    </span>
                    <span>{p.area_m2} m²</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#162327] mb-2 group-hover:text-[#D26A3B] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {p.summary}
                  </p>

                  <div className="space-y-1.5 pt-4 border-t border-stone-300/60 text-xs text-stone-700">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {isAr ? 'عناصر التسليم المعتمدة:' : 'Key Deliverables:'}
                    </div>
                    {p.body?.deliverables?.slice(0, 3).map((d: string, dIdx: number) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D26A3B] shrink-0" />
                        <span className="capitalize">{d.replace('-', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-stone-200/60 border-t border-stone-300 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/${locale}/preview/construction/projects/${p.slug}`}
                    className="text-[#162327] hover:text-[#D26A3B] flex items-center gap-1"
                  >
                    <span>{isAr ? 'عرض ملف المشروع' : 'View Case Dossier'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/${locale}/preview/construction/request-quote?ref=${p.slug}`}
                    className="text-[#D26A3B] hover:underline text-[11px]"
                  >
                    {isAr ? 'طلب نطاق مماثل' : 'Similar Scope'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Timeline & Process Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#162327] text-white rounded-2xl p-8 sm:p-12 border border-stone-800">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">
              METHODOLOGY & QUALITY GATE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAr ? 'كيف ندير دورة حياة المشروع من الطرح حتى التسليم؟' : 'Controlled Milestone Execution Sequence'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="border-t-2 border-[#D26A3B] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 01</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'المعاينة وتدقيق الموقع' : 'Site Survey & Audit'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr ? 'فحص المحددات الإنشائية ومسارات دخول الخامات ورسم القيود المكانية بدقة.' : 'Full spatial constraints inspection, access routing analysis, and structural baseline check.'}
              </p>
            </div>

            <div className="border-t-2 border-[#D26A3B] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 02</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'إعداد جداول الكميات (BOQ)' : 'BOQ Planning & Procurement'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr ? 'توصيف بنود الأعمال، وتحديد البدائل المعتمدة مسبقًا لمنع التوقف.' : 'Material specification, pre-approved substitutes, and fixed milestone cost breakdown.'}
              </p>
            </div>

            <div className="border-t-2 border-[#D26A3B] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 03</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'التنفيذ والإشراف الهندسي' : 'Turnkey Site Execution'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr ? 'إدارة فرق العمل اليومية، ومطابقة اختبارات الجودة وعينات المواد المعتمدة.' : 'Strict supervisor oversight, QA inspection reports, and coordinate execution.'}
              </p>
            </div>

            <div className="border-t-2 border-[#D26A3B] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 04</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'الفحص والتسليم النهائي' : 'Commissioning & Handover'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr ? 'اختبار الأنظمة، تسليم كتيبات الصيانة (As-Built)، وضمان الأعمال المنفذة.' : 'Comprehensive system testing, as-built documentation delivery, and warranty handover.'}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-stone-800 flex items-center justify-between flex-wrap gap-4 text-xs">
            <span className="text-stone-400">
              {isAr ? 'اقرأ الدليل الكامل لمنهجية التنفيذ الهندسية' : 'Read the complete methodology documentation'}
            </span>
            <Link
              href={`/${locale}/preview/construction/process`}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 uppercase tracking-wider"
            >
              <span>{isAr ? 'استكشف المنهجية الكاملة' : 'View Methodology Dossier'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Journal Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-300">
          <div>
            <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
              ENGINEERING JOURNAL
            </span>
            <h2 className="text-2xl font-black text-[#162327]">
              {isAr ? 'مقالات وأفكار في المقاولات' : 'Insights & Field Perspectives'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/construction/journal`}
            className="text-xs font-bold uppercase tracking-wider text-[#D26A3B] flex items-center gap-1"
          >
            <span>{isAr ? 'كل المقالات' : 'All Articles'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/${locale}/preview/construction/journal/${a.slug}`}
              className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D26A3B] uppercase">
                  {a.category}
                </span>
                <h3 className="text-base font-bold text-[#162327] group-hover:text-[#D26A3B] transition-colors mt-2 mb-3">
                  {a.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {a.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{new Date(a.published_at).toLocaleDateString(locale)}</span>
                <span className="text-[#D26A3B] font-bold group-hover:underline flex items-center gap-1">
                  <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                  <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tender Quote Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#D26A3B] text-white rounded-2xl p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-start">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {isAr ? 'هل لديك مشروع ترغب في تقدير تكلفته ونطاق تنفيذه؟' : 'Ready to Scope Your Next Construction Project?'}
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              {isAr
                ? 'استخدم معالج تسعير المناقصات التفاعلي لتحديد المساحة والخدمات والمحددات الفنية، واستلم إيصالاً توضيحيًا مسجلاً في قاعدة البيانات.'
                : 'Use our structured tender wizard to specify approximate area, required works, and site constraints for a simulated quotation.'}
            </p>
          </div>

          <Link
            href={`/${locale}/preview/construction/request-quote`}
            className="bg-[#162327] hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            <span>{isAr ? 'ابدأ معالج التسعير الآن' : 'Launch Tender Wizard'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

