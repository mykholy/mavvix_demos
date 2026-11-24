import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { GLOSSBAY,glossService,glossPath } from '@/lib/verticals/car-detailing/data';
import { ArrowUpRight,CheckCircle2,Clock3,Info,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return GLOSSBAY.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const s=glossService(slug);return s?{title:s.title[locale]+' | GlossBay',description:s.summary[locale],robots:{index:false}}:{};
}
export default function GlossDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const service=glossService(slug);if(!service)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#0D1626] text-white pt-12 pb-20 sm:pb-28"><div className="max-w-7xl mx-auto px-5 sm:px-8">
  <nav className="text-xs text-[#BBD8E4]"><Link href={glossPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={glossPath(locale,'packages')}>{ar?'الخدمات':'Packages'}</Link> / {service.title[locale]}</nav>
  <p className="font-mono text-[#7DE2FF] tracking-widest text-xs font-bold mt-14">DETAIL DOSSIER / {String(service.rank).padStart(2,'0')}</p><h1 className="gloss-display mt-6 text-4xl sm:text-6xl leading-tight font-black max-w-4xl">{service.title[locale]}</h1><p className="text-base sm:text-lg leading-9 text-[#C4DEE9] mt-7 max-w-3xl">{service.summary[locale]}</p>
  <div className="flex flex-wrap gap-4 mt-9 items-center"><span className="text-[#94E7FD] flex gap-2 items-center text-sm"><Clock3 size={19}/>{service.durations.join(' / ')} {ar?'دقيقة للتخطيط':'illustrative minutes'}</span><Link href={glossPath(locale,'quote')+'?service='+service.slug} className="bg-[#4CCBF4] text-[#0D1626] px-6 py-4 font-black text-sm inline-flex items-center gap-2">{ar?'جهّز استفسار الخدمة':'Build an enquiry'}<ArrowUpRight size={17}/></Link></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.55fr_1fr] gap-12"><div><p className="text-[#09627E] font-mono text-xs font-black">THE TECHNICAL PERSPECTIVE</p><h2 className="gloss-display text-3xl sm:text-4xl mt-4 font-black">{ar?'ماذا تتضمن الخدمة؟':'What this treatment involves'}</h2></div><p className="text-[#314A5C] leading-[2.1] text-base sm:text-lg">{service.body[locale]}</p></section>
 <section className="bg-[#E5F2F8] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="gloss-display text-3xl sm:text-4xl font-black">{ar?'أسئلة مهمة قبل تنفيذ الخدمة':'Checkpoints before you authorize work'}</h2><div className="grid md:grid-cols-3 gap-4 mt-10">{service.checks[locale].map((q,i)=><div className="bg-white border border-[#C5DDE7] px-7 py-8 min-h-56" key={i}><span className="text-[#09627E] font-mono font-black">0{i+1}</span><CheckCircle2 size={24} className="mt-7 text-[#09627E]"/><h3 className="font-bold text-base leading-8 mt-4">{q}</h3></div>)}</div></div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid sm:grid-cols-[auto_1fr_auto] gap-5 items-center"><Info size={27} className="text-[#09627E]"/><div><h2 className="font-black text-xl">{ar?'توضيح نطاق التجربة':'What this website cannot confirm'}</h2><p className="text-sm text-[#314A5C] leading-8 mt-3">{ar?'هي معلومات قطاعية ونموذج استفسار غير ملزم، وليست خدمة فعلية أو نتيجة حقيقية أو وعد بضمان.':'This is industry education and a nonbinding enquiry, not a real treatment, guaranteed improvement or product warranty.'}</p></div><Link href={glossPath(locale,'quote')+'?service='+service.slug} className="font-bold text-sm bg-[#0D1626] text-white px-6 py-4 inline-flex gap-2">{ar?'اطلب توضيح النطاق':'Prepare your request'}<ArrowUpRight size={17}/></Link></section>
 </div>;
}
