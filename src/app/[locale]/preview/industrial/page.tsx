import { SectorDepth } from '@/components/shared/SectorDepth';
import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import Link from 'next/link';
import { getCatalogItems, getEditorialPosts } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Factory,
  Cog,
  Layers,
  FileSpreadsheet,
  PackageCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Search,
  Scale
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function IndustrialHomePage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const catalog = getCatalogItems('industrial', locale);
  const products = catalog.slice(0, 6);
  const articles = getEditorialPosts('industrial', locale).slice(0, 3);

  const categories = [
    { id: 'profiles', title: isAr ? 'قطاعات معدنية' : 'Industrial Profiles' },
    { id: 'tubes', title: isAr ? 'أنابيب معدنية' : 'Metal Tubes' },
    { id: 'sheets', title: isAr ? 'ألواح ولفائف' : 'Sheets & Plates' },
    { id: 'fittings', title: isAr ? 'وصلات وتجهيزات' : 'Fittings' },
    { id: 'fasteners', title: isAr ? 'مثبتات ميكانيكية' : 'Fasteners' },
    { id: 'pipes', title: isAr ? 'مواسير صناعية' : 'Industrial Pipes' },
  ].map(category => ({
    ...category,
    count: `${catalog.filter(product => product.item_type === category.id).length} SKUs`,
  }));

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="bg-[#12243C] text-white pt-16 pb-20 border-b border-slate-800" style={getSectorHeroStyle('industrial')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5" />
                <span>B2B PROCUREMENT & METALLURGY SPEC</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
                {isAr ? (
                  <>المواصفات أولًا. <span className="text-[#DE9E37]">ثم يبدأ التوريد</span> بدقة قياسية.</>
                ) : (
                  <>Specify accurately. <span className="text-[#DE9E37]">Source confidently</span> with verified metallurgy.</>
                )}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {isAr
                  ? 'دليل صناعي متكامل يربط كل منتج بكود الـ SKU الدقيق، درجات الصلب المعتمدة، الحد الأدنى للطلب (MOQ)، وسلة تسعير متعددة البنود للتصدير والتصنيع.'
                  : 'Certified manufacturing supply catalogue connecting exact SKU codes, DIN/ASTM compliance, packaging multiples, and instant multi-line RFQ generation.'}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/preview/industrial/products`}
                  className="bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>{isAr ? 'دليل المواصفات والمنتجات (24 SKU)' : 'Browse Full Catalog (24 SKUs)'}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/preview/industrial/rfq`}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <PackageCheck className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'سلة طلب عروض الأسعار (RFQ)' : 'Open RFQ Basket'}</span>
                </Link>
              </div>
            </div>

            {/* Right: Technical Spec Table Quickview (Signature Hero Module) */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-mono text-amber-400 font-bold uppercase tracking-wider">
                  SAMPLE SPEC DOSSIER // DIN EN 10025
                </span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">QA PASS</span>
              </div>

              {/* 6-cell Data Table */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">MATERIAL GRADE</span>
                  <span className="text-amber-400 font-bold text-sm">AISI 304 / S275JR</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">TENSILE STRENGTH</span>
                  <span className="text-white font-bold text-sm">410 — 560 MPa</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">TOLERANCE CLASS</span>
                  <span className="text-white font-bold text-sm">EN 10034 Cl. B</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">STANDARD MOQ</span>
                  <span className="text-amber-400 font-bold text-sm">500 m / 2.5 Tons</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">SURFACE FINISH</span>
                  <span className="text-white font-bold text-sm">Hot-Dip Galv / Mill</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">TRACEABILITY</span>
                  <span className="text-emerald-400 font-bold text-sm">EN 10204 3.1 Cert</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 leading-relaxed font-mono">
                {isAr
                  ? '⚡ كافة العينات تخضع لاختبارات الشد والصلابة والتحليل الكيميائي لشهادات المنشأ.'
                  : '⚡ Mill test reports include heat numbers, chemical composition, and charpy V-notch verification.'}
              </div>
            </div>
          </div>
        </div>
      </section>
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="industrial" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="industrial" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-60 text-center px-4">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>


      {/* Product Categories Quick Rails */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-300 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
              PRODUCT TAXONOMY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#12243C]">
              {isAr ? 'عائلات المنتجات والتوريد الصناعي' : 'Core Supply Classifications'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/industrial/products`}
            className="text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <span>{isAr ? 'الدليل الكامل' : 'All Products'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/${locale}/preview/industrial/products?category=${c.id}`}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono text-stone-400 font-bold block mb-2">
                  {c.count}
                </span>
                <h3 className="text-base font-bold text-[#12243C] group-hover:text-amber-600 transition-colors mb-2">
                  {c.title}
                </h3>
              </div>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 pt-4 border-t border-stone-100">
                <span>{isAr ? 'استعراض الـ SKUs' : 'Explore SKUs'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured SKUs Grid from SQLite */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
                STANDARDIZED SKUS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#12243C]">
                {isAr ? 'عينات من منتجات الدليل الفني' : 'Featured Industrial Catalog SKUs'}
              </h2>
            </div>
            <Link
              href={`/${locale}/preview/industrial/products`}
              className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1"
            >
              <span>{isAr ? 'تصفح كافة الـ 24 SKU' : 'View All 24 SKUs'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-[#F4F6F6] border border-stone-300 rounded-xl p-6 flex flex-col justify-between hover:border-stone-400 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      {p.sku}
                    </span>
                    <span className="text-stone-500 capitalize">{p.item_type}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#12243C] group-hover:text-amber-700 transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {p.summary}
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-stone-200 text-xs font-mono space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Standard:</span>
                      <span className="font-bold text-stone-800">DIN EN 10025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Pricing:</span>
                      <span className="font-bold text-emerald-700">RFQ Scoped</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={`/${locale}/preview/industrial/products/${p.slug}`}
                    className="text-[#12243C] hover:text-amber-600 flex items-center gap-1"
                  >
                    <span>{isAr ? 'ملف المواصفات (Dossier)' : 'Technical Dossier'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/preview/industrial/rfq?sku=${p.sku}`}
                    className="text-amber-600 hover:underline text-[11px]"
                  >
                    + {isAr ? 'إضافة للـ RFQ' : 'Add to RFQ'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Capabilities Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12243C] text-white rounded-2xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
              PRECISION MANUFACTURING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAr ? 'أساليب التصنيع ونقاط فحص الجودة' : 'Manufacturing Methods & Quality Considerations'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-mono font-bold text-xs">PROCESS 01</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'الدرفلة والتشكيل على البارد' : 'Cold Roll Forming'}</h4>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'تشكيل القطاعات الإنشائية بدقة أبعاد متناهية وتحمل ميكانيكي عالي.' : 'Automated multi-stand cold forming achieving tight angular tolerances.'}
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-mono font-bold text-xs">PROCESS 02</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'القطع بالليزر وCNC' : 'CNC Laser Cutting'}</h4>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'قص ألواح الصلب حتى سمك 30 مم بدقة تفاوت لا تتعدى ±0.1 مم.' : 'High-power fiber laser profiling handling up to 30mm thick alloy plates.'}
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-mono font-bold text-xs">PROCESS 03</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'الجلفنة بالغمس الساخن' : 'Hot-Dip Galvanizing'}</h4>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'حماية من التآكل بمطابقة معايير ASTM A123 للبيئات البحرية والصناعية.' : 'ASTM A123 compliant zinc immersion protecting against severe corrosion.'}
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-mono font-bold text-xs">PROCESS 04</span>
              <h4 className="text-sm font-bold text-white">{isAr ? 'مختبر فحص الجودة المعتمد' : 'QA Testing Lab'}</h4>
              <p className="text-slate-400 leading-relaxed">
                {isAr ? 'فحص الشد، اختبار الصدمة، والمطياف الضوئي لتحليل التركيب الكيميائي.' : 'Full tensile yield analysis, spectrometer composition, and ultrasonic testing.'}
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="ferroline-rfq-heading">
        <div className="grid lg:grid-cols-12 gap-8 border border-[#DADFE4] rounded-3xl bg-[#F0F3F5] p-7 sm:p-12">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A77E30]">{isAr ? 'دورة طلب التوريد' : 'B2B PROCUREMENT WORKFLOW'}</span>
            <h2 id="ferroline-rfq-heading" className="font-bold text-2xl sm:text-4xl text-[#12243C] mt-3">{isAr ? 'من كود المنتج إلى طلب عرض سعر واضح' : 'A more precise RFQ starts with the specifications.'}</h2>
            <p className="text-sm leading-7 text-[#526474] mt-4">{isAr ? 'جهّز قائمة متعددة البنود مع الكميات ومعايير التعبئة المطلوبة قبل إرسال استفسار التوريد.' : 'Create a multi-item request, review minimum quantities and pack sizes, then provide shipping requirements for an accurate procurement discussion.'}</p>
            <Link href={`/${locale}/preview/industrial/rfq`} className="inline-flex items-center gap-3 bg-[#12243C] hover:bg-[#1C3553] text-white rounded-xl font-bold px-6 py-3 text-sm mt-6 transition-colors">{isAr ? 'افتح سلة طلب التسعير' : 'Start a quotation request'} <Arrow className="w-4 h-4" /></Link>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {[
              {n:'01',ar:'حدّد المواصفات',en:'Select specifications',arD:'اختر الكود والمادة والمقاسات الملائمة.',enD:'Select SKU, material and dimensions.'},
              {n:'02',ar:'راجع قواعد التعبئة',en:'Check quantity rules',arD:'تحقق من الحد الأدنى ومضاعفات العبوات.',enD:'Validate MOQ and packaging multiples.'},
              {n:'03',ar:'سجّل طلبك',en:'Submit your RFQ',arD:'أضف معلومات الشركة والتوصيل ليُراجع الطلب.',enD:'Provide buyer and destination details for review.'},
            ].map(step => <div key={step.n} className="bg-white rounded-2xl border border-[#E0E4E7] p-6"><span className="text-amber-600 font-mono text-sm">{step.n}</span><h3 className="text-[#12243C] font-bold text-base mt-8">{isAr ? step.ar : step.en}</h3><p className="text-[#627080] text-sm mt-3 leading-6">{isAr ? step.arD : step.enD}</p></div>)}
          </div>
        </div>
      </section>

      {/* Technical Library / Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-300">
          <div>
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
              TECHNICAL DOSSIERS
            </span>
            <h2 className="text-2xl font-black text-[#12243C]">
              {isAr ? 'المكتبة الفنية وإرشادات التوريد' : 'Technical Specifications & Procurement Notes'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/industrial/resources`}
            className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1"
          >
            <span>{isAr ? 'كافة المقالات' : 'All Resources'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/${locale}/preview/industrial/resources/${a.slug}`}
              className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-700 uppercase">
                  {a.category}
                </span>
                <h3 className="text-base font-bold text-[#12243C] group-hover:text-amber-600 transition-colors mt-2 mb-3">
                  {a.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {a.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{new Date(a.published_at).toLocaleDateString(locale)}</span>
                <span className="text-amber-600 font-bold group-hover:underline flex items-center gap-1">
                  <span>{isAr ? 'عرض الدليل' : 'View Guide'}</span>
                  <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SectorDepth sector="industrial" locale={locale} />
    </div>
  );
}

