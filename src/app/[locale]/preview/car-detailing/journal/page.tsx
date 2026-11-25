import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { GLOSSBAY,glossPath,glossText } from '@/lib/verticals/car-detailing/data';
import { BookOpen,ArrowUpRight,ScanSearch } from 'lucide-react';
export default async function GlossJournal(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
  <p className="text-[#09627E] font-mono tracking-widest text-xs font-black">THE DETAILER'S JOURNAL</p><h1 className="gloss-display text-4xl sm:text-6xl font-black mt-5">{ar?'معلومة موثوقة بدل وعود اللمعة السريعة':'Real decisions behind a better finish'}</h1><p className="mt-6 max-w-3xl leading-9 text-[#314A5C]">{ar?'ثلاثة أدلة متخصصة توضح فرق الحماية عن التنظيف، وحدود تلميع الطلاء، وكيف تجهز مواصفات السيارة قبل أي زيارة.':'Three detailed industry articles about coating versus film, proper service preparation, and the limits of surface correction.'}</p>
  <div className="grid lg:grid-cols-3 gap-4 mt-12">{GLOSSBAY.articles.map((a,i)=><Link href={glossPath(locale,'journal/'+a.slug)} key={a.slug} className="bg-white border border-[#C7DDE7] p-8 min-h-[340px] flex flex-col hover:bg-[#E5F2F8] transition-colors"><BookOpen size={32} className="text-[#09627E]"/><span className="font-mono text-xs text-[#09627E] mt-9">GLOSSBAY NOTE / 0{i+1}</span><h2 className="font-black text-xl leading-8 mt-4">{glossText(a.title,locale)}</h2><p className="text-[#314A5C] leading-8 text-sm mt-5">{glossText(a.summary,locale)}</p><span className="text-[#09627E] font-black text-sm mt-auto pt-6 inline-flex items-center gap-2">{ar?'اقرأ المقال':'Read the full note'}<ArrowUpRight size={17}/></span></Link>)}</div>
  <div className="mt-14 bg-[#0D1626] text-white p-8 sm:p-12"><ScanSearch className="text-[#4CCBF4]" size={32}/><h2 className="gloss-display text-3xl mt-6 font-black">{ar?'اسأل عن الحالة قبل السعر':'Scope the vehicle before quoting'}</h2><p className="mt-4 leading-9 text-[#C4DEE9] text-sm">{ar?'التلميع والحماية والإضافات تعتمد على الحالة الفعلية، مش الصورة فقط.':'Treatment recommendations and exclusions depend on the actual inspected condition.'}</p><Link href={glossPath(locale,'quote')} className="inline-flex mt-7 bg-[#4CCBF4] text-[#0D1626] px-6 py-4 font-black text-sm">{ar?'جهز طلبك':'Build the enquiry'}</Link></div>
  </div>;
}
