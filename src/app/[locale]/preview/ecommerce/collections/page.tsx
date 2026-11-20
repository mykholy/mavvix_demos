import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getEcommerceCollections, getCatalogItems } from '@/lib/db/repositories';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'All Collections & Curations | Noria Atelier',
  description: 'Browse Noria Atelier curations: everyday apparel, natural linen dresses, handcrafted accessories, and seasonal sets.'
};

export default function EcommerceCollectionsOverviewPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const collections = getEcommerceCollections(locale);
  const allProducts = getCatalogItems('ecommerce', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'كتالوج التشكيلات' : 'Atelier Curations'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'تشكيلات نوريا أتيليه' : 'Collections & Wardrobe Lines'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'تصفح تشكيلاتنا المنسوجة بعناية من الكتان والألياف الطبيعية. كل فئة تعبر عن فلسفة جمالية تجمع بين العملية والأناقة اليومية المستدامة.'
              : 'Discover our complete series of natural fiber garments. Each line balances structural proportion with soft, tactile Egyptian craftsmanship.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map(col => {
            const itemsInCol = allProducts.filter(p => p.item_type === col.slug);
            return (
              <div
                key={col.id}
                className="group rounded-3xl bg-white border border-[#EBE5DF] p-6 sm:p-8 hover:border-[#C89B8C] hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-[#F5F0EA] to-[#E5DDD2] mb-6 flex flex-col items-center justify-center p-6 text-center border border-[#DDD4CB]">
                    <span className="font-serif text-4xl sm:text-5xl font-light text-[#1A1715] mb-2 group-hover:scale-105 transition-transform duration-300">
                      {col.name}
                    </span>
                    <span className="text-xs font-mono text-[#8C7D73] uppercase tracking-widest">
                      {itemsInCol.length} {isAr ? 'قطعة متوفرة' : 'Items'}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#1A1715] mb-2">
                    {col.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#695E57] leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE3] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8C7D73]">
                    /{col.slug}
                  </span>
                  <Link
                    href={`/${locale}/preview/ecommerce/collections/${col.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold transition-colors"
                  >
                    <span>{isAr ? 'استعراض التشكيلة' : 'Explore Line'}</span>
                    <Arrow className="w-3.5 h-3.5 text-[#C89B8C]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

