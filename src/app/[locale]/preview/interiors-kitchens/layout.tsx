import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { formaPath } from '@/lib/verticals/interiors-kitchens/data';
import { Ruler,ArrowUpRight,PenTool,Instagram } from 'lucide-react';

export default async function FormaLayout(props:{children:React.ReactNode;params: Promise<{ locale: string }>}) {
 const params = await props.params;

 const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();

 const {
  children
 } = props;

 const ar=locale==='ar';
 const menu=[
  {href:formaPath(locale,'services'),label:ar?'التصميمات':'Solutions'},
  {href:formaPath(locale,'layouts'),label:ar?'التخطيطات':'Layouts'},
  {href:formaPath(locale,'materials'),label:ar?'المواد':'Materials'},
  {href:formaPath(locale,'measurement'),label:ar?'القياسات':'Measurement'},
  {href:formaPath(locale,'process'),label:ar?'خطوات العمل':'Process'},
  {href:formaPath(locale,'journal'),label:ar?'مقالات':'Field journal'}
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="forma-shell min-h-screen bg-[#F4F0EA] text-[#272827] selection:bg-[#B9866B] selection:text-white">
  <div className="bg-[#6C3538] text-[#FCF5EE] text-xs text-center py-2 px-5">
   {ar?'تجربة موقع لتصميم المطابخ من Mavvix · المخططات والقياسات استرشادية فقط':'Mavvix architectural website concept · no construction, measurement or final quote confirmed'}
  </div>
  <header className="sticky top-0 z-40 bg-[#F4F0EA]/95 backdrop-blur-xl border-b border-[#C9BEB0]">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-20 flex items-center justify-between gap-3">
    <Link href={formaPath(locale)} aria-label={ar?'الرئيسية':'Homepage'} className="flex gap-2 sm:gap-3 items-center shrink-0">
     <span className="h-9 w-9 sm:h-11 sm:w-11 border-2 border-[#6C3538] grid place-items-center"><Ruler size={22}/></span>
     <span className="flex flex-col"><strong className="forma-display text-xl sm:text-3xl leading-none tracking-tight">FORMA<span className="text-[#985E43]">/</span></strong><small className="text-[9px] tracking-[.14em] uppercase font-bold text-[#6C3538]">INTERIOR ATELIER</small></span>
    </Link>
    <nav className="hidden xl:flex items-center gap-6 text-xs text-[#5B4843] font-bold" aria-label={ar?'التنقل':'Main menu'}>
     {menu.map(m=><Link href={m.href} key={m.href} className="hover:text-[#9C603F] focus-visible:underline">{m.label}</Link>)}
    </nav>
    <div className="flex items-center gap-2">
     <Link href={formaPath(locale,'consultation')} aria-label={ar?'طلب استشارة تصميم':'Request a design consultation'} className="min-w-11 h-11 flex items-center justify-center gap-2 rounded-none bg-[#6C3538] text-white px-3 sm:px-5 text-xs font-extrabold">
      <PenTool size={17}/><span className="hidden sm:inline">{ar?'اطلب استشارة تصميم':'Design brief'}</span>
     </Link>
     <MobileSectorNav breakpoint="xl" tone="light" links={[...menu,{href:formaPath(locale,'consultation'),label:ar?'اطلب استشارة':'Design brief'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#242526] text-[#F4EFE9] pt-16 pb-32 sm:pb-20">
   <div className="max-w-7xl px-5 sm:px-8 mx-auto">
    <div className="grid md:grid-cols-[1.25fr_.75fr_.9fr] gap-12 pb-14 border-b border-white/20">
     <div><strong className="forma-display text-5xl">FORMA<span className="text-[#B9866B]">/</span></strong><p className="text-sm text-[#D8C9B9] leading-8 mt-6 max-w-sm">{ar?'اتجاه فني لتصميم واجهات مواقع المطابخ والدريسنج من مافكس. Forma ليست شركة مطابخ فعلية ولا تعرض مشروعات منفذة.':'An original Mavvix editorial website experience for bespoke cabinetry and kitchen design. Forma is not an operating fabricator or a finished-project portfolio.'}</p></div>
     <div><h2 className="text-sm text-[#E8AF8D] font-bold uppercase tracking-widest">{ar?'استكشف':'Explore'}</h2><div className="mt-5 flex flex-col gap-3 text-xs text-[#E3D8CE]">{menu.slice(0,5).map(m=><Link href={m.href} key={m.href}>{m.label}</Link>)}</div></div>
     <div><h2 className="text-sm text-[#E8AF8D] font-bold uppercase tracking-widest">{ar?'نفّذ موقعًا مشابهًا':'Your business deserves a unique site'}</h2><p className="text-sm text-[#D8C9B9] leading-8 mt-5">{ar?'بيانات ورشتك وصور مشروعاتك وطلبات تصميمك الحقيقية يمكن تحويلها إلى موقع متخصص مستقل.':'Turn your real business identity, owner-approved project portfolio and design briefs into a standalone premium website.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#F9DED0] underline underline-offset-4 mt-5">{ar?'تحدث مع مافكس':'Contact Mavvix'}<ArrowUpRight size={16}/></a></div>
    </div>
    <div className="flex flex-wrap gap-5 justify-between mt-7 text-xs text-[#CBBCAE]"><span>© Mavvix Software · Forma Atelier design concept</span><Link href={'/'+locale+'/showcase'}>{ar?'عرض جميع المجالات':'View all industries'}</Link></div>
   </div>
  </footer>
  <ContactDock sector="interiors-kitchens" locale={locale}/>
 </div>;
}
