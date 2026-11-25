import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getCatalogItems } from '@/lib/db/repositories';
import EcommerceWishlistClient from './EcommerceWishlistClient';

export const metadata = {
  title: 'My Wishlist | Noria Atelier',
  description: 'View and manage your saved garments and wardrobe favorites.'
};

export default async function EcommerceWishlistPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const allProducts = getCatalogItems('ecommerce', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'القطع المحفوظة' : 'Saved Selection'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'قائمة أمنياتك' : 'My Wishlist'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'مجموعتك الشخصية المحفوظة محلياً في متصفحك للرجوع إليها في أي وقت.'
              : 'Your curated wishlist persisted in your browser for seamless wardrobe planning.'}
          </p>
        </div>

        <EcommerceWishlistClient locale={locale} allProducts={allProducts} />
      </div>
    </div>
  );
}

