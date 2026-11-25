import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { HOME_CARE,maintenancePath } from '@/lib/verticals/home-maintenance/data';
import { HomeMaintenanceForm } from './HomeMaintenanceForm';
import { ShieldCheck, MapPin, AlertTriangle } from 'lucide-react';
export default async function HomeCareBooking(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{service?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',service=HOME_CARE.services.some(s=>s.slug===searchParams.service)?searchParams.service:'';
 return <div className="bg-[#ECF4FA]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[.62fr_1fr] gap-12 items-start"><div className="lg:sticky lg:top-36"><p className="text-xs text-[#D39421] font-black tracking-widest">FIXORA INTAKE / STEP BY STEP</p><h1 className="font-black text-4xl sm:text-5xl mt-5 leading-tight">{ar?'اطلب الخدمة من غير ما تحكي نفس الكلام مرتين.':'A clearer request, in three useful steps.'}</h1><p className="mt-6 leading-9 text-[#527089]">{ar?'حدد الخدمة والمشكلة والمنطقة بشكل عام، وبعدها اكتب وسيلة التواصل فقط. ده نموذج تجربة لا يرسل فني ولا يؤكد زيارة.':'Choose service, observed issue and general area before sharing minimal contact details. This is an interactive website experience, not a confirmed visit or real emergency dispatch.'}</p><div className="space-y-4 mt-9">{[[ShieldCheck,ar?'معلومات محدودة بموافقة واضحة':'Minimal contact data with consent'],[MapPin,ar?'من غير عنوان بيت أو رقم شقة':'No exact street or apartment details'],[AlertTriangle,ar?'ليس خط طوارئ للكهرباء أو الغاز':'Not an emergency line for gas/electrical hazards']].map(([Icon,label],i)=><div key={i} className="flex gap-3 text-[#174E78] text-sm font-bold items-start">{typeof Icon!=='string'&&<Icon size={19} className="text-[#D39421] shrink-0"/>}{label as string}</div>)}</div><Link href={maintenancePath(locale,'services')} className="mt-8 text-[#174E78] underline inline-block font-bold text-sm">{ar?'راجع دليل الخدمات':'Review services first'}</Link></div><HomeMaintenanceForm locale={locale} service={service}/></div></div>;
}
