import Link from 'next/link';
import Image from 'next/image';
import { Layers, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { i18nCommon } from '@/lib/i18n/config';

interface Props {
  locale: Locale;
}

export function MavvixHeader({ locale }: Props) {
  const t = i18nCommon[locale];
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <header className="sticky top-0 z-40 bg-mavvix-navy/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={`/${locale}/showcase`} className="flex items-center gap-3 group">
          <div className="relative w-36 h-10">
            <Image
              src="/assets/mavvix/site-logo-dark-bg.png"
              alt="Mavvix Software"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden sm:inline-block text-xs font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-mavvix-blue/30 text-cyan-300 border border-cyan-500/20">
            Mavvix Studio
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={`/${locale}/showcase`}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>{locale === 'ar' ? 'نماذج الأعمال' : 'Our Work'}</span>
          </Link>
          <Link
            href={locale === 'ar' ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{locale === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-mavvix-blue hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <span>{t.requestSimilar}</span>
            <Arrow className="w-3.5 h-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

