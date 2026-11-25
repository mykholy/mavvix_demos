import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { veloraPath } from '@/lib/verticals/salon-spa/data';
import { Flower2, ArrowUpRight, Sparkles, Instagram } from 'lucide-react';

export default async function VeloraLayout(props:{children:React.ReactNode;params: Promise<{ locale: string }>}) {
 const params = await props.params;

 const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();

 const {
  children
 } = props;

 const ar=locale==='ar';
 const nav=[
  {href:veloraPath(locale,'services'),label:ar?'قائمة الخدمات':'Service menu'},
  {href:veloraPath(locale,'rituals'),label:ar?'طقوس العناية':'Rituals'},
  {href:veloraPath(locale,'packages'),label:ar?'التجارب والباقات':'Collections'},
  {href:veloraPath(locale,'specialists'),label:ar?'التخصصات':'Specialties'},
  {href:veloraPath(locale,'journal'),label:ar?'مجلة العناية':'Journal'},
  {href:veloraPath(locale,'about'),label:ar?'عن الفكرة':'Our story'},
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="velora-shell min-h-screen bg-[#FBF8F4] text-[#4B2834] selection:bg-[#E0A8A5] selection:text-[#4B2834]">
  <div className="bg-[#4B2834] text-[#FFF4EF] px-5 py-2 text-[11px] text-center leading-5 tracking-wide">
   {ar?'تجربة تصميم موقع صالون من مافكس · طلبات المواعيد للتوضيح ولا تمثل حجزًا مؤكدًا':'A Mavvix salon website concept · appointment enquiries are not confirmed bookings'}
  </div>
  <header className="sticky z-40 top-0 bg-[#FBF8F4]/95 backdrop-blur-xl border-b border-[#E6D7D2]">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[88px] flex items-center justify-between gap-3">
    <Link href={veloraPath(locale)} className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label={ar?'الصفحة الرئيسية':'Home'}>
     <span className="grid place-items-center w-9 sm:w-11 h-9 sm:h-11 rounded-full border border-[#AD8991] text-[#8B5362]"><Flower2 size={22} strokeWidth={1.3}/></span>
     <span><strong className="velora-display block text-2xl sm:text-3xl tracking-[.05em] font-semibold leading-none">VELORA</strong><span className="block text-[9px] text-[#77565F] tracking-[.28em] uppercase mt-1">BEAUTY · UNHURRIED</span></span>
    </Link>
    <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold tracking-wide text-[#674650]" aria-label={ar?'القائمة الرئيسية':'Main menu'}>
      {nav.map(x=><Link href={x.href} key={x.href} className="hover:text-[#A26072] focus-visible:underline">{x.label}</Link>)}
    </nav>
    <div className="flex items-center gap-2 shrink-0">
     <Link href={veloraPath(locale,'booking')} aria-label={ar?'طلب موعد عناية':'Request appointment'} className="min-h-11 inline-flex gap-2 items-center bg-[#4B2834] text-[#FFF9F4] rounded-full px-3 sm:px-6 py-3 text-xs font-bold hover:bg-[#633849]">
      <Sparkles size={16}/><span className="hidden sm:inline">{ar?'طلب موعد':'Request an appointment'}</span>
     </Link>
     <MobileSectorNav links={[...nav,{href:veloraPath(locale,'booking'),label:ar?'طلب موعد':'Appointment'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#3F2630] text-[#F9EDE7] pt-20 pb-32 sm:pb-20">
   <div className="max-w-7xl mx-auto px-6 sm:px-8">
    <div className="grid lg:grid-cols-[1.25fr_.8fr_.8fr] gap-12 pb-14 border-b border-[#8B6972]">
     <div><Flower2 size={32} strokeWidth={1.1} className="text-[#E0A8A5]"/><h2 className="velora-display text-5xl mt-5">Velora.</h2>
      <p className="max-w-sm text-sm leading-8 text-[#E3C8C7] mt-6">{ar?'هوية تجميلية تحريرية من تصميم مافكس. المحتوى والصور يشرحان تجربة موقع صالون، وليس شركة صالون أو خبراء أو مواعيد حقيقية.':'An editorial salon identity created by Mavvix. Illustrative photography and copy do not represent a real salon, team or bookable schedule.'}</p>
     </div>
     <div><h3 className="text-sm uppercase tracking-[.2em] font-extrabold text-[#F2B9B5]">{ar?'الوجهات':'Navigate'}</h3><div className="flex flex-col gap-4 mt-6 text-sm text-[#F6E3DC]">{nav.slice(0,5).map(x=><Link key={x.href} href={x.href} className="hover:text-white">{x.label}</Link>)}</div></div>
     <div><h3 className="text-sm uppercase tracking-[.2em] font-extrabold text-[#F2B9B5]">{ar?'موقع مثل هذا لنشاطك':'A site for your salon'}</h3>
      <p className="mt-6 text-sm leading-8 text-[#E3C8C7]">{ar?'مافكس تساعدك في موقع حقيقي بخدماتك وعملك وعلامتك وجدولك المعتمد.':'Mavvix builds owner-approved service menus, branded booking experiences and operational integrations.'}</p>
      <a target="_blank" rel="noopener noreferrer" className="inline-flex mt-7 items-center gap-2 text-sm font-bold underline underline-offset-8" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'}>{ar?'تواصل مع مافكس':'Talk to Mavvix'}<ArrowUpRight size={17}/></a>
     </div>
    </div>
    <div className="mt-8 flex flex-wrap justify-between gap-3 text-xs text-[#C5A8AB]"><span>© Mavvix Software — Velora Beauty editorial concept</span><Link href={'/'+locale+'/showcase'}>{ar?'باقي القطاعات':'See all industries'}</Link></div>
   </div>
  </footer>
  <ContactDock sector="salon-spa" locale={locale}/>
 </div>;
}
