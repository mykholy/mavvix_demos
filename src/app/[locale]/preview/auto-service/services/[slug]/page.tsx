import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, ClipboardCheck, Wrench, AlertTriangle } from 'lucide-react';
import { AUTO_SERVICE, findAutoService, autoPath, localized } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';

export function generateStaticParams(){return AUTO_SERVICE.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata {
 const s=findAutoService(slug);if(!s)return {};
 return {title:s.title[locale]+' | Torque Garage · Mavvix',description:s.summary[locale]};
}
export default function AutoServiceDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const s=findAutoService(slug);if(!s)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#161A20] text-white"><div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-20">
  <nav className="text-xs text-white/50 mb-16"><Link href={autoPath(locale)} className="hover:text-white">{ar?'الرئيسية':'Home'}</Link> / <Link href={autoPath(locale,'services')} className="hover:text-white">{ar?'الخدمات':'Services'}</Link> / <span className="text-[#FB6935]">{s.title[locale]}</span></nav>
  <div className="grid lg:grid-cols-[1fr_.6fr] gap-10 items-end"><div><span className="font-mono text-[#FB6935] text-xs font-black tracking-widest">FIELD DOSSIER / {String(s.rank).padStart(2,'0')}</span><h1 className="text-4xl sm:text-6xl font-black leading-tight mt-5">{s.title[locale]}</h1><p className="text-lg text-white/70 leading-9 max-w-3xl mt-7">{s.summary[locale]}</p></div><Link href={autoPath(locale,'booking')+'?service='+s.slug} className="rounded-2xl bg-[#FB6935] text-[#161A20] px-7 py-5 font-black text-sm flex items-center gap-3 w-fit">{ar?'جرّب طلب فحص هذه الخدمة':'Request this inspection'}<ArrowUpRight size={18}/></Link></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.5fr_1fr] gap-10"><div><p className="text-xs font-mono text-[#D5552C] font-black uppercase">WHAT TO KNOW</p><h2 className="text-3xl font-black mt-4">{ar?'إيه اللي لازم تفهمه؟':'What should you understand first?'}</h2></div><div className="text-stone-700 leading-9 text-base sm:text-lg border-s-4 border-[#FB6935] ps-8">{s.body[locale]}</div></section>
 <section className="bg-white py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="text-3xl font-black">{ar?'قائمة مراجعة قبل الموافقة':'A checklist before authorization'}</h2><div className="grid md:grid-cols-3 gap-4 mt-9">{s.whatToCheck[locale].map((item,i)=><div className="p-7 border border-stone-200 rounded-2xl bg-[#F3F0E9]" key={i}><span className="text-[#D5552C] text-xs font-mono">0{i+1}</span><ClipboardCheck size={26} className="mt-6"/><h3 className="mt-3 font-extrabold text-base leading-7">{item}</h3></div>)}</div></div></section>
 <section className="py-16 bg-[#FB6935]"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center"><AlertTriangle size={36}/><div><h2 className="text-2xl font-black">{ar?'الطلب ليس تشخيصًا ولا سعرًا نهائيًا':'A request is not a diagnosis or final quote'}</h2><p className="text-sm mt-3 leading-7">{ar?'اختيار الخدمة يساعد في تنظيم الاستفسار فقط. نتائج الفحص وتوفر الفني وقطع الغيار يؤكدها صاحب المركز بعد التواصل.':'Selection only prepares an enquiry. An actual workshop must confirm inspection findings, staff capacity, parts and terms.'}</p></div><Link href={autoPath(locale,'booking')+'?service='+s.slug} className="rounded-full bg-[#161A20] text-white text-sm font-bold px-7 py-4 flex gap-2 items-center">{ar?'استكمل طلبك':'Continue request'}<ArrowUpRight size={18}/></Link></div></section>
 </div>;
}
