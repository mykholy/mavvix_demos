import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import {
  Truck, RotateCcw, HelpCircle, ShieldAlert,
  ArrowRight, ArrowLeft, Ruler, CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Client Help, Shipping & Policies | Noria Atelier',
  description: 'Shipping zones, sample return policies, fabric care, and size guidance for Noria Atelier orders.'
};

export default function EcommerceHelpPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'مركز العناية بالعملاء' : 'Customer Service & Policies'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'المساعدة وسياسات المتجر' : 'Client Care, Shipping & FAQs'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'دليل واضح حول مناطق التوصيل، ورسوم الشحن المحددة، وسياسة الاستبدال، وطرق العناية بالملابس.'
              : 'Clear guidelines regarding regional delivery zones, sample exchange windows, and garment care instructions.'}
          </p>
        </div>

        {/* Fictional Policy Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#F4E3C8] text-[#7A4B1A] text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#C97825] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[#945617]">
              {isAr ? 'سياسات الشراء مهمة قبل إتمام أي طلب' : 'Review Policies Before Ordering'}
            </h4>
            <p className="leading-relaxed">
              {isAr
                ? 'اعرف رسوم الشحن وإجراءات العناية بالمنتجات، مع ضرورة مراجعة شروط البيع والاستبدال المعتمدة من المتجر الفعلي قبل الشراء.'
                : 'Review the delivery and garment-care guidance. Actual retail charges, dispatch times and exchange terms must be confirmed by the operating retailer before a purchase.'}
            </p>
          </div>
        </div>

        {/* Shipping Zones Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE5DF] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C89B8C]" />
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">
              {isAr ? 'مناطق ورسوم التوصيل في مصر' : 'Delivery Zones & Pricing in Egypt'}
            </h2>
          </div>

          <div className="divide-y divide-[#F0EAE3] text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-[#1A1715]">{isAr ? 'القاهرة الكبرى والجيزة' : 'Greater Cairo & Giza'}</strong>
                <p className="text-[#8C7D73] mt-0.5">{isAr ? 'التوصيل خلال 2-3 أيام عمل' : '2–3 business days standard delivery'}</p>
              </div>
              <span className="font-mono font-bold text-sm text-[#1A1715]">70 EGP</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-[#1A1715]">{isAr ? 'الإسكندرية والساحل الشمالي' : 'Alexandria & North Coast'}</strong>
                <p className="text-[#8C7D73] mt-0.5">{isAr ? 'التوصيل خلال 3-4 أيام عمل' : '3–4 business days delivery'}</p>
              </div>
              <span className="font-mono font-bold text-sm text-[#1A1715]">95 EGP</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-[#1A1715]">{isAr ? 'باقي محافظات مصر والصعيد' : 'Delta, Canal & Upper Egypt'}</strong>
                <p className="text-[#8C7D73] mt-0.5">{isAr ? 'التوصيل خلال 4-5 أيام عمل' : '4–5 business days delivery'}</p>
              </div>
              <span className="font-mono font-bold text-sm text-[#1A1715]">125 EGP</span>
            </div>
          </div>
        </div>

        {/* Returns & Exchanges Protocol */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE5DF] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#C89B8C]" />
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">
              {isAr ? 'نموذج سياسة الاستبدال والاسترجاع' : 'Exchange & Returns Framework'}
            </h2>
          </div>

          <ul className="space-y-2 text-xs text-[#524842] leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
              <span>{isAr ? 'يمكن طلب استبدال المقاس خلال 14 يوماً من استلام الشحنة التجريبية.' : '14-day sample exchange window for size and fit adjustments.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
              <span>{isAr ? 'يجب أن تكون القطعة في حالتها الأصلية غير ملبوسة ومع كامل الملصقات.' : 'Garment must remain unworn with original atelier swing tags attached.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
              <span>{isAr ? 'يتم التنسيق للمعاينة أو الاستبدال عبر مندوب التوصيل المعتمد.' : 'Courier pickup coordination handled at customer door.'}</span>
            </li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE5DF] shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#C89B8C]" />
            <h2 className="font-serif text-xl font-bold text-[#1A1715]">
              {isAr ? 'الأسئلة الشائعة حول التسوق' : 'Shopping & Ordering FAQs'}
            </h2>
          </div>

          <div className="space-y-4 text-xs divide-y divide-[#F0EAE3]">
            <div className="pt-3 first:pt-0 space-y-1">
              <h4 className="font-bold text-[#1A1715]">{isAr ? 'كيف يتم التعامل مع نفاد المخزون لأحد المقاسات؟' : 'How does variant inventory tracking operate?'}</h4>
              <p className="text-[#695E57]">{isAr ? 'يتم ربط كل مقاس ولون بمخزون محدد في قاعدة البيانات، وإذا وصل المخزون إلى الصفر يتم تعطيل زر الإضافة تلقائياً مع توضيح حالة النفاد.' : 'Each size and color variant connects directly to true database stock. When stock reaches 0, the add action disables automatically with an out-of-stock badge.'}</p>
            </div>

            <div className="pt-3 space-y-1">
              <h4 className="font-bold text-[#1A1715]">{isAr ? 'ما هي الأكواد الترويجية الصالحة للتجربة في المتجر؟' : 'Which demo promotion coupon codes can I test in cart?'}</h4>
              <p className="text-[#695E57]">{isAr ? 'يمكنك اختبار كود DEMO10 (خصم 10% للطلبات فوق 1000 جنيه)، وكود OLD20 (كود منتهي لإظهار حالة الرفض)، وكود HUGE (يتطلب حدا أدنى 5000 جنيه).' : 'You can test DEMO10 (10% off for orders >= 1000 EGP), OLD20 (expired code showing validation failure), or HUGE (requires >= 5000 EGP subtotal).'}</p>
            </div>

            <div className="pt-3 space-y-1">
              <h4 className="font-bold text-[#1A1715]">{isAr ? 'هل يتطلب إتمام الطلب أي بطاقات دفع بنكية؟' : 'Are payment cards required during checkout?'}</h4>
              <p className="text-[#695E57]">{isAr ? 'لا، المتجر يدعم فقط محاكاة الدفع عند الاستلام COD دون تحصيل أي أموال حقيقية.' : 'No credit cards are processed. All orders use simulated Cash on Delivery (COD) mode.'}</p>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="text-center pt-2">
          <Link
            href={`/${locale}/preview/ecommerce/cart`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs font-semibold transition-colors shadow"
          >
            <span>{isAr ? 'العودة إلى حقيبة التسوق' : 'Return to Shopping Bag'}</span>
            <Arrow className="w-4 h-4 text-[#C89B8C]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

