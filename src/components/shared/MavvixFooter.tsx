import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { i18nCommon } from '@/lib/i18n/config';

interface Props {
  locale: Locale;
}

export function MavvixFooter({ locale }: Props) {
  const t = i18nCommon[locale];
  const isAr = locale === 'ar';

  return (
    <footer className="bg-mavvix-navy text-slate-400 border-t border-slate-800 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="relative w-36 h-10">
              <Image
                src="/assets/mavvix/site-logo-dark-bg.png"
                alt="Mavvix Software"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-slate-300 max-w-md text-sm leading-relaxed">
              {t.mavvixTagline} — {isAr 
                ? 'مصنع النماذج التفاعلية V2 يقدم مواقع أعمال متكاملة مبنية ببيانات علائقية فعلية وتجربة مستخدم مخصصة لكل قطاع.'
                : 'Demo Factory V2 provides fully realized, bespoke industry concept websites with relational state, protected CMS studio, and production engineering.'}
            </p>
            <div className="inline-block bg-slate-800/80 border border-slate-700/60 rounded px-3 py-1.5 text-xs text-amber-300/90 font-mono">
              DEMO MODE • Persistent SQLite • 8 Industry Verticals
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              {isAr ? 'قطاعات الأعمال' : 'Demo Verticals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href={`/${locale}/preview/construction`} className="hover:text-cyan-400">01. {isAr ? 'مقاولات وهندسة' : 'Construction'}</Link></li>
              <li><Link href={`/${locale}/preview/industrial`} className="hover:text-cyan-400">02. {isAr ? 'صناعات وتصدير' : 'Industrial'}</Link></li>
              <li><Link href={`/${locale}/preview/real-estate`} className="hover:text-cyan-400">03. {isAr ? 'تطوير عقاري' : 'Real Estate'}</Link></li>
              <li><Link href={`/${locale}/preview/dental`} className="hover:text-cyan-400">04. {isAr ? 'عيادات أسنان' : 'Dental'}</Link></li>
              <li><Link href={`/${locale}/preview/ecommerce`} className="hover:text-cyan-400">05. {isAr ? 'متجر أزياء' : 'E-commerce'}</Link></li>
              <li><Link href={`/${locale}/preview/portfolio`} className="hover:text-cyan-400">06. {isAr ? 'بورتفوليو معماري' : 'Portfolio'}</Link></li>
              <li><Link href={`/${locale}/preview/restaurant`} className="hover:text-cyan-400">07. {isAr ? 'مطاعم وضيافة' : 'Restaurant'}</Link></li>
              <li><Link href={`/${locale}/preview/academy`} className="hover:text-cyan-400">08. {isAr ? 'أكاديمية وتدريب' : 'Academy'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              {isAr ? 'إدارة وتشغيل' : 'Management & Sales'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/admin" className="hover:text-cyan-400">{t.adminPortal}</Link></li>
              <li><Link href={`/${locale}/showcase`} className="hover:text-cyan-400">{t.viewShowcase}</Link></li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Mavvix.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Mavvix Software. {t.mavvixAttribution}.</p>
          <p className="text-slate-500">
            {isAr ? 'جميع الشركات والبيانات والأرقام في النماذج افتراضية وتوضيحية.' : 'All brands, data records, and figures within concept demos are synthetic.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

