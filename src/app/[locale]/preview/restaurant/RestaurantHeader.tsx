'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrder } from '@/lib/restaurant/order-context';

export function RestaurantHeader({ locale }: { locale: 'ar' | 'en' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useOrder();
  const pathname = usePathname();
  const isAr = locale === 'ar';

  const navLinks = [
    { href: `/${locale}/preview/restaurant/menu`, label: isAr ? 'قائمة الطعام' : 'Menu' },
    { href: `/${locale}/preview/restaurant/story`, label: isAr ? 'قصة المطبخ' : 'Our Story' },
    { href: `/${locale}/preview/restaurant/locations`, label: isAr ? 'الفروع والمواعيد' : 'Locations' },
    { href: `/${locale}/preview/restaurant/reserve`, label: isAr ? 'حجز طاولة' : 'Reserve' },
    { href: `/${locale}/preview/restaurant/journal`, label: isAr ? 'يوميات الطهي' : 'Journal' },
    { href: `/${locale}/preview/restaurant/faq`, label: isAr ? 'الأسئلة الشائعة' : 'FAQ' },
  ];

  const switchLocaleHref = pathname.replace(`/${locale}`, `/${locale === 'ar' ? 'en' : 'ar'}`);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF3E6]/95 backdrop-blur-md border-b border-[#321F18]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href={`/${locale}/preview/restaurant`} className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-full bg-[#984321] text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-[#9E4A28] transition-colors">
              ز
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#321F18]">
                {isAr ? 'سُفرة زعفران' : 'SAFFRON TABLE'}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#62622F] font-semibold">
                {isAr ? 'مطبخ وتراث شرقي' : 'Heritage Culinary'}
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
                    active ? 'text-[#984321] font-semibold' : 'text-[#321F18]/80 hover:text-[#984321]'
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
              className="text-xs px-2.5 py-1 rounded border border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34] hover:text-[#984321] transition-colors"
            >
              {isAr ? 'English' : 'عربي'}
            </Link>

            {/* Order Bag Button */}
            <Link
              href={`/${locale}/preview/restaurant/order`}
              aria-label={isAr ? 'عرض الطلب' : 'View order'}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-[#321F18] text-[#FAF3E6] hover:bg-[#452B21] transition-all text-xs font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">{isAr ? 'الطلب' : 'Order'}</span>
              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold bg-[#984321] text-white rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Table Reservation Button */}
            <Link
              href={`/${locale}/preview/restaurant/reserve`}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#984321] text-white hover:bg-[#9E4A28] transition-all text-xs font-semibold shadow-sm"
            >
              <span>{isAr ? 'حجز طاولة' : 'Book Table'}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#321F18] hover:bg-[#321F18]/5"
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
          <div className="lg:hidden py-4 border-t border-[#321F18]/10 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium px-2 py-1.5 rounded hover:bg-[#321F18]/5 text-[#321F18]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/preview/restaurant/reserve`}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 px-4 rounded-lg bg-[#984321] text-white text-sm font-semibold"
            >
              {isAr ? 'طلب حجز طاولة' : 'Request Table Reservation'}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

