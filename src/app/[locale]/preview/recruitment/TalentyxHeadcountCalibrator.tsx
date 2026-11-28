'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Layers,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { talentPath } from '@/lib/verticals/recruitment/data';

interface TalentyxHeadcountCalibratorProps {
  locale: string;
}

type SectorKey = 'technology' | 'finance' | 'operations' | 'commercial' | 'people';
type SeniorityTier = 'mid' | 'senior' | 'lead' | 'executive';
type EngagementModel = 'permanent' | 'contract' | 'executive' | 'rpo';

interface SectorConfig {
  labelAr: string;
  labelEn: string;
  icon: string;
  typicalRolesAr: string[];
  typicalRolesEn: string[];
  marketPaceAr: string;
  marketPaceEn: string;
}

const SECTORS: Record<SectorKey, SectorConfig> = {
  technology: {
    labelAr: 'التقنية والبرمجيات',
    labelEn: 'Technology & Engineering',
    icon: '💻',
    typicalRolesAr: ['مهندس برمجيات أول', 'قائد بنية سحابية', 'مدير منتج رقمي', 'أخصائي أمن سيبراني'],
    typicalRolesEn: ['Lead Software Engineer', 'Cloud Architect', 'Staff Product Manager', 'Cybersecurity Specialist'],
    marketPaceAr: 'طلب مرتفع وسوق كفاءات تنافسي إقليمياً',
    marketPaceEn: 'High demand with highly competitive regional talent pool'
  },
  finance: {
    labelAr: 'المالية والاستثمار',
    labelEn: 'Finance & Investment',
    icon: '📊',
    typicalRolesAr: ['مدير تدقيق مالي', 'محلل استثمار واندماج', 'مراقب مالي أول', 'أخصائي امتثال تنظيمي'],
    typicalRolesEn: ['Financial Controller', 'M&A Investment Analyst', 'Senior Risk Officer', 'Compliance Specialist'],
    marketPaceAr: 'متطلبات فحص دقيقة ومعايير تنظيمية مصرفية صارمة',
    marketPaceEn: 'Rigorous vetting requirements and strict regulatory standards'
  },
  operations: {
    labelAr: 'العمليات وسلاسل الإمداد',
    labelEn: 'Operations & Supply Chain',
    icon: '⚙️',
    typicalRolesAr: ['مدير لوجستيات وتوزيع', 'أخصائي مشتريات إقليمي', 'مدير عمليات مصنع', 'مخطط سلاسل توريد'],
    typicalRolesEn: ['Head of Regional Logistics', 'Senior Procurement Lead', 'Plant Operations Manager', 'Supply Chain Planner'],
    marketPaceAr: 'تركيز على الكفاءة التشغيلية والخبرة الميدانية المباشرة',
    marketPaceEn: 'Focus on operational velocity and direct on-the-ground experience'
  },
  commercial: {
    labelAr: 'المبيعات وتطوير الأعمال',
    labelEn: 'Commercial & Sales',
    icon: '📈',
    typicalRolesAr: ['مدير تطوير أعمال إقليمي', 'أخصائي مبيعات كبار العملاء', 'مدير تسويق أداء', 'قائد شراكات استراتيجية'],
    typicalRolesEn: ['Regional Business Development Director', 'Enterprise Account Executive', 'Growth Marketing Lead', 'Strategic Partnerships Head'],
    marketPaceAr: 'تقييم مستند للإنجازات البيعية الموثقة وسجلات النمو',
    marketPaceEn: 'Metric-driven evaluation based on verified revenue track records'
  },
  people: {
    labelAr: 'الموارد البشرية والمواهب',
    labelEn: 'People & Talent Acquisition',
    icon: '👥',
    typicalRolesAr: ['شريك أعمال موارد بشرية أول', 'مدير استقطاب الكفاءات', 'أخصائي مزايا وتعويضات', 'قائد التعلم المؤسسي'],
    typicalRolesEn: ['Senior HR Business Partner', 'Talent Acquisition Lead', 'Total Rewards Specialist', 'Organizational Development Lead'],
    marketPaceAr: 'مواءمة مع التشريعات العمالية الحديثة وممارسات الاستبقاء',
    marketPaceEn: 'Alignment with modern labor laws and strategic retention cultures'
  }
};

const SENIORITY_TIERS: Record<SeniorityTier, {
  labelAr: string;
  labelEn: string;
  yearsAr: string;
  yearsEn: string;
  weeksEstimate: number;
  stagesCount: number;
}> = {
  mid: {
    labelAr: 'مستوى متوسط',
    labelEn: 'Mid-Level Specialist',
    yearsAr: '2 - 5 سنوات خبرة',
    yearsEn: '2 - 5 yrs experience',
    weeksEstimate: 3,
    stagesCount: 3
  },
  senior: {
    labelAr: 'مستوى متقدم (أول)',
    labelEn: 'Senior Specialist',
    yearsAr: '5 - 9 سنوات خبرة',
    yearsEn: '5 - 9 yrs experience',
    weeksEstimate: 4,
    stagesCount: 4
  },
  lead: {
    labelAr: 'قائد فريق / خبير اختصاصي',
    labelEn: 'Lead / Staff Specialist',
    yearsAr: '8 - 12 سنة خبرة',
    yearsEn: '8 - 12 yrs experience',
    weeksEstimate: 6,
    stagesCount: 4
  },
  executive: {
    labelAr: 'قيادة تنفيذية / مجلس إدارة',
    labelEn: 'Executive / C-Suite',
    yearsAr: '12+ سنة خبرة قيادية',
    yearsEn: '12+ yrs executive leadership',
    weeksEstimate: 8,
    stagesCount: 5
  }
};

const ENGAGEMENT_MODELS: Record<EngagementModel, {
  labelAr: string;
  labelEn: string;
  descAr: string;
  descEn: string;
  bestForAr: string;
  bestForEn: string;
}> = {
  permanent: {
    labelAr: 'التوظيف الدائم الحصري',
    labelEn: 'Permanent Search',
    descAr: 'بحث وتعيين دائم للكوادر الأساسية مع فترات ضمان ومتابعة اندماج مؤسسي',
    descEn: 'Direct placement for core team members with guarantee periods and onboarding check-ins',
    bestForAr: 'الأدوار الحيوية طويلة الأجل وتوسعة الفرق الأساسية',
    bestForEn: 'Critical long-term roles and permanent organizational headcount'
  },
  contract: {
    labelAr: 'الإسناد والكوادر التعاقدية',
    labelEn: 'Contract & Interim Staffing',
    descAr: 'توفير كفاءات متخصصة لفترات محددة أو لإنجاز مشاريع استراتيجية محددة النطاق',
    descEn: 'Specialist deployment for fixed-term initiatives and accelerated deliverables',
    bestForAr: 'إطلاق المنتجات، التحولات السريعة، وسد الفجوات المؤقتة',
    bestForEn: 'Product sprints, urgent interim gaps, and seasonal surges'
  },
  executive: {
    labelAr: 'استقطاب القيادات التنفيذية',
    labelEn: 'Executive Retained Search',
    descAr: 'بحث سري ومنهجي لتعيين أعضاء مجالس الإدارة والمديرين التنفيذيين',
    descEn: 'Discreet, high-touch talent mapping for C-suite and board-level appointments',
    bestForAr: 'الرؤساء التنفيذيون، نواب الرئيس، والقيادات الإقليمية',
    bestForEn: 'C-suite officers, Managing Directors, and strategic Board Members'
  },
  rpo: {
    labelAr: 'تعهيد التوظيف المدمج (RPO)',
    labelEn: 'Embedded RPO Partnership',
    descAr: 'إدارة متكاملة لعمليات التوظيف للشركات التي تشهد توسعاً سريعاً بعدة أدوار',
    descEn: 'Scalable talent infrastructure managing end-to-end recruitment for high-growth phases',
    bestForAr: 'الشركات الناشئة في مراحل التمويل وجولات التوسع السريع (5+ وظائف)',
    bestForEn: 'High-velocity growth phases and multi-role scaleups (5+ concurrent hires)'
  }
};

export default function TalentyxHeadcountCalibrator({ locale }: TalentyxHeadcountCalibratorProps) {
  const isAr = locale === 'ar';
  const sliderId = useId();

  const [sector, setSector] = useState<SectorKey>('technology');
  const [seniority, setSeniority] = useState<SeniorityTier>('senior');
  const [headcount, setHeadcount] = useState<number>(3);
  const [model, setModel] = useState<EngagementModel>('permanent');

  const sectorInfo = SECTORS[sector];
  const seniorityInfo = SENIORITY_TIERS[seniority];
  const modelInfo = ENGAGEMENT_MODELS[model];

  // Dynamic calculations
  const totalWeeksEstimate = Math.max(3, seniorityInfo.weeksEstimate + (headcount > 5 ? 2 : 0) + (model === 'rpo' ? -1 : 0));
  const stagesCount = seniorityInfo.stagesCount;

  return (
    <section
      data-sector-specific="talent-calibrator"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#F8F9FC] to-[#EEF2FA] text-[#17243E] border-y border-[#D8DFED]"
      aria-label={isAr ? 'مُعاير خطط التوظيف واحتياجات الفرق' : 'Talent Planning & Headcount Calibrator'}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EEFF] border border-[#C6D4FF] text-[#3549A5] text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} className="text-[#3549A5]" />
            <span>{isAr ? 'أداة تخطيط الكوادر والمواءمة المؤسسية' : 'Interactive Talent Capacity Engine'}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-[#17243E] leading-[1.15]">
            {isAr ? (
              <>
                عاير خطة التوظيف <span className="text-[#3549A5]">واحتياجات فريقك.</span>
              </>
            ) : (
              <>
                Calibrate Your Headcount & <span className="text-[#3549A5]">Talent Strategy.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4E5D78] leading-relaxed">
            {isAr
              ? 'حدد القطاع التخصصي، مستوى الخبرة المطلوب، عدد الكوادر المستهدفة، ونموذج التعاقد لاستعراض الجدول الزمني التقديري، معايير الفرز الموضوعية، ومراحل التحقق البشري.'
              : 'Select your target industry domain, seniority depth, headcount requirement, and engagement structure to project estimated timelines, objective assessment stages, and sourcing protocols.'}
          </p>
        </div>

        {/* Interactive Calibrator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#D8DFED] shadow-sm">
            {/* 1. Sector Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3549A5] mb-3">
                {isAr ? '01 / القطاع التخصصي المستهدف' : '01 / Target Industry Domain'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(SECTORS) as SectorKey[]).map((key) => {
                  const s = SECTORS[key];
                  const active = sector === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSector(key)}
                      className={`p-3 rounded-xl text-left border text-sm font-bold transition-all flex items-center gap-2.5 ${
                        active
                          ? 'bg-[#17243E] text-white border-[#17243E] shadow-sm'
                          : 'bg-[#F8F9FC] text-[#4E5D78] border-[#E1E6F0] hover:border-[#3549A5] hover:bg-white'
                      }`}
                      aria-pressed={active}
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span className="truncate">{isAr ? s.labelAr : s.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Seniority Depth */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3549A5] mb-3">
                {isAr ? '02 / مستوى الخبرة والعمق الوظيفي' : '02 / Target Seniority Depth'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(Object.keys(SENIORITY_TIERS) as SeniorityTier[]).map((tier) => {
                  const t = SENIORITY_TIERS[tier];
                  const active = seniority === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSeniority(tier)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        active
                          ? 'bg-[#3549A5] text-white border-[#3549A5] shadow-sm'
                          : 'bg-[#F8F9FC] text-[#4E5D78] border-[#E1E6F0] hover:border-[#3549A5] hover:bg-white'
                      }`}
                      aria-pressed={active}
                    >
                      <div className="text-xs font-black truncate">{isAr ? t.labelAr : t.labelEn}</div>
                      <div className={`text-[11px] mt-1 font-medium ${active ? 'text-blue-100' : 'text-[#7D8DA6]'}`}>
                        {isAr ? t.yearsAr : t.yearsEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Headcount Volume Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={sliderId} className="text-xs font-bold uppercase tracking-widest text-[#3549A5]">
                  {isAr ? '03 / حجم التوظيف المستهدف' : '03 / Targeted Headcount Volume'}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#17243E]">{headcount}</span>
                  <span className="text-xs text-[#7D8DA6] font-semibold">
                    {isAr ? (headcount === 1 ? 'وظيفة' : 'وظائف') : (headcount === 1 ? 'hire' : 'hires')}
                  </span>
                </div>
              </div>
              <input
                id={sliderId}
                type="range"
                min={1}
                max={25}
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full h-2 bg-[#E1E6F0] rounded-lg appearance-none cursor-pointer accent-[#3549A5]"
                aria-label={isAr ? 'حجم التوظيف المستهدف' : 'Targeted Headcount Volume'}
              />
              <div className="flex justify-between text-[11px] font-mono text-[#7D8DA6] mt-2">
                <span>1 {isAr ? 'وظيفة مفردة' : 'Single Hire'}</span>
                <span>5 {isAr ? 'فريق مصغر' : 'Core Pod'}</span>
                <span>15 {isAr ? 'توسع واسع' : 'Team Scaling'}</span>
                <span>25+ {isAr ? 'تعهيد كامل' : 'Enterprise Scale'}</span>
              </div>
            </div>

            {/* 4. Engagement Model Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3549A5] mb-3">
                {isAr ? '04 / نموذج التعاقد والاستقطاب' : '04 / Talent Engagement Model'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(ENGAGEMENT_MODELS) as EngagementModel[]).map((mKey) => {
                  const m = ENGAGEMENT_MODELS[mKey];
                  const active = model === mKey;
                  return (
                    <button
                      key={mKey}
                      type="button"
                      onClick={() => setModel(mKey)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        active
                          ? 'border-[#3549A5] bg-[#E8EEFF]/50 ring-1 ring-[#3549A5]'
                          : 'border-[#E1E6F0] bg-[#F8F9FC] hover:bg-white hover:border-[#3549A5]'
                      }`}
                      aria-pressed={active}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-[#17243E]">{isAr ? m.labelAr : m.labelEn}</span>
                        {active && <CheckCircle2 size={16} className="text-[#3549A5]" />}
                      </div>
                      <p className="mt-1.5 text-xs text-[#4E5D78] leading-relaxed line-clamp-2">
                        {isAr ? m.descAr : m.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 bg-[#17243E] text-white p-6 sm:p-8 rounded-2xl border border-[#2B3A58] shadow-xl space-y-6">
            <div className="border-b border-[#2B3A58] pb-5">
              <span className="text-xs font-mono font-bold tracking-widest text-[#C6D4FF] uppercase">
                {isAr ? 'مخرجات التخطيط الاستراتيجي' : 'Strategic Workforce Projection'}
              </span>
              <h3 className="mt-2 text-2xl font-black text-white">
                {isAr ? sectorInfo.labelAr : sectorInfo.labelEn}
              </h3>
              <p className="mt-1.5 text-xs text-[#A0B0D0] leading-relaxed">
                {isAr ? sectorInfo.marketPaceAr : sectorInfo.marketPaceEn}
              </p>
            </div>

            {/* Metric Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1F2F4E] p-4 rounded-xl border border-[#2B3A58]">
                <div className="flex items-center gap-2 text-[#C6D4FF] text-xs font-bold">
                  <Clock size={16} />
                  <span>{isAr ? 'المدة التقديرية' : 'Est. Timeline'}</span>
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  ~{totalWeeksEstimate} <span className="text-sm font-normal text-[#A0B0D0]">{isAr ? 'أسابيع' : 'weeks'}</span>
                </div>
                <p className="mt-1 text-[11px] text-[#A0B0D0]">
                  {isAr ? 'من اعتماد الوصف حتى العرض النهائي' : 'From brief alignment to offer dispatch'}
                </p>
              </div>

              <div className="bg-[#1F2F4E] p-4 rounded-xl border border-[#2B3A58]">
                <div className="flex items-center gap-2 text-[#C6D4FF] text-xs font-bold">
                  <Layers size={16} />
                  <span>{isAr ? 'مراحل التقييم' : 'Review Stages'}</span>
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  {stagesCount} <span className="text-sm font-normal text-[#A0B0D0]">{isAr ? 'مراحل' : 'stages'}</span>
                </div>
                <p className="mt-1 text-[11px] text-[#A0B0D0]">
                  {isAr ? 'فحص بشري وتقييم كفاءات مستقل' : 'Human-led screening & competency audit'}
                </p>
              </div>
            </div>

            {/* Typical Representative Roles */}
            <div className="bg-[#1F2F4E]/60 p-4 rounded-xl border border-[#2B3A58]">
              <span className="text-xs font-bold text-[#C6D4FF] uppercase tracking-wider block mb-2">
                {isAr ? 'أمثلة على الأدوار التخصصية في هذا النطاق' : 'Representative Roles in Sourcing Scope'}
              </span>
              <ul className="space-y-1.5 text-xs text-[#E8EEFF]">
                {(isAr ? sectorInfo.typicalRolesAr : sectorInfo.typicalRolesEn).map((role, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3549A5]" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best For Model Recommendation */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60">
              <div className="flex items-center gap-2 text-blue-200 text-xs font-bold">
                <TrendingUp size={16} />
                <span>{isAr ? 'ملاءمة النموذج المقترح' : 'Engagement Recommendation'}</span>
              </div>
              <p className="mt-2 text-xs text-blue-100/90 leading-relaxed">
                {isAr ? modelInfo.bestForAr : modelInfo.bestForEn}
              </p>
            </div>

            {/* Intake Guardrail & Boundary Notice */}
            <div className="p-3.5 rounded-lg bg-[#141C2E] border border-[#242F46] text-[11px] text-[#8EA0C0] leading-relaxed">
              <span className="font-bold text-white block mb-0.5">
                {isAr ? 'إشعار توضيحي لنطاق الأداة:' : 'Planning Simulation Notice:'}
              </span>
              {isAr
                ? 'هذه الأداة تقدم تقديراً تخطيطياً للأطر الزمنية ومعايير الاختيار. لا تمثل إعلاناً عن وظائف شاغرة أو التزاماً تعاقدياً بالتوظيف أو ضماناً بنسب القبول.'
                : 'This calibrator provides indicative planning estimates. It does not constitute live job vacancies, hiring commitments, placement guarantees, or commercial salary fee quotes.'}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <Link
                href={talentPath(locale, 'hiring-brief')}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#3549A5] hover:bg-[#2A3A85] text-white py-4 px-6 rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                <span>{isAr ? 'بدء صياغة متطلبات التوظيف' : 'Proceed With Hiring Brief'}</span>
                {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
