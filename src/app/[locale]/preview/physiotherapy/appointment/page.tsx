import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { MOTION,motionPath } from '@/lib/verticals/physiotherapy/data';
import { MotionAssessmentForm } from './MotionAssessmentForm';
import { ShieldCheck,CalendarDays,LockKeyhole,HeartPulse } from 'lucide-react';

export default async function MotionAppointment(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{service?:string;goal?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',service=MOTION.services.some(s=>s.slug===searchParams.service)?searchParams.service:'',goal=MOTION.intake.goalTypes.includes(searchParams.goal||'')?searchParams.goal:'';
 return <div className="bg-[#E7F3E9]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[.66fr_1fr] gap-12">
 <div className="lg:sticky lg:top-32 self-start"><p className="font-mono text-[#287459] text-xs font-extrabold tracking-widest">MOTION LAB / INITIAL CONTACT</p>
 <h1 className="motion-display text-4xl sm:text-5xl leading-tight font-black mt-5">{ar?'استفسار منظم قبل زيارة حقيقية':'A thoughtful first-contact experience'}</h1>
 <p className="text-[#46695C] leading-9 mt-6">{ar?'ده نموذج توضيحي لموقع مركز علاج طبيعي، لا يحجز موعدًا ولا يقيّم حالة طبية. لا تشارك أعراضًا أو صورًا أو تقارير؛ اكتفي بنوع الخدمة والموعد المفضل.':'This is a physiotherapy website concept, not a clinical consultation, confirmed visit or diagnosis. Only a broad service goal, preferred timing and contact details are needed.'}</p>
 <div className="mt-10 border-y border-[#B7D0BF] py-7 space-y-5">{[[LockKeyhole,ar?'بدون ملفات أو بيانات طبية':'No health records or imaging'],[CalendarDays,ar?'تاريخ مفضل وليس وقتًا مضمونًا':'Preferred date, not a booked appointment'],[ShieldCheck,ar?'نموذج بوضوح وموافقة':'Consent-based, minimal contact']].map(([Icon,copy],i)=><div key={i} className="flex gap-3 items-center text-sm font-bold"><Icon size={20} className="text-[#287459] shrink-0"/>{copy as string}</div>)}</div>
 <Link href={motionPath(locale,'services')} className="inline-block mt-8 underline underline-offset-8 font-bold text-sm">{ar?'اقرأ الخدمات أولًا':'Explore the educational service catalogue'}</Link>
 </div><MotionAssessmentForm locale={locale} service={service} goal={goal}/></div></div>;
}
