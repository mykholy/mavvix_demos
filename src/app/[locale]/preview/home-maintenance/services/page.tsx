import Link from 'next/link';
import { ArrowUpRight, Wind, Droplets, Zap, Hammer, ShieldCheck } from 'lucide-react';
import { HOME_CARE,careLocale,maintenancePath } from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';

const groups=['all','ac','plumbing','electrical','appliances','carpentry'] as const;
const names:Record<typeof groups[number],{ar:string;en:string}>={
 all:{ar:'كل الخدمات',en:'All services'},ac:{ar:'تكييف',en:'Air conditioning'},plumbing:{ar:'سباكة',en:'Plumbing'},
 electrical:{ar:'كهرباء',en:'Electrical'},appliances:{ar:'أجهزة وسخانات',en:'Appliances'},carpentry:{ar:'نجارة وأبواب',en:'Carpentry'}
};
export default async function HomeServices(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{category?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const chosen=groups.includes(searchParams.category as typeof groups[number])?searchParams.category:'all';
 const list=HOME_CARE.services.filter(s=>chosen==='all'||s.category===chosen);
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
  <div className="max-w-4xl"><p className="text-xs tracking-[.15em] font-black text-[#D39421]">THE FIXORA SERVICE DIRECTORY</p><h1 className="text-4xl sm:text-6xl font-black leading-[1.1] mt-5">{ar?'خدمة مناسبة للمشكلة. مش وعود عامة.':'Find the right type of home service'}</h1><p className="mt-6 text-[#5B7E99] text-base leading-9">{ar?'صنفنا الخدمات حسب تخصص الفني، وإيه محتاج معرفة قبل المعاينة، والاحتياطات اللي لازم تسبق أي تدخل كهربائي أو في الغاز.':'Choose by trade and read what questions matter before diagnosis or approval. Electrical and gas problems need safety-first decisions, not generic online instructions.'}</p></div>
  <nav className="flex flex-wrap gap-2 mt-10 mb-12" aria-label={ar?'تصفية الخدمات':'Service filters'}>{groups.map(g=><Link href={maintenancePath(locale,'services')+(g==='all'?'':'?category='+g)} key={g} className={'rounded-full border px-5 py-3 text-sm font-bold '+(chosen===g?'bg-[#174E78] text-white border-[#174E78]':'bg-white text-[#174E78] border-[#D9E5EE]')}>{names[g][locale]}</Link>)}</nav>
  <div className="grid lg:grid-cols-2 gap-5">{list.map((s,i)=><article key={s.slug} className="p-7 sm:p-10 bg-white border border-[#D9E5EE] rounded-[2rem] flex flex-col min-h-[350px] hover:shadow-xl transition-shadow"><div className="flex justify-between gap-4 items-center"><span className="text-[#D39421] font-mono font-black text-xs">FIXORA / {String(s.rank).padStart(2,'0')}</span><ShieldCheck size={22}/></div><h2 className="text-2xl font-black mt-6">{careLocale(s.title,locale)}</h2><p className="text-[#5B7E99] text-sm leading-8 mt-4">{careLocale(s.body,locale)}</p><div className="mt-auto pt-7 flex flex-wrap gap-3"><Link className="bg-[#174E78] text-white rounded-xl px-5 py-3 font-bold text-sm inline-flex gap-2 items-center" href={maintenancePath(locale,'services/'+s.slug)}>{ar?'دليل الخدمة':'Service guide'}<ArrowUpRight size={16}/></Link><Link href={maintenancePath(locale,'book')+'?service='+s.slug} className="border border-[#174E78] text-[#174E78] rounded-xl px-5 py-3 font-bold text-sm">{ar?'جرّب طلب الخدمة':'Try service request'}</Link></div></article>)}</div>
  <section className="mt-16 p-8 sm:p-12 bg-[#FFF3D9] rounded-[2rem] grid md:grid-cols-2 gap-10"><div><h2 className="font-black text-2xl">{ar?'قبل ما تدخل فني منزلك':'Before an actual technician visits'}</h2><p className="text-[#6F6C5D] text-sm leading-9 mt-4">{ar?'تأكد من هوية مقدم الخدمة وشروط الزيارة والمقابل المالي قبل أي أعمال. لا تشارك صور مفاتيح أو أكواد دخول في نموذج عام.':'Verify the service provider, agree on visit charges and scope, and avoid submitting private home access information into general online forms.'}</p></div><div className="grid grid-cols-2 gap-4">{[ar?'وصف المشكلة':'Symptom brief',ar?'سلامة المنزل':'Safety',ar?'نطاق العمل':'Work scope',ar?'الموافقة على السعر':'Fee approval'].map(x=><div key={x} className="bg-white rounded-xl p-5 text-sm font-black flex items-center gap-3"><ShieldCheck size={18}/>{x}</div>)}</div></section>
 </div>;
}
