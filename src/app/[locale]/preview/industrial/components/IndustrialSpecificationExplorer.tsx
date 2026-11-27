'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Layers,
  ShieldCheck,
  Flame,
  Gauge,
  CheckCircle2,
  Scale,
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  Atom,
  Thermometer,
  Sparkles
} from 'lucide-react';

interface AlloyGrade {
  id: string;
  code: string;
  standardCode: string;
  enName: string;
  arName: string;
  familyEn: string;
  familyAr: string;
  tensileMpa: number; // MPa
  yieldMpa: number; // MPa
  elongationPercent: number; // %
  hardnessHbw: number; // HBW
  impactJoules: number; // J
  tempLimitC: number; // °C
  corrosionScore: number; // 1-10
  machinabilityScore: number; // 1-10
  chemistry: { element: string; percent: string }[];
  applicationsEn: string[];
  applicationsAr: string[];
  standards: string[];
  recommendedSku: string;
}

const ALLOY_GRADES: AlloyGrade[] = [
  {
    id: '304',
    code: 'AISI 304',
    standardCode: 'EN 1.4301 / X5CrNi18-10',
    enName: 'Austenitic Stainless Steel',
    arName: 'صلب لا يصدأ أوستنيتي قياسي',
    familyEn: 'Stainless Alloys',
    familyAr: 'سبائك الفولاذ المقاوم للصدأ',
    tensileMpa: 580,
    yieldMpa: 235,
    elongationPercent: 45,
    hardnessHbw: 180,
    impactJoules: 100,
    tempLimitC: 600,
    corrosionScore: 8,
    machinabilityScore: 5,
    chemistry: [
      { element: 'Cr', percent: '18.1%' },
      { element: 'Ni', percent: '8.4%' },
      { element: 'C', percent: '0.04%' },
      { element: 'Mn', percent: '1.8%' }
    ],
    applicationsEn: ['Food Processing Plants', 'Chemical Piping Lines', 'Architectural Cladding', 'Heat Exchanger Shells'],
    applicationsAr: ['مصانع معالجة الأغذية', 'خطوط الأنابيب الكيميائية', 'الكسوات المعمارية الخارجية', 'مبادلات الحرارة الصناعية'],
    standards: ['DIN EN 10088-3', 'ASTM A276', 'ISO 683-17'],
    recommendedSku: 'FERRO-304-40'
  },
  {
    id: '316L',
    code: 'AISI 316L',
    standardCode: 'EN 1.4404 / X2CrNiMo17-12-2',
    enName: 'Marine & Acid Resistant Stainless',
    arName: 'صلب لا يصدأ بحري مقاوم للأحماض والكلور',
    familyEn: 'Stainless Alloys',
    familyAr: 'سبائك الفولاذ المقاوم للصدأ',
    tensileMpa: 600,
    yieldMpa: 245,
    elongationPercent: 40,
    hardnessHbw: 190,
    impactJoules: 110,
    tempLimitC: 650,
    corrosionScore: 10,
    machinabilityScore: 5,
    chemistry: [
      { element: 'Cr', percent: '17.2%' },
      { element: 'Ni', percent: '11.8%' },
      { element: 'Mo', percent: '2.3%' },
      { element: 'C', percent: '0.02%' }
    ],
    applicationsEn: ['Offshore Gas Platforms', 'Pharma Cleanroom Autoclaves', 'Seawater Desalination', 'Pulp Chemical Tanks'],
    applicationsAr: ['منصات الغاز البحرية', 'أجهزة التعقيم الدوائية', 'محطات تحلية مياه البحر', 'خزانات الكيماويات اللزجة'],
    standards: ['DIN EN 10088-3', 'ASTM A479', 'NACE MR0175'],
    recommendedSku: 'FERRO-316-25'
  },
  {
    id: 's355',
    code: 'S355J2',
    standardCode: 'EN 1.0577 / DIN EN 10025-2',
    enName: 'High-Yield Structural Carbon Steel',
    arName: 'صلب إنشائي كربوني فائق الإجهاد والمتانة',
    familyEn: 'Structural Steels',
    familyAr: 'فولاذ الهياكل الإنشائية',
    tensileMpa: 630,
    yieldMpa: 355,
    elongationPercent: 22,
    hardnessHbw: 185,
    impactJoules: 27,
    tempLimitC: 400,
    corrosionScore: 4,
    machinabilityScore: 8,
    chemistry: [
      { element: 'C', percent: '0.20%' },
      { element: 'Mn', percent: '1.55%' },
      { element: 'Si', percent: '0.50%' },
      { element: 'P', percent: '0.025%' }
    ],
    applicationsEn: ['Heavy Crane Girders', 'Offshore Jacket Foundations', 'High-Rise Frameworks', 'Industrial Silos'],
    applicationsAr: ['كمرات الروافع الثقيلة', 'قواعد المنصات البحرية', 'هياكل الأبراج الشاهقة', 'صوامع التخزين المعدنية'],
    standards: ['DIN EN 10025-2', 'ISO 630', 'ASTM A572 Gr 50'],
    recommendedSku: 'FERRO-BEAM-200'
  },
  {
    id: '4140',
    code: '42CrMo4 / 4140',
    standardCode: 'EN 1.7225 / AISI 4140',
    enName: 'Quenched & Tempered Engineering Alloy',
    arName: 'سبائك معالجة حراريًا للتشغيل والتروس الميكانيكية',
    familyEn: 'Engineering Steels',
    familyAr: 'فولاذ الهندسة الميكانيكية المعالج',
    tensileMpa: 1100,
    yieldMpa: 900,
    elongationPercent: 12,
    hardnessHbw: 340,
    impactJoules: 35,
    tempLimitC: 500,
    corrosionScore: 4,
    machinabilityScore: 7,
    chemistry: [
      { element: 'C', percent: '0.42%' },
      { element: 'Cr', percent: '1.10%' },
      { element: 'Mo', percent: '0.22%' },
      { element: 'Mn', percent: '0.75%' }
    ],
    applicationsEn: ['High-Torque Drive Shafts', 'Heavy Transmission Gears', 'Turbine Rotor Spindles', 'Pressure Extrusion Barrels'],
    applicationsAr: ['أعمدة الحركة عالية العزم', 'تروس نقل الحركة الثقيلة', 'أعمدة دوارات التوربينات', 'أسطوانات البثق تحت الضغط'],
    standards: ['DIN EN 10083-3', 'ASTM A29', 'ISO 683-2'],
    recommendedSku: 'FERRO-SHAFT-80'
  },
  {
    id: 'hardox',
    code: 'Hardox 450',
    standardCode: 'HBW 450 / Wear Resistant Plate',
    enName: 'Extreme Abrasion-Resistant Steel',
    arName: 'ألواح الصلب الفولاذي فائق المقاومة للتآكل والاحتكاك',
    familyEn: 'Wear Plates',
    familyAr: 'ألواح مقاومة الاحتكاك والتآكل',
    tensileMpa: 1400,
    yieldMpa: 1200,
    elongationPercent: 10,
    hardnessHbw: 450,
    impactJoules: 50,
    tempLimitC: 250,
    corrosionScore: 4,
    machinabilityScore: 4,
    chemistry: [
      { element: 'C', percent: '0.26%' },
      { element: 'Cr', percent: '1.40%' },
      { element: 'Ni', percent: '0.80%' },
      { element: 'Mo', percent: '0.60%' }
    ],
    applicationsEn: ['Excavator Bucket Liners', 'Mining Ore Chutes', 'Concrete Mixer Drums', 'Quarry Crusher Hammers'],
    applicationsAr: ['تبطين كباشات الحفارات', 'مزاريب خامات التعدين', 'خلاطات الخرسانة الثقيلة', 'مطاحن الكسارات الحجرية'],
    standards: ['SSAB EN 10051', 'ISO 148-1', 'ASTM A514 Mod'],
    recommendedSku: 'FERRO-PLATE-20'
  },
  {
    id: '2205',
    code: 'Duplex 2205',
    standardCode: 'EN 1.4462 / UNS S32205',
    enName: 'Ferritic-Austenitic Dual-Phase Stainless',
    arName: 'فولاذ مزدوج الطور (دوبلكس) عالي الضغط ومقاوم للإجهاد',
    familyEn: 'Duplex Steels',
    familyAr: 'فولاذ الدوبلكس مزدوج الطور',
    tensileMpa: 800,
    yieldMpa: 520,
    elongationPercent: 25,
    hardnessHbw: 290,
    impactJoules: 80,
    tempLimitC: 300,
    corrosionScore: 10,
    machinabilityScore: 4,
    chemistry: [
      { element: 'Cr', percent: '22.3%' },
      { element: 'Ni', percent: '5.5%' },
      { element: 'Mo', percent: '3.1%' },
      { element: 'N', percent: '0.18%' }
    ],
    applicationsEn: ['Subsea Gas Flowlines', 'Sour Crude Heat Exchangers', 'Marine Flue Gas Scrubbers', 'Reverse Osmosis Pressure Vessels'],
    applicationsAr: ['خطوط تدفق الغاز تحت الماء', 'مبادلات النفط الخام الحامضي', 'أبراج غسيل الغازات البحرية', 'أوعية الضغط لتحلية التناضح العكسي'],
    standards: ['DIN EN 10088-3', 'ASTM A182 F51', 'NACE MR0103'],
    recommendedSku: 'FERRO-PIPE-150'
  }
];

interface Props {
  locale: Locale;
}

export function IndustrialSpecificationExplorer({ locale }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedId, setSelectedId] = useState<string>('304');
  const activeAlloy = ALLOY_GRADES.find((a) => a.id === selectedId) || ALLOY_GRADES[0];

  return (
    <section className="bg-[#12243C] text-white py-16 sm:py-20 border-y border-slate-800" aria-labelledby="metallurgy-explorer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Atom className="w-3.5 h-3.5" />
              <span>{isAr ? 'معاير المواصفات والسبائك المعدنية' : 'Metallurgical Alloy Specifier & Mechanical Comparator'}</span>
            </div>
            <h2 id="metallurgy-explorer-heading" className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isAr ? (
                <>مقارنة الدرجات الفنية <span className="text-[#DE9E37]">والمعايير الميكانيكية</span></>
              ) : (
                <>Interactive Alloy Specifier & <span className="text-[#DE9E37]">Mechanical Tolerances</span></>
              )}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {isAr
                ? 'استعرض خواص الشد والإجهاد والصلابة ونسب العناصر الكيميائية للسبائك الصناعية الأكثر طلبًا في الشرق الأوسط طبقًا لمواصفات DIN وASTM.'
                : 'Inspect yield strengths, tensile tolerances, chemical compositions, and international DIN/ASTM standards for our primary industrial alloys.'}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              {isAr ? 'معتمد بشهادة MTC 3.1' : 'MTC EN 10204 3.1 Traceable'}
            </span>
          </div>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 max-w-full">
          {ALLOY_GRADES.map((alloy) => {
            const isSelected = alloy.id === selectedId;
            return (
              <button
                key={alloy.id}
                type="button"
                onClick={() => setSelectedId(alloy.id)}
                aria-label={`Select ${alloy.code}`}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#DE9E37] text-slate-950 border-[#DE9E37] shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{alloy.code}</span>
                <span className="hidden sm:inline-block ms-2 opacity-75 text-[10px]">
                  ({alloy.standardCode.split('/')[0].trim()})
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Spec Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mechanical Properties & Progress Bars (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {isAr ? activeAlloy.familyAr : activeAlloy.familyEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {activeAlloy.code} — {isAr ? activeAlloy.arName : activeAlloy.enName}
                </h3>
              </div>
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs font-bold self-start sm:self-auto">
                {activeAlloy.standardCode}
              </span>
            </div>

            {/* 4 Quantitative Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {isAr ? 'قوة الشد (Rm)' : 'Tensile (Rm)'}
                </span>
                <span className="text-xl font-black text-white font-mono">
                  {activeAlloy.tensileMpa}{' '}
                  <span className="text-xs font-normal text-slate-400">MPa</span>
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {isAr ? 'حد الخضوع (Rp0.2)' : 'Yield (Rp0.2)'}
                </span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  {activeAlloy.yieldMpa}{' '}
                  <span className="text-xs font-normal text-slate-400">MPa</span>
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {isAr ? 'الاستطالة (A5)' : 'Elongation'}
                </span>
                <span className="text-xl font-black text-white font-mono">
                  {activeAlloy.elongationPercent}%
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {isAr ? 'صلادة برينل' : 'Hardness'}
                </span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  {activeAlloy.hardnessHbw}{' '}
                  <span className="text-xs font-normal text-slate-400">HBW</span>
                </span>
              </div>
            </div>

            {/* Visual Calibration Meters */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">{isAr ? 'مقاومة التآكل والأكسدة الكيميائية:' : 'Corrosion & Acid Resistance Index:'}</span>
                  <span className="text-amber-400 font-bold">{activeAlloy.corrosionScore} / 10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${activeAlloy.corrosionScore * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">{isAr ? 'قابلية التشغيل والتفريز الآلي (Machinability):' : 'Machinability & Tooling Efficiency:'}</span>
                  <span className="text-white font-bold">{activeAlloy.machinabilityScore} / 10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-slate-400 rounded-full transition-all duration-500"
                    style={{ width: `${activeAlloy.machinabilityScore * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Chemical Spectral Composition */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                {isAr ? 'التركيب الكيميائي الاسمي (Spectrographic Nominal Composition)' : 'Nominal Chemical Composition (MTC XRF Verification)'}
              </span>
              <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                {activeAlloy.chemistry.map((c) => (
                  <div key={c.element} className="bg-slate-950 py-2.5 px-2 rounded-lg border border-slate-800">
                    <span className="text-slate-300 block text-[10px] font-bold">{c.element}</span>
                    <span className="text-amber-400 font-bold text-sm">{c.percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Applications, Standards & Procurement Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Typical Engineering Applications */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'التطبيقات الهندسية والصناعية المعتمدة' : 'Verified Industrial Applications'}</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {(isAr ? activeAlloy.applicationsAr : activeAlloy.applicationsEn).map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>

              {/* International Standards */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  {isAr ? 'المواصفات القياسية الدولية المطابقة:' : 'Referenced International Standards:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeAlloy.standards.map((std) => (
                    <span key={std} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] font-mono text-amber-400">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct RFQ Action Box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 sm:p-7 space-y-4">
              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {isAr ? 'طلب توريد مباشر' : 'PROCUREMENT SPEC INTEGRATION'}
                </span>
                <h4 className="text-base font-bold text-white mt-1">
                  {isAr ? 'تضمين هذه السبيكة في سلة الـ RFQ' : 'Add This Metallurgical Grade to RFQ'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {isAr
                    ? `يتوفر هذا المعيار ضمن منتجات الكتالوج القياسي (${activeAlloy.recommendedSku}) مع توثيق كامل لشهادات الفحص.`
                    : `Stocked in regional warehouses under catalog reference ${activeAlloy.recommendedSku} with full MTC 3.1 certification.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={`/${locale}/preview/industrial/rfq?sku=${activeAlloy.recommendedSku}`}
                  className="bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{isAr ? 'إضافة إلى سلة التسعير' : 'Open in RFQ Basket'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/${locale}/preview/industrial/compare`}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs px-4 py-3 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'مقارنة المنتجات' : 'Compare SKUs'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
