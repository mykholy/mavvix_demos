import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath } from '@/lib/verticals/veterinary/data';
import { PawPrint,Dog,Cat,Rabbit,Bird,ArrowUpRight,CheckCircle2,Heart } from 'lucide-react';
export default async function PawPets(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{species?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',requestedSpecies=searchParams.species??'',species=PAWWELL.species.some(x=>x.id===requestedSpecies)?requestedSpecies:'dog';
 const relevant=PAWWELL.services.filter(s=>s.species.includes(species));const selected=PAWWELL.species.find(x=>x.id===species);
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <p className="text-[#915736] font-extrabold text-xs tracking-widest">PET FAMILIES / PERSONAL CARE</p><h1 className="paw-display text-4xl sm:text-6xl font-black mt-5">{ar?'رحلة مناسبة لكل صديق':'Know your companion before choosing care'}</h1>
  <p className="max-w-3xl mt-6 text-[#486559] leading-9">{ar?'اختر نوع الحيوان وشاهد فئات الرعاية التي يمكن سؤال طبيب حقيقي عنها. لا يعني عرض الخدمة توفر متخصص لجميع الحيوانات في عيادة PawWell غير الموجودة.':'Select the species to browse relevant care topics, but note that PawWell is not a real operating clinic with specialty staff or verified capacity.'}</p>
  <nav aria-label={ar?'اختيار نوع الحيوان':'Pet species filter'} className="flex flex-wrap gap-2 mt-10">{PAWWELL.species.map((p,i)=><Link href={pawPath(locale,'pets')+'?species='+p.id} key={p.id} aria-current={species===p.id?'page':undefined} className={'rounded-full px-6 py-3 border font-black text-sm '+(p.id===species?'bg-[#24463D] text-white border-[#24463D]':'border-[#B9D0BC] bg-white')}>{p[locale]}</Link>)}</nav>
  <section className="mt-12 p-8 sm:p-12 bg-[#E6EEE0] rounded-[2rem] grid lg:grid-cols-[.8fr_1fr] gap-9"><div><PawPrint size={33} className="text-[#A76A46]"/><h2 className="paw-display font-black text-3xl sm:text-4xl mt-5">{selected?.[locale]}</h2><p className="text-[#486559] leading-9 text-sm mt-5">{ar?'دي مجموعة مقالات عن الرعاية العامة المناسبة للنقاش مع الطبيب، وليست خطة وقائية موحدة أو نظام علاج.':'These are general topics for discussion with a professional, not a one-size-fits-all care plan.'}</p></div><div className="grid sm:grid-cols-2 gap-3">{relevant.map(s=><Link href={pawPath(locale,'services/'+s.slug)} key={s.slug} className="bg-white rounded-xl p-5 border border-[#C8DCC9] flex gap-3 items-center justify-between"><span className="font-bold text-sm">{s.title[locale]}</span><ArrowUpRight size={17}/></Link>)}</div></section>
  <section className="mt-16 grid md:grid-cols-3 gap-4">{[[ar?'السجل والتاريخ':'Care history',ar?'سجل التطعيمات والزيارات يفيد الطبيب الفعلي.':'Bring visit records to an actual veterinarian.'],[ar?'الأكل والحركة':'Habits and activity',ar?'ملاحظة تغير النشاط أو الأكل جزء من التحضير.':'Observe general feeding and activity changes.'],[ar?'موعد آمن':'Safe transport and visit',ar?'تأكد من مكان وموعد حقيقي قبل التحرك.':'Verify the actual location and appointment before traveling.']].map(([title,body],i)=><div key={i} className="p-8 bg-white rounded-[1.5rem] border border-[#D9E6D7]"><CheckCircle2 className="text-[#A76A46]" size={26}/><h3 className="text-xl font-black mt-7">{title}</h3><p className="text-sm text-[#486559] leading-8 mt-4">{body}</p></div>)}</section>
  <Link href={pawPath(locale,'request')} className="inline-flex items-center gap-2 mt-12 rounded-full bg-[#24463D] text-white px-8 py-4 font-black text-sm">{ar?'جرّب استفسار زيارة':'Prepare an enquiry'}<ArrowUpRight size={17}/></Link>
 </div>;
}
