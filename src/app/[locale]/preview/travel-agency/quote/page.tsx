import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NOMAD_ROUTES,nomadPath } from '@/lib/verticals/travel-agency/data';
import { NomadForm } from './NomadForm';
export default async function NomadQuote({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{journey?:string|string[]}>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const q=await searchParams;const ar=locale==='ar';const initial=typeof q.journey==='string'&&NOMAD_ROUTES.services.some(j=>j.slug===q.journey)?q.journey:'tailor-made-journey';
 return <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 grid gap-12 lg:grid-cols-[.7fr_1fr] lg:items-start"><div className="lg:sticky lg:top-32"><p className="text-xs font-bold tracking-widest text-[#944129]">YOUR ROUTE / YOUR PACE</p><h1 className="mt-6 font-serif text-4xl sm:text-6xl">{ar?'الرحلة تبدأ بفكرة واضحة':'Every journey starts with a brief'}</h1><p className="mt-7 leading-9 text-[#3D5249]">{ar?'حدد البلد والمسار والمدة ونطاق الميزانية. لا نحتاج جواز سفر أو رقم هوية أو تفاصيل دفع. المرجع الناتج غير ملزم ولا يؤكد حجزًا أو تذكرة أو تأشيرة.':'Specify country, route, duration and budget band. Never submit passports, identity or payment data. The resulting reference is nonbinding and confirms no reservation, ticket or visa.'}</p><Link href={nomadPath(locale,'inclusions')} className="mt-8 inline-flex font-bold underline">{ar?'راجع تفاصيل التخطيط':'Review planning details'}</Link></div><NomadForm locale={locale} initial={initial}/></div>;
}
