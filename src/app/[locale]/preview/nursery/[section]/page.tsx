import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n/config';
import {BLOOM,BLOOM_PHOTOS,bloomPath} from '@/lib/verticals/nursery/data';
import {ArrowUpRight,Flower2,ShieldCheck,BookOpen} from 'lucide-react';
const sections=['age-groups','curriculum','daily-routine','safety','gallery','journal','about','process','contact','faq'] as const;
type Topic=typeof sections[number];
const titles:Record<Topic,{ar:string;en:string}>={
 'age-groups':{ar:'خطوة مناسبة لكل مرحلة عمرية',en:'A starting point for each age band'},
 curriculum:{ar:'أفكار للتعلم من خلال اللعب',en:'Explore learning through play'},
 'daily-routine':{ar:'يوم له إيقاع مفهوم',en:'A thoughtful daily rhythm'},
 safety:{ar:'أسئلة الأمان وحماية الأطفال',en:'Safeguarding questions for families'},
 gallery:{ar:'خامات وبيئات تعليمية حقيقية',en:'Real educational material references'},
 journal:{ar:'دليل الأسرة قبل التسجيل',en:'The family journal'},
 about:{ar:'فكرة BloomSteps من مافكس',en:'The BloomSteps design story'},
 process:{ar:'من الاستفسار لزيارة الحضانة',en:'From enquiry to an actual nursery tour'},
 contact:{ar:'صمم موقع حضانتك الحقيقي',en:'Create a website for your nursery'},
 faq:{ar:'أسئلة الأسرة قبل الزيارة',en:'Family questions before a visit'}
};
export function generateStaticParams(){return sections.map(section=>({section}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;section:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 const t=titles[section as Topic];return t?{title:t[locale]+' | BloomSteps',description:locale==='ar'?'دليل تعليمي ومعلومات للأهل ضمن تجربة موقع حضانة من مافكس، دون ادعاء قبول فعلي.':'Early-years guidance and family enquiry experience by Mavvix; no real nursery enrollment.',robots:{index:false,follow:false}}:{};
}
const safety=[
 {ar:'الترخيص والسياسة المكتوبة',en:'Licence and written policies',descAr:'اطلب الاطلاع على المستندات الرسمية ونطاق الأعمار الذي يسمح به الترخيص، ولا تكتف بصورة أو شعار.',descEn:'Ask to see the actual licence and approved age scope, not just a badge or photograph.'},
 {ar:'الاستلام المصرح به',en:'Authorized collection',descAr:'اعرف كيف يتحقق المشغل من هوية الأشخاص المصرح لهم بالاستلام وكيف يحدث القائمة بطريقة آمنة.',descEn:'Ask how approved collection contacts are verified and how the list is updated safely.'},
 {ar:'الإشراف والنظافة',en:'Supervision and hygiene',descAr:'راجع أعداد العاملين الفعلية وتغطية غيابهم وإجراءات تنظيف الأدوات واختيار خامات ملائمة للعمر.',descEn:'Review actual staffing, absence coverage, cleaning routines and age-appropriate materials.'},
 {ar:'الطوارئ والخصوصية',en:'Emergencies and privacy',descAr:'اطلب شرح إجراءات الطوارئ والموافقة على التصوير وكيفية الاحتفاظ بالمعلومات الخاصة للطفل.',descEn:'Ask about emergency procedures, photo permissions and secure handling of private child records.'}
];
export default async function BloomSection(props:{params: Promise<{locale:Locale;section:string}>}) {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 if(!sections.includes(section as Topic))notFound();const topic=section as Topic,ar=locale==='ar';
 return <div><section className="bg-[#E9F4ED] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8"><nav className="text-xs mb-8"><Link className="underline" href={bloomPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {titles[topic][locale]}</nav><p className="text-xs tracking-widest font-bold uppercase">BLOOMSTEPS / {topic.replaceAll('-',' ')}</p><h1 className="bloom-display text-4xl sm:text-6xl mt-6 max-w-4xl leading-tight">{titles[topic][locale]}</h1><p className="mt-6 max-w-3xl leading-8 text-sm">{ar?'محتوى توضيحي لتجربة موقع حضانة، لا يمثل منشأة أو اعتمادًا أو مواعيد فعلية.':'Editorial nursery website content, not an operating facility, accreditation or live appointment calendar.'}</p></div></section>
 {(topic==='age-groups'||topic==='curriculum')&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><p className="max-w-3xl leading-9">{topic==='age-groups'?(ar?'قارن الفئات العمرية قبل طلب زيارة. السن الفعلي للقبول يحتاج قرار المشغل وترخيصه.':'Compare illustrative age bands before a visit; actual eligibility is an operator decision.'):(ar?'أنشطة تعليمية متنوعة تراعي الإشراف والاختيار وإيقاع الطفل، وليس منهجًا معتمدًا.':'Explore learning activities that allow choice and supervision, without claiming accredited provision.')}</p><div className="mt-10 grid md:grid-cols-2 gap-5">{BLOOM.services.filter(p=>p.category===(topic==='age-groups'?'age':'curriculum')).map(p=><article key={p.slug} className="bg-white rounded-3xl p-8 border border-[#D6E4D6]"><p className="text-xs font-bold text-[#8F412A]">{p.ageBand==='all'?(ar?'نشاط تعليمي':'Learning activity'):p.ageBand+' '+(ar?'سنوات':'years')}</p><h2 className="text-2xl font-extrabold mt-5">{p.title[locale]}</h2><p className="mt-5 text-sm leading-8">{p.body[locale]}</p><Link href={bloomPath(locale,'programs/'+p.slug)} className="mt-7 inline-flex gap-2 font-bold text-sm underline">{ar?'تفاصيل النشاط':'Explore programme'}<ArrowUpRight size={16}/></Link></article>)}</div></section>}
 {topic==='daily-routine'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><p className="max-w-3xl leading-9">{ar?'هذه مراحل يوم توضيحية وليست جدول ساعات أو تغطية مؤكدة. يجب أن يوضح المشغل طريقة الانتقال بين الأنشطة والراحة والطعام والتواصل.':'A sample rhythm, not operating hours or confirmed care coverage. The real nursery should explain transitions, rest, meals and family communication.'}</p><div className="mt-10 grid gap-4">{BLOOM.routine.map((r,i)=><article key={r.en} className="bg-white rounded-3xl p-8 grid sm:grid-cols-[75px_.7fr_1fr] items-start gap-5"><span className="text-4xl bloom-display">0{i+1}</span><h2 className="text-xl font-extrabold">{r[locale]}</h2><p className="leading-8 text-sm">{ar?r.descAr:r.descEn}</p></article>)}</div></section>}
 {topic==='safety'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><ShieldCheck size={40}/><p className="mt-5 max-w-4xl leading-9">{ar?'قائمة أسئلة للتحقق من الحضانة الحقيقية، لا ادعاء تطبيق إجراءات سلامة أو اعتماد لدينا. لا تدخل بيانات الطفل الخاصة في نموذج الاستفسار.':'A verification checklist for the real operator, not a claim of compliance. Do not share private child data in this example form.'}</p><div className="grid md:grid-cols-2 gap-5 mt-10">{safety.map(t=><article key={t.en} className="rounded-3xl bg-white border border-[#D6E4D6] p-8"><h2 className="font-extrabold text-2xl">{t[locale]}</h2><p className="mt-5 leading-8 text-sm">{ar?t.descAr:t.descEn}</p></article>)}</div></section>}
 {topic==='gallery'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><p className="max-w-3xl leading-9">{ar?'صور حقيقية لخامات تعليمية من مصادر مرخصة، وليست صور حضانة أو أطفال تابعين للموقع.':'Genuine licensed photographs of educational materials, not images of a BloomSteps facility or its children.'}</p><div className="grid md:grid-cols-2 gap-6 mt-10">{BLOOM_PHOTOS.map(p=><figure key={p.src} className="bg-white rounded-3xl overflow-hidden border border-[#D6E4D6]"><img src={p.src} alt={p[locale]} className="h-[300px] sm:h-[440px] w-full object-cover" loading="lazy"/><figcaption className="p-6 text-sm leading-7"><p className="font-bold">{p[locale]}</p><a href={p.source} className="underline">{p.author} · {ar?'المصدر':'Source'}</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline">{p.license}</a> · {ar?'عرض بقص بصري':'Display crop'}</figcaption></figure>)}</div></section>}
 {topic==='journal'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><div className="grid md:grid-cols-3 gap-5">{BLOOM.articles.map(a=><Link key={a.slug} href={bloomPath(locale,'journal/'+a.slug)} className="bg-white rounded-3xl p-8 border border-[#D6E4D6]"><BookOpen size={28}/><h2 className="font-extrabold text-2xl mt-6">{a.title[locale]}</h2><p className="mt-5 text-sm leading-8">{a.summary[locale]}</p><span className="inline-flex gap-2 mt-7 font-bold underline text-sm">{ar?'اقرأ':'Read guide'}<ArrowUpRight size={16}/></span></Link>)}</div></section>}
 {topic==='faq'&&<section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 space-y-4">{BLOOM.faq.map(f=><details key={f.q.en} className="bg-white rounded-2xl border border-[#D6E4D6] p-7"><summary className="font-bold cursor-pointer">{f.q[locale]}</summary><p className="mt-5 leading-8 text-sm">{f.a[locale]}</p></details>)}</section>}
 {topic==='about'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10"><div><Flower2 size={48}/><h2 className="bloom-display text-4xl mt-6">{ar?'هوية تعليمية، وموقع يعمل بالفعل':'An editorial identity with a working enquiry flow'}</h2></div><div className="space-y-5 leading-9"><p>{ar?'BloomSteps اسم ابتكرته Mavvix لتوضيح تجربة موقع متخصصة في التعليم المبكر، وليس حضانة موجودة أو معلمين حقيقيين.':'BloomSteps is an illustrative Mavvix early-years website identity, not an operating nursery or real staff roster.'}</p><p>{ar?'تنفيذ عميل فعلي يحتاج ترخيصه المعتمد والفئات العمرية والأسعار وسياسة حماية الأطفال وصور المكان بموافقات واضحة.':'A real commissioned implementation requires the operator’s licence, approved ages and fees, safeguarding policies and consented facility imagery.'}</p></div></section>}
 {topic==='process'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><div className="grid md:grid-cols-3 gap-5">{[[ar?'حدد الفئة العمرية':'Choose age band',ar?'من غير اسم أو تاريخ ميلاد الطفل.':'Without the child’s name or date of birth.'],[ar?'طلب استفسار محفوظ':'Save an enquiry',ar?'تفضيل موعد وبيانات ولي الأمر بموافقة واضحة.':'Preferred timing and guardian contact with consent.'],[ar?'مراجعة المشغل الفعلي':'Actual operator review',ar?'الزيارة والمستندات والقبول يحددها مشغل حقيقي.':'Real tour, documents and admission require an actual operator.']].map(([title,body],i)=><article key={title} className="bg-white rounded-3xl border border-[#D6E4D6] p-8"><p className="bloom-display text-4xl">0{i+1}</p><h2 className="font-bold text-2xl mt-6">{title}</h2><p className="leading-8 text-sm mt-5">{body}</p></article>)}</div></section>}
 {topic==='contact'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10"><div><h2 className="bloom-display text-4xl">{ar?'موقع خاص بحضانتك، مش قالب مكرر':'A distinct website for your nursery'}</h2><p className="mt-5 leading-9">{ar?'تحدث مع مافكس عن المحتوى المعتمد والفئات العمرية والروتين وسياسة الخصوصية ونظام الطلبات. هذا ليس رقم حضانة فعلية.':'Discuss approved programme copy, age groups, routines, privacy policies and enquiry management with Mavvix.'}</p></div><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} className="bg-[#145960] text-white rounded-3xl p-8 font-extrabold text-xl flex items-center justify-between">{ar?'تواصل مع فريق مافكس':'Discuss your website'}<ArrowUpRight/></a></section>}
 <section className="py-16 bg-[#F5C04E]"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap gap-6 items-center justify-between"><h2 className="bloom-display text-3xl">{ar?'جهّز طلب زيارة بدون بيانات الطفل':'Prepare a privacy-conscious visit enquiry'}</h2><Link className="bg-[#145960] text-white rounded-full px-7 py-4 font-bold text-sm inline-flex gap-2" href={bloomPath(locale,'admissions')}>{ar?'ابدأ النموذج':'Open visit enquiry'}<ArrowUpRight size={16}/></Link></div></section>
 </div>;
}
