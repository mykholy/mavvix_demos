'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { LocalizedCatalogItem } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Scale,
  X,
  Plus,
  PackageCheck,
  Printer,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Props {
  allProducts: LocalizedCatalogItem[];
  locale: Locale;
  initialSkus: string[];
}

export function IndustrialCompareClient({ allProducts, locale, initialSkus }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Defaults to first 2 products if no initialSkus provided
  const [selectedSkus, setSelectedSkus] = useState<string[]>(
    initialSkus.length > 0 ? initialSkus : [allProducts[0]?.sku, allProducts[1]?.sku].filter(Boolean)
  );

  const comparedProducts = useMemo(() => {
    return selectedSkus
      .map((sku) => allProducts.find((p) => p.sku === sku))
      .filter((p): p is LocalizedCatalogItem => Boolean(p));
  }, [allProducts, selectedSkus]);

  function removeSku(sku: string) {
    setSelectedSkus(selectedSkus.filter((s) => s !== sku));
  }

  function addSku(sku: string) {
    if (selectedSkus.length < 3 && !selectedSkus.includes(sku)) {
      setSelectedSkus([...selectedSkus, sku]);
    }
  }

  return (
    <div className="space-y-6">
      {/* Comparator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-stone-200 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>
            {isAr ? 'المنتجات المختارة للمقارنة:' : 'Comparing:'} <strong>{comparedProducts.length} / 3</strong>
          </span>
        </div>

        {/* Add Dropdown if under 3 */}
        {selectedSkus.length < 3 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">{isAr ? 'أضف منتجًا:' : 'Add SKU:'}</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addSku(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-[#F4F6F6] border border-stone-300 text-xs px-3 py-1.5 rounded-lg text-[#12243C] font-mono focus:outline-none"
            >
              <option value="" disabled>
                {isAr ? '-- اختر كود SKU لإضافته --' : '-- Select SKU to add --'}
              </option>
              {allProducts
                .filter((p) => !selectedSkus.includes(p.sku))
                .map((p) => (
                  <option key={p.id} value={p.sku}>
                    {p.sku} — {p.title}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-[#12243C]">
            {isAr ? 'لم يتم تحديد أي منتجات للمقارنة' : 'No SKUs Selected for Comparison'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {isAr
              ? 'اختر منتجات من الدليل الفني أو أضف كود SKU من القائمة أعلاه للمقارنة.'
              : 'Add at least one SKU to compare metallurgical and dimensional attributes.'}
          </p>
          <Link
            href={`/${locale}/preview/industrial/products`}
            className="inline-flex items-center gap-2 bg-[#12243C] text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            <span>{isAr ? 'تصفح الدليل الفني' : 'Browse Catalog'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* Comparison Table Matrix */
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead>
                <tr className="bg-[#12243C] text-white font-mono">
                  <th className="py-4 px-6 w-1/4 uppercase tracking-wider text-[11px]">Specification Attribute</th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="py-4 px-6 w-1/4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-amber-400 font-bold text-sm block">{p.sku}</span>
                          <span className="text-stone-300 font-sans text-xs line-clamp-1">{p.title}</span>
                        </div>
                        <button
                          onClick={() => removeSku(p.sku)}
                          className="p-1 text-stone-400 hover:text-white"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                    <th key={i} className="py-4 px-6 w-1/4 bg-slate-900/40 text-stone-600 font-mono text-center">
                      [ Empty Slot ]
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-200 text-stone-800 font-mono">
                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'القطاع والتصنيف' : 'Classification'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6 capitalize">{p.item_type}</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'المعيار القياسي' : 'Standard'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6">DIN EN 10025</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'الدرجة المعدنية' : 'Material Grade'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6 font-bold text-amber-700">{p.body?.grade || 'S275JR / 304'}</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'قوة الشد (Rm)' : 'Tensile Strength (Rm)'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6">410 — 560 MPa</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'فئة التفاوت (Tolerance)' : 'Tolerance Class'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6">EN 10034 Cl. B</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'المعالجة السطحية' : 'Surface Finish'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6">Passivated Mill / Galv</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                <tr>
                  <td className="py-3 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'الحد الأدنى للطلب (MOQ)' : 'Minimum Order (MOQ)'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-3 px-6 font-bold text-[#12243C]">100 — 500 pcs</td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-3 px-6 text-stone-300">n/a</td>)}
                </tr>

                {/* Procurement Action Row */}
                <tr>
                  <td className="py-4 px-6 font-bold bg-stone-50 font-sans">{isAr ? 'طلب التسعير' : 'Procurement Action'}</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="py-4 px-6">
                      <Link
                        href={`/${locale}/preview/industrial/rfq?sku=${p.sku}`}
                        className="inline-flex items-center gap-1.5 bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-sm font-sans"
                      >
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>{isAr ? 'إضافة للـ RFQ' : 'Add to RFQ'}</span>
                      </Link>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => <td key={i} className="py-4 px-6" />)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

