import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCatalogItemBySlug, getCatalogItems } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Factory,
  Cog,
  FileSpreadsheet,
  PackageCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Scale,
  Download,
  ShieldCheck,
  Printer
} from 'lucide-react';

interface Props {
  params: { locale: Locale; slug: string };
}

export default function IndustrialSkuDossierPage({ params }: Props) {
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const product = getCatalogItemBySlug('industrial', slug, locale);
  if (!product) {
    notFound();
  }

  const related = getCatalogItems('industrial', locale, product.item_type)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/industrial/products`} className="hover:text-amber-600">
            {isAr ? 'دليل المنتجات' : 'Products Catalog'}
          </Link>
          <span>/</span>
          <span className="text-[#12243C] font-bold">{product.sku}</span>
        </div>

        <Link
          href={`/${locale}/preview/industrial/products`}
          className="text-amber-600 hover:underline font-bold"
        >
          {isAr ? 'العودة للدليل' : 'Back to Catalog'}
        </Link>
      </div>

      {/* Main Dossier Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
            <span>SKU: {product.sku}</span>
            <span>•</span>
            <span className="capitalize">{product.item_type}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight leading-tight">
            {product.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Action / Procurement Box */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-100 font-mono">
            {isAr ? 'طلب التسعير والتوريد' : 'Procurement & RFQ'}
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-50">
              <span className="text-stone-400">Standard:</span>
              <span className="font-bold text-stone-900 font-mono">DIN EN 10025</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-50">
              <span className="text-stone-400">Packaging:</span>
              <span className="font-bold text-stone-900">Standard Industrial Bundle</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-50">
              <span className="text-stone-400">Minimum Order:</span>
              <span className="font-bold text-amber-600 font-mono">100 — 500 pcs</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-400">Lead Time:</span>
              <span className="font-bold text-stone-900">14 Business Days (Simulated)</span>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Link
              href={`/${locale}/preview/industrial/rfq?sku=${product.sku}`}
              className="w-full bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
            >
              <PackageCheck className="w-4 h-4" />
              <span>{isAr ? 'إضافة إلى سلة الـ RFQ' : 'Add to RFQ Basket'}</span>
            </Link>

            <Link
              href={`/${locale}/preview/industrial/compare?items=${product.sku}`}
              className="w-full bg-[#12243C] hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'مقارنة مع منتجات أخرى' : 'Compare Specification'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Technical Spec Dossier Matrix */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
            VERIFIED METALLURGICAL ATTRIBUTES
          </span>
          <h2 className="text-2xl font-black text-[#12243C]">
            {isAr ? 'صحيفة المواصفات الفنية والاختبارات القياسية' : 'Technical Datasheet & Compliance Metrics'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
            <span className="text-stone-400 block text-[11px] uppercase">MATERIAL COMPOSITION</span>
            <span className="text-base font-bold text-[#12243C]">{product.body?.material || 'Alloy Carbon Steel'}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
            <span className="text-stone-400 block text-[11px] uppercase">METALLURGICAL GRADE</span>
            <span className="text-base font-bold text-amber-600">{product.body?.grade || 'S275JR / AISI 304'}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
            <span className="text-stone-400 block text-[11px] uppercase">TENSILE YIELD RATIO</span>
            <span className="text-base font-bold text-[#12243C]">ReH ≥ 275 MPa / Rm 430 MPa</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
            <span className="text-stone-400 block text-[11px] uppercase">SURFACE PASSIVATION</span>
            <span className="text-base font-bold text-[#12243C]">Hot-Dip Galvanized / Passivated</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
            <span className="text-stone-400 block text-[11px] uppercase">IMPACT TEST RESISTANCE</span>
            <span className="text-base font-bold text-[#12243C]">27 Joules at 20°C (Charpy V)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
            <span className="text-stone-400 block text-[11px] uppercase">MILL CERTIFICATION</span>
            <span className="text-base font-bold text-emerald-600">EN 10204 Type 3.1</span>
          </div>
        </div>

        {/* Industrial Use-Cases & Applications */}
        <div className="pt-6 border-t border-stone-100 space-y-4">
          <h3 className="text-sm font-bold text-[#12243C] uppercase tracking-wider font-mono">
            {isAr ? 'التطبيقات الصناعية الموصى بها:' : 'Certified Industrial Applications:'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {product.body?.applications?.map((app: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium text-stone-800">{app}</span>
              </div>
            )) || (
              <div className="text-stone-500">Structural assemblies, high-load machinery, export logistics.</div>
            )}
          </div>
        </div>
      </div>

      {/* Related SKUs */}
      {related.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#12243C]">
            {isAr ? 'منتجات مماثلة في نفس عائلة التصنيع' : 'Related SKUs in This Category'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/${locale}/preview/industrial/products/${r.slug}`}
                className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-500 transition-all group"
              >
                <span className="font-mono text-amber-700 font-bold text-xs block mb-1">
                  {r.sku}
                </span>
                <h4 className="text-sm font-bold text-[#12243C] group-hover:text-amber-600 transition-colors mb-2">
                  {r.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2">
                  {r.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

