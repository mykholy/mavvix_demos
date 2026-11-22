'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { LocalizedCatalogItem } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { getIndustrialPhoto } from '@/lib/media/sector-images';
import {
  Search,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  PackageCheck,
  Scale,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface Props {
  products: LocalizedCatalogItem[];
  locale: Locale;
  initialCategory?: string;
  initialGrade?: string;
}

export function IndustrialCatalogClient({ products, locale, initialCategory, initialGrade }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [category, setCategory] = useState<string>(initialCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [rfqAddedNotice, setRfqAddedNotice] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (category !== 'all' && p.item_type.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchSku = p.sku.toLowerCase().includes(query);
        const matchTitle = p.title.toLowerCase().includes(query);
        if (!matchSku && !matchTitle) return false;
      }
      return true;
    });
  }, [products, category, searchTerm]);

  function toggleCompare(sku: string) {
    if (compareList.includes(sku)) {
      setCompareList(compareList.filter((s) => s !== sku));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, sku]);
      } else {
        alert(isAr ? 'يمكنك مقارنة 3 منتجات كحد أقصى في وقت واحد' : 'Maximum 3 items can be compared simultaneously');
      }
    }
  }

  function handleQuickAddRfq(sku: string) {
    try {
      const stored = JSON.parse(localStorage.getItem('mavvix_industrial_rfq_skus') || '[]');
      const items: string[] = Array.isArray(stored) ? stored.filter((v: unknown): v is string => typeof v === 'string') : [];
      if (!items.includes(sku)) items.push(sku);
      localStorage.setItem('mavvix_industrial_rfq_skus', JSON.stringify(items));
      setRfqAddedNotice(sku);
    } catch {
      // If browser storage is blocked, the item can still be added through the RFQ selector.
      window.location.assign(`/${locale}/preview/industrial/rfq?sku=${encodeURIComponent(sku)}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'بحث بالكود أو الاسم (مثال: FERRO-304 أو خابور)...' : 'Search by SKU or title (e.g. FERRO-304)...'}
            className="w-full pl-10 rtl:pr-10 pr-4 rtl:pl-4 py-2.5 bg-[#F4F6F6] border border-stone-300 rounded-lg text-xs text-[#12243C] focus:outline-none focus:ring-2 focus:ring-[#DE9E37]"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
          {[
            { id: 'all', label: isAr ? 'الكل' : 'All' },
            { id: 'profiles', label: isAr ? 'قطاعات' : 'Profiles' },
            { id: 'fasteners', label: isAr ? 'مثبتات' : 'Fasteners' },
            { id: 'pipes', label: isAr ? 'مواسير' : 'Pipes' },
            { id: 'tubes', label: isAr ? 'أنابيب' : 'Tubes' },
            { id: 'fittings', label: isAr ? 'وصلات' : 'Fittings' },
            { id: 'sheets', label: isAr ? 'ألواح' : 'Sheets' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                category === cat.id
                  ? 'bg-[#12243C] text-white'
                  : 'bg-[#F4F6F6] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-[#12243C] text-white' : 'bg-stone-200 text-stone-700'}`}
            title="Table View (B2B Spec Sheet)"
          >
            <TableIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#12243C] text-white' : 'bg-stone-200 text-stone-700'}`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Compare & RFQ Status Bar if active */}
      {compareList.length > 0 && (
        <div className="p-3 bg-[#12243C] text-white rounded-xl flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>
              {isAr ? 'تم تحديد' : 'Selected for Comparison:'} <strong>{compareList.join(', ')}</strong> ({compareList.length}/3)
            </span>
          </div>
          <Link
            href={`/${locale}/preview/industrial/compare?items=${compareList.join(',')}`}
            className="bg-[#DE9E37] text-slate-950 font-bold px-3 py-1 rounded text-xs hover:bg-[#c98e2f]"
          >
            {isAr ? 'فتح شاشة المقارنة الفنية ←' : 'Open Spec Comparison →'}
          </Link>
        </div>
      )}

      {/* RFQ Quick Toast */}
      {rfqAddedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? `تمت إضافة ${rfqAddedNotice} لسلة التسعير` : `Added ${rfqAddedNotice} to RFQ draft.`}</span>
          </div>
          <Link href={`/${locale}/preview/industrial/rfq`} className="font-bold underline text-emerald-900">
            {isAr ? 'عرض السلة' : 'View Basket'}
          </Link>
        </div>
      )}

      {/* Results Count */}
      <div className="text-xs text-stone-500 font-mono">
        {isAr ? 'النتائج المتطابقة:' : 'Matching SKUs:'} <strong className="text-[#12243C]">{filteredProducts.length}</strong> {isAr ? 'من أصل' : 'of'} {products.length}
      </div>

      {/* Table View (Dense B2B Spec Sheet Layout) */}
      {viewMode === 'table' ? (
        <div className="bg-white border border-stone-200 rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="bg-[#12243C] text-white font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">{isAr ? 'اسم المنتج والمواصفة' : 'Product & Specification'}</th>
                <th className="py-3 px-4">{isAr ? 'القطاع' : 'Category'}</th>
                <th className="py-3 px-4">{isAr ? 'المعيار' : 'Standard'}</th>
                <th className="py-3 px-4">{isAr ? 'الحد الأدنى (MOQ)' : 'Min. Order (MOQ)'}</th>
                <th className="py-3 px-4 text-center">{isAr ? 'المقارنة' : 'Compare'}</th>
                <th className="py-3 px-4 text-right rtl:text-left">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              {filteredProducts.map((p) => {
                const isCompared = compareList.includes(p.sku);
                return (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                      <Link href={`/${locale}/preview/industrial/products/${p.slug}`} className="hover:underline">
                        {p.sku}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link href={`/${locale}/preview/industrial/products/${p.slug}`} className="font-bold text-[#12243C] hover:text-amber-700">
                        {p.title}
                      </Link>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{p.summary}</p>
                    </td>
                    <td className="py-3.5 px-4 capitalize font-mono text-stone-600">{p.item_type}</td>
                    <td className="py-3.5 px-4 font-mono text-stone-600">DIN EN 10025</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">100 — 500 pcs</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleCompare(p.sku)}
                        className={`p-1.5 rounded text-xs font-bold transition-colors ${
                          isCompared ? 'bg-amber-500 text-slate-950' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                        title="Add to Compare"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right rtl:text-left space-x-2 rtl:space-x-reverse">
                      <Link
                        href={`/${locale}/preview/industrial/rfq?sku=${p.sku}`}
                        className="inline-flex items-center gap-1 bg-[#12243C] hover:bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded transition-all"
                      >
                        <PackageCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isAr ? 'تسعير' : 'RFQ'}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <img
                  src={getIndustrialPhoto(p.sku || p.id)}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 start-2.5 text-xs font-mono font-bold text-white px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md">
                  {p.sku}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {p.sku}
                  </span>
                  <span className="text-stone-400 capitalize">{p.item_type}</span>
                </div>

                <h3 className="text-base font-bold text-[#12243C] group-hover:text-amber-700 transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                  {p.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <Link
                  href={`/${locale}/preview/industrial/products/${p.slug}`}
                  className="text-[#12243C] hover:text-amber-700 flex items-center gap-1"
                >
                  <span>{isAr ? 'المواصفات' : 'Specs'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/${locale}/preview/industrial/rfq?sku=${p.sku}`}
                  className="text-amber-600 hover:underline text-[11px]"
                >
                  + {isAr ? 'إضافة للـ RFQ' : 'Add to RFQ'}
                </Link>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

