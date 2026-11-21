import { SectorUtilityBar } from '@/components/shared/SectorUtilityBar';
import { ContactDock } from '@/components/shared/ContactDock';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { CartProvider } from '@/lib/ecommerce/cart-context';
import EcommerceHeader from './EcommerceHeader';
import { Sparkles, Shield, AlertTriangle, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';

export default function EcommerceLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1715] font-sans antialiased selection:bg-[#1A1715] selection:text-[#FAF8F5]">
        <SectorUtilityBar sector="ecommerce" locale={locale} />
      {/* Dynamic Header */}
        <EcommerceHeader locale={locale} />

        {/* Main Body */}
        <main className="flex-1">
          {children}
        </main>

        {/* Editorial Footer */}
        <footer className="bg-[#141210] text-[#EAE4DC] pt-16 pb-12 border-t border-[#26221E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
              {/* Col 1: Brand */}
              <div className="space-y-4">
                <div className="font-serif text-2xl font-bold tracking-wider text-white">
                  {isAr ? 'نوريا أتيليه' : 'NORIA ATELIER'}
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {isAr
                    ? 'دار تصميم مصرية معاصرة للأزياء المصنوعة من الألياف الطبيعية والكتان الفاخر، صممت لتعيش طويلاً وتتجاوز المواسم.'
                    : 'Contemporary Egyptian atelier crafting architectural garments from natural linen and sustainable fibers. Designed to transcend seasons.'}
                </p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#D8B4A6] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#D8B4A6] flex-shrink-0 mt-0.5" />
                  <span>
                    {isAr
                      ? 'تجربة متجر صممتها مافكس؛ يمكن تنفيذ نفس الوظائف لنشاطك بالمنتجات والأسعار الفعلية.'
                      : 'Storefront experience built by Mavvix; real sales require approved products, inventory and fulfilment.'}
                  </span>
                </div>
              </div>

              {/* Col 2: Collections */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#D8B4A6] mb-4">
                  {isAr ? 'التشكيلات' : 'Collections'}
                </h3>
                <ul className="space-y-2 text-xs text-white/80">
                  <li><Link href={`/${locale}/preview/ecommerce/collections/apparel`} className="hover:text-white transition-colors">{isAr ? 'الملابس اليومية' : 'Everyday Apparel'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/collections/dresses`} className="hover:text-white transition-colors">{isAr ? 'فساتين الكتان' : 'Linen Dresses'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/collections/accessories`} className="hover:text-white transition-colors">{isAr ? 'الإكسسوارات المصنوعة يدوياً' : 'Artisan Accessories'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/collections/sets`} className="hover:text-white transition-colors">{isAr ? 'أطقم الأتيليه' : 'Tailored Sets'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/collections`} className="hover:text-white transition-colors">{isAr ? 'جميع المنتجات (24 قطة)' : 'All Products (24 Items)'}</Link></li>
                </ul>
              </div>

              {/* Col 3: Customer Care & Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#D8B4A6] mb-4">
                  {isAr ? 'خدمة العملاء' : 'Customer Care'}
                </h3>
                <ul className="space-y-2 text-xs text-white/80">
                  <li><Link href={`/${locale}/preview/ecommerce/help`} className="hover:text-white transition-colors">{isAr ? 'مناطق الشحن والرسوم' : 'Shipping Zones & Fees'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/help`} className="hover:text-white transition-colors">{isAr ? 'سياسة الاستبدال والعناية' : 'Returns & Exchange Policy'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/help`} className="hover:text-white transition-colors">{isAr ? 'دليل المقاسات والعناية' : 'Size Guide & Fabric Care'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/story`} className="hover:text-white transition-colors">{isAr ? 'حرفية النسيج الطبيعي' : 'Artisan Craftsmanship'}</Link></li>
                  <li><Link href={`/${locale}/preview/ecommerce/journal`} className="hover:text-white transition-colors">{isAr ? 'مجلة الأسلوب' : 'Style Journal'}</Link></li>
                </ul>
              </div>

              {/* Col 4: Commercial Commission CTA */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#D8B4A6] mb-4">
                  {isAr ? 'هل تمتلك علامة تجارية؟' : 'Fashion Brand Owner?'}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {isAr
                    ? 'تبني مافيكس متاجر إلكترونية فائقة السرعة مع إدارة للمخزون، وفلاتر للمقاسات والألوان، ومسار سلة ودفع يحقق أعلى معدلات تحويل.'
                    : 'Mavvix crafts high-converting boutique ecommerce stores with robust variant inventory, promotional pricing engines, and flawless checkout UX.'}
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || (isAr ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C89B8C] hover:bg-[#B88777] text-[#1A1715] text-xs font-bold transition-colors"
                >
                  <span>{isAr ? 'اطلب متجرك الإلكتروني من مافيكس' : 'Commission an Ecommerce Store'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
              <p>
                © {new Date().getFullYear()} Noria Atelier — store design by Mavvix. No financial payment is collected through this experience.
              </p>
              <div className="flex items-center gap-6">
                <Link href={`/${locale}/preview/ecommerce/help`} className="hover:text-white transition-colors">
                  {isAr ? 'شروط العرض التوضيحي' : 'Site Information & Policies'}
                </Link>
                <Link href={`/${locale}/showcase`} className="text-[#C89B8C] hover:underline">
                  {isAr ? 'معرض نماذج مافيكس' : 'Mavvix Showcase'}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <ContactDock locale={locale} sector="ecommerce" />
      </div>
    </CartProvider>
  );
}

