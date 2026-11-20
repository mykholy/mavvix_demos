import Link from 'next/link';
import { getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  BookOpen,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Building
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function RealEstateJournalPage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const articles = getEditorialPosts('real-estate', locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
          BUYER ADVISORY & DISTRICT EDITORIAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {isAr ? 'دليل الأحياء والاستشارات العقارية' : 'Neighborhood Guides & Advisory Insights'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'مقالات متخصصة في تدقيق المخططات الهندسية، وفهم نسب التحميل، واختيار المجمع السكني الأنسب لاحتياجات عائلتك.'
            : 'Unbiased property advisory, architectural layout scrutiny, and financial planning perspectives for luxury homeowners.'}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/${locale}/preview/real-estate/journal/${a.slug}`}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3 text-stone-400 font-mono">
                <span className="text-[#A8764F] font-bold uppercase tracking-wider">
                  {a.category}
                </span>
                <span>{new Date(a.published_at).toLocaleDateString(locale)}</span>
              </div>

              <h2 className="text-lg font-bold text-[#25312D] group-hover:text-[#A8764F] transition-colors mb-3 leading-snug font-serif">
                {a.title}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {a.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#A8764F]">
              <span>{isAr ? 'قراءة الدليل الاستشاري' : 'Read Full Guide'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

