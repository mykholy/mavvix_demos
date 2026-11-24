import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n/config';
import {BLOOM,bloomProgram,bloomPath} from '@/lib/verticals/nursery/data';
import {ArrowUpRight,Flower2} from 'lucide-react';
export function generateStaticParams(){return BLOOM.services.map(p=>({slug:p.slug}));}
export function generateMetadata({params:{locale,slug}}:{params:{locale:Locale;slug:string}}):Metadata{
 const p=bloomProgram(slug);return p?{title:p.title[locale]+' | BloomSteps',description:p.summary[locale],robots:{index:false,follow:false}}:{};
}
export default function Program({params:{locale,slug}}:{params:{locale:Locale;slug:string}}){
 const p=bloomProgram(slug);if(!p)notFound();const ar=locale==='ar';
 return <div><section className="bg-[#F5C04E] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8"><Link href={bloomPath(locale,p.category==='age'?'age-groups':'curriculum')} className="text-sm underline">{ar?'رجوع للبرامج':'Back to programmes'}</Link><Flower2 size={45} className="mt-10"/><h1 className="bloom-display text-4xl sm:text-6xl mt-5">{p.title[locale]}</h1><p className="mt-6 max-w-3xl text-lg leading-9">{p.summary[locale]}</p></div></section><section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-[.5fr_1fr] gap-10"><h2 className="bloom-display text-3xl">{ar?'كيف نفكر في النشاط؟':'What this activity can involve'}</h2><p className="text-base leading-[2.1]">{p.body[locale]}</p></section><section className="bg-[#E9F4ED] py-16"><div className="max-w-6xl mx-auto px-5 sm:px-8"><h2 className="bloom-display text-3xl">{ar?'قبل التسجيل اسأل عن التفاصيل':'Questions to discuss with a real provider'}</h2><div className="grid md:grid-cols-3 gap-4 mt-8">{[ar?'ما الفئة العمرية والحدود التي يسمح بها الترخيص؟':'What age range and scope does the licence permit?',ar?'كيف يُشرف على الخامات والانتقال بين الأنشطة؟':'How are materials and activity transitions supervised?',ar?'كيف يتم التواصل مع الأسرة ومراجعة الاحتياجات؟':'How does the team communicate with families?'].map(q=><div key={q} className="bg-white rounded-2xl p-6 font-bold leading-8">{q}</div>)}</div><Link className="inline-flex gap-2 bg-[#145960] text-white rounded-full px-7 py-4 font-bold text-sm mt-9" href={bloomPath(locale,'admissions')+'?program='+p.slug}>{ar?'استفسر عن هذه الفكرة':'Explore this programme enquiry'}<ArrowUpRight size={17}/></Link></div></section></div>;
}
