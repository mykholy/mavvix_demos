import { SectorUtilityBar } from '@/components/shared/SectorUtilityBar';
import { ContactDock } from '@/components/shared/ContactDock';
import React from 'react';
import Link from 'next/link';
import { AcademyHeader } from './AcademyHeader';

export default async function AcademyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FF] text-[#192A48] font-sans antialiased selection:bg-[#EF6A55] selection:text-white">
      <SectorUtilityBar sector="academy" locale={locale as 'ar' | 'en'} />
      {/* Main Header */}
      <AcademyHeader locale={locale as 'ar' | 'en'} />

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#192A48] text-white border-t border-[#192A48]/40 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Col 1 & 2: Brand & Ethos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white text-[#192A48] flex items-center justify-center font-bold text-lg shadow-sm">
                  N
                </span>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  {isAr ? 'نوفا للتعلّم' : 'NOVA LEARNING'}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                {isAr
                  ? 'منصة تعليمية مهنية متقدمة تركز على الممارسة العملية المباشرة، وهندسة النظم الإنتاجية، وبناء مهارات تقنية حقيقية تلائم متطلبات سوق العمل المعاصر دون وعود وهمية.'
                  : 'An applied professional academy emphasizing hands-on project labs, architectural rigor, and verifiable production competencies without superficial credentialism.'}
              </p>
              <div className="pt-2 text-xs text-white/50 space-y-1">
                <p>{isAr ? '📍 القاهرة الجديدة، التجمع الخامس — مركز الابتكار التكنولوجي' : '📍 New Cairo, Fifth Settlement — Technology Innovation Hub'}</p>
                <p>{isAr ? '⏱️ ساعات الدعم التعليمي: الأحد إلى الخميس، ٩ ص - ٦ م' : '⏱️ Academic Support: Sun to Thu, 9:00 AM – 6:00 PM'}</p>
              </div>
            </div>

            {/* Col 3: Tracks */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-semibold text-[#EF6A55] tracking-wider">
                {isAr ? 'المسارات التخصصية' : 'Applied Tracks'}
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href={`/${locale}/preview/academy/courses?track=data`} className="hover:text-white transition-colors">
                    {isAr ? 'علم البيانات والذكاء الاصطناعي' : 'Data Science & Applied AI'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/courses?track=development`} className="hover:text-white transition-colors">
                    {isAr ? 'هندسة البرمجيات والأنظمة' : 'Software Engineering & Cloud'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/courses?track=design`} className="hover:text-white transition-colors">
                    {isAr ? 'نظم التصميم وهندسة UX' : 'UX Architecture & Systems'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/courses?track=marketing`} className="hover:text-white transition-colors">
                    {isAr ? 'التسويق الرقمي واستراتيجيات النمو' : 'Growth Marketing & Funnels'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Platform Navigation */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-semibold text-[#EF6A55] tracking-wider">
                {isAr ? 'استكشف المنصة' : 'Explore Platform'}
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href={`/${locale}/preview/academy/courses`} className="hover:text-white transition-colors">
                    {isAr ? 'دليل كافة الدورات (١٢ منهج)' : 'All Courses (12 Curricula)'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/learning-paths`} className="hover:text-white transition-colors">
                    {isAr ? 'خارطة المسارات المهنية' : 'Career Learning Paths'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/instructors`} className="hover:text-white transition-colors">
                    {isAr ? 'الخبراء وهيئة التدريس' : 'Expert Instructors'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/resources`} className="hover:text-white transition-colors">
                    {isAr ? 'المقالات والأدلة الإرشادية' : 'Articles & Guides'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/academy/faq`} className="hover:text-white transition-colors">
                    {isAr ? 'الأسئلة الشائعة والمعايير' : 'FAQ & Policies'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Direct Action */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-semibold text-[#EF6A55] tracking-wider">
                {isAr ? 'تجربة تفاعلية فورية' : 'Explore Learning'}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {isAr
                  ? 'جرب حل الاختبارات المقيمة وحفظ تقدمك دون الحاجة لحساب مسجل.'
                  : 'Try scored lesson quizzes and persist your progress locally without registration.'}
              </p>
              <Link
                href={`/${locale}/preview/academy/learn/course-01/lesson-01-01`}
                className="block text-center px-4 py-2.5 rounded-lg bg-[#5F67B5] hover:bg-[#4E56A0] text-white text-xs font-semibold transition-all shadow"
              >
                {isAr ? 'ابدأ درس توضيحي واختبار ⚡' : 'Explore Lesson & Quiz ⚡'}
              </Link>
              <Link
                href={`/${locale}/preview/academy/enrollment-interest`}
                className="block text-center px-4 py-2.5 rounded-lg border border-[#EF6A55] text-[#EF6A55] hover:bg-[#EF6A55] hover:text-white text-xs font-semibold transition-all"
              >
                {isAr ? 'تسجيل اهتمام بالالتحاق' : 'Register Enrollment Interest'}
              </Link>
            </div>
          </div>

          {/* Bottom Disclaimer & Commercial Notice */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="max-w-2xl text-center md:text-start leading-relaxed">
              <span className="font-semibold text-white/70">
                {isAr ? 'معلومات الاستخدام: ' : 'Important Information: '}
              </span>
              {isAr
                ? 'أكاديمية نوفا للتعلّم هي موقع توضيحي متكامل طُوّر بواسطة Mavvix لعرض الإمكانيات البرمجية والتعليمية. كافة الشهادات والاعتمادات المعروضة هي محاكاة تعليمية غير معتمدة من أي جهة حكومية أو أكاديمية. لا يتم تحصيل رسوم حقيقية.'
                : 'Nova Learning is an applied commercial concept website developed by Mavvix to demonstrate modern educational architectures. All certifications and syllabus metrics are simulated and non-accredited. No real tuition fees are collected.'}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/40">© 2026 Mavvix Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <Link href={`/${locale}/showcase`} className="text-[#EF6A55] hover:underline">
                Mavvix Showcase
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <ContactDock locale={locale as 'ar' | 'en'} sector="academy" />
    </div>
  );
}

