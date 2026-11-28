'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Gauge,
  Activity,
  Disc3,
  Wrench,
  Cpu,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Sparkles,
  FileSearch
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { autoPath } from '@/lib/verticals/auto-service/data';

interface SymptomTrack {
  id: string;
  name: { ar: string; en: string };
  code: string;
  badge: { ar: string; en: string };
  summary: { ar: string; en: string };
  primaryMethodology: { ar: string; en: string };
  baselineTriageMinutes: number;
  physicalChecks: Array<{ ar: string; en: string }>;
  diagnosticQuestions: Array<{ ar: string; en: string }>;
}

const SYMPTOM_TRACKS: SymptomTrack[] = [
  {
    id: 'powertrain',
    code: 'PWR-01',
    name: {
      ar: 'منظومة المحرك وناقل الحركة',
      en: 'Powertrain & Engine Dynamics'
    },
    badge: {
      ar: 'فحص إلكتروني وميكانيكي',
      en: 'Electronic & Mechanical Triage'
    },
    summary: {
      ar: 'تشخيص اهتزازات المحرك، تفاوت ضغط الزيت، لمبة Check Engine، وفقدان العزم تحت التسارع.',
      en: 'Diagnosis of idle rough running, oil pressure variations, Check Engine codes, and acceleration power lag.'
    },
    primaryMethodology: {
      ar: 'قراءة تدفق البيانات الحية (Live OBD Stream) + قياس ضغط الأسطوانات ومراجعة كفاءة حساس الأكسجين',
      en: 'Live OBD-II telemetry streaming + cylinder compression test and upstream O2 sensor curve verification'
    },
    baselineTriageMinutes: 50,
    physicalChecks: [
      {
        ar: 'فحص ميكانيكي لسيور التوقيت ومستوى وتناغم زيت المحرك قبل مسح أي كود',
        en: 'Physical check of drive/timing belt condition, fluid consistency, and oil level before clearing codes'
      },
      {
        ar: 'اختبار تسريب الفاكيوم ورشاشات الوقود لتحديد سبب احتراق الخليط الفقير',
        en: 'Intake manifold vacuum leak smoke test and fuel trim evaluation to diagnose lean burn conditions'
      },
      {
        ar: 'قياس حرارة المحرك الفعلية بمقياس حراري معتمد لمطابقتها مع قراءة الحساس',
        en: 'Direct pyrometer temperature verification against engine coolant temperature sensor data'
      }
    ],
    diagnosticQuestions: [
      {
        ar: 'هل العطل يظهر عند بدء التشغيل على البارد فقط أم بعد وصول المحرك لحرارة التشغيل؟',
        en: 'Does the symptom occur solely on cold starts or after reaching full operating temperature?'
      },
      {
        ar: 'هل تمت تجربة تغيير نوع الزيت أو استخدام إضافات وقود في آخر ٥,٠٠٠ كم؟',
        en: 'Were non-OEM oil grades or aftermarket fuel additives introduced within the last 5,000 km?'
      }
    ]
  },
  {
    id: 'braking',
    code: 'BRK-02',
    name: {
      ar: 'منظومة الفرامل والثبات الهيدروليكي',
      en: 'Brake Hydraulics & Friction Stability'
    },
    badge: {
      ar: 'فحص سلامة حرج',
      en: 'Critical Safety Inspection'
    },
    summary: {
      ar: 'تقييم أصوات الصرير، ارتعاش بدال الفرامل، انخفاض استجابة الهيدروليك، وعمل وحدة ABS.',
      en: 'Evaluation of high-frequency squeal, pedal pulsation under deceleration, hydraulic sponginess, and ABS triggers.'
    },
    primaryMethodology: {
      ar: 'قياس استواء وسماكة أقراص الفرامل بالميكروميتر + فحص نقطة غليان سائل الفرامل هيدروليكيًا',
      en: 'Precision dial-gauge rotor runout measurement + hydraulic brake fluid boiling point analysis'
    },
    baselineTriageMinutes: 40,
    physicalChecks: [
      {
        ar: 'قياس سمك تيل الفرامل بالأجهزة الدقيقة لمقارنته بالحد الأدنى المسموح من الشركة المصنعة',
        en: 'Micrometer brake pad thickness verification against manufacturer minimum safety thresholds'
      },
      {
        ar: 'فحص حركة بساتم الكاليبر وتزييت بنوز التوجيه لمنع التآكل غير المتساوي',
        en: 'Caliper piston retraction check and guide pin lubrication to prevent asymmetric taper wear'
      },
      {
        ar: 'اختبار سلامة خراطيم الضغط العالي للتأكد من خلوها من أي انتفاخات أو تشققات حرارية',
        en: 'High-pressure flexible brake line inspection for thermal micro-cracking or internal swelling'
      }
    ],
    diagnosticQuestions: [
      {
        ar: 'هل الاهتزاز يظهر في عجلة القيادة نفسها أم في مقعد السائق والبدال؟',
        en: 'Is pulsation felt primarily in the steering wheel rim or through the pedal and chassis floor?'
      },
      {
        ar: 'متى تم استبدال سائل الفرامل بالكامل آخر مرة وفق دورة الصيانة السنوية؟',
        en: 'When was a complete hygroscopic brake fluid flush last performed to OEM DOT specification?'
      }
    ]
  },
  {
    id: 'chassis',
    code: 'CHS-03',
    name: {
      ar: 'العفشة والتوجيه ومحاذاة الزوايا',
      en: 'Suspension, Steering & Alignment'
    },
    badge: {
      ar: 'فحص ديناميكي تحت التحميل',
      en: 'Under-Load Dynamic Check'
    },
    summary: {
      ar: 'معالجة أصوات الخبط فوق المطبات، انحراف السيارة، تآكل الإطارات الشاذ، وضعف امتصاص الصدمات.',
      en: 'Remediation of clunks over road irregularities, directional drift, asymmetric tire wear, and strut damping loss.'
    },
    primaryMethodology: {
      ar: 'فحص الهيكل على رافعة هيدروليكية تحت التحميل الفعلي + محاكاة خلوص الجلب والمفصلات',
      en: 'Under-chassis hydraulic lift inspection under true curb weight + pry-bar joint deflection clearance audit'
    },
    baselineTriageMinutes: 45,
    physicalChecks: [
      {
        ar: 'معاينة المساعدين لاكتشاف تسريب الزيت الهيدروليكي أو تلف المصدات المطاطية',
        en: 'Shock absorber inspection for fluid misting, seal degradation, and bump-stop disintegration'
      },
      {
        ar: 'فحص جلب المقصات والموازين للتأكد من عدم وجود تشققات أو خلوص زائد يؤثر على التوجيه',
        en: 'Control arm bushing and sway bar link examination for vulcanized rubber tear or excessive play'
      },
      {
        ar: 'فحص نهايات أذرع الدريكسيون وبلي العجل للتأكد من ثبات زوايا الكاستر والكامبر',
        en: 'Tie rod end ball joint and wheel hub bearing testing to confirm caster/camber geometric stability'
      }
    ],
    diagnosticQuestions: [
      {
        ar: 'هل الصوت يظهر مع لف الدريكسيون أم فقط عند عبور المطبات السريعة؟',
        en: 'Does knocking occur when turning the steering lock-to-lock or strictly over abrupt speed humps?'
      },
      {
        ar: 'هل تعرضت السيارة لاصطدام برصيف أو حفرة غير متوقعة قبل ظهور الانحراف؟',
        en: 'Was the vehicle subjected to a curb impact or sharp road pothole prior to noticing vehicle pull?'
      }
    ]
  },
  {
    id: 'electrical',
    code: 'ELC-04',
    name: {
      ar: 'المنظومة الكهربائية والحرارية وتكييف المقصورة',
      en: 'Electrical, Climate Control & Thermal'
    },
    badge: {
      ar: 'تحليل التيار والجهد',
      en: 'Current & Thermal Telemetry'
    },
    summary: {
      ar: 'حل مشكلات ضعف التبريد، تفريغ البطارية أثناء التوقف، صعوبة الدوران، وتذبذب الفولتية.',
      en: 'Resolution of poor AC cooling capacity, parasitic battery drain, sluggish cranking, and voltage ripple.'
    },
    primaryMethodology: {
      ar: 'فحص جهد الشحن بالأوسيلوسكوب + قياس هبوط الجهد على الكابلات واختبار سحب الأمبير الساكن',
      en: 'Oscilloscope alternator ripple testing + voltage drop testing on main grounds and parasitic milliamp drain audit'
    },
    baselineTriageMinutes: 55,
    physicalChecks: [
      {
        ar: 'اختبار التوصيلية الكهربائية لأطراف البطارية وكابلات التأريض لتقليل المقاومة الداخلية',
        en: 'Conductance testing of battery terminals and engine grounding straps to eliminate parasitic resistance'
      },
      {
        ar: 'قياس ضغوط سائل تبريد التكييف (الجانب العالي والمنخفض) بمجموعة ساعات قياس معايرة',
        en: 'Calibrated manifold gauge verification of AC high/low pressures before recommending refrigerant top-up'
      },
      {
        ar: 'فحص كفاءة مراوح تبريد الردياتير ومرحلات السرعات المتغيرة تحت حرارة الصيف القصوى',
        en: 'Radiator cooling fan stage relay cycling audit under peak ambient temperature load conditions'
      }
    ],
    diagnosticQuestions: [
      {
        ar: 'هل تبريد التكييف يضعف أثناء الوقوف في الإشارات ويعود للعمل مع زيادة السرعة؟',
        en: 'Does cabin cooling diminish when idling at traffic stops and recover at sustained cruising speeds?'
      },
      {
        ar: 'هل تم تركيب أي ملحقات إلكترونية غير أصلية (كاميرات، أجهزة تتبع، شاشات) مؤخرًا؟',
        en: 'Were any aftermarket electronic accessories (dashcams, GPS trackers, amplifiers) wired in recently?'
      }
    ]
  }
];

export function AutoServiceDiagnosticCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [selectedTrackId, setSelectedTrackId] = useState('powertrain');
  const [mileageTier, setMileageTier] = useState('mid'); // 'low', 'mid', 'high'
  const [exposureLevel, setExposureLevel] = useState('urban'); // 'urban', 'highway', 'severe'

  const activeTrack =
    SYMPTOM_TRACKS.find((t) => t.id === selectedTrackId) || SYMPTOM_TRACKS[0];

  // Duration modifier calculations
  let durationMultiplier = 1.0;
  if (mileageTier === 'high') durationMultiplier += 0.25;
  if (exposureLevel === 'severe') durationMultiplier += 0.2;

  const estimatedMinutes = Math.round(
    activeTrack.baselineTriageMinutes * durationMultiplier
  );

  return (
    <section
      data-sector-specific="auto-diagnostic-calibrator"
      className="py-20 sm:py-28 bg-[#0F141C] text-white relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="absolute -start-28 -top-28 w-96 h-96 rounded-full bg-[#F95721]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute end-0 bottom-0 w-80 h-80 rounded-full bg-[#2A3649]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[#F95721] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#F95721]" />
            {ar ? 'معاير التقييم التشخيصي' : 'DIAGNOSTIC TRIAGE CALIBRATOR'}
          </p>
          <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
            {ar ? (
              <>
                افهم إشارات السيارة. <span className="text-[#F95721]">قبل تغيير أي قطعة.</span>
              </>
            ) : (
              <>
                Decode The Vehicle Signal. <span className="text-[#F95721]">Before Replacing Parts.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#E2E8F0] text-sm sm:text-base leading-8">
            {ar
              ? 'اختر المنظومة التي تظهر بها الأعراض لتتعرف على المنهجية التشخيصية الموصى بها، ووقت الفحص التقديري، وقائمة الاختبارات الميكانيكية التي يجب إجراؤها قبل اعتماد أي إصلاح.'
              : 'Select your vehicle concern category to calibrate recommended diagnostic procedures, shop inspection windows, and mandatory physical verification checks before authorizing repairs.'}
          </p>
        </div>

        {/* 4 Diagnostic Track Selector Tabs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {SYMPTOM_TRACKS.map((track) => {
            const active = track.id === selectedTrackId;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`p-6 text-start rounded-[1.75rem] transition-all border-2 flex flex-col justify-between ${
                  active
                    ? 'bg-[#171E29] border-[#F95721] shadow-[0_12px_32px_rgba(249,87,33,0.22)]'
                    : 'bg-[#121822]/80 border-[#2A3649] hover:bg-[#1A2230] hover:border-[#F95721]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#F95721]">
                      {track.code}
                    </span>
                    <span className="text-[10px] font-bold text-[#CBD5E1] bg-[#1E2736] px-2.5 py-1 rounded-full">
                      {track.badge[locale]}
                    </span>
                  </div>
                  <h3 className="font-black text-base text-white mt-4 leading-snug">
                    {track.name[locale]}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">
                    {track.summary[locale]}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#2A3649]/60 flex items-center justify-between text-xs font-mono text-[#CBD5E1]">
                  <span>{ar ? 'فحص تقديري:' : 'Est. Triage:'}</span>
                  <span className="text-white font-bold">{track.baselineTriageMinutes} min</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Calibrator Console */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr_.9fr] gap-8">
          {/* Controls & Physical Check Methodology */}
          <div className="bg-[#171E29] border border-[#2A3649] p-6 sm:p-8 rounded-[2rem] space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2A3649]">
              <Sliders size={20} className="text-[#F95721]" />
              <h4 className="font-bold text-lg text-white">
                {ar ? 'معايير التشغيل وظروف الاستخدام' : 'Operating Environment & Mileage Variables'}
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="calibrator-mileage"
                  className="block text-xs font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {ar ? 'المسافة المقطوعة (عداد السيارة)' : 'Odometer Mileage Bracket'}
                </label>
                <select
                  id="calibrator-mileage"
                  aria-label={ar ? 'المسافة المقطوعة (عداد السيارة)' : 'Odometer Mileage Bracket'}
                  value={mileageTier}
                  onChange={(e) => setMileageTier(e.target.value)}
                  className="w-full bg-[#0F141C] border border-[#37475E] text-white p-3.5 text-sm rounded-xl focus-visible:outline-2 focus-visible:outline-[#F95721]"
                >
                  <option value="low">{ar ? 'أقل من ٥٠,٠٠٠ كم (معدل استهلاك قياسي)' : 'Under 50,000 km (Factory baseline)'}</option>
                  <option value="mid">{ar ? '٥٠,٠٠٠ – ١٢٠,٠٠٠ كم (فترة الصيانة الحيوية)' : '50,000 – 120,000 km (Mid-cycle maintenance)'}</option>
                  <option value="high">{ar ? 'أكثر من ١٢٠,٠٠٠ كم (فحص شامل للأجزاء الحركية)' : '120,000+ km (High-mileage component review)'}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calibrator-exposure"
                  className="block text-xs font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {ar ? 'طبيعة الاستخدام اليومي' : 'Driving Exposure Profile'}
                </label>
                <select
                  id="calibrator-exposure"
                  aria-label={ar ? 'طبيعة الاستخدام اليومي' : 'Driving Exposure Profile'}
                  value={exposureLevel}
                  onChange={(e) => setExposureLevel(e.target.value)}
                  className="w-full bg-[#0F141C] border border-[#37475E] text-white p-3.5 text-sm rounded-xl focus-visible:outline-2 focus-visible:outline-[#F95721]"
                >
                  <option value="urban">{ar ? 'مدن وتوقف متكرر / حرارة صيفية' : 'Urban Stop-and-Go / Summer Traffic'}</option>
                  <option value="highway">{ar ? 'سفر مسافات طويلة وسرعات ثابتة' : 'Highway Commuting & Long-Distance'}</option>
                  <option value="severe">{ar ? 'طرق وعرة / أحمال وسحب ثقيل' : 'Rough Surfaces / Heavy Towing Load'}</option>
                </select>
              </div>
            </div>

            {/* Recommended Technical Methodology */}
            <div className="bg-[#0F141C] p-5 rounded-2xl border border-[#2A3649]">
              <div className="flex items-center gap-2">
                <FileSearch size={16} className="text-[#F95721]" />
                <p className="text-xs uppercase font-mono tracking-widest text-[#F95721] font-bold">
                  {ar ? 'المنهجية الفنية الموصى بها للفحص' : 'RECOMMENDED TECHNICAL METHODOLOGY'}
                </p>
              </div>
              <p className="mt-2.5 text-sm text-[#E2E8F0] leading-relaxed">
                {activeTrack.primaryMethodology[locale]}
              </p>
            </div>

            {/* Physical Check List */}
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                {ar ? 'اختبارات فيزيائية ملزمة قبل اتخاذ قرار الاستبدال' : 'Mandatory Physical Checks Before Replacing Parts'}
              </p>
              <ul className="space-y-2.5">
                {activeTrack.physicalChecks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#E2E8F0]">
                    <CheckCircle2 size={16} className="text-[#F95721] shrink-0 mt-0.5" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Diagnostic Blueprint & Questions Console */}
          <div className="bg-[#121822] border border-[#2A3649] p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2A3649]">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#94A3B8] font-bold block">
                    {ar ? 'المؤشرات التشخيصية المعتمدة' : 'DIAGNOSTIC BENCHMARKS'}
                  </span>
                  <h4 className="font-black text-xl text-white mt-1">
                    {activeTrack.name[locale]}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1A2230] border border-[#37475E] flex items-center justify-center text-[#F95721]">
                  <Wrench size={22} />
                </div>
              </div>

              {/* Triage Stats Display */}
              <div className="my-6 grid grid-cols-2 gap-4">
                <div className="bg-[#0F141C] p-5 rounded-2xl border border-[#2A3649] text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                    {ar ? 'زمن التقييم المبدئي' : 'Triage Window'}
                  </p>
                  <p className="text-3xl font-black text-[#F95721] mt-2 font-mono">
                    {estimatedMinutes}{' '}
                    <span className="text-sm font-normal text-white">{ar ? 'دقيقة' : 'min'}</span>
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    {ar ? 'فحص ميكانيكي وحاسوبي' : 'Physical + OBD check'}
                  </p>
                </div>
                <div className="bg-[#0F141C] p-5 rounded-2xl border border-[#2A3649] text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                    {ar ? 'معيار التحقق' : 'Integrity Standard'}
                  </p>
                  <p className="text-2xl font-black text-white mt-2 font-mono">
                    {ar ? 'قياس فعلي' : 'Physical'}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    {ar ? 'بدون تخمين قطع' : 'No guessed parts'}
                  </p>
                </div>
              </div>

              {/* Triage Preparation Questions */}
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  {ar ? 'أسئلة مهمة اطرحها على الفني عند الاستقبال' : 'Key Questions for the Service Advisor'}
                </p>
                <div className="space-y-3">
                  {activeTrack.diagnosticQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-[#0F141C] border border-[#2A3649] rounded-xl flex items-start gap-3 text-xs text-[#E2E8F0] leading-relaxed"
                    >
                      <Sparkles size={16} className="text-[#F95721] shrink-0 mt-0.5" />
                      <span>{q[locale]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA and Disclaimer */}
            <div className="mt-8 pt-6 border-t border-[#2A3649]">
              <Link
                href={autoPath(locale, 'booking')}
                className="w-full py-4 px-6 bg-[#F95721] text-black font-black text-sm rounded-xl inline-flex items-center justify-center gap-3 hover:bg-[#FF7A45] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>{ar ? 'ابدأ طلب فحص منظم لسيارتك' : 'Initiate Structured Inspection Request'}</span>
                <Arrow size={18} />
              </Link>

              {/* Strict Non-Binding Educational Notice */}
              <div className="mt-4 flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                <AlertTriangle size={15} className="text-[#F95721] shrink-0 mt-0.5" />
                <span>
                  {ar
                    ? 'أداة تثقيفية لتوضيح خطوات الفحص المنهجي؛ الموقع تجربة تصميمية من مافكس ولا يمثل مركز صيانة مشغّل أو يقدم تشخيصًا عن بعد.'
                    : 'Educational exploratory tool illustrating diagnostic workflow; this is a Mavvix website showcase and does not operate an active workshop or provide remote diagnostics.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
