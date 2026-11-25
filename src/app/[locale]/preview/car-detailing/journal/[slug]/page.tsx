import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { GLOSSBAY,glossPath,glossArticle } from '@/lib/verticals/car-detailing/data';
import { BookOpen,ArrowUpRight } from 'lucide-react';
export function generateStaticParams(){return GLOSSBAY.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=glossArticle(slug);return a?{title:a.title[locale]+' | GlossBay',description:a.summary[locale],robots:{index:false}}:{};
}
export default async function GlossJournalDetail(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=glossArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><nav className="text-[#365769] text-xs"><Link href={glossPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={glossPath(locale,'journal')}>{ar?'دليل العناية':'Journal'}</Link></nav>
 <header className="mt-12 border-b-4 border-[#0B95B9] pb-11"><p className="font-mono text-xs text-[#09627E] font-black">GLOSSBAY / CAR CARE EDUCATION</p><h1 className="gloss-display text-4xl sm:text-6xl font-black leading-tight mt-5">{a.title[locale]}</h1><p className="text-lg text-[#314A5C] leading-9 mt-7">{a.summary[locale]}</p></header>
 <article className="bg-white border border-[#C7DDE7] p-8 sm:p-12 mt-11"><BookOpen className="text-[#09627E]" size={36}/><h2 className="gloss-display text-3xl font-black mt-7">{ar?'الشرح العملي':'The technical context'}</h2><p className="text-[#314A5C] leading-[2.3] text-base mt-7">{a.body[locale]}</p><p className="border-s-4 border-[#0B95B9] ps-5 mt-10 text-sm text-[#496577] leading-8">{ar?'هذا شرح عام؛ المنتجات والمواعيد والأسعار والنتائج الفعلية تحتاج مركزًا مرخصًا وموافقة صاحب السيارة.':'General education only; real products, appointments, price and outcomes require an operating provider and inspection.'}</p></article>
 <Link href={glossPath(locale,'quote')} className="inline-flex gap-3 items-center mt-10 px-8 py-4 bg-[#0D1626] text-white text-sm font-black">{ar?'جهز طلب نطاق واضح':'Prepare a service enquiry'}<ArrowUpRight size={18}/></Link>
 </div>;
}
