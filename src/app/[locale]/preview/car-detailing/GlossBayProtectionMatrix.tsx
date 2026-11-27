'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { glossPath } from '@/lib/verticals/car-detailing/data';
import {
  ShieldCheck,
  Droplets,
  Layers,
  Sparkles,
  Car,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  HelpCircle
} from 'lucide-react';

interface VehicleClass {
  id: string;
  nameEn: string;
  nameAr: string;
  examplesEn: string;
  examplesAr: string;
  panelCount: number;
}

const VEHICLE_CLASSES: VehicleClass[] = [
  {
    id: 'compact',
    nameEn: 'Compact & Hot Hatch',
    nameAr: 'هاتشباك وسيارات مدمجة',
    examplesEn: 'Golf GTI, Mini Cooper, A-Class',
    examplesAr: 'جولف GTI، ميني كوبر، مرسيدس A-Class',
    panelCount: 13
  },
  {
    id: 'sedan',
    nameEn: 'Executive & Sports Sedan',
    nameAr: 'سيدان تنفيذي ورياضي',
    examplesEn: 'BMW 5-Series, E-Class, Model S',
    examplesAr: 'بي إم دبليو الفئة الخامسة، مرسيدس E، تسلا S',
    panelCount: 16
  },
  {
    id: 'mid-suv',
    nameEn: 'Mid-Size Performance SUV',
    nameAr: 'دفع رباعي متوسط وكروس أوفر',
    examplesEn: 'Porsche Macan, BMW X5, Velar',
    examplesAr: 'بورشه ماكان، بي إم دبليو X5، رينج روفر فيلار',
    panelCount: 19
  },
  {
    id: 'full-suv',
    nameEn: 'Full-Size Luxury SUV & 4x4',
    nameAr: 'دفع رباعي كبير وفاره',
    examplesEn: 'Patrol, Land Cruiser, Escalade, G-Class',
    examplesAr: 'نيسان باترول، لاندكروزر، إسكاليد، مرسيدس G-Class',
    panelCount: 22
  }
];

interface ProtectionSystem {
  id: string;
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  architectureType: 'chemical' | 'physical' | 'hybrid';
  contactAngle: string;
  hardnessRating: string;
  rockChipDefense: string;
  filmThickness: string;
  uvRejection: string;
  chemicalResistance: string;
  maintenanceRequirementEn: string;
  maintenanceRequirementAr: string;
  inclusionsEn: string[];
  inclusionsAr: string[];
}

const PROTECTION_SYSTEMS: ProtectionSystem[] = [
  {
    id: 'ceramic-quartz',
    titleEn: 'Multi-Layer Ceramic Quartz Matrix',
    titleAr: 'منظومة النانو سيراميك الكوارتزي متعدد الطبقات',
    taglineEn: 'Chemical Shield, Hydrophobic Self-Cleaning & Deep Specular Gloss',
    taglineAr: 'درع كيميائي طارد للسوائل وتنظيف ذاتي مع لمعان مرآتي عميق',
    architectureType: 'chemical',
    contactAngle: '112° Hydrophobic Bead',
    hardnessRating: '9H True Pencil Hardness',
    rockChipDefense: 'Low (Chemical/Micro-abrasion Only)',
    filmThickness: '2 - 3.5 Microns (µm)',
    uvRejection: '99.5% Solar Oxidation Block',
    chemicalResistance: 'pH 2.0 - 12.0 Detergent Proof',
    maintenanceRequirementEn: 'Quarterly pH-neutral decontamination wash & annual SiO2 booster top-up.',
    maintenanceRequirementAr: 'غسيل ربع سنوي بشامبو متعادل الحموضة وتعزيز سنوي برذاذ SiO2 التنشيطي.',
    inclusionsEn: [
      'Paintwork base quartz bonding layer',
      'Wheel faces & caliper high-temp coat',
      'Windshield & rear glass hydrophobics',
      'Exterior textured trim restoration'
    ],
    inclusionsAr: [
      'طبقة ترابط أساسية للطلاء الكوارتزي',
      'طلاء حراري لمقدمة الجنوط وملاقط المكابح',
      'معالجة طاردة لمياه الأمطار للزجاج الأمامي',
      'حماية وتجديد البلاستيك الخارجي من التبهيت'
    ]
  },
  {
    id: 'ppf-shield',
    titleEn: 'Thermoplastic Self-Healing PPF Shield',
    titleAr: 'درع أفلام الحماية البلاستيكية ذاتية الالتئام PPF',
    taglineEn: 'Physical Impact Armor against High-Velocity Road Debris & Abrasion',
    taglineAr: 'درع فيزيائي ممتص للصدمات ضد الحصى المتطاير وخدوش الاحتكاك',
    architectureType: 'physical',
    contactAngle: '104° Natural Beading',
    hardnessRating: 'Elastic 8-mil Aliphatic Urethane',
    rockChipDefense: 'Maximum (High-Velocity Gravel)',
    filmThickness: '200 Microns (8.0 mil)',
    uvRejection: '99.9% Non-Yellowing Stabilizers',
    chemicalResistance: 'Acid Rain & Bug Acid Immune',
    maintenanceRequirementEn: 'Standard two-bucket wash; light swirls disappear under heat / sunlight.',
    maintenanceRequirementAr: 'غسيل قياسي بحوضين؛ تلتئم الدوائر والخدوش ذاتياً بحرارة المحرك أو الشمس.',
    inclusionsEn: [
      'High-impact front bumper & hood shield',
      'Fender arches & side mirror caps',
      'Rocker panels & rear luggage lip',
      'CAD precision pre-cut digital edges'
    ],
    inclusionsAr: [
      'حماية الصدام الأمامي والكبوت المعرض للحصى',
      'أقواس الرفارف وأغطية المرايا الجانبية',
      'عتبات الأبواب السفلية وحافة الصندوق الخلفي',
      'قص حواف رقمي دقيق ببرمجيات CAD دون شفرات'
    ]
  },
  {
    id: 'hybrid-armor',
    titleEn: 'Hybrid Track Armor (PPF Front + Ceramic Body)',
    titleAr: 'منظومة الحماية الهجينة (PPF للمقدمة + سيراميك للبدن)',
    taglineEn: 'The Ultimate Protocol: Stone Defense where exposed, Gloss Everywhere',
    taglineAr: 'المعيار المتكامل: حماية من الحصى للمقدمة، ولمعان فائق للسيارة بأكملها',
    architectureType: 'hybrid',
    contactAngle: '115° Super-Hydrophobic Coating over Film',
    hardnessRating: 'Dual Protection: 8-mil Polyurethane + 9H SiO2',
    rockChipDefense: '100% on Impact Zones + 9H Finish',
    filmThickness: '200µm Front Impact + 3µm Ceramic Body',
    uvRejection: '100% Complete Solar Shielding',
    chemicalResistance: 'Full Spectrum High/Low pH Defense',
    maintenanceRequirementEn: 'Effortless maintenance with maximum resale value preservation.',
    maintenanceRequirementAr: 'عناية سهلة للغاية مع الحفاظ الكامل على أعلى قيمة إعادة بيع للمركبة.',
    inclusionsEn: [
      'Full front-end self-healing PPF wrap',
      'Full vehicle multi-layer ceramic top coat',
      'Coated PPF film edges to prevent dirt accumulation',
      'Cabin leather & console ceramic barrier'
    ],
    inclusionsAr: [
      'تغليف كامل لمقدمة السيارة بأفلام PPF الذاتية',
      'تطبيق نانو سيراميك لكامل البدن وفوق الفيلم',
      'إغلاق حواف الفيلم بالسيراميك لمنع تراكم الأتربة',
      'حماية داخلية نانو لفرش المقصورة والجلود'
    ]
  }
];

export default function GlossBayProtectionMatrix({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('sedan');
  const [activeSystemId, setActiveSystemId] = useState<string>('hybrid-armor');

  const currentVehicle = VEHICLE_CLASSES.find((v) => v.id === selectedVehicleId) || VEHICLE_CLASSES[1];
  const currentSystem = PROTECTION_SYSTEMS.find((s) => s.id === activeSystemId) || PROTECTION_SYSTEMS[2];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#CBDCE5] shadow-sm space-y-8 overflow-hidden text-[#0D1626]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#CBDCE5] w-full min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#086786] uppercase tracking-widest block">
              COATING VS FILM TECHNICAL MATRIX
            </span>
            <span className="text-[10px] font-mono bg-[#E0F3FA] text-[#086786] px-2 py-0.5 rounded font-bold">
              ASTM VERIFIED
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D1626] tracking-tight mt-2 gloss-display">
            {isAr ? 'مقارنة منظومات الحماية: نانو سيراميك أم أفلام PPF؟' : 'Protection Architecture Matrix: Ceramic vs PPF vs Hybrid'}
          </h2>
          <p className="text-[#314A5C] text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            {isAr
              ? 'اختر فئة سيارتك لمقارنة المواصفات الفيزيائية والكيميائية لكل منظومة حماية: زاوية قطرة الماء، مقاومة الحصى المتطاير، وسماكة العزل المعتمدة.'
              : 'Select your vehicle typology to inspect real physical and chemical performance standards: water contact angles, rock-chip impact thresholds, and certified film thickness.'}
          </p>
        </div>

        {/* Vehicle Class Selector (Wrapping on Mobile, Zero Overflow) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F4F7FA] p-1.5 rounded-xl border border-[#CBDCE5] max-w-full">
          {VEHICLE_CLASSES.map((vc) => {
            const isSelected = vc.id === selectedVehicleId;
            return (
              <button
                key={vc.id}
                type="button"
                onClick={() => setSelectedVehicleId(vc.id)}
                className={`text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-[#0D1626] text-white shadow-sm'
                    : 'text-[#314A5C] hover:text-[#0D1626] hover:bg-white'
                }`}
              >
                {isAr ? vc.nameAr : vc.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Vehicle Context Card */}
      <div className="bg-[#E7F4F9] rounded-2xl p-4 sm:p-6 border border-[#BDE0EE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#086786] text-white flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#086786] font-mono font-bold uppercase">
              {isAr ? 'مواصفات الفئة المحددة' : 'Active Vehicle Profile'}
            </div>
            <div className="text-base font-black text-[#0D1626]">
              {isAr ? currentVehicle.nameAr : currentVehicle.nameEn}
            </div>
            <div className="text-xs text-[#314A5C] mt-0.5">
              {isAr ? currentVehicle.examplesAr : currentVehicle.examplesEn} ({currentVehicle.panelCount} {isAr ? 'لوح خارجي' : 'exterior panels'})
            </div>
          </div>
        </div>

        {/* Protection System Pill Selector */}
        <div className="flex flex-wrap gap-2">
          {PROTECTION_SYSTEMS.map((ps) => {
            const isSelected = ps.id === activeSystemId;
            return (
              <button
                key={ps.id}
                type="button"
                onClick={() => setActiveSystemId(ps.id)}
                className={`text-xs font-bold px-3 py-2 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#086786] text-white border-[#086786]'
                    : 'bg-white text-[#314A5C] border-[#CBDCE5] hover:border-[#086786]'
                }`}
              >
                {ps.architectureType === 'chemical' && (isAr ? 'نانو سيراميك' : 'Ceramic')}
                {ps.architectureType === 'physical' && (isAr ? 'فيلم PPF' : 'PPF Shield')}
                {ps.architectureType === 'hybrid' && (isAr ? 'هجين (المقدمة + البدن)' : 'Hybrid Armor')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Technical Specifications Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Key Scientific Metrics (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#F8FBFC] border border-[#CBDCE5] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#CBDCE5]">
              <span className="text-xs font-mono font-bold text-[#086786] uppercase tracking-wider">
                {isAr ? 'المواصفات الهندسية المقاسة' : 'Laboratory Performance Ratings'}
              </span>
              <span className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-[#CBDCE5] text-[#314A5C] font-semibold">
                ISO / ASTM Testing
              </span>
            </div>

            {/* Metric Rows */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="font-bold text-[#314A5C]">{isAr ? 'مقاومة الصدمات وتطاير الحصى' : 'Stone Chip / Gravel Impact Resistance'}</span>
                <span className={`font-mono font-bold text-end ${
                  currentSystem.architectureType === 'chemical' ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  {currentSystem.rockChipDefense}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="font-bold text-[#314A5C]">{isAr ? 'السماكة المضافة على الطلاء' : 'Total Layer Thickness'}</span>
                <span className="font-mono font-bold text-end text-[#0D1626]">
                  {currentSystem.filmThickness}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="font-bold text-[#314A5C]">{isAr ? 'زاوية قطرة الماء وطرد السوائل' : 'Hydrophobic Water Contact Angle'}</span>
                <span className="font-mono font-bold text-end text-[#086786]">
                  {currentSystem.contactAngle}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="font-bold text-[#314A5C]">{isAr ? 'صلابة السطح ومقاومة الاحتكاك' : 'Surface Hardness / Elasticity'}</span>
                <span className="font-mono font-bold text-end text-[#0D1626]">
                  {currentSystem.hardnessRating}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="font-bold text-[#314A5C]">{isAr ? 'مقاومة الأحماض والمنظفات الكيميائية' : 'Chemical & Detergent Tolerance'}</span>
                <span className="font-mono font-bold text-end text-[#0D1626]">
                  {currentSystem.chemicalResistance}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="font-bold text-[#314A5C]">{isAr ? 'حماية الأشعة فوق البنفسجية والأكسدة' : 'UV Rejection & Thermal Stability'}</span>
                <span className="font-mono font-bold text-end text-emerald-700">
                  {currentSystem.uvRejection}
                </span>
              </div>
            </div>
          </div>

          {/* Maintenance Protocol Note */}
          <div className="p-4 rounded-xl bg-[#F4F7FA] border border-[#CBDCE5] text-xs text-[#314A5C] leading-relaxed">
            <span className="font-bold text-[#0D1626] block mb-1">
              {isAr ? 'بروتوكول العناية الدورية:' : 'Ongoing Maintenance Protocol:'}
            </span>
            {isAr ? currentSystem.maintenanceRequirementAr : currentSystem.maintenanceRequirementEn}
          </div>
        </div>

        {/* Right Column: Inclusions, Scope & Interactive Conversion (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0D1626] text-white border border-[#1E354D] space-y-5">
            <div>
              <span className="text-[11px] font-mono text-[#4CCBF4] font-bold uppercase tracking-widest block">
                {isAr ? 'نطاق التطبيق الموصى به' : 'Recommended Application Scope'}
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {isAr ? currentSystem.titleAr : currentSystem.titleEn}
              </h3>
              <p className="text-xs text-[#A7C4D5] mt-1 leading-relaxed">
                {isAr ? currentSystem.taglineAr : currentSystem.taglineEn}
              </p>
            </div>

            {/* Inclusions Checklist */}
            <div className="space-y-3 pt-2">
              {(isAr ? currentSystem.inclusionsAr : currentSystem.inclusionsEn).map((inc, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-[#D5E8F1]">
                  <div className="w-5 h-5 rounded-full bg-[#4CCBF4]/20 text-[#4CCBF4] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{inc}</span>
                </div>
              ))}
            </div>

            {/* Direct CTA to Quote Builder */}
            <div className="pt-4 border-t border-[#1E354D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#A7C4D5]">
                {isAr
                  ? 'يتم تحديد خطة العمل بعد قياس سمك الطلاء ومعاينة مقدمة السيارة.'
                  : 'Exact scope is finalized after ultrasonic paint measurement and inspection.'}
              </div>

              <Link
                href={glossPath(locale, 'quote')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4CCBF4] hover:bg-[#7DE2FF] text-[#08111F] font-black text-xs transition-colors shrink-0"
              >
                <span>{isAr ? 'طلب عرض للمركبة' : 'Configure for Vehicle'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
