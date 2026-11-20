'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { useCart } from '@/lib/ecommerce/cart-context';
import { LocalizedCatalogItem } from '@/lib/db/repositories';
import ProductCard from '../ProductCard';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  locale: Locale;
  allProducts: LocalizedCatalogItem[];
}

export default function EcommerceWishlistClient({ locale, allProducts }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const { wishlist } = useCart();

  const wishlistedProducts = allProducts.filter(p => wishlist.includes(p.slug));

  return (
    <div className="space-y-8">
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#EBE5DF] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#F7EFEA] text-[#C89B8C] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
            {isAr ? 'قائمة أمنياتك فارغة حالياً' : 'Your Wishlist is Empty'}
          </h2>
          <p className="text-xs sm:text-sm text-[#695E57] leading-relaxed">
            {isAr
              ? 'احفظ القطع المفضلة لديك بالضغط على أيقونة القلب في بطاقة المنتج للرجوع إليها لاحقاً.'
              : 'Save your favorite silhouettes by clicking the heart icon on any product card to curate your wishlist.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/preview/ecommerce/collections`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold transition-colors"
            >
              <span>{isAr ? 'استكشف التشكيلات' : 'Explore Collections'}</span>
              <Arrow className="w-4 h-4 text-[#C89B8C]" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-[#8C7D73]">
            {isAr ? `لديك ${wishlistedProducts.length} قطعة في المفضلة` : `You have ${wishlistedProducts.length} saved pieces`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map(p => (
              <ProductCard key={p.id} locale={locale} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

