import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n/config';
import {BLOOM} from '@/lib/verticals/nursery/data';
import {BloomAdmissionForm} from './BloomAdmissionForm';
import {ShieldCheck,CalendarDays,Heart} from 'lucide-react';
export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale
 } = params;

 return {title:locale==='ar'?'طلب زيارة حضانة | BloomSteps':'Nursery visit enquiry | BloomSteps',description:locale==='ar'?'اختر الفئة العمرية وموعدًا مفضلًا ووسيلة تواصل ولي الأمر فقط.':'Select an age band and guardian contact; no child identity or booking confirmation.',robots:{index:false,follow:false}};
}
export default async function Admissions(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{program?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const requested=BLOOM.services.find(p=>p.slug===searchParams.program);
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[.7fr_1.3fr] gap-10 items-start"><aside className="lg:sticky lg:top-32"><p className="text-[#8F412A] text-xs font-extrabold tracking-widest">BLOOMSTEPS / A FIRST VISIT</p><h1 className="bloom-display text-4xl sm:text-6xl mt-5 leading-tight">{ar?'أول خطوة... زيارة مفهومة':'The first step is a thoughtful visit'}</h1><p className="mt-6 leading-9">{ar?'نموذج بسيط يوضح كيفية تنظيم طلبات أولياء الأمور. البيانات الخاصة بالأطفال لا تُطلب هنا، ولا يوجد قبول أو زيارة مؤكدة.':'A carefully scoped guardian enquiry. No child-identifying details are collected and no actual enrollment or visit is confirmed.'}</p><div className="mt-8 space-y-4">{[[ShieldCheck,ar?'لا اسم طفل أو مستندات خاصة':'No child name or private documents'],[CalendarDays,ar?'موعد مفضل فقط':'Date preference only'],[Heart,ar?'تواصل ولي الأمر بموافقة واضحة':'Consented guardian contact']].map(([Icon,t],i)=><div key={i} className="flex items-start gap-3 rounded-2xl bg-[#E9F4ED] p-5 text-sm font-bold">{typeof Icon!=='string'&&<Icon size={22} className="shrink-0"/>}{t as string}</div>)}</div></aside><BloomAdmissionForm locale={locale} initialProgram={requested?.slug||''}/></div>;
}
