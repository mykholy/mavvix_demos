'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOrder } from '@/lib/restaurant/order-context';
import { LocalizedRestaurantBranch } from '@/lib/db/repositories';

export function RestaurantOrderClient({
  branches,
  locale,
}: {
  branches: LocalizedRestaurantBranch[];
  locale: 'ar' | 'en';
}) {
  const isAr = locale === 'ar';
  const {
    items,
    updateQuantity,
    removeItem,
    clearOrder,
    subtotalCents,
    packagingFeeCents,
    totalCents,
    generateOrderText,
  } = useOrder();

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || 'rest-branch-1');
  const [pickupNote, setPickupNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any | null>(null);

  const handleCopyOrderText = async () => {
    const text = generateOrderText(locale);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  const handleSimulateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setErrorMessage(null);

    const branch = branches.find(b => b.id === selectedBranchId) || branches[0];

    const payload = {
      guestName,
      guestPhone,
      branchId: branch.id,
      branchName: branch.name,
      pickupNote,
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
    };

    const lines = items.map(item => ({
      source_type: 'restaurant_dish',
      source_id: item.dishId,
      quantity: item.quantity,
      unit_price_cents: item.unitPriceCents,
      modifiers: [
        ...(item.sizeLabel ? [{ type: 'size', label: item.sizeLabel }] : []),
        ...(item.extrasLabels || []).map(ex => ({ type: 'extra', label: ex }))
      ],
      snapshot: {
        name: item.name,
        size: item.sizeLabel,
        extras: item.extrasLabels || [],
      }
    }));

    try {
      const res = await fetch('/api/demo/restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'restaurant_order',
          payload,
          lines,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit demo order');
      }

      setReceipt({
        refNumber: data.refNumber,
        submissionId: data.submissionId,
        order: data.order,
        branch: branch.name,
        placedAt: new Date().toLocaleTimeString(locale === 'ar' ? 'ar-EG' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      clearOrder();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error recording order simulation');
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#321F18]/15 p-8 sm:p-10 shadow-xl space-y-8 text-start">
        {/* Receipt Header */}
        <div className="border-b border-[#321F18]/10 pb-6 text-center space-y-2">
          <span className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl mx-auto">
            ✓
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#BA5C34] block">
            {isAr ? 'إيصال طلب تجريبي • غير فعلي' : 'SIMULATED DEMO ORDER RECEIPT'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18]">
            {isAr ? 'تم تسجيل الطلب التجريبي في قاعدة البيانات' : 'Demo Order Recorded in SQLite'}
          </h2>
          <p className="text-xs text-[#321F18]/70 max-w-md mx-auto">
            {receipt.order?.disclaimer || (isAr
              ? 'طلب استعراضي للعرض التقني — لا يتم إرساله إلى المطبخ ولا يترتب عليه أي التزام مالي.'
              : 'Concept demonstration — not sent to kitchen or POS. No real payment charged.')}
          </p>
        </div>

        {/* Ref Info Box */}
        <div className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#321F18]/60">{isAr ? 'رقم الإيصال المرجعي:' : 'Reference Number:'}</span>
            <span className="font-mono font-bold text-[#BA5C34] text-sm">{receipt.refNumber}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#321F18]/60">{isAr ? 'فرع الاستلام المحدد:' : 'Pickup Branch:'}</span>
            <span className="font-semibold text-[#321F18]">{receipt.branch}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#321F18]/60">{isAr ? 'وقت التسجيل التقديري:' : 'Recorded Time:'}</span>
            <span className="text-[#321F18]">{receipt.placedAt}</span>
          </div>
        </div>

        {/* Breakdown of Totals */}
        <div className="space-y-2 text-xs border-b border-[#321F18]/10 pb-4">
          <div className="flex justify-between text-[#321F18]/70">
            <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}:</span>
            <span>{((receipt.order?.subtotalCents || 0) / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}</span>
          </div>
          <div className="flex justify-between text-[#321F18]/70">
            <span>{isAr ? 'رسوم التغليف التجريبية' : 'Demo Packaging Fee'}:</span>
            <span>{((receipt.order?.packagingCents || 1500) / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}</span>
          </div>
          <div className="pt-2 border-t border-[#321F18]/10 flex justify-between font-bold text-base text-[#321F18]">
            <span>{isAr ? 'الإجمالي التقديري' : 'Calculated Total'}:</span>
            <span className="font-serif text-[#BA5C34]">
              {((receipt.order?.totalCents || 0) / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}
            </span>
          </div>
        </div>

        {/* Commercial Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-semibold">
            {isAr ? 'جاهز للاستخدام التجاري في مطعمك' : 'Ready For Commercial Implementation'}
          </p>
          <p className="text-[11px] text-amber-800">
            {isAr
              ? 'يمكن ربط هذا النظام مباشرة بمطبخك، طابعات الإيصالات الحرارية، أو بوابات الدفع الإلكتروني (Paymob/Fawry).'
              : 'This workflow can connect to your physical kitchen displays, thermal ticket printers, and local payment gateways.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Link
            href={`/${locale}/preview/restaurant/menu`}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-[#BA5C34] text-white text-center font-semibold text-xs hover:bg-[#9E4A28] transition-colors"
          >
            {isAr ? 'العودة للقائمة' : 'Back to Menu'}
          </Link>
          <button
            type="button"
            onClick={() => setReceipt(null)}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-[#FAF3E6] border border-[#321F18]/20 text-[#321F18] text-center font-semibold text-xs hover:bg-[#FAF3E6]/70 transition-colors"
          >
            {isAr ? 'إنشاء طلب تجريبي آخر' : 'New Demo Order'}
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center bg-white rounded-3xl border border-[#321F18]/15 space-y-6">
        <span className="text-5xl block">🍲</span>
        <h2 className="font-serif text-2xl font-bold text-[#321F18]">
          {isAr ? 'حقيبة الطلب فارغة حاليًا' : 'Your Demo Order Bag is Empty'}
        </h2>
        <p className="text-xs text-[#321F18]/70 leading-relaxed max-w-sm mx-auto">
          {isAr
            ? 'تصفح قائمة الطعام الشرقية، اختر أطباقك المفضلة، وحدد خيارات الحجم والإضافات لتجربة نموذج الطلب التفاعلي.'
            : 'Explore our heritage menu, customize portion sizes and ingredients, and experience our real-time order builder.'}
        </p>
        <div>
          <Link
            href={`/${locale}/preview/restaurant/menu`}
            className="inline-block px-6 py-3 rounded-xl bg-[#BA5C34] text-white text-xs font-semibold hover:bg-[#9E4A28] transition-colors shadow-sm"
          >
            {isAr ? 'استكشف قائمة الطعام والطلب' : 'Explore Menu & Start Order'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-start">
      {/* Left Column: Line Items */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between border-b border-[#321F18]/10 pb-4">
          <h2 className="font-serif text-2xl font-bold text-[#321F18]">
            {isAr ? 'الأطباق المختارة' : 'Selected Dishes'} ({items.length})
          </h2>
          <button
            type="button"
            onClick={clearOrder}
            className="text-xs text-rose-700 hover:underline font-semibold"
          >
            {isAr ? 'إفراغ القائمة' : 'Clear All'}
          </button>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {items.map(item => {
            const lineTotal = ((item.unitPriceCents * item.quantity) / 100).toFixed(0);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#321F18]/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-[#321F18]">
                      {item.name}
                    </h3>
                    {item.sizeLabel && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF3E6] border border-[#321F18]/10 text-[#4A2318] font-bold">
                        {item.sizeLabel}
                      </span>
                    )}
                  </div>

                  {item.extrasLabels && item.extrasLabels.length > 0 && (
                    <p className="text-[11px] text-[#321F18]/70">
                      + {item.extrasLabels.join(', ')}
                    </p>
                  )}

                  <span className="text-xs text-[#4A2318] block font-mono font-semibold">
                    {(item.unitPriceCents / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={isAr ? 'تقليل الكمية' : 'Decrease quantity'}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-[#FAF3E6] border border-[#321F18]/20 flex items-center justify-center font-bold text-xs hover:bg-[#321F18] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={isAr ? 'زيادة الكمية' : 'Increase quantity'}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-[#FAF3E6] border border-[#321F18]/20 flex items-center justify-center font-bold text-xs hover:bg-[#321F18] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-serif text-base font-bold text-[#321F18] min-w-[70px] text-end">
                    {lineTotal} <span className="text-xs font-normal">{isAr ? 'ج.م' : 'EGP'}</span>
                  </span>

                  {/* Remove Button */}
                  <button
                    type="button"
                    aria-label={isAr ? 'حذف الطبق من الطلب' : 'Remove item from order'}
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-[#321F18]/60 hover:text-rose-700 p-1 font-bold"
                    title={isAr ? 'حذف' : 'Remove'}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Copyable Order Preview Box */}
        <div className="bg-[#FAF3E6] rounded-2xl border border-[#321F18]/15 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-[#BA5C34]">
              {isAr ? 'نص الطلب المنسق للمشاركة' : 'Formatted Order Text Preview'}
            </span>
            <button
              type="button"
              id="copy-order-text-btn"
              onClick={handleCopyOrderText}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#321F18] text-[#FAF3E6] hover:bg-[#BA5C34] transition-colors"
            >
              {copied ? (isAr ? '✓ تم النسخ!' : '✓ Copied!') : (isAr ? 'نسخ النص' : 'Copy Text')}
            </button>
          </div>
          <pre className="p-3 bg-white/70 rounded-xl border border-[#321F18]/10 text-[11px] font-mono text-[#321F18] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
            {generateOrderText(locale)}
          </pre>
        </div>
      </div>

      {/* Right Column: Order Checkout & Simulation Submit */}
      <div className="lg:col-span-5">
        <form
          onSubmit={handleSimulateOrder}
          className="sticky top-28 bg-white rounded-3xl border border-[#321F18]/15 p-8 shadow-xl space-y-6"
        >
          <div className="border-b border-[#321F18]/10 pb-4">
            <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
              {isAr ? 'محاكاة الطلب والاستلام' : 'Simulated Pickup Order'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#321F18] mt-1">
              {isAr ? 'تفاصيل الاستلام' : 'Order Details'}
            </h3>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {errorMessage}
            </div>
          )}

          {/* Guest Name */}
          <div className="space-y-1.5">
            <label htmlFor="order-guest-name" className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'اسم الضيف (تجريبي):' : 'Guest Name (Demo):'}
            </label>
            <input
              id="order-guest-name"
              aria-label={isAr ? 'اسم الضيف' : 'Guest Name'}
              type="text"
              required
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>

          {/* Guest Phone */}
          <div className="space-y-1.5">
            <label htmlFor="order-guest-phone" className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'رقم الهاتف للتواصل (تجريبي):' : 'Phone Contact (Demo):'}
            </label>
            <input
              id="order-guest-phone"
              aria-label={isAr ? 'رقم الهاتف للتواصل' : 'Phone Contact'}
              type="text"
              required
              value={guestPhone}
              onChange={e => setGuestPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>

          {/* Pickup Branch */}
          <div className="space-y-1.5">
            <label htmlFor="order-pickup-branch" className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'فرع الاستلام:' : 'Pickup Branch:'}
            </label>
            <select
              id="order-pickup-branch"
              aria-label={isAr ? 'فرع الاستلام' : 'Pickup Branch'}
              value={selectedBranchId}
              onChange={e => setSelectedBranchId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18] bg-white font-medium"
            >
              {branches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.district})
                </option>
              ))}
            </select>
          </div>

          {/* Kitchen Note */}
          <div className="space-y-1.5">
            <label htmlFor="order-pickup-notes" className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'ملاحظات التحضير أو الحساسية:' : 'Kitchen Preparation Notes:'}
            </label>
            <textarea
              id="order-pickup-notes"
              aria-label={isAr ? 'ملاحظات التحضير أو الحساسية' : 'Kitchen Preparation Notes'}
              rows={2}
              value={pickupNote}
              onChange={e => setPickupNote(e.target.value)}
              placeholder={isAr ? 'مثال: بدون بصل، أو توابل إضافية جانبيًا...' : 'e.g. dressing on the side, extra napkins...'}
              className="w-full px-3.5 py-2 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>

          {/* Price Breakdown */}
          <div className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-2 text-xs">
            <div className="flex justify-between text-[#321F18]/70">
              <span>{isAr ? 'المجموع الفرعي للأطباق' : 'Items Subtotal'}:</span>
              <span>{(subtotalCents / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}</span>
            </div>
            <div className="flex justify-between text-[#321F18]/70">
              <span>{isAr ? 'رسوم التغليف التجريبي' : 'Sample Packaging Fee'}:</span>
              <span>{(packagingFeeCents / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}</span>
            </div>
            <div className="pt-2 border-t border-[#321F18]/10 flex justify-between font-bold text-sm text-[#321F18]">
              <span>{isAr ? 'الإجمالي التقديري' : 'Estimated Total'}:</span>
              <span className="font-serif text-xl text-[#BA5C34]">
                {(totalCents / 100).toFixed(0)} <span className="text-xs font-normal text-[#321F18]">{isAr ? 'ج.م' : 'EGP'}</span>
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="simulate-order-submit-btn"
            disabled={submitting || items.length === 0}
            className="w-full py-4 px-6 rounded-2xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] disabled:opacity-50 font-semibold text-sm transition-all shadow-md shadow-[#BA5C34]/20 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>{isAr ? 'جارٍ تسجيل الطلب التجريبي...' : 'Recording Demo Order...'}</span>
            ) : (
              <>
                <span>{isAr ? 'تسجيل طلب تجريبي (بدون دفع فعلي)' : 'Simulate Order (No Real Payment)'}</span>
                <span>→</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[#4A2318] font-semibold">
            {isAr
              ? 'يُحفظ هذا الطلب في قاعدة بيانات SQLite المحلية لإظهاره في لوحة الإدارة للمراجعة.'
              : 'Persists to local SQLite demo_submissions for demonstration in the admin studio.'}
          </p>
        </form>
      </div>
    </div>
  );
}
