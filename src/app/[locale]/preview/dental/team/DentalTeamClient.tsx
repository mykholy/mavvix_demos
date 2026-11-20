'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { LocalizedDentalPractitioner } from '@/lib/db/repositories';
import { ArrowRight, ArrowLeft, Calendar, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  locale: Locale;
  practitioners: LocalizedDentalPractitioner[];
}

export default function DentalTeamClient({ locale, practitioners }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeSpecialty, setActiveSpecialty] = useState<string>('all');

  const specialties = [
    { id: 'all', label: isAr ? 'جميع الأطباء' : 'All Specialists' },
    { id: 'general', label: isAr ? 'طب الأسنان العام' : 'General & Preventive' },
    { id: 'restorative', label: isAr ? 'العلاج التحفظي والترميم' : 'Restorative Care' },
    { id: 'pediatric', label: isAr ? 'طب أسنان الأطفال' : 'Pediatric Dentistry' },
    { id: 'orthodontics', label: isAr ? 'تقويم الأسنان' : 'Orthodontics' },
    { id: 'periodontics', label: isAr ? 'علاج اللثة' : 'Periodontics' },
  ];

  const filtered = useMemo(() => {
    if (activeSpecialty === 'all') return practitioners;
    return practitioners.filter(p => p.focus.toLowerCase().includes(activeSpecialty.toLowerCase()));
  }, [practitioners, activeSpecialty]);

  return (
    <div className="space-y-8">
      {/* Specialty Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white border border-[#E0EBE7] shadow-sm">
        {specialties.map(s => {
          const isActive = activeSpecialty === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSpecialty(s.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#193A39] text-[#EDF5F2] shadow-sm'
                  : 'bg-[#EDF5F2]/70 text-[#2C5251] hover:bg-[#EDF5F2]'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Specialists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-[#E0EBE7] p-6 hover:shadow-md hover:border-[#7AC7A5] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EDF5F2] to-[#D5E3DE] flex items-center justify-center font-serif text-2xl font-bold text-[#193A39] border border-[#C2D6CF]">
                  {doc.name.slice(0, 2)}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-2.5 py-1 rounded-md">
                  {doc.focus}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#193A39] mb-1">
                {doc.name}
              </h3>
              <p className="text-xs text-[#557874] leading-relaxed mb-4">
                {doc.bio}
              </p>

              {/* Consultation Days */}
              {doc.details?.consultation_days && (
                <div className="text-[11px] text-[#466662] bg-[#F7FAF9] p-2.5 rounded-lg border border-[#E8F0ED] mb-4">
                  <span className="font-semibold text-[#193A39]">
                    {isAr ? 'أيام الاستشارات المتاحة: ' : 'Consultation days: '}
                  </span>
                  <span>{doc.details.consultation_days.join(' • ')}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#EAEFEF] flex items-center justify-between">
              <Link
                href={`/${locale}/preview/dental/team/${doc.slug}`}
                className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1"
              >
                <span>{isAr ? 'الملف الكامل' : 'Full Profile'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/${locale}/preview/dental/request-appointment?doctor=${doc.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#193A39] hover:bg-[#2C5251] text-white text-xs font-medium transition-colors"
              >
                <Calendar className="w-3 h-3 text-[#7AC7A5]" />
                <span>{isAr ? 'طلب موعد' : 'Request'}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

