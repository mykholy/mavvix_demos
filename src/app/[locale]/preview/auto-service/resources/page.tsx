import Link from 'next/link';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { AUTO_SERVICE, autoPath, localized } from '@/lib/verticals/auto-service/data';
import type { Locale } from '@/lib/i18n/config';

export default function AutoResources({params:{locale}}:{params:{locale:Locale}}){
 const ar=locale==='ar';
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
  <p className="text-[#D5552C] text-xs tracking-widest font-extrabold">TORQUE / FIELD NOTES</p>
  <h1 className="mt-5 text-4xl sm:text-6xl font-black">{ar?'دليل السائق الذكي':'The thoughtful driver’s handbook'}</h1>
  <p className="text-stone-600 text-base leading-9 mt-6 max-w-3xl">{ar?'مقالات توضح طريقة التحضير لفحص السيارة ومعنى بعض التحذيرات وأهمية السجل؛ معلومات عامة لا تعوض دليل الشركة المصنعة أو التشخيص المهني.':'Clear reading about maintenance notes, dashboard warnings and preparing for service. General educational guidance, not an owner manual or a vehicle-specific diagnosis.'}</p>
  <div className="mt-12 grid lg:grid-cols-3 gap-5">{AUTO_SERVICE.articles.map((a,i)=><Link href={autoPath(locale,'resources/'+a.slug)} key={a.slug} className="bg-white rounded-3xl border border-stone-200 p-8 hover:shadow-xl transition-shadow flex flex-col min-h-[340px]"><BookOpen size={32} className="text-[#D5552C]"/><small className="text-xs font-mono text-stone-500 mt-8">GUIDE / 0{i+1}</small><h2 className="text-2xl font-black mt-3 leading-8">{localized(a.title,locale)}</h2><p className="mt-4 text-sm leading-8 text-stone-600">{localized(a.summary,locale)}</p><span className="flex gap-2 items-center mt-auto pt-6 font-bold text-[#D5552C] text-sm">{ar?'اقرأ التفاصيل':'Read more'}<ArrowUpRight size={17}/></span></Link>)}</div>
  <section className="mt-16 bg-[#1C222A] text-white p-8 sm:p-12 rounded-3xl"><h2 className="text-2xl font-black">{ar?'محتاج تتأكد من اللي هتطلبه؟':'Build a clear inspection brief'}</h2><p className="mt-3 leading-8 text-white/70">{ar?'ابدأ بتسجيل الملاحظات وليس افتراض القطعة التالفة، وبعدها أرسل طلب فحص ضمن تجربة الموقع.':'Describe the symptom rather than guessing the defective part, then explore the structured enquiry flow.'}</p><Link href={autoPath(locale,'booking')} className="inline-flex mt-6 bg-[#FB6935] text-black font-black rounded-lg px-6 py-3 text-sm">{ar?'افتح نموذج الطلب':'Open the request form'}</Link></section>
 </div>;
}
