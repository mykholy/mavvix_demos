import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getPortfolioServices } from '@/lib/db/repositories';
import { ArrowUpRight, ArrowRight, ArrowLeft, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Services & Engagement Models | Salma Hassan Studio',
  description: 'Structured creative direction, brand identity architectures, design systems, and fractional design advisory.'
};

export default async function PortfolioServicesPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const services = getPortfolioServices(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Fold */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
            {isAr ? 'نماذج التعاقد والخدمات' : 'Engagement Frameworks'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10]">
            {isAr ? 'خدمات الاستوديو ونطاقات العمل' : 'Disciplined Practice & Services'}
          </h1>
          <p className="text-sm sm:text-base text-[#57544C] leading-relaxed">
            {isAr
              ? 'نقدم سبعة مسارات تعاقدية محددة بدقة، تضمن وضوح المخرجات، والجدول الزمني، ومعايير الجودة الاستثنائية.'
              : 'Seven calibrated engagement models engineered to deliver visual authority, clear timelines, and measurable creative leadership.'}
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 hover:border-[#0F0F10] hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#737068]">
                  <span className="uppercase text-[#57544C] bg-[#F6F5F2] px-2.5 py-0.5 rounded border border-[#E2E0D8]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{svc.timeline}</span>
                  </div>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#0F0F10] leading-snug">
                  {svc.name}
                </h2>

                <p className="font-mono text-xs text-[#737068]">
                  {svc.headline}
                </p>

                <p className="text-xs text-[#57544C] leading-relaxed line-clamp-3">
                  {svc.description}
                </p>

                {/* Scope highlights */}
                <div className="space-y-2 pt-3 border-t border-[#F0EFEA] text-xs">
                  <span className="font-mono font-bold text-[11px] text-[#0F0F10] uppercase">
                    {isAr ? 'أبرز بنود النطاق:' : 'Core Scope:'}
                  </span>
                  <ul className="space-y-1 text-[#57544C]">
                    {svc.scope.slice(0, 3).map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/portfolio/services/${svc.slug}`}
                  className="font-mono text-xs font-semibold text-[#0F0F10] hover:underline"
                >
                  {isAr ? 'ملف الخدمة' : 'Dossier'}
                </Link>
                <Link
                  href={`/${locale}/preview/portfolio/contact?service=${svc.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#CCFF00] font-mono text-xs font-bold transition-colors"
                >
                  <span>{isAr ? 'بدء التعاقد' : 'Select'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

