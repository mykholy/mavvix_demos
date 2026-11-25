import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEditorialPostBySlug, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Calendar,
  Tag,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  BookOpen,
  Share2
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function ConstructionArticleDetailPage(props: Props) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const article = getEditorialPostBySlug('construction', slug, locale);
  if (!article) {
    notFound();
  }

  const allArticles = getEditorialPosts('construction', locale);
  const nextArticle = allArticles.find((a) => a.slug !== slug) || allArticles[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/construction/journal`} className="hover:text-[#D26A3B]">
            {isAr ? 'المقالات والأفكار' : 'Journal'}
          </Link>
          <span>/</span>
          <span className="text-[#162327] font-bold line-clamp-1">{article.title}</span>
        </div>

        <Link
          href={`/${locale}/preview/construction/journal`}
          className="text-[#D26A3B] hover:underline font-bold shrink-0"
        >
          {isAr ? 'العودة للمقالات' : 'All Articles'}
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
          <span className="bg-[#D26A3B]/10 text-[#D26A3B] px-2.5 py-0.5 rounded font-bold uppercase">
            {article.category}
          </span>
          <span>•</span>
          <span>{new Date(article.published_at).toLocaleDateString(locale)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium">
          {article.summary}
        </p>
      </div>

      {/* Article Body */}
      <article className="prose prose-stone max-w-none bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-sm space-y-8 text-stone-800 leading-relaxed text-sm sm:text-base">
        <p className="text-lg leading-relaxed font-semibold text-stone-900 border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#D26A3B] pl-4 rtl:pr-4">
          {article.body?.intro || article.summary}
        </p>

        {article.body?.sections?.map((sec: any, idx: number) => (
          <div key={idx} className="space-y-3 pt-6 border-t border-stone-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#162327]">
              {sec.heading}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              {sec.text}
            </p>
          </div>
        ))}

        {article.body?.conclusion && (
          <div className="bg-[#F2EFE9] p-6 rounded-xl border border-stone-300/80 space-y-2 mt-8">
            <h3 className="text-sm font-bold text-[#162327] uppercase tracking-wider font-mono">
              {isAr ? 'الخلاصة والتوصية الهندسية' : 'Key Engineering Takeaway'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {article.body.conclusion}
            </p>
          </div>
        )}
      </article>

      {/* Next Article & Quote Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-stone-400 uppercase font-bold block mb-2">
            {isAr ? 'المقال التالي في السلسلة' : 'Next Article'}
          </span>
          <h4 className="text-sm font-bold text-[#162327] mb-4">
            {nextArticle.title}
          </h4>
          <Link
            href={`/${locale}/preview/construction/journal/${nextArticle.slug}`}
            className="text-xs font-bold text-[#D26A3B] flex items-center gap-1 hover:underline"
          >
            <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#D26A3B] text-white p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold mb-2">
              {isAr ? 'هل تريد تسعير مشروعك بنطاق هندسي محكم؟' : 'Ready for Scoped Contracting Pricing?'}
            </h4>
            <p className="text-xs text-amber-100 leading-relaxed mb-4">
              {isAr ? 'استخدم معالج تسعير المناقصات لتحديد المتطلبات بدقة واستلام إيصال تجريبي مسجل.' : 'Use our tender wizard to formulate deliverables and receive a simulated reference.'}
            </p>
          </div>
          <Link
            href={`/${locale}/preview/construction/request-quote`}
            className="text-xs font-bold bg-[#162327] hover:bg-black text-white px-4 py-2.5 rounded-lg w-fit transition-all flex items-center gap-1.5"
          >
            <span>{isAr ? 'معالج التسعير' : 'Tender Wizard'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

