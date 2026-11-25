import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,arenaPath,arenaText } from '@/lib/verticals/sports-venues/data';
import { BookOpen,ArrowUpRight,Trophy } from 'lucide-react';
export default async function ArenaJournal(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 return <div><section className="bg-[#102B26] text-white py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <p className="text-xs tracking-widest text-[#F0B044] font-black">ARENA / FIELD JOURNAL</p><h1 className="arena-display font-black text-4xl sm:text-7xl mt-5">{ar?'قبل اللعب، جهز فريقك صح':'KNOW THE GAME BEFORE THE WHISTLE'}</h1>
  <p className="text-[#D5E7D8] text-base leading-9 mt-6 max-w-3xl">{ar?'مقالات عملية عن تنسيق الفرق والبادل واختيار المكان، بدون اختلاق قوانين حجز خاصة بمنشأة غير موجودة.':'Practical notes on football teams, padel setup and what to check before requesting a venue—without fictional opening hours or operational claims.'}</p>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-5">{ARENA.articles.map((a,i)=><Link key={a.slug} href={arenaPath(locale,'journal/'+a.slug)} className="bg-white border-2 border-[#CADACA] p-8 min-h-[380px] flex flex-col hover:bg-[#E8F2E7]">
  <BookOpen size={30} className="text-[#315B43]"/><span className="text-xs font-mono text-[#315B43] mt-10">PLAYER NOTE / {String(i+1).padStart(2,'0')}</span>
  <h2 className="arena-display font-black text-3xl mt-5 leading-tight">{arenaText(a.title,locale)}</h2>
  <p className="text-[#345943] text-sm leading-8 mt-5">{arenaText(a.summary,locale)}</p>
  <span className="mt-auto pt-8 inline-flex gap-3 items-center text-sm font-black">{ar?'اقرأ الموضوع':'READ FIELD NOTE'}<ArrowUpRight size={18}/></span>
 </Link>)}</section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20"><div className="p-8 sm:p-12 bg-[#F0B044]"><Trophy size={30}/><h2 className="arena-display text-3xl sm:text-4xl font-black mt-6">{ar?'رتب كل التفاصيل قبل وقت المباراة':'PREPARE A COHERENT REQUEST'}</h2><p className="mt-4 text-sm leading-8">{ar?'استخدم نموذج تجريبي يوضح اللعبة والعدد والمدة والوقت؛ يظل الحجز بانتظار تأكيد مشغل حقيقي.':'Choose the sport, number of players and preferred hour in the illustration. Only an actual operating venue can confirm availability.'}</p><Link href={arenaPath(locale,'book')} className="inline-flex mt-7 bg-[#102B26] text-white px-7 py-4 font-bold text-sm">{ar?'افتح نموذج الملعب':'TRY COURT REQUEST'}</Link></div></section>
 </div>;
}
