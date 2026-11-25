import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { MOTION,motionPath,motionText } from '@/lib/verticals/physiotherapy/data';
import { ArrowUpRight,BookOpen,ShieldCheck } from 'lucide-react';
export default async function MotionJournal(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28"><p className="text-[#287459] text-xs tracking-widest font-bold">MOTION LAB / FIELD JOURNAL</p><h1 className="motion-display text-4xl sm:text-6xl font-black mt-5">{ar?'فهم التقييم والحركة قبل التواصل':'A better conversation about movement starts here'}</h1><p className="leading-9 text-[#46695C] max-w-3xl mt-6">{ar?'محتوى توضيحي عن الزيارة الأولى وفكرة الأهداف الوظيفية والمتابعة من غير نصائح أو تمارين شخصية.':'Clear, educational content about first visits, functional goals and follow-up administration, not personalized rehabilitation advice.'}</p>
  <div className="grid lg:grid-cols-3 gap-5 mt-12">{MOTION.articles.map((a,i)=><Link key={a.slug} href={motionPath(locale,'journal/'+a.slug)} className="bg-white border border-[#C8DCCF] rounded-3xl p-8 min-h-[340px] flex flex-col hover:bg-[#E5F1E9]"><BookOpen size={34} className="text-[#287459]"/><small className="text-[#287459] font-mono mt-9">MOVEMENT NOTE / 0{i+1}</small><h2 className="font-extrabold text-2xl mt-5 leading-9">{motionText(a.title,locale)}</h2><p className="text-[#46695C] text-sm leading-8 mt-5">{motionText(a.summary,locale)}</p><span className="mt-auto pt-6 flex gap-2 items-center font-bold text-sm">{ar?'اقرأ التفاصيل':'Read article'}<ArrowUpRight size={16}/></span></Link>)}</div>
  <section className="mt-14 bg-[#23443F] p-8 sm:p-12 rounded-3xl text-white"><ShieldCheck size={31} className="text-[#B4E9C7]"/><h2 className="motion-display text-3xl sm:text-4xl font-black mt-6">{ar?'المحتوى العام لا يحدد حالتك':'General content cannot decide personal care'}</h2><p className="text-[#D6EDE0] leading-9 text-sm mt-5">{ar?'لا تستخدم الموقع لتشخيص نفسك أو تحديد عدد الجلسات. المشغل الطبي الحقيقي فقط يمكنه مراجعة الحالة وملاءمة الخطة.':'Use a licensed professional for assessment; an online portfolio page cannot choose exercises, session counts or a treatment plan.'}</p><Link href={motionPath(locale,'appointment')} className="mt-7 inline-flex gap-2 items-center border-b border-[#B4E9C7] text-[#B4E9C7] text-sm font-bold">{ar?'نموذج استفسار توضيحي':'Example initial enquiry'}<ArrowUpRight size={16}/></Link></section>
  </div>;
}
