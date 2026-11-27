import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { PAWWELL, PAW_HERO_IMAGE, PAW_HERO_IMAGE_SOURCE, pawPath, pawText } from '@/lib/verticals/veterinary/data';
import { PawPrint, ArrowUpRight, ArrowRight, ArrowLeft, Heart, CalendarDays, ShieldCheck, BookOpen,
 Stethoscope, HeartPulse, Cat, Dog, Rabbit, Bird, Sparkles, Activity, ClipboardList, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { PawWellCareProtocolCalibrator } from './PawWellCareProtocolCalibrator';
import { PawWellClinicalEthics } from './PawWellClinicalEthics';
import { PawWellVisualAtelier } from './PawWellVisualAtelier';

export default async function PawWellHome(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const steps = [
    [ar ? 'النوع والعمر' : 'Species & age band', ar ? 'الاحتياجات بتختلف من نوع لآخر؛ ابدأ بتصنيف آمن وعام.' : 'Start with general pet category and age range, without private medical details.'],
    [ar ? 'سبب الزيارة' : 'Visit category', ar ? 'اختار متابعة أو وقاية أو عناية دون افتراض تشخيص.' : 'Select wellness, prevention or grooming without diagnosing the animal online.'],
    [ar ? 'تفضيل الموعد' : 'Your preference', ar ? 'يتم حفظ الاستفسار فقط، والتأكيد مسؤولية عيادة حقيقية.' : 'Only a request preference is saved; a genuine clinic must confirm a slot.'],
  ];

  return (
    <div>
      {/* 01: Asymmetrical soft-corner hero and editorial real dog image */}
      <section data-sector-specific="pet-first-hero" className="bg-[#F9F6EE] relative overflow-hidden">
        <div className="pointer-events-none absolute -end-16 top-[-140px] w-[500px] h-[500px] rounded-full bg-[#E9EEE3]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-24 pb-20 sm:pb-28 relative grid lg:grid-cols-[1fr_.93fr] items-center gap-12 lg:gap-16">
          <div>
            <span className="text-[#875231] text-xs font-black tracking-[.16em] uppercase flex gap-2 items-center">
              <PawPrint size={17} /> A LITTLE MORE CARE, EVERY DAY
            </span>
            <h1 className="paw-display text-[clamp(3rem,6vw,6.6rem)] font-black leading-[1.06] mt-7 tracking-tight">
              {ar ? <>كل كائن صغير <em className="not-italic text-[#A65D3B]">يستاهل رعاية كبيرة.</em></> : <>A whole lot of love for <em className="not-italic text-[#A65D3B]">little lives.</em></>}
            </h1>
            <p className="text-[#2E5246] text-base sm:text-lg leading-9 mt-7 max-w-xl">
              {ar ? 'استكشف ملف الرعاية المناسبة لحيوانك، وجهز الأسئلة قبل الزيارة، وجرّب طلب موعد بشكل منظم. بدون نصائح علاجية عن بعد أو ادعاء تشغيل عيادة فعلية.' : 'Understand the kind of care your pet may need, prepare practical questions and experience a clear nonbinding visit request. No online diagnosis, fictional veterinarians or unverified clinic availability.'}
            </p>
            <div className="flex gap-3 flex-wrap mt-9">
              <Link href={pawPath(locale, 'request')} className="inline-flex gap-3 items-center bg-[#24463D] text-white rounded-full px-8 py-5 font-black text-sm hover:bg-[#35584A] transition-colors">
                {ar ? 'ابدأ استفسار الزيارة' : 'Prepare a visit enquiry'}
                <Arrow size={18} />
              </Link>
              <Link href={pawPath(locale, 'services')} className="inline-flex items-center gap-2 border border-[#A8BAAE] px-7 py-5 rounded-full text-sm font-bold hover:bg-[#F0F3EA] transition-colors">
                {ar ? 'دليل الرعاية' : 'Care guide'}
              </Link>
            </div>
            <div className="mt-10 inline-flex gap-3 items-center text-xs text-[#24463D] font-medium">
              <ShieldCheck size={19} />
              <span>{ar ? 'المعلومة للتثقيف. الفحص والعلاج للطبيب البيطري الحقيقي.' : 'Helpful context, not a substitute for a veterinarian.'}</span>
            </div>
          </div>
          <div className="relative min-h-[410px] sm:min-h-[550px] lg:min-h-[660px]">
            <div className="absolute inset-x-3 inset-y-4 rounded-[48%_44%_28%_30%] bg-[#EAC8AB] rotate-[-5deg]" />
            <img src={PAW_HERO_IMAGE} alt={ar ? 'كلب شيه تزو حقيقي على طاولة فحص في مكتب بيطري مستقل لا يتبع PawWell' : 'Real Shih Tzu on an exam table at an unrelated veterinary office; editorial photography'} className="absolute inset-[4%_4%_5%_4%] w-[92%] h-[91%] object-cover object-center rounded-[48%_44%_28%_30%] shadow-[0_30px_70px_rgba(36,70,61,.17)]" loading="eager" />
            <div className="absolute bottom-2 end-0 bg-[#24463D] rounded-[2rem] text-white p-5 sm:p-7 w-[175px] sm:w-[210px] shadow-xl">
              <Heart size={24} className="text-[#F3B98E]" />
              <p className="text-sm sm:text-base font-extrabold mt-4 leading-7">
                {ar ? 'الرعاية تبدأ بسؤال صحيح.' : 'Care begins with understanding.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Species category selection */}
      <section data-sector-specific="species-guided-selector" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[.65fr_1fr] gap-10 items-end">
            <div>
              <span className="text-xs uppercase tracking-widest font-black text-[#915736]">MEET YOUR COMPANION</span>
              <h2 className="paw-display text-4xl sm:text-5xl font-black mt-5">{ar ? 'نوع الحيوان يغير الأسئلة' : 'Different friends, different needs'}</h2>
            </div>
            <p className="text-base leading-8 text-[#486358]">
              {ar ? 'دليل الاختيار يبدأ بنوع الحيوان بدل افتراض برنامج واحد لكل الأنواع، وبيربطك بالخدمات الملائمة كأمثلة فقط.' : 'Start by exploring which care discussions are appropriate for a pet’s species; a real professional determines the actual clinical program.'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mt-11">
            {PAWWELL.species.map((p, i) => {
              const Icon = i === 0 ? Dog : i === 1 ? Cat : i === 2 ? Rabbit : i === 3 ? Bird : PawPrint;
              return (
                <Link key={p.id} href={pawPath(locale, 'pets') + '?species=' + p.id} className="group bg-[#F4F7F0] border border-[#D9E6D7] rounded-[1.6rem] min-h-[175px] p-6 flex flex-col justify-between hover:bg-[#E6EEDD] transition-colors">
                  <Icon size={33} strokeWidth={1.5} className="text-[#467262]" />
                  <h3 className="font-black text-lg mt-7">{p[locale]}</h3>
                  <ArrowUpRight size={17} className="self-end text-[#6A8B78]" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signature 01: Species & Life-Stage Preventive Care Calibrator */}
      <section data-sector-specific="care-protocol-calibrator" className="py-20 bg-[#F4FAF5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <PawWellCareProtocolCalibrator locale={locale} />
        </div>
      </section>

      {/* 03 Preventive care decision storytelling */}
      <section data-sector-specific="preventive-health-journey" className="bg-[#E9EEDF] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.95fr_1.05fr] gap-12">
          <div>
            <p className="text-[#915736] font-black tracking-widest text-xs">CARE THROUGH THE SEASONS</p>
            <h2 className="paw-display text-4xl sm:text-6xl font-black mt-5">{ar ? 'الصغير بيكبر... وخطة الرعاية تتغير' : 'Growing changes the conversation'}</h2>
            <p className="mt-6 text-[#486358] leading-9">
              {ar ? 'زيارة الجراء الصغيرة غير متابعة حيوان متقدم في السن. الطبيب بيحدد ما يلزم حسب الحالة والنوع وسجل الزيارات، والموقع هنا يساعدك تعرف الأسئلة المفيدة فقط.' : 'An early puppy or kitten visit, an adult check-in and a senior-pet review each raise different care questions. A veterinarian—not a generic website—determines any necessary examination or treatment.'}
            </p>
            <Link href={pawPath(locale, 'prevention')} className="inline-flex gap-2 items-center border-b border-[#24463D] mt-8 pb-2 text-sm font-black">
              {ar ? 'خطوات العناية الوقائية' : 'Explore prevention guidance'}
              <Arrow size={18} />
            </Link>
          </div>
          <div className="grid gap-3">
            {[[ar ? 'بداية الحياة' : 'Early stages', ar ? 'التغذية والوقاية والتنشئة مع مختص.' : 'Foundations, feeding and preventive discussion.', Heart],
              [ar ? 'النشاط اليومي' : 'Active years', ar ? 'تغيرات الشهية والوزن والنشاط وسجل الزيارات.' : 'Habits, weight changes and care records.', Activity],
              [ar ? 'سنوات الخبرة' : 'Senior years', ar ? 'الراحة والحركة وجودة الحياة، من غير تطبيع أعراض جديدة.' : 'Comfort, mobility and quality of life without dismissing new signs.', HeartPulse]].map(([title, description, Icon], i) => (
              <div key={i} className="bg-white rounded-[1.8rem] p-7 border border-[#CEDDCE] flex items-start gap-5">
                <span className="w-12 h-12 bg-[#F3B98E] rounded-full shrink-0 grid place-items-center text-[#24463D]">
                  <Icon size={23} />
                </span>
                <div>
                  <h3 className="font-black text-xl text-[#24463D]">{title as string}</h3>
                  <p className="text-[#4E6B5D] mt-2 text-sm leading-8">{description as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Specialist services */}
      <section data-sector-specific="pet-service-pathways" className="py-20 sm:py-24 bg-[#FBF9F3]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div>
              <span className="text-[#915736] text-xs tracking-widest font-black">EIGHT CARE DOSSIERS</span>
              <h2 className="paw-display text-4xl sm:text-5xl mt-4 font-black">{ar ? 'محتوى يفهمك الخدمة قبل ما تسأل' : 'Care topics worth understanding first'}</h2>
            </div>
            <Link href={pawPath(locale, 'services')} className="inline-flex gap-2 font-bold text-sm items-center text-[#24463D] hover:text-[#915736] transition-colors">
              {ar ? 'كل الخدمات' : 'All service guides'}
              <Arrow size={18} />
            </Link>
          </div>
          <div className="mt-11 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {PAWWELL.services.map((s, i) => (
              <Link href={pawPath(locale, 'services/' + s.slug)} key={s.slug} className="bg-white border border-[#D9E6D7] p-7 rounded-[1.7rem] hover:shadow-xl transition-shadow min-h-[280px] flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-[#93583D]">PAW / 0{i + 1}</span>
                  <Stethoscope size={20} strokeWidth={1.5} className="text-[#24463D]" />
                </div>
                <h3 className="text-xl font-black mt-8 leading-7 text-[#24463D]">{s.title[locale]}</h3>
                <p className="text-[#47675B] text-sm mt-3 leading-8">{s.summary[locale]}</p>
                <span className="inline-flex gap-2 items-center font-black text-xs mt-auto pt-6 text-[#915736]">
                  {ar ? 'اقرأ دليل الخدمة' : 'Service details'}
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature 02: Veterinary Clinical Ethics & Governance Standards */}
      <section data-sector-specific="clinical-ethics" className="py-20 bg-[#FCFDF8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <PawWellClinicalEthics locale={locale} />
        </div>
      </section>

      {/* 05 Professional trust and real vet boundary */}
      <section data-sector-specific="clinician-roles-vs-real-staff" className="bg-[#24463D] text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.7fr_1.2fr] gap-12 items-center">
          <div>
            <span className="text-[#F3B98E] font-black text-xs tracking-widest">BEHIND EACH VISIT</span>
            <h2 className="paw-display text-4xl sm:text-5xl font-black mt-6">{ar ? 'الفريق الحقيقي هو اللي يحدد الرعاية' : 'Professionals, not online promises'}</h2>
          </div>
          <div>
            <p className="text-[#EBF2E9] leading-9 text-base">
              {ar ? 'كل تخصص بيطري يحتاج مؤهلات وفريق فعلي ووسائل فحص معتمدة؛ لذلك مش بنعرض أسماء أطباء أو شهادات خيالية. عند تنفيذ موقع لعيادة حقيقية بنضيف بيانات المختصين بعد موافقة صاحبها.' : 'A real veterinary team must have appropriate qualifications, equipment and confirmed availability. This concept does not invent practitioners, operating rooms, branches or professional certifications. Actual client sites should display only verified team details.'}
            </p>
            <Link href={pawPath(locale, 'team')} className="inline-flex items-center gap-3 text-[#F3B98E] font-black text-sm mt-7 hover:underline">
              {ar ? 'افهم تخصصات الرعاية' : 'Learn about care specialties'}
              <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 06 Safety alert */}
      <section data-sector-specific="emergency-signs" className="bg-[#F8E4D4] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <AlertTriangle size={40} className="text-[#8A3A26]" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#723222]">{ar ? 'في حالات ما ينفعش تستنى رد نموذج' : 'Some symptoms cannot wait for a website form'}</h2>
            <p className="leading-8 text-sm mt-3 text-[#6D3828]">
              {ar ? 'صعوبة تنفس شديدة أو تشنجات أو نزف مستمر أو ابتلاع مادة سامة أو عدم القدرة على التبول يحتاج تواصل عاجل مع طبيب بيطري يعمل بالفعل. PawWell ليس خدمة طوارئ.' : 'Severe breathing difficulty, seizures, persistent bleeding, poisoning or inability to urinate may require prompt veterinary assistance. PawWell does not provide emergency response.'}
            </p>
          </div>
          <Link href={pawPath(locale, 'emergencies')} className="text-[#723222] text-xs font-black border-b border-[#723222] pb-1 inline-flex items-center gap-2">
            {ar ? 'إرشاد الطوارئ' : 'Emergency guidance'}
            <Arrow size={16} />
          </Link>
        </div>
      </section>

      {/* 07 Preparing visit cards */}
      <section data-sector-specific="pre-visit-checklist" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-black text-[#915736] tracking-widest">THE APPOINTMENT PREP LIST</p>
          <h2 className="paw-display text-4xl sm:text-5xl mt-5 text-[#24463D]">{ar ? 'جهّز معلومات تساعد الطبيب' : 'A little preparation makes visits clearer'}</h2>
          <div className="grid lg:grid-cols-3 gap-4 mt-11">
            {[[ar ? 'النوع والفئة العمرية' : 'Species and life stage', ar ? 'أساس اختيار الموضوع المناسب للمناقشة.' : 'Helpful context for an appropriate care conversation.', PawPrint],
              [ar ? 'سجل الزيارات' : 'Care notes and records', ar ? 'احتفظ بسجل التطعيمات والمراجعات وأحضره للعيادة الحقيقية.' : 'Bring past care and vaccination records to an actual appointment.', ClipboardList],
              [ar ? 'مكان آمن للنقل' : 'Safe travel arrangement', ar ? 'تأكد من وسيلة نقل مناسبة وأرقام التواصل الحقيقية.' : 'Plan suitable pet transport and real clinic contact details.', ShieldCheck]].map(([title, body, Icon], i) => (
              <article key={i} className="rounded-[2rem] p-8 bg-[#F5F7F0] border border-[#DDE9D9]">
                <Icon size={32} className="text-[#AD6B46]" />
                <span className="text-xs font-mono mt-8 block text-[#915736]">PREP / 0{i + 1}</span>
                <h3 className="font-black text-xl mt-3 text-[#24463D]">{title as string}</h3>
                <p className="text-[#49665A] mt-4 leading-8 text-sm">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature 03: Verified Clinical Facilities & Living Photographic Archive */}
      <section data-sector-specific="pawwell-visual-atelier" className="py-20 bg-[#F4F7F0]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <PawWellVisualAtelier locale={locale} />
        </div>
      </section>

      {/* 08 Request process */}
      <section data-sector-specific="vet-request-not-booking" className="bg-[#E8EFE5] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-black text-[#915736] tracking-widest">THE PAWWELL VISIT JOURNEY</p>
              <h2 className="paw-display text-4xl sm:text-5xl mt-5 text-[#24463D]">{ar ? 'ثلاث خطوات بسيطة... من غير حجز وهمي' : 'A clear request, not a fictional appointment'}</h2>
            </div>
            <p className="text-[#45665A] leading-9">
              {ar ? 'التجربة بتساعدك تحدد نوع الحيوان وسبب الزيارة والتوقيت المفضل، وتحفظ الطلب برقم مرجعي. ده لا يعني وجود فرع أو طبيب أو موعد معتمد.' : 'The website records species, age band, the visit topic and preferred timing with a unique reference. Nothing is booked at an operating practice; a real clinic would need to confirm any appointment.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {steps.map(([title, description], i) => (
              <div key={i} className="rounded-[1.5rem] p-7 bg-white border border-[#CEDDCD]">
                <span className="text-4xl font-black paw-display text-[#AD6B46]">0{i + 1}</span>
                <h3 className="font-black text-xl mt-6 text-[#24463D]">{title}</h3>
                <p className="text-sm text-[#49665A] leading-8 mt-4">{description}</p>
              </div>
            ))}
          </div>
          <Link href={pawPath(locale, 'request')} className="inline-flex gap-3 mt-10 bg-[#24463D] text-white px-8 py-5 rounded-full text-sm font-black items-center hover:bg-[#35584A] transition-colors">
            {ar ? 'جرّب طلب الزيارة' : 'Try the visit enquiry'}
            <Arrow size={18} />
          </Link>
        </div>
      </section>

      {/* 09 Authentic editorial photo, credits and source */}
      <section data-sector-specific="actual-photo-provenance" className="grid lg:grid-cols-[1fr_.75fr] bg-[#24463D] text-white">
        <div className="min-h-[360px] lg:min-h-[510px] relative">
          <img src={PAW_HERO_IMAGE} loading="lazy" alt={ar ? 'صورة فوتوغرافية حقيقية لكلب في مكتب بيطري مستقل وليست عيادة PawWell' : 'An unrelated real veterinary office with Shih Tzu dog, editorial only'} className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute bottom-4 start-4 bg-[#17362D]/95 p-3 text-xs text-white">MarkBuckawicki · CC0 · Wikimedia Commons</span>
        </div>
        <div className="p-8 sm:p-14 lg:p-16 flex flex-col justify-center">
          <h2 className="paw-display text-4xl sm:text-5xl">{ar ? 'صور حقيقية... بدون قصص مختلقة' : 'Real photography, transparent context'}</h2>
          <p className="mt-7 leading-9 text-[#ECF4E9] text-sm">
            {ar ? 'الصورة الأصلية لعيادة مستقلة مصورة في 2014 بتصريح CC0، وليست فرع PawWell أو صورة مريض حقيقي لدى علامة تجارية غير موجودة. عند العمل لعميل نستخدم بيانات وصور عيادته المعتمدة.' : 'The licensed photo depicts a real unrelated veterinary office, captured in 2014. It is not PawWell premises, a Mavvix client or evidence of treatment. A commissioned site would use the real clinic’s approved photography.'}
          </p>
          <a target="_blank" rel="noopener noreferrer" href={PAW_HERO_IMAGE_SOURCE} className="mt-9 inline-flex gap-3 items-center text-[#F3B98E] underline underline-offset-4 text-sm font-bold">
            {ar ? 'الصور والترخيص من المصدر' : 'Photograph source and license'}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* 10 original articles */}
      <section data-sector-specific="original-pet-care-reading" className="bg-[#FBF9F3] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-end gap-6 justify-between flex-wrap">
            <div>
              <p className="text-xs tracking-widest font-black text-[#915736]">THE PET PARENT JOURNAL</p>
              <h2 className="paw-display text-4xl sm:text-5xl mt-5 text-[#24463D]">{ar ? 'مقالات تفيدك قبل الزيارة' : 'Better questions for every pet family'}</h2>
            </div>
            <Link href={pawPath(locale, 'guides')} className="text-sm font-bold inline-flex gap-2 items-center text-[#24463D] hover:text-[#915736] transition-colors">
              {ar ? 'كل المقالات' : 'All care articles'}
              <Arrow size={17} />
            </Link>
          </div>
          <div className="mt-11 grid md:grid-cols-3 gap-4">
            {PAWWELL.articles.map((a, i) => (
              <Link href={pawPath(locale, 'guides/' + a.slug)} key={a.slug} className="bg-white border border-[#DDE7D7] rounded-3xl p-8 min-h-[300px] flex flex-col hover:shadow-xl transition-shadow">
                <BookOpen className="text-[#B26C48]" size={30} />
                <span className="font-mono text-xs text-[#915736] block mt-9">PAW JOURNAL / 0{i + 1}</span>
                <h3 className="text-xl font-black mt-4 leading-8 text-[#24463D]">{a.title[locale]}</h3>
                <p className="text-[#45665A] text-sm mt-4 leading-8">{a.summary[locale]}</p>
                <span className="mt-auto pt-6 text-sm font-bold inline-flex gap-2 items-center text-[#915736]">
                  {ar ? 'اقرأ المقال' : 'Read guide'}
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11 FAQ */}
      <section data-sector-specific="pet-owner-faq" className="bg-[#E8EFE5] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.75fr_1.25fr] gap-10">
          <div>
            <p className="text-[#915736] font-bold text-xs tracking-widest">FAQ / PRACTICAL TRUTH</p>
            <h2 className="paw-display text-4xl sm:text-5xl mt-5 text-[#24463D]">{ar ? 'إجابات واضحة... لراحة بالك' : 'Thoughtful answers for pet parents'}</h2>
          </div>
          <div className="space-y-3">
            {PAWWELL.faq.map((f, i) => (
              <details key={i} className="rounded-2xl border border-[#CADCCE] bg-white p-6 open:shadow-lg">
                <summary className="cursor-pointer font-black text-base text-[#24463D]">{f.q[locale]}</summary>
                <p className="text-sm leading-8 text-[#49665A] mt-5">{f.a[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Commercial conversion */}
      <section data-sector-specific="mavvix-vet-cta" className="bg-[#F3B98E] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="text-[#713D25] font-black tracking-widest text-xs">MAVVIX / BUILD YOUR OWN CLINIC WEBSITE</p>
            <h2 className="paw-display text-4xl sm:text-5xl mt-5 max-w-3xl text-[#24463D]">{ar ? 'عيادتك الحقيقية تستحق تجربة رقمية مميزة' : 'Your real veterinary practice deserves its own identity'}</h2>
            <p className="mt-6 text-[#5A3826] leading-9 max-w-2xl text-sm">
              {ar ? 'نحوّل بيانات خدماتك وأطباءك الفعليين إلى موقع عربي/إنجليزي، مع إدارة الاستفسارات وإمكانية ربط نظام الحجز عند توفره.' : 'Mavvix can design around your real clinicians, services, approved content, consent and operational booking integration.'}
            </p>
          </div>
          <a target="_blank" rel="noopener noreferrer" href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'} className="bg-[#24463D] text-white px-8 py-5 rounded-full inline-flex gap-3 font-black text-sm items-center hover:bg-[#35584A] transition-colors">
            {ar ? 'تواصل مع مافكس' : 'Build my veterinary site'}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
