import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { glossPath } from '@/lib/verticals/car-detailing/data';
import { Droplets, ArrowUpRight, CarFront, Waves } from 'lucide-react';
export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 const title=ar?'موقع ديتيلنج وحماية سيارات | GlossBay من مافكس':'Premium Car Detailing Website | GlossBay by Mavvix';
 const description=ar?'تجربة موقع لغسيل وتلميع السيارات بحزمة خدمات متخصصة وطلب عرض سعر حسب حجم السيارة والإضافات، دون حجز وهمي.':'Bilingual car detailing concept with a specialist treatment catalogue and transparent vehicle-size quote request by Mavvix.';
 return {title,description,openGraph:{title,description,type:'website'},robots:{index:false,follow:false}};
}
export default async function GlossLayout(props:{children:React.ReactNode;params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const {
  children
 } = props;

 const ar=locale==='ar';
 const nav=[
  {href:glossPath(locale,'packages'),label:ar?'الباقات':'Packages'},
  {href:glossPath(locale,'detailing'),label:ar?'الديتيلنج':'Detailing'},
  {href:glossPath(locale,'ceramic'),label:ar?'الحماية':'Protection'},
  {href:glossPath(locale,'gallery'),label:ar?'الصور':'Gallery'},
  {href:glossPath(locale,'fleet'),label:ar?'الأساطيل':'Fleet'},
  {href:glossPath(locale,'journal'),label:ar?'دليل العناية':'Journal'},
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="gloss-shell min-h-screen bg-[#F4F7FA] text-[#0D1626] selection:bg-[#4CCBF4] selection:text-[#0D1626]">
  <div className="bg-[#14293C] text-[#D9F3FB] text-[11px] text-center font-semibold leading-6 px-4 py-2">{ar?'تصميم موقع عناية بالسيارات من مافكس · الطلبات للتوضيح وليست مواعيد صيانة فعلية':'Mavvix car-care website concept · enquiries do not confirm real studio appointments'}</div>
  <header className="sticky top-0 z-40 bg-[#0D1626]/95 backdrop-blur-xl text-white border-b border-[#28516A]">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[78px] flex items-center justify-between gap-3">
    <Link href={glossPath(locale)} aria-label={ar?'الرئيسية':'Home'} className="flex gap-2 sm:gap-3 items-center shrink-0">
     <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-md bg-[#4CCBF4] grid place-items-center text-[#0D1626] skew-x-[-8deg]"><Droplets size={25}/></span>
     <span><strong className="gloss-display text-xl sm:text-3xl font-black tracking-[.03em] leading-none">GLOSS<span className="text-[#4CCBF4]">BAY</span></strong><small className="hidden sm:block tracking-[.23em] text-[#A7C4D5] text-[9px] mt-1">DETAILS MAKE THE DIFFERENCE</small></span>
    </Link>
    <nav aria-label={ar?'قائمة الموقع':'Main navigation'} className="hidden xl:flex items-center gap-5">{nav.map(n=><Link key={n.href} href={n.href} className="text-xs font-semibold text-[#D1E7F3] hover:text-[#4CCBF4]">{n.label}</Link>)}</nav>
    <div className="flex gap-2 items-center">
     <Link href={glossPath(locale,'quote')} className="min-h-11 min-w-11 rounded-md flex gap-2 items-center justify-center bg-[#4CCBF4] text-[#0D1626] px-2 sm:px-5 py-3 font-black text-xs" aria-label={ar?'طلب عرض عناية بالسيارة':'Request car care quote'}><CarFront size={17}/><span className="hidden sm:inline">{ar?'جهز طلبك':'Build a brief'}</span></Link>
     <MobileSectorNav links={[...nav,{href:glossPath(locale,'quote'),label:ar?'طلب عرض':'Request quote'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#08111E] text-[#D5E8F1] pt-20 pb-28 sm:pb-16">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1.1fr_.9fr_.9fr] gap-9">
    <div><p className="gloss-display text-3xl font-black">GLOSS<span className="text-[#4CCBF4]">BAY.</span></p><p className="max-w-sm text-sm leading-8 mt-5 text-[#B9D1DE]">{ar?'هوية توضيحية من مافكس لعرض خدمات التنظيف والتلميع والحماية. لا تمثل ورشة فعلية أو عملاء حقيقيين أو حجوزات مؤكدة.':'An illustrative Mavvix automotive care identity. No actual detailing studio, customer transformations or confirmed booking is represented.'}</p></div>
    <div><h2 className="font-black text-[#7DE0FC] text-sm">{ar?'استكشف':'Explore'}</h2><div className="mt-5 flex flex-col gap-3">{nav.map(n=><Link key={n.href} href={n.href} className="text-sm hover:text-white">{n.label}</Link>)}</div></div>
    <div><h2 className="font-black text-[#7DE0FC] text-sm">{ar?'موقع شبيه لنشاطك':'Commission your own version'}</h2><p className="mt-5 text-sm leading-8 text-[#B9D1DE]">{ar?'فريق مافكس يصمم تجربتك بعلامتك وصورك الحقيقية وتكامل عرض السعر والمواعيد المناسب لشغلك.':'Mavvix can tailor your actual treatments, approved imagery, pricing logic and CRM/booking integrations.'}</p><a className="inline-flex gap-2 mt-6 text-sm font-bold underline underline-offset-8" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer">{ar?'تواصل مع مافكس':'Contact Mavvix'}<ArrowUpRight size={17}/></a></div>
   </div><div className="max-w-7xl mx-auto px-5 sm:px-8 mt-14 pt-7 border-t border-[#28516A] text-xs text-[#B9D1DE] flex flex-wrap justify-between gap-4"><span>© Mavvix Software — GlossBay editorial concept</span><Link href={'/'+locale+'/showcase'}>{ar?'معرض المواقع الأخرى':'Other industry concepts'}</Link></div>
  </footer>
  <ContactDock sector="car-detailing" locale={locale}/>
 </div>;
}
