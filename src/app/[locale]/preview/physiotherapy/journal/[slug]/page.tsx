import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { MOTION,motionArticle,motionPath } from '@/lib/verticals/physiotherapy/data';
import { ArrowUpRight,BookOpen } from 'lucide-react';
export function generateStaticParams(){return MOTION.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=motionArticle(slug);return a?{title:a.title[locale]+' | Motion Lab',description:a.summary[locale],robots:{index:false}}:{};
}
export default async function MotionArticle(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=motionArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><nav className="text-sm text-[#416B5D]"><Link href={motionPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={motionPath(locale,'journal')}>{ar?'المقالات':'Journal'}</Link></nav><header className="mt-12 border-b-4 border-[#3E9374] pb-11"><p className="text-xs font-mono text-[#287459] tracking-widest">THE MOTION JOURNAL</p><h1 className="motion-display text-4xl sm:text-6xl leading-tight font-black mt-5">{a.title[locale]}</h1><p className="text-[#46695C] leading-9 text-lg mt-7">{a.summary[locale]}</p></header><article className="mt-11 bg-[#FCFDF8] border border-[#C7DACD] rounded-3xl p-8 sm:p-12"><BookOpen size={37} className="text-[#287459]"/><h2 className="motion-display text-3xl mt-7 font-black">{ar?'السياق الصحيح':'Useful context'}</h2><p className="text-[#46695C] text-base leading-[2.3] mt-7">{a.body[locale]}</p><p className="mt-9 border-s-4 border-[#3E9374] ps-5 text-[#46695C] text-sm leading-8">{ar?'هذا مقال توضيحي عام، وليس وصفة علاجية أو تشخيصًا طبيًا أو توصية بالعودة للنشاط.':'General educational information, not a diagnosis, treatment prescription or clearance for activity.'}</p></article><Link href={motionPath(locale,'appointment')} className="inline-flex mt-10 gap-3 items-center rounded-full bg-[#23443F] text-white px-8 py-4 font-bold text-sm">{ar?'شوف نموذج الاستفسار':'Explore the first-contact form'}<ArrowUpRight size={18}/></Link></div>;
}
