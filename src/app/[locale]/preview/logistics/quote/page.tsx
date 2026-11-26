import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROUTELINE,routeLinePath } from '@/lib/verticals/logistics/data';
import { FreightForm } from './FreightForm';
export default async function Quote({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{service?:string|string[]}>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const q=await searchParams;const ar=locale==='ar';const initial=typeof q.service==='string'&&ROUTELINE.services.some(s=>s.slug===q.service)?q.service:ROUTELINE.services[0].slug;
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid gap-10 lg:grid-cols-[.7fr_1fr] lg:items-start"><div className="lg:sticky lg:top-32"><p className="text-xs font-bold tracking-widest text-[#31566C]">ROUTELINE / FREIGHT BRIEF</p><h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight">{ar?'حدد مسار شحنتك':'Build your freight brief'}</h1><p className="mt-6 leading-9">{ar?'اختر الخدمة ودول المنشأ والوجهة ونطاق الوزن. لا ترسل فواتير أو وثائق أو معلومات حساسة. المرجع لا يؤكد حجزاً أو تتبعاً أو سعراً.':'Select service, origin and destination countries, and weight band. Do not send invoices or sensitive documents. The reference confirms no booking, tracking or price.'}</p><Link href={routeLinePath(locale,'scope')} className="mt-7 inline-flex font-bold underline">{ar?'قارن نطاق الشحن':'Compare freight scope'}</Link></div><FreightForm locale={locale} initial={initial}/></div>;
}
