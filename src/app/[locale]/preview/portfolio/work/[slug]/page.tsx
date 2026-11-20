import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getProjectBySlug } from '@/lib/db/repositories';
import CaseStudyDetailClient from './CaseStudyDetailClient';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const project = getProjectBySlug('portfolio', slug, locale);
  if (!project) return { title: 'Case Study Not Found' };
  return {
    title: `${project.title} | Salma Hassan Case Study`,
    description: project.summary
  };
}

export default function PortfolioCaseDetailPage({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const isAr = locale === 'ar';
  const project = getProjectBySlug('portfolio', slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#737068]">
          <Link href={`/${locale}/preview/portfolio`} className="hover:text-[#0F0F10]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/portfolio/work`} className="hover:text-[#0F0F10]">
            {isAr ? 'الأعمال' : 'Work'}
          </Link>
          <span>/</span>
          <span className="text-[#0F0F10] font-bold truncate max-w-[200px]">{project.title}</span>
        </div>

        <CaseStudyDetailClient locale={locale} project={project} />
      </div>
    </div>
  );
}

