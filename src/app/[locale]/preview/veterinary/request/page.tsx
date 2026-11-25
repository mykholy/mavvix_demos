import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL,pawPath } from '@/lib/verticals/veterinary/data';
import { PawVisitForm } from './PawVisitForm';
import { ShieldCheck, CalendarDays, AlertTriangle, PawPrint } from 'lucide-react';

export default async function PawRequestPage(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{service?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const initial=PAWWELL.services.some(s=>s.slug===searchParams.service)?searchParams.service:'';
 return <div className="bg-[#F5F8F1]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[.75fr_1.15fr] gap-12 items-start">
  <div className="lg:sticky lg:top-32">
   <p className="font-black text-xs uppercase tracking-widest text-[#915736]">PAWWELL / VISIT INTEREST</p>
   <h1 className="paw-display text-4xl sm:text-6xl mt-6 font-black leading-[1.1]">{ar?'سؤال صحيح اليوم... رعاية أوضح غدًا':'A caring visit begins with the right details'}</h1>
   <p className="mt-7 text-[#486559] leading-9 text-base">{ar?'حدّد نوع الحيوان وفئته العمرية وسبب الزيارة وتاريخ تفضّله؛ المعلومات محفوظة داخل تجربة PawWell ولا تمثل حجزًا لعيادة موجودة.':'Select the pet species, general age group, visit reason and a date preference. This is a Mavvix example, not a working clinic booking engine.'}</p>
   <div className="border-y border-[#C9DBCB] mt-9 py-7 space-y-5">{[[ShieldCheck,ar?'بيانات عامة فقط، دون تاريخ مرضي':'Only minimal nonclinical data'],[CalendarDays,ar?'موعد مفضل وليس حجزًا نهائيًا':'A date preference, not a booked slot'],[AlertTriangle,ar?'ليس لطلب طوارئ أو وصف علاج':'Not an emergency or medical advice channel']].map(([Icon,copy],i)=><div key={i} className="flex items-start gap-3 text-sm font-extrabold text-[#426155]">{typeof Icon!=='string'&&<Icon size={20} className="text-[#A76944] shrink-0"/>}{copy as string}</div>)}</div>
   <Link href={pawPath(locale,'services')} className="mt-7 inline-block text-sm font-bold underline underline-offset-4">{ar?'اقرأ تفاصيل الخدمات أولًا':'Explore care dossiers first'}</Link>
  </div><PawVisitForm locale={locale} initialService={initial}/>
 </div></div>;
}
