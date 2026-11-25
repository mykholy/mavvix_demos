import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPosts } from '@/lib/db/repositories';
import { ArrowRight, ArrowLeft, Clock, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Style Journal & Textile Notes | Noria Atelier',
  description: 'Perspectives on mindful tailoring, natural linen care, and timeless dressing principles.'
};

export default async function EcommerceJournalPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const articles = getEditorialPosts('ecommerce', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'دفتر الأتيليه' : 'Atelier Journal'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'مجلة الأسلوب والنسيج' : 'Style Journal & Textile Notes'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'ملاحظات وتأملات في فن الحياكة البطيئة، وتنسيق الأقمشة الطبيعية، والعناية بالملابس لتدوم طويلاً.'
              : 'Reflections on deliberate craftsmanship, linen maintenance, and architectural dressing philosophies.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <article
              key={article.id}
              className="bg-white rounded-3xl border border-[#EBE5DF] p-6 hover:border-[#C89B8C] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#F5F0EA] to-[#E5DDD2] flex items-center justify-center p-6 text-center border border-[#DDD4CB]">
                  <span className="font-serif text-3xl font-light text-[#1A1715]">
                    {article.title.slice(0, 2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#8C7D73] font-mono">
                  <span className="uppercase text-[#695E57] font-semibold">{article.category}</span>
                  <span>•</span>
                  <span>3 min read</span>
                </div>

                <h2 className="font-serif text-lg font-bold text-[#1A1715] leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-[#695E57] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE3]">
                <Link
                  href={`/${locale}/preview/ecommerce/journal/${article.slug}`}
                  className="text-xs font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1.5"
                >
                  <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

