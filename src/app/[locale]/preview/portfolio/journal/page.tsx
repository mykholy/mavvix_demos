import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPosts } from '@/lib/db/repositories';
import PortfolioJournalClient from './PortfolioJournalClient';

export const metadata = {
  title: 'Essays & Design Philosophy | Salma Hassan',
  description: 'Original writings on typography, brand strategy, design systems, and digital architecture.'
};

export default function PortfolioJournalPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const articles = getEditorialPosts('portfolio', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
            {isAr ? 'أفكار وكتابات الاستوديو' : 'Studio Monologue'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10]">
            {isAr ? 'المقالات والرؤى النقدية' : 'Essays on Design & Systems'}
          </h1>
          <p className="text-sm sm:text-base text-[#57544C] leading-relaxed">
            {isAr
              ? 'مجموعة من النصوص النقدية والتأملات المهنية في تحديات الهوية المعاصرة، وهندسة النظم البصرية، وفلسفة الاختزال.'
              : 'Critical examinations of visual systems, typographic governance, and the architecture of brand durability.'}
          </p>
        </div>

        <PortfolioJournalClient locale={locale} articles={articles} />
      </div>
    </div>
  );
}

