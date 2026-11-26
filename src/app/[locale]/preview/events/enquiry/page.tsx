import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LUMA_EVENTS,lumaPath } from '@/lib/verticals/events/data';
import { LumaForm } from './LumaForm';
export default async function Enquiry({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{experience?:string|string[]}>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const q=await searchParams;const ar=locale==='ar';const initial=typeof q.experience==='string'&&LUMA_EVENTS.services.some(s=>s.slug===q.experience)?q.experience:LUMA_EVENTS.services[0].slug;
 return <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 grid gap-10 lg:grid-cols-[.7fr_1fr] lg:items-start"><div className="lg:sticky lg:top-32"><p className="text-xs font-bold tracking-widest text-[#874F63]">LUMA / YOUR EVENT BRIEF</p><h1 className="mt-6 font-serif text-4xl sm:text-6xl">{ar?'كل فعالية تبدأ بتفاصيل واضحة':'Every event begins with a clear brief'}</h1><p className="mt-7 text-base leading-9">{ar?'حدد النوع ونطاق الضيوف والمكان والميزانية. المرجع غير ملزم ولا يؤكد حجز قاعة أو مورداً أو سعراً.':'Choose the format, guest band, venue and budget. The reference confirms no venue, vendor or price.'}</p><Link className="mt-7 inline-flex underline font-bold" href={lumaPath(locale,'planning')}>{ar?'راجع أساسيات التخطيط':'Review planning essentials'}</Link></div><LumaForm locale={locale} initial={initial}/></div>;
}
