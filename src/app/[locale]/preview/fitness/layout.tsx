import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { pulsePath } from '@/lib/verticals/fitness/data';
import { Activity, Zap, ArrowUpRight, CircleDot, Crosshair } from 'lucide-react';

export default async function FitnessLayout(props:{children:React.ReactNode;params: Promise<{ locale: string }>}) {
 const params = await props.params;

 const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();

 const {
  children
 } = props;

 const ar=locale==='ar';
 const nav=[
  {href:pulsePath(locale,'classes'),label:ar?'الحصص':'Classes'},
  {href:pulsePath(locale,'memberships'),label:ar?'خطط العضوية':'Memberships'},
  {href:pulsePath(locale,'schedule'),label:ar?'الجدول':'Timetable'},
  {href:pulsePath(locale,'coaching'),label:ar?'التخصصات':'Coaching'},
  {href:pulsePath(locale,'first-visit'),label:ar?'أول زيارة':'First Visit'},
  {href:pulsePath(locale,'journal'),label:ar?'دليل التدريب':'Journal'},
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="pulse-shell bg-[#F2F2ED] text-[#141421] min-h-screen selection:bg-[#E0FE61] selection:text-[#141421]">
   <div className="bg-[#141421] text-[#E0FE61] text-[11px] px-4 py-2 text-center font-bold">{ar?'تجربة موقع نادي رياضي من مافكس — لا توجد حصص أو عضويات مؤكدة':'Mavvix gym website concept — no actual classes, coaches or memberships are confirmed'}</div>
   <header className="bg-[#F2F2ED]/95 backdrop-blur-xl sticky z-40 top-0 border-b border-[#C8C7D1]">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[80px] flex items-center justify-between gap-4">
     <Link href={pulsePath(locale)} aria-label={ar?'الرئيسية':'Gym website home'} className="flex items-center gap-3 shrink-0">
      <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#141421] text-[#E0FE61] grid place-items-center"><Activity size={24}/></span>
      <span className="block"><strong className="pulse-display text-2xl sm:text-3xl tracking-tighter font-black leading-none">PULSE<span className="text-[#6A45D8]">/</span></strong><span className="text-[9px] font-extrabold tracking-[.17em] sm:tracking-[.29em]">DISTRICT · FITNESS</span></span>
     </Link>
     <nav aria-label={ar?'القائمة الرئيسية':'Main navigation'} className="hidden xl:flex text-xs font-black uppercase gap-5 tracking-wide">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-[#5B38C3] focus-visible:underline">{n.label}</Link>)}</nav>
     <div className="flex items-center gap-2">
      <Link href={pulsePath(locale,'trial')} aria-label={ar?'طلب تجربة حصة رياضية':'Request gym class trial'} className="min-h-11 min-w-11 inline-flex items-center justify-center gap-2 bg-[#141421] text-[#E0FE61] rounded-full px-3 sm:px-6 text-xs font-black">
       <Zap size={17}/><span className="hidden sm:inline">{ar?'اختار حصة تجريبية':'Explore a trial'}</span>
      </Link>
      <MobileSectorNav breakpoint="xl" tone="light" links={[...nav,{href:pulsePath(locale,'trial'),label:ar?'التجربة':'Trial'}]}/>
     </div>
    </div>
   </header>
   <main>{children}</main>
   <footer className="bg-[#141421] text-[#F2F2ED] pt-20 pb-32 sm:pb-20">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_.7fr_.7fr] gap-12">
     <div><Activity className="text-[#E0FE61]" size={35}/><p className="pulse-display font-black text-5xl mt-6">PULSE / DISTRICT</p><p className="text-sm leading-8 text-[#D6D5E4] mt-6 max-w-sm">{ar?'هوية تحريرية لتصميم موقع متخصص في الحصص والبرامج الرياضية. ليست منشأة رياضية حقيقية أو جهة تدريب أو مركزًا للعضوية.':'An editorial Mavvix gym site showing class/program selection. It is not an operating facility, class calendar or membership business.'}</p></div>
     <div><h2 className="text-[#E0FE61] text-sm font-black uppercase">{ar?'الصفحات':'Explore'}</h2><div className="mt-6 flex flex-col gap-4 text-sm text-[#E1DEEF]">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>)}</div></div>
     <div><h2 className="text-[#E0FE61] text-sm font-black uppercase">{ar?'مشروعك التالي':'Built by Mavvix'}</h2><p className="mt-6 text-sm leading-8 text-[#D6D5E4]">{ar?'مافكس تقدر تبني موقع ناديك الحقيقي بحصصه ومواعيده ومدربيه ونظام إدارته المعتمد.':'Mavvix can build a real club website connected to your verified schedules, staff and approved operating systems.'}</p><a className="inline-flex items-center gap-2 text-sm font-black text-[#E0FE61] mt-7" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} rel="noopener noreferrer" target="_blank">{ar?'تواصل مع مافكس':'Commission your site'}<ArrowUpRight size={18}/></a></div>
    </div>
    <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-14 pt-6 border-t border-white/20 text-xs text-[#D6D5E4] flex flex-wrap justify-between gap-4"><span>© Mavvix Software · Pulse District</span><Link href={'/'+locale+'/showcase'}>{ar?'استكشف القطاعات':'All industries'}</Link></div>
   </footer>
   <ContactDock sector="fitness" locale={locale}/>
 </div>;
}
