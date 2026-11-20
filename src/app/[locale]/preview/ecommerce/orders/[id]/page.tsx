import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getSubmissionById } from '@/lib/db/repositories';
import {
  CheckCircle2, AlertCircle, ShoppingBag, Truck,
  MapPin, Clock, ArrowRight, ArrowLeft, Printer
} from 'lucide-react';

export async function generateMetadata({
  params: { id }
}: {
  params: { id: string }
}) {
  return {
    title: `Order Receipt | Noria Atelier`,
    description: `Simulated order confirmation for ID: ${id}`
  };
}

export default function EcommerceOrderReceiptPage({
  params: { locale, id }
}: {
  params: { locale: Locale; id: string }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const order = getSubmissionById(id);
  if (!order || order.site_slug !== 'ecommerce') {
    notFound();
  }

  const payload = order.payload || {};
  const lines = order.lines || [];

  const subtotalEgp = Math.round((payload.subtotalCents || 0) / 100);
  const shippingEgp = Math.round((payload.shippingCents || 7000) / 100);
  const discountEgp = Math.round((payload.discountCents || 0) / 100);
  const totalEgp = Math.round((payload.totalCents || 0) / 100);

  // Redact phone slightly for display security
  const phone = payload.recipientPhone || '';
  const maskedPhone = phone.length > 5 ? phone.slice(0, 4) + ' ••• ' + phone.slice(-3) : phone;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success & Demo Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C89B8C] shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#F7EFEA] text-[#1A1715] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 text-[#C89B8C]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#695E57] bg-[#F3EFEA] px-3 py-1 rounded-full">
              {isAr ? 'تم تسجيل الطلب التجريبي في قاعدة البيانات' : 'Simulated Order Recorded in SQLite'}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715]">
              {isAr ? 'شكراً لطلبك من نوريا أتيليه' : 'Thank You for Your Order'}
            </h1>
            <p className="text-xs sm:text-sm text-[#695E57]">
              {isAr ? 'رقم مرجع الطلب:' : 'Order Reference Number:'} <strong className="font-mono text-[#1A1715]">{payload.refNumber || order.id}</strong>
            </p>
          </div>
        </div>

        {/* Prominent Demo Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">
              {isAr ? 'إشعار المحاكاة التجارية (Mavvix Demo Order)' : 'Simulated Commercial Transaction'}
            </h4>
            <p className="text-amber-800 leading-relaxed">
              {isAr
                ? 'هذا الطلب مسجل كبيانات تجريبية داخل قاعدة بيانات مافيكس. لم يتم سحب أي أموال ولن يتم شحن بضائع فعلية.'
                : 'This transaction is a recorded demonstration entry in our private SQLite database. No real money has been charged and no physical shipment will dispatch.'}
            </p>
          </div>
        </div>

        {/* Order Details & Line Items */}
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EAE3]">
            <div className="text-xs text-[#8C7D73]">
              <span className="block font-semibold text-[#1A1715]">{isAr ? 'طريقة الدفع:' : 'Payment Method:'}</span>
              <span>{isAr ? 'الدفع عند الاستلام (محاكاة)' : 'Cash on Delivery (Simulated)'}</span>
            </div>
            <div className="text-xs text-[#8C7D73] text-right rtl:text-left">
              <span className="block font-semibold text-[#1A1715]">{isAr ? 'الحالة:' : 'Status:'}</span>
              <span className="font-mono font-bold text-[#2C5251] uppercase">{order.status}</span>
            </div>
          </div>

          {/* Line items list */}
          <div className="divide-y divide-[#F0EAE3]">
            {lines.map((l: any, idx: number) => {
              const snapshot = l.snapshot || {};
              const lineTotal = Math.round((l.unit_price_cents * l.quantity) / 100);
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-serif font-bold text-[#1A1715] text-sm">
                      {snapshot.title || l.title || 'Atelier Item'}
                    </h4>
                    <p className="text-[#8C7D73] font-mono mt-0.5">
                      {snapshot.size} • {snapshot.color} (x{l.quantity})
                    </p>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#1A1715]">
                    {lineTotal} EGP
                  </span>
                </div>
              );
            })}
          </div>

          {/* Recalculated Financial Breakdown */}
          <div className="space-y-2 pt-4 border-t border-[#F0EAE3] text-xs">
            <div className="flex justify-between text-[#695E57]">
              <span>{isAr ? 'المجموع الفرعي للقطع:' : 'Subtotal:'}</span>
              <span className="font-semibold text-[#1A1715]">{subtotalEgp} EGP</span>
            </div>
            <div className="flex justify-between text-[#695E57]">
              <span>{isAr ? 'الشحن والتوصيل:' : 'Shipping:'}</span>
              <span className="font-semibold text-[#1A1715]">{shippingEgp} EGP</span>
            </div>
            {discountEgp > 0 && (
              <div className="flex justify-between text-[#2C5251] font-medium">
                <span>{isAr ? 'خصم القسيمة الترويجية:' : 'Promotion Code Discount:'}</span>
                <span>-{discountEgp} EGP</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#1A1715] pt-3 border-t border-[#EAE3DB]">
              <span>{isAr ? 'الإجمالي النهائي المطلوب:' : 'Final Simulated Total:'}</span>
              <span className="font-serif text-xl">{totalEgp} EGP</span>
            </div>
          </div>
        </div>

        {/* Redacted Shipping Destination */}
        <div className="bg-white rounded-3xl border border-[#EBE5DF] p-6 sm:p-8 space-y-3 shadow-sm text-xs">
          <h3 className="font-serif text-base font-bold text-[#1A1715]">
            {isAr ? 'بيانات التوصيل المسجلة' : 'Delivery Coordinates (Redacted)'}
          </h3>
          <div className="space-y-1 text-[#695E57]">
            <p><strong>{isAr ? 'المستلم:' : 'Name:'}</strong> {payload.recipientName}</p>
            <p><strong>{isAr ? 'الهاتف:' : 'Phone:'}</strong> {maskedPhone}</p>
            <p><strong>{isAr ? 'المنطقة والعنوان:' : 'Zone & Street:'}</strong> {payload.shippingZone} — {payload.streetAddress}</p>
            {payload.notes && <p><strong>{isAr ? 'الملاحظات:' : 'Notes:'}</strong> {payload.notes}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={`/${locale}/preview/ecommerce/collections`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold text-center transition-colors"
          >
            {isAr ? 'مواصلة التسوق في الأتيليه' : 'Continue Shopping'}
          </Link>
          <Link
            href={`/${locale}/showcase`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-[#DDD4CB] text-[#1A1715] text-xs font-semibold text-center hover:bg-[#F3EFEA] transition-colors"
          >
            {isAr ? 'العودة لمعرض النماذج' : 'Back to Showcase'}
          </Link>
        </div>
      </div>
    </div>
  );
}

