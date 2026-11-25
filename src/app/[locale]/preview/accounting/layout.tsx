import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { ledgerPath } from '@/lib/verticals/accounting/data';
import { ChartNoAxesCombined,ArrowUpRight,FileSpreadsheet,ShieldCheck } from 'lucide-react';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 const ar=locale==='ar',title=ar?'LedgerPoint — تجربة موقع خدمات محاسبية احترافي من مافكس':'LedgerPoint — Premium Accounting Firm Website Experience by Mavvix';
 const description=ar?'موقع أعمال محاسبية بتصميم مميز لخدمات مسك الدفاتر والتسويات والتقارير ونموذج طلب عرض آمن للشركات في مصر والخليج، من مافكس.':'A bilingual accounting website concept with sector-specific reporting guidance and strictly minimal accounting-service enquiries, designed by Mavvix.';
 return {title,description,robots:{index:false,follow:false},openGraph:{title,description,type:'website'}};
}
export default async function LedgerLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 const ar=locale==='ar';const nav=[
  {href:ledgerPath(locale,'services'),label:ar?'الخدمات':'Services'},
  {href:ledgerPath(locale,'industries'),label:ar?'القطاعات':'Industries'},
  {href:ledgerPath(locale,'reporting'),label:ar?'التقارير':'Reporting'},
  {href:ledgerPath(locale,'compliance'),label:ar?'الالتزامات':'Compliance'},
  {href:ledgerPath(locale,'resources'),label:ar?'المعرفة':'Resources'},
  {href:ledgerPath(locale,'process'),label:ar?'طريقة العمل':'Process'},
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="ledger-shell min-h-screen bg-[#F0EEE8] text-[#1C3343]">
  <div className="bg-[#1C3343] text-[#CBF6F2] text-[11px] px-5 py-2 text-center leading-6">
   {ar?'LedgerPoint تصور موقع محاسبي من Mavvix؛ لا يمثل مكتب محاسبة أو مراجعة معتمدًا ولا يقبل مستندات مالية':'LedgerPoint is a Mavvix accounting website concept, not a licensed accountancy firm or confidential financial-record portal'}
  </div>
  <header className="sticky top-0 z-40 bg-[#F9F8F4]/95 backdrop-blur-md border-b border-[#CBD6D6]">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[78px] flex items-center justify-between gap-3">
    <Link href={ledgerPath(locale)} aria-label={ar?'الرئيسية':'Home'} className="flex items-center gap-2 sm:gap-3 shrink-0">
     <span className="w-9 h-9 sm:w-11 sm:h-11 bg-[#1C3343] text-[#50C2C3] grid place-items-center rounded-sm"><ChartNoAxesCombined size={23} strokeWidth={1.7}/></span>
     <span><strong className="ledger-display tracking-[-.04em] block text-[20px] sm:text-3xl leading-none font-black">LEDGER<span className="text-[#15858C]">POINT</span></strong><small className="text-[#4C6570] block text-[9px] tracking-[.16em] mt-1">CLARITY IN EVERY RECORD</small></span>
    </Link>
    <nav aria-label={ar?'القائمة الرئيسية':'Main navigation'} className="hidden xl:flex items-center gap-5 text-xs font-bold text-[#46636E]">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-[#087D86]">{n.label}</Link>)}</nav>
    <div className="flex gap-2 items-center"><Link aria-label={ar?'طلب عرض نطاق محاسبي':'Request accounting scope'} href={ledgerPath(locale,'quote')} className="bg-[#1C3343] text-white h-11 px-3 sm:px-5 inline-flex gap-2 items-center text-xs font-bold"><span className="hidden sm:inline">{ar?'اطلب عرض':'Request a proposal'}</span><ArrowUpRight size={18}/></Link><MobileSectorNav breakpoint="xl" tone="light" links={[...nav,{href:ledgerPath(locale,'quote'),label:ar?'طلب عرض':'Request quote'}]}/></div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#142B37] text-white pt-20 pb-32 sm:pb-20"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.2fr_.8fr_.8fr] gap-12">
   <div><h2 className="ledger-display text-4xl font-black">LEDGER<span className="text-[#50C2C3]">POINT.</span></h2><p className="mt-6 max-w-md leading-9 text-sm text-[#C4D6DB]">{ar?'هوية تحريرية من مافكس لعرض موقع خدمات محاسبية متخصصة، لا يمثل مكتبًا حقيقيًا أو مدققين معتمدين أو أتعابًا أو نتائج مالية فعلية.':'A Mavvix editorial accounting website concept, not a licensed firm, an audited report, a published client result or a firm fee schedule.'}</p></div>
   <div><h3 className="text-[#83DFDF] font-bold text-sm">{ar?'استكشف':'Explore'}</h3><div className="mt-6 flex flex-col gap-3 text-sm text-[#CCDEE2]">{nav.slice(0,5).map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div>
   <div><h3 className="text-[#83DFDF] font-bold text-sm">{ar?'لشركة المحاسبة الخاصة بك':'Commission your firm website'}</h3><p className="text-sm text-[#CCDEE2] mt-6 leading-8">{ar?'مافكس تبني مواقع تتوافق مع بيانات مكتبك الفعلية، بإدارة محتوى وطلبات عملاء مخصصة.':'Mavvix can build your site around verified practitioner credentials and your actual services and workflow.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="text-sm font-bold mt-6 inline-flex items-center gap-2 underline underline-offset-8">{ar?'تواصل مع مافكس':'Contact Mavvix'}<ArrowUpRight size={17}/></a></div>
  </div><div className="max-w-7xl mx-auto px-5 sm:px-8 text-xs text-[#A6C0CA] pt-9 mt-14 border-t border-white/15 flex flex-wrap justify-between gap-4"><span>© Mavvix Software — LedgerPoint</span><Link href={'/'+locale+'/showcase'}>{ar?'معرض المواقع':'All industries'}</Link></div></footer>
  <ContactDock sector="accounting" locale={locale}/>
 </div>;
}
