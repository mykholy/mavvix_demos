import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath } from '@/lib/verticals/veterinary/data';
import { BookOpen, ArrowUpRight, Heart, PawPrint, ShieldCheck } from 'lucide-react';
export default function PawGuides({params:{locale}}:{params:{locale:Locale}}){
 const ar=locale==='ar';
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <p className="text-[#915736] font-black text-xs tracking-widest">THE PAW PARENT LIBRARY</p>
  <h1 className="paw-display text-4xl sm:text-6xl font-black mt-6 max-w-4xl">{ar?'معرفة أبسط... ورعاية أكثر وعيًا':'Care starts with knowing what to ask'}</h1>
  <p className="text-[#486559] mt-7 text-base leading-9 max-w-3xl">{ar?'مقالات عملية تساعد أصحاب الحيوانات الأليفة على الاستعداد لزيارة بيطرية حقيقية، مع تفريق واضح بين المعلومة العامة والتشخيص الذي يحتاج طبيبًا.':'Original pet-owner guidance to help prepare for a real veterinary visit, without pretending to diagnose or recommend treatment through a website.'}</p>
  <div className="grid lg:grid-cols-3 gap-5 mt-12">{PAWWELL.articles.map((article,i)=><Link key={article.slug} href={pawPath(locale,'guides/'+article.slug)} className="bg-white rounded-[1.8rem] border border-[#D9E7D8] p-8 flex flex-col min-h-[330px] hover:shadow-xl">
   <BookOpen size={31} className="text-[#A66945]"/><span className="font-mono text-xs text-[#915736] mt-9">CARE NOTE / 0{i+1}</span><h2 className="text-xl font-black mt-4 leading-8">{article.title[locale]}</h2><p className="text-[#49665A] text-sm leading-8 mt-5">{article.summary[locale]}</p><span className="mt-auto pt-7 inline-flex gap-2 items-center font-black text-sm">{ar?'اقرأ المقال':'Read the guide'}<ArrowUpRight size={17}/></span>
  </Link>)}</div>
  <section className="mt-16 bg-[#E6EFE2] rounded-[2rem] p-8 sm:p-12 grid md:grid-cols-[auto_1fr] gap-6"><ShieldCheck size={37} className="text-[#4E775F]"/><div><h2 className="font-black text-xl">{ar?'معلومات للتثقيف، مش تشخيص أو وصفة':'Education, never online diagnosis'}</h2><p className="mt-4 text-[#486559] text-sm leading-8">{ar?'أي أعراض طارئة تحتاج تواصلًا مباشرًا مع عيادة بيطرية فعلية. نموذج PawWell لا يرسل رسائل لطبيب ولا يحجز طوارئ.':'For urgent problems contact a real veterinary clinic. This editorial site provides no clinical advice or emergency scheduling.'}</p><Link href={pawPath(locale,'emergencies')} className="inline-flex gap-2 items-center text-sm font-black mt-6 underline underline-offset-4">{ar?'راجع تنبيه الحالات الطارئة':'Read emergency guidance'}<ArrowUpRight size={17}/></Link></div></section>
 </div>;
}
