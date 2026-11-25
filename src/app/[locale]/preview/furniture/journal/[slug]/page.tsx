import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE,oakGuide,oakPath } from '@/lib/verticals/furniture/data';
import { BookOpen,ArrowUpRight,Ruler } from 'lucide-react';
export function generateStaticParams(){return OAKLINE.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const g=oakGuide(slug);return g?{title:g.title[locale]+' | Oakline Living',description:g.summary[locale],robots:{index:false}}:{};
}
export default async function OaklineArticle(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=oakGuide(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><nav className="text-xs text-[#73583B]"><Link href={oakPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={oakPath(locale,'journal')}>{ar?'المجلة':'Journal'}</Link></nav>
  <header className="mt-14 pb-12 border-b-2 border-[#AA8A60]"><p className="text-xs text-[#806044] tracking-widest font-bold">OAKLINE / INTERIOR FIELD NOTES</p><h1 className="oakline-display text-4xl sm:text-6xl leading-tight mt-6">{a.title[locale]}</h1><p className="text-[#68533F] leading-9 text-lg mt-8">{a.summary[locale]}</p></header>
  <article className="p-8 sm:p-14 bg-white border border-[#D6C4AE] mt-12"><BookOpen size={36} className="text-[#806044]"/><h2 className="oakline-display text-3xl mt-8">{ar?'الفكرة والملاحظات العملية':'The real-world perspective'}</h2><p className="mt-8 leading-[2.2] text-[#66503C] text-base">{a.body[locale]}</p><p className="mt-10 ps-6 border-s-4 border-[#BA9062] text-sm text-[#79634B] leading-8">{ar?'هذه إرشادات عامة؛ القياس النهائي والخامات والتصنيع يوافق عليها صانع حقيقي.':'This is general planning guidance; final dimensions, materials and fabrication require a real maker.'}</p></article>
  <div className="flex gap-3 flex-wrap mt-10"><Link href={oakPath(locale,'collections')} className="border border-[#392C24] px-7 py-4 text-sm font-black">{ar?'استكشف القطع':'COLLECTION'}</Link><Link href={oakPath(locale,'quote')} className="bg-[#392C24] text-white px-7 py-4 font-black text-sm inline-flex gap-3 items-center">{ar?'جهز طلبك':'BUILD A QUOTE'}<ArrowUpRight size={17}/></Link></div>
 </div>;
}
