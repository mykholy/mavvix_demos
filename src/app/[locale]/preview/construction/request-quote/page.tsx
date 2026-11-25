import type { Locale } from '@/lib/i18n/config';
import { TenderScopeWizard } from './TenderScopeWizard';

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ ref?: string; service?: string; area?: string }>;
}

export default async function ConstructionRequestQuotePage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale } = params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center space-y-2">
        <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block">
          INTERACTIVE TENDER SCOPE BUILDER // DEMO WORKFLOW
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight">
          {locale === 'ar' ? 'معالج تسعير نطاق المقاولات والمناقصات' : 'Tender Scoping & BOQ Estimation Wizard'}
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {locale === 'ar'
            ? 'حدد معايير مشروعك والخدمات المطلوبة والمساحة؛ يتم تسجيل بيانات الطلب تجريبيًا في قاعدة بيانات SQLite مع إصدار إيصال مرجعي فوري.'
            : 'Configure your project parameters and required scopes. Submissions are persisted to local SQLite with immediate simulated receipt generation.'}
        </p>
      </div>

      <TenderScopeWizard
        locale={locale}
        initialRef={searchParams.ref}
        initialService={searchParams.service}
        initialArea={searchParams.area}
      />
    </div>
  );
}

