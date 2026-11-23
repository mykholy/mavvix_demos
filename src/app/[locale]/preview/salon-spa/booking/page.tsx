import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { VELORA, veloraPath } from '@/lib/verticals/salon-spa/data';
import { VeloraAppointmentForm } from './VeloraAppointmentForm';
import { Flower2, CalendarDays, CheckCircle2 } from 'lucide-react';
export default function VeloraBooking({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{service?:string}}){
 const ar=locale==='ar';const initial=VELORA.services.some(s=>s.slug===searchParams.service)?searchParams.service:'';
 return <div className="bg-[#FBF8F4]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-20 grid lg:grid-cols-[.72fr_1.28fr] gap-12 lg:gap-16 items-start">
  <aside className="lg:sticky lg:top-32"><p className="uppercase tracking-[.22em] text-[#865463] font-bold text-xs">THE BOOKING EDIT</p>
   <h1 className="velora-display text-5xl sm:text-6xl leading-[1.08] mt-6">{ar?'الموعد الجميل يبدأ بتفاصيل واضحة':'A beautiful experience begins with clarity'}</h1>
   <p className="text-[#75535E] text-base leading-9 mt-7">{ar?'اختاري خدمة محددة ومدتها التقديرية وأفضل يوم وفترة. تجربة النموذج تحفظ تفضيلك فقط: لا يوجد صالون فعلي مؤكد ولا يتضمن دفعًا أو اختيار موظفة حقيقية.':'This form records your service choice, estimated duration and preferred date window. It is an interactive Mavvix example, not a live booking or payment service.'}</p>
   <div className="border-y border-[#E1CED0] mt-10 py-7 space-y-5">{[[CalendarDays,ar?'تاريخ مفضل، لا موعد مؤكد':'Preference, not a confirmed slot'],[CheckCircle2,ar?'لا صور أو بيانات صحية مطلوبة':'No personal photos or health details'],[Flower2,ar?'قائمة خدمات تجميلية غير طبية':'Cosmetic services, not clinical treatments']].map(([Icon,text],i)=><div key={i} className="flex items-center gap-3 text-sm text-[#634650] font-semibold">{typeof Icon!=='string'&&<Icon size={21} className="text-[#A26C7A] shrink-0"/>}{text as string}</div>)}</div>
   <Link href={veloraPath(locale,'services')} className="underline underline-offset-8 inline-block mt-7 text-sm font-bold">{ar?'راجعي الخدمات الأول':'Explore the service menu first'}</Link>
  </aside>
  <VeloraAppointmentForm locale={locale} initialService={initial}/>
 </div></div>;
}
