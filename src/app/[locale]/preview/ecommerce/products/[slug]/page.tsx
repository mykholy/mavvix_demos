import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getCatalogItemBySlug, getCatalogItems } from '@/lib/db/repositories';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const product = getCatalogItemBySlug('ecommerce', slug, locale);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} | Noria Atelier`,
    description: product.summary
  };
}

export default function EcommerceProductDetailPage({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const isAr = locale === 'ar';
  const product = getCatalogItemBySlug('ecommerce', slug, locale);

  if (!product) {
    notFound();
  }

  // Load related products from same category
  const allProducts = getCatalogItems('ecommerce', locale);
  const relatedProducts = allProducts.filter(p => p.item_type === product.item_type && p.id !== product.id);

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
          <Link href={`/${locale}/preview/ecommerce/collections/${product.item_type}`} className="hover:text-[#1A1715] uppercase">
            {product.item_type}
          </Link>
          <span>/</span>
          <span className="text-[#1A1715] font-medium truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* Client Product Detail & Variant Selector */}
        <ProductDetailClient
          locale={locale}
          product={product}
          relatedProducts={relatedProducts}
        />
      </div>
    </div>
  );
}

