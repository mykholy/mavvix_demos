import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n/config';
import {
  Home,
  Building,
  Compass,
  Bookmark,
  Scale,
  Calendar,
  Phone,
  ArrowRight,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default function RealEstateLayout({ children, params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const navLinks = [
    { href: `/${locale}/preview/real-estate/properties`, label: isAr ? 'الوحدات المتاحة' : 'Properties' },
    { href: `/${locale}/preview/real-estate/developments`, label: isAr ? 'المجمعات السكنية' : 'Developments' },
    { href: `/${locale}/preview/real-estate/compare`, label: isAr ? 'المقارنة الفنية' : 'Compare' },
    { href: `/${locale}/preview/real-estate/saved`, label: isAr ? 'المحفوظات' : 'Shortlist' },
    { href: `/${locale}/preview/real-estate/journal`, label: isAr ? 'دليل الأحياء' : 'Guides' },
    { href: `/${locale}/preview/real-estate/about`, label: isAr ? 'عن ميريديان' : 'About' },
    { href: `/${locale}/preview/real-estate/contact`, label: isAr ? 'تواصل معنا' : 'Contact' },
  ];

  return (
    <div className="bg-[#F5F0E6] text-[#25312D] min-h-screen flex flex-col font-sans selection:bg-[#A8764F] selection:text-white">
      {/* Brand Header */}
      <header className="sticky top-0 z-40 bg-[#25312D] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href={`/${locale}/preview/real-estate`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#A8764F] flex items-center justify-center text-white font-bold tracking-widest text-lg shadow-sm">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-widest uppercase block text-white group-hover:text-amber-200 transition-colors font-serif">
                MERIDIAN
              </span>
              <span className="text-[11px] font-medium text-stone-300 block tracking-wider">
                {isAr ? 'ميريديان للتطوير والاستثمار العقاري' : 'Residences & Community Developments'}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/preview/real-estate/viewing`}
              className="inline-flex items-center gap-2 bg-[#A8764F] hover:bg-[#8e613e] text-white text-xs font-bold px-4 py-2.5 rounded shadow-sm transition-all uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'طلب معاينة خاصة' : 'Request Viewing'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="flex-1">
        {children}
      </div>

      {/* Brand Footer */}
      <footer className="bg-[#25312D] text-stone-400 border-t border-stone-800 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#A8764F] flex items-center justify-center text-white font-bold text-sm">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-extrabold text-white tracking-widest uppercase font-serif">
                  MERIDIAN RESIDENCES
                </span>
              </div>
              <p className="text-stone-300 text-xs max-w-md leading-relaxed">
                {isAr
                  ? 'منصة تطوير عقاري راقية تعرض مجمعات سكنية متكاملة ووحدات فاخرة، مع إمكانية مقارنة المخططات وحساب خطط السداد وطلب معاينات تجريبية.'
                  : 'Premier residential portfolio showcasing masterplanned communities, apartment layouts, and transparent installment calculators.'}
              </p>
              <div className="inline-block bg-stone-900 border border-stone-800 rounded px-3 py-1.5 text-[11px] text-amber-300 font-mono">
                Concept Website by Mavvix Software • Simulated Real Estate Demo
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-4">
                {isAr ? 'تصفح العقارات' : 'Explore Portfolio'}
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
                {isAr ? 'المعاينة والمقارنة' : 'Tools & Services'}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}/preview/real-estate/compare`} className="text-amber-300 hover:underline">
                    {isAr ? 'مقارنة 3 وحدات فنية' : '3-Unit Comparison'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/real-estate/viewing`} className="hover:text-white">
                    {isAr ? 'حجز موعد معاينة تجريبي' : 'Simulated Viewing Request'}
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

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
            <p>© {new Date().getFullYear()} Meridian Residences. Simulated concept data for evaluation.</p>
            <p>Designed and engineered for Mavvix Demo Factory V2.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

