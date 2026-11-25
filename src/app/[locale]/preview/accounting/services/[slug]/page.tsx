import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { LEDGERPOINT,ledgerPath,ledgerService } from '@/lib/verticals/accounting/data';
import { ArrowUpRight,ClipboardCheck,LockKeyhole,ShieldCheck } from 'lucide-react';
export function generateStaticParams(){return LEDGERPOINT.services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
 const {locale,slug}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 const s=ledgerService(slug);return s?{title:s.title[locale]+' | LedgerPoint',description:s.summary[locale],robots:{index:false}}:{};
}
export default async function LedgerServiceDetail({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 const s=ledgerService(slug);if(!s)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#1C3343] text-white py-14 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8"><nav className="text-xs text-[#C1DADC]"><Link href={ledgerPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={ledgerPath(locale,'services')}>{ar?'الخدمات':'Services'}</Link> / <span className="text-[#7DE0DC]">{s.title[locale]}</span></nav><div className="mt-14 grid lg:grid-cols-[1fr_auto] gap-10 items-end"><div><p className="font-mono text-xs text-[#7DE0DC]">LEDGER SERVICE / {String(s.rank).padStart(2,'0')}</p><h1 className="ledger-display text-4xl sm:text-6xl mt-5 font-bold">{s.title[locale]}</h1><p className="mt-7 text-[#D3E3E7] text-lg leading-9 max-w-3xl">{s.summary[locale]}</p></div><Link href={ledgerPath(locale,'quote')+'?service='+s.slug} className="inline-flex items-center gap-3 bg-[#7DE0DC] text-[#1C3343] font-bold px-7 py-4 text-sm">{ar?'طلب نطاق الخدمة':'Request scope'}<ArrowUpRight size={17}/></Link></div></div></section>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.45fr_1fr] gap-12"><div><ClipboardCheck size={39} className="text-[#147C82]"/><h2 className="ledger-display text-3xl mt-5">{ar?'إيه اللي يخص الخدمة؟':'Understand the work'}</h2></div><p className="text-[#455F6C] text-lg leading-[2.1]">{s.body[locale]}</p></section>
  <section className="bg-white py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="ledger-display text-3xl sm:text-4xl">{ar?'ثلاث نقاط لازم تتأكد منها':'Three checkpoints before hiring'}</h2><div className="grid md:grid-cols-3 gap-4 mt-10">{s.checkpoints[locale].map((q,i)=><div key={i} className="p-8 border border-[#D1DCDB] bg-[#F0EEE8]"><span className="font-mono text-[#176C72]">0{i+1}</span><ShieldCheck size={26} className="text-[#147C82] mt-7"/><h3 className="mt-5 font-bold leading-8">{q}</h3></div>)}</div></div></section>
  <section className="bg-[#DDEBE7] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[auto_1fr] gap-6"><LockKeyhole size={35} className="text-[#147C82]"/><div><h2 className="text-2xl font-bold">{ar?'بيانات مالية؟ خارج النموذج العام':'Keep real accounting documents out of this form'}</h2><p className="leading-8 text-[#455F6C] mt-4">{ar?'المعلومات السابقة تثقيفية ولا تعني تقديم خدمة محاسبة مرخصة أو مراجعة مستقلة. أي حسابات أو إقرارات أو ملفات موظفين تُراجع في نظام معتمد بعد اتفاق فعلي.':'This content is educational and does not establish a qualified accountant, audit opinion or filing. Actual confidential records belong in a separately authorized professional workflow.'}</p></div></div></section>
  <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 flex gap-7 items-center justify-between flex-wrap"><h2 className="ledger-display text-3xl">{ar?'احتاج نطاق مناسب؟':'Want to specify your service needs?'}</h2><Link href={ledgerPath(locale,'quote')+'?service='+s.slug} className="inline-flex gap-2 items-center bg-[#1C3343] text-white px-8 py-4 text-sm font-bold">{ar?'جهّز استفسارًا':'Open scoped request'}<ArrowUpRight size={18}/></Link></section>
 </div>;
}
