import { getProjects } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import { ProjectsClientExplorer } from './ProjectsClientExplorer';

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ sector?: string; city?: string; area?: string }>;
}

export default async function ConstructionProjectsPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale } = params;
  const initialProjects = getProjects('construction', locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
          PROJECT ATLAS // 12 CASE STUDIES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight">
          {locale === 'ar' ? 'أطلس المشاريع والأعمال المنجزة' : 'Contracting & Architectural Project Atlas'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {locale === 'ar'
            ? 'تصفح قاعدة بيانات المشروعات المنفذة؛ قم بتصفية النتائج وفق القطاع، المساحة، ونطاق الأعمال، واستعرض دراسات الجدوى الهندسية.'
            : 'Explore our catalog of completed and concept references. Filter across sectors, deliverables, and locations to examine engineering case studies.'}
        </p>
      </div>

      {/* Interactive Explorer Client Component */}
      <ProjectsClientExplorer
        projects={initialProjects}
        locale={locale}
        initialSector={searchParams.sector}
        initialCity={searchParams.city}
      />
    </div>
  );
}

