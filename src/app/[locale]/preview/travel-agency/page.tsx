import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  Compass,
  MapPin,
  CalendarDays,
  Sun,
  Mountain,
  Waves,
  BookOpen,
  CheckCircle2,
  Route,
  ShieldCheck
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { NOMAD_ROUTES, nomadPath } from '@/lib/verticals/travel-agency/data';
import { NomadItineraryCalibrator } from './NomadItineraryCalibrator';
import { NomadTravelEthics } from './NomadTravelEthics';
import { NomadVisualAtelier } from './NomadVisualAtelier';

export default async function NomadHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const ar = locale === 'ar';
  const loc = locale as Locale;
  const data = NOMAD_ROUTES;
  const hero = data.media[0];

  const btn = 'inline-flex items-center gap-3 bg-[#18352E] px-7 py-4 text-sm font-bold text-white hover:bg-[#944129] transition-colors';
  const label = 'text-xs font-bold uppercase tracking-[.18em] text-[#944129]';
  const heading = 'mt-5 font-serif text-4xl font-medium leading-tight sm:text-6xl text-[#18352E]';
  const wrap = 'mx-auto max-w-7xl px-5 sm:px-8';

  return (
    <div>
      {/* 01. Destination Editorial Hero */}
      <section data-sector-specific="destination-editorial-hero" className="relative overflow-hidden bg-[#F4EBDD]">
        <div className={wrap + ' grid gap-10 py-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-24'}>
          <div>
            <p className={label}>01 / THE ART OF THE JOURNEY</p>
            <h1 className="mt-6 font-serif text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[1.03] tracking-tight text-[#18352E]">
              {ar ? (
                <>
                  رحلة على <span className="text-[#944129]">إيقاعك.</span>
                </>
              ) : (
                <>
                  Go further. <span className="text-[#944129]">Feel more.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-lg text-base leading-9 text-[#3D5249]">
              {ar
                ? 'من معابد الأقصر إلى أحياء جدة التاريخية، استكشف برامج رحلات لها قصة ووقت للاستمتاع. اختر الوجهة، وفكر في تفاصيل الرحلة قبل الاتفاق مع مشغل حقيقي.'
                : 'From Luxor temples to the historic streets of Jeddah, discover thoughtful itinerary concepts with room for curiosity. Choose your destination and define the journey before talking to a real operator.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className={btn} href={nomadPath(locale, 'journeys')}>
                {ar ? 'استكشف الرحلات' : 'Explore journeys'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                className="inline-flex items-center border border-[#18352E] px-6 py-4 text-sm font-bold text-[#18352E] hover:bg-[#18352E] hover:text-white transition-colors"
                href={nomadPath(locale, 'quote')}
              >
                {ar ? 'خطط رحلة خاصة' : 'Plan your own'}
              </Link>
            </div>
            <p className="mt-7 flex items-center gap-2 text-xs font-semibold text-[#3D5249]">
              <ShieldCheck size={19} className="text-[#944129]" />
              {ar ? 'لا حجز أو دفع أو سعر مؤكد' : 'No confirmed bookings, payments or prices'}
            </p>
          </div>
          <figure className="relative">
            <img
              src={hero.url}
              alt={hero.alt[locale]}
              className="h-[340px] w-full object-cover sm:h-[540px] border border-[#CBBB9E]"
              loading="eager"
            />
            <figcaption className="flex flex-wrap justify-between gap-2 border-b border-[#D3C0A9] py-3 text-xs text-[#3D5249]">
              <span>{ar ? 'وادي الملوك، الأقصر · صورة تحريرية' : 'Valley of the Kings, Luxor · editorial photograph'}</span>
              <a href={hero.source} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                {hero.credit} · {hero.license}
              </a>
            </figcaption>
            <div className="absolute end-3 top-3 bg-[#FFF9F0] px-5 py-3 text-xs font-bold shadow-md text-[#18352E]">
              EGYPT / LUXOR
            </div>
          </figure>
        </div>
      </section>

      {/* 02. Destination Comparison */}
      <section data-sector-specific="destination-comparison" className={wrap + ' py-20'}>
        <p className={label}>02 / TWO REGIONS, DIFFERENT RHYTHMS</p>
        <h2 className={heading}>{ar ? 'اختار الوجهة أولًا' : 'Start with a place'}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ['egypt', 'مصر', 'Egypt', 'القاهرة والأقصر وأسوان والساحل', 'Cairo, Luxor, Aswan and the coast'],
            ['saudi-arabia', 'السعودية', 'Saudi Arabia', 'الرياض وجدة وثقافة المدن', 'Riyadh, Jeddah and urban culture']
          ].map(([id, a, e, ad, ed]) => (
            <Link
              key={id}
              href={nomadPath(locale, 'destinations')}
              className="group flex min-h-56 flex-col justify-between border border-[#CBBB9E] bg-[#F4EBDD] p-8 hover:border-[#944129] transition-colors"
            >
              <MapPin size={34} strokeWidth={1.3} className="text-[#944129]" />
              <div>
                <h3 className="font-serif text-4xl text-[#18352E]">{ar ? a : e}</h3>
                <p className="mt-4 text-sm leading-8 text-[#3D5249]">{ar ? ad : ed}</p>
              </div>
              <span className="mt-6 flex justify-between text-xs font-bold text-[#18352E]">
                <span>{ar ? 'شوف المسارات' : 'Explore routes'}</span>
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Signature 1: Itinerary & Pace Calibrator */}
      <div data-sector-specific="nomad-itinerary-calibrator">
        <NomadItineraryCalibrator locale={loc} />
      </div>

      {/* 03. Itinerary Catalogue */}
      <section data-sector-specific="itinerary-catalogue" className="bg-[#18352E] py-20 text-[#FFF9F0]">
        <div className={wrap}>
          <p className="text-xs tracking-[.18em] font-bold text-[#E0AB6A]">03 / JOURNEYS, NOT JUST DESTINATIONS</p>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight sm:text-6xl text-white">
            {ar ? 'ثمانية أفكار لرحلات مختلفة' : 'Eight ways to explore'}
          </h2>
          <div className="mt-10 grid gap-px bg-[#64776A] md:grid-cols-2">
            {data.services.map((j) => (
              <Link
                key={j.slug}
                href={nomadPath(locale, 'journeys/' + j.slug)}
                className="flex min-h-44 flex-col gap-4 bg-[#18352E] p-7 hover:bg-[#27463B] transition-colors"
              >
                <span className="flex justify-between text-xs font-bold text-[#E0AB6A]">
                  <span>
                    {String(j.rank).padStart(2, '0')} / {j.category.toUpperCase()}
                  </span>
                  <span>{j.days === null ? (ar ? 'مرنة' : 'Flexible') : j.days + (ar ? ' أيام' : ' DAYS')}</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">{j.title[locale]}</h3>
                <p className="text-sm leading-7 text-[#E2E7DF]">{j.summary[locale]}</p>
                <ArrowUpRight size={19} className="text-[#E0AB6A]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Day by Day Itinerary */}
      <section data-sector-specific="day-by-day-itinerary" className={wrap + ' py-20'}>
        <p className={label}>04 / A JOURNEY IN STAGES</p>
        <h2 className={heading}>{ar ? 'الأقصر على الضفتين' : 'Luxor, across both banks'}</h2>
        <p className="mt-5 text-[#3D5249] leading-8">
          {ar
            ? 'بدل التنقل المرهق، اترك وقتًا للاستكشاف والراحة. هذا تصور زمني وليس جدول حجز مؤكد.'
            : 'Rather than racing through monuments, allow room for rest and exploration. An editorial outline, not a confirmed schedule.'}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['01', 'وصول واستقرار', 'Arrival and settling in'],
            ['02', 'الضفة الشرقية', 'East-bank monuments'],
            ['03', 'الضفة الغربية', 'West-bank exploration'],
            ['04', 'وقت مرن ومغادرة', 'Flexible time and departure']
          ].map(([n, a, e]) => (
            <div key={n} className="border-t-2 border-[#A4492D] bg-[#F4EBDD] p-6">
              <span className="font-mono text-[#944129] font-bold">{n}</span>
              <h3 className="mt-6 font-serif text-2xl text-[#18352E]">{ar ? a : e}</h3>
            </div>
          ))}
        </div>
        <Link className={btn + ' mt-8'} href={nomadPath(locale, 'journeys/luxor-temples')}>
          {ar ? 'تفاصيل المسار' : 'Full itinerary'}
          <ArrowUpRight size={17} />
        </Link>
      </section>

      {/* Signature 2: Travel Ethics & Community Standards */}
      <div data-sector-specific="nomad-travel-ethics">
        <NomadTravelEthics locale={loc} />
      </div>

      {/* Signature 3: Visual Journey Atelier */}
      <div data-sector-specific="nomad-visual-atelier">
        <NomadVisualAtelier locale={loc} />
      </div>

      {/* 05. Travel Pace */}
      <section data-sector-specific="travel-pace" className="bg-[#F4EBDD] py-20">
        <div className={wrap}>
          <p className={label}>05 / YOUR PACE</p>
          <h2 className={heading}>{ar ? 'مش كل المسافرين زي بعض' : 'Travel at your own rhythm'}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              [Sun, 'رحلة هادئة', 'Slow travel', 'وقت أطول للراحة ونوافذ مرنة.', 'More time for rest and flexible windows.'],
              [Compass, 'متوازنة', 'Balanced', 'اختيارات واضحة مع وقت للاستكشاف.', 'Defined stops with space to explore.'],
              [Mountain, 'نشطة', 'Active', 'زيارات أكثر بعد مراجعة القدرة والمسافات.', 'More activities after reviewing fitness and distances.']
            ].map(([Icon, a, e, ad, ed], i) => (
              <div key={i} className="border border-[#CBBB9E] bg-[#FFF9F0] p-7">
                {typeof Icon !== 'string' && <Icon size={34} className="text-[#944129]" />}
                <h3 className="mt-6 font-serif text-3xl text-[#18352E]">{(ar ? a : e) as string}</h3>
                <p className="mt-4 text-sm leading-8 text-[#3D5249]">{(ar ? ad : ed) as string}</p>
              </div>
            ))}
          </div>
          <Link href={nomadPath(locale, 'travel-styles')} className="mt-8 inline-flex gap-2 font-bold underline text-[#18352E]">
            {ar ? 'دليل أنماط الرحلات' : 'Compare travel styles'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* 06. Inclusion / Exclusion */}
      <section data-sector-specific="inclusion-exclusion" className={wrap + ' py-20'}>
        <p className={label}>06 / KNOW WHAT YOU ARE COMPARING</p>
        <h2 className={heading}>{ar ? 'البرنامج أكبر من سعر واحد' : 'Beyond a headline price'}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="border border-[#CBBB9E] p-7 bg-[#FFF9F0]">
            <h3 className="font-serif text-3xl text-[#18352E]">{ar ? 'اطلب تحديد المشمول' : 'Clarify inclusions'}</h3>
            {(ar
              ? ['الإقامة ونوع الغرفة', 'النقل والمرشد', 'الوجبات والتذاكر']
              : ['Lodging and room type', 'Transfers and guides', 'Meals and admission']
            ).map((x) => (
              <p key={x} className="mt-6 flex items-center gap-3 text-sm text-[#3D5249]">
                <CheckCircle2 size={19} className="text-[#18352E] shrink-0" />
                {x}
              </p>
            ))}
          </div>
          <div className="bg-[#F4EBDD] p-7 border border-[#CBBB9E]">
            <h3 className="font-serif text-3xl text-[#18352E]">{ar ? 'راجع البنود المتغيرة' : 'Review exclusions'}</h3>
            {(ar
              ? ['الأنشطة الاختيارية', 'الرسوم الشخصية', 'الإلغاء والتعديل']
              : ['Optional activities', 'Personal expenses', 'Cancellation and changes']
            ).map((x) => (
              <p key={x} className="mt-6 flex items-center gap-3 text-sm text-[#3D5249]">
                <ArrowUpRight size={19} className="text-[#944129] shrink-0" />
                {x}
              </p>
            ))}
          </div>
        </div>
        <Link href={nomadPath(locale, 'inclusions')} className="mt-8 inline-flex font-bold underline text-[#18352E]">
          {ar ? 'اقرأ التفاصيل قبل الاتفاق' : 'Read the planning checklist'}
        </Link>
      </section>

      {/* 07. Transfer Planning */}
      <section data-sector-specific="transfer-planning" className="bg-[#18352E] py-20 text-[#FFF9F0]">
        <div className={wrap + ' grid gap-10 lg:grid-cols-2 lg:items-center'}>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#E0AB6A]">07 / THE SPACE BETWEEN PLACES</p>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight sm:text-6xl text-white">
              {ar ? 'المسافات جزء من التجربة' : 'The journey between stops matters'}
            </h2>
            <p className="mt-6 leading-9 text-[#E2E7DF]">
              {ar
                ? 'احسب الوصول وتسجيل الدخول والمغادرة، وخلّي أيام التنقل منفصلة عن جدول مليان زيارات.'
                : 'Account for arrival, check-in and departure, and separate transfer days from intensive sightseeing.'}
            </p>
          </div>
          <div className="space-y-3">
            {[
              [Route, ar ? 'راجع وسيلة النقل' : 'Review transport'],
              [CalendarDays, ar ? 'اترك مساحة للوقت' : 'Allow time buffers'],
              [Waves, ar ? 'تحقق من شروط الأنشطة' : 'Verify activity conditions']
            ].map(([Icon, t], i) => (
              <div key={i} className="flex items-center gap-4 border border-[#71877A] p-5 bg-[#244238]">
                {typeof Icon !== 'string' && <Icon className="text-[#E0AB6A]" size={25} />}
                <span className="font-bold">{t as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. Personalized Trip Intake */}
      <section data-sector-specific="personalized-trip-intake" className={wrap + ' py-20'}>
        <div className="grid gap-10 bg-[#F4EBDD] p-8 sm:p-14 lg:grid-cols-[1fr_auto] lg:items-end border border-[#CBBB9E]">
          <div>
            <p className={label}>08 / MAKE IT YOURS</p>
            <h2 className={heading}>{ar ? 'صمم رحلة تناسب مجموعتك' : 'Build your own journey'}</h2>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#3D5249]">
              {ar
                ? 'حدد الوجهة والمدة وعدد المسافرين ونطاق الميزانية، من غير رفع جوازات سفر أو بيانات دفع.'
                : 'Define destination, duration, group size and budget band without uploading passports or payment details.'}
            </p>
          </div>
          <Link href={nomadPath(locale, 'quote')} className={btn}>
            {ar ? 'ابدأ استفسارًا' : 'Start a planning enquiry'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* 09. Field Notes / Editorial Guides */}
      <section data-sector-specific="travel-editorial-guides" className={wrap + ' border-t border-[#D3C0A9] py-20'}>
        <p className={label}>09 / FIELD NOTES</p>
        <h2 className={heading}>{ar ? 'اقرأ قبل السفر' : 'Read before you travel'}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.articles.map((a) => (
            <Link
              key={a.slug}
              href={nomadPath(locale, 'guides/' + a.slug)}
              className="border border-[#CBBB9E] p-7 bg-[#FFF9F0] hover:border-[#944129] transition-colors"
            >
              <BookOpen className="text-[#944129]" size={28} />
              <h3 className="mt-6 font-serif text-2xl text-[#18352E]">{a.title[locale]}</h3>
              <p className="mt-4 text-sm leading-8 text-[#3D5249]">{a.summary[locale]}</p>
              <ArrowUpRight className="mt-6 text-[#944129]" size={19} />
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Travel Booking FAQ */}
      <section data-sector-specific="travel-booking-faq" className="bg-[#F4EBDD] py-20">
        <div className={wrap + ' grid gap-10 lg:grid-cols-[.6fr_1fr]'}>
          <div>
            <p className={label}>10 / GOOD TO KNOW</p>
            <h2 className={heading}>{ar ? 'أسئلة مهمة' : 'Before you go'}</h2>
          </div>
          <div>
            {data.faq.map((f) => (
              <details key={f.question.en} className="border-b border-[#CBBB9E] py-6 group">
                <summary className="cursor-pointer font-bold leading-7 text-[#18352E] hover:text-[#944129] list-none flex items-center justify-between">
                  <span>{f.question[locale]}</span>
                  <span className="text-[#944129] text-xl font-mono group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-sm leading-8 text-[#3D5249]">{f.answer[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
