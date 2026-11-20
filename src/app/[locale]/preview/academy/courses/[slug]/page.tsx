import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAcademyCourseBySlug, getAcademyInstructors } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const course = getAcademyCourseBySlug(slug, loc);
  if (!course) {
    notFound();
  }

  const instructors = getAcademyInstructors(loc);
  const instructor = instructors.find(i => i.courseSlugs.includes(course.slug)) || instructors[0];

  const hours = Math.round(course.duration_minutes / 60);
  const priceEgp = Math.round(course.example_price_cents / 100);

  const outcomes: string[] = course.body?.target_outcomes || [];
  const prerequisites: string = course.body?.prerequisites || '';
  const certificate: string = course.body?.certificate || '';
  const capstoneProject: string = course.body?.practical_projects || '';

  const lessons = course.lessons || [];
  const firstPreviewLesson = lessons.find(l => l.content?.preview) || lessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#192A48]/60">
        <Link href={`/${locale}/preview/academy`} className="hover:text-[#192A48]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/academy/courses`} className="hover:text-[#192A48]">
          {isAr ? 'الدورات والمناهج' : 'Courses'}
        </Link>
        <span>/</span>
        <span className="text-[#192A48] font-semibold">{course.title}</span>
      </nav>

      {/* Course Hero Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#192A48]/10 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#192A48] text-white font-semibold uppercase tracking-wider">
                {course.track}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F5F7FF] text-[#192A48] font-medium capitalize">
                {course.level}
              </span>
              <span className="text-[#192A48]/60">
                ⏱️ ~{hours} {isAr ? 'ساعات تدريبية' : 'training hours'}
              </span>
              <span>•</span>
              <span className="text-[#192A48]/60">
                📚 {lessons.length} {isAr ? 'دروس تفصيلية' : 'curriculum lessons'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#192A48] leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-[#192A48]/75 leading-relaxed">
              {course.summary}
            </p>
          </div>

          {/* Pricing & Quick Enroll Action Card */}
          <div className="bg-[#F5F7FF] rounded-2xl p-6 border border-[#192A48]/10 space-y-5 min-w-[280px] lg:w-80 shrink-0">
            <div>
              <div className="text-xs text-[#192A48]/60">{isAr ? 'رسوم الدورة التجريبية' : 'Demo Tuition'}</div>
              <div className="font-serif text-3xl font-bold text-[#192A48] mt-1">
                {priceEgp} <span className="text-base font-normal text-[#192A48]/70">EGP</span>
              </div>
              <p className="text-[11px] text-[#192A48]/50 mt-1">
                {isAr ? '* محاكاة تعليمية، لا يتم تحصيل أموال حقيقية' : '* Simulated fee, no real payment collected'}
              </p>
            </div>

            <div className="space-y-3">
              {firstPreviewLesson && (
                <Link
                  href={`/${locale}/preview/academy/learn/${course.slug}/${firstPreviewLesson.slug}`}
                  className="w-full block text-center py-3 px-4 rounded-xl bg-[#EF6A55] text-white font-semibold text-sm hover:bg-[#D95540] transition-colors shadow-sm"
                >
                  {isAr ? 'تجربة درس مجاني تفاعلي ⚡' : 'Try Free Preview Lesson ⚡'}
                </Link>
              )}

              <Link
                href={`/${locale}/preview/academy/enrollment-interest?course=${course.slug}`}
                className="w-full block text-center py-3 px-4 rounded-xl bg-[#192A48] text-white font-semibold text-sm hover:bg-[#5F67B5] transition-colors shadow-sm"
              >
                {isAr ? 'تسجيل الاهتمام بالالتحاق' : 'Register Enrollment Interest'}
              </Link>
            </div>

            <div className="pt-3 border-t border-[#192A48]/10 text-xs text-[#192A48]/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>{isAr ? 'مشاريع عملية تقيم يدويًا' : 'Hands-on practical capstone'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>{isAr ? 'اختبارات تقييم فورية محددة' : 'Deterministic scored quizzes'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>{isAr ? 'حفظ التقدم المحلي التلقائي' : 'Instant local progress tracking'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Syllabus + Learning Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Syllabus */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#192A48] mb-2">
              {isAr ? 'خطة المنهج الدراسي والدروس' : 'Course Syllabus & Applied Lessons'}
            </h2>
            <p className="text-sm text-[#192A48]/70">
              {isAr
                ? 'ينقسم المنهج إلى وحدات تطبيقية متسلسلة تحاكي مراحل البناء الهندسي والتصميمي الواقعي.'
                : 'Modular structured curriculum simulating production workflows from fundamentals to deployment.'}
            </p>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, idx) => {
              const title = isAr ? lesson.content?.title_ar : lesson.content?.title_en;
              const summary = isAr ? lesson.content?.summary_ar : lesson.content?.summary_en;
              const isPreview = Boolean(lesson.content?.preview);

              return (
                <div
                  key={lesson.id || lesson.slug}
                  className={`bg-white rounded-2xl p-6 border transition-all ${
                    isPreview
                      ? 'border-[#5F67B5]/40 hover:border-[#EF6A55] shadow-sm'
                      : 'border-[#192A48]/10 opacity-90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#5F67B5]">
                          {isAr ? `الدرس ${idx + 1}` : `Lesson ${idx + 1}`}
                        </span>
                        <span className="text-[#192A48]/40">•</span>
                        <span className="text-[#192A48]/60">⏱️ {lesson.minutes || 20} {isAr ? 'دقيقة' : 'min'}</span>
                        {isPreview ? (
                          <span className="px-2 py-0.5 rounded bg-[#EF6A55]/10 text-[#EF6A55] font-semibold text-[11px]">
                            {isAr ? 'متاح للمعاينة المجانية ⚡' : 'Free Preview ⚡'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-[#192A48]/50 text-[11px]">
                            {isAr ? 'متاح بعد تأكيد الالتحاق' : 'Enrolled only'}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#192A48]">
                        {title || lesson.slug}
                      </h3>

                      <p className="text-xs text-[#192A48]/70 leading-relaxed max-w-xl">
                        {summary}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isPreview ? (
                        <Link
                          href={`/${locale}/preview/academy/learn/${course.slug}/${lesson.slug}`}
                          className="px-4 py-2 rounded-xl bg-[#5F67B5] hover:bg-[#192A48] text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <span>{isAr ? 'فتح الدرس' : 'Launch Lesson'}</span>
                          <span>{isAr ? '←' : '→'}</span>
                        </Link>
                      ) : (
                        <span className="text-xs text-[#192A48]/40 px-3 py-1.5 rounded-lg border border-dashed border-[#192A48]/20 flex items-center gap-1.5">
                          <span>🔒</span>
                          <span>{isAr ? 'مغلق' : 'Locked'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Learning Outcomes & Instructor Dossier */}
        <div className="space-y-8">
          {/* Target Outcomes */}
          <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#192A48]">
              {isAr ? 'المخرجات التعليمية المستهدفة' : 'Key Learning Outcomes'}
            </h3>
            <ul className="space-y-3 text-xs text-[#192A48]/80 leading-relaxed">
              {outcomes.map((outcome, oIdx) => (
                <li key={oIdx} className="flex items-start gap-2.5">
                  <span className="text-[#EF6A55] font-bold mt-0.5">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            {prerequisites && (
              <div className="pt-4 border-t border-[#192A48]/10 space-y-1">
                <div className="text-xs font-semibold text-[#192A48]">
                  {isAr ? 'المتطلبات السابقة:' : 'Prerequisites:'}
                </div>
                <p className="text-xs text-[#192A48]/70 leading-relaxed">{prerequisites}</p>
              </div>
            )}

            {capstoneProject && (
              <div className="pt-4 border-t border-[#192A48]/10 space-y-1">
                <div className="text-xs font-semibold text-[#192A48]">
                  {isAr ? 'مشروع التخرج العملي:' : 'Capstone Lab:'}
                </div>
                <p className="text-xs text-[#192A48]/70 leading-relaxed">{capstoneProject}</p>
              </div>
            )}

            {certificate && (
              <div className="pt-4 border-t border-[#192A48]/10 space-y-1">
                <div className="text-xs font-semibold text-[#192A48]">
                  {isAr ? 'شهادة الإتمام:' : 'Certificate:'}
                </div>
                <p className="text-xs text-[#192A48]/60 leading-relaxed">{certificate}</p>
              </div>
            )}
          </div>

          {/* Instructor Bio Box */}
          <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#EF6A55]">
              {isAr ? 'المحاضر المسؤول' : 'Lead Instructor'}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#192A48] text-white flex items-center justify-center font-bold text-xl shrink-0">
                {instructor.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#192A48]">
                  <Link href={`/${locale}/preview/academy/instructors/${instructor.slug}`} className="hover:text-[#5F67B5]">
                    {instructor.name}
                  </Link>
                </h4>
                <p className="text-xs text-[#EF6A55] font-medium mt-0.5">{instructor.title}</p>
              </div>
            </div>

            <p className="text-xs text-[#192A48]/70 leading-relaxed">{instructor.bio}</p>

            <div className="pt-2 text-xs text-[#192A48]/60 border-t border-[#192A48]/10">
              <span className="font-semibold text-[#192A48]">{isAr ? 'فلسفة التدريس: ' : 'Pedagogy: '}</span>
              {instructor.pedagogy}
            </div>

            <Link
              href={`/${locale}/preview/academy/instructors/${instructor.slug}`}
              className="block text-center py-2 px-3 rounded-lg border border-[#192A48]/20 hover:border-[#5F67B5] text-xs font-semibold text-[#192A48] hover:text-[#5F67B5] transition-colors"
            >
              {isAr ? 'عرض الملف التدريسي الكامل ←' : 'View Instructor Dossier →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

