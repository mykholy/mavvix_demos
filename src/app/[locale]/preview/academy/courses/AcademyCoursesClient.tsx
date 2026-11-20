'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { LocalizedCourse } from '@/lib/db/repositories';

interface Props {
  initialCourses: LocalizedCourse[];
  locale: 'ar' | 'en';
}

export function AcademyCoursesClient({ initialCourses, locale }: Props) {
  const searchParams = useSearchParams();
  const initialTrack = searchParams.get('track') || 'all';

  const isAr = locale === 'ar';

  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrack);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tracks = [
    { id: 'all', label: isAr ? 'كافة المسارات' : 'All Tracks' },
    { id: 'data', label: isAr ? 'علم البيانات والذكاء الاصطناعي' : 'Data & AI' },
    { id: 'development', label: isAr ? 'هندسة البرمجيات' : 'Software Engineering' },
    { id: 'design', label: isAr ? 'نظم التصميم وتجربة المستخدم' : 'UX & Design Systems' },
    { id: 'marketing', label: isAr ? 'التسويق الرقمي والنمو' : 'Growth Marketing' },
  ];

  const levels = [
    { id: 'all', label: isAr ? 'كافة المستويات' : 'All Levels' },
    { id: 'beginner', label: isAr ? 'مبتدئ' : 'Beginner' },
    { id: 'intermediate', label: isAr ? 'متوسط / متقدم' : 'Intermediate' },
  ];

  const durations = [
    { id: 'all', label: isAr ? 'كافة المدد' : 'Any Duration' },
    { id: 'short', label: isAr ? 'أقل من ٨ ساعات' : 'Under 8 Hours' },
    { id: 'long', label: isAr ? '٨ ساعات فأكثر' : '8+ Hours' },
  ];

  const filteredCourses = useMemo(() => {
    return initialCourses.filter(course => {
      // Track filter
      if (selectedTrack !== 'all' && course.track !== selectedTrack) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }
      // Duration filter
      if (selectedDuration === 'short' && course.duration_minutes >= 480) {
        return false;
      }
      if (selectedDuration === 'long' && course.duration_minutes < 480) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchSummary = course.summary.toLowerCase().includes(q);
        const matchTrack = course.track.toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchTrack) {
          return false;
        }
      }
      return true;
    });
  }, [initialCourses, selectedTrack, selectedLevel, selectedDuration, searchQuery]);

  const resetFilters = () => {
    setSelectedTrack('all');
    setSelectedLevel('all');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedTrack !== 'all' ||
    selectedLevel !== 'all' ||
    selectedDuration !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 shadow-sm space-y-6">
        {/* Search Input */}
        <div>
          <label htmlFor="course-search" className="block text-xs font-semibold text-[#192A48]/70 mb-2">
            {isAr ? 'البحث بالاسم أو التقنية أو الموضوع' : 'Search by title, technology, or topic'}
          </label>
          <div className="relative">
            <input
              id="course-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'مثال: بايثون، تايب سكريبت، تصميم النظم، SQL...' : 'e.g., Python, TypeScript, Design Systems, SQL...'}
              className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 px-3 flex items-center text-xs text-[#192A48]/50 hover:text-[#192A48]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-4 pt-2">
          {/* Tracks */}
          <div>
            <span className="block text-xs font-semibold text-[#192A48]/60 mb-2">
              {isAr ? 'المسار التخصصي:' : 'Track:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {tracks.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedTrack === t.id
                      ? 'bg-[#192A48] text-white shadow-sm'
                      : 'bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48]/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level and Duration row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#192A48]/10">
            <div>
              <span className="block text-xs font-semibold text-[#192A48]/60 mb-2">
                {isAr ? 'المستوى المستهدف:' : 'Experience Level:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {levels.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLevel(l.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedLevel === l.id
                        ? 'bg-[#5F67B5] text-white'
                        : 'bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48]/10'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#192A48]/60 mb-2">
                {isAr ? 'المدة الإجمالية:' : 'Total Duration:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {durations.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDuration(d.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedDuration === d.id
                        ? 'bg-[#5F67B5] text-white'
                        : 'bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48]/10'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#192A48]/10 text-xs">
          <span className="text-[#192A48]/70 font-medium">
            {isAr
              ? `عرض ${filteredCourses.length} من إجمالي ${initialCourses.length} منهج دراسي`
              : `Showing ${filteredCourses.length} of ${initialCourses.length} curricula`}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#EF6A55] hover:underline font-semibold"
            >
              {isAr ? 'إعادة ضبط التصفية ↺' : 'Reset Filters ↺'}
            </button>
          )}
        </div>
      </div>

      {/* Courses Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#192A48]/10 space-y-4">
          <div className="text-4xl">🔍</div>
          <h3 className="font-serif text-xl font-bold text-[#192A48]">
            {isAr ? 'لم يتم العثور على مناهج مطابقة' : 'No matching curricula found'}
          </h3>
          <p className="text-sm text-[#192A48]/70 max-w-md mx-auto">
            {isAr
              ? 'جرّب توسيع معايير البحث أو تصفية المسارات لعرض بقية المناهج التقنية المتوفرة.'
              : 'Try broadening your search query or reset filters to view all available curricula.'}
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-[#192A48] text-white text-xs font-semibold"
          >
            {isAr ? 'عرض كافة المناهج' : 'Show All Curricula'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const hours = Math.round(course.duration_minutes / 60);
            const priceEgp = Math.round(course.example_price_cents / 100);

            return (
              <div
                key={course.slug}
                className="bg-white rounded-2xl border border-[#192A48]/10 hover:border-[#5F67B5] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Track & Level */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-[#192A48]/5 font-semibold text-[#192A48] uppercase tracking-wider">
                      {course.track}
                    </span>
                    <span className="text-[#192A48]/60 capitalize px-2 py-0.5 rounded bg-gray-100">
                      {course.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-[#192A48] hover:text-[#5F67B5] transition-colors leading-snug">
                    <Link href={`/${locale}/preview/academy/courses/${course.slug}`}>{course.title}</Link>
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#192A48]/75 leading-relaxed line-clamp-3">
                    {course.summary}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-xs text-[#192A48]/60 pt-2 border-t border-[#192A48]/10">
                    <span className="flex items-center gap-1">⏱️ ~{hours} {isAr ? 'ساعات' : 'hrs'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">📚 5 {isAr ? 'دروس تطبيقية' : 'lessons'}</span>
                    <span>•</span>
                    <span className="text-[#EF6A55] font-semibold">⚡ {isAr ? 'درس تجريبي متاح' : 'Preview open'}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#192A48]/10 mt-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#192A48]/50">{isAr ? 'الرسوم التجريبية' : 'Demo Tuition'}</span>
                    <span className="font-bold text-base text-[#192A48]">{priceEgp} EGP</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                    <Link
                      href={`/${locale}/preview/academy/courses/${course.slug}`}
                      className="py-2.5 px-3 rounded-lg bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48] hover:text-white transition-colors"
                    >
                      {isAr ? 'خطة المنهج' : 'View Syllabus'}
                    </Link>
                    <Link
                      href={`/${locale}/preview/academy/learn/${course.slug}/lesson-01-01`}
                      className="py-2.5 px-3 rounded-lg bg-[#EF6A55]/10 text-[#EF6A55] hover:bg-[#EF6A55] hover:text-white transition-colors"
                    >
                      {isAr ? 'درس مجاني ⚡' : 'Free Preview ⚡'}
                    </Link>
                  </div>

                  <Link
                    href={`/${locale}/preview/academy/enrollment-interest?course=${course.slug}`}
                    className="block text-center text-xs text-[#5F67B5] hover:text-[#EF6A55] font-semibold pt-1"
                  >
                    {isAr ? 'تسجيل الرغبة في الالتحاق بهذا المنهج ←' : 'Register Enrollment Interest →'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

