import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Sparkles, ArrowRight, ArrowLeft, ArrowUpRight, AlertTriangle, Layers } from 'lucide-react';

export default function PortfolioLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F5F2] text-[#0F0F10] font-sans antialiased selection:bg-[#CCFF00] selection:text-[#0F0F10]">
      {/* Top Concept Notice Bar */}
      <div className="bg-[#0F0F10] text-[#E5E3DD] text-xs py-2 px-4 border-b border-[#242426]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {isAr ? 'سلمى حسن ستوديو — نموذج تفاعلي لمحفظة أعمال استشارية بواسطة مافيكس' : 'Salma Hassan Studio — Interactive Creative Practice Demo by Mavvix'}
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-white/60 text-[11px]">
              {isAr ? 'حالات دراسية وسيناريوهات توضيحية خيالية' : 'Simulated case studies & project briefs'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href={`/${locale}/showcase`} className="text-[#CCFF00] hover:underline flex items-center gap-1">
              {isAr ? '← معرض مافيكس' : '← Mavvix Showcase'}
            </Link>
            <Link href={`/${isAr ? 'en' : 'ar'}/preview/portfolio`} className="text-white/70 hover:text-white uppercase tracking-wider">
              {isAr ? 'English' : 'العربية'}
            </Link>
          </div>
        </div>
      </div>

      {/* Swiss Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#F6F5F2]/95 backdrop-blur-md border-b border-[#E2E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Monogram */}
          <Link href={`/${locale}/preview/portfolio`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#0F0F10] text-[#CCFF00] flex items-center justify-center font-mono font-bold text-sm tracking-tighter group-hover:bg-[#CCFF00] group-hover:text-[#0F0F10] transition-colors">
              SH
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0F0F10]">
                {isAr ? 'سلمى حسن ستوديو' : 'SALMA HASSAN'}
              </div>
              <p className="text-[10px] font-mono tracking-widest text-[#737068] uppercase">
                {isAr ? 'إدارة إبداعية وتصميم أنظمة' : 'Design Direction & Systems'}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#57544C]">
            <Link href={`/${locale}/preview/portfolio/work`} className="hover:text-[#0F0F10] transition-colors">
              {isAr ? 'الأعمال' : 'Work (12)'}
            </Link>
            <Link href={`/${locale}/preview/portfolio/services`} className="hover:text-[#0F0F10] transition-colors">
              {isAr ? 'الخدمات' : 'Services (7)'}
            </Link>
            <Link href={`/${locale}/preview/portfolio/about`} className="hover:text-[#0F0F10] transition-colors">
              {isAr ? 'عن الاستوديو' : 'About'}
            </Link>
            <Link href={`/${locale}/preview/portfolio/journal`} className="hover:text-[#0F0F10] transition-colors">
              {isAr ? 'المقالات' : 'Essays'}
            </Link>
            <Link href={`/${locale}/preview/portfolio/now`} className="hover:text-[#0F0F10] transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
              <span>{isAr ? 'الآن' : 'Now'}</span>
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/preview/portfolio/contact`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#F6F5F2] text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <span>{isAr ? 'بدء نقاش المشروع' : 'Initiate Brief'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#CCFF00]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1">
        {children}
      </main>

      {/* Swiss Colophon Footer */}
      <footer className="bg-[#0F0F10] text-[#E5E3DD] pt-16 pb-12 border-t border-[#242426]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Identity */}
            <div className="space-y-4">
              <div className="font-serif text-2xl font-bold text-white">
                {isAr ? 'سلمى حسن' : 'SALMA HASSAN'}
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {isAr
                  ? 'ممارسة استشارية إبداعية تركز على صياغة الهويات البصرية المعقدة، والمنصات الرقمية التحريرية، وأنظمة التصميم المعيارية.'
                  : 'Independent creative practice engineering complex brand identity systems, editorial digital platforms, and modular design tokens.'}
              </p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#CCFF00] font-mono flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#CCFF00] flex-shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'شخصية استشارية تمثيلية لعرض إمكانيات مافيكس البرمجية للمحافظ الإبداعية.'
                    : 'Fictional illustrative consultant persona created for Mavvix commercial platform showcase.'}
                </span>
              </div>
            </div>

            {/* Col 2: Work & Disciplines */}
            <div className="space-y-3 font-mono text-xs">
              <h3 className="font-bold uppercase tracking-widest text-[#CCFF00] mb-4">
                {isAr ? 'فئات الأعمال' : 'Disciplines'}
              </h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href={`/${locale}/preview/portfolio/work?discipline=branding`} className="hover:text-white transition-colors">{isAr ? 'الهويات البصرية' : 'Brand Identity (4)'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/work?discipline=digital`} className="hover:text-white transition-colors">{isAr ? 'المنصات الرقمية' : 'Digital Systems (3)'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/work?discipline=editorial`} className="hover:text-white transition-colors">{isAr ? 'التصميم التحريري' : 'Editorial & Print (3)'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/work?discipline=strategy`} className="hover:text-white transition-colors">{isAr ? 'الاستراتيجية' : 'Brand Strategy (2)'}</Link></li>
              </ul>
            </div>

            {/* Col 3: Practice & Dialogue */}
            <div className="space-y-3 font-mono text-xs">
              <h3 className="font-bold uppercase tracking-widest text-[#CCFF00] mb-4">
                {isAr ? 'الاستوديو' : 'Studio Index'}
              </h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href={`/${locale}/preview/portfolio/services`} className="hover:text-white transition-colors">{isAr ? 'حزم التعاقد والخدمات' : 'Service Packages'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/about`} className="hover:text-white transition-colors">{isAr ? 'المنهجية والأدوات' : 'Ethos & Tools'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/journal`} className="hover:text-white transition-colors">{isAr ? 'المقالات والأفكار' : 'Thought Essays'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/now`} className="hover:text-white transition-colors">{isAr ? 'ما نعمل عليه الآن' : 'Now Page'}</Link></li>
                <li><Link href={`/${locale}/preview/portfolio/contact`} className="hover:text-white transition-colors">{isAr ? 'تأهيل موجز المشروع' : 'Project Brief Intake'}</Link></li>
              </ul>
            </div>

            {/* Col 4: Commercial Commission CTA */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#CCFF00] mb-4">
                {isAr ? 'هل أنت مستشار أو استوديو؟' : 'Creative or Studio?'}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {isAr
                  ? 'تبني مافيكس منصات شخصية ومواقع استوديوهات ذات حضور طباعي استثنائي، مع سرد تفصيلي للقرارات التصميمية واستيعاب منظم لموجز المشاريع.'
                  : 'Mavvix builds Swiss-editorial digital portfolios with deep case narrative architectures and qualified project brief intakes.'}
              </p>
              <a
                href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/contact'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#B8E600] text-[#0F0F10] text-xs font-mono font-bold transition-colors"
              >
                <span>{isAr ? 'اطلب موقعك من مافيكس' : 'Commission a Portfolio'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
            <p>
              © {new Date().getFullYear()} Salma Hassan Studio. Concept Portfolio Demo by Mavvix.
            </p>
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/preview/portfolio/about`} className="hover:text-white transition-colors">
                {isAr ? 'بيان الشفافية' : 'Transparency Disclosure'}
              </Link>
              <Link href={`/${locale}/showcase`} className="text-[#CCFF00] hover:underline">
                {isAr ? 'معرض نماذج مافيكس' : 'Mavvix Showcase'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

