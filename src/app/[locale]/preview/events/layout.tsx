import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { ContactDock } from '@/components/shared/ContactDock';
import { lumaPath } from '@/lib/verticals/events/data';
type Params={locale:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();
 const title=locale==='ar'?'لوما — تصميم موقع تنظيم فعاليات من مافكس':'Luma Events — Event Planning Website by Mavvix';
 const description=locale==='ar'?'تخطيط المؤتمرات والمناسبات والمعارض وإدارة الإنتاج، وتجربة استفسار غير ملزم من مافكس.':'Editorial event experiences, guest planning, production coordination and a nonbinding enquiry by Mavvix.';
 return {title,description,robots:{index:false,follow:false},openGraph:{title,description}};
}
export default async function LumaLayout({children,params}:{children:React.ReactNode;params:Promise<Params>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const ar=locale==='ar';
 const links=[['experiences','الفعاليات','Experiences'],['event-types','أنواع المناسبات','Event types'],['venue-brief','اختيار المكان','Venue brief'],['production','الإنتاج','Production'],['planning','التخطيط','Planning'],['guides','دليل الفعاليات','Journal']].map(([slug,a,e])=>({href:lumaPath(locale,slug),label:ar?a:e}));
 return <div dir={ar?'rtl':'ltr'} lang={locale} className="min-h-screen bg-[#FCF7F1] text-[#291C2D] selection:bg-[#DCB8A6]">
  <p className="bg-[#291C2D] text-[#FCF7F1] text-center px-4 py-2 text-xs leading-6">{ar?'تصميم موقع فعاليات من مافكس — أمثلة تحريرية، لا حجوزات فعلية':'Mavvix event website concept — editorial examples, not live bookings'}</p>
  <header className="sticky top-0 z-40 border-b border-[#D8C7C4] bg-[#FCF7F1]/95 backdrop-blur"><div className="mx-auto max-w-7xl px-4 sm:px-8 flex min-h-20 items-center justify-between gap-3">
    <Link href={lumaPath(locale)} className="flex shrink-0 items-center gap-2" aria-label={ar?'الرئيسية':'Home'}><Sparkles size={30} strokeWidth={1.4} className="text-[#874F63]"/><span><b className="block font-serif text-3xl sm:text-4xl tracking-tight leading-none">LUMA<span className="text-[#874F63]">.</span></b><small className="block mt-1 text-[9px] tracking-[.22em] font-bold">EVENTS & EXPERIENCES</small></span></Link>
    <nav className="hidden xl:flex gap-6 items-center text-xs font-bold" aria-label={ar?'التنقل الرئيسي':'Main navigation'}>{links.map(n=><Link key={n.href} href={n.href} className="hover:underline underline-offset-8">{n.label}</Link>)}</nav>
    <div className="flex items-center gap-2"><Link href={lumaPath(locale,'enquiry')} aria-label={ar?'اطلب تخطيط فعالية':'Plan an event'} className="inline-flex min-h-11 items-center gap-2 bg-[#291C2D] text-white px-3 sm:px-5 text-xs font-bold"><span className="hidden sm:inline">{ar?'خطط فعاليتك':'Plan an event'}</span><ArrowUpRight size={18}/></Link><MobileSectorNav links={links} tone="light" breakpoint="xl"/></div>
  </div></header>
  <main>{children}</main>
  <footer className="bg-[#291C2D] text-[#FCF7F1] px-5 py-16 pb-32 sm:pb-16"><div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]"><div><p className="font-serif text-5xl">LUMA.</p><p className="mt-5 text-sm leading-8 text-[#ECDDD8]">{ar?'تصور إبداعي لقطاع تنظيم الفعاليات من مافكس. لا يمثل شركة تشغيل أو مكاناً متاحاً للحجز.':'An independent event-industry concept by Mavvix, not an operating agency or available venue.'}</p></div><div><h2 className="font-bold">{ar?'استكشف':'Explore'}</h2><div className="mt-5 flex flex-col gap-3 text-sm">{links.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div><div><h2 className="font-bold">{ar?'معلومات وتواصل':'Information'}</h2><div className="mt-5 flex flex-col gap-3 text-sm"><Link href={lumaPath(locale,'faq')}>{ar?'الأسئلة الشائعة':'FAQ'}</Link><Link href={lumaPath(locale,'about')}>{ar?'عن التصميم':'About'}</Link><Link href={'/'+locale+'/showcase'}>{ar?'معرض مافكس':'Mavvix showcase'}</Link><a href={'https://mavvix.com/'+locale+'/contact'}>{ar?'اطلب موقع لشركتك':'Commission your website'}</a></div></div></div></footer>
  <ContactDock sector="events" locale={locale}/>
 </div>;
}
