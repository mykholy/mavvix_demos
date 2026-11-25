import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { VELORA,veloraPath,veloraService,veloraText } from '@/lib/verticals/salon-spa/data';
import { Clock3,ArrowUpRight,Flower2,ShieldCheck,CheckCircle2 } from 'lucide-react';
export function generateStaticParams(){return VELORA.services.map(s=>({slug:s.slug}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;slug:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const s=veloraService(slug);return s?{title:s.title[locale]+' | Velora Beauty',description:s.summary[locale],robots:{index:false}}:{};
}
export default async function VeloraDetail(props:{params: Promise<{locale:Locale;slug:string}>}) {
 const params = await props.params;

 const {
  locale,
  slug
 } = params;

 const s=veloraService(slug);if(!s)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#4B2834] text-[#FFF9F4]"><div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-20 sm:pb-24">
  <nav className="text-xs text-[#E4BDC4]"><Link href={veloraPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={veloraPath(locale,'services')}>{ar?'الخدمات':'Services'}</Link> / {s.title[locale]}</nav>
  <div className="mt-12 flex flex-col items-start gap-5"><p className="font-mono text-xs tracking-[.18em] text-[#E6B5BE]">SERVICE DOSSIER / {String(s.rank).padStart(2,'0')}</p><h1 className="velora-display text-5xl sm:text-7xl leading-tight max-w-5xl">{s.title[locale]}</h1><p className="max-w-3xl mt-3 text-base sm:text-lg leading-9 text-[#F2DCDD]">{s.summary[locale]}</p><p className="flex items-center gap-2 text-sm mt-5 text-[#E6B5BE]"><Clock3 size={18}/>{s.durations.join(' / ')} {ar?'دقيقة تقريبية':'illustrative minutes'}</p></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24 grid lg:grid-cols-[.55fr_1fr] gap-12"><div><Flower2 size={31} className="text-[#A36D79]"/><h2 className="velora-display text-4xl mt-5">{ar?'ما الذي تتضمنه الخدمة؟':'Understand the service'}</h2></div><p className="text-base sm:text-lg leading-[2.1] text-[#704E59]">{s.body[locale]}</p></section>
 <section className="bg-[#F4E8E5] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="velora-display text-4xl sm:text-5xl">{ar?'ثلاث أسئلة قبل الموافقة':'Three important questions'}</h2><div className="grid md:grid-cols-3 gap-5 mt-11">{s.questions[locale].map((q,i)=><div key={i} className="border border-[#DCC8C7] bg-[#FFFDF9] p-8 min-h-52"><span className="text-[#A36D79] font-mono">0{i+1}</span><CheckCircle2 size={24} className="mt-6 text-[#8E5566]"/><h3 className="text-base font-extrabold mt-5 leading-8">{q}</h3></div>)}</div></div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[1fr_auto] gap-7 items-center"><div><h2 className="velora-display text-4xl">{ar?'خلينا نوضح التفضيل':'Prepare a request with no false promises'}</h2><p className="text-sm text-[#704E59] leading-8 mt-5">{ar?'اختيار وقت مفضل لا يعني حجز صالون أو موظفة. أي إجراء أو منتج أو سعر يحتاج موافقة المشغّل الفعلي.':'A preferred date is not a confirmed salon booking. Actual service scope, products and price need the operator’s approval.'}</p></div><Link href={veloraPath(locale,'booking')+'?service='+s.slug} className="bg-[#4B2834] rounded-full text-white px-8 py-5 inline-flex items-center gap-3 font-bold text-sm">{ar?'كملي نموذج الاهتمام':'Continue enquiry'}<ArrowUpRight size={18}/></Link></section>
 </div>;
}
