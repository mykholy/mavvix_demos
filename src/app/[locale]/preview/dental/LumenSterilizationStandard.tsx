'use client';

import React, { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Wind,
  Droplets,
  Layers,
  Zap,
  VolumeX
} from 'lucide-react';

interface SterilizationStandard {
  id: string;
  code: string;
  norm: string;
  metric: string;
  metricValue: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  safeguardsEn: string[];
  safeguardsAr: string[];
}

const STERILIZATION_STANDARDS: SterilizationStandard[] = [
  {
    id: 'autoclave',
    code: 'CLASS-B',
    norm: 'EN 13060 European Standard',
    metric: 'Cycle Temperature & Pressure',
    metricValue: '134°C @ 2.1 bar (3 Vacuum Pulses)',
    titleEn: 'Fractionated Pre-Vacuum Class B Autoclave',
    titleAr: 'التعقيم البخاري الكسري الفراغي من الفئة ب',
    descriptionEn: 'The highest medical sterilization standard for dental instruments, penetrating hollow handpieces and micro-cannulas to ensure total elimination of viral and bacterial spores.',
    descriptionAr: 'أعلى معايير التعقيم الطبي للأدوات الجراحية والتوربينات المجوفة عبر ثلاث نبضات تفريغ هوائي تضمن القضاء التام على الفيروسات والأبواغ البكتيرية بنسبة 100%.',
    safeguardsEn: ['Independent Electronic Data Log per Batch', 'Chemical Type 5 Integrating Indicators', 'Daily Bowie-Dick Vacuum Leak Test', 'Barcoded Hermetic Pouches with Expiry Tracking'],
    safeguardsAr: ['سجل إلكتروني مستقل لكل دورة تعقيم', 'مؤشرات كيميائية من الفئة 5 للتحقق اللوني', 'فحص بوي ديك اليومي لاختبار كفاءة سحب الهواء', 'أكياس محكمة التغليف بباركود وتاريخ انتهاء موثق']
  },
  {
    id: 'air-filtration',
    code: 'HEPA-14',
    norm: 'ISO 14644 Cleanroom Class 8',
    metric: 'Air Exchange & Filtration',
    metricValue: '12 Air Changes/Hour @ 99.995%',
    titleEn: 'Continuous Medical Cleanroom Air Scrubbing',
    titleAr: 'تنقية الهواء السريري المتواصلة بمرشحات هيبا 14',
    descriptionEn: 'Hospital-grade laminar ventilation exchanging operatory volume every 5 minutes. Captures ultrafine sub-micron aerosols and particulate matter.',
    descriptionAr: 'منظومة تهوية طبية تجدد هواء العيادة بالكامل كل 5 دقائق عبر فلاتر هيبا 14 الطبية، لمنع انتشار الرذاذ الجوي والميكروبات الدقيقة في كافة الأرجاء.',
    safeguardsEn: ['Continuous Air Exchange during Procedures', 'Plasma Negative Ion Sterilization Cell', 'UV-C Germicidal In-Duct Irradiation', 'Independent Operatory Pressure Balancing'],
    safeguardsAr: ['تجديد مستمر للهواء أثناء الجلسات العلاجية', 'خلايا تأيين بلازمية معادلة للملوثات', 'تعقيم داخلي بالأشعة فوق البنفسجية UV-C', 'موازنة ضغط هواء مستقلة لكل غرفة علاجية']
  },
  {
    id: 'waterlines',
    code: 'AQUASAFE',
    norm: 'CDC Dental Infection Guidelines',
    metric: 'Microbial Colony Count',
    metricValue: '< 10 CFU/ml (Safe Drinking is 500)',
    titleEn: 'Closed-Loop Sterile Reverse Osmosis Waterlines',
    titleAr: 'شبكة مياه معقمة ومغلقة بالتناضح العكسي',
    descriptionEn: 'All dental unit handpieces, ultrasonic scalers, and spray syringes utilize bottled sterile reverse-osmosis water with continuous automated micro-filtration.',
    descriptionAr: 'تغذية كافة مقابض التبريد ورذاذ الماء المعقم بمياه نقية مفلترة بنظام التناضح العكسي، لمنع تكون الغشاء الحيوي (Biofilm) في الأنابيب الداخلية تمامًا.',
    safeguardsEn: ['Closed-Loop Dedicated Bottled Source', 'Daily End-of-Day Line Purge with Ozone', 'Zero Municipal Waterline Cross-Connection', 'Quarterly Independent Laboratory Bio-Testing'],
    safeguardsAr: ['زجاجات مياه معقمة مستقلة لكل وحدة علاجية', 'تطهير يومي مسائي للأنابيب بغاز الأوزون', 'فصل تام عن شبكة المياه البلدية العامة', 'فحص بيولوجي معملي دوري كل ثلاثة أشهر']
  },
  {
    id: 'barrier-wraps',
    code: 'BARRIER-100',
    norm: 'OSHA Bloodborne Pathogens Standard',
    metric: 'Surface Protection Protocol',
    metricValue: '100% Single-Use Contact Sleeves',
    titleEn: 'Hermetic Disposable Protective Barrier Wraps',
    titleAr: 'أغلفة الحماية الحاجزة العازلة أحادية الاستخدام',
    descriptionEn: 'Touch points including light handles, operatory control panels, and tube hoses are sheathed in medical-grade disposable protective wraps replaced between each patient.',
    descriptionAr: 'تغليف كافة أسطح اللمس الحيوية ومقابض الإضاءة وشاشات التحكم بأغلفة طبية عازلة تُستبدل وتُعقم الأسطح بمطهرات مستشفيات بعد كل مريض دون استثناء.',
    safeguardsEn: ['New Barrier Applied in Front of Patient', 'EPA-Registered Hospital Disinfectant Wipes', 'Strict Clean vs Dirty Dental Tray Workflow', 'Color-Coded Clinical Zones'],
    safeguardsAr: ['وضع الأغلفة الجديدة مباشرة أمام المريض قبل البدء', 'مسح الأسطح بمطهرات مشافي معتمدة من EPA', 'فصل صارم بين مسار الأدوات المعقمة والمستعملة', 'ترميز لوني واضح للمناطق النظيفة والملوثة']
  },
  {
    id: 'radiology',
    code: 'GREEN-CBCT',
    norm: 'ALARA Radiation Safety Principle',
    metric: 'Patient Dose Reduction',
    metricValue: '78% Less Radiation vs Standard CT',
    titleEn: 'Ultra-Low Dose 3D CBCT Panoramic Imaging',
    titleAr: 'التصوير البانورامي والمقطعي ثلاثي الأبعاد منخفض الإشعاع',
    descriptionEn: 'Advanced pulsed sensor technology captures high-resolution 3D diagnostic volumes of bone, nerves, and roots in under 7.9 seconds at a fraction of standard radiation dosage.',
    descriptionAr: 'حساسات تصوير نبضية ذكية تلتقط مقاطع ثلاثية الأبعاد فائقة الدقة لجذور الأسنان والأعصاب وعظام الفك خلال 7.9 ثوانٍ فقط بأقل جرعة إشعاعية ممكنة.',
    safeguardsEn: ['Collimated Pediatric & Adult Dose Profiles', 'Thyroid & Lead Collar Shielding Included', 'Instant DICOM Digital File Export for Patient', 'Zero Chemical Developer Solutions (Eco-Friendly)'],
    safeguardsAr: ['أنماط جرعات مخفضة مخصصة للأطفال والبالغين', 'سترات واقية معتمدة لحماية الغدة الدرقية والجسم', 'تصدير رقمي فوري لملفات الأشعة للمريض', 'أجهزة رقمية 100% خالية من أحماض ومواد التحميض']
  },
  {
    id: 'whisper-tools',
    code: 'QUIET-MOTOR',
    norm: 'Acoustic Comfort ISO 7779',
    metric: 'Operatory Noise Level',
    metricValue: '< 58 dB (Library Whisper Range)',
    titleEn: 'Whisper-Quiet Brushless Electric Handpieces',
    titleAr: 'توربينات كهربائية هادئة بدون فرش تمنع القلق',
    descriptionEn: 'Modern high-torque electric micro-motors that eliminate the high-pitched shrill vibration of old pneumatic air drills, ensuring a relaxed and peaceful patient experience.',
    descriptionAr: 'محركات كهربائية حديثة عالية العزم تلغي تمامًا صوت الاهتزاز والصفير الحاد المعتاد في الحفارات الهوائية القديمة، لراحة سمعية واسترخاء تام أثناء الجلسة.',
    safeguardsEn: ['Zero Vibration Micro-Concentric Bearings', 'Quintuple Integrated Water Spray Cooling', 'Optic Fiber Shadowless LED Illumination', 'Titanium Body with Satin Antislip Grip'],
    safeguardsAr: ['رولمان بلي متطابق ميكرونيًا لتقليل الاهتزاز', 'خمسة منافذ رذاذ مائي متكاملة للتبريد الفعال', 'إضاءة ليد ألياف بصرية تلغي الظلال تمامًا', 'هيكل تيتانيوم مريح مطلي بطبقة ساتان مانعة للانزلاق']
  }
];

export default function LumenSterilizationStandard({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [activeId, setActiveId] = useState<string>(STERILIZATION_STANDARDS[0].id);
  const activeStandard = STERILIZATION_STANDARDS.find((s) => s.id === activeId) || STERILIZATION_STANDARDS[0];

  return (
    <div className="bg-[#EDF5F2] rounded-3xl p-6 sm:p-10 border border-[#CBDCD5] shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#CBDCD5]">
        <div>
          <span className="text-xs font-mono font-bold text-[#193A39] uppercase tracking-widest block mb-1">
            CLINICAL HYGIENE & ASEPTIC ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#193A39] tracking-tight">
            {isAr ? 'معايير التعقيم والجودة السريرية الأوروبية' : 'Hospital-Grade Sterilization & Hygiene Standards'}
          </h2>
          <p className="text-[#3D5C58] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'التعقيم في لومِن ليس مجرد روتين، بل هندسة طبية تعتمد معايير الفئة ب الأوروبية EN 13060 لمنع العدوى العرضية وحماية كل مريض.'
              : 'Sterilization at Lumen is structured clinical engineering complying with European EN 13060 Class B protocols and hospital-grade air purification.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#CBDCD5] text-xs font-mono text-[#193A39] font-bold">
          <Award className="w-4 h-4 text-[#193A39]" />
          <span>EN 13060 • ISO 14644 • CDC DENTAL SAFE</span>
        </div>
      </div>

      {/* Grid of Hygiene Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STERILIZATION_STANDARDS.map((item) => {
          const isSelected = item.id === activeStandard.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#193A39] text-white border-[#193A39] shadow-lg ring-1 ring-teal-700/50'
                  : 'bg-white text-[#193A39] border-[#CBDCD5] hover:border-[#193A39] hover:bg-[#F8FCFA]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    isSelected ? 'bg-white/10 text-teal-200' : 'bg-[#E4EFEA] text-[#193A39]'
                  }`}>
                    {item.code}
                  </span>
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-[#3D5C58]'}`}>
                    {item.metricValue.split('@')[0]}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base leading-snug">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>

                <p className={`text-xs leading-relaxed line-clamp-3 ${isSelected ? 'text-stone-200' : 'text-[#3D5C58]'}`}>
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-current/15 flex items-center justify-between text-[11px] font-mono">
                <span className={isSelected ? 'text-teal-200' : 'text-[#3D5C58]'}>{item.norm}</span>
                <span className="font-bold underline">{isAr ? 'عرض الضمانات' : 'Inspect'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Detailed Safeguards Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#CBDCD5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#CBDCD5]">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-[#193A39] tracking-widest block">
              DETAILED CLINICAL ASSURANCE // {activeStandard.code}
            </span>
            <h4 className="text-xl font-serif font-bold text-[#193A39] mt-0.5">
              {isAr ? activeStandard.titleAr : activeStandard.titleEn}
            </h4>
          </div>

          <div className="text-start sm:text-end">
            <span className="text-[10px] font-mono text-[#3D5C58] block">{activeStandard.metric}</span>
            <span className="text-xs font-bold font-mono text-[#193A39] bg-[#EDF5F2] px-2.5 py-1 rounded-md border border-[#CBDCD5] inline-block mt-0.5">
              {activeStandard.metricValue}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#3D5C58] leading-relaxed">
          {isAr ? activeStandard.descriptionAr : activeStandard.descriptionEn}
        </p>

        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold text-[#193A39] font-mono uppercase tracking-wider block">
            {isAr ? 'ضمانات التحقق السريري اليومية:' : 'Verified Daily Clinical Safeguards:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#3D5C58]">
            {(isAr ? activeStandard.safeguardsAr : activeStandard.safeguardsEn).map((g, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#EDF5F2] p-2.5 rounded-xl border border-[#CBDCD5]">
                <ShieldCheck className="w-4 h-4 text-[#193A39] shrink-0" />
                <span className="font-medium text-[#193A39]">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
