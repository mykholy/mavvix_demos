import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { HOME_CARE,careGuide,maintenancePath } from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';
export function generateStaticParams(){return HOME_CARE.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=careGuide(slug);return a?{title:a.title[locale]+' | Fixora',description:a.summary[locale]}:{};
}
export default async function HomeResourceDetail(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=careGuide(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20"><nav className="text-xs text-[#7692A8]"><Link href={maintenancePath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={maintenancePath(locale,'resources')}>{ar?'دليل المنزل':'Guides'}</Link></nav><header className="mt-14 pb-10 border-b-2 border-[#F7B347]"><p className="text-[#D39421] uppercase font-black text-xs tracking-widest">FIXORA FIELD ARTICLE</p><h1 className="text-4xl sm:text-5xl leading-tight font-black mt-5">{a.title[locale]}</h1><p className="text-[#527089] leading-9 text-lg mt-7">{a.summary[locale]}</p></header><section className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[#E0ECF4] mt-12"><BookOpen size={35} className="text-[#D39421]"/><h2 className="text-2xl font-black mt-6">{ar?'الفكرة العملية':'The practical context'}</h2><p className="leading-[2.4] text-[#527089] mt-6">{a.body[locale]}</p><p className="text-xs text-[#7692A8] leading-7 border-s-4 border-[#F7B347] ps-6 mt-8">{ar?'هذه معلومات عامة؛ التشخيص والتدخل المهني يحتاجان جهة مؤهلة وموقعًا فعليًا.':'General educational information; actual assessment and repair require an appropriately qualified provider.'}</p></section><section className="mt-10 flex flex-wrap gap-3"><Link href={maintenancePath(locale,'services')} className="border border-[#174E78] rounded-xl px-6 py-4 font-bold text-sm">{ar?'الخدمات':'Services'}</Link><Link href={maintenancePath(locale,'book')} className="bg-[#174E78] text-white rounded-xl px-6 py-4 font-bold text-sm inline-flex gap-2">{ar?'طلب استفسار':'Start enquiry'}<ArrowUpRight size={17}/></Link></section></div>;
}
