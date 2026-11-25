import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantBranches } from '@/lib/db/repositories';

export default async function RestaurantLocationsPage(
  props: {
    params: Promise<{ locale: Locale }>;
  }
) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const branches = getRestaurantBranches(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#321F18]/10 pb-8 space-y-3 text-start">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'أماكن الضيافة التوضيحية' : 'Concept Dining Locations'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {isAr ? 'فروع سفرة زعفران وساعات العمل' : 'Our Pavilions & Operating Hours'}
        </h1>
        <p className="text-sm text-[#321F18]/70 max-w-2xl leading-relaxed">
          {isAr
            ? 'ثلاثة فروع بطابع تراثي هادئ في القاهرة. لكل فرع أجوائه الخاصة من الفناء المشجر الهادئ في الزمالك، إلى إطلالة النيل في المعادي، وأقواس وسط البلد التاريخية.'
            : 'Three distinct heritage settings across Cairo: an unhurried shaded botanical courtyard in Zamalek, a panoramic Nile terrace in Maadi, and soaring 1920s arches in Downtown.'}
        </p>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {branches.map(branch => (
          <div
            key={branch.id}
            className="rounded-3xl bg-white border border-[#321F18]/15 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
          >
            {/* Header visual banner */}
            <div className="h-4 bg-[#BA5C34]" />

            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between text-start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FAF3E6] border border-[#321F18]/10 text-xs font-bold text-[#BA5C34] uppercase tracking-wider">
                    {branch.district}
                  </span>
                  <span className="text-xs text-[#8B8B52] font-semibold">
                    {branch.capacityTables} {isAr ? 'طاولة' : 'dining tables'}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#321F18]">
                  {branch.name}
                </h2>

                <p className="text-xs text-[#321F18]/70 leading-relaxed">
                  {branch.address}
                </p>

                {/* Operating Windows */}
                <div className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#321F18]/50 uppercase tracking-wider block">
                      {isAr ? 'ساعات العمل الرسمية:' : 'Regular Operating Hours:'}
                    </span>
                    <span className="font-semibold text-[#321F18] block">{branch.hours}</span>
                  </div>
                  <div className="pt-2 border-t border-[#321F18]/10">
                    <span className="text-[10px] text-[#8B8B52] block font-medium">
                      ⚠️ {branch.fridayNote}
                    </span>
                  </div>
                </div>

                {/* Seating Style & Amenities */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
                    {isAr ? 'طبيعة الجلسات والمرافق:' : 'Seating & Pavilion Amenities:'}
                  </span>
                  <p className="text-xs text-[#321F18]/80 italic">
                    {branch.seating}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {branch.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-[#FAF3E6]/80 text-[#321F18] font-medium"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#321F18]/10 flex items-center justify-between gap-3">
                <Link
                  href={`/${locale}/preview/restaurant/locations/${branch.slug}`}
                  className="text-xs font-semibold text-[#321F18] hover:text-[#BA5C34] transition-colors"
                >
                  {isAr ? 'تفاصيل الفرع' : 'Pavilion Dossier'}
                </Link>

                <Link
                  href={`/${locale}/preview/restaurant/reserve?branch=${branch.id}`}
                  className="px-4 py-2.5 rounded-xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] text-xs font-semibold transition-all shadow-sm"
                >
                  {isAr ? 'حجز طاولة بالفرع' : 'Reserve Table'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discrete Disclaimer Note */}
      <div className="p-6 rounded-2xl bg-[#321F18] text-[#FAF3E6] text-xs space-y-2 text-start">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA5C34]">
          {isAr ? 'تنويه شفافية العرض الرقمي' : 'Ethical Concept Disclaimer'}
        </span>
        <p className="text-white/80 leading-relaxed">
          {isAr
            ? 'عناوين الفروع وأرقام الهواتف المذكورة هي بيانات افتراضية لأغراض العرض التقني والتصميمي لعلامة تجارية مفهومية ابتكرتها مافيكس، ولا ترتبط بمحال تجارية قائمة على أرض الواقع.'
            : 'All branch addresses and phone numbers are fictional demonstration entities created by Mavvix to showcase responsive hospitality capabilities. No physical location is active.'}
        </p>
      </div>
    </div>
  );
}

