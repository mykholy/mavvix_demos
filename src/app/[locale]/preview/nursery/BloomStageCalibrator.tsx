'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Sparkles,
  Heart,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Sun,
  Smile,
  Baby,
  Footprints,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { bloomPath } from '@/lib/verticals/nursery/data';

interface StageProfile {
  ageBand: '1-2' | '2-3' | '3-5';
  title: { ar: string; en: string };
  stageName: { ar: string; en: string };
  summary: { ar: string; en: string };
  developmentalFocus: { ar: string; en: string };
  standardCaregiverRatio: string;
  recommendedSettlingDays: number;
  learningInvitations: { ar: string; en: string }[];
  keyQuestionsForTour: { ar: string; en: string }[];
}

const STAGE_PROFILES: readonly StageProfile[] = [
  {
    ageBand: '1-2',
    title: { ar: 'المستكشفون الصغار', en: 'Little Explorers' },
    stageName: { ar: 'من سنة إلى سنتين', en: '1 to under 2 years' },
    summary: {
      ar: 'بيئة حسية آمنة تركز على علاقة الارتباط العاطفي الهادئ مع مقدم الرعاية والتدرج في استكشاف المحيط.',
      en: 'A gentle, responsive setting focused on secure attachment, soothing sensory play, and familiar daily rhythms.'
    },
    developmentalFocus: {
      ar: 'بناء الأمان النفسي، استكشاف القوام والأصوات، وحرية الحركة في مساحة خالية من الحواف الحادة.',
      en: 'Cultivating emotional security, tactile and auditory discovery, and unhurried floor movement.'
    },
    standardCaregiverRatio: '1 : 3',
    recommendedSettlingDays: 10,
    learningInvitations: [
      { ar: 'خامات حسية طبيعية (خشب، أقمشة ناعمة)', en: 'Natural sensorial textures (untreated wood, soft textiles)' },
      { ar: 'قصص مصورة كبيرة ذات ملامس مختلفة', en: 'Oversized touch-and-feel picture books' },
      { ar: 'ألعاب الدحرجة والتسلق الإسفنجي الآمن', en: 'Low-profile foam crawling and balancing modules' }
    ],
    keyQuestionsForTour: [
      [
        { ar: 'كيف يتم التعامل مع فترات قيلولة الطفل وروتين طعامه الخاص؟', en: 'How are individual nap schedules and home feeding routines honored?' },
        { ar: 'ما هي خطوات الاستقبال الصباحي لتخفيف قلق الانفصال؟', en: 'What morning handover rituals support gradual separation comfort?' }
      ]
    ][0]
  },
  {
    ageBand: '2-3',
    title: { ar: 'خطوات الفضول', en: 'Curious Toddlers' },
    stageName: { ar: 'من سنتين إلى 3 سنوات', en: '2 to under 3 years' },
    summary: {
      ar: 'مساحة نشطة تشجع على التعبير اللفظي، الاستقلال في اختيار الأنشطة، واللعب المتوازي مع الأقران.',
      en: 'An active environment encouraging spoken vocabulary, self-selected activities, and parallel peer play.'
    },
    developmentalFocus: {
      ar: 'تنمية المفردات اللغوية، فرز الأشكال والألوان، وتدريب التآزر بين حركة اليد والعين.',
      en: 'Language expansion, color and dimension sorting, and hand-eye fine motor coordination.'
    },
    standardCaregiverRatio: '1 : 5',
    recommendedSettlingDays: 7,
    learningInvitations: [
      { ar: 'مكعبات البناء وأسطوانات المطابقة الملونة', en: 'Building blocks and color-matching cylinders' },
      { ar: 'أغاني تفاعلية وألعاب الحركة الإيقاعية', en: 'Rhythmic action songs and circular movement games' },
      { ar: 'ركن الرسم بالألوان الآمنة القابلة للغسل', en: 'Washable non-toxic finger paints and large easel paper' }
    ],
    keyQuestionsForTour: [
      [
        { ar: 'كيف يساعد الفريق الأطفال على التعبير عن مشاعرهم وحل النزاعات البسيطة؟', en: 'How do educators guide emerging emotions and gentle conflict resolution?' },
        { ar: 'ما هو البروتوكول المتبع في التدريب على استخدام المرحاض والنظافة؟', en: 'What is the collaborative protocol for gentle toilet learning and hygiene?' }
      ]
    ][0]
  },
  {
    ageBand: '3-5',
    title: { ar: 'خطوات نحو المدرسة', en: 'Growing Independence' },
    stageName: { ar: 'من 3 إلى 5 سنوات', en: '3 to under 5 years' },
    summary: {
      ar: 'أنشطة جماعية وتفكير منطقي واستقلالية في المهام اليومية تمهد لانتقال واثق إلى المدرسة.',
      en: 'Collaborative projects, reasoning games, and self-reliance habits building school readiness.'
    },
    developmentalFocus: {
      ar: 'الحوار والمشاركة، التفكير المنطقي والعد المحسوس، ومسك أدوات الكتابة بثقة.',
      en: 'Conversational turn-taking, concrete numeracy, and confident pencil/scissor grip coordination.'
    },
    standardCaregiverRatio: '1 : 8',
    recommendedSettlingDays: 5,
    learningInvitations: [
      { ar: 'صواني الأشكال الهندسية وألعاب التطابق', en: 'Geometric inset frames and matching puzzles' },
      { ar: 'حلقات الحكايات والتمثيل الدرامي التعبيري', en: 'Story circle comprehension and imaginative role play' },
      { ar: 'أنشطة الحياة العملية ورعاية النباتات', en: 'Practical life exercises, watering plants, and tidying' }
    ],
    keyQuestionsForTour: [
      [
        { ar: 'كيف يتم قياس وملاحظة تطور مهارات الطفل دون وضعه في اختبارات رسمية؟', en: 'How is developmental progression documented without formal testing stress?' },
        { ar: 'ما هي الأنشطة اليومية المخصصة لتطوير التفكير المنطقي والفضول العلمي؟', en: 'What daily invitations foster early scientific inquiry and problem-solving?' }
      ]
    ][0]
  }
];

export function BloomStageCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [selectedAgeBand, setSelectedAgeBand] = useState<'1-2' | '2-3' | '3-5'>('2-3');
  const [scheduleOption, setScheduleOption] = useState<string>('morning');
  const [transitionSpeed, setTransitionSpeed] = useState<string>('gradual');

  const activeStage =
    STAGE_PROFILES.find((s) => s.ageBand === selectedAgeBand) || STAGE_PROFILES[1];

  const estimatedDays =
    transitionSpeed === 'gradual'
      ? activeStage.recommendedSettlingDays
      : Math.max(3, Math.round(activeStage.recommendedSettlingDays * 0.7));

  return (
    <section
      data-sector-specific="bloom-stage-calibrator"
      className="py-20 sm:py-28 bg-[#145960] text-white relative overflow-hidden"
    >
      <div
        className="absolute -start-28 -top-28 w-96 h-96 rounded-full bg-[#F5C04E]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute end-0 bottom-0 w-80 h-80 rounded-full bg-[#A54F35]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[#F5C04E] text-xs font-black tracking-[.2em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#F5C04E]" />
            {ar ? 'معاير مراحل الطفولة المبكرة' : 'EARLY YEARS STAGE CALIBRATOR'}
          </p>
          <h2 className="bloom-display font-bold text-3xl sm:text-5xl mt-5 leading-tight text-white">
            {ar ? (
              <>
                لكل مرحلة إيقاعها. <span className="text-[#F5C04E]">واحتياجاتها الفريدة.</span>
              </>
            ) : (
              <>
                Every Stage Has Its Rhythm. <span className="text-[#F5C04E]">Tailored Discovery.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#E6F3F1] text-sm sm:text-base leading-8">
            {ar
              ? 'اختر الفئة العمرية لطفلك وتعرف على نسب الإشراف المقترحة، خطة الانتقال التدريجي، ومحاور الاستكشاف اليومية لمساعدتك في طرح الأسئلة المناسبة عند زيارة أي حضانة.'
              : 'Select your child’s age bracket to understand recommended educator ratios, settling-in trajectories, and daily sensory invitations before visiting a nursery.'}
          </p>
        </div>

        {/* 3 Age Band Selector Pills */}
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {STAGE_PROFILES.map((stage) => {
            const active = stage.ageBand === selectedAgeBand;
            return (
              <button
                key={stage.ageBand}
                type="button"
                onClick={() => setSelectedAgeBand(stage.ageBand)}
                className={`p-6 text-start rounded-[2rem] transition-all border-2 ${
                  active
                    ? 'bg-[#1C6C75] border-[#F5C04E] shadow-[0_12px_30px_rgba(245,192,78,0.2)]'
                    : 'bg-[#114D53]/70 border-[#22676E] hover:bg-[#165E66] hover:border-[#F5C04E]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="bloom-display text-3xl font-black text-[#F5C04E]">
                    {stage.ageBand}
                  </span>
                  <span className="text-[11px] font-bold text-[#E6F3F1] bg-[#114D53] px-3 py-1 rounded-full">
                    {stage.stageName[locale]}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mt-4 leading-snug">
                  {stage.title[locale]}
                </h3>
                <p className="text-xs text-[#CCE5E2] mt-2 line-clamp-2 leading-relaxed">
                  {stage.summary[locale]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Calibrator Console */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8">
          {/* Controls & Focus Area */}
          <div className="bg-[#1C6C75] border border-[#2B7A83] p-6 sm:p-8 rounded-[2rem] space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2B7A83]">
              <Sliders size={20} className="text-[#F5C04E]" />
              <h4 className="font-bold text-lg text-white">
                {ar ? 'المعايير التشغيلية والروتين' : 'Daily Routine & Transition Parameters'}
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="calibrator-schedule"
                  className="block text-xs font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {ar ? 'نظام الحضور اليومي' : 'Daily Attendance Window'}
                </label>
                <select
                  id="calibrator-schedule"
                  aria-label={ar ? 'نظام الحضور اليومي' : 'Daily Attendance Window'}
                  value={scheduleOption}
                  onChange={(e) => setScheduleOption(e.target.value)}
                  className="w-full bg-[#114D53] border border-[#31858F] text-white p-3.5 text-sm rounded-xl focus-visible:outline-2 focus-visible:outline-[#F5C04E]"
                >
                  <option value="morning">{ar ? 'فترة صباحية (٨:٠٠ ص – ١:٠٠ م)' : 'Morning Half-Day (8:00 AM – 1:00 PM)'}</option>
                  <option value="full-day">{ar ? 'يوم كامل (٨:٠٠ ص – ٤:٠٠ م)' : 'Full-Day Rhythm (8:00 AM – 4:00 PM)'}</option>
                  <option value="extended">{ar ? 'دوام ممتد مسائي (حتى ٥:٣٠ م)' : 'Extended Afternoon Care (until 5:30 PM)'}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calibrator-transition"
                  className="block text-xs font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {ar ? 'نمط التهيئة والتأقلم' : 'Settling-in Trajectory'}
                </label>
                <select
                  id="calibrator-transition"
                  aria-label={ar ? 'نمط التهيئة والتأقلم' : 'Settling-in Trajectory'}
                  value={transitionSpeed}
                  onChange={(e) => setTransitionSpeed(e.target.value)}
                  className="w-full bg-[#114D53] border border-[#31858F] text-white p-3.5 text-sm rounded-xl focus-visible:outline-2 focus-visible:outline-[#F5C04E]"
                >
                  <option value="gradual">{ar ? 'تهيئة تدريجية هادئة (حضور مرافق)' : 'Gentle Gradual Separation (Parent Co-presence)'}</option>
                  <option value="standard">{ar ? 'تأقلم قياسي منظم (٣-٥ أيام)' : 'Standard Guided Orientation (3–5 days)'}</option>
                </select>
              </div>
            </div>

            {/* Core Developmental Focus */}
            <div className="bg-[#114D53] p-5 rounded-2xl border border-[#276F77]">
              <p className="text-xs uppercase font-mono tracking-widest text-[#F5C04E] font-bold">
                {ar ? 'المحور التنموي الأساسي لهذه المرحلة' : 'PRIMARY DEVELOPMENTAL FOCUS'}
              </p>
              <p className="mt-2 text-sm text-[#E6F3F1] leading-relaxed">
                {activeStage.developmentalFocus[locale]}
              </p>
            </div>

            {/* Key Learning Invitations */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                {ar ? 'خامات وأنشطة الاستكشاف المقترحة' : 'Sensory & Practical Invitations'}
              </p>
              <ul className="space-y-2.5">
                {activeStage.learningInvitations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#E6F3F1]">
                    <CheckCircle2 size={16} className="text-[#F5C04E] shrink-0 mt-0.5" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projections & Tour Questions Checklist */}
          <div className="bg-[#175C64] border border-[#2B7A83] p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2B7A83]">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5C04E] font-bold block">
                    {ar ? 'المؤشرات الإرشادية للحضانة' : 'EARLY YEARS BENCHMARKS'}
                  </span>
                  <h4 className="font-bold text-xl text-white mt-1">
                    {activeStage.title[locale]}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#114D53] border border-[#31858F] flex items-center justify-center text-[#F5C04E]">
                  <Baby size={22} />
                </div>
              </div>

              {/* Ratios & Days Stats */}
              <div className="my-6 grid grid-cols-2 gap-4">
                <div className="bg-[#114D53] p-5 rounded-2xl border border-[#276F77] text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#CCE5E2]">
                    {ar ? 'نسبة الإشراف الموصى بها' : 'Educator Ratio'}
                  </p>
                  <p className="text-3xl font-black text-[#F5C04E] mt-2 font-mono">
                    {activeStage.standardCaregiverRatio}
                  </p>
                  <p className="text-[11px] text-[#A2C7C4] mt-1">
                    {ar ? 'مقدم رعاية : أطفال' : 'Educator : Children'}
                  </p>
                </div>
                <div className="bg-[#114D53] p-5 rounded-2xl border border-[#276F77] text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#CCE5E2]">
                    {ar ? 'مدة التأقلم المقترحة' : 'Settling Period'}
                  </p>
                  <p className="text-3xl font-black text-[#F5C04E] mt-2 font-mono">
                    {estimatedDays}{' '}
                    <span className="text-sm font-normal text-white">{ar ? 'أيام' : 'days'}</span>
                  </p>
                  <p className="text-[11px] text-[#A2C7C4] mt-1">
                    {ar ? 'تدرج مريح للطفل' : 'Gradual transition'}
                  </p>
                </div>
              </div>

              {/* Essential Tour Questions Checklist */}
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  {ar ? 'أسئلة مهمة اطرحها عند الزيارة' : 'Questions to Ask on Your Tour'}
                </p>
                <div className="space-y-3">
                  {activeStage.keyQuestionsForTour.map((q, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-[#114D53] border border-[#246A72] rounded-xl flex items-start gap-3 text-xs text-[#E6F3F1] leading-relaxed"
                    >
                      <Sparkles size={16} className="text-[#F5C04E] shrink-0 mt-0.5" />
                      <span>{q[locale]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA and Disclaimer */}
            <div className="mt-8 pt-6 border-t border-[#2B7A83]">
              <Link
                href={bloomPath(locale, 'admissions')}
                className="w-full py-4 px-6 bg-[#F5C04E] text-[#0D383D] font-black text-sm rounded-full inline-flex items-center justify-center gap-3 hover:bg-[#F7CE72] transition-colors"
              >
                <span>{ar ? 'ابدأ طلب استفسار الزيارة' : 'Inquire About a Visit Tour'}</span>
                <Arrow size={18} />
              </Link>

              {/* Strict Non-Binding Childcare Disclaimer */}
              <div className="mt-4 flex items-start gap-2 text-xs text-[#CCE5E2] leading-relaxed">
                <AlertCircle size={15} className="text-[#F5C04E] shrink-0 mt-0.5" />
                <span>
                  {ar
                    ? 'أداة توضيحية لاستكشاف مراحل الطفولة المبكرة فقط؛ BloomSteps نموذج موقع رقمي من مافكس ولا تدير حضانة فعلية أو تؤكد تسجيلًا.'
                    : 'Illustrative early years exploratory planning only; BloomSteps is a Mavvix website concept and does not operate a physical nursery, provide childcare, or confirm enrolment.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
