import type { Metadata } from 'next';
import { SectorDepth } from '@/components/shared/SectorDepth';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getProjects, getPortfolioServices, getEditorialPosts } from '@/lib/db/repositories';
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { PortfolioScopeCalibrator } from './PortfolioScopeCalibrator';
import { PortfolioDesignDisciplines } from './PortfolioDesignDisciplines';
import { PortfolioVisualGallery } from './PortfolioVisualGallery';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const ar = params.locale === 'ar';
  const title = ar ? "سلمى حسن ستوديو | إدارة إبداعية وتصميم أنظمة | مافكس" : "Salma Hassan Studio | Creative Direction & Design Systems | Mavvix";
  const description = ar ? "استوديو تصميم استشاري مستقل يجمع بين الصرامة السويسرية واللغة البصرية المعاصرة، مع دراسات حالة متعمقة وأداة لمعايرة نطاق المشاريع." : "Independent creative practice engineering complex brand identity systems, dual-script editorial typography, and modular design tokens.";
  return {
    title,
    description,
    openGraph: { title, description, locale: ar ? 'ar_EG' : 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function PortfolioHomePage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const cases = getProjects('portfolio', locale);
  const services = getPortfolioServices(locale);
  const articles = getEditorialPosts('portfolio', locale);

  const flagshipCases = cases.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Swiss Editorial Hero */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E2E0D8]" style={getSectorHeroStyle('portfolio')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#57544C]">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EAE8E1] border border-[#DDD9CE] text-[#0F0F10] uppercase tracking-widest font-bold">
              {isAr ? 'استوديو تصميم مستقل' : 'Independent Creative Practice'}
            </span>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7CA200] ring-4 ring-[#7CA200]/20" />
              <span className="font-medium text-[#0F0F10]">{isAr ? 'متاح للتعاقدات المختارة (Q2/Q3)' : 'Available for select engagements (Q2/Q3)'}</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0F0F10] leading-[1.08] max-w-5xl">
            {isAr
              ? 'نبني لغات بصرية رصينة، ومنصات رقمية تجمع بين الصرامة السويسرية والروح المعاصرة.'
              : 'Architecting authoritative brand languages and digital platforms rooted in editorial restraint.'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-end">
            <p className="md:col-span-8 text-sm sm:text-base text-[#57544C] leading-relaxed max-w-2xl font-sans">
              {isAr
                ? 'استوديو سلمى حسن يتعاون مع رواد الأعمال الطموحين والمؤسسات الثقافية لبلورة الاستراتيجيات المعقدة إلى هويات بصرية لا تقبل المساومة، وأنظمة طباعية متجاوبة، ومنتجات رقمية ملموسة الحضور.'
                : 'Salma Hassan Studio collaborates with forward-looking founders and institutions to crystallize intricate business strategies into uncompromising visual identities, responsive typography systems, and tactile digital products.'}
            </p>

            <div className="md:col-span-4 flex flex-wrap items-center gap-4 md:justify-end">
              <Link
                href={`/${locale}/preview/portfolio/contact`}
                className="px-6 py-3.5 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-white text-xs font-mono font-semibold transition-all shadow-md flex items-center gap-2"
                aria-label={isAr ? 'بدء نقاش المشروع' : 'Initiate project brief'}
              >
                <span>{isAr ? 'بدء نقاش المشروع' : 'Initiate Project Brief'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#CCFF00]" />
              </Link>
              <Link
                href={`/${locale}/preview/portfolio/work`}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#EAE8E1] text-[#0F0F10] border border-[#D5D1C5] text-xs font-mono font-semibold transition-colors flex items-center gap-2"
                aria-label={isAr ? 'استعراض كافة الأعمال' : 'View all 12 projects'}
              >
                <span>{isAr ? 'استعراض الأعمال (12)' : 'View Work (12)'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Atelier & Provenance Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioVisualGallery locale={locale} />
      </div>

      {/* Flagship Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" aria-labelledby="flagship-cases-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
              {isAr ? 'دراسات الحالة المميزة' : 'Selected Case Studies'}
            </span>
            <h2 id="flagship-cases-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#0F0F10] mt-2">
              {isAr ? 'مشاريع تمثل عمق المنهجية والقرارات التصميمية' : 'Demonstrated Depth & Decision Rationale'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/portfolio/work`}
            className="font-mono text-xs font-semibold text-[#0F0F10] hover:text-[#737068] inline-flex items-center gap-1.5"
            aria-label={isAr ? 'استعراض كافة المشاريع الاثني عشر' : 'View all 12 case studies'}
          >
            <span>{isAr ? 'جميع المشاريع (12)' : 'All 12 Projects'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {flagshipCases.map((c, idx) => (
            <article
              key={c.id}
              className="group bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 hover:border-[#0F0F10] hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase text-[#0F0F10] bg-[#F6F5F2] px-2.5 py-1 rounded-md border border-[#E2E0D8] font-bold">
                    {c.project_type || 'Branding'}
                  </span>
                  <span className="text-[#57544C] font-semibold">2025</span>
                </div>

                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#ECEAE3] to-[#DAD6CA] border border-[#DDD9CE] p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
                  <span className="font-mono text-xs text-[#57544C] uppercase tracking-widest font-bold">
                    Case #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0F10] block mb-1">
                      {c.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#57544C] font-medium">
                      ID: {c.slug}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed line-clamp-3">
                  {c.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#57544C]">
                  {isAr ? 'سرد تفصيلي للقرارات والمخرجات' : 'Decision Rationale & Deliverables'}
                </span>
                <Link
                  href={`/${locale}/preview/portfolio/work/${c.slug}`}
                  className="font-mono text-xs font-bold text-[#0F0F10] hover:text-[#57544C] inline-flex items-center gap-1"
                  aria-label={isAr ? `قراءة دراسة حالة ${c.title}` : `Read case study ${c.title}`}
                >
                  <span>{isAr ? 'قراءة دراسة الحالة' : 'Read Case Study'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0F0F10]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Four Pillars of Design Rigor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioDesignDisciplines locale={locale} />
      </div>

      {/* Capabilities & Engagements Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" aria-labelledby="services-overview-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
              {isAr ? 'الخدمات ونماذج التعاقد' : 'Services & Engagements'}
            </span>
            <h2 id="services-overview-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#0F0F10] mt-2">
              {isAr ? 'كيف نعمل مع العملاء' : 'Structured Engagement Models'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/portfolio/services`}
            className="font-mono text-xs font-semibold text-[#0F0F10] hover:text-[#737068] inline-flex items-center gap-1.5"
            aria-label={isAr ? 'استعراض جميع الخدمات السبع' : 'View all 7 services'}
          >
            <span>{isAr ? 'جميع الخدمات (7)' : 'All 7 Services'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map(svc => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl border border-[#E2E0D8] p-6 space-y-4 flex flex-col justify-between hover:border-[#0F0F10] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#57544C]">
                  <span className="uppercase font-bold">{svc.timeline}</span>
                  <span>/{svc.slug}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F0F10]">
                  {svc.name}
                </h3>
                <p className="text-xs text-[#57544C] leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/portfolio/services/${svc.slug}`}
                  className="font-mono text-xs font-semibold text-[#0F0F10] hover:underline"
                  aria-label={isAr ? `تفاصيل خدمة ${svc.name}` : `Service dossier for ${svc.name}`}
                >
                  {isAr ? 'تفاصيل الخدمة' : 'Service Dossier'}
                </Link>
                <Link
                  href={`/${locale}/preview/portfolio/contact?service=${svc.slug}`}
                  className="font-mono text-xs font-bold text-[#0F0F10] bg-[#F6F5F2] hover:bg-[#EAE8E1] px-3.5 py-1.5 rounded-lg border border-[#DDD9CE]"
                  aria-label={isAr ? `بدء طلب خدمة ${svc.name}` : `Select service ${svc.name}`}
                >
                  {isAr ? 'بدء الطلب' : 'Select'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scope Calibrator Instrument */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioScopeCalibrator locale={locale} />
      </div>

      {/* Practice Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="salma-method-heading">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-end border-t border-[#D8D4C9] pt-10">
          <div className="lg:w-1/2">
            <span className="font-mono text-[11px] text-[#737068] uppercase tracking-[.24em]">
              {isAr ? 'منهجية العمل' : 'THE PRACTICE / HOW WE WORK'}
            </span>
            <h2 id="salma-method-heading" className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F0F10] mt-4">
              {isAr ? 'قرار تصميمي واضح. مخرج قابل للاستخدام.' : 'Rigorous thinking. Beautiful execution.'}
            </h2>
          </div>
          <p className="lg:w-1/2 text-sm sm:text-base text-[#57544C] leading-8 font-sans">
            {isAr
              ? 'نبدأ بفهم سياق العلامة ومشكلتها، ونتدرج من الاستراتيجية إلى التطبيق مع نقاط مراجعة واضحة؛ حتى يصبح التصميم أداة عمل وليس مجرد عرض بصري.'
              : 'Every engagement moves from business context and research to a considered direction, a usable system and handover-ready assets. Each stage has an explicit review point.'}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
          {[
            { no: '01', ar: 'الاكتشاف والبحث', en: 'Discover', arBody: 'مقابلة أولية، تدقيق المنافسين، وأهداف استراتيجية قابلة للقياس.', enBody: 'Business objectives, leadership interviews, and competitive audit.' },
            { no: '02', ar: 'تحديد الاتجاه', en: 'Define', arBody: 'ملخص المتطلبات، نبرة الصوت البصرية، ومعايير القبول والقيود.', enBody: 'Creative brief, design principles, and technical constraints.' },
            { no: '03', ar: 'البناء والتجربة', en: 'Design & Validate', arBody: 'نماذج عالية الدقة، تقييم سهولة الاستخدام وتوافق معايير الوصول.', enBody: 'High-fidelity prototypes, accessibility audits, and usability tests.' },
            { no: '04', ar: 'التسليم والتطوير', en: 'Deliver & Evolve', arBody: 'ملفات المصدر، أدلة الرموز، وتوثيق القرارات وتدريب الفريق.', enBody: 'Source vector assets, modular tokens, decision records, and team training.' },
          ].map((step, index) => (
            <article
              key={step.no}
              className={`rounded-3xl border border-[#E2E0D8] p-6 sm:p-7 transition-colors ${
                index === 2 ? 'bg-[#0F0F10] text-white' : 'bg-white text-[#0F0F10] hover:bg-[#EAE8E1]'
              }`}
            >
              <span className={`font-mono text-xs font-bold ${index === 2 ? 'text-[#CCFF00]' : 'text-[#57544C]'}`}>
                {step.no} / 04
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">
                {isAr ? step.ar : step.en}
              </h3>
              <p className={`text-sm leading-relaxed ${index === 2 ? 'text-slate-300' : 'text-[#57544C]'}`}>
                {isAr ? step.arBody : step.enBody}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* High-Impact Project Brief Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="salma-brief-heading">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#CCFF00] p-8 sm:p-12 lg:p-16 text-[#0F0F10]">
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full border-[42px] border-[#0F0F10]/10 pointer-events-none" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0F0F10]">
                {isAr ? 'لنبنِ موجزًا واضحًا' : 'YOUR PROJECT STARTS WITH A BETTER BRIEF'}
              </span>
              <h2 id="salma-brief-heading" className="font-serif text-3xl sm:text-5xl font-bold max-w-2xl text-[#0F0F10] leading-tight">
                {isAr ? 'من فكرة مبعثرة إلى نطاق عمل يمكن الاتفاق عليه' : 'From open questions to an actionable project.'}
              </h2>
              <p className="text-sm leading-relaxed max-w-xl text-[#0F0F10]/85 font-sans">
                {isAr
                  ? 'شارك نوع مشروعك والنتيجة المطلوبة والمواعيد المناسبة؛ سيساعدك النموذج على ترتيب المعلومات قبل النقاش الاستشاري.'
                  : 'Outline your business challenge, desired outcomes, timing and constraints in a structured project brief.'}
              </p>
            </div>
            <Link
              href={`/${locale}/preview/portfolio/contact`}
              className="lg:col-span-4 inline-flex justify-between items-center gap-4 bg-[#0F0F10] hover:bg-[#272727] text-white rounded-2xl px-6 py-4 text-sm font-bold transition-colors shadow-lg"
              aria-label={isAr ? 'ابدأ كتابة موجز المشروع' : 'Create your project brief'}
            >
              <span>{isAr ? 'ابدأ كتابة موجز المشروع' : 'Create your project brief'}</span>
              <ArrowUpRight className="w-5 h-5 text-[#CCFF00]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Perspective / Journal Highlight */}
      {articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="journal-highlight-heading">
          <div className="rounded-3xl bg-[#0F0F10] text-[#E5E3DD] p-8 sm:p-12 space-y-6 border border-white/10">
            <div className="flex items-center justify-between font-mono text-xs text-[#CCFF00] pb-4 border-b border-white/10">
              <span className="uppercase tracking-widest font-bold">{isAr ? 'من دفتر الأفكار' : 'From the Studio Essays'}</span>
              <span className="text-slate-300">6 Articles Published</span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h3 id="journal-highlight-heading" className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {articles[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {articles[0].summary}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/preview/portfolio/journal/${articles[0].slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#B8E600] text-[#0F0F10] text-xs font-mono font-bold transition-colors"
                aria-label={isAr ? `قراءة المقال: ${articles[0].title}` : `Read essay: ${articles[0].title}`}
              >
                <span>{isAr ? 'قراءة المقال الكامل' : 'Read Essay'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <SectorDepth sector="portfolio" locale={locale} />
    </div>
  );
}
