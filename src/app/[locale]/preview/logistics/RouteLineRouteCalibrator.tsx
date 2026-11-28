'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Ship,
  Plane,
  Truck,
  Warehouse,
  ArrowRight,
  ShieldCheck,
  Scale,
  Clock,
  Layers,
  AlertCircle,
  CheckCircle2,
  Anchor
} from 'lucide-react';
import Link from 'next/link';
import { routeLinePath } from '@/lib/verticals/logistics/data';

interface TransportMode {
  id: string;
  name: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  icon: typeof Ship;
  volumetricRatio: string;
  typicalWindow: string;
  recommendedCargo: { ar: string; en: string };
  keyOperationalRequirements: { ar: string[]; en: string[] };
}

const MODES: readonly TransportMode[] = [
  {
    id: 'ocean',
    name: { ar: 'شحن بحري (حاويات كاملة ومجمعة)', en: 'Ocean Freight (FCL & LCL)' },
    subtitle: { ar: 'كفاءة اقتصادية للشحنات الحجمية والتجارية الكبرى', en: 'High-volume economic transit via major trade lanes' },
    icon: Ship,
    volumetricRatio: '1 CBM = 1,000 kg (1:1000)',
    typicalWindow: '12 - 24 Days',
    recommendedCargo: {
      ar: 'شحنات الحاويات القياسية (20ft / 40ft)، المعدات الصناعية، والبضائع المعبأة على منصات',
      en: 'Standard containers (20ft / 40ft), industrial machinery, and palletized commodities'
    },
    keyOperationalRequirements: {
      ar: [
        'تحديد وزن الحاوية الإجمالي المعتمد (VGM) قبل الشحن',
        'الالتزام بمدة الإعفاء من رسوم الانتظار وأرضيات الموانئ (Demurrage & Detention)',
        'توفير قائمة التعبئة والفاتورة التجارية ومستندات المنشأ الرسمية'
      ],
      en: [
        'Mandatory Verified Gross Mass (VGM) submission prior to vessel loading',
        'Adherence to port demurrage and equipment detention free-time terms',
        'Commercial invoice, detailed packing list, and certified origin documentation'
      ]
    }
  },
  {
    id: 'air',
    name: { ar: 'شحن جوي (سريع ومجدول)', en: 'Air Cargo (Priority & Scheduled)' },
    subtitle: { ar: 'حلول فائقة السرعة للشحنات الحساسة للوقت والقيمة', en: 'Time-critical routing for high-value and perishable cargo' },
    icon: Plane,
    volumetricRatio: '1 CBM = 167 kg (1:6000)',
    typicalWindow: '2 - 5 Days',
    recommendedCargo: {
      ar: 'المكونات الإلكترونية، العينات الصيدلانية، وقطع الغيار العاجلة للخطوط الإنتاجية',
      en: 'Critical electronics, pharmaceutical samples, and urgent production spare parts'
    },
    keyOperationalRequirements: {
      ar: [
        'فحص قيود أبعاد بوابات الشحن الجوي والوزن الخاضع للرسوم (Chargeable Weight)',
        'استبعاد أو تصريح مسبق لبطاريات الليثيوم والمواد الخطرة وفق لوائح IATA',
        'تنسيق استلام الشحنة من قرية البضائع بالمطار فور وصول الرحلة'
      ],
      en: [
        'Dimensional inspection against aircraft door limitations and chargeable weight ratio',
        'Strict IATA compliance checks for lithium batteries and dangerous goods',
        'Pre-coordinated customs clearance at airport cargo village upon flight touchdown'
      ]
    }
  },
  {
    id: 'road',
    name: { ar: 'نقل بري عابر للحدود', en: 'Cross-Border Road Transport (FTL / LTL)' },
    subtitle: { ar: 'ربط مباشر وسلس بين مصر والسعودية والإمارات', en: 'Direct corridor connectivity across Egypt, GCC & Levant' },
    icon: Truck,
    volumetricRatio: '1 CBM = 333 kg (1:3000)',
    typicalWindow: '4 - 8 Days',
    recommendedCargo: {
      ar: 'الشحنات التجارية كاملة الحمولة (FTL)، البضائع الغذائية، ومواد التوزيع الإقليمي',
      en: 'Full truckloads (FTL), consumer FMCG, and regional distribution cargo'
    },
    keyOperationalRequirements: {
      ar: [
        'فحص اشتراطات عبور المنافذ الحدودية ونظام الدفاتر الجمركية (TIR)',
        'الالتزام بأقصى حمولة محورية مسموح بها للشاحنات على الطرق السريعة',
        'التأكد من سلامة الأختام الجمركية ووثيقة بوليصة الشحن البري (CMR)'
      ],
      en: [
        'Customs transit processing and international TIR carnet readiness',
        'Adherence to gross vehicle weight ratings and highway axle limits',
        'Tamper-evident customs bolt seals and valid CMR consignment notes'
      ]
    }
  },
  {
    id: 'support',
    name: { ar: 'خدمات لوجستية وتخزين مساند', en: 'Contract Logistics & Multimodal Hub' },
    subtitle: { ar: 'تخزين جمركي، فك وتجميع الشحنات، وإدارة المستودعات', en: 'Bonded warehousing, cross-docking, and container staging' },
    icon: Warehouse,
    volumetricRatio: 'Bespoke Storage Factor',
    typicalWindow: 'On Demand',
    recommendedCargo: {
      ar: 'المخزون الاستراتيجي، بضائع التجارة الإلكترونية، والمواد الخاضعة للتخليص المؤقت',
      en: 'Buffer inventory staging, retail buffer stock, and bonded in-transit cargo'
    },
    keyOperationalRequirements: {
      ar: [
        'إدارة المستودعات بنظام WMS المتكامل مع تتبع أرقام التشغيلات (Lot Numbers)',
        'فصل الشحنات الجافة عن المواد التي تتطلب درجات حرارة مضبوطة',
        'تأمين مستودعي شامل ضد مخاطر الحريق والتلف والمناولة'
      ],
      en: [
        'WMS inventory management with real-time lot and serial traceability',
        'Segregated zones for dry freight, high-value security, and temperature control',
        'Comprehensive warehouse liability insurance covering physical storage risk'
      ]
    }
  }
];

export function RouteLineRouteCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [selectedModeId, setSelectedModeId] = useState<string>('ocean');
  const [origin, setOrigin] = useState<string>('egypt');
  const [destination, setDestination] = useState<string>('saudi-arabia');
  const [weightBand, setWeightBand] = useState<string>('500-1999');
  const [cargoType, setCargoType] = useState<string>('palletized');

  const currentMode = MODES.find((m) => m.id === selectedModeId) || MODES[0];
  const Icon = currentMode.icon;

  return (
    <section
      data-sector-specific="freight-corridor-calibrator"
      className="bg-[#102A3A] text-white py-16 sm:py-24 border-y border-[#31566C]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-[.2em] text-[#F3B43F]">
            {ar ? '٠٢ / حاسبة مسارات ونطاق الشحن التجاري' : '02 / FREIGHT ROUTE & CAPACITY CALIBRATOR'}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {ar ? 'معايرة المسار ومطابقة وسيلة النقل' : 'Calibrate route parameters and freight modality'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#D8E3E8]">
            {ar
              ? 'تعتمد تكلفة وسرعة الشحن على العلاقة بين الحجم والوزن الفعلي ومسار الرحلة. استكشف معايير النقل ومحددات كل وسيلة شحن قبل تقديم طلب عرض السعر.'
              : 'Freight economics depend on volumetric weight ratios, corridor transit infrastructure, and cargo staging requirements. Review operational milestones prior to brief submission.'}
          </p>
        </div>

        {/* Mode Switcher Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODES.map((mode) => {
            const active = mode.id === selectedModeId;
            const ModeIcon = mode.icon;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedModeId(mode.id)}
                aria-pressed={active}
                className={`p-6 text-start transition-all border-t-4 flex flex-col justify-between ${
                  active
                    ? 'bg-[#214052] border-t-[#F3B43F] border-x border-b border-[#31566C] shadow-lg'
                    : 'bg-[#153447] border-t-transparent border-x border-b border-[#25465A] hover:bg-[#1C3E52]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <ModeIcon
                      size={28}
                      className={active ? 'text-[#F3B43F]' : 'text-[#8FA9B6]'}
                    />
                    <span className="font-mono text-xs font-bold text-[#F3B43F]">
                      {mode.typicalWindow}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-lg leading-snug">
                    {mode.name[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#AFC2CB] leading-relaxed line-clamp-2">
                    {mode.subtitle[locale]}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#31566C]/60 flex items-center justify-between text-[11px] font-mono text-[#D8E3E8]">
                  <span>Ratio: {mode.volumetricRatio.split('=')[0]}</span>
                  {active && <CheckCircle2 size={14} className="text-[#F3B43F]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Corridor & Capacity Console */}
        <div className="mt-8 bg-[#153447] border border-[#31566C] p-6 sm:p-10 shadow-md">
          {/* Top Parameters Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-[#31566C]">
            {/* Origin */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#F3B43F] uppercase tracking-wider mb-2">
                {ar ? 'بلد المنشأ / الاستلام' : 'Origin Country'}
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                aria-label={ar ? 'بلد المنشأ / الاستلام' : 'Origin Country'}
                className="w-full bg-[#102A3A] border border-[#31566C] text-white p-3 text-sm font-bold focus:outline-none focus:border-[#F3B43F]"
              >
                <option value="egypt">{ar ? 'مصر (جمهورية مصر العربية)' : 'Egypt'}</option>
                <option value="saudi-arabia">{ar ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</option>
                <option value="uae">{ar ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</option>
                <option value="other">{ar ? 'وجهة إقليمية أو دولية أخرى' : 'International / Other'}</option>
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#F3B43F] uppercase tracking-wider mb-2">
                {ar ? 'بلد الوجهة / التسليم' : 'Destination Country'}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label={ar ? 'بلد الوجهة / التسليم' : 'Destination Country'}
                className="w-full bg-[#102A3A] border border-[#31566C] text-white p-3 text-sm font-bold focus:outline-none focus:border-[#F3B43F]"
              >
                <option value="saudi-arabia">{ar ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</option>
                <option value="egypt">{ar ? 'مصر (جمهورية مصر العربية)' : 'Egypt'}</option>
                <option value="uae">{ar ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</option>
                <option value="other">{ar ? 'وجهة إقليمية أو دولية أخرى' : 'International / Other'}</option>
              </select>
            </div>

            {/* Cargo Type */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#F3B43F] uppercase tracking-wider mb-2">
                {ar ? 'طبيعة البضاعة والتعبئة' : 'Packaging & Commodity'}
              </label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                aria-label={ar ? 'طبيعة البضاعة والتعبئة' : 'Packaging & Commodity'}
                className="w-full bg-[#102A3A] border border-[#31566C] text-white p-3 text-sm font-bold focus:outline-none focus:border-[#F3B43F]"
              >
                <option value="palletized">{ar ? 'بضائع معبأة على منصات (Pallets)' : 'Standard Palletized Goods'}</option>
                <option value="packaged">{ar ? 'كراتين وطرود تجارية مجزأة' : 'Packaged Cartons & Parcels'}</option>
                <option value="general">{ar ? 'بضائع صناعية عامة غير نمطية' : 'General Industrial Freight'}</option>
              </select>
            </div>

            {/* Weight Band */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#F3B43F] uppercase tracking-wider mb-2">
                {ar ? 'نطاق الوزن التقديري' : 'Weight Band'}
              </label>
              <select
                value={weightBand}
                onChange={(e) => setWeightBand(e.target.value)}
                aria-label={ar ? 'نطاق الوزن التقديري' : 'Weight Band'}
                className="w-full bg-[#102A3A] border border-[#31566C] text-white p-3 text-sm font-bold focus:outline-none focus:border-[#F3B43F]"
              >
                <option value="under-100">{ar ? 'أقل من ١٠٠ كجم' : 'Under 100 kg'}</option>
                <option value="100-499">{ar ? '١٠٠ إلى ٤٩٩ كجم' : '100 - 499 kg'}</option>
                <option value="500-1999">{ar ? '٥٠٠ إلى ١٩٩٩ كجم' : '500 - 1,999 kg'}</option>
                <option value="2000-plus">{ar ? '٢٠٠٠+ كجم (حمولة تجارية)' : '2,000+ kg (Commercial)'}</option>
              </select>
            </div>
          </div>

          {/* Operational Metrics & Governance Details */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
            {/* Left: Mode Profile & Volumetric Formula */}
            <div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#102A3A] border border-[#31566C] text-[#F3B43F]">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">
                    {currentMode.name[locale]}
                  </h3>
                  <p className="text-xs font-mono text-[#F3B43F]">
                    Corridor Window: {currentMode.typicalWindow}
                  </p>
                </div>
              </div>

              <div className="mt-5 p-4 bg-[#102A3A] border border-[#31566C] text-xs space-y-2">
                <div className="flex justify-between items-center text-[#AFC2CB]">
                  <span>{ar ? 'معامل الوزن الحجمي (IATA/FIATA):' : 'Volumetric Density Ratio:'}</span>
                  <span className="font-mono text-[#F3B43F] font-bold">{currentMode.volumetricRatio}</span>
                </div>
                <div className="text-[11px] text-[#D8E3E8] leading-relaxed pt-2 border-t border-[#31566C]/60">
                  <span className="font-bold text-white block mb-1">{ar ? 'نوع البضائع الأمثل:' : 'Optimized Freight Scope:'}</span>
                  {currentMode.recommendedCargo[locale]}
                </div>
              </div>
            </div>

            {/* Right: Mandatory Operational Requirements */}
            <div>
              <p className="text-xs font-mono font-bold text-[#F3B43F] uppercase tracking-wider mb-3">
                {ar ? 'متطلبات التشغيل والمستندات' : 'Mandatory Operational Gateways'}
              </p>
              <ul className="space-y-2.5">
                {currentMode.keyOperationalRequirements[locale].map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#D8E3E8] leading-relaxed">
                    <CheckCircle2 size={15} className="text-[#F3B43F] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Non-Binding Caveat & Quick CTA */}
          <div className="mt-8 bg-[#102A3A] border border-[#F3B43F]/50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-[#F3B43F] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-[#D8E3E8]">
                {ar
                  ? 'هذه المعايرة توضيحية لتقدير النطاق والوسيلة. لا يعرض الموقع أسعاراً حية أو حجوزات ناقلين مؤكدة. تتحدد الرسوم الفعلية وجدول الملاحة بموجب عرض سعر تجاري رسمي مكتوب.'
                  : 'This calibration is educational and scope-defining only. We display no live freight rates or auto-booking confirmations. Official charges and transit times are finalized via formal written quotation.'}
              </p>
            </div>
            <Link
              href={routeLinePath(locale, 'quote')}
              className="shrink-0 inline-flex items-center gap-2 bg-[#F3B43F] text-[#102A3A] px-6 py-3 text-xs font-black uppercase hover:bg-white transition-colors"
            >
              <span>{ar ? 'طلب عرض سعر مفصل' : 'Request Freight Brief'}</span>
              <ArrowRight size={14} className={ar ? 'rotate-180' : ''} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
