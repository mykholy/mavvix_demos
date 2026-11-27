'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Sliders, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Sparkles, Layers, ShieldCheck, Compass } from 'lucide-react';

interface ScopeOption {
  id: string;
  nameEn: string;
  nameAr: string;
  baseWeeks: number;
  estEgp: number;
  estUsd: number;
  descEn: string;
  descAr: string;
}

const SCOPES: ScopeOption[] = [
  {
    id: 'brand-identity',
    nameEn: 'Comprehensive Brand Identity System',
    nameAr: 'نظام الهوية البصرية المتكامل',
    baseWeeks: 6,
    estEgp: 280000,
    estUsd: 5800,
    descEn: 'Dual-script typography, logotype architecture, brand guidelines, stationery suites, and digital token guidelines.',
    descAr: 'تصميم طباعي ثنائي اللغة، شعار مرن، دليل إرشادي شامل، مطبوعات راقية، ومكتبة متكاملة للرموز البصرية.'
  },
  {
    id: 'digital-platform',
    nameEn: 'Bespoke Editorial Digital Platform',
    nameAr: 'منصة رقمية تحريرية مخصصة',
    baseWeeks: 8,
    estEgp: 420000,
    estUsd: 8800,
    descEn: 'Next.js architecture, bespoke micro-interactions, editorial content modelling, WCAG AA compliance, and performance tuning.',
    descAr: 'بنية برمجية معاصرة بـ Next.js، تفاعلات دقيقة، نمذجة تحريرية للمحتوى، توافق كامل مع معايير الوصول وسرعة قصوى.'
  },
  {
    id: 'spatial-editorial',
    nameEn: 'Spatial Identity & Editorial Monograph',
    nameAr: 'الهوية المكانية والإصدارات التحريرية',
    baseWeeks: 7,
    estEgp: 340000,
    estUsd: 7100,
    descEn: 'Architectural wayfinding, environmental graphics, exhibition typography, hardbound cloth monographs, and foil embossing.',
    descAr: 'إرشاد مكاني ومعماري، جرافيك بيئي للمعارض، ومجلدات مطبوعة بكتان فاخر وتطعيم حراري مذهب.'
  },
  {
    id: 'design-advisory',
    nameEn: 'Quarterly Strategic Design Advisory',
    nameAr: 'الاستشارة التصميمية الاستراتيجية الربع سنوية',
    baseWeeks: 12,
    estEgp: 220000,
    estUsd: 4600,
    descEn: 'Executive design governance, team critique sessions, brand asset evolution, and ongoing strategic alignment.',
    descAr: 'حوكمة التصميم على مستوى الإدارة، جلسات مراجعة فرق العمل، وتطوير أصول العلامة التجارية دورياً.'
  }
];

interface DeliverableItem {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  weeksAdd: number;
  costEgpAdd: number;
}

const DELIVERABLES: DeliverableItem[] = [
  { id: 'dual-script', nameEn: 'Arabic/Latin Dual-Script Custom Typeface', nameAr: 'خط طباعي مخصص عربي ولاتيني متناغم', category: 'Typography', weeksAdd: 2, costEgpAdd: 85000 },
  { id: 'token-library', nameEn: 'Figma to Code Modular Token JSON Library', nameAr: 'مكتبة أكواد الرموز البرمجية من فيجما', category: 'Systems', weeksAdd: 1, costEgpAdd: 45000 },
  { id: 'monograph-print', nameEn: 'Limited-Run Hardbound Monograph Spec', nameAr: 'تجهيز مواصفات مجلد فاخر محدود الإصدار', category: 'Print', weeksAdd: 1, costEgpAdd: 50000 },
  { id: 'wayfinding-spec', nameEn: 'Architectural Environmental Signage Dossier', nameAr: 'ملف مواصفات اللافتات المعمارية والبيئية', category: 'Spatial', weeksAdd: 2, costEgpAdd: 70000 },
  { id: 'motion-toolkit', nameEn: 'Kinetic Identity & Micro-Interaction Toolkit', nameAr: 'حزمة الهوية الحركية والتفاعلات الدقيقة', category: 'Motion', weeksAdd: 1, costEgpAdd: 40000 }
];

export function PortfolioScopeCalibrator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedScopeId, setSelectedScopeId] = useState<string>('brand-identity');
  const [selectedDeliverableIds, setSelectedDeliverableIds] = useState<string[]>(['dual-script', 'token-library']);
  const [urgencyMode, setUrgencyMode] = useState<'standard' | 'accelerated'>('standard');

  const selectedScope = SCOPES.find(s => s.id === selectedScopeId) || SCOPES[0];

  const toggleDeliverable = (id: string) => {
    setSelectedDeliverableIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const extraWeeks = selectedDeliverableIds.reduce((sum, id) => {
    const d = DELIVERABLES.find(item => item.id === id);
    return sum + (d ? d.weeksAdd : 0);
  }, 0);

  const extraEgp = selectedDeliverableIds.reduce((sum, id) => {
    const d = DELIVERABLES.find(item => item.id === id);
    return sum + (d ? d.costEgpAdd : 0);
  }, 0);

  const baseTotalWeeks = selectedScope.baseWeeks + extraWeeks;
  const totalWeeks = urgencyMode === 'accelerated' ? Math.max(4, Math.round(baseTotalWeeks * 0.75)) : baseTotalWeeks;
  
  const baseTotalEgp = selectedScope.estEgp + extraEgp;
  const totalEgp = urgencyMode === 'accelerated' ? Math.round(baseTotalEgp * 1.25) : baseTotalEgp;
  const totalUsd = Math.round(totalEgp / 48);

  return (
    <section className="bg-white rounded-[2rem] border border-[#E2E0D8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8" aria-labelledby="scope-calibrator-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E0D8]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#737068]">
            <Sliders className="w-4 h-4 text-[#0F0F10]" />
            <span>{isAr ? 'أداة معايرة النطاق والميزانية' : 'Scope & Engagement Calibrator'}</span>
          </div>
          <h2 id="scope-calibrator-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#0F0F10]">
            {isAr ? 'حدد ملامح مشروعك بدقة متناهية' : 'Calibrate Your Studio Commission'}
          </h2>
          <p className="text-xs sm:text-sm text-[#57544C] max-w-2xl font-sans leading-relaxed">
            {isAr
              ? 'اختر التخصص المطلوب وقائمة المخرجات الأساسية للحصول على تقدير شفاف للجدول الزمني وحجم الاستثمار المبدئي قبل بدء المحادثة.'
              : 'Select your primary design discipline and tailored deliverable modules to compute a transparent timeframe and investment benchmark.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F6F5F2] p-1.5 rounded-xl border border-[#DDD9CE] font-mono text-xs">
          <button
            type="button"
            onClick={() => setUrgencyMode('standard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              urgencyMode === 'standard' ? 'bg-[#0F0F10] text-white shadow-sm font-bold' : 'text-[#57544C] hover:text-[#0F0F10]'
            }`}
            aria-label={isAr ? 'الجدول الزمني المعتاد' : 'Standard delivery pace'}
          >
            {isAr ? 'وتيرة منتظمة' : 'Standard Pace'}
          </button>
          <button
            type="button"
            onClick={() => setUrgencyMode('accelerated')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              urgencyMode === 'accelerated' ? 'bg-[#0F0F10] text-[#CCFF00] shadow-sm font-bold' : 'text-[#57544C] hover:text-[#0F0F10]'
            }`}
            aria-label={isAr ? 'تسليم مكثف' : 'Accelerated sprint pace'}
          >
            {isAr ? 'سبرنت مكثف' : 'Accelerated (+25%)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Core Discipline Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0F0F10]">
              1. {isAr ? 'اختر مسار التعاقد الأساسي' : 'Select Primary Discipline'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SCOPES.map(s => {
                const active = s.id === selectedScopeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedScopeId(s.id)}
                    className={`text-left rtl:text-right p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      active
                        ? 'border-[#0F0F10] bg-[#0F0F10] text-white shadow-md'
                        : 'border-[#E2E0D8] bg-[#F6F5F2] text-[#0F0F10] hover:border-[#0F0F10]'
                    }`}
                    aria-label={isAr ? s.nameAr : s.nameEn}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                        <span className={active ? 'text-[#CCFF00]' : 'text-[#737068]'}>
                          {s.baseWeeks} {isAr ? 'أسابيع' : 'weeks'}
                        </span>
                        {active && <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />}
                      </div>
                      <h4 className="font-serif text-base font-bold leading-snug">
                        {isAr ? s.nameAr : s.nameEn}
                      </h4>
                    </div>
                    <p className={`text-xs mt-3 leading-relaxed font-sans ${active ? 'text-slate-300' : 'text-[#57544C]'}`}>
                      {isAr ? s.descAr : s.descEn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="space-y-3 pt-4 border-t border-[#F0EFEA]">
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0F0F10]">
              2. {isAr ? 'مخرجات متقدمة إضافية' : 'Add Specialized Deliverable Modules'}
            </label>
            <div className="space-y-2">
              {DELIVERABLES.map(d => {
                const checked = selectedDeliverableIds.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDeliverable(d.id)}
                    className={`w-full text-left rtl:text-right p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      checked
                        ? 'border-[#0F0F10] bg-[#F4F3EE]'
                        : 'border-[#E2E0D8] bg-white hover:border-[#DDD9CE]'
                    }`}
                    aria-label={isAr ? d.nameAr : d.nameEn}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          checked ? 'bg-[#0F0F10] border-[#0F0F10] text-[#CCFF00]' : 'border-[#DDD9CE] bg-white'
                        }`}
                      >
                        {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-serif text-sm font-bold text-[#0F0F10] block">
                          {isAr ? d.nameAr : d.nameEn}
                        </span>
                        <span className="font-mono text-[10px] text-[#737068] uppercase">
                          {d.category} · +{d.weeksAdd} {isAr ? 'أسبوع' : 'wk'}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#0F0F10]">
                      +{d.costEgpAdd.toLocaleString()} EGP
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Calculated Calibration Dossier */}
        <div className="lg:col-span-5 bg-[#0F0F10] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-[#CCFF00]">
              <span className="uppercase tracking-widest">{isAr ? 'ملخص التقدير المبدئي' : 'Calibrated Estimation'}</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">{urgencyMode.toUpperCase()}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                {isAr ? 'المدة الزمنية المتوقعة للإنتاج' : 'Estimated Engagement Horizon'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                  {totalWeeks}
                </span>
                <span className="font-mono text-base text-[#CCFF00]">
                  {isAr ? 'أسابيع عمل' : 'production weeks'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">
                {isAr
                  ? 'تشمل مراحل البحث، تحديد الاتجاه، التصميم، التوثيق، والتسليم المنظم.'
                  : 'Includes discovery, direction setting, iterative sprints, QA and asset handover.'}
              </p>
            </div>

            <div className="space-y-1 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                {isAr ? 'نطاق الاستثمار التقديري' : 'Illustrative Investment Benchmark'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {totalEgp.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-[#CCFF00]">EGP</span>
                <span className="text-xs font-mono text-slate-400">
                  (~${totalUsd.toLocaleString()} USD)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-1">
                {isAr
                  ? 'الأسعار المعروضة استرشادية لغايات العرض التوضيحي، ويتم تحديد العرض الرسمي بعد دراسة متطلبات المشروع الفعلية.'
                  : 'Figures are illustrative for demonstration purposes. Formal proposals follow structured brief qualification.'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                {isAr ? 'المخرجات المعتمدة في هذا النطاق:' : 'Included Scope Modules:'}
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] flex-shrink-0" />
                  <span>{isAr ? selectedScope.nameAr : selectedScope.nameEn}</span>
                </li>
                {selectedDeliverableIds.map(id => {
                  const item = DELIVERABLES.find(d => d.id === id);
                  if (!item) return null;
                  return (
                    <li key={id} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] flex-shrink-0" />
                      <span>{isAr ? item.nameAr : item.nameEn}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href={`/${locale}/preview/portfolio/contact?service=${selectedScope.id}&timeline=${totalWeeks}w`}
              className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-[#CCFF00] hover:bg-[#B8E600] text-[#0F0F10] font-mono text-xs font-bold transition-all shadow-md group"
              aria-label={isAr ? 'بدء تقديم موجز المشروع مع هذا النطاق' : 'Initiate project brief with this calibrated scope'}
            >
              <span>{isAr ? 'اعتماد هذا النطاق وبدء الموجز' : 'Adopt Scope & Open Brief Wizard'}</span>
              <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>{isAr ? 'نموذج محاكاة تجريبي تفاعلي من مافيكس' : 'Simulated interactive demo instrument by Mavvix'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
