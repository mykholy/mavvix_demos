import React from 'react';
import { Locale } from '@/lib/i18n/config';
import EcommerceCheckoutClient from './EcommerceCheckoutClient';

export const metadata = {
  title: 'Simulated COD Checkout | Noria Atelier',
  description: 'Complete your simulated order with verified server recalculation and Cash-on-Delivery demonstration.'
};

export default async function EcommerceCheckoutPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'إتمام الشراء' : 'Secure Checkout'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715]">
            {isAr ? 'تأكيد الطلب التوضيحي' : 'Simulated Order Checkout'}
          </h1>
          <p className="text-sm sm:text-base text-[#695E57] leading-relaxed">
            {isAr
              ? 'أدخل بيانات التوصيل التجريبية لتسجيل الطلب في قاعدة بيانات مافيكس مع إعادة احتساب الأسعار خادمياً.'
              : 'Enter simulated shipping coordinates to record the order in SQLite with server-side price recalculation.'}
          </p>
        </div>

        <EcommerceCheckoutClient locale={locale} />
      </div>
    </div>
  );
}

