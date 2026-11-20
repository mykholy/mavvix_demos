import { getCatalogItems } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { RfqBasketClient } from './RfqBasketClient';

interface Props {
  params: { locale: Locale };
  searchParams: { sku?: string };
}

export default function IndustrialRfqPage({ params, searchParams }: Props) {
  const { locale } = params;
  const allProducts = getCatalogItems('industrial', locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center space-y-2">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">
          COMMERCIAL PROCUREMENT // MULTI-LINE RFQ BASKET
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {locale === 'ar' ? 'سلة طلب عروض الأسعار والتوريد (RFQ)' : 'Request for Quotation (RFQ) Basket'}
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {locale === 'ar'
            ? 'قم بإعداد قائمة طلبات التوريد متعددة البنود، وحدد متطلبات التعبئة ووجهة التصدير؛ يتم حفظ الطلب تجريبيًا في قاعدة بيانات SQLite.'
            : 'Formulate multi-item commercial supply orders with pack multiple and MOQ validation, stored in local SQLite.'}
        </p>
      </div>

      <RfqBasketClient
        allProducts={allProducts}
        locale={locale}
        initialSku={searchParams.sku}
      />
    </div>
  );
}

