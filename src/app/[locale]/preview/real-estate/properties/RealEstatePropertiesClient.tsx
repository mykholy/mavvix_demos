'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import type { LocalizedPropertyUnit } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  Scale,
  Bookmark,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Building,
  Ruler,
  Bed,
  Bath,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Props {
  units: LocalizedPropertyUnit[];
  locale: Locale;
  initialType?: string;
  initialMaxPrice?: string;
}

export function RealEstatePropertiesClient({ units, locale, initialType, initialMaxPrice }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [typeFilter, setTypeFilter] = useState<string>(initialType || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice ? parseInt(initialMaxPrice, 10) : 0);
  const [bedsFilter, setBedsFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [compareList, setCompareList] = useState<string[]>([]);
  const [savedList, setSavedList] = useState<string[]>([]);

  // Load saved from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('meridian_saved_units');
      if (saved) setSavedList(JSON.parse(saved));
      const comp = localStorage.getItem('meridian_compare_units');
      if (comp) setCompareList(JSON.parse(comp));
    } catch (e) {}
  }, []);

  function toggleSave(slug: string) {
    let next: string[];
    if (savedList.includes(slug)) {
      next = savedList.filter((s) => s !== slug);
    } else {
      next = [...savedList, slug];
    }
    setSavedList(next);
    try {
      localStorage.setItem('meridian_saved_units', JSON.stringify(next));
    } catch (e) {}
  }

  function toggleCompare(slug: string) {
    let next: string[];
    if (compareList.includes(slug)) {
      next = compareList.filter((s) => s !== slug);
    } else {
      if (compareList.length < 3) {
        next = [...compareList, slug];
      } else {
        alert(isAr ? 'يمكنك مقارنة 3 وحدات كحد أقصى' : 'Maximum 3 units can be compared simultaneously');
        return;
      }
    }
    setCompareList(next);
    try {
      localStorage.setItem('meridian_compare_units', JSON.stringify(next));
    } catch (e) {}
  }

  const filteredUnits = useMemo(() => {
    return units.filter((u) => {
      if (typeFilter !== 'all' && u.unit_type.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }
      if (maxPrice > 0 && u.price_cents / 100 > maxPrice) {
        return false;
      }
      if (bedsFilter !== 'all') {
        const requiredBeds = parseInt(bedsFilter, 10);
        if (u.bedrooms < requiredBeds) return false;
      }
      return true;
    });
  }, [units, typeFilter, maxPrice, bedsFilter]);

  function handleReset() {
    setTypeFilter('all');
    setMaxPrice(0);
    setBedsFilter('all');
  }

  return (
    <div className="space-y-6">
      {/* Top Filter Controls */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Typology Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs w-full md:w-auto">
          {[
            { id: 'all', label: isAr ? 'كافة الوحدات' : 'All Units' },
            { id: 'apartment', label: isAr ? 'شقق' : 'Apartments' },
            { id: 'duplex', label: isAr ? 'دوبلكس' : 'Duplexes' },
            { id: 'penthouse', label: isAr ? 'بنتهاوس' : 'Penthouses' },
            { id: 'townhouse', label: isAr ? 'تاون هاوس' : 'Townhouses' },
            { id: 'villa', label: isAr ? 'فيلات' : 'Villas' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                typeFilter === t.id
                  ? 'bg-[#25312D] text-white'
                  : 'bg-[#F5F0E6] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Budget Band Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto text-xs">
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10) || 0)}
            className="p-2 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          >
            <option value="0">{isAr ? 'كافة الميزانيات' : 'All Budgets'}</option>
            <option value="7000000">≤ 7,000,000 EGP</option>
            <option value="12000000">≤ 12,000,000 EGP</option>
            <option value="20000000">≤ 20,000,000 EGP</option>
          </select>

          <select
            value={bedsFilter}
            onChange={(e) => setBedsFilter(e.target.value)}
            className="p-2 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          >
            <option value="all">{isAr ? 'كافة الغرف' : 'All Beds'}</option>
            <option value="2">2+ {isAr ? 'غرف' : 'Beds'}</option>
            <option value="3">3+ {isAr ? 'غرف' : 'Beds'}</option>
            <option value="4">4+ {isAr ? 'غرف' : 'Beds'}</option>
          </select>

          <button
            onClick={handleReset}
            className="p-2 text-stone-500 hover:text-stone-900"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#25312D] text-white' : 'bg-stone-200 text-stone-700'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#25312D] text-white' : 'bg-stone-200 text-stone-700'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compare Floating Banner */}
      {compareList.length > 0 && (
        <div className="p-3 bg-[#25312D] text-white rounded-xl flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-300" />
            <span>
              {isAr ? 'تم تحديد' : 'Selected for Comparison:'} <strong>{compareList.length} / 3</strong> {isAr ? 'وحدات' : 'units'}
            </span>
          </div>
          <Link
            href={`/${locale}/preview/real-estate/compare?units=${compareList.join(',')}`}
            className="bg-[#A8764F] text-white font-bold px-3 py-1 rounded text-xs hover:bg-[#8e613e]"
          >
            {isAr ? 'فتح المقارنة الفنية ←' : 'Open Spec Comparison →'}
          </Link>
        </div>
      )}

      {/* Count */}
      <div className="text-xs text-stone-500 font-mono">
        {isAr ? 'الوحدات المطابقة:' : 'Matching Residences:'} <strong className="text-[#25312D]">{filteredUnits.length}</strong> {isAr ? 'من أصل' : 'of'} {units.length}
      </div>

      {/* Grid / List Results */}
      {filteredUnits.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-[#25312D]">
            {isAr ? 'لا توجد وحدات مطابقة للميزانية أو المعايير المحددة' : 'No Residences Found Matching Criteria'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {isAr ? 'أعد ضبط خيارات التصفية للاطلاع على كافة الوحدات الـ 24 المتاحة.' : 'Try expanding your budget ceiling or resetting filters.'}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 bg-[#A8764F] text-white text-xs font-bold px-4 py-2.5 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isAr ? 'إعادة ضبط التصفية' : 'Reset Filters'}</span>
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
          {filteredUnits.map((u) => {
            const priceEgp = (u.price_cents / 100).toLocaleString();
            const isSaved = savedList.includes(u.slug);
            const isCompared = compareList.includes(u.slug);

            return (
              <div
                key={u.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-3 text-stone-400">
                    <span className="bg-stone-100 text-[#25312D] px-2 py-0.5 rounded font-bold uppercase text-[11px]">
                      {u.unit_type}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSave(u.slug)}
                        className={`p-1.5 rounded transition-colors ${
                          isSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                        }`}
                        title="Save to shortlist"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => toggleCompare(u.slug)}
                        className={`p-1.5 rounded transition-colors ${
                          isCompared ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                        }`}
                        title="Add to compare"
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#25312D] group-hover:text-[#A8764F] transition-colors mb-2">
                    {u.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
                    {u.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs text-stone-700 font-mono text-center">
                    <div>
                      <span className="text-stone-400 block text-[10px]">{isAr ? 'المساحة' : 'Area'}</span>
                      <span className="font-bold">{u.area_m2} m²</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{isAr ? 'الغرف' : 'Beds'}</span>
                      <span className="font-bold">{u.bedrooms}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{isAr ? 'الحمامات' : 'Baths'}</span>
                      <span className="font-bold">{u.bathrooms}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-mono">{isAr ? 'السعر النقدي' : 'Base Price'}</span>
                      <span className="text-base font-black text-[#A8764F] font-mono">{priceEgp} EGP</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/${locale}/preview/real-estate/properties/${u.slug}`}
                    className="text-[#25312D] hover:text-[#A8764F] flex items-center gap-1"
                  >
                    <span>{isAr ? 'تفاصيل الوحدة' : 'Inspect Unit'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/preview/real-estate/viewing?unit=${u.slug}`}
                    className="text-[#A8764F] hover:underline text-[11px]"
                  >
                    {isAr ? 'طلب معاينة' : 'Request Viewing'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

