import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Ruler,
  MapPin,
  Building,
  FileCheck2,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface Props {
  params: { locale: Locale; slug: string };
}

export default function ConstructionProjectDetailPage({ params }: Props) {
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const project = getProjectBySlug('construction', slug, locale);
  if (!project) {
    notFound();
  }

  // Related projects in same sector
  const related = getProjects('construction', locale)
    .filter((p) => p.slug !== slug && p.project_type === project.project_type)
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/construction/projects`} className="hover:text-[#D26A3B]">
            {isAr ? 'أطلس المشاريع' : 'Project Atlas'}
          </Link>
          <span>/</span>
          <span className="text-[#162327] font-bold">{project.title}</span>
        </div>

        <Link
          href={`/${locale}/preview/construction/projects`}
          className="text-[#D26A3B] hover:underline font-bold flex items-center gap-1"
        >
          <span>{isAr ? 'العودة للقائمة' : 'Back to Atlas'}</span>
        </Link>
      </div>

      {/* Case Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D26A3B]/10 text-[#D26A3B] text-xs font-mono font-bold uppercase tracking-wider">
            <span>REF: {project.slug.toUpperCase()}</span>
            <span>•</span>
            <span className="capitalize">{project.project_type}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Fact Sheet Card */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-100">
            {isAr ? 'بطاقة البيانات الهندسية' : 'Engineering Specifications'}
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-stone-400 block mb-0.5">{isAr ? 'المساحة الكلية' : 'Gross Area'}</span>
              <span className="font-bold text-[#162327] font-mono text-sm">{project.area_m2} m²</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">{isAr ? 'الموقع' : 'Location'}</span>
              <span className="font-bold text-[#162327] capitalize">{project.city.replace('-', ' ')}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">{isAr ? 'نوع المنشأة' : 'Typology'}</span>
              <span className="font-bold text-[#162327] capitalize">{project.project_type}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">{isAr ? 'حالة التوثيق' : 'Study Status'}</span>
              <span className="font-bold text-emerald-600 uppercase font-mono text-[11px]">DEMO VERIFIED</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <Link
              href={`/${locale}/preview/construction/request-quote?ref=${project.slug}&area=${project.area_m2}`}
              className="w-full bg-[#D26A3B] hover:bg-[#b85629] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
            >
              <span>{isAr ? 'طلب تسعير نطاق مماثل' : 'Request Similar Scope'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Case Study Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          {/* Objective & Challenge */}
          <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-[#162327] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D26A3B]" />
              <span>{isAr ? 'تحديات الموقع والمتطلبات الإنشائية' : 'Site Constraints & Engineering Challenge'}</span>
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {project.body?.challenge || (isAr
                ? 'تطلب هذا المشروع إدارة دقيقة لمسارات حركة الخامات والمعدات الثقيلة داخل منطقة مأهولة، مع ضمان المحافظة على معايير العزل الصوتي والسلامة الإنشائية الصارمة.'
                : 'The structural scope demanded meticulous coordination of material loading pathways within high-density access constraints while adhering to rigid acoustic isolation and safety envelopes.')}
            </p>
          </div>

          {/* Solution & Methodology */}
          <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-[#162327] flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#D26A3B]" />
              <span>{isAr ? 'الحلول المنفذة ومنهجية إدارة الأعمال' : 'Engineered Solution & Sequencing'}</span>
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {project.body?.solution || (isAr
                ? 'تم تطبيق منهجية الهندسة القيمية وإعداد جداول توريد مسبقة واعتماد بدائل قياسية للمواد، مما ساهم في تقليص الهدر بنسبة 18% وتحقيق أعلى استقرار إنشائي.'
                : 'Implemented phased value engineering, modular fabrication sequencing, and audited alternative material specs, mitigating schedule drift and achieving structural precision.')}
            </p>
          </div>

          {/* Decision Points */}
          <div className="bg-[#162327] text-white rounded-2xl p-8 space-y-6">
            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wider font-mono">
              {isAr ? 'القرارات الهندسية والمفاضلات الفنية' : 'Key Engineering Trade-offs & Decisions'}
            </h2>
            <div className="space-y-4 text-xs">
              {project.body?.decision_points?.map((dp: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-stone-900/80 p-4 rounded-xl border border-stone-800">
                  <span className="font-mono text-amber-400 font-bold shrink-0">0{idx + 1}.</span>
                  <span className="text-stone-200 leading-relaxed">{dp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables & Deliverable Checklist */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#162327] pb-2 border-b border-stone-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D26A3B]" />
              <span>{isAr ? 'عناصر ومخرجات التسليم' : 'Audited Deliverables'}</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              {project.body?.deliverables?.map((d: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D26A3B] shrink-0" />
                  <span className="capitalize">{d.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="bg-stone-100 border border-stone-200 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-600">
                {isAr ? 'مشاريع مماثلة في نفس القطاع' : 'Related Sector Case Studies'}
              </h3>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/${locale}/preview/construction/projects/${r.slug}`}
                    className="block p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#D26A3B] transition-all group"
                  >
                    <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                      {r.area_m2} m² • {r.city}
                    </span>
                    <h4 className="text-xs font-bold text-[#162327] group-hover:text-[#D26A3B] transition-colors">
                      {r.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

