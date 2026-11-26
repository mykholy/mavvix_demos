import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { elyraPath } from '@/lib/verticals/skin-clinic/data';
import { CallbackForm } from './CallbackForm';
export const metadata:Metadata={robots:{index:false,follow:false},referrer:'no-referrer'};
export default async function Contact({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const ar=locale==='ar';
 return <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid gap-10 lg:grid-cols-[.7fr_1fr] lg:items-start"><div className="lg:sticky lg:top-32"><p className="text-xs tracking-widest font-bold text-[#754458]">ELYRA / ADMINISTRATIVE CONTACT</p><h1 className="mt-5 font-serif text-4xl sm:text-6xl">{ar?'طلب تواصل بسيط':'A simple callback request'}</h1><p className="mt-6 leading-9">{ar?'الاسم ورقم الهاتف والفترة المفضلة فقط. لا تحجز موعداً طبياً بهذا النموذج ولا تشارك أعراضاً أو صوراً أو تقارير.':'Name, phone and preferred callback window only. This form does not book a medical appointment; do not share symptoms, images or reports.'}</p><p className="mt-5 text-sm leading-8">{ar?'هذا تصميم من مافكس وليس مقدم رعاية. عند الطوارئ اطلب مساعدة طبية محلية عاجلة.':'This is a Mavvix concept, not a care provider. In emergencies, seek urgent local medical help.'}</p><Link href={elyraPath(locale,'privacy')} className="mt-7 inline-flex underline font-bold">{ar?'اقرأ عن خصوصية التواصل':'Read about contact privacy'}</Link></div><CallbackForm locale={locale}/></div>;
}
