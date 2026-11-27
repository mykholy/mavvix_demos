import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE, OAK_PHOTOS, oakPath, oakText } from '@/lib/verticals/furniture/data';
import { oaklineHeroPhoto } from './media';
import OaklineStudioConfigurator from './OaklineStudioConfigurator';
import OaklineCraftsmanshipInspector from './OaklineCraftsmanshipInspector';
import OaklineVisualGallery from './OaklineVisualGallery';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Armchair,
  House,
  BookOpen,
  Ruler,
  Leaf,
  Layers,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  MoveDiagonal2,
  Grid2X2,
  Palette,
  PenTool,
  Box,
  Truck,
  Heart,
  Image as PhotoIcon,
  Sparkles,
  TreePine,
  Maximize2
} from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const ar = locale === 'ar';
  const title = ar
    ? 'تصميم موقع معرض أثاث حسب الطلب | Oakline Living من مافكس'
    : 'Custom Furniture Website Design | Oakline Living by Mavvix';
  const description = ar
    ? 'تجربة موقع أثاث فاخرة فيها 10 قطع بتوصيف واضح وخامات وتشطيبات وقياسات وسلة طلب تسعير متعددة القطع محفوظة في النظام.'
    : 'Editorial furniture website with a real custom quote basket, precise dimensional preference fields, original product content and bilingual room-first design by Mavvix.';
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    robots: { index: false, follow: false }
  };
}

export default async function OaklineHome(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const moods = [
    {
      slug: 'living',
      icon: Armchair,
      ar: 'غرفة المعيشة',
      en: 'Living Room',
      descAr: 'مقاعد وجلسات وترابيزات تخدم الحركة والراحة اليومية.',
      descEn: 'Seating, tables, and circulation planned for calm living.'
    },
    {
      slug: 'bedroom',
      icon: House,
      ar: 'غرفة النوم',
      en: 'Bedroom Suite',
      descAr: 'سرير منصة ودواليب بأبعاد متوافقة مع مساحة الغرفة.',
      descEn: 'Platform beds and wardrobes proportioned to real rooms.'
    },
    {
      slug: 'dining',
      icon: Layers,
      ar: 'صالة الطعام',
      en: 'Dining Hall',
      descAr: 'طاولات خشب صلب وكراسي تحسب ارتداد المقاعد بدقة.',
      descEn: 'Solid timber dining tables with chair pull-out clearance.'
    },
    {
      slug: 'workspace',
      icon: PenTool,
      ar: 'مساحة العمل',
      en: 'Executive Studio',
      descAr: 'مكاتب خشبية ووحدات حفظ توفر نظام تنظيم مخفي للأسلاك.',
      descEn: 'Fine joinery desks with concealed wire routing ducts.'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 01 Warm Interior Magazine Hero */}
      <section data-sector-specific="editorial-room-hero" className="bg-[#EDE5D7] border-b border-[#D8CCBD]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-20 grid lg:grid-cols-[.95fr_1.05fr] gap-10 lg:gap-16 items-center">
          <div className="lg:py-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#FAF6EF] rounded-full border border-[#D8CCBD] text-xs font-mono font-bold text-[#7E5322] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#BA9062]" />
              <span>OAKLINE LIVING // BESPOKE TIMBER ATELIER</span>
            </div>

            <h1 className="oakline-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[1.08] font-normal tracking-tight text-[#30271F]">
              {ar ? (
                <>
                  مساحة تعرف <span className="text-[#7E5322] font-semibold">سكينة تفاصيلك.</span>
                </>
              ) : (
                <>
                  The architecture of <span className="text-[#7E5322] font-semibold">living spaces.</span>
                </>
              )}
            </h1>

            <p className="text-[#65513D] text-base sm:text-lg leading-relaxed max-w-xl">
              {ar
                ? 'فكّر في الفراغ المعماري قبل اختيار القطعة. استوديو أثاث تحريري يدمج الأخشاب الصلبة الطبيعية، والكتان المغسول، ومقاسات المكان بالملليمتر في سلة طلب تسعير منظمة.'
                : 'Start with the spatial volume, then calibrate the object. Handcrafted solid European oak and American walnut furniture proportioned to verified architectural room dimensions.'}
            </p>

            {/* Verified Specs Badge Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#D8CCBD]">
                <span className="text-[11px] font-mono text-[#7E5322] block font-semibold">{ar ? 'القطع المعتمدة' : 'Catalogue Dossiers'}</span>
                <span className="text-base sm:text-lg font-bold font-mono text-[#30271F]">10 Pieces</span>
              </div>
              <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#D8CCBD]">
                <span className="text-[11px] font-mono text-[#7E5322] block font-semibold">{ar ? 'نوعية الأخشاب' : 'Timber Standard'}</span>
                <span className="text-base sm:text-lg font-bold font-mono text-[#30271F]">100% Solid FSC</span>
              </div>
              <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#D8CCBD] col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono text-[#7E5322] block font-semibold">{ar ? 'معيار التشطيب' : 'Finish Standard'}</span>
                <span className="text-base sm:text-lg font-bold font-mono text-[#30271F]">0 VOC Hardwax</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="#studio-configurator"
                className="bg-[#30271F] hover:bg-[#45372C] text-white rounded-full px-8 py-4 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2.5 transition-all shadow-md"
              >
                <span>{ar ? 'افتح استوديو التخصيص' : 'Launch Studio Configurator'}</span>
                <Arrow size={16} />
              </Link>
              <Link
                href={oakPath(locale, 'quote')}
                className="bg-white hover:bg-[#FAF6EF] text-[#30271F] rounded-full px-7 py-4 font-bold text-xs uppercase tracking-wider border border-[#D8CCBD] inline-flex items-center gap-2 transition-all shadow-sm"
              >
                <span>{ar ? 'سلة طلب التسعير' : 'Quote Basket'}</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Visual Feature */}
          <figure className="relative min-h-[440px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden border border-[#D8CCBD] shadow-2xl bg-[#D8BFA2]">
            <img
              src={oaklineHeroPhoto.url}
              loading="eager"
              alt={ar ? oaklineHeroPhoto.ar : oaklineHeroPhoto.en}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <figcaption className="absolute bottom-6 start-6 end-6 bg-[#FAF6EF]/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-[#D8CCBD] flex items-center justify-between text-xs text-[#30271F]">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-[#7E5322] uppercase tracking-wider block font-bold">
                  VERIFIED EDITORIAL PROVENANCE
                </span>
                <span className="font-serif font-bold text-sm block">
                  {ar ? oaklineHeroPhoto.ar : oaklineHeroPhoto.en}
                </span>
                <span className="text-[11px] text-[#65513D]">
                  {oaklineHeroPhoto.author} • {oaklineHeroPhoto.license}
                </span>
              </div>
              <Link
                href={oakPath(locale, 'collections')}
                className="bg-[#30271F] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shrink-0 hidden sm:inline-flex items-center gap-1 hover:bg-[#45372C]"
              >
                <span>{ar ? 'استعراض' : 'Explore'}</span>
                <Arrow size={12} />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Signature Feature 01: Interactive Studio & Timber Configurator */}
      <section id="studio-configurator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OaklineStudioConfigurator locale={locale} />
      </section>

      {/* Signature Feature 02: Woodcraft Integrity & Joinery Science */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OaklineCraftsmanshipInspector locale={locale} />
      </section>

      {/* Signature Feature 03: Architectural Living Visual Gallery */}
      <OaklineVisualGallery locale={locale} />

      {/* 02 Room-First Product Discovery */}
      <section data-sector-specific="room-first-discovery" className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
          <div>
            <p className="uppercase text-xs tracking-widest text-[#7E5322] font-mono font-bold mb-1">
              CONSIDER THE ROOM FIRST
            </p>
            <h2 className="oakline-display text-3xl sm:text-5xl font-serif text-[#30271F]">
              {ar ? 'ابدأ بالغرفة... لا بالموديل' : 'Start with the room, not the catalog'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#65513D]">
            {ar
              ? 'كل فراغ معماري يفرض قيودًا مكانية، ومسارات حركة للأبواب، واحتياجات يومية مختلفة.'
              : 'Each living zone demands tailored access, circulation corridors, and tactile materials calibrated for daily rituals.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {moods.map((m, i) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.slug}
                href={oakPath(locale, 'rooms') + '?room=' + m.slug}
                className="border border-[#D8CCBD] bg-white rounded-2xl p-7 flex flex-col justify-between hover:bg-[#FAF6EF] hover:border-[#BA9062] hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EF] group-hover:bg-[#30271F] text-[#7E5322] group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                    <Icon size={24} strokeWidth={1.4} />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7E5322]">0{i + 1}</span>
                </div>
                <div className="mt-8 space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#30271F]">{ar ? m.ar : m.en}</h3>
                  <p className="text-xs leading-relaxed text-[#65513D]">{ar ? m.descAr : m.descEn}</p>
                </div>
                <span className="flex mt-6 pt-4 border-t border-[#EDE5D7] gap-2 items-center text-xs font-bold text-[#7E5322] group-hover:text-[#30271F]">
                  <span>{ar ? 'استكشف قطع الغرفة' : 'Explore Room Dossiers'}</span>
                  <Arrow size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 03 Measurements and Dimension Science */}
      <section data-sector-specific="measurement-science" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#30271F] text-white rounded-3xl p-8 sm:p-14 border border-[#4A3B2F] shadow-xl grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-center">
          <div className="space-y-4">
            <span className="uppercase tracking-widest text-[#DAB48B] font-mono font-bold text-xs block">
              DIMENSIONS & SPATIAL CALIBRATION
            </span>
            <h2 className="oakline-display text-3xl sm:text-5xl font-serif leading-tight">
              {ar ? 'المقاس الحقيقي هو بداية التصميم' : 'True craft begins with accurate measurements'}
            </h2>
            <p className="text-[#E4D6C5] text-xs sm:text-sm leading-relaxed max-w-md">
              {ar
                ? 'ليس كافيًا قياس طول الجدار فحسب، بل اتساع فتح الأبواب والسلالم والمصاعد ومسار حركة الكراسي.'
                : 'Measure doorways, elevators, staircase landings, and drawer clearances—not merely the naked wall length.'}
            </p>
            <Link
              href={oakPath(locale, 'measurement-guide')}
              className="inline-flex gap-2 items-center text-[#DAB48B] hover:text-white font-bold text-xs uppercase tracking-wider pt-2 underline underline-offset-8"
            >
              <span>{ar ? 'دليل القياسات المعماري' : 'Architectural Measurement Guide'}</span>
              <Arrow size={15} />
            </Link>
          </div>

          <div className="border border-[#5A493B] bg-[#3B3026] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Ruler size={32} className="text-[#DAB48B]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {ar ? 'الأبعاد الثلاثية الواجب تدقيقها' : 'Three Critical Clearance Rules'}
              </h3>
            </div>
            <div className="grid gap-4">
              {[
                [ar ? 'العرض الصافي (Width)' : 'Horizontal Footprint (Width)', ar ? 'المساحة الأفقية للقطعة مع ممرات المشي الجانبية لا تقل عن 800 مم.' : 'Horizontal width plus a minimum 800mm clear walkway at adjoining perimeters.'],
                [ar ? 'العمق الممتد (Depth)' : 'Extension Depth & Swing', ar ? 'المسافة من الأمام للخلف مضافًا إليها ارتداد الكراسي أو فتح الأدراج.' : 'Front-to-back dimensions accounting for full drawer extension and chair pushback.'],
                [ar ? 'الارتفاع البصري (Height)' : 'Vertical Proportions & Eye Level', ar ? 'تناسب القطعة مع ارتفاع السقف ومستويات النوافذ والإضاءة المحيطة.' : 'Clearances to window sills, ceiling heights, and surrounding lighting fixtures.']
              ].map(([title, body], i) => (
                <div key={i} className="flex gap-4 items-start border-b border-[#524335] pb-4 last:border-b-0 last:pb-0">
                  <span className="font-mono text-lg font-bold text-[#DAB48B] shrink-0">0{i + 1}</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white">{title}</h4>
                    <p className="text-xs text-[#E4D6C5] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 Original Product Dossiers Catalog Preview */}
      <section data-sector-specific="designed-piece-collection" className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
          <div>
            <p className="uppercase text-xs text-[#7E5322] font-mono font-bold tracking-widest mb-1">
              TEN EDITORIAL FURNITURE DOSSIERS
            </p>
            <h2 className="oakline-display text-3xl sm:text-5xl font-serif text-[#30271F]">
              {ar ? 'عشر قطع معمارية موثقة المواصفات' : 'Substantive Furniture Specifications'}
            </h2>
          </div>
          <Link
            href={oakPath(locale, 'collections')}
            className="text-xs font-bold uppercase tracking-wider text-[#7E5322] hover:text-[#30271F] flex items-center gap-1.5 underline underline-offset-8"
          >
            <span>{ar ? 'استعراض الكتالوج كاملاً' : 'View Complete Collection'}</span>
            <Arrow size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4 mt-8">
          {OAKLINE.services.map((p, i) => (
            <Link
              key={p.slug}
              href={oakPath(locale, 'collections/' + p.slug)}
              className="bg-white border border-[#D8CCBD] rounded-2xl p-6 flex flex-col justify-between hover:border-[#BA9062] hover:shadow-lg transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] group-hover:bg-[#30271F] text-[#7E5322] group-hover:text-white flex items-center justify-center transition-colors">
                    <Armchair size={20} strokeWidth={1.4} />
                  </div>
                  <span className="font-mono text-[#7E5322] text-xs font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#30271F] leading-snug group-hover:text-[#7E5322] transition-colors">
                  {oakText(p.title, locale)}
                </h3>
                <p className="mt-3 text-[#65513D] text-xs leading-relaxed line-clamp-3">
                  {oakText(p.summary, locale)}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#EDE5D7] flex items-center justify-between text-xs font-bold text-[#7E5322]">
                <span>{ar ? 'المواصفات والخامات' : 'Specs & Finishes'}</span>
                <Arrow size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 05 Educational Articles & Perspectives */}
      <section data-sector-specific="home-editorial-guides" className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
          <div>
            <p className="text-xs font-mono font-bold text-[#7E5322] tracking-widest uppercase mb-1">
              FIELD NOTES FROM THE ATELIER
            </p>
            <h2 className="oakline-display text-3xl sm:text-5xl font-serif text-[#30271F]">
              {ar ? 'مقالات وأفكار في فن السكن الراقي' : 'Considered Perspectives on Living Well'}
            </h2>
          </div>
          <Link
            href={oakPath(locale, 'journal')}
            className="text-xs font-bold uppercase tracking-wider text-[#7E5322] hover:text-[#30271F] underline underline-offset-8"
          >
            <span>{ar ? 'جميع المقالات' : 'All Articles'}</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {OAKLINE.articles.map((a, i) => (
            <Link
              key={a.slug}
              href={oakPath(locale, 'journal/' + a.slug)}
              className="bg-white border border-[#D8CCBD] rounded-2xl p-7 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <BookOpen size={26} className="text-[#7E5322]" />
                <p className="text-xs font-mono text-[#7E5322] mt-6 font-bold">OAKLINE JOURNAL // 0{i + 1}</p>
                <h3 className="font-serif text-xl font-bold text-[#30271F] mt-2 group-hover:text-[#7E5322] transition-colors leading-snug">
                  {oakText(a.title, locale)}
                </h3>
                <p className="text-[#65513D] mt-3 text-xs leading-relaxed line-clamp-3">
                  {oakText(a.summary, locale)}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#EDE5D7] flex items-center justify-between text-xs font-bold text-[#7E5322]">
                <span>{ar ? 'قراءة الدليل' : 'Read Guide'}</span>
                <Arrow size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 06 FAQ Accordion */}
      <section data-sector-specific="furniture-trust-questions" className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="bg-[#FAF6EF] rounded-3xl p-8 sm:p-12 border border-[#D8CCBD] grid lg:grid-cols-[.75fr_1.25fr] gap-10 items-start">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#7E5322] tracking-widest uppercase block">
              TRANSPARENT SPECIFICATION ENQUIRY
            </span>
            <h2 className="oakline-display text-3xl sm:text-4xl font-serif text-[#30271F]">
              {ar ? 'الوضوح الكامل أساس العلاقة' : 'Clarity is our finest material'}
            </h2>
            <p className="text-xs sm:text-sm text-[#65513D] leading-relaxed">
              {ar
                ? 'إجابات صريحة عن طبيعة الموقع التحريري، وإجراءات مراجعة الأبعاد، وتأكيد عينات الخامات مع الصانع.'
                : 'Direct answers regarding our editorial model, physical site measuring, and bespoke timber sample verification.'}
            </p>
          </div>

          <div className="space-y-3">
            {OAKLINE.faq.map((f, i) => (
              <details
                key={i}
                className="bg-white border border-[#D8CCBD] rounded-xl p-5 open:shadow-md transition-all group"
              >
                <summary className="font-bold text-xs sm:text-sm text-[#30271F] cursor-pointer list-none flex items-center justify-between">
                  <span>{oakText(f.q, locale)}</span>
                  <span className="text-[#7E5322] font-mono text-sm group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-[#65513D] border-t border-[#EDE5D7] pt-3">
                  {oakText(f.a, locale)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Mavvix Conversion Call to Action */}
      <section data-sector-specific="mavvix-furniture-offer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#30271F] text-white rounded-3xl p-8 sm:p-14 border border-[#4A3B2F] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-start">
            <span className="text-xs font-mono font-bold text-[#DAB48B] uppercase tracking-wider block">
              MAVVIX COMMERCIAL FACTORY // BESPOKE DIGITAL PRESENCE
            </span>
            <h2 className="oakline-display text-3xl sm:text-5xl font-serif text-white">
              {ar ? 'معرض أثاثك يستحق موقعًا يشرح قيمته الفنية' : 'Commission a luxury website for your furniture brand'}
            </h2>
            <p className="text-xs sm:text-sm text-[#E4D6C5] leading-relaxed">
              {ar
                ? 'مافكس تصمم مواقع فاخرة لشركات الأثاث والمعارض الراقية، مزودة بكتالوج خامات وأبعاد دقيقة وسلة عروض أسعار متصلة بقاعدة بيانات حقيقية.'
                : 'Mavvix builds bespoke, high-converting digital flagships for artisanal furniture makers and luxury showrooms, complete with material configurators and persistent quote pipelines.'}
            </p>
          </div>

          <a
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#BA9062] hover:bg-[#A37B50] text-white font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-lg flex items-center gap-2.5 shrink-0 transition-all"
          >
            <span>{ar ? 'اطلب تنفيذ موقع معرضك' : 'Discuss Your Website Build'}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
