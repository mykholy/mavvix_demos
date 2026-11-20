import { getPropertyUnits } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { RealEstatePropertiesClient } from './RealEstatePropertiesClient';

interface Props {
  params: { locale: Locale };
  searchParams: { type?: string; maxPrice?: string; beds?: string };
}

export default function RealEstatePropertiesPage({ params, searchParams }: Props) {
  const { locale } = params;
  const initialUnits = getPropertyUnits(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
          RESIDENTIAL INVENTORY // 24 AUDITED UNITS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {locale === 'ar' ? 'دليل الوحدات والعقارات المتاحة' : 'Residential Properties & Unit Inventory'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'تصفح قائمة الـ 24 وحدة سكنية؛ قارن بين المساحات والأسعار ومخططات الأدوار، وحدد موعدًا لمعاينة وحدتك المفضلة.'
            : 'Explore 24 verified residential units. Filter across typologies, bedroom counts, and budget bands with side-by-side comparison.'}
        </p>
      </div>

      <RealEstatePropertiesClient
        units={initialUnits}
        locale={locale}
        initialType={searchParams.type}
        initialMaxPrice={searchParams.maxPrice}
      />
    </div>
  );
}

