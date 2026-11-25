import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { PULSE,pulseGuide,pulsePath } from '@/lib/verticals/fitness/data';
import { ArrowUpRight,BookOpen } from 'lucide-react';
export function generateStaticParams(){return PULSE.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=pulseGuide(slug);return a?{title:a.title[locale]+' | Pulse District',description:a.summary[locale],robots:{index:false}}:{};
}
export default async function PulseGuide(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const a=pulseGuide(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20"><nav className="text-xs text-[#47455B]"><Link href={pulsePath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={pulsePath(locale,'journal')}>{ar?'دليل التدريب':'Journal'}</Link></nav><header className="mt-14 border-b-4 border-[#5939B3] pb-10"><p className="text-xs font-black text-[#5939B3] tracking-widest">PULSE / FIELD GUIDE</p><h1 className="pulse-display text-5xl sm:text-6xl mt-6">{a.title[locale]}</h1><p className="mt-6 text-lg text-[#3D3B52] leading-9">{a.summary[locale]}</p></header><article className="bg-white border-2 border-[#D6D3E2] p-8 sm:p-14 mt-11"><BookOpen size={31} className="text-[#5939B3]"/><h2 className="font-black text-2xl mt-8">{ar?'توضيح عملي':'The practical context'}</h2><p className="mt-7 text-[#3F3D51] leading-[2.3]">{a.body[locale]}</p><p className="text-xs leading-8 border-s-4 border-[#5939B3] ps-5 mt-10">{ar?'المقال تثقيفي وليس جدول نادي حقيقي أو وصفة تدريبية أو نصيحة طبية شخصية.':'Educational editorial content only, not an actual class schedule, training prescription or individualized medical advice.'}</p></article><Link href={pulsePath(locale,'trial')} className="inline-flex gap-2 px-7 py-4 bg-[#141421] text-[#E0FE61] text-sm font-black mt-10">{ar?'حضّر طلب تجربة':'PLAN AN ENQUIRY'}<ArrowUpRight size={18}/></Link></div>;
}
