import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getDentalPractitioners } from '@/lib/db/repositories';
import DentalTeamClient from './DentalTeamClient';
import { AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Specialist Practitioners | Lumen Dental Studio',
  description: 'Meet our multidisciplinary team of dental practitioners. Filter by specialty and explore calm care philosophies.'
};

export default async function DentalTeamPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const practitioners = getDentalPractitioners(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Fold */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'الأطباء والاستشاريون' : 'Clinical Team'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'فريق الأطباء والمختصين' : 'Practitioners & Clinical Specialists'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'مجموعة متكاملة من أطباء الأسنان الحريصين على التواصل المريح وتوفير بيئة مطمئنة لكل مراجع، عبر مختلف التخصصات الوقائية والترميمية وطب أسنان الأطفال.'
              : 'Our practitioners combine deep technical expertise with gentle communication. Filter by clinical focus to discover each practitioner’s philosophy and consultation days.'}
          </p>
        </div>

        {/* Ethical Transparency Notice */}
        <div className="p-4 rounded-xl bg-[#EDF5F2] border border-[#D5E3DE] text-[#2C5251] text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
          <span>
            {isAr
              ? 'تنويه الشفافية: أسماء الأطباء وتخصصاتهم هي ملفات تمثيلية استعراضية خيالية مخصصة لنموذج مافيكس البرمجي ولا تمثل تراخيص أو أطباء ممارسين حقيقيين.'
              : 'Demonstration Disclosure: Clinician profiles and specialties are illustrative fictional personas engineered for Mavvix showcase and do not represent actual practicing medical licenses.'}
          </span>
        </div>

        {/* Interactive Filterable Directory */}
        <DentalTeamClient locale={locale} practitioners={practitioners} />
      </div>
    </div>
  );
}

