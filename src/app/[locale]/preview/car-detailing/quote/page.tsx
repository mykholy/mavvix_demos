import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { GLOSSBAY,glossPath } from '@/lib/verticals/car-detailing/data';
import { GlossQuoteForm } from './GlossQuoteForm';
import { CarFront,ShieldCheck,Layers3 } from 'lucide-react';
export default function GlossQuotePage({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{service?:string}}){
 const ar=locale==='ar',initial=GLOSSBAY.services.some(s=>s.slug===searchParams.service)?searchParams.service:'';
 return <div className="bg-[#E7F4F9]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[.68fr_1fr] gap-12">
 <div className="lg:sticky lg:top-32 self-start"><p className="font-mono text-[#09627E] text-xs font-black tracking-widest">GLOSSBAY / VEHICLE SCOPE BUILDER</p>
  <h1 className="gloss-display text-4xl sm:text-5xl font-black mt-5 leading-tight">{ar?'كل تفصيلة تغير نطاق العناية':'A more precise car care enquiry begins here'}</h1>
  <p className="mt-6 text-[#314A5C] leading-9">{ar?'حجم السيارة ونوع السطح والإضافات وحالة الاتساخ أهم من سعر ثابت محفوظ. النموذج يجمع تفضيلاتك للتوضيح ولا يؤكد مواعيد أو أسعار مركز فعلي.':'Vehicle class, material condition and optional work matter more than a generic flat fee. Build a clear enquiry without inventing actual studio availability or a binding price.'}</p>
  <div className="space-y-4 mt-9 text-sm">{[[CarFront,ar?'أحجام واضحة، من هاتشباك إلى SUV كبيرة':'Four vehicle-size categories'],[Layers3,ar?'10 مجالات للعناية و4 إضافات محددة':'Ten service lines and four optional extras'],[ShieldCheck,ar?'موافقة واضحة وحفظ برقم مرجعي فقط':'Consented request with a saved reference only']].map(([Icon,label],i)=><div className="flex items-center gap-3" key={i}>{typeof Icon!=='string'&&<Icon size={21} className="text-[#09627E] shrink-0"/>}<span>{label as string}</span></div>)}</div>
  <Link href={glossPath(locale,'packages')} className="inline-block text-[#09627E] text-sm font-black mt-8 underline underline-offset-8">{ar?'راجع نطاق كل خدمة':'Review service descriptions'}</Link>
 </div><GlossQuoteForm locale={locale} initial={initial}/></div></div>;
}
