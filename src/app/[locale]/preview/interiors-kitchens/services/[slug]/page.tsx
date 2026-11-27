import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { FORMA,formaPath,formaService } from '@/lib/verticals/interiors-kitchens/data';
import { DesignSchematic } from '../../VisualLibrary';
import { Ruler,CheckCircle2,ArrowUpRight,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return FORMA.services.map(s=>({slug:s.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const s=formaService(slug);return s?{title:s.title[locale]+' | Forma Atelier',description:s.summary[locale],robots:{index:false}}:{};
}
export default async function FormaDetail(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const s=formaService(slug);if(!s)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#292722] text-white py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <nav className="text-xs text-[#E6C1B4]"><Link href={formaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={formaPath(locale,'services')}>{ar?'التخصصات':'Services'}</Link> / {s.title[locale]}</nav>
  <p className="font-mono text-xs mt-14 text-[#E5BDA9]">DESIGN DOSSIER / {String(s.rank).padStart(2,'0')}</p>
  <h1 className="forma-display text-4xl sm:text-6xl mt-5 max-w-4xl">{s.title[locale]}</h1><p className="text-[#EAD7CD] max-w-3xl text-base leading-9 mt-7">{s.summary[locale]}</p>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16"><DesignSchematic slug={slug} locale={locale}/></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[.6fr_1fr] gap-12"><div><Ruler size={35} className="text-[#8E5C47]"/><h2 className="forma-display text-3xl sm:text-4xl mt-7">{ar?'التفاصيل التي تفرق':'The important design constraints'}</h2></div><p className="text-[#5F4E44] leading-[2.1] text-base">{s.body[locale]}</p></section>
 <section className="bg-[#FFFDF8] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="forma-display text-3xl sm:text-4xl">{ar?'قائمة فحص قبل اعتماد التخطيط':'Three questions before approving scope'}</h2><div className="divide-y divide-[#B8AB9B] border-t border-[#B8AB9B] mt-9">{s.checklist[locale].map((item,i)=><article key={i} className="flex gap-5 items-center py-6"><span className="font-mono text-[#843F2B]">0{i+1}</span><CheckCircle2 size={22} className="shrink-0 text-[#843F2B]"/><h3 className="text-sm leading-8 font-bold">{item}</h3></article>)}</div></div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-[auto_1fr] gap-6"><ShieldCheck size={32} className="text-[#8E5C47]"/><div><h2 className="forma-display text-3xl">{ar?'المعاينة الفعلية لا تتبدل باستفسار أونلاين':'A real survey cannot be replaced by an online form'}</h2><p className="text-[#5F4E44] leading-9 text-sm mt-4">{ar?'الصور ومقاسات العميل الأولية تساعد في التواصل، لكن المقايسة والملاءمة والإنشاء تتطلب قياسًا هندسيًا واعتماد خامات من جهة تشغيل حقيقية.':'Editorial photos and early dimensions can inform questions. True feasibility, final measurements and a construction agreement require a qualified operating provider.'}</p></div></section>
 <section className="bg-[#E6D7C7] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between gap-7 items-center flex-wrap"><h2 className="forma-display text-3xl">{ar?'حوّل تفضيلك لطلب استشارة واضح':'Prepare a structured design enquiry'}</h2><Link href={formaPath(locale,'consultation')+'?service='+s.slug} className="bg-[#9A4B32] text-white px-8 py-4 font-bold text-sm flex items-center gap-3">{ar?'ابدأ الطلب':'Open the design brief'}<ArrowUpRight size={18}/></Link></div></section>
 </div>;
}
