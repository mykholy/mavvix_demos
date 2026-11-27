'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { BookOpen, Clock, Calendar, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Sparkles, ShieldCheck, Terminal, Award, Laptop } from 'lucide-react';

interface TrackPathway {
  id: string;
  nameEn: string;
  nameAr: string;
  badgeEn: string;
  badgeAr: string;
  summaryEn: string;
  summaryAr: string;
  tuitionEgp: number;
  totalLabHours: number;
  coreModules: {
    titleEn: string;
    titleAr: string;
    deliverableEn: string;
    deliverableAr: string;
  }[];
  prerequisitesEn: string[];
  prerequisitesAr: string[];
}

const PATHWAYS: TrackPathway[] = [
  {
    id: 'fullstack-systems',
    nameEn: 'Full-Stack Systems & Distributed Architectures',
    nameAr: 'هندسة النظم المتكاملة والأنظمة الموزعة',
    badgeEn: 'Core Engineering Track',
    badgeAr: 'مسار الهندسة الأساسي',
    summaryEn: 'Deep-dive into high-concurrency Node.js, Next.js, transactional SQLite/PostgreSQL engines, Redis caching topology, and event-driven worker architectures.',
    summaryAr: 'دراسة تطبيقية متعمقة في بناء خدمات الويب عالية التزامن، قواعد البيانات المعاملاتية، طبقات التخزين المؤقت، ومعمارية الخوادم الموزعة.',
    tuitionEgp: 24500,
    totalLabHours: 180,
    coreModules: [
      {
        titleEn: 'Transactional Storage Engines & WAL Primitives',
        titleAr: 'محركات التخزين المعاملاتي وأساسيات سجل التعديلات',
        deliverableEn: 'Build an ACID-compliant key-value store with B-Tree indexes and recovery logs.',
        deliverableAr: 'بناء مخزن بيانات مفتاح-قيمة يحقق معايير ACID مع فهارس شجرية وسجلات استرداد.'
      },
      {
        titleEn: 'Distributed State Synchronization & Concurrency',
        titleAr: 'مزامنة الحالة الموزعة وإدارة التزامن الفائق',
        deliverableEn: 'Implement Raft consensus algorithm replica set with heartbeat failover.',
        deliverableAr: 'تنفيذ خوارزمية Raft لمزامنة السجلات الموزعة والتعافي التلقائي من انقطاع العقد.'
      },
      {
        titleEn: 'Production Telemetry, OpenTelemetry & Chaos Resiliency',
        titleAr: 'القياسات التشغيلية الحية وهندسة الصمود ضد الأعطال',
        deliverableEn: 'Deploy full distributed tracing pipeline with synthetic latency injection.',
        deliverableAr: 'إطلاق خط تتبع موزّع كامل مع حقن تجريبي لأزمنة التأخير واختبار التحمل.'
      }
    ],
    prerequisitesEn: ['Proficiency in TypeScript or Python', 'Basic data structures (arrays, hash maps, trees)', 'Linux shell fundamentals'],
    prerequisitesAr: ['إجادة أساسية لـ TypeScript أو Python', 'معرفة هياكل البيانات الأساسية', 'أساسيات التعامل مع سطر أوامر Linux']
  },
  {
    id: 'data-mlops',
    nameEn: 'Data Infrastructure & Production MLOps',
    nameAr: 'البنية التحتية للبيانات وتشغيل نماذج الذكاء الاصطناعي',
    badgeEn: 'Data & AI Systems Track',
    badgeAr: 'مسار نظم البيانات والذكاء الاصطناعي',
    summaryEn: 'Architect petabyte-scale batch/streaming pipelines with DuckDB, Apache Arrow, automated feature stores, and low-latency LLM serving runtimes.',
    summaryAr: 'تصميم خطوط معالجة البيانات الضخمة المتدفقة والدفعية، مخازن الخصائص المؤتمتة، وبيئات تشغيل نماذج الذكاء الاصطناعي منخفضة التأخير.',
    tuitionEgp: 28000,
    totalLabHours: 210,
    coreModules: [
      {
        titleEn: 'Columnar Data Encodings & Vectorized Processing',
        titleAr: 'تنسيقات البيانات العمودية والمعالجة الموجهة (SIMD)',
        deliverableEn: 'Construct a streaming Parquet query optimizer using memory-mapped buffers.',
        deliverableAr: 'برمجة محرك استعلامات لملفات Parquet يعتمد على الذاكرة المشتركة المباشرة.'
      },
      {
        titleEn: 'Model Quantization, GPU Tensor Runtimes & Serving',
        titleAr: 'تكميم النماذج وتسريع معالجات الرسوميات وحزم الاستجابة',
        deliverableEn: 'Deploy AWQ/FP8 quantized inference gateway with continuous batching.',
        deliverableAr: 'إطلاق بوابة استنتاج للنماذج مكممة مع التجميع التلقائي للطلبات المتزامنة.'
      },
      {
        titleEn: 'Feature Store Federation & Drift Monitoring',
        titleAr: 'مخازن الخصائص الموحدة ومراقبة انحراف البيانات',
        deliverableEn: 'Implement KS-statistic data drift alerts with automated model retraining triggers.',
        deliverableAr: 'برمجة مراقب احصائي لانحراف البيانات مع إطلاق إعادة تدريب النماذج تلقائيًا.'
      }
    ],
    prerequisitesEn: ['Python fluency', 'Relational algebra & advanced SQL', 'Linear algebra & statistics basics'],
    prerequisitesAr: ['إتقان بايثون ولغة SQL المتقدمة', 'أساسيات الجبر الخطي والإحصاء الرياضي', 'معرفة مفاهيم الحوسبة المتوازية']
  },
  {
    id: 'design-systems',
    nameEn: 'Product Architecture & Dual-Script Design Systems',
    nameAr: 'معمارية المنتجات وأنظمة التصميم ثنائية اللغة',
    badgeEn: 'Product & Design Systems Track',
    badgeAr: 'مسار أنظمة التصميم وتجربة المستخدم',
    summaryEn: 'Master semantic design token architecture, dual-script Arabic/English typographic balance, accessible WCAG AAA component tokens, and headless UI engines.',
    summaryAr: 'إتقان هندسة رموز التصميم الدلالية، المواءمة الطباعية الدقيقة بين العربية والإنجليزية، وتطوير مكتبات المكونات غير المقيدة بواجهة.',
    tuitionEgp: 21500,
    totalLabHours: 150,
    coreModules: [
      {
        titleEn: 'Dual-Script Typographic Grids & Optical Baseline Harmony',
        titleAr: 'الشبكات الطباعية ثنائية اللغة والتوافق البصري',
        deliverableEn: 'Architect an enterprise design token schema supporting complex RTL layout shifts.',
        deliverableAr: 'بناء منظومة رموز تصميم للمؤسسات تدعم التبديل السلس للاتجاهات وتفاوت الكتل.'
      },
      {
        titleEn: 'Accessible State Machines & WCAG AA/AAA Automated Testing',
        titleAr: 'آلات الحالة التفاعلية وفحوصات إمكانية الوصول التلقائية',
        deliverableEn: 'Write zero-dependency accessible combobox and date-picker primitives with full keyboard focus.',
        deliverableAr: 'تطوير مكونات تفاعلية مستقلة تدعم التنقل الكامل بلوحة المفاتيح وقارئات الشاشة.'
      },
      {
        titleEn: 'Component Token Sync: Figma REST API to Production Git',
        titleAr: 'مزامنة الرموز: من واجهة Figma إلى مستودعات الكود البرمجي',
        deliverableEn: 'Build automated CLI pipeline that transforms design variables into typed CSS/TS modules.',
        deliverableAr: 'تطوير أداة سطر أوامر تحول متغيرات التصميم تلقائيًا إلى كود برمجي نمطي ومختبر.'
      }
    ],
    prerequisitesEn: ['Experience with Figma variables', 'Modern HTML/CSS fundamentals', 'Basic JavaScript/TypeScript component syntax'],
    prerequisitesAr: ['خبرة سابقة في استخدام أدوات فيجما ومتغيراتها', 'معرفة جيدة بلغات HTML و CSS الحديثة', 'أساسيات مكونات React/TypeScript']
  }
];

export function NovaCurriculumCalibrator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activePathwayId, setActivePathwayId] = useState<string>('fullstack-systems');
  const [weeklyCommitment, setWeeklyCommitment] = useState<number>(20); // 10, 20, 35 hrs/wk

  const pathway = PATHWAYS.find(p => p.id === activePathwayId) || PATHWAYS[0];

  // Calculate duration in weeks based on commitment
  const totalWeeks = Math.ceil(pathway.totalLabHours / weeklyCommitment);
  const monthlyTuition = Math.round(pathway.tuitionEgp / Math.max(1, Math.ceil(totalWeeks / 4)));

  return (
    <section className="bg-white rounded-[2rem] border border-[#192A48]/15 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8" aria-labelledby="curriculum-calibrator-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#192A48]/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B74132] font-bold">
            <Terminal className="w-4 h-4 text-[#B74132]" />
            <span>{isAr ? 'مخطط المسارات الأكاديمية والجدول الزمني' : 'Interactive Curriculum & Commitment Calibrator'}</span>
          </div>
          <h2 id="curriculum-calibrator-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#192A48]">
            {isAr ? 'حدد مسارك الهندسي واستكشف الجهد والتكلفة' : 'Calibrate Your Engineering Specialization'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl font-sans leading-relaxed">
            {isAr
              ? 'اختر التخصص البرمجي وحدد عدد الساعات الأسبوعية المتاحة لديك لحساب مدة الدراسة، المشاريع المعملية المعتمدة، وخطة الأقساط الشفافة بالجنيه المصري.'
              : 'Select your target technical discipline and customize weekly study hours to calculate real-world completion horizons, lab milestones, and transparent monthly investment schedules.'}
          </p>
        </div>

        {/* Weekly Hours Selector */}
        <div className="flex items-center gap-2 bg-[#F5F7FF] p-1.5 rounded-2xl border border-[#192A48]/15 font-mono text-xs">
          <span className="px-3 text-[#192A48] font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B74132]" />
            <span>{isAr ? 'الالتزام:' : 'Commitment:'}</span>
          </span>
          {[
            { hours: 10, labelEn: '10h Part-Time', labelAr: '١٠ ساعات جزئي' },
            { hours: 20, labelEn: '20h Hybrid', labelAr: '٢٠ ساعة مكثف' },
            { hours: 35, labelEn: '35h Immersive', labelAr: '٣٥ ساعة تفرغ' }
          ].map(opt => (
            <button
              key={opt.hours}
              type="button"
              onClick={() => setWeeklyCommitment(opt.hours)}
              className={`px-3 py-2 rounded-xl font-bold transition-all text-xs ${
                weeklyCommitment === opt.hours
                  ? 'bg-[#192A48] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#192A48] hover:bg-white'
              }`}
              aria-label={isAr ? opt.labelAr : opt.labelEn}
            >
              {isAr ? opt.labelAr : opt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Pathway Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PATHWAYS.map(p => {
          const selected = p.id === activePathwayId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePathwayId(p.id)}
              className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between space-y-3 ${
                selected
                  ? 'bg-[#F5F7FF] border-[#192A48] ring-2 ring-[#192A48]/20 shadow-sm'
                  : 'bg-white border-[#192A48]/10 hover:border-[#5F67B5]/40 hover:bg-[#F5F7FF]/50'
              }`}
              aria-label={isAr ? p.nameAr : p.nameEn}
            >
              <div className="space-y-1.5">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                  selected ? 'text-[#B74132]' : 'text-slate-700'
                }`}>
                  {isAr ? p.badgeAr : p.badgeEn}
                </span>
                <h3 className="font-serif text-base font-bold text-[#192A48] leading-snug">
                  {isAr ? p.nameAr : p.nameEn}
                </h3>
              </div>
              <div className="pt-2 border-t border-[#192A48]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700">{p.totalLabHours} {isAr ? 'ساعة معملية' : 'Lab Hours'}</span>
                <span className="font-bold text-[#192A48]">{p.tuitionEgp.toLocaleString()} EGP</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Calibrated Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Modules & Syllabus Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B74132] font-bold block">
              {isAr ? 'المحتوى الأكاديمي والمشاريع التطبيقية' : 'Curriculum Architecture & Lab Deliverables'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#192A48]">
              {isAr ? pathway.nameAr : pathway.nameEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isAr ? pathway.summaryAr : pathway.summaryEn}
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#192A48] block uppercase tracking-wider">
              {isAr ? 'المشاريع البرمجية التي ستبنيها وتخضع للمراجعة:' : 'Production Lab Deliverables Under Staff Review:'}
            </span>
            <div className="space-y-3">
              {pathway.coreModules.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F5F7FF] border border-[#192A48]/10 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#192A48] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#192A48]">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 ps-7 leading-relaxed font-sans">
                    {isAr ? mod.deliverableAr : mod.deliverableEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="p-4 rounded-xl bg-white border border-[#192A48]/15 space-y-2">
            <span className="font-mono text-xs font-bold text-[#192A48] block uppercase tracking-wider">
              {isAr ? 'المتطلبات المعرفية المسبقة للالتحاق:' : 'Admissions Technical Prerequisites:'}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
              {(isAr ? pathway.prerequisitesAr : pathway.prerequisitesEn).map((prereq, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B74132] shrink-0 mt-0.5" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Calculated Commitment & Tuition Blueprint */}
        <div className="lg:col-span-5 bg-[#121D33] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-[#192A48]">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-[#D9D5A2]">
            <span className="uppercase tracking-widest font-bold">
              {isAr ? 'خطة الجهد والاستثمار' : 'Commitment & Investment Blueprint'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold">
              {weeklyCommitment} {isAr ? 'ساعات/أسبوع' : 'hrs/wk'}
            </span>
          </div>

          {/* Timeline Metrics */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-300 block">{isAr ? 'المدة التقديرية:' : 'Duration Horizon:'}</span>
              <span className="font-serif text-2xl font-bold text-white">{totalWeeks}</span>
              <span className="text-xs text-[#D9D5A2] ms-1">{isAr ? 'أسبوعًا' : 'Weeks'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-300 block">{isAr ? 'إجمالي المعامل:' : 'Total Lab Labs:'}</span>
              <span className="font-serif text-2xl font-bold text-white">{pathway.totalLabHours}</span>
              <span className="text-xs text-[#D9D5A2] ms-1">{isAr ? 'ساعة' : 'Hours'}</span>
            </div>
          </div>

          {/* Tuition Calculation */}
          <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="flex justify-between text-slate-300">
              <span>{isAr ? 'رسوم البرنامج الشاملة:' : 'Full Program Tuition:'}</span>
              <span className="font-bold text-white text-sm">{pathway.tuitionEgp.toLocaleString()} EGP</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>{isAr ? 'القسط الشهري التقديري:' : 'Estimated Monthly Installment:'}</span>
              <span className="font-bold text-[#D9D5A2]">{monthlyTuition.toLocaleString()} EGP / {isAr ? 'شهر' : 'mo'}</span>
            </div>
            <div className="pt-2 border-t border-white/10 text-end">
              <span className="font-serif text-3xl font-bold text-[#D9D5A2]">
                {pathway.tuitionEgp.toLocaleString()}
              </span>
              <span className="text-xs text-white/80 ms-1 font-mono">EGP</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1">
              {isAr
                ? 'تشمل الرسوم بيئات السحابة المعملية، مراجعات الكود الفردية، والشهادة الرقمية المعتمدة بتشفير SHA-256.'
                : 'Includes hermetic cloud lab containers, senior engineer code reviews, and cryptographically verified digital certification.'}
            </p>
          </div>

          {/* CTA Actions */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href={`/${locale}/preview/academy/enrollment-interest?track=${pathway.id}&commitment=${weeklyCommitment}`}
              className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-[#B74132] hover:bg-[#8F3327] text-white font-mono text-xs font-bold transition-all shadow-md group"
              aria-label={isAr ? 'تقديم طلب التحاق مبدئي بهذا المسار' : 'Submit enrollment interest for this track'}
            >
              <span>{isAr ? 'تقديم طلب التحاق مبدئي بالمسار' : 'Submit Track Enrollment Interest'}</span>
              <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D9D5A2]" />
              <span>{isAr ? 'دعم خيارات التمويل الميسر والرعاية المؤسسية' : 'Corporate sponsorship & split payments supported'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
