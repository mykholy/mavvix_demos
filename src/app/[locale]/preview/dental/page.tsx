import type { Metadata } from 'next';
import { SectorDepth } from '@/components/shared/SectorDepth';
import { SectorPhoto } from '@/components/shared/SectorPhoto';
import { getSectorHeroStyle } from '@/lib/media/sector-images';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDentalServices, getDentalPractitioners, getEditorialPosts, getDentalLocations } from '@/lib/db/repositories';
import DentalHomeFinder from './DentalHomeFinder';
import {
  Calendar, ShieldCheck, HeartHandshake, Sparkles, Clock, CheckCircle2,
  ChevronRight, ArrowRight, ArrowLeft, VolumeX, Eye, Smile, HelpCircle
} from 'lucide-react';



export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const ar = params.locale === 'ar';
  const title = ar ? "موقع عيادات أسنان | خدمات وإرشادات ومواعيد | مافكس" : "Dental Clinic Website | Services, Patient Guide & Appointments | Mavvix";
  const description = ar ? "موقع متخصص للعيادات يعرض الخدمات وإرشادات الزيارة الأولى ونماذج طلب الموعد، صُمم بواسطة مافكس." : "A specialist dental website experience with service information, first-visit guidance and appointment requests, crafted by Mavvix.";
  return { title, description, openGraph: {title, description, locale: ar ? 'ar_EG' : 'en_US', type: 'website'}, twitter: {card:'summary_large_image',title,description} };
}

export default async function DentalHomePage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const services = getDentalServices(locale);
  const practitioners = getDentalPractitioners(locale);
  const articles = getEditorialPosts('dental', locale);
  const locations = getDentalLocations(locale);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDF5F2] via-[#F4F8F7] to-[#F7FAF9] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E0EBE7]" style={getSectorHeroStyle('dental')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Clinical Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#193A39]/10 text-[#193A39] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#2C5251]" />
                <span>{isAr ? 'طب الأسنان بأسلوب هادئ ومريح' : 'Mindful Dental Care'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#193A39] leading-[1.15]">
                {isAr
                  ? 'رعاية طبية تضع راحتك النفسية وصحة ابتسامتك في المقدمة'
                  : 'Gentle, evidence-based dentistry designed around your peace of mind.'}
              </h1>

              <p className="text-sm sm:text-base text-[#466662] max-w-xl leading-relaxed">
                {isAr
                  ? 'في لومِن، نلغي قلق زيارة طبيب الأسنان عبر غرف علاجية هادئة، وفحوصات رقمية دقيقة، ومناقشة تفصيلية لكل خيارات العلاج قبل البدء.'
                  : 'At Lumen, we replace clinical anxiety with unhurried consultations, restorative acoustics, and low-dose digital diagnostics. Every treatment plan is agreed upon collaboratively.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/${locale}/preview/dental/request-appointment`}
                  className="px-6 py-3.5 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#7AC7A5]" />
                  <span>{isAr ? 'طلب استشارة تجريبية' : 'Request Consultation'}</span>
                </Link>
                <Link
                  href={`/${locale}/preview/dental/patient-guide`}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#EDF5F2] text-[#193A39] border border-[#CDE0D9] text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-[#2C5251]" />
                  <span>{isAr ? 'دليل الزيارة الأولى' : 'First Visit Guide'}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#DDE7E3]">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#193A39]">0%</div>
                  <div className="text-[11px] sm:text-xs text-[#557874]">{isAr ? 'ضغط أو إجراءات متسرعة' : 'Rush or pressure'}</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#193A39]">100%</div>
                  <div className="text-[11px] sm:text-xs text-[#557874]">{isAr ? 'شفافية الخطط والتكاليف' : 'Care plan transparency'}</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#193A39]">3</div>
                  <div className="text-[11px] sm:text-xs text-[#557874]">{isAr ? 'استوديوهات مهدئة ومجهزة' : 'Restorative studios'}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-[#D5E3DE] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#EAEFEF]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EDF5F2] flex items-center justify-center text-[#193A39]">
                      <Smile className="w-5 h-5 text-[#2C5251]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#193A39]">{isAr ? 'بروتوكول الراحة في لومِن' : 'Lumen Comfort Protocol'}</div>
                      <div className="text-[11px] text-[#557874]">{isAr ? 'معايير زيارة المراجع' : 'Care standards'}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EDF5F2] text-[#2C5251]">
                    V2 Concept
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FBFA] border border-[#E8F0ED]">
                    <VolumeX className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#193A39]">{isAr ? 'عزل صوتي وموسيقى هادئة' : 'Acoustic Calm Environment'}</h4>
                      <p className="text-[11px] text-[#557874]">{isAr ? 'تقليل أصوات الأجهزة لضمان استرخاء حقيقي' : 'Minimizes mechanical sound to support sensory relaxation.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FBFA] border border-[#E8F0ED]">
                    <Eye className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#193A39]">{isAr ? 'شاشات عرض مشتركة للتشخيص' : 'Shared Visual Diagnostics'}</h4>
                      <p className="text-[11px] text-[#557874]">{isAr ? 'تشاهد صور الأشعة وتفهم حالة كل سن بوضوح' : 'You see what we see with plain-language explanations.'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FBFA] border border-[#E8F0ED]">
                    <Clock className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#193A39]">{isAr ? 'احترام كامل لموعدك دون انتظار' : 'Zero Waiting Room Crowding'}</h4>
                      <p className="text-[11px] text-[#557874]">{isAr ? 'مواعيد مجدولة بتباعد وافر يمنع الاكتظاظ' : 'Generously buffered appointment slots.'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href={`/${locale}/preview/dental/request-appointment`}
                    className="w-full inline-block py-2.5 rounded-lg bg-[#2C5251] hover:bg-[#193A39] text-white text-xs font-medium transition-colors"
                  >
                    {isAr ? 'ابدأ حجز استشارتك (تجريبي)' : 'Book Consultation Window (Demo)'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <figure className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-5 rounded-[2rem] overflow-hidden shadow-[0_20px_65px_rgba(0,0,0,0.12)] bg-white p-2 sm:p-3">
          <SectorPhoto sector="dental" secondary alt="" className="col-span-8 h-52 sm:h-[340px] rounded-[1.5rem]" />
          <SectorPhoto sector="dental" alt="" className="col-span-4 h-52 sm:h-[340px] rounded-[1.5rem]" />
        </div>
        <figcaption className="text-[11px] mt-3 opacity-60 text-center px-4">
          {isAr ? 'صور فوتوغرافية مرجعية لاتجاه التصميم، وليست توثيقًا لمشروعات أو منشآت هذه العلامة' : 'Licensed editorial art direction — not documentation of this brand’s real facilities or work'}
        </figcaption>
      </figure>


      {/* Signature Differentiator 1: Care Navigator / Service Finder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DentalHomeFinder locale={locale} services={services} />
      </section>

      {/* Patient Journey Flow: 3 Calm Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'رحلة المراجع' : 'Patient Journey'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#193A39] mt-3">
            {isAr ? 'ثلاث خطوات واضحة قبل اتخاذ أي قرار' : 'Three calm steps before any clinical procedure'}
          </h2>
          <p className="text-sm text-[#557874] mt-2">
            {isAr
              ? 'نهجنا السريري يمنحك السيطرة الكاملة على مسار رعايتك دون أي مفاجآت.'
              : 'Our protocol ensures you remain in complete control of your care pathway.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E0EBE7] shadow-sm relative">
            <span className="text-4xl font-serif font-bold text-[#EDF5F2] absolute top-4 right-4">01</span>
            <div className="w-10 h-10 rounded-xl bg-[#EDF5F2] text-[#193A39] flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-[#193A39] mb-2">
              {isAr ? 'استماع واستشارة دون ضغوط' : 'Consultation & In-depth Listening'}
            </h3>
            <p className="text-xs text-[#557874] leading-relaxed">
              {isAr
                ? 'نجلس معك أولاً في بيئة مريحة للاستماع لما يقلقك، دون أي كشف مفاجئ أو تسرع في فرض خطط علاجية.'
                : 'We begin with a conversation in a calm setting to understand your goals, history, and comfort boundaries.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0EBE7] shadow-sm relative">
            <span className="text-4xl font-serif font-bold text-[#EDF5F2] absolute top-4 right-4">02</span>
            <div className="w-10 h-10 rounded-xl bg-[#EDF5F2] text-[#193A39] flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-[#193A39] mb-2">
              {isAr ? 'فحص رقمي دقيق وغير جراحي' : 'Gentle Digital Diagnostics'}
            </h3>
            <p className="text-xs text-[#557874] leading-relaxed">
              {isAr
                ? 'استخدام كاميرات فموية عالية الدقة وتصوير إشعاعي بأدنى جرعة لمراجعة صحة اللثة والأسنان سوياً.'
                : 'Low-dose digital imaging and intraoral cameras reveal exact conditions without physical discomfort.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0EBE7] shadow-sm relative">
            <span className="text-4xl font-serif font-bold text-[#EDF5F2] absolute top-4 right-4">03</span>
            <div className="w-10 h-10 rounded-xl bg-[#EDF5F2] text-[#193A39] flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-[#193A39] mb-2">
              {isAr ? 'خطة رعاية شفافة ومفصلة' : 'Transparent Shared Plan'}
            </h3>
            <p className="text-xs text-[#557874] leading-relaxed">
              {isAr
                ? 'نوضح البدائل، والجدول الزمني المريح، والتكلفة التقديرية بدقة متناهية قبل تحديد أي موعد علاجي.'
                : 'Receive a written roadmap detailing options, number of visits, and exact fees with zero hidden surprises.'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Clinical Specialists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
              {isAr ? 'الفريق الاستشاري' : 'Our Practitioners'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#193A39] mt-3">
              {isAr ? 'كفاءات متخصصة في بيئة متناغمة' : 'Specialists united by patient-first ethics'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/dental/team`}
            className="text-xs sm:text-sm font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1.5"
          >
            <span>{isAr ? 'عرض جميع الأطباء (6)' : 'View all 6 specialists'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practitioners.slice(0, 3).map((p, idx) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E0EBE7] p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EDF5F2] border border-[#D5E3DE] flex items-center justify-center font-serif text-xl font-bold text-[#2C5251]">
                  {p.name.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#193A39]">
                    {p.name}
                  </h3>
                  <span className="text-xs text-[#2C5251] font-medium">
                    {p.focus}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#557874] leading-relaxed mb-4 line-clamp-2">
                {p.bio}
              </p>
              <div className="pt-4 border-t border-[#EAEFEF] flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/dental/team/${p.slug}`}
                  className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'الملف الشخصي' : 'Practitioner Profile'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/${locale}/preview/dental/request-appointment?doctor=${p.slug}`}
                  className="text-xs font-medium text-[#2C5251] hover:underline"
                >
                  {isAr ? 'طلب موعد' : 'Request'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* First-Visit Preparation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#193A39] text-[#EDF5F2] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7AC7A5]">
              {isAr ? 'دليل عملي وتفاعلي' : 'Practical Preparation'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              {isAr ? 'هل هذه زيارتك الأولى لعيادة لومِن؟' : 'Preparing for your first consultation?'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {isAr
                ? 'وفرنا لك قائمة تفاعلية سهلة يمكنك حفظها في متصفحك لمعرفة ما تحتاجه للزيارة وما يمكنك توقعه من لحظة وصولك وحتى المغادرة.'
                : 'Access our interactive first-visit checklist to know exactly what to bring, what to expect, and how our gentle admission works.'}
            </p>
            <div className="pt-4">
              <Link
                href={`/${locale}/preview/dental/patient-guide`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7AC7A5] hover:bg-[#68B794] text-[#193A39] text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{isAr ? 'فتح قائمة تحضير الزيارة الأولى' : 'Open First-Visit Checklist'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#193A39] text-[#EDF5F2] px-7 py-10 sm:px-12 sm:py-14 flex flex-col lg:flex-row gap-7 items-start lg:items-center justify-between shadow-xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7AC7A5]">{isAr ? 'لأصحاب العيادات والمراكز الطبية' : 'FOR CLINIC & PRACTICE OWNERS'}</p>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl mt-3">{isAr ? 'موقع يشرح خدمات عيادتك ويسهّل طلب المواعيد' : 'Your practice deserves a clearer digital patient journey'}</h2>
            <p className="text-sm leading-7 text-white/70 mt-3">{isAr ? 'تقدم مافكس تصميم صفحات خدمات وتخصصات وأطباء وإرشادات ونظام استفسارات قابل للربط بتقويم العيادة الحقيقي.' : 'Mavvix builds clinic websites with clear services, practitioner profiles, first-visit guidance and an appointment flow that can be integrated with your actual scheduling system.'}</p>
          </div>
          <a href={isAr ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-[#7AC7A5] text-[#193A39] px-7 py-4 text-sm font-bold hover:bg-[#97E8C5] transition-colors">
            {isAr ? 'اطلب تنفيذ موقع لعيادتك' : 'Discuss your clinic website'} <Arrow className="w-4 h-4" />
          </a>
        </div>
      </section>
      <SectorDepth sector="dental" locale={locale} />
    </div>
  );
}

