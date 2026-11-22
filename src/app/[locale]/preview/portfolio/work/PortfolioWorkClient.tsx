'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getPortfolioPhoto } from '@/lib/media/sector-images';
import { LocalizedProject } from '@/lib/db/repositories';
import { LayoutGrid, List, ArrowUpRight, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  locale: Locale;
  projects: LocalizedProject[];
}

export default function PortfolioWorkClient({ locale, projects }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialDiscipline = searchParams.get('discipline') || 'all';
  const initialYear = searchParams.get('year') || 'all';
  const initialView = searchParams.get('view') || 'grid';

  const [activeDiscipline, setActiveDiscipline] = useState<string>(initialDiscipline);
  const [activeYear, setActiveYear] = useState<string>(initialYear);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>(initialView as any);

  const disciplines = [
    { id: 'all', label: isAr ? 'جميع التخصصات' : 'All Disciplines' },
    { id: 'branding', label: isAr ? 'هويات بصرية' : 'Branding' },
    { id: 'digital', label: isAr ? 'منصات رقمية' : 'Digital Systems' },
    { id: 'editorial', label: isAr ? 'تصميم تحريري' : 'Editorial & Print' },
    { id: 'strategy', label: isAr ? 'استراتيجية' : 'Strategy' },
  ];

  const years = ['all', '2025', '2024', '2023'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchDisc = activeDiscipline === 'all'
        ? true
        : (p.project_type || '').toLowerCase().includes(activeDiscipline.toLowerCase());

      // Check year attribute if present or pass
      const yearAttr = p.attributes?.year ? String(p.attributes.year) : '2025';
      const matchYear = activeYear === 'all' ? true : yearAttr === activeYear;

      return matchDisc && matchYear;
    });
  }, [projects, activeDiscipline, activeYear]);

  const updateFilters = (disc: string, yr: string, vMode: 'grid' | 'table') => {
    setActiveDiscipline(disc);
    setActiveYear(yr);
    setViewMode(vMode);

    const params = new URLSearchParams();
    if (disc !== 'all') params.set('discipline', disc);
    if (yr !== 'all') params.set('year', yr);
    if (vMode !== 'grid') params.set('view', vMode);
    router.replace(`/${locale}/preview/portfolio/work?${params.toString()}`);
  };

  const resetFilters = () => {
    updateFilters('all', 'all', 'grid');
  };

  const hasFilters = activeDiscipline !== 'all' || activeYear !== 'all';

  return (
    <div className="space-y-8">
      {/* Filters & Grid/List Mode Toggle */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E0D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Disciplines */}
        <div className="flex flex-wrap items-center gap-2">
          {disciplines.map(d => (
            <button
              key={d.id}
              onClick={() => updateFilters(d.id, activeYear, viewMode)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold uppercase transition-all ${
                activeDiscipline === d.id
                  ? 'bg-[#0F0F10] text-[#CCFF00] shadow-sm'
                  : 'bg-[#F6F5F2] text-[#57544C] hover:bg-[#EAE8E1]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Years & View Mode Controls */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#737068]">{isAr ? 'السنة:' : 'Year:'}</span>
            {years.map(yr => (
              <button
                key={yr}
                onClick={() => updateFilters(activeDiscipline, yr, viewMode)}
                className={`px-2 py-1 rounded-lg text-xs transition-colors ${
                  activeYear === yr ? 'font-bold text-[#0F0F10] underline' : 'text-[#737068] hover:text-[#0F0F10]'
                }`}
              >
                {yr === 'all' ? (isAr ? 'الكل' : 'All') : yr}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[#E2E0D8]" />

          {/* Grid vs Table Mode Toggle */}
          <div className="flex items-center bg-[#F6F5F2] border border-[#DDD9CE] p-1 rounded-xl">
            <button
              onClick={() => updateFilters(activeDiscipline, activeYear, 'grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#0F0F10] text-white shadow-sm' : 'text-[#737068] hover:text-[#0F0F10]'}`}
              title={isAr ? 'عرض شبكي' : 'Grid View'}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => updateFilters(activeDiscipline, activeYear, 'table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-[#0F0F10] text-white shadow-sm' : 'text-[#737068] hover:text-[#0F0F10]'}`}
              title={isAr ? 'عرض جدولي' : 'Table / List View'}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Result Count and Active Filters Notice */}
      <div className="flex items-center justify-between font-mono text-xs text-[#737068]">
        <span>
          {isAr ? `عرض ${filteredProjects.length} من أصل ${projects.length} دراسة حالة` : `Showing ${filteredProjects.length} of ${projects.length} case studies`}
        </span>
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="text-[#0F0F10] hover:underline flex items-center gap-1 font-bold"
          >
            <X className="w-3 h-3" />
            <span>{isAr ? 'إعادة ضبط الفلاتر' : 'Reset filters'}</span>
          </button>
        )}
      </div>

      {/* Zero State if conflicting filters */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E2E0D8] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
          <p className="font-serif text-xl font-bold text-[#0F0F10]">
            {isAr ? 'لا توجد مشاريع تطابق هذه التوليفة من الفلاتر' : 'No cases match your active filter combination'}
          </p>
          <p className="text-xs text-[#57544C] font-mono leading-relaxed">
            {isAr
              ? 'جرّب إلغاء تحديد أحد الفلاتر لتصفح الأعمال الأرشيفية المتاحة.'
              : 'Try clearing the year or discipline filter to explore available studio cases.'}
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#0F0F10] text-white text-xs font-mono font-semibold"
          >
            {isAr ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID MODE */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, idx) => (
            <article
              key={p.id}
              className="group bg-white rounded-3xl border border-[#E2E0D8] p-6 hover:border-[#0F0F10] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#737068]">
                  <span className="uppercase text-[#57544C] bg-[#F6F5F2] px-2 py-0.5 rounded border border-[#E2E0D8]">
                    {p.project_type || 'Design'}
                  </span>
                  <span>{p.attributes?.year || '2025'}</span>
                </div>

                <div className="aspect-[16/10] rounded-2xl bg-stone-100 border border-[#DDD9CE] relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                  <img
                    src={getPortfolioPhoto(p.slug || p.id)}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <span className="font-mono text-[11px] text-white/90 uppercase tracking-wider">
                      Case #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-white line-clamp-2 drop-shadow-md">
                      {p.title}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#57544C] line-clamp-3 leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EFEA] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#737068]">
                  {p.slug}
                </span>
                <Link
                  href={`/${locale}/preview/portfolio/work/${p.slug}`}
                  className="font-mono text-xs font-bold text-[#0F0F10] hover:underline inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'دراسة الحالة' : 'Case Dossier'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* TABLE / LIST MODE */
        <div className="bg-white rounded-3xl border border-[#E2E0D8] overflow-hidden shadow-sm">
          <table className="w-full text-left rtl:text-right border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[#E2E0D8] bg-[#F6F5F2] text-[#737068] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-5">{isAr ? 'المشروع' : 'Project'}</th>
                <th className="py-3 px-4 hidden sm:table-cell">{isAr ? 'التخصص' : 'Discipline'}</th>
                <th className="py-3 px-4 hidden md:table-cell">{isAr ? 'السنة' : 'Year'}</th>
                <th className="py-3 px-4 hidden lg:table-cell">{isAr ? 'المخرجات' : 'Scope'}</th>
                <th className="py-3 px-5 text-right rtl:text-left">{isAr ? 'التفاصيل' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEA]">
              {filteredProjects.map((p, idx) => (
                <tr key={p.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-5">
                    <Link href={`/${locale}/preview/portfolio/work/${p.slug}`} className="font-serif font-bold text-sm text-[#0F0F10] hover:underline">
                      {p.title}
                    </Link>
                    <span className="block text-[11px] text-[#737068] font-sans sm:hidden mt-0.5">
                      {p.project_type} • {p.attributes?.year || '2025'}
                    </span>
                  </td>
                  <td className="py-4 px-4 hidden sm:table-cell uppercase text-[#57544C]">
                    {p.project_type}
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell text-[#737068]">
                    {p.attributes?.year || '2025'}
                  </td>
                  <td className="py-4 px-4 hidden lg:table-cell text-[#737068] font-sans text-[11px] line-clamp-1">
                    {p.summary}
                  </td>
                  <td className="py-4 px-5 text-right rtl:text-left">
                    <Link
                      href={`/${locale}/preview/portfolio/work/${p.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-[#0F0F10] hover:underline"
                    >
                      <span>{isAr ? 'عرض' : 'Open'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

