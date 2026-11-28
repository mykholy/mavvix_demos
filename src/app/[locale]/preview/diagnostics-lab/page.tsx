import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  FlaskConical,
  Microscope,
  TestTube2,
  ShieldCheck,
  FileLock2,
  ClipboardList,
  House,
  BookOpen,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { CLEARPATH, clearPath } from '@/lib/verticals/diagnostics-lab/data';
import { ClearPathTestCalibrator } from './ClearPathTestCalibrator';
import { ClearPathClinicalGovernance } from './ClearPathClinicalGovernance';
import { ClearPathVisualAtelier } from './ClearPathVisualAtelier';

export default async function ClearHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const ar = locale === 'ar',
    d = CLEARPATH,
    hero = d.media[1],
    analyzer = d.media[0];
  const wrap = 'mx-auto max-w-7xl px-5 sm:px-8',
    label = 'text-xs font-bold tracking-[.16em] uppercase text-[#126B8A]',
    head = 'mt-4 text-3xl sm:text-5xl font-black leading-tight tracking-tight text-[#12334A]';
  const btn =
    'inline-flex items-center gap-3 rounded-lg bg-[#126B8A] px-6 py-4 text-white font-bold text-sm hover:bg-[#12334A] transition-colors';
  const quick = [
    { Icon: FlaskConical, a: 'أقسام المعمل', e: 'Lab directory', to: 'services' },
    { Icon: ClipboardList, a: 'قبل الزيارة', e: 'Before your visit', to: 'visit' },
    { Icon: House, a: 'الزيارة المنزلية', e: 'Home collection', to: 'home-collection' },
    { Icon: FileLock2, a: 'خصوصية التقارير', e: 'Report access', to: 'results' }
  ];

  return (
    <div>
      {/* 01: Hero Section */}
      <section
        data-sector-specific="diagnostic-access-hero"
        className="bg-[#E7F4F6] border-b border-[#C9DDE3]"
      >
        <div
          className={
            wrap +
            ' grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center py-14 lg:py-20'
          }
        >
          <div>
            <p className={label}>CLEARPATH / LABORATORY INFORMATION</p>
            <h1 className="mt-6 text-[clamp(2.7rem,5.4vw,6rem)] font-black tracking-tight leading-[1.09] text-[#12334A]">
              {ar ? (
                <>
                  فهم أوضح.
                  <span className="block text-[#126B8A]">خطوة أكثر ثقة.</span>
                </>
              ) : (
                <>
                  Clarity first.
                  <span className="block text-[#126B8A]">Care follows.</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl leading-9 text-[#1E293B] text-base">
              {ar
                ? 'استكشف أقسام المعمل، وأسئلة التحضير للزيارة، وكيف تُدار التقارير بخصوصية. المعلومات الطبية الفردية تبقى مع مقدم الرعاية الفعلي.'
                : 'Explore laboratory disciplines, questions before a visit and private report pathways. Individual medical information belongs with your actual healthcare provider.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={clearPath(locale, 'services')} className={btn}>
                {ar ? 'استكشف الأقسام' : 'Explore directory'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href={clearPath(locale, 'contact')}
                className="inline-flex items-center rounded-lg border border-[#126B8A] bg-white px-6 py-4 text-sm font-bold text-[#126B8A] hover:bg-[#126B8A] hover:text-white transition-colors"
              >
                {ar ? 'طلب تواصل إداري' : 'Request a callback'}
              </Link>
            </div>
          </div>
          <figure className="bg-white rounded-[1.5rem] p-3 border border-[#C9DDE3]">
            <img
              src={hero.url}
              alt={hero.alt[locale]}
              className="w-full h-[280px] sm:h-[430px] object-cover rounded-xl"
              loading="eager"
            />
            <figcaption className="px-2 py-3 text-xs leading-6 text-[#1E293B]">
              <a className="underline font-bold" href={hero.source}>
                {hero.credit}
              </a>{' '}
              ·{' '}
              <a className="underline font-bold" href={hero.licenseUrl}>
                {hero.license}
              </a>{' '}
              ·{' '}
              {ar
                ? 'صورة علمية تحريرية مستقلة، اقتصاص للعرض'
                : 'Independent scientific editorial photo, display crop'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02: Quick Directory Access */}
      <section data-sector-specific="patient-access-directory" className={wrap + ' py-12'}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map(({ Icon, a, e, to }) => (
            <Link
              key={to}
              href={clearPath(locale, to)}
              className="group rounded-xl border border-[#C9DDE3] bg-white p-5 flex items-center gap-4 hover:border-[#126B8A] transition-colors"
            >
              <Icon size={28} className="text-[#126B8A] shrink-0" />
              <h2 className="text-sm font-bold text-[#12334A] flex-1">{ar ? a : e}</h2>
              <ArrowUpRight size={17} className="shrink-0 text-[#126B8A]" />
            </Link>
          ))}
        </div>
      </section>

      {/* 03: Signature Component: Test & Fasting Calibrator */}
      <ClearPathTestCalibrator locale={locale} />

      {/* 04: Clinical Discipline Catalogue */}
      <section data-sector-specific="clinical-discipline-catalogue" className={wrap + ' py-16'}>
        <p className={label}>01 / INFORMATION DIRECTORY</p>
        <h2 className={head}>
          {ar ? 'أقسام مختلفة. دور واضح لكل قسم.' : 'Different disciplines, clear roles.'}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-[#334155]">
          {ar
            ? 'تعريف بالمجالات المعملية وليس توصية باختيار اختبار أو ادعاء توافره.'
            : 'An educational directory, not a test recommendation or availability claim.'}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {d.services.map((s) => (
            <Link
              key={s.slug}
              href={clearPath(locale, 'services/' + s.slug)}
              className="rounded-xl border border-[#C9DDE3] bg-white p-6 hover:border-[#126B8A] transition-colors"
            >
              <div className="flex justify-between gap-3 items-center">
                <span className="font-mono text-xs font-bold text-[#126B8A]">
                  CP / {String(s.rank).padStart(2, '0')}
                </span>
                <ArrowUpRight size={19} className="text-[#12334A]" />
              </div>
              <h3 className="mt-5 font-black text-xl text-[#12334A]">{s.title[locale]}</h3>
              <p className="mt-4 text-sm leading-7 text-[#334155]">{s.summary[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 05: Signature Component: Clinical Quality & Governance Standards */}
      <ClearPathClinicalGovernance locale={locale} />

      {/* 06: Specimen to Report Pathway */}
      <section data-sector-specific="specimen-to-report" className="bg-[#12334A] text-white py-16">
        <div className={wrap}>
          <p className="text-xs tracking-widest text-[#38BDF8] font-bold uppercase">
            02 / THE LABORATORY JOURNEY
          </p>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
            {ar ? 'من طلب الخدمة إلى التقرير الخاص' : 'From a service request to a private report'}
          </h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: ClipboardList, a: 'تأكيد الطلب', e: 'Confirm request' },
              { Icon: TestTube2, a: 'جمع العينة وفق التعليمات', e: 'Provider-led collection' },
              { Icon: Microscope, a: 'معالجة وفحص معتمد', e: 'Laboratory processing' },
              { Icon: FileLock2, a: 'تسليم تقرير آمن', e: 'Secure report delivery' }
            ].map(({ Icon, a, e }, i) => (
              <div
                key={e}
                className="border border-[#275B80] rounded-lg bg-[#1A4562] p-6 flex flex-col justify-between"
              >
                <div>
                  <Icon size={28} className="text-[#38BDF8]" />
                  <p className="mt-4 font-mono text-xs text-[#38BDF8]">0{i + 1}</p>
                  <h3 className="mt-3 font-bold text-lg text-white">{ar ? a : e}</h3>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-8 text-[#E0F2FE]">
            {ar
              ? 'مراحل عامة توضيحية، وليست حالة عينة أو تقرير حقيقي.'
              : 'General illustrative stages, not a live sample status or report.'}
          </p>
        </div>
      </section>

      {/* 07: Preparation Checklist */}
      <section
        data-sector-specific="preparation-checklist"
        className={wrap + ' py-16 grid gap-9 lg:grid-cols-[.8fr_1fr] lg:items-start'}
      >
        <div>
          <p className={label}>03 / BEFORE YOUR VISIT</p>
          <h2 className={head}>{ar ? 'اسأل المعمل قبل التحضير' : 'Ask before preparing'}</h2>
          <p className="mt-5 leading-8 text-[#334155]">
            {ar
              ? 'تختلف التعليمات باختلاف الاختبار وحالة الشخص. لا تعتمد على تعليمات صيام أو تغيير دواء من صفحة عامة.'
              : 'Preparation varies by test and individual circumstances. Never rely on a generic page to fast or change medication.'}
          </p>
          <Link href={clearPath(locale, 'visit')} className={btn + ' mt-6'}>
            {ar ? 'أسئلة قبل الزيارة' : 'Visit checklist'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="rounded-xl bg-[#E7F4F6] p-6 sm:p-8 space-y-5 border border-[#B8DCE2]">
          {(ar
            ? [
                'هل الخدمة متاحة في الفرع الحقيقي؟',
                'ما تعليمات التحضير الخاصة بالاختبار؟',
                'كيف أستلم التقرير وأراجعه مع المختص؟'
              ]
            : [
                'Is the service offered at the actual location?',
                'What test-specific preparation is required?',
                'How do I receive and review the report with a clinician?'
              ]
          ).map((x) => (
            <p key={x} className="flex gap-3 text-sm font-bold leading-8 text-[#12334A]">
              <CheckCircle2 size={22} className="shrink-0 text-[#126B8A]" />
              {x}
            </p>
          ))}
        </div>
      </section>

      {/* 08: Home Collection Coordination */}
      <section data-sector-specific="home-collection-coordination" className="bg-[#E7F4F6] py-16">
        <div className={wrap + ' grid gap-8 lg:grid-cols-2 lg:items-center'}>
          <figure className="rounded-xl border border-[#C9DDE3] bg-white p-3">
            <img
              src={analyzer.url}
              alt={analyzer.alt[locale]}
              className="w-full max-h-[340px] object-contain"
              loading="lazy"
            />
            <figcaption className="px-2 py-3 text-xs leading-6 text-[#1E293B]">
              <a href={analyzer.source} className="underline font-bold">
                {analyzer.credit}
              </a>{' '}
              ·{' '}
              <a href={analyzer.licenseUrl} className="underline font-bold">
                {analyzer.license}
              </a>{' '}
              ·{' '}
              {ar
                ? 'جهاز كيمياء سريرية آلي مستقل'
                : 'Automated clinical chemistry analyzer'}
            </figcaption>
          </figure>
          <div>
            <p className={label}>04 / ACCESS AND COLLECTION</p>
            <h2 className={head}>
              {ar ? 'الزيارة المنزلية تحتاج تنسيقاً' : 'Home collection requires coordination'}
            </h2>
            <p className="mt-5 leading-8 text-[#334155]">
              {ar
                ? 'أكد التغطية والموعد وطريقة جمع العينة مع المعمل الفعلي. لا تُدخل عنوان منزلك أو تفاصيل التحاليل في هذا الموقع.'
                : 'Confirm service coverage, scheduling and collection with the actual lab. Do not enter your home address or test details here.'}
            </p>
            <Link href={clearPath(locale, 'home-collection')} className={btn + ' mt-6'}>
              {ar ? 'اعرف ما يجب سؤاله' : 'Collection questions'}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 09: Signature Component: Photographic Archive & Provenance */}
      <ClearPathVisualAtelier locale={locale} />

      {/* 10: Private Report Boundary */}
      <section data-sector-specific="secure-report-boundary" className={wrap + ' py-16'}>
        <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center border-2 border-[#126B8A] rounded-2xl p-7 sm:p-12 bg-white">
          <div>
            <FileLock2 className="text-[#126B8A]" size={36} />
            <p className={label + ' mt-5'}>05 / PRIVATE REPORTS</p>
            <h2 className={head}>
              {ar ? 'التقرير الطبي ليس رابطاً عاماً' : 'A medical report is not a public link'}
            </h2>
            <p className="mt-5 leading-8 text-[#334155]">
              {ar
                ? 'لا توجد هنا بوابة نتائج حقيقية. يجب توفير صلاحيات وصول آمنة والتحقق من الهوية لدى مقدم الخدمة الفعلي.'
                : 'There is no live result portal here. Secure authorization and identity verification belong with the actual provider.'}
            </p>
            <Link href={clearPath(locale, 'results')} className={btn + ' mt-6'}>
              {ar ? 'فهم خصوصية التقارير' : 'Understand report access'}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="bg-[#E7F4F6] rounded-xl p-6 border border-[#B8DCE2]">
            <ShieldCheck size={32} className="text-[#126B8A]" />
            <h3 className="mt-5 font-bold text-xl text-[#12334A]">
              {ar ? 'بيانات أقل، خصوصية أوضح' : 'Minimal data, clearer privacy'}
            </h3>
            <p className="mt-4 text-sm leading-8 text-[#334155]">
              {ar
                ? 'مرجع التواصل الإداري لا يكشف نتيجة أو اسم تحليل أو سجل مريض.'
                : 'A callback reference reveals no result, test name or patient record.'}
            </p>
          </div>
        </div>
      </section>

      {/* 11: Provider Coordination */}
      <section data-sector-specific="provider-coordination" className="bg-[#12334A] text-white py-16">
        <div className={wrap + ' flex flex-col lg:flex-row lg:items-center gap-8 justify-between'}>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase">
              06 / CLINIC & LAB COORDINATION
            </p>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              {ar ? 'التكامل الطبي يحتاج اتفاقاً واضحاً' : 'Clinical coordination needs clear agreements'}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#E0F2FE]">
              {ar
                ? 'حدد المسؤوليات وصلاحيات الوصول والخصوصية قبل أي تبادل فعلي للمعلومات.'
                : 'Establish responsibilities, authorization and privacy before exchanging any clinical information.'}
            </p>
          </div>
          <Link
            href={clearPath(locale, 'providers')}
            className="inline-flex items-center gap-3 shrink-0 rounded-lg bg-[#E7F4F6] text-[#12334A] hover:bg-white transition-colors px-6 py-4 text-sm font-bold"
          >
            {ar ? 'تنسيق المؤسسات' : 'Provider coordination'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* 12: Educational Guides */}
      <section data-sector-specific="educational-guides" className={wrap + ' py-16'}>
        <p className={label}>07 / CLEARPATH GUIDES</p>
        <h2 className={head}>
          {ar ? 'معلومات عملية قبل التواصل' : 'Practical questions, clearer access'}
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {d.articles.map((a) => (
            <Link
              key={a.slug}
              href={clearPath(locale, 'guides/' + a.slug)}
              className="rounded-xl border border-[#C9DDE3] bg-white p-6 hover:border-[#126B8A] transition-colors"
            >
              <BookOpen size={25} className="text-[#126B8A]" />
              <h3 className="mt-5 text-xl font-black text-[#12334A]">{a.title[locale]}</h3>
              <p className="mt-4 text-sm leading-7 text-[#334155]">{a.summary[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 13: Diagnostics FAQ */}
      <section data-sector-specific="diagnostics-faq" className="bg-[#E7F4F6] py-16">
        <div className={wrap + ' grid gap-8 lg:grid-cols-[.6fr_1fr]'}>
          <div>
            <p className={label}>08 / GOOD TO KNOW</p>
            <h2 className={head}>{ar ? 'أسئلة شائعة' : 'Frequently asked questions'}</h2>
          </div>
          <div>
            {d.faq.map((f) => (
              <details key={f.question.en} className="border-b border-[#B1CED6] py-5">
                <summary className="cursor-pointer font-bold leading-7 text-[#12334A]">
                  {f.question[locale]}
                </summary>
                <p className="mt-4 text-sm leading-8 text-[#334155]">{f.answer[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14: Final Callback CTA */}
      <section data-sector-specific="administrative-callback" className={wrap + ' py-16'}>
        <div className="flex flex-col lg:flex-row gap-7 lg:items-center justify-between rounded-2xl bg-[#12334A] p-8 sm:p-12 text-white">
          <div>
            <Phone className="text-[#38BDF8]" size={30} />
            <h2 className="mt-5 text-3xl sm:text-4xl font-black text-white">
              {ar ? 'تواصل إداري دون بيانات طبية' : 'Administrative contact without clinical data'}
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#E0F2FE]">
              {ar
                ? 'الاسم ورقم الهاتف والفترة المفضلة فقط. لا تشارك الأعراض أو التقارير أو معلومات الاختبارات.'
                : 'Name, phone and preferred callback window only. Never share symptoms, reports or test details.'}
            </p>
          </div>
          <Link
            href={clearPath(locale, 'contact')}
            className="inline-flex shrink-0 items-center gap-3 bg-[#E7F4F6] text-[#12334A] hover:bg-white transition-colors rounded-lg px-6 py-4 font-bold text-sm"
          >
            {ar ? 'طلب تواصل' : 'Request callback'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
