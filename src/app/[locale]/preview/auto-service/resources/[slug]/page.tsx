import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { AUTO_SERVICE, findAutoArticle, autoPath } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';

export function generateStaticParams(){return AUTO_SERVICE.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{slug:string;locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  slug,
  locale
 } = params;

 const a=findAutoArticle(slug);return a?{title:a.title[locale]+' | Torque Garage',description:a.summary[locale]}:{};
}
export default async function AutoArticleDetail(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const article=findAutoArticle(slug);if(!article)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
  <nav className="text-sm text-stone-500"><Link href={autoPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={autoPath(locale,'resources')}>{ar?'دليل السائق':'Field notes'}</Link></nav>
  <div className="mt-12 border-b-2 border-[#FB6935] pb-11"><p className="text-xs font-bold font-mono tracking-widest text-[#D5552C]">AUTOMOTIVE KNOWLEDGE / EDITORIAL</p><h1 className="mt-6 text-4xl sm:text-5xl leading-tight font-black">{article.title[locale]}</h1><p className="text-lg leading-9 text-stone-600 mt-6">{article.summary[locale]}</p></div>
  <section className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 mt-11"><BookOpen size={36} className="text-[#D5552C]"/><h2 className="font-black text-2xl mt-6">{ar?'الفكرة والخطوات العملية':'The practical perspective'}</h2><p className="text-base leading-[2.4] text-stone-700 mt-5">{article.body[locale]}</p><p className="mt-8 text-sm text-stone-500 border-s-4 border-[#FB6935] ps-5">{ar?'تنويه: دليل تثقيفي عام، وليس توصية ميكانيكية لسيارة محددة.':'General education only, not vehicle-specific mechanical advice.'}</p></section>
  <section className="mt-12 grid sm:grid-cols-2 gap-4"><Link href={autoPath(locale,'services')} className="rounded-2xl border border-stone-300 p-6 flex justify-between gap-3 items-center font-extrabold">{ar?'خدمات وفحوص السيارة':'Service and diagnostic dossiers'}<ArrowUpRight size={20}/></Link><Link href={autoPath(locale,'booking')} className="rounded-2xl bg-[#FB6935] p-6 flex justify-between gap-3 items-center font-extrabold">{ar?'جهّز طلب الفحص':'Prepare an inspection request'}<ArrowUpRight size={20}/></Link></section>
 </div>;
}
