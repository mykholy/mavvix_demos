'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { LocalizedEditorialPost } from '@/lib/db/repositories';
import { Search, ArrowUpRight, Clock, X } from 'lucide-react';

interface Props {
  locale: Locale;
  articles: LocalizedEditorialPost[];
}

export default function PortfolioJournalClient({ locale, articles }: Props) {
  const isAr = locale === 'ar';
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Design Strategy', 'Typography', 'Engineering'];

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const q = query.trim().toLowerCase();
      const matchQuery = q === '' || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q);
      const matchCat = activeCategory === 'all' || (a.category || '').toLowerCase().includes(activeCategory.toLowerCase());
      return matchQuery && matchCat;
    });
  }, [articles, query, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#737068] absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={isAr ? 'بحث في مقالات الاستوديو...' : 'Search essays and thought pieces...'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] text-xs text-[#0F0F10] focus:outline-none focus:ring-2 focus:ring-[#0F0F10]/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl uppercase transition-colors ${
                activeCategory === cat
                  ? 'bg-[#0F0F10] text-[#CCFF00] font-bold shadow-sm'
                  : 'bg-[#F6F5F2] text-[#57544C] hover:bg-[#EAE8E1]'
              }`}
            >
              {cat === 'all' ? (isAr ? 'الكل' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Essays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a, idx) => (
          <article
            key={a.id}
            className="bg-white rounded-3xl border border-[#E2E0D8] p-6 hover:border-[#0F0F10] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#737068]">
                <span className="uppercase text-[#57544C] bg-[#F6F5F2] px-2 py-0.5 rounded border border-[#E2E0D8]">
                  {a.category || 'Essay'}
                </span>
                <span>4 min read</span>
              </div>

              <h2 className="font-serif text-lg font-bold text-[#0F0F10] leading-snug">
                {a.title}
              </h2>

              <p className="text-xs text-[#57544C] line-clamp-3 leading-relaxed font-sans">
                {a.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EFEA] flex items-center justify-between font-mono text-xs">
              <span className="text-[#737068]">/{a.slug}</span>
              <Link
                href={`/${locale}/preview/portfolio/journal/${a.slug}`}
                className="font-bold text-[#0F0F10] hover:underline inline-flex items-center gap-1"
              >
                <span>{isAr ? 'قراءة المقال' : 'Read Essay'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

