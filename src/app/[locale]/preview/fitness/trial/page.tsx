import type { Locale } from '@/lib/i18n/config';
import { PULSE } from '@/lib/verticals/fitness/data';
import { PulseTrialForm } from './PulseTrialForm';
import { ShieldCheck,CalendarClock,Activity,LockKeyhole } from 'lucide-react';
export default async function PulseTrial(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{class?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const target=PULSE.services.some(x=>x.slug===searchParams.class)?searchParams.class:'';
 return <div className="bg-[#E5E2F1] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.65fr_1fr] gap-12">
  <div className="lg:sticky lg:top-32 self-start"><p className="text-xs uppercase font-black tracking-[.22em] text-[#5939B3]">PULSE / INTRO REQUEST</p><h1 className="pulse-display text-5xl sm:text-6xl mt-5 font-black">{ar?'خليك محدد في اختيارك':'START WITH THE RIGHT QUESTIONS.'}</h1><p className="text-sm leading-9 mt-6 text-[#3D3A52]">{ar?'اختار خبرتك السابقة وفئة الحصة وتفضيل الوقت والمنطقة؛ كل ده نموذج تجربة مافكس، ومش تفعيل اشتراك أو حجز مدرب.':'Class choice, experience level and preferred time are enough for a meaningful enquiry. A real gym operator would separately verify capacity, safety and availability.'}</p>
   <div className="mt-10 border-t border-[#B6B0D3] pt-7 space-y-5">{[[ShieldCheck,ar?'لا معلومات طبية ولا قياسات جسم':'No medical details or body measurements'],[CalendarClock,ar?'بدون تأكيد موعد أو عضوية':'No confirmed membership or class'],[Activity,ar?'مرجع محفوظ للحوار فقط':'Saved enquiry reference only']].map(([Icon,t],i)=><div className="flex gap-3 items-start text-sm font-bold" key={i}>{typeof Icon!=='string'&&<Icon size={21} className="text-[#5939B3] shrink-0"/>}{t as string}</div>)}</div>
  </div><PulseTrialForm locale={locale} defaultClass={target}/>
 </div></div>;
}
