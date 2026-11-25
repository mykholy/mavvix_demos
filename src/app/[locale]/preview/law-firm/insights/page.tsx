import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LEXORA,lexoraPath,lexoraText } from '@/lib/verticals/law-firm/data';
import { BookOpen,ArrowUpRight,ShieldCheck } from 'lucide-react';
export default async function LexoraInsights(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 return <div className="bg-[#FAF7F1] max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><p className="font-bold text-xs uppercase tracking-widest text-[#84662F]">LEXORA / EDITORIAL NOTES</p><h1 className="lexora-display text-4xl sm:text-6xl mt-7">{ar?'معلومات مفيدة قبل مشاركة تفاصيلك':'Think clearly before sharing a legal matter'}</h1><p className="mt-6 leading-9 text-[#584C60] max-w-3xl">{ar?'ثلاث مقالات مستقلة عن حدود التواصل والعقود التجارية والحوكمة المبكرة. لا يتم تقديم إرشادات قانونية خاصة أو مواعيد منصوص عليها دون مراجعة دولة محددة.':'Three authored pieces about safe legal intake, contract scope and early-stage governance, written to educate without suggesting live legal advice or deadlines.'}</p>
  <div className="grid lg:grid-cols-3 gap-5 mt-12">{LEXORA.articles.map((article,i)=><Link href={lexoraPath(locale,'insights/'+article.slug)} key={article.slug} className="bg-white border border-[#DDCFBE] p-8 flex flex-col min-h-[350px] hover:bg-[#F0E7D8] transition-colors"><div className="flex justify-between text-[#84662F]"><BookOpen size={30}/><span className="font-mono text-xs">FILE / 0{i+1}</span></div><h2 className="lexora-display text-2xl sm:text-3xl mt-10">{lexoraText(article.title,locale)}</h2><p className="text-sm mt-5 leading-8 text-[#584C60]">{lexoraText(article.summary,locale)}</p><span className="mt-auto pt-7 font-bold text-sm inline-flex gap-2">{ar?'اقرأ المقال':'Read insight'}<ArrowUpRight size={16}/></span></Link>)}</div>
  <section className="bg-[#251D34] text-white mt-14 p-8 sm:p-12"><ShieldCheck size={34} className="text-[#E4CA91]"/><h2 className="lexora-display text-3xl mt-6">{ar?'المعلومة الأولية لا تصنع محاميًا':'Context is not representation'}</h2><p className="mt-4 leading-9 text-[#E9DFEA]">{ar?'لا تخاطر بمهلة قانونية اعتمادًا على مقال أو رسالة لم يتم تأكيدها من مختص.':'Do not risk a legal deadline because an example website displayed an article or unconfirmed enquiry.'}</p></section>
 </div>;
}
