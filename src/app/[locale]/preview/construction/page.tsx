import type { Metadata } from 'next';
import { SectorDepth } from '@/components/shared/SectorDepth';
import { SectorPhoto } from '@/components/shared/SectorPhoto';
import Link from 'next/link';
import { getProjects, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { AtlasProjectExplorer } from './AtlasProjectExplorer';
import { AtlasStandardsGrid } from './AtlasStandardsGrid';
import { AtlasVisualGallery } from './AtlasVisualGallery';
import { atlasPhoto } from './media';
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
  ShieldCheck,
  Award,
  Activity,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const ar = params.locale === 'ar';
  const title = ar
    ? 'أطلس للإنشاءات الهندسية | مقاولات، تجهيزات إدارية ومقايسات مناقصات | مافكس'
    : 'Atlas Structures | General Contracting, Commercial Fit-Out & Tender Scoping | Mavvix';
  const description = ar
    ? 'استكشف أطلس للإنشاءات: هندسة الهياكل الخرسانية والمعدنية، تجهيزات المقرات الإدارية الفاخرة، معايير ضبط الجودة، ومعالج تسعير المناقصات التفاعلي.'
    : 'Explore Atlas Structures: civil concrete superstructures, corporate turnkey fit-outs, audited engineering compliance standards, and interactive tender scope configuration.';
  return {
    title,
    description,
    openGraph: { title, description, locale: ar ? 'ar_EG' : 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function ConstructionHomePage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const projects = getProjects('construction', locale).slice(0, 4);
  const articles = getEditorialPosts('construction', locale).slice(0, 3);
  const heroPhoto = atlasPhoto('tower');
  const steelPhoto = atlasPhoto('steel');

  const servicePillars = [
    {
      id: 'fit-out',
      title: isAr ? 'تجهيزات وتشطيبات المقرات الإدارية' : 'Commercial Fit-Out & Turnkey',
      desc: isAr
        ? 'تنفيذ مساحات العمل والمكاتب الإدارية وفق أعلى مواصفات العزل الصوتي والشبكات والتأثيث المعماري.'
        : 'High-specification commercial interiors, acoustic isolation STC 55+, and corporate workspace technical infrastructure.',
      icon: Building,
      href: `/${locale}/preview/construction/services/fit-out`
    },
    {
      id: 'structural',
      title: isAr ? 'التنفيذ الإنشائي والهياكل الخرسانية' : 'Structural & Civil Construction',
      desc: isAr
        ? 'إشراف وتنفيذ كامل للأعمال الإنشائية، الأساسات، والهياكل الخرسانية والمعدنية ذات البحور الواسعة.'
        : 'Full civil engineering execution, certified concrete superstructure C50/60, and certified steel erection.',
      icon: Ruler,
      href: `/${locale}/preview/construction/services/structural`
    },
    {
      id: 'mep',
      title: isAr ? 'الأعمال الكهروميكانيكية (MEP)' : 'MEP Contracting & Systems',
      desc: isAr
        ? 'تخطيط وتنفيذ شبكات التكييف المركزي، مكافحة الحريق، ومحطات الكهرباء المتطورة وأنظمة إدارة المباني (BMS).'
        : 'HVAC plant design, NFPA certified fire suppression, low-current distribution, and automated building management integration.',
      icon: Layers,
      href: `/${locale}/preview/construction/services/mep`
    },
    {
      id: 'value-engineering',
      title: isAr ? 'الهندسة القيمية وضبط التكاليف' : 'Value Engineering & BOQ Auditing',
      desc: isAr
        ? 'دراسة جداول الكميات والبدائل المعتمدة لتقليل التكاليف دون المساس بسلامة المنشأة وكفاءتها التشغيلية.'
        : 'BOQ optimization, certified material qualification, and value engineering to optimize capital outlay with zero compromise on safety.',
      icon: FileCheck2,
      href: `/${locale}/preview/construction/services/value-engineering`
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Elevated Architectural Hero Section */}
      <section className="relative bg-[#12181F] text-white pt-16 pb-20 border-b border-stone-800 overflow-hidden">
        {/* Subtle CAD Blueprint Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(217,121,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,121,53,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#192027] border border-stone-700/80 rounded text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#D97935]" />
                <span>ATLAS STRUCTURES // GENERAL CONTRACTING & FIT-OUT</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.12] text-white">
                {isAr ? (
                  <>
                    المشروع الهندسي القوي <span className="text-[#D97935]">يبدأ بنطاق دقيق</span> وتنفيذ صارم.
                  </>
                ) : (
                  <>
                    Precision contracting <span className="text-[#D97935]">begins with clear scoping</span> and zero guesswork.
                  </>
                )}
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {isAr
                  ? 'شركة مقاولات هندسية متكاملة تقدم حلول التنفيذ الإنشائي، وتجهيز المقرات الإدارية الفاخرة، والأعمال الكهروميكانيكية المتطورة بأسلوب شفاف يربط كل بند بتكلفته وجدوله الزمني الحقيقي.'
                  : 'Delivering commercial architectural contracting, certified civil superstructures, and turnkey corporate fit-outs through milestone governance, transparent BOQ tracking, and verified safety benchmarks.'}
              </p>

              {/* Verified Metrics Badge Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#161D24] p-3 rounded-xl border border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 block">{isAr ? 'مساحات منجزة' : 'BUA Executed'}</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-white">124,000+ m²</span>
                </div>
                <div className="bg-[#161D24] p-3 rounded-xl border border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 block">{isAr ? 'ساعات آمنة (LTI)' : 'Safe Hours'}</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">1.4M+ Hours (0 LTI)</span>
                </div>
                <div className="bg-[#161D24] p-3 rounded-xl border border-stone-800 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-mono text-stone-400 block">{isAr ? 'معيار الجودة' : 'QA/QC Rating'}</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-amber-400">99.8% NDT Pass</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/preview/construction/request-quote`}
                  className="bg-[#B85629] hover:bg-[#9E4320] text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                >
                  <span>{isAr ? 'بدء معالج تسعير المناقصة' : 'Launch Tender Scope Wizard'}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/preview/construction/projects`}
                  className="bg-[#192027] hover:bg-stone-800 text-stone-200 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl border border-stone-700 flex items-center gap-2 transition-all"
                >
                  <span>{isAr ? 'استعراض أطلس المشروعات' : 'Explore Project Atlas'}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Feature Box */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-[#161D24] aspect-[4/3] group shadow-2xl">
                <img
                  src={heroPhoto.url}
                  alt={isAr ? heroPhoto.ar : heroPhoto.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-4 start-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-amber-400">
                  SUPERSTRUCTURE EXECUTION
                </div>
                <div className="absolute bottom-4 start-4 end-4 space-y-1">
                  <span className="text-xs font-mono text-[#D97935] font-bold uppercase tracking-wider block">
                    ACTIVE PROJECT DOSSIER // CIVIL ENGINEERING
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {isAr ? heroPhoto.ar : heroPhoto.en}
                  </h3>
                  <p className="text-[11px] text-stone-300">
                    License: {heroPhoto.license} • {heroPhoto.author}
                  </p>
                </div>
              </div>

              {/* Quick reference rail */}
              <div className="bg-[#192027] p-4 rounded-xl border border-stone-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#D97935]/20 text-[#D97935] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">{isAr ? 'معايير الكود المعتمدة' : 'Certified Engineering Codes'}</span>
                    <span className="text-stone-400 text-[11px]">ACI 318-19 • AWS D1.1 • NFPA 101/13</span>
                  </div>
                </div>
                <Link
                  href={`/${locale}/preview/construction/process`}
                  className="text-amber-400 hover:text-amber-300 font-bold uppercase text-[11px] flex items-center gap-1"
                >
                  <span>{isAr ? 'المنهجية' : 'Methodology'}</span>
                  <Arrow className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Art Direction Photography */}
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="construction" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="construction" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-90 text-center px-4 text-stone-600">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>

      {/* Signature Feature 01: Interactive Project Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AtlasProjectExplorer locale={locale} />
      </section>

      {/* Core Engineering Disciplines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-mono font-bold text-[#D97935] uppercase tracking-widest block mb-1">
              ENGINEERING DISCIPLINES & CONTRACTING SCOPES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#12181F] tracking-tight">
              {isAr ? 'حزم الخدمات والتنفيذ الهندسي المتكامل' : 'Engineered Contracting Disciplines'}
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md">
            {isAr
              ? 'كل حزمة عمل تخضع لجداول فنية محددة ومخرجات تسليم موثقة لضمان دقة التنفيذ وضبط التكاليف.'
              : 'Each package is backed by audited deliverables, material specifications, and dedicated senior engineering oversight.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicePillars.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4F1EA] group-hover:bg-[#D97935] text-[#D97935] group-hover:text-white flex items-center justify-center transition-colors mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#12181F] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs">
                  <Link
                    href={s.href}
                    className="text-[#D97935] font-bold flex items-center gap-1 group-hover:underline"
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

      {/* Signature Feature 02: Interactive Standards & Quality Control Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AtlasStandardsGrid locale={locale} />
      </section>

      {/* Signature Feature 03: Field Visual Gallery with Self-Hosted WebP Media */}
      <AtlasVisualGallery locale={locale} />

      {/* Milestone Methodology Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12181F] text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">
              METHODOLOGY & MILESTONE SEQUENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAr ? 'كيف ندير دورة حياة المشروع من الطرح حتى التسليم؟' : 'Controlled Milestone Execution Sequence'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="border-t-2 border-[#D97935] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 01</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'المعاينة وتدقيق الموقع' : 'Site Survey & Audit'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr
                  ? 'فحص المحددات الإنشائية ومسارات دخول الخامات ورسم القيود المكانية بدقة مع فحص التربة الجيوتقني.'
                  : 'Spatial constraints inspection, access routing analysis, and geotechnical baseline review.'}
              </p>
            </div>

            <div className="border-t-2 border-[#D97935] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 02</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'إعداد جداول الكميات (BOQ)' : 'BOQ Planning & Procurement'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr
                  ? 'توصيف بنود الأعمال، وتحديد البدائل المعتمدة مسبقًا، وتأمين سلاسل التوريد لضمان استقرار الأسعار.'
                  : 'Material specification, pre-approved value-engineering substitutes, and milestone cost breakdown.'}
              </p>
            </div>

            <div className="border-t-2 border-[#D97935] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 03</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'التنفيذ والإشراف الهندسي' : 'Turnkey Site Execution'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr
                  ? 'إدارة فرق العمل اليومية، ومطابقة اختبارات الجودة وعينات المواد المعتمدة عبر تقارير WIR الرسمية.'
                  : 'Strict supervisor oversight, QA inspection reports, and coordinate execution across civil & MEP trades.'}
              </p>
            </div>

            <div className="border-t-2 border-[#D97935] pt-4 space-y-2">
              <span className="font-mono text-amber-400 font-bold">PHASE 04</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'الفحص والتسليم النهائي' : 'Commissioning & Handover'}</h4>
              <p className="text-stone-400 leading-relaxed">
                {isAr
                  ? 'اختبار الأنظمة، تسليم كتيبات الصيانة (As-Built)، إصدار شهادات الدفاع المدني وضمان الأعمال.'
                  : 'Comprehensive system testing, as-built documentation delivery, and formal warranty handover.'}
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
            <span className="text-xs font-mono font-bold text-[#D97935] uppercase tracking-widest block mb-1">
              ENGINEERING JOURNAL
            </span>
            <h2 className="text-2xl font-black text-[#12181F]">
              {isAr ? 'مقالات وأفكار في المقاولات والهندسة' : 'Field Perspectives & Technical Insights'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/construction/journal`}
            className="text-xs font-bold uppercase tracking-wider text-[#D97935] flex items-center gap-1 hover:underline"
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
              className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D97935] uppercase">
                  {a.category}
                </span>
                <h3 className="text-base font-bold text-[#12181F] group-hover:text-[#D97935] transition-colors mt-2 mb-3">
                  {a.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {a.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span>{new Date(a.published_at).toLocaleDateString(locale)}</span>
                <span className="text-[#D97935] font-bold group-hover:underline flex items-center gap-1">
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
        <div className="bg-[#12181F] text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          <div className="space-y-3 max-w-2xl text-center lg:text-start relative z-10">
            <span className="text-xs font-mono font-bold text-[#D97935] uppercase tracking-wider block">
              INSTANT TENDER ESTIMATOR // SQLITE PERSISTED
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {isAr ? 'هل لديك مشروع ترغب في تقدير تكلفته ونطاق تنفيذه؟' : 'Ready to Scope Your Next Construction Project?'}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {isAr
                ? 'استخدم معالج تسعير المناقصات التفاعلي لتحديد المساحة والخدمات والمحددات الفنية، واستلم إيصالاً توضيحيًا مسجلاً في قاعدة البيانات مع كود مرجعي قابل للتتبع.'
                : 'Use our structured tender wizard to specify approximate area, required works, and site constraints for a simulated quotation registered directly in SQLite.'}
            </p>
          </div>

          <Link
            href={`/${locale}/preview/construction/request-quote`}
            className="bg-[#B85629] hover:bg-[#9E4320] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2 relative z-10"
          >
            <span>{isAr ? 'ابدأ معالج التسعير الآن' : 'Launch Tender Wizard'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <SectorDepth sector="construction" locale={locale} />
    </div>
  );
}
