'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { formaPath } from '@/lib/verticals/interiors-kitchens/data';
import { ArrowUpRight } from 'lucide-react';

const options=[
 {slug:'l-shaped',ar:'حرف L',en:'L-shaped',arNote:'استغلال الزاوية وترك مساحة حركة مفتوحة.',enNote:'Two cabinet runs meet at a corner, leaving open circulation.',shape:'M40 40H250V75H75V185H40Z'},
 {slug:'u-shaped',ar:'حرف U',en:'U-shaped',arNote:'ثلاثة جوانب للتخزين والعمل مع مراجعة عرض الممر.',enNote:'Three working runs, subject to adequate clearance.',shape:'M40 40H280V185H245V75H75V185H40Z'},
 {slug:'galley',ar:'متوازٍ',en:'Galley',arNote:'صفان متوازيان للمساحات الطولية.',enNote:'Parallel working runs for long, narrow spaces.',shape:'M40 40H75V185H40ZM245 40H280V185H245Z'},
 {slug:'island',ar:'جزيرة',en:'Island',arNote:'سطح إضافي في المنتصف عندما تسمح مساحة الحركة.',enNote:'An additional central worktop where circulation permits.',shape:'M40 40H280V75H75V185H40ZM120 115H220V160H120Z'}
] as const;
export function LayoutStudio({locale}:{locale:Locale}){
 const ar=locale==='ar';const [selected,setSelected]=useState(0);const item=options[selected];
 return <div className="grid lg:grid-cols-[.48fr_1.05fr_.65fr] border border-[#B8AB9B] bg-[#FFFCF7]">
  <div className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-e border-[#B8AB9B]">
   <p className="text-xs font-bold text-[#544D44] mb-3">{ar?'اختر التخطيط':'Choose a layout'}</p>
   <div role="group" aria-label={ar?'خيارات التخطيط':'Layout choices'} className="grid grid-cols-2 lg:grid-cols-1 gap-2">{options.map((o,i)=><button type="button" key={o.slug} aria-pressed={selected===i} onClick={()=>setSelected(i)} className={'min-h-12 text-start px-4 py-3 text-sm font-bold border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#843F2B] '+(selected===i?'bg-[#292722] text-[#F5F0E8] border-[#292722]':'bg-[#FFFCF7] text-[#292722] border-[#B8AB9B] hover:bg-[#E6D9C8]')}>{ar?o.ar:o.en}</button>)}</div>
  </div>
  <div className="p-4 sm:p-8 bg-[#E6D9C8] flex flex-col justify-center min-w-0"><svg viewBox="0 0 320 220" className="w-full max-h-[320px]" role="img" aria-label={ar?'رسم استرشادي '+item.ar:item.en+' illustrative plan'}><rect x="25" y="25" width="270" height="175" rx="2" fill="#F5F0E8" stroke="#292722" strokeWidth="2"/><path d={item.shape} fill="#9A4B32" stroke="#773623" strokeWidth="1.5"/><path d="M25 208H295M25 204V212M295 204V212" stroke="#292722" strokeWidth="1"/><path d="M160 90V105" stroke="#544D44" strokeDasharray="3 3"/></svg><p className="mt-3 text-xs text-[#544D44] text-center">{ar?'رسم استرشادي غير مقياس':'Illustrative schematic — not to scale'}</p></div>
  <div className="p-6 sm:p-8 border-t lg:border-t-0 lg:border-s border-[#B8AB9B] flex flex-col justify-center" aria-live="polite"><h3 className="forma-display text-3xl font-semibold">{ar?item.ar:item.en}</h3><p className="mt-4 text-sm leading-8 text-[#544D44]">{ar?item.arNote:item.enNote}</p><Link href={formaPath(locale,'consultation')+'?service='+item.slug} className="mt-6 inline-flex gap-3 min-h-12 items-center justify-center bg-[#9A4B32] text-white px-4 py-3 font-bold text-sm">{ar?'اختر هذا التخطيط':'Choose this layout'}<ArrowUpRight size={18}/></Link><Link href={formaPath(locale,'services/'+item.slug)} className="mt-4 underline underline-offset-4 text-sm font-bold">{ar?'التفاصيل':'View details'}</Link></div>
 </div>;
}
