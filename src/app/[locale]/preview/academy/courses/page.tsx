import React, { Suspense } from 'react';
import { getAcademyCourses } from '@/lib/db/repositories';
import { AcademyCoursesClient } from './AcademyCoursesClient';
import type { Locale } from '@/lib/i18n/config';

export const metadata = {
  title: 'Courses & Curricula | Nova Learning',
  description: 'Applied technical curricula across Data, Software Engineering, UX Architecture, and Growth Marketing.',
};

export default async function AcademyCoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const courses = getAcademyCourses(locale as Locale);
  const isAr = locale === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192A48]/10 text-[#192A48] text-xs font-semibold">
          <span>{isAr ? 'دليل المناهج التعليمية التطبيقية' : 'Curricula Directory'}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#192A48]">
          {isAr ? 'المناهج والدورات التدريبية' : 'Applied Tech Curricula & Courses'}
        </h1>
        <p className="text-base text-[#192A48]/75 leading-relaxed">
          {isAr
            ? '١٢ منهجًا تطبيقيًا منظمًا يجمع بين المفاهيم المعمارية الدقيقة والمشاريع العملية المباشرة. تصفح المسارات، واطلع على خطط الدروس، أو جرب درسًا مجانيًا تفاعليًا.'
            : '12 structured curricula engineered for production relevance across 4 disciplines. Filter by track, inspect full syllabi, or launch an interactive preview lesson.'}
        </p>
      </div>

      {/* Courses Client Filter & Grid */}
      <Suspense fallback={<div className="py-20 text-center text-sm text-[#192A48]/50">Loading curricula...</div>}>
        <AcademyCoursesClient initialCourses={courses} locale={locale as 'ar' | 'en'} />
      </Suspense>
    </div>
  );
}

