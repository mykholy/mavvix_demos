import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { VELORA, VELORA_PHOTOS, veloraPath, veloraText } from '@/lib/verticals/salon-spa/data';
import { ArrowUpRight, ArrowLeft, ArrowRight, Flower2, Sparkles, Heart, Scissors, HandHeart, Palette, BookOpen, CalendarDays, ShieldCheck, Clock3, CheckCircle2, Sun, Gem, Feather, ArrowDown, Image as ImageIcon } from 'lucide-react';

export function generateMetadata({params:{locale}}:{params:{locale:Locale}}):Metadata{
 const ar=locale==='ar';
 const title=ar?'تصميم موقع صالون تجميل فاخر | Velora Beauty من مافكس':'Premium Salon & Spa Website Design | Velora Beauty by Mavvix';
 const description=ar?'تجربة موقع صالون تجميل بخدمات الشعر والأظافر والعناية وجدول استفسار منظم ومجلة تجميل. تصميم مافكس عربي وإنجليزي بدون حجوزات وهمية.':'Explore an editorial salon website with bilingual hair, nails and wellbeing service dossiers, curated beauty content and a pending-only appointment enquiry.';
 return {title,description,openGraph:{title,description,type:'website'},robots:{index:false,follow:false}};
}
export default function VeloraHome({params:{locale}}:{params:{locale:Locale}}){
 const ar=locale==='ar';const Arrow=ar?ArrowLeft:ArrowRight;
 const sections=[
  {title:ar?'الشعر والتصفيف':'Hair artistry',subtitle:ar?'قصة تناسب يومك':'Designed for your rhythm',icon:Scissors,filter:'hair'},
  {title:ar?'فن الأظافر':'The nail edit',subtitle:ar?'لون وتفاصيل محسوبة':'Shape, shade, detail',icon:Gem,filter:'nails'},
  {title:ar?'طقوس الهدوء':'Slow rituals',subtitle:ar?'لحظات لنفسك':'Room to breathe',icon:Flower2,filter:'rituals'},
  {title:ar?'استعداد المناسبات':'Occasion styling',subtitle:ar?'تفاصيل يوم مختلف':'A day made personal',icon:Sun,filter:'occasion'},
 ];
 return <div>
  {/* 01. Asymmetric editorial art direction: independent from other Mavvix sectors. */}
  <section data-sector-specific="velora-editorial-hero" className="bg-[#FBF8F4] relative overflow-hidden">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-20 lg:pb-28 grid lg:grid-cols-[1.07fr_.93fr] gap-12 lg:gap-16 items-center">
    <div className="relative z-10">
     <div className="inline-flex items-center gap-3 text-[#854D5C] text-[11px] font-bold tracking-[.22em] uppercase"><span className="h-px w-9 bg-[#854D5C]"/>WELCOME TO A BEAUTIFUL PAUSE</div>
     <h1 className="velora-display mt-8 text-[clamp(3.35rem,6.8vw,7.2rem)] leading-[.99] font-semibold tracking-tight">{ar?<>لأن التفاصيل <em className="not-italic text-[#985A69]">تليق بكِ.</em></>:<>Beauty is in the <em className="text-[#9B6070] font-normal">details.</em></>}</h1>
     <p className="mt-8 text-base sm:text-lg leading-9 text-[#634650] max-w-[530px]">{ar?'اكتشفي خدمات عناية وتصفيف واضحة، واختاري تجربة تناسب وقتك ومناسبتك. مساحة رقمية راقية تبدأ بفهم اختيارك، مش وعود بنتيجة موحدة.':'Explore thoughtful hair, nail and wellbeing care through a journal-like experience. Discover what each service involves and prepare a clear appointment preference before anything is confirmed.'}</p>
     <div className="mt-10 flex flex-wrap items-center gap-4">
      <Link href={veloraPath(locale,'booking')} className="inline-flex gap-3 items-center bg-[#4B2834] text-white px-8 py-5 rounded-full text-sm font-bold hover:bg-[#633B4A]">{ar?'اختاري موعدًا مفضلًا':'Explore the appointment edit'}<Arrow size={17}/></Link>
      <Link href={veloraPath(locale,'services')} className="inline-flex items-center gap-2 text-sm font-bold text-[#563440] underline underline-offset-8 decoration-[#BB9AA2]">{ar?'استكشفي الخدمات':'The service menu'}<Arrow size={16}/></Link>
     </div>
     <div className="mt-12 flex items-center gap-3 text-xs text-[#76565F]"><Flower2 size={20} className="text-[#A36D79]"/>{ar?'مظهر جميل يبدأ بخطوات مفهومة':'Intentional beauty, explained with care'}</div>
    </div>
    <div className="relative min-h-[460px] sm:min-h-[660px] lg:min-h-[720px]">
     <div aria-hidden="true" className="absolute inset-x-[12%] inset-y-[6%] border border-[#BCA4A9] rounded-[48%_48%_0_0]"/>
     <div aria-hidden="true" className="absolute inset-x-0 inset-y-[14%] rounded-[47%_47%_0_0] bg-[#EDD8D5]"/>
     <img src={VELORA_PHOTOS.manicure} loading="eager" alt={ar?'صورة تحريرية مرخصة لعملية العناية بطلاء الأظافر، ليست لصالون Velora':'Licensed editorial photograph of nail painting; not a Velora salon or client'} className="absolute inset-[2%_5%_8%_7%] h-[90%] w-[88%] rounded-[47%_47%_0_0] object-cover object-center shadow-[0_40px_80px_rgba(75,40,52,.16)]"/>
     <div className="absolute end-0 bottom-[3%] bg-[#4B2834] text-[#FAE9E5] p-5 sm:p-7 w-40 sm:w-52 rounded-sm shadow-2xl rotate-2">
      <Flower2 size={25} strokeWidth={1.2}/><p className="velora-display text-xl sm:text-2xl mt-6 leading-snug">{ar?'جمال له مساحته الخاصة':'A moment made yours.'}</p>
     </div>
    </div>
   </div>
  </section>
  {/* 02. Service selection editorial tiles */}
  <section data-sector-specific="beauty-edits" className="bg-white py-20 sm:py-28">
   <div className="max-w-7xl mx-auto px-5 sm:px-8">
    <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
     <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#855060]">THE BEAUTY EDITS</p><h2 className="velora-display text-4xl sm:text-6xl mt-5 font-medium">{ar?'لكل لحظة... عناية مختلفة':'Every moment has its own ritual'}</h2></div>
     <p className="text-sm text-[#704E59] leading-8 max-w-xs">{ar?'اختاري المجال الأول، وبعدها افهمي الفرق بين الخدمات قبل الاستفسار.':'Start with the care category and see what makes each service different.'}</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{sections.map((c,i)=>{const Icon=c.icon;return <Link key={c.filter} href={veloraPath(locale,'services')+'?category='+c.filter} className="group p-7 sm:p-8 min-h-[320px] flex flex-col border border-[#E6D8D5] bg-[#FCF9F6] hover:bg-[#F1E6E2] transition-colors">
      <span className="flex items-center justify-between"><Icon size={37} strokeWidth={1.1} className="text-[#A36D79]"/><span className="text-[11px] font-mono text-[#987381]">0{i+1}</span></span>
      <div className="mt-auto"><h3 className="velora-display text-2xl sm:text-3xl font-semibold">{c.title}</h3><p className="mt-3 text-xs tracking-wide text-[#795967]">{c.subtitle}</p></div><span className="mt-7 border-t border-[#D8C3C4] pt-5 inline-flex justify-between text-xs font-bold">{ar?'اعرفي التفاصيل':'View the edit'}<Arrow size={16}/></span>
     </Link>})}</div>
   </div>
  </section>
  {/* 03. Story-based service clarity */}
  <section data-sector-specific="care-consultation" className="bg-[#F1E8E5] py-20 sm:py-28">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-20 items-center">
    <div><p className="uppercase tracking-[.22em] text-xs font-bold text-[#865463]">BEFORE YOUR APPOINTMENT</p>
     <h2 className="velora-display text-4xl sm:text-6xl mt-6 leading-tight">{ar?'الاستشارة الجميلة تبدأ بالسؤال الصح':'Good care begins with good questions'}</h2>
     <p className="mt-6 text-base leading-9 text-[#65444F]">{ar?'من طبيعة الشعر للمظهر اللي تحبيه، ومن وقت المناسبة لطريقة العناية بعد الجلسة، كل تفصيلة تغير اختيار الخدمة.':'From hair texture to maintenance preferences, occasion timing to product finish, each detail informs a more thoughtful service brief.'}</p>
     <Link href={veloraPath(locale,'process')} className="mt-8 inline-flex gap-3 items-center font-bold text-sm text-[#653D49] underline underline-offset-8">{ar?'كيف تنسقي جلسة مناسبة':'Read our thoughtful process'}<Arrow size={16}/></Link>
    </div>
    <div className="bg-[#FFFDF9] px-7 py-8 sm:px-12 sm:py-14 border-s-4 border-[#B88291]">
     {[[ar?'الهدف والمظهر':'The desired finish',ar?'مرجع بصري يساعد على الشرح لكنه لا يضمن نفس النتيجة للجميع.':'A reference image is a starting point, not an identical-result guarantee.'],
      [ar?'نوع الخدمة ومدتها':'Scope and duration',ar?'الوقت المعروض إرشادي ويحتاج تحديد الصالون بعد الفحص الحقيقي.':'Sample durations must be confirmed by the operating salon.'],
      [ar?'تفاصيل التحضير':'Preparation and aftercare',ar?'تعرفي الخطوات والمنتجات والمتابعة قبل الموافقة.':'Ask about products, procedure and practical aftercare.']].map(([a,b],i)=><div key={i} className="py-7 border-b border-[#E9D9D6] last:border-0 flex gap-5"><span className="velora-display text-4xl text-[#A46D7B] font-normal">0{i+1}</span><div><h3 className="text-lg font-extrabold">{a}</h3><p className="text-sm text-[#71515C] mt-3 leading-8">{b}</p></div></div>)}
    </div>
   </div>
  </section>
  {/* 04. Expert specialization, explicitly no fake staff profiles */}
  <section data-sector-specific="specialist-roles" className="py-20 sm:py-28 bg-[#FBF8F4]">
   <div className="max-w-7xl mx-auto px-5 sm:px-8">
    <div className="max-w-3xl"><p className="text-xs font-bold text-[#855060] tracking-[.2em]">THE ART BEHIND THE SERVICE</p><h2 className="velora-display text-4xl sm:text-6xl mt-5">{ar?'تخصص مختلف، لمسة مختلفة':'A different craft behind every detail'}</h2></div>
    <div className="grid lg:grid-cols-3 gap-5 mt-12">
     {[[Scissors,ar?'تصفيف وصبغات الشعر':'Hair artistry',ar?'دليل استشارة اللون والشكل وتاريخ المعالجات والمدة.':'Colour, shape and styling scope informed by hair history.'],
       [Gem,ar?'فن الأظافر':'Nail artistry',ar?'فهم التحضير واللون والإزالة والعناية دون وعود ثابتة.':'Shape, polish, removal and product-led aftercare.'],
       [Feather,ar?'العناية والاسترخاء':'Wellbeing care',ar?'جلسات تجميلية للاسترخاء دون ادعاءات طبية.':'Comfort-led cosmetic rituals with no medical promises.']].map(([Icon,title,body],i)=><div key={i} className="bg-white border border-[#E7D9D7] p-8 sm:p-10 min-h-80">
      <Icon size={37} strokeWidth={1.1} className="text-[#A46D7B]"/><h3 className="velora-display mt-11 text-3xl font-semibold">{title as string}</h3><p className="text-sm mt-5 leading-8 text-[#704E59]">{body as string}</p>
     </div>)}
    </div>
    <p className="mt-7 text-sm text-[#795967] leading-8">{ar?'الموقع يوضح أنواع التخصصات فقط، ولا يعرض أسماء أو مؤهلات خبراء غير موثقين.':'These are service specialties, not invented staff members or professional credentials.'}</p>
    <Link href={veloraPath(locale,'specialists')} className="inline-flex mt-7 gap-2 items-center text-sm font-bold underline underline-offset-8">{ar?'اختاري التخصص المناسب':'Understand the specialities'}<Arrow size={16}/></Link>
   </div>
  </section>
  {/* 05. Menu of actual authored service dossiers */}
  <section data-sector-specific="service-dossiers" className="py-20 sm:py-28 bg-[#FFFDF9]">
   <div className="max-w-7xl mx-auto px-5 sm:px-8">
    <div className="grid md:grid-cols-[1.1fr_.9fr] gap-10 items-end"><div><p className="text-xs tracking-[.2em] uppercase font-bold text-[#855060]">A MENU WITH MEANING</p><h2 className="velora-display text-4xl sm:text-6xl mt-5 leading-tight">{ar?'عشر خدمات... كل واحدة لها معنى':'Ten thoughtfully written service experiences'}</h2></div><p className="text-sm text-[#71515C] leading-8">{ar?'مش أسماء مختصرة وخلاص. لكل خدمة شرح وتوقعات وأسئلة تفيدك في الاتفاق مع المشغّل الفعلي.':'Every service includes a meaningful scope, planning duration and the questions an actual operator should answer before booking.'}</p></div>
    <div className="grid md:grid-cols-2 mt-12 border-t border-[#DCC8C7]">{VELORA.services.map((s,i)=><Link key={s.slug} href={veloraPath(locale,'services/'+s.slug)} className="group py-6 sm:py-8 pe-7 border-b border-[#E5D8D5] flex items-center gap-6 min-h-32 hover:bg-[#F8F0EC] transition-colors">
      <span className="font-mono text-[#8A5867] text-sm">0{i+1}</span><div className="flex-1"><h3 className="font-extrabold text-lg">{veloraText(s.title,locale)}</h3><p className="text-[#74555F] mt-2 text-sm leading-7">{veloraText(s.summary,locale)}</p></div><ArrowUpRight size={20} className="shrink-0 text-[#8A5867]"/>
     </Link>)}</div>
    <Link href={veloraPath(locale,'services')} className="inline-flex items-center gap-3 mt-10 border border-[#8B5866] rounded-full px-7 py-4 text-sm font-bold">{ar?'تصفحّي القائمة الكاملة':'View the complete menu'}<Arrow size={17}/></Link>
   </div>
  </section>
  {/* 06. Editorial photograph, third party licensed */}
  <section data-sector-specific="editorial-photography" className="bg-[#4B2834] text-white grid lg:grid-cols-2 items-stretch">
   <div className="relative min-h-[390px] lg:min-h-[630px] overflow-hidden bg-[#8C6771]">
    <img src={VELORA_PHOTOS.salon} loading="lazy" className="absolute inset-0 object-cover h-full w-full" alt={ar?'صورة فوتوغرافية مرخصة لصالون حقيقي في أرلينغتون؛ ليس فرعًا لعلامة Velora':'CC0 editorial photo of a real unrelated hair salon in Arlington; not a Velora branch'}/>
    <span className="absolute bottom-5 start-5 text-[10px] leading-5 bg-[#32202B]/90 text-white px-3 py-2">Daderot · CC0 / Wikimedia Commons · Editorial only</span>
   </div>
   <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center"><Flower2 size={41} strokeWidth={1.1} className="text-[#E5B3BB]"/>
    <p className="mt-12 text-xs uppercase tracking-[.23em] text-[#E5B3BB] font-bold">THE SPACE BETWEEN MOMENTS</p>
    <h2 className="velora-display text-4xl sm:text-6xl mt-6 leading-tight">{ar?'هوية تهتم بالإحساس... قبل الصور':'A considered atmosphere, not borrowed proof'}</h2>
    <p className="mt-7 leading-9 text-[#EDD8DE] text-base">{ar?'الصورة مرخصة من مصدر مستقل، لعرض نوع المساحة والإحساس البصري فقط؛ ليست تصوير مكان يملكه أو يديره Velora. في موقع عميل حقيقي بنستبدلها بصور المكان والخدمات المعتمدة.':'This licensed editorial photograph shows an unrelated real salon environment. It illustrates the visual direction and is not evidence of a Velora location, staff member or client result. Actual commissioned sites require approved operator photography.'}</p>
    <Link href={veloraPath(locale,'gallery')} className="mt-9 text-[#F7D1D1] font-bold text-sm flex items-center gap-2 underline underline-offset-8">{ar?'تعرّفي على اتجاه الصور':'Editorial photo provenance'}<Arrow size={16}/></Link>
   </div>
  </section>
  {/* 07. Experience by context */}
  <section data-sector-specific="occasion-planning" className="py-20 sm:py-28 bg-[#F6EBE7]">
   <div className="max-w-7xl mx-auto px-5 sm:px-8">
    <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10"><div><p className="uppercase text-[#855060] font-bold tracking-[.22em] text-xs">THE OCCASION EDIT</p><h2 className="velora-display text-5xl sm:text-6xl mt-5">{ar?'الجمال له جدول... وإحنا نهتم بالتفاصيل':'Your calendar deserves breathing room'}</h2></div><div className="space-y-4">
     {[[ar?'جلسة خفيفة قبل يوم عادي':'Everyday refresh',ar?'حددي الوقت المتاح والتصفيف المطلوب قبل اختيار الخدمة.':'Begin with how much time and upkeep the finish requires.'],
       [ar?'تجهيز مناسبة':'Occasion preparation',ar?'احسبي وقت الشعر والملابس والانتقال، وسيبي مساحة للمتغيرات.':'Allow for styling, dressing, travel and inevitable adjustments.'],
       [ar?'تجربة مسبقة إن لزم':'Optional rehearsal',ar?'اتفقّي على صورة مرجعية وخطوات التحضير والتوقيت الفعلي مع المشغل.':'Discuss the inspiration, preparation steps and actual availability with a real stylist.']].map(([title,body],i)=><div key={i} className="border-b border-[#D6BFC3] pb-6 flex gap-5"><span className="velora-display text-4xl text-[#975F70]">0{i+1}</span><div><h3 className="font-extrabold text-lg">{title}</h3><p className="text-sm leading-8 mt-2 text-[#74555F]">{body}</p></div></div>)}
    </div></div>
    <Link href={veloraPath(locale,'packages')} className="mt-10 inline-flex gap-2 items-center font-bold text-sm underline underline-offset-8">{ar?'شاهدي مجموعات العناية':'Explore curated care collections'}<Arrow size={16}/></Link>
   </div>
  </section>
  {/* 08. Request flow transparency */}
  <section data-sector-specific="transparent-request" className="py-20 sm:py-24 bg-white"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <p className="text-xs text-[#865463] tracking-[.2em] uppercase font-bold">A CLEAR REQUEST, NOT A FALSE BOOKING</p>
   <h2 className="velora-display text-4xl sm:text-6xl mt-5">{ar?'خطوات محددة... بدون حجز وهمي':'An honest appointment journey'}</h2>
   <div className="grid sm:grid-cols-3 gap-4 mt-12">{[[ar?'اختاري الخدمة':'Select the service',ar?'حددي الخدمة والمدد التقريبية والتخصص المطلوب.':'Select a service dossier, indicative duration and specialism.'],
     [ar?'حددي التفضيل':'Share your preference',ar?'تاريخ وفترة ومناسبة وبيانات تواصل بموافقة واضحة.':'Choose a date window, occasion and contact details with consent.'],
     [ar?'استلمي مرجعًا':'Save a request reference',ar?'الطلب محفوظ، لكنه لا يحجز شخصًا أو فرعًا حقيقيًا.':'A request reference is stored; no real calendar or booking is reserved.']].map(([title,body],i)=><div key={i} className="p-8 border border-[#E4D2D0] bg-[#FBF8F4]">
    <span className="font-mono text-xs text-[#8E5D6B]">STEP / 0{i+1}</span><h3 className="velora-display text-3xl mt-8">{title}</h3><p className="mt-4 text-sm text-[#704E59] leading-8">{body}</p>
   </div>)}</div>
   <Link href={veloraPath(locale,'booking')} className="inline-flex gap-3 items-center bg-[#4B2834] text-white rounded-full px-9 py-5 mt-10 text-sm font-bold">{ar?'جرّبي نموذج الطلب':'Try the appointment request'}<Arrow size={18}/></Link>
  </div></section>
  {/* 09. Actual editorial articles */}
  <section data-sector-specific="beauty-journal" className="py-20 sm:py-28 bg-[#FBF8F4]"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="flex items-end justify-between gap-6"><div><p className="uppercase tracking-[.2em] text-xs font-bold text-[#855060]">A BEAUTY JOURNAL</p><h2 className="velora-display text-4xl sm:text-6xl mt-5">{ar?'معلومات مفيدة... بدون وعود مبالغ فيها':'Read before you choose'}</h2></div><Link href={veloraPath(locale,'journal')} className="hidden md:inline-flex text-sm underline underline-offset-8 gap-2 font-bold">{ar?'كل المقالات':'All stories'}<Arrow size={17}/></Link></div>
   <div className="grid md:grid-cols-3 gap-5 mt-12">{VELORA.articles.map((a,i)=><Link href={veloraPath(locale,'journal/'+a.slug)} key={a.slug} className="group p-8 bg-white border border-[#E1D0D1] min-h-[330px] flex flex-col hover:bg-[#F5E8E7] transition-colors">
    <BookOpen size={31} strokeWidth={1.3} className="text-[#A36D79]"/><span className="font-mono text-xs text-[#8E5D6B] mt-8">VELORA NOTE / 0{i+1}</span>
    <h3 className="velora-display font-semibold text-2xl mt-5 leading-snug">{veloraText(a.title,locale)}</h3><p className="text-sm text-[#74555F] leading-8 mt-4">{veloraText(a.summary,locale)}</p><span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold">{ar?'اقرئي المزيد':'Read story'}<Arrow size={16}/></span>
   </Link>)}</div>
  </div></section>
  {/* 10. FAQ */}
  <section data-sector-specific="salon-booking-faq" className="py-20 sm:py-28 bg-[#F2E6E4]"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.8fr_1.2fr] gap-12">
   <div><p className="text-xs font-bold text-[#865463] uppercase tracking-widest">THOUGHTFUL ANSWERS</p><h2 className="velora-display text-5xl sm:text-6xl mt-5">{ar?'أسئلة قبل ما تختاري جلسة':'Questions worth asking'}</h2><p className="mt-6 text-sm leading-8 text-[#704E59]">{ar?'وضوح النطاق والوقت مهم قبل أي التزام.':'Clarity matters more than a booking promise.'}</p></div>
   <div className="space-y-3">{VELORA.faq.map((f,i)=><details key={i} className="p-6 sm:p-7 bg-[#FFFDF9] border border-[#E2CCCD] open:shadow-lg"><summary className="cursor-pointer text-base font-extrabold">{veloraText(f.q,locale)}</summary><p className="mt-4 text-sm leading-8 text-[#74555F]">{veloraText(f.a,locale)}</p></details>)}</div>
  </div></section>
  {/* 11. Conversion for Mavvix */}
  <section data-sector-specific="mavvix-beauty-cta" className="py-20 sm:py-28 bg-[#4B2834] text-[#FFF9F4]"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] items-center gap-10">
   <div><p className="uppercase tracking-[.22em] text-xs text-[#F1C5C8] font-bold">MAVVIX / BUILD YOUR BEAUTY BRAND ONLINE</p><h2 className="velora-display text-4xl sm:text-6xl mt-5 max-w-4xl">{ar?'صالونك يستاهل تجربة رقمية تليق بخدماته':'Let your own salon take the spotlight'}</h2><p className="mt-7 text-[#EDD8DE] text-base leading-9 max-w-2xl">{ar?'فريق مافكس يقدر ينفذ موقع باسم نشاطك وصورك وفريقك الحقيقي وجدولك المعتمد وتكامل طلبات العملاء.':'Mavvix can create a custom branded website using your real services, licensed imagery, verified staff and operational appointment management.'}</p></div>
   <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-9 py-5 bg-[#F0C7C7] text-[#4B2834] rounded-full font-extrabold text-sm">{ar?'اطلبي تصميم موقعك':'Discuss your website'}<ArrowUpRight size={18}/></a>
  </div></section>
 </div>;
}
