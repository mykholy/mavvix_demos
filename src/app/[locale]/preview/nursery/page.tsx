import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { BLOOM, BLOOM_PHOTOS, bloomPath } from '@/lib/verticals/nursery/data';
import {
  ArrowUpRight,
  Flower2,
  BookOpen,
  Shapes,
  ShieldCheck,
  Sun,
  CalendarDays,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { BloomStageCalibrator } from './BloomStageCalibrator';
import { BloomSafeguardingCharter } from './BloomSafeguardingCharter';
import { BloomVisualAtelier } from './BloomVisualAtelier';

export default async function BloomHome(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const ages = BLOOM.services.filter((p) => p.category === 'age');
  const photo = BLOOM_PHOTOS[0];

  return (
    <div>
      {/* 01 - Hero */}
      <section
        data-sector-specific="bloom-learning-hero"
        className="relative overflow-hidden bg-[#FFF9EE]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-20 sm:pt-24 grid lg:grid-cols-[1fr_.85fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5E5B7] px-4 py-2 text-xs font-extrabold text-[#145960]">
              <Flower2 size={16} />
              {ar ? 'طفولة تستحق وقتها' : 'CHILDHOOD HAS ITS OWN RHYTHM'}
            </div>
            <h1 className="bloom-display mt-7 text-[clamp(2.8rem,6.2vw,6.7rem)] leading-[1.08] tracking-tight text-[#145960]">
              {ar ? (
                <>
                  كل خطوة صغيرة <span className="text-[#A54F35]">اكتشاف كبير.</span>
                </>
              ) : (
                <>
                  Small steps. <span className="text-[#A54F35]">Big discoveries.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-lg text-base sm:text-lg leading-9 text-[#2E4844]">
              {ar
                ? 'تخيّل مساحة يتعلم فيها الطفل باللعب، ويكتشف العالم بإيقاعه الخاص. تعرّف على الفئات العمرية والأفكار التعليمية وروتين اليوم قبل أن تختار حضانة لطفلك.'
                : 'Imagine a place where discovery follows a child’s own rhythm. Explore age-based programmes, play-based learning and a thoughtful daily routine before preparing a nursery visit.'}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link
                className="inline-flex items-center gap-3 bg-[#145960] text-white rounded-full px-7 py-4 font-extrabold text-sm hover:bg-[#1C6C75] transition-colors"
                href={bloomPath(locale, 'admissions')}
              >
                {ar ? 'ابدأ طلب زيارة' : 'Explore a visit request'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                className="inline-flex border-2 border-[#145960] text-[#145960] rounded-full px-6 py-4 font-bold text-sm hover:bg-[#145960]/10 transition-colors"
                href={bloomPath(locale, 'age-groups')}
              >
                {ar ? 'اكتشف الفئات العمرية' : 'Explore age groups'}
              </Link>
            </div>
          </div>
          <figure className="relative bg-[#F5C04E] p-3 sm:p-5 rounded-[3rem_3rem_7rem_3rem] shadow-[0_20px_60px_rgba(20,89,96,.14)]">
            <img
              src={photo.src}
              alt={photo[locale]}
              loading="eager"
              className="w-full h-[330px] sm:h-[490px] object-cover rounded-[2.5rem_2.5rem_6rem_2.5rem]"
            />
            <figcaption className="p-4 text-xs font-semibold leading-6 text-[#145960]">
              <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline">
                {photo.author}
              </a>{' '}
              ·{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {photo.license}
              </a>{' '}
              · {ar ? 'صورة تحريرية مستقلة، عرض بقص بصري' : 'Independent editorial photo, display crop'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02 - Age Group Path */}
      <section data-sector-specific="age-group-path" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="uppercase text-xs font-extrabold tracking-widest text-[#8F412A]">
            {ar ? 'مسارات تناسب كل مرحلة' : 'CHOOSE THE AGE BAND'}
          </p>
          <h2 className="bloom-display text-4xl sm:text-5xl mt-4 text-[#145960]">
            {ar ? 'مش كل بداية شبه التانية' : 'Every beginning is different'}
          </h2>
          <p className="text-sm leading-8 mt-5 max-w-3xl text-[#2E4844]">
            {ar
              ? 'الفئات أمثلة لتوضيح تجربة الموقع، وليست شروط قبول لحضانة حقيقية.'
              : 'These age bands are illustrative website categories, not an operating nursery’s admission rules.'}
          </p>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {ages.map((s, i) => (
              <Link
                href={bloomPath(locale, 'programs/' + s.slug)}
                key={s.slug}
                className={
                  ['bg-[#E9F4ED]', 'bg-[#FAEBC2]', 'bg-[#F4E5DD]'][i] +
                  ' rounded-[2.4rem] p-7 sm:p-9 flex flex-col min-h-64 hover:shadow-xl transition-shadow text-[#145960]'
                }
              >
                <div className="text-5xl bloom-display font-black">{s.ageBand}</div>
                <h3 className="text-xl font-extrabold mt-5">{s.title[locale]}</h3>
                <p className="text-sm leading-8 mt-4 text-[#2E4844]">{s.summary[locale]}</p>
                <span className="mt-auto pt-7 font-extrabold text-sm inline-flex gap-2 items-center">
                  {ar ? 'تفاصيل المرحلة' : 'Explore this stage'}
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 - Signature Early Years Stage Calibrator */}
      <BloomStageCalibrator locale={locale} />

      {/* 04 - Play Philosophy */}
      <section data-sector-specific="play-philosophy" className="py-20 bg-[#145960] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[.9fr_1.1fr] gap-12 items-center">
          <div className="flex gap-3 items-center">
            <div className="rounded-t-full bg-[#F5C04E] min-h-52 w-full flex flex-col justify-end p-7 text-[#145960]">
              <Shapes size={50} />
              <span className="bloom-display text-3xl mt-8">{ar ? 'الاختيار' : 'Choice'}</span>
            </div>
            <div className="rounded-b-full bg-[#EED8C8] min-h-52 w-full flex flex-col p-7 text-[#145960]">
              <BookOpen size={50} />
              <span className="bloom-display text-3xl mt-8">{ar ? 'الحكاية' : 'Story'}</span>
            </div>
          </div>
          <div>
            <p className="text-[#F5C04E] text-xs font-extrabold uppercase tracking-widest">
              LEARNING THROUGH PLAY
            </p>
            <h2 className="bloom-display text-4xl sm:text-5xl mt-5">
              {ar ? 'اللعب مساحة للتعلم، مش مجرد وقت فراغ' : 'Play is a way to explore the world'}
            </h2>
            <p className="mt-6 text-sm leading-9 text-[#E6F3F1]">
              {ar
                ? 'توفير اختيارات آمنة وحركة وقصص ولعب مفتوح النهاية. أفكار تربوية عامة تساعد الأسرة على طرح أسئلة عن البرنامج الحقيقي، دون وعود بنتائج تعليمية أو اعتماد منهج.'
                : 'Safe choices, movement, stories and open-ended activities are examples of thoughtful learning. The actual operator determines curriculum, supervision and individual adaptations.'}
            </p>
            <Link
              href={bloomPath(locale, 'curriculum')}
              className="mt-7 inline-flex font-extrabold text-sm underline underline-offset-8 gap-2 items-center"
            >
              {ar ? 'اقرأ عن أفكار التعلم' : 'Explore learning ideas'}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 - Learning Stations */}
      <section data-sector-specific="learning-stations" className="py-20 bg-[#FFF9EE]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="bloom-display text-4xl sm:text-5xl text-[#145960]">
            {ar ? 'أركان للاكتشاف والتعبير' : 'Five invitations to discover'}
          </h2>
          <div className="mt-10 divide-y divide-[#B6D1C5]">
            {BLOOM.services
              .filter((p) => p.category === 'curriculum')
              .map((p, i) => (
                <Link
                  key={p.slug}
                  href={bloomPath(locale, 'programs/' + p.slug)}
                  className="grid sm:grid-cols-[75px_.75fr_1.2fr_auto] items-center gap-4 py-7 hover:bg-white/60 text-[#145960]"
                >
                  <span className="w-12 h-12 rounded-full bg-[#F5C04E] grid place-items-center font-black text-[#145960]">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-extrabold">{p.title[locale]}</h3>
                  <p className="text-sm leading-8 text-[#2E4844]">{p.summary[locale]}</p>
                  <ArrowUpRight size={19} />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 06 - Daily Rhythm */}
      <section data-sector-specific="daily-rhythm" className="py-20 bg-[#F4E5DD]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#8F412A]">
            A DAY OF LITTLE MOMENTS
          </p>
          <h2 className="bloom-display mt-4 text-4xl sm:text-5xl text-[#145960]">
            {ar ? 'روتين يومي يدي الطفل إحساس بالأمان' : 'A predictable rhythm, room to explore'}
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BLOOM.routine.map((r, i) => (
              <div className="bg-[#FFF9EE] p-7 rounded-3xl" key={r.en}>
                <span className="text-[#8F412A] font-mono font-bold text-sm">0{i + 1}</span>
                <Sun size={28} className="mt-6 text-[#F5C04E]" />
                <h3 className="font-extrabold mt-5 text-lg text-[#145960]">{r[locale]}</h3>
                <p className="text-sm leading-8 mt-4 text-[#2E4844]">
                  {ar ? r.descAr : r.descEn}
                </p>
              </div>
            ))}
          </div>
          <Link
            className="inline-flex gap-2 mt-8 underline font-bold text-[#145960] items-center"
            href={bloomPath(locale, 'daily-routine')}
          >
            {ar ? 'تفاصيل الروتين' : 'Read about daily routines'}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* 07 - Signature Visual Atelier */}
      <BloomVisualAtelier locale={locale} />

      {/* 08 - Environment and Materials */}
      <section data-sector-specific="environment-and-materials" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <figure className="bg-[#E9F4ED] p-4 rounded-[2rem]">
            <img
              src={BLOOM_PHOTOS[1].src}
              alt={BLOOM_PHOTOS[1][locale]}
              loading="lazy"
              className="w-full rounded-[1.5rem] h-[280px] sm:h-[360px] object-cover"
            />
            <figcaption className="px-3 py-4 text-xs leading-6 text-[#145960]">
              <a
                href={BLOOM_PHOTOS[1].source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {BLOOM_PHOTOS[1].author}
              </a>{' '}
              ·{' '}
              <a
                className="underline"
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-SA 4.0
              </a>{' '}
              · {ar ? 'معرض تعليمي مستقل، عرض بقص بصري' : 'Independent exhibition photo, display crop'}
            </figcaption>
          </figure>
          <div>
            <h2 className="bloom-display text-4xl sm:text-5xl text-[#145960]">
              {ar ? 'المكان يساعد الطفل على الاختيار' : 'The environment invites curiosity'}
            </h2>
            <p className="mt-6 text-base leading-9 text-[#2E4844]">
              {ar
                ? 'خامات واضحة وترتيب مفهوم وأماكن للحركة والراحة. الصور هنا لأدوات تعليمية حقيقية من مصادر مستقلة، ولا تثبت وجود فصل أو منشأة باسم BloomSteps.'
                : 'Visible materials, organized activity areas and room for rest and movement can make exploration easier. These authentic photographs are editorial references, not a BloomSteps facility.'}
            </p>
            <Link
              href={bloomPath(locale, 'gallery')}
              className="inline-flex gap-2 mt-7 font-bold underline text-[#145960] items-center"
            >
              {ar ? 'الصور ومصادرها' : 'View image references'}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 09 - Signature Safeguarding Charter */}
      <BloomSafeguardingCharter locale={locale} />

      {/* 10 - Safeguarding Checklist */}
      <section data-sector-specific="safeguarding-checklist" className="py-20 bg-[#E9F4ED]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[.8fr_1.2fr] gap-10">
          <div>
            <ShieldCheck size={45} className="text-[#145960]" />
            <h2 className="bloom-display mt-6 text-4xl sm:text-5xl text-[#145960]">
              {ar ? 'الأمان يبدأ بأسئلة واضحة' : 'Safeguarding starts with clear questions'}
            </h2>
            <p className="mt-6 leading-8 text-sm text-[#2E4844]">
              {ar
                ? 'اسأل الجهة المشغلة عن السياسات الفعلية. هذه قائمة للمراجعة وليست شهادة التزام أو ترخيص.'
                : 'Ask the actual provider for its approved policies. This checklist is not a certification or licence.'}
            </p>
          </div>
          <div className="grid gap-3">
            {[
              ar
                ? 'الترخيص والإشراف وتغطية غياب العاملين'
                : 'Licensing, supervision and staff coverage',
              ar
                ? 'الاستلام المصرح به والتواصل مع الأسرة'
                : 'Authorized collection and family communication',
              ar
                ? 'النظافة والطوارئ وخطة التعامل مع المخاطر'
                : 'Hygiene, emergencies and risk procedures',
              ar
                ? 'حماية صور الطفل ومستنداته وخصوصيته'
                : 'Child image, document and privacy protections'
            ].map((t) => (
              <div
                className="flex items-start gap-3 bg-white p-6 rounded-2xl font-bold text-[#145960]"
                key={t}
              >
                <CheckCircle2 className="shrink-0 text-[#145960]" size={20} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 - Visit Process */}
      <section data-sector-specific="visit-process" className="bg-[#F5C04E] py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1fr_1fr] gap-9 items-center">
          <div>
            <CalendarDays size={36} className="text-[#145960]" />
            <h2 className="bloom-display text-4xl sm:text-5xl mt-5 text-[#145960]">
              {ar ? 'قبل قرار التسجيل: خطط لزيارة' : 'Meet the idea before you decide'}
            </h2>
          </div>
          <div>
            <p className="leading-9 text-base text-[#145960]">
              {ar
                ? 'اختر الفئة العمرية ونوع الاستفسار ووسيلة تواصل ولي الأمر فقط. لا نطلب اسم الطفل أو ملفه الطبي أو مستنداته، ولا نؤكد موعدًا أو مكانًا فعليًا.'
                : 'Choose an age band, enquiry type and guardian contact only. No child name, medical records or documents. No place or tour is confirmed.'}
            </p>
            <Link
              className="inline-flex bg-[#145960] text-white rounded-full px-7 py-4 mt-7 gap-2 font-bold text-sm hover:bg-[#1C6C75] transition-colors"
              href={bloomPath(locale, 'admissions')}
            >
              {ar ? 'جرّب نموذج الزيارة' : 'Try the visit enquiry'}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 12 - Parent Guides */}
      <section data-sector-specific="parent-guides" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <h2 className="bloom-display text-4xl sm:text-5xl text-[#145960]">
            {ar ? 'دليل الأسرة قبل الزيارة' : 'Thoughtful reading for families'}
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {BLOOM.articles.map((a) => (
              <Link
                href={bloomPath(locale, 'journal/' + a.slug)}
                key={a.slug}
                className="rounded-3xl border-2 border-[#D6E4D6] p-7 flex flex-col min-h-56 hover:shadow-lg transition-shadow text-[#145960]"
              >
                <BookOpen size={28} className="text-[#145960]" />
                <h3 className="mt-6 text-xl font-bold">{a.title[locale]}</h3>
                <p className="text-sm leading-8 mt-4 text-[#2E4844]">{a.summary[locale]}</p>
                <span className="mt-auto pt-5 inline-flex gap-2 font-bold text-sm items-center">
                  {ar ? 'اقرأ الدليل' : 'Read guide'}
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 13 - Parent Questions */}
      <section data-sector-specific="parent-questions" className="bg-[#FFF9EE] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.65fr_1fr] gap-10">
          <div>
            <Heart size={35} className="text-[#A54F35]" />
            <h2 className="bloom-display text-4xl sm:text-5xl mt-5 text-[#145960]">
              {ar ? 'أسئلة الأهل تفرق' : 'Questions families deserve to ask'}
            </h2>
          </div>
          <div className="space-y-3">
            {BLOOM.faq.map((f) => (
              <details
                className="bg-white border border-[#D6E4D6] rounded-2xl p-6"
                key={f.q.en}
              >
                <summary className="font-extrabold cursor-pointer text-[#145960]">
                  {f.q[locale]}
                </summary>
                <p className="text-sm leading-8 mt-4 text-[#2E4844]">{f.a[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14 - Mavvix Nursery Conversion */}
      <section
        data-sector-specific="mavvix-nursery-conversion"
        className="bg-[#145960] text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap gap-8 items-center justify-between">
          <div className="max-w-3xl">
            <p className="text-[#F5C04E] font-bold text-xs tracking-widest">
              MAVVIX / YOUR NURSERY ONLINE
            </p>
            <h2 className="bloom-display text-4xl mt-5">
              {ar
                ? 'خلي أهل الأطفال يعرفوا حضانتك قبل أول زيارة'
                : 'Give families a clearer first look at your real nursery'}
            </h2>
            <p className="mt-5 leading-8 text-sm text-[#E6F3F1]">
              {ar
                ? 'موقع خاص بهويتك وبرامجك وسياساتك المعتمدة مع رحلة طلب زيارة وإدارة استفسارات.'
                : 'Your real branding, approved programmes, policies and an enquiry workflow built for your team.'}
            </p>
          </div>
          <a
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-3 items-center rounded-full bg-[#F5C04E] text-[#145960] px-8 py-4 font-extrabold text-sm hover:bg-[#F7CE72] transition-colors"
          >
            {ar ? 'اطلب موقعك' : 'Discuss your site'}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
