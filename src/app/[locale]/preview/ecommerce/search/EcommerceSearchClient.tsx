'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { LocalizedCatalogItem } from '@/lib/db/repositories';
import ProductCard from '../ProductCard';
import { Search, X, Sparkles } from 'lucide-react';

interface Props {
  locale: Locale;
  products: LocalizedCatalogItem[];
}

export default function EcommerceSearchClient({ locale, products }: Props) {
  const isAr = locale === 'ar';
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState('all');

  const categories = ['all', 'apparel', 'dresses', 'accessories', 'sets'];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      const matchCat = selectedCat === 'all' || p.item_type === selectedCat;
      const matchQuery = q === '' || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [products, query, selectedCat]);

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBE5DF] shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-[#8C7D73] absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن اسم القطعة، الخامة (كتان، صوف)، أو كود SKU...' : 'Search by title, fiber (linen, cotton), or SKU...'}
            className="w-full pl-12 pr-10 rtl:pl-10 rtl:pr-12 py-3.5 rounded-2xl bg-[#F8F5F1] border border-[#DDD4CB] text-sm text-[#1A1715] placeholder-[#8C7D73] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20 focus:border-[#1A1715]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#8C7D73] hover:text-[#1A1715]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0EAE3] text-xs">
          <span className="font-semibold text-[#1A1715] mr-2 rtl:mr-0 rtl:ml-2">
            {isAr ? 'تصفية الفئات:' : 'Filter category:'}
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-xl font-medium uppercase transition-colors ${
                selectedCat === cat
                  ? 'bg-[#1A1715] text-white'
                  : 'bg-[#F3EFEA] text-[#695E57] hover:bg-[#EBE4DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#8C7D73]">
        <span>
          {isAr
            ? `عُثر على ${results.length} قطعة مطابقة`
            : `Found ${results.length} matching items`}
        </span>
      </div>

      {/* Grid or Zero State */}
      {results.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EBE5DF] p-8 space-y-3">
          <p className="text-sm text-[#695E57]">
            {isAr ? 'لم يتم العثور على قطع تطابق بحثك.' : 'No products matched your search query.'}
          </p>
          <button
            onClick={() => { setQuery(''); setSelectedCat('all'); }}
            className="text-xs font-semibold text-[#1A1715] underline"
          >
            {isAr ? 'عرض كل القطع في المتجر' : 'Show all atelier products'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(p => (
            <ProductCard key={p.id} locale={locale} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

