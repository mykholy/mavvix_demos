import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getPortfolioServiceBySlug, getProjects } from '@/lib/db/repositories';
import { ArrowUpRight, ArrowRight, ArrowLeft, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export async function generateMetadata(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const service = getPortfolioServiceBySlug(slug, locale);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.name} | Salma Hassan Studio`,
    description: service.description
  };
}

export default async function PortfolioServiceDetailPage(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const service = getPortfolioServiceBySlug(slug, locale);
  if (!service) {
    notFound();
  }

  const allProjects = getProjects('portfolio', locale);
  const relevantProjects = allProjects.slice(0, 2);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#737068]">
          <Link href={`/${locale}/preview/portfolio`} className="hover:text-[#0F0F10]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/portfolio/services`} className="hover:text-[#0F0F10]">
            {isAr ? 'الخدمات' : 'Services'}
          </Link>
          <span>/</span>
          <span className="text-[#0F0F10] font-bold truncate max-w-[200px]">{service.name}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E0D8] shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <span className="uppercase text-[#57544C] bg-[#F6F5F2] px-3 py-1 rounded-md border border-[#E2E0D8]">
              Engagement Package
            </span>
            <span className="text-[#737068] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{service.timeline}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10]">
            {service.name}
          </h1>

          <p className="font-mono text-sm text-[#737068]">
            {service.headline}
          </p>

          <p className="text-sm sm:text-base text-[#57544C] leading-relaxed max-w-3xl font-sans">
            {service.description}
          </p>

          <div className="pt-4 border-t border-[#F0EFEA] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#737068]">
              <span>{isAr ? 'الفئة المستهدفة المثالية:' : 'Ideal Profile:'} </span>
              <strong className="text-[#0F0F10] font-sans">{service.idealFor}</strong>
            </div>

            <Link
              href={`/${locale}/preview/portfolio/contact?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#CCFF00] font-mono text-xs font-bold transition-all shadow"
            >
              <span>{isAr ? 'بدء موجز لهذا النطاق' : 'Initiate Brief with this Scope'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scope and Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'بنود ومراحل العمل المشمولة' : 'Scope Inclusions & Phases'}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#57544C]">
              {service.scope.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'المخرجات والأصول المسلمة' : 'Final Deliverables'}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#57544C] font-mono">
              {service.deliverables.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Relevant Case Studies */}
        {relevantProjects.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#0F0F10]">
                {isAr ? 'مشاريع منفذة بنطاق مشابه' : 'Selected Work Delivered in this Domain'}
              </h3>
              <Link
                href={`/${locale}/preview/portfolio/work`}
                className="font-mono text-xs font-semibold text-[#0F0F10] hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'جميع الأعمال' : 'All Work'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relevantProjects.map(p => (
                <div key={p.id} className="p-6 rounded-3xl bg-white border border-[#E2E0D8] space-y-3">
                  <span className="font-mono text-[10px] text-[#737068] uppercase">{p.project_type}</span>
                  <h4 className="font-serif text-lg font-bold text-[#0F0F10]">{p.title}</h4>
                  <p className="text-xs text-[#57544C] line-clamp-2">{p.summary}</p>
                  <div className="pt-2">
                    <Link
                      href={`/${locale}/preview/portfolio/work/${p.slug}`}
                      className="font-mono text-xs font-bold text-[#0F0F10] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{isAr ? 'قراءة دراسة الحالة' : 'Read Case Study'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

