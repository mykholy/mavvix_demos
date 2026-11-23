import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CheckCircle2, ArrowUpRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { HOME_CARE,careService,maintenancePath } from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';

export function generateStaticParams(){return HOME_CARE.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{slug,locale}}:{params:{slug:string;locale:Locale}}):Metadata{
 const item=careService(slug);return item?{title:item.title[locale]+' | Fixora Care',description:item.summary[locale]}:{};
}
export default function HomeServiceDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const s=careService(slug);if(!s)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#ECF4FA] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <nav className="text-xs text-[#7692A8]"><Link href={maintenancePath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={maintenancePath(locale,'services')}>{ar?'الخدمات':'Services'}</Link> / {s.title[locale]}</nav>
  <div className="grid lg:grid-cols-[1fr_.5fr] gap-12 items-end mt-10"><div><p className="text-[#D39421] uppercase text-xs font-black tracking-widest">FIXORA CARE / SERVICE DOSSIER {String(s.rank).padStart(2,'0')}</p><h1 className="text-4xl sm:text-6xl leading-tight font-black mt-5">{s.title[locale]}</h1><p className="text-lg leading-9 text-[#527089] mt-6 max-w-3xl">{s.summary[locale]}</p></div><Link href={maintenancePath(locale,'book')+'?service='+s.slug} className="rounded-xl bg-[#174E78] text-white px-7 py-4 inline-flex gap-3 items-center font-black text-sm w-fit">{ar?'طلب استفسار عن الخدمة':'Request service information'}<ArrowUpRight size={17}/></Link></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[.4fr_1fr] gap-12"><div><p className="text-xs text-[#D39421] font-black tracking-widest">PRACTICAL DETAIL</p><h2 className="font-black text-3xl mt-3">{ar?'افهم المشكلة الأول':'Understand the scope first'}</h2></div><p className="text-lg text-[#527089] leading-[2.1]">{s.body[locale]}</p></section>
 <section className="bg-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="text-2xl sm:text-3xl font-black">{ar?'ثلاث خطوات لازم تتأكد منها':'Three checkpoints before repair'}</h2><div className="grid md:grid-cols-3 gap-4 mt-9">{s.checklist[locale].map((item,i)=><div key={i} className="p-7 rounded-3xl border border-[#DCEAF2] bg-[#F7FAFD]"><span className="text-[#D39421] font-mono text-2xl font-black">{i+1}</span><CheckCircle2 size={23} className="text-[#174E78] mt-5"/><h3 className="mt-4 text-base leading-8 font-black">{item}</h3></div>)}</div></div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-[auto_1fr] gap-6"><AlertTriangle size={36} className="text-[#D39421]"/><div><h2 className="text-2xl font-black">{ar?'تنبيه السلامة والمسؤولية':'Safety and operator confirmation'}</h2><p className="mt-3 text-sm text-[#527089] leading-9 max-w-4xl">{ar?'هذا شرح قطاعي وليس توجيهًا بإجراء إصلاح منزلي غير آمن. مشغّل الخدمة الحقيقي فقط يحدد تكلفة المعاينة وتوفر المختص وموعد الزيارة.':'This is educational sector content, not a DIY repair instruction or a binding quote. A real business must confirm technician qualifications, visit terms and availability.'}</p></div></section>
 <section className="bg-[#F7B347] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-6"><h2 className="text-2xl font-black max-w-xl">{ar?'جاهز تجهز طلب الخدمة بالبيانات المناسبة؟':'Ready to prepare an accurate request?'}</h2><Link href={maintenancePath(locale,'book')+'?service='+s.slug} className="bg-[#174E78] text-white rounded-full px-8 py-4 font-black text-sm inline-flex gap-3 items-center">{ar?'افتح النموذج':'Open request form'}<ArrowUpRight size={17}/></Link></div></section>
 </div>;
}
