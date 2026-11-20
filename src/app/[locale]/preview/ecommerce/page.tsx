import { getSectorHeroStyle } from '@/lib/media/sector-images';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getCatalogItems, getEcommerceCollections, getEditorialPosts } from '@/lib/db/repositories';
import ProductCard from './ProductCard';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, HeartHandshake, Leaf, Scissors } from 'lucide-react';

export const metadata = {
  title: 'Noria Atelier | Contemporary Egyptian Natural Fiber Fashion',
  description: 'Timeless garments crafted from natural linen and sustainable fibers. Discover curated everyday apparel, dresses, and artisan sets.'
};

export default function EcommerceStorefrontPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const products = getCatalogItems('ecommerce', locale);
  const collections = getEcommerceCollections(locale);
  const articles = getEditorialPosts('ecommerce', locale);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Campaign Editorial Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2ECE4] via-[#F7F2EC] to-[#FAF8F5] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E8E1D9]" style={getSectorHeroStyle('ecommerce')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1715]/5 text-[#695E57] text-xs font-semibold uppercase tracking-widest border border-[#E0D8D0]">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B8C]" />
                <span>{isAr ? 'مجموعة الكتان والألياف الطبيعية' : 'The Natural Linen Edition'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1715] leading-[1.12]">
                {isAr
                  ? 'أناقة تدوم طويلاً، مصممة بحرفية من أنقى الخامات الطبيعية'
                  : 'Proportions designed to outlast fast trends, tailored in pure natural fibers.'}
              </h1>

              <p className="text-sm sm:text-base text-[#695E57] max-w-xl leading-relaxed">
                {isAr
                  ? 'في نوريا أتيليه، نبتكر قطعاً تجمع بين بساطة الخطوط الهندسية ونعومة الكتان المصري والصوف الخالص، لنوفر لك إطلالة مريحة تعبر عن شخصيتك دون مبالغة.'
                  : 'At Noria Atelier, we craft architectural silhouettes woven from premium Egyptian linen and untamed fibers. Tactile daily luxury made for thoughtful living.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/${locale}/preview/ecommerce/collections/apparel`}
                  className="px-6 py-3.5 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>{isAr ? 'استكشف التشكيلة الحالية' : 'Shop Current Campaign'}</span>
                  <Arrow className="w-4 h-4 text-[#C89B8C]" />
                </Link>
                <Link
                  href={`/${locale}/preview/ecommerce/story`}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#F3EFEA] text-[#1A1715] border border-[#DDD4CB] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <span>{isAr ? 'قصة حياكة النسيج' : 'Atelier Craft Story'}</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8E1D9]">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">100%</div>
                  <div className="text-[11px] sm:text-xs text-[#695E57]">{isAr ? 'ألياف نقية طبيعية' : 'Natural pure fibers'}</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">24</div>
                  <div className="text-[11px] sm:text-xs text-[#695E57]">{isAr ? 'قطعة بتصميم استوديو' : 'Bespoke atelier cuts'}</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">COD</div>
                  <div className="text-[11px] sm:text-xs text-[#695E57]">{isAr ? 'دفع تجريبي عند الاستلام' : 'Simulated COD demo'}</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-[#E0D8D0] space-y-6">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#EFEAE4] to-[#DFD7CE] flex flex-col items-center justify-center p-8 text-center border border-[#D5CDC4]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C7D73] mb-2">
                    Edition 2026 / Campaign 01
                  </span>
                  <span className="font-serif text-4xl sm:text-5xl font-light text-[#1A1715] mb-2">
                    L'Épure
                  </span>
                  <span className="text-xs text-[#695E57] max-w-xs">
                    {isAr ? 'قصات هندسية فضفاضة من الكتان المعالج طبيعياً' : 'Air-washed pure linen tunics and relaxed utility trousers'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#1A1715] pt-2">
                  <span>{isAr ? 'تسوق النمط' : 'Curated Look'}</span>
                  <Link
                    href={`/${locale}/preview/ecommerce/collections`}
                    className="text-[#C89B8C] hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'تصفح كل التشكيلات' : 'View Collections'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Overview Grid (4 Collections) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
              {isAr ? 'تصنيفات الأتيليه' : 'Categories'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#193A39] mt-2 text-[#1A1715]">
              {isAr ? 'تصفح حسب نوع القطعة' : 'Explore by Category'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/ecommerce/collections`}
            className="text-xs sm:text-sm font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1"
          >
            <span>{isAr ? 'جميع الفئات (4)' : 'View all 4 categories'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {collections.map(col => (
            <Link
              key={col.id}
              href={`/${locale}/preview/ecommerce/collections/${col.slug}`}
              className="group block p-5 rounded-2xl bg-white border border-[#EBE5DF] hover:border-[#C89B8C] hover:shadow-md transition-all"
            >
              <div className="aspect-square rounded-xl bg-[#F4EFEA] mb-4 flex items-center justify-center font-serif text-3xl font-light text-[#8C7D73] group-hover:scale-105 transition-transform duration-300">
                {col.name.slice(0, 2)}
              </div>
              <h3 className="font-serif text-base font-bold text-[#1A1715] group-hover:text-[#C89B8C] transition-colors">
                {col.name}
              </h3>
              <p className="text-[11px] text-[#695E57] line-clamp-1 mt-1">
                {col.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Curated Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
              {isAr ? 'قطع مختارة' : 'Curated Selection'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715] mt-2">
              {isAr ? 'أحدث تصاميم الأتيليه' : 'Current Atelier Arrivals'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/ecommerce/collections`}
            className="text-xs sm:text-sm font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1"
          >
            <span>{isAr ? 'عرض كافة المنتجات (24)' : 'Browse all 24 products'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} locale={locale} product={p} />
          ))}
        </div>
      </section>

      {/* Material & Craftsmanship Philosophy Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1A1715] text-[#FAF8F5] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C89B8C]">
              {isAr ? 'فلسفة المواد المستدامة' : 'Ethical Fabric Heritage'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              {isAr ? 'الكتان المصري والأنسجة الطبيعية' : 'Spun from pure Egyptian soil and honest fibers'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {isAr
                ? 'نعمل بشكل وثيق مع ورش الحياكة المحلية في مصر لاختيار أجود ألياف الكتان الطبيعي والصوف غير المعالج بالمواد الكيميائية القاسية. قطعنا تكتسب نعومة وجمالاً مع كل غسلة.'
                : 'We collaborate with heritage weaving workshops across Egypt, choosing untamed flax linen and non-bleached cotton blends. Garments designed to soften gracefully with each laundering cycle.'}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/preview/ecommerce/story`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C89B8C] hover:bg-[#B88777] text-[#1A1715] text-xs font-bold transition-colors"
              >
                <span>{isAr ? 'اقرأ قصة الحرفية' : 'Discover Our Story'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Style Journal Teaser */}
      {articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
                {isAr ? 'مجلة الأسلوب' : 'Editorial Perspectives'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715] mt-2">
                {isAr ? 'مقالات في التنسيق والأناقة الخالدة' : 'Journal & Style Reflections'}
              </h2>
            </div>
            <Link
              href={`/${locale}/preview/ecommerce/journal`}
              className="text-xs sm:text-sm font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1"
            >
              <span>{isAr ? 'جميع مقالات المجلة' : 'Read all journal articles'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map(a => (
              <div key={a.id} className="p-6 rounded-2xl bg-white border border-[#EBE5DF] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#8C7D73] uppercase tracking-wider block mb-2">
                    {a.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1A1715] mb-2">
                    {a.title}
                  </h3>
                  <p className="text-xs text-[#695E57] line-clamp-2 leading-relaxed mb-4">
                    {a.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F0EAE3]">
                  <Link
                    href={`/${locale}/preview/ecommerce/journal/${a.slug}`}
                    className="text-xs font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1"
                  >
                    <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

