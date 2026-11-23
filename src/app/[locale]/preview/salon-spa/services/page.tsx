import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { VELORA, veloraPath, veloraText } from '@/lib/verticals/salon-spa/data';
import { ArrowUpRight, Clock3, Flower2, CheckCircle2 } from 'lucide-react';
const types=[['all',{ar:'جميع الخدمات',en:'All services'}],['hair',{ar:'الشعر',en:'Hair'}],['nails',{ar:'الأظافر',en:'Nails'}],['rituals',{ar:'العناية والاسترخاء',en:'Wellbeing'}],['occasion',{ar:'المناسبات',en:'Occasions'}],['face',{ar:'الحواجب',en:'Brows'}]] as const;
export default function VeloraServices({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{category?:string}}){
 const ar=locale==='ar';const cat=types.some(t=>t[0]===searchParams.category)?searchParams.category:'all';
 const list=VELORA.services.filter(s=>cat==='all'||s.category===cat);
 return <div><section className="bg-[#F1E6E4] border-b border-[#DCC7CA] py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_.65fr] gap-10 items-end">
  <div><span className="uppercase tracking-[.24em] text-[#855060] text-xs font-bold">THE ART OF SERVICE</span><h1 className="velora-display text-5xl sm:text-7xl leading-tight mt-6">{ar?'قائمة خدمات بمحتوى يستاهل وقتك':'The care menu, explained beautifully'}</h1></div>
  <p className="text-base text-[#704E59] leading-9">{ar?'خدمات للعناية والتصفيف والأظافر، كل واحدة لها هدف وخطوات وملاحظات خاصة. المدد المعروضة للتخطيط فقط وليست مواعيد فعلية.':'Every entry describes a specific beauty craft, what it involves and how to prepare. Durations are illustrative, not real staff calendar availability.'}</p>
 </div></section>
 <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
  <nav aria-label={ar?'تصفية قائمة الخدمات':'Filter beauty menu'} className="flex flex-wrap gap-2 mb-12">{types.map(([slug,copy])=><Link key={slug} href={veloraPath(locale,'services')+(slug==='all'?'':'?category='+slug)} aria-current={cat===slug?'page':undefined} className={'rounded-full text-sm font-bold border px-5 py-3 '+(cat===slug?'bg-[#4B2834] border-[#4B2834] text-white':'bg-white border-[#DBC8CA] hover:bg-[#F5E8E7] text-[#634650]')}>{copy[locale]}</Link>)}</nav>
  <div className="grid lg:grid-cols-2 gap-5">{list.map((s,i)=><article key={s.slug} className="p-8 sm:p-10 border border-[#E2D0D1] bg-white hover:bg-[#FEF5F2] flex flex-col min-h-[360px] transition-colors">
   <div className="flex justify-between gap-3 text-xs font-mono text-[#855060]"><span>VELORA SERVICE / {String(s.rank).padStart(2,'0')}</span><Flower2 size={19}/></div>
   <h2 className="velora-display text-3xl sm:text-4xl mt-9 font-semibold">{veloraText(s.title,locale)}</h2>
   <p className="text-[#704E59] text-sm leading-8 mt-5">{veloraText(s.body,locale)}</p>
   <div className="mt-auto pt-7 flex flex-wrap items-center gap-3 text-xs text-[#855060]"><Clock3 size={16}/>{s.durations[0]}–{s.durations.at(-1)} {ar?'دقيقة تقريبية':'illustrative minutes'}</div>
   <div className="border-t border-[#E5D5D6] mt-5 pt-6 flex gap-3 flex-wrap"><Link href={veloraPath(locale,'services/'+s.slug)} className="inline-flex items-center gap-2 px-5 py-3 bg-[#4B2834] text-white text-xs font-bold">{ar?'اعرفي التفاصيل':'Full service dossier'}<ArrowUpRight size={15}/></Link><Link href={veloraPath(locale,'booking')+'?service='+s.slug} className="px-5 py-3 border border-[#B6969F] text-xs font-bold">{ar?'اختاري الخدمة':'Select service'}</Link></div>
  </article>)}</div>
  <div className="mt-16 bg-[#F1E6E4] p-8 sm:p-12"><h2 className="velora-display text-3xl sm:text-4xl">{ar?'ليه تفاصيل الخدمة أهم من اسمها؟':'A meaningful menu protects expectations'}</h2><p className="leading-9 text-[#704E59] text-sm mt-6 max-w-4xl">{ar?'المنتجات وطريقة التنفيذ والتوقيت والسعر الحقيقي لازم صاحب الصالون يؤكدهم. المرجع البصري مش ضمان نتيجة؛ تحديد طبيعة الخدمة قبل الإجراء يساعد على الاختيار.':'The real owner must approve products, scope, fees and booking time. A photo is inspiration rather than a guaranteed result; clear service notes prevent costly mismatches.'}</p></div>
 </div></div>;
}
