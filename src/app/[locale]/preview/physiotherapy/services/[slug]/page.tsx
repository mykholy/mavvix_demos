import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { MOTION,motionPath,motionService } from '@/lib/verticals/physiotherapy/data';
import { ArrowUpRight,ShieldCheck,ClipboardCheck,Info,Clock3 } from 'lucide-react';
export function generateStaticParams(){return MOTION.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const s=motionService(slug);return s?{title:s.title[locale]+' | Motion Lab',description:s.summary[locale],robots:{index:false}}:{};
}
export default function MotionService({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const service=motionService(slug);if(!service)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#23443F] text-white py-12 sm:py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><nav className="text-xs text-[#C8E6D4]"><Link href={motionPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={motionPath(locale,'services')}>{ar?'التخصصات':'Specialties'}</Link> / {service.title[locale]}</nav>
 <div className="mt-12"><p className="text-xs tracking-widest text-[#B4E9C7] font-bold">FUNCTIONAL GUIDE / {String(service.rank).padStart(2,'0')}</p><h1 className="motion-display text-4xl sm:text-6xl leading-tight font-black mt-5 max-w-5xl">{service.title[locale]}</h1><p className="mt-7 text-lg max-w-3xl leading-9 text-[#D8EDE0]">{service.summary[locale]}</p><div className="flex gap-3 items-center mt-8 text-sm text-[#C4EAD3]"><Clock3 size={18}/>{service.durations.join(' / ')} {ar?'دقيقة توضيحية للتخطيط':'illustrative minutes, not scheduled visits'}</div></div>
 </div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.55fr_1fr] gap-12"><div><h2 className="motion-display text-3xl sm:text-4xl font-black">{ar?'ما معنى المجال ده؟':'What this care area means'}</h2></div><p className="leading-[2.1] text-[#46695C] text-base sm:text-lg">{service.body[locale]}</p></section>
 <section className="bg-[#E5F1E9] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="motion-display text-3xl sm:text-4xl font-black">{ar?'3 أسئلة تنظّم تواصلك مع المختص':'Questions to clarify with an actual clinician'}</h2><div className="grid md:grid-cols-3 gap-4 mt-10">{service.questions[locale].map((q,i)=><div key={i} className="bg-[#FCFDF8] p-7 rounded-2xl border border-[#C6D8CD] min-h-[230px]"><span className="font-mono text-[#287459]">0{i+1}</span><ClipboardCheck className="text-[#287459] mt-7" size={26}/><h3 className="mt-5 font-extrabold leading-8 text-base">{q}</h3></div>)}</div></div></section>
 <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center"><Info size={34} className="text-[#287459]"/><div><h2 className="motion-display text-2xl font-black">{ar?'قبل أي برنامج حقيقي':'Before an actual care plan'}</h2><p className="text-[#46695C] leading-9 text-sm mt-4">{ar?'لا توجد نتيجة علاجية أو معالج موثق أو موعد محجوز داخل هذه النسخة. كل قرار سريري يحتاج جهة مؤهلة.':'No real patient outcome, verified therapist or booked appointment exists in this example. Actual clinical decisions belong to qualified providers.'}</p></div><Link href={motionPath(locale,'appointment')+'?service='+service.slug} className="bg-[#23443F] rounded-full text-white px-7 py-4 text-sm font-bold inline-flex gap-2 items-center">{ar?'جهز استفسار':'Prepare enquiry'}<ArrowUpRight size={17}/></Link></section>
 </div>;
}
