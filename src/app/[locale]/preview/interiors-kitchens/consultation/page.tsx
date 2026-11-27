import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { FORMA,formaPath } from '@/lib/verticals/interiors-kitchens/data';
import { FormaBriefForm } from './FormaBriefForm';
import { Ruler,ShieldCheck,PenTool } from 'lucide-react';
export default async function FormaConsultation(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{service?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const initial=FORMA.services.some(s=>s.slug===searchParams.service)?searchParams.service:'l-shaped';
 return <section className="py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.7fr_1.1fr] gap-12 items-start">
  <aside className="lg:sticky lg:top-36"><p className="font-mono text-[#843F2B] text-xs tracking-widest">FORMA / ARCHITECTURAL INTAKE</p>
   <h1 className="forma-display text-4xl sm:text-6xl leading-tight mt-6">{ar?'صمّم البداية، خطوة بخطوة.':'A thoughtful design starts here'}</h1>
   <p className="leading-9 text-[#64554B] mt-7">{ar?'ابدأ بمقاسات استرشادية وتخطيط تفضّله ومواد ممكن تعجبك. هذه البيانات ليست رفع مقاسات فعليًا، ولا نستخدمها لتصنيع أو تسعير دون اعتماد متخصص.':'Choose an approximate layout, wall lengths and design direction. The request is stored as a concept brief, not a measured plan, licensed drawing or binding price.'}</p>
   <div className="border-t border-[#C8B8A9] mt-10 pt-8 space-y-5">{[[Ruler,ar?'مقاسات مبدئية بالسنتيمتر':'Approximate dimensions only'],[ShieldCheck,ar?'بدون عنوان منزل أو مخطط سري':'No street address or confidential plan'],[PenTool,ar?'ملخص اختيارك ومرجع محفوظ':'Saved reference; operator confirmation pending']].map(([Icon,copy],i)=><p key={i} className="flex items-center gap-3 text-sm font-bold text-[#58473F]">{typeof Icon!=='string'&&<Icon size={20} className="text-[#8D5B46] shrink-0"/>}{copy as string}</p>)}</div>
   <Link className="underline underline-offset-8 inline-block mt-8 font-bold text-sm" href={formaPath(locale,'measurement')}>{ar?'طريقة التفكير في قياسات المطبخ':'Read the measurement preparation guide'}</Link>
  </aside>
  <FormaBriefForm locale={locale} initial={initial}/>
 </div></section>;
}
