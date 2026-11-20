import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getProjects, getPortfolioServices, getEditorialPosts } from '@/lib/db/repositories';
import { ArrowUpRight, ArrowRight, ArrowLeft, Sparkles, Layers, Sliders, PenTool, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Salma Hassan Studio | Creative Direction & Design Systems',
  description: 'Independent design direction practice. Brand architectures, editorial digital platforms, and modular systems.'
};

export default function PortfolioHomePage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
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
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#737068]">
            <span className="px-3 py-1 rounded-full bg-[#EAE8E1] border border-[#DDD9CE] text-[#0F0F10] uppercase tracking-widest">
              {isAr ? 'استوديو تصميم مستقل' : 'Independent Creative Practice'}
            </span>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>{isAr ? 'متاح للتعاقدات الجديدة (Q2/Q3)' : 'Available for select engagements (Q2/Q3)'}</span>
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
                ? 'استوديو تصميم استشاري متخصص في مساعدة الشركات الطموحة والمؤسسات الثقافية على تحويل أفكارها المعقدة إلى أنظمة هوية بصرية واضحة ومواقع رقمية فائقة الأناقة.'
                : 'Salma Hassan Studio collaborates with forward-looking founders and institutions to crystallize intricate business strategies into uncompromising visual identities, responsive typography systems, and tactile digital products.'}
            </p>

            <div className="md:col-span-4 flex flex-wrap items-center gap-4 md:justify-end">
              <Link
                href={`/${locale}/preview/portfolio/contact`}
                className="px-6 py-3.5 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-white text-xs font-mono font-semibold transition-all shadow-md flex items-center gap-2"
              >
                <span>{isAr ? 'بدء نقاش المشروع' : 'Initiate Project Brief'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#CCFF00]" />
              </Link>
              <Link
                href={`/${locale}/preview/portfolio/work`}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#EAE8E1] text-[#0F0F10] border border-[#D5D1C5] text-xs font-mono font-semibold transition-colors flex items-center gap-2"
              >
                <span>{isAr ? 'استعراض الأعمال' : 'View Work (12)'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="portfolio" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="portfolio" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-60 text-center px-4">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>


      {/* Flagship Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
              {isAr ? 'دراسات الحالة المميزة' : 'Selected Case Studies'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F10] mt-2">
              {isAr ? 'مشاريع تمثل عمق المنهجية والقرارات التصميمية' : 'Demonstrated Depth & Decision Rationale'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/portfolio/work`}
            className="font-mono text-xs font-semibold text-[#0F0F10] hover:text-[#CCFF00] inline-flex items-center gap-1.5"
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
                  <span className="uppercase text-[#57544C] bg-[#F6F5F2] px-2.5 py-1 rounded-md border border-[#E2E0D8]">
                    {c.project_type || 'Branding'}
                  </span>
                  <span className="text-[#737068]">2025</span>
                </div>

                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#ECEAE3] to-[#DAD6CA] border border-[#DDD9CE] p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
                  <span className="font-mono text-xs text-[#737068] uppercase tracking-widest">
                    Case #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0F10] block mb-1">
                      {c.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#57544C]">
                      ID: {c.slug}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed line-clamp-3">
                  {c.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#737068]">
                  {isAr ? 'سرد تفصيلي للقرارات والمخرجات' : 'Decision Rationale & Deliverables'}
                </span>
                <Link
                  href={`/${locale}/preview/portfolio/work/${c.slug}`}
                  className="font-mono text-xs font-bold text-[#0F0F10] hover:text-[#737068] inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'قراءة دراسة الحالة' : 'Read Case Study'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0F0F10]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Capabilities & Engagements Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
              {isAr ? 'الخدمات ونماذج التعاقد' : 'Services & Engagements'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F10] mt-2">
              {isAr ? 'كيف نعمل مع العملاء' : 'Structured Engagement Models'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/portfolio/services`}
            className="font-mono text-xs font-semibold text-[#0F0F10] hover:text-[#CCFF00] inline-flex items-center gap-1.5"
          >
            <span>{isAr ? 'جميع الخدمات (7)' : 'All 7 Services'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map(svc => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl border border-[#E2E0D8] p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#737068]">
                  <span className="uppercase">{svc.timeline}</span>
                  <span>/{svc.slug}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0F0F10]">
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
                >
                  {isAr ? 'تفاصيل الخدمة' : 'Service Dossier'}
                </Link>
                <Link
                  href={`/${locale}/preview/portfolio/contact?service=${svc.slug}`}
                  className="font-mono text-xs font-bold text-[#0F0F10] bg-[#F6F5F2] hover:bg-[#EAE8E1] px-3 py-1.5 rounded-lg border border-[#DDD9CE]"
                >
                  {isAr ? 'بدء الطلب' : 'Select'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perspective / Journal Highlight */}
      {articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F0F10] text-[#E5E3DD] p-8 sm:p-12 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#CCFF00] pb-4 border-b border-white/10">
              <span className="uppercase tracking-widest">{isAr ? 'من دفتر الأفكار' : 'From the Studio Essays'}</span>
              <span>6 Articles Published</span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {articles[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {articles[0].summary}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/preview/portfolio/journal/${articles[0].slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#B8E600] text-[#0F0F10] text-xs font-mono font-bold transition-colors"
              >
                <span>{isAr ? 'قراءة المقال الكامل' : 'Read Essay'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

