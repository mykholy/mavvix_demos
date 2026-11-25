import Link from 'next/link';
import { ArrowUpRight, Wrench, ScanSearch, ShieldCheck } from 'lucide-react';
import { AUTO_SERVICE, autoPath, localized } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';

export default async function AutoServices(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{category?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 const groups=[['all',ar?'كل الخدمات':'All services'],['safety',ar?'سلامة وثبات':'Safety'],['preventive',ar?'صيانة دورية':'Preventive'],['diagnostics',ar?'تشخيص':'Diagnostics'],['comfort',ar?'راحة وتكييف':'Comfort'],['electrical',ar?'كهرباء':'Electrical'],['inspection',ar?'فحص':'Inspection']];
 const chosen=groups.some(x=>x[0]===searchParams.category)?searchParams.category:'all';
 const services=AUTO_SERVICE.services.filter(s=>chosen==='all'||s.category===chosen);
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-end border-b-2 border-[#161A20] pb-12">
   <div><p className="text-[#D5552C] font-mono uppercase text-xs font-black tracking-widest">SERVICE INDEX / 08</p>
    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mt-4">{ar?'الخدمة تبدأ بفهم المشكلة':'A service catalogue built around questions'}</h1>
   </div>
   <p className="text-stone-600 leading-8 max-w-xl">{ar?'قائمة خدمات مصاغة للقرار: ماذا يفحص الفني؟ ما المعلومات التي يحتاجها؟ وما الذي يجب أن تسأل عنه قبل الموافقة على الإصلاح؟ ليست قائمة أسعار فورية ولا تشخيصاً عن بُعد.':'Each dossier explains what should be inspected, which observations matter and which scope questions to ask before authorizing work. This is not instant pricing or a remote diagnosis.'}</p>
  </div>
  <nav aria-label={ar?'تصفية الخدمات':'Filter services'} className="flex flex-wrap gap-2 my-10">{groups.map(([slug,title])=><Link href={autoPath(locale,'services')+(slug==='all'?'':'?category='+slug)} key={slug} aria-current={chosen===slug?'page':undefined} className={'rounded-full border px-5 py-2.5 text-sm font-bold '+(chosen===slug?'bg-[#161A20] text-white border-[#161A20]':'bg-white text-[#161A20] border-stone-200 hover:border-[#FB6935]')}>{title}</Link>)}</nav>
  <div className="grid md:grid-cols-2 gap-5">{services.map((s,i)=><article key={s.slug} className="bg-white rounded-[1.7rem] p-7 sm:p-9 border border-stone-200 flex flex-col gap-5 hover:shadow-xl transition-shadow"><div className="flex justify-between items-center text-xs font-mono text-[#D5552C]"><span>TORQUE FIELD FILE / {String(s.rank).padStart(2,'0')}</span><Wrench size={20}/></div><h2 className="text-2xl font-black">{localized(s.title,locale)}</h2><p className="text-stone-600 text-sm leading-8">{localized(s.summary,locale)}</p><p className="text-stone-700 text-sm leading-8">{localized(s.body,locale)}</p><div className="mt-auto pt-5 flex flex-wrap gap-3 border-t border-stone-100"><Link href={autoPath(locale,'services/'+s.slug)} className="bg-[#161A20] text-white text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2">{ar?'اقرأ تفاصيل الخدمة':'Read service dossier'}<ArrowUpRight size={17}/></Link><Link href={autoPath(locale,'booking')+'?service='+s.slug} className="border border-[#FB6935] text-[#BD4D27] text-sm font-bold px-5 py-3 rounded-xl">{ar?'جرب نموذج الطلب':'Try the request form'}</Link></div></article>)}</div>
  <section className="mt-16 bg-[#E7E0D3] rounded-[2rem] p-8 sm:p-12 grid md:grid-cols-2 gap-10"><div><ShieldCheck size={32} className="text-[#D5552C]"/><h2 className="text-2xl font-black mt-4">{ar?'السلامة قبل أي تخمين':'Safety before assumptions'}</h2><p className="mt-3 text-sm leading-8 text-stone-700">{ar?'التحذيرات المتعلقة بالزيت والحرارة والفرامل ليست فرصة لتجربة إصلاح منزلي غير آمن. راجع دليل السيارة واستعن بمختص عند الحاجة.':'Oil-pressure, overheating and braking warnings should never be treated as an invitation to attempt unsafe DIY diagnostics. Follow the vehicle manual and seek competent help.'}</p></div><div className="flex flex-col justify-center gap-3"><Link href={autoPath(locale,'diagnostics')} className="bg-white rounded-xl p-5 font-bold flex items-center justify-between">{ar?'دليل لمبات التحذير':'Warning-light decision guide'}<ScanSearch size={20}/></Link><Link href={autoPath(locale,'process')} className="bg-white rounded-xl p-5 font-bold flex items-center justify-between">{ar?'ما الذي يحدث قبل موافقة العميل؟':'What should happen before authorizing repairs?'}<ArrowUpRight size={20}/></Link></div></section>
 </div>;
}
