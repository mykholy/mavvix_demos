import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAcademyCourseBySlug, getAcademyLesson } from '@/lib/db/repositories';
import { LessonPlayerClient } from './LessonPlayerClient';
import type { Locale } from '@/lib/i18n/config';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string; lessonSlug: string }>;
}) {
  const { locale, courseSlug, lessonSlug } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const course = getAcademyCourseBySlug(courseSlug, loc);
  if (!course) notFound();

  const lesson = getAcademyLesson(courseSlug, lessonSlug);
  if (!lesson) notFound();

  const allLessons = (course.lessons || []).map((l: any, idx: number) => ({
    id: l.id,
    slug: l.slug,
    moduleIndex: l.module_index,
    lessonIndex: l.lesson_index,
    minutes: l.minutes,
    title: (isAr ? l.content?.title_ar : l.content?.title_en) || l.slug,
    preview: Boolean(l.content?.preview),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#192A48]/60">
        <Link href={`/${locale}/preview/academy`} className="hover:text-[#192A48]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/academy/courses`} className="hover:text-[#192A48]">
          {isAr ? 'الدورات' : 'Courses'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/academy/courses/${course.slug}`} className="hover:text-[#192A48]">
          {course.title}
        </Link>
        <span>/</span>
        <span className="text-[#192A48] font-semibold">
          {isAr ? lesson.content?.title_ar : lesson.content?.title_en}
        </span>
      </nav>

      {/* Lesson Player Client */}
      <LessonPlayerClient
        course={{
          slug: course.slug,
          title: course.title,
          track: course.track,
        }}
        lesson={lesson}
        allLessons={allLessons}
        locale={locale as 'ar' | 'en'}
      />
    </div>
  );
}

