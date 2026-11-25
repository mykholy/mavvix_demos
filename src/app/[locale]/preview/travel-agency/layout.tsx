import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Compass, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { nomadPath } from '@/lib/verticals/travel-agency/data';

type Params = { locale: string };
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
  const {locale}=await params;
  if(locale!=='ar'&&locale!=='en')notFound();
  const title=locale==='ar'?'نوماد روتس — تصميم موقع سياحة وسفر | مافكس':'Nomad Routes — Travel Website by Mavvix';
  const description=locale==='ar'?'برامج رحلات تحريرية في مصر والسعودية ونموذج تخطيط سفر غير ملزم.':'Editorial itineraries across Egypt and Saudi Arabia with a nonbinding travel planning enquiry.';
  return {title,description,robots:{index:false,follow:false},openGraph:{title,description}};
}
export default async function NomadLayout({children,params}:{children:React.ReactNode;params:Promise<Params>}){
  const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();
  const ar=locale==='ar';
  const links=[['destinations','الوجهات','Destinations'],['journeys','الرحلات','Journeys'],['travel-styles','أنماط السفر','Travel styles'],['inclusions','تفاصيل البرامج','Inclusions'],['guides','دليل السفر','Field notes'],['planning','خطط رحلتك','Planning']].map(([slug,a,e])=>({href:nomadPath(locale,slug),label:ar?a:e}));
  return <div lang={locale} dir={ar?'rtl':'ltr'} className="min-h-screen bg-[#FFF9F0] text-[#18352E] selection:bg-[#E0AB6A]">
    <div className="bg-[#18352E] px-4 py-2 text-center text-[11px] leading-6 text-[#FFF9F0]">{ar?'تصميم موقع سياحة من مافكس — برامج توضيحية لا تمثل حجوزات أو خدمات سفر فعلية':'A Mavvix travel website concept — editorial itineraries, not live travel services'}</div>
    <header className="sticky top-0 z-40 border-b border-[#DDD0BD] bg-[#FFF9F0]/95 backdrop-blur"><div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
      <Link href={nomadPath(locale)} className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label={ar?'الرئيسية':'Home'}><Compass size={38} strokeWidth={1.3} className="text-[#A4492D]"/><span className="block"><b className="block font-serif text-xl leading-none sm:text-3xl">nomad<span className="text-[#A4492D]">.</span>routes</b><small className="mt-1 block text-[9px] tracking-[.16em]">{ar?'رحلات بمعنى':'TRAVEL WITH INTENTION'}</small></span></Link>
      <nav aria-label={ar?'التنقل الرئيسي':'Main navigation'} className="hidden xl:flex items-center gap-5 text-xs font-semibold">{links.map(n=><Link key={n.href} href={n.href} className="hover:underline underline-offset-8">{n.label}</Link>)}</nav>
      <div className="flex items-center gap-2"><Link href={nomadPath(locale,'quote')} aria-label={ar?'خطط رحلتك':'Plan a trip'} className="flex min-h-11 min-w-11 items-center justify-center gap-2 bg-[#18352E] px-3 sm:px-5 text-xs font-bold text-white"><span className="hidden sm:inline">{ar?'خطط رحلتك':'Plan a trip'}</span><ArrowUpRight size={18}/></Link><MobileSectorNav links={links}/></div>
    </div></header>
    <main>{children}</main>
    <footer className="bg-[#18352E] px-5 pb-32 pt-16 text-[#FFF9F0] sm:pb-16"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]"><div><Compass size={38} strokeWidth={1.3} className="text-[#E0AB6A]"/><h2 className="mt-5 font-serif text-4xl">nomad.routes</h2><p className="mt-5 max-w-sm text-sm leading-8 text-[#E7DDCF]">{ar?'هوية سفر تحريرية من مافكس. اختر أفكار رحلة، ثم اطلب تصميم موقع لشركتك السياحية الفعلية.':'An editorial travel identity by Mavvix. Explore planning journeys and commission a website for your actual travel company.'}</p></div><div><h3 className="font-bold">{ar?'استكشف':'Explore'}</h3><div className="mt-5 flex flex-col gap-3 text-sm">{links.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div><div><h3 className="font-bold">{ar?'معلومات مهمة':'Important information'}</h3><div className="mt-5 flex flex-col gap-3 text-sm"><Link href={nomadPath(locale,'faq')}>{ar?'الأسئلة الشائعة':'FAQ'}</Link><Link href={nomadPath(locale,'about')}>{ar?'عن التصميم':'About this concept'}</Link><Link href={'/'+locale+'/showcase'}>{ar?'معرض مافكس':'Mavvix showcase'}</Link><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'}>{ar?'اطلب موقع لشركتك':'Commission a travel website'}</a></div></div></div></footer>
    <ContactDock sector="travel-agency" locale={locale}/>
  </div>;
}
