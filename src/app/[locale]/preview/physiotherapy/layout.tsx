import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { motionPath } from '@/lib/verticals/physiotherapy/data';
import { Activity, ArrowUpRight, ArrowRight, HeartPulse, MoveUpRight, ShieldCheck } from 'lucide-react';

export async function generateMetadata(props:{params: Promise<{ locale: string }>}):Promise<Metadata> {
 const params = await props.params;

 const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();

 const ar=locale==='ar';const title=ar?'موقع علاج طبيعي وتأهيل متكامل | Motion Lab من مافكس':'Premium Physiotherapy Website | Motion Lab by Mavvix';
 const description=ar?'تجربة موقع لخدمات تقييم الحركة والتأهيل الرياضي والتواصل الإداري مع مركز فعلي عند تشغيله، بدون جمع تقارير طبية أو حجوزات وهمية.':'Movement-first rehabilitation website concept with original educational service dossiers and a privacy-minimal first-visit enquiry.';
 return {title,description,robots:{index:false,follow:false},openGraph:{type:'website',title,description}};
}
export default async function MotionLayout(props:{children:React.ReactNode;params: Promise<{ locale: string }>}) {
 const params = await props.params;

 const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();

 const {
  children
 } = props;

 const ar=locale==='ar';const nav=[
  {href:motionPath(locale,'services'),label:ar?'التخصصات':'Specialties'},
  {href:motionPath(locale,'first-visit'),label:ar?'الزيارة الأولى':'First visit'},
  {href:motionPath(locale,'mobility'),label:ar?'الحركة':'Mobility'},
  {href:motionPath(locale,'sports'),label:ar?'تأهيل النشاط':'Sport return'},
  {href:motionPath(locale,'process'),label:ar?'المنهج':'Our approach'},
  {href:motionPath(locale,'journal'),label:ar?'معلومات مهمة':'Insights'},
  ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="motion-shell min-h-screen bg-[#F3F6F1] text-[#1D3934] selection:bg-[#A5D9C1] selection:text-[#122D2A]">
 <div className="bg-[#23443F] text-[#EDF9F2] text-center text-[11px] font-semibold leading-6 px-4 py-2">{ar?'موقع توضيحي من مافكس · لا يوجد مركز أو معالج أو حجز طبي مؤكد باسم Motion Lab':'A Mavvix clinical website concept · no operating Motion Lab practitioners or appointments'}</div>
 <header className="sticky top-0 z-40 bg-[#FDFDF9]/95 backdrop-blur-xl border-b border-[#CBDED3]"><div className="max-w-7xl mx-auto px-4 sm:px-8 h-[82px] flex gap-3 items-center justify-between">
  <Link href={motionPath(locale)} className="flex items-center gap-3 shrink-0" aria-label={ar?'الصفحة الرئيسية':'Homepage'}>
   <span className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-[#163E37] bg-[#B7E0CC]"><Activity size={23} strokeWidth={1.8}/></span>
   <span><strong className="motion-display block leading-none tracking-tight text-xl sm:text-3xl font-black">motion<span className="text-[#2D826C]">lab.</span></strong><small className="block text-[#4E7568] mt-1 text-[9px] tracking-[.15em] uppercase">MOVE WITH METHOD</small></span>
  </Link>
  <nav aria-label={ar?'التنقل الرئيسي':'Main navigation'} className="hidden xl:flex gap-6 items-center text-xs font-bold text-[#365B52]">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-[#1B795E]">{n.label}</Link>)}</nav>
  <div className="flex gap-2 items-center"><Link aria-label={ar?'طلب تقييم أولي':'Request an initial assessment'} href={motionPath(locale,'appointment')} className="min-w-11 min-h-11 bg-[#1D3934] text-white rounded-full inline-flex items-center justify-center px-3 sm:px-5 gap-2 font-bold text-xs"><HeartPulse size={17}/><span className="hidden sm:inline">{ar?'طلب تقييم أولي':'First-visit enquiry'}</span></Link><MobileSectorNav breakpoint="xl" tone="light" links={[...nav,{href:motionPath(locale,'appointment'),label:ar?'الاستفسار عن تقييم':'Assessment enquiry'}]}/></div>
 </div></header>
 <main>{children}</main>
 <footer className="bg-[#16362F] text-[#E5F6ED] pt-16 pb-28 sm:pb-16"><div className="max-w-7xl mx-auto px-5 sm:px-8">
 <div className="grid md:grid-cols-[1.1fr_.85fr_.9fr] gap-10">
  <div><p className="motion-display font-black text-3xl">motion<span className="text-[#A5D9C1]">lab.</span></p><p className="mt-5 leading-8 text-sm text-[#D3E7DB] max-w-sm">{ar?'تجربة محتوى وشكل موقع لخدمات العلاج الطبيعي من تنفيذ مافكس. المحتوى تعليمي، وليس تشخيصًا أو خدمة طبية حقيقية.':'An editorial physiotherapy website by Mavvix. This is not an operating clinic, actual treatment, personalized clinical advice or confirmed appointment.'}</p></div>
  <div><h2 className="text-[#B7E3CA] text-sm font-black">{ar?'المحتوى':'Explore care'}</h2><div className="flex flex-col gap-3 mt-5 text-sm text-[#D6EDE0]">{nav.map(n=><Link href={n.href} key={n.href}>{n.label}</Link>)}</div></div>
  <div><h2 className="text-[#B7E3CA] text-sm font-black">{ar?'موقع مشابه لنشاطك':'Your real clinic website'}</h2><p className="mt-5 text-sm leading-8 text-[#D3E7DB]">{ar?'ممكن مافكس تنفذ تجربة لخدمات مركزك الحقيقي حسب التراخيص والمتخصصين ومواعيدك وبياناتك المعتمدة.':'Mavvix can build your verified clinical content, branding, real care-team profiles, approved media and operator booking integration.'}</p>
   <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex gap-2 items-center font-bold text-sm underline underline-offset-8">{ar?'تواصل مع مافكس':'Talk to Mavvix'}<ArrowUpRight size={18}/></a>
  </div>
 </div><div className="mt-12 pt-7 border-t border-[#45685A] flex gap-3 flex-wrap justify-between text-xs text-[#D3E7DB]"><span>© Mavvix Software — Motion Lab editorial concept</span><Link href={'/'+locale+'/showcase'}>{ar?'معرض المواقع':'All industries'}</Link></div>
 </div></footer>
 <ContactDock sector="physiotherapy" locale={locale}/>
 </div>;
}
