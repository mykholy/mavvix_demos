'use client';
import { useState } from 'react';
import { ArrowUpRight, MessageCircle, Phone, X } from 'lucide-react';
import { MAVVIX_CONTACT, SECTOR_LABELS, type SectorName } from '@/lib/business/mavvix-contact';

export function ContactDock({ sector, locale }:{sector:SectorName;locale:'ar'|'en'}) {
 const [expanded,setExpanded]=useState(false);
 const ar=locale==='ar';
 const message=ar
   ? `أهلًا مافكس، محتاج ${SECTOR_LABELS[sector].ar} احترافي لنشاطي، وشفت تجربة الموقع وعايز أعرف المميزات والتكلفة والمدة.`
   : `Hello Mavvix, I need ${SECTOR_LABELS[sector].en} for my business. I'd like to discuss features, pricing and delivery.`;
 const wa=`https://wa.me/${MAVVIX_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
 const contact=ar?MAVVIX_CONTACT.contactAr:MAVVIX_CONTACT.contactEn;
 function track(event:'whatsapp_click'|'phone_click'|'contact_click'){
  try {
   const w=window as Window & {dataLayer?:Array<Record<string,unknown>>;gtag?:(...args:unknown[])=>void};
   w.dataLayer?.push({event,sector,placement:'floating_contact',owner:'Mavvix'});
   w.gtag?.('event',event,{event_category:'lead',sector,placement:'floating_contact'});
  }catch{}
 }
 const common='inline-flex items-center justify-center gap-2 min-h-12 rounded-2xl px-4 py-3 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300';
 return <aside data-mavvix-contact-dock aria-label={ar?'تواصل مع مافكس لتنفيذ موقع مشابه':'Contact Mavvix to build a similar website'}
   className="fixed z-[70] inset-x-0 bottom-0 p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-md md:bottom-7 md:end-7 md:inset-x-auto md:p-0 md:bg-transparent md:backdrop-blur-none">
  <div className="md:hidden flex gap-2 max-w-xl mx-auto">
    <a href={wa} target="_blank" rel="noopener noreferrer" onClick={()=>track('whatsapp_click')}
      className={common+' flex-1 bg-[#11774e] text-white shadow-lg hover:bg-[#08623e]'}>
      <MessageCircle size={21} aria-hidden="true"/>{ar?'عايز موقع زي ده':'Build my website'}
    </a>
    <a href={`tel:${MAVVIX_CONTACT.phoneE164}`} onClick={()=>track('phone_click')}
      aria-label={ar?'اتصل بمافكس':'Call Mavvix'} className={common+' bg-slate-900 text-white shadow-lg aspect-square w-12'}>
      <Phone size={20} aria-hidden="true"/>
    </a>
  </div>
  <div className="hidden md:flex flex-col items-end gap-3">
   {expanded&&<div className="w-72 rounded-3xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200 p-5 space-y-4">
    <div><p className="text-lg font-extrabold">{ar?'تواصل مباشرةً مع مافكس':'Talk directly to Mavvix'}</p>
    <p className="text-sm leading-6 text-slate-600 mt-1">{ar?'هنساعدك تحدد مواصفات ومراحل تنفيذ موقع لنشاطك.':'Discuss the scope, design and rollout of your business website.'}</p></div>
    <a href={wa} target="_blank" rel="noopener noreferrer" onClick={()=>track('whatsapp_click')} className={common+' bg-[#11774e] text-white w-full'}><MessageCircle size={19}/>{ar?'تواصل واتساب':'WhatsApp'}</a>
    <a href={`tel:${MAVVIX_CONTACT.phoneE164}`} onClick={()=>track('phone_click')} className={common+' bg-slate-100 text-slate-900 w-full'}><Phone size={18}/>{MAVVIX_CONTACT.phoneDisplay}</a>
    <a href={contact} target="_blank" rel="noopener noreferrer" onClick={()=>track('contact_click')} className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700">
     {ar?'اطلب عرض سعر مكتوب':'Request a proposal'}<ArrowUpRight size={16}/>
    </a>
   </div>}
   <button type="button" aria-expanded={expanded} aria-controls="mavvix-dock-options" onClick={()=>setExpanded(v=>!v)}
     className={common+' rounded-full min-h-14 px-6 bg-[#1667F5] text-white shadow-xl hover:bg-[#1052BF]'}>
     {expanded?<X size={20}/>:<MessageCircle size={20}/>}
     {expanded?(ar?'إغلاق':'Close'):(ar?'عايز موقع زي ده؟':'Need a site like this?')}
   </button>
  </div>
 </aside>;
}
