import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { FORMA,formaArticle,formaPath } from '@/lib/verticals/interiors-kitchens/data';
import { BookOpen,ArrowUpRight } from 'lucide-react';
export function generateStaticParams(){return FORMA.articles.map(a=>({slug:a.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const a=formaArticle(slug);return a?{title:a.title[locale]+' | Forma Atelier',description:a.summary[locale],robots:{index:false}}:{};
}
export default function FormaJournalArticle({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const a=formaArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl px-5 sm:px-8 mx-auto py-16 sm:py-24"><nav className="text-xs text-[#776458]"><Link href={formaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={formaPath(locale,'journal')}>{ar?'المقالات':'Journal'}</Link></nav>
  <header className="mt-14 border-b-2 border-[#793D40] pb-10"><p className="font-mono text-[#793D40] text-xs tracking-widest">FORMA / DESIGN JOURNAL</p><h1 className="forma-display text-4xl sm:text-6xl leading-tight mt-6">{a.title[locale]}</h1><p className="text-[#65544A] text-lg leading-9 mt-6">{a.summary[locale]}</p></header>
  <article className="bg-white border border-[#D2C2B4] p-8 sm:p-12 mt-12"><BookOpen size={37} className="text-[#793D40]"/><h2 className="forma-display text-3xl mt-7">{ar?'معلومات تساعد في القرار':'A practical project perspective'}</h2><p className="mt-6 text-[#5E5047] leading-[2.3] text-base">{a.body[locale]}</p><div className="mt-10 border-s-4 border-[#B9866B] ps-6 text-[#776458] text-xs leading-7">{ar?'هذا محتوى عام للمساعدة في استشارة تصميم، وليس مخططًا معتمدًا أو تصريحًا بأعمال إنشائية.':'General design preparation guidance, not a licensed site plan, structural instruction or verified quote.'}</div></article>
  <Link className="inline-flex gap-3 items-center bg-[#6C3538] text-white px-8 py-4 mt-10 text-sm font-bold" href={formaPath(locale,'consultation')}>{ar?'جهز طلب استشارة':'Prepare the design brief'}<ArrowUpRight size={17}/></Link>
 </div>;
}
