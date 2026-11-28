import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  UsersRound,
  Layers,
  Sparkles,
  ClipboardList,
  BookOpen,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { LUMA_EVENTS, lumaPath } from '@/lib/verticals/events/data';
import { LumaEventCalibrator } from './LumaEventCalibrator';
import { LumaProductionStandards } from './LumaProductionStandards';
import { LumaVisualAtelier } from './LumaVisualAtelier';

export default async function LumaHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const ar = locale === 'ar';
  const loc = locale as Locale;
  const d = LUMA_EVENTS;
  const hero = d.media[0];

  const wrap = 'mx-auto max-w-7xl px-5 sm:px-8';
  const label = 'text-xs font-bold tracking-[.18em] uppercase text-[#874F63]';
  const heading = 'mt-5 font-serif text-4xl sm:text-6xl font-medium leading-tight';
  const btn = 'inline-flex items-center gap-3 bg-[#291C2D] px-6 py-4 text-white font-bold text-sm hover:bg-[#874F63] transition-colors';

  const types = [
    {
      id: 'corporate',
      title: ar ? 'فعاليات الأعمال والقمم' : 'Corporate Summits',
      description: ar
        ? 'مؤتمرات ومعارض وإطلاق منتجات، من التسجيل الذكي إلى إدارة الجلسات المتزامنة.'
        : 'Conferences, trade exhibitions and product reveals, from registration to parallel breakout rooms.',
      icon: Layers
    },
    {
      id: 'social',
      title: ar ? 'المناسبات والاحتفالات الخاصة' : 'Banquets & Celebrations',
      description: ar
        ? 'حفلات زفاف واستقبال ومناسبات خاصة تراعي رحلة الضيف والخصوصية التامة.'
        : 'Weddings and private celebrations shaped around guest experience and complete privacy.',
      icon: Sparkles
    },
    {
      id: 'special',
      title: ar ? 'التجارب والإنتاج الميداني' : 'Special Formats & Staging',
      description: ar
        ? 'فعاليات مفتوحة وتنسيق الإنتاج الهندسي مع خطة طوارئ وتجهيز واضحة.'
        : 'Outdoor formats and structural production coordination with contingency planning.',
      icon: CalendarDays
    }
  ];

  return (
    <div>
      {/* 01. Hero Section */}
      <section
        data-sector-specific="event-production-editorial-hero"
        className="bg-[#291C2D] text-[#FCF7F1]"
      >
        <div className={wrap + ' grid gap-10 py-14 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:py-24'}>
          <div>
            <p className="text-[#DCB8A6] text-xs tracking-[.2em] font-bold">LUMA / INTENTION IN EVERY DETAIL</p>
            <h1 className="mt-7 font-serif text-[clamp(2.8rem,6.1vw,6.8rem)] font-medium leading-[1.08]">
              {ar ? (
                <>
                  لحظات تُصمم <em className="text-[#DCB8A6] not-italic">لتُتذكر.</em>
                </>
              ) : (
                <>
                  Make every <em className="text-[#DCB8A6] not-italic">moment matter.</em>
                </>
              )}
            </h1>
            <p className="mt-7 text-sm sm:text-base leading-9 text-[#ECDDD8]">
              {ar
                ? 'من أول فكرة لآخر لحظة، نجمع بين تجربة الضيوف، رقي المكان، ودقة الإنتاج الهندسي في فعاليات استثنائية لها هدف واضح.'
                : 'From the first brief to the final handover, unite guest experience, architectural venue staging, and technical production around one clear purpose.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={lumaPath(locale, 'experiences')}
                className="inline-flex items-center gap-3 bg-[#DCB8A6] text-[#291C2D] px-6 py-4 text-sm font-bold hover:bg-white transition-colors"
              >
                {ar ? 'استكشف الفعاليات' : 'Explore experiences'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href={lumaPath(locale, 'enquiry')}
                className="border border-[#DCB8A6] text-[#FCF7F1] px-6 py-4 text-sm font-bold hover:bg-[#DCB8A6] hover:text-[#291C2D] transition-colors"
              >
                {ar ? 'ابدأ التخطيط' : 'Start a brief'}
              </Link>
            </div>
          </div>
          <figure className="relative">
            <img
              src={hero.url}
              alt={hero.alt[locale]}
              loading="eager"
              className="h-[330px] sm:h-[520px] w-full object-cover border border-[#5A4650]"
            />
            <figcaption className="mt-3 text-xs leading-6 text-[#ECDDD8]">
              <a className="underline" href={hero.source} target="_blank" rel="noopener noreferrer">
                {hero.credit}
              </a>{' '}
              ·{' '}
              <a className="underline" href={hero.licenseUrl} target="_blank" rel="noopener noreferrer">
                {hero.license}
              </a>{' '}
              · {ar ? 'صورة تحريرية مستقلة، اقتصاص للعرض' : 'Independent editorial photograph, display crop'}
            </figcaption>
            <span className="absolute top-3 end-3 bg-[#FCF7F1] text-[#291C2D] px-4 py-2 text-xs font-bold font-mono">
              01 / EVENT ATMOSPHERE
            </span>
          </figure>
        </div>
      </section>

      {/* 02. Format Selector */}
      <section data-sector-specific="format-selector" className={wrap + ' py-20'}>
        <p className={label}>02 / THE RIGHT FORMAT</p>
        <h2 className={heading}>{ar ? 'كل مناسبة لها طبيعتها' : 'Every occasion has its rhythm'}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {types.map((t) => (
            <Link
              key={t.id}
              href={lumaPath(locale, 'experiences') + '?category=' + t.id}
              className="border-t-2 border-[#874F63] bg-[#F1E4DF] p-7 flex flex-col min-h-60 justify-between hover:shadow-md transition-shadow"
            >
              <t.icon size={32} className="text-[#874F63]" />
              <div>
                <h3 className="font-serif text-3xl mt-6 text-[#291C2D]">{t.title}</h3>
                <p className="mt-4 leading-8 text-sm text-[#5A4650]">{t.description}</p>
              </div>
              <ArrowUpRight size={20} className="mt-6 text-[#874F63]" />
            </Link>
          ))}
        </div>
      </section>

      {/* Signature 1: Event Production Calibrator */}
      <div data-sector-specific="luma-production-calibrator">
        <LumaEventCalibrator locale={loc} />
      </div>

      {/* 03. Experience Dossiers */}
      <section data-sector-specific="experience-dossiers" className="bg-[#F1E4DF] py-20">
        <div className={wrap}>
          <p className={label}>03 / EXPERIENCE DOSSIERS</p>
          <h2 className={heading}>{ar ? 'ثمانية أنواع من التجارب' : 'Eight distinct experiences'}</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {d.services.map((s) => (
              <Link
                key={s.slug}
                href={lumaPath(locale, 'experiences/' + s.slug)}
                className="group bg-[#FCF7F1] border border-[#D8C7C4] p-7 hover:border-[#874F63] transition-colors"
              >
                <div className="flex justify-between gap-3 text-xs font-bold text-[#874F63]">
                  <span>
                    {String(s.rank).padStart(2, '0')} / {s.category.toUpperCase()}
                  </span>
                  <ArrowUpRight size={20} />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-[#291C2D]">{s.title[locale]}</h3>
                <p className="mt-4 text-sm leading-8 text-[#5A4650]">{s.summary[locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Guest Journey */}
      <section data-sector-specific="guest-journey" className={wrap + ' py-20'}>
        <p className={label}>04 / THE GUEST JOURNEY</p>
        <h2 className={heading}>{ar ? 'من لحظة الوصول حتى الوداع' : 'From arrival to farewell'}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['وصول وتسجيل', 'Arrival and check-in'],
            ['استقبال وإرشاد', 'Welcome and wayfinding'],
            ['البرنامج والطعام', 'Programme and hospitality'],
            ['خروج وتسليم', 'Departure and handover']
          ].map(([a, e], i) => (
            <div key={e} className="border-b-2 border-[#874F63] p-6 bg-[#F1E4DF]">
              <p className="text-[#874F63] font-mono">0{i + 1}</p>
              <h3 className="font-serif text-2xl mt-5 text-[#291C2D]">{ar ? a : e}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Signature 2: Production Standards & Governance */}
      <div data-sector-specific="luma-production-standards">
        <LumaProductionStandards locale={loc} />
      </div>

      {/* Signature 3: Visual Staging Atelier */}
      <div data-sector-specific="luma-visual-atelier">
        <LumaVisualAtelier locale={loc} />
      </div>

      {/* 05. The Venue Brief */}
      <section data-sector-specific="venue-brief" className="bg-[#291C2D] py-20 text-[#FCF7F1]">
        <div className={wrap + ' grid gap-10 lg:grid-cols-[.8fr_1fr]'}>
          <div>
            <p className="text-[#DCB8A6] text-xs font-bold tracking-widest">05 / THE VENUE BRIEF</p>
            <h2 className={heading}>{ar ? 'المكان ليس مجرد قاعة' : 'A venue is more than a room'}</h2>
            <p className="mt-6 leading-9 text-[#ECDDD8]">
              {ar
                ? 'راجع السعة المعتمدة والمداخل وتوزيع الضيوف والطاقة واشتراطات المكان قبل التصميم.'
                : 'Confirm approved capacity, entrances, guest circulation, power and venue rules before committing to a layout.'}
            </p>
          </div>
          <div className="space-y-3">
            {[
              { Icon: MapPin, a: 'الموقع والوصول', e: 'Location and access' },
              { Icon: UsersRound, a: 'السعة والجلوس', e: 'Capacity and seating' },
              { Icon: ShieldCheck, a: 'التصاريح والسلامة', e: 'Permits and safety' }
            ].map(({ Icon, a, e }) => (
              <div key={e} className="border border-[#806D80] p-6 flex items-center gap-4 bg-[#38263D]">
                <Icon size={24} className="text-[#DCB8A6]" />
                <p className="font-bold">{ar ? a : e}</p>
              </div>
            ))}
            <Link
              href={lumaPath(locale, 'venue-brief')}
              className="inline-flex gap-3 underline mt-5 text-sm font-bold text-[#DCB8A6]"
            >
              {ar ? 'قائمة معاينة المكان' : 'Venue inspection checklist'}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 06. Production Phases */}
      <section data-sector-specific="production-phases" className={wrap + ' py-20'}>
        <p className={label}>06 / PRODUCTION MILESTONES</p>
        <h2 className={heading}>{ar ? 'الإنتاج وراء كل لحظة' : 'The work behind every moment'}</h2>
        <div className="mt-10 divide-y divide-[#D8C7C4] border-y border-[#D8C7C4]">
          {[
            [
              'المعاينة والاعتماد',
              'Inspection and approval',
              'تحديد المسؤوليات والموافقات',
              'Responsibilities and approvals'
            ],
            [
              'التجهيز والبروفة',
              'Setup and rehearsal',
              'تنسيق الموردين والبرنامج',
              'Vendor and programme coordination'
            ],
            [
              'التشغيل والتسليم',
              'Live operation and handover',
              'متابعة التنفيذ والتفكيك',
              'Delivery and breakdown'
            ]
          ].map(([a, e, ad, ed], i) => (
            <div key={e} className="grid gap-3 py-7 sm:grid-cols-[.18fr_1fr_1fr]">
              <span className="font-mono text-[#874F63]">0{i + 1}</span>
              <h3 className="font-serif text-3xl text-[#291C2D]">{ar ? a : e}</h3>
              <p className="text-sm leading-8 text-[#5A4650]">{ar ? ad : ed}</p>
            </div>
          ))}
        </div>
        <Link className={btn + ' mt-8'} href={lumaPath(locale, 'production')}>
          {ar ? 'خطة الإنتاج' : 'Production guide'}
          <ArrowUpRight size={18} />
        </Link>
      </section>

      {/* 07. Scope Comparison */}
      <section data-sector-specific="scope-comparison" className="bg-[#F1E4DF] py-20">
        <div className={wrap}>
          <p className={label}>07 / SCOPE BEFORE PRICE</p>
          <h2 className={heading}>{ar ? 'اتفق على النطاق قبل السعر' : 'Define scope before comparing prices'}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                title: ar ? 'أساسيات التخطيط' : 'Planning essentials',
                items: ar
                  ? ['هدف الفعالية ونوعها', 'عدد الضيوف والمكان', 'الجدول ومسؤوليات الفرق']
                  : ['Event objective and format', 'Guest count and venue', 'Timeline and team ownership']
              },
              {
                title: ar ? 'عناصر تحتاج تأكيداً' : 'Items requiring confirmation',
                items: ar
                  ? ['الموردون والسعة والأسعار', 'التصاريح والتجهيزات الفنية', 'شروط الإلغاء والتعديل']
                  : ['Suppliers, capacity and prices', 'Permits and technical setup', 'Cancellation and change terms']
              }
            ].map((x) => (
              <div key={x.title} className="bg-[#FCF7F1] border border-[#D8C7C4] p-8">
                <h3 className="font-serif text-3xl text-[#291C2D]">{x.title}</h3>
                {x.items.map((t) => (
                  <p key={t} className="flex gap-3 mt-5 text-sm leading-7 text-[#5A4650]">
                    <CheckCircle2 className="text-[#874F63] shrink-0" size={20} />
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. Event Brief Conversion */}
      <section data-sector-specific="event-brief-conversion" className={wrap + ' py-20'}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end border border-[#D8C7C4] p-8 sm:p-14 bg-[#FAF6F2]">
          <div>
            <ClipboardList className="text-[#874F63]" size={32} />
            <p className={label + ' mt-5'}>08 / YOUR EVENT BRIEF</p>
            <h2 className={heading}>{ar ? 'شاركنا تفاصيل الفعالية' : 'Shape your event brief'}</h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-[#5A4650]">
              {ar
                ? 'حدد نوع المناسبة ونطاق الضيوف والميزانية وحالة المكان. لا تُرسل قوائم الضيوف أو بيانات الدفع.'
                : 'Choose format, guest band, budget and venue status. Do not submit guest lists or payment information.'}
            </p>
          </div>
          <Link className={btn} href={lumaPath(locale, 'enquiry')}>
            {ar ? 'ابدأ الاستفسار' : 'Start an enquiry'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* 09. Field Notes / Guides */}
      <section data-sector-specific="event-guides" className={wrap + ' pb-20'}>
        <p className={label}>09 / FIELD NOTES</p>
        <h2 className={heading}>{ar ? 'اقرأ قبل التنفيذ' : 'Ideas worth planning for'}</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {d.articles.map((a) => (
            <Link
              key={a.slug}
              href={lumaPath(locale, 'guides/' + a.slug)}
              className="border border-[#D8C7C4] p-7 bg-[#FCF7F1] hover:border-[#874F63] transition-colors"
            >
              <BookOpen size={25} className="text-[#874F63]" />
              <h3 className="mt-5 font-serif text-3xl text-[#291C2D]">{a.title[locale]}</h3>
              <p className="mt-4 leading-8 text-sm text-[#5A4650]">{a.summary[locale]}</p>
              <ArrowUpRight className="mt-6 text-[#874F63]" size={20} />
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Common Questions FAQ */}
      <section data-sector-specific="event-enquiry-faq" className="bg-[#F1E4DF] py-20">
        <div className={wrap + ' grid gap-10 lg:grid-cols-[.6fr_1fr]'}>
          <div>
            <p className={label}>10 / COMMON QUESTIONS</p>
            <h2 className={heading}>{ar ? 'قبل الاتفاق' : 'Good to know'}</h2>
          </div>
          <div>
            {d.faq.map((f) => (
              <details key={f.question.en} className="border-b border-[#D8C7C4] py-6 group">
                <summary className="cursor-pointer font-bold leading-7 text-[#291C2D] hover:text-[#874F63] list-none flex items-center justify-between">
                  <span>{f.question[locale]}</span>
                  <span className="text-[#874F63] text-xl font-mono group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 leading-8 text-sm text-[#5A4650]">{f.answer[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
