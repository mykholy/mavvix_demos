import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Truck } from 'lucide-react';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { routeLinePath } from '@/lib/verticals/logistics/data';
type Params={locale:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();
 const title=locale==='ar'?'روت لاين — تصميم موقع شحن ولوجستيات من مافكس':'RouteLine Cargo — Freight & Logistics Website by Mavvix';
 const description=locale==='ar'?'خدمات الشحن البحري والجوي والبري ونموذج طلب عرض سعر غير ملزم.':'Ocean, air and road freight service dossiers and a nonbinding freight quote enquiry.';
 return {title,description,robots:{index:false,follow:false},openGraph:{title,description}};
}
export default async function RouteLineLayout({children,params}:{children:React.ReactNode;params:Promise<Params>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const ar=locale==='ar';
 const links=[['services','الخدمات','Services'],['modes','وسائل النقل','Modes'],['scope','نطاق الشحن','Scope'],['milestones','مراحل الشحن','Milestones'],['tracking','التتبع','Tracking'],['guides','دليل الشحن','Guides']].map(([s,a,e])=>({href:routeLinePath(locale,s),label:ar?a:e}));
 return <div dir={ar?'rtl':'ltr'} lang={locale} className="min-h-screen bg-[#F5F3ED] text-[#102A3A] selection:bg-[#F3B43F]">
 <p className="bg-[#102A3A] text-white px-4 py-2 text-xs text-center leading-6">{ar?'تصميم موقع لوجستيات من مافكس — لا تتبع مباشر أو حجز ناقل فعلي':'Mavvix logistics website concept — no live tracking or carrier booking'}</p>
 <header className="sticky top-0 z-40 bg-[#F5F3ED]/95 backdrop-blur border-b border-[#B9C3C8]"><div className="max-w-7xl mx-auto min-h-20 px-4 sm:px-8 flex items-center justify-between gap-3"><Link href={routeLinePath(locale)} className="flex items-center gap-2 shrink-0" aria-label={ar?'الرئيسية':'Home'}><span className="bg-[#F3B43F] p-2"><Truck size={26}/></span><span><b className="block text-xl sm:text-3xl font-black tracking-tight leading-none">ROUTELINE<span className="text-[#31566C]">.</span></b><small className="block mt-1 text-[9px] font-bold tracking-[.2em]">CARGO / LOGISTICS</small></span></Link><nav className="hidden xl:flex gap-5 text-xs font-bold" aria-label={ar?'التنقل الرئيسي':'Main navigation'}>{links.map(n=><Link key={n.href} href={n.href} className="hover:underline underline-offset-8">{n.label}</Link>)}</nav><div className="flex items-center gap-2"><Link href={routeLinePath(locale,'quote')} aria-label={ar?'اطلب عرض شحن':'Request a quote'} className="inline-flex items-center gap-2 min-h-11 px-3 sm:px-5 bg-[#F3B43F] font-bold text-xs"><span className="hidden sm:inline">{ar?'اطلب عرض شحن':'Request quote'}</span><ArrowUpRight size={18}/></Link><MobileSectorNav tone="light" breakpoint="xl" links={links}/></div></div></header>
 <main>{children}</main><footer className="bg-[#102A3A] text-white px-5 pt-16 pb-32 sm:pb-16"><div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]"><div><Truck className="text-[#F3B43F]" size={38}/><p className="mt-4 font-black text-3xl">ROUTELINE.</p><p className="mt-5 text-sm leading-8 text-[#D8E3E8]">{ar?'موقع متخصص في الشحن من مافكس، لا يمثل ناقلاً أو مخلصاً جمركياً قائماً.':'A Mavvix freight website concept, not an operating carrier or customs broker.'}</p></div><div><h2 className="font-bold">{ar?'الخدمات والمعلومات':'Services and information'}</h2><div className="mt-5 flex flex-col gap-3 text-sm">{links.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div><div><h2 className="font-bold">{ar?'تواصل':'Contact'}</h2><div className="mt-5 flex flex-col gap-3 text-sm"><Link href={routeLinePath(locale,'faq')}>{ar?'الأسئلة الشائعة':'FAQ'}</Link><Link href={routeLinePath(locale,'about')}>{ar?'عن التصميم':'About'}</Link><Link href={'/'+locale+'/showcase'}>{ar?'معرض مافكس':'Mavvix showcase'}</Link><a href={'https://mavvix.com/'+locale+'/contact'}>{ar?'اطلب موقع لشركتك':'Commission a website'}</a></div></div></div></footer><ContactDock sector="logistics" locale={locale}/>
 </div>;
}
