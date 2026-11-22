import React, { Suspense } from 'react';
import { Locale } from '@/lib/i18n/config';
import { getPortfolioServices, getProjects } from '@/lib/db/repositories';
import ProjectBriefIntakeWizard from './ProjectBriefIntakeWizard';

export const metadata = {
  title: 'Project Brief Intake | Salma Hassan Studio',
  description: 'Initiate a qualified design brief for brand identity systems, digital platforms, or fractional design advisory.'
};

export default function PortfolioContactPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const services = getPortfolioServices(locale);
  const cases = getProjects('portfolio', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
            {isAr ? 'تأهيل موجز المشروع' : 'Project Qualification'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10]">
            {isAr ? 'بدء نقاش المشروع والموجز' : 'Initiate Project Brief'}
          </h1>
          <p className="text-sm sm:text-base text-[#57544C] leading-relaxed">
            {isAr
              ? 'حدد نطاق الخدمة، والهدف الاستراتيجي، والجدول الزمني المفضل لتسجيل استفسارك داخل قاعدة بيانات مافيكس التجريبية.'
              : 'Select your engagement scope, strategic goals, and target timeline to submit a qualified demonstration inquiry.'}
          </p>
        </div>

        <Suspense fallback={<div className="min-h-80 animate-pulse rounded-2xl bg-[#F6F5F2]" />}><ProjectBriefIntakeWizard
          locale={locale}
          services={services}
          cases={cases}
        /></Suspense>
      </div>
    </div>
  );
}

