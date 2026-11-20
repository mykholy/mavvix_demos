import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDevelopmentBySlug, getPropertyUnits } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Building,
  MapPin,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Home,
  Layers,
  Sparkles
} from 'lucide-react';

interface Props {
  params: { locale: Locale; slug: string };
}

export default function RealEstateDevelopmentDetailPage({ params }: Props) {
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const development = getDevelopmentBySlug(slug, locale);
  if (!development) {
    notFound();
  }

  const units = getPropertyUnits(locale).slice(0, 3);

  const amenities = [
    { title: isAr ? 'النادي الصحي والرياضي الخاص' : 'Private Resident Clubhouse & Spa' },
    { title: isAr ? 'ممرات الركض والدراجات وسط الحدائق' : 'Dedicated Green Jogging & Cycle Corridors' },
    { title: isAr ? 'حمامات سباحة ممتدة للأفق (Infinity Pools)' : 'Cascading Heated Infinity Pools' },
    { title: isAr ? 'مواقف سيارات سفلية مجهزة بشواحن EV' : 'Underground Parking with EV Stations' },
    { title: isAr ? 'أمن وحراسة ذكية وبوابات دخول إلكترونية' : '24/7 Smart Biometric Perimeter Security' },
    { title: isAr ? 'منطقة خدمات ومطاعم كونسيرج' : 'Concierge Dining & Retail Plaza' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/real-estate/developments`} className="hover:text-[#A8764F]">
            {isAr ? 'المجمعات السكنية' : 'Developments'}
          </Link>
          <span>/</span>
          <span className="text-[#25312D] font-bold">{development.title}</span>
        </div>

        <Link
          href={`/${locale}/preview/real-estate/developments`}
          className="text-[#A8764F] hover:underline font-bold"
        >
          {isAr ? 'كافة المجمعات' : 'All Developments'}
        </Link>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#A8764F]/10 text-[#A8764F] text-xs font-mono font-bold uppercase tracking-wider">
            <span>PROJECT: {development.slug.toUpperCase()}</span>
            <span>•</span>
            <span className="capitalize">{development.city}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif leading-tight">
            {development.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {development.summary}
          </p>
        </div>

        {/* Fact Card */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-100 font-mono">
            {isAr ? 'مواصفات المشروع' : 'Masterplan Profile'}
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-50 font-mono">
              <span className="text-stone-400 font-sans">{isAr ? 'الموقع' : 'Location'}:</span>
              <span className="font-bold text-[#25312D] capitalize">{development.city}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-50 font-mono">
              <span className="text-stone-400 font-sans">{isAr ? 'موعد التسليم' : 'Handover'}:</span>
              <span className="font-bold text-[#25312D]">Q4 2027</span>
            </div>
            <div className="flex justify-between py-1 font-mono">
              <span className="text-stone-400 font-sans">{isAr ? 'نظام التقسيط' : 'Installments'}:</span>
              <span className="font-bold text-[#A8764F]">10% Down / 7 Yrs</span>
            </div>
          </div>

          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="w-full bg-[#A8764F] hover:bg-[#8e613e] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>{isAr ? 'تصفح الوحدات المتاحة بالمشروع' : 'Browse Units in Project'}</span>
          </Link>
        </div>
      </div>

      {/* Masterplan Amenities Grid */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
            COMMUNITY INFRASTRUCTURE
          </span>
          <h2 className="text-2xl font-black text-[#25312D] font-serif">
            {isAr ? 'المرافق وخدمات المجتمع السكني' : 'Masterplan Amenities & Lifestyle Facilities'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((a, i) => (
            <div key={i} className="p-5 bg-[#F5F0E6] rounded-xl border border-stone-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#A8764F] shrink-0" />
              <span className="text-xs font-bold text-[#25312D]">{a.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Units in Community */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-300">
          <h3 className="text-xl font-bold text-[#25312D] font-serif">
            {isAr ? 'نماذج الوحدات السكنية في هذا المشروع' : 'Sample Residences in This Community'}
          </h3>
          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="text-xs font-bold text-[#A8764F] hover:underline"
          >
            {isAr ? 'عرض الكل' : 'View All'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {units.map((u) => (
            <Link
              key={u.id}
              href={`/${locale}/preview/real-estate/properties/${u.slug}`}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#A8764F] transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase block mb-1">
                  {u.area_m2} m² • {u.unit_type}
                </span>
                <h4 className="text-base font-bold text-[#25312D] group-hover:text-[#A8764F] transition-colors mb-2 font-serif">
                  {u.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2 mb-4">
                  {u.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#A8764F]">
                  {(u.price_cents / 100).toLocaleString()} EGP
                </span>
                <span className="font-sans font-bold text-[#25312D] group-hover:underline flex items-center gap-1">
                  <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                  <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

