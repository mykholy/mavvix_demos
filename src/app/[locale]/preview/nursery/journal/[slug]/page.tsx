import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n/config';
import {BLOOM,bloomArticle,bloomPath} from '@/lib/verticals/nursery/data';
import {BookOpen,ArrowUpRight} from 'lucide-react';
export function generateStaticParams(){return BLOOM.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=bloomArticle(slug);return a?{title:a.title[locale]+' | BloomSteps',description:a.summary[locale],robots:{index:false,follow:false}}:{};
}
export default async function JournalArticle(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=bloomArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><Link href={bloomPath(locale,'journal')} className="text-sm underline">{ar?'دليل الأسرة':'Family journal'}</Link><BookOpen size={38} className="mt-10"/><h1 className="bloom-display text-4xl sm:text-6xl mt-6 leading-tight">{a.title[locale]}</h1><p className="mt-6 text-lg leading-9">{a.summary[locale]}</p><article className="mt-10 bg-white border border-[#D6E4D6] rounded-3xl p-7 sm:p-12"><h2 className="text-2xl font-extrabold">{ar?'ما تحتاج الأسرة تعرفه':'What families can consider'}</h2><p className="leading-[2.3] text-base mt-7">{a.body[locale]}</p><p className="mt-8 text-sm leading-7 border-s-4 border-[#145960] ps-5">{ar?'محتوى عام وليس سياسة حضانة قائمة أو تقييمًا لطفل.':'General guidance, not an operating nursery policy or assessment of a child.'}</p></article><Link href={bloomPath(locale,'admissions')} className="mt-10 inline-flex gap-2 bg-[#145960] text-white rounded-full px-7 py-4 font-bold text-sm">{ar?'طلب زيارة توضيحي':'Try a visit request'}<ArrowUpRight size={16}/></Link></div>;
}
