import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getDentalServices } from '@/lib/db/repositories';
import DentalServicesClient from './DentalServicesClient';

export const metadata = {
  title: 'Treatments & Consultations | Lumen Dental Studio',
  description: 'Explore calm, evidence-based dental care pathways, including preventative, pediatric, and restorative consultations.'
};

export default function DentalServicesPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const services = getDentalServices(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Fold */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'دليل العلاجات والاستشارات' : 'Clinical Pathways'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'الخدمات والاستشارات السريرية' : 'Treatments & Clinical Consultations'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'تصفح مسارات الرعاية المتاحة لدينا. كل خدمة مصممة لضمان الحد الأقصى من الراحة، والدقة الرقمية، والوضوح الكامل للتكلفة والخطوات قبل البدء.'
              : 'Explore our specialized clinical pathways. Every appointment is structured around calm listening, gentle digital imaging, and upfront plan alignment.'}
          </p>
        </div>

        {/* Client Interactive Filter & Directory */}
        <DentalServicesClient locale={locale} services={services} />
      </div>
    </div>
  );
}

