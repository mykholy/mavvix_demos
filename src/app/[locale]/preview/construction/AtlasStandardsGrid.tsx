'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Ruler,
  Layers,
  Building2,
  Activity,
  Award,
  FileCheck,
  Scale
} from 'lucide-react';

interface StandardItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: 'structural' | 'mep' | 'safety' | 'materials';
  authority: string;
  descriptionAr: string;
  descriptionEn: string;
  acceptanceCriteriaAr: string;
  acceptanceCriteriaEn: string;
  inspectionFrequency: string;
  metric: string;
  metricValue: string;
}

const STANDARDS_DATA: StandardItem[] = [
  {
    id: 'std-concrete',
    code: 'ASTM C39 / BS EN 12390',
    nameAr: 'اختبارات الإجهاد والكسر للخرسانة المسلحة',
    nameEn: 'Compressive Strength of Cylindrical Concrete',
    category: 'structural',
    authority: 'ASTM International & British Standards',
    descriptionAr: 'فحص ميكانيكي لعينات مكعبات وأسطوانات الخرسانة في المختبر المعتمد بعد 7 و28 يوماً لضمان تحمل الأحمال التصميمية.',
    descriptionEn: 'Laboratory mechanical testing of molded concrete specimens at 7 and 28 days to verify structural load capacity.',
    acceptanceCriteriaAr: 'مقاومة الضغط الفعلية ≥ 100% من الإجهاد المميز f\'c (الحد الأدنى 40 ميجاباسكال).',
    acceptanceCriteriaEn: 'Actual compressive strength must reach >= 100% of specified characteristic f\'c (min 40 MPa).',
    inspectionFrequency: 'Every 50 m³ cast or 1 set per pour',
    metric: 'Target f\'c',
    metricValue: '45–60 MPa'
  },
  {
    id: 'std-steel',
    code: 'AWS D1.1 / ASTM A992',
    nameAr: 'الفحص غير الإتلافي للحامات المقاطع الفولاذية (NDT)',
    nameEn: 'Structural Welding Code & Ultrasonic NDT Inspection',
    category: 'materials',
    authority: 'American Welding Society',
    descriptionAr: 'اختبار بالموجات فوق الصوتية وفحص الجسيمات المغناطيسية لجميع لحامات الوصلات الحرجة والكمرات الحاملة لمنع الشروخ الداخلية.',
    descriptionEn: 'Ultrasonic testing and magnetic particle examination of full-penetration welds on critical moment frames.',
    acceptanceCriteriaAr: 'خلو كامل من الشروخ والمسام والاندماج غير المكتمل وفق معايير الفئة الأولى.',
    acceptanceCriteriaEn: 'Zero planar flaws, cracks, or incomplete penetration per Class A structural acceptance criteria.',
    inspectionFrequency: '100% full-penetration welds',
    metric: 'NDT Pass Rate',
    metricValue: '99.8%'
  },
  {
    id: 'std-mep',
    code: 'NFPA 13 & 72 / ASHRAE 90.1',
    nameAr: 'معايير إخماد الحريق والسلامة الحياتية وكفاءة الطاقة',
    nameEn: 'Fire Life Safety & Mechanical Energy Standards',
    category: 'mep',
    authority: 'National Fire Protection Association & ASHRAE',
    descriptionAr: 'اختبارات ضغط هيدروستاتيكي لشبكات الرشاشات ومطابقة حساسات الدخان مع لوحات التحكم الذكية (BMS) واختبارات توازن الهواء.',
    descriptionEn: 'Hydrostatic pressure tests on sprinkler mains, automatic smoke-damper interlocks, and air balancing (TAB).',
    acceptanceCriteriaAr: 'ثبات الضغط الهيدروستاتيكي عند 200 psi لمدة ساعتين متواصلتين دون أي تسريب.',
    acceptanceCriteriaEn: 'Hydrostatic pressure sustained at 200 psi for 2 hours with zero measured loss.',
    inspectionFrequency: 'Per zone commissioning',
    metric: 'Test Pressure',
    metricValue: '200 PSI'
  },
  {
    id: 'std-acoustic',
    code: 'ASTM E90 / ISO 10140',
    nameAr: 'العزل الصوتي المعماري للمقرات الإدارية والقاعات',
    nameEn: 'Architectural Airborne Sound Transmission Loss',
    category: 'materials',
    authority: 'ASTM International & International Organization for Standardization',
    descriptionAr: 'قياس فقدان الطاقة الصوتية عبر الحوائط الجافة والأسقف المعلقة والواجهات الزجاجية لتوفير بيئة عمل إدارية هادئة وسرية.',
    descriptionEn: 'Field sound transmission class (FSTC) acoustic measurements for executive boardrooms, offices, and facades.',
    acceptanceCriteriaAr: 'تحقيق معامل عزل صوتي لا يقل عن STC 55 للفواصل الإدارية وSTC 60 للقاعات التنفيذية.',
    acceptanceCriteriaEn: 'Field Sound Transmission Class >= STC 55 between meeting spaces and >= STC 48 in open-plan perimeters.',
    inspectionFrequency: 'Sample rooms before handover',
    metric: 'Sound Class',
    metricValue: 'STC 55–58'
  },
  {
    id: 'std-safety',
    code: 'ISO 45001 / OSHA 1926',
    nameAr: 'منظومة السلامة والصحة المهنية ومعدل الحوادث الصفرية',
    nameEn: 'Occupational Health & Zero Lost-Time Injury (LTI)',
    category: 'safety',
    authority: 'Occupational Safety and Health Administration',
    descriptionAr: 'بروتوكولات صارمة للعمل على ارتفاعات عالية، وسلامة السقالات، وتأريض المعدات، وتدريب يومي لجميع الكوادر في الموقع.',
    descriptionEn: 'Comprehensive fall protection protocols, daily toolbox safety talks, permit-to-work audits, and PPE enforcement.',
    acceptanceCriteriaAr: 'صفر حوادث مهدرة للوقت (Zero LTI) والتزام كامل بتصاريح العمل الساخن والمغلق.',
    acceptanceCriteriaEn: 'Zero Lost Time Incidents across all active civil sites with 100% verified daily toolbox attendance.',
    inspectionFrequency: 'Daily site safety audits',
    metric: 'Safe Man-Hours',
    metricValue: '1.4M+ Hours'
  },
  {
    id: 'std-qaqc',
    code: 'ISO 9001:2015 / CQC Plan',
    nameAr: 'خطة ضبط وضمان الجودة الهندسية والمستندات',
    nameEn: 'Contractor Quality Control (CQC) & As-Built Digital Tracking',
    category: 'structural',
    authority: 'International Organization for Standardization',
    descriptionAr: 'توثيق كل مرحلة عبر طلبات الفحص (WIR)، وطلبات اعتماد المواد (MAR)، مع ربطها بنماذج BIM للتسليم الموثق.',
    descriptionEn: 'Traceable Work Inspection Requests (WIR) and Material Approval Requests (MAR) tied to digital as-built records.',
    acceptanceCriteriaAr: 'اعتماد المهندس الاستشاري المشرف قبل صب أي خرسانة أو إغلاق أي حائط جاف.',
    acceptanceCriteriaEn: 'Formal Consultant Engineer sign-off before concrete placement or architectural wall concealment.',
    inspectionFrequency: 'Continuous per inspection notice',
    metric: 'First-Time Pass',
    metricValue: '98.5%'
  }
];

export function AtlasStandardsGrid({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'structural' | 'materials' | 'mep' | 'safety'>('all');
  const [activeItem, setActiveItem] = useState<StandardItem>(STANDARDS_DATA[0]);

  const filtered = selectedCategory === 'all'
    ? STANDARDS_DATA
    : STANDARDS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono font-bold text-[#9C4318] uppercase tracking-widest block mb-1">
            ENGINEERING QUALITY GATES & COMPLIANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#12181F] tracking-tight">
            {isAr ? 'معايير ضبط الجودة والمواصفات الهندسية المعتمدة' : 'Engineering Standards & Quality Control Protocols'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'كل بند إنشائي وكهروميكانيكي يخضع لمعايير كود دقيقة، واختبارات معملية موثقة قبل الاعتماد والتسليم.'
              : 'Every civil, structural, and mechanical package is governed by certified international codes, field test reports, and consultant sign-offs.'}
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 bg-[#F4F1EA] p-1.5 rounded-xl shrink-0 overflow-x-auto max-w-full">
          {(['all', 'structural', 'materials', 'mep', 'safety'] as const).map((cat) => {
            const labels = {
              all: isAr ? 'كافة المعايير' : 'All Standards',
              structural: isAr ? 'الإنشائية' : 'Structural',
              materials: isAr ? 'المواد والفولاذ' : 'Materials',
              mep: isAr ? 'الكهروميكانيكية' : 'MEP Systems',
              safety: isAr ? 'السلامة المهنية' : 'HSE Safety'
            };
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#12181F] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isSelected = activeItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#192027] text-white border-[#B85629] shadow-lg ring-1 ring-[#B85629]/40'
                  : 'bg-[#F9F8F5] text-[#12181F] border-stone-200 hover:border-stone-300 hover:bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    isSelected ? 'bg-black/60 text-amber-400 border border-amber-400/40' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {item.code}
                  </span>
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-amber-400' : 'text-[#9C4318]'} font-bold`}>
                    {item.metricValue}
                  </span>
                </div>

                <h3 className={`text-base font-bold leading-snug ${isSelected ? 'text-white' : 'text-[#12181F]'}`}>
                  {isAr ? item.nameAr : item.nameEn}
                </h3>

                <p className={`text-xs leading-relaxed ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              <div className={`mt-5 pt-4 border-t text-xs space-y-1.5 ${
                isSelected ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-600'
              }`}>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{isAr ? 'الجهة المانحة والمعيار:' : 'Standard Authority:'}</span>
                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-stone-900'}`}>{item.authority}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{isAr ? 'دورية الفحص الميداني:' : 'Inspection Frequency:'}</span>
                  <span className={`font-mono font-semibold ${isSelected ? 'text-amber-300' : 'text-stone-800'}`}>{item.inspectionFrequency}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected standard detail drawer / highlight */}
      <div className="bg-[#12181F] text-white p-6 sm:p-8 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'معيار القبول الهندسي المعتمد' : 'Contractual Quality Acceptance Rule'}</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            {isAr ? activeItem.nameAr : activeItem.nameEn} ({activeItem.code})
          </h4>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
            {isAr ? activeItem.acceptanceCriteriaAr : activeItem.acceptanceCriteriaEn}
          </p>
        </div>

        <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 text-center shrink-0 min-w-[160px]">
          <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block mb-1">
            {activeItem.metric}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">
            {activeItem.metricValue}
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
            Verified Pass Gate
          </span>
        </div>
      </div>
    </div>
  );
}
