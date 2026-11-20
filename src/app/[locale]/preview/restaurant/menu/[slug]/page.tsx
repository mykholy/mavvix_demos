import { SectorPhoto } from '@/components/shared/SectorPhoto';
import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantDishBySlug } from '@/lib/db/repositories';
import { DishDetailClient } from './DishDetailClient';

export default function DishDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dish = getRestaurantDishBySlug(slug, locale);

  if (!dish) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <figure className="space-y-2 mb-8">
        <SectorPhoto sector="restaurant" secondary className="h-60 sm:h-[400px] w-full rounded-[2rem]" alt="Editorial restaurant table and culinary photography" />
        <figcaption className="text-xs text-[#806c60]">{locale === 'ar' ? 'لقطة طعام مرجعية؛ قد يختلف تقديم الطبق المحدد' : 'Food photography for visual inspiration; exact plating may differ'}</figcaption>
      </figure>
      <DishDetailClient dish={dish} locale={locale} />
    </div>
  );
}

