import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  LEXORA,
  LEGAL_BOOKS_PHOTO,
  LEGAL_BOOKS_SOURCE,
  lexoraPath,
  lexoraText
} from '@/lib/verticals/law-firm/data';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Scale,
  Landmark,
  BookOpen,
  ShieldCheck,
  BriefcaseBusiness,
  LockKeyhole,
  Compass,
  ScrollText
} from 'lucide-react';
import { LexoraPracticeCalibrator } from './LexoraPracticeCalibrator';
import { LexoraProfessionalStandards } from './LexoraProfessionalStandards';
import { LexoraVisualAtelier } from './LexoraVisualAtelier';

export default async function LexoraHome(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const { locale } = params;

  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const practice = LEXORA.services;

  const roles = [
    {
      title: { ar: 'الشركات والأعمال', en: 'For companies' },
      desc: {
        ar: 'حوكمة، عقود، موظفون، ونزاعات تجارية ضمن الدولة المختصة.',
        en: 'Governance, contracts, workplace matters and commercial disputes by jurisdiction.'
      },
      icon: BriefcaseBusiness,
      to: 'corporate'
    },
    {
      title: { ar: 'الأفراد والأصول', en: 'For individuals' },
      desc: {
        ar: 'معلومات تمهيدية عن الأصول والعقود والعلاقات، دون قبول قضية.',
        en: 'Educational orientation on assets and transactions—without accepting a case.'
      },
      icon: Landmark,
      to: 'assets'
    },
    {
      title: { ar: 'الأعمال العابرة للحدود', en: 'For cross-border business' },
      desc: {
        ar: 'تحديد الدول والنشاط قبل طرح الأسئلة على مهني مؤهل.',
        en: 'Clarify territories and business activities before consulting qualified local counsel.'
      },
      icon: Compass,
      to: 'international'
    }
  ];

  const stages = ar
    ? [
        ['01', 'حدّد المجال', 'فئة عامة فقط: عقود أو شركات أو أصول أو تعاملات دولية.'],
        ['02', 'حدّد الدولة', 'القواعد والاختصاصات تتغير بين الدول والجهات التنظيمية.'],
        ['03', 'احمِ التفاصيل', 'لا ترسل وثائق أو أسماء أطراف أو أرقام قضايا عبر الموقع العام.'],
        ['04', 'اطلب التحقق', 'أي تمثيل أو موعد أو أتعاب يحتاج محاميًا مرخصًا وتأكيدًا فعليًا.']
      ]
    : [
        ['01', 'Classify the area', 'A broad category is enough for the first contact.'],
        ['02', 'Select jurisdiction', 'Applicable procedures and regulators vary between countries.'],
        ['03', 'Protect the facts', 'Avoid documents, counterparties, case IDs and privileged details.'],
        ['04', 'Seek confirmation', 'Only qualified counsel can confirm representation, scope or fees.']
      ];

  return (
    <div>
      {/* 01: editorial hero with evidence-backed public domain books as unrelated illustration */}
      <section
        data-sector-specific="legal-editorial-opening"
        className="relative overflow-hidden bg-[#251D34] text-[#FAF7F1]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 grid lg:grid-cols-[1.07fr_.93fr] gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-3 text-[#E2C78F] font-semibold uppercase tracking-[.17em] text-xs">
              <span className="w-9 border-t border-[#B79B6A]" /> THE ART OF LEGAL CLARITY
            </span>
            <h1 className="lexora-display text-[clamp(3.1rem,6.4vw,6.9rem)] leading-[1.03] font-semibold tracking-tight mt-8">
              {ar ? (
                <>
                  القرار المهم <span className="text-[#D5BA84]">يستحق وضوحًا.</span>
                </>
              ) : (
                <>
                  Counsel begins with <em className="text-[#E0C68E] font-normal">clarity.</em>
                </>
              )}
            </h1>
            <p className="mt-7 text-base sm:text-lg leading-9 text-[#E9DFEA] max-w-2xl">
              {ar
                ? 'مساحات متخصصة للأعمال والعقود والنزاعات والملكية، مع فهم واضح لحدود الاستفسار الأولي وأهمية الولاية القضائية. تصميم قانوني راقٍ من مافكس، وليس مكتبًا يعمل بالفعل.'
                : 'An editorial digital experience for practice areas, commercial decisions and privacy-first introductions. Created by Mavvix to show what a high-trust law firm website can be.'}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link
                href={lexoraPath(locale, 'practices')}
                className="inline-flex items-center gap-3 bg-[#E4C990] text-[#251D34] px-7 py-4 font-bold text-sm hover:bg-[#F2DDA9] rounded-sm transition-colors"
              >
                {ar ? 'استكشف المجالات' : 'Explore practice areas'}
                <Arrow size={18} />
              </Link>
              <Link
                href={lexoraPath(locale, 'consultation')}
                className="border border-[#BAA385] px-7 py-4 text-sm text-white inline-flex gap-2 items-center font-bold rounded-sm hover:bg-white/10 transition-colors"
              >
                {ar ? 'استفسار أولي' : 'Start an enquiry'}
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <p className="text-xs mt-10 text-[#D9C6D4] flex items-start gap-2">
              <LockKeyhole size={17} className="shrink-0 text-[#E0C68E]" />
              {ar
                ? 'نموذج تواصل عام بلا مستندات أو بيانات قضية حساسة.'
                : 'Minimal-contact-only form; no privileged or sensitive case details.'}
            </p>
          </div>
          <div className="relative min-h-[440px] sm:min-h-[620px] lg:min-h-[690px]">
            <div className="absolute inset-[6%_8%_0_12%] border border-[#96817A]" />
            <div className="absolute inset-[0_12%_7%_0] bg-[#C4AA84] overflow-hidden">
              <img
                src={LEGAL_BOOKS_PHOTO}
                alt={
                  ar
                    ? 'كتب قانونية كندية في صورة تحريرية لديفيد ويلان من ويكيميديا؛ ليست مكتبة لمكتب Lexora'
                    : 'Editorial photo of Canadian law books by David Whelan; not a Lexora office library'
                }
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241B30]/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 start-4 text-xs text-white bg-[#241B30]/90 px-3 py-2 rounded-sm font-medium">
                David Whelan · CC0 · Wikimedia Commons
              </span>
            </div>
            <span className="absolute end-0 top-[8%] bg-[#E4C990] text-[#251D34] w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center rounded-full shadow-xl">
              <Scale size={55} strokeWidth={1.1} />
            </span>
            <div className="absolute bottom-0 end-[3%] bg-[#FAF7F1] text-[#251D34] p-6 max-w-48 border border-[#D5C8B5]">
              <span className="lexora-display text-2xl font-bold">
                {ar ? 'ثقة بلا مبالغة' : 'Trust, not claims.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02: audience-to-practice navigation — not a card farm */}
      <section data-sector-specific="counsel-audiences" className="py-20 sm:py-28 bg-[#FAF7F1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[.78fr_1.2fr] gap-11">
            <div>
              <p className="text-[#775A2E] tracking-[.2em] uppercase text-xs font-bold">
                WHO WE DESIGN FOR
              </p>
              <h2 className="lexora-display text-4xl sm:text-6xl mt-6 text-[#251D34]">
                {ar ? 'الاحتياج أولًا، ثم التخصص' : 'Start with the business question'}
              </h2>
              <p className="text-sm text-[#3F314B] leading-9 mt-5">
                {ar
                  ? 'الموقع القانوني الجيد يوضح المجالات بدون ادعاء خبرة أفراد أو نتائج قضايا غير موجودة.'
                  : 'A useful legal website makes service boundaries understandable without inventing case wins or lawyer qualifications.'}
              </p>
            </div>
            <div className="divide-y divide-[#D5C8B5] border-y border-[#D5C8B5]">
              {roles.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Link
                    href={lexoraPath(locale, 'industries')}
                    key={i}
                    className="flex items-center gap-6 py-8 group text-[#251D34]"
                  >
                    <Icon size={31} strokeWidth={1.4} className="text-[#775A2E] shrink-0" />
                    <div className="flex-1">
                      <h3 className="lexora-display text-3xl font-bold">{r.title[locale]}</h3>
                      <p className="text-sm leading-8 text-[#3F314B] mt-2">{r.desc[locale]}</p>
                    </div>
                    <ArrowUpRight size={22} className="text-[#775A2E]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 03: eight legal specialties, grounded educational descriptions */}
      <section data-sector-specific="practice-areas-matrix" className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-11">
            <div>
              <p className="uppercase tracking-[.22em] text-xs text-[#775A2E] font-bold">
                EIGHT DISCIPLINES
              </p>
              <h2 className="lexora-display text-4xl sm:text-6xl mt-4 text-[#251D34]">
                {ar ? 'مجالات قانونية بمحتوى له معنى' : 'Practice areas, beyond a list of names'}
              </h2>
            </div>
            <Link
              href={lexoraPath(locale, 'practices')}
              className="text-sm font-bold text-[#251D34] underline underline-offset-8 flex items-center gap-2 hover:text-[#775A2E] transition-colors"
            >
              {ar ? 'كل المجالات' : 'View the practice directory'}
              <Arrow size={17} />
            </Link>
          </div>
          <div className="border-t border-[#D7CAB8] grid md:grid-cols-2">
            {practice.map((s, i) => (
              <Link
                key={s.slug}
                href={lexoraPath(locale, 'practices/' + s.slug)}
                className="border-b border-[#D7CAB8] py-7 sm:py-9 pe-7 flex items-start gap-6 hover:bg-[#F7F2E7] transition-colors min-h-36 text-[#251D34]"
              >
                <span className="font-mono text-sm text-[#775A2E] font-bold">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                    {lexoraText(s.title, locale)}
                  </h3>
                  <p className="text-sm leading-8 text-[#3F314B] mt-3">
                    {lexoraText(s.summary, locale)}
                  </p>
                </div>
                <ArrowUpRight size={19} className="text-[#775A2E] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Component 1: Interactive Legal Practice & Jurisdiction Calibrator */}
      <LexoraPracticeCalibrator locale={locale} />

      {/* 04: contract anatomy */}
      <section data-sector-specific="contracts-anatomy" className="bg-[#EDE5D8] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.9fr_1.1fr] gap-14">
          <div>
            <span className="uppercase text-[#775A2E] text-xs tracking-widest font-bold">
              THE ANATOMY OF AN AGREEMENT
            </span>
            <h2 className="lexora-display text-4xl sm:text-6xl mt-5 text-[#251D34]">
              {ar ? 'العقد الجيد يبدأ بتحديد الالتزام' : 'Before the signature, clarify the scope'}
            </h2>
            <p className="mt-7 text-sm text-[#3F314B] leading-9">
              {ar
                ? 'نتكلم عن أسئلة مهمة، مش صياغة ملزمة أو رأي في عقد معين: ماذا يُسلّم؟ ومن يعتمد التغيير؟ وكيف يُدار الخلاف؟'
                : 'General contract-readiness topics, not advice on a particular agreement: who delivers, what changes require approval and how commercial disagreements are handled.'}
            </p>
            <Link
              href={lexoraPath(locale, 'practices/commercial-contracts')}
              className="inline-flex gap-3 items-center text-[#251D34] font-bold text-sm border-b-2 border-[#775A2E] mt-8 pb-1 hover:text-[#775A2E] transition-colors"
            >
              {ar ? 'تفاصيل مراجعة العقود' : 'Contract review dossier'}
              <Arrow size={17} />
            </Link>
          </div>
          <div className="bg-[#FAF7F1] p-8 sm:p-12 border border-[#D3C6B3]">
            <div className="flex gap-3 text-[#775A2E] items-center uppercase text-xs font-bold tracking-widest">
              <ScrollText size={19} /> DOCUMENT CLARITY
            </div>
            <div className="mt-9 divide-y divide-[#D8CBBD]">
              {[
                [
                  ar ? 'المخرجات' : 'Deliverables',
                  ar ? 'ما الذي سيقدمه كل طرف؟' : 'What is each party expected to provide?'
                ],
                [
                  ar ? 'الدفعات والتغيير' : 'Payment and change',
                  ar
                    ? 'كيف تُعتمد التكلفة أو الخطوات الإضافية؟'
                    : 'How are additional costs and changes approved?'
                ],
                [
                  ar ? 'نطاق المسؤولية' : 'Responsibility',
                  ar ? 'ما حدود الوعود والمتطلبات؟' : 'What are the actual obligations and limitations?'
                ],
                [
                  ar ? 'إنهاء العلاقة' : 'Ending the relationship',
                  ar ? 'ماذا يحدث عند التوقف أو الخلاف؟' : 'What happens on exit or disagreement?'
                ]
              ].map(([t, d], i) => (
                <div key={i} className="flex gap-5 py-5 text-[#251D34]">
                  <span className="font-mono text-[#775A2E] font-bold">0{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-lg">{t}</h3>
                    <p className="text-sm text-[#3F314B] leading-7 mt-2">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signature Component 2: 4 Legal Governance & Professional Ethics Pillars */}
      <LexoraProfessionalStandards locale={locale} />

      {/* 06: jurisdiction-aware distinctions */}
      <section data-sector-specific="jurisdiction-decisions" className="py-20 sm:py-24 bg-[#FAF7F1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap gap-6 justify-between items-end mb-11">
            <div>
              <p className="text-xs uppercase text-[#775A2E] font-bold tracking-widest">
                REGIONAL NUANCE
              </p>
              <h2 className="lexora-display text-4xl sm:text-6xl mt-5 text-[#251D34]">
                {ar ? 'الولاية القضائية تغيّر الإجابة' : 'Jurisdiction changes the question'}
              </h2>
            </div>
            <p className="text-[#3F314B] max-w-sm text-sm leading-8">
              {ar
                ? 'نفس المصطلح قد يحمل أثرًا مختلفًا في مصر والسعودية. بيانات النشاط والاختصاص أساس للمراجعة الحقيقية.'
                : 'The same commercial term may have different effects across Egypt and Saudi Arabia. Exact advice requires local qualification.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              [
                ar ? 'مصر' : 'Egypt',
                ar
                  ? 'متطلبات الشركة والعقود والإجراءات تتحدد حسب التشريعات المحلية وطبيعة النشاط.'
                  : 'Corporate and contractual rules depend on current local regulations and sector.'
              ],
              [
                ar ? 'السعودية' : 'Saudi Arabia',
                ar
                  ? 'الحوكمة والتراخيص ونطاق الخدمات يحتاجون مراجعة مهنية محلية.'
                  : 'Governance and licensing scope require qualified local review.'
              ],
              [
                ar ? 'أعمال دولية' : 'Cross-border',
                ar
                  ? 'تعدد الدول يرفع أهمية تحديد من يقدّم المشورة في كل نطاق.'
                  : 'Multiple territories call for separate legal competence and coordination.'
              ]
            ].map(([title, desc], i) => (
              <div key={i} className="border-t-4 border-[#775A2E] bg-white p-8 min-h-52 text-[#251D34]">
                <Landmark size={29} className="text-[#775A2E]" />
                <h3 className="lexora-display text-3xl font-bold mt-7">{title}</h3>
                <p className="text-sm leading-8 text-[#3F314B] mt-4">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Component 3: Verified Visual Atelier with SHA-256 Provenance */}
      <section className="bg-[#FAF7F1] py-16 sm:py-24 border-t border-[#D5C8B5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <LexoraVisualAtelier locale={locale} />
        </div>
      </section>

      {/* 08: journey steps */}
      <section data-sector-specific="legal-intake-sequence" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-[#775A2E] text-xs font-bold tracking-widest">A RESPONSIBLE FIRST CONTACT</p>
          <h2 className="lexora-display text-4xl sm:text-6xl mt-5 text-[#251D34]">
            {ar ? 'المسار يبدأ بأقل معلومات ممكنة' : 'From practice category to a responsible next step'}
          </h2>
          <div className="grid md:grid-cols-4 gap-4 mt-12">
            {stages.map(([n, title, desc]) => (
              <div
                key={n}
                className="bg-[#FAF7F1] p-7 border border-[#DED1BE] flex flex-col min-h-72 text-[#251D34]"
              >
                <span className="font-mono text-3xl text-[#775A2E] font-bold">{n}</span>
                <h3 className="lexora-display text-2xl font-bold mt-9">{title}</h3>
                <p className="text-[#3F314B] text-sm leading-8 mt-5">{desc}</p>
              </div>
            ))}
          </div>
          <Link
            href={lexoraPath(locale, 'approach')}
            className="mt-9 font-bold text-sm text-[#251D34] inline-flex gap-2 items-center underline underline-offset-8 hover:text-[#775A2E] transition-colors"
          >
            {ar ? 'منهج العمل خطوة بخطوة' : 'Read the safe enquiry process'}
            <Arrow size={17} />
          </Link>
        </div>
      </section>

      {/* 09: original insights */}
      <section data-sector-specific="legal-insights-knowledge" className="py-20 sm:py-28 bg-[#EEE6D8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-between gap-7 items-end mb-10">
            <div>
              <p className="tracking-widest uppercase text-[#775A2E] text-xs font-bold">
                AN EDITORIAL LEGAL LIBRARY
              </p>
              <h2 className="lexora-display text-4xl sm:text-6xl mt-5 text-[#251D34]">
                {ar ? 'معرفة قبل الاستفسار' : 'Thoughtful reading before the first meeting'}
              </h2>
            </div>
            <Link
              href={lexoraPath(locale, 'insights')}
              className="text-sm font-bold text-[#251D34] underline underline-offset-8 hover:text-[#775A2E] transition-colors"
            >
              {ar ? 'كل المقالات' : 'View all insights'}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {LEXORA.articles.map((a, i) => (
              <Link
                key={a.slug}
                href={lexoraPath(locale, 'insights/' + a.slug)}
                className="bg-white p-8 border border-[#D8CAB5] min-h-80 flex flex-col hover:shadow-xl transition-shadow text-[#251D34]"
              >
                <span className="flex items-center justify-between text-[#775A2E]">
                  <BookOpen size={29} />
                  <span className="text-xs font-mono font-bold">INSIGHT / 0{i + 1}</span>
                </span>
                <h3 className="lexora-display text-2xl sm:text-3xl font-bold mt-9">
                  {lexoraText(a.title, locale)}
                </h3>
                <p className="text-sm text-[#3F314B] leading-8 mt-5">
                  {lexoraText(a.summary, locale)}
                </p>
                <span className="mt-auto pt-6 font-bold text-sm flex items-center gap-2 text-[#775A2E]">
                  {ar ? 'اقرأ المقال' : 'Read the article'}
                  <Arrow size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10: FAQs, reassurance without false assurance */}
      <section data-sector-specific="legal-questions" className="py-20 sm:py-28 bg-[#FAF7F1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[.7fr_1.1fr] gap-12">
          <div>
            <p className="text-xs text-[#775A2E] font-bold tracking-widest uppercase">
              THE ESSENTIAL QUESTIONS
            </p>
            <h2 className="lexora-display text-4xl sm:text-6xl mt-5 text-[#251D34]">
              {ar ? 'أسئلة تهمك قبل مشاركة معلوماتك' : 'The right questions before any engagement'}
            </h2>
          </div>
          <div className="space-y-3">
            {LEXORA.faq.map((f, i) => (
              <details className="bg-white border border-[#DCCEBB] p-6 sm:p-7 text-[#251D34]" key={i}>
                <summary className="font-bold cursor-pointer text-base">
                  {lexoraText(f.q, locale)}
                </summary>
                <p className="text-sm leading-8 text-[#3F314B] mt-5">{lexoraText(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11: project acquisition CTA for Mavvix */}
      <section data-sector-specific="mavvix-legal-cta" className="bg-[#251D34] text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <p className="uppercase tracking-[.2em] font-bold text-[#E4CA91] text-xs">
              MAVVIX / SPECIALIZED DIGITAL PRESENCE
            </p>
            <h2 className="lexora-display text-4xl sm:text-6xl mt-6 max-w-4xl">
              {ar
                ? 'مكتبك الحقيقي يحتاج حضورًا يليق بثقة عملائه'
                : 'Your real firm deserves a distinctive digital experience'}
            </h2>
            <p className="mt-7 text-[#E8DDE9] leading-9 max-w-2xl text-sm sm:text-base">
              {ar
                ? 'مافكس تقدر تصمم موقعًا بخدمات المكتب وبيانات المحامين المعتمدة وضوابط خصوصية وتواصل تناسب نشاطه القانوني.'
                : 'Mavvix can design a real law firm’s bilingual website using owner-verified practice areas, qualified profiles and approved confidential-intake procedures.'}
            </p>
          </div>
          <a
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E4CA91] text-[#251D34] px-8 py-5 font-bold text-sm inline-flex items-center gap-3 rounded-sm hover:bg-[#F2DDA9] transition-colors"
          >
            {ar ? 'اطلب موقعًا لمكتبك' : 'Discuss a site for your firm'}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}
