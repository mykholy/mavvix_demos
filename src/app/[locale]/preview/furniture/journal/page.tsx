import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE,oakPath,oakText } from '@/lib/verticals/furniture/data';
import { BookOpen,ArrowUpRight,Ruler } from 'lucide-react';
export default function FurnitureJournal({params:{locale}}:{params:{locale:Locale}}){
 const ar=locale==='ar';
 return <div><section className="bg-[#E6DAC8] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <p className="text-xs tracking-widest text-[#785A3A] font-bold">OAKLINE / THE ROOM NOTES</p><h1 className="oakline-display text-4xl sm:text-7xl mt-6">{ar?'اختيار الأثاث يبدأ بمعلومة مفيدة':'THOUGHTFUL READING FOR REAL ROOMS'}</h1>
  <p className="text-[#68533F] leading-9 max-w-3xl mt-7">{ar?'أدلة عن قياس الغرفة والخامات وتوصيل القطع. نصائح عملية تساعدك تجهز استفسارًا واضحًا قبل أي شراء.':'Original practical guides for measuring rooms, comparing materials and planning delivery access. They prepare a meaningful brief without pretending Oakline has delivered real furniture.'}</p>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-5">{OAKLINE.articles.map((a,i)=><Link key={a.slug} href={oakPath(locale,'journal/'+a.slug)} className="bg-white border border-[#D6C4AE] p-8 min-h-[360px] flex flex-col hover:bg-[#F0E5D7]">
  <BookOpen size={35} className="text-[#8B6642]"/><p className="text-xs font-mono mt-8 text-[#785A3A]">INTERIOR NOTE / 0{i+1}</p>
  <h2 className="oakline-display text-3xl mt-5 leading-snug">{oakText(a.title,locale)}</h2><p className="text-sm leading-8 text-[#69533F] mt-5">{oakText(a.summary,locale)}</p>
  <span className="mt-auto pt-8 inline-flex gap-2 font-bold text-sm items-center">{ar?'اقرأ الدليل':'READ THE GUIDE'}<ArrowUpRight size={17}/></span>
 </Link>)}</section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20"><div className="bg-[#392C24] text-white p-8 sm:p-12"><Ruler size={35} className="text-[#E1BA89]"/><h2 className="oakline-display text-3xl mt-6">{ar?'جهز المقاسات وخليك واقعي في طلبك':'Start with your actual room dimensions'}</h2><Link className="inline-flex mt-7 bg-[#E1BA89] text-[#392C24] px-7 py-4 text-sm font-black" href={oakPath(locale,'quote')}>{ar?'سلة طلب التسعير':'CREATE A NONBINDING QUOTE'}</Link></div></section>
 </div>;
}
