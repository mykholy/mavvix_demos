'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { useCart } from '@/lib/ecommerce/cart-context';
import {
  ShoppingBag, ShieldCheck, CheckCircle2, AlertCircle,
  Truck, ArrowRight, ArrowLeft, Tag, Lock
} from 'lucide-react';

interface Props {
  locale: Locale;
}

export default function EcommerceCheckoutClient({ locale }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const router = useRouter();

  const {
    cart,
    clearCart,
    subtotalCents,
    shippingZone,
    couponCode,
    couponDiscountCents,
  } = useCart();

  // Address fields
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!recipientName.trim() || !recipientPhone.trim() || !streetAddress.trim()) {
      setErrorMessage(isAr ? 'يرجى إدخال الاسم، ورقم الهاتف، وعنوان الشارع' : 'Please complete recipient name, phone, and street address.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage(isAr ? 'يرجى الموافقة على شروط المحاكاة التجريبية' : 'Please accept the simulation terms.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderLines = cart.map(item => ({
        source_type: 'product_variant',
        source_id: item.itemId,
        variant_id: item.variantId,
        quantity: item.quantity,
        unit_price_cents: item.priceCents,
        snapshot: {
          title: item.title,
          size: item.size,
          color: item.color,
          sku: item.sku,
          category: item.category
        }
      }));

      const res = await fetch('/api/demo/ecommerce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'ecommerce_order',
          payload: {
            recipientName,
            recipientPhone,
            recipientEmail: recipientEmail || 'customer.demo@mavvix.test',
            shippingZone,
            streetAddress,
            notes,
            couponCode,
            paymentMethod: 'SIMULATED_COD',
            placedAt: new Date().toISOString()
          },
          lines: orderLines
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place demo order');
      }

      // Clear cart and redirect to order receipt
      clearCart();
      router.push(`/${locale}/preview/ecommerce/orders/${data.submissionId}?access=${encodeURIComponent(data.receiptToken)}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during checkout');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-[#EBE5DF] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
          {isAr ? 'حقيبة التسوق فارغة' : 'Your Bag is Empty'}
        </h2>
        <p className="text-xs text-[#695E57]">
          {isAr ? 'أضف بعض القطع أولاً للمتابعة إلى صفحة الدفع التجريبي.' : 'Please add garments to your bag before proceeding to simulated checkout.'}
        </p>
        <Link
          href={`/${locale}/preview/ecommerce/collections`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1715] text-white text-xs font-semibold"
        >
          <span>{isAr ? 'تصفح التشكيلات' : 'Explore Collections'}</span>
          <Arrow className="w-4 h-4 text-[#C89B8C]" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left: Shipping Details & Payment Simulation */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE3]">
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">
              {isAr ? '1. بيانات التوصيل التوضيحية' : '1. Delivery Information'}
            </h2>
            <span className="text-xs text-[#8C7D73] font-mono">
              {shippingZone}
            </span>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1715] mb-1">
                {isAr ? 'اسم المستلم (أو اسم تجريبي للعرض) *' : 'Recipient Full Name *'}
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                placeholder={isAr ? 'مثال: ياسمين فاروق (طلب تجريبي)' : 'e.g. Yasmine Farouk (Demo Order)'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD4CB] bg-[#F8F5F1] text-xs text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1715] mb-1">
                  {isAr ? 'رقم الهاتف للتواصل *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={recipientPhone}
                  onChange={e => setRecipientPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD4CB] bg-[#F8F5F1] text-xs text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1715] mb-1">
                  {isAr ? 'البريد الإلكتروني (لتلقي الملخص)' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={e => setRecipientEmail(e.target.value)}
                  placeholder="order-demo@mavvix.test"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD4CB] bg-[#F8F5F1] text-xs text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1715] mb-1">
                {isAr ? 'عنوان الشارع والمبنى *' : 'Street Address & Apt/Bldg *'}
              </label>
              <input
                type="text"
                required
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)}
                placeholder={isAr ? 'مثال: 14 شارع دمشق — مصر الجديدة (عنوان تجريبي)' : 'e.g. 14 Damascus St, Heliopolis (Demo Address)'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD4CB] bg-[#F8F5F1] text-xs text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1715] mb-1">
                {isAr ? 'ملاحظات إضافية للتوصيل (اختياري)' : 'Delivery Notes (Optional)'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={isAr ? 'مثال: ترك الطرد لدى أمن المبنى' : 'e.g. Leave with concierge desk'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD4CB] bg-[#F8F5F1] text-xs text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Option: Simulated COD only */}
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#1A1715]">
            {isAr ? '2. وسيلة الدفع (محاكاة بالدفع عند الاستلام)' : '2. Payment Method (Simulated COD)'}
          </h2>

          <div className="p-4 rounded-2xl bg-[#F8F5F1] border-2 border-[#1A1715] flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-xs text-[#1A1715] block">
                {isAr ? 'الدفع عند الاستلام — محاكاة تجريبية (COD)' : 'Cash on Delivery — Simulated (COD)'}
              </span>
              <p className="text-[11px] text-[#695E57]">
                {isAr
                  ? 'لن يتم طلب أي بطاقة بنكية. ستتلقى إيصال طلب برقم مرجعي مسجل في قاعدة البيانات.'
                  : 'No payment cards required. A verified demonstration receipt will be generated in SQLite.'}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#1A1715] text-white text-[10px] font-mono">
              ACTIVE
            </span>
          </div>

          <div className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded text-[#1A1715] focus:ring-[#1A1715]"
            />
            <label htmlFor="agreeTerms" className="text-xs text-[#695E57]">
              {isAr
                ? 'أوافق على أن هذا الطلب هو محاكاة برمجية حقيقية ضمن نموذج مافيكس التجريبي ولا يترتب عليه أي التزام مالي أو شحن فعلي.'
                : 'I acknowledge that this transaction is a real software simulation for Mavvix showcase and carries no financial or shipping obligation.'}
            </label>
          </div>
        </div>
      </div>

      {/* Right: Order Summary Sidebar & Confirmation */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#1A1715]">
            {isAr ? 'ملخص الفاتورة النهائية' : 'Order Breakdown'}
          </h2>

          {/* Quick Line Items Review */}
          <div className="space-y-2 text-xs divide-y divide-[#F0EAE3]">
            {cart.map(item => (
              <div key={item.variantId} className="pt-2 flex justify-between items-center text-[#524842]">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#1A1715]">{item.title}</span>
                  <span className="block text-[11px] text-[#8C7D73] font-mono">
                    {item.size} • {item.color} (x{item.quantity})
                  </span>
                </div>
                <span className="font-semibold text-[#1A1715]">
                  {Math.round((item.priceCents * item.quantity) / 100)} EGP
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-4 border-t border-[#F0EAE3] text-xs">
            <div className="flex justify-between text-[#695E57]">
              <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
              <span className="font-semibold text-[#1A1715]">{subtotalEgp} EGP</span>
            </div>
            <div className="flex justify-between text-[#695E57]">
              <span>{isAr ? 'الشحن:' : 'Shipping:'}</span>
              <span className="font-semibold text-[#1A1715]">{shippingEgp} EGP</span>
            </div>
            {discountEgp > 0 && (
              <div className="flex justify-between text-[#2C5251] font-medium">
                <span>{isAr ? 'الخصم الترويجي:' : 'Discount:'}</span>
                <span>-{discountEgp} EGP</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#1A1715] pt-3 border-t border-[#EAE3DB]">
              <span>{isAr ? 'الإجمالي للدفع عند الاستلام:' : 'Total (Simulated COD):'}</span>
              <span className="font-serif text-xl">{totalEgp} EGP</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="w-4 h-4 text-[#C89B8C]" />
            <span>{isSubmitting ? (isAr ? 'جاري تسجيل الطلب...' : 'Processing...') : (isAr ? 'تأكيد طلب الشراء التجريبي' : 'Confirm Simulated Order')}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

