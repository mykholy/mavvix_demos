import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Gauge,
  ShieldCheck,
  Wrench,
  ScanSearch,
  Activity,
  CalendarCheck2,
  ClipboardCheck,
  CarFront,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Disc3,
  Settings2,
  FileSearch,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { AUTO_SERVICE, autoPath, localized, AUTO_HERO_LOCAL } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';
import { AutoServiceDiagnosticCalibrator } from './AutoServiceDiagnosticCalibrator';
import { AutoServiceWorkshopStandards } from './AutoServiceWorkshopStandards';
import { AutoServiceVisualAtelier } from './AutoServiceVisualAtelier';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;
  const ar = params.locale === 'ar';
  const title = ar
    ? 'موقع مركز صيانة وتشخيص سيارات متكامل | تجربة Apex Auto Care من مافكس'
    : 'Automotive Diagnostic & Service Website | Apex Auto Care Experience by Mavvix';
  const description = ar
    ? 'استكشف منصة صيانة سيارات متطورة تجمع بين الفحص الحاسوبي والفيزيائي المنهجي، معاير الأعطال، ومسارات صيانة شفافة بلا تخمين عشوائي.'
    : 'Explore a premium automotive engineering website with root-cause diagnostic workflows, component calibrators, and transparent manufacturer-grade service journeys.';
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function AutoServiceHome(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const services = AUTO_SERVICE.services;
  const faq = AUTO_SERVICE.faq;
  const articles = AUTO_SERVICE.articles;

  const stages = ar
    ? [
        ['01', 'تسجيل الملاحظة الدقيقة', 'تدوين موديل السيارة وظروف ظهور العطل وسرعة القيادة بدل التخمين العشوائي للقطعة.'],
        ['02', 'تحديد نطاق الفحص الحاسوبي والفيزيائي', 'الفني المختص يحدد الاختبارات الميكانيكية والهيدروليكية المطلوبة قبل فتح أي مسمار.'],
        ['03', 'اعتماد بنود وتكلفة الإصلاح كتابةً', 'توضيح القطع المطلوبة (أصلي/معتمد) وفروق الأسعار والضمان ووقت التسليم المسبق.'],
        ['04', 'تسليم السيارة وتوثيق السجل الرقمي', 'معاينة القطع القديمة واستلام سجل صيانة رقمي معتمد يحفظ تاريخ السيارة وقيمتها السوقية.']
      ]
    : [
        ['01', 'Capture Observation & Telemetry', 'Record model, operating conditions, and vehicle speed instead of guessing the damaged part.'],
        ['02', 'Scope Physical & OBD Triage', 'Certified technician conducts live telemetry and physical micrometer checks prior to teardown.'],
        ['03', 'Approve Itemized Written Scope', 'Clear separation of labor hours, parts options, warranties, and guaranteed completion windows.'],
        ['04', 'Document Digital Service Passport', 'Inspect replaced worn parts and retain an auditable digital maintenance history for future value.']
      ];

  return (
    <div className="bg-[#0F141C] text-white min-h-screen">
      {/* 01 - Editorial Hero */}
      <section
        data-sector-specific="hero"
        className="relative bg-[#0F141C] overflow-hidden text-white border-b border-[#1E2736]"
      >
        <div className="absolute inset-0 lg:start-[40%] opacity-40 lg:opacity-60">
          <Image
            src={AUTO_HERO_LOCAL}
            alt={
              ar
                ? 'فحص ميكانيكي دقيق لحجرة المحرك والأنظمة الميكانيكية في مركز صيانة متطور'
                : 'Precision mechanical diagnostics of engine bay and powertrain in modern service center'
            }
            fill
            priority
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F141C] via-[#0F141C]/95 to-transparent"
          style={ar ? { transform: 'scaleX(-1)' } : {}}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-32 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171E29] border border-[#2A3649] text-xs font-bold text-[#F95721] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F95721] animate-pulse" />
              <span>APEX AUTO CARE · PRECISION WORKSHOP BLUEPRINT</span>
            </div>

            <h1 className="font-black text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.08] tracking-tight">
              {ar ? (
                <>
                  مش كل عطل <span className="text-[#F95721]">محتاج تغيير قطعة.</span>
                </>
              ) : (
                <>
                  ENGINEER THE <span className="text-[#F95721]">RIGHT REPAIR.</span>
                </>
              )}
            </h1>

            <p className="text-[#CBD5E1] text-base sm:text-lg leading-8 mt-6 max-w-2xl">
              {ar
                ? 'اعرف الفرق الجوهري بين العرض والسبب. اختر موديل سيارتك، افحص كود التحذير بمنهجية هندسية، وجرّب تقديم طلب صيانة شفاف من أول خطوة.'
                : 'Understand the critical demarcation between symptom and mechanical cause. Explore component dossiers, configure vehicle parameters, and initiate a structured service enquiry.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={autoPath(locale, 'booking')}
                className="bg-[#F95721] text-black rounded-xl px-8 py-4 font-black text-sm inline-flex gap-3 items-center hover:bg-[#FF7A45] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>{ar ? 'ابدأ طلب فحص منظم' : 'Start Structured Inspection'}</span>
                <Arrow size={18} />
              </Link>
              <Link
                href={autoPath(locale, 'services')}
                className="rounded-xl border border-[#37475E] bg-[#171E29] text-white px-7 py-4 font-bold text-sm hover:bg-[#1E2736] hover:border-[#F95721] transition-all focus-visible:outline-2 focus-visible:outline-white"
              >
                {ar ? 'تصفح مسارات الفحص' : 'Browse Service Dossiers'}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-xs font-semibold text-[#94A3B8]">
              <span className="inline-flex items-center gap-2">
                <ScanSearch size={18} className="text-[#F95721]" />
                {ar ? 'تشخيص جذري لا تخميني' : 'Root-cause diagnostic triage'}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#F95721]" />
                {ar ? 'مطابقة مواصفات المصنع' : 'Exact OEM specification match'}
              </span>
              <span className="inline-flex items-center gap-2">
                <ClipboardCheck size={18} className="text-[#F95721]" />
                {ar ? 'طلب مرجعي موثق' : 'Traceable request receipt'}
              </span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[2.5rem] bg-[#171E29]/95 border border-[#2A3649] backdrop-blur-xl p-8 max-w-sm ms-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#2A3649]">
                <p className="text-[11px] uppercase tracking-[.22em] text-[#F95721] font-black">
                  {ar ? 'بطاقة الفحص المرجعي' : 'VEHICLE INTAKE PASSPORT'}
                </p>
                <span className="text-[10px] font-mono bg-[#0F141C] text-[#CBD5E1] px-2 py-0.5 rounded border border-[#2A3649]">
                  ISO 9001
                </span>
              </div>

              <div className="my-6 border-y border-dashed border-[#2A3649] py-5 flex justify-between items-center">
                <CarFront size={56} strokeWidth={1.2} className="text-[#94A3B8]" />
                <Gauge size={48} strokeWidth={1.2} className="text-[#F95721]" />
              </div>

              <div className="text-xs space-y-4 font-medium">
                {[
                  ['01', ar ? 'بيانات الطراز والمحرك' : 'Engine & Model Telemetry'],
                  ['02', ar ? 'تحليل الأعراض والحساسات' : 'Symptom & Sensor Triage'],
                  ['03', ar ? 'الفحص الميكانيكي تحت الحمل' : 'Under-Load Physical Check'],
                  ['04', ar ? 'اعتماد النطاق كتابةً' : 'Itemized Client Sign-Off']
                ].map(([n, t]) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="text-[#F95721] font-mono font-bold">{n}</span>
                    <span className="text-[#E2E8F0]">{t}</span>
                    <CheckCircle2 size={16} className="ms-auto text-[#CBD5E1]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 - Symptom-Led Signal Reading */}
      <section
        data-sector-specific="symptoms"
        className="bg-[#F95721] text-black py-12 sm:py-16"
      >
        <div className="max-w-7xl px-5 sm:px-8 mx-auto grid lg:grid-cols-[.75fr_1.25fr] items-center gap-10">
          <div>
            <p className="text-xs font-black tracking-widest uppercase">READ THE SIGNAL</p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 leading-tight">
              {ar ? 'السيارة ترسل إشارات. لنفهمها أولاً.' : 'Observe the signal, then investigate.'}
            </h2>
            <p className="text-xs sm:text-sm font-medium mt-2 leading-6 text-black/80">
              {ar
                ? 'فهم الأعراض بدقة يختصر ٨٠٪ من وقت الفحص ويمنع استبدال أجزاء سليمة.'
                : 'Precise symptom observation prevents unnecessary part replacements and guides targeted diagnostics.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              [
                ar ? 'اهتزاز مع الفرامل' : 'Vibration Under Braking',
                ar ? 'سجّل السرعة وحالة البدال ومستوى الرعشة' : 'Note speed, pedal feedback & steering shake'
              ],
              [
                ar ? 'صوت خبط فوق المطبات' : 'Chassis Clunk Over Bumps',
                ar ? 'حدد مكان وتوقيت الصوت وحالة المساعدين' : 'Locate front/rear origin and strut condition'
              ],
              [
                ar ? 'حرارة غير طبيعية' : 'Unusual Coolant Overheating',
                ar ? 'توقف بأمان فورًا ولا تفتح غطاء الردياتير' : 'Stop safely immediately; do not open radiator cap'
              ]
            ].map(([title, description]) => (
              <div
                key={title}
                className="p-5 rounded-2xl border-2 border-black/15 bg-white/20 backdrop-blur-sm"
              >
                <Activity size={26} className="text-black" />
                <h3 className="font-black text-sm mt-4 text-black">{title}</h3>
                <p className="text-xs leading-6 mt-2 text-black/80 font-medium">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 - Signature Component 1: Diagnostic Calibrator */}
      <AutoServiceDiagnosticCalibrator locale={locale} />

      {/* 04 - Service Dossiers Matrix */}
      <section
        data-sector-specific="repair-matrix"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 justify-between mb-12">
          <div>
            <p className="text-[#F95721] text-xs font-black tracking-widest uppercase">
              THE SERVICE MATRIX
            </p>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 text-white">
              {ar ? 'اعرف تفاصيل كل مسار قبل طلبه' : 'Know the work before you request it'}
            </h2>
            <p className="mt-4 text-sm text-[#94A3B8] max-w-2xl leading-8">
              {ar
                ? 'ثمانية مسارات تخصصية للفحص والصيانة الدورية، تتضمن شرحًا هندسيًا وتوجيهات دقيقة للتواصل مع الفني بثقة ووضوح.'
                : 'Eight distinct inspection and maintenance disciplines with practical engineering decision guides, not vague repair promises.'}
            </p>
          </div>
          <Link
            href={autoPath(locale, 'services')}
            className="inline-flex gap-2 items-center text-sm font-black text-[#F95721] hover:text-[#FF7A45] transition-colors"
          >
            <span>{ar ? 'عرض كافة المسارات التخصصية' : 'All service dossiers'}</span>
            <Arrow size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={autoPath(locale, 'services/' + s.slug)}
              className="group bg-[#171E29] rounded-2xl p-6 border border-[#2A3649] hover:border-[#F95721] hover:shadow-2xl transition-all min-h-[250px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-[#F95721] font-bold">
                    DISCIPLINE / {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#94A3B8] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
                <h3 className="text-lg font-black mt-5 leading-snug text-white">
                  {localized(s.title, locale)}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-6 mt-3">
                  {localized(s.summary, locale)}
                </p>
              </div>
              <span className="mt-5 pt-4 border-t border-[#2A3649] text-xs font-bold text-[#F95721] group-hover:text-[#FF7A45]">
                {ar ? 'قراءة ملف الفحص الفني' : 'Read engineering dossier'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 05 - Critical Safety Demarcation */}
      <section
        data-sector-specific="safety"
        className="bg-[#121822] text-white py-16 border-y border-[#1E2736]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0F141C] border border-[#37475E] flex items-center justify-center text-[#F95721] shrink-0">
            <AlertTriangle size={36} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {ar ? 'مؤشرات تحذيرية تستدعي التوقف الآمن الفوري' : 'Critical Warning Lights Warranting Immediate Safe Stop'}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#CBD5E1] max-w-3xl">
              {ar
                ? 'تحذير ضغط الزيت الأحمر، ارتفاع مؤشر حرارة المحرك فوق المعدل الطبيعي، أو هبوط بدال الفرامل المفاجئ علامات خطورة تتطلب التوقف في مكان آمن وعدم استكمال القيادة. دليل السيارة والفني الميداني هما المرجع المعتمد.'
                : 'Red engine oil pressure lamps, rapid coolant temperature spikes, or sudden hydraulic brake pedal collapse require safety-first decisions: stop in a safe zone and consult roadside recovery.'}
            </p>
          </div>
          <Link
            href={autoPath(locale, 'resources/warning-lights')}
            className="bg-[#171E29] border border-[#2A3649] text-[#F95721] hover:border-[#F95721] text-xs font-bold px-6 py-3.5 rounded-xl inline-flex gap-2 items-center transition-all"
          >
            <span>{ar ? 'دليل لمبات الطبلون' : 'Warning Guide'}</span>
            <Arrow size={16} />
          </Link>
        </div>
      </section>

      {/* 06 - Signature Component 2: Workshop Standards */}
      <AutoServiceWorkshopStandards locale={locale} />

      {/* 07 - Package Selection / Maintenance Paths */}
      <section
        data-sector-specific="maintenance-paths"
        className="bg-[#0F141C] py-20 sm:py-28 border-t border-[#1E2736]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 items-center">
            <div>
              <p className="text-[#F95721] text-xs font-black tracking-widest uppercase">
                SERVICE WITHOUT GUESSWORK
              </p>
              <h2 className="text-3xl sm:text-5xl font-black mt-4 text-white">
                {ar ? 'الصيانة الدورية ليست باقة واحدة لكل السيارات' : 'Maintenance is not one-size-fits-all'}
              </h2>
              <p className="text-[#94A3B8] mt-5 leading-8 text-sm">
                {ar
                  ? 'مواصفات السوائل والفلاتر ومواعيد التغيير تختلف باختلاف كود المحرك وسنة الصنع وظروف القيادة في الخليج ومصر. بدلاً من الأسعار الترويجية الوهمية، نساعدك على تجهيز بياناتك للحصول على نطاق واقعي.'
                  : 'Fluid grades, filter micron ratings, and change cycles vary by engine code, ambient heat, and driving intensity. Structured preparation yields dependable service.'}
              </p>
              <Link
                href={autoPath(locale, 'booking')}
                className="inline-flex gap-2 text-sm font-black bg-[#F95721] text-black rounded-xl px-7 py-4 mt-8 hover:bg-[#FF7A45] transition-colors"
              >
                <span>{ar ? 'طلب تقييم صيانة لسيارتك' : 'Request Maintenance Assessment'}</span>
                <Arrow size={17} />
              </Link>
            </div>
            <div className="grid gap-4">
              {[
                [
                  ar ? 'صيانة دورية وقائية' : 'Routine Preventive Service',
                  ar ? 'فحص الزيوت والفلاتر وتطابق اللزوجة مع عداد الكيلومترات' : 'OEM fluid viscosity match, filtration, and mileage cycles'
                ],
                [
                  ar ? 'فحص وتحقيق في عطل محدد' : 'Targeted Problem Investigation',
                  ar ? 'رصد دقيق للأعراض وفحص فيزيائي تحت ظروف القيادة' : 'Symptom logging, live telemetry, and road test replication'
                ],
                [
                  ar ? 'فحص شامل قبل الشراء' : 'Pre-Purchase Vehicle Audit',
                  ar ? 'فحص شامل للهيكل والمحرك والعفشة وأجهزة الأمان' : 'Comprehensive mechanical, safety, and chassis inspection'
                ]
              ].map(([title, desc], i) => (
                <div
                  key={title}
                  className="bg-[#171E29] border border-[#2A3649] rounded-2xl p-6 flex items-center gap-5 hover:border-[#F95721]/60 transition-colors"
                >
                  <span className="font-mono text-3xl font-black text-[#F95721]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-black text-base text-white">{title}</h3>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="ms-auto text-[#F95721] shrink-0" size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 08 - Vehicle Context & Brands */}
      <section
        data-sector-specific="vehicle-selection"
        className="bg-[#121822] py-16 sm:py-20 border-y border-[#1E2736]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-between items-end gap-5">
            <div>
              <p className="text-xs font-black text-[#F95721] tracking-widest uppercase">
                VEHICLE PROFILE CONTEXT
              </p>
              <h2 className="text-3xl font-black mt-2 text-white">
                {ar ? 'موديل السيارة يحدد معايير الفحص وكتالوج الصيانة' : 'Vehicle Context Dictates The Diagnostic Protocol'}
              </h2>
            </div>
            <Link
              href={autoPath(locale, 'booking')}
              className="inline-flex gap-2 font-bold text-xs text-[#F95721] hover:underline"
            >
              <span>{ar ? 'كيف تختار بيانات سيارتك بشكل صحيح؟' : 'How vehicle identification works'}</span>
              <Arrow size={16} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3">
            {AUTO_SERVICE.brands.map((brand) => (
              <div
                key={brand}
                className="bg-[#171E29] border border-[#2A3649] rounded-xl min-h-20 grid place-items-center text-sm font-black text-center px-3 text-[#E2E8F0] hover:border-[#F95721] transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
          <p className="text-xs text-[#CBD5E1] mt-5">
            {localized(AUTO_SERVICE.modelNote, locale)}
          </p>
        </div>
      </section>

      {/* 09 - 4-Stage Transparent Service Process */}
      <section
        data-sector-specific="service-process"
        className="py-20 sm:py-28 max-w-7xl px-5 sm:px-8 mx-auto"
      >
        <p className="text-[#F95721] text-xs tracking-widest font-black uppercase">
          THE SERVICE METHODOLOGY
        </p>
        <h2 className="text-3xl sm:text-5xl font-black mt-4 text-white">
          {ar ? 'من أول ملاحظة إلى سجل صيانة موثق' : 'From symptom to documented decision'}
        </h2>
        <div className="grid md:grid-cols-4 gap-5 mt-12">
          {stages.map(([n, t, d]) => (
            <div
              key={n}
              className="bg-[#171E29] border border-[#2A3649] text-white rounded-2xl p-6 min-h-64 flex flex-col justify-between"
            >
              <div>
                <span className="text-[#F95721] font-mono font-black text-4xl block">{n}</span>
                <h3 className="font-black text-base mt-6 text-white leading-snug">{t}</h3>
                <p className="text-xs text-[#94A3B8] leading-6 mt-3">{d}</p>
              </div>
              <span className="text-[10px] font-mono text-[#CBD5E1] pt-4 border-t border-[#2A3649]">
                STAGE {n}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={autoPath(locale, 'booking')}
            className="inline-flex gap-2 items-center text-[#F95721] font-black text-sm hover:underline"
          >
            <span>{ar ? 'اقرأ منهجية إدارة الطلب بالتفصيل' : 'Read full inspection process'}</span>
            <Arrow size={17} />
          </Link>
        </div>
      </section>

      {/* 10 - Editorial Image Story */}
      <section
        data-sector-specific="editorial-photo"
        className="bg-[#121822] text-white border-y border-[#1E2736]"
      >
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="relative min-h-[380px] lg:min-h-[560px] overflow-hidden bg-black">
            <Image
              src="/assets/portfolio/auto-service/mechanical_precision_service.webp"
              alt={
                ar
                  ? 'صورة تحريرية مرخصة لميكانيكي يفحص محرك سيارة بدقة واحترافية'
                  : 'Editorial photograph of certified mechanic conducting precision engine service'
              }
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 start-4 text-[10px] font-mono bg-black/80 px-3 py-1.5 rounded-lg border border-white/20 text-[#CBD5E1]">
              CC0 photo: Bembety · Wikimedia Commons · Editorial Showcase
            </div>
          </div>
          <div className="px-6 sm:px-14 py-16 lg:py-24 flex flex-col justify-center">
            <p className="text-[#F95721] text-xs tracking-[.22em] font-black uppercase">
              BEHIND THE WORKSHOP HOOD
            </p>
            <h2 className="text-3xl sm:text-5xl font-black mt-5 leading-tight text-white">
              {ar ? 'مشهد حقيقي. والقرار يبدأ بفحص دقيق.' : 'Real machinery. No invented repair claims.'}
            </h2>
            <p className="mt-6 text-[#94A3B8] leading-8 text-sm sm:text-base">
              {ar
                ? 'الصور المستخدمة في هذا الموقع من مصادر تصوير تحريرية مرخصة لبيان معايير العمل الهندسي المتخصص. الموقع نموذج عملي صممته مافكس ليوضح كيف يمكن لمركز الصيانة تقديم واجهة واضحة لعملائه، دون إيهام بوجود خدمات فورية.'
                : 'Genuine automotive photography illustrates the standard of specialized engineering care. This design showcase demonstrates how an automotive workshop can empower car owners with structured guidance and transparent scope.'}
            </p>
            <div className="mt-8">
              <Link
                href={autoPath(locale, 'booking')}
                className="inline-flex items-center gap-2 text-[#F95721] text-xs font-bold hover:underline"
              >
                <span>{ar ? 'طلب عرض نموذج مخصص لنشاطك' : 'Request custom workshop concept'}</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11 - Signature Component 3: Visual Atelier Gallery */}
      <AutoServiceVisualAtelier locale={locale} />

      {/* 12 - Editorial Learning Resources */}
      <section
        data-sector-specific="learning-resources"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28"
      >
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-black text-[#F95721] tracking-widest uppercase">
              FIELD NOTES & GUIDES
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-white">
              {ar ? 'معلومة دقيقة أفضل من تخمين مكلف' : 'Clear guidance beats expensive guessing'}
            </h2>
          </div>
          <Link
            href={autoPath(locale, 'resources')}
            className="text-xs font-bold text-[#F95721] hidden sm:inline-flex gap-2 items-center hover:underline"
          >
            <span>{ar ? 'عرض كافة المقالات' : 'View all resources'}</span>
            <Arrow size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <Link
              href={autoPath(locale, 'resources/' + a.slug)}
              key={a.slug}
              className="group bg-[#171E29] border border-[#2A3649] rounded-2xl p-7 hover:border-[#F95721] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#F95721] font-bold">
                  NOTE 0{i + 1}
                </span>
                <BookOpen size={28} className="text-[#94A3B8] group-hover:text-white mt-5" />
                <h3 className="font-black text-base mt-4 leading-snug text-white">
                  {localized(a.title, locale)}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-6 mt-3">
                  {localized(a.summary, locale)}
                </p>
              </div>
              <span className="inline-flex mt-6 gap-2 text-xs font-bold text-[#F95721] group-hover:text-[#FF7A45]">
                <span>{ar ? 'قراءة الدليل الفني' : 'Read technical guide'}</span>
                <Arrow size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 13 - FAQ Accordion */}
      <section
        data-sector-specific="buyer-questions"
        className="bg-[#121822] py-20 sm:py-28 border-t border-[#1E2736]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.75fr_1.25fr] gap-12">
          <div>
            <p className="font-mono text-[#F95721] text-xs font-bold uppercase tracking-wider">
              BUYER CHECKLIST
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-white">
              {ar ? 'أسئلة مهم معرفة إجابتها قبل زيارة مركز الصيانة' : 'Questions that matter before a workshop visit'}
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-[#94A3B8] leading-7">
              {ar
                ? 'إجابات شفافة تساعدك على حماية سيارتك وتجنب دفع تكاليف قطع غير ضرورية.'
                : 'Transparent answers designed to protect vehicle integrity and prevent unneeded expenditure.'}
            </p>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-[#171E29] p-6 border border-[#2A3649] open:border-[#F95721]/50 open:bg-[#1A2230] transition-colors"
              >
                <summary className="font-bold text-sm sm:text-base cursor-pointer text-white flex items-center justify-between">
                  <span>{localized(f.q, locale)}</span>
                  <span className="text-[#F95721] font-mono text-xs ms-3 shrink-0">
                    Q0{i + 1}
                  </span>
                </summary>
                <p className="mt-4 text-xs sm:text-sm leading-7 text-[#CBD5E1] pt-3 border-t border-[#2A3649]">
                  {localized(f.a, locale)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14 - Conversion CTA */}
      <section
        data-sector-specific="conversion"
        className="relative overflow-hidden bg-[#F95721] px-5 sm:px-8 py-20 sm:py-24 text-black"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="uppercase text-xs font-black tracking-widest text-black/80">
              MAVVIX / CUSTOM AUTOMOTIVE PLATFORMS
            </p>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 max-w-3xl leading-tight">
              {ar
                ? 'مركزك يحتاج موقعًا رقميًا يجعل العميل يطلب الخدمة الصحيحة بوضوح؟'
                : 'Want this level of clarity and engineering authority for your own workshop?'}
            </h2>
            <p className="text-sm mt-5 leading-8 max-w-2xl text-black/85 font-medium">
              {ar
                ? 'مافكس قادرة على تخصيص هذا النظام الرقمي الكامل لخدماتك الحقيقية وفروعك ومواعيدك، مع ربط نظام استقبال الطلبات بواتساب وإدارة الورشة.'
                : 'Mavvix crafts client-grade digital platforms tailored to your real automotive services, branch schedules, and customer intake pipelines.'}
            </p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            className="inline-flex gap-3 items-center bg-[#0F141C] text-white rounded-full px-9 py-5 font-black text-sm hover:bg-black transition-colors focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>{ar ? 'اطلب تنفيذ موقع مركزك الآن' : 'Discuss a Site For Your Workshop'}</span>
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    </div>
  );
}
