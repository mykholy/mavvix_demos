import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FlaskConical,ArrowUpRight } from 'lucide-react';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { clearPath } from '@/lib/verticals/diagnostics-lab/data';
type Params={locale:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();
 const title=locale==='ar'?'كلير باث — تصميم موقع معامل من مافكس':'ClearPath Labs — Laboratory Website by Mavvix';
 const description=locale==='ar'?'دليل تعريفي لأقسام المعمل وخصوصية التقارير وتواصل إداري غير ملزم.':'An editorial laboratory directory, private report access information and a nonbinding administrative callback.';
 return {title,description,robots:{index:false,follow:false},referrer:'no-referrer',openGraph:{title,description}};
}
export default async function ClearLayout({children,params}:{children:React.ReactNode;params:Promise<Params>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const ar=locale==='ar';
 const links=[['services','أقسام المعمل','Directory'],['visit','قبل الزيارة','Visit guide'],['home-collection','الزيارة المنزلية','Home collection'],['results','التقارير','Reports'],['privacy','الخصوصية','Privacy'],['guides','المقالات','Guides']].map(([s,a,e])=>({href:clearPath(locale,s),label:ar?a:e}));
 return <div dir={ar?'rtl':'ltr'} lang={locale} className="min-h-screen bg-white text-[#12334A] selection:bg-[#E7F4F6]">
 <p className="bg-[#12334A] text-white px-4 py-2 text-center text-xs leading-6">{ar?'تصميم موقع من مافكس — ليس معملاً قائماً ولا يقدم نتائج أو تشخيصاً أو حجزاً فعلياً':'Mavvix website concept — not an operating lab, diagnosis, results or live booking'}</p>
 <header className="sticky top-0 z-40 border-b border-[#C9DDE3] bg-white/95 backdrop-blur"><div className="mx-auto max-w-7xl min-h-20 px-4 sm:px-8 flex gap-3 items-center justify-between"><Link href={clearPath(locale)} aria-label={ar?'الرئيسية':'Home'} className="flex items-center gap-2 shrink-0"><span className="rounded-xl bg-[#126B8A] p-2 text-white"><FlaskConical size={26}/></span><span><b className="block text-xl sm:text-3xl font-black tracking-tight leading-none">clearpath<span className="text-[#126B8A]">.</span></b><small className="block text-[9px] font-bold tracking-[.22em] mt-1">LABS / DIAGNOSTICS</small></span></Link><nav aria-label={ar?'التنقل الرئيسي':'Main navigation'} className="hidden xl:flex items-center gap-5 text-xs font-bold">{links.map(n=><Link className="hover:underline underline-offset-8" key={n.href} href={n.href}>{n.label}</Link>)}</nav><div className="flex gap-2 items-center"><Link href={clearPath(locale,'contact')} aria-label={ar?'طلب تواصل':'Request callback'} className="flex gap-2 items-center min-h-11 rounded-lg bg-[#126B8A] text-white px-3 sm:px-5 text-xs font-bold"><span className="hidden sm:inline">{ar?'طلب تواصل':'Request callback'}</span><ArrowUpRight size={18}/></Link><MobileSectorNav tone="light" breakpoint="xl" links={links}/></div></div></header>
 <main>{children}</main><footer className="bg-[#12334A] text-white px-5 pt-16 pb-32 sm:pb-16"><div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]"><div><FlaskConical size={36} className="text-[#A7DCE8]"/><p className="mt-4 text-3xl font-black">clearpath.</p><p className="mt-5 text-sm leading-8 text-[#D4EAF0]">{ar?'تصور متخصص من مافكس، لا يمثل مقدم خدمة صحية ولا يقدم خدمات طوارئ.':'A specialist Mavvix concept, not a healthcare or emergency service provider.'}</p></div><div><h2 className="font-bold">{ar?'دليل الخدمات':'Information directory'}</h2><div className="mt-5 flex flex-col gap-3 text-sm">{links.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div></div><div><h2 className="font-bold">{ar?'عن المشروع':'About the project'}</h2><div className="mt-5 flex flex-col gap-3 text-sm"><Link href={clearPath(locale,'faq')}>{ar?'الأسئلة الشائعة':'FAQ'}</Link><Link href={clearPath(locale,'about')}>{ar?'عن التصميم':'About'}</Link><Link href={'/'+locale+'/showcase'}>{ar?'معرض مافكس':'Mavvix showcase'}</Link><a href={'https://mavvix.com/'+locale+'/contact'}>{ar?'اطلب موقع لمعملك':'Commission a website'}</a></div></div></div></footer><ContactDock sector="diagnostics-lab" locale={locale}/>
 </div>;
}
