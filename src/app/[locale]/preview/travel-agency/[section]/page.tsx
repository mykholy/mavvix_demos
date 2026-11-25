import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, Compass, BookOpen, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { NOMAD_ROUTES, nomadPath } from '@/lib/verticals/travel-agency/data';
const topics={
 destinations:['الوجهات','Destinations'],
 journeys:['برامج الرحلات','Journey catalogue'],
 'travel-styles':['أنماط السفر','Travel styles'],
 planning:['تخطيط رحلة واقعية','Plan a realistic trip'],
 inclusions:['المشمول والمستثنى','Inclusions and exclusions'],
 guides:['دليل السفر','Field notes'],
 faq:['الأسئلة الشائعة','Frequently asked questions'],
 about:['عن نوماد روتس','About Nomad Routes']
} as const;
type Topic=keyof typeof topics;
export function generateStaticParams(){return Object.keys(topics).map(section=>({section}));}
type Params={locale:string;section:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale,section}=await params;if(locale!=='ar'&&locale!=='en')notFound();const t=topics[section as Topic];if(!t)notFound();
 return {title:t[locale==='ar'?0:1]+' | Nomad Routes',description:locale==='ar'?'دليل رحلة تحريري من مافكس دون حجز فعلي.':'Editorial travel planning by Mavvix; no live booking.',robots:{index:false,follow:false}};
}
export default async function NomadSection({params,searchParams}:{params:Promise<Params>;searchParams:Promise<{category?:string|string[]}>}){
 const {locale,section}=await params;if(locale!=='ar'&&locale!=='en')notFound();const title=topics[section as Topic];if(!title)notFound();const ar=locale==='ar',d=NOMAD_ROUTES;
 const q=await searchParams;
 const categories=[['all','كل الرحلات','All'],['heritage','تراث','Heritage'],['culture','ثقافة','Culture'],['coast','ساحل','Coast'],['city','مدن','City'],['custom','خاصة','Custom']];
 const active=categories.some(([id])=>id===q.category)?q.category:'all';
 const selected=d.services.filter(s=>active==='all'||s.category===active);
 const intro:Record<Topic,{ar:string;en:string}>={
 destinations:{ar:'ابدأ بالدولة والمدينة قبل اختيار الزيارات. لا نعرض رحلات متاحة للحجز، بل أفكار مسارات تحتاج تأكيد مشغل مرخص.',en:'Start with the country and city before choosing activities. These editorial routes require confirmation from a licensed operator.'},
 journeys:{ar:'ثمانية مسارات متخصصة، مع المدة والوتيرة والمواقع المقترحة. اختر فئة أو افتح التفاصيل.',en:'Eight editorial routes with suggested duration, rhythm and stops. Filter by category or open a dossier.'},
 'travel-styles':{ar:'اختيار الوتيرة جزء من تخطيط الرحلة، وليس كل نشاط مناسبًا لكل مجموعة.',en:'Choose a rhythm around your group, rather than assuming every experience fits everyone.'},
 planning:{ar:'الرحلة تتكون من أيام انتقال وإقامة واستكشاف وراحة. اتفق على التكاليف والبدائل قبل الدفع.',en:'A journey needs realistic transfers, stays, exploration and rest. Agree the scope and alternatives before paying.'},
 inclusions:{ar:'اسأل عن بنود محددة بدل المقارنة بين أسعار لا تشمل الخدمات نفسها.',en:'Compare like-for-like scope rather than headline prices with different inclusions.'},
 guides:{ar:'محتوى أصلي يساعدك على تقييم عرض سفر حقيقي قبل الاتفاق.',en:'Original planning guides to evaluate a real travel offer before committing.'},
 faq:{ar:'إجابات واضحة عن طبيعة الموقع والبيانات والحجوزات.',en:'Clear answers about data, reservations and the scope of this concept.'},
 about:{ar:'نوماد روتس هو تصميم مستقل من مافكس لقطاع السياحة، وليس شركة سفر أو منصة إصدار تذاكر.',en:'Nomad Routes is an independent travel-industry website concept by Mavvix, not a travel agency or ticket seller.'}
 };
 const link='inline-flex min-h-11 items-center gap-3 bg-[#18352E] px-6 py-3 text-sm font-bold text-white';
 const card='border border-[#CBBB9E] bg-[#FFF9F0] p-7';
 const rows:Record<string,Array<[string,string,string,string]>>={
 'travel-styles':[['هادئة','Slow','أيام أقل ازدحامًا ووقت للراحة والوجبات.','Fewer scheduled activities, time for meals and rest.'],['متوازنة','Balanced','مواقع واضحة في كل يوم ونوافذ للاستكشاف.','Defined stops with room for discovery.'],['نشطة','Active','مزيد من الزيارات بعد مراجعة القدرة البدنية والطقس والمسافات.','More visits after reviewing fitness, weather and distances.'],['خاصة','Tailor-made','اتفق على أولويات الأسرة أو المجموعة قبل تثبيت أي برنامج.','Agree the group’s priorities before finalizing an itinerary.']],
 planning:[['حدد نقطة الوصول','Arrival','تأكد من نقطة الوصول وتسجيل الدخول والانتقال الأول.','Confirm arrival point, check-in and first transfer.'],['قسّم المواقع القريبة','Group nearby stops','ضع الأنشطة المتقاربة في نفس اليوم وراجع المسافات.','Group nearby activities and review journey times.'],['اترك بدائل','Plan alternatives','خصص وقتًا للطقس أو إغلاق موقع أو راحة غير متوقعة.','Allow room for weather, site closure or unexpected rest.'],['اطلب عرضًا مكتوبًا','Request written scope','اتفق على المشمول والتكلفة وسياسة التعديل والإلغاء.','Agree inclusions, costs, change and cancellation policies.']],
 inclusions:[['الإقامة','Accommodation','عدد الليالي ونوع الغرفة والوجبات وسياسة الدخول والخروج.','Nights, room type, meals, check-in and check-out policy.'],['الانتقالات','Transfers','نقاط الالتقاء ونوع المركبة والمسافة والأمتعة.','Meeting points, vehicle type, distances and baggage.'],['التذاكر والمرشد','Tickets and guides','المواقع المحددة والرسوم والمرشد المرخص والأنشطة الاختيارية.','Specific sites, admission, licensed guides and optional activities.'],['الرسوم والتغيير','Fees and changes','رسوم التأشيرة والتأمين والمصروفات الشخصية والاسترداد تُراجع منفصلة.','Review visa fees, insurance, personal expenses and refunds separately.']],
 about:[['هوية مستقلة','Independent identity','محتوى وصور تحريرية لا تُنسب إلى عملاء أو شركة سياحة قائمة.','Editorial content and photographs do not represent real clients or an operating agency.'],['بيانات أقل','Minimal data','طلبات التخطيط تستخدم معلومات تواصل عامة وتفضيلات فقط.','Planning enquiries use basic contact details and travel preferences only.'],['تشغيل حقيقي','Real operation','يتطلب بيانات شركة مرخصة وخدمات ومواعيد وشروط معتمدة قبل النشر.','Live operation requires a licensed company, verified services, availability and approved terms.']]
 };
 return <div><section className="bg-[#18352E] px-5 py-16 text-[#FFF9F0] sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><nav aria-label={ar?'مسار الصفحة':'Breadcrumb'} className="text-xs text-[#E0AB6A]"><Link href={nomadPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {title[ar?0:1]}</nav><p className="mt-10 text-xs font-bold tracking-[.2em] text-[#E0AB6A]">NOMAD ROUTES / {section.toUpperCase()}</p><h1 className="mt-5 max-w-4xl font-serif text-4xl sm:text-7xl">{title[ar?0:1]}</h1><p className="mt-7 max-w-3xl leading-9 text-[#E2E7DF]">{intro[section as Topic][locale]}</p></div></section>
 <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
 {section==='journeys'?<><nav className="flex flex-wrap gap-2" aria-label={ar?'تصفية الرحلات':'Filter journeys'}>{categories.map(([id,a,e])=><Link key={id} aria-current={active===id?'page':undefined} href={nomadPath(locale,'journeys')+(id==='all'?'':'?category='+id)} className={'min-h-11 border px-4 py-3 text-xs font-bold '+(active===id?'border-[#18352E] bg-[#18352E] text-white':'border-[#CBBB9E]')}>{ar?a:e}</Link>)}</nav><div className="mt-9 grid gap-5 md:grid-cols-2">{selected.map(j=><Link className={card+' block'} key={j.slug} href={nomadPath(locale,'journeys/'+j.slug)}><p className="flex justify-between text-xs font-bold text-[#944129]">{j.category.toUpperCase()} <span>{j.days===null?(ar?'مرنة':'Flexible'):j.days+(ar?' أيام':' days')}</span></p><h2 className="mt-6 font-serif text-3xl">{j.title[locale]}</h2><p className="mt-4 leading-8 text-sm">{j.summary[locale]}</p><ArrowUpRight className="mt-6" size={20}/></Link>)}</div></>
 :section==='destinations'?<div className="grid gap-6 md:grid-cols-2">{[['egypt','مصر','Egypt'],['saudi-arabia','السعودية','Saudi Arabia']].map(([country,a,e])=><article className={card} key={country}><MapPin className="text-[#944129]" size={34}/><h2 className="mt-5 font-serif text-4xl">{ar?a:e}</h2><div className="mt-7 space-y-5">{d.services.filter(j=>j.slug!=='tailor-made-journey'&&(['riyadh-city-break','jeddah-coast'].includes(j.slug)===(country==='saudi-arabia'))).map(j=><Link key={j.slug} href={nomadPath(locale,'journeys/'+j.slug)} className="flex justify-between gap-3 border-b border-[#CBBB9E] pb-4 font-bold text-sm">{j.title[locale]}<ArrowUpRight size={18}/></Link>)}</div></article>)}</div>
 :section==='guides'?<div className="grid gap-5 md:grid-cols-3">{d.articles.map(a=><Link key={a.slug} href={nomadPath(locale,'guides/'+a.slug)} className={card}><BookOpen size={28} className="text-[#944129]"/><h2 className="mt-6 font-serif text-3xl">{a.title[locale]}</h2><p className="mt-5 text-sm leading-8">{a.summary[locale]}</p><ArrowUpRight size={18} className="mt-6"/></Link>)}</div>
 :section==='faq'?<div className="max-w-3xl">{d.faq.map(f=><details key={f.question.en} className="border-b border-[#CBBB9E] py-6"><summary className="cursor-pointer font-bold">{f.question[locale]}</summary><p className="mt-5 leading-8">{f.answer[locale]}</p></details>)}</div>
 :<div className="grid gap-5 md:grid-cols-2">{rows[section]?.map(([a,e,ad,ed],i)=><article className={card} key={e}><p className="font-mono text-[#944129]">0{i+1}</p><h2 className="mt-6 font-serif text-3xl">{ar?a:e}</h2><p className="mt-5 leading-8 text-[#3D5249]">{ar?ad:ed}</p></article>)}</div>}
 <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-[#CBBB9E] pt-8"><p className="font-serif text-2xl">{ar?'عايز تخطط رحلة بمتطلباتك؟':'Ready to shape your own route?'}</p><Link className={link} href={nomadPath(locale,'quote')}>{ar?'استفسار التخطيط':'Plan an enquiry'}<ArrowUpRight size={18}/></Link></div>
 </section></div>;
}
