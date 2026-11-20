import React from 'react';
import { getEditorialPosts } from '@/lib/db/repositories';
import { AcademyResourcesClient } from './AcademyResourcesClient';
import type { Locale } from '@/lib/i18n/config';

export const metadata = {
  title: 'Engineering Resources & Field Insights | Nova Learning',
  description: 'In-depth essays and pragmatic guides on Data Engineering, Type Systems, UX Research, and Conversion Optimization.',
};

export default async function AcademyResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const articles = getEditorialPosts('academy', loc);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192A48]/10 text-[#192A48] text-xs font-semibold">
          <span>{isAr ? 'المقالات والأدلة الميدانية' : 'Engineering Insights & Pedagogy'}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#192A48]">
          {isAr ? 'المصادر والمقالات المتخصصة' : 'Technical Articles & Resources'}
        </h1>
        <p className="text-base text-[#192A48]/75 leading-relaxed">
          {isAr
            ? 'كتابات تحليلية معمقة تتناول التحديات الهندسية والتصميمية الواقعية. مقالات تفصيلية بأكثر من ٣٠٠ كلمة لكل موضوع، تشرح كيف تبني أنظمة قوية وتتفادى الأخطاء المكلفة.'
            : 'Substantive 300+ word essays and field guides addressing production realities across Data, TypeScript, UX Research, and Product Growth.'}
        </p>
      </div>

      {/* Client Component */}
      <AcademyResourcesClient initialArticles={articles} locale={locale as 'ar' | 'en'} />
    </div>
  );
}

