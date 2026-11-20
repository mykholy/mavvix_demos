import React, { Suspense } from 'react';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantDishes } from '@/lib/db/repositories';
import { RestaurantMenuClient } from './RestaurantMenuClient';

export default function RestaurantMenuPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const dishes = getRestaurantDishes(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#321F18]/10 pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'قائمة الطعام الشرقية الأصيلة' : 'Heritage Culinary Roster'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {isAr ? 'قائمة المأكولات والمشروبات' : 'Seasonal Menu & Offerings'}
        </h1>
        <p className="text-sm text-[#321F18]/70 max-w-2xl leading-relaxed">
          {isAr
            ? 'تصفح أطباقنا الـ ٣٠ المحضرة طازجًا. يمكنك استخدام فلاتر الحساسية ومسببات الحساسية لاستعراض الخيارات المناسبة واختيار المكونات والإضافات بدقة.'
            : 'Explore our 30 heritage dishes prepared daily. Use our allergen exclusions and dietary filters to curate your meal with exact ingredient transparency.'}
        </p>
      </div>

      {/* Interactive Filter and Dish Grid */}
      <Suspense fallback={<div className="min-h-80 animate-pulse rounded-2xl bg-[#F7F0E8]" />}><RestaurantMenuClient initialDishes={dishes} locale={locale} /></Suspense>
    </div>
  );
}

