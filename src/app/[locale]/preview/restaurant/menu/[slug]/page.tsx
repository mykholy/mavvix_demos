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
      <DishDetailClient dish={dish} locale={locale} />
    </div>
  );
}

