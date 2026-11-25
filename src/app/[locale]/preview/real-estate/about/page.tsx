import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Building,
  Home,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function RealEstateAboutPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
          EDITORIAL PUBLISHING & PROPERTY CURATION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {isAr ? 'عن ميريديان للتطوير والاستثمار العقاري' : 'About Meridian Residences & Developments'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'فلسفتنا ترتكز على الشفافية السعرية والتصميم العمراني المتوازن؛ نوفر بيانات معمارية ومخططات واضحة لكل وحدة دون مبالغات تسويقية.'
            : 'Committed to architectural clarity, accurate unit data, and objective layout comparison for residential buyers.'}
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] text-[#A8764F] flex items-center justify-center font-bold">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#25312D] font-serif">
            {isAr ? 'تدقيق المخططات الصافية' : 'Verified Net Usable Space'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'توضيح نسب التحميل والمساحات الفعلية لكل غرفة وشرفة وممر لتمكين المشتري من تقييم الفراغات بدقة.'
              : 'Explicit disclosure of building loading ratios and room-by-room dimensions to evaluate genuine living comfort.'}
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] text-[#A8764F] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#25312D] font-serif">
            {isAr ? 'شفافية خطط السداد' : 'Transparent Installments'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'حسابات واضحة للأقساط ومقدمات الحجز دون وعود عوائد استثمارية خيالية غير مضمونة.'
              : 'Deterministic installment breakdowns without speculative ROI guarantees or misleading yield figures.'}
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] text-[#A8764F] flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#25312D] font-serif">
            {isAr ? 'المعاينة الميدانية التوضيحية' : 'Curated Private Tours'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'إتاحة طلب معاينات خاصة أو جولات فيديو مباشرة لمعاينة الموقع وتشطيبات الوحدة قبل اتخاذ القرار.'
              : 'Providing structured in-person and live video tour scheduling for shortlisted residential units.'}
          </p>
        </div>
      </div>

      {/* Concept Disclosure */}
      <div className="p-6 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-600 text-center leading-relaxed">
        <strong>{isAr ? 'إشعار الشفافية التوضيحية:' : 'Concept Integrity Disclosure:'}</strong>{' '}
        {isAr
          ? 'شركة ميريديان العقارية نموذج أعمال تجريبي مصمم لعرض إمكانيات منصة Mavvix للحلول الرقمية للشركات العقارية. كافة المشروعات والوحدات والأسعار تجريبية وافتراضية.'
          : 'Meridian Residences is a concept demonstration website showcasing Mavvix digital solutions for property developers. All community and unit records are synthetic.'}
      </div>
    </div>
  );
}

