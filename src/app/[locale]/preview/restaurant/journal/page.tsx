import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPosts } from '@/lib/db/repositories';
import { RestaurantJournalClient } from './RestaurantJournalClient';

export default function RestaurantJournalPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const articles = getEditorialPosts('restaurant', locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#321F18]/10 pb-8 space-y-3 text-start">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'يوميات المطبخ وأسرار النكهات' : 'Culinary Essays & Kitchen Notes'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {isAr ? 'يوميات سفرة زعفران' : 'The Saffron Table Journal'}
        </h1>
        <p className="text-sm text-[#321F18]/70 max-w-2xl leading-relaxed">
          {isAr
            ? 'مقالات تحريرية معمقة حول طقوس الصباح الشرقي، فنون تحضير الصلصات، شفافية الحساسيات الغذائية، ومصادر التوابل الحرة.'
            : 'Long-form editorial essays on Eastern breakfast traditions, sauce emulsification, allergen protocols, and whole-spice sourcing.'}
        </p>
      </div>

      <RestaurantJournalClient articles={articles} locale={locale} />
    </div>
  );
}

