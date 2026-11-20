import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEditorialPostBySlug, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Calendar,
  Tag,
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  PackageCheck,
  ShieldCheck
} from 'lucide-react';

interface Props {
  params: { locale: Locale; slug: string };
}

export default function IndustrialResourceDetailPage({ params }: Props) {
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const article = getEditorialPostBySlug('industrial', slug, locale);
  if (!article) {
    notFound();
  }

  const allArticles = getEditorialPosts('industrial', locale);
  const nextArticle = allArticles.find((a) => a.slug !== slug) || allArticles[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/industrial/resources`} className="hover:text-amber-600">
            {isAr ? 'المكتبة الفنية' : 'Technical Library'}
          </Link>
          <span>/</span>
          <span className="text-[#12243C] font-bold line-clamp-1">{article.title}</span>
        </div>

        <Link
          href={`/${locale}/preview/industrial/resources`}
          className="text-amber-600 hover:underline font-bold shrink-0"
        >
          {isAr ? 'العودة للمكتبة' : 'All Resources'}
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
          <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded font-bold uppercase">
            {article.category}
          </span>
          <span>•</span>
          <span>{new Date(article.published_at).toLocaleDateString(locale)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium">
          {article.summary}
        </p>
      </div>

      {/* Article Content */}
      <article className="prose prose-slate max-w-none bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-sm space-y-8 text-stone-800 leading-relaxed text-sm sm:text-base">
        <p className="text-lg leading-relaxed font-semibold text-[#12243C] border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#DE9E37] pl-4 rtl:pr-4">
          {article.body?.intro || article.summary}
        </p>

        {article.body?.sections?.map((sec: any, idx: number) => (
          <div key={idx} className="space-y-3 pt-6 border-t border-stone-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#12243C]">
              {sec.heading}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              {sec.text}
            </p>
          </div>
        ))}
      </article>

      {/* Bottom Procurement Strip */}
      <div className="bg-[#12243C] text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold mb-1">
            {isAr ? 'هل تبحث عن SKUs مطابقة لهذه المواصفة؟' : 'Looking for SKUs Matching This Specification?'}
          </h4>
          <p className="text-xs text-slate-300">
            {isAr ? 'استعرض دليل الـ 24 منتجًا أو افتح سلة عروض الأسعار للتصدير.' : 'Explore our 24 standardized SKUs or formulate an export RFQ.'}
          </p>
        </div>
        <Link
          href={`/${locale}/preview/industrial/rfq`}
          className="bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider shrink-0 transition-all flex items-center gap-2"
        >
          <PackageCheck className="w-4 h-4" />
          <span>{isAr ? 'سلة التسعير (RFQ)' : 'Open RFQ Basket'}</span>
        </Link>
      </div>
    </div>
  );
}

