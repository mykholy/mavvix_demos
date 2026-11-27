import { Suspense } from 'react';
import { getPropertyUnits } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { ViewingRequestWizard } from './ViewingRequestWizard';

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ unit?: string }>;
}

export default async function RealEstateViewingPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale } = params;
  const allUnits = getPropertyUnits(locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center space-y-2">
        <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block">
          PRIVATE APPOINTMENT INTAKE // DEMO WORKFLOW
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {locale === 'ar' ? 'طلب موعد معاينة خاصة للوحدة' : 'Request a Private Property Viewing'}
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {locale === 'ar'
            ? 'حدد الوحدة المفضلة والوقت المناسب؛ يتم تسجيل طلبك تجريبيًا في قاعدة بيانات SQLite مع إصدار إيصال طلب فوري.'
            : 'Select your preferred candidate unit and date preference. Submissions are persisted to local SQLite with simulated receipt confirmation.'}
        </p>
      </div>

      <Suspense fallback={<div className="min-h-80 animate-pulse rounded-2xl bg-[#F5F0E6]" />}><ViewingRequestWizard
        allUnits={allUnits}
        locale={locale}
        initialUnitSlug={searchParams.unit}
      /></Suspense>
    </div>
  );
}

