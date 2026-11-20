'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { LocalizedEditorialPost } from '@/lib/db/repositories';

interface Props {
  initialArticles: LocalizedEditorialPost[];
  locale: 'ar' | 'en';
}

export function AcademyResourcesClient({ initialArticles, locale }: Props) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialArticles.map(a => a.category).filter(Boolean)));
    return ['all', ...cats];
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter(article => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(q);
        const matchSummary = article.summary.toLowerCase().includes(q);
        const matchCat = (article.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filter */}
      <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 shadow-sm space-y-5">
        <div>
          <label htmlFor="resource-search" className="block text-xs font-semibold text-[#192A48]/70 mb-2">
            {isAr ? 'البحث في المقالات والأدلة الإرشادية:' : 'Search Articles & Engineering Guides:'}
          </label>
          <input
            id="resource-search"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن موضوع مثل هندسة البيانات، تايب سكريبت، نظم التصميم...' : 'Search topics e.g. Data Engineering, TypeScript, Design Systems...'}
            className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
          />
        </div>

        <div>
          <span className="block text-xs font-semibold text-[#192A48]/60 mb-2">
            {isAr ? 'التصنيف الميداني:' : 'Discipline:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#192A48] text-white shadow-sm'
                    : 'bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48]/10'
                }`}
              >
                {cat === 'all' ? (isAr ? 'كافة المقالات' : 'All Topics') : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#192A48]/10 text-xs text-[#192A48]/60">
          <span>
            {isAr
              ? `عرض ${filteredArticles.length} من إجمالي ${initialArticles.length} مقال تطبيقي`
              : `Showing ${filteredArticles.length} of ${initialArticles.length} applied articles`}
          </span>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#EF6A55] hover:underline font-semibold"
            >
              {isAr ? 'إعادة ضبط ↺' : 'Reset ↺'}
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#192A48]/10 space-y-3">
          <div className="text-3xl">📄</div>
          <h3 className="font-serif text-lg font-bold text-[#192A48]">
            {isAr ? 'لا توجد مقالات مطابقة' : 'No matching articles'}
          </h3>
          <p className="text-xs text-[#192A48]/70">
            {isAr ? 'جرب البحث بكلمات أخرى أو اختر تصنيفًا مختلفًا.' : 'Try different keywords or reset category filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-[#192A48]/10 p-6 space-y-4 hover:border-[#EF6A55] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#192A48]/50">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#192A48]/5 font-semibold text-[#192A48]">
                    {article.category}
                  </span>
                  <span>⏱️ 5 {isAr ? 'دقائق قراءة' : 'min read'}</span>
                </div>

                <h2 className="font-serif text-lg font-bold text-[#192A48] hover:text-[#EF6A55] transition-colors leading-snug">
                  <Link href={`/${locale}/preview/academy/resources/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="text-xs text-[#192A48]/75 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#192A48]/10 flex items-center justify-between text-xs text-[#192A48]/50">
                <span>{article.published_at.slice(0, 10)}</span>
                <Link
                  href={`/${locale}/preview/academy/resources/${article.slug}`}
                  className="font-semibold text-[#5F67B5] hover:text-[#EF6A55]"
                >
                  {isAr ? 'قراءة المقال الكامل ←' : 'Read Article →'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

