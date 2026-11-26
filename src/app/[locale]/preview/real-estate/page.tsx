import type { Metadata } from 'next';
import { SectorDepth } from '@/components/shared/SectorDepth';
import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import Link from 'next/link';
import { getPropertyUnits, getDevelopments, getEditorialPosts } from '@/lib/db/repositories';
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
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const ar = params.locale === 'ar';
  const title = ar ? "موقع عقارات احترافي | وحدات ومقارنات ومعاينات | مافكس" : "Real Estate Website | Property Listings & Viewings | Mavvix";
  const description = ar ? "استكشف تجربة موقع عقارات بها مجمعات سكنية وفلاتر وحدات ومقارنة مواصفات ونموذج طلب معاينة." : "Explore property listings, development dossiers, unit comparison, buyer FAQs and structured viewing enquiries.";
  return { title, description, openGraph: {title, description, locale: ar ? 'ar_EG' : 'en_US', type: 'website'}, twitter: {card:'summary_large_image',title,description} };
}

export default async function RealEstateHomePage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const units = getPropertyUnits(locale).slice(0, 6);
  const articles = getEditorialPosts('real-estate', locale).slice(0, 3);
  const developments = getDevelopments(locale).slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="bg-[#25312D] text-white pt-16 pb-24 border-b border-stone-800" style={getSectorHeroStyle('real-estate')}>
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
                  <>مساحات تختارها بالمقارنة، <span className="text-[#805333]">مش بالصور بس</span> وببيانات حقيقية.</>
                ) : (
                  <>Explore spaces with <span className="text-[#805333]">the details that matter</span> and audited specs.</>
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
                  className="bg-[#805333] hover:bg-[#8e613e] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-sm flex items-center gap-2 transition-all"
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
            <form action={`/${locale}/preview/real-estate/properties`} method="GET" className="lg:col-span-5 bg-white text-[#25312D] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 font-mono pb-2 border-b border-stone-100">
                {isAr ? 'البحث الذكي عن الوحدات' : 'Property Discovery Filter'}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{isAr ? 'نوع الوحدة' : 'Property Type'}</label>
                  <select name="type" aria-label={isAr ? "نوع الوحدة" : "Property type"} className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]">
                    <option value="">{isAr ? 'كافة الأنواع (شقق، دوبلكس، فيلات)' : 'All Typologies'}</option>
                    <option value="apartment">{isAr ? 'شقة سكنية فاخرة' : 'Luxury Apartment'}</option>
                    <option value="penthouse">{isAr ? 'بنتهاوس مع روف' : 'Penthouse'}</option>
                    <option value="villa">{isAr ? 'فيلا مستقلة' : 'Standalone Villa'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">{isAr ? 'الحد الأقصى للميزانية' : 'Max Budget'}</label>
                  <select name="maxPrice" aria-label={isAr ? "حد الميزانية" : "Maximum budget"} className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]">
                    <option value="">{isAr ? 'بدون حد أقصى' : 'No Limit'}</option>
                    <option value="10000000">10,000,000 EGP</option>
                    <option value="15000000">15,000,000 EGP</option>
                    <option value="25000000">25,000,000 EGP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">{isAr ? 'عدد غرف النوم' : 'Bedrooms'}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[{ label: isAr ? 'الكل' : 'Any', value: 'all' }, { label: '2+', value: '2' }, { label: '3+', value: '3' }, { label: '4+', value: '4' }].map((b) => (
                      <label key={b.value} className="relative cursor-pointer rounded bg-[#F5F0E6] border border-stone-300 font-bold hover:bg-[#805333]/10 focus-within:ring-2 focus-within:ring-[#A8764F]">
                        <input type="radio" name="beds" value={b.value} defaultChecked={b.value === 'all'} className="peer sr-only" />
                        <span className="block p-2 text-center peer-checked:bg-[#25312D] peer-checked:text-white rounded">{b.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#25312D] hover:bg-black text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                <span>{isAr ? 'عرض الوحدات المطابقة' : 'Search Matching Units'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="real-estate" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="real-estate" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-90 text-center px-4">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>


      {/* Featured Properties Grid from SQLite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-300 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block mb-1">
              CURATED RESIDENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#25312D] font-serif">
              {isAr ? 'وحدات مختارة من ميريديان' : 'Featured Residential Units'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="text-xs font-bold uppercase tracking-wider text-[#805333] hover:underline flex items-center gap-1"
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
                  <div className="flex items-center justify-between text-xs font-mono mb-3 text-stone-600">
                    <span className="bg-stone-100 text-[#25312D] px-2 py-0.5 rounded font-bold uppercase text-[11px]">
                      {u.unit_type}
                    </span>
                    <span className="text-emerald-700 font-bold uppercase">{u.status.replace('_', ' ')}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#25312D] group-hover:text-[#805333] transition-colors mb-2">
                    {u.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {u.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs text-stone-700 font-mono text-center">
                    <div>
                      <span className="text-stone-600 block text-[10px]">{isAr ? 'المساحة' : 'Area'}</span>
                      <span className="font-bold">{u.area_m2} m²</span>
                    </div>
                    <div>
                      <span className="text-stone-600 block text-[10px]">{isAr ? 'الغرف' : 'Beds'}</span>
                      <span className="font-bold">{u.bedrooms}</span>
                    </div>
                    <div>
                      <span className="text-stone-600 block text-[10px]">{isAr ? 'الحمامات' : 'Baths'}</span>
                      <span className="font-bold">{u.bathrooms}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-600 block uppercase font-mono">{isAr ? 'السعر النقدي' : 'Base Price'}</span>
                      <span className="text-base font-black text-[#805333] font-mono">{priceEgp} EGP</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/${locale}/preview/real-estate/properties/${u.slug}`}
                    className="text-[#25312D] hover:text-[#805333] flex items-center gap-1"
                  >
                    <span>{isAr ? 'تفاصيل الوحدة' : 'Inspect Unit'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/preview/real-estate/viewing?unit=${u.slug}`}
                    className="text-[#805333] hover:underline text-[11px]"
                  >
                    {isAr ? 'طلب معاينة' : 'Request Viewing'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* Masterplanned developments: real linked database records, not invented metrics. */}
      <section className="bg-[#EAE5DB] py-16 sm:py-20 border-y border-[#DDD4C6]" aria-labelledby="meridian-communities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] tracking-[.25em] uppercase text-[#966D4C]">{isAr ? 'تصوّر متكامل للمكان' : 'THE COMMUNITY COLLECTION'}</span>
              <h2 id="meridian-communities-heading" className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#25312D]">{isAr ? 'المكان أكثر من مجرد مساحة' : 'Thoughtful places to call home'}</h2>
              <p className="text-sm mt-3 text-[#4F6056] leading-7">{isAr ? 'ابدأ بالمجتمع السكني، ثم تعرّف على المخططات والأسعار والتفاصيل التي تهم قرارك.' : 'Explore each neighborhood idea, its planning approach, residence layouts and available home types before making a decision.'}</p>
            </div>
            <Link href={`/${locale}/preview/real-estate/developments`} className="inline-flex items-center gap-2 rounded-full border border-[#25312D] px-5 py-3 text-xs font-bold hover:bg-[#25312D] hover:text-white transition-colors">{isAr ? 'استكشف المجمعات' : 'Explore all developments'} <Arrow className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {developments.map((development, index) => (
              <article key={development.id} className="group bg-[#FAF9F5] rounded-[1.6rem] border border-white/60 shadow-sm p-6 sm:p-7 flex flex-col justify-between min-h-[250px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center font-mono text-xs text-[#8D795F] mb-6"><span>{String(index + 1).padStart(2,'0')} / {String(developments.length).padStart(2,'0')}</span><span>{development.city}</span></div>
                  <h3 className="font-serif text-2xl text-[#25312D] font-bold mb-3">{development.title}</h3>
                  <p className="text-sm text-[#637068] leading-6 line-clamp-4">{development.summary}</p>
                </div>
                <Link href={`/${locale}/preview/real-estate/developments/${development.slug}`} className="mt-6 pt-4 border-t border-[#DED6C9] inline-flex items-center justify-between font-bold text-sm text-[#936B4C]">
                  {isAr ? 'استعراض تفاصيل المشروع' : 'Explore the development'} <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="meridian-process-heading">
        <div className="bg-[#25312D] rounded-[2rem] text-[#F7F2E8] p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <span className="text-[#D8B18A] text-xs tracking-[.22em] uppercase font-mono">{isAr ? 'قرار سكني أكثر وضوحًا' : 'CLEAR DECISIONS, NO SURPRISES'}</span>
            <h2 id="meridian-process-heading" className="font-serif text-3xl sm:text-4xl font-bold mt-4">{isAr ? 'رحلتك من أول بحث حتى طلب المعاينة' : 'A considered journey from search to viewing'}</h2>
            <p className="mt-4 text-white/70 text-sm leading-7">{isAr ? 'كل خطوة لها هدف محدد، من مقارنة احتياجات الأسرة إلى مراجعة التفاصيل المكتوبة قبل أي التزام.' : 'Compare the essentials, examine unit details, and confirm all commitments in writing before proceeding.'}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              { n:'01', ar:'حدّد أولوياتك', en:'Set your priorities', arBody:'الموقع والمساحة والميزانية وتفضيلات التشطيب.', enBody:'Location, budget, layout and finishing priorities.' },
              { n:'02', ar:'قارن وحدات مناسبة', en:'Shortlist residences', arBody:'احفظ الوحدات وقارن المواصفات والسعر المرجعي.', enBody:'Save homes and compare specifications and indicative pricing.' },
              { n:'03', ar:'راجع التفاصيل', en:'Review the details', arBody:'اطلع على توزيع الغرف وتفاصيل الوحدة والشروط.', enBody:'Understand room arrangements, unit specifics and terms.' },
              { n:'04', ar:'اطلب موعد معاينة', en:'Request a viewing', arBody:'أرسل تفضيلات الموعد لتأكيدها لاحقًا مع المسؤول.', enBody:'Submit a viewing preference for later confirmation.' },
            ].map(step => (
              <div key={step.n} className="border-t-2 border-[#A8764F] pt-5">
                <span className="text-[#D8B18A] font-mono text-sm">{step.n}</span>
                <h3 className="text-lg font-semibold mt-4 mb-2">{isAr ? step.ar : step.en}</h3>
                <p className="text-sm leading-6 text-white/60">{isAr ? step.arBody : step.enBody}</p>
              </div>
            ))}
          </div>
          <Link href={`/${locale}/preview/real-estate/compare`} className="inline-flex gap-2 items-center bg-[#D7AE85] hover:bg-[#E4BF99] text-[#25312D] px-6 py-3 rounded-full mt-10 text-sm font-bold transition-colors">{isAr ? 'ابدأ مقارنة الوحدات' : 'Compare residences'} <Arrow className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* Neighborhood Guides / Journal Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-300">
          <div>
            <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block mb-1">
              ADVISORY & DISTRICT GUIDES
            </span>
            <h2 className="text-2xl font-black text-[#25312D] font-serif">
              {isAr ? 'دليل المشترين والمناطق السكنية' : 'Buyer Advisory & Neighborhood Insights'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/real-estate/journal`}
            className="text-xs font-bold uppercase tracking-wider text-[#805333] flex items-center gap-1"
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
                <span className="text-[11px] font-mono font-bold text-[#805333] uppercase">
                  {a.category}
                </span>
                <h3 className="text-base font-bold text-[#25312D] group-hover:text-[#805333] transition-colors mt-2 mb-3">
                  {a.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {a.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span>{new Date(a.published_at).toLocaleDateString(locale)}</span>
                <span className="text-[#805333] font-bold group-hover:underline flex items-center gap-1">
                  <span>{isAr ? 'قراءة الدليل' : 'Read Guide'}</span>
                  <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="meridian-faq-heading">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[#966D4C] font-mono text-xs tracking-widest">{isAr ? 'قبل اتخاذ القرار' : 'BEFORE YOU DECIDE'}</span>
            <h2 id="meridian-faq-heading" className="font-serif text-3xl font-bold text-[#25312D]">{isAr ? 'إجابات توضح الصورة كاملة' : 'Answers for a more confident choice'}</h2>
            <Link href={`/${locale}/preview/real-estate/contact`} className="inline-flex items-center gap-2 text-sm font-bold text-[#805333] hover:underline">{isAr ? 'أرسل استفسارك' : 'Ask a question'} <Arrow className="w-4 h-4" /></Link>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {[
              {ar:'هل طلب المعاينة يعني تأكيد موعد؟',en:'Does a viewing request confirm an appointment?',arA:'لا. يتم تسجيل تفضيلك للموعد، ولا يصبح الحجز مؤكدًا إلا بعد رد الجهة المسؤولة.',enA:'No. The preferred time is recorded and requires explicit confirmation from the responsible team.'},
              {ar:'هل خطط الأقساط المعروضة عروض تمويل رسمية؟',en:'Are the installment examples official financing offers?',arA:'الحاسبة استرشادية فقط؛ الأسعار والدفعات والرسوم النهائية تتطلب عرضًا تعاقديًا موثقًا.',enA:'The calculator is illustrative. Final prices, payment schedules and fees require a written offer.'},
              {ar:'ما أهم المعلومات التي أراجعها قبل التعاقد؟',en:'What should I check before signing?',arA:'ملكية الوحدة والتراخيص والمساحة الفعلية وجدول التسليم وبنود التشطيب وأي رسوم إضافية.',enA:'Ownership, legal approvals, measured area, delivery terms, fit-out scope and any extra fees.'},
            ].map((item,i) => (
              <details key={i} className="group bg-white border border-[#E2DDD2] rounded-2xl p-5 sm:p-6 open:shadow-sm">
                <summary className="cursor-pointer font-semibold text-[#25312D] text-sm sm:text-base">{isAr ? item.ar : item.en}</summary>
                <p className="mt-4 text-sm leading-7 text-[#647168]">{isAr ? item.arA : item.enA}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SectorDepth sector="real-estate" locale={locale} />
    </div>
  );
}
