import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { FORMA,formaPath,formaText } from '@/lib/verticals/interiors-kitchens/data';
import { DesignSchematic } from '../VisualLibrary';
import { ArrowUpRight,Ruler,CheckCircle2 } from 'lucide-react';
const types=[['all',{ar:'كل خدمات التصميم',en:'All design services'}],['kitchens',{ar:'تخطيط المطابخ',en:'Kitchen layouts'}],['storage',{ar:'التخزين والدريسنج',en:'Cabinetry and storage'}],['materials',{ar:'أسطح وخامات',en:'Materials'}],['finishes',{ar:'الإضاءة والتشطيب',en:'Finishing details'}]] as const;
export default async function FormaServices(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{category?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const filter=types.some(x=>x[0]===searchParams.category)?searchParams.category:'all';
 const services=FORMA.services.filter(s=>filter==='all'||s.category===filter);
 return <div><section className="bg-[#292722] text-[#F5EBE1] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_.7fr] gap-9 items-end">
  <div><p className="font-mono text-[#E1B295] tracking-widest text-xs">THE FORMA SCOPE LIBRARY</p><h1 className="forma-display text-4xl sm:text-6xl mt-6">{ar?'مش بس مطبخ حلو. تخطيط مبني على المكان.':'Service dossiers that start from real space'}</h1></div>
  <p className="leading-9 text-[#DDCFC1] text-sm">{ar?'من الخزائن وأساليب الحركة لمواصفات الأسطح والإكسسوارات: لكل مجال أسئلة ومقاسات مختلفة. هذه أمثلة على ما يمكن لشركة مافكس عرضه لعميلك.':'From cabinet configurations to worktops, practical project websites explain actual scope, measurement and materials rather than promise an instant final build.'}</p>
 </div></section>
 <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"><nav className="flex gap-3 flex-wrap mb-12" aria-label={ar?'تصفية الخدمات':'Service category filters'}>{types.map(([id,n])=><Link key={id} aria-current={filter===id?'page':undefined} href={formaPath(locale,'services')+(id==='all'?'':'?category='+id)} className={'text-xs font-black px-5 py-3 border '+(filter===id?'bg-[#9A4B32] text-white border-[#9A4B32]':'bg-white border-[#C5B7A7] hover:bg-[#EEE1D4]')}>{n[locale]}</Link>)}</nav>
  <div className="border-t border-[#B8AB9B]">{services.map(s=><article key={s.slug} className="grid md:grid-cols-[.65fr_1.35fr] gap-6 lg:gap-10 py-8 border-b border-[#B8AB9B] items-center"><DesignSchematic slug={s.slug} locale={locale}/><div><span className="text-xs font-bold text-[#843F2B]">{String(s.rank).padStart(2,'0')} / {s.category.toUpperCase()}</span><h2 className="forma-display text-3xl mt-4">{formaText(s.title,locale)}</h2><p className="text-[#544D44] leading-8 mt-4">{formaText(s.summary,locale)}</p><div className="flex flex-wrap gap-4 items-center mt-6"><Link href={formaPath(locale,'services/'+s.slug)} className="font-bold text-sm underline underline-offset-4 inline-flex gap-2 items-center">{ar?'استكشف التفاصيل':'Explore details'}<ArrowUpRight size={18}/></Link><Link href={formaPath(locale,'consultation')+'?service='+s.slug} className="bg-[#9A4B32] text-white px-5 py-3 min-h-11 text-sm font-bold">{ar?'ابدأ استشارة':'Start a brief'}</Link></div></div></article>)}</div>
  <section className="mt-16 bg-[#E6D7C7] p-8 sm:p-12"><h2 className="forma-display text-3xl">{ar?'متى تصبح البيانات سعرًا حقيقيًا؟':'When does an illustrative brief become a real quote?'}</h2><p className="leading-9 text-sm text-[#5B4B41] mt-6">{ar?'المعاينة المعتمدة ومواصفات الخامات والكميات ومقايسة المقاول وشروط التركيب عوامل أساسية. الصورة المرجعية وحدها لا تكفي لتحديد سعر شراء أو ضمان تنفيذ.':'Only a measured site, approved material specifications, quantities, installation scope and contractual terms can support a genuine quotation. Photographs alone cannot establish exact build costs.'}</p></section>
 </div></div>;
}
