import { getPropertyUnits } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { RealEstateSavedClient } from './RealEstateSavedClient';

interface Props {
  params: { locale: Locale };
}

export default function RealEstateSavedPage({ params }: Props) {
  const { locale } = params;
  const allUnits = getPropertyUnits(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
          PERSONAL SHORTLIST // SAVED PROPERTIES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {locale === 'ar' ? 'الوحدات السكنية المحفوظة في قائمتك' : 'Your Shortlisted Residences'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'راجع الوحدات التي قمت بتمييزها؛ قارن بين ميزانياتها أو احجز موعدًا موحدًا لمعاينتها.'
            : 'Review properties you have earmarked for deeper review, compare them, or schedule viewing appointments.'}
        </p>
      </div>

      <RealEstateSavedClient allUnits={allUnits} locale={locale} />
    </div>
  );
}

