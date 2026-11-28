import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Wind,
  Droplets,
  Zap,
  Hammer,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ClipboardList,
  CircleHelp,
  AlertTriangle,
  Home,
  CalendarCheck,
  Search,
  BookOpen,
  MapPin,
  Building2,
  Gauge
} from 'lucide-react';
import {
  HOME_CARE,
  HOME_PHOTOS,
  careLocale,
  maintenancePath
} from '@/lib/verticals/home-maintenance/data';
import type { Locale } from '@/lib/i18n/config';
import { HomeMaintenanceDiagnosticCalibrator } from './HomeMaintenanceDiagnosticCalibrator';
import { HomeMaintenanceStandards } from './HomeMaintenanceStandards';
import { HomeMaintenanceVisualAtelier } from './HomeMaintenanceVisualAtelier';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const title = ar
    ? 'موقع شركة صيانة منزلية | ProFix Services بتصميم مافكس'
    : 'Home Maintenance Website | ProFix Services by Mavvix';
  const description = ar
    ? 'موقع متكامل لخدمات التكييف والسباكة والكهرباء وحجز طلب معاينة غير مؤكد، وتجربة عربية وإنجليزية احترافية.'
    : 'Distinct home services website with AC, plumbing, electrical and safe three-step service enquiries, developed by Mavvix.';
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function HomeCarePage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const services = HOME_CARE.services;

  const topics = [
    {
      slug: 'ac',
      name: ar ? 'التكييف والتبريد' : 'Air conditioning',
      description: ar ? 'تدفق هواء، صرف، تبريد' : 'Airflow, drainage and cooling',
      icon: Wind,
      color: '#EEF9FB'
    },
    {
      slug: 'plumbing',
      name: ar ? 'السباكة والشبكات' : 'Sanitary plumbing',
      description: ar ? 'تسريبات، صرف، تمديدات' : 'Leaks, drains and fixtures',
      icon: Droplets,
      color: '#E8F1FF'
    },
    {
      slug: 'electrical',
      name: ar ? 'الكهرباء والقواطع' : 'Electrical circuits',
      description: ar ? 'القواطع والمفاتيح والأحمال' : 'Breakers, switches and lighting',
      icon: Zap,
      color: '#FFF8E7'
    },
    {
      slug: 'services',
      name: ar ? 'النجارة والأبواب' : 'Carpentry & joinery',
      description: ar ? 'أبواب ومفصلات وأخشاب' : 'Doors, hinges and fittings',
      icon: Hammer,
      color: '#F9EDE6'
    }
  ];

  return (
    <div>
      {/* 01: Distinct Home Service Editorial Hero */}
      <section
        data-sector-specific="home-hero"
        className="bg-[#F4F9FD] relative overflow-hidden"
      >
        <div
          className="absolute -end-28 top-0 w-[42rem] h-[42rem] rounded-full bg-[#E4F2FB] blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-[1fr_.9fr] gap-12 items-center relative">
          <div>
            <span className="inline-flex gap-2 items-center rounded-full bg-[#E5F1FB] text-[#174E78] px-4 py-2 text-[11px] font-black uppercase tracking-widest border border-[#B7D0E5]">
              <CheckCircle2 size={16} /> HOME CARE, REIMAGINED
            </span>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] leading-[1.08] font-black tracking-tight mt-6 text-[#102B26]">
              {ar ? (
                <>
                  بيتك يستاهل <span className="text-[#A86D00]">خدمة واضحة.</span>
                </>
              ) : (
                <>
                  Home care without <span className="text-[#A86D00]">the guesswork.</span>
                </>
              )}
            </h1>
            <p className="text-[#285879] text-base sm:text-lg leading-9 mt-7 max-w-xl">
              {ar
                ? 'ابدأ بالخدمة اللي محتاجها، حدد العطل والمكان بشكل عام، وشوف نموذج طلب معاينة منظم. من غير أسعار مخفية أو وعود بزيارة مؤكدة غير حقيقية.'
                : 'Explore professional service categories, describe a problem and try a carefully structured request journey without fake technician availability or prices.'}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={maintenancePath(locale, 'book')}
                className="inline-flex gap-3 items-center bg-[#174E78] hover:bg-[#0F3D61] text-white px-7 py-4 rounded-2xl font-black text-sm transition-colors"
              >
                {ar ? 'ابدأ طلب المعاينة' : 'Start a service request'}
                <Arrow size={17} />
              </Link>
              <Link
                href={maintenancePath(locale, 'services')}
                className="border-2 border-[#A3C3D8] rounded-2xl px-7 py-4 text-sm font-bold text-[#174E78] hover:bg-white transition-colors"
              >
                {ar ? 'شوف كل الخدمات' : 'Explore services'}
              </Link>
            </div>
            <p className="text-xs text-[#285879] mt-10 flex gap-2 items-center font-bold">
              <ShieldCheck size={18} className="text-[#174E78]" />
              {ar
                ? 'اختيارات منظمة. بيانات محدودة. بدون ادعاء تنفيذ.'
                : 'Clear service categories. Minimal information. No false dispatch claims.'}
            </p>
          </div>
          <div className="relative min-h-[380px] sm:min-h-[510px]">
            <div className="absolute inset-[0_1.2rem_1.5rem_2.5rem] bg-[#D9E9F4] rounded-[3rem_3rem_10rem_3rem] rotate-3" />
            <img
              src={HOME_PHOTOS.hvacIndoor}
              className="absolute inset-[1rem_2.5rem_0_0] w-[calc(100%-2.5rem)] h-[calc(100%-1rem)] object-cover rounded-[3rem_3rem_10rem_3rem] shadow-[0_30px_65px_rgba(23,78,120,.18)]"
              alt={
                ar
                  ? 'صورة تحريرية لمكيف هواء وليست منشأة تابعة لشركة حقيقية'
                  : 'Editorial photo of an air conditioner, not a Fixora client installation'
              }
              loading="eager"
            />
            <div className="absolute bottom-6 end-0 bg-[#F7B347] rounded-[2rem] p-5 sm:p-6 w-48 sm:w-56 shadow-xl text-[#0B1726]">
              <Wind size={30} />
              <p className="font-black text-base leading-snug mt-4">
                {ar ? 'ابدأ بالمشكلة مش بالتخمين' : 'Start with a problem, not a guess'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02: Category tiles */}
      <section data-sector-specific="service-explorer" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-9">
            <div>
              <p className="text-xs text-[#A86D00] font-black uppercase tracking-widest">
                PROFIX SERVICE MAP
              </p>
              <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#102B26]">
                {ar ? 'إيه اللي محتاج يتصلح؟' : 'What needs attention at home?'}
              </h2>
            </div>
            <p className="max-w-sm text-[#285879] text-sm leading-8">
              {ar
                ? 'بدل قائمة طويلة تضيّعك، ابدأ من مجال المشكلة واقرأ نطاق الفحص.'
                : 'Begin with a clear category instead of searching through unrelated home-service offers.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {topics.map(({ slug, name, description, icon: Icon, color }) => (
              <Link
                href={maintenancePath(locale, slug)}
                key={slug}
                className="rounded-[2rem] border border-[#CBD5E1] p-7 flex flex-col min-h-60 hover:shadow-xl hover:-translate-y-1 transition-all"
                style={{ backgroundColor: color }}
              >
                <Icon size={31} className="text-[#174E78]" />
                <h3 className="font-black text-2xl mt-8 text-[#102B26]">{name}</h3>
                <p className="text-[#285879] text-sm mt-3">{description}</p>
                <ArrowUpRight className="ms-auto mt-auto text-[#174E78]" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03: Guided symptom intent */}
      <section data-sector-specific="symptom-triage" className="bg-[#174E78] text-white py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.7fr_1.2fr] gap-10">
          <div>
            <p className="text-[#F7B347] text-xs font-bold uppercase tracking-widest">
              REPAIR REQUEST, NOT RANDOM DISPATCH
            </p>
            <h2 className="text-4xl font-black mt-5 leading-tight">
              {ar ? 'خلّي المشكلة مفهومة من أول اتصال' : 'A useful diagnosis starts with an accurate description'}
            </h2>
            <p className="mt-6 text-[#E2E8F0] leading-9 text-sm">
              {ar
                ? 'مش مطلوب منك تصلّح ولا تخمّن؛ اكتب نوع الجهاز والعرض اللي شفته ودرجة الاستعجال. الفني يراجع التفاصيل الفعلية بعد تأكيد الشركة المشغّلة.'
                : 'We ask for observable symptoms, appliance type and broad urgency so an actual operator can scope a conversation. No DIY electrical or gas repair instructions.'}
            </p>
            <Link
              href={maintenancePath(locale, 'book')}
              className="inline-flex mt-8 rounded-full px-6 py-3.5 bg-[#F7B347] text-[#0B1726] font-black text-sm hover:bg-[#FFC966] transition-colors"
            >
              {ar ? 'جرّب النموذج' : 'Try the intake'}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              [
                ar ? 'المكيف مش بيبرد' : 'AC underperforming',
                ar ? 'حدد نوع الوحدة ووقت ظهور المشكلة' : 'Note unit type and symptom timing',
                Wind
              ],
              [
                ar ? 'تسريب تحت الحوض' : 'Visible water leak',
                ar ? 'احذر لو المياه قريبة من الكهرباء' : 'Keep clear of wet electrical hazards',
                Droplets
              ],
              [
                ar ? 'قاطع بيفصل باستمرار' : 'Repeated breaker trip',
                ar ? 'ابعد عن التوصيلات واستعن بفني' : 'Avoid DIY wiring and seek qualified help',
                Zap
              ],
              [
                ar ? 'باب مش بيقفل' : 'Door misalignment',
                ar ? 'حدد مكان احتكاك الباب وحالة المفصلات' : 'Describe binding, hinges and frame',
                Hammer
              ]
            ].map(([title, description, Icon]) => (
              <div
                key={String(title)}
                className="rounded-[1.6rem] bg-white/10 border border-white/20 p-6"
              >
                <Icon size={27} className="text-[#F7B347]" />
                <h3 className="mt-7 font-black text-lg text-white">{title as string}</h3>
                <p className="text-[#CBD5E1] mt-3 text-sm leading-7">
                  {description as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04: Signature Component 1 - Diagnostic & Triage Calibrator */}
      <HomeMaintenanceDiagnosticCalibrator locale={locale} />

      {/* 05: Original service dossiers */}
      <section data-sector-specific="eight-services" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <p className="font-bold text-xs text-[#A86D00] tracking-widest uppercase">
          EIGHT PRACTICAL SERVICE DOSSIERS
        </p>
        <div className="flex items-end justify-between gap-5 mt-4">
          <h2 className="text-3xl sm:text-5xl font-black text-[#102B26]">
            {ar ? 'كل خدمة لها تفاصيلها' : 'Different problems need different scopes'}
          </h2>
          <Link
            href={maintenancePath(locale, 'services')}
            className="hidden sm:inline-flex text-sm text-[#A86D00] font-bold gap-2 items-center hover:underline"
          >
            {ar ? 'الدليل الكامل' : 'Full directory'}
            <Arrow size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {services.map((s, i) => (
            <Link
              href={maintenancePath(locale, 'services/' + s.slug)}
              key={s.slug}
              className="group bg-white border border-[#CBD5E1] rounded-3xl p-6 sm:p-7 hover:shadow-xl transition-all flex flex-col min-h-[270px]"
            >
              <span className="font-mono text-[#A86D00] text-xs font-black">
                {String(i + 1).padStart(2, '0')} / CARE
              </span>
              <h3 className="text-xl font-black mt-8 leading-7 text-[#102B26]">
                {careLocale(s.title, locale)}
              </h3>
              <p className="text-[#285879] text-sm leading-7 mt-3">
                {careLocale(s.summary, locale)}
              </p>
              <span className="inline-flex gap-2 mt-auto pt-6 text-xs font-black text-[#174E78]">
                {ar ? 'تفاصيل الخدمة' : 'Explore service'}
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 06: Signature Component 2 - Engineering Governance Standards */}
      <HomeMaintenanceStandards locale={locale} />

      {/* 07: Domain AC */}
      <section data-sector-specific="ac-scope" className="bg-[#EEF7FC] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.9fr_1fr] gap-14 items-center">
          <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(23,78,120,.08)] border border-[#CBD5E1]">
            <Wind size={52} className="text-[#174E78]" />
            <p className="text-xs font-bold tracking-widest mt-9 text-[#A86D00] uppercase">
              AIR CONDITIONING
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-[#102B26]">
              {ar ? 'التكييف مش تبريد وبس' : 'Cooling is only one part of AC service'}
            </h2>
            <p className="mt-5 text-[#285879] leading-9">
              {ar
                ? 'التكييف الضعيف ممكن يكون مرتبط بالفلاتر أو الصرف أو الكهرباء أو تسريب. شرح ملاحظة العرض بيساعد الفني يبدأ في اتجاه الفحص المناسب، مش إننا نوافق على تغيير غاز تلقائي.'
                : 'Poor cooling can involve filters, airflow, drainage, electrics or refrigerant faults. Good enquiry design separates what the homeowner noticed from what a technician can actually confirm.'}
            </p>
            <Link
              href={maintenancePath(locale, 'ac')}
              className="inline-flex gap-2 items-center mt-7 font-bold text-sm text-[#174E78] hover:underline"
            >
              {ar ? 'دليل التكييف بالتفصيل' : 'Explore AC diagnostics'}
              <Arrow size={17} />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              [
                ar ? 'التبريد والهواء' : 'Cooling & airflow',
                ar
                  ? 'ضعف التبريد مش دليل كافي على نقص وسيط التبريد.'
                  : 'Weak cooling alone doesn’t prove a refrigerant shortage.'
              ],
              [
                ar ? 'صرف التكثيف' : 'Condensate drainage',
                ar
                  ? 'تسريب الوحدة الداخلية قد يحتاج فحص الصرف والميل والتسريب.'
                  : 'Indoor moisture requires assessing condensate routes and other possible leaks.'
              ],
              [
                ar ? 'تغذية كهربائية آمنة' : 'Electrical safety',
                ar
                  ? 'أعمال الكهرباء ووسيط التبريد لمتخصصين مؤهلين.'
                  : 'Electrical and refrigerant work belong with qualified professionals.'
              ]
            ].map(([title, description], i) => (
              <div
                key={String(title)}
                className="rounded-2xl bg-white p-7 border border-[#CBD5E1] flex items-start gap-5"
              >
                <span className="grid place-items-center shrink-0 rounded-full w-10 h-10 bg-[#F7B347] text-[#0B1726] font-black">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-black text-lg text-[#102B26]">{title}</h3>
                  <p className="text-[#285879] mt-3 text-sm leading-7">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08: Signature Component 3 - Living Facility Media Atelier */}
      <HomeMaintenanceVisualAtelier locale={locale} />

      {/* 09: Plumbing safety */}
      <section data-sector-specific="plumbing-scope" className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_.8fr] gap-12 items-center">
          <div>
            <p className="text-xs text-[#A86D00] font-black tracking-widest uppercase">
              WATER / PLUMBING
            </p>
            <h2 className="font-black text-3xl sm:text-4xl mt-3 text-[#102B26]">
              {ar ? 'تسريب صغير ممكن يكون له كذا سبب' : 'Find the source before you break the wall'}
            </h2>
            <p className="text-[#285879] text-sm leading-9 mt-5">
              {ar
                ? 'هل المياه بتظهر مع الصنبور أو تشغيل الغسالة؟ هل فيها خطر كهرباء؟ طلب السباك يبدأ بوصف ملاحظة آمنة، وأي تدخل في المواسير أو الجدار يتقرر بعد فحص متخصص.'
                : 'Does water appear only when an appliance runs? Is the damp area near electrical equipment? Professional investigation should precede unnecessary wall or pipe work.'}
            </p>
            <Link
              href={maintenancePath(locale, 'plumbing')}
              className="inline-flex gap-2 mt-7 rounded-xl bg-[#174E78] text-white px-6 py-4 font-bold text-sm hover:bg-[#0F3D61] transition-colors"
            >
              {ar ? 'افهم خدمات السباكة' : 'Explore plumbing decisions'}
              <Arrow size={17} />
            </Link>
          </div>
          <div className="bg-[#E3F0FD] rounded-[2.5rem] p-10 relative border border-[#CBD5E1]">
            <Droplets size={60} className="text-[#174E78]" />
            <h3 className="font-extrabold text-2xl mt-8 text-[#102B26]">
              {ar ? 'مشاكل تحتاج ترتيب أولويات' : 'Know when caution comes first'}
            </h3>
            <p className="mt-5 text-[#285879] text-sm leading-8">
              {ar
                ? 'بلل قرب التوصيلات الكهربائية؟ ابعد عن الخطر ولا تلمس أجهزة مبتلة. لا تخلط منظفات فتح الصرف، واستعن بمختص في الحالات المعقدة.'
                : 'Water near wiring? Avoid contact and get qualified help. Do not mix drain-cleaning chemicals or improvise unsafe fixes.'}
            </p>
          </div>
        </div>
      </section>

      {/* 10: Scope transparency */}
      <section
        data-sector-specific="scope-transparency"
        className="bg-[#F7B347] text-[#0B1726] py-20"
      >
        <div className="max-w-7xl px-5 sm:px-8 mx-auto grid lg:grid-cols-[.7fr_1fr] gap-10 items-center">
          <div>
            <p className="font-black text-xs tracking-widest uppercase">
              SERVICE TRANSPARENCY
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mt-4">
              {ar ? 'قبل السعر... افهم إيه اللي داخله' : 'Before any price, clarify the scope'}
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              [
                ar ? 'رسوم المعاينة' : 'Visit assessment',
                ar ? 'هل لها مقابل منفصل ومحدد؟' : 'Is the inspection billed separately?'
              ],
              [
                ar ? 'العمالة والقطع' : 'Labor and parts',
                ar ? 'إيه المشمول وإيه اللي بيتحسب إضافي؟' : 'What is included or charged separately?'
              ],
              [
                ar ? 'التغيير في نطاق العمل' : 'Scope changes',
                ar ? 'ازاي هتاخد موافقتك قبل أي زيادة؟' : 'How is your approval obtained first?'
              ]
            ].map(([t, d], i) => (
              <div key={String(t)} className="bg-white/90 rounded-2xl p-6 flex gap-5 border border-[#E2E8F0]">
                <span className="font-mono font-black text-2xl text-[#174E78]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-black text-[#102B26]">{t}</h3>
                  <p className="mt-2 text-sm text-[#285879]">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11: Geographic coverage */}
      <section data-sector-specific="geographic-coverage" className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div>
            <p className="text-[#A86D00] text-xs tracking-widest font-black uppercase">
              SERVICE AREA LOGIC
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 text-[#102B26]">
              {ar ? 'نطاق الخدمة بيتحدد بوضوح' : 'A responsible coverage experience'}
            </h2>
          </div>
          <Link
            href={maintenancePath(locale, 'coverage')}
            className="flex gap-2 items-center font-bold text-sm text-[#174E78] hover:underline"
          >
            {ar ? 'شرح التغطية' : 'Coverage information'}
            <Arrow size={17} />
          </Link>
        </div>
        <div className="mt-9 grid sm:grid-cols-4 gap-3">
          {HOME_CARE.options.regions.map((region) => (
            <div
              key={region}
              className="bg-white border border-[#CBD5E1] rounded-3xl p-7 min-h-44"
            >
              <MapPin size={25} className="text-[#A86D00]" />
              <h3 className="font-black mt-7 text-[#102B26]">{region}</h3>
              <p className="text-xs text-[#285879] leading-6 mt-3">
                {ar
                  ? 'تصنيف مناطق استفسار، وليس إعلان توافر فني فعلي.'
                  : 'Enquiry grouping only; not a claim of live technician coverage.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12: Service process */}
      <section data-sector-specific="three-step-visit" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-[#A86D00] text-xs font-black tracking-widest uppercase">
            HOW A REAL VISIT SHOULD BE ARRANGED
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-[#102B26]">
            {ar ? 'من الاستفسار لفاتورة مفهومة' : 'From request to reviewable work order'}
          </h2>
          <div className="grid md:grid-cols-4 mt-9 gap-4">
            {[
              [
                ar ? 'حدد الخدمة' : 'Select service',
                ar ? 'اختار نوع العطل وتخصص الصيانة.' : 'Categorize the issue and service.'
              ],
              [
                ar ? 'وصف آمن' : 'Describe safely',
                ar ? 'المنطقة العامة ودرجة الاستعجال فقط.' : 'General area and safe urgency.'
              ],
              [
                ar ? 'تأكيد المشغّل' : 'Operator confirmation',
                ar ? 'الموعد والتكلفة يحددهما صاحب الخدمة.' : 'Real availability and fees need a provider.'
              ],
              [
                ar ? 'مستندات التسليم' : 'Document handover',
                ar ? 'وثّق الأعمال والقطع والضمان المتفق عليه.' : 'Record completed work, materials and terms.'
              ]
            ].map(([title, desc], i) => (
              <div key={i} className="rounded-2xl bg-[#F4F8FC] p-6 border border-[#CBD5E1]">
                <span className="text-4xl font-black text-[#174E78] font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-black text-lg mt-7 text-[#102B26]">{title}</h3>
                <p className="text-[#285879] text-sm leading-8 mt-3">{desc}</p>
              </div>
            ))}
          </div>
          <Link
            href={maintenancePath(locale, 'process')}
            className="inline-flex mt-8 gap-2 items-center text-[#174E78] font-extrabold text-sm hover:underline"
          >
            {ar ? 'مراحل العمل بالتفصيل' : 'Read the operating workflow'}
            <Arrow size={17} />
          </Link>
        </div>
      </section>

      {/* 13: Articles */}
      <section data-sector-specific="home-guides" className="bg-[#ECF4FA] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-between items-end gap-5">
            <div>
              <p className="text-xs font-black text-[#A86D00] uppercase">
                PROFIX HOME NOTES
              </p>
              <h2 className="text-3xl sm:text-4xl font-black mt-4 text-[#102B26]">
                {ar ? 'جهز نفسك قبل الزيارة' : 'A little preparation saves confusion'}
              </h2>
            </div>
            <Link
              href={maintenancePath(locale, 'resources')}
              className="font-extrabold text-xs inline-flex gap-2 text-[#174E78] hover:underline"
            >
              {ar ? 'كل الأدلة' : 'Read all guides'}
              <Arrow size={16} />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-4 mt-9">
            {HOME_CARE.articles.map((a) => (
              <Link
                key={a.slug}
                href={maintenancePath(locale, 'resources/' + a.slug)}
                className="rounded-[2rem] border border-[#CBD5E1] bg-white p-8 min-h-[295px] flex flex-col hover:shadow-lg transition-shadow"
              >
                <BookOpen size={30} className="text-[#174E78]" />
                <h3 className="text-xl font-black mt-7 leading-snug text-[#102B26]">
                  {careLocale(a.title, locale)}
                </h3>
                <p className="text-sm leading-7 text-[#285879] mt-3">
                  {careLocale(a.summary, locale)}
                </p>
                <span className="mt-auto pt-5 text-xs font-bold flex gap-2 text-[#174E78]">
                  {ar ? 'اقرأ الدليل' : 'Read guide'}
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 14: FAQ & Mavvix Conversion */}
      <section
        data-sector-specific="buyer-faq"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.65fr_1fr] gap-10"
      >
        <div>
          <p className="text-xs font-bold text-[#A86D00] tracking-widest uppercase">
            HONEST ANSWERS
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#102B26]">
            {ar ? 'أسئلة قبل ما تطلب فني' : 'Questions worth asking before a home visit'}
          </h2>
        </div>
        <div className="space-y-3">
          {HOME_CARE.faq.map((f, i) => (
            <details
              key={i}
              className="bg-white rounded-2xl border border-[#CBD5E1] p-6 open:shadow-lg"
            >
              <summary className="font-extrabold text-base cursor-pointer text-[#102B26]">
                {careLocale(f.q, locale)}
              </summary>
              <p className="text-[#285879] mt-4 text-sm leading-8">
                {careLocale(f.a, locale)}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section
        data-sector-specific="mavvix-brief"
        className="bg-[#174E78] text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] gap-9 items-center">
          <div>
            <p className="text-xs text-[#F7B347] font-black tracking-widest uppercase">
              MAVVIX / BUSINESS WEBSITE OFFER
            </p>
            <h2 className="text-3xl sm:text-5xl font-black mt-5 max-w-3xl">
              {ar
                ? 'عندك شركة صيانة؟ خلّي طلبات العملاء منظمة.'
                : 'Give your maintenance business a clear, useful website.'}
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#E2E8F0] max-w-2xl">
              {ar
                ? 'مافكس تقدر تنفذ خدماتك وفروعك الحقيقية وجدول فنيين قابل للربط ونظام متابعة الطلبات لصالح نشاطك.'
                : 'Mavvix can build your real services, approved coverage, staff scheduling integrations and lead tracking to match your operations.'}
            </p>
          </div>
          <a
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#F7B347] text-[#0B1726] px-8 py-5 rounded-2xl font-extrabold text-sm hover:bg-[#FFC966] transition-colors"
          >
            {ar ? 'اطلب موقع لشركتك' : 'Commission your business site'}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
