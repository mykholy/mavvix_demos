import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath } from '@/lib/verticals/veterinary/data';
import { PawPrint,ArrowUpRight,CheckCircle2,Stethoscope } from 'lucide-react';
export default function PawServices({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{species?:string}}){
 const ar=locale==='ar';const requestedSpecies=searchParams.species??'';const species=PAWWELL.species.some(p=>p.id===requestedSpecies)?requestedSpecies:'all';
 const list=PAWWELL.services.filter(s=>species==='all'||s.species.includes(species));
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
  <div className="grid lg:grid-cols-[1fr_.75fr] gap-10 items-end">
   <div><p className="text-[#915736] font-black text-xs tracking-widest">PAWWELL / CARE LIBRARY</p><h1 className="paw-display font-black text-4xl sm:text-6xl leading-tight mt-5">{ar?'لكل حيوان ملف رعاية مختلف':'Clear care choices for different companions'}</h1></div>
   <p className="text-[#486559] leading-9 text-base">{ar?'الخدمات التالية للمعلومات والتوجيه قبل زيارة مركز بيطري حقيقي. لا توجد أسعار أو مواعيد أو علاج عن بعد باسم PawWell.':'These dossiers explain useful appointment topics. Actual clinic staff, prices, emergency support and clinical decisions require a verified service provider.'}</p>
  </div>
  <nav className="flex flex-wrap gap-2 my-12" aria-label={ar?'التصفية حسب نوع الحيوان':'Filter service by pet species'}>
   <Link href={pawPath(locale,'services')} className={'rounded-full border px-5 py-3 text-sm font-bold '+(species==='all'?'bg-[#24463D] text-white':'bg-white border-[#BBD2C0]')}>{ar?'كل الحيوانات':'All pets'}</Link>
   {PAWWELL.species.map(p=><Link key={p.id} href={pawPath(locale,'services')+'?species='+p.id} aria-current={species===p.id?'page':undefined} className={'rounded-full border px-5 py-3 text-sm font-bold '+(species===p.id?'bg-[#24463D] text-white':'bg-white border-[#BBD2C0]')}>{p[locale]}</Link>)}
  </nav>
  <div className="grid md:grid-cols-2 gap-5">{list.map(s=><article key={s.slug} className="bg-white border border-[#D9E6D8] rounded-[1.8rem] p-7 sm:p-10 flex flex-col min-h-[350px] hover:shadow-xl transition-shadow">
   <div className="flex gap-3 justify-between items-center"><span className="text-xs font-mono font-bold text-[#915736]">CARE DOSSIER / {String(s.rank).padStart(2,'0')}</span><PawPrint size={20}/></div>
   <h2 className="text-2xl font-black mt-8">{s.title[locale]}</h2>
   <p className="mt-4 text-sm text-[#49665A] leading-8">{s.body[locale]}</p>
   <div className="flex flex-wrap gap-2 mt-6">{s.species.map(id=>{const p=PAWWELL.species.find(v=>v.id===id);return <span key={id} className="rounded-full px-3 py-1 bg-[#EAF2E7] text-xs text-[#466456]">{p?.[locale]||id}</span>})}</div>
   <div className="mt-auto pt-8 flex flex-wrap gap-3"><Link href={pawPath(locale,'services/'+s.slug)} className="inline-flex gap-2 bg-[#24463D] text-white px-5 py-3 rounded-full text-xs font-bold items-center">{ar?'دليل الخدمة':'Service dossier'}<ArrowUpRight size={17}/></Link><Link href={pawPath(locale,'request')+'?service='+s.slug} className="inline-flex items-center border border-[#A9BEA9] rounded-full px-5 py-3 text-xs font-bold">{ar?'جهز طلب زيارة':'Visit enquiry'}</Link></div>
  </article>)}</div>
  <section className="bg-[#F3E0CC] rounded-[2rem] mt-16 p-8 sm:p-12"><h2 className="text-2xl sm:text-3xl font-black">{ar?'الزيارة الناجحة تبدأ بالتحضير الآمن':'Plan for the real veterinarian'}</h2><p className="mt-4 max-w-4xl text-[#604331] text-sm leading-8">{ar?'احتفظ بسجل الرعاية والزيارات السابقة وأحضره للطبيب الحقيقي، ولا تعتمد على صفحة عامة لتحديد الأدوية أو الجرعات.':'Bring actual vaccination and care records to the treating veterinarian. A public website should not recommend medicines, dosages or remote diagnoses.'}</p><Link href={pawPath(locale,'process')} className="inline-flex gap-2 items-center font-black text-sm mt-7">{ar?'مراحل الزيارة':'Visit preparation'}<ArrowUpRight size={17}/></Link></section>
 </div>;
}
