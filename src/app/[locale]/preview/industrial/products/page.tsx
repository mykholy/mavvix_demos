import { getCatalogItems } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { IndustrialCatalogClient } from './IndustrialCatalogClient';

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; grade?: string; search?: string }>;
}

export default async function IndustrialProductsPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale } = params;
  const initialProducts = getCatalogItems('industrial', locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
          ENGINEERING SKU CATALOG // 24 STANDARDIZED PROFILES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {locale === 'ar' ? 'دليل المنتجات والمواصفات الصناعية' : 'Industrial Products & Technical SKUs'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'تصفح مواصفات قطاعات الصلب والمثبتات والأنابيب؛ ابحث بكود الـ SKU أو درجة المعدن، وأضف البنود مباشرة لسلة طلب عروض الأسعار (RFQ).'
            : 'Explore standard structural profiles, fasteners, and heavy-duty pipe assemblies. Search by SKU, filter by alloy grade, and add items directly to your RFQ.'}
        </p>
      </div>

      <IndustrialCatalogClient
        products={initialProducts}
        locale={locale}
        initialCategory={searchParams.category}
        initialGrade={searchParams.grade}
      />
    </div>
  );
}

