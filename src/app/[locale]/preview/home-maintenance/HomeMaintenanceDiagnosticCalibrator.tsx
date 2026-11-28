'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wind,
  Droplets,
  Zap,
  Hammer,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  Sparkles,
  FileText,
  Gauge
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { maintenancePath } from '@/lib/verticals/home-maintenance/data';

interface MaintenanceDiscipline {
  id: string;
  code: string;
  name: { ar: string; en: string };
  badge: { ar: string; en: string };
  summary: { ar: string; en: string };
  typicalTriageMinutes: number;
  safetyCheck: { ar: string; en: string };
  diagnosticTools: Array<{ ar: string; en: string }>;
  commonFaults: Array<{ ar: string; en: string }>;
}

const DISCIPLINES: MaintenanceDiscipline[] = [
  {
    id: 'hvac-ac',
    code: 'HVAC-01',
    name: {
      ar: 'أنظمة التكييف والتبريد المركزي والسبليت',
      en: 'Air Conditioning & Climate Systems'
    },
    badge: {
      ar: 'فحص ميكانيكي وحراري',
      en: 'Mechanical & Thermal Audit'
    },
    summary: {
      ar: 'تشخيص تدفق الهواء عبر المبخر، فحص درجات حرارة التبادل الحراري، واختبار صرف مياه التكثيف والضاغط الخارجي.',
      en: 'Airflow velocity measurement, evaporator delta-T differential check, condensate drain slope, and compressor thermal load evaluation.'
    },
    typicalTriageMinutes: 45,
    safetyCheck: {
      ar: 'فصل القاطع الكهربائي الخاص بالوحدة الخارجية قبل فحص التوصيلات أو خطوط وسيط التبريد',
      en: 'Mandatory disconnect of dedicated condensing unit isolator switch prior to circuit or refrigerant line inspection'
    },
    diagnosticTools: [
      { ar: 'مقياس تدفق الهواء الأنيمومتر (Anemometer)', en: 'Digital vane anemometer for airflow cubic feet per minute' },
      { ar: 'ترمومتر أشعة تحت الحمراء لقياس الفارق الحراري', en: 'Dual-laser infrared pyrometer for coil temperature split' },
      { ar: 'مقياس ضغط مانيفولد لقياس وسيط التبريد', en: 'Digital manifold gauge set for superheat and subcooling' }
    ],
    commonFaults: [
      { ar: 'انسداد فلتر الهواء ومسار صرف التكثيف الداخلي', en: 'Obstructed primary air filters and clogged condensate drain trap' },
      { ar: 'تسريب وسيط التبريد في وصلات الفلير النحاسية', en: 'Micro-leakage at flared copper brass fitting connections' },
      { ar: 'تلف مكثف بدء تشغيل مروحة الوحدة الخارجية (Capacitor)', en: 'Degraded motor run capacitor causing intermittent thermal shutdown' }
    ]
  },
  {
    id: 'plumbing-sanitary',
    code: 'PLUMB-02',
    name: {
      ar: 'السباكة الصحية وشبكات التغذية والصرف',
      en: 'Sanitary Plumbing & Hydraulic Networks'
    },
    badge: {
      ar: 'عزل هيدروليكي وكشف تسريب',
      en: 'Hydraulic Isolation & Acoustic Audit'
    },
    summary: {
      ar: 'فحص ضغط شبكة التغذية وتحديد التسريبات الخفية داخل الجدران وصيانة محابس العزل وصرف الأجهزة.',
      en: 'Hydrostatic pressure decay testing, acoustic/thermal dampness isolation, shutoff valve health, and appliance drainage integrity.'
    },
    typicalTriageMinutes: 50,
    safetyCheck: {
      ar: 'إغلاق المحبس العمومي فورا في حال ملاحظة بلل جداري ملاصق لعلب المفاتيح أو الأفياش الكهربائية',
      en: 'Immediate main valve shutoff if dampness is observed contiguous with wall switchboxes or electrical conduits'
    },
    diagnosticTools: [
      { ar: 'مضخة اختبار الضغط الهيدروليكي (Pressure Tester)', en: 'Hydrostatic pressure testing pump with calibrated analog gauge' },
      { ar: 'مقياس رطوبة الجدران الرقمي غير التخريبي', en: 'Non-destructive pinless wall moisture meter and thermal scanner' },
      { ar: 'كاميرا تفتيش مرنة للمواسير الداخلية (Borescope)', en: 'High-definition articulating endoscope camera for pipe bends' }
    ],
    commonFaults: [
      { ar: 'تآكل جوانات وصمامات محابس الزاوية والخلاطات', en: 'Degraded EPDM rubber gaskets and calcified angle valve seats' },
      { ar: 'انسداد أو انفكاك وصلات صرف المغاسل والغسالات', en: 'Dislodged slip-joint P-traps and obstructed flexible drain hoses' },
      { ar: 'تسريب مستمر من صمام عوامة خزان الطرد (Flapper)', en: 'Silent flush cistern flapper deterioration causing continuous water loss' }
    ]
  },
  {
    id: 'electrical-power',
    code: 'ELEC-03',
    name: {
      ar: 'اللوحات الكهربائية والقواطع ودوائر القوى',
      en: 'Electrical Distribution & Protection Circuits'
    },
    badge: {
      ar: 'سلامة ضد الالتماس والحمل الزائد',
      en: 'Overcurrent & Earth-Fault Protection'
    },
    summary: {
      ar: 'قياس استهلاك التيارات على القواطع الفرعية، اختبار قاطع الحماية من الصعق (ELCB/RCD)، والتأكد من إحكام التوصيلات.',
      en: 'Thermal load distribution across circuit breakers, residual current device (RCD) trip speed verification, and terminal screw torque checks.'
    },
    typicalTriageMinutes: 40,
    safetyCheck: {
      ar: 'يمنع منعا باتا إعادة رفع القاطع الكهربائي المتكرر الفصل دون فحص سبب القصر أو العزل التالف',
      en: 'Strictly prohibited to repeatedly reset a tripped breaker without identifying short-circuit or insulation breakdown'
    },
    diagnosticTools: [
      { ar: 'جهاز ملتميتر وفاحص استمرارية معزول ١٠٠٠ فولت', en: 'True-RMS digital multimeter with CAT III 1000V rated safety probes' },
      { ar: 'فاحص قواطع التسريب الأرضي (RCD Tester)', en: 'RCD digital tripping time and sensitivity calibration instrument' },
      { ar: 'مقياس تيار بالمشبك (Clamp Meter)', en: 'True-RMS AC/DC clamp meter for non-invasive phase load balancing' }
    ],
    commonFaults: [
      { ar: 'ارتخاء مسامير ربط الأسلاك في اللوحة مسببا حرارة موضعية', en: 'Loose terminal screws causing localized resistive heating and arcing' },
      { ar: 'تحميل مفرط على خط كهربائي مشترك بواسطة أجهزة تدفئة', en: 'Excessive branch circuit load caused by concurrent high-draw space heaters' },
      { ar: 'اهتراء عزل الأسلاك داخل المواسير نتيجة رطوبة سابقة', en: 'Degraded wire insulation inside conduits caused by legacy moisture' }
    ]
  },
  {
    id: 'carpentry-joinery',
    code: 'WOOD-04',
    name: {
      ar: 'الأبواب المعمارية والمفصلات والنجارة الدقيقة',
      en: 'Architectural Joinery, Hinges & Doors'
    },
    badge: {
      ar: 'استواء هندسي وضبط خلوص',
      en: 'Alignment Clearance & Structural Fitting'
    },
    summary: {
      ar: 'معايرة هبوط واحتكاك الأبواب الخشبية، صيانة مفصلات الكوالين المعمارية، وضبط الإطارات وحلوق الأخشاب الصلبة.',
      en: 'Solid timber door sagging correction, heavy-duty architectural hinge recalibration, strike plate realigning, and moisture warp relief.'
    },
    typicalTriageMinutes: 35,
    safetyCheck: {
      ar: 'التأكد من خلو محيط الباب من الأطفال والحيوانات الأليفة أثناء فك وتركيب الدرف والألواح الثقيلة',
      en: 'Clear door swing perimeter of children and pets when unhanging heavy solid-core architectural door slabs'
    },
    diagnosticTools: [
      { ar: 'ميزان تسوية ليزري ثنائي المحاور (Laser Level)', en: 'Dual-axis precision cross-line laser for plumb and level frames' },
      { ar: 'فيلر قياس الخلوصات المعمارية (Feeler Gauge)', en: 'Metric feeler gauge verifying uniform 3mm door perimeter clearance' },
      { ar: 'فارة نجارة يدوية يابانية دقيقة التشذيب', en: 'Precision hand smoothing plane for micrometric architectural edge relief' }
    ],
    commonFaults: [
      { ar: 'هبوط الباب نتيجة ارتخاء مسامير المفصلة العلوية في الحلق', en: 'Top hinge screw anchorage fatigue in door jamb causing threshold rub' },
      { ar: 'تمدد الخشب في الأطراف نتيجة امتصاص رطوبة المواسم', en: 'Seasonal timber swelling binding the lock stile against the frame' },
      { ar: 'عدم تطابق لسان الكالون مع فتحة المقابلة في الحلق', en: 'Latch bolt misaligned with strike plate causing hard closing and rattle' }
    ]
  }
];

export function HomeMaintenanceDiagnosticCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [selectedDisciplineId, setSelectedDisciplineId] = useState('hvac-ac');
  const [propertyScale, setPropertyScale] = useState<'apartment' | 'duplex' | 'villa' | 'office'>('apartment');
  const [urgencyTier, setUrgencyTier] = useState<'routine' | 'priority' | 'urgent'>('routine');

  const activeDiscipline =
    DISCIPLINES.find((d) => d.id === selectedDisciplineId) || DISCIPLINES[0];

  // Dynamic calculation
  let calculatedDuration = activeDiscipline.typicalTriageMinutes;
  if (propertyScale === 'duplex') calculatedDuration += 15;
  if (propertyScale === 'villa') calculatedDuration += 30;
  if (propertyScale === 'office') calculatedDuration += 20;

  return (
    <section
      data-sector-specific="maintenance-diagnostic-calibrator"
      className="py-20 sm:py-28 bg-[#0B1726] text-white relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="absolute -start-28 -top-28 w-96 h-96 rounded-full bg-[#174E78]/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute end-0 bottom-0 w-80 h-80 rounded-full bg-[#F7B347]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[#F7B347] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#F7B347]" />
            {ar ? 'معاير الفحص والتشخيص المنزلي' : 'FACILITY DIAGNOSTIC & TRIAGE CALIBRATOR'}
          </p>
          <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
            {ar ? (
              <>
                افهم عطل بيتك صح. <span className="text-[#F7B347]">أجهزة الفحص، معايير السلامة، والوقت المقدر.</span>
              </>
            ) : (
              <>
                Decode Home Faults. <span className="text-[#F7B347]">Diagnostic Tools, Safety Protocols & Triage Scope.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#CBD5E1] text-sm sm:text-base leading-8">
            {ar
              ? 'اختر تخصص الصيانة المطلوب ونوع العقار لتتعرف على أدوات الفحص الهندسية المعتمدة، اشتراطات السلامة الفورية، والأعطال الأكثر شيوعا قبل تقديم طلب المعاينة.'
              : 'Select your maintenance discipline and property scope to calibrate instrument diagnostic requirements, immediate safety checks, and realistic triage duration before requesting an inspection.'}
          </p>
        </div>

        {/* 4 Discipline Tabs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {DISCIPLINES.map((d) => {
            const active = d.id === selectedDisciplineId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDisciplineId(d.id)}
                className={`p-6 text-start rounded-[1.75rem] transition-all border-2 flex flex-col justify-between ${
                  active
                    ? 'bg-[#13253B] border-[#F7B347] shadow-[0_12px_32px_rgba(247,179,71,0.22)]'
                    : 'bg-[#0E1E31]/80 border-[#1B324D] hover:bg-[#152A42] hover:border-[#F7B347]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#F7B347]">
                      {d.code}
                    </span>
                    <span className="text-[10px] font-bold text-[#CBD5E1] bg-[#1A3350] px-2.5 py-1 rounded-full">
                      {d.badge[locale]}
                    </span>
                  </div>
                  <h3 className="font-black text-base text-white mt-4 leading-snug">
                    {d.name[locale]}
                  </h3>
                  <p className="text-xs text-[#CBD5E1] mt-2 line-clamp-2 leading-relaxed">
                    {d.summary[locale]}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#1B324D]/60 flex items-center justify-between text-xs font-mono text-[#CBD5E1]">
                  <span>{ar ? 'مدة الفحص الأساسية:' : 'Base Triage:'}</span>
                  <span className="text-white font-bold">{d.typicalTriageMinutes} {ar ? 'دقيقة' : 'min'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Console Details */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8">
          {/* Controls & Tools Panel */}
          <div className="bg-[#0E1E31] border border-[#1B324D] rounded-3xl p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1B324D]">
                <div>
                  <span className="text-xs font-mono text-[#F7B347] uppercase font-bold">
                    {activeDiscipline.code} · {ar ? 'بروتوكول الفحص المعتمد' : 'VERIFIED AUDIT PROTOCOL'}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {activeDiscipline.name[locale]}
                  </h3>
                </div>
                <Gauge className="text-[#F7B347]" size={32} />
              </div>

              {/* Property Scope & Urgency Controls */}
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#CBD5E1] block font-bold mb-2">
                    {ar ? 'مساحة وطبيعة العقار' : 'Property Footprint'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'apartment', label: { ar: 'شقة سكنية', en: 'Apartment' } },
                      { id: 'duplex', label: { ar: 'دوبلكس', en: 'Duplex' } },
                      { id: 'villa', label: { ar: 'فيلا مستقلة', en: 'Detached Villa' } },
                      { id: 'office', label: { ar: 'مقر إداري', en: 'Office Suite' } }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPropertyScale(p.id as typeof propertyScale)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          propertyScale === p.id
                            ? 'bg-[#F7B347] text-[#0B1726] border-[#F7B347]'
                            : 'bg-[#13253B] text-[#CBD5E1] border-[#1B324D] hover:text-white'
                        }`}
                      >
                        {p.label[locale]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#CBD5E1] block font-bold mb-2">
                    {ar ? 'درجة أولوية العطل' : 'Fault Urgency Tier'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'routine', label: { ar: 'عادي', en: 'Routine' } },
                      { id: 'priority', label: { ar: 'أولوية', en: 'Priority' } },
                      { id: 'urgent', label: { ar: 'عاجل', en: 'Urgent' } }
                    ].map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setUrgencyTier(u.id as typeof urgencyTier)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          urgencyTier === u.id
                            ? 'bg-[#F7B347] text-[#0B1726] border-[#F7B347]'
                            : 'bg-[#13253B] text-[#CBD5E1] border-[#1B324D] hover:text-white'
                        }`}
                      >
                        {u.label[locale]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools Checklist */}
              <div className="mt-8">
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders size={18} className="text-[#F7B347]" />
                  {ar ? 'أجهزة التشخيص والقياس الهندسية المخصصة:' : 'Engineering Diagnostic Hardware Employed:'}
                </h4>
                <div className="space-y-3 mt-4">
                  {activeDiscipline.diagnosticTools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="bg-[#13253B] border border-[#1B324D] rounded-2xl p-4 flex items-start gap-3"
                    >
                      <CheckCircle2 size={18} className="text-[#F7B347] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                        {tool[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Immediate Safety Warning */}
            <div className="mt-8 pt-6 border-t border-[#1B324D]">
              <div className="bg-[#FEF3C7] border-s-4 border-[#B45309] rounded-r-xl p-4 text-[#78350F] flex items-start gap-3 text-xs leading-6">
                <AlertTriangle size={20} className="text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">
                    {ar ? 'إجراء السلامة الفوري الإلزامي:' : 'Mandatory Immediate Safety Precaution:'}
                  </strong>
                  <span>{activeDiscipline.safetyCheck[locale]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calibrated Triage Summary & Action */}
          <div className="bg-[#13253B] border border-[#F7B347]/40 rounded-3xl p-6 sm:p-9 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1B324D]">
                <span className="text-xs font-mono font-bold text-[#F7B347] uppercase tracking-wider">
                  {ar ? 'تقدير وقت الفحص والمشاهدات' : 'CALIBRATED ASSESSMENT OUTPUT'}
                </span>
                <Clock className="text-[#F7B347]" size={24} />
              </div>

              {/* Large Metric Display */}
              <div className="mt-6 bg-[#0B1726] border border-[#1B324D] rounded-2xl p-6 text-center">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#CBD5E1] font-bold block">
                  {ar ? 'الوقت الموصى به للمعاينة الهندسية الدقيقة' : 'CALIBRATED INSTRUMENT AUDIT DURATION'}
                </span>
                <div className="text-5xl sm:text-6xl font-black text-white mt-3 font-mono">
                  {calculatedDuration} <span className="text-2xl text-[#F7B347] font-sans">{ar ? 'دقيقة' : 'MIN'}</span>
                </div>
                <p className="text-xs text-[#CBD5E1] mt-2">
                  {ar
                    ? 'يشمل الفحص البصري، القياسات الرقمية، وتدوين نطاق الأعمال المطلوب'
                    : 'Encompasses visual triage, digital instrumentation audit, and itemized work scope'}
                </p>
              </div>

              {/* Common Root Causes */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#CBD5E1] font-bold">
                  {ar ? 'أبرز الأسباب الجذرية المحتملة للعطل:' : 'Probable Root Causes Investigated:'}
                </h4>
                <div className="space-y-2 mt-3">
                  {activeDiscipline.commonFaults.map((f, i) => (
                    <div
                      key={i}
                      className="bg-[#0E1E31] border border-[#1B324D] px-4 py-3 rounded-xl text-xs text-[#CBD5E1] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F7B347]" />
                      <span>{f[locale]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA & Caveat */}
            <div className="mt-8 pt-6 border-t border-[#1B324D]">
              <Link
                href={maintenancePath(locale, 'book') + `?service=${activeDiscipline.id}`}
                className="w-full bg-[#F7B347] text-[#0B1726] font-black text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FFC966] transition-colors"
              >
                <span>{ar ? 'طلب معاينة مهندس فني' : 'REQUEST TECHNICAL INSPECTION'}</span>
                <Arrow size={18} />
              </Link>
              <div className="mt-4 flex items-start gap-2 text-xs text-[#CBD5E1] leading-relaxed">
                <ShieldCheck size={16} className="text-[#F7B347] shrink-0 mt-0.5" />
                <span>
                  {ar
                    ? 'تنبيه: هذا المعاير للتثقيف وتنسيق نطاق العمل فقط؛ الفحص الميداني الفعلي يحدد الأسباب والقطع اللازمة بموافقة خطية.'
                    : 'Educational scope calibrator only. Actual physical diagnosis requires on-site technician evaluation and written authorization.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
