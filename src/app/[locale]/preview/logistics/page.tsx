import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  Ship,
  Plane,
  Truck,
  Warehouse,
  Route,
  ClipboardCheck,
  PackageCheck,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { ROUTELINE, routeLinePath } from '@/lib/verticals/logistics/data';
import { RouteLineRouteCalibrator } from './RouteLineRouteCalibrator';
import { RouteLineFreightStandards } from './RouteLineFreightStandards';
import { RouteLineVisualAtelier } from './RouteLineVisualAtelier';

export default async function RouteLineHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const ar = locale === 'ar';
  const d = ROUTELINE;
  const hero = d.media[0];

  const wrap = 'mx-auto max-w-7xl px-5 sm:px-8';
  const label = 'text-xs font-mono font-bold tracking-[.18em] uppercase text-[#31566C]';
  const head = 'mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#102A3A]';
  const cta =
    'inline-flex items-center gap-3 bg-[#F3B43F] text-[#102A3A] px-6 py-4 text-sm font-black uppercase hover:bg-white transition-colors';

  const modes = [
    {
      id: 'ocean',
      Icon: Ship,
      a: 'شحن بحري',
      e: 'Ocean Freight',
      ad: 'حاويات كاملة (FCL) أو شحن مجمع (LCL) عبر الخطوط الملاحية المعتمدة.',
      ed: 'Dedicated FCL or consolidated LCL containers via scheduled liner vessels.'
    },
    {
      id: 'air',
      Icon: Plane,
      a: 'شحن جوي سريع',
      e: 'Air Cargo',
      ad: 'خدمات شحن جوي ذات أولوية للبضائع الحساسة للوقت وفق اشتراطات IATA.',
      ed: 'Priority and scheduled air connections with stringent cargo dimensional screening.'
    },
    {
      id: 'road',
      Icon: Truck,
      a: 'نقل بري دولي',
      e: 'Cross-Border Road',
      ad: 'شاحنات كاملة (FTL) وتوزيع إقليمي عبر المنافذ البرية مع مستندات TIR.',
      ed: 'Full truckloads and consolidated border-crossing routes with TIR transit carnets.'
    },
    {
      id: 'support',
      Icon: Warehouse,
      a: 'خدمات لوجستية وتخزين',
      e: 'Contract Logistics',
      ad: 'تخزين جمركي، فك وتجميع الشحنات، وإدارة مستودعية متكاملة ومؤمنة.',
      ed: 'Bonded warehousing, container cross-docking, and inventory staging hubs.'
    }
  ];

  return (
    <div className="bg-[#F5F3ED] text-[#102A3A] selection:bg-[#F3B43F] selection:text-[#102A3A]">
      {/* 01. Freight Terminal Hero */}
      <section data-sector-specific="freight-terminal-hero" className="bg-[#102A3A] text-white">
        <div className={wrap + ' grid gap-8 py-12 lg:py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-center'}>
          <div>
            <p className="text-xs font-mono font-bold tracking-[.2em] text-[#F3B43F]">
              ROUTELINE / MOVE WITH CLARITY
            </p>
            <h1 className="mt-6 font-black text-[clamp(2.7rem,5.4vw,6rem)] leading-[1.06] tracking-tight">
              {ar ? (
                <>
                  كل شحنة تجارية تبدأ{' '}
                  <span className="text-[#F3B43F]">بمسار واضح.</span>
                </>
              ) : (
                <>
                  Commercial clarity before{' '}
                  <span className="text-[#F3B43F]">cargo moves.</span>
                </>
              )}
            </h1>
            <p className="mt-6 leading-relaxed text-sm sm:text-base text-[#D8E3E8] max-w-xl">
              {ar
                ? 'حدد وسيلة النقل، المنشأ، الوجهة، ونطاق الخدمة بدقة. افهم متطلبات الناقلين والوثائق الجمركية قبل الالتزام بعقد الشحن.'
                : 'Define modality, origin, destination, weight ratios, and Incoterms scope. Understand regulatory and operational requirements before confirming a carrier quotation.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={routeLinePath(locale, 'quote')} className={cta}>
                {ar ? 'اطلب عرض شحن رسمي' : 'Request a freight quote'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href={routeLinePath(locale, 'tracking')}
                className="border border-[#AFC2CB] text-white hover:bg-white/10 px-6 py-4 font-bold text-sm transition-colors"
              >
                {ar ? 'فهم تتبع الشحنات' : 'Tracking explained'}
              </Link>
            </div>
          </div>

          <figure className="relative">
            <img
              src={hero.url}
              alt={hero.alt[locale]}
              className="w-full h-[300px] sm:h-[490px] object-cover border-2 border-[#31566C] shadow-lg"
              loading="eager"
            />
            <span className="absolute top-3 end-3 bg-[#F3B43F] text-[#102A3A] font-mono px-4 py-2 text-xs font-black tracking-wider">
              01 / SINGAPORE TERMINAL
            </span>
            <figcaption className="text-xs text-[#D8E3E8] mt-3 leading-6">
              <a href={hero.source} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#F3B43F]">
                {hero.credit} · CC0
              </a>{' '}
              · {ar ? 'صورة تحريرية مستقلة، اقتصاص للعرض' : 'Independent editorial photo, display crop'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02. Signature Component: RouteLineRouteCalibrator */}
      <div data-sector-specific="freight-corridor-calibrator">
        <RouteLineRouteCalibrator locale={locale} />
      </div>

      {/* 03. Mode Selector */}
      <section data-sector-specific="freight-mode-comparison" className={wrap + ' py-16 sm:py-20'}>
        <p className={label}>03 / MODE SELECTOR</p>
        <h2 className={head}>
          {ar ? 'وسيلة النقل تتبع طبيعة الشحنة' : 'Choose the mode around the cargo'}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modes.map((m) => (
            <Link
              key={m.id}
              href={routeLinePath(locale, 'services') + '?mode=' + m.id}
              className="bg-white border-2 border-[#B9C3C8] border-t-4 border-t-[#102A3A] p-7 hover:border-[#102A3A] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <m.Icon size={34} className="text-[#31566C] group-hover:text-[#F3B43F] transition-colors" />
                <h3 className="mt-5 font-black text-2xl text-[#102A3A]">{ar ? m.a : m.e}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A6472]">{ar ? m.ad : m.ed}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DDE6E9] flex items-center justify-between text-xs font-mono font-bold text-[#31566C]">
                <span>{ar ? 'استعراض النطاق' : 'Explore scope'}</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 04. Route & Scope */}
      <section data-sector-specific="route-and-scope" className="bg-[#DDE6E9] py-16 sm:py-20 border-y border-[#B9C3C8]">
        <div className={wrap + ' grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center'}>
          <div>
            <p className={label}>04 / ROUTE & SCOPE</p>
            <h2 className={head}>
              {ar ? 'من نقطة الاستلام إلى التسليم' : 'From pickup to final handover'}
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#31566C]">
              {ar
                ? 'حدد إن كان العرض من الباب إلى الباب (Door-to-Door) أو بين محطات الموانئ، وراجع مسؤولية كل مرحلة تشغيلية وتكاليف التخليص والمناولة قبل مقارنة الأسعار.'
                : 'Specify door-to-door or terminal-based scope, and clarify liability for every leg, customs clearance, and local drayage before evaluating carrier quotes.'}
            </p>
            <Link
              href={routeLinePath(locale, 'scope')}
              className="mt-6 inline-flex items-center gap-2 font-mono font-bold text-sm text-[#102A3A] hover:text-[#31566C] underline"
            >
              <span>{ar ? 'دليل مقارنة نطاق الشحن' : 'Compare Incoterms & freight scope'}</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="bg-[#102A3A] text-white p-6 sm:p-10 border-2 border-[#31566C] shadow-lg">
            <div className="grid gap-5 sm:grid-cols-3 items-center">
              {[
                { Icon: PackageCheck, a: 'استلام ومناولة', e: 'Origin Pickup' },
                { Icon: Route, a: 'نقل دولي مباشر', e: 'Main Transit' },
                { Icon: ClipboardCheck, a: 'تخليص وتسليم', e: 'Port Handover' }
              ].map(({ Icon, a, e }, i) => (
                <div key={e} className="relative border border-[#31566C] bg-[#153447] p-5 text-center">
                  <Icon size={28} className="mx-auto text-[#F3B43F]" />
                  <p className="mt-4 text-sm font-bold">{ar ? a : e}</p>
                  <span className="block mt-2 font-mono text-[#F3B43F] text-xs">Leg 0{i + 1}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#D8E3E8] text-center border-t border-[#31566C] pt-4">
              {ar
                ? 'مخطط توضيحي لمراحل تسلسل النقل التجاري، وليس مسار شحنة معينة.'
                : 'Illustrative commercial freight sequence, not a real-time consignment path.'}
            </p>
          </div>
        </div>
      </section>

      {/* 05. Freight Dossiers Catalogue */}
      <section data-sector-specific="service-catalogue" className={wrap + ' py-16 sm:py-24'}>
        <div className="max-w-2xl">
          <p className={label}>05 / FREIGHT DOSSIERS</p>
          <h2 className={head}>
            {ar ? 'ثمانية حلول ونطاقات شحن متخصصة' : 'Eight freight and support scopes'}
          </h2>
          <p className="mt-3 text-sm text-[#4A6472]">
            {ar
              ? 'ملفات شحن تجارية تفصل مواصفات الحاويات، أوزان الشحن الجوي، واشتراطات النقل البري والتخزين.'
              : 'Detailed freight dossiers specifying container dimensions, chargeable weight rules, and customs requirements.'}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {d.services.map((s) => (
            <Link
              key={s.slug}
              href={routeLinePath(locale, 'services/' + s.slug)}
              className="border-2 border-[#B9C3C8] bg-white p-7 hover:border-[#102A3A] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex justify-between items-center text-xs text-[#31566C] font-mono font-bold">
                  <span>RL / {String(s.rank).padStart(2, '0')} · {s.category.toUpperCase()}</span>
                  <ArrowUpRight size={18} className="text-[#102A3A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 text-2xl font-black text-[#102A3A] group-hover:text-[#31566C] transition-colors">
                  {s.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A6472]">
                  {s.summary[locale]}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DDE6E9] text-xs font-mono font-bold text-[#102A3A]">
                {ar ? 'قراءة ملف الخدمة الكامل' : 'Read full freight dossier'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 06. Signature Component: RouteLineFreightStandards */}
      <div data-sector-specific="freight-governance-standards">
        <RouteLineFreightStandards locale={locale} />
      </div>

      {/* 07. Operational Milestones */}
      <section data-sector-specific="freight-milestones" className="bg-[#102A3A] text-white py-16 sm:py-24">
        <div className={wrap}>
          <p className="text-xs font-mono font-bold tracking-widest text-[#F3B43F]">
            07 / OPERATIONAL MILESTONES
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {ar ? 'اعرف مراحل الشحن الحقيقية قبل التنفيذ' : 'Understand the stages before dispatch'}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { a: 'مراجعة النطاق والحمولة', e: 'Cargo & Scope Review', d: ar ? 'تدقيق الأبعاد والوزن ونوع التعبئة ومطابقة الحاوية.' : 'Verify dimensions, gross weight, and container suitability.' },
              { a: 'تأكيد حجز الناقل', e: 'Carrier Confirmation', d: ar ? 'إصدار إشعار الحجز وتأكيد الفراغ الملاحي أو الجوي.' : 'Booking note release and confirmed vessel space allotment.' },
              { a: 'الاستلام والعبور الدولي', e: 'Pickup & Main Transit', d: ar ? 'التحميل من المصنع وإتمام مناولة الميناء والرحلة.' : 'Origin dispatch, terminal clearance, and international haulage.' },
              { a: 'التخليص والتسليم الموثق', e: 'Clearance & Handover', d: ar ? 'الإفراج الجمركي والتسليم النهائي بإشعار استلام رسمي.' : 'Final customs release and authenticated POD delivery.' }
            ].map((step, i) => (
              <div key={step.e} className="border-t-4 border-[#F3B43F] bg-[#153447] border-x border-b border-[#31566C] p-6">
                <span className="text-[#F3B43F] font-mono font-bold text-sm">Stage 0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{ar ? step.a : step.e}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#AFC2CB]">{step.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 leading-relaxed text-[#D8E3E8] text-xs">
            {ar
              ? 'تنويه: هذه مراحل تشغيلية قياسية في سلاسل الإمداد، وليست أحداث شحن مسجلة أو مواعيد مضمونة لشحنة محددة.'
              : 'Notice: Standard operational milestone sequence, not live carrier telemetry or guaranteed arrival timestamps.'}
          </p>
        </div>
      </section>

      {/* 08. Signature Component: RouteLineVisualAtelier */}
      <div data-sector-specific="freight-visual-atelier">
        <RouteLineVisualAtelier locale={locale} />
      </div>

      {/* 09. Cost Components Comparison */}
      <section data-sector-specific="quote-components" className={wrap + ' py-16 sm:py-20'}>
        <p className={label}>09 / QUOTE COMPONENTS</p>
        <h2 className={head}>
          {ar ? 'قارن عناصر التكلفة وليس الرقم فقط' : 'Compare cost components, not just one number'}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { a: 'النقل الأساسي (Ocean/Air/Road)', e: 'Base Freight', d: ar ? 'أجرة النقل الدولي وفق مسار الرحلة والوزن الحجمي.' : 'Core international haulage based on corridor and chargeable weight.' },
            { a: 'المناولة الأرضية (THC)', e: 'Terminal Handling', d: ar ? 'رسوم الرافعات والأرصفة والمناولة في ميناء المنشأ والوصول.' : 'Quayside craneage, drayage, and container yard fees at both ports.' },
            { a: 'التخليص والرسوم الجمركية', e: 'Customs & Duties', d: ar ? 'إجراءات الفحص والبيان الجمركي والضرائب المطبقة.' : 'Documentation tariffs, tariff staging, and import tax processing.' },
            { a: 'التأمين البحري والإضافات', e: 'Cargo Insurance', d: ar ? 'تأمين شامل ضد مخاطر النقل وأعطال أجهزة التبريد.' : 'Marine cargo cover safeguarding against transit casualty and delay.' }
          ].map((item, i) => (
            <div key={item.e} className="border-2 border-[#B9C3C8] p-6 bg-white shadow-sm">
              <span className="font-mono text-sm font-bold text-[#31566C]">Component 0{i + 1}</span>
              <h3 className="mt-3 text-xl font-black text-[#102A3A]">{ar ? item.a : item.e}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4A6472]">{item.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-[#4A6472]">
          {ar
            ? 'لا يعرض هذا الموقع أسعاراً حية، وتتحدد بنود التكلفة الإجمالية بموجب اتفاق مكتوب صادر عن الناقل الفعلي.'
            : 'No live freight rates are published here; all tariff breakdowns require a formal written quotation from a licensed carrier.'}
        </p>
      </section>

      {/* 10. Reference ≠ Tracking Boundary */}
      <section data-sector-specific="tracking-boundary" className="bg-[#DDE6E9] py-16 border-y border-[#B9C3C8]">
        <div className={wrap + ' grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center'}>
          <div>
            <p className={label}>10 / REFERENCE ≠ TRACKING</p>
            <h2 className={head}>
              {ar ? 'مرجع الاستفسار ليس رقم تتبع شحنة' : 'An enquiry reference is not tracking'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#31566C] max-w-2xl">
              {ar
                ? 'لا نعرض بيانات تتبع وهمية أو تحركات افتراضية للبضائع. التتبع الحقيقي يتطلب تكاملاً مؤكداً مع خطوط الملاحة وأنظمة الطيران الجمركية المعتمدة.'
                : 'We publish zero simulated telemetry or fabricated GPS maps. Genuine cargo tracking requires authenticated carrier integration and authorized consignee verification.'}
            </p>
          </div>
          <Link href={routeLinePath(locale, 'tracking')} className={cta}>
            {ar ? 'فهم آلية التتبع الحقيقي' : 'Understand tracking'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* 11. Structured Freight Enquiry Banner */}
      <section data-sector-specific="freight-enquiry" className={wrap + ' py-16 sm:py-24'}>
        <div className="border-4 border-[#102A3A] bg-white p-8 sm:p-14 shadow-lg">
          <ShieldCheck size={36} className="text-[#31566C]" />
          <p className={label + ' mt-5'}>11 / BUILD YOUR FREIGHT BRIEF</p>
          <h2 className={head}>
            {ar ? 'حدد متطلبات شحنتك التجارية بدقة' : 'Build a structured commercial freight brief'}
          </h2>
          <p className="mt-4 leading-relaxed text-sm sm:text-base text-[#4A6472] max-w-2xl">
            {ar
              ? 'حدد وسيلة الشحن، بلد المنشأ والوجهة، نطاق الوزن وتاريخ التحميل المفضل. دون جمع مستندات بنكية حساسة أو طلب بيانات دفع.'
              : 'Choose service modality, origin and destination, volumetric weight band, and target dispatch date. Zero sensitive banking files or payment requests.'}
          </p>
          <Link href={routeLinePath(locale, 'quote')} className={cta + ' mt-8'}>
            {ar ? 'بدء طلب عرض السعر' : 'Start freight enquiry'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* 12. Freight Guides */}
      <section data-sector-specific="freight-guides" className={wrap + ' pb-16 sm:pb-24'}>
        <div className="max-w-2xl">
          <p className={label}>12 / FIELD GUIDES</p>
          <h2 className={head}>
            {ar ? 'أدلة الشحن التجاري وسلاسل الإمداد' : 'Freight field guides'}
          </h2>
          <p className="mt-3 text-sm text-[#4A6472]">
            {ar
              ? 'إرشادات عملية لفهم شروط التجارة، الوزن الحجمي، ومتطلبات الحاويات البحرية.'
              : 'Practical field guides clarifying Incoterms, volumetric density ratios, and container staging.'}
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {d.articles.map((a) => (
            <Link
              key={a.slug}
              href={routeLinePath(locale, 'guides/' + a.slug)}
              className="border-2 border-[#B9C3C8] bg-white p-7 hover:border-[#102A3A] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <BookOpen size={26} className="text-[#31566C]" />
                <h3 className="mt-5 text-xl font-black text-[#102A3A] group-hover:text-[#31566C] transition-colors">
                  {a.title[locale]}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#4A6472]">
                  {a.summary[locale]}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DDE6E9] text-xs font-mono font-bold text-[#102A3A] flex items-center justify-between">
                <span>{ar ? 'قراءة الدليل' : 'Read guide'}</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 13. FAQ */}
      <section data-sector-specific="freight-faq" className="bg-[#DDE6E9] py-16 sm:py-24 border-t border-[#B9C3C8]">
        <div className={wrap + ' grid gap-10 lg:grid-cols-[.6fr_1.4fr]'}>
          <div>
            <p className={label}>13 / FREIGHT QUESTIONS</p>
            <h2 className={head}>
              {ar ? 'أسئلة شائعة قبل شحن البضائع' : 'Frequently asked questions'}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#31566C]">
              {ar
                ? 'إجابات واضحة حول مسارات الشحن، قيود البضائع الخطرة، وحقيقة أرقام التتبع.'
                : 'Direct answers clarifying freight quotation limits, dangerous goods exclusions, and tracking realities.'}
            </p>
          </div>

          <div className="space-y-4">
            {d.faq.map((f, i) => (
              <details
                key={i}
                className="bg-white border-2 border-[#B9C3C8] p-5 open:shadow-sm transition-all"
              >
                <summary className="cursor-pointer font-bold text-sm text-[#102A3A] hover:text-[#31566C] flex items-center justify-between">
                  <span>{f.question[locale]}</span>
                </summary>
                <p className="mt-3 pt-3 border-t border-[#DDE6E9] text-xs leading-relaxed text-[#4A6472]">
                  {f.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
