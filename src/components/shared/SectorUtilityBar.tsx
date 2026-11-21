'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { MAVVIX_CONTACT, SECTOR_LABELS, type SectorName } from '@/lib/business/mavvix-contact';

const COLORS: Record<SectorName, {bg:string;fg:string;accent:string}> = {
 construction:{bg:'#162327',fg:'#F2EFE9',accent:'#DFA17F'},
 industrial:{bg:'#12243C',fg:'#F0F4FA',accent:'#E3B46B'},
 'real-estate':{bg:'#25312D',fg:'#FAF8F3',accent:'#D2AC86'},
 dental:{bg:'#193A39',fg:'#EDF5F2',accent:'#8DDBBB'},
 ecommerce:{bg:'#1A1715',fg:'#F8F1E9',accent:'#E8BBA5'},
 portfolio:{bg:'#0F0F10',fg:'#E5E3DD',accent:'#CCFF00'},
 restaurant:{bg:'#321F18',fg:'#FAF3E6',accent:'#E6A17B'},
 academy:{bg:'#192A48',fg:'#F5F7FF',accent:'#FFAB9D'}
};
export function SectorUtilityBar({sector,locale}:{sector:SectorName;locale:'ar'|'en'}) {
 const path=usePathname();
 const next=locale==='ar'?'en':'ar';
 const switched=(path||`/${locale}/preview/${sector}`).replace(new RegExp(`^/${locale}(?=/|$)`),`/${next}`);
 const t=COLORS[sector],ar=locale==='ar';
 return <div className="border-b text-[11px] sm:text-xs" style={{backgroundColor:t.bg,color:t.fg,borderColor:'rgba(255,255,255,.15)'}}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
   <span className="inline-flex items-center gap-2 font-medium">
    <span aria-hidden="true" className="rounded-full h-1.5 w-1.5" style={{backgroundColor:t.accent}}/>
    {ar?`صُمم بعناية لقطاع ${SECTOR_LABELS[sector].ar.replace('موقع ','')}`:`Thoughtfully crafted for ${SECTOR_LABELS[sector].en}`}
   </span>
   <div className="flex items-center gap-4">
    <a href={ar?MAVVIX_CONTACT.contactAr:MAVVIX_CONTACT.contactEn} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold hover:underline" style={{color:t.accent}}>
     {ar?'اطلب تنفيذ موقع لنشاطك':'Build a website for your business'}<ArrowUpRight size={13}/>
    </a>
    <Link href={switched} hrefLang={next} className="inline-flex items-center gap-1 font-semibold hover:underline" aria-label={ar?'Switch to English':'التبديل للعربية'}>
     <Globe2 size={14}/>{ar?'English':'العربية'}
    </Link>
   </div>
  </div>
 </div>;
}
