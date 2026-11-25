import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE,oakPath,oakText } from '@/lib/verticals/furniture/data';
import { Armchair,Ruler,ArrowUpRight,Layers } from 'lucide-react';
const rooms=[{id:'all',ar:'كل الغرف',en:'All rooms'},{id:'living',ar:'المعيشة',en:'Living'},{id:'bedroom',ar:'النوم',en:'Bedroom'},{id:'dining',ar:'السفرة',en:'Dining'},{id:'workspace',ar:'العمل',en:'Workspace'}];
export default async function OaklineCollections(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{room?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const room=rooms.some(r=>r.id===searchParams.room)?searchParams.room:'all';
 const items=OAKLINE.services.filter(p=>room==='all'||p.room===room);
 return <div><section className="bg-[#E7DCCC] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.95fr_.6fr] gap-10 items-end"><div><p className="text-[#775638] text-xs tracking-widest font-bold">OAKLINE / DESIGN DOSSIERS</p><h1 className="oakline-display text-4xl sm:text-7xl leading-tight mt-6">{ar?'قطع بخصوصية كل غرفة':'FURNITURE PIECES WITH REAL PURPOSE'}</h1></div><p className="text-base leading-9 text-[#634D37]">{ar?'كتالوج توضيحي بعشر قطع، لكل واحدة قياسات ومواد مسموحة ضمن نموذج التسعير وليس منتجات للبيع الآن.':'Ten authored furnishing ideas with a different brief, allowable material choices and illustrative dimension ranges. No live sale or production claim.'}</p></div></section>
 <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"><nav aria-label={ar?'تصفية حسب الغرفة':'Filter by room'} className="flex flex-wrap gap-2 mb-12">{rooms.map(r=><Link href={oakPath(locale,'collections')+(r.id==='all'?'':'?room='+r.id)} key={r.id} aria-current={room===r.id?'page':undefined} className={'px-6 py-3 text-sm font-black rounded-full border '+(room===r.id?'bg-[#392C24] border-[#392C24] text-white':'bg-white border-[#CCBAA6] text-[#513D2A]')}>{ar?r.ar:r.en}</Link>)}</nav>
  <div className="grid lg:grid-cols-2 gap-5">{items.map(p=><article key={p.slug} className="bg-[#FFFCF6] p-8 sm:p-10 border border-[#D6C4B1] flex flex-col min-h-[380px]"><div className="flex justify-between gap-4"><Armchair size={33} className="text-[#8C6844]"/><span className="font-mono text-[#785C41] text-xs">OAKLINE / {String(p.rank).padStart(2,'0')}</span></div>
   <h2 className="oakline-display text-3xl sm:text-4xl mt-9">{oakText(p.title,locale)}</h2><p className="text-sm leading-8 mt-6 text-[#67513D]">{oakText(p.body,locale)}</p>
   <div className="mt-auto pt-8 flex flex-wrap gap-3 text-xs text-[#634B34]"><span className="border border-[#CABBAD] px-3 py-2">{p.room}</span><span className="border border-[#CABBAD] px-3 py-2">{p.materials.join(' / ')}</span></div>
   <div className="border-t border-[#DDCEBC] mt-7 pt-6 flex gap-3 flex-wrap"><Link href={oakPath(locale,'collections/'+p.slug)} className="inline-flex items-center gap-2 bg-[#392C24] text-white px-6 py-4 text-sm font-bold">{ar?'تفاصيل القطعة':'PIECE DOSSIER'}<ArrowUpRight size={17}/></Link><Link href={oakPath(locale,'quote')+'?product='+p.slug} className="border border-[#392C24] px-6 py-4 text-sm font-bold">{ar?'أضف لطلب التسعير':'PREPARE A QUOTE'}</Link></div>
  </article>)}</div>
 </div></div>;
}
