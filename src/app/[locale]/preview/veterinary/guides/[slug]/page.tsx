import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath,pawArticle } from '@/lib/verticals/veterinary/data';
import { BookOpen, ArrowUpRight, ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return PAWWELL.articles.map(x=>({slug:x.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const a=pawArticle(slug);return a?{title:a.title[locale]+' | PawWell',description:a.summary[locale],robots:{index:false}}:{};
}
export default function PetCareArticle({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const article=pawArticle(slug);if(!article)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <nav className="text-sm text-[#476458]"><Link href={pawPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={pawPath(locale,'guides')}>{ar?'المجلة':'Care journal'}</Link></nav>
  <div className="mt-12 pb-12 border-b-2 border-[#F3B98E]"><p className="text-xs text-[#915736] tracking-widest font-black">PET PARENT JOURNAL / PAWWELL</p><h1 className="paw-display font-black text-4xl sm:text-6xl mt-5">{article.title[locale]}</h1><p className="text-[#486559] text-lg leading-9 mt-8">{article.summary[locale]}</p></div>
  <article className="bg-white rounded-[2rem] p-8 sm:p-14 border border-[#D9E6D8] mt-12">
   <BookOpen size={35} className="text-[#A66B47]"/><h2 className="text-2xl font-black mt-7">{ar?'معلومات عملية قبل الزيارة':'Practical context before your visit'}</h2><p className="text-[#486559] text-base leading-[2.2] mt-6">{article.body[locale]}</p>
   <p className="border-s-4 border-[#E6B18D] ps-5 text-[#49665A] text-sm leading-8 mt-9">{ar?'هذه المقالة عامة وليست نصيحة أو تشخيصًا بيطريًا مخصصًا.':'General education only, not specific veterinary diagnosis or medical advice.'}</p>
  </article>
  <div className="flex flex-wrap gap-3 mt-11"><Link href={pawPath(locale,'services')} className="rounded-full px-7 py-4 border border-[#ADC3B1] text-sm font-bold">{ar?'دليل الخدمات':'Explore care services'}</Link><Link href={pawPath(locale,'request')} className="rounded-full px-7 py-4 bg-[#24463D] text-white text-sm font-bold inline-flex items-center gap-2">{ar?'جهز طلب متابعة':'Prepare a visit request'}<ArrowUpRight size={17}/></Link></div>
 </div>;
}
