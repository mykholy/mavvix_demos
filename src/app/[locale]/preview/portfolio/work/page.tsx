import React, { Suspense } from 'react';
import { Locale } from '@/lib/i18n/config';
import { getProjects } from '@/lib/db/repositories';
import PortfolioWorkClient from './PortfolioWorkClient';

export const metadata = {
  title: 'Work & Case Studies | Salma Hassan Studio',
  description: 'Explore 12 comprehensive design case studies across branding, digital platforms, design systems, and editorial.'
};

export default function PortfolioWorkPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const projects = getProjects('portfolio', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
            {isAr ? 'أرشيف المشاريع والدراسات' : 'Archive & Case Studies'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10]">
            {isAr ? 'أعمال ومشاريع الاستوديو' : 'Selected Work & Systems'}
          </h1>
          <p className="text-sm sm:text-base text-[#57544C] leading-relaxed">
            {isAr
              ? 'تصفح دراسات الحالة المتكاملة مع إمكانية التبديل بين العرض الشبكي والجدولي وفلترة الأعمال حسب التخصص والسنة.'
              : 'Browse our complete portfolio of brand and digital architecture with grid/table toggle and discipline filters.'}
          </p>
        </div>

        <Suspense fallback={<div className="h-80 animate-pulse rounded-3xl bg-stone-100" />}><PortfolioWorkClient locale={locale} projects={projects} /></Suspense>
      </div>
    </div>
  );
}

