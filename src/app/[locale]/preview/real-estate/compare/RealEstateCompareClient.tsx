'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { LocalizedPropertyUnit } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Scale,
  X,
  Calendar,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Building,
  Ruler,
  Bed,
  Bath
} from 'lucide-react';

interface Props {
  allUnits: LocalizedPropertyUnit[];
  locale: Locale;
  initialSlugs: string[];
}

export function RealEstateCompareClient({ allUnits, locale, initialSlugs }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialSlugs.length > 0 ? initialSlugs : [allUnits[0]?.slug, allUnits[1]?.slug].filter(Boolean)
  );

  const comparedUnits = useMemo(() => {
    return selectedSlugs
      .map((slug) => allUnits.find((u) => u.slug === slug))
      .filter((u): u is LocalizedPropertyUnit => Boolean(u));
  }, [allUnits, selectedSlugs]);

  function removeSlug(slug: string) {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  }

  function addSlug(slug: string) {
    if (selectedSlugs.length < 3 && !selectedSlugs.includes(slug)) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  }

  return (
    <div className="space-y-6">
      {/* Comparator Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-stone-200 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Scale className="w-4 h-4 text-[#A8764F]" />
          <span>
            {isAr ? 'الوحدات المقارنة:' : 'Comparing:'} <strong>{comparedUnits.length} / 3</strong>
          </span>
        </div>

        {selectedSlugs.length < 3 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">{isAr ? 'أضف وحدة للمقارنة:' : 'Add Unit:'}</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addSlug(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-[#F5F0E6] border border-stone-300 text-xs px-3 py-1.5 rounded-lg text-[#25312D] font-mono focus:outline-none"
            >
              <option value="" disabled>
                {isAr ? '-- اختر وحدة سكنية --' : '-- Select property --'}
              </option>
              {allUnits
                .filter((u) => !selectedSlugs.includes(u.slug))
                .map((u) => (
                  <option key={u.id} value={u.slug}>
                    {u.title} ({u.area_m2} m² • {(u.price_cents / 100).toLocaleString()} EGP)
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {comparedUnits.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-[#25312D]">
            {isAr ? 'لم يتم تحديد أي وحدات للمقارنة' : 'No Properties Selected for Comparison'}
          </h3>
          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="inline-flex items-center gap-2 bg-[#25312D] text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            <span>{isAr ? 'تصفح دليل الوحدات' : 'Browse Properties'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead>
                <tr className="bg-[#25312D] text-white font-mono">
                  <th className="py-4 px-6 w-1/4 uppercase tracking-wider text-[11px]">Property Specification</th>
                  {comparedUnits.map((u) => (
                    <th key={u.id} className="py-4 px-6 w-1/4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-amber-300 font-bold text-sm block font-serif">{u.title}</span>
                          <span className="text-stone-300 font-mono text-xs">{u.area_m2} m² • {u.unit_type}</span>
                        </div>
                        <button
                          onClick={() => removeSlug(u.slug)}
                          className="p-1 text-stone-400 hover:text-white"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => (
                    <th key={i} className="py-4 px-6 w-1/4 bg-stone-900/40 text-stone-500 font-mono text-center">
                      [ Empty Comparison Slot ]
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-200 text-stone-800 font-mono">
                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'السعر الإجمالي' : 'Total Price'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-3 px-6 font-bold text-[#A8764F]">
                      {(u.price_cents / 100).toLocaleString()} EGP
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'سعر المتر المربع' : 'Price / m²'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-3 px-6 font-bold">
                      {Math.round((u.price_cents / 100) / u.area_m2).toLocaleString()} EGP / m²
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'المساحة الصافية' : 'Gross Area'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-3 px-6">{u.area_m2} m²</td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'غرف النوم' : 'Bedrooms'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-3 px-6">{u.bedrooms} {isAr ? 'غرف' : 'Beds'}</td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'الحمامات' : 'Bathrooms'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-3 px-6">{u.bathrooms} {isAr ? 'حمامات' : 'Baths'}</td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'مقدم 10% تقديري' : 'Estimated 10% Down'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-3 px-6 font-bold text-stone-700">
                      {((u.price_cents / 100) * 0.1).toLocaleString()} EGP
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                {/* Viewing Action Row */}
                <tr>
                  <td className="py-4 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'حجز معاينة' : 'Schedule Viewing'}</td>
                  {comparedUnits.map((u) => (
                    <td key={u.id} className="py-4 px-6">
                      <Link
                        href={`/${locale}/preview/real-estate/viewing?unit=${u.slug}`}
                        className="inline-flex items-center gap-1.5 bg-[#A8764F] hover:bg-[#8e613e] text-white px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-sm font-sans"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{isAr ? 'طلب معاينة' : 'Request Viewing'}</span>
                      </Link>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedUnits.length }).map((_, i) => <td key={i} className="py-4 px-6" />)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

