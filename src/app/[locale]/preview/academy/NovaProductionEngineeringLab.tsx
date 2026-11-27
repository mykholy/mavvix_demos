'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Terminal, ShieldAlert, Cpu, GitPullRequest, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { novaLearningPhotos, NovaLearningPhoto } from './media';

interface PedagogicalPillar {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageId: NovaLearningPhoto['id'];
  icon: 'terminal' | 'cpu' | 'alert' | 'pr';
  thesisEn: string;
  thesisAr: string;
  standardsEn: string[];
  standardsAr: string[];
  operationalMetricEn: string;
  operationalMetricAr: string;
}

const PILLARS: PedagogicalPillar[] = [
  {
    id: 'sandboxes',
    nameEn: 'Hermetic Dev Containers & Reproducible Labs',
    nameAr: 'بيئات التطوير المعزولة والمختبرات النمطية',
    subtitleEn: 'Zero configuration drift, isolated Nix devboxes, and standardized production Linux runtimes',
    subtitleAr: 'بيئات برمجية متطابقة ١٠٠٪ دون تباين في الإعدادات، تعتمد على الحاويات المعزولة ونظام لينكس الموحد',
    imageId: 'coding_lab',
    icon: 'terminal',
    thesisEn: 'Software engineers lose valuable hours wrestling with environment mismatches. At Nova Learning, every single student repository boots inside a hermetically pinned container environment with exact GCC/LLVM, Node, Python, and SQLite versions pre-configured, mirroring real cloud CI workers.',
    thesisAr: 'يضيع المهندسون ساعات ثمينة في حل مشاكل تباين بيئات التشغيل. في أكاديمية نوفا، يعمل كل طالب في بيئة حاويات معزولة ومثبتة تمامًا تحاكي خوادم الإنتاج السحابية بمكتباتها وأدواتها دون أي عناء في التثبيت المحلي.',
    standardsEn: [
      'Reproducible Docker/OCI images with deterministic lockfiles',
      'Integrated web terminal & VS Code remote development containers',
      'Pre-seeded production datasets with millions of anonymized records',
      'Sub-second boot times with persistent scratch volumes'
    ],
    standardsAr: [
      'حاويات OCI قياسية مع ملفات إقفال حتمية للإصدارات',
      'سطر أوامر سحابي متكامل وبيئة تطوير ريموت متوافقة مع VS Code',
      'بيانات اختبار حقيقية تضم ملايين السجلات المجهولة المصدر',
      'إقلاع فوري للمختبر البرمجي مع أقراص تخزين دائمة'
    ],
    operationalMetricEn: '100% reproducible builds across macOS, Linux, and Windows hosts.',
    operationalMetricAr: 'تطابق برمجي تام بنسبة ١٠٠٪ عبر أنظمة التشغيل المختلفة.'
  },
  {
    id: 'tdd_graders',
    nameEn: 'Deterministic CI Grading & Edge-Case Test Suites',
    nameAr: 'التقييم الآلي المعتمد على الاختبارات وحالات الحافة',
    subtitleEn: 'Automated test runners, memory leak checkers, concurrency race detectors, and fuzz testing',
    subtitleAr: 'فاحصات برمجية مؤتمتة، كشف تسريب الذاكرة، فحص تضارب التزامن واختبارات الضغط العشوائية',
    imageId: 'data_cluster',
    icon: 'cpu',
    thesisEn: 'Subjective human grading creates ambiguity. Our automated grading engines evaluate every student pull request against hidden adversarial test suites, stress testing for OOM killer limits, race conditions, and SQL injection flaws before code merges into the mainline branch.',
    thesisAr: 'التقييم البشري اليدوي قد تنقصه الدقة والموضوعية. لذلك تمر كل مهمة برمجية بمحرك تقييم آلي متقدم يختبر الكود تحت ضغط حقيقي، ويفحص تسرب الذاكرة، والثغرات الأمنية، وحدود الأداء قبل قبول المشروع.',
    standardsEn: [
      'Valgrind and AddressSanitizer memory safety checks',
      'ThreadSanitizer concurrency race condition detection',
      'Fuzz testing with random boundary inputs and network partitions',
      'Sub-60s deterministic test feedback directly in Git PR comments'
    ],
    standardsAr: [
      'فحوصات سلامة الذاكرة عبر أدوات Valgrind المتقدمة',
      'رصد اختناقات التزامن وتضارب الخيوط البرمجية المتوازية',
      'اختبارات الضغط بحزم مدخلات عشوائية ومحاكاة انقطاع الشبكة',
      'تقييم فوري يظهر في تعليقات مستودع Git خلال أقل من ٦٠ ثانية'
    ],
    operationalMetricEn: 'Deterministic 0-100% grading precision with line-by-line test assertions.',
    operationalMetricAr: 'دقة تقييم حتمية بالأرقام مع تفصيل دقيق لكل اختبار نجح أو أخفق.'
  },
  {
    id: 'postmortems',
    nameEn: 'Real Incident Postmortems & System Failure Dissections',
    nameAr: 'تشريح الأعطال الحقيقية وتحليل أسباب الحوادث',
    subtitleEn: 'Dissecting real-world database deadlocks, cascading outages, and architectural bottlenecks',
    subtitleAr: 'دراسة حية لأعطال قواعد البيانات الحقيقية، انهيارات الخوادم المتتالية، واختناقات المعمارية',
    imageId: 'robotics_lab',
    icon: 'alert',
    thesisEn: 'Senior engineers are forged in the fires of live production outages. Students reconstruct real historical failures—such as cascading cache stampedes, BGP routing blackholes, and connection pool exhaustion—and write comprehensive corrective mitigation playbooks.',
    thesisAr: 'تُبنى الخبرة الهندسية الحقيقية أثناء مواجهة الأعطال الكبرى. في هذا الركن، يعيد الطلاب بناء حوادث تقنية شهيرة من واقع كبرى شركات التكنولوجيا، مثل انهيار التخزين المؤقت ونفاد موارد الاتصال، وتصميم حلول تمنع تكرارها.',
    standardsEn: [
      'Structured 5-Whys root cause analysis methodology',
      'Timeline reconstruction using production log aggregation',
      'Circuit-breaker and exponential backoff mitigation implementations',
      'Formal blameless postmortem documentation authored in dual scripts'
    ],
    standardsAr: [
      'منهجية الأسباب الخمسة (5-Whys) لتحديد الجذر الحقيقي للخلل',
      'إعادة بناء الجدول الزمني للحادث من سجلات التشغيل الحية',
      'برمجة قواطع الدوائر (Circuit Breakers) وإعادة المحاولة التراجعية',
      'توثيق هندسي رسمي ومحايد للحادث بالعربية والإنجليزية'
    ],
    operationalMetricEn: '12 production postmortem scenarios derived from live engineering operations.',
    operationalMetricAr: '١٢ سيناريو واقعي موثق مستوحى من كبرى حوادث البنية التحتية العالمية.'
  },
  {
    id: 'staff_reviews',
    nameEn: 'Staff-Level RFC Reviews & Architecture Mentorship',
    nameAr: 'مراجعات التصميم المعماري على مستوى كبار المهندسين',
    subtitleEn: 'Written design document RFCs, trade-off justifications, and rigorous line-by-line critique',
    subtitleAr: 'مستندات التصميم المعماري المكتوبة، مبررات الاختيار التقني، ومراجعات الكود سطرًا بسطر',
    imageId: 'design_studio',
    icon: 'pr',
    thesisEn: 'Code without architecture is technical debt. Before writing complex systems, students draft formal Request for Comments (RFC) engineering proposals, weighing latency vs. consistency,CAP trade-offs, and operational maintenance overhead under the critique of veteran tech leads.',
    thesisAr: 'كتابة الكود دون رؤية معمارية تولّد ديونًا تقنية مرهقة. قبل البدء في بناء الأنظمة المعقدة، يقدم الطالب وثيقة تصميم هندسي رسمية (RFC) توضح مبررات الخيارات التقنية وتدرس التكلفة والأداء تحت إشراف نخبة من كبار المهندسين.',
    standardsEn: [
      'Formal RFC template covering security, scalability, and failover',
      'Line-by-line GitHub pull request code critiques within 48 hours',
      'Dual-script Arabic/English architectural terminology rigor',
      'Live architecture defense panel presentations per curriculum track'
    ],
    standardsAr: [
      'نموذج هندسي موحد يغطي الأمان، التوسع، والتعافي من الكوارث',
      'مراجعات تفصيلية عبر Pull Requests خلال ٤٨ ساعة كحد أقصى',
      'دقة في استخدام المصطلحات التقنية بالعربية والإنجليزية',
      'جلسات مناقشة دفاعية للمشروع النهائي أمام لجنة هندسية متخصصة'
    ],
    operationalMetricEn: 'Average 18 actionable review comments per major milestone submission.',
    operationalMetricAr: 'متوسط ١٨ ملاحظة توجيهية متعمقة لكل مشروع برمجي رئيسي.'
  }
];

export function NovaProductionEngineeringLab({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [activePillarId, setActivePillarId] = useState<string>('sandboxes');

  const pillar = PILLARS.find(p => p.id === activePillarId) || PILLARS[0];
  const photo = novaLearningPhotos.find(p => p.id === pillar.imageId) || novaLearningPhotos[0];

  return (
    <section className="bg-[#F5F7FF] rounded-[2rem] border border-[#192A48]/15 p-6 sm:p-10 lg:p-12 space-y-8" aria-labelledby="engineering-lab-heading">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#192A48]/10 pb-6">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-[#B74132] font-bold">
            {isAr ? 'المنهجية الأكاديمية وضوابط الجودة' : 'Pedagogical Standards & Engineering Rigor'}
          </span>
          <h2 id="engineering-lab-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#192A48]">
            {isAr ? 'أربعة أركان تصنع الفارق في تكوين المهندس' : 'Four Pillars of Production Engineering Mastery'}
          </h2>
        </div>
        <Link
          href={`/${locale}/preview/academy/courses`}
          className="font-mono text-xs font-semibold text-[#192A48] hover:text-[#B74132] inline-flex items-center gap-1.5"
        >
          <span>{isAr ? 'استعراض كافة المناهج' : 'Browse All Courses'}</span>
          <Arrow className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#E9EDFA] p-1.5 rounded-2xl border border-[#192A48]/10">
        {PILLARS.map(p => {
          const active = p.id === activePillarId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePillarId(p.id)}
              className={`p-3 rounded-xl font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                active
                  ? 'bg-[#192A48] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#192A48] hover:bg-white/60'
              }`}
              aria-label={isAr ? p.nameAr : p.nameEn}
            >
              {p.icon === 'terminal' && <Terminal className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#D9D5A2]' : 'text-[#B74132]'}`} />}
              {p.icon === 'cpu' && <Cpu className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#D9D5A2]' : 'text-[#B74132]'}`} />}
              {p.icon === 'alert' && <ShieldAlert className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#D9D5A2]' : 'text-[#B74132]'}`} />}
              {p.icon === 'pr' && <GitPullRequest className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#D9D5A2]' : 'text-[#B74132]'}`} />}
              <span className="truncate">{isAr ? p.nameAr : p.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Card */}
      <div className="bg-white rounded-3xl border border-[#192A48]/15 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
        {/* Left: Thesis & Standards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#B74132] uppercase tracking-wider font-bold block">
              {isAr ? 'الركيزة التطبيقية' : 'Engineering Principle'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#192A48]">
              {isAr ? pillar.nameAr : pillar.nameEn}
            </h3>
            <p className="font-mono text-xs text-[#192A48] font-medium">
              {isAr ? pillar.subtitleAr : pillar.subtitleEn}
            </p>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-sans">
            {isAr ? pillar.thesisAr : pillar.thesisEn}
          </p>

          <div className="p-4 rounded-2xl bg-[#F5F7FF] border border-[#192A48]/10 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#192A48] block">
              {isAr ? 'معايير التنفيذ والتحقق المعملي:' : 'Laboratory Execution & Verification Standards:'}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
              {(isAr ? pillar.standardsAr : pillar.standardsEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B74132] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/preview/academy/learn/course-01/lesson-01-01`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#192A48] hover:bg-[#121D33] text-white text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <span>{isAr ? 'اختبر هذا المعيار في درس مجاني' : 'Experience this standard in a live lesson'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D9D5A2]" />
            </Link>
            <div className="font-mono text-xs text-slate-700 font-semibold">
              {isAr ? pillar.operationalMetricAr : pillar.operationalMetricEn}
            </div>
          </div>
        </div>

        {/* Right: Curated Photo Showcase */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#192A48]/15 bg-[#F5F7FF] shadow-inner group">
            <Image
              src={photo.url}
              alt={isAr ? photo.titleAr : photo.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-white font-mono text-[11px] flex justify-between items-end">
              <span className="truncate max-w-[80%]">{isAr ? photo.titleAr : photo.titleEn}</span>
              <span className="text-[#D9D5A2] font-bold uppercase">{photo.category}</span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-slate-700 text-center font-medium">
            {photo.author} · {photo.license} ({photo.width}×{photo.height}px)
          </p>
        </div>
      </div>
    </section>
  );
}
