import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPropertyUnitBySlug, getPropertyUnits } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Building,
  Home,
  Ruler,
  Bed,
  Bath,
  Calendar,
  Scale,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calculator,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function RealEstatePropertyDetailPage(props: Props) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const unit = getPropertyUnitBySlug(slug, locale);
  if (!unit) {
    notFound();
  }

  const priceEgp = unit.price_cents / 100;
  const downPayment = priceEgp * 0.1;
  const monthly7Years = Math.round((priceEgp * 0.9) / 84);

  const related = getPropertyUnits(locale, { type: unit.unit_type })
    .filter((u) => u.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/real-estate/properties`} className="hover:text-[#805333]">
            {isAr ? 'دليل العقارات' : 'Properties'}
          </Link>
          <span>/</span>
          <span className="text-[#25312D] font-bold">{unit.title}</span>
        </div>

        <Link
          href={`/${locale}/preview/real-estate/properties`}
          className="text-[#805333] hover:underline font-bold"
        >
          {isAr ? 'العودة للدليل' : 'Back to Listings'}
        </Link>
      </div>

      <figure className="space-y-2">
        <SectorPhoto sector="real-estate" secondary className="h-64 sm:h-[420px] w-full rounded-[2rem]" alt="Architectural interior editorial photograph" />
        <figcaption className="text-xs text-stone-500">{isAr ? 'صورة معمارية إلهامية، وليست صورة الوحدة المعروضة' : 'Architectural inspiration photography, not the listed residence'}</figcaption>
      </figure>
      {/* Main Header & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#805333]/10 text-[#805333] text-xs font-mono font-bold uppercase tracking-wider">
            <span>REF: {unit.slug.toUpperCase()}</span>
            <span>•</span>
            <span className="capitalize">{unit.unit_type}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif leading-tight">
            {unit.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {unit.summary}
          </p>
        </div>

        {/* Pricing & Viewing Card */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div>
            <span className="text-stone-400 block text-[11px] font-mono uppercase">{isAr ? 'السعر الإجمالي' : 'Total Price'}</span>
            <span className="text-2xl font-black text-[#805333] font-mono">{priceEgp.toLocaleString()} EGP</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs border-y border-stone-100 py-3 font-mono">
            <div>
              <span className="text-stone-400 block text-[10px]">{isAr ? 'المساحة' : 'Area'}</span>
              <span className="font-bold text-[#25312D]">{unit.area_m2} m²</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">{isAr ? 'سعر المتر' : 'Price / m²'}</span>
              <span className="font-bold text-[#25312D]">{Math.round(priceEgp / unit.area_m2).toLocaleString()} EGP</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">{isAr ? 'الغرف' : 'Bedrooms'}</span>
              <span className="font-bold text-[#25312D]">{unit.bedrooms} {isAr ? 'غرف' : 'Beds'}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">{isAr ? 'الحمامات' : 'Bathrooms'}</span>
              <span className="font-bold text-[#25312D]">{unit.bathrooms} {isAr ? 'حمامات' : 'Baths'}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href={`/${locale}/preview/real-estate/viewing?unit=${unit.slug}`}
              className="w-full bg-[#805333] hover:bg-[#8e613e] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'طلب موعد معاينة خاصة' : 'Request Private Viewing'}</span>
            </Link>

            <Link
              href={`/${locale}/preview/real-estate/compare?units=${unit.slug}`}
              className="w-full bg-[#25312D] hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{isAr ? 'مقارنة مع وحدات أخرى' : 'Compare Specification'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Installment Estimator (Signature Differentiator 03) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <Calculator className="w-5 h-5 text-[#805333]" />
          <div>
            <h3 className="text-base font-bold text-[#25312D]">
              {isAr ? 'حاسبة خطة السداد والأقساط التوضيحية' : 'Illustrative Payment & Installment Schedule'}
            </h3>
            <span className="text-[11px] text-stone-500 font-mono">
              {isAr ? 'حسابات تقديرية توضيحية وليست عرض تمويل بنكي ملزم' : 'Demonstrative calculation only, not formal banking advice'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
          <div className="p-4 bg-[#F5F0E6] rounded-xl border border-stone-300 space-y-1">
            <span className="text-stone-500 block text-[11px] uppercase">{isAr ? 'دفعة المقدم (10%)' : 'Downpayment (10%)'}</span>
            <span className="text-lg font-bold text-[#25312D]">{downPayment.toLocaleString()} EGP</span>
          </div>

          <div className="p-4 bg-[#F5F0E6] rounded-xl border border-stone-300 space-y-1">
            <span className="text-stone-500 block text-[11px] uppercase">{isAr ? 'القسط الشهري (7 سنوات)' : 'Monthly Installment (7 Yrs)'}</span>
            <span className="text-lg font-bold text-[#805333]">{monthly7Years.toLocaleString()} EGP / mo</span>
          </div>

          <div className="p-4 bg-[#F5F0E6] rounded-xl border border-stone-300 space-y-1">
            <span className="text-stone-500 block text-[11px] uppercase">{isAr ? 'دفعة الاستلام المتوقعة' : 'Handover Balloon'}</span>
            <span className="text-lg font-bold text-emerald-700">0% (Equal Installments)</span>
          </div>
        </div>
      </div>

      {/* Architectural Specs & Floorplan */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-[#25312D] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#805333]" />
          <span>{isAr ? 'مخطط الدور والمواصفات المعمارية' : 'Architectural Floorplan & Orientation'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">Finishing:</span>
            <span className="font-bold text-[#25312D]">Fully Finished Ultra-Lux</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">Floor Level:</span>
            <span className="font-bold text-[#25312D]">{unit.attributes?.floor || '3rd Floor Corner'}</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">View Orientation:</span>
            <span className="font-bold text-[#25312D]">Main Gardens & Water Features</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">Parking Slots:</span>
            <span className="font-bold text-[#25312D]">2 Underground Bays</span>
          </div>
        </div>
      </div>

      {/* Similar Units in Typology */}
      {related.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#25312D] font-serif">
            {isAr ? 'وحدات مماثلة في نفس الفئة' : 'Similar Residences in This Class'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/${locale}/preview/real-estate/properties/${r.slug}`}
                className="bg-white p-6 rounded-xl border border-stone-200 hover:border-[#805333] transition-all group"
              >
                <span className="font-mono text-stone-400 font-bold text-xs block mb-1">
                  {r.area_m2} m² • {r.bedrooms} Beds
                </span>
                <h4 className="text-sm font-bold text-[#25312D] group-hover:text-[#805333] transition-colors mb-2">
                  {r.title}
                </h4>
                <p className="text-xs font-mono font-bold text-[#805333]">
                  {(r.price_cents / 100).toLocaleString()} EGP
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

