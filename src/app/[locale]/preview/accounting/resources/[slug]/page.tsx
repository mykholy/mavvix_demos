import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { LEDGERPOINT,ledgerPath,ledgerArticle } from '@/lib/verticals/accounting/data';
import { BookOpen,ArrowUpRight,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return LEDGERPOINT.articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
 const {locale,slug}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 const a=ledgerArticle(slug);return a?{title:a.title[locale]+' | LedgerPoint',description:a.summary[locale],robots:{index:false}}:{};
}
export default async function LedgerResourceDetail({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 const a=ledgerArticle(slug);if(!a)notFound();const ar=locale==='ar';
 return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><nav className="text-xs text-[#455F6C]"><Link href={ledgerPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={ledgerPath(locale,'resources')}>{ar?'المقالات':'Resources'}</Link></nav><header className="border-b-2 border-[#50C2C3] pb-11 mt-14"><p className="font-bold tracking-widest text-xs text-[#176C72]">ACCOUNTING SCOPE / EDUCATION</p><h1 className="ledger-display text-4xl sm:text-6xl mt-6">{a.title[locale]}</h1><p className="text-lg leading-9 text-[#455F6C] mt-6">{a.summary[locale]}</p></header><article className="bg-white border border-[#D5E1DF] mt-11 p-8 sm:p-14"><BookOpen size={34} className="text-[#147C82]"/><h2 className="ledger-display text-3xl mt-6">{ar?'الفكرة العملية':'The practical context'}</h2><p className="text-[#455F6C] mt-7 leading-[2.2]">{a.body[locale]}</p><div className="bg-[#E6F3F0] p-6 flex gap-4 mt-10"><ShieldCheck size={24} className="shrink-0 text-[#147C82]"/><p className="leading-8 text-sm text-[#455F6C]">{ar?'المقال توعوي وليس إقرارًا ضريبيًا أو رأيًا صادرًا عن مراجع معتمد.':'General education only; not a tax return, professional audit opinion or accountant engagement.'}</p></div></article><Link href={ledgerPath(locale,'quote')} className="inline-flex items-center gap-2 bg-[#1C3343] px-8 py-4 text-sm font-bold text-white mt-10">{ar?'اطلب نطاق عمل':'Request a scoped enquiry'}<ArrowUpRight size={17}/></Link></div>;
}
