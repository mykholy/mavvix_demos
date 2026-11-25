import Link from 'next/link';
import { BookOpen, ArrowUpRight, Lightbulb } from 'lucide-react';
import { HOME_CARE,careLocale,maintenancePath } from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';
export default async function HomeResources(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><p className="text-[#D39421] font-black text-xs tracking-widest">FIXORA · HOME JOURNAL</p><h1 className="mt-4 text-4xl sm:text-6xl font-black">{ar?'معلومات تخليك تطلب الصيانة بذكاء':'A practical guide to caring for your home'}</h1><p className="text-[#5B7E99] text-lg leading-9 mt-6 max-w-3xl">{ar?'الهدف من الأدلة إنك توصف المشكلة وتفهم مواصفات العمل، مش إنك تصلّح الكهرباء والغاز بنفسك.':'Our guides clarify the right questions and safer decisions. They are not instructions for unqualified electrical, gas or structural repair.'}</p><div className="grid lg:grid-cols-3 gap-5 mt-12">{HOME_CARE.articles.map((a,i)=><Link key={a.slug} href={maintenancePath(locale,'resources/'+a.slug)} className="rounded-[2rem] border border-[#DCEAF2] bg-white p-8 flex flex-col min-h-80 hover:shadow-lg"><BookOpen size={32} className="text-[#D39421]"/><small className="text-[#89A3B4] font-mono text-xs mt-8">CARE NOTE / 0{i+1}</small><h2 className="text-xl font-black leading-8 mt-3">{careLocale(a.title,locale)}</h2><p className="text-sm text-[#5B7E99] leading-8 mt-4">{careLocale(a.summary,locale)}</p><span className="mt-auto pt-6 text-[#174E78] font-black text-sm inline-flex gap-2">{ar?'اقرأ المقال':'Read article'}<ArrowUpRight size={16}/></span></Link>)}</div><section className="mt-16 bg-[#E6F4FD] rounded-3xl p-8 sm:p-11"><Lightbulb size={31} className="text-[#D39421]"/><h2 className="text-2xl font-black mt-5">{ar?'المعلومة مفيدة. والفحص له مختص.':'Guidance is valuable; safe repair takes expertise.'}</h2><p className="text-sm leading-8 text-[#5B7E99] mt-4">{ar?'عند وجود خطر في الكهرباء أو الغاز لا تنتظر رد فورم؛ تحرّك وفق تعليمات السلامة المحلية واستعن بالطوارئ عند الحاجة.':'If electrical or gas risks are suspected, do not wait on a website form; use appropriate local safety and emergency services.'}</p><Link href={maintenancePath(locale,'book')} className="bg-[#174E78] text-white inline-flex rounded-xl px-6 py-3 font-black text-sm mt-7">{ar?'تجربة طلب الخدمة':'Try service request'}</Link></section></div>;
}
