import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,arenaGuide,arenaPath } from '@/lib/verticals/sports-venues/data';
import { BookOpen,ArrowUpRight,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return ARENA.articles.map(a=>({slug:a.slug}));}
export function generateMetadata({params:{slug,locale}}:{params:{slug:string;locale:Locale}}):Metadata{
 const a=arenaGuide(slug);return a?{title:a.title[locale]+' | Arena Courts',description:a.summary[locale],robots:{index:false}}:{};
}
export default function ArenaJournalDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const a=arenaGuide(slug);if(!a)notFound();const ar=locale==='ar';
 return <div><div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><nav className="text-[#315B43] text-xs"><Link href={arenaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={arenaPath(locale,'journal')}>{ar?'الدليل':'Journal'}</Link></nav>
  <header className="mt-14 border-b-4 border-[#F0B044] pb-12"><p className="text-[#315B43] font-bold uppercase text-xs tracking-widest">ARENA FIELD NOTES / PRACTICAL GUIDANCE</p><h1 className="arena-display text-4xl sm:text-6xl font-black mt-6 leading-tight">{a.title[locale]}</h1><p className="mt-7 text-lg leading-9 text-[#345943]">{a.summary[locale]}</p></header>
  <article className="bg-white border border-[#C9D9CB] p-8 sm:p-14 mt-12"><BookOpen size={33} className="text-[#315B43]"/><h2 className="arena-display text-3xl font-black mt-6">{ar?'ملاحظات عملية':'PRACTICAL CONSIDERATIONS'}</h2><p className="mt-7 leading-[2.2] text-[#345943] text-base">{a.body[locale]}</p><p className="mt-9 ps-6 border-s-4 border-[#F0B044] leading-7 text-sm text-[#45664B]">{ar?'هذا دليل توعوي ولا يثبت قواعد أو توافر أي ملعب بعينه.':'This is general sport guidance, not verified venue availability or contractual terms.'}</p></article>
  <div className="flex flex-wrap gap-3 mt-10"><Link href={arenaPath(locale,'courts')} className="inline-flex px-6 py-4 border-2 border-[#102B26] text-sm font-black">{ar?'صيغ اللعب':'COURT FORMATS'}</Link><Link href={arenaPath(locale,'book')} className="inline-flex px-6 py-4 bg-[#102B26] text-white gap-2 items-center text-sm font-black">{ar?'طلب وقت تفضيلي':'REQUEST A TIME'}<ArrowUpRight size={16}/></Link></div>
 </div></div>;
}
