import { notFound } from 'next/navigation';
import { locales, getDirection, type Locale } from '@/lib/i18n/config';
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const loc = params.locale as Locale;
  return <div lang={loc} dir={getDirection(loc)} className={loc === 'ar' ? 'font-arabic' : 'font-sans'}>
    <main className="min-h-screen flex flex-col">{children}</main>
  </div>;
}
