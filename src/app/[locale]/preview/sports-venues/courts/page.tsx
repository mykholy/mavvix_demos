import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,arenaPath,arenaText } from '@/lib/verticals/sports-venues/data';
import { Goal,ArrowUpRight,Clock3,Users,Flag,Trophy } from 'lucide-react';

const modes=['all','football','padel'] as const;
export default function ArenaCourts({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{sport?:string}}){
 const ar=locale==='ar';const mode=modes.includes(searchParams.sport as typeof modes[number])?searchParams.sport:'all';
 const items=ARENA.services.filter(c=>mode==='all'||c.sport===mode);
 return <div><section className="bg-[#102B26] text-white py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_.55fr] gap-10 items-end">
  <div><p className="tracking-widest text-[#F0B044] font-black text-xs">ARENA / COURT FORMAT INDEX</p><h1 className="arena-display font-black text-4xl sm:text-7xl leading-tight mt-6">{ar?'دليل ملاعب كرة وبادل واضح من البداية':'THE COURT FORMAT DIRECTORY'}</h1></div>
  <p className="text-[#D6E7D8] text-sm leading-9">{ar?'هذه صيغ رياضية معروفة وملاحظات تنظيم، وليست مخزون ملاعب أو إثباتًا أن منشأة تمتلك كل هذه الأماكن.':'Court format dossiers, not real venue inventory. An actual owner must verify pitch size, surfaces, locations, rates and schedules.'}</p>
 </div></section>
 <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
  <nav className="flex flex-wrap gap-2 mb-10" aria-label={ar?'تصفية اللعبة':'Sport filter'}>{modes.map(s=><Link key={s} href={arenaPath(locale,'courts')+(s==='all'?'':'?sport='+s)} className={'px-6 py-3 border-2 text-sm font-black '+(mode===s?'bg-[#102B26] text-white border-[#102B26]':'bg-white text-[#102B26] border-[#C6D8C8]')}>{s==='all'?(ar?'كل الصيغ':'All court formats'):s==='football'?(ar?'كرة قدم':'Football'):(ar?'بادل':'Padel')}</Link>)}</nav>
  <div className="grid lg:grid-cols-2 gap-5">{items.map((s,i)=><article key={s.slug} className="p-7 sm:p-10 bg-white border-2 border-[#CAD9C8] flex flex-col min-h-[380px] hover:shadow-xl transition-shadow">
   <div className="flex items-center gap-4 justify-between"><span className="font-mono text-sm text-[#315E45]">ARENA FORMAT / {String(s.rank).padStart(2,'0')}</span>{s.sport==='football'?<Goal size={26}/>:<Trophy size={26}/>}</div>
   <h2 className="arena-display text-3xl sm:text-4xl font-black mt-9">{arenaText(s.title,locale)}</h2>
   <p className="leading-8 text-[#365A44] text-sm mt-6">{arenaText(s.body,locale)}</p>
   <div className="mt-auto pt-8 flex flex-wrap gap-6 text-sm font-black"><span className="inline-flex gap-2 items-center"><Users size={18}/>{s.players} {ar?'لاعب':'players'}</span><span className="inline-flex gap-2 items-center"><Clock3 size={18}/>{s.durations.join(' / ')} {ar?'دقيقة':'minutes'}</span></div>
   <div className="mt-7 border-t border-[#C8D8CA] pt-6 flex flex-wrap gap-4"><Link href={arenaPath(locale,'courts/'+s.slug)} className="px-6 py-3 bg-[#102B26] text-white font-black text-sm flex gap-2 items-center">{ar?'تفاصيل الصيغة':'View format'}<ArrowUpRight size={17}/></Link><Link href={arenaPath(locale,'book')+'?court='+s.slug} className="px-6 py-3 border border-[#315D44] text-[#102B26] text-sm font-black">{ar?'جهز الطلب':'Plan a request'}</Link></div>
  </article>)}</div>
  <section className="bg-[#F0B044] p-8 sm:p-12 mt-14 grid lg:grid-cols-2 gap-8"><div><h2 className="arena-display text-3xl font-black">{ar?'هل كل صيغ اللعب متاحة فعلًا؟':'ARE ALL FORMATS AVAILABLE AT ONE VENUE?'}</h2><p className="mt-5 text-sm text-[#3D3B20] leading-8">{ar?'لا، لازم تتأكد من مالك الملعب الحقيقي. دي تجربة لعرض الفكرة وسلوك البحث.':'No. An actual venue must confirm which formats it offers; this site only illustrates a complete discovery and enquiry flow.'}</p></div><div className="grid grid-cols-2 gap-3">{[[ar?'العدد':'Players','10 / 14 / 4'],[ar?'الوقت':'Time','60 / 90 / 120'],[ar?'الأرضية':'Surface',ar?'اعتماد المشغّل':'Owner verified'],[ar?'الحالة':'Status',ar?'طلب فقط':'Enquiry']].map(([a,b,c],i)=><div key={i} className="bg-[#F9DCA2] p-5 text-sm"><span className="block text-xs">{a} · {b}</span><strong className="block mt-3">{c}</strong></div>)}</div></section>
 </div></div>;
}
