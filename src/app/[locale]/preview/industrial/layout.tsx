import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n/config';
import {
  Factory,
  Cog,
  Layers,
  FileSpreadsheet,
  FileText,
  Building2,
  Phone,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  PackageCheck
} from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default function IndustrialLayout({ children, params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const navLinks = [
    { href: `/${locale}/preview/industrial/products`, label: isAr ? 'دليل المنتجات والمواصفات' : 'Products & SKUs' },
    { href: `/${locale}/preview/industrial/compare`, label: isAr ? 'مقارنة المواصفات' : 'Compare' },
    { href: `/${locale}/preview/industrial/industries`, label: isAr ? 'القطاعات والتطبيقات' : 'Industries' },
    { href: `/${locale}/preview/industrial/process`, label: isAr ? 'خطوط الإنتاج والتصنيع' : 'Processes' },
    { href: `/${locale}/preview/industrial/resources`, label: isAr ? 'المكتبة الفنية' : 'Technical Library' },
    { href: `/${locale}/preview/industrial/about`, label: isAr ? 'عن فيرولاين' : 'About' },
    { href: `/${locale}/preview/industrial/contact`, label: isAr ? 'التواصل والتوريد' : 'Contact' },
  ];

  return (
    <div className="bg-[#F4F6F6] text-[#12243C] min-h-screen flex flex-col font-sans selection:bg-[#DE9E37] selection:text-slate-900">
      {/* Brand Header */}
      <header className="sticky top-0 z-40 bg-[#12243C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href={`/${locale}/preview/industrial`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#DE9E37] flex items-center justify-center text-slate-950 font-black tracking-widest text-lg shadow-sm">
              <Factory className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-widest uppercase block text-white group-hover:text-amber-400 transition-colors font-mono">
                FERROLINE
              </span>
              <span className="text-[11px] font-medium text-slate-400 block tracking-wider">
                {isAr ? 'فيرولاين للصناعات والتوريدات المعدنية' : 'Industrial Supplies & Precision Manufacturing'}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/preview/industrial/rfq`}
              className="inline-flex items-center gap-2 bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 text-xs font-black px-4 py-2.5 rounded shadow-sm transition-all uppercase tracking-wider"
            >
              <PackageCheck className="w-4 h-4" />
              <span>{isAr ? 'سلة التسعير (RFQ)' : 'RFQ Basket'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="flex-1">
        {children}
      </div>

      {/* Brand Footer */}
      <footer className="bg-[#12243C] text-slate-400 border-t border-slate-800 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#DE9E37] flex items-center justify-center text-slate-950 font-black text-sm">
                  <Factory className="w-4 h-4 text-slate-950" />
                </div>
                <span className="text-sm font-extrabold text-white tracking-widest uppercase font-mono">
                  FERROLINE INDUSTRIES
                </span>
              </div>
              <p className="text-slate-300 text-xs max-w-md leading-relaxed">
                {isAr
                  ? 'مجموعة صناعية متخصصة في إنتاج وتوريد قطاعات الصلب، الوصلات الميكانيكية، وحلول التشكيل المعدني المعتمدة وفق المعايير القياسية العالمية.'
                  : 'Precision manufacturing and industrial metallurgical supplier delivering structural steel profiles, high-tensile fasteners, and certified OEM assemblies.'}
              </p>
              <div className="inline-block bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-[11px] text-amber-400 font-mono">
                Concept Website by Mavvix Software • Simulated Industrial Catalog Demo
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-4">
                {isAr ? 'أقسام الموقع' : 'Navigation'}
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-4">
                {isAr ? 'التوريد والتصدير' : 'Sourcing & RFQ'}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}/preview/industrial/rfq`} className="text-amber-400 hover:underline">
                    {isAr ? 'سلة طلب عروض الأسعار (RFQ)' : 'Multi-line RFQ Basket'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/industrial/compare`} className="hover:text-white">
                    {isAr ? 'مقارنة المواصفات الفنية' : 'Spec Comparator'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/showcase`} className="text-cyan-400 hover:underline flex items-center gap-1 mt-4">
                    <span>{isAr ? 'العودة لمعرض Mavvix' : 'Mavvix Demo Showcase'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} FERROLINE Industries. Synthetic data for demonstrative purposes.</p>
            <p>Built for Mavvix Demo Factory V2.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

