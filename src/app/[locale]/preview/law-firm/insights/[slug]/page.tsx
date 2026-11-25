import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { LEXORA,lexoraPath,lexoraArticle } from '@/lib/verticals/law-firm/data';
import { BookOpen,ArrowUpRight,LockKeyhole } from 'lucide-react';
export function generateStaticParams(){return LEXORA.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=lexoraArticle(slug);return a?{title:a.title[locale]+' | Lexora Counsel',description:a.summary[locale],robots:{index:false}}:{};
}
export default async function LexoraInsightDetail(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=lexoraArticle(slug);if(!a)notFound();const ar=locale==='ar';return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
   <nav className="text-xs text-[#6A596C]"><Link href={lexoraPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={lexoraPath(locale,'insights')}>{ar?'المعرفة':'Insights'}</Link></nav>
   <header className="mt-14 border-b-2 border-[#B79B6A] pb-12"><p className="font-mono font-bold text-xs uppercase tracking-widest text-[#84662F]">LEGAL EDITORIAL / LEXORA</p><h1 className="lexora-display mt-6 text-4xl sm:text-6xl">{a.title[locale]}</h1><p className="text-lg text-[#584C60] leading-9 mt-7">{a.summary[locale]}</p></header>
   <article className="bg-white border border-[#DFD3C3] mt-12 p-8 sm:p-14"><BookOpen size={35} className="text-[#84662F]"/><h2 className="lexora-display text-3xl mt-7">{ar?'رؤية عملية عامة':'General context worth understanding'}</h2><p className="text-[#584C60] mt-7 leading-[2.2] text-base">{a.body[locale]}</p>
    <div className="flex gap-4 mt-11 p-5 bg-[#F2EADB] border-s-4 border-[#84662F]"><LockKeyhole size={25} className="shrink-0 text-[#84662F]"/><p className="text-sm leading-8 text-[#514358]">{ar?'هذا محتوى توعوي ولا يمثل فتوى أو مشورة قانونية تخص قضية فعلية؛ لا ترفق وثائق أو أسماء أطراف ثالثة.':'General legal education only: not a lawyer’s advice, a real engagement or a safe place to submit confidential documents.'}</p></div>
   </article><div className="mt-11 flex flex-wrap gap-3"><Link href={lexoraPath(locale,'practices')} className="px-6 py-4 border border-[#84662F] font-bold text-sm">{ar?'مجالات الممارسة':'Practice areas'}</Link><Link href={lexoraPath(locale,'consultation')} className="px-6 py-4 bg-[#251D34] text-white text-sm font-bold inline-flex gap-2 items-center">{ar?'استفسار عام فقط':'General enquiry only'}<ArrowUpRight size={17}/></Link></div>
  </div>;
}
