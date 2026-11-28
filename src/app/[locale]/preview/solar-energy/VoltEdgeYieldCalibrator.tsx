'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
  BatteryCharging,
  Zap,
  Building2,
  TreePine,
  ShieldAlert,
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  Factory
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { voltPath } from '@/lib/verticals/solar-energy/data';

interface VoltEdgeYieldCalibratorProps {
  locale: Locale;
}

type SiteCategory = 'commercial' | 'agricultural' | 'residential' | 'utility';
type GridTopology = 'grid_tied' | 'hybrid_storage' | 'off_grid';

interface SiteProfile {
  id: SiteCategory;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  defaultArea: number;
  minArea: number;
  maxArea: number;
  areaStep: number;
  defaultServiceSlug: string;
}

const SITES: SiteProfile[] = [
  {
    id: 'commercial',
    titleAr: 'المنشآت التجارية واللوجستية',
    titleEn: 'Commercial & Logistics',
    descAr: 'أسطح المصانع والمستودعات والمجمعات التجارية لتخفيض تكاليف ذروة الاستهلاك النهاري.',
    descEn: 'Industrial roofs, logistics warehouses, and commercial facilities offsetting daytime peak tariffs.',
    defaultArea: 800,
    minArea: 100,
    maxArea: 5000,
    areaStep: 50,
    defaultServiceSlug: 'commercial-rooftop'
  },
  {
    id: 'agricultural',
    titleAr: 'المزارع والآبار المستقلة',
    titleEn: 'Agricultural & Irrigation',
    descAr: 'محطات طاقة شمسية حقلية لتشغيل طلمبات الري ومزارع الإنتاج الزراعي والحيواني.',
    descEn: 'Off-grid ground arrays driving water pumping, pivot irrigation, and rural production.',
    defaultArea: 1200,
    minArea: 200,
    maxArea: 8000,
    areaStep: 100,
    defaultServiceSlug: 'agricultural-solar'
  },
  {
    id: 'residential',
    titleAr: 'المباني السكنية والفلل',
    titleEn: 'Residential & Estates',
    descAr: 'أسطح الفلل والمباني المستقلة مع تكامل قياس صافي التبادل وحلول البطاريات الذكية.',
    descEn: 'Private villas and residential roofs integrated with net-metering and resilient battery storage.',
    defaultArea: 250,
    minArea: 50,
    maxArea: 1500,
    areaStep: 25,
    defaultServiceSlug: 'residential-solar'
  },
  {
    id: 'utility',
    titleAr: 'محطات التوليد الكبرى (EPC)',
    titleEn: 'Utility-Scale Generation',
    descAr: 'مشروعات التوليد الأرضية الكبرى للبنية التحتية والمناطق الصناعية بقدرات ميجاواط.',
    descEn: 'Large ground-mounted EPC infrastructure feeding grid transmission lines and heavy industries.',
    defaultArea: 3500,
    minArea: 1000,
    maxArea: 20000,
    areaStep: 250,
    defaultServiceSlug: 'industrial-solar'
  }
];

export function VoltEdgeYieldCalibrator({ locale }: VoltEdgeYieldCalibratorProps) {
  const isAr = locale === 'ar';
  const [selectedSite, setSelectedSite] = useState<SiteCategory>('commercial');
  const [topology, setTopology] = useState<GridTopology>('grid_tied');

  const currentProfile = SITES.find((s) => s.id === selectedSite) || SITES[0];
  const [area, setArea] = useState<number>(currentProfile.defaultArea);

  // Switch site handler
  const handleSiteChange = (siteId: SiteCategory) => {
    setSelectedSite(siteId);
    const profile = SITES.find((s) => s.id === siteId);
    if (profile) {
      setArea(profile.defaultArea);
    }
  };

  // Yield modeling based on MENA solar irradiance metrics (~1,820 kWh/kWp/year, ~165W/m2 packing factor)
  const estimatedKwp = Math.round(area * 0.165);
  const estimatedAnnualMwh = Math.round((estimatedKwp * 1820) / 1000);
  const estimatedAnnualKwh = Math.round(estimatedKwp * 1820);
  const co2AvoidedTons = (estimatedAnnualKwh * 0.00054).toFixed(1);
  const equivalentTrees = Math.round(estimatedAnnualKwh * 0.024);

  return (
    <section
      data-sector-specific="voltedge-yield-calibrator"
      className="bg-[#F5F7F0] border-y border-[#D2DBCC] py-16 sm:py-24"
      aria-labelledby="calibrator-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12352D] text-[#C7DA59] text-xs font-bold tracking-widest uppercase">
            <Sliders size={14} className="text-[#C7DA59]" />
            <span>{isAr ? 'حاسبة المحاكاة الهندسية' : 'Engineering Yield Calibrator'}</span>
          </div>
          <h2
            id="calibrator-heading"
            className="mt-4 text-3xl sm:text-5xl font-black text-[#12352D] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                حساب تقديري لقدرة المنظومة <span className="block text-[#264D43]">والإنتاج السنوي للطاقة النظيفة</span>
              </>
            ) : (
              <>
                Estimated System Capacity <span className="block text-[#264D43]">& Annual Clean Energy Yield</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'اختر طبيعة المنشأة والمساحة السطحية المتاحة لحساب القدرة الكهروضوئية التقديرية بالـ (kWp) ومعدل التوليد السنوي المتوقع وفق متوسطات الإشعاع الشمسي في الشرق الأوسط.'
              : 'Select your facility profile and usable space to simulate DC peak capacity (kWp) and estimated annual generation based on typical MENA solar irradiation baselines.'}
          </p>
        </div>

        {/* Calibrator Control Panel */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D2DBCC] p-6 sm:p-8 space-y-8 shadow-sm">
            {/* Step 1: Site Typology */}
            <div>
              <label className="block text-xs font-bold text-[#12352D] uppercase tracking-wider mb-3">
                {isAr ? '01 / نوع المنشأة والموقع' : '01 / Facility & Site Typology'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SITES.map((site) => {
                  const active = site.id === selectedSite;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => handleSiteChange(site.id)}
                      className={`text-start p-4 border transition-all ${
                        active
                          ? 'border-[#12352D] bg-[#12352D] text-white shadow-sm'
                          : 'border-[#D2DBCC] bg-[#F5F7F0] text-[#182720] hover:border-[#12352D]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${active ? 'text-[#C7DA59]' : 'text-[#12352D]'}`}>
                          {isAr ? site.titleAr : site.titleEn}
                        </span>
                        {active && <CheckCircle2 size={16} className="text-[#C7DA59]" />}
                      </div>
                      <p className={`mt-2 text-xs leading-5 line-clamp-2 ${active ? 'text-[#E0E9DB]' : 'text-[#334155]'}`}>
                        {isAr ? site.descAr : site.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Available Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="usable-area-slider"
                  className="text-xs font-bold text-[#12352D] uppercase tracking-wider"
                >
                  {isAr ? '02 / المساحة المتاحة للألواح (متر مربع)' : '02 / Usable Array Area (sqm)'}
                </label>
                <div className="font-mono text-xl font-black text-[#12352D] bg-[#E0E9DB] px-3 py-1 border border-[#D2DBCC]">
                  {area.toLocaleString()} {isAr ? 'م²' : 'm²'}
                </div>
              </div>
              <input
                id="usable-area-slider"
                type="range"
                min={currentProfile.minArea}
                max={currentProfile.maxArea}
                step={currentProfile.areaStep}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label={isAr ? 'المساحة المتاحة بالمتر المربع' : 'Usable area in square meters'}
                className="w-full h-3 bg-[#E0E9DB] rounded-none appearance-none cursor-pointer accent-[#12352D]"
              />
              <div className="flex justify-between text-xs text-[#334155] font-mono mt-2">
                <span>
                  {currentProfile.minArea.toLocaleString()} {isAr ? 'م²' : 'm²'}
                </span>
                <span>
                  {currentProfile.maxArea.toLocaleString()} {isAr ? 'م²' : 'm²'}
                </span>
              </div>
            </div>

            {/* Step 3: Grid Topology Switcher */}
            <div>
              <label className="block text-xs font-bold text-[#12352D] uppercase tracking-wider mb-3">
                {isAr ? '03 / نموذج الربط الكهربائي والتخزين' : '03 / Electrical Topology & Storage'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'grid_tied',
                    icon: Zap,
                    titleAr: 'مرتبط بالشبكة (صافي القياس)',
                    titleEn: 'Grid-Tied (Net Metering)',
                    subAr: 'تصدير الفائض وتقليل الفاتورة',
                    subEn: 'Export surplus & tariff offset'
                  },
                  {
                    id: 'hybrid_storage',
                    icon: BatteryCharging,
                    titleAr: 'هجين مع بطاريات (BESS)',
                    titleEn: 'Hybrid BESS Storage',
                    subAr: 'تأمين الأحمال الحرجة والذروة',
                    subEn: 'Critical backup & peak shaving'
                  },
                  {
                    id: 'off_grid',
                    icon: Sun,
                    titleAr: 'مستقل بالكامل (Off-Grid)',
                    titleEn: 'Autonomous Off-Grid',
                    subAr: 'للمزارع والمواقع البعيدة',
                    subEn: 'Remote farms & rural pumps'
                  }
                ].map((item) => {
                  const active = topology === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTopology(item.id as GridTopology)}
                      className={`text-start p-3 border transition-all ${
                        active
                          ? 'border-[#12352D] bg-[#E0E9DB] text-[#12352D]'
                          : 'border-[#D2DBCC] bg-white text-[#334155] hover:border-[#12352D]'
                      }`}
                    >
                      <Icon size={18} className={active ? 'text-[#12352D]' : 'text-[#334155]'} />
                      <div className="mt-2 text-xs font-bold">{isAr ? item.titleAr : item.titleEn}</div>
                      <div className="text-[11px] text-[#334155] mt-1">{isAr ? item.subAr : item.subEn}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Output Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#12352D] text-white p-7 sm:p-9 border border-[#12352D] space-y-6">
            <div>
              <p className="text-[#C7DA59] text-xs font-bold tracking-widest uppercase">
                {isAr ? 'النتائج التقديرية للمنظومة' : 'Simulated System Metrics'}
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {isAr ? 'مؤشرات القدرة والتوليد السنوي' : 'Capacity & Annual Output'}
              </h3>
            </div>

            {/* Metric 1: Peak DC Capacity */}
            <div className="bg-[#183F36] p-5 border border-[#265348]">
              <div className="text-xs text-[#C7DA59] font-bold uppercase tracking-wider">
                {isAr ? 'القدرة الذروية المقدرة' : 'Estimated DC Capacity'}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-black text-white">
                  {estimatedKwp.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-[#C7DA59]">kWp / {isAr ? 'كيلوواط ذروة' : 'Peak kW'}</span>
              </div>
              <p className="mt-2 text-xs text-[#E0E9DB] leading-5">
                {isAr
                  ? `بناءً على معامل استغلال مساحة بمعدل 165 واط/م² للألواح الكهروضوئية الحديثة.`
                  : `Calculated at ~165 W/m² module density for modern high-efficiency monocrystalline PV.`}
              </p>
            </div>

            {/* Metric 2: Annual Generation */}
            <div className="bg-[#183F36] p-5 border border-[#265348]">
              <div className="text-xs text-[#C7DA59] font-bold uppercase tracking-wider">
                {isAr ? 'الإنتاج السنوي المتوقع' : 'Estimated Annual Generation'}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-black text-white">
                  {estimatedAnnualMwh.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-[#C7DA59]">MWh / {isAr ? 'ميجاواط ساعة/سنة' : 'MWh / Year'}</span>
              </div>
              <div className="mt-1 text-xs text-[#E0E9DB] font-mono">
                ~ {estimatedAnnualKwh.toLocaleString()} kWh/yr
              </div>
            </div>

            {/* Environmental Impact Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="border border-[#265348] p-3 bg-[#183F36]">
                <div className="flex items-center gap-2 text-xs text-[#C7DA59] font-bold">
                  <Factory size={14} />
                  <span>{isAr ? 'خفض الانبعاثات' : 'CO₂ Avoidance'}</span>
                </div>
                <div className="mt-2 font-mono text-xl font-bold text-white">{co2AvoidedTons}</div>
                <div className="text-[11px] text-[#E0E9DB]">{isAr ? 'طن سنوياً' : 'Tons / Year'}</div>
              </div>

              <div className="border border-[#265348] p-3 bg-[#183F36]">
                <div className="flex items-center gap-2 text-xs text-[#C7DA59] font-bold">
                  <TreePine size={14} />
                  <span>{isAr ? 'المكافئ البيئي' : 'Tree Equivalent'}</span>
                </div>
                <div className="mt-2 font-mono text-xl font-bold text-white">{equivalentTrees.toLocaleString()}</div>
                <div className="text-[11px] text-[#E0E9DB]">{isAr ? 'شجرة مزروعة' : 'Trees Planted'}</div>
              </div>
            </div>

            {/* Non-binding Disclaimer */}
            <div className="border-t border-[#265348] pt-4 flex gap-3 text-xs leading-5 text-[#E0E9DB]">
              <ShieldAlert size={18} className="text-[#C7DA59] shrink-0 mt-0.5" />
              <p>
                {isAr
                  ? 'هذه الحسابات تقديرية بحتة ومبنية على محاكاة عامة لمعدلات الإشعاع الشمسي. لا تعد عرضاً فنياً أو مالياً ملزماً وتتطلب دراسة ظل ورفعاً مساحياً هندسياً معتمداً.'
                  : 'These metrics are purely illustrative simulations based on regional solar irradiance. They do not constitute an engineered offer, fixed quotation, or guaranteed monetary savings.'}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={voltPath(locale, 'assessment')}
                className="w-full bg-[#C7DA59] text-[#12352D] hover:bg-white hover:text-[#12352D] transition-colors py-4 px-6 font-bold text-sm flex items-center justify-center gap-3"
              >
                <span>{isAr ? 'طلب دراسة هندسية مبدئية' : 'Request Preliminary Assessment'}</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
