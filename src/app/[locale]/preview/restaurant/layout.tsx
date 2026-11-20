import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { OrderProvider } from '@/lib/restaurant/order-context';
import { RestaurantHeader } from './RestaurantHeader';

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const mavvixSalesUrl = process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/contact';

  return (
    <OrderProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF3E6] text-[#321F18] font-sans selection:bg-[#BA5C34] selection:text-white">
        {/* Top Concept Demo Bar */}
        <div className="bg-[#321F18] text-[#FAF3E6] text-xs py-2 px-4 border-b border-[#321F18]/20">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-center sm:text-start">
              <span className="inline-block w-2 h-2 rounded-full bg-[#BA5C34] animate-pulse" />
              <span>
                {isAr
                  ? 'عرض توضيحي توضيحي من مافيكس — نموذج تفاعلي لمطعم شرقي ذكي، لا يتصل بمطابخ حقيقية أو عمليات دفع فعلية.'
                  : 'Saffron Table — Modern Dining Experience. No real kitchen order or financial transaction.'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <Link
                href={`/${locale}/showcase`}
                className="underline hover:text-[#BA5C34] transition-colors"
              >
                {isAr ? 'العودة لمعرض مافيكس' : 'Back to Showcase'}
              </Link>
              <a
                href={mavvixSalesUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#BA5C34] hover:underline"
              >
                {isAr ? 'طلب منصة لمطعمك' : 'Build Your Restaurant Platform'}
              </a>
            </div>
          </div>
        </div>

        {/* Header */}
        <RestaurantHeader locale={locale} />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#261711] text-[#FAF3E6] border-t border-[#321F18]/40 pt-16 pb-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
              {/* Brand Col */}
              <div className="md:col-span-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#BA5C34] text-white flex items-center justify-center font-serif text-lg font-bold">
                    ز
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold">
                      {isAr ? 'سُفرة زعفران' : 'SAFFRON TABLE'}
                    </h3>
                    <p className="text-[11px] text-[#8B8B52] uppercase tracking-wider font-medium">
                      {isAr ? 'مطبخ وتراث شرقي' : 'Heritage Culinary Experience'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {isAr
                    ? 'تجربة طعام شرقية تحتفي بالنكهات الأصيلة والزعفران البلدي والأعشاب الجبلية في أجواء دافئة مفعمة بكرم الضيافة.'
                    : 'Eastern culinary dining celebrating authentic heirloom spices, pure mountain saffron, and genuine hospitality.'}
                </p>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold mb-4">
                  {isAr ? 'استكشف القائمة' : 'Explore'}
                </h4>
                <ul className="space-y-2 text-xs text-white/80">
                  <li>
                    <Link href={`/${locale}/preview/restaurant/menu`} className="hover:text-white transition-colors">
                      {isAr ? 'قائمة الطعام الكاملة' : 'Full Menu'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/preview/restaurant/story`} className="hover:text-white transition-colors">
                      {isAr ? 'فلسفة الطهي والبهارات' : 'Kitchen Philosophy'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/preview/restaurant/locations`} className="hover:text-white transition-colors">
                      {isAr ? 'الفروع وساعات العمل' : 'Branches & Hours'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/preview/restaurant/reserve`} className="hover:text-white transition-colors">
                      {isAr ? 'حجز طاولة توضيحي' : 'Table Reservation'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/preview/restaurant/journal`} className="hover:text-white transition-colors">
                      {isAr ? 'مقالات وأسرار النكهة' : 'Culinary Journal'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/preview/restaurant/faq`} className="hover:text-white transition-colors">
                      {isAr ? 'الأسئلة والحساسيات' : 'FAQ & Allergens'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Branches */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold mb-4">
                  {isAr ? 'الفروع التوضيحية' : 'Concept Branches'}
                </h4>
                <ul className="space-y-3 text-xs text-white/80">
                  <li>
                    <span className="font-semibold block text-white">
                      {isAr ? 'فرع جاردن سيتي والحديقة' : 'Garden Pavilion (Zamalek)'}
                    </span>
                    <span className="text-white/60">
                      {isAr ? '١٤ شارع شجرة الدر — يوميًا ١١ ص - ١١ م' : '14 Shagaret El Dorr St — Daily 11 AM - 11 PM'}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold block text-white">
                      {isAr ? 'فرع تراس الكورنيش' : 'Corniche Terrace (Maadi)'}
                    </span>
                    <span className="text-white/60">
                      {isAr ? '٧٨ طريق الكورنيش — يوميًا ١٢ ظ - ١٢ منتصف الليل' : '78 Nile Corniche Rd — Daily 12 PM - 12 Midnight'}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold block text-white">
                      {isAr ? 'فرع وسط البلد العريق' : 'Historic Downtown (Talaat Harb)'}
                    </span>
                    <span className="text-white/60">
                      {isAr ? '٢٢ شارع طلعت حرب — يوميًا ١١ ص - ١١ م' : '22 Talaat Harb St — Daily 11 AM - 11 PM'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Commercial Mavvix CTA */}
              <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#BA5C34] block">
                  {isAr ? 'حلول مافيكس للمطاعم' : 'Mavvix Commercial'}
                </span>
                <p className="text-xs text-white/90 leading-relaxed">
                  {isAr
                    ? 'هل تمتلك مطعمًا أو علامة ضيافة وترغب في منصة طلبات وحجوزات متكاملة وعالية السرعة بهويتك الخاصة؟'
                    : 'Want a high-speed, mobile-first ordering and reservation system custom crafted for your restaurant or cafe?'}
                </p>
                <a
                  href={mavvixSalesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-semibold px-4 py-2 rounded-lg bg-[#BA5C34] text-white hover:bg-[#9E4A28] transition-colors"
                >
                  {isAr ? 'تواصل مع فريق مافيكس' : 'Schedule a Discovery Call'}
                </a>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
              <p>
                © 2026 SAFFRON TABLE. {isAr ? 'مفهوم رقمي مصمم ومطور بواسطة' : 'Concept design by'}{' '}
                <a href={mavvixSalesUrl} target="_blank" rel="noreferrer" className="text-[#BA5C34] hover:underline">
                  Mavvix
                </a>.
              </p>
              <div className="flex items-center gap-6">
                <span>{isAr ? 'تجربة تفاعلية آمنة (بدون دفع فعلي)' : 'Online Menu (No Payments Collected)'}</span>
                <Link href={`/${locale}/showcase`} className="hover:text-white transition-colors">
                  {isAr ? 'المعرض الرئيسي' : 'Main Showcase'}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </OrderProvider>
  );
}

