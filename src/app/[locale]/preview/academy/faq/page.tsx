import React from 'react';
import { AcademyFaqClient } from './AcademyFaqClient';

export const metadata = {
  title: 'Frequently Asked Questions & Standards | Nova Learning',
  description: 'In-depth answers on pedagogy, deterministic scoring, progress persistence, and demo transparency.',
};

export default async function AcademyFaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192A48]/10 text-[#192A48] text-xs font-semibold">
          <span>{isAr ? 'الأسئلة الشائعة والمعايير' : 'Policies, FAQ & Standards'}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#192A48]">
          {isAr ? 'الأسئلة المتكررة وسياسات التعلم' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-base text-[#192A48]/75 leading-relaxed">
          {isAr
            ? 'إجابات واضحة وشفافة حول فلسفتنا التعليمية، وآلية حفظ التقدم في قاعدة البيانات المحلية، وسياسات الشهادات والمحاكاة.'
            : 'Transparent details regarding our applied pedagogy, local SQLite persistence architecture, and demo verification standards.'}
        </p>
      </div>

      {/* Accordion Client */}
      <AcademyFaqClient locale={locale as 'ar' | 'en'} />
    </div>
  );
}

