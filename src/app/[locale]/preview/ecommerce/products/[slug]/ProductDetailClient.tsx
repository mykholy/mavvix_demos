'use client';

import { getProductEditorialPhoto } from '@/lib/media/sector-images';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { LocalizedCatalogItem } from '@/lib/db/repositories';
import { useCart } from '@/lib/ecommerce/cart-context';
import ProductCard from '../../ProductCard';
import {
  ShoppingBag, Heart, Shield, Check, AlertCircle,
  HelpCircle, Sparkles, ArrowRight, ArrowLeft, RotateCcw, Truck
} from 'lucide-react';

interface Props {
  locale: Locale;
  product: LocalizedCatalogItem;
  relatedProducts: LocalizedCatalogItem[];
}

export default function ProductDetailClient({
  locale,
  product,
  relatedProducts
}: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const { addToCart, isWishlisted, toggleWishlist, addRecentlyViewed } = useCart();

  useEffect(() => {
    addRecentlyViewed(product.slug);
  }, [product.slug]);

  const variants = product.variants || [];

  // Distinct sizes and colors
  const sizes = Array.from(new Set(variants.map(v => v.attributes?.size).filter(Boolean)));
  const colors = Array.from(new Set(variants.map(v => v.attributes?.color).filter(Boolean)));

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || 'Natural');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Active matched variant
  const activeVariant = variants.find(
    v => v.attributes?.size === selectedSize && v.attributes?.color === selectedColor
  ) || variants[0];

  const currentStock = activeVariant?.stock_qty ?? 0;
  const isSoldOut = currentStock <= 0;
  const currentPriceCents = activeVariant?.price_cents || product.base_price_cents;
  const priceEgp = Math.round(currentPriceCents / 100);

  const wish = isWishlisted(product.slug);

  const handleAddToCart = () => {
    if (isSoldOut) return;

    const res = addToCart({
      itemId: product.id,
      variantId: activeVariant.id,
      sku: activeVariant.code || product.sku,
      slug: product.slug,
      title: product.title,
      size: selectedSize,
      color: selectedColor,
      priceCents: currentPriceCents,
      maxStock: currentStock,
      category: product.item_type
    }, quantity);

    if (res.success) {
      setAddedNotice(isAr ? 'تمت إضافة القطعة بنجاح إلى حقيبتك' : 'Item added to your bag');
      setTimeout(() => setAddedNotice(null), 3500);
    } else {
      setAddedNotice(res.message || (isAr ? 'تعذر الإضافة' : 'Could not add'));
      setTimeout(() => setAddedNotice(null), 3500);
    }
  };

  const images = [
    { label: isAr ? 'الإطلالة الأمامية' : 'Front Silhouette', code: 'A' },
    { label: isAr ? 'تفاصيل النسيج المقرب' : 'Texture & Weave Close-up', code: 'B' },
    { label: isAr ? 'الجانب والدرزات' : 'Side Seam & Finishing', code: 'C' },
    { label: isAr ? 'الإطلالة في الارتداء' : 'Drape & Movement', code: 'D' },
  ];

  return (
    <div className="space-y-16">
      {/* Product Main Fold */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery Representation */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual */}
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#F5F0EA] via-[#EDE6DC] to-[#E3DBD0] border border-[#DDD4CB] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73] absolute top-6 left-6 rtl:left-auto rtl:right-6">
              {images[activeImageIdx].label}
            </span>
            <img src={getProductEditorialPhoto(product.slug + '-' + activeImageIdx)}
              alt={isAr ? 'لقطة إلهامية لتنسيق الأزياء وليست صورة المنتج الفعلي' : 'Editorial fashion inspiration; not an exact product photograph'}
              loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute bottom-5 left-5 rtl:left-auto rtl:right-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#1A1715] backdrop-blur">
              {isAr ? 'إلهام بصري للمجموعة' : 'Editorial collection styling'}
            </span>
            {isSoldOut && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white text-[#1A1715] font-bold text-xs uppercase tracking-widest shadow-lg">
                  {isAr ? 'نفد هذا المقاس / اللون' : 'Sold Out for this combination'}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`aspect-square rounded-2xl border text-center p-2 flex flex-col items-center justify-center transition-all ${
                  activeImageIdx === idx
                    ? 'border-[#1A1715] bg-white shadow-sm'
                    : 'border-[#E0D8D0] bg-[#F8F5F1] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={getProductEditorialPhoto(product.slug + '-' + idx)} alt="" loading="lazy" className="h-full w-full object-cover rounded-xl" />
                <span className="sr-only">{img.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details, Variant Matrix & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73] bg-[#EFE9E2] px-2.5 py-1 rounded-md">
                {product.item_type}
              </span>
              <button
                onClick={() => toggleWishlist(product.slug)}
                className={`p-2 rounded-full border border-[#DDD4CB] transition-colors ${
                  wish ? 'text-[#C89B8C] bg-[#F7EFEA]' : 'text-[#8C7D73] hover:text-[#1A1715]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715]">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-serif text-2xl font-bold text-[#1A1715]">
                {priceEgp} <span className="text-sm font-sans text-[#695E57]">EGP</span>
              </span>
              <span className="text-xs text-[#8C7D73]">
                {isAr ? '(شامل الضريبة التجريبية)' : '(Simulated tax included)'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#695E57] leading-relaxed border-t border-b border-[#EAE3DB] py-4">
            {product.summary}
          </p>

          {/* Color Selection */}
          {colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1A1715]">
                  {isAr ? 'اللون:' : 'Color:'} <span className="font-mono uppercase font-normal text-[#695E57]">{selectedColor}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                      selectedColor === color
                        ? 'bg-[#1A1715] text-white shadow-sm'
                        : 'bg-white border border-[#DDD4CB] text-[#695E57] hover:border-[#1A1715]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection & Guide Trigger */}
          {sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1A1715]">
                  {isAr ? 'المقاس:' : 'Size:'} <span className="font-mono font-normal text-[#695E57]">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="text-xs text-[#C89B8C] hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'دليل المقاسات' : 'Size Guide'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => {
                  const checkVariant = variants.find(
                    v => v.attributes?.size === size && v.attributes?.color === selectedColor
                  );
                  const isVarSold = (checkVariant?.stock_qty ?? 0) <= 0;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                        selectedSize === size
                          ? 'bg-[#1A1715] text-white shadow-sm'
                          : 'bg-white border border-[#DDD4CB] text-[#1A1715] hover:border-[#1A1715]'
                      }`}
                    >
                      <span>{size}</span>
                      {isVarSold && (
                        <span className="block text-[9px] font-normal text-red-500 line-through">
                          {isAr ? 'نفد' : 'out'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real Stock Inventory Status */}
          <div className="p-3.5 rounded-xl bg-[#F8F5F1] border border-[#E8E1D9] text-xs flex items-center justify-between">
            <span className="text-[#695E57]">{isAr ? 'حالة المخزون للقطعة:' : 'Inventory availability:'}</span>
            {isSoldOut ? (
              <span className="font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                {isAr ? 'نفد المخزون لهذا التنسيق' : 'Sold Out for this combination'}
              </span>
            ) : (
              <span className="font-bold text-[#2C5251] bg-[#EDF5F2] px-2.5 py-0.5 rounded-full border border-[#CDE0D9]">
                {isAr ? `متوفر (${currentStock} قطع متبقية)` : `In Stock (${currentStock} remaining)`}
              </span>
            )}
          </div>

          {/* Quantity Selector & Add to Bag */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {!isSoldOut && (
                <div className="flex items-center border border-[#DDD4CB] rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-sm font-bold text-[#695E57] hover:text-[#1A1715]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1A1715]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    className="px-2 py-1 text-sm font-bold text-[#695E57] hover:text-[#1A1715]"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] disabled:bg-[#BDB4AC] disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C89B8C]" />
                <span>
                  {isSoldOut
                    ? (isAr ? 'نفد هذا التنسيق' : 'Unavailable / Sold Out')
                    : (isAr ? 'إضافة إلى حقيبة التسوق' : 'Add to Shopping Bag')}
                </span>
              </button>
            </div>

            {addedNotice && (
              <div className="p-3 rounded-xl bg-[#EDF5F2] border border-[#CDE0D9] text-[#2C5251] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
                <span>{addedNotice}</span>
                <Link href={`/${locale}/preview/ecommerce/cart`} className="ml-auto rtl:ml-0 rtl:mr-auto font-bold underline">
                  {isAr ? 'عرض الحقيبة ←' : 'View Bag →'}
                </Link>
              </div>
            )}
          </div>

          {/* Delivery & Assurance Notes */}
          <div className="space-y-2 pt-4 border-t border-[#EAE3DB] text-xs text-[#695E57]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C89B8C]" />
              <span>{isAr ? 'شحن تجريبي خلال 2-4 أيام عمل في جميع أنحاء مصر' : 'Simulated 2–4 business day delivery across Egypt'}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#C89B8C]" />
              <span>{isAr ? 'استبدال مجاني خلال 14 يوماً وفق الشروط التجريبية' : '14-day sample exchange window'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Material & Care Story */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE5DF] shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'الأقمشة والعناية' : 'Tactile Qualities & Care'}
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
            {isAr ? 'مواصفات النسيج وتعليمات الحفظ' : 'Material Narrative & Garment Maintenance'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#524842] leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#F8F5F1] border border-[#E8E1D9] space-y-2">
            <h4 className="font-serif text-base font-bold text-[#1A1715] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C89B8C]" />
              <span>{isAr ? 'تكوين النسيج والملمس' : 'Fabric Composition'}</span>
            </h4>
            <p>{product.body?.fabric || (isAr ? 'كتان طبيعي مصري معالج بالغسيل الهوائي لمنح النسيج نعومة فورية دون فقدان متانته.' : 'Natural Egyptian linen, air-washed to impart immediate softness while retaining tensile fiber strength.')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8F5F1] border border-[#E8E1D9] space-y-2">
            <h4 className="font-serif text-base font-bold text-[#1A1715] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C89B8C]" />
              <span>{isAr ? 'إرشادات الغسيل والحفظ' : 'Care Guidelines'}</span>
            </h4>
            <p>{product.body?.care || (isAr ? 'يُفضل الغسيل اليدوي بماء بارد أو التنظيف الجاف للحفاظ على ثبات الألوان ونعومة الألياف.' : 'Dry clean or gentle cold cycle with non-biological detergent. Hang dry in shade to preserve color saturation.')}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#1A1715]">
              {isAr ? 'قطع متناسقة قد تعجبك' : 'Complementary Atelier Pieces'}
            </h3>
            <Link
              href={`/${locale}/preview/ecommerce/collections`}
              className="text-xs font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1"
            >
              <span>{isAr ? 'تصفح المزيد' : 'View more'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map(p => (
              <ProductCard key={p.id} locale={locale} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-[#DDD4CB]">
            <div className="flex items-center justify-between border-b border-[#F0EAE3] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                {isAr ? 'دليل مقاسات نوريا أتيليه' : 'Noria Atelier Size Guide'}
              </h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-[#8C7D73] hover:text-[#1A1715] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#695E57] leading-relaxed">
              {isAr
                ? 'قصاتنا مصممة بأسلوب فضفاض ومريح يمنح الجسم حرية الحركة. المقاسات موضحة بالسنتيمتر:'
                : 'Our cuts favor relaxed, contemporary drape. Measurements are provided in centimeters (cm):'}
            </p>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE3DB] text-[#8C7D73] font-mono">
                    <th className="py-2 px-3">{isAr ? 'المقاس' : 'Size'}</th>
                    <th className="py-2 px-3">{isAr ? 'محيط الصدر' : 'Bust'}</th>
                    <th className="py-2 px-3">{isAr ? 'الخصر' : 'Waist'}</th>
                    <th className="py-2 px-3">{isAr ? 'الأرداف' : 'Hips'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE3] text-[#1A1715]">
                  <tr><td className="py-2.5 px-3 font-bold">S</td><td className="py-2.5 px-3">84-88 cm</td><td className="py-2.5 px-3">66-70 cm</td><td className="py-2.5 px-3">92-96 cm</td></tr>
                  <tr><td className="py-2.5 px-3 font-bold">M</td><td className="py-2.5 px-3">89-94 cm</td><td className="py-2.5 px-3">71-76 cm</td><td className="py-2.5 px-3">97-102 cm</td></tr>
                  <tr><td className="py-2.5 px-3 font-bold">L</td><td className="py-2.5 px-3">95-102 cm</td><td className="py-2.5 px-3">77-84 cm</td><td className="py-2.5 px-3">103-110 cm</td></tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-right rtl:text-left">
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1A1715] text-white text-xs font-semibold"
              >
                {isAr ? 'إغلاق الدليل' : 'Close Guide'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

