import { notFound } from 'next/navigation';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n/config';
import {
  HardHat,
  Compass,
  Layers,
  FileText,
  Calculator,
  Info,
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
  params: Promise<{ locale: string }>;
}

export default async function ConstructionLayout(props: Props) {
  const params = await props.params;

  const {
    children
  } = props;

  const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const navLinks = [
    { href: `/${locale}/preview/construction/projects`, label: isAr ? 'المشاريع' : 'Projects' },
    { href: `/${locale}/preview/construction/services`, label: isAr ? 'الخدمات الهندسية' : 'Services' },
    { href: `/${locale}/preview/construction/process`, label: isAr ? 'منهجية التنفيذ' : 'Methodology' },
    { href: `/${locale}/preview/construction/journal`, label: isAr ? 'المقالات والأفكار' : 'Journal' },
    { href: `/${locale}/preview/construction/about`, label: isAr ? 'عن الاستوديو' : 'About' },
    { href: `/${locale}/preview/construction/contact`, label: isAr ? 'تواصل معنا' : 'Contact' },
  ];

  return (
    <div className="bg-[#F2EFE9] text-[#162327] min-h-screen flex flex-col font-sans selection:bg-[#D97935] selection:text-white">
      {/* Brand Header */}
      <header className="sticky top-0 z-40 bg-[#162327] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href={`/${locale}/preview/construction`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#D97935] flex items-center justify-center text-white font-bold tracking-widest text-lg shadow-sm">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-widest uppercase block text-white group-hover:text-amber-400 transition-colors">
                ATLAS STRUCTURES
              </span>
              <span className="text-[11px] font-medium text-stone-300 block tracking-wider">
                {isAr ? 'أطلس للبناء والتطوير الهندسي' : 'General Contracting & Fit-Out'}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase">
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
          <MobileSectorNav links={navLinks} />

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/preview/construction/request-quote`}
              className="inline-flex items-center gap-2 bg-[#D97935] hover:bg-[#b85629] text-white text-xs font-bold px-4 py-2.5 rounded shadow-sm transition-all uppercase tracking-wider"
            >
              <span>{isAr ? 'طلب تسعير مناقصة' : 'Tender Quote'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="flex-1">
        {children}
      </div>

      {/* Brand Footer */}
      <footer className="bg-[#162327] text-stone-400 border-t border-stone-800 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#D97935] flex items-center justify-center text-white font-bold text-sm">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-extrabold text-white tracking-widest uppercase">
                  ATLAS STRUCTURES
                </span>
              </div>
              <p className="text-stone-300 text-xs max-w-md leading-relaxed">
                {isAr
                  ? 'شركة مقاولات هندسية متخصصة في تنفيذ المشروعات السكنية والتجارية وتجهيزات المقرات الإدارية بأعلى معايير الجودة والتوصيف الهندسي الدقيق.'
                  : 'Bespoke contracting and engineering firm specializing in commercial fit-outs, residential structural construction, and rigorous turnkey delivery.'}
              </p>
              <div className="inline-block bg-stone-900 border border-stone-800 rounded px-3 py-1.5 text-[11px] text-amber-400/90 font-mono">
                Digital Experience by Mavvix Studio
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-4">
                {isAr ? 'روابط الموقع' : 'Navigation'}
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
                {isAr ? 'التسعير والمناقصات' : 'Tenders & Inquiry'}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}/preview/construction/request-quote`} className="text-amber-400 hover:underline">
                    {isAr ? 'معالج تقدير تكلفة المشروع' : 'Tender Scope Builder'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/preview/construction/process`} className="hover:text-white">
                    {isAr ? 'مراحل ومخرجات العمل' : 'Project Deliverables'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/showcase`} className="text-cyan-400 hover:underline flex items-center gap-1 mt-4">
                    <span>{isAr ? 'العودة لمعرض Mavvix' : 'Mavvix Showcase'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-300">
            <p>© {new Date().getFullYear()} Atlas Structures — design experience by Mavvix. Project examples are illustrative, not confirmed delivered contracts.</p>
            <p>Designed and built for Mavvix Studio.</p>
          </div>
        </div>
      </footer>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <ContactDock locale={locale} sector="construction" />
    </div>
  );
}

