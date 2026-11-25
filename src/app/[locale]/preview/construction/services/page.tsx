import { servicesData } from '@/lib/content/construction-services';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Building2,
  Ruler,
  Layers,
  FileCheck2,
  HardHat,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}



export default async function ConstructionServicesPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
          TECHNICAL SERVICES DIRECTORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight">
          {isAr ? 'حزم الخدمات الهندسية والتعاقدية' : 'Engineering & Contracting Services'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'قارن بين حزم المقاولات المتخصصة، واطلع على ما تتضمنه كل حزمة من بنود تنفيذية واستبعادات صريحة لحماية ميزانيتك.'
            : 'Explore specialized contracting packages. Every package explicitly defines inclusions, exclusions, and milestone criteria to eliminate budget ambiguity.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesData.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.slug}
              className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-all group"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#F2EFE9] text-[#D26A3B] group-hover:bg-[#D26A3B] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                      PKG // {s.slug.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-[#162327] group-hover:text-[#D26A3B] transition-colors">
                      {s.title[locale]}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {s.desc[locale]}
                </p>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-stone-100 text-xs">
                  <div>
                    <h4 className="font-bold text-emerald-700 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAr ? 'البنود المشمولة:' : 'Scope Inclusions:'}</span>
                    </h4>
                    <ul className="space-y-1.5 text-stone-600">
                      {s.inclusions[locale].map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-500 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-stone-400" />
                      <span>{isAr ? 'استبعادات الحزمة:' : 'Exclusions:'}</span>
                    </h4>
                    <ul className="space-y-1.5 text-stone-500">
                      {s.exclusions[locale].map((exc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-stone-400 font-bold">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/construction/services/${s.slug}`}
                  className="text-xs font-bold text-[#162327] hover:text-[#D26A3B] flex items-center gap-1.5"
                >
                  <span>{isAr ? 'الملف التفصيلي للخدمة' : 'Detailed Dossier'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/${locale}/preview/construction/request-quote?service=${s.slug}`}
                  className="text-xs font-bold bg-[#D26A3B] hover:bg-[#b85629] text-white px-4 py-2 rounded-lg transition-all"
                >
                  {isAr ? 'طلب تسعير هذه الحزمة' : 'Quote This Package'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

