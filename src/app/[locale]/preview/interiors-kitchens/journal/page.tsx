import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { FORMA,formaPath,formaText } from '@/lib/verticals/interiors-kitchens/data';
import { BookOpen,ArrowUpRight } from 'lucide-react';
export default function FormaJournal({params:{locale}}:{params:{locale:Locale}}){
 const ar=locale==='ar';
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="font-mono text-xs text-[#793D40]">FORMA / SPACE NOTES</p>
  <h1 className="forma-display text-4xl sm:text-6xl mt-6">{ar?'ملاحظات قبل طلب تصميم':'Kitchen decisions explained before the quote'}</h1>
  <p className="max-w-3xl text-[#64544A] leading-9 mt-7">{ar?'محتوى متخصص عن رفع المقاسات وتخطيط الحركة واختيار الخامات، بدل قوائم نصائح عامة لا تنطبق على كل مطبخ.':'Original educational notes about measuring, layout and material selection, written to help you prepare a useful design consultation.'}</p>
  <div className="grid lg:grid-cols-3 gap-5 mt-12">{FORMA.articles.map((a,i)=><Link href={formaPath(locale,'journal/'+a.slug)} key={a.slug} className="bg-white border border-[#D4C3B4] p-8 flex flex-col min-h-[320px] hover:bg-[#EDE1D6]"><BookOpen size={31} className="text-[#793D40]"/><span className="mt-7 text-[#793D40] font-mono text-xs">ARTICLE / 0{i+1}</span><h2 className="forma-display text-2xl mt-5">{formaText(a.title,locale)}</h2><p className="text-sm leading-8 text-[#65554B] mt-5">{formaText(a.summary,locale)}</p><span className="mt-auto pt-7 text-xs font-bold inline-flex gap-3">{ar?'اقرأ التفاصيل':'Read field note'}<ArrowUpRight size={17}/></span></Link>)}</div></div>;
}
