import Link from 'next/link';
import { getPropertyUnits, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Building,
  Home,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Ruler,
  Bed,
  Bath,
  Search,
  Scale
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function RealEstateHomePage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const units = getPropertyUnits(locale).slice(0, 6);
  const articles = getEditorialPosts('real-estate', locale).slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="bg-[#25312D] text-white pt-16 pb-24 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 border border-stone-700 rounded text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                <span>MERIDIAN // RESIDENTIAL PORTFOLIO 2026</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white font-serif">
                {isAr ? (
                  <>مساحات تختارها بالمقارنة، <span className="text-[#A8764F]">مش بالصور بس</span> وببيانات حقيقية.</>
                ) : (
                  <>Explore spaces with <span className="text-[#A8764F]">the details that matter</span> and audited specs.</>
                )}
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {isAr
                  ? 'مجموعة ميريديان السكنية تقدم 24 وحدة فاخرة موزعة على 5 مجمعات راقية، مع تدقيق مخططات الأدوار، وحاسبة الأقساط، وحجز مواعيد المعاينة.'
                  : 'Curating 24 distinguished residential units across 5 masterplanned communities with transparent layouts, installment schedules, and simulated viewing requests.'}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/preview/real-estate/properties`}
                  className="bg-[#A8764F] hover:bg-[#8e613e] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>{isAr ? 'استعرض كافة الوحدات (24 وحدة)' : 'Browse 24 Properties'}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/preview/real-estate/compare`}
                  className="bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded border border-stone-700 flex items-center gap-2 transition-all"
                >
                  <Scale className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? 'مقارنة 3 وحدات' : '3-Unit Comparator'}</span>
                </Link>
              </div>
            </div>

            {/* Right: Property Finder Card (Signature Hero Module) */}
            <div className="lg:col-span-5 bg-white text-[#25312D] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 font-mono pb-2 border-b border-stone-100">
                {isAr ? 'البحث الذكي عن الوحدات' : 'Property Discovery Filter'}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{isAr ? 'نوع الوحدة' : 'Property Type'}</label>
                  <select className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]">
                    <option value="">{isAr ? 'كافة الأنواع (شقق، دوبلكس، فيلات)' : 'All Typologies'}</option>
                    <option value="apartment">{isAr ? 'شقة سكنية فاخرة' : 'Luxury Apartment'}</option>
                    <option value="penthouse">{isAr ? 'بنتهاوس مع روف' : 'Penthouse'}</option>
                    <option value="villa">{isAr ? 'فيلا مستقلة' : 'Standalone Villa'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">{isAr ? 'الحد الأقصى للميزانية' : 'Max Budget'}</label>
                  <select className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]">
                    <option value="">{isAr ? 'بدون حد أقصى' : 'No Limit'}</option>
                    <option value="10000000">10,000,000 EGP</option>
                    <option value="15000000">15,000,000 EGP</option>
                    <option value="25000000">25,000,000 EGP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">{isAr ? 'عدد غرف النوم' : 'Bedrooms'}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Any', '2+', '3+', '4+'].map((b) => (
                      <button key={b} type="button" className="p-2 text-center rounded bg-[#F5F0E6] border border-stone-300 font-bold hover:bg-[#A8764F] hover:text-white transition-colors">
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/${locale}/preview/real-estate/properties`}
                className="w-full bg-[#25312D] hover:bg-black text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isAr ? 'عرض الوحدات المطابقة' : 'Search Matching Units'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid from SQLite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-300 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
              CURATED RESIDENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#25312D] font-serif">
              {isAr ? 'وحدات مختارة من ميريديان' : 'Featured Residential Units'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="text-xs font-bold uppercase tracking-wider text-[#A8764F] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'كافة الوحدات (24)' : 'View All 24 Units'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((u) => {
            const priceEgp = (u.price_cents / 100).toLocaleString();
            return (
              <div
                key={u.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-3 text-stone-400">
                    <span className="bg-stone-100 text-[#25312D] px-2 py-0.5 rounded font-bold uppercase text-[11px]">
                      {u.unit_type}
                    </span>
                    <span className="text-emerald-700 font-bold uppercase">{u.status.replace('_', ' ')}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#25312D] group-hover:text-[#A8764F] transition-colors mb-2">
                    {u.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
                    {u.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs text-stone-700 font-mono text-center">
                    <div>
                      <span className="text-stone-400 block text-[10px]">{isAr ? 'المساحة' : 'Area'}</span>
                      <span className="font-bold">{u.area_m2} m²</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{isAr ? 'الغرف' : 'Beds'}</span>
                      <span className="font-bold">{u.bedrooms}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">{isAr ? 'الحمامات' : 'Baths'}</span>
                      <span className="font-bold">{u.bathrooms}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-mono">{isAr ? 'السعر النقدي' : 'Base Price'}</span>
                      <span className="text-base font-black text-[#A8764F] font-mono">{priceEgp} EGP</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/${locale}/preview/real-estate/properties/${u.slug}`}
                    className="text-[#25312D] hover:text-[#A8764F] flex items-center gap-1"
                  >
                    <span>{isAr ? 'تفاصيل الوحدة' : 'Inspect Unit'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/preview/real-estate/viewing?unit=${u.slug}`}
                    className="text-[#A8764F] hover:underline text-[11px]"
                  >
                    {isAr ? 'طلب معاينة' : 'Request Viewing'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Neighborhood Guides / Journal Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-300">
          <div>
            <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
              ADVISORY & DISTRICT GUIDES
            </span>
            <h2 className="text-2xl font-black text-[#25312D] font-serif">
              {isAr ? 'دليل المشترين والمناطق السكنية' : 'Buyer Advisory & Neighborhood Insights'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/real-estate/journal`}
            className="text-xs font-bold uppercase tracking-wider text-[#A8764F] flex items-center gap-1"
          >
            <span>{isAr ? 'كل الأدلة' : 'All Guides'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/${locale}/preview/real-estate/journal/${a.slug}`}
              className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-[#A8764F] uppercase">
                  {a.category}
                </span>
                <h3 className="text-base font-bold text-[#25312D] group-hover:text-[#A8764F] transition-colors mt-2 mb-3">
                  {a.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {a.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{new Date(a.published_at).toLocaleDateString(locale)}</span>
                <span className="text-[#A8764F] font-bold group-hover:underline flex items-center gap-1">
                  <span>{isAr ? 'قراءة الدليل' : 'Read Guide'}</span>
                  <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

