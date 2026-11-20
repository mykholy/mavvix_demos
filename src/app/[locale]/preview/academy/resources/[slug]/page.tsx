import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEditorialPostBySlug, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const article = getEditorialPostBySlug('academy', slug, loc);
  if (!article) notFound();

  const allArticles = getEditorialPosts('academy', loc);
  const otherArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 2);

  const sections: Array<{ heading: string; content: string }> = article.body?.sections || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#192A48]/60">
        <Link href={`/${locale}/preview/academy`} className="hover:text-[#192A48]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/academy/resources`} className="hover:text-[#192A48]">
          {isAr ? 'المقالات' : 'Resources'}
        </Link>
        <span>/</span>
        <span className="text-[#192A48] font-semibold">{article.title}</span>
      </nav>

      {/* Article Header Dossier */}
      <header className="space-y-4 border-b border-[#192A48]/10 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#192A48]/60">
          <span className="px-3 py-1 rounded-full bg-[#192A48]/5 text-[#192A48] font-semibold">
            {article.category}
          </span>
          <span>•</span>
          <span>⏱️ 5 {isAr ? 'دقائق قراءة متأنية' : 'min read'}</span>
          <span>•</span>
          <span>📅 {article.published_at.slice(0, 10)}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#192A48] leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#192A48]/80 leading-relaxed font-serif italic pt-2">
          "{article.summary}"
        </p>
      </header>

      {/* Table of Contents */}
      {sections.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 space-y-3">
          <h3 className="font-serif text-sm font-bold text-[#192A48]">
            {isAr ? 'محتويات هذا المقال:' : 'Table of Contents:'}
          </h3>
          <ul className="space-y-2 text-xs text-[#5F67B5]">
            {sections.map((s, idx) => (
              <li key={idx} className="flex items-center gap-2 hover:underline">
                <span className="text-[#EF6A55] font-bold">{idx + 1}.</span>
                <a href={`#section-${idx}`}>{s.heading}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Substantive Article Body */}
      <article className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-[#192A48]/85 leading-relaxed">
        {sections.map((s, idx) => (
          <section key={idx} id={`section-${idx}`} className="space-y-3 pt-2">
            <h2 className="font-serif text-2xl font-bold text-[#192A48]">
              {s.heading}
            </h2>
            <p className="leading-relaxed whitespace-pre-line">
              {s.content}
            </p>
          </section>
        ))}
      </article>

      {/* Related Curricula Action Card */}
      <div className="bg-[#192A48] text-white rounded-3xl p-8 sm:p-10 space-y-5 shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EF6A55] text-xs font-semibold">
          <span>⚡ {isAr ? 'تطبيق عملي مباشر' : 'Applied Practical Next Step'}</span>
        </div>

        <h3 className="font-serif text-2xl font-bold">
          {isAr
            ? 'هل ترغب في تطبيق هذه المفاهيم في مشاريع واقعية؟'
            : 'Ready to Apply These Principles in Production Labs?'}
        </h3>

        <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
          {isAr
            ? 'تقدم أكاديمية نوفا مناهج دراسية تفصيلية تخضع للاختبارات والمراجعة الهندسية المستمرة. تصفح المناهج ذات الصلة أو سجل رغبتك بالالتحاق.'
            : 'Nova Learning offers structured curricula evaluated against enterprise production rubrics. Explore related courses or register enrollment interest.'}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/preview/academy/courses`}
            className="px-6 py-3 rounded-xl bg-[#EF6A55] text-white hover:bg-[#D95540] text-xs font-semibold shadow-md transition-all"
          >
            {isAr ? 'استكشف المناهج والدورات' : 'Explore All Curricula'}
          </Link>
          <Link
            href={`/${locale}/preview/academy/enrollment-interest`}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-semibold transition-all"
          >
            {isAr ? 'تسجيل الاهتمام بالالتحاق' : 'Register Enrollment Interest'}
          </Link>
        </div>
      </div>

      {/* More Articles */}
      {otherArticles.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#192A48]/10">
          <h3 className="font-serif text-xl font-bold text-[#192A48]">
            {isAr ? 'مقالات إضافية قد تهمك' : 'Further Engineering Essays'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map(other => (
              <div
                key={other.slug}
                className="bg-white rounded-2xl p-6 border border-[#192A48]/10 space-y-3 hover:border-[#5F67B5] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#EF6A55] uppercase tracking-wider">
                    {other.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#192A48]">
                    <Link href={`/${locale}/preview/academy/resources/${other.slug}`}>{other.title}</Link>
                  </h4>
                  <p className="text-xs text-[#192A48]/70 line-clamp-2">{other.summary}</p>
                </div>
                <Link
                  href={`/${locale}/preview/academy/resources/${other.slug}`}
                  className="text-xs font-semibold text-[#5F67B5] hover:underline pt-2 block"
                >
                  {isAr ? 'قراءة المقال ←' : 'Read Article →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

