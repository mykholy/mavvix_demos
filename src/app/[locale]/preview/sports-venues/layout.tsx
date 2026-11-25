import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { arenaPath } from '@/lib/verticals/sports-venues/data';
import { Trophy,ArrowUpRight,Goal,MapPinned } from 'lucide-react';

export default async function ArenaLayout(props:{children:React.ReactNode;params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const {
  children
 } = props;

 const ar=locale==='ar';
 const nav=[
  {href:arenaPath(locale,'courts'),label:ar?'الملاعب':'Courts'},
  {href:arenaPath(locale,'sports'),label:ar?'الألعاب':'Sports'},
  {href:arenaPath(locale,'schedule'),label:ar?'الأوقات':'Schedule'},
  {href:arenaPath(locale,'pricing'),label:ar?'نظام التسعير':'Pricing'},
  {href:arenaPath(locale,'leagues'),label:ar?'الدوريات':'Leagues'},
  {href:arenaPath(locale,'journal'),label:ar?'دليل اللعب':'Journal'},
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="arena-shell min-h-screen bg-[#EDF3ED] text-[#102B26] selection:bg-[#F0B044] selection:text-[#102B26]">
  <div className="bg-[#F0B044] text-[#122C24] text-[11px] font-bold text-center px-4 py-2">
    {ar?'تجربة تصميم ملاعب كرة وبادل من مافكس — لا يوجد ملعب أو وقت محجوز بالفعل':'A Mavvix sports website experience — no real venue, slot or game has been booked'}
  </div>
  <header className="sticky z-40 top-0 bg-[#102B26]/95 backdrop-blur-xl border-b border-[#34534B] text-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[80px] flex items-center justify-between gap-3">
    <Link href={arenaPath(locale)} aria-label={ar?'الرئيسية':'Home'} className="min-w-0 shrink flex items-center gap-2 sm:gap-3">
     <span className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F0B044] text-[#102B26] grid place-items-center rounded-sm shrink-0"><Trophy size={24}/></span>
     <span className="min-w-0 flex flex-col"><strong className="arena-display text-2xl sm:text-3xl font-black tracking-tight whitespace-nowrap leading-none">ARENA<span className="text-[#F0B044]">/</span>COURTS</strong><small className="hidden sm:block text-[10px] tracking-[.2em] text-[#D3E1D6] mt-1 uppercase">PLAY IT YOUR WAY</small></span>
    </Link>
    <nav aria-label={ar?'التنقل':'Main navigation'} className="hidden xl:flex items-center gap-5 text-xs font-extrabold uppercase tracking-wide">{nav.map(n=><Link href={n.href} key={n.href} className="text-[#D6E6DC] hover:text-[#F0B044]">{n.label}</Link>)}</nav>
    <div className="flex gap-2 items-center shrink-0">
     <Link href={arenaPath(locale,'book')} aria-label={ar?'طلب ملعب':'Request a court'} className="min-h-11 min-w-11 flex items-center justify-center rounded-sm px-3 sm:px-5 bg-[#F0B044] text-[#102B26] font-extrabold text-xs gap-2">
      <Goal size={18}/><span className="hidden sm:inline">{ar?'اطلب وقت ملعب':'REQUEST A COURT'}</span>
     </Link>
     <MobileSectorNav links={[...nav,{href:arenaPath(locale,'book'),label:ar?'طلب ملعب':'Request Court'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#09201C] text-[#F0F6F0] pt-20 pb-32 sm:pb-20">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_.8fr_.8fr] gap-12">
    <div><span className="arena-display font-black text-4xl">ARENA<span className="text-[#F0B044]">/</span>COURTS</span><p className="mt-6 text-sm leading-8 text-[#E0EBE2] max-w-sm">{ar?'هوية تحريرية من مافكس لموقع ملاعب رياضية. الصور لملاعب حقيقية من مصادر مستقلة، لكن Arena ليست منشأة تعمل حاليًا.':'An editorial site by Mavvix. Licensed photographs show unrelated real football fields; Arena is not an operating sports venue.'}</p></div>
    <div><h2 className="font-black text-[#F0B044] text-sm">{ar?'استكشف':'Navigate'}</h2><div className="mt-7 grid gap-4 text-sm text-[#DFEAE1]">{nav.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div>
    <div><h2 className="font-black text-[#F0B044] text-sm">{ar?'خلّي ملعبك أونلاين':'Build a venue website'}</h2><p className="text-sm mt-6 leading-8 text-[#DFEAE1]">{ar?'مافكس بتنفذ مواقع ملاعب بجدول مواعيد حقيقي وقاعدة بيانات طلبات وربط بيانات المالك بعد الموافقة.':'Mavvix can create a real venue website with owner-confirmed amenities, schedules, branding and operating integrations.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center text-[#F0B044] text-sm font-black mt-6">{ar?'ناقش مشروعك':'Discuss your site'}<ArrowUpRight size={17}/></a></div>
   </div>
   <div className="max-w-7xl mx-auto px-5 sm:px-8 border-t border-[#37554D] mt-14 pt-7 text-xs text-[#D7E6DA] flex flex-wrap justify-between gap-5"><span>© Mavvix Software · Arena Courts concept</span><Link href={'/'+locale+'/showcase'}>{ar?'معرض المواقع':'Industry showcase'}</Link></div>
  </footer>
  <ContactDock sector="sports-venues" locale={locale}/>
 </div>;
}
