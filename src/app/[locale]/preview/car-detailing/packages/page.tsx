import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { GLOSSBAY,glossText,glossPath } from '@/lib/verticals/car-detailing/data';
import { ArrowUpRight,Clock3,ScanSearch,ShieldCheck } from 'lucide-react';
const filters=[['all',{ar:'كل المجالات',en:'All care'}],['wash',{ar:'الغسيل',en:'Washing'}],['interior',{ar:'الداخلية',en:'Interior'}],['correction',{ar:'التصحيح',en:'Correction'}],['protection',{ar:'الحماية',en:'Protection'}],['finish',{ar:'الإنهاء',en:'Finishing'}],['fleet',{ar:'الأساطيل',en:'Fleet'}]] as const;
export default function GlossPackages({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{category?:string}}){
 const ar=locale==='ar';const category=filters.some(f=>f[0]===searchParams.category)?searchParams.category:'all';
 const list=GLOSSBAY.services.filter(s=>category==='all'||s.category===category);
 return <div><section className="bg-[#0D1626] text-white py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <p className="font-mono text-[#7DE2FF] text-xs tracking-widest font-black">GLOSSBAY / SCOPE CATALOGUE</p><h1 className="gloss-display font-black text-4xl sm:text-6xl leading-tight max-w-4xl mt-7">{ar?'اختار نطاق العناية قبل ما تختار السعر':'Choose the right scope, not an empty promise'}</h1>
  <p className="max-w-3xl mt-7 text-[#C4DEE9] text-base leading-9">{ar?'قائمة خدمات حقيقية كنطاق فني معروف، لكنها ليست عروض أسعار مقدمة من ورشة شغالة؛ كل سيارة تحتاج تقييم الخامات والحالة والتجهيز قبل عرض السعر.':'These are real categories of automotive care, illustrated by a fictional brand. Materials, previous treatments and condition require a genuine provider to approve the final service scope and fee.'}</p>
 </div></section>
 <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><nav className="flex flex-wrap gap-2 mb-12" aria-label={ar?'تصفية الخدمات':'Service filters'}>{filters.map(([slug,label])=><Link href={glossPath(locale,'packages')+(slug==='all'?'':'?category='+slug)} key={slug} aria-current={category===slug?'page':undefined} className={'border rounded-full text-xs font-extrabold px-5 py-3 '+(category===slug?'bg-[#0D1626] text-white border-[#0D1626]':'bg-white border-[#BFD5E0] text-[#0D1626]')}>{glossText(label,locale)}</Link>)}</nav>
 <div className="grid lg:grid-cols-2 gap-4">{list.map(s=><article key={s.slug} className="flex flex-col p-7 sm:p-9 bg-white border border-[#C3D9E4] min-h-[325px] hover:shadow-lg">
  <div className="flex justify-between items-start"><span className="text-[#09627E] font-mono text-xs font-bold">FIELD / {String(s.rank).padStart(2,'0')}</span><ScanSearch size={21} className="text-[#09627E]"/></div>
  <h2 className="gloss-display text-2xl sm:text-3xl font-black mt-7">{glossText(s.title,locale)}</h2>
  <p className="leading-8 text-[#314A5C] mt-4 text-sm">{glossText(s.body,locale)}</p>
  <div className="mt-auto pt-7 flex flex-wrap items-center gap-3"><span className="flex items-center gap-2 text-xs text-[#09627E] font-bold"><Clock3 size={16}/>{s.durations[0]}–{s.durations[s.durations.length-1]} {ar?'دقيقة تقديرية':'illustrative minutes'}</span>
  <Link href={glossPath(locale,'packages/'+s.slug)} className="ms-auto text-sm bg-[#0D1626] text-white px-5 py-3 inline-flex gap-2 items-center font-bold">{ar?'تفاصيل الخدمة':'Service dossier'}<ArrowUpRight size={16}/></Link></div>
 </article>)}</div>
 <div className="mt-14 bg-[#DDECF3] p-8 sm:p-12 grid md:grid-cols-[auto_1fr] gap-7 items-start"><ShieldCheck className="text-[#09627E]" size={34}/><div><h2 className="text-2xl font-black">{ar?'نطاق العمل أهم من سعر موحد':'An honest scope beats a misleading fixed fee'}</h2><p className="leading-9 text-[#314A5C] text-sm mt-4">{ar?'تكلفة خدمة فعلية تختلف حسب حجم العربية وحالة الطلاء والداخلية والمواد والمنتجات وخطوات التجفيف والحماية، فلا توجد هنا أرقام أسعار أو ضمانات غير معتمدة.':'Real costs vary with surface conditions, vehicle size, materials, equipment and protection products. A website concept cannot assert actual pricing or warranty.'}</p></div></div>
 </div></div>;
}
