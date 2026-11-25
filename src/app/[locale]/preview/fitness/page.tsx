import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { PULSE,PULSE_MEDIA,pulsePath,pulseText } from '@/lib/verticals/fitness/data';
import { ArrowUpRight,ArrowRight,ArrowLeft,Activity,Dumbbell,Timer,Footprints,ShieldCheck,BookOpen,Target,CalendarClock,Zap,CheckCircle2,Heart,MoveUpRight,Gauge,Clock3,ArrowDown } from 'lucide-react';
export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',title=ar?'موقع جيم ونادي رياضي | Pulse District بتصميم مافكس':'Premium Gym Website | Pulse District by Mavvix';
 const description=ar?'تجربة رقمية لجيم احترافي بعروض حصص قوة ولياقة ومرونة، دليل أول زيارة وطلب حصة تجريبية محفوظ برقم مرجعي غير مؤكد.':'A distinctive gym website concept with nine meaningful class profiles, bilingual schedules, a trial preference journey and honest pending-only receipt.';
 return {title,description,openGraph:{title,description,type:'website'},robots:{index:false,follow:false}};
}
export default async function FitnessHome(props:{params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar',Arrow=ar?ArrowLeft:ArrowRight;
 const groups=[{slug:'strength',num:'01',title:ar?'القوة':'STRENGTH',sub:ar?'اتعلم الحركة والتدرج':'Technique before numbers',icon:Dumbbell},
 {slug:'conditioning',num:'02',title:ar?'اللياقة':'CONDITIONING',sub:ar?'مجهود يناسب خبرتك':'Effort with control',icon:Activity},
 {slug:'mobility',num:'03',title:ar?'الحركة':'MOBILITY',sub:ar?'ممارسة متدرجة ومريحة':'Move with intention',icon:Footprints}];
 const timetable=[
 ['MON',ar?'الأحد':'MON','foundations'],['TUE',ar?'الاثنين':'TUE','cycle-intervals'],
 ['WED',ar?'الثلاثاء':'WED','mobility-reset'],['THU',ar?'الأربعاء':'THU','strength-circuit'],
 ['FRI',ar?'الخميس':'FRI','bodyweight-flow'],['SAT',ar?'الجمعة':'SAT','core-control']];
 return <div>
  {/* 01 — typographic hero with architectural photo, not templated service cards */}
  <section data-sector-specific="pulse-kinetic-hero" className="bg-[#141421] text-[#F7F6FA] relative overflow-hidden">
   <div className="absolute lg:start-[43%] inset-0 opacity-40 lg:opacity-75"><img src={PULSE_MEDIA.floor} loading="eager" className="w-full h-full object-cover" alt={ar?'معدات لياقة داخل ناد مستقل في صورة CC0 تحريرية لا تتبع Pulse':'CC0 editorial image of exercise equipment at an unrelated venue'}/></div>
   <div className="absolute inset-0 bg-gradient-to-r from-[#141421] via-[#141421]/95 to-[#141421]/30" style={ar?{transform:'scaleX(-1)'}:{}}/>
   <div className="max-w-7xl mx-auto px-5 sm:px-8 relative py-20 lg:py-32 grid lg:grid-cols-[1.05fr_.55fr] gap-12 items-end">
    <div><p className="inline-flex items-center gap-2 text-xs font-black tracking-[.23em] uppercase text-[#E0FE61]"><Zap size={15}/>PULSE DISTRICT / THE TRAINING EDIT</p>
     <h1 className="pulse-display uppercase font-black text-[clamp(3.8rem,9vw,9rem)] mt-7 leading-[.9] tracking-[-.055em]">{ar?<>تمرّن <span className="text-[#E0FE61]">بهدف.</span><span className="block text-[#A28BFF]">كمّل بإيقاعك.</span></>:<>FIND YOUR <span className="text-[#E0FE61]">PULSE.</span><span className="block text-[#A28BFF]">OWN YOUR RHYTHM.</span></>}</h1>
     <p className="mt-8 text-base sm:text-lg text-[#E4E4EC] leading-9 max-w-2xl">{ar?'تجربة موقع نادي رياضي تساعدك تفهم برامج القوة واللياقة والحركة وتختار مستوى مناسب، قبل ما تطلب تجربة حصة. من غير أرقام اشتراكات مزيفة أو وعود بتحوّل سريع.':'Discover strength, conditioning and movement programs with meaningful class details, then save a trial-class preference. No false live availability, athlete testimonials or instant transformation guarantees.'}</p>
     <div className="mt-10 flex flex-wrap items-center gap-3"><Link href={pulsePath(locale,'trial')} className="inline-flex gap-3 items-center bg-[#E0FE61] text-[#141421] px-7 py-5 font-black text-sm hover:bg-white">{ar?'ابدأ اختيار الحصة':'PLAN A TRIAL REQUEST'}<Arrow size={18}/></Link><Link href={pulsePath(locale,'classes')} className="border border-[#EBE9F5] px-7 py-5 text-sm font-black text-white hover:bg-white/10">{ar?'شوف البرامج':'EXPLORE CLASSES'}</Link></div>
    </div>
    <div className="lg:ms-auto max-w-xs border-s-4 border-[#E0FE61] p-7 backdrop-blur-lg bg-[#141421]/80"><p className="text-xs text-[#E0FE61] tracking-widest font-bold">PROGRESS WITHOUT HYPE</p><p className="mt-5 text-2xl font-black">{ar?'ابدأ من خبرتك، مش من المقارنة.':'START WHERE YOU ARE.'}</p><p className="text-sm text-[#D4D1E2] leading-8 mt-4">{ar?'الصفحة توضح طريقة مقارنة البرامج، ولا تعطي خطة تدريب أو تقييمًا طبيًا.':'A class finder is not a medical assessment or individualized exercise prescription.'}</p></div>
   </div>
   <div className="bg-[#E0FE61] text-[#141421] border-y border-[#141421] py-3 overflow-hidden"><div className="max-w-7xl mx-auto px-5 font-black uppercase tracking-[.18em] text-xs flex items-center justify-between gap-4 flex-wrap"><span>MOVE SMARTER</span><span>LEARN THE FORM</span><span>TRAIN WITH INTENTION</span></div></div>
  </section>
  {/* 02 distinct program explorer */}
  <section data-sector-specific="training-discipline-matrix" className="bg-[#F2F2ED] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <p className="text-[#5939B3] text-xs tracking-[.2em] font-black">THE DISCIPLINE MATRIX</p><div className="flex flex-wrap items-end justify-between gap-6 mt-4"><h2 className="pulse-display text-4xl sm:text-6xl font-black">{ar?'3 طرق مختلفة للحركة':'THREE WAYS TO MOVE.'}</h2><Link href={pulsePath(locale,'classes')} className="font-black text-xs inline-flex gap-2">{ar?'كل البرامج':'ALL PROGRAMS'}<Arrow size={17}/></Link></div>
   <div className="grid md:grid-cols-3 gap-4 mt-10">{groups.map((g,i)=>{const Icon=g.icon;return <Link href={pulsePath(locale,'classes')+'?category='+g.slug} key={g.slug} className={'p-8 min-h-[310px] flex flex-col group hover:-translate-y-1 transition-transform '+(i===1?'bg-[#6241AB] text-white':i===2?'bg-[#E0FE61] text-[#141421]':'bg-[#141421] text-white')}>
    <div className="flex justify-between items-start"><Icon size={39} strokeWidth={1.4}/><span className="font-mono text-sm">{g.num}</span></div><div className="mt-auto"><h3 className="pulse-display text-3xl sm:text-4xl font-black">{g.title}</h3><p className={'text-sm mt-5 '+(i<2?'text-[#F5F5FA]':'text-[#141421]')}>{g.sub}</p><span className="mt-6 flex items-center justify-between border-t border-current pt-4 font-black text-xs">{ar?'اختار المجال':'EXPLORE'}<ArrowUpRight size={18}/></span></div>
   </Link>})}</div></div></section>
  {/* 03 deep class dossier / no fake capacity */}
  <section data-sector-specific="fitness-class-dossiers" className="py-20 bg-white"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="grid lg:grid-cols-[1fr_.75fr] gap-10 items-end"><div><p className="font-black text-[#5939B3] uppercase tracking-widest text-xs">NINE REAL TRAINING TOPICS</p><h2 className="pulse-display text-4xl sm:text-6xl mt-5 font-black">{ar?'كل حصة لها هدف واضح':'EVERY CLASS HAS A PURPOSE.'}</h2></div><p className="leading-9 text-sm text-[#353345]">{ar?'تسع حصص بوصف متعمق ومستويات وخطوات وأسئلة، مش قائمة أسماء عامة. الرسالة هنا نموذج محتوى متخصص؛ مش إثبات وجود جدول نادي شغال.':'Nine specific class dossiers with ability levels, duration examples and clear scope. Their presence demonstrates a tailored site, not active enrollment or guaranteed staff.'}</p></div>
   <div className="grid md:grid-cols-3 mt-11 gap-4">{PULSE.services.map((s,i)=><Link key={s.slug} href={pulsePath(locale,'classes/'+s.slug)} className="border-2 border-[#D7D5DF] p-7 min-h-64 flex flex-col hover:border-[#6C49CF] hover:bg-[#F4F1FF] transition-colors">
    <span className="font-mono font-black text-[#5939B3] text-xs">FIELD NOTE / {String(s.rank).padStart(2,'0')}</span><h3 className="font-black text-xl mt-7">{pulseText(s.title,locale)}</h3><p className="text-sm text-[#444254] leading-8 mt-4">{pulseText(s.summary,locale)}</p><span className="flex justify-between items-center mt-auto pt-6 text-xs font-black">{s.durations.join(' / ')} {ar?'دقيقة':'MIN'}<ArrowUpRight size={18}/></span>
   </Link>)}</div></div></section>
  {/* 04 movement-level decision guide */}
  <section data-sector-specific="experience-level-selector" className="bg-[#E0FE61] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.8fr_1fr] gap-10">
   <div><p className="text-xs font-black tracking-[.16em]">STARTING POINT / NOT A FITNESS SCORE</p><h2 className="pulse-display text-4xl sm:text-6xl mt-5">{ar?'مستواك مش منافسة':'YOUR LEVEL. YOUR CONTEXT.'}</h2><p className="mt-6 leading-9 text-sm">{ar?'حدد خبرتك السابقة في الأدوات وممارسة النشاط؛ المستوى لا يحدده شكل الجسم أو رقم على الميزان.':'Class suitability depends on training experience and genuine coaching guidance, not appearance or an invented fitness score.'}</p></div>
   <div className="space-y-3">{[[ar?'أول مرة':'BEGINNER',ar?'تعلم الحركة والمعدات وكيف تسأل المدرب.':'Learn the language of equipment and movement.'],[ar?'راجع بعد انقطاع':'RETURNING',ar?'راجع إيقاعك وتدرّج من نقطة مناسبة.':'Discuss a manageable re-entry and recovery.'],[ar?'عندك خبرة':'INTERMEDIATE',ar?'قارن تفاصيل الشدة وأنواع الأنشطة قبل الاختيار.':'Compare class technique and effort requirements.']].map(([name,desc],i)=><div key={i} className="bg-[#141421] text-white p-7 flex gap-6 items-start"><span className="text-[#E0FE61] font-mono text-3xl font-black">0{i+1}</span><div><h3 className="font-black text-xl">{name}</h3><p className="text-sm leading-8 mt-3 text-[#E5E5F1]">{desc}</p></div></div>)}</div>
  </div></section>
  {/* 05 illustrated timetable, explicitly not available */}
  <section data-sector-specific="illustrative-gym-week" className="py-20 bg-[#F2F2ED]"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="flex flex-wrap gap-8 justify-between items-end"><div><p className="font-black text-xs tracking-widest text-[#5939B3]">THE EDITORIAL WEEK</p><h2 className="pulse-display text-4xl sm:text-6xl mt-4">{ar?'شكل أسبوع متنوع':'AN EXAMPLE WEEK, NOT LIVE SLOTS.'}</h2></div><Link href={pulsePath(locale,'schedule')} className="font-black text-sm inline-flex items-center gap-3">{ar?'إزاي الجدول المفروض يشتغل؟':'HOW A REAL TIMETABLE WORKS'}<Arrow size={18}/></Link></div>
   <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-3">{timetable.map(([_,day,slug],i)=>{const s=PULSE.services.find(x=>x.slug===slug)!;return <div key={i} className="bg-white border-2 border-[#D7D5DF] flex gap-5 items-center p-6"><span className="font-black font-mono text-[#6847CB] text-sm">{day}</span><div><h3 className="font-bold text-sm">{pulseText(s.title,locale)}</h3><p className="text-xs mt-2 text-[#41404F]">{s.durations[0]}–{s.durations.at(-1)} MIN · {ar?'مثال فقط':'ILLUSTRATIVE'}</p></div></div>})}</div>
   <p className="text-xs text-[#343347] leading-8 mt-6">{ar?'لا توجد حصص أو سعة أو مدربين محسوبين في الجدول؛ التوقيت مجرد مثال تنظيمي ويحتاج تأكيد صاحب النادي.':'No times, real capacity or instructors are claimed. Operators must connect their verified actual availability before enabling real booking.'}</p>
  </div></section>
  {/* 06 real licensed field photograph editorial */}
  <section data-sector-specific="equipment-photo-story" className="grid lg:grid-cols-2 bg-[#141421] text-white"><div className="relative min-h-[370px] lg:min-h-[650px] overflow-hidden">
   <img src={PULSE_MEDIA.equipment} loading="lazy" className="absolute h-full w-full object-cover" alt={ar?'صورة CC0 حقيقية لأجهزة جيم داخل منشأة مستقلة لا تتبع Pulse':'CC0 editorial photo of real exercise equipment at an unrelated facility'}/>
   <span className="absolute bottom-5 start-5 text-xs bg-[#141421]/90 px-3 py-2 text-[#E5E5F1]">Teddyhtsai · CC0 · Wikimedia Commons · Editorial</span>
  </div><div className="p-8 sm:p-16 lg:p-20 flex flex-col justify-center"><p className="text-[#E0FE61] text-xs uppercase tracking-[.2em] font-black">EQUIPMENT, NOT INVENTED PROOF</p><h2 className="pulse-display text-4xl sm:text-6xl mt-7 leading-tight">{ar?'صورة معدات حقيقية. بدون ادعاء مقر حقيقي.':'REAL EQUIPMENT. REAL TRANSPARENCY.'}</h2><p className="mt-7 text-[#E7E5F1] leading-9 text-sm">{ar?'الصورة تحريرية مرخصة لأجهزة داخل منشأة أخرى، وليست تصويرًا لجيم Pulse. نجاح موقع عميل حقيقي يحتاج صور المكان والأجهزة التي يديرها وحقوق استخدامها.':'This properly licensed editorial photograph is from another venue and does not depict a Pulse District gym. A commissioned business website should use approved operator imagery and accurate actual equipment information.'}</p><Link href={pulsePath(locale,'locations')} className="mt-8 font-black text-[#E0FE61] text-sm inline-flex gap-3">{ar?'تفاصيل المقر والبيانات الواجب تأكيدها':'Real facility-information requirements'}<Arrow size={17}/></Link></div></section>
  {/* 07 membership path comparison */}
  <section data-sector-specific="fitness-membership-guide" className="py-20 bg-white"><div className="max-w-7xl mx-auto px-5 sm:px-8"><div className="max-w-3xl"><p className="text-xs text-[#5939B3] tracking-widest font-black">MEMBERSHIP LOGIC</p><h2 className="pulse-display text-4xl sm:text-6xl mt-5">{ar?'قارن طريقة الاستخدام قبل أي اشتراك':'CHOOSE ACCESS BEFORE A PRICE TAG.'}</h2></div>
   <div className="grid md:grid-cols-3 mt-10 gap-4">{[[ar?'تجربة حصة':'TRY A CLASS',ar?'لفهم نوع النشاط وهل بيئة الكلاس مناسبة.':'Understand class style and training format before committing.'],[ar?'اهتمام بكلاسات':'CLASS INTEREST',ar?'اسأل عن عدد الحصص والقيود وسياسة الإلغاء.':'Ask about class limits, eligibility and cancellations.'],[ar?'اهتمام بعضوية':'MEMBERSHIP INTEREST',ar?'اطلب الشروط الفعلية والخدمات الموجودة في الفرع.':'Request approved terms and actual included facilities.']].map(([name,desc],i)=><article key={i} className={'border-2 border-[#141421] p-8 min-h-[290px] flex flex-col '+(i===1?'bg-[#8E6BFF] text-[#141421]':'bg-[#F2F2ED]')}><span className="font-mono font-black text-xs">PLAN / 0{i+1}</span><h3 className="pulse-display font-black text-2xl sm:text-3xl mt-10">{name}</h3><p className="text-sm mt-5 leading-8">{desc}</p><Link href={pulsePath(locale,'memberships')} className="flex gap-2 font-black text-xs mt-auto pt-6">{ar?'تفاصيل المقارنة':'COMPARE OPTIONS'}<Arrow size={16}/></Link></article>)}</div>
   <p className="mt-6 text-xs leading-8 text-[#41404F]">{ar?'لا أسعار حقيقية ولا تحصيل ولا عضوية نشطة في هذه التجربة.':'No real prices, payments, active membership privileges or capacity are offered by this editorial concept.'}</p>
  </div></section>
  {/* 08 qualified coach roles without fake profiles */}
  <section data-sector-specific="gym-coach-method" className="bg-[#E5E2F1] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.8fr_1fr] gap-12">
   <div><p className="font-black text-xs tracking-widest text-[#5939B3]">COACHING ROLES / NO FICTIONAL TRAINERS</p><h2 className="pulse-display text-4xl sm:text-6xl mt-5">{ar?'المدرب الصح يشرح قبل ما يطلب':'THE RIGHT QUESTIONS COME FIRST.'}</h2><p className="text-sm leading-9 mt-6">{ar?'ممكن تعرف تخصص الحصة من الصفحة. لكن أسماء المدربين وخبرتهم وصورهم ووردياتهم تُنشر فقط عند وجود مشغّل يملك بيانات فعلية موثقة.':'Service specializations can be explained without inventing coaches. Names, qualifications, photos and schedules require actual operator-approved records.'}</p></div>
   <div className="grid gap-4">{[[Dumbbell,ar?'تخصص أساسيات القوة':'STRENGTH FOUNDATIONS',ar?'شكل الحركة، المجهود والتدرج.':'Technique, progression and practical setup.'],[Activity,ar?'تخصص لياقة جماعية':'GROUP CONDITIONING',ar?'إيقاع الحصة والمجموعات والراحة.':'Session pacing, group structure and recovery.'],[Footprints,ar?'تخصص حركة':'MOVEMENT QUALITY',ar?'حدود مريحة وخيارات مناسبة للمستويات.':'Accessible movement variations and comfortable range.']].map(([Icon,name,desc],i)=><div key={i} className="bg-white p-7 flex gap-5 items-center border-s-4 border-[#8E6BFF]"><Icon size={29} className="text-[#5939B3] shrink-0"/><div><h3 className="text-lg font-black">{name as string}</h3><p className="text-sm mt-2 text-[#3F3D51]">{desc as string}</p></div></div>)}</div>
  </div></section>
  {/* 09 authored editorial education */}
  <section data-sector-specific="training-education" className="py-20 bg-[#F2F2ED]"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black text-[#5939B3]">TRAINING NOTES</p><h2 className="pulse-display text-4xl sm:text-6xl mt-5">{ar?'افهم قبل ما تختار':'READ. ASK. THEN DECIDE.'}</h2></div><Link href={pulsePath(locale,'journal')} className="inline-flex font-black text-sm gap-2">{ar?'دليل التدريب':'ALL NOTES'}<Arrow size={17}/></Link></div>
   <div className="grid md:grid-cols-3 mt-10 gap-5">{PULSE.articles.map((g,i)=><Link key={g.slug} href={pulsePath(locale,'journal/'+g.slug)} className="min-h-[310px] bg-white border-2 border-[#DBD9E2] p-8 flex flex-col hover:border-[#6F4AE0]"><BookOpen size={31} className="text-[#5939B3]"/><span className="font-mono text-xs font-bold text-[#5939B3] mt-9">FIELD NOTE / 0{i+1}</span><h3 className="font-black text-xl mt-4">{pulseText(g.title,locale)}</h3><p className="text-sm mt-4 leading-8 text-[#3F3D51]">{pulseText(g.summary,locale)}</p><span className="inline-flex gap-2 font-black text-xs items-center mt-auto pt-6">{ar?'اقرأ أكثر':'READ NOTE'}<ArrowUpRight size={16}/></span></Link>)}</div>
  </div></section>
  {/* 10 honest FAQ */}
  <section data-sector-specific="gym-buyer-questions" className="py-20 bg-[#E0FE61]"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.7fr_1fr] gap-12">
   <div><p className="text-xs font-black tracking-widest">NO MADE-UP AVAILABILITY</p><h2 className="pulse-display text-4xl sm:text-6xl mt-5">{ar?'أسئلة لازم نجاوب عليها بوضوح':'GOOD QUESTIONS. NO FAKE ANSWERS.'}</h2></div>
   <div className="space-y-3">{PULSE.faq.map((f,i)=><details key={i} className="border-2 border-[#141421] bg-[#F8F9F4] p-6"><summary className="cursor-pointer font-black text-base">{pulseText(f.q,locale)}</summary><p className="mt-4 text-sm leading-8 text-[#343347]">{pulseText(f.a,locale)}</p></details>)}</div>
  </div></section>
  {/* 11 Mavvix real business conversion */}
  <section data-sector-specific="mavvix-gym-proposal" className="py-20 bg-[#141421] text-white"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] items-center gap-12"><div><p className="font-black text-xs tracking-widest text-[#E0FE61]">MAVVIX / THE FITNESS BUSINESS WEBSITE</p><h2 className="pulse-display text-4xl sm:text-6xl mt-6">{ar?'ناديك الحقيقي يستاهل حضور مميز':'BUILD A SITE FOR YOUR REAL FITNESS BUSINESS.'}</h2><p className="text-[#E4E3F1] text-sm leading-9 mt-6 max-w-3xl">{ar?'مافكس تقدر تعرض برامجك ومواعيدك المعتمدة ومدربيك الفعليين، وتربط الطلبات بنظام إدارة النادي عند الحاجة.':'Mavvix can launch your real class catalogue, approved timetable, coach profiles and enquiries with the right operator-controlled integrations.'}</p></div><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="bg-[#E0FE61] text-[#141421] px-8 py-5 font-black text-sm inline-flex gap-3">{ar?'اطلب موقع لجيمك':'DISCUSS YOUR FITNESS WEBSITE'}<ArrowUpRight size={18}/></a></div></section>
 </div>;
}
