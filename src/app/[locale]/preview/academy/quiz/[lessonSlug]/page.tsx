import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAcademyLessonBySlug } from '@/lib/db/repositories';
import { LessonQuizClient } from './LessonQuizClient';

export default async function LessonQuizPage({
  params,
}: {
  params: Promise<{ locale: string; lessonSlug: string }>;
}) {
  const { locale, lessonSlug } = await params;
  const isAr = locale === 'ar';

  const lesson = getAcademyLessonBySlug(lessonSlug);
  if (!lesson) notFound();

  const lessonTitle = (isAr ? lesson.content?.title_ar : lesson.content?.title_en) || lesson.slug;

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
        <Link href={`/${locale}/preview/academy/courses/${lesson.courseSlug}`} className="hover:text-[#192A48]">
          {lesson.courseSlug}
        </Link>
        <span>/</span>
        <Link
          href={`/${locale}/preview/academy/learn/${lesson.courseSlug}/${lesson.slug}`}
          className="hover:text-[#192A48]"
        >
          {lessonTitle}
        </Link>
        <span>/</span>
        <span className="text-[#192A48] font-semibold">{isAr ? 'الاختبار المقيم' : 'Assessment'}</span>
      </nav>

      {/* Quiz Client */}
      <LessonQuizClient
        lessonSlug={lesson.slug}
        courseSlug={lesson.courseSlug}
        lessonTitle={lessonTitle}
        questions={lesson.questions || []}
        locale={locale as 'ar' | 'en'}
      />
    </div>
  );
}

