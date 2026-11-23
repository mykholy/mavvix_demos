import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,arenaFormat,arenaPath } from '@/lib/verticals/sports-venues/data';
import { ArrowUpRight,Users,Clock3,CheckCircle2,AlertTriangle,Trophy } from 'lucide-react';
export function generateStaticParams(){return ARENA.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const c=arenaFormat(slug);return c?{title:c.title[locale]+' | Arena Courts Mavvix',description:c.summary[locale],robots:{index:false}}:{};
}
export default function ArenaFormatDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const c=arenaFormat(slug);if(!c)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#102B26] text-white py-14 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <nav className="text-xs text-[#C6D8C8]"><Link href={arenaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={arenaPath(locale,'courts')}>{ar?'الملاعب':'Courts'}</Link> / {c.title[locale]}</nav>
  <div className="mt-14 grid lg:grid-cols-[1fr_.5fr] gap-10 items-end"><div><p className="text-[#F0B044] font-mono text-sm tracking-widest">ARENA FORMAT / {String(c.rank).padStart(2,'0')}</p><h1 className="arena-display font-black text-4xl sm:text-7xl mt-5">{c.title[locale]}</h1><p className="text-[#D6E7D8] mt-7 leading-9 text-lg max-w-3xl">{c.summary[locale]}</p></div><div className="border border-[#50745A] p-8 grid grid-cols-2 gap-5"><div><Users size={25} className="text-[#F0B044]"/><b className="arena-display text-4xl font-black mt-4 block">{c.players}</b><p className="text-xs text-[#D6E7D8]">{ar?'لاعب لصيغة اللعب':'Players per format'}</p></div><div><Clock3 size={25} className="text-[#F0B044]"/><b className="arena-display text-3xl font-black mt-4 block">{c.durations.join('/')}</b><p className="text-xs text-[#D6E7D8]">{ar?'دقيقة للاستفسار':'Indicative minutes'}</p></div></div></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.5fr_1fr] gap-10"><h2 className="arena-display text-3xl sm:text-4xl font-black">{ar?'شرح الصيغة قبل حجز الملعب':'KNOW THE GAME FORMAT BEFORE THE REQUEST'}</h2><p className="text-base sm:text-lg leading-[2.1] text-[#345943]">{c.body[locale]}</p></section>
 <section className="bg-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="arena-display text-3xl font-black">{ar?'قائمة تحقق قبل اللعب':'YOUR PRE-GAME CHECKLIST'}</h2><div className="grid md:grid-cols-3 gap-4 mt-8">{c.questions[locale].map((q,i)=><div key={i} className="p-8 border border-[#C4D6C7] bg-[#EDF3ED]"><span className="text-[#30654A] font-black font-mono">0{i+1}</span><CheckCircle2 size={28} className="text-[#315B43] mt-6"/><h3 className="mt-5 font-black leading-8">{q}</h3></div>)}</div></div></section>
 <section className="bg-[#F0B044] px-5 sm:px-8 py-16"><div className="max-w-7xl mx-auto flex flex-wrap items-center gap-7 justify-between"><div className="max-w-3xl"><h2 className="arena-display text-3xl font-black">{ar?'جاهز تفضل ساعة مناسبة؟':'READY TO REQUEST A PREFERRED TIME?'}</h2><p className="mt-3 text-sm leading-8">{ar?'الطلب لا يمثل حجزًا ولا سعرًا نهائيًا؛ المشغّل الفعلي يؤكد التوافر.':'The actual venue would still need to confirm capacity, price and availability.'}</p></div><Link href={arenaPath(locale,'book')+'?court='+c.slug} className="bg-[#102B26] px-8 py-5 text-white font-black text-sm flex items-center gap-3">{ar?'سجل التفضيل':'PLAN A REQUEST'}<ArrowUpRight size={18}/></Link></div></section>
 </div>;
}
