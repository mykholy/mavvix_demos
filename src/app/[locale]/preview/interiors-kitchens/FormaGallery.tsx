'use client';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { formaPhotos } from './media';
import { PhotoCredit } from './VisualLibrary';
export function FormaGallery({locale}:{locale:Locale}){
 const ar=locale==='ar';const [filter,setFilter]=useState<'all'|'kitchens'|'materials'>('all');
 const items=formaPhotos.filter(p=>filter==='all'||p.category===filter);
 return <div><div role="group" aria-label={ar?'تصفية الإلهام':'Filter inspiration'} className="flex flex-wrap gap-2 mb-8">{(['all','kitchens','materials'] as const).map(k=><button key={k} data-gallery-filter={k} aria-pressed={filter===k} type="button" onClick={()=>setFilter(k)} className={'min-h-11 px-5 py-3 font-bold text-sm border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#843F2B] '+(filter===k?'bg-[#292722] text-white border-[#292722]':'bg-[#FFFCF7] text-[#292722] border-[#B8AB9B]')}>{k==='all'?(ar?'الكل':'All'):k==='kitchens'?(ar?'المساحات':'Spaces'):(ar?'الخامات':'Materials')}</button>)}</div><p role="status" className="text-xs text-[#544D44] mb-5">{items.length} {ar?'مراجع بصرية':'visual references'}</p><div className="grid md:grid-cols-2 gap-x-7 gap-y-10">{items.map((p,i)=><figure data-gallery-item={p.id} key={p.id} className={i===0&&filter!=='materials'?'md:col-span-2':''}><a href={p.source} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#843F2B]"><img src={p.url} alt={p[locale]} loading="lazy" className={'w-full object-cover bg-[#D8C9B6] '+(i===0&&filter!=='materials'?'aspect-[16/9]':'aspect-[5/4]')}/></a><figcaption className="mt-4 border-b border-[#B8AB9B] pb-4"><p className="forma-display text-2xl font-semibold">{p[locale]}</p><PhotoCredit photo={p} locale={locale}/></figcaption></figure>)}</div></div>;
}
