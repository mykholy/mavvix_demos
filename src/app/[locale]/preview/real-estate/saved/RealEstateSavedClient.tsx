'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { LocalizedPropertyUnit } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Bookmark,
  Calendar,
  Scale,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Building,
  Ruler,
  AlertCircle
} from 'lucide-react';

interface Props {
  allUnits: LocalizedPropertyUnit[];
  locale: Locale;
}

export function RealEstateSavedClient({ allUnits, locale }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('meridian_saved_units');
      if (stored) {
        setSavedSlugs(JSON.parse(stored));
      } else {
        // Default to first unit so visitor sees an example
        setSavedSlugs([allUnits[0]?.slug].filter(Boolean));
      }
    } catch (e) {}
    setLoaded(true);
  }, [allUnits]);

  function removeSaved(slug: string) {
    const next = savedSlugs.filter((s) => s !== slug);
    setSavedSlugs(next);
    try {
      localStorage.setItem('meridian_saved_units', JSON.stringify(next));
    } catch (e) {}
  }

  const savedUnits = allUnits.filter((u) => savedSlugs.includes(u.slug));

  if (!loaded) return <div className="p-8 text-center text-xs text-stone-400">Loading shortlist...</div>;

  return (
    <div className="space-y-6">
      {savedUnits.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-16 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#25312D] font-serif">
            {isAr ? 'قائمة الوحدات المحفوظة فارغة حاليًا' : 'Your Shortlist is Currently Empty'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {isAr
              ? 'انقر على أيقونة الحفظ بجانب أي وحدة في دليل العقارات لحفظها في هذه القائمة والرجوع إليها لاحقًا.'
              : 'Click the bookmark icon on any property listing to save it to your personal shortlist.'}
          </p>
          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="inline-flex items-center gap-2 bg-[#25312D] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm"
          >
            <span>{isAr ? 'استكشف الوحدات المتاحة' : 'Explore Properties'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedUnits.map((u) => {
            const priceEgp = (u.price_cents / 100).toLocaleString();
            return (
              <div
                key={u.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-3 text-stone-400">
                    <span className="bg-stone-100 text-[#25312D] px-2 py-0.5 rounded font-bold uppercase text-[11px]">
                      {u.unit_type}
                    </span>
                    <button
                      onClick={() => removeSaved(u.slug)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-[#25312D] mb-2 font-serif">
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

