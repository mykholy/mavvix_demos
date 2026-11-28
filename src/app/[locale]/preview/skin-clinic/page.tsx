import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  Flower2,
  ScanLine,
  ShieldCheck,
  MessageCircle,
  ClipboardCheck,
  BookOpen,
  HeartHandshake
} from 'lucide-react';
import { ELYRA, elyraPath } from '@/lib/verticals/skin-clinic/data';
import { ElyraSkinCalibrator } from './ElyraSkinCalibrator';
import { ElyraClinicalGovernance } from './ElyraClinicalGovernance';
import { ElyraVisualAtelier } from './ElyraVisualAtelier';

export default async function ElyraHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const ar = locale === 'ar';
  const d = ELYRA;
  const room = d.media[0];
  const tool = d.media[1];

  const wrap = 'mx-auto max-w-7xl px-5 sm:px-8';
  const label = 'text-xs font-bold tracking-[.18em] text-[#754458] uppercase';
  const head = 'mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#352B39] leading-tight';
  const cta =
    'inline-flex items-center gap-3 bg-[#352B39] text-white px-6 py-4 text-sm font-bold hover:bg-[#754458] transition-colors';

  return (
    <div className="bg-[#F7F3EF] text-[#352B39] selection:bg-[#EEE3E7] selection:text-[#352B39]">
      {/* 01. Editorial Hero */}
      <section data-sector-specific="clinical-editorial-hero" className="bg-[#F7F3EF]">
        <div className={wrap + ' grid gap-10 py-12 lg:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center'}>
          <div>
            <p className={label}>ELYRA SKIN / CARE BEGINS WITH LISTENING</p>
            <h1 className="mt-6 font-serif text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[1.08] tracking-tight text-[#352B39]">
              {ar ? (
                <>
                  بشرتك لها قصة فريدة.
                  <br />
                  <span className="text-[#754458]">ابدأ بفهمها سريرياً.</span>
                </>
              ) : (
                <>
                  Skin has a unique story.
                  <br />
                  <span className="text-[#754458]">Start by listening.</span>
                </>
              )}
            </h1>
            <p className="mt-6 leading-relaxed text-sm sm:text-base text-[#50434F] max-w-xl">
              {ar
                ? 'استكشف مسار التقييم الجلدي المتأني والاختيار التجميلي المستنير، من الاستشارة المبدئية إلى خطط المتابعة المستمرة. خيارات مدروسة، بلا مبالغات تسويقية أو نتائج مضمونة زيفاً.'
                : 'Explore considered dermatological assessment, evidence-based care, and informed aesthetic choices from initial consultation to tailored follow-up. Restrained clinical excellence without commercial hyperbole.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={elyraPath(locale, 'contact')} className={cta}>
                {ar ? 'اطلب تواصلاً إدارياً' : 'Request a callback'}
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href={elyraPath(locale, 'services')}
                className="border border-[#86566B] bg-white text-[#352B39] px-6 py-4 font-bold text-sm hover:border-[#352B39] transition-colors"
              >
                {ar ? 'استكشف الاستشارات' : 'Explore consultations'}
              </Link>
            </div>
          </div>

          <figure className="relative">
            <img
              src={room.url}
              alt={room.alt[locale]}
              loading="eager"
              className="w-full h-[330px] sm:h-[500px] object-cover rounded-t-[4rem] border border-[#D6C9CD] shadow-sm"
            />
            <span className="absolute top-5 end-5 bg-[#F7F3EF]/95 backdrop-blur-sm text-[#352B39] border border-[#D6C9CD] px-4 py-2 text-xs font-bold tracking-wider">
              {ar ? 'مساحة هادئة للرعاية' : 'A SPACE FOR CARE'}
            </span>
            <figcaption className="mt-3 text-xs leading-6 text-[#6B5A69]">
              <a href={room.source} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#754458]">
                {room.credit}
              </a>{' '}
              ·{' '}
              <a href={room.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#754458]">
                {room.license}
              </a>{' '}
              · {ar ? 'صورة تحريرية مستقلة، اقتصاص للعرض' : 'Independent editorial photo, display crop'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02. Signature Component: ElyraSkinCalibrator */}
      <div data-sector-specific="skin-consultation-calibrator">
        <ElyraSkinCalibrator locale={locale} />
      </div>

      {/* 03. Care Pathways */}
      <section data-sector-specific="consultation-pathways" className="bg-[#DCE6DA] py-16 sm:py-20 border-b border-[#BACBB8]">
        <div className={wrap}>
          <p className={label}>03 / CARE PATHWAYS</p>
          <h2 className={head}>
            {ar ? 'المسار المناسب يبدأ بالتقييم' : 'The right pathway begins with assessment'}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: ScanLine,
                k: 'medical',
                a: 'الجلدية الطبية',
                e: 'Medical dermatology',
                ad: 'تقييم شامل لصحة الجلد والحاجز الدهني وفروة الرأس على يد مختص.',
                ed: 'Comprehensive evaluation of skin barrier, inflammation and scalp health.'
              },
              {
                Icon: Flower2,
                k: 'aesthetic',
                a: 'التجميل الطبي المستنير',
                e: 'Aesthetic consultation',
                ad: 'مناقشة خيارات النضارة والليزر والبدائل غير التداخلية بكل شفافية.',
                ed: 'Transparent discussion of texture, tone and non-invasive laser modalities.'
              },
              {
                Icon: HeartHandshake,
                k: 'care',
                a: 'استمرارية الرعاية والمتابعة',
                e: 'Continuity of care',
                ad: 'المتابعة المباشرة وتعديل بروتوكول العناية المنزلية بما يلائم التطور.',
                ed: 'Direct follow-up and home barrier calibration aligned with healing.'
              }
            ].map(({ Icon, k, a, e, ad, ed }) => (
              <Link
                key={k}
                href={elyraPath(locale, 'services') + '?category=' + k}
                className="bg-[#F7F3EF] rounded-t-[2.5rem] p-8 border border-[#BACBB8] hover:border-[#754458] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#EEE3E7] flex items-center justify-center text-[#754458] group-hover:bg-[#352B39] group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#352B39]">
                    {ar ? a : e}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#50434F]">
                    {ar ? ad : ed}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D6C9CD] flex items-center justify-between text-xs font-bold text-[#754458]">
                  <span>{ar ? 'استعراض المسارات' : 'Explore pathway'}</span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Consultation Dossiers Library */}
      <section data-sector-specific="skin-consultation-dossiers" className={wrap + ' py-16 sm:py-24'}>
        <div className="max-w-2xl">
          <p className={label}>04 / CONSULTATION LIBRARY</p>
          <h2 className={head}>
            {ar ? 'ثمانية مجالات متخصصة للاستشارة' : 'Eight consultation pathways'}
          </h2>
          <p className="mt-3 text-sm text-[#50434F]">
            {ar
              ? 'ملفات استشارية سريرية تغطي أبرز الاحتياجات الجلدية، موضحة المنهجية والتوقعات.'
              : 'Detailed clinical consultation dossiers establishing methodology and realistic milestones.'}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.services.map((s) => (
            <Link
              key={s.slug}
              href={elyraPath(locale, 'services/' + s.slug)}
              className="bg-white border border-[#D6C9CD] p-6 rounded-t-2xl hover:border-[#754458] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex justify-between items-center text-xs font-bold font-mono text-[#754458]">
                  <span>{String(s.rank).padStart(2, '0')} / {s.category.toUpperCase()}</span>
                  <ArrowUpRight size={16} className="text-[#352B39] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 text-xl font-serif font-medium text-[#352B39] group-hover:text-[#754458] transition-colors">
                  {s.title[locale]}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B5A69] line-clamp-3">
                  {s.summary[locale]}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E8DFE2] text-xs font-bold text-[#352B39]">
                {ar ? 'قراءة الملف الاستشاري' : 'Read dossier'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 05. Assessment First & Device Insight */}
      <section data-sector-specific="assessment-first" className="bg-[#EEE3E7] py-16 sm:py-20 border-y border-[#D6C9CD]">
        <div className={wrap + ' grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center'}>
          <figure className="bg-white p-6 rounded-t-[3rem] border border-[#D6C9CD] shadow-sm">
            <img
              src={tool.url}
              alt={tool.alt[locale]}
              loading="lazy"
              className="w-full max-h-[360px] object-contain mx-auto"
            />
            <figcaption className="mt-4 pt-4 border-t border-[#E8DFE2] text-xs leading-relaxed text-[#6B5A69]">
              <a className="underline font-bold text-[#754458]" href={tool.source} target="_blank" rel="noopener noreferrer">
                {tool.credit}
              </a>{' '}
              ·{' '}
              <a className="underline font-bold text-[#754458]" href={tool.licenseUrl} target="_blank" rel="noopener noreferrer">
                {tool.license}
              </a>{' '}
              · {ar ? 'صورة مستقلة لمنظار جلدي مجهري' : 'Independent dermatoscope optical device photograph'}
            </figcaption>
          </figure>

          <div>
            <p className={label}>05 / ASSESSMENT FIRST</p>
            <h2 className={head}>
              {ar ? 'التقييم الموضوعي يسبق أي إجراء' : 'Objective assessment precedes any procedure'}
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#50434F]">
              {ar
                ? 'اختيار أي إجراء طبي أو تجميلي يتطلب تقييماً فردياً متأنياً لملاءمة نوع البشرة ومناقشة البدائل والمخاطر مع طبيب مؤهل. التجهيزات المعروضة تمثل صوراً تحريرية مستقلة ولا تعد ادعاءً بملكية معدات بعينها.'
                : 'Selecting any clinical or aesthetic procedure requires individualized evaluation, risk appraisal, and candid discussion with a credentialed practitioner. Displayed images are independent editorial references, not proprietary claims.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={elyraPath(locale, 'informed-choice')} className={cta}>
                {ar ? 'معايير الاختيار المستنير' : 'Informed choice criteria'}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Signature Component: ElyraClinicalGovernance */}
      <div data-sector-specific="clinical-governance-standards">
        <ElyraClinicalGovernance locale={locale} />
      </div>

      {/* 07. The Patient Journey */}
      <section data-sector-specific="care-journey" className={wrap + ' py-16 sm:py-24'}>
        <p className={label}>07 / THE CARE JOURNEY</p>
        <h2 className={head}>
          {ar ? 'رحلة الرعاية خطوة بخطوة' : 'A considered care journey'}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              num: '01',
              arTitle: 'تواصل إداري مبدئي',
              enTitle: 'Administrative Intake',
              arDesc: 'تسجيل الاسم ورقم الهاتف واختيار الفترة المناسبة لتنسيق الزيارة دون طلب أي بيانات صحية.',
              enDesc: 'Provide contact details and preferred callback window without disclosing sensitive medical history.'
            },
            {
              num: '02',
              arTitle: 'تقييم سريري متأمل',
              enTitle: 'Clinical Assessment',
              arDesc: 'فحص مجهري وبصري مباشر لحالة البشرة وتاريخها من قِبل طبيب الجلدية المعتمد.',
              enDesc: 'In-person examination by a licensed dermatologist evaluating skin barrier integrity and concerns.'
            },
            {
              num: '03',
              arTitle: 'مناقشة الخيارات والبدائل',
              enTitle: 'Transparent Options',
              arDesc: 'عرض الخيارات المتاحة، فترات التعافي، التكاليف المتوقعة، والبدائل اللطيفة غير التداخلية.',
              enDesc: 'Comprehensive discussion of available modalities, downtime, realistic trajectories, and costs.'
            },
            {
              num: '04',
              arTitle: 'متابعة خاصة وترميم',
              enTitle: 'Tailored Follow-Up',
              arDesc: 'إرشادات العناية المنزلية ومتابعة استقرار نتائج الجلسات لدعم التعافي المستمر.',
              enDesc: 'Supportive barrier replenishment protocols and scheduled follow-ups to preserve healthy outcomes.'
            }
          ].map((step) => (
            <div
              key={step.num}
              className="border border-[#D6C9CD] bg-white rounded-t-2xl p-7 flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-[#754458]">
                  {step.num}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-[#352B39]">
                  {ar ? step.arTitle : step.enTitle}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#50434F]">
                  {ar ? step.arDesc : step.enDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#6B5A69] leading-relaxed">
          {ar
            ? 'تنويه: الخطوات السريرية الفعلية تتطلب لقاء طبيباً مرخصاً؛ هذا الموقع مخصص لاستقبال الاستفسارات الإدارية التنسيقية فقط.'
            : 'Notice: Real clinical steps require an in-person licensed physician; this demo platform accepts administrative scheduling enquiries only.'}
        </p>
      </section>

      {/* 08. Signature Component: ElyraVisualAtelier */}
      <div data-sector-specific="clinical-visual-atelier">
        <ElyraVisualAtelier locale={locale} />
      </div>

      {/* 09. Privacy by Design & Contact Request Banner */}
      <section data-sector-specific="clinical-privacy" className={wrap + ' pb-16 sm:pb-24'}>
        <div className="bg-[#352B39] text-white rounded-t-3xl p-8 sm:p-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-[#DCE6DA] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={18} />
              <span>{ar ? '٠٩ / الخصوصية في صميم التصميم' : '09 / PRIVACY BY DESIGN'}</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white font-medium">
              {ar ? 'بياناتك الصحية ليست جزءاً من طلب التواصل' : 'Your medical data stays out of the enquiry'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8DFE2] max-w-2xl">
              {ar
                ? 'الاسم ورقم التواصل والفترة المفضلة فقط. خلو تام من رفع الصور أو وصف الأعراض أو السجلات الطبية، لمنع أي تسريب سياقي للشبكات الإعلانية.'
                : 'Name, phone, and callback window only. Completely free of photo uploads, symptom descriptions, or patient files to ensure absolute confidentiality.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={elyraPath(locale, 'contact')}
              className="bg-[#DCE6DA] text-[#352B39] hover:bg-white px-7 py-4 text-sm font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>{ar ? 'طلب تواصل إداري' : 'Request Callback'}</span>
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href={elyraPath(locale, 'privacy')}
              className="border border-[#BACBB8] text-white hover:bg-white/10 px-6 py-4 text-sm font-bold transition-colors"
            >
              {ar ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Elyra Journal & Guides */}
      <section data-sector-specific="care-journal" className={wrap + ' pb-16 sm:pb-24'}>
        <div className="max-w-2xl">
          <p className={label}>10 / ELYRA JOURNAL</p>
          <h2 className={head}>
            {ar ? 'دليل الاستشارة والوعي الجلدي' : 'Consultation and clinical guides'}
          </h2>
          <p className="mt-3 text-sm text-[#50434F]">
            {ar
              ? 'مقالات تثقيفية لمساعدتك على فهم خيارات الرعاية الجلدية دون وعود زائفة.'
              : 'Educational articles clarifying dermatology pathways and informed consent.'}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {d.articles.map((a) => (
            <Link
              key={a.slug}
              href={elyraPath(locale, 'guides/' + a.slug)}
              className="border border-[#D6C9CD] bg-white rounded-t-2xl p-7 hover:border-[#754458] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <BookOpen size={24} className="text-[#754458]" />
                <h3 className="mt-4 font-serif text-xl font-medium text-[#352B39] group-hover:text-[#754458] transition-colors">
                  {a.title[locale]}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B5A69]">
                  {a.summary[locale]}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E8DFE2] text-xs font-bold text-[#352B39] flex items-center justify-between">
                <span>{ar ? 'قراءة الدليل' : 'Read guide'}</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. Clinical FAQ */}
      <section data-sector-specific="clinical-faq" className="bg-[#EEE3E7] py-16 sm:py-24 border-t border-[#D6C9CD]">
        <div className={wrap + ' grid gap-10 lg:grid-cols-[.7fr_1.3fr]'}>
          <div>
            <p className={label}>11 / QUESTIONS</p>
            <h2 className={head}>
              {ar ? 'الأسئلة الشائعة قبل التواصل' : 'Frequently asked questions'}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#50434F]">
              {ar
                ? 'إجابات واضحة ومباشرة حول طبيعة الاستفسارات الإدارية، وسياسات الخصوصية، وحدود الممارسة الطبية.'
                : 'Direct answers clarifying administrative enquiries, patient privacy rules, and clinical boundaries.'}
            </p>
          </div>

          <div className="space-y-4">
            {d.faq.map((f, i) => (
              <details
                key={i}
                className="bg-white border border-[#D6C9CD] rounded-xl p-5 open:shadow-sm transition-all"
              >
                <summary className="cursor-pointer font-bold text-sm text-[#352B39] hover:text-[#754458] flex items-center justify-between">
                  <span>{f.question[locale]}</span>
                </summary>
                <p className="mt-3 pt-3 border-t border-[#E8DFE2] text-xs leading-relaxed text-[#50434F]">
                  {f.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
