import Link from 'next/link';
import { Wrench, ArrowUpRight, Gauge, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { autoPath } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';

export default async function AutoServiceLayout(props:{children:React.ReactNode;params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const {
  children
 } = props;

 const ar=locale==='ar';const Arrow=ar?ArrowLeft:ArrowRight;
 const nav=[
  {href:autoPath(locale,'services'),label:ar?'الخدمات':'Services'},
  {href:autoPath(locale,'diagnostics'),label:ar?'دليل الأعطال':'Diagnostics'},
  {href:autoPath(locale,'packages'),label:ar?'باقات الصيانة':'Service plans'},
  {href:autoPath(locale,'car-brands'),label:ar?'السيارات':'Vehicles'},
  {href:autoPath(locale,'resources'),label:ar?'الدليل':'Field notes'},
  {href:autoPath(locale,'process'),label:ar?'خطوات الفحص':'Process'},
 ];
 return <div className="torque-shell min-h-screen bg-[#F3F0E9] text-[#161A20] selection:bg-[#FB6935] selection:text-white">
  <div className="bg-[#FB6935] text-[#161A20] text-[11px] sm:text-xs text-center px-4 py-2 font-bold">
   {ar?'تجربة تصميم موقع صيانة احترافي من مافكس — لطلب موقع مشابه استخدم زر التواصل':'A Mavvix automotive website design experience — request a similar website using the contact dock'}
  </div>
  <header className="sticky top-0 z-40 bg-[#161A20]/95 backdrop-blur-xl border-b border-white/10 text-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-7 h-[76px] flex items-center justify-between gap-3">
    <Link href={autoPath(locale)} aria-label={ar?'الرئيسية':'Homepage'} className="flex items-center gap-3 shrink-0 group">
     <span className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FB6935] text-black rounded-lg grid place-items-center transform -skew-x-6"><Wrench size={22}/></span>
     <span><b className="text-sm sm:text-xl leading-none block tracking-[.04em] sm:tracking-[.12em] font-black italic">TORQUE<span className="text-[#FB6935]">/</span>GARAGE</b>
       <small className="hidden sm:block text-[10px] uppercase tracking-[.18em] text-white/50">{ar?'تجربة رقمية لقطاع صيانة السيارات':'AUTOMOTIVE SERVICE EXPERIENCE'}</small>
     </span>
    </Link>
    <nav aria-label={ar?'تصفح الموقع':'Main navigation'} className="hidden xl:flex items-center gap-5 text-xs font-bold text-white/70">
     {nav.map(x=><Link key={x.href} href={x.href} className="hover:text-[#FB6935] transition-colors">{x.label}</Link>)}
    </nav>
    <div className="flex items-center gap-2">
     <Link href={autoPath(locale,'booking')} aria-label={ar ? 'طلب فحص سيارة' : 'Request vehicle inspection'} className="inline-flex items-center justify-center gap-2 bg-[#FB6935] text-[#161A20] rounded-lg font-black text-xs h-11 w-11 sm:h-auto sm:w-auto px-2 sm:px-5 py-2 sm:py-3 hover:bg-[#FF855E]">
      <span className="hidden sm:inline">{ar?'طلب فحص سيارة':'Request inspection'}</span><Arrow size={17}/>
     </Link>
     <MobileSectorNav links={nav}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#0D1016] text-white/60 pt-16 pb-28 sm:pb-16">
   <div className="max-w-7xl mx-auto px-5 sm:px-7">
    <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10 pb-12 border-b border-white/15">
     <div><p className="text-white text-2xl font-black tracking-widest">TORQUE<span className="text-[#FB6935]">/</span>GARAGE</p>
      <p className="max-w-sm mt-4 text-sm leading-8">{ar?'دليل تفاعلي يوضح كيف يمكن أن يكون موقع متخصص لخدمات صيانة السيارات؛ التجربة لا تمثل مركزًا يعمل حاليًا ولا تؤكد مواعيد إصلاح.':'An interactive Mavvix example of an automotive service website. This is not a live workshop or a confirmed repair appointment.'}</p>
     </div>
     <div><h2 className="text-xs font-bold text-[#FB6935] uppercase tracking-widest mb-5">{ar?'استكشف':'Explore'}</h2>
      <div className="flex flex-col gap-3 text-sm">{nav.slice(0,5).map(x=><Link key={x.href} href={x.href} className="hover:text-white">{x.label}</Link>)}</div>
     </div>
     <div><h2 className="text-xs font-bold text-[#FB6935] uppercase tracking-widest mb-5">{ar?'حوّل التجربة لموقع شركتك':'Build your business site'}</h2>
      <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-semibold text-sm">{ar?'اتواصل مع فريق مافكس':'Contact Mavvix'}<ArrowUpRight size={17}/></a>
      <p className="mt-4 text-xs leading-6">{ar?'الفروع والأسعار والمواعيد تحتاج اعتماد صاحب النشاط قبل التشغيل الحقيقي.':'Actual locations, prices and appointment availability require an operating service provider.'}</p>
     </div>
    </div>
    <div className="mt-8 flex flex-wrap justify-between gap-4 text-xs"><span>© Mavvix Software — Torque Garage concept</span><Link href={'/'+locale+'/showcase'} className="text-[#FB6935] hover:underline">{ar?'شوف باقي المواقع':'More industry experiences'}</Link></div>
   </div>
  </footer>
  <ContactDock sector="auto-service" locale={locale}/>
 </div>;
}
