import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE,oakPath } from '@/lib/verticals/furniture/data';
import { OaklineQuoteBuilder } from './OaklineQuoteBuilder';
import { Armchair,Ruler,CheckCircle2,ShieldCheck } from 'lucide-react';
export default function OaklineQuote({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{product?:string}}){
 const ar=locale==='ar';const selected=OAKLINE.services.some(p=>p.slug===searchParams.product)?searchParams.product:'';
 return <div className="bg-[#F5EFE6]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[.7fr_1.2fr] gap-10 lg:gap-14 items-start"><div className="lg:sticky lg:top-32">
  <span className="text-xs font-black tracking-widest text-[#7B5937]">OAKLINE / CUSTOM FURNITURE BRIEF</span><h1 className="oakline-display text-4xl sm:text-6xl leading-tight mt-6">{ar?'تفاصيل كل قطعة... في طلب واحد':'ONE REQUEST. EVERY PIECE CONSIDERED.'}</h1>
  <p className="mt-7 leading-9 text-[#66513B]">{ar?'اختار قطعًا مختلفة بالأبعاد والخامة والتشطيب، وشوفهم مع بعض قبل إرسال الطلب. لا توجد أسعار ولا مخزون ولا أمر شراء فعلي؛ الأبعاد تحتاج مراجعة المصنع الحقيقي.':'Build a multi-piece specification basket using product-specific dimension ranges, material/finish choices and quantities. This is an illustrative request rather than checkout, a binding quote or actual inventory.'}</p>
  <div className="mt-9 border-y border-[#C9B7A2] py-7 space-y-5">{[[Armchair,ar?'اختيارات بحسب الغرفة':'Room-based products'],[Ruler,ar?'مقاسات مبدئية بالملليمتر':'Indicative dimensions in millimetres'],[ShieldCheck,ar?'مراجعة الخامات والأسعار من مشغّل حقيقي':'Real maker confirms materials and prices']].map(([Icon,title],i)=><div key={i} className="flex gap-3 items-center text-[#513D2A] text-sm font-bold">{typeof Icon!=='string'&&<Icon size={21} className="text-[#8C6844] shrink-0"/>}{title as string}</div>)}</div><Link href={oakPath(locale,'collections')} className="mt-8 underline underline-offset-8 inline-flex font-bold text-sm">{ar?'راجع القطع الأول':'Explore all pieces first'}</Link>
 </div><OaklineQuoteBuilder locale={locale} initialProduct={selected}/></div></div>;
}
