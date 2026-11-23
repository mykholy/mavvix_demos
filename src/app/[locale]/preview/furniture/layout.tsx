import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { oakPath } from '@/lib/verticals/furniture/data';
import { Armchair,ArrowUpRight,Leaf,Home } from 'lucide-react';

export default function OaklineLayout({children,params:{locale}}:{children:React.ReactNode;params:{locale:Locale}}){
 const ar=locale==='ar';const nav=[
  {href:oakPath(locale,'rooms'),label:ar?'الغرف':'Rooms'},
  {href:oakPath(locale,'collections'),label:ar?'المجموعات':'Collections'},
  {href:oakPath(locale,'materials'),label:ar?'دليل الخامات':'Materials'},
  {href:oakPath(locale,'process'),label:ar?'من الفكرة للتنفيذ':'Process'},
  {href:oakPath(locale,'journal'),label:ar?'مقالات البيت':'Journal'},
  {href:oakPath(locale,'about'),label:ar?'حكايتنا':'Story'},
 ];
 return <div dir={ar?'rtl':'ltr'} lang={locale} className="oakline-shell min-h-screen bg-[#F4EFE6] text-[#392C24] selection:bg-[#E1BD8A] selection:text-[#392C24]">
  <div className="bg-[#60452F] text-[#FAF0E2] px-4 py-2 text-xs text-center font-semibold">
   {ar?'تصميم موقع أثاث حسب الطلب من مافكس — القطع والصور توضيحية ولا يوجد تصنيع أو شراء مؤكد':'A Mavvix custom-furniture website concept — illustrative pieces, no confirmed products or orders'}
  </div>
  <header className="sticky z-40 top-0 bg-[#F9F5ED]/95 backdrop-blur-lg border-b border-[#D8CCBD]">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[88px] flex items-center justify-between gap-3">
    <Link href={oakPath(locale)} className="min-w-0 flex gap-3 items-center" aria-label={ar?'الرئيسية':'Oakline home'}>
     <span className="min-w-11 min-h-11 w-11 h-11 rounded-full border-2 border-[#685139] grid place-items-center"><Armchair size={25} strokeWidth={1.3}/></span>
     <span className="flex flex-col min-w-0"><strong className="oakline-display text-[25px] sm:text-[32px] leading-none tracking-tight font-medium whitespace-nowrap">OAKLINE<span className="text-[#AD8352]">.</span></strong><span className="text-[9px] sm:text-[10px] tracking-[.16em] sm:tracking-[.28em] text-[#6B5947] font-semibold mt-1">LIVING / BY DESIGN</span></span>
    </Link>
    <nav aria-label={ar?'القائمة الرئيسية':'Main navigation'} className="hidden xl:flex items-center gap-6 text-xs font-bold text-[#584737]">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-[#996735]">{n.label}</Link>)}</nav>
    <div className="flex shrink-0 gap-2 items-center"><Link aria-label={ar?'طلب تسعير أثاث':'Furniture quote basket'} href={oakPath(locale,'quote')} className="min-w-11 min-h-11 px-3 sm:px-6 py-3 bg-[#392C24] text-[#F8F2E9] rounded-full inline-flex items-center justify-center gap-2 text-xs font-extrabold">
      <Leaf size={18}/><span className="hidden sm:inline">{ar?'ابدأ طلب تسعير':'PREPARE A QUOTE'}</span>
     </Link><MobileSectorNav links={[...nav,{href:oakPath(locale,'quote'),label:ar?'طلب تسعير':'Quote request'}]}/></div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#30271F] text-[#F6EBDD] pt-20 pb-32 sm:pb-20">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_.8fr_.8fr] gap-10">
    <div><Armchair size={37} className="text-[#DAB48B]"/><p className="oakline-display text-4xl sm:text-5xl mt-6">OAKLINE.</p><p className="text-sm leading-9 mt-5 text-[#E4D6C5] max-w-sm">{ar?'استوديو تحريري للأثاث حسب الطلب من مافكس. لا توجد ورشة أو منتجات للبيع أو عملاء موثقون وراء اسم Oakline.':'An editorial, design-focused furniture website by Mavvix. Oakline is not an operating maker, retailer, or documented customer portfolio.'}</p></div>
    <div><h2 className="text-[#E7C299] font-black text-xs tracking-widest">{ar?'استكشف':'DISCOVER'}</h2><div className="flex flex-col gap-4 mt-7 text-sm text-[#E5D6C6]">{nav.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div>
    <div><h2 className="text-[#E7C299] font-black text-xs tracking-widest">{ar?'موقع لمعرضك الحقيقي':'YOUR REAL FURNITURE BRAND'}</h2><p className="text-sm mt-7 leading-9 text-[#E5D6C6]">{ar?'مافكس تقدر تنفذ موقع بخاماتك الحقيقية وأبعادك المعتمدة وسلة عروض أسعار متصلة بلوحة إدارة.':'Mavvix can adapt this site with your real materials, verified dimensions, customer consent and quote-workflow administration.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} rel="noopener noreferrer" target="_blank" className="mt-6 inline-flex gap-3 text-[#F3CFA1] text-sm font-bold">{ar?'اطلب تنفيذ الموقع':'Discuss your furniture website'}<ArrowUpRight size={18}/></a></div>
   </div>
   <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-14 border-t border-[#6B5641] pt-7 text-xs text-[#E4D6C5] flex flex-wrap justify-between gap-4"><span>© Mavvix Software — Oakline Living concept</span><Link href={'/'+locale+'/showcase'}>{ar?'كل القطاعات':'Industry showcase'}</Link></div>
  </footer>
  <ContactDock sector="furniture" locale={locale}/>
 </div>;
}
