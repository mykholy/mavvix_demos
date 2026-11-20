import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getCatalogItems } from '@/lib/db/repositories';
import EcommerceSearchClient from './EcommerceSearchClient';

export const metadata = {
  title: 'Search Atelier Products | Noria Atelier',
  description: 'Search across 24 natural linen and lifestyle garments, fabrics, and artisan cuts.'
};

export default function EcommerceSearchPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const products = getCatalogItems('ecommerce', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'البحث في المتجر' : 'Product Search'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'البحث عن القطع والتصاميم' : 'Search Atelier Catalog'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'ابحث بسهولة عن أي قطعة حسب الاسم، أو كود SKU، أو نوع الخامة الطبيعية.'
              : 'Quickly locate specific garments, fabrics, colors, or SKU identifiers across all atelier lines.'}
          </p>
        </div>

        <EcommerceSearchClient locale={locale} products={products} />
      </div>
    </div>
  );
}

