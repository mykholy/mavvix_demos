import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BookOpen,ArrowUpRight } from 'lucide-react';
import { LUMA_EVENTS,lumaArticle,lumaPath } from '@/lib/verticals/events/data';
type Params={locale:string;slug:string};
export function generateStaticParams(){return LUMA_EVENTS.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{const {locale,slug}=await params;if(locale!=='ar'&&locale!=='en')notFound();const a=lumaArticle(slug);if(!a)notFound();return {title:a.title[locale]+' | Luma Events',description:a.summary[locale],robots:{index:false,follow:false}};}
export default async function LumaGuide({params}:{params:Promise<Params>}){
 const {locale,slug}=await params;if(locale!=='ar'&&locale!=='en')notFound();const a=lumaArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <article className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-24"><nav className="text-xs text-[#874F63]" aria-label={ar?'مسار الصفحة':'Breadcrumb'}><Link href={lumaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={lumaPath(locale,'guides')}>{ar?'دليل الفعاليات':'Field notes'}</Link></nav><BookOpen className="mt-10 text-[#874F63]" size={38}/><p className="mt-5 text-xs tracking-widest font-bold text-[#874F63]">LUMA / FIELD NOTES</p><h1 className="mt-6 font-serif text-4xl sm:text-6xl leading-tight">{a.title[locale]}</h1><p className="mt-7 border-b border-[#D8C7C4] pb-8 text-xl leading-9">{a.summary[locale]}</p><section className="mt-10 bg-[#F1E4DF] p-7 sm:p-12"><h2 className="font-serif text-3xl">{ar?'ملاحظات عملية':'Practical considerations'}</h2><p className="mt-6 text-lg leading-[2.1]">{a.body[locale]}</p></section><Link className="mt-10 inline-flex items-center gap-3 bg-[#291C2D] px-6 py-4 text-white font-bold text-sm" href={lumaPath(locale,'enquiry')}>{ar?'خطط فعاليتك':'Plan an event'}<ArrowUpRight size={18}/></Link></article>;
}
