import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAcademyInstructorBySlug, getAcademyCourses } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const instructor = getAcademyInstructorBySlug(slug, loc);
  if (!instructor) notFound();

  const allCourses = getAcademyCourses(loc);
  const taughtCourses = allCourses.filter(c => instructor.courseSlugs.includes(c.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#192A48]/60">
        <Link href={`/${locale}/preview/academy`} className="hover:text-[#192A48]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/academy/instructors`} className="hover:text-[#192A48]">
          {isAr ? 'هيئة التدريس' : 'Instructors'}
        </Link>
        <span>/</span>
        <span className="text-[#192A48] font-semibold">{instructor.name}</span>
      </nav>

      {/* Profile Dossier Hero */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#192A48]/10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-[#192A48] text-white flex items-center justify-center font-bold text-4xl sm:text-5xl shadow-md shrink-0">
            {instructor.name.charAt(0)}
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#192A48] text-white font-semibold uppercase tracking-wider">
                {instructor.track}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F5F7FF] text-[#192A48] font-medium">
                {instructor.experienceYears} {isAr ? 'سنوات من الخبرة العملية' : 'Years of Field Experience'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#192A48]">
              {instructor.name}
            </h1>

            <p className="text-base text-[#EF6A55] font-semibold">
              {instructor.title}
            </p>

            <p className="text-sm sm:text-base text-[#192A48]/80 leading-relaxed">
              {instructor.bio}
            </p>
          </div>
        </div>

        {/* Pedagogy Section */}
        <div className="p-6 rounded-2xl bg-[#F5F7FF] border border-[#192A48]/10 space-y-2">
          <div className="text-xs font-semibold text-[#5F67B5] uppercase tracking-wider">
            {isAr ? 'فلسفة التدريس ومنهجية التوجيه' : 'Pedagogical Philosophy & Mentorship'}
          </div>
          <p className="text-sm text-[#192A48]/80 leading-relaxed font-medium">
            "{instructor.pedagogy}"
          </p>
        </div>

        {/* Fictional Profile Notice */}
        <div className="text-xs text-[#192A48]/50 pt-2 border-t border-[#192A48]/10">
          * {isAr
            ? 'هذا الملف التعريفي هو محاكاة احترافية مصممة ضمن نموذج أكاديمية نوفا التجريبي بواسطة Mavvix.'
            : 'This profile is an applied professional simulation created for the Mavvix Nova Learning concept demo.'}
        </div>
      </div>

      {/* Courses Taught by Instructor */}
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#192A48]">
            {isAr ? `المناهج التي يشرف عليها: ${instructor.name}` : `Curricula Led by ${instructor.name}`}
          </h2>
          <p className="text-sm text-[#192A48]/70 mt-1">
            {isAr
              ? 'مناهج تطبيقية صُممت واختبرت بالتعاون المباشر مع هذا المحاضر.'
              : 'Production-grade curricula engineered in direct collaboration with this instructor.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {taughtCourses.map(course => {
            const hours = Math.round(course.duration_minutes / 60);
            const priceEgp = Math.round(course.example_price_cents / 100);

            return (
              <div
                key={course.slug}
                className="bg-white rounded-2xl border border-[#192A48]/10 p-6 space-y-4 hover:border-[#5F67B5] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#192A48] uppercase tracking-wider">
                      {course.track}
                    </span>
                    <span className="text-[#192A48]/50 capitalize">{course.level}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#192A48] hover:text-[#5F67B5]">
                    <Link href={`/${locale}/preview/academy/courses/${course.slug}`}>{course.title}</Link>
                  </h3>

                  <p className="text-xs text-[#192A48]/75 leading-relaxed line-clamp-3">
                    {course.summary}
                  </p>

                  <div className="text-xs text-[#192A48]/60 flex items-center gap-3 pt-2">
                    <span>⏱️ ~{hours} {isAr ? 'ساعات' : 'hrs'}</span>
                    <span>•</span>
                    <span>{priceEgp} EGP</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#192A48]/10 flex items-center justify-between gap-3 text-xs font-semibold">
                  <Link
                    href={`/${locale}/preview/academy/courses/${course.slug}`}
                    className="py-2 px-3 rounded-lg bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48] hover:text-white transition-colors"
                  >
                    {isAr ? 'خطة المنهج' : 'Syllabus'}
                  </Link>

                  <Link
                    href={`/${locale}/preview/academy/learn/${course.slug}/lesson-01-01`}
                    className="py-2 px-3 rounded-lg bg-[#EF6A55] text-white hover:bg-[#D95540] transition-colors"
                  >
                    {isAr ? 'درس تجريبي مجاني ⚡' : 'Free Preview ⚡'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

