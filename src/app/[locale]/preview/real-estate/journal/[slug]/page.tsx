import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEditorialPostBySlug, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Calendar,
  Tag,
  ArrowRight,
  ArrowLeft,
  Building,
  Home,
  CheckCircle2
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function RealEstateBuyerGuideDetailPage(props: Props) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const article = getEditorialPostBySlug('real-estate', slug, locale);
  if (!article) {
    notFound();
  }

  const allArticles = getEditorialPosts('real-estate', locale);
  const nextArticle = allArticles.find((a) => a.slug !== slug) || allArticles[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/real-estate/journal`} className="hover:text-[#805333]">
            {isAr ? 'دليل المشترين' : 'Buyer Guides'}
          </Link>
          <span>/</span>
          <span className="text-[#25312D] font-bold line-clamp-1">{article.title}</span>
        </div>

        <Link
          href={`/${locale}/preview/real-estate/journal`}
          className="text-[#805333] hover:underline font-bold shrink-0"
        >
          {isAr ? 'كافة الأدلة' : 'All Guides'}
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
          <span className="bg-[#805333]/10 text-[#805333] px-2.5 py-0.5 rounded font-bold uppercase">
            {article.category}
          </span>
          <span>•</span>
          <span>{new Date(article.published_at).toLocaleDateString(locale)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight leading-tight font-serif">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium">
          {article.summary}
        </p>
      </div>

      {/* Body */}
      <article className="prose prose-stone max-w-none bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-sm space-y-8 text-stone-800 leading-relaxed text-sm sm:text-base">
        <p className="text-lg leading-relaxed font-semibold text-[#25312D] border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#805333] pl-4 rtl:pr-4">
          {article.body?.intro || article.summary}
        </p>

        {article.body?.sections?.map((sec: any, idx: number) => (
          <div key={idx} className="space-y-3 pt-6 border-t border-stone-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#25312D] font-serif">
              {sec.heading}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              {sec.text}
            </p>
          </div>
        ))}
      </article>

      {/* Links & CTA */}
      <div className="bg-[#25312D] text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold mb-1 font-serif">
            {isAr ? 'هل تريد استكشاف الوحدات المطابقة لدراستك؟' : 'Ready to View Matching Residences?'}
          </h4>
          <p className="text-xs text-stone-300">
            {isAr ? 'استعرض 24 وحدة مفروزة بالميزانية والمساحة واحجز موعد معاينة خاصة.' : 'Filter across 24 candidate homes and request a simulated viewing tour.'}
          </p>
        </div>
        <Link
          href={`/${locale}/preview/real-estate/properties`}
          className="bg-[#805333] hover:bg-[#8e613e] text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider shrink-0 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>{isAr ? 'تصفح الوحدات (24)' : 'Browse Properties'}</span>
        </Link>
      </div>
    </div>
  );
}

