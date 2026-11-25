import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LEXORA,lexoraPath } from '@/lib/verticals/law-firm/data';
import { LexoraConsultationForm } from './LexoraConsultationForm';
import { LockKeyhole,ShieldCheck,Scale,AlertTriangle } from 'lucide-react';

export default async function LegalConsultationPage(
 props:{params: Promise<{locale:Locale}>;searchParams: Promise<{practice?:string}>}
) {
 const searchParams = await props.searchParams;
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',initialPractice=LEXORA.services.some(s=>s.slug===searchParams.practice)?searchParams.practice:'';
 return <div className="bg-[#F5F0E7]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-24 grid lg:grid-cols-[.64fr_1.04fr] gap-12 items-start">
  <aside className="lg:sticky lg:top-36"><span className="tracking-[.18em] text-xs font-bold text-[#775A2E]">LIMITED-INFORMATION INTAKE</span><h1 className="lexora-display text-4xl sm:text-6xl mt-6 leading-[1.07]">{ar?'اعرف المجال... واحمِ التفاصيل':'Good first contact respects confidentiality'}</h1>
   <p className="text-[#584C60] leading-9 mt-7">{ar?'موقع Lexora تصور من مافكس لمكاتب المحاماة. اختار فقط نوع الممارسة والدولة وطريقة التواصل المفضلة. ممنوع إرسال معلومات عن الخصوم أو القضايا أو العقود أو المواعيد القانونية.':'This is an editorial law-firm design, not a licensed practice. Provide general practice and jurisdiction choices only—never counterparty names, documents, case IDs, legal facts or deadlines.'}</p>
   <div className="border-y border-[#D5C7B4] py-7 my-9 space-y-5">{[[LockKeyhole,ar?'بدون ملفات أو تفاصيل قضايا':'No files or case descriptions'],[ShieldCheck,ar?'حفظ بيانات تواصل فقط بموافقة':'Consented basic contact information only'],[AlertTriangle,ar?'لا توكيل ولا موعد ولا أتعاب مؤكدة':'No representation, booked meeting or fee quote']].map(([Icon,label],i)=><div key={i} className="flex gap-3 items-start text-sm font-bold text-[#46364E]">{typeof Icon!=='string'&&<Icon size={21} className="text-[#84662F] shrink-0"/>}{label as string}</div>)}</div>
   <Link href={lexoraPath(locale,'practices')} className="text-sm font-bold underline underline-offset-8">{ar?'اعرف مجالات الممارسة أولًا':'Explore practice area guidance first'}</Link>
  </aside>
  <LexoraConsultationForm locale={locale} initialPractice={initialPractice}/>
 </div></div>;
}
