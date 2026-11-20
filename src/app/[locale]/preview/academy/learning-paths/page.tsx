import React from 'react';
import Link from 'next/link';
import { getAcademyTracks, getAcademyCourses } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';

export const metadata = {
  title: 'Learning Paths & Career Roadmaps | Nova Learning',
  description: 'Structured competency tracks engineered from foundations to production-grade specialization.',
};

export default async function LearningPathsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const tracks = getAcademyTracks(loc);
  const allCourses = getAcademyCourses(loc);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192A48]/10 text-[#192A48] text-xs font-semibold">
          <span>{isAr ? 'البرامج المهنية المتسلسلة' : 'Career Competency Roadmaps'}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#192A48]">
          {isAr ? 'المسارات المهنية وخارطة التعلم' : 'Applied Learning Paths & Roadmaps'}
        </h1>
        <p className="text-base text-[#192A48]/75 leading-relaxed">
          {isAr
            ? 'صُممت مساراتنا المهنية لتأخذك في رحلة متدرجة من الأساسيات المتينة إلى بناء مشاريع تخرج تحاكي تحديات الشركات الرقمية الحقيقية. اختر مسارك التخصصي واطلع على تسلسل المناهج والمخرجات المكتسبة.'
            : 'Carefully sequenced multi-course roadmaps designed to take practitioners from essential principles to production-grade architectural autonomy. Explore tracks, course sequences, and target competencies.'}
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="space-y-10">
        {tracks.map((track, tIdx) => {
          const trackCourses = allCourses.filter(c => c.track === track.slug);
          const totalMinutes = trackCourses.reduce((sum, c) => sum + c.duration_minutes, 0);
          const totalHours = Math.round(totalMinutes / 60);

          return (
            <div
              key={track.slug}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#192A48]/10 shadow-sm space-y-8"
            >
              {/* Track Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#192A48]/10">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#F5F7FF] flex items-center justify-center text-3xl shrink-0">
                    {track.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#EF6A55] uppercase tracking-wider">
                      {isAr ? `المسار التخصصي 0${tIdx + 1}` : `Specialized Track 0${tIdx + 1}`}
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#192A48]">
                      {track.name}
                    </h2>
                    <p className="text-sm font-medium text-[#5F67B5]">{track.headline}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <div className="px-4 py-2 rounded-xl bg-[#F5F7FF] text-[#192A48]">
                    ⏱️ ~{totalHours} {isAr ? 'ساعات تدريبية' : 'Curricular Hours'}
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-[#F5F7FF] text-[#192A48]">
                    📚 {trackCourses.length} {isAr ? 'مناهج دراسية' : 'Sequenced Curricula'}
                  </div>
                  <Link
                    href={`/${locale}/preview/academy/enrollment-interest?track=${track.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-[#EF6A55] text-white hover:bg-[#D95540] transition-colors shadow-sm"
                  >
                    {isAr ? 'تسجيل الاهتمام بالمسار' : 'Register Track Interest'}
                  </Link>
                </div>
              </div>

              {/* Description & Prerequisites */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#192A48]/80 leading-relaxed">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="font-serif text-sm font-bold text-[#192A48]">
                    {isAr ? 'فلسفة المسار والمهارات المستهدفة:' : 'Curriculum Philosophy & Competencies:'}
                  </h3>
                  <p>{track.description}</p>
                </div>

                <div className="space-y-2 bg-[#F5F7FF] p-4 rounded-2xl border border-[#192A48]/5">
                  <h3 className="font-serif text-sm font-bold text-[#192A48]">
                    {isAr ? 'المتطلبات المبدئية:' : 'Prerequisites:'}
                  </h3>
                  <p className="text-[#192A48]/70">{track.prerequisites}</p>
                </div>
              </div>

              {/* Recommended Course Sequence */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-[#192A48] flex items-center gap-2">
                  <span>🗺️</span>
                  <span>{isAr ? 'التسلسل المنهجي الموصى به للمقررات:' : 'Recommended Curricular Course Sequence:'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trackCourses.map((c, idx) => {
                    const priceEgp = Math.round(c.example_price_cents / 100);
                    const hours = Math.round(c.duration_minutes / 60);

                    return (
                      <div
                        key={c.slug}
                        className="p-5 rounded-2xl bg-[#F5F7FF] border border-[#192A48]/10 hover:border-[#5F67B5] transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#5F67B5]">
                              {isAr ? `المرحلة ${idx + 1}` : `Stage ${idx + 1}`}
                            </span>
                            <span className="text-[#192A48]/50 capitalize">{c.level}</span>
                          </div>

                          <h4 className="font-serif text-base font-bold text-[#192A48] hover:text-[#EF6A55] transition-colors">
                            <Link href={`/${locale}/preview/academy/courses/${c.slug}`}>{c.title}</Link>
                          </h4>

                          <p className="text-xs text-[#192A48]/70 line-clamp-2 leading-relaxed">
                            {c.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#192A48]/10 mt-4 flex items-center justify-between text-xs">
                          <span className="text-[#192A48]/60">⏱️ ~{hours}h • {priceEgp} EGP</span>
                          <Link
                            href={`/${locale}/preview/academy/courses/${c.slug}`}
                            className="font-semibold text-[#5F67B5] hover:underline"
                          >
                            {isAr ? 'خطة المنهج ←' : 'Syllabus →'}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

