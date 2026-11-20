'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { LocalizedCatalogItem, LocalizedCollection } from '@/lib/db/repositories';
import ProductCard from '../../ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface Props {
  locale: Locale;
  collection: LocalizedCollection;
  products: LocalizedCatalogItem[];
}

export default function CollectionListingClient({
  locale,
  collection,
  products
}: Props) {
  const isAr = locale === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Derive unique sizes and colors across products in this collection
  const allSizes = useMemo(() => {
    const s = new Set<string>();
    products.forEach(p => {
      p.variants?.forEach(v => {
        if (v.attributes?.size) s.add(v.attributes.size);
      });
    });
    return Array.from(s);
  }, [products]);

  const allColors = useMemo(() => {
    const c = new Set<string>();
    products.forEach(p => {
      p.variants?.forEach(v => {
        if (v.attributes?.color) c.add(v.attributes.color);
      });
    });
    return Array.from(c);
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery = q === '' || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);

        const matchesSize = selectedSize === 'all' || p.variants?.some(v => v.attributes?.size === selectedSize);
        const matchesColor = selectedColor === 'all' || p.variants?.some(v => v.attributes?.color === selectedColor);

        return matchesQuery && matchesSize && matchesColor;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.base_price_cents - b.base_price_cents;
        if (sortBy === 'price-desc') return b.base_price_cents - a.base_price_cents;
        return 0;
      });
  }, [products, searchQuery, selectedSize, selectedColor, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSize('all');
    setSelectedColor('all');
    setSortBy('default');
  };

  const hasActiveFilters = searchQuery !== '' || selectedSize !== 'all' || selectedColor !== 'all' || sortBy !== 'default';

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EBE5DF] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7D73] absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث في قطع هذه التشكيلة...' : 'Search within this collection...'}
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 rounded-xl bg-[#F8F5F1] border border-[#DDD4CB] text-xs text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#1A1715]/20 focus:border-[#1A1715]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-4 h-4 text-[#8C7D73]" />
            <span className="text-[#8C7D73] font-medium">{isAr ? 'ترتيب:' : 'Sort:'}</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-[#F8F5F1] border border-[#DDD4CB] text-xs font-semibold text-[#1A1715] focus:outline-none"
            >
              <option value="default">{isAr ? 'الترتيب الافتراضي' : 'Featured'}</option>
              <option value="price-asc">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>

        {/* Filter Pills (Size & Color) */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#F0EAE3] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#1A1715]">{isAr ? 'المقاس:' : 'Size:'}</span>
            <button
              onClick={() => setSelectedSize('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedSize === 'all' ? 'bg-[#1A1715] text-white' : 'bg-[#F3EFEA] text-[#695E57] hover:bg-[#EBE4DC]'
              }`}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            {allSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSize === size ? 'bg-[#1A1715] text-white' : 'bg-[#F3EFEA] text-[#695E57] hover:bg-[#EBE4DC]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {allColors.length > 0 && (
            <div className="flex items-center gap-1.5 ml-4 rtl:ml-0 rtl:mr-4">
              <span className="font-semibold text-[#1A1715]">{isAr ? 'اللون:' : 'Color:'}</span>
              <button
                onClick={() => setSelectedColor('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedColor === 'all' ? 'bg-[#1A1715] text-white' : 'bg-[#F3EFEA] text-[#695E57] hover:bg-[#EBE4DC]'
                }`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>
              {allColors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium uppercase transition-colors ${
                    selectedColor === color ? 'bg-[#1A1715] text-white' : 'bg-[#F3EFEA] text-[#695E57] hover:bg-[#EBE4DC]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#C89B8C] hover:underline flex items-center gap-1 ml-auto rtl:ml-0 rtl:mr-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isAr ? 'إلغاء الفلاتر' : 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-xs text-[#8C7D73]">
        <span>
          {isAr
            ? `عرض ${filteredProducts.length} من أصل ${products.length} قطعة`
            : `Showing ${filteredProducts.length} of ${products.length} products`}
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EBE5DF] p-8 space-y-3">
          <p className="text-sm text-[#695E57]">
            {isAr ? 'لا توجد قطع مطابقة لهذه الفلاتر.' : 'No products matched your exact filter combination.'}
          </p>
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-[#1A1715] underline"
          >
            {isAr ? 'إعادة ضبط كل الفلاتر' : 'Clear all filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} locale={locale} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

