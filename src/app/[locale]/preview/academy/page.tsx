import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import React from 'react';
import Link from 'next/link';
import { getAcademyCourses, getAcademyTracks, getAcademyInstructors, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';

export default async function AcademyHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const courses = getAcademyCourses(loc);
  const tracks = getAcademyTracks(loc);
  const instructors = getAcademyInstructors(loc).slice(0, 4);
  const articles = getEditorialPosts('academy', loc).slice(0, 3);

  // Pick 4 diverse featured courses
  const featuredCourses = courses.filter(c =>
    ['course-01', 'course-04', 'course-06', 'course-09'].includes(c.slug)
  );

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#192A48]/5 via-[#F5F7FF] to-[#F5F7FF] pt-16 pb-20 border-b border-[#192A48]/10" style={getSectorHeroStyle('academy')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#192A48]/10 text-[#192A48] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#EF6A55]" />
              <span>
                {isAr ? 'التعليم التطبيقي القائم على المشاريع الحقيقية' : 'Production-Grade Project-Based Learning'}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#192A48] leading-[1.15]">
              {isAr ? (
                <>
                  مهارات تقنية تصنع{' '}
                  <span className="underline decoration-[#EF6A55] decoration-wavy decoration-2">
                    أنظمة حقيقية
                  </span>{' '}
                  تصمد في بيئات الإنتاج
                </>
              ) : (
                <>
                  Applied Skills Engineered for{' '}
                  <span className="underline decoration-[#EF6A55] decoration-wavy decoration-2">
                    Resilient Production
                  </span>{' '}
                  Systems
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#192A48]/75 leading-relaxed">
              {isAr
                ? 'تجاوز المشاهدة السلبية لمقاطع الفيديو التعليمية. في أكاديمية نوفا، يتعلم المهندسون والمصممون ومحللو البيانات من خلال كتابة الأكواد، وتصحيح الأخطاء، وبناء مشاريع كاملة تخضع لاختبارات صارمة وتدقيق تفصيلي.'
                : 'Move beyond passive video tutorials. At Nova Learning, engineers, designers, and analysts master technical depth through hands-on labs, error debugging, and architecture projects tested against real production benchmarks.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/preview/academy/courses`}
                className="px-6 py-3.5 rounded-xl bg-[#192A48] text-white hover:bg-[#5F67B5] transition-all text-sm font-semibold shadow-md flex items-center gap-2"
              >
                <span>{isAr ? 'استكشف المناهج والدورات (١٢ منهج)' : 'Explore All 12 Curricula'}</span>
                <span>{isAr ? '←' : '→'}</span>
              </Link>

              <Link
                href={`/${locale}/preview/academy/learn/course-01/lesson-01-01`}
                className="px-6 py-3.5 rounded-xl bg-white border border-[#192A48]/20 text-[#192A48] hover:border-[#EF6A55] hover:text-[#EF6A55] transition-all text-sm font-semibold shadow-sm flex items-center gap-2"
              >
                <span>{isAr ? 'تجربة درس مجاني واختبار مقيم ⚡' : 'Try Free Lesson & Scored Quiz ⚡'}</span>
              </Link>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#192A48]/10 text-xs text-[#192A48]/80 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-base">🛠️</span>
                <span>{isAr ? 'مشاريع تطبيقية حقيقية' : '100% Applied Projects'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🎯</span>
                <span>{isAr ? 'تقييم فوري للاختبارات' : 'Deterministic Scoring'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">💾</span>
                <span>{isAr ? 'حفظ التقدم في SQLite' : 'SQLite Progress Saved'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">⚖️</span>
                <span>{isAr ? 'محاكاة تعليمية غير معتمدة' : 'Non-Accredited Concept'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="academy" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="academy" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-60 text-center px-4">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>


      {/* 4 Career Tracks Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#192A48]">
            {isAr ? 'المسارات التخصصية الأربعة' : 'Four Specialized Career Tracks'}
          </h2>
          <p className="text-sm text-[#192A48]/70">
            {isAr
              ? 'مناهج مترابطة صممت بعناية لتغطية التخصصات الأكثر طلبًا وتأثيرًا في المنظومة الرقمية الحديثة.'
              : 'Structured curricular paths aligned with high-impact roles across modern technical organizations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map(track => (
            <div
              key={track.slug}
              className="bg-white rounded-2xl p-6 border border-[#192A48]/10 hover:border-[#5F67B5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F5F7FF] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {track.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#192A48] group-hover:text-[#5F67B5] transition-colors">
                    {track.name}
                  </h3>
                  <p className="text-xs text-[#EF6A55] font-medium mt-1">{track.headline}</p>
                </div>
                <p className="text-xs text-[#192A48]/70 leading-relaxed">{track.description}</p>
              </div>

              <div className="pt-6 border-t border-[#192A48]/10 mt-6 flex items-center justify-between text-xs font-semibold">
                <span className="text-[#192A48]/60">
                  {track.coursesCount} {isAr ? 'مناهج دراسية' : 'Curricula'}
                </span>
                <Link
                  href={`/${locale}/preview/academy/courses?track=${track.slug}`}
                  className="text-[#5F67B5] hover:text-[#EF6A55] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                >
                  <span>{isAr ? 'عرض الدورات' : 'View Track'}</span>
                  <span>{isAr ? '←' : '→'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Curricula Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#EF6A55]">
              {isAr ? 'مناهج مميزة' : 'Featured Curricula'}
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#192A48]">
              {isAr ? 'نماذج من برامجنا التطبيقية' : 'Featured Applied Programs'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/academy/courses`}
            className="text-sm font-semibold text-[#5F67B5] hover:text-[#EF6A55] inline-flex items-center gap-1"
          >
            <span>{isAr ? 'تصفح كافة الـ ١٢ منهجًا' : 'Browse All 12 Curricula'}</span>
            <span>{isAr ? '←' : '→'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map(course => {
            const hours = Math.round(course.duration_minutes / 60);
            const priceEgp = Math.round(course.example_price_cents / 100);

            return (
              <div
                key={course.slug}
                className="bg-white rounded-2xl border border-[#192A48]/10 hover:border-[#EF6A55] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#192A48]/5 font-medium text-[#192A48] capitalize">
                      {course.track}
                    </span>
                    <span className="text-[#192A48]/50 capitalize">{course.level}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#192A48] hover:text-[#EF6A55] transition-colors">
                    <Link href={`/${locale}/preview/academy/courses/${course.slug}`}>{course.title}</Link>
                  </h3>

                  <p className="text-xs text-[#192A48]/70 line-clamp-2 leading-relaxed">
                    {course.summary}
                  </p>

                  <div className="text-xs text-[#192A48]/60 flex items-center gap-3 pt-1">
                    <span>⏱️ ~{hours} {isAr ? 'ساعات' : 'hrs'}</span>
                    <span>•</span>
                    <span>📁 5 {isAr ? 'دروس تفصيلية' : 'lessons'}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#192A48]/10 mt-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#192A48]/50">{isAr ? 'الرسوم التجريبية' : 'Demo Tuition'}</span>
                    <span className="font-bold text-sm text-[#192A48]">{priceEgp} EGP</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                    <Link
                      href={`/${locale}/preview/academy/courses/${course.slug}`}
                      className="py-2 px-2 rounded-lg bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48] hover:text-white transition-colors"
                    >
                      {isAr ? 'التفاصيل' : 'Syllabus'}
                    </Link>
                    <Link
                      href={`/${locale}/preview/academy/learn/${course.slug}/lesson-01-01`}
                      className="py-2 px-2 rounded-lg bg-[#EF6A55]/10 text-[#EF6A55] hover:bg-[#EF6A55] hover:text-white transition-colors"
                    >
                      {isAr ? 'درس تجريبي ⚡' : 'Preview ⚡'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Demonstration Banner Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#192A48] via-[#243555] to-[#192A48] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EF6A55] text-xs font-semibold">
              <span>⚡ {isAr ? 'محاكاة رحلة المتعلم الكاملة' : 'Complete Learner Journey Test Drive'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              {isAr
                ? 'جرب محرك الدروس والاختبارات التفاعلية الآن'
                : 'Test Drive Our Lesson Engine & Scored Quizzes'}
            </h2>

            <p className="text-sm text-white/80 leading-relaxed">
              {isAr
                ? 'اقرأ محتوى دراسي تطبيقي كامل (أكثر من ٤٠٠ كلمة)، وسجل إتمام الدرس، ثم خُض اختبارًا مكونًا من ٤ أسئلة مع تصحيح فوري وحساب دقيق للدرجة بنسبة ٧٥٪ وحفظها تلقائيًا في قاعدة بيانات SQLite.'
                : 'Review a substantive 400+ word lesson transcript, mark completion, and tackle a 4-question technical quiz with deterministic 75% scoring and instant SQLite progress persistence.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/preview/academy/learn/course-01/lesson-01-01`}
                className="px-6 py-3 rounded-xl bg-[#EF6A55] text-white hover:bg-[#D95540] text-sm font-semibold transition-all shadow-md"
              >
                {isAr ? 'بدء الدرس التجريبي الأول' : 'Start Preview Lesson (Lesson 01)'}
              </Link>
              <Link
                href={`/${locale}/preview/academy/quiz/lesson-01-01`}
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 text-sm font-semibold transition-all"
              >
                {isAr ? 'الذهاب مباشرة للاختبار المقيم' : 'Direct to Scored Quiz'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#EF6A55]">
              {isAr ? 'هيئة التدريس والخبراء' : 'Faculty & Practitioners'}
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#192A48]">
              {isAr ? 'خبراء متمرسون من بيئات العمل الإنتاجية' : 'Practitioners with Production Grit'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/academy/instructors`}
            className="text-sm font-semibold text-[#5F67B5] hover:text-[#EF6A55] inline-flex items-center gap-1"
          >
            <span>{isAr ? 'عرض كافة الخبراء (٨ أعضاء)' : 'View All 8 Instructors'}</span>
            <span>{isAr ? '←' : '→'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map(ins => (
            <div
              key={ins.slug}
              className="bg-white rounded-2xl border border-[#192A48]/10 p-6 space-y-4 hover:border-[#5F67B5] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#192A48] text-white flex items-center justify-center font-bold text-xl">
                  {ins.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#192A48]">
                    <Link href={`/${locale}/preview/academy/instructors/${ins.slug}`} className="hover:text-[#5F67B5]">
                      {ins.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#EF6A55] font-medium mt-0.5">{ins.title}</p>
                </div>
                <p className="text-xs text-[#192A48]/70 leading-relaxed line-clamp-3">{ins.bio}</p>
              </div>

              <div className="pt-4 border-t border-[#192A48]/10 flex items-center justify-between text-xs">
                <span className="text-[#192A48]/50">
                  {ins.experienceYears} {isAr ? 'سنوات خبرة' : 'yrs experience'}
                </span>
                <Link
                  href={`/${locale}/preview/academy/instructors/${ins.slug}`}
                  className="font-semibold text-[#5F67B5] hover:text-[#EF6A55]"
                >
                  {isAr ? 'الملف الشخصي' : 'Profile'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Articles / Resources Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#EF6A55]">
              {isAr ? 'المقالات والتحليلات' : 'Articles & Guides'}
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#192A48]">
              {isAr ? 'كتابات ورؤى في الهندسة والتصميم والنمو' : 'Field Insights & Engineering Essays'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/academy/resources`}
            className="text-sm font-semibold text-[#5F67B5] hover:text-[#EF6A55] inline-flex items-center gap-1"
          >
            <span>{isAr ? 'المزيد من المقالات' : 'More Resources'}</span>
            <span>{isAr ? '←' : '→'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(article => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-[#192A48]/10 p-6 space-y-4 hover:border-[#EF6A55] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#192A48]/5 text-[#192A48] text-xs font-medium">
                  {article.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#192A48] hover:text-[#EF6A55] transition-colors leading-snug">
                  <Link href={`/${locale}/preview/academy/resources/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-xs text-[#192A48]/70 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#192A48]/10 flex items-center justify-between text-xs text-[#192A48]/50">
                <span>{article.published_at.slice(0, 10)}</span>
                <Link
                  href={`/${locale}/preview/academy/resources/${article.slug}`}
                  className="font-semibold text-[#5F67B5] hover:text-[#EF6A55]"
                >
                  {isAr ? 'قراءة المقال ←' : 'Read Article →'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

