'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { LocalizedProject } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { getConstructionPhoto } from '@/lib/media/sector-images';
import {
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  MapPin,
  Ruler,
  AlertCircle
} from 'lucide-react';

interface Props {
  projects: LocalizedProject[];
  locale: Locale;
  initialSector?: string;
  initialCity?: string;
}

export function ProjectsClientExplorer({ projects, locale, initialSector, initialCity }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedSector, setSelectedSector] = useState<string>(initialSector || 'all');
  const [selectedCity, setSelectedCity] = useState<string>(initialCity || 'all');
  const [areaFilter, setAreaFilter] = useState<string>('all'); // 'small', 'medium', 'large'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Sector filter
      if (selectedSector !== 'all' && p.project_type.toLowerCase() !== selectedSector.toLowerCase()) {
        return false;
      }
      // City filter
      if (selectedCity !== 'all' && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      // Area band filter
      if (areaFilter === 'small' && p.area_m2 >= 500) return false;
      if (areaFilter === 'medium' && (p.area_m2 < 500 || p.area_m2 > 1000)) return false;
      if (areaFilter === 'large' && p.area_m2 <= 1000) return false;

      return true;
    });
  }, [projects, selectedSector, selectedCity, areaFilter]);

  function handleReset() {
    setSelectedSector('all');
    setSelectedCity('all');
    setAreaFilter('all');
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filter Panel */}
      <aside className="lg:col-span-1 space-y-6 bg-white border border-stone-200 rounded-xl p-6 h-fit shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#162327]">
            <Filter className="w-4 h-4 text-[#D26A3B]" />
            <span>{isAr ? 'تصفية المشاريع' : 'Filter Atlas'}</span>
          </div>
          <button
            onClick={handleReset}
            className="text-[11px] text-[#D26A3B] hover:underline flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
          </button>
        </div>

        {/* Sector Filter */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            {isAr ? 'القطاع الإنشائي' : 'Sector'}
          </label>
          <div className="space-y-1 text-xs">
            {['all', 'residential', 'commercial', 'industrial', 'hospitality'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`w-full text-start px-3 py-2 rounded capitalize font-medium transition-colors ${
                  selectedSector === sec
                    ? 'bg-[#162327] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {sec === 'all' ? (isAr ? 'كافة القطاعات' : 'All Sectors') : sec}
              </button>
            ))}
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            {isAr ? 'الموقع / المدينة' : 'Location / City'}
          </label>
          <div className="space-y-1 text-xs">
            {['all', 'new-cairo', 'giza', 'new-capital', 'october'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`w-full text-start px-3 py-2 rounded capitalize font-medium transition-colors ${
                  selectedCity === city
                    ? 'bg-[#162327] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {city === 'all' ? (isAr ? 'كافة المدن' : 'All Locations') : city.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Area Band Filter */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            {isAr ? 'نطاق المساحة (م²)' : 'Area Band'}
          </label>
          <div className="space-y-1 text-xs">
            {[
              { id: 'all', label: isAr ? 'كافة المساحات' : 'All Areas' },
              { id: 'small', label: isAr ? 'أقل من 500 م²' : '< 500 m²' },
              { id: 'medium', label: isAr ? '500 — 1,000 م²' : '500 — 1,000 m²' },
              { id: 'large', label: isAr ? 'أكثر من 1,000 م²' : '> 1,000 m²' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setAreaFilter(b.id)}
                className={`w-full text-start px-3 py-2 rounded font-medium transition-colors ${
                  areaFilter === b.id
                    ? 'bg-[#162327] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Results Column */}
      <main className="lg:col-span-3 space-y-6">
        {/* Results Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 text-xs">
          <div className="font-mono text-stone-600">
            {isAr ? 'المشاريع المطابقة:' : 'Matching References:'}{' '}
            <strong className="text-[#162327] font-bold">{filteredProjects.length}</strong>{' '}
            {isAr ? 'من أصل' : 'of'} {projects.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Zero State / Empty State (Journey 3 tested path) */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-xl p-12 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-[#162327]">
              {isAr ? 'لا توجد مشاريع مطابقة لمعايير التصفية المحددة' : 'No Projects Found Matching Criteria'}
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {isAr
                ? 'جرّب تعديل القطاع أو المدينة أو نطاق المساحة، أو أعد ضبط الفلاتر لعرض كافة المشاريع المسجلة.'
                : 'Try clearing one filter dimension or resetting the search to view all 12 available project dossiers.'}
            </p>
            <button
              onClick={handleReset}
              className="mt-2 inline-flex items-center gap-1.5 bg-[#D26A3B] hover:bg-[#b85629] text-white text-xs font-bold px-4 py-2.5 rounded shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}</span>
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={getConstructionPhoto(p.slug || p.id)}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 start-3 text-xs font-bold text-white px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                    {p.city} • {p.area_m2} m²
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs mb-3 text-stone-500 font-mono">
                    <span className="bg-stone-100 text-[#162327] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                      {p.project_type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-stone-400" />
                      <span>{p.area_m2} m²</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#162327] mb-2 group-hover:text-[#D26A3B] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {p.summary}
                  </p>

                  <div className="space-y-1.5 pt-4 border-t border-stone-100 text-xs text-stone-700">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                      {isAr ? 'مخرجات التسليم:' : 'Deliverables:'}
                    </div>
                    {p.body?.deliverables?.slice(0, 3).map((d: string, dIdx: number) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D26A3B] shrink-0" />
                        <span className="capitalize">{d.replace('-', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/${locale}/preview/construction/projects/${p.slug}`}
                    className="text-[#162327] hover:text-[#D26A3B] flex items-center gap-1"
                  >
                    <span>{isAr ? 'دراسة الحالة الهندسية' : 'Case Study Dossier'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/preview/construction/request-quote?ref=${p.slug}`}
                    className="text-[#D26A3B] hover:underline text-[11px]"
                  >
                    {isAr ? 'تسعير نطاق مماثل' : 'Similar Scope'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

