import Link from 'next/link';
import { AlertCircle, Globe, ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { i18nCommon } from '@/lib/i18n/config';

interface Props {
  locale: Locale;
  currentPath?: string;
}

export function DemoNoticeBanner({ locale, currentPath = '' }: Props) {
  const t = i18nCommon[locale];
  const targetLocale: Locale = locale === 'ar' ? 'en' : 'ar';
  
  // Replace current locale prefix if present
  let switchedPath = currentPath;
  if (switchedPath.startsWith(`/${locale}`)) {
    switchedPath = switchedPath.replace(`/${locale}`, `/${targetLocale}`);
  } else {
    switchedPath = `/${targetLocale}`;
  }

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 z-50 relative">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t.demoNotice}</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link
            href={`/${locale}/showcase`}
            className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>{t.viewShowcase}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={switchedPath}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1.5 transition-colors font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.switchLanguage}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

