import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath,pawService } from '@/lib/verticals/veterinary/data';
import { CheckCircle2,ArrowUpRight,PawPrint,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return PAWWELL.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{slug,locale}}:{params:{slug:string;locale:Locale}}):Metadata{
 const s=pawService(slug);return s?{title:s.title[locale]+' | PawWell by Mavvix',description:s.summary[locale],robots:{index:false}}:{};
}
export default function PawServiceDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const service=pawService(slug);if(!service)notFound();const ar=locale==='ar';
 return <div>
  <section className="bg-[#24463D] text-white py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8"><nav className="text-[#D4E9D9] text-xs"><Link href={pawPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={pawPath(locale,'services')}>{ar?'الخدمات':'Services'}</Link> / {service.title[locale]}</nav>
   <p className="font-mono text-[#F3B98E] text-xs font-bold tracking-widest mt-14">PAWELL / CARE GUIDE 0{service.rank}</p>
   <h1 className="paw-display font-black text-4xl sm:text-6xl mt-6 max-w-4xl">{service.title[locale]}</h1>
   <p className="mt-6 text-[#E0EFE3] text-lg max-w-3xl leading-9">{service.summary[locale]}</p>
  </div></section>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.5fr_1fr] gap-12 py-20"><div><PawPrint className="text-[#A66C47]" size={33}/><h2 className="paw-display text-3xl sm:text-4xl font-black mt-7">{ar?'لماذا تناقش الخدمة مع الطبيب؟':'A useful conversation before an examination'}</h2></div><p className="text-base sm:text-lg text-[#426155] leading-[2.1]">{service.body[locale]}</p></section>
  <section className="bg-white py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="text-3xl font-black">{ar?'قبل الموافقة على أي إجراء':'What to clarify before any treatment'}</h2><div className="grid md:grid-cols-3 gap-4 mt-9">{service.checklist[locale].map((x,i)=><div key={i} className="bg-[#F2F7EF] rounded-[1.6rem] p-7 border border-[#D9E5D8]"><span className="font-mono text-[#915736] font-bold">0{i+1}</span><CheckCircle2 className="mt-7 text-[#4B7965]" size={24}/><p className="font-extrabold text-sm leading-8 mt-5">{x}</p></div>)}</div></div></section>
  <section className="bg-[#E9EFE4] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap justify-between items-center gap-9"><div><h2 className="font-black text-2xl">{ar?'مهم: الموقع لا يقدم خدمات بيطرية فعلية':'Important: this concept does not offer veterinary care'}</h2><p className="text-sm text-[#49665A] leading-8 mt-4 max-w-2xl">{ar?'المعلومات للتثقيف العام. التشخيص والعلاج وتوفر الطبيب مسؤولية عيادة فعلية، والحالات العاجلة لا تنتظر الفورم.':'Educational content only. Actual diagnosis, staff availability and urgent care are the responsibility of a real veterinary provider.'}</p></div><Link href={pawPath(locale,'request')+'?service='+service.slug} className="inline-flex items-center gap-2 bg-[#24463D] text-white rounded-full px-8 py-4 font-bold text-sm">{ar?'جهز استفسار الزيارة':'Prepare a visit enquiry'}<ArrowUpRight size={17}/></Link></div></section>
 </div>;
}
