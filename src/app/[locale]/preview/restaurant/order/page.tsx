import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantBranches } from '@/lib/db/repositories';
import { RestaurantOrderClient } from './RestaurantOrderClient';

export default async function RestaurantOrderPage(
  props: {
    params: Promise<{ locale: Locale }>;
  }
) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const branches = getRestaurantBranches(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#321F18]/10 pb-6 space-y-2 text-start">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'حقيبة الطلب التفاعلية' : 'Interactive Order Review'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#321F18]">
          {isAr ? 'مراجعة الطلب والاستلام التجريبي' : 'Demo Meal Order & Pickup Summary'}
        </h1>
        <p className="text-xs sm:text-sm text-[#321F18]/70 max-w-xl">
          {isAr
            ? 'راجع أطباقك المخصصة والكميات المحسوبة بدقة. يمكنك نسخ نص الطلب لمشاركته أو تسجيل نموذج استلام تجريبي.'
            : 'Review your customized meal items with accurate live calculations. Copy formatted plain text or test a simulated pickup ticket.'}
        </p>
      </div>

      <RestaurantOrderClient branches={branches} locale={locale} />
    </div>
  );
}

