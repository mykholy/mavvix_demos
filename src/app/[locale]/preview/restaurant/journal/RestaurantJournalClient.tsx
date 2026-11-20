'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LocalizedEditorialPost } from '@/lib/db/repositories';

export function RestaurantJournalClient({
  articles,
  locale,
}: {
  articles: LocalizedEditorialPost[];
  locale: 'ar' | 'en';
}) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];

  const filtered = articles.filter(a => {
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSumm = a.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchSumm) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 text-start">
      {/* Category Filter & Search Ribbon */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#321F18]/10 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#321F18] text-[#FAF3E6]'
                  : 'bg-[#FAF3E6] text-[#321F18] hover:bg-[#FAF3E6]/70'
              }`}
            >
              {cat === 'all' ? (isAr ? 'كافة المقالات' : 'All Topics') : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-64">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? 'ابحث في اليوميات...' : 'Search journal...'}
            className="w-full px-3 py-1.5 rounded-lg border border-[#321F18]/15 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(art => (
          <article
            key={art.id}
            className="bg-white rounded-3xl border border-[#321F18]/15 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
          >
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8B8B52]">
                <span className="uppercase tracking-wider font-semibold">{art.category}</span>
                <span>{isAr ? '٥ دقائق قراءة' : '5 min read'}</span>
              </div>

              <Link href={`/${locale}/preview/restaurant/journal/${art.slug}`}>
                <h2 className="font-serif text-xl font-bold text-[#321F18] group-hover:text-[#BA5C34] transition-colors leading-snug">
                  {art.title}
                </h2>
              </Link>

              <p className="text-xs text-[#321F18]/70 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            <div className="p-8 pt-0">
              <Link
                href={`/${locale}/preview/restaurant/journal/${art.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#BA5C34] hover:underline"
              >
                <span>{isAr ? 'قراءة المقال الكامل' : 'Read Full Story'}</span>
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

