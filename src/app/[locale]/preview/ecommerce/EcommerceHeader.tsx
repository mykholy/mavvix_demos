'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { useCart } from '@/lib/ecommerce/cart-context';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  locale: Locale;
}

export default function EcommerceHeader({ locale }: Props) {
  const isAr = locale === 'ar';
  const { itemCount, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1A1715]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href={`/${locale}/preview/ecommerce`} className="flex items-center gap-3">
          <div className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#1A1715]">
            {isAr ? 'نوريا أتيليه' : 'NORIA ATELIER'}
          </div>
          <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#EFE9E2] text-[#695E57] border border-[#DDD4CB]">
            V2 Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-[#524842]">
          <Link href={`/${locale}/preview/ecommerce/collections`} className="hover:text-[#1A1715] transition-colors">
            {isAr ? 'التشكيلات' : 'Collections'}
          </Link>
          <Link href={`/${locale}/preview/ecommerce/collections/apparel`} className="hover:text-[#1A1715] transition-colors">
            {isAr ? 'الملابس' : 'Apparel'}
          </Link>
          <Link href={`/${locale}/preview/ecommerce/collections/dresses`} className="hover:text-[#1A1715] transition-colors">
            {isAr ? 'الفساتين' : 'Dresses'}
          </Link>
          <Link href={`/${locale}/preview/ecommerce/story`} className="hover:text-[#1A1715] transition-colors">
            {isAr ? 'قصة الأتيليه' : 'Our Story'}
          </Link>
          <Link href={`/${locale}/preview/ecommerce/journal`} className="hover:text-[#1A1715] transition-colors">
            {isAr ? 'المجلة' : 'Journal'}
          </Link>
          <Link href={`/${locale}/preview/ecommerce/help`} className="hover:text-[#1A1715] transition-colors">
            {isAr ? 'المساعدة' : 'Help & Care'}
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/preview/ecommerce/search`}
            className="p-2 text-[#524842] hover:text-[#1A1715] transition-colors"
            title={isAr ? 'بحث' : 'Search'}
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          <Link
            href={`/${locale}/preview/ecommerce/wishlist`}
            className="p-2 text-[#524842] hover:text-[#1A1715] transition-colors relative"
            title={isAr ? 'المفضلة' : 'Wishlist'}
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C89B8C] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href={`/${locale}/preview/ecommerce/cart`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1715] text-[#FAF8F5] text-xs font-semibold hover:bg-[#332E2A] transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#895549]" />
            <span className="hidden sm:inline">{isAr ? 'الحقيبة' : 'Bag'}</span>
            <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EBE5DF] bg-[#FAF8F5] px-6 py-6 space-y-4">
          <Link
            href={`/${locale}/preview/ecommerce/collections`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1A1715]"
          >
            {isAr ? 'جميع التشكيلات' : 'All Collections'}
          </Link>
          <Link
            href={`/${locale}/preview/ecommerce/collections/apparel`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1A1715]"
          >
            {isAr ? 'الملابس' : 'Apparel'}
          </Link>
          <Link
            href={`/${locale}/preview/ecommerce/collections/dresses`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1A1715]"
          >
            {isAr ? 'الفساتين' : 'Dresses'}
          </Link>
          <Link
            href={`/${locale}/preview/ecommerce/story`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1A1715]"
          >
            {isAr ? 'قصة الأتيليه' : 'Our Story'}
          </Link>
          <Link
            href={`/${locale}/preview/ecommerce/journal`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1A1715]"
          >
            {isAr ? 'المجلة' : 'Journal'}
          </Link>
          <Link
            href={`/${locale}/preview/ecommerce/help`}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#1A1715]"
          >
            {isAr ? 'المساعدة والسياسات' : 'Help & Policies'}
          </Link>
        </div>
      )}
    </header>
  );
}

