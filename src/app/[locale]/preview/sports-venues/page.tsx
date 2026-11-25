import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,ARENA_PHOTOS,arenaPath,arenaText } from '@/lib/verticals/sports-venues/data';
import { ArrowUpRight,ArrowRight,ArrowLeft,Trophy,Goal,Users,Clock3,CalendarClock,ShieldCheck,Flag,BookOpen,CheckCircle2,ScanLine,MapPin,Target,Sun,Lightbulb,AlertTriangle } from 'lucide-react';

export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 const title=ar?'تصميم موقع حجز ملاعب كرة وبادل | Arena Courts من مافكس':'Football & Padel Venue Website Design | Arena Courts by Mavvix';
 const description=ar?'تجربة موقع ملاعب رياضية ببطاقات أنواع ملاعب ودليل الفرق ووقت مفضل وطلب غير مؤكد محفوظ برقم مرجعي، وتصميم عربي وإنجليزي مميز.':'A distinctive football and padel website with real sport-format guides, court request preferences and a structured pending-only enquiry by Mavvix.';
 return {title,description,openGraph:{title,description,type:'website'},robots:{index:false,follow:false}};
}
export default async function ArenaHome(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const Arrow=ar?ArrowLeft:ArrowRight;
 const football=ARENA.services.filter(s=>s.sport==='football'),padel=ARENA.services.filter(s=>s.sport==='padel');
 const scenarios=[
  {icon:Users,number:'10',title:ar?'خماسي: فريقين × 5':'5v5 football',text:ar?'عشرة لاعبين أساسيين قبل حساب البدلاء':'10 starters before substitutes'},
  {icon:Users,number:'14',title:ar?'سباعي: فريقين × 7':'7v7 football',text:ar?'أربعة عشر لاعبًا أساسيًا':'14 starters in conventional format'},
  {icon:Trophy,number:'04',title:ar?'بادل زوجي':'Doubles padel',text:ar?'أربعة لاعبين، فريقين من شخصين':'4 players across two teams'},
 ];
 const steps=[
  {n:'01',title:ar?'اللعبة':'SELECT THE FORMAT',body:ar?'اختار نوع الرياضة وعدد الفريق حسب صيغة اللعب.':'Choose the sport and its appropriate team size.'},
  {n:'02',title:ar?'وقت مفضل':'SET A PREFERRED WINDOW',body:ar?'المدة واليوم والساعة كتفضيلات، مش كوقت متاح مؤكد.':'Pick a date, start hour and duration as preferences only.'},
  {n:'03',title:ar?'رقم مرجعي':'SAVE THE REQUEST',body:ar?'النظام يحفظ الطلب ويعرض حالته بانتظار التأكيد.':'A persisted reference is returned with pending-only status.'},
 ];
 return <div>
  {/* 01: Night floodlights hero / editorial scoreboard; NOT automotive hero reuse */}
  <section data-sector-specific="floodlit-stadium-hero" className="relative overflow-hidden bg-[#071A16] text-white">
   <img src={ARENA_PHOTOS.floodlit} loading="eager" alt={ar?'صورة حقيقية ومرخصة لملعب كرة قدم مضاء ليلاً لا يتبع Arena':'CC0 editorial floodlit football pitch by Jonathan Petersson; unrelated to Arena Courts'} className="absolute inset-0 h-full w-full object-cover opacity-45"/>
   <div className="absolute inset-0 bg-gradient-to-r from-[#071A16] via-[#071A16]/90 to-[#071A16]/35" style={ar?{transform:'scaleX(-1)'}:{}}/>
   <div className="max-w-7xl mx-auto relative px-5 sm:px-8 py-20 sm:py-28 lg:py-40 grid lg:grid-cols-[1fr_.55fr] gap-14 items-end">
    <div><p className="uppercase tracking-[.22em] text-[#F0B044] font-extrabold text-xs flex gap-2 items-center"><Sun size={17}/> NIGHT GAMES · NEW STANDARDS</p>
     <h1 className="arena-display uppercase text-[clamp(3.1rem,7vw,7.5rem)] leading-[1.02] mt-7 font-black max-w-4xl">{ar?<>المباراة تبدأ <span className="text-[#F0B044]">من اختيار صح.</span></>:<>YOUR GAME. <span className="text-[#F0B044]">YOUR COURT.</span> YOUR CALL.</>}</h1>
     <p className="mt-8 text-base sm:text-lg leading-9 text-[#E4EFE7] max-w-2xl">{ar?'كرة قدم خماسية أو سباعية؟ بادل بأربعة لاعبين؟ افهم نوع الجلسة ونظم فريقك واختار وقتًا مفضلًا في موقع متخصص. دي تجربة مافكس مش حجز ملعب شغال.':'Football or padel, 5v5 or doubles: learn what a venue site can do for court discovery, team planning and a transparent nonbinding booking enquiry. This is a Mavvix design experience.'}</p>
     <div className="flex flex-wrap gap-3 mt-10"><Link href={arenaPath(locale,'book')} className="inline-flex items-center gap-3 px-7 py-5 bg-[#F0B044] text-[#102B26] font-black text-sm hover:bg-[#FFD081]">{ar?'كوّن طلب مباراة':'PLAN A COURT REQUEST'}<Arrow size={17}/></Link><Link href={arenaPath(locale,'courts')} className="px-7 py-5 border border-[#DAEBDF] font-bold text-sm hover:bg-white/10">{ar?'استكشف صيغ الملاعب':'EXPLORE COURT FORMATS'}</Link></div>
    </div>
    <div className="relative bg-[#112F27]/95 border border-[#466A56] p-7 sm:p-8 shadow-2xl">
     <div className="flex justify-between text-[#F0B044] uppercase text-[11px] tracking-[.17em] font-bold"><span>ARENA / REQUEST CARD</span><Flag size={20}/></div>
     <p className="arena-display mt-7 text-5xl font-black">05 <span className="text-[#F0B044]">vs</span> 05</p>
     <p className="text-[#D2E5D5] text-sm mt-3">{ar?'تنظيم فريقك أهم من اختيار وقت غير مؤكد':'Coordinate your players before a time request'}</p>
     <div className="grid grid-cols-2 gap-3 mt-9">{[[ar?'اللعبة':'SPORT','FOOTBALL'],[ar?'العدد':'PLAYERS','10'],[ar?'المدة':'DURATION','60 / 90'],[ar?'الحالة':'STATUS',ar?'طلب فقط':'ENQUIRY']].map(([label,value],i)=><div key={i} className="border border-[#4B6F5F] px-4 py-5"><span className="text-[10px] font-bold tracking-widest block text-[#A8C8AD]">{label}</span><b className="text-lg font-black mt-3 block">{value}</b></div>)}</div>
     <p className="text-[10px] text-[#D4E4D6] mt-6">{ar?'عرض نوعي توضيحي لا يعني توفر ملعب بالفعل.':'Illustrative request card; no real-time slot or venue is claimed.'}</p>
    </div>
   </div>
  </section>
  {/* 02: three verified format counts */}
  <section data-sector-specific="team-size-decisions" className="bg-[#F0B044] py-14 sm:py-20 text-[#122C24]"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="flex flex-wrap justify-between items-end gap-4 mb-8"><h2 className="arena-display text-3xl sm:text-5xl font-black">{ar?'عدد اللاعبين بيحدد نوع المباراة':'START WITH THE TEAM COUNT'}</h2><p className="max-w-sm text-sm leading-7">{ar?'عدد اللاعبين لصيغة اللعب وليس ضمان سعة ملعب بعينه.':'Formats, not guaranteed capacity at any specific venue.'}</p></div>
   <div className="grid md:grid-cols-3 gap-3">{scenarios.map(({icon:Icon,number,title,text})=><div key={number} className="border-2 border-[#315143] bg-[#F9D78D] p-6 sm:p-8 flex gap-6"><div className="arena-display text-5xl font-black">{number}</div><div className="min-w-0"><Icon size={24}/><h3 className="font-black text-base mt-4">{title}</h3><p className="mt-3 text-xs leading-6">{text}</p></div></div>)}</div>
  </div></section>
  {/* 03: sport split */}
  <section data-sector-specific="sports-switch" className="bg-[#EDF3ED] py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="flex flex-wrap justify-between items-end gap-7"><div><p className="text-[#305B45] font-black text-xs tracking-[.2em]">CHOOSE YOUR SPORT</p><h2 className="arena-display text-4xl sm:text-6xl font-black mt-5">{ar?'اللعبة مختلفة... الطلب مختلف':'ONE PASSION. DIFFERENT FORMATS.'}</h2></div><p className="max-w-sm text-sm leading-8 text-[#345947]">{ar?'فصلنا بين نماذج كرة القدم والبادل بدل ما نعرض ملاعب متشابهة ببيانات عامة.':'Explore specific play formats, not eight copies of the same court.'}</p></div>
   <div className="grid lg:grid-cols-2 gap-4 mt-11">
    <Link href={arenaPath(locale,'courts')+'?sport=football'} className="bg-[#102B26] text-white p-8 sm:p-11 min-h-[330px] flex flex-col group"><Goal size={42} className="text-[#F0B044]"/><p className="tracking-[.25em] text-xs text-[#F0B044] mt-10">FOOTBALL / 05 · 07</p><h3 className="arena-display mt-4 text-4xl sm:text-5xl font-black">{ar?'خماسي وسباعي':'SMALL-SIDED FOOTBALL'}</h3><p className="mt-5 max-w-md text-sm text-[#DCECDF] leading-8">{ar?'عدد الفريق وزمن اللعب والتقسيمة يحكموا اختيار المكان.':'Team size, playing format and approved ground conditions define a suitable request.'}</p><ArrowUpRight className="mt-auto ms-auto group-hover:translate-x-1 transition-transform" size={22}/></Link>
    <Link href={arenaPath(locale,'courts')+'?sport=padel'} className="bg-[#D1E8D2] text-[#102B26] p-8 sm:p-11 min-h-[330px] flex flex-col group"><Target size={42} className="text-[#315D41]"/><p className="tracking-[.25em] text-xs text-[#315D41] mt-10">PADEL / DOUBLES</p><h3 className="arena-display mt-4 text-4xl sm:text-5xl font-black">{ar?'بادل لأربعة':'FOUR PLAYERS. ONE GAME.'}</h3><p className="mt-5 max-w-md text-sm leading-8">{ar?'مباراة زوجي أو جلسة تمارين؟ اختار وراجع المعدات والمدة الفعلية.':'Choose doubles or practice and confirm equipment with the real operator.'}</p><ArrowUpRight className="mt-auto ms-auto group-hover:translate-x-1 transition-transform" size={22}/></Link>
   </div>
  </div></section>
  {/* 04: format dossiers */}
  <section data-sector-specific="eight-court-formats" className="bg-white py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <p className="uppercase tracking-[.2em] text-xs font-black text-[#315B43]">THE COURT FORMAT DIRECTORY</p>
   <div className="flex flex-wrap justify-between items-end gap-7 mt-4"><h2 className="arena-display text-4xl sm:text-6xl max-w-2xl font-black">{ar?'٨ صيغ لعب بتفاصيل حقيقية':'EIGHT FORMATS. REAL EXPLANATIONS.'}</h2><Link href={arenaPath(locale,'courts')} className="text-[#28513A] text-sm font-black underline underline-offset-8">{ar?'كل الصيغ':'Explore court guides'} <Arrow size={18} className="inline"/></Link></div>
   <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-12">{ARENA.services.map((s,i)=><Link href={arenaPath(locale,'courts/'+s.slug)} key={s.slug} className="min-h-[310px] bg-[#F2F7F1] border border-[#CADBCB] p-6 sm:p-7 flex flex-col hover:bg-[#E5F0E2] group transition-colors"><div className="flex justify-between items-start"><span className="font-mono text-xs font-black text-[#315B43]">COURT / 0{i+1}</span><span className="text-xs font-black uppercase bg-[#E5EDDD] px-2 py-1">{s.sport}</span></div><h3 className="arena-display font-black text-2xl sm:text-3xl mt-9">{arenaText(s.title,locale)}</h3><p className="text-sm text-[#3B5B48] leading-7 mt-5">{arenaText(s.summary,locale)}</p><div className="mt-auto pt-8 flex justify-between gap-2 items-center"><span className="font-mono text-sm font-black">{s.players} {ar?'لاعب':'players'}</span><ArrowUpRight size={19}/></div></Link>)}</div>
  </div></section>
  {/* 05: responsible time preferences */}
  <section data-sector-specific="time-selector-explanation" className="bg-[#0C271F] py-20 sm:py-28 text-white"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-center">
   <div><p className="text-[#F0B044] uppercase text-xs tracking-[.18em] font-black">REQUEST, DON'T INVENT INVENTORY</p><h2 className="arena-display text-4xl sm:text-6xl mt-5 font-black">{ar?'جدول مواعيد مفهوم... من غير توافر وهمي':'A SCHEDULE VIEW THAT NEVER INVENTS SLOTS'}</h2><p className="mt-6 leading-9 text-[#D5E7D8]">{ar?'تقدر تختار ساعة تفضيلية، لكن إظهار أوقات متاحة فعلًا يحتاج ربط جدول مشغّل الملعب. عشان كده القائمة هنا نوعية وليست حجزًا حقيقيًا.':'A preferred start hour is not an available slot. Real venue schedules require an operator-managed calendar and conflict checks. The interface records only preference and pending confirmation.'}</p><Link href={arenaPath(locale,'schedule')} className="mt-7 inline-flex items-center gap-3 text-[#F0B044] text-sm font-black underline underline-offset-8">{ar?'شوف طريقة بناء جدول حقيقي':'See responsible schedule design'}<Arrow size={17}/></Link></div>
   <div className="border border-[#476E56] bg-[#18382B] p-6 sm:p-9"><div className="flex justify-between items-center"><h3 className="arena-display text-3xl font-black">{ar?'أوقات مفضلة':'PREFERRED HOURS'}</h3><Clock3 size={25} className="text-[#F0B044]"/></div><p className="text-xs mt-4 text-[#D4E7D9]">{ar?'اختار وقتًا في نموذج الطلب، بدون عرض علامة (متاح الآن).':'No open-now indicators; these are examples for the request form.'}</p><div className="grid grid-cols-2 gap-3 mt-7">{ARENA.windows.map((w,i)=><div key={w} className={'border px-4 py-6 font-mono text-2xl font-bold text-center '+(i===1?'bg-[#F0B044] text-[#102B26] border-[#F0B044]':'border-[#6C8D77] text-white')}>{w}</div>)}</div><Link href={arenaPath(locale,'book')} className="mt-7 flex items-center justify-between font-bold text-sm bg-white text-[#102B26] px-6 py-4">{ar?'جهز تفضيلك':'Prepare a preference'}<Arrow size={18}/></Link></div>
  </div></section>
  {/* 06: licensed editorial image essay */}
  <section data-sector-specific="actual-football-photography" className="grid lg:grid-cols-2 min-h-[550px] bg-[#E8F2E6]">
   <div className="relative min-h-[370px] lg:min-h-[560px] bg-[#254D36]"><img src={ARENA_PHOTOS.floodlit} loading="lazy" className="absolute inset-0 h-full w-full object-cover" alt={ar?'صورة حقيقية لملعب كرة قدم ليلي من تصوير Jonathan Petersson وليست Arena':'Real CC0 editorial night football field photographed by Jonathan Petersson, unrelated to Arena Courts'}/><span className="absolute bottom-4 start-4 text-[10px] text-white bg-[#102B26]/90 px-3 py-2">Jonathan Petersson · CC0 / Wikimedia Commons</span></div>
   <div className="px-7 sm:px-12 lg:px-20 py-16 flex flex-col justify-center"><p className="uppercase tracking-[.19em] text-xs font-black text-[#315B43]">REAL SPORT. HONEST EDITORIAL.</p><h2 className="arena-display text-4xl sm:text-6xl font-black leading-tight mt-6">{ar?'لقطة من ملعب حقيقي... مش ادعاء ملكية':'REAL FIELD PHOTOGRAPHY. NO FAKE VENUE CLAIMS.'}</h2><p className="text-sm mt-7 text-[#365A43] leading-9">{ar?'الصورة حقيقية ومرخصة من ويكيميديا، لكن لا تخص مكان Arena أو ملاعب تديرها مافكس. لما موقعك يتعمل فعليًا، بنستخدم صور ملاعبك المعتمدة والبيانات الحقيقية لكل أرضية.':'This photo is licensed from Wikimedia Commons and depicts an independent football field. It is not an Arena-operated court. A commissioned site must use approved photography and real specifications from the actual venue owner.'}</p><a href="https://commons.wikimedia.org/wiki/File:Pexels-jonathan-petersson-399187.jpg" target="_blank" rel="noopener noreferrer" className="mt-8 text-sm font-bold underline underline-offset-8">{ar?'شوف مصدر وترخيص الصورة':'Image source and CC0 license'}</a></div>
  </section>
  {/* 07: enquiry process */}
  <section data-sector-specific="court-request-steps" className="bg-[#F4F6EF] py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <p className="text-[#315B43] uppercase font-black text-xs tracking-[.2em]">THREE STEPS · ONE CLEAR REQUEST</p><h2 className="arena-display font-black text-4xl sm:text-6xl mt-5">{ar?'اطلب صيغة اللعب... بدون حجز وهمي':'A CLEAR GAME BRIEF IN THREE MOVES'}</h2>
   <div className="grid lg:grid-cols-3 gap-4 mt-11">{steps.map(s=><article key={s.n} className="p-8 sm:p-9 border-2 border-[#C8D8CA] bg-white"><span className="arena-display text-5xl text-[#326B4A] font-black">{s.n}</span><h3 className="arena-display text-3xl font-black mt-12">{s.title}</h3><p className="mt-6 text-[#345943] text-sm leading-8">{s.body}</p></article>)}</div>
   <Link href={arenaPath(locale,'book')} className="inline-flex gap-3 items-center bg-[#102B26] text-white px-8 py-5 mt-9 text-sm font-black">{ar?'افتح نموذج طلب ملعب':'OPEN THE COURT REQUEST'}<Arrow size={17}/></Link>
  </div></section>
  {/* 08: venue owner policy clarity */}
  <section data-sector-specific="operator-policy" className="bg-[#F0B044] py-16 sm:py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.7fr_1.2fr] gap-10 items-center">
   <div><AlertTriangle size={35}/><h2 className="arena-display text-3xl sm:text-5xl font-black mt-5">{ar?'قبل الدفع... اسأل عن الشروط':'ASK ABOUT THE RULES BEFORE YOU PAY'}</h2></div>
   <div className="grid md:grid-cols-2 gap-3">{[[ar?'مدة اللعب':'Session duration',ar?'وقت الدخول والخروج والتأخير':'Entry, end time and lateness'],[ar?'سياسة الإلغاء':'Cancellation terms',ar?'الإلغاء والاسترداد قبل الحجز':'Cancellation and refund policy'],[ar?'المعدات':'Equipment rules',ar?'المضارب والأحذية والكرات':'Rackets, shoes and balls'],[ar?'المكان الفعلي':'Actual court',ar?'العنوان والإضاءة والأرضية':'Location, lights and surface']].map(([title,body],i)=><div key={i} className="bg-[#F7D79B] border border-[#D09A39] p-6"><h3 className="font-black text-lg">{title}</h3><p className="text-sm mt-3 leading-7">{body}</p></div>)}</div>
  </div></section>
  {/* 09: genuine domain guides */}
  <section data-sector-specific="player-field-guides" className="bg-white py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="flex flex-wrap items-end justify-between gap-7"><div><p className="text-xs tracking-[.2em] text-[#315B43] font-black">ARENA / FIELD NOTES</p><h2 className="arena-display text-4xl sm:text-6xl font-black mt-5">{ar?'ادخل الملعب وأنت مرتب فريقك':'PREPARE BEFORE THE WHISTLE'}</h2></div><Link href={arenaPath(locale,'journal')} className="font-bold text-sm underline underline-offset-8">{ar?'كل الأدلة':'All guides'}</Link></div>
   <div className="grid lg:grid-cols-3 gap-4 mt-11">{ARENA.articles.map((g,i)=><Link key={g.slug} href={arenaPath(locale,'journal/'+g.slug)} className="p-8 border border-[#C6D6C8] bg-[#F4F8F1] min-h-[320px] flex flex-col hover:bg-[#E8F2E6]"><BookOpen className="text-[#316345]" size={29}/><p className="text-xs font-mono mt-8 text-[#3F6950]">FIELD NOTE 0{i+1}</p><h3 className="text-xl font-black mt-4 leading-snug">{arenaText(g.title,locale)}</h3><p className="text-sm text-[#395B47] leading-8 mt-5">{arenaText(g.summary,locale)}</p><span className="mt-auto pt-5 flex gap-2 items-center text-sm font-bold">{ar?'اقرأ الدليل':'Read guide'}<Arrow size={17}/></span></Link>)}</div>
  </div></section>
  {/* 10: FAQ */}
  <section data-sector-specific="honest-court-faq" className="bg-[#DCE9DA] py-20 sm:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.75fr_1.2fr] gap-12">
   <div><p className="text-xs font-bold text-[#315B43] tracking-widest">VENUE BOOKINGS, EXPLAINED</p><h2 className="arena-display text-4xl sm:text-6xl font-black mt-5">{ar?'كل سؤال له إجابة واضحة':'REAL ANSWERS. NO FAKE AVAILABILITY.'}</h2></div>
   <div className="space-y-3">{ARENA.faq.map((f,i)=><details key={i} className="bg-white border border-[#BCCEBE] p-6 open:shadow-md"><summary className="font-black text-base cursor-pointer">{arenaText(f.q,locale)}</summary><p className="mt-5 text-sm leading-8 text-[#385641]">{arenaText(f.a,locale)}</p></details>)}</div>
  </div></section>
  {/* 11: real Mavvix B2B conversion */}
  <section data-sector-specific="mavvix-venue-conversion" className="bg-[#102B26] py-20 sm:py-28 text-white"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] items-center gap-10">
   <div><p className="text-[#F0B044] text-xs tracking-widest font-black">MAVVIX SOFTWARE / VENUE WEB DESIGN</p><h2 className="arena-display text-4xl sm:text-6xl mt-6 max-w-4xl font-black">{ar?'عندك ملاعب؟ اعرضها بموقع يستحق الحجز':'GIVE YOUR REAL VENUE THE RIGHT DIGITAL HOME'}</h2><p className="text-[#D9E9DB] mt-6 text-base leading-9 max-w-2xl">{ar?'مافكس تقدر تبني موقع بملعبك الحقيقي وصوره وأسعاره وشروطه وجدوله المرتبط بنظام الحجز عندك.':'Mavvix can build your branded site with owner-approved court details, licensed images, prices, policies and a real booking calendar when integrated.'}</p></div>
   <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="px-8 py-5 bg-[#F0B044] text-[#102B26] text-sm font-black inline-flex items-center gap-3">{ar?'اطلب موقع ملاعبك':'COMMISSION A VENUE WEBSITE'}<ArrowUpRight size={18}/></a>
  </div></section>
 </div>;
}
