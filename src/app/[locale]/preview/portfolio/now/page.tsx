import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { ArrowUpRight, ArrowRight, ArrowLeft, Clock, BookOpen, Layers, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Now Page | Salma Hassan Studio',
  description: 'What the studio is actively reading, researching, and engineering during the current quarter.'
};

export default function PortfolioNowPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#737068]">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
            <span className="uppercase tracking-widest">{isAr ? 'صفحة الآن — تحديث الربع الثاني 2026' : 'Now Page — Q2 2026 Update'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10]">
            {isAr ? 'ما نعمل عليه ونفكر فيه الآن' : 'What We Are Exploring & Building Now'}
          </h1>
          <p className="text-base sm:text-lg text-[#57544C] leading-relaxed">
            {isAr
              ? 'مساحة تحريرية دورية مستوحاة من حركة /now العالمية، نشارك فيها اهتمامات الاستوديو البحثية والكتب التي نقرؤها والمشاريع الجارية.'
              : 'A dedicated editorial reflection inspired by the /now movement, cataloging current design research threads, reading archives, and active studio explorations.'}
          </p>
        </div>

        {/* Current Active Exploration Streams */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-4 shadow-sm">
            <span className="font-mono text-xs text-[#737068] uppercase tracking-widest">Research Thread 01</span>
            <h2 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'هندسة خطوط الويب المتغيرة (Variable Fonts) للغة العربية' : 'Arabic Variable Font Metrics in High-Density UI'}
            </h2>
            <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed font-sans">
              {isAr
                ? 'نعمل حالياً على بحث تطبيقي لاختبار أوزان الخطوط المتغيرة على واجهات المنصات المالية المعقدة، بهدف الحفاظ على مقروئية الأرقام والجداول الدقيقة دون إجهاد لعين المستخدم.'
                : 'Investigating responsive axis transitions in Arabic variable typography for dense data interfaces, ensuring proportional numeric legibility under diverse lighting environments.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-4 shadow-sm">
            <span className="font-mono text-xs text-[#737068] uppercase tracking-widest">Research Thread 02</span>
            <h2 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'إعادة اكتشاف الورق المادي في عصر التوليد الرقمي' : 'Tactile Print Ephemera in an Era of Algorithmic Abundance'}
            </h2>
            <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed font-sans">
              {isAr
                ? 'تجريب تقنيات طباعة حرارية على ورق قطني غير مطلي، لصنع هويات مؤسسية مادية تمنح المقتني شعوراً بالثقل والأصالة التي يعجز العالم الافتراضي عن محاكاتها.'
                : 'Experimenting with hot-foil letterpress debossing on heavyweight uncoated cotton stocks to craft corporate collateral with profound tactile permanence.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-4 shadow-sm">
            <span className="font-mono text-xs text-[#737068] uppercase tracking-widest">Active Reading Archive</span>
            <h2 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'قراءات في مكتبة الاستوديو' : 'Active Reading Desk'}
            </h2>
            <ul className="space-y-2 text-xs text-[#57544C] font-mono">
              <li>• <em>Grid Systems in Graphic Design</em> — Josef Müller-Brockmann</li>
              <li>• <em>Arabic Typography: A Comprehensive Sourcebook</em> — Huda Smitshuijzen AbiFarès</li>
              <li>• <em>The Visual Display of Quantitative Information</em> — Edward Tufte</li>
            </ul>
          </div>
        </div>

        {/* Action to Work and Contact */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E0D8] font-mono text-xs">
          <Link
            href={`/${locale}/preview/portfolio/work`}
            className="font-bold text-[#0F0F10] hover:underline inline-flex items-center gap-1.5"
          >
            <Arrow className="w-4 h-4" />
            <span>{isAr ? 'العودة لأرشيف الأعمال' : 'Back to Work Archive'}</span>
          </Link>
          <Link
            href={`/${locale}/preview/portfolio/contact`}
            className="px-5 py-2.5 rounded-xl bg-[#0F0F10] text-[#CCFF00] font-bold inline-flex items-center gap-1.5"
          >
            <span>{isAr ? 'بدء نقاش مشروع جديد' : 'Initiate Brief'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

