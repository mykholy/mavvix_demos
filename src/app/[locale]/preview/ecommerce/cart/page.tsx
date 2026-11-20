import React from 'react';
import { Locale } from '@/lib/i18n/config';
import EcommerceCartClient from './EcommerceCartClient';

export const metadata = {
  title: 'Shopping Bag & Order Summary | Noria Atelier',
  description: 'Review your selected garments, choose your shipping zone, and apply demo promotion coupons.'
};

export default function EcommerceCartPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'حقيبة التسوق' : 'Shopping Bag'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'مراجعة الحقيبة والتسعير' : 'Order Calculation & Cart'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'تحقق من القطع والمقاسات المختارة، ورمز القسيمة الترويجية، ومطابقة الرسوم مع محرك التسعير الخادم.'
              : 'Review your selected garments, apply demo promotional coupons, and verify deterministic order arithmetic.'}
          </p>
        </div>

        <EcommerceCartClient locale={locale} />
      </div>
    </div>
  );
}

