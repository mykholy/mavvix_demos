import { getPropertyUnits } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { RealEstateCompareClient } from './RealEstateCompareClient';

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ units?: string }>;
}

export default async function RealEstateComparePage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale } = params;
  const allUnits = getPropertyUnits(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
          RESIDENTIAL SPEC COMPARATOR // UP TO 3 PROPERTIES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {locale === 'ar' ? 'المقارنة الفنية بين الوحدات السكنية' : 'Side-by-Side Residential Comparison'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'قارن بدقة بين المساحات، أسعار المتر، خطط السداد، والمواصفات المعمارية لاتخاذ قرار شراء مدروس.'
            : 'Audit space utilization, per-square-meter valuations, and installment schedules across candidate homes.'}
        </p>
      </div>

      <RealEstateCompareClient
        allUnits={allUnits}
        locale={locale}
        initialSlugs={searchParams.units ? searchParams.units.split(',') : []}
      />
    </div>
  );
}

