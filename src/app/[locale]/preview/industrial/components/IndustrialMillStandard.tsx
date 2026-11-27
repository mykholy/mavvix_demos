'use client';

import React, { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Activity,
  Layers,
  Sparkles,
  PackageCheck,
  Search,
  Sliders,
  Scale
} from 'lucide-react';

interface Protocol {
  id: string;
  badge: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  summaryEn: string;
  summaryAr: string;
  standardNorm: string;
  inspectionMetrics: { labelEn: string; labelAr: string; value: string; pass: boolean }[];
  equipmentEn: string;
  equipmentAr: string;
}

const PROTOCOLS: Protocol[] = [
  {
    id: 'mtc31',
    badge: 'EN 10204 3.1',
    titleEn: 'Mill Test Certificate (MTC 3.1) & Heat Traceability',
    titleAr: 'شهادة المنشأ والاختبار (MTC 3.1) وتتبع أرقام الصهر',
    subtitleEn: 'Full 100% Melt Batch Provenance & Chemical Validation',
    subtitleAr: 'توثيق كامل لرقم الصبة والتطابق الكيميائي الصارم',
    summaryEn: 'Every shipment arrives with an authenticated EN 10204 3.1 inspection certificate issued by the production mill quality department, documenting exact heat cast numbers, mechanical yield, tensile limits, and chemical spectrometry.',
    summaryAr: 'كل شحنة توريد تصدر مصحوبة بشهادة فحص معتمدة EN 10204 3.1 من إدارة الجودة بالمصنع المنتج، تتضمن رقم الصبة الفريد، نتائج اختبارات الشد والخضوع، والتحليل الطيفي لنسب العناصر الكيميائية.',
    standardNorm: 'DIN EN 10204 / ISO 10474 Type 3.1',
    inspectionMetrics: [
      { labelEn: 'Melt Heat Traceability', labelAr: 'تتبع رقم الصبة', value: '100% Cast Linked', pass: true },
      { labelEn: 'Chemical Spectrometry', labelAr: 'التحليل الطيفي للسبائك', value: '12 Elements Mapped', pass: true },
      { labelEn: 'Charpy V-Notch (-20°C)', labelAr: 'صدمة شاربي عند -20°م', value: '> 47 Joules', pass: true },
      { labelEn: 'Independent Lab Counter-Check', labelAr: 'مطابقة مختبر خارجي معتمد', value: 'ISO 17025 Verified', pass: true }
    ],
    equipmentEn: 'Optical Emission Spectrometer (OES) & ZwickRoell 1000kN Tensile Machine',
    equipmentAr: 'مقياس الطيف الانبعاثي البصري (OES) وجهاز اختبار الشد 1000kN'
  },
  {
    id: 'ndt',
    badge: 'NDT LEVEL II',
    titleEn: 'Ultrasonic & Surface Non-Destructive Testing (NDT)',
    titleAr: 'الفحص بالموجات فوق الصوتية والجسيمات المغناطيسية (NDT)',
    subtitleEn: 'Internal Defect, Delamination & Seam Integrity Scanning',
    subtitleAr: 'مسح العيوب الداخلية والشقوق المجهرية دون إتلاف العينة',
    summaryEn: 'High-frequency ultrasonic angle-beam transducers and automated eddy current arrays scan 100% of hollow tube lengths and thick structural plates to detect sub-surface laminations, pores, and micro-cracking.',
    summaryAr: 'فحص عالي التردد بمجسات الموجات فوق الصوتية والتيارات الدوامية لمسح كامل أطوال الأنابيب والألواح السميكة لاكتشاف الانفصالات الطبقية الداخلية والفقاعات والشقوق الدقيقة قبل التوريد.',
    standardNorm: 'ISO 10893-8 Class U2 / ASTM A388 / EN 10160',
    inspectionMetrics: [
      { labelEn: 'Internal Delamination Scan', labelAr: 'مسح الانفصال الطبقي الداخلي', value: 'Zero Class E3 Defects', pass: true },
      { labelEn: 'Surface Eddy Current Array', labelAr: 'فحص التيارات الدوامية للسطح', value: 'Depth < 0.15mm Reject', pass: true },
      { labelEn: 'Weld Seam Radiographic / UT', labelAr: 'فحص لحام الأنابيب بالـ UT', value: '100% Longitudinal Checked', pass: true },
      { labelEn: 'Inspector Qualification', labelAr: 'اعتماد مهندسي الفحص', value: 'ASNT Level II / EN 473', pass: true }
    ],
    equipmentEn: 'Olympus OmniScan SX Phased Array Flaw Detector & Eddy Current Encirclement Coils',
    equipmentAr: 'كاشف العيوب بالموجات فوق الصوتية متعددة المصفوفات وملفات التيارات الدوامية'
  },
  {
    id: 'hydrostatic',
    badge: '210 BAR TEST',
    titleEn: 'Hydrostatic Pressure & Pneumatic Decay Testing',
    titleAr: 'اختبار الضغط الهيدروستاتيكي واختبار تسريب الهواء المضغوط',
    subtitleEn: 'Proof Testing for High-Pressure Process Lines & Boilers',
    subtitleAr: 'اختبار التحمل الهيدروليكي لخطوط الضغط العالي والمراجل',
    summaryEn: 'All seamless and submerged-arc welded pipes are subjected to automated full-body hydrostatic pressure testing for a minimum 10-second dwell time to verify hoop stress resistance without leakage or permanent plastic deformation.',
    summaryAr: 'تخضع كافة المواسير غير الملحومة ومواسير اللحام القوسي لاختبار الضغط الهيدروستاتيكي الأوتوماتيكي الكامل لمدة لا تقل عن 10 ثوانٍ للتأكد من تحمل إجهاد الطوق دون أي تسريب أو تشوه دائم.',
    standardNorm: 'ASTM A53 / DIN EN 10216-1 / API Spec 5L',
    inspectionMetrics: [
      { labelEn: 'Max Test Pressure', labelAr: 'أقصى ضغط اختبار', value: 'Up to 210 Bar (3045 PSI)', pass: true },
      { labelEn: 'Pressure Dwell Duration', labelAr: 'مدة ثبات الضغط', value: '10 Seconds Min', pass: true },
      { labelEn: 'Hoop Stress Percentage', labelAr: 'نسبة إجهاد الطوق من الخضوع', value: '60% — 80% SMYS', pass: true },
      { labelEn: 'Automated Log Recording', labelAr: 'تسجيل بياني أوتوماتيكي للضغط', value: 'Digital Pressure Charted', pass: true }
    ],
    equipmentEn: 'Automated 12-Meter Multi-Head Hydrostatic Pipe Testing Rig with Pressure Recorders',
    equipmentAr: 'منصة اختبار هيدروستاتيكي أوتوماتيكية بطول 12 مترًا مع أجهزة تسجيل رقمي'
  },
  {
    id: 'pmi',
    badge: 'PMI XRF',
    titleEn: 'Positive Material Identification (PMI Handheld XRF)',
    titleAr: 'المطابقة الإيجابية للسبائك عبر طيف الأشعة السينية (PMI)',
    subtitleEn: 'Zero-Mixup Verification at Loading & Staging Docks',
    subtitleAr: 'ضمان عدم خلط السبائك نهائيًا عند ساحات التحميل والتعبئة',
    summaryEn: 'Before packing into shipping crates, each bundle undergoes non-destructive handheld X-ray fluorescence (XRF) spectrographic verification to verify alloy grade consistency and avoid alloy mix-up on offshore projects.',
    summaryAr: 'قبل التعبئة في الصناديق الخشبية، تخضع كل حزمة توريد لفحص التحليل الطيفي بالأشعة السينية المحمول (XRF) للتحقق القاطع من مطابقة درجة السبيكة ومنع أي اختلاط للمواد في المشروعات الحيوية.',
    standardNorm: 'API RP 578 / ASTM E1476',
    inspectionMetrics: [
      { labelEn: 'Scan Duration Per Bundle', labelAr: 'مدة المسح لكل حزمة', value: '5 — 10 Seconds', pass: true },
      { labelEn: 'Alloy Grade Confirmation', labelAr: 'تأكيد كود السبيكة الفورية', value: 'Grade ID Match 99.9%', pass: true },
      { labelEn: 'Residual Elements Limit', labelAr: 'كشف العناصر الدخيلة والشوائب', value: '< 0.05% Threshold', pass: true },
      { labelEn: 'Field Report Generation', labelAr: 'إصدار تقرير فحص ميداني', value: 'Barcoded Inspection Slip', pass: true }
    ],
    equipmentEn: 'Thermo Scientific Niton XL2 Plus Handheld XRF Alloy Analyzer',
    equipmentAr: 'جهاز التحليل الطيفي المحمول بالأشعة السينية Thermo Niton XL2 Plus'
  },
  {
    id: 'export_packing',
    badge: 'ISPM 15 & VCI',
    titleEn: 'Seaworthy Export Preservation & VCI Anti-Corrosion Packing',
    titleAr: 'التغليف التصديري البحري والمعالجة ضد الرطوبة والأكسدة (VCI)',
    subtitleEn: 'Heavy Duty Structural Timber Crating & Moisture Barriers',
    subtitleAr: 'صناديق خشبية معالجة حراريًا وأغشية مانعة لتكثف الرطوبة',
    summaryEn: 'Cargo bound for Arabian Gulf and Mediterranean ports is packed inside fumigated, ISPM-15 heat-treated structural timber crates, wrapped with volatile corrosion inhibitor (VCI) multilayer film and reinforced steel bands.',
    summaryAr: 'تُعبأ الشحنات الموجهة لموانئ الخليج العربي والبحر الأبيض المتوسط داخل صناديق خشبية مدعمة ومعالجة حراريًا وفق معيار ISPM-15، ومغلفة بأغشية VCI المانعة للتآكل مع أربطة صلب مشدودة.',
    standardNorm: 'ISPM 15 / MIL-PRF-22019 / DIN 55473',
    inspectionMetrics: [
      { labelEn: 'Timber Fumigation / Heat Stamp', labelAr: 'ختم المعالجة الحرارية للأخشاب', value: 'HT IPPC Certified', pass: true },
      { labelEn: 'VCI Protection Duration', labelAr: 'مدة حماية غشاء VCI المضاد للصدأ', value: 'Up to 24 Months Seaworthy', pass: true },
      { labelEn: 'Steel Strapping Tension', labelAr: 'قوة شد الأربطة الفولاذية', value: 'High-Tensile Strapped', pass: true },
      { labelEn: 'Desiccant Bags Included', labelAr: 'أكياس امتصاص الرطوبة الصناعية', value: 'DIN 55473 Cl. II Units', pass: true }
    ],
    equipmentEn: 'Automated Heavy Steel Strapping Tool & Heavy-Gauge Heat-Sealing Packaging Machinery',
    equipmentAr: 'أجهزة الشد الهوائي للأربطة الفولاذية وماكينات اللحام الحراري للأغشية الصناعية'
  }
];

interface Props {
  locale: Locale;
}

export function IndustrialMillStandard({ locale }: Props) {
  const isAr = locale === 'ar';
  const [activeTab, setActiveTab] = useState<string>('mtc31');
  const protocol = PROTOCOLS.find((p) => p.id === activeTab) || PROTOCOLS[0];

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-stone-200" aria-labelledby="mill-standard-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded text-amber-900 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>{isAr ? 'بروتوكولات فحص الجودة والمطابقة القياسية' : 'Mill Inspection Protocols & Compliance Standards'}</span>
            </div>
            <h2 id="mill-standard-heading" className="text-2xl sm:text-4xl font-black text-[#12243C] tracking-tight">
              {isAr ? (
                <>ضمان الجودة والتفتيش <span className="text-amber-800">وفق شهادات MTC 3.1</span></>
              ) : (
                <>Mill Inspection Standards & <span className="text-amber-800">EN 10204 3.1 Traceability</span></>
              )}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {isAr
                ? 'فحص كل طن صلب ميكانيكيًا وكيميائيًا قبل خروجه من خطوط الإنتاج. توثيق رقم الصبة واختبارات NDT غير المتلفة والتغليف البحري المقاوم للرطوبة.'
                : 'Every single metric ton is systematically tested for chemical purity, tensile strength, and internal integrity before export crating.'}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
            <span className="px-3 py-1 bg-stone-100 rounded-lg border border-stone-200 font-bold">
              ISO 9001:2015 & EN 10204
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 max-w-full">
          {PROTOCOLS.map((p) => {
            const isSelected = p.id === activeTab;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(p.id)}
                aria-label={`Inspect ${p.badge}`}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#12243C] text-white border-[#12243C] shadow-md'
                    : 'bg-[#F4F6F6] text-stone-700 border-stone-200 hover:border-stone-400 hover:text-[#12243C]'
                }`}
              >
                <span className={`${isSelected ? 'text-amber-400' : 'text-amber-900'} font-black me-2`}>
                  {p.badge}
                </span>
                <span>{isAr ? p.titleAr.split('(')[0].trim() : p.titleEn.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Protocol Details Panel */}
        <div className="bg-[#F4F6F6] border border-stone-300 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-stone-300 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[11px] font-mono font-bold">
                  {protocol.badge}
                </span>
                <span className="text-xs font-mono text-stone-600 font-bold">
                  {protocol.standardNorm}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#12243C]">
                {isAr ? protocol.titleAr : protocol.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 font-mono">
                {isAr ? protocol.subtitleAr : protocol.subtitleEn}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto bg-white px-4 py-2 rounded-xl border border-stone-200 text-xs font-mono">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-stone-800">{isAr ? 'حالة التفتيش:' : 'Inspection Status:'}</span>
              <span className="text-emerald-700 font-black">100% PASS</span>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed max-w-4xl">
            {isAr ? protocol.summaryAr : protocol.summaryEn}
          </p>

          {/* 4 Quantitative Check Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {protocol.inspectionMetrics.map((m, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-stone-600 tracking-wider">
                    {isAr ? m.labelAr : m.labelEn}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-base font-black text-[#12243C] font-mono">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Equipment & Instrumentation Note */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-stone-700">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-800">{isAr ? 'الأجهزة والمعدات المستخدمة:' : 'Calibrated Instrumentation:'}</span>
              <span className="text-stone-800 font-sans">{isAr ? protocol.equipmentAr : protocol.equipmentEn}</span>
            </div>
            <span className="text-stone-600 text-[11px] shrink-0">
              {isAr ? 'معايرة دورية موثقة' : 'NIST / DAkkS Traceable Calibration'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
