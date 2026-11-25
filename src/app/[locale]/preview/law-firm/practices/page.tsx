import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LEXORA,lexoraPath,lexoraText } from '@/lib/verticals/law-firm/data';
import { ArrowUpRight,BriefcaseBusiness,Landmark,FileText,ShieldCheck } from 'lucide-react';

const types=[['all','كل المجالات','All practices'],['corporate','الشركات','Corporate'],['people','علاقات العمل','Employment'],['disputes','النزاعات','Disputes'],['innovation','الملكية الفكرية','IP'],['assets','الأصول والعقارات','Assets'],['international','الأعمال الدولية','International']] as const;
export default async function LexoraPractices(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{category?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const category=types.some(t=>t[0]===searchParams.category)?searchParams.category:'all';
 const list=LEXORA.services.filter(s=>category==='all'||s.category===category);
 return <div><section className="bg-[#F2E9DB] py-16 sm:py-24 border-b border-[#D6C8B6]"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_.65fr] gap-9 items-end"><div><p className="font-bold text-xs uppercase tracking-[.18em] text-[#775A2E]">PRACTICE AREA LIBRARY / 08</p><h1 className="lexora-display text-4xl sm:text-6xl leading-[1.12] mt-6">{ar?'المجال القانوني قبل أي طلب':'The practice-area index, with purpose'}</h1></div><p className="leading-9 text-[#584C60]">{ar?'ثمانية مجالات بمحتوى تثقيفي مختلف لكل تخصص. الاستشارة الفعلية تتطلب مراجعة محامٍ مرخص وفق الدولة والموضوع.':'Eight legal domains with original subject-matter explanations. Real advice requires a qualified professional within the relevant jurisdiction.'}</p></div></section>
   <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"><nav aria-label={ar?'تصفية مجالات الممارسة':'Practice category filter'} className="flex gap-2 flex-wrap mb-12">{types.map(([slug,aa,en])=><Link href={lexoraPath(locale,'practices')+(slug==='all'?'':'?category='+slug)} key={slug} aria-current={category===slug?'page':undefined} className={'border text-sm font-bold px-5 py-3 '+(category===slug?'bg-[#251D34] text-white border-[#251D34]':'bg-white text-[#46364E] border-[#D6C8B6] hover:border-[#84662F]')}>{ar?aa:en}</Link>)}</nav>
    <div className="grid lg:grid-cols-2 gap-5">{list.map(s=><article key={s.slug} className="border border-[#DDD0BE] bg-white p-8 sm:p-10 min-h-[380px] flex flex-col">
     <div className="flex items-center justify-between text-[#84662F] text-xs font-mono"><span>AREA / {String(s.rank).padStart(2,'0')}</span><Landmark size={25}/></div>
     <h2 className="lexora-display text-3xl mt-8 font-semibold">{lexoraText(s.title,locale)}</h2>
     <p className="mt-4 leading-8 text-sm text-[#584C60]">{lexoraText(s.body,locale)}</p>
     <div className="flex flex-wrap items-center gap-3 mt-auto border-t border-[#E3D9CE] pt-7"><Link href={lexoraPath(locale,'practices/'+s.slug)} className="bg-[#251D34] text-white px-5 py-3 text-sm font-bold inline-flex gap-2 items-center">{ar?'تفاصيل المجال':'Practice dossier'}<ArrowUpRight size={16}/></Link><Link href={lexoraPath(locale,'consultation')+'?practice='+s.slug} className="border border-[#84662F] px-5 py-3 text-sm font-bold text-[#46364E]">{ar?'استفسار عام':'General enquiry'}</Link></div>
    </article>)}</div>
   <section className="mt-16 bg-[#EDE5D8] p-8 sm:p-12 grid lg:grid-cols-[1fr_1fr] gap-10"><div><ShieldCheck size={31} className="text-[#84662F]"/><h2 className="lexora-display text-3xl mt-4">{ar?'المجال وحده لا يحسم التخصص':'Practice descriptions are not legal instructions'}</h2></div><p className="leading-9 text-[#584C60]">{ar?'لا تكفي صفحة عامة لتحديد أهلية شخص أو استحقاق قانوني أو ميعاد اعتراض. اطلب توجيه محامٍ محلي حقيقي عند وجود قرار أو مهلة مؤثرة.':'A general description cannot determine eligibility, filing deadlines or a legal outcome. Consult licensed local counsel for live decisions and deadlines.'}</p></section>
   </div></div>;
}
