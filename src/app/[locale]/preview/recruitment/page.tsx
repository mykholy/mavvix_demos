import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  UsersRound,
  Target,
  ClipboardCheck,
  ShieldCheck,
  Network,
  BookOpen
} from 'lucide-react';
import { TALENTYX, talentPath } from '@/lib/verticals/recruitment/data';
import TalentyxHeadcountCalibrator from './TalentyxHeadcountCalibrator';
import TalentyxEthicalStandards from './TalentyxEthicalStandards';
import TalentyxVisualAtelier from './TalentyxVisualAtelier';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();

  const ar = locale === 'ar';
  const d = TALENTYX;
  const wrap = 'max-w-7xl mx-auto px-5 sm:px-8';
  const label = 'text-xs font-bold tracking-widest uppercase text-[#3549A5]';
  const heading = 'mt-4 text-3xl sm:text-5xl font-black leading-tight tracking-tight';
  const cta =
    'inline-flex items-center gap-3 bg-[#3549A5] hover:bg-[#2A3A85] text-white px-6 py-4 font-bold text-sm rounded-lg transition-colors';

  const photo = (i: number) => {
    const m = d.media[i];
    return (
      <figure className="overflow-hidden rounded-2xl border border-[#D8DFED] bg-white shadow-sm">
        <img
          src={m.url}
          alt={m.alt[locale]}
          className={
            'w-full object-cover ' +
            (i === 0 ? 'h-[280px] sm:h-[470px]' : 'h-[220px] sm:h-[330px]')
          }
          loading={i === 0 ? 'eager' : 'lazy'}
        />
        <figcaption className="bg-[#17243E] text-white px-4 py-3 text-xs leading-6">
          <a href={m.creditUrl} className="underline">
            {m.credit}
          </a>{' '}
          ·{' '}
          <a href={m.source} className="underline">
            {ar ? 'المصدر' : 'Source'}
          </a>{' '}
          ·{' '}
          <a href={m.licenseUrl} className="underline">
            {m.license}
          </a>{' '}
          ·{' '}
          {ar
            ? 'صورة تحريرية مستقلة، اقتصاص للعرض'
            : 'Independent editorial image, display crop'}
        </figcaption>
      </figure>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        data-sector-specific="talent-hero"
        className={wrap + ' grid gap-9 lg:grid-cols-[.9fr_1.1fr] items-center py-14 lg:py-24'}
      >
        <div>
          <p className={label}>TALENTYX / PEOPLE & STRATEGY</p>
          <h1 className="mt-6 font-black text-[clamp(2.65rem,5.6vw,6rem)] leading-[1.1] tracking-tight">
            {ar ? (
              <>
                الاختيار يبدأ<span className="block text-[#3549A5]">بفهم الدور.</span>
              </>
            ) : (
              <>
                Better hiring<span className="block text-[#3549A5]">starts with clarity.</span>
              </>
            )}
          </h1>
          <p className="mt-6 text-lg leading-9 max-w-xl text-[#4E5D78]">
            {ar
              ? 'تجربة توظيف ترتكز على احتياجات الفرق والمهارات الفعلية، مع مسار مستقل للشركات والمرشحين.'
              : 'A recruitment experience built around team needs and job-relevant skills, with separate employer and candidate journeys.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={talentPath(locale, 'hiring-brief')} className={cta}>
              {ar ? 'حدد احتياج فريقك' : 'Define your hiring brief'}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href={talentPath(locale, 'roles')}
              className="border border-[#3549A5] text-[#3549A5] hover:bg-[#E8EEFF] px-6 py-4 rounded-lg inline-flex items-center font-bold text-sm transition-colors"
            >
              {ar ? 'استكشف الأدوار' : 'Explore roles'}
            </Link>
          </div>
        </div>
        {photo(0)}
      </section>

      {/* Two-Sided Journeys */}
      <section data-sector-specific="two-sided-journeys" className="bg-[#E8EEFF] py-14">
        <div className={wrap + ' grid gap-5 md:grid-cols-2'}>
          {[
            {
              Icon: BriefcaseBusiness,
              a: 'للشركات والمؤسسات',
              e: 'For Employers & Enterprises',
              ad: 'حدد نوع الخدمة والقطاع وعدد الأدوار المستهدفة والجدول الزمني المطلوب.',
              ed: 'Define service scope, sector, hiring volume and execution timing.',
              path: 'employers',
              ac: 'رحلة الشركات',
              ec: 'Employer journey'
            },
            {
              Icon: UsersRound,
              a: 'للكفاءات والمرشحين',
              e: 'For Candidates & Specialists',
              ad: 'استكشف أمثلة الأدوار وسجل تفضيلات التواصل المهني دون سيرة ذاتية.',
              ed: 'Explore illustrative role profiles and save contact interest without a CV.',
              path: 'candidates',
              ac: 'رحلة المرشحين',
              ec: 'Candidate journey'
            }
          ].map(({ Icon, a, e, ad, ed, path, ac, ec }) => (
            <article key={path} className="bg-white p-7 sm:p-9 rounded-2xl border border-[#D8DFED] shadow-sm">
              <Icon className="text-[#3549A5]" size={36} />
              <h2 className="mt-5 text-3xl font-black">{ar ? a : e}</h2>
              <p className="mt-4 leading-8 text-[#4E5D78]">{ar ? ad : ed}</p>
              <Link href={talentPath(locale, path)} className={cta + ' mt-6'}>
                {ar ? ac : ec}
                <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Signature Component 1: Headcount & Talent Capacity Calibrator */}
      <TalentyxHeadcountCalibrator locale={locale} />

      {/* Services Directory */}
      <section data-sector-specific="recruitment-services" className={wrap + ' py-16 sm:py-24'}>
        <p className={label}>01 / SERVICE DIRECTORY</p>
        <h2 className={heading}>{ar ? 'حلول للفرق في مراحل مختلفة' : 'Solutions for different team needs'}</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {d.services.map((s) => (
            <Link
              key={s.slug}
              href={talentPath(locale, 'services/' + s.slug)}
              className="rounded-xl bg-white border border-[#D8DFED] p-6 hover:border-[#3549A5] hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-[#3549A5]">
                  TX / {String(s.rank).padStart(2, '0')}
                </span>
                <ArrowUpRight size={20} className="text-[#334155]" />
              </div>
              <h3 className="mt-5 text-xl font-black">{s.title[locale]}</h3>
              <p className="mt-4 text-sm leading-8 text-[#4E5D78]">{s.summary[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Role Explorer */}
      <section data-sector-specific="role-explorer" className="bg-[#17243E] text-white py-16">
        <div className={wrap}>
          <p className="text-xs font-bold tracking-widest text-[#C6D4FF]">02 / ROLE PROFILES</p>
          <h2 className={heading}>{ar ? 'أمثلة على الأدوار والمهارات' : 'Explore role and skill profiles'}</h2>
          <p className="mt-5 text-sm leading-8 text-[#E8EEFF]">
            {ar
              ? 'ملفات توضيحية فقط — ليست وظائف شاغرة أو فرصاً متاحة.'
              : 'Illustrative profiles only — not live vacancies or available openings.'}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {d.roles.slice(0, 3).map((r) => (
              <Link
                key={r.slug}
                href={talentPath(locale, 'roles/' + r.slug)}
                className="p-7 rounded-xl border border-[#6F7FA7] hover:border-white transition-colors"
              >
                <span className="font-mono text-xs text-[#C6D4FF]">{r.sector.toUpperCase()}</span>
                <h3 className="mt-4 text-2xl font-black">{r.title[locale]}</h3>
                <p className="mt-4 text-sm leading-8 text-[#C4D0E5]">{r.skills[locale].join(' · ')}</p>
                <ArrowUpRight size={20} className="mt-5 text-[#C6D4FF]" />
              </Link>
            ))}
          </div>
          <Link
            href={talentPath(locale, 'roles')}
            className="mt-7 inline-flex gap-3 items-center bg-white hover:bg-slate-100 text-[#17243E] px-6 py-4 rounded-lg font-bold text-sm transition-colors"
          >
            {ar ? 'كل الأدوار التوضيحية' : 'All illustrative roles'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* Sector Focus */}
      <section data-sector-specific="sector-focus" className={wrap + ' py-16 grid gap-8 lg:grid-cols-2 items-center'}>
        <div>
          <p className={label}>03 / SECTOR FOCUS</p>
          <h2 className={heading}>{ar ? 'المهارات تختلف باختلاف القطاع' : 'Skills vary across sectors'}</h2>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ['technology', 'التقنية', 'Technology'],
              ['finance', 'المالية', 'Finance'],
              ['operations', 'العمليات', 'Operations'],
              ['commercial', 'الأعمال التجارية', 'Commercial'],
              ['people', 'الموارد البشرية', 'People']
            ].map(([s, a, e]) => (
              <Link
                key={s}
                href={talentPath(locale, 'roles') + '?sector=' + s}
                className="bg-[#E8EEFF] hover:bg-[#D6E2FF] px-4 py-3 rounded-lg text-sm font-bold text-[#3549A5] transition-colors"
              >
                {ar ? a : e}
              </Link>
            ))}
          </div>
          <p className="mt-5 leading-8 text-[#4E5D78]">
            {ar
              ? 'قارن المهارات والمسؤوليات دون افتراض وجود فرص توظيف حالية.'
              : 'Compare skills and responsibilities without assuming current job availability.'}
          </p>
        </div>
        {photo(1)}
      </section>

      {/* Selection Process */}
      <section data-sector-specific="selection-process" className="bg-[#E8EEFF] py-16">
        <div className={wrap}>
          <p className={label}>04 / SELECTION PATHWAY</p>
          <h2 className={heading}>{ar ? 'مراحل واضحة للاختيار' : 'A clear selection pathway'}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(ar
              ? ['تحديد الدور', 'بحث مرتبط بالمهارات', 'تقييم ومقابلات', 'مراجعة بشرية']
              : ['Define role', 'Skills-based sourcing', 'Assessment & interviews', 'Human review']
            ).map((x, i) => (
              <article key={x} className="rounded-xl bg-white p-6 border border-[#D8DFED] shadow-sm">
                <span className="font-mono text-3xl text-[#3549A5] font-black">0{i + 1}</span>
                <h3 className="mt-5 font-black text-xl">{x}</h3>
              </article>
            ))}
          </div>
          <Link className={cta + ' mt-7'} href={talentPath(locale, 'process')}>
            {ar ? 'رحلة الاختيار' : 'Selection pathway'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* Signature Component 2: Ethical Recruitment Standards */}
      <TalentyxEthicalStandards locale={locale} />

      {/* Signature Component 3: Visual Photographic Atelier */}
      <TalentyxVisualAtelier locale={locale} />

      {/* Employer Brief Feature */}
      <section data-sector-specific="employer-brief" className={wrap + ' py-16 grid lg:grid-cols-[.85fr_1fr] gap-8'}>
        <div>
          <Target size={34} className="text-[#3549A5]" />
          <p className={label + ' mt-5'}>05 / HIRING BRIEF</p>
          <h2 className={heading}>{ar ? 'ابدأ بنطاق توظيف مفهوم' : 'Start with a clear hiring brief'}</h2>
          <p className="mt-5 leading-8 text-[#4E5D78]">
            {ar
              ? 'حدد القطاع ونوع الخدمة وحجم التوظيف والوقت المتوقع. لا نعد بمرشحين أو موعد تعيين.'
              : 'Define sector, service, hiring volume and timing. No candidate or placement promise.'}
          </p>
          <Link className={cta + ' mt-7'} href={talentPath(locale, 'hiring-brief')}>
            {ar ? 'حفظ طلب شركة' : 'Save employer brief'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="bg-white border border-[#D8DFED] p-7 rounded-xl space-y-5 shadow-sm">
          {(ar
            ? ['القطاع والدولة', 'نطاق خدمة التوظيف', 'عدد الأدوار التقريبي', 'الجدول الزمني المفضل']
            : ['Sector and country', 'Recruitment service scope', 'Approximate hiring volume', 'Preferred timeline']
          ).map((x) => (
            <p key={x} className="flex gap-3 text-sm font-bold leading-8 text-[#17243E]">
              <ClipboardCheck size={22} className="shrink-0 text-[#3549A5]" />
              {x}
            </p>
          ))}
        </div>
      </section>

      {/* Career Insights */}
      <section data-sector-specific="career-insights" className={wrap + ' py-16'}>
        <p className={label}>06 / PRACTICAL INSIGHTS</p>
        <h2 className={heading}>{ar ? 'أدلة للشركات والمرشحين' : 'Guidance for both sides'}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {d.articles.map((a) => (
            <Link
              key={a.slug}
              href={talentPath(locale, 'insights/' + a.slug)}
              className="bg-white border border-[#D8DFED] rounded-xl p-7 hover:border-[#3549A5] hover:shadow-sm transition-all"
            >
              <BookOpen className="text-[#3549A5]" size={24} />
              <h3 className="mt-5 text-xl font-black">{a.title[locale]}</h3>
              <p className="mt-4 text-sm leading-8 text-[#4E5D78]">{a.summary[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recruitment FAQ */}
      <section data-sector-specific="recruitment-faq" className="bg-[#E8EEFF] py-16">
        <div className={wrap + ' grid lg:grid-cols-[.6fr_1fr] gap-8'}>
          <div>
            <p className={label}>07 / QUESTIONS</p>
            <h2 className={heading}>{ar ? 'قبل التواصل' : 'Before you enquire'}</h2>
          </div>
          <div>
            {d.faq.map((f) => (
              <details key={f.question.en} className="border-b border-[#B7C4DF] py-5">
                <summary className="cursor-pointer font-bold leading-7 text-[#17243E]">{f.question[locale]}</summary>
                <p className="mt-4 text-sm leading-8 text-[#4E5D78]">{f.answer[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Conversion CTA */}
      <section data-sector-specific="dual-conversion" className={wrap + ' py-16'}>
        <div className="bg-[#3549A5] text-white rounded-2xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-3xl sm:text-5xl font-black">{ar ? 'ابدأ من المسار المناسب لك' : 'Start on the right path'}</h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={talentPath(locale, 'hiring-brief')}
              className="bg-white hover:bg-slate-100 text-[#17243E] rounded-lg px-6 py-4 inline-flex gap-3 font-bold text-sm transition-colors"
            >
              {ar ? 'أنا أمثل شركة' : 'I represent an employer'}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href={talentPath(locale, 'career-interest')}
              className="border border-white hover:bg-white/10 rounded-lg px-6 py-4 inline-flex gap-3 font-bold text-sm transition-colors"
            >
              {ar ? 'أستكشف مساري المهني' : 'I am exploring a career'}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
