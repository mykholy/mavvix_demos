import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getEcommerceCollectionBySlug, getCatalogItems } from '@/lib/db/repositories';
import CollectionListingClient from './CollectionListingClient';

export async function generateMetadata(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const collection = getEcommerceCollectionBySlug(slug, locale);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: `${collection.name} | Noria Atelier`,
    description: collection.description
  };
}

export default async function EcommerceCollectionDetailPage(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const isAr = locale === 'ar';
  const collection = getEcommerceCollectionBySlug(slug, locale);

  if (!collection) {
    notFound();
  }

  // Load products for this collection
  const allProducts = getCatalogItems('ecommerce', locale);
  const collectionProducts = allProducts.filter(p => p.item_type === slug);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C7D73]">
          <Link href={`/${locale}/preview/ecommerce`} className="hover:text-[#1A1715]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/ecommerce/collections`} className="hover:text-[#1A1715]">
            {isAr ? 'التشكيلات' : 'Collections'}
          </Link>
          <span>/</span>
          <span className="text-[#1A1715] font-medium">{collection.name}</span>
        </div>

        {/* Collection Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'تشكيلة مختارة' : 'Atelier Curation'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {collection.name}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Filterable Products Listing */}
        <CollectionListingClient
          locale={locale}
          collection={collection}
          products={collectionProducts}
        />
      </div>
    </div>
  );
}

