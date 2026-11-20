'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LocalizedCatalogItem } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  PackageCheck,
  Trash2,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Factory,
  Globe
} from 'lucide-react';

interface RfqLine {
  id: string;
  sku: string;
  title: string;
  quantity: number;
  minQty: number;
  packMultiple: number;
  unit: string;
}

interface Props {
  allProducts: LocalizedCatalogItem[];
  locale: Locale;
  initialSku?: string;
}

export function RfqBasketClient({ allProducts, locale, initialSku }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Initialize lines with initialSku if provided, or default to first 2 products
  const defaultProduct1 = initialSku
    ? allProducts.find((p) => p.sku === initialSku) || allProducts[0]
    : allProducts[0];
  const defaultProduct2 = allProducts.find((p) => p.sku !== defaultProduct1?.sku) || allProducts[1];

  const [lines, setLines] = useState<RfqLine[]>([
    {
      id: 'line_1',
      sku: defaultProduct1?.sku || 'FERRO-304-40',
      title: defaultProduct1?.title || 'Steel Profile',
      quantity: 500,
      minQty: 100,
      packMultiple: 50,
      unit: 'meters',
    },
    ...(defaultProduct2
      ? [
          {
            id: 'line_2',
            sku: defaultProduct2.sku,
            title: defaultProduct2.title,
            quantity: 250,
            minQty: 100,
            packMultiple: 50,
            unit: 'pcs',
          },
        ]
      : []),
  ]);

  const [packaging, setPackaging] = useState('export_crates');
  const [destination, setDestination] = useState('gcc_region');
  const [buyerCompany, setBuyerCompany] = useState('Al-Mashriq Industrial Trading');
  const [buyerEmail, setBuyerEmail] = useState('procurement@almashriq.demo');
  const [buyerNotes, setBuyerNotes] = useState('Requires EN 10204 3.1 inspection certificate and moisture barrier.');

  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; refNumber: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateQuantity(id: string, qty: number) {
    setLines(
      lines.map((l) => (l.id === id ? { ...l, quantity: qty } : l))
    );
  }

  function removeLine(id: string) {
    if (lines.length > 1) {
      setLines(lines.filter((l) => l.id !== id));
    } else {
      setError(isAr ? 'يجب أن تحتوي سلة التسعير على بند واحد على الأقل' : 'RFQ basket must contain at least one line item');
    }
  }

  function addProductToBasket(sku: string) {
    const prod = allProducts.find((p) => p.sku === sku);
    if (!prod) return;

    if (lines.some((l) => l.sku === sku)) {
      setError(isAr ? 'هذا المنتج مضاف بالفعل في سلة التسعير' : 'This SKU is already in your RFQ basket');
      return;
    }

    const newLine: RfqLine = {
      id: 'line_' + Date.now(),
      sku: prod.sku,
      title: prod.title,
      quantity: 200,
      minQty: 100,
      packMultiple: 50,
      unit: 'pcs',
    };
    setLines([...lines, newLine]);
    setError(null);
  }

  async function handleRfqSubmit() {
    setError(null);

    // Validate MOQ for each line (Journey 3 tested invariant)
    for (const l of lines) {
      if (l.quantity < l.minQty) {
        setError(
          isAr
            ? `الكمية المحددة للبند ${l.sku} (${l.quantity}) أقل من الحد الأدنى للطلب (MOQ = ${l.minQty})`
            : `Quantity for ${l.sku} (${l.quantity}) is below the Minimum Order Quantity (MOQ = ${l.minQty})`
        );
        return;
      }
      if (l.quantity % l.packMultiple !== 0) {
        setError(
          isAr
            ? `الكمية للبند ${l.sku} يجب أن تكون من مضاعفات حزمة التعبئة (${l.packMultiple})`
            : `Quantity for ${l.sku} must be in multiples of the packing unit (${l.packMultiple})`
        );
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload = {
        buyerCompany,
        buyerEmail,
        packaging,
        destination,
        buyerNotes,
        lineCount: lines.length,
      };

      const res = await fetch('/api/demo/industrial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'industrial_rfq',
          payload,
          lines: lines.map((l) => ({
            source_type: 'catalog_item',
            source_id: l.sku,
            quantity: l.quantity,
            snapshot: { sku: l.sku, title: l.title, unit: l.unit },
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'RFQ submission failed');
      }

      setReceipt({ id: data.submissionId, refNumber: data.refNumber });
    } catch (err: any) {
      setError(err.message || 'Error recording RFQ submission');
    } finally {
      setSubmitting(false);
    }
  }

  // Receipt View (Journey 1 Outcome)
  if (receipt) {
    return (
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 sm:p-12 shadow-xl space-y-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                {isAr ? 'تم تسجيل طلب التسعير بنجاح' : 'Simulated RFQ Confirmed'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#12243C]">
                {isAr ? 'إيصال تسعير صناعي تجريبي (Demo Receipt)' : 'Simulated Commercial RFQ Receipt'}
              </h2>
            </div>
          </div>

          <div className="text-start sm:text-end font-mono">
            <span className="text-[11px] text-stone-400 block uppercase">{isAr ? 'كود المرجع' : 'RFQ Reference'}</span>
            <span className="text-lg font-black text-amber-600">{receipt.refNumber}</span>
          </div>
        </div>

        {/* Demo Disclosure */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>{isAr ? 'إشعار التحقق التجريبي:' : 'Concept Demo Disclosure:'}</strong>{' '}
            {isAr
              ? 'تم تسجيل طلب التوريد في قاعدة بيانات SQLite بنجاح، ويمكن التحقق منه فورًا داخل لوحة التحكم (Admin Studio).'
              : 'This RFQ has been saved to the local SQLite database and is immediately visible in the Admin Studio queue.'}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="bg-[#F4F6F6] rounded-xl p-6 border border-stone-300 space-y-4 text-xs font-mono">
          <h3 className="font-bold text-[#12243C] uppercase tracking-wider text-xs border-b border-stone-300 pb-2">
            {isAr ? 'بنود التوريد المسجلة' : 'Recorded Order Lines'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right">
              <thead className="text-stone-400 border-b border-stone-300 text-[11px]">
                <tr>
                  <th className="py-2">SKU Code</th>
                  <th className="py-2">{isAr ? 'المواصفة' : 'Item Description'}</th>
                  <th className="py-2 text-right rtl:text-left">{isAr ? 'الكمية' : 'Quantity'}</th>
                  <th className="py-2 text-right rtl:text-left">{isAr ? 'الحالة' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                {lines.map((l) => (
                  <tr key={l.id}>
                    <td className="py-2 font-bold text-amber-700">{l.sku}</td>
                    <td className="py-2 font-sans">{l.title}</td>
                    <td className="py-2 text-right rtl:text-left font-bold">{l.quantity} {l.unit}</td>
                    <td className="py-2 text-right rtl:text-left text-emerald-600 font-bold">SCOPED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-stone-300 grid grid-cols-2 gap-4 text-stone-600 font-sans">
            <div>
              <span className="text-stone-400 block text-[11px] font-mono uppercase">{isAr ? 'جهة الشراء' : 'Purchasing Entity'}</span>
              <span className="font-bold text-[#12243C]">{buyerCompany}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] font-mono uppercase">{isAr ? 'وجهة الشحن' : 'Destination'}</span>
              <span className="font-bold text-[#12243C] capitalize">{destination.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
          <Link
            href="/admin/submissions"
            className="bg-[#12243C] hover:bg-black text-white px-5 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'التحقق في لوحة التحكم (Admin Studio)' : 'Verify in Admin Studio'}</span>
          </Link>

          <Link
            href={`/${locale}/preview/industrial/products`}
            className="text-amber-600 hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'العودة للدليل الفني' : 'Return to Catalog'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-10 space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Item Lines Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <h2 className="text-base font-bold text-[#12243C] uppercase tracking-wider font-mono">
            {isAr ? 'بنود طلب عروض الأسعار (RFQ Lines)' : 'Quotation Line Items'} ({lines.length})
          </h2>

          {/* Add SKU Selector */}
          <select
            onChange={(e) => {
              if (e.target.value) {
                addProductToBasket(e.target.value);
                e.target.value = '';
              }
            }}
            defaultValue=""
            className="bg-[#F4F6F6] border border-stone-300 text-xs px-3 py-1.5 rounded-lg text-[#12243C] font-mono focus:outline-none"
          >
            <option value="" disabled>
              + {isAr ? 'إضافة بند آخر للسلة' : 'Add another SKU'}
            </option>
            {allProducts.map((p) => (
              <option key={p.id} value={p.sku}>
                {p.sku} — {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Lines Table */}
        <div className="space-y-3">
          {lines.map((l) => (
            <div
              key={l.id}
              className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="font-mono text-amber-700 font-bold text-xs bg-amber-100 px-2 py-0.5 rounded">
                  {l.sku}
                </span>
                <h4 className="text-xs font-bold text-[#12243C]">{l.title}</h4>
                <p className="text-[11px] text-stone-500 font-mono">
                  MOQ: {l.minQty} {l.unit} • Pack multiple: {l.packMultiple}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-stone-500 font-mono">{isAr ? 'الكمية:' : 'Qty:'}</label>
                  <input
                    type="number"
                    step={l.packMultiple}
                    min={l.minQty}
                    value={l.quantity}
                    onChange={(e) => updateQuantity(l.id, parseInt(e.target.value, 10) || 0)}
                    className="w-28 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold text-[#12243C] focus:outline-none focus:ring-2 focus:ring-[#DE9E37]"
                  />
                  <span className="text-xs text-stone-500 font-mono">{l.unit}</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeLine(l.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                  title="Remove SKU line"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sourcing & Export Logistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-200">
        <div>
          <label className="block text-xs font-bold text-[#12243C] uppercase tracking-wider mb-2 font-mono">
            {isAr ? 'نمط التعبئة والتغليف المطلوب' : 'Industrial Packaging Specification'}
          </label>
          <select
            value={packaging}
            onChange={(e) => setPackaging(e.target.value)}
            className="w-full p-2.5 bg-[#F4F6F6] border border-stone-300 rounded-xl text-xs text-[#12243C] font-mono focus:outline-none focus:ring-2 focus:ring-[#DE9E37]"
          >
            <option value="export_crates">{isAr ? 'صناديق خشبية مبطنة للتصدير البحري' : 'Certified Wooden Export Crates'}</option>
            <option value="industrial_bundles">{isAr ? 'حزم معدنية مشدودة برباط صلب' : 'Steel Strapped Industrial Bundles'}</option>
            <option value="palletized">{isAr ? 'طبليات مغلفة بغشاء حراري' : 'Palletized Shrink-Wrapped'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12243C] uppercase tracking-wider mb-2 font-mono">
            {isAr ? 'منطقة الشحن / التصدير المستهدفة' : 'Target Destination Region'}
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2.5 bg-[#F4F6F6] border border-stone-300 rounded-xl text-xs text-[#12243C] font-mono focus:outline-none focus:ring-2 focus:ring-[#DE9E37]"
          >
            <option value="gcc_region">{isAr ? 'دول الخليج العربي (GCC Ports)' : 'GCC Ports'}</option>
            <option value="north_africa">{isAr ? 'شمال أفريقيا والمغرب العربي' : 'North Africa'}</option>
            <option value="europe">{isAr ? 'الموانئ الأوروبية (EU Standards)' : 'European Seaports'}</option>
            <option value="domestic">{isAr ? 'السوق المحلي والمناطق الحرة' : 'Domestic / Free Zones'}</option>
          </select>
        </div>
      </div>

      {/* Buyer Entity & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div>
          <label className="block text-xs font-bold text-[#12243C] uppercase tracking-wider mb-2">
            {isAr ? 'اسم الشركة أو المصنع' : 'Buyer Enterprise Name'}
          </label>
          <input
            type="text"
            value={buyerCompany}
            onChange={(e) => setBuyerCompany(e.target.value)}
            className="w-full p-2.5 bg-[#F4F6F6] border border-stone-300 rounded-xl text-xs font-bold text-[#12243C] focus:outline-none focus:ring-2 focus:ring-[#DE9E37]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12243C] uppercase tracking-wider mb-2">
            {isAr ? 'بريد المشتريات التجاري' : 'Procurement Contact Email'}
          </label>
          <input
            type="email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className="w-full p-2.5 bg-[#F4F6F6] border border-stone-300 rounded-xl text-xs font-bold text-[#12243C] focus:outline-none focus:ring-2 focus:ring-[#DE9E37]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
        <Link
          href={`/${locale}/preview/industrial/products`}
          className="text-xs text-stone-500 hover:text-[#12243C] font-mono"
        >
          ← {isAr ? 'متابعة تصفح الدليل الفني' : 'Continue Browsing Catalog'}
        </Link>

        <button
          type="button"
          disabled={submitting}
          onClick={handleRfqSubmit}
          className="bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 font-black text-xs px-8 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
        >
          <PackageCheck className="w-4 h-4" />
          <span>{submitting ? (isAr ? 'جاري التسجيل في SQLite...' : 'Persisting in SQLite...') : (isAr ? 'تأكيد وحفظ طلب الـ RFQ' : 'Submit Multi-line RFQ')}</span>
          <Arrow className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

