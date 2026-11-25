import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { VELORA,veloraArticle,veloraPath } from '@/lib/verticals/salon-spa/data';
import { BookOpen,ArrowUpRight } from 'lucide-react';
export function generateStaticParams(){return VELORA.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=veloraArticle(slug);return a?{title:a.title[locale]+' | Velora Beauty',description:a.summary[locale],robots:{index:false}}:{};
}
export default async function VeloraJournalArticle(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=veloraArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><nav className="text-xs text-[#795967]"><Link href={veloraPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={veloraPath(locale,'journal')}>{ar?'المجلة':'Journal'}</Link></nav><header className="mt-14 pb-12 border-b-2 border-[#B88291]"><p className="font-mono text-xs tracking-[.2em] text-[#855060]">THE VELORA JOURNAL</p><h1 className="velora-display text-5xl sm:text-6xl leading-tight mt-6">{a.title[locale]}</h1><p className="text-lg leading-9 text-[#704E59] mt-7">{a.summary[locale]}</p></header><article className="mt-12 bg-[#FFFDF9] border border-[#E3D3D2] p-8 sm:p-14"><BookOpen size={36} className="text-[#A36D79]"/><h2 className="velora-display text-3xl mt-7">{ar?'خلف كل اختيار تفاصيل تستاهل المعرفة':'What the service choice actually involves'}</h2><p className="text-base text-[#704E59] leading-[2.3] mt-7">{a.body[locale]}</p><p className="text-xs leading-7 mt-11 border-s-4 ps-6 border-[#B88291] text-[#795967]">{ar?'هذه المقالة إرشادية لخدمات تجميلية، وليست نصيحة علاجية أو شهادة بنتائج حقيقية.':'This is editorial beauty guidance, not treatment advice or evidence of actual client results.'}</p></article><Link href={veloraPath(locale,'booking')} className="mt-10 inline-flex items-center gap-3 bg-[#4B2834] text-white px-7 py-4 rounded-full text-sm font-bold">{ar?'اطلبي تجربة اختيار الخدمة':'Try a service enquiry'}<ArrowUpRight size={18}/></Link></div>;
}
