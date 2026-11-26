import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Flower2, ArrowUpRight } from 'lucide-react';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { elyraPath } from '@/lib/verticals/skin-clinic/data';
type Params={locale:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();
 const title=locale==='ar'?'إيليرا — تصميم موقع جلدية وتجميل من مافكس':'Elyra Skin — Dermatology & Aesthetics Website by Mavvix';
 const description=locale==='ar'?'محتوى توضيحي عن الاستشارات الجلدية والتجميل وطلب تواصل إداري غير ملزم.':'Editorial consultation information and a nonbinding administrative callback request.';
 return {title,description,robots:{index:false,follow:false},referrer:'no-referrer',openGraph:{title,description}};
}
export default async function ElyraLayout({children,params}:{children:React.ReactNode;params:Promise<Params>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const ar=locale==='ar';
 const links=[['services','الاستشارات','Consultations'],['care-journey','رحلة الرعاية','Care journey'],['informed-choice','اختيار مستنير','Informed choice'],['privacy','الخصوصية','Privacy'],['guides','دليل إيليرا','Journal']].map(([s,a,e])=>({href:elyraPath(locale,s),label:ar?a:e}));
 return <div dir={ar?'rtl':'ltr'} lang={locale} className="min-h-screen bg-[#F7F3EF] text-[#352B39] selection:bg-[#DCE6DA]">
 <p className="bg-[#352B39] text-white px-4 py-2 text-xs text-center leading-6">{ar?'تصميم موقع من مافكس — ليس عيادة عاملة ولا يقدم تشخيصاً أو مواعيد حقيقية':'Mavvix website concept — not an operating clinic, diagnosis or live appointments'}</p>
 <header className="sticky top-0 z-40 bg-[#F7F3EF]/95 backdrop-blur border-b border-[#D6C9CD]"><div className="max-w-7xl mx-auto min-h-20 px-4 sm:px-8 flex items-center justify-between gap-3"><Link href={elyraPath(locale)} className="flex items-center gap-2 shrink-0" aria-label={ar?'الرئيسية':'Home'}><Flower2 size={32} strokeWidth={1.1} className="text-[#86566B]"/><span><b className="block font-serif text-3xl sm:text-4xl tracking-tight leading-none">elyra<span className="text-[#86566B]">.</span></b><small className="block mt-1 text-[9px] font-bold tracking-[.2em]">SKIN / CARE</small></span></Link><nav className="hidden xl:flex gap-6 text-xs font-bold" aria-label={ar?'التنقل الرئيسي':'Main navigation'}>{links.map(n=><Link key={n.href} href={n.href} className="hover:underline underline-offset-8">{n.label}</Link>)}</nav><div className="flex items-center gap-2"><Link href={elyraPath(locale,'contact')} aria-label={ar?'طلب تواصل':'Request a callback'} className="inline-flex items-center gap-2 min-h-11 px-3 sm:px-5 bg-[#352B39] text-white font-bold text-xs"><span className="hidden sm:inline">{ar?'طلب تواصل':'Request callback'}</span><ArrowUpRight size={18}/></Link><MobileSectorNav tone="light" breakpoint="xl" links={links}/></div></div></header>
 <main>{children}</main><footer className="bg-[#352B39] text-white px-5 pt-16 pb-32 sm:pb-16"><div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]"><div><Flower2 className="text-[#DCE6DA]" size={36}/><p className="mt-4 font-serif text-4xl">elyra.</p><p className="mt-5 text-sm leading-8 text-[#E8DFE2]">{ar?'تصور موقع متخصص من مافكس. ليس مقدم رعاية طبية ولا يقدم خدمات طوارئ.':'A Mavvix industry website concept. Not a healthcare or emergency service provider.'}</p></div><div><h2 className="font-bold">{ar?'استكشف المعلومات':'Explore information'}</h2><div className="mt-5 flex flex-col gap-3 text-sm">{links.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div><div><h2 className="font-bold">{ar?'عن المشروع':'About the project'}</h2><div className="mt-5 flex flex-col gap-3 text-sm"><Link href={elyraPath(locale,'faq')}>{ar?'الأسئلة الشائعة':'FAQ'}</Link><Link href={elyraPath(locale,'about')}>{ar?'عن التصميم':'About'}</Link><Link href={'/'+locale+'/showcase'}>{ar?'معرض مافكس':'Mavvix showcase'}</Link><a href={'https://mavvix.com/'+locale+'/contact'}>{ar?'اطلب موقع لعيادتك':'Commission a website'}</a></div></div></div></footer><ContactDock sector="skin-clinic" locale={locale}/>
 </div>;
}
