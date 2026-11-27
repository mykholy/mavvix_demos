'use client';

import { getProductEditorialPhoto } from '@/lib/media/sector-images';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { useCart } from '@/lib/ecommerce/cart-context';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { LocalizedCatalogItem } from '@/lib/db/repositories';

interface Props {
  locale: Locale;
  product: LocalizedCatalogItem;
}

export default function ProductCard({ locale, product }: Props) {
  const isAr = locale === 'ar';
  const { isWishlisted, toggleWishlist, addToCart } = useCart();
  const wish = isWishlisted(product.slug);

  const variants = product.variants || [];
  const inStockVariants = variants.filter(v => v.stock_qty > 0);
  const isAllSoldOut = variants.length > 0 && inStockVariants.length === 0;

  // Extract distinct colors and sizes
  const colors = Array.from(new Set(variants.map(v => v.attributes?.color).filter(Boolean)));
  const sizes = Array.from(new Set(variants.map(v => v.attributes?.size).filter(Boolean)));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAllSoldOut) return;

    const availableVar = inStockVariants[0] || variants[0];
    if (availableVar) {
      addToCart({
        itemId: product.id,
        variantId: availableVar.id,
        sku: availableVar.code || product.sku,
        slug: product.slug,
        title: product.title,
        size: availableVar.attributes?.size || 'Standard',
        color: availableVar.attributes?.color || 'Natural',
        priceCents: availableVar.price_cents || product.base_price_cents,
        maxStock: availableVar.stock_qty ?? 10,
        category: product.item_type
      }, 1);
    }
  };

  const formattedPrice = Math.round(product.base_price_cents / 100);

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#EBE5DF] p-4 transition-all hover:border-[#C89B8C] hover:shadow-md">
      <div>
        {/* Top badges & Wishlist */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#695E57] bg-[#F3EFEA] px-2 py-0.5 rounded-md">
            {product.item_type}
          </span>
          <button
            onClick={() => toggleWishlist(product.slug)}
            className={`p-1.5 rounded-full transition-colors ${
              wish ? 'text-[#895549] bg-[#F7EFEA]' : 'text-[#6D5C51] hover:text-[#1A1715] hover:bg-[#F3EFEA]'
            }`}
            title={wish ? (isAr ? 'إزالة من المفضلة' : 'Remove from Wishlist') : (isAr ? 'إضافة للمفضلة' : 'Add to Wishlist')}
          >
            <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Image Representation */}
        <Link href={`/${locale}/preview/ecommerce/products/${product.slug}`} className="block relative aspect-[4/5] rounded-xl bg-gradient-to-b from-[#F7F3EE] to-[#EBE4DC] overflow-hidden mb-4 flex items-center justify-center border border-[#ECE5DD]">
          <img src={getProductEditorialPhoto(product.slug)}
            alt={isAr ? 'صورة أزياء مرجعية لتنسيق المجموعة' : 'Editorial fashion styling reference'}
            loading="lazy" decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 rounded-full bg-white/85 backdrop-blur px-2 py-1 text-[10px] text-[#695E57]">
            {isAr ? 'تصوير إلهامي' : 'Editorial styling'}
          </span>

          {/* Sold out overlay */}
          {isAllSoldOut && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white text-[#1A1715] rounded-full shadow">
                {isAr ? 'نفد المخزون' : 'Sold Out'}
              </span>
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="space-y-1.5 mb-3">
          <h3 className="font-serif text-base font-bold text-[#1A1715] group-hover:text-[#695E57] transition-colors line-clamp-1">
            <Link href={`/${locale}/preview/ecommerce/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>
          <p className="text-xs text-[#695E57] line-clamp-2 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Swatches preview */}
        <div className="flex items-center gap-1.5 mb-3">
          {colors.slice(0, 4).map((c, i) => (
            <span
              key={i}
              className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#F3EFEA] text-[#695E57] border border-[#E0D8D0]"
            >
              {c}
            </span>
          ))}
          {sizes.length > 0 && (
            <span className="text-[10px] text-[#6D5C51] ml-1 rtl:ml-0 rtl:mr-1">
              ({sizes.join('/')})
            </span>
          )}
        </div>
      </div>

      {/* Price & Quick Action */}
      <div className="pt-3 border-t border-[#F0EAE3] flex items-center justify-between">
        <div className="font-serif text-base font-bold text-[#1A1715]">
          {formattedPrice} <span className="text-xs font-sans text-[#695E57]">EGP</span>
        </div>

        {isAllSoldOut ? (
          <span className="text-xs text-[#6D5C51] font-medium">
            {isAr ? 'غير متاح' : 'Unavailable'}
          </span>
        ) : (
          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#895549]" />
            <span>{isAr ? 'إضافة للحقيبة' : 'Add'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

