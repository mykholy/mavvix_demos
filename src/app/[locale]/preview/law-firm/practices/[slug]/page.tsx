import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { LEXORA,lexoraPath,lexoraService } from '@/lib/verticals/law-firm/data';
import { ArrowUpRight,Scale,ShieldCheck,LockKeyhole,CheckCircle2 } from 'lucide-react';
export function generateStaticParams(){return LEXORA.services.map(s=>({slug:s.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const s=lexoraService(slug);return s?{title:s.title[locale]+' | Lexora Counsel',description:s.summary[locale],robots:{index:false}}:{};
}
export default function LexoraPracticeDetail({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const s=lexoraService(slug);if(!s)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#251D34] text-white py-12 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <nav className="text-xs text-[#D5BDD3]"><Link href={lexoraPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / <Link href={lexoraPath(locale,'practices')}>{ar?'المجالات':'Practice areas'}</Link> / <span className="text-[#E4CA91]">{s.title[locale]}</span></nav>
   <div className="grid lg:grid-cols-[1fr_.4fr] gap-12 items-end mt-14"><div><p className="font-mono text-[#E4CA91] text-xs tracking-widest">LEGAL PRACTICE / {String(s.rank).padStart(2,'0')}</p><h1 className="lexora-display text-4xl sm:text-6xl font-semibold mt-6">{s.title[locale]}</h1><p className="text-[#E9DFEA] mt-7 max-w-4xl leading-9 text-lg">{s.summary[locale]}</p></div><Link href={lexoraPath(locale,'consultation')+'?practice='+s.slug} className="inline-flex gap-3 items-center bg-[#E4CA91] text-[#251D34] px-7 py-4 font-bold text-sm w-fit">{ar?'استفسار عن المجال':'Request general information'}<ArrowUpRight size={17}/></Link></div>
  </div></section>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[.5fr_1fr] gap-12"><div><Scale size={37} className="text-[#84662F]" strokeWidth={1.3}/><h2 className="lexora-display text-3xl sm:text-4xl mt-5">{ar?'فهم نطاق الخدمة':'What the service entails'}</h2></div><p className="text-base sm:text-lg text-[#584C60] leading-[2.1]">{s.body[locale]}</p></section>
  <section className="bg-white py-16 sm:py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><h2 className="lexora-display text-3xl sm:text-4xl">{ar?'ما الذي يُراجع في تواصل مهني حقيقي؟':'Three responsible boundaries for a real engagement'}</h2><div className="grid md:grid-cols-3 gap-4 mt-9">{s.reviewPoints[locale].map((p,i)=><div key={i} className="p-7 sm:p-9 bg-[#FAF7F1] border border-[#E3D6C6]"><span className="font-mono text-[#84662F]">0{i+1}</span><CheckCircle2 size={27} className="text-[#84662F] mt-6"/><h3 className="font-bold leading-8 mt-4">{p}</h3></div>)}</div></div></section>
  <section className="bg-[#ECE4D6] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[auto_1fr] gap-6 items-start"><LockKeyhole size={33} className="text-[#84662F]"/><div><h2 className="text-2xl font-bold">{ar?'لا ترسل وقائع أو ملفات قضايا في هذا النموذج':'No confidential case facts in this request'}</h2><p className="mt-4 text-sm leading-9 text-[#584C60] max-w-4xl">{ar?'الشرح توعوي، وليس رأيًا قانونيًا في حالة بعينها أو قبولًا للتوكيل. قد تختلف متطلبات الدولة والموضوع ويجب مراجعتها مع محامٍ مختص مرخص.':'This is educational service content, not jurisdiction-specific legal advice, engagement acceptance or counsel. A real qualified professional must establish scope and confidentiality before reviewing documents.'}</p></div></div></section>
  <section className="py-16 max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap justify-between gap-7 items-center"><h2 className="lexora-display text-3xl max-w-xl">{ar?'سؤال عام عن المجال؟':'Need to clarify which practice applies?'}</h2><Link href={lexoraPath(locale,'consultation')+'?practice='+s.slug} className="bg-[#251D34] text-white px-8 py-4 text-sm font-bold inline-flex gap-2 items-center">{ar?'جهّز استفسارك':'Open the minimal enquiry'}<ArrowUpRight size={17}/></Link></section>
  </div>;
}
