import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE,oakProduct,oakPath } from '@/lib/verticals/furniture/data';
import { Armchair,ArrowUpRight,Ruler,Palette,CheckCircle2,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return OAKLINE.services.map(x=>({slug:x.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const p=oakProduct(slug);return p?{title:p.title[locale]+' | Oakline Living',description:p.summary[locale],robots:{index:false}}:{};
}
export default function OakProductDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const p=oakProduct(slug);if(!p)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#3E3025] text-[#F9F1E7] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <nav className="text-xs text-[#E3CDAF]"><Link href={oakPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={oakPath(locale,'collections')}>{ar?'القطع':'Collection'}</Link> / {p.title[locale]}</nav>
  <div className="mt-14 grid lg:grid-cols-[1fr_.5fr] gap-12 items-end"><div><p className="text-xs font-bold text-[#E3BE8F] tracking-[.2em]">OAKLINE OBJECT FILE / {String(p.rank).padStart(2,'0')}</p><h1 className="oakline-display text-5xl sm:text-7xl mt-6 leading-tight">{p.title[locale]}</h1><p className="mt-7 leading-9 text-base text-[#EADCC9] max-w-3xl">{p.summary[locale]}</p></div><Link href={oakPath(locale,'quote')+'?product='+p.slug} className="px-7 py-5 bg-[#E1BB8A] text-[#392C24] font-bold text-sm flex gap-3 items-center w-fit">{ar?'اختار الخامة والمقاس':'CONFIGURE A QUOTE BRIEF'}<ArrowUpRight size={18}/></Link></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.5fr_1fr] gap-10"><div><Armchair size={37} className="text-[#87623F]"/><h2 className="oakline-display text-4xl mt-7">{ar?'الفكرة وراء القطعة':'The design considerations'}</h2></div><p className="text-[#66503C] leading-[2.1] text-base sm:text-lg">{p.body[locale]}</p></section>
 <section className="bg-[#EAE0D2] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="oakline-display text-4xl">{ar?'نطاق المقاسات المبدئية':'Indicative dimension bounds'}</h2><p className="mt-5 text-sm leading-8 text-[#66503C]">{ar?'هذه حدود لتجربة طلب التصميم فقط، وليست مواصفات تصنيع أو قطعة منتجة.':'The ranges are for a consistent enquiry form, not actual manufacturing drawings or offered SKU specifications.'}</p>
  <div className="grid md:grid-cols-3 gap-4 mt-10">{(['width','depth','height'] as const).map((key,i)=><div key={key} className="bg-white border border-[#D5C5B1] p-8"><Ruler size={30} className="text-[#87623F]"/><p className="text-xs text-[#806044] font-bold uppercase mt-7">{key} / mm</p><h3 className="oakline-display text-3xl font-semibold mt-3">{p.minMax[key][0]}–{p.minMax[key][1]}</h3></div>)}</div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><h2 className="oakline-display text-4xl">{ar?'اختيارات الخامة والتشطيب':'Material and finish preferences'}</h2><div className="grid sm:grid-cols-2 gap-5 mt-10"><div className="bg-white border border-[#D8C7B3] p-8"><Palette size={30}/><h3 className="text-xl font-black mt-5">{ar?'خامات استرشادية':'Material preferences'}</h3><div className="flex flex-wrap gap-3 mt-6">{p.materials.map(x=><span key={x} className="bg-[#F1E6D6] px-4 py-2 text-sm font-semibold">{x}</span>)}</div></div><div className="bg-white border border-[#D8C7B3] p-8"><CheckCircle2 size={30}/><h3 className="text-xl font-black mt-5">{ar?'تشطيبات مقترحة':'Finish preferences'}</h3><div className="flex flex-wrap gap-3 mt-6">{p.finishes.map(x=><span key={x} className="bg-[#F1E6D6] px-4 py-2 text-sm font-semibold">{x}</span>)}</div></div></div></section>
 <section className="bg-[#392C24] text-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap gap-7 justify-between items-center"><div><h2 className="oakline-display text-3xl sm:text-4xl">{ar?'عندك مقاس مناسب؟':'Have a room measurement in mind?'}</h2><p className="text-sm leading-8 mt-4 text-[#E4D5C2]">{ar?'انقل الاختيارات لطلب تسعير مع قطع أخرى، وبعدين اعتمدها مع صانع حقيقي.':'Prepare an item alongside other pieces; a real manufacturer must verify and quote it.'}</p></div><Link href={oakPath(locale,'quote')+'?product='+p.slug} className="px-8 py-5 bg-[#E1BB8A] text-[#392C24] flex gap-3 items-center font-black text-sm">{ar?'تكوين طلب التسعير':'ADD TO QUOTE BRIEF'}<ArrowUpRight size={18}/></Link></div></section>
 </div>;
}
