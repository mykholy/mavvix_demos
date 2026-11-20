import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantBranches, getRestaurantTimeSlots } from '@/lib/db/repositories';
import { TableBookingWizard } from './TableBookingWizard';

export default function RestaurantReservePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const branches = getRestaurantBranches(locale);
  const slots = getRestaurantTimeSlots();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#321F18]/10 pb-8 space-y-3 text-start">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'حجز طاولة تجريبي' : 'Simulated Dining Reservation'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {isAr ? 'طلب حجز طاولة في سفرة زعفران' : 'Table Reservation Request'}
        </h1>
        <p className="text-sm text-[#321F18]/70 max-w-2xl leading-relaxed">
          {isAr
            ? 'حدد الفرع المفضل، عدد الضيوف (حتى ٨ أفراد)، والوقت المناسب. هذا نموذج تجريبي يوضح تجربة الحجز الرقمي السلسة لضيوف المطعم.'
            : 'Select your preferred pavilion, party size (up to 8 guests), and available time window in this interactive demonstration.'}
        </p>
      </div>

      <TableBookingWizard branches={branches} slots={slots} locale={locale} />
    </div>
  );
}

