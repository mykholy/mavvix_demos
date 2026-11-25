import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { NOMAD_ROUTES,nomadPath,nomadArticle } from '@/lib/verticals/travel-agency/data';
type Params={locale:string;slug:string};
export function generateStaticParams(){return NOMAD_ROUTES.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{const {locale,slug}=await params;if(locale!=='ar'&&locale!=='en')notFound();const a=nomadArticle(slug);if(!a)notFound();return {title:a.title[locale]+' | Nomad Routes',description:a.summary[locale],robots:{index:false,follow:false}};}
export default async function NomadGuide({params}:{params:Promise<Params>}){
 const {locale,slug}=await params;if(locale!=='ar'&&locale!=='en')notFound();const a=nomadArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24"><nav className="text-xs text-[#944129]"><Link href={nomadPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={nomadPath(locale,'guides')}>{ar?'دليل السفر':'Field notes'}</Link></nav><BookOpen size={38} className="mt-10 text-[#944129]"/><p className="mt-6 text-xs font-bold tracking-[.2em] text-[#944129]">NOMAD ROUTES / FIELD NOTES</p><h1 className="mt-6 font-serif text-4xl sm:text-6xl leading-tight">{a.title[locale]}</h1><p className="mt-7 border-b border-[#CBBB9E] pb-9 text-xl leading-9 text-[#3D5249]">{a.summary[locale]}</p><div className="mt-10 bg-[#F4EBDD] p-7 sm:p-12"><h2 className="font-serif text-3xl">{ar?'دليل عملي':'Practical planning notes'}</h2><p className="mt-7 text-lg leading-[2.1]">{a.body[locale]}</p></div><div className="mt-10 flex flex-wrap gap-4"><Link className="inline-flex items-center gap-3 bg-[#18352E] px-7 py-4 text-sm text-white font-bold" href={nomadPath(locale,'quote')}>{ar?'خطط رحلة':'Plan a journey'}<ArrowUpRight size={18}/></Link><Link className="px-6 py-4 border border-[#18352E] text-sm font-bold" href={nomadPath(locale,'guides')}>{ar?'كل المقالات':'All field notes'}</Link></div></article>;
}
