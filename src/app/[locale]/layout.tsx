import { notFound } from 'next/navigation';
import { locales, getDirection, type Locale } from '@/lib/i18n/config';
import { DemoNoticeBanner } from '@/components/shared/DemoNoticeBanner';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const loc = locale as Locale;
  const dir = getDirection(loc);

  return (
    <html lang={loc} dir={dir}>
      <body className={loc === 'ar' ? 'font-arabic' : 'font-sans'}>
        <DemoNoticeBanner locale={loc} currentPath={`/${loc}`} />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

