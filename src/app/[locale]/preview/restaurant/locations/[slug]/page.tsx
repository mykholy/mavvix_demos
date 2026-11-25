import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantBranchBySlug, getRestaurantTimeSlots } from '@/lib/db/repositories';

export default async function RestaurantBranchDetailPage(
  props: {
    params: Promise<{ locale: Locale; slug: string }>;
  }
) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const branch = getRestaurantBranchBySlug(slug, locale);

  if (!branch) {
    notFound();
  }

  const branchSlots = getRestaurantTimeSlots(branch.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-start">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#321F18]/60">
        <Link href={`/${locale}/preview/restaurant`} className="hover:text-[#BA5C34]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/restaurant/locations`} className="hover:text-[#BA5C34]">
          {isAr ? 'الفروع والمواعيد' : 'Locations'}
        </Link>
        <span>/</span>
        <span className="text-[#321F18] font-semibold">{branch.name}</span>
      </nav>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-[#321F18]/15 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-3.5 py-1 rounded-full bg-[#BA5C34]/10 text-[#BA5C34] text-xs font-bold uppercase tracking-wider">
            {branch.district}
          </span>
          <span className="text-xs text-[#8B8B52] font-semibold">
            {branch.capacityTables} {isAr ? 'طاولة ضيافة' : 'total dining tables'}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {branch.name}
        </h1>

        <p className="text-sm sm:text-base text-[#321F18]/80 leading-relaxed max-w-3xl">
          {branch.address}
        </p>

        {/* Operating Hours Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 text-xs">
          <div>
            <span className="text-[10px] text-[#321F18]/50 uppercase tracking-wider block mb-1">
              {isAr ? 'مواعيد الاستقبال الرسمية:' : 'Regular Operating Window:'}
            </span>
            <p className="font-semibold text-sm text-[#321F18]">{branch.hours}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#BA5C34] uppercase tracking-wider block mb-1">
              {isAr ? 'ملاحظة يوم الجمعة المباركة:' : 'Special Friday Schedule:'}
            </span>
            <p className="font-medium text-[#8B8B52]">{branch.fridayNote}</p>
          </div>
        </div>

        {/* Atmosphere & Seating */}
        <div className="space-y-3 pt-4 border-t border-[#321F18]/10">
          <h2 className="font-serif text-xl font-bold text-[#321F18]">
            {isAr ? 'طبيعة الفراغ والأجواء المعمارية' : 'Spatial Atmosphere & Seating Styles'}
          </h2>
          <p className="text-xs sm:text-sm text-[#321F18]/80 leading-relaxed">
            {branch.seating}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {branch.features.map((feat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#FAF3E6] border border-[#321F18]/10 text-center text-xs font-semibold text-[#321F18]"
              >
                {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Sample Slots Availability Preview */}
        <div className="space-y-4 pt-6 border-t border-[#321F18]/10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#321F18]">
              {isAr ? 'نوافذ أوقات الحجز المقترحة' : 'Illustrative Seating Windows'}
            </h2>
            <span className="text-xs text-[#8B8B52]">
              {branchSlots.length} {isAr ? 'نوافذ وقت' : 'slots'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {branchSlots.map(slot => {
              const isAvailable = slot.status === 'available';
              return (
                <div
                  key={slot.id}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border flex items-center gap-2 ${
                    isAvailable
                      ? 'bg-white border-[#321F18]/20 text-[#321F18]'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-400 line-through'
                  }`}
                >
                  <span>{slot.starts_at}</span>
                  <span className={`text-[10px] ${isAvailable ? 'text-emerald-700' : 'text-zinc-400'}`}>
                    {isAvailable ? (isAr ? 'متاح' : 'Available') : (isAr ? 'محجوز' : 'Booked')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-[#321F18] text-[#FAF3E6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold">
              {isAr ? 'هل تود تجربة حجز طاولة في هذا الفرع؟' : 'Ready to Request a Table Here?'}
            </h3>
            <p className="text-xs text-white/70">
              {isAr
                ? 'اختر عدد الضيوف والموعد المفضل ثم انتظر تأكيد الجهة المسؤولة.'
                : 'Select your party size and preferred time. This request is not a confirmed reservation.'}
            </p>
          </div>

          <Link
            href={`/${locale}/preview/restaurant/reserve?branch=${branch.id}`}
            className="px-6 py-3.5 rounded-xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] text-xs font-semibold whitespace-nowrap shadow-md transition-colors"
          >
            {isAr ? 'طلب حجز في هذا الفرع ←' : 'Book Table at this Pavilion →'}
          </Link>
        </div>
      </div>
    </div>
  );
}

