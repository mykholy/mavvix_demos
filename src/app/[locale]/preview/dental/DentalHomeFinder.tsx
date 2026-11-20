'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Search, Sparkles, Shield, Heart, Smile, ArrowRight, ArrowLeft } from 'lucide-react';
import { LocalizedDentalService } from '@/lib/db/repositories';

interface Props {
  locale: Locale;
  services: LocalizedDentalService[];
}

export default function DentalHomeFinder({ locale, services }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const concerns = [
    { id: 'all', label: isAr ? 'جميع المجالات' : 'All Categories', icon: Sparkles },
    { id: 'prevention', label: isAr ? 'الفحص والتنظيف الوقائي' : 'Preventative & Hygiene', icon: Shield },
    { id: 'restorative', label: isAr ? 'إصلاح وترميم الأسنان' : 'Restorative & Repair', icon: Heart },
    { id: 'pediatric', label: isAr ? 'رعاية أسنان الأطفال' : 'Pediatric & Kids', icon: Smile },
    { id: 'consultation', label: isAr ? 'الاستشارات التخصصية' : 'Specialist Consultations', icon: Sparkles },
  ];

  const [activeConcern, setActiveConcern] = useState('all');

  const filteredServices = activeConcern === 'all'
    ? services.slice(0, 6)
    : services.filter(s => s.category.toLowerCase().includes(activeConcern) || activeConcern.includes(s.category.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
          {isAr ? 'مستكشف الخدمات الإرشادي' : 'Care Navigator'}
        </span>
        <h3 className="text-2xl font-serif font-bold text-[#193A39] mt-3">
          {isAr ? 'ما الذي تود الاطمئنان عليه اليوم؟' : 'What type of care are you looking for?'}
        </h3>
        <p className="text-sm text-[#557874] mt-2">
          {isAr
            ? 'حدد فئة الرعاية لتصفح الإجراءات والاستشارات المتاحة دون أي افتراضات تشخيصية مسبقة.'
            : 'Select an area of focus to explore available consultations and care options in plain language.'}
        </p>
      </div>

      {/* Concern Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {concerns.map(c => {
          const Icon = c.icon;
          const isActive = activeConcern === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveConcern(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#193A39] text-[#EDF5F2] shadow-sm'
                  : 'bg-[#EDF5F2]/70 text-[#2C5251] hover:bg-[#EDF5F2] hover:text-[#193A39]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map(s => (
          <div
            key={s.id}
            className="group p-5 rounded-xl border border-[#E0EBE7] bg-[#FBFDFD] hover:bg-white hover:border-[#7AC7A5] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-2 py-0.5 rounded-md">
                  {s.category}
                </span>
                <span className="text-xs text-[#557874]">
                  {isAr ? 'استشارة استرشادية' : 'Consultation'}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#193A39] group-hover:text-[#2C5251] transition-colors mb-2">
                {s.title}
              </h4>
              <p className="text-xs text-[#557874] line-clamp-3 leading-relaxed mb-4">
                {s.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAEFEF] flex items-center justify-between">
              <Link
                href={`/${locale}/preview/dental/services/${s.slug}`}
                className="text-xs font-semibold text-[#193A39] group-hover:text-[#2C5251] inline-flex items-center gap-1.5"
              >
                <span>{isAr ? 'تفاصيل الخدمة' : 'Service Dossier'}</span>
                <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={`/${locale}/preview/dental/request-appointment?service=${s.slug}`}
                className="text-xs font-medium text-[#2C5251] hover:underline"
              >
                {isAr ? 'طلب موعد' : 'Request'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href={`/${locale}/preview/dental/services`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#193A39] hover:text-[#2C5251] underline underline-offset-4"
        >
          <span>{isAr ? 'استعراض كافة الخدمات والتخصصات (10 خدمات)' : 'Browse all clinical treatments & consultations (10)'}</span>
          <Arrow className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

