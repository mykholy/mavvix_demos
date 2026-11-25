import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { ArrowUpRight, LifeBuoy, Home, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { maintenancePath } from '@/lib/verticals/home-maintenance/data';

export default async function HomeMaintenanceLayout(props:{children:React.ReactNode;params: Promise<{ locale: string }>}) {
 const params = await props.params;

 const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();

 const {
  children
 } = props;

 const ar=locale==='ar';
 const nav=[
  {href:maintenancePath(locale,'services'),label:ar?'الخدمات':'Services'},
  {href:maintenancePath(locale,'ac'),label:ar?'التكييف':'Air conditioning'},
  {href:maintenancePath(locale,'plumbing'),label:ar?'السباكة':'Plumbing'},
  {href:maintenancePath(locale,'electrical'),label:ar?'الكهرباء':'Electrical'},
  {href:maintenancePath(locale,'coverage'),label:ar?'التغطية':'Service coverage'},
  {href:maintenancePath(locale,'resources'),label:ar?'دليل المنزل':'Guides'},
 ];
 return <div className="fixora-shell min-h-screen bg-[#F7FAFD] text-[#174E78] selection:bg-[#F7B347] selection:text-[#174E78]">
  <div className="px-4 py-2 bg-[#F7B347] font-bold text-xs text-center text-[#174E78]">
   {ar?'تصميم مافكس لتجربة مواقع شركات الصيانة — طلبات المعاينة لا تساوي زيارة مؤكدة':'A Mavvix home-service website experience — enquiries never confirm a real visit'}
  </div>
  <header className="z-40 sticky top-0 bg-white/95 backdrop-blur-xl border-b border-[#DBE7F2]">
   <div className="max-w-7xl mx-auto h-[76px] px-4 sm:px-7 flex items-center justify-between gap-4">
    <Link href={maintenancePath(locale)} className="flex items-center gap-3 shrink-0" aria-label={ar?'الرئيسية':'Home'}>
     <span className="w-11 h-11 rounded-[1.1rem] bg-[#174E78] text-white grid place-items-center"><Home size={23}/></span>
     <div><span className="block text-[#174E78] leading-none font-black text-xl sm:text-2xl tracking-tight">fixora<span className="text-[#EAA126]">.</span></span>
      <span className="block text-[9px] uppercase text-[#57758B] tracking-widest mt-1">CARE FOR YOUR SPACE</span>
     </div>
    </Link>
    <nav aria-label={ar?'التنقل الرئيسي':'Main navigation'} className="hidden xl:flex gap-5 text-[#527089] text-xs font-bold">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-[#D39421]">{n.label}</Link>)}</nav>
    <div className="flex items-center gap-3">
     <Link href={maintenancePath(locale,'book')} className="hidden sm:flex bg-[#174E78] text-white px-5 py-3 text-xs font-bold rounded-xl gap-2 items-center">{ar?'اطلب معاينة':'Request a visit'}<ArrowUpRight size={16}/></Link>
     <MobileSectorNav links={[...nav,{href:maintenancePath(locale,'book'),label:ar?'طلب معاينة':'Request visit'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#123A5A] text-white pt-16 pb-28 md:pb-16">
   <div className="max-w-7xl mx-auto px-5 sm:px-7"><div className="grid md:grid-cols-[1.1fr_.9fr_.9fr] gap-10">
    <div><span className="font-black text-3xl">fixora<span className="text-[#F7B347]">.</span></span>
     <p className="text-white/65 text-sm leading-8 mt-5 max-w-sm">{ar?'خدمات صيانة منزلية منظمة بتجربة رقمية واضحة. هذا الاسم تصور تجاري من Mavvix وليس شركة صيانة فعلية أو خدمة طوارئ.':'A thoughtfully structured home-maintenance website by Mavvix. Fixora is a portfolio concept, not an operating repair or emergency dispatch company.'}</p>
    </div>
    <div><h2 className="font-black text-[#F7B347] text-sm">{ar?'خدمات المنزل':'Home service guides'}</h2>
     <div className="mt-5 flex flex-col gap-3 text-white/70 text-xs">{nav.slice(0,5).map(n=><Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>)}</div>
    </div>
    <div><h2 className="font-black text-[#F7B347] text-sm">{ar?'نفّذ موقعًا لشركة صيانة':'Build a website for your company'}</h2><p className="mt-5 text-white/70 text-xs leading-7">{ar?'شركة مافكس تطور مواقع متخصصة مع الاستفسارات وإدارة المحتوى وإمكانية ربط نظام المواعيد الفعلي.':'Mavvix designs sector-specific sites with enquiry management, content administration and optional real booking integrations.'}</p>
     <a className="inline-flex items-center gap-2 mt-5 text-white text-sm font-bold" target="_blank" rel="noopener noreferrer" href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'}>{ar?'تواصل مع مافكس':'Contact Mavvix'}<ArrowUpRight size={17}/></a>
    </div>
   </div><div className="border-t border-white/20 mt-12 pt-6 text-[11px] text-white/50 flex flex-wrap gap-3 justify-between"><span>© Mavvix Software · Fixora Care</span><Link href={'/'+locale+'/showcase'} className="text-[#F7B347]">{ar?'المزيد من المواقع':'Industry showcase'}</Link></div></div>
  </footer>
  <ContactDock sector="home-maintenance" locale={locale}/>
 </div>;
}
