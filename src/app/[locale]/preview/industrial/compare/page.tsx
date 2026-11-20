import { getCatalogItems } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { IndustrialCompareClient } from './IndustrialCompareClient';

interface Props {
  params: { locale: Locale };
  searchParams: { items?: string };
}

export default function IndustrialComparePage({ params, searchParams }: Props) {
  const { locale } = params;
  const allProducts = getCatalogItems('industrial', locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
          TECHNICAL COMPARATOR // UP TO 3 SKUS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {locale === 'ar' ? 'مقارنة المواصفات الهندسية ودرجات الصلب' : 'Multi-SKU Technical Spec Comparison'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'قارن بين درجات المعادن، نسب الشد، وحدات التعبئة، والحد الأدنى للطلب (MOQ) لتحديد المواصفة الأنسب لمشروعك.'
            : 'Side-by-side metallurgical and dimensional audit. Compare alloy properties, tolerances, and packaging constraints.'}
        </p>
      </div>

      <IndustrialCompareClient
        allProducts={allProducts}
        locale={locale}
        initialSkus={searchParams.items ? searchParams.items.split(',') : []}
      />
    </div>
  );
}

