import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPostBySlug, getRestaurantDishes } from '@/lib/db/repositories';

export default async function RestaurantArticleDetailPage(
  props: {
    params: Promise<{ locale: Locale; slug: string }>;
  }
) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const article = getEditorialPostBySlug('restaurant', slug, locale);

  if (!article) {
    notFound();
  }

  const allDishes = getRestaurantDishes(locale);
  const relatedDishes = allDishes.slice(0, 3);
  const sections = article.body?.sections || [];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-start">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#321F18]/60">
        <Link href={`/${locale}/preview/restaurant`} className="hover:text-[#BA5C34]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/restaurant/journal`} className="hover:text-[#BA5C34]">
          {isAr ? 'اليوميات' : 'Journal'}
        </Link>
        <span>/</span>
        <span className="text-[#321F18] font-semibold">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#321F18]/10 pb-8">
        <div className="flex items-center gap-3 text-xs text-[#8B8B52]">
          <span className="uppercase tracking-widest font-bold text-[#BA5C34]">{article.category}</span>
          <span>•</span>
          <span>{isAr ? 'بقلم فريق الطهاة' : 'By Culinary Brigade'}</span>
          <span>•</span>
          <span>{isAr ? '٥ دقائق قراءة' : '5 min read'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18] leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#321F18]/80 leading-relaxed font-serif italic">
          {article.summary}
        </p>
      </header>

      {/* Table of Contents */}
      {sections.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-[#321F18]/15 space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#BA5C34] block">
            {isAr ? 'محتويات المقال:' : 'Table of Contents:'}
          </span>
          <ul className="space-y-1.5 text-xs text-[#321F18]/80">
            {sections.map((sec: any, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-[#BA5C34] font-bold">0{idx + 1}.</span>
                <a href={`#sec-${idx}`} className="hover:text-[#BA5C34] hover:underline font-medium">
                  {sec.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Body Sections (300+ words) */}
      <div className="space-y-10 text-sm sm:text-base text-[#321F18]/85 leading-relaxed font-sans">
        {sections.map((sec: any, idx: number) => (
          <section key={idx} id={`sec-${idx}`} className="space-y-3 pt-2">
            <h2 className="font-serif text-2xl font-bold text-[#321F18]">
              {sec.heading}
            </h2>
            <p className="leading-relaxed whitespace-pre-line">
              {sec.content}
            </p>
          </section>
        ))}
      </div>

      {/* Related Menu Dishes Box */}
      <section className="bg-white rounded-3xl border border-[#321F18]/15 p-8 space-y-6 mt-16">
        <div className="border-b border-[#321F18]/10 pb-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#BA5C34]">
            {isAr ? 'أطباق ذات صلة بالمقال' : 'Related Kitchen Dishes'}
          </span>
          <h3 className="font-serif text-xl font-bold text-[#321F18] mt-1">
            {isAr ? 'تذوق هذه النكهات في سفرة زعفران' : 'Dishes to Savor at Saffron Table'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedDishes.map(d => (
            <div
              key={d.id}
              className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B8B52] block">{d.category}</span>
                <h4 className="font-serif text-sm font-bold text-[#321F18] mt-1">{d.title}</h4>
                <p className="text-[11px] text-[#321F18]/70 line-clamp-2 mt-1">{d.summary}</p>
              </div>

              <div className="pt-3 border-t border-[#321F18]/10 flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#321F18]">
                  {(d.price_cents / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}
                </span>
                <Link
                  href={`/${locale}/preview/restaurant/menu/${d.slug}`}
                  className="text-xs text-[#BA5C34] hover:underline font-semibold"
                >
                  {isAr ? 'تخصيص' : 'Customize'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <div className="pt-8 border-t border-[#321F18]/10 flex items-center justify-between text-xs">
        <Link
          href={`/${locale}/preview/restaurant/journal`}
          className="text-[#BA5C34] font-semibold hover:underline"
        >
          {isAr ? '← العودة لكافة مقالات اليوميات' : '← Back to All Journal Articles'}
        </Link>
        <Link
          href={`/${locale}/preview/restaurant/reserve`}
          className="px-4 py-2 rounded-xl bg-[#321F18] text-[#FAF3E6] hover:bg-[#BA5C34] transition-colors font-semibold"
        >
          {isAr ? 'حجز طاولة تجريبي' : 'Reserve a Table'}
        </Link>
      </div>
    </article>
  );
}

