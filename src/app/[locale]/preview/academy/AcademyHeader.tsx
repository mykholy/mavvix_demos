'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AcademyHeader({ locale }: { locale: 'ar' | 'en' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';

  const navLinks = [
    { href: `/${locale}/preview/academy/courses`, label: isAr ? 'المسارات والدورات' : 'Courses' },
    { href: `/${locale}/preview/academy/learning-paths`, label: isAr ? 'البرامج المهنية' : 'Learning Paths' },
    { href: `/${locale}/preview/academy/instructors`, label: isAr ? 'هيئة التدريس' : 'Instructors' },
    { href: `/${locale}/preview/academy/resources`, label: isAr ? 'المصادر والمقالات' : 'Resources' },
    { href: `/${locale}/preview/academy/faq`, label: isAr ? 'الأسئلة الشائعة' : 'FAQ' },
  ];

  const switchLocaleHref = pathname.replace(`/${locale}`, `/${locale === 'ar' ? 'en' : 'ar'}`);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#192A48]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href={`/${locale}/preview/academy`} className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-[#192A48] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#5F67B5] transition-colors">
              N
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#192A48]">
                {isAr ? 'نوفا للتعلّم' : 'NOVA LEARNING'}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#5F67B5] font-semibold">
                {isAr ? 'أكاديمية مهنية متقدمة' : 'Applied Tech Academy'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? 'text-[#EF6A55] font-semibold' : 'text-[#192A48]/80 hover:text-[#EF6A55]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Ribbon */}
          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <Link
              href={switchLocaleHref}
              className="text-xs px-2.5 py-1 rounded border border-[#192A48]/20 text-[#192A48] hover:border-[#EF6A55] hover:text-[#EF6A55] transition-colors"
            >
              {isAr ? 'English' : 'عربي'}
            </Link>

            {/* Demo Lesson Quick Shortcut */}
            <Link
              href={`/${locale}/preview/academy/learn/course-01/lesson-01-01`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FF] border border-[#192A48]/15 text-[#192A48] hover:bg-[#5F67B5] hover:text-white transition-all text-xs font-semibold"
            >
              <span>{isAr ? 'درس تجريبي ⚡' : 'Demo Lesson ⚡'}</span>
            </Link>

            {/* Enrollment Interest CTA */}
            <Link
              href={`/${locale}/preview/academy/enrollment-interest`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EF6A55] text-white hover:bg-[#D95540] transition-all text-xs font-semibold shadow-sm"
            >
              <span>{isAr ? 'تسجيل الاهتمام' : 'Enrollment Interest'}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#192A48] hover:bg-[#192A48]/5"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#192A48]/10 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium px-2 py-1.5 rounded hover:bg-[#192A48]/5 text-[#192A48]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/preview/academy/learn/course-01/lesson-01-01`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-2 py-1.5 rounded text-[#5F67B5]"
            >
              {isAr ? 'تجربة درس مجاني واختبار ⚡' : 'Try Free Lesson & Quiz ⚡'}
            </Link>
            <Link
              href={`/${locale}/preview/academy/enrollment-interest`}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 px-4 rounded-lg bg-[#EF6A55] text-white text-sm font-semibold"
            >
              {isAr ? 'تسجيل اهتمام بالالتحاق' : 'Register Enrollment Interest'}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

