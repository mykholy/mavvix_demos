import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { FORMA, FORMA_IMAGES, formaPath, formaText } from '@/lib/verticals/interiors-kitchens/data';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { LayoutStudio } from './LayoutStudio';

export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{
 const {locale}=await params;const ar=locale==='ar';
 const title=ar?'Forma Atelier | مطابخ وديكور حسب المساحة — تصميم من مافكس':'Forma Atelier | Bespoke kitchen & interior website by Mavvix';
 const description=ar?'استكشف تخطيطات المطابخ والخامات وابدأ ملف استشارة تصميم مبدئي.':'Explore kitchen layouts, finishes and an interactive preliminary design brief.';
 return {title,description,robots:{index:false,follow:false},openGraph:{title,description,type:'website',images:[FORMA_IMAGES.hero]}};
}

export default async function FormaHome({params}:{params:Promise<{locale:Locale}>}){
 const {locale}=await params;const ar=locale==='ar';const Arrow=ar?ArrowLeft:ArrowRight;
 const t=(a:string,e:string)=>ar?a:e;
 const wrap='max-w-[1440px] mx-auto px-5 sm:px-10 xl:px-16';
 const heading='forma-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[1.14] tracking-tight';
 const eyebrow='text-[#843F2B] text-xs font-bold tracking-wide';
 const cta='inline-flex items-center justify-center gap-4 min-h-12 bg-[#9A4B32] text-white px-6 py-4 text-sm font-bold hover:bg-[#773623] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#292722]';
 const textlink='inline-flex items-center gap-3 text-sm font-bold underline underline-offset-[6px]';
 return <div className="bg-[#F5F0E8] text-[#292722]">
  <section data-sector-specific="architectural-editorial-hero" className={wrap+' pt-10 sm:pt-16 pb-12 lg:pb-20'}>
   <div className="grid lg:grid-cols-[.78fr_1.22fr] gap-9 lg:gap-14 items-center">
    <div className="min-w-0">
     <p className={eyebrow}>{t('فورما أتيليه — تصميم داخلي','FORMA ATELIER / INTERIOR DESIGN')}</p>
     <h1 className="forma-display mt-6 text-[clamp(2.7rem,5.3vw,6.1rem)] leading-[1.08] font-semibold tracking-tight">{t('مساحة تشبهك.','Spaces that')}<span className="block text-[#843F2B]">{t('وتفاصيل تعيش معك.','feel like home.')}</span></h1>
     <p className="mt-7 max-w-[35rem] text-[#544D44] text-base sm:text-lg leading-[1.9]">{t('مطبخ يبدأ من أسلوب حياتك، لا من كتالوج جاهز. استكشف توزيع المساحة والخامات والتفاصيل التي تصنع الفرق في كل يوم.','A kitchen shaped around everyday life, not a ready-made catalogue. Explore spatial planning, materials and the details that make a difference.')}</p>
     <div className="mt-8 flex flex-wrap gap-5 items-center"><Link href={formaPath(locale,'consultation')} className={cta}>{t('ابدأ تصور مطبخك','Start your design brief')}<Arrow size={19}/></Link><Link href="#layout-studio" className={textlink}>{t('استكشف المساحات','Explore layouts')}<ArrowUpRight size={17}/></Link></div>
     <div className="mt-10 border-t border-[#B8AB9B] pt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#544D44] font-bold"><span>{t('تصميم حسب المساحة','Space-led design')}</span><span>{t('خامات وتفاصيل','Materials & details')}</span><span>{t('استشارة مبدئية','Initial consultation')}</span></div>
    </div>
    <figure className="min-w-0 relative">
     <div className="relative aspect-[4/4.2] sm:aspect-[5/4] lg:aspect-[5/5.2] overflow-hidden bg-[#D7C8B6]"><img src={FORMA_IMAGES.hero} alt={t('مطبخ معاصر بصورة تحريرية مرخصة مستقلة','Independent licensed editorial photograph of a contemporary kitchen')} loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover"/></div>
     <div className="absolute bottom-12 start-0 bg-[#292722] text-[#F5F0E8] px-5 py-4 max-w-[85%]"><p className="text-xs text-[#E6B99F]">{t('دراسة مساحة / 01','SPACE STUDY / 01')}</p><p className="forma-display text-xl mt-2">{t('هدوء في التفاصيل','Quiet by design')}</p></div>
     <figcaption className="mt-3 text-xs text-[#544D44] flex flex-wrap justify-between gap-2"><span>{t('صورة تحريرية مستقلة · CC0','Independent editorial image · CC0')}</span><Link className="underline" href={formaPath(locale,'gallery')}>{t('مصدر الصورة','Image credits')}</Link></figcaption>
    </figure>
   </div>
  </section>
  <section data-sector-specific="cabinetry-editorial" className="bg-[#292722] text-[#F5F0E8]">
   <div className={wrap+' py-9 sm:py-12 flex flex-wrap justify-between items-center gap-6'}><p className="forma-display text-2xl sm:text-3xl max-w-2xl leading-snug">{t('البيت الجميل يبدأ بمساحة مدروسة.','Good design begins with the room itself.')}</p><Link href={formaPath(locale,'process')} className="text-sm font-bold text-[#E6B99F] inline-flex gap-3 items-center underline underline-offset-4">{t('تعرف على رحلة التصميم','Discover the design journey')}<Arrow size={18}/></Link></div>
  </section>
  <section id="layout-studio" data-sector-specific="layout-chooser" className={wrap+' py-16 sm:py-24 scroll-mt-28'}>
   <div className="max-w-3xl mb-9"><p className={eyebrow}>{t('استوديو التخطيط','THE LAYOUT STUDIO')}</p><h2 className={heading+' mt-4'}>{t('كل مساحة لها حل.','Find the shape of your space.')}</h2><p className="mt-5 text-[#544D44] leading-8">{t('جرّب تخطيطات مختلفة وشاهد الفرق في توزيع الوحدات قبل اختيار التشطيب.','Compare different floor-plan arrangements before you choose a finish.')}</p></div>
   <LayoutStudio locale={locale}/>
  </section>
  <section data-sector-specific="material-selection" className="bg-[#E6D9C8]">
   <div className={wrap+' py-16 sm:py-24 grid lg:grid-cols-[1fr_.9fr] gap-10 items-center'}>
    <figure className="min-w-0"><img src={FORMA_IMAGES.cabinetry} alt={t('خزائن مطبخ حقيقية بصورة تحريرية مستقلة','Real cabinetry in an independently licensed editorial photograph')} loading="lazy" className="w-full aspect-[5/4] object-cover"/><figcaption className="mt-3 text-xs text-[#544D44]">Tomwsulcer · CC0 · {t('صورة مستقلة','Independent image')}</figcaption></figure>
    <div><p className={eyebrow}>{t('الخامات والملمس','MATERIAL LIBRARY')}</p><h2 className={heading+' mt-4'}>{t('الجمال في ما تلمسه.','Beauty you can feel.')}</h2><p className="mt-5 text-[#544D44] leading-8">{t('اللون نقطة البداية. الحواف، المفصلات، نوع اللوح وطريقة العناية هي ما يحدد اختيار الخامة المناسبة.','Colour is a starting point. Edges, hinges, substrate and maintenance determine the right finish.')}</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">{[[t('مطفي','Matte'),'#C5B59D'],[t('خشبي','Wood'),'#765341'],[t('حجر','Stone'),'#E8E3D8'],[t('معدني','Metal'),'#726D63']].map(([name,color])=><div key={name}><div className="h-20 sm:h-24 border border-[#A99A88]" style={{backgroundColor:color}}/><p className="mt-2 text-xs font-bold">{name}</p></div>)}</div><Link href={formaPath(locale,'materials')} className={textlink+' mt-7'}>{t('دليل اختيار الخامات','Explore the materials guide')}<Arrow size={17}/></Link></div>
   </div>
  </section>
  <section data-sector-specific="bespoke-services" className={wrap+' py-16 sm:py-24'}>
   <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-12">
    <div><p className={eyebrow}>{t('حلول حسب الطلب','BESPOKE SOLUTIONS')}</p><h2 className={heading+' mt-4'}>{t('أكثر من مجرد مطبخ.','More than a kitchen.')}</h2><p className="mt-5 text-[#544D44] leading-8">{t('من التخزين الذكي إلى الدريسنج والإضاءة، كل تفصيلة لها دور في تجربة المكان.','From intelligent storage to dressing rooms and lighting, every detail serves the space.')}</p><Link href={formaPath(locale,'services')} className={textlink+' mt-7'}>{t('جميع التصميمات','View all solutions')}<Arrow size={17}/></Link></div>
    <div className="border-t border-[#B8AB9B]">{FORMA.services.map((s,i)=><Link key={s.slug} href={formaPath(locale,'services/'+s.slug)} className="group flex items-center gap-4 sm:gap-6 py-5 sm:py-7 border-b border-[#B8AB9B] hover:bg-[#E6D9C8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#843F2B]"><span className="text-xs tabular-nums text-[#843F2B] shrink-0">{String(i+1).padStart(2,'0')}</span><div className="min-w-0 flex-1"><h3 className="forma-display text-xl sm:text-2xl font-semibold">{formaText(s.title,locale)}</h3><p className="text-[#544D44] mt-2 text-sm leading-7">{formaText(s.summary,locale)}</p></div><ArrowUpRight className="shrink-0 text-[#843F2B] transition-transform group-hover:-translate-y-1" size={23}/></Link>)}</div>
   </div>
  </section>
  <section data-sector-specific="measuring-first" className="bg-[#292722] text-[#F5F0E8]"><div className={wrap+' py-16 sm:py-24 grid lg:grid-cols-[.85fr_1.15fr] gap-12 items-center'}>
   <div><p className="text-xs font-bold text-[#E6B99F]">{t('التفاصيل الهندسية','THE MEASURED SPACE')}</p><h2 className={heading+' mt-4'}>{t('المقاس يصنع الفرق.','Precision makes the difference.')}</h2><p className="mt-6 leading-8 text-[#E6D9C8]">{t('الأبواب والشبابيك والتوصيلات تحدد التخطيط الممكن. جهز المقاسات الأولية، ثم اعتمدها مع متخصص قبل التصنيع.','Doors, windows and utilities determine the feasible layout. Prepare preliminary dimensions, then confirm them with a professional before fabrication.')}</p><Link className={textlink+' mt-8 text-[#E6B99F]'} href={formaPath(locale,'measurement')}>{t('دليل رفع المقاسات','Measurement guide')}<Arrow size={17}/></Link></div>
   <figure className="border border-[#8E8274] p-5 sm:p-9"><svg viewBox="0 0 360 240" role="img" aria-label={t('رسم تخطيط مطبخ توضيحي غير معتمد','Illustrative kitchen plan, not a measured drawing')} className="w-full"><rect x="30" y="30" width="300" height="165" fill="none" stroke="#E6D9C8" strokeWidth="2"/><path d="M42 42H235V77H77V183H42Z" fill="#9A4B32" stroke="#E6B99F" strokeWidth="1.5"/><rect x="155" y="110" width="103" height="45" rx="2" fill="none" stroke="#E6D9C8" strokeDasharray="6 5"/><path d="M30 217H330M30 210V224M330 210V224" stroke="#E6B99F"/><path d="M300 90V175" stroke="#E6B99F" strokeDasharray="4 4"/><circle cx="116" cy="59" r="8" fill="#292722" stroke="#E6D9C8"/><path d="M25 25L335 200" opacity=".12" stroke="#E6D9C8"/></svg><figcaption className="text-xs text-[#E6D9C8] mt-5">{t('مخطط توضيحي فقط — يحتاج رفع مقاسات فعليًا.','Illustrative plan only — professional measurements required.')}</figcaption></figure>
  </div></section>
  <section data-sector-specific="design-process" className={wrap+' py-16 sm:py-24'}>
   <p className={eyebrow}>{t('رحلة التصميم','THE DESIGN JOURNEY')}</p><h2 className={heading+' mt-4'}>{t('من الفكرة إلى التفاصيل.','From idea to detail.')}</h2>
   <ol className="mt-10 border-t border-[#B8AB9B] grid sm:grid-cols-2 lg:grid-cols-4">{[[t('الفكرة','Brief'),t('حدد التخطيط والاحتياج الأولي.','Choose your layout and initial needs.')],[t('المعاينة','Measurement'),t('راجع الأبعاد والتوصيلات مع متخصص.','Confirm dimensions and services with a professional.')],[t('الخامات','Materials'),t('اعتمد المخطط والخامات والتجهيزات.','Approve the plan, finishes and fittings.')],[t('الاتفاق','Agreement'),t('اتفق على نطاق العمل والسعر والمدة.','Agree scope, cost and timing.')]].map(([a,b],i)=><li key={a} className="border-b border-[#B8AB9B] py-8 sm:pe-6"><span className="forma-display text-4xl text-[#843F2B]">{String(i+1).padStart(2,'0')}</span><h3 className="forma-display text-2xl mt-5 font-semibold">{a}</h3><p className="text-sm text-[#544D44] leading-7 mt-3">{b}</p></li>)}</ol>
   <Link href={formaPath(locale,'process')} className={textlink+' mt-7'}>{t('تفاصيل خطوات العمل','The full process')}<Arrow size={17}/></Link>
  </section>
  <section data-sector-specific="layout-intake-teaser" className="bg-[#E6D9C8]"><div className={wrap+' py-14 sm:py-20 grid lg:grid-cols-[1fr_auto] items-center gap-7'}><div><p className={eyebrow}>{t('استشارة التصميم','DESIGN CONSULTATION')}</p><h2 className={heading+' mt-4'}>{t('ابدأ بمساحتك، وسنكمل التفاصيل.','Start with your space.')}</h2><p className="mt-4 text-[#544D44] leading-8 max-w-2xl">{t('اختر التخطيط والمقاسات المبدئية والتشطيب والميزانية. احفظ ملف استشارة غير ملزم دون تسعير نهائي أو مخطط معتمد.','Choose a layout, approximate dimensions, finish and budget. Save a nonbinding brief, not a final quote or certified plan.')}</p></div><Link className={cta} href={formaPath(locale,'consultation')}>{t('ابدأ ملف التصميم','Create design brief')}<Arrow size={18}/></Link></div></section>
  <section data-sector-specific="design-journal" className={wrap+' py-16 sm:py-24'}>
   <div className="flex flex-wrap gap-5 justify-between items-end"><div><p className={eyebrow}>{t('دفتر الاستوديو','STUDIO JOURNAL')}</p><h2 className={heading+' mt-4'}>{t('قبل أن تختار.','Before you decide.')}</h2></div><Link href={formaPath(locale,'journal')} className={textlink}>{t('كل المقالات','All articles')}<Arrow size={17}/></Link></div>
   <div className="mt-9 border-t border-[#B8AB9B]">{FORMA.articles.map((a,i)=><Link href={formaPath(locale,'journal/'+a.slug)} key={a.slug} className="flex gap-5 py-7 border-b border-[#B8AB9B] items-center"><span className="text-[#843F2B] text-xs">0{i+1}</span><div className="min-w-0 flex-1"><h3 className="forma-display text-xl sm:text-2xl font-semibold">{formaText(a.title,locale)}</h3><p className="mt-2 text-[#544D44] leading-7 text-sm">{formaText(a.summary,locale)}</p></div><ArrowUpRight size={20} className="shrink-0"/></Link>)}</div>
  </section>
  <section data-sector-specific="design-questions" className="bg-[#FFFCF7]"><div className={wrap+' py-16 sm:py-24 grid lg:grid-cols-[.7fr_1.3fr] gap-10'}><div><p className={eyebrow}>{t('الأسئلة الشائعة','GOOD TO KNOW')}</p><h2 className={heading+' mt-4'}>{t('خلّي التفاصيل واضحة.','Make the details clear.')}</h2></div><div className="border-t border-[#B8AB9B]">{FORMA.faq.map((f,i)=><details className="border-b border-[#B8AB9B] py-5" key={i}><summary className="cursor-pointer font-bold leading-7">{formaText(f.q,locale)}</summary><p className="mt-4 text-[#544D44] text-sm leading-8">{formaText(f.a,locale)}</p></details>)}</div></div></section>
  <section data-sector-specific="mavvix-business-conversion" className="bg-[#292722] text-[#F5F0E8]"><div className={wrap+' py-16 sm:py-24 grid lg:grid-cols-[1fr_auto] gap-9 items-center'}><div><p className="text-xs text-[#E6B99F] font-bold">MAVVIX / DIGITAL STUDIO</p><h2 className={heading+' mt-4'}>{t('عندك شركة مطابخ أو ديكور؟','Own a kitchen or interior business?')}</h2><p className="mt-5 leading-8 text-[#E6D9C8] max-w-3xl">{t('نصمم لشركتك تجربة رقمية بهويتك وصور مشروعاتك الحقيقية، مع استقبال طلبات التصميم وإدارتها. Forma تصور مستقل من مافكس وليس شركة تنفيذ مطابخ.','Mavvix can build a bespoke experience using your real brand, project photography and enquiry workflow. Forma is an independent website concept, not an operating fabricator.')}</p></div><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} className="inline-flex gap-4 items-center justify-center min-h-12 px-7 py-4 bg-[#E6B99F] text-[#292722] font-bold text-sm">{t('اطلب موقع لشركتك','Commission your website')}<ArrowUpRight size={20}/></a></div></section>
 </div>;
}
