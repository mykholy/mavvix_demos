import React, { Suspense } from 'react';
import { Locale } from '@/lib/i18n/config';
import { getDentalServices, getDentalPractitioners, getDentalLocations } from '@/lib/db/repositories';
import AppointmentRequestWizard from './AppointmentRequestWizard';

export const metadata = {
  title: 'Request Consultation Window | Lumen Dental',
  description: 'Submit an illustrative consultation preference with your chosen specialist, studio branch, and time window.'
};

export default async function DentalAppointmentPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const services = getDentalServices(locale);
  const practitioners = getDentalPractitioners(locale);
  const locations = getDentalLocations(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'حجز نافذة استشارة' : 'Appointment Request'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'طلب موعد استشارة هادئة' : 'Request a Consultation Window'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'اختر الخدمة، والفرع، والطبيب المفضل لديك. يتم تسجيل رغبتك كنموذج استعراضي في قاعدة بيانات مافيكس التجريبية.'
              : 'Select your preferred clinical service, studio branch, and specialist. All submissions are stored as demo requests in our private SQLite database.'}
          </p>
        </div>

        <Suspense fallback={<div className="min-h-80 animate-pulse rounded-2xl bg-[#EDF5F2]" />}><AppointmentRequestWizard
          locale={locale}
          services={services}
          practitioners={practitioners}
          locations={locations}
        /></Suspense>
      </div>
    </div>
  );
}

