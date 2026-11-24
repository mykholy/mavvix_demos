import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LEDGERPOINT,ledgerPath } from '@/lib/verticals/accounting/data';
import { LedgerScopeForm } from './LedgerScopeForm';
import { ShieldCheck,FileCheck2,LockKeyhole } from 'lucide-react';
export default function LedgerQuote({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{service?:string}}){
 const ar=locale==='ar',initial=LEDGERPOINT.services.some(s=>s.slug===searchParams.service)?searchParams.service:'';
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[.7fr_1fr] gap-12 items-start">
  <div className="lg:sticky lg:top-36"><p className="text-xs tracking-[.18em] font-black text-[#176C72]">SCOPE INTAKE, NOT AN AUDIT</p><h1 className="ledger-display text-4xl sm:text-6xl mt-6 leading-tight">{ar?'حجم الشغل أولًا، وبعدها العرض':'Understand the scope before pricing'}</h1><p className="mt-7 text-[#455F6C] leading-9">{ar?'الهدف من هذه التجربة هو توضيح طلب خدمة محاسبية مناسبة. لا يقدم LedgerPoint خدمة فعلية، ولا يتم جمع كشوف حساب أو فواتير أو ضرائب خاصة.':'This demonstration captures only broad business needs. LedgerPoint is not a real accounting practice and does not collect bank statements, customer invoices, tax IDs or payroll data.'}</p>
   <div className="border-y border-[#C6D6D4] py-7 my-9 space-y-5">{[[ShieldCheck,ar?'بدون بيانات مالية سرية':'No sensitive financial inputs'],[FileCheck2,ar?'نطاق الخدمة واضح':'Clear scope categories'],[LockKeyhole,ar?'مرجع طلب محفوظ وغير ملزم':'Saved nonbinding reference']].map(([Icon,text],i)=><div key={i} className="flex gap-3 items-center font-bold text-sm">{typeof Icon!=='string'&&<Icon size={20} className="text-[#147C82] shrink-0"/>}{text as string}</div>)}</div>
   <Link href={ledgerPath(locale,'services')} className="underline underline-offset-8 text-sm font-bold">{ar?'شوف ملفات الخدمات أولًا':'Review service scopes first'}</Link>
  </div>
  <LedgerScopeForm locale={locale} initialService={initial}/>
 </div>;
}
