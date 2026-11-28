import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Boxes,
  Package,
  ShoppingBasket,
  ClipboardList,
  Truck,
  ShieldCheck,
  Handshake,
  BookOpen
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { TRADEBRIDGE, tradePath } from '@/lib/verticals/wholesale/data';
import { TradeBridgeProcurementCalibrator } from './TradeBridgeProcurementCalibrator';
import { TradeBridgeFulfillmentStandards } from './TradeBridgeFulfillmentStandards';
import { TradeBridgeVisualAtelier } from './TradeBridgeVisualAtelier';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const typedLocale = locale as Locale;

  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const d = TRADEBRIDGE;
  const wrap = 'max-w-7xl mx-auto px-5 sm:px-8';
  const label = 'text-xs font-bold tracking-widest uppercase text-[#9B3320]';
  const head = 'mt-4 text-3xl sm:text-5xl font-black leading-tight tracking-tight text-[#213044]';
  const cta =
    'inline-flex gap-3 items-center bg-[#B9442E] hover:bg-[#9B3320] text-white px-6 py-4 text-sm font-bold rounded-sm transition-colors';
  const m = d.media[0];

  return (
    <div>
      {/* 01: Hero section with verified high-res editorial distribution center */}
      <section data-sector-specific="wholesale-hero" className="bg-[#213044] text-white">
        <div className={wrap + ' grid gap-9 lg:grid-cols-[.85fr_1.15fr] py-14 lg:py-24 items-center'}>
          <div>
            <p className="text-[#F3C2B4] text-xs font-bold tracking-widest">
              TRADEBRIDGE / ENTERPRISE WHOLESALE
            </p>
            <h1 className="mt-6 font-black text-[clamp(2.7rem,5.7vw,6rem)] leading-[1.1] tracking-tight">
              {ar ? (
                <>
                  توريد أوضح.
                  <span className="block text-[#F3C2B4]">قرار أسهل.</span>
                </>
              ) : (
                <>
                  Procurement
                  <span className="block text-[#F3C2B4]">made clearer.</span>
                </>
              )}
            </h1>
            <p className="mt-6 leading-9 text-[#F8F4EF] text-sm sm:text-base max-w-xl">
              {ar
                ? 'استكشف كتالوج جملة متخصصاً للشركات، حدد الأصناف والكراتين، واجمع احتياج منشأتك التجاري في طلب عرض سعر (RFQ) موحد.'
                : 'Explore a specialist B2B wholesale catalogue, calibrate items and carton quantities, and consolidate your business procurement into a single RFQ.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={tradePath(typedLocale, 'catalogue')}
                className="inline-flex gap-3 items-center bg-[#F3C2B4] hover:bg-white text-[#213044] px-6 py-4 font-bold text-sm rounded-sm transition-colors"
              >
                {ar ? 'استكشف الكتالوج' : 'Explore catalogue'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href={tradePath(typedLocale, 'rfq')}
                className="inline-flex items-center border border-[#B9C1CB] hover:bg-white/10 px-6 py-4 font-bold text-sm text-white rounded-sm transition-colors"
              >
                {ar ? 'ابدأ طلب عرض' : 'Build an RFQ'}
              </Link>
            </div>
          </div>
          <figure className="border border-[#798698] rounded-sm overflow-hidden bg-slate-900 shadow-xl">
            <img
              src={m.url}
              alt={m.alt[typedLocale]}
              className="w-full h-[280px] sm:h-[430px] object-cover"
              loading="eager"
            />
            <figcaption className="bg-[#192535] text-white px-4 py-3 text-xs leading-6 flex flex-wrap justify-between items-center gap-2">
              <span>
                <a href={m.source} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#F3C2B4]">
                  {m.credit}
                </a>{' '}
                · {m.license}
              </span>
              <span className="text-[#D2D9E2]">
                {ar ? 'صورة تحريرية مستقلة لمركز توزيع' : 'Independent distribution center photograph'}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02: Quick 4-step procurement progress banner */}
      <section data-sector-specific="rfq-steps" className="bg-[#F3C2B4] text-[#213044]">
        <div className={wrap + ' grid gap-5 sm:grid-cols-2 lg:grid-cols-4 py-7'}>
          {(ar
            ? ['اختر الفئة التجارية', 'حدد الأصناف والمواصفات', 'أدخل عدد الكراتين', 'احفظ طلب العرض (RFQ)']
            : ['Choose Category', 'Select Item & Specs', 'Set Carton Quantities', 'Save Wholesale RFQ']
          ).map((x, i) => (
            <div key={x} className="flex items-center gap-3 border-s-2 border-[#213044] ps-4">
              <span className="font-mono text-base font-bold text-[#9B3320]">0{i + 1}</span>
              <h2 className="text-sm font-black">{x}</h2>
            </div>
          ))}
        </div>
      </section>

      {/* 03: Four wholesale product categories */}
      <section data-sector-specific="category-catalogue" className={wrap + ' py-16 sm:py-24'}>
        <p className={label}>01 / CATALOGUE CATEGORIES</p>
        <h2 className={head}>{ar ? 'أقسام توريد معتمدة للأعمال' : 'Procurement categories for businesses'}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Package, k: 'packaging', a: 'مستلزمات التغليف', e: 'Packaging & Cartons' },
            { Icon: ShoppingBasket, k: 'hospitality', a: 'مستهلكات الضيافة', e: 'Hospitality & Food' },
            { Icon: ClipboardList, k: 'office', a: 'المستلزمات المكتبية', e: 'Office Supplies' },
            { Icon: Boxes, k: 'operations', a: 'مهمات التشغيل', e: 'Operations & Safety' }
          ].map(({ Icon, k, a, e }) => (
            <Link
              key={k}
              href={tradePath(typedLocale, 'catalogue') + '?category=' + k}
              className="bg-white border border-[#D9D2CA] p-7 rounded-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <Icon size={34} className="text-[#B9442E] group-hover:scale-110 transition-transform" />
                <h3 className="mt-5 text-2xl font-black text-[#213044]">{ar ? a : e}</h3>
                <p className="mt-4 text-sm leading-8 text-[#4A5568]">
                  {d.services.filter(s => s.category === k).length}{' '}
                  {ar ? 'أصناف معتمدة للمواصفات' : 'catalogued specification items'}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#9B3320]">
                <span>{ar ? 'عرض الأصناف' : 'View Category'}</span>
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 04: Eight SKU directory */}
      <section data-sector-specific="sku-directory" className="bg-white border-y border-[#D9D2CA] py-16 sm:py-24">
        <div className={wrap}>
          <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
            <div>
              <p className={label}>02 / ITEM DIRECTORY</p>
              <h2 className={head}>{ar ? 'مواصفات ووحدات كرتونة معيارية' : 'Clear item and master pack details'}</h2>
            </div>
            <Link
              href={tradePath(typedLocale, 'catalogue')}
              className="text-sm font-bold text-[#9B3320] underline underline-offset-8 hover:text-[#213044] transition-colors"
            >
              {ar ? 'عرض الدليل الكامل للأصناف' : 'Browse full catalogue'}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {d.services.map(s => (
              <Link
                key={s.slug}
                href={tradePath(typedLocale, 'catalogue/' + s.slug)}
                className="bg-[#F8F4EF] border border-[#D9D2CA] p-6 flex gap-4 items-start rounded-sm hover:bg-white hover:shadow-md transition-all text-[#213044]"
              >
                <Package className="shrink-0 text-[#B9442E] mt-1" size={28} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-[#9B3320] font-bold">{s.sku}</p>
                  <h3 className="mt-2 text-xl font-black leading-snug">{s.title[typedLocale]}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4A5568]">{s.summary[typedLocale]}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold">
                    <span className="bg-white px-2.5 py-1 border border-[#D9D2CA] rounded-sm text-[#213044]">
                      {s.unitsPerCarton} {ar ? 'وحدة/كرتونة' : 'units/carton'}
                    </span>
                    <span className="bg-[#EFE8DD] px-2.5 py-1 rounded-sm text-[#26323B]">
                      MOQ: {s.minCartons} {ar ? 'كرتونة' : 'ctn'}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={18} className="shrink-0 text-[#9B3320]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Component 1: Interactive B2B Procurement & Pallet Calibrator */}
      <TradeBridgeProcurementCalibrator locale={typedLocale} />

      {/* 05: Quantity arithmetic breakdown */}
      <section data-sector-specific="carton-conversion" className={wrap + ' py-16 sm:py-24 grid lg:grid-cols-2 gap-9 items-center'}>
        <div>
          <p className={label}>03 / QUANTITY BUILDER</p>
          <h2 className={head}>{ar ? 'من الكرتونة إلى إجمالي الوحدات' : 'From cartons to unit totals'}</h2>
          <p className="mt-5 leading-8 text-[#26323B] text-sm sm:text-base">
            {ar
              ? 'حدد عدد الكراتين لكل صنف، وسيحسب النموذج عدد الوحدات التوضيحي قبل الحفظ. يتم التحقق من الكميات مجدداً على السيرفر لضمان سلامة حدود الطلب.'
              : 'Set cartons per item; the form calculates illustrative units before saving, with strict server-side quantity validation against master pack bounds.'}
          </p>
          <Link className={cta + ' mt-7'} href={tradePath(typedLocale, 'rfq')}>
            <span>{ar ? 'تكوين طلب عرض سعر' : 'Build Wholesale RFQ'}</span>
            <Arrow size={16} />
          </Link>
        </div>
        <div className="bg-[#213044] text-white p-8 rounded-sm shadow-lg">
          <figure className="mb-7 border border-[#798698] rounded-sm overflow-hidden bg-slate-900">
            <img
              src={d.media[1].url}
              alt={d.media[1].alt[typedLocale]}
              className="w-full h-48 sm:h-56 object-cover"
              loading="lazy"
            />
            <figcaption className="px-3 py-2 text-xs leading-6 bg-[#192535] flex justify-between text-[#D2D9E2]">
              <span>{d.media[1].credit} · CC0 1.0</span>
              <span>{ar ? 'مستودع إيكيا سنغافورة — صورة تحريرية' : 'IKEA Singapore — editorial'}</span>
            </figcaption>
          </figure>
          <span className="text-xs font-bold tracking-widest text-[#F3C2B4]">CALCULATION EXAMPLE / TB-PK-001</span>
          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="bg-[#2B3C52] p-4 rounded-sm border border-[#3F536E]">
              <p className="text-xs font-bold text-[#F8F4EF]">{ar ? 'عدد الكراتين' : 'Cartons'}</p>
              <p className="mt-2 text-3xl font-black text-white">4</p>
            </div>
            <div className="bg-[#2B3C52] p-4 rounded-sm border border-[#3F536E]">
              <p className="text-xs font-bold text-[#F8F4EF]">{ar ? 'وحدة لكل كرتونة' : 'Units/carton'}</p>
              <p className="mt-2 text-3xl font-black text-white">50</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#3F536E]">
            <p className="text-xs font-bold text-[#F8F4EF]">{ar ? 'إجمالي الوحدات التقديري' : 'Illustrative Total Units'}</p>
            <p className="mt-2 text-4xl sm:text-5xl font-black text-[#F3C2B4]">200</p>
          </div>
        </div>
      </section>

      {/* Signature Component 2: 4 Wholesale Fulfillment Standards Pillars */}
      <TradeBridgeFulfillmentStandards locale={typedLocale} />

      {/* 06: Buyer / Supplier dual pathways */}
      <section data-sector-specific="buyer-supplier-pathways" className="bg-[#EFE8DD] py-16 sm:py-24 border-y border-[#D9D2CA]">
        <div className={wrap + ' grid md:grid-cols-2 gap-6'}>
          {[
            {
              Icon: ShoppingBasket,
              a: 'للشركات والمشترين',
              e: 'For Commercial Buyers',
              ad: 'كوّن طلباً مجمعاً متعدد الأصناف وحدد طريقة التسليم ونطاق التوزيع.',
              ed: 'Build a multi-line consolidated RFQ and specify delivery or collection requirements.',
              p: 'buyers'
            },
            {
              Icon: Handshake,
              a: 'للمصانع والموردين',
              e: 'For Manufacturers & Suppliers',
              ad: 'سجّل اهتمام التوريد بحسب فئات المنتجات ونطاق التغطية الجغرافية.',
              ed: 'Register supply capability by product category, certification, and geographical coverage.',
              p: 'suppliers'
            }
          ].map(({ Icon, a, e, ad, ed, p }) => (
            <article key={p} className="bg-white border border-[#D9D2CA] p-8 sm:p-10 rounded-sm shadow-sm flex flex-col justify-between">
              <div>
                <Icon size={34} className="text-[#B9442E]" />
                <h2 className="mt-5 text-2xl sm:text-3xl font-black text-[#213044]">{ar ? a : e}</h2>
                <p className="mt-4 leading-8 text-[#4A5568] text-sm sm:text-base">{ar ? ad : ed}</p>
              </div>
              <Link href={tradePath(typedLocale, p)} className={cta + ' mt-8 self-start'}>
                <span>{ar ? 'استكشف المسار' : 'Explore pathway'}</span>
                <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Signature Component 3: Verified Visual Atelier with SHA-256 Provenance */}
      <section className="bg-[#F8F4EF] py-16 sm:py-24">
        <div className={wrap}>
          <TradeBridgeVisualAtelier locale={typedLocale} />
        </div>
      </section>

      {/* 07: Procurement pathway (01-04) */}
      <section data-sector-specific="procurement-process" className={wrap + ' py-16 sm:py-24'}>
        <p className={label}>04 / PROCUREMENT PATHWAY</p>
        <h2 className={head}>{ar ? 'من الاحتياج إلى عرض مكتوب' : 'From demand to a written quote'}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(ar
            ? ['تجميع الاحتياج', 'طلب المواصفات', 'مراجعة العرض المكتوب', 'الاتفاق مع المورد']
            : ['Consolidate needs', 'Confirm specifications', 'Review formal quote', 'Agree with supplier']
          ).map((x, i) => (
            <article key={x} className="border border-[#D9D2CA] p-7 bg-white rounded-sm">
              <span className="font-mono text-3xl text-[#9B3320] font-bold">0{i + 1}</span>
              <h3 className="mt-5 text-xl font-black text-[#213044]">{x}</h3>
            </article>
          ))}
        </div>
        <Link href={tradePath(typedLocale, 'process')} className={cta + ' mt-8'}>
          <span>{ar ? 'تفاصيل رحلة التوريد' : 'Procurement pathway'}</span>
          <ArrowUpRight size={18} />
        </Link>
      </section>

      {/* 08: Fulfilment boundary notice */}
      <section data-sector-specific="fulfilment-boundary" className="bg-[#213044] text-white py-16 sm:py-24">
        <div className={wrap + ' grid lg:grid-cols-2 gap-8 items-center'}>
          <div>
            <Truck size={36} className="text-[#F3C2B4]" />
            <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight text-white">
              {ar ? 'التسليم يحتاج اتفاقاً واضحاً' : 'Delivery requires clear terms'}
            </h2>
            <p className="mt-5 text-[#F8F4EF] leading-8 text-sm sm:text-base">
              {ar
                ? 'راجع تغطية المورد والمدة والتكلفة والمرتجعات. هذا الموقع تجربة استعراضية تجارية ولا يمثل متجر دفع فوري أو شحنات مؤكدة دون تعاقد.'
                : 'Review actual supplier coverage, timing, charges and returns. This showcase illustrates B2B architecture with no live credit processing.'}
            </p>
            <Link
              href={tradePath(typedLocale, 'terms')}
              className="mt-7 inline-flex gap-3 bg-[#F3C2B4] hover:bg-white text-[#213044] px-6 py-4 font-bold text-sm rounded-sm transition-colors"
            >
              <span>{ar ? 'راجع الشروط' : 'Review terms'}</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="border border-[#798698] p-8 bg-[#2B3C52] rounded-sm">
            <ShieldCheck size={34} className="text-[#F3C2B4]" />
            <h3 className="mt-5 text-2xl font-black text-white">
              {ar ? 'طلب عرض وليس أمر شراء' : 'RFQ, not a purchase order'}
            </h3>
            <p className="mt-4 text-sm leading-8 text-[#D2D9E2]">
              {ar
                ? 'رقم المرجع الصادر يعني حفظ تفاصيل طلبك للمراجعة والتسعير من قبل المورد المختص فقط.'
                : 'The issued reference number confirms only that your request details were recorded for pricing review.'}
            </p>
          </div>
        </div>
      </section>

      {/* 09: Procurement buyer guides */}
      <section data-sector-specific="procurement-guides" className={wrap + ' py-16 sm:py-24'}>
        <p className={label}>05 / BUYER NOTES</p>
        <h2 className={head}>{ar ? 'أدلة الشراء بالجملة' : 'Wholesale buying guides'}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {d.articles.map(a => (
            <Link
              key={a.slug}
              href={tradePath(typedLocale, 'guides/' + a.slug)}
              className="bg-white border border-[#D9D2CA] p-7 rounded-sm hover:shadow-lg transition-all text-[#213044]"
            >
              <BookOpen size={24} className="text-[#B9442E]" />
              <h3 className="mt-4 text-xl font-black leading-snug">{a.title[typedLocale]}</h3>
              <p className="mt-3 text-sm leading-8 text-[#4A5568]">{a.summary[typedLocale]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 10: FAQs */}
      <section data-sector-specific="wholesale-faq" className="bg-[#EFE8DD] py-16 sm:py-24 border-t border-[#D9D2CA]">
        <div className={wrap + ' grid lg:grid-cols-[.6fr_1fr] gap-8'}>
          <div>
            <p className={label}>06 / QUESTIONS</p>
            <h2 className={head}>{ar ? 'قبل طلب العرض' : 'Before the RFQ'}</h2>
          </div>
          <div className="space-y-3">
            {d.faq.map(f => (
              <details key={f.question.en} className="bg-white border border-[#D9D2CA] p-6 rounded-sm text-[#213044]">
                <summary className="cursor-pointer font-bold leading-7 text-base">
                  {f.question[typedLocale]}
                </summary>
                <p className="mt-4 text-sm leading-8 text-[#4A5568]">{f.answer[typedLocale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11: Final conversion banner */}
      <section data-sector-specific="wholesale-conversion" className={wrap + ' py-16 sm:py-24'}>
        <div className="bg-[#B9442E] text-white p-8 sm:p-14 rounded-sm shadow-xl">
          <h2 className="text-3xl sm:text-5xl font-black">
            {ar ? 'اجمع احتياج منشأتك في طلب واحد' : 'Consolidate your business needs'}
          </h2>
          <p className="mt-4 text-[#F8F4EF] text-sm sm:text-base max-w-2xl leading-8">
            {ar
              ? 'تتيح مافكس تطوير منصات توريد جملة متقدمة تربط المصانع والموردين بشبكات التوزيع والتجزئة بأعلى معايير الأداء وتجربة المستخدم.'
              : 'Mavvix crafts high-performance B2B wholesale platforms connecting manufacturers and distributors with retail networks.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={tradePath(typedLocale, 'rfq')}
              className="bg-white hover:bg-[#F8F4EF] text-[#213044] px-7 py-4 font-bold text-sm inline-flex items-center gap-2 rounded-sm transition-colors"
            >
              <span>{ar ? 'طلب عرض سعر' : 'Build an RFQ'}</span>
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href={tradePath(typedLocale, 'supplier-interest')}
              className="border border-white hover:bg-white/10 text-white px-7 py-4 font-bold text-sm inline-flex items-center gap-2 rounded-sm transition-colors"
            >
              <span>{ar ? 'تواصل كمورد' : 'Supplier interest'}</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
