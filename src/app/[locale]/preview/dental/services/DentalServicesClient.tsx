'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { LocalizedDentalService } from '@/lib/db/repositories';
import { Search, Sparkles, Shield, Heart, Smile, ArrowRight, ArrowLeft, AlertCircle, Calendar } from 'lucide-react';

interface Props {
  locale: Locale;
  services: LocalizedDentalService[];
}

export default function DentalServicesClient({ locale, services }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: isAr ? 'جميع الخدمات' : 'All Treatments' },
    { id: 'consultation', label: isAr ? 'استشارات وكشف' : 'Consultations' },
    { id: 'prevention', label: isAr ? 'عناية ووقاية' : 'Preventative Care' },
    { id: 'restorative', label: isAr ? 'ترميم وحشوات' : 'Restorative Care' },
    { id: 'pediatric', label: isAr ? 'أسنان الأطفال' : 'Pediatric' },
  ];

  const filtered = useMemo(() => {
    return services.filter(s => {
      const matchCat = activeCategory === 'all'
        ? true
        : s.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(s.category.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = query === ''
        ? true
        : s.title.toLowerCase().includes(query) || s.summary.toLowerCase().includes(query) || s.slug.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [services, activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E0EBE7] shadow-sm">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(c => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#193A39] text-[#EDF5F2] shadow-sm'
                    : 'bg-[#EDF5F2]/70 text-[#2C5251] hover:bg-[#EDF5F2]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#557874] absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث في أسماء الإجراءات...' : 'Search clinical treatments...'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs rounded-xl bg-[#F8FBFA] border border-[#D5E3DE] text-[#193A39] placeholder-[#88A39E] focus:outline-none focus:ring-2 focus:ring-[#193A39]/20 focus:border-[#193A39]"
          />
        </div>
      </div>

      {/* Non-diagnostic Banner */}
      <div className="p-4 rounded-xl bg-[#EDF5F2] border border-[#D5E3DE] text-[#2C5251] text-xs flex items-center gap-3">
        <AlertCircle className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
        <span>
          {isAr
            ? 'تنويه مهني: المعلومات الواردة في هذه الخدمات تعريفية بالخطوات السريرية ولا تغني عن الفحص الفردي المباشر لدى طبيب الأسنان.'
            : 'Clinical Notice: Descriptions outline typical care pathways for informational reference and do not replace personalized professional diagnosis.'}
        </span>
      </div>

      {/* Grid of Services */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E0EBE7] p-8">
          <p className="text-sm text-[#557874]">
            {isAr ? 'لم يتم العثور على خدمات مطابقة لمعايير البحث.' : 'No clinical services matched your current filters.'}
          </p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs font-semibold text-[#193A39] underline"
          >
            {isAr ? 'إعادة ضبط الفلاتر' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-[#E0EBE7] p-6 hover:shadow-md hover:border-[#7AC7A5] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-2.5 py-0.5 rounded-md">
                    {s.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#557874]">
                    {s.slug}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#193A39] mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-[#557874] line-clamp-3 leading-relaxed mb-4">
                  {s.summary}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#F0F5F3] text-[11px] text-[#466662]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7AC7A5]" />
                    <span>{isAr ? 'فحص سريري واستشارة مهدئة' : 'Clinical exam & calm consultation'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7AC7A5]" />
                    <span>{isAr ? 'مناقشة الخطة والبدائل مسبقاً' : 'Care plan reviewed before treatment'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#EAEFEF] flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/dental/services/${s.slug}`}
                  className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'ملف الخدمة' : 'Service Details'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/${locale}/preview/dental/request-appointment?service=${s.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#193A39] hover:bg-[#2C5251] text-white text-xs font-medium transition-colors"
                >
                  <Calendar className="w-3 h-3 text-[#7AC7A5]" />
                  <span>{isAr ? 'طلب موعد' : 'Request'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

