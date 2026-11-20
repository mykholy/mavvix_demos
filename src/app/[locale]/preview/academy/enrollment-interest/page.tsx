import React, { Suspense } from 'react';
import { getAcademyCourses } from '@/lib/db/repositories';
import { EnrollmentInterestClient } from './EnrollmentInterestClient';
import type { Locale } from '@/lib/i18n/config';

export const metadata = {
  title: 'Enrollment Interest | Nova Learning',
  description: 'Simulated prospective learner registration for applied technical curricula.',
};

export default async function EnrollmentInterestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const courses = getAcademyCourses(locale as Locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="py-20 text-center text-sm text-[#192A48]/50">Loading form...</div>}>
        <EnrollmentInterestClient courses={courses} locale={locale as 'ar' | 'en'} />
      </Suspense>
    </div>
  );
}

