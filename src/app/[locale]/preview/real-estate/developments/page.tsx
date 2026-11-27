import Link from 'next/link';
import { getDevelopments } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Building,
  MapPin,
  Home,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function RealEstateDevelopmentsPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const developments = getDevelopments(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block mb-1">
          MASTERPLANNED COMMUNITIES // CURATED RESIDENTIAL CONCEPTS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {isAr ? 'المجمعات السكنية والمشاريع المتكاملة' : 'Signature Masterplanned Developments'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'مشاريع عمرانية قائمة على أسس التصميم البيئي والمساحات المفتوحة، مع تنوع في الوحدات ومرافق الضيافة والنوادي الخاصة.'
            : 'Explore our masterplanned communities designed around green corridors, private clubs, and architectural distinction.'}
        </p>
      </div>

      {/* Developments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developments.map((d) => (
          <div
            key={d.id}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4 text-stone-400">
                <span className="bg-stone-100 text-[#25312D] px-2.5 py-1 rounded font-bold uppercase">
                  {d.city}
                </span>
                <span className="text-emerald-700 font-bold uppercase">COMMUNITY</span>
              </div>

              <h2 className="text-xl font-bold text-[#25312D] group-hover:text-[#805333] transition-colors mb-3 font-serif">
                {d.title}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed mb-6">
                {d.summary}
              </p>

              <div className="p-4 bg-[#F5F0E6] rounded-xl border border-stone-200 space-y-2 text-xs font-mono mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-sans">{isAr ? 'تفاصيل التسليم:' : 'Handover details:'}</span>
                  <span className="font-bold text-[#25312D]">{isAr ? "حسب العقد" : "Per written contract"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-sans">{isAr ? 'Master Plan:' : 'Master Plan:'}</span>
                  <span className="font-bold text-[#25312D]">{isAr ? "المخطط والمرافق" : "Layout & amenities"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <Link
                href={`/${locale}/preview/real-estate/developments/${d.slug}`}
                className="text-xs font-bold text-[#25312D] hover:text-[#805333] flex items-center gap-1.5"
              >
                <span>{isAr ? 'قصة المجمع والمخطط' : 'Project Dossier'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={`/${locale}/preview/real-estate/properties`}
                className="text-xs font-bold text-[#805333] hover:underline"
              >
                {isAr ? 'عرض الوحدات' : 'View Units'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

