'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { useCart } from '@/lib/ecommerce/cart-context';
import {
  ShoppingBag, Trash2, ArrowRight, ArrowLeft, Tag,
  Truck, ShieldCheck, AlertCircle, CheckCircle2
} from 'lucide-react';

interface Props {
  locale: Locale;
}

export default function EcommerceCartClient({ locale }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotalCents,
    shippingZone,
    setShippingZone,
    couponCode,
    setCouponCode,
    couponDiscountCents,
    setCouponDiscountCents,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);

  const zoneRates: Record<string, number> = {
    'Cairo': 7000,
    'Alexandria': 9500,
    'Other Egypt': 12500
  };

  const shippingCents = zoneRates[shippingZone] || 7000;
  const totalCents = Math.max(0, subtotalCents + shippingCents - couponDiscountCents);

  const subtotalEgp = Math.round(subtotalCents / 100);
  const shippingEgp = Math.round(shippingCents / 100);
  const discountEgp = Math.round(couponDiscountCents / 100);
  const totalEgp = Math.round(totalCents / 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    const clean = inputCoupon.trim().toUpperCase();
    if (!clean) return;

    setIsVerifyingCoupon(true);
    try {
      const res = await fetch('/api/demo/ecommerce/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean, subtotalCents })
      });
      const data = await res.json();

      if (data.valid) {
        setCouponCode(clean);
        setCouponDiscountCents(data.discountCents);
        setCouponSuccess(data.message);
      } else {
        setCouponError(data.message || (isAr ? 'كود القسيمة غير صالح' : 'Invalid coupon code'));
        setCouponDiscountCents(0);
      }
    } catch (err: any) {
      setCouponError(err.message || 'Error validating coupon');
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountCents(0);
    setInputCoupon('');
    setCouponSuccess(null);
    setCouponError(null);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-[#EBE5DF] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#F3EFEA] text-[#8C7D73] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
          {isAr ? 'حقيبة التسوق فارغة' : 'Your Shopping Bag is Empty'}
        </h2>
        <p className="text-xs sm:text-sm text-[#695E57] leading-relaxed">
          {isAr
            ? 'لم تقم بإضافة أي قطع إلى حقيبتك بعد. تصفح تشكيلاتنا واختر المقاس واللون المفضل لديك.'
            : 'You haven’t added any atelier garments yet. Browse our collections to select your favorite pieces.'}
        </p>
        <div className="pt-2">
          <Link
            href={`/${locale}/preview/ecommerce/collections`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold transition-colors"
          >
            <span>{isAr ? 'تصفح التشكيلات' : 'Explore Collections'}</span>
            <Arrow className="w-4 h-4 text-[#C89B8C]" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left: Cart Line Items */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#1A1715]">
            {isAr ? 'القطع المختارة في حقيبتك' : 'Garments in Bag'}
          </h2>

          <div className="divide-y divide-[#F0EAE3]">
            {cart.map(item => {
              const lineTotalEgp = Math.round((item.priceCents * item.quantity) / 100);
              return (
                <div key={item.variantId} className="py-5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 rounded-xl bg-[#F5F0EA] border border-[#DDD4CB] flex flex-col items-center justify-center flex-shrink-0 text-[#8C7D73]">
                      <span className="font-serif font-bold text-sm text-[#1A1715]">{item.title.slice(0, 2)}</span>
                      <span className="text-[9px] font-mono">{item.size}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-sm sm:text-base font-bold text-[#1A1715]">
                        <Link href={`/${locale}/preview/ecommerce/products/${item.slug}`} className="hover:text-[#C89B8C] transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#8C7D73]">
                        <span>{isAr ? 'المقاس:' : 'Size:'} <strong className="text-[#1A1715] font-mono">{item.size}</strong></span>
                        <span>•</span>
                        <span>{isAr ? 'اللون:' : 'Color:'} <strong className="text-[#1A1715] uppercase font-mono">{item.color}</strong></span>
                      </div>
                      <div className="text-[11px] font-mono text-[#8C7D73]">
                        SKU: {item.sku}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex items-center border border-[#DDD4CB] rounded-lg bg-[#FAF8F5] px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.variantId, -1)}
                            className="px-1.5 py-0.5 text-xs font-bold text-[#695E57] hover:text-[#1A1715]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1A1715]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="px-1.5 py-0.5 text-xs font-bold text-[#695E57] hover:text-[#1A1715] disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>
                        {item.quantity >= item.maxStock && (
                          <span className="text-[10px] text-[#C89B8C]">
                            {isAr ? 'الحد الأقصى للمخزون' : 'Max stock'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Delete */}
                  <div className="text-right rtl:text-left space-y-2">
                    <div className="font-serif text-base font-bold text-[#1A1715]">
                      {lineTotalEgp} <span className="text-xs font-sans text-[#695E57]">EGP</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-[#8C7D73] hover:text-red-600 transition-colors"
                      title={isAr ? 'حذف' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Order Pricing Breakdown & Promotion */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#1A1715]">
            {isAr ? 'ملخص الحساب والرسوم' : 'Order Summary'}
          </h2>

          {/* Shipping Zone Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1715]">
              {isAr ? 'منطقة الشحن في مصر:' : 'Shipping Destination:'}
            </label>
            <select
              value={shippingZone}
              onChange={e => setShippingZone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5F1] border border-[#DDD4CB] text-xs font-semibold text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
            >
              <option value="Cairo">{isAr ? 'القاهرة الكبرى والجيزة (70 EGP)' : 'Greater Cairo & Giza (70 EGP)'}</option>
              <option value="Alexandria">{isAr ? 'الإسكندرية والساحل (95 EGP)' : 'Alexandria & Coast (95 EGP)'}</option>
              <option value="Other Egypt">{isAr ? 'باقي المحافظات (125 EGP)' : 'Other Governorates (125 EGP)'}</option>
            </select>
          </div>

          {/* Promo Code Input */}
          <div className="space-y-2 pt-2 border-t border-[#F0EAE3]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1715] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#C89B8C]" />
              <span>{isAr ? 'رمز القسيمة الترويجية (Demo Promo):' : 'Promotion Code:'}</span>
            </label>

            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#EDF5F2] border border-[#CDE0D9] text-xs">
                <span className="font-mono font-bold text-[#2C5251]">{couponCode}</span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 hover:underline font-medium"
                >
                  {isAr ? 'إلغاء' : 'Remove'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={e => setInputCoupon(e.target.value)}
                  placeholder="DEMO10, OLD20, HUGE"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#F8F5F1] border border-[#DDD4CB] text-xs uppercase font-mono text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
                />
                <button
                  type="submit"
                  disabled={isVerifyingCoupon || !inputCoupon.trim()}
                  className="px-4 py-2 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {isVerifyingCoupon ? '...' : (isAr ? 'تطبيق' : 'Apply')}
                </button>
              </form>
            )}

            {couponSuccess && (
              <p className="text-xs text-[#2C5251] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{couponSuccess}</span>
              </p>
            )}
            {couponError && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{couponError}</span>
              </p>
            )}
          </div>

          {/* Pricing Arithmetic Breakdown */}
          <div className="space-y-2 pt-4 border-t border-[#F0EAE3] text-xs">
            <div className="flex justify-between text-[#695E57]">
              <span>{isAr ? 'المجموع الفرعي للقطع:' : 'Items Subtotal:'}</span>
              <span className="font-semibold text-[#1A1715]">{subtotalEgp} EGP</span>
            </div>
            <div className="flex justify-between text-[#695E57]">
              <span>{isAr ? 'رسوم الشحن التقديرية:' : 'Standard Shipping:'}</span>
              <span className="font-semibold text-[#1A1715]">{shippingEgp} EGP</span>
            </div>
            {discountEgp > 0 && (
              <div className="flex justify-between text-[#2C5251] font-medium">
                <span>{isAr ? 'خصم القسيمة الترويجية:' : 'Promotional Discount:'}</span>
                <span>-{discountEgp} EGP</span>
              </div>
            )}
            <div className="flex justify-between text-sm sm:text-base font-bold text-[#1A1715] pt-3 border-t border-[#EAE3DB]">
              <span>{isAr ? 'الإجمالي النهائي:' : 'Estimated Total:'}</span>
              <span className="font-serif text-lg">{totalEgp} EGP</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="pt-2">
            <Link
              href={`/${locale}/preview/ecommerce/checkout`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <span>{isAr ? 'المتابعة للدفع عند الاستلام (تجريبي)' : 'Proceed to Simulated Checkout'}</span>
              <Arrow className="w-4 h-4 text-[#C89B8C]" />
            </Link>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D9] text-[11px] text-[#8C7D73] text-center">
            {isAr
              ? 'نموذج تجريبي لمافيكس: لا يتم طلب أي بطاقات ائتمان فعلية. الدفع محاكاة بالدفع عند الاستلام COD.'
              : 'Mavvix demo: No real credit cards collected. Cash-on-delivery COD simulation only.'}
          </div>
        </div>
      </div>
    </div>
  );
}

