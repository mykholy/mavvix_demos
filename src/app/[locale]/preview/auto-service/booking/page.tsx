import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { AUTO_SERVICE, autoPath } from '@/lib/verticals/auto-service/data';
import { AutoBookingForm } from './AutoBookingForm';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AutoBooking({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{service?:string}}){
 const ar=locale==='ar';
 const initial=AUTO_SERVICE.services.some(s=>s.slug===searchParams.service)?searchParams.service:'';
 return <div className="bg-white"><div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-24 grid lg:grid-cols-[.65fr_1.15fr] gap-12 items-start">
  <div className="lg:sticky lg:top-32"><p className="text-[#D5552C] text-xs tracking-[.2em] font-black">TORQUE / INTAKE</p><h1 className="text-4xl sm:text-5xl font-black leading-tight mt-5">{ar?'طلب فحص واضح من أول دقيقة':'A precise inspection request starts here'}</h1>
   <p className="mt-6 text-stone-600 leading-9 text-base">{ar?'الهدف من النموذج توضيح حالة السيارة والخدمة المطلوبة. لن يُطلب رقم شاسيه ولا أي معلومات مالية؛ صاحب المركز الحقيقي هو الذي يؤكد موعد الفحص عند تشغيل الموقع لصالحه.':'This flow collects only vehicle context and contact details to illustrate the request experience. No VIN, payment or diagnosis is requested. Actual workshop confirmation is a separate operational step.'}</p>
   <div className="mt-9 p-5 border border-stone-200 rounded-2xl space-y-4 text-sm"><div className="flex gap-3 items-start"><ShieldCheck size={21} className="shrink-0 text-[#D5552C]"/><span>{ar?'بيانات محدودة وطلب له رقم مرجعي':'Limited data and an individual request reference'}</span></div><div className="flex gap-3 items-start"><AlertTriangle size={21} className="shrink-0 text-[#D5552C]"/><span>{ar?'لا يوجد تأكيد حجز أو سعر إصلاح':'No booking or repair price is confirmed'}</span></div></div>
   <Link href={autoPath(locale,'diagnostics')} className="text-[#D5552C] text-sm inline-flex font-extrabold mt-7">{ar?'اقرأ دليل التحذيرات قبل الطلب':'Review warning indicators first'}</Link>
  </div>
  <AutoBookingForm locale={locale} initialService={initial}/>
 </div></div>;
}
