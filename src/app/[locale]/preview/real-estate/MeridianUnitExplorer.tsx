'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { meridianPhotos, type MeridianPhoto } from './media';
import {
  Building2,
  Maximize2,
  Bed,
  Bath,
  Compass,
  Layers,
  ArrowRight,
  ArrowLeft,
  Calculator,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

interface UnitPreset {
  id: string;
  slug: string;
  photoId: string;
  titleEn: string;
  titleAr: string;
  developmentEn: string;
  developmentAr: string;
  basePriceEgp: number;
  areaM2: number;
  bedrooms: number;
  bathrooms: number;
  floorLevel: string;
  floorLevelAr: string;
  orientation: string;
  orientationAr: string;
  finishing: string;
  finishingAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

const PRESET_UNITS: UnitPreset[] = [
  {
    id: 'prop-01',
    slug: 'prop-01',
    photoId: 'sky-villa',
    titleEn: 'Sky Villa Penthouse with 360° Panorama',
    titleAr: 'بنتهاوس سكاي فيلا بإطلالة بانورامية كاملة',
    developmentEn: 'Meridian Horizon Towers',
    developmentAr: 'أبراج ميريديان هورايزون',
    basePriceEgp: 14500000,
    areaM2: 420,
    bedrooms: 4,
    bathrooms: 5,
    floorLevel: 'Levels 48–49 (Duplex)',
    floorLevelAr: 'الطابقان 48–49 (دوبلكس)',
    orientation: 'North-West Sea Horizon',
    orientationAr: 'شمال غربي على الأفق البحري',
    finishing: 'Ultra Luxury Finished (Imported Italian Marble)',
    finishingAr: 'تشطيب فاخر كامل (رخام إيطالي مستورد)',
    featuresEn: ['Private Sky Pool', 'Double-Height Salon', 'Direct Concierge Lift', '3 Dedicated Parking Bays'],
    featuresAr: ['مسبح سماوي خاص', 'صالون بارتفاع مزدوج', 'مصعد كونسيرج مباشر', '3 مواقف سيارات خاصة']
  },
  {
    id: 'prop-02',
    slug: 'prop-02',
    photoId: 'living-interior',
    titleEn: 'Panoramic Horizon Suite with Sunset View',
    titleAr: 'جناح هورايزون بانورامي بإطلالة الغروب',
    developmentEn: 'The Palm Residences',
    developmentAr: 'مجمع ذا بالم السكني',
    basePriceEgp: 6200000,
    areaM2: 195,
    bedrooms: 2,
    bathrooms: 3,
    floorLevel: 'Level 24',
    floorLevelAr: 'الطابق 24',
    orientation: 'Sunset Bay View',
    orientationAr: 'إطلالة الغروب على الخليج',
    finishing: 'Turnkey Designer Spec',
    finishingAr: 'تشطيب تسليم مفتاح بتصميم معماري',
    featuresEn: ['Floor-to-Ceiling Glass', 'Smart Home Automated Climate', 'Integrated Miele Kitchen', 'Master Walk-in Wardrobe'],
    featuresAr: ['واجهات زجاجية من الأرض للسقف', 'تحكم مناخي ذكي مؤتمت', 'مطبخ ميلي مدمج بالكامل', 'غرفة ملابس رئيسية']
  },
  {
    id: 'prop-03',
    slug: 'prop-03',
    photoId: 'terrace-balcony',
    titleEn: 'Duplex Garden Villa with Private Terrace',
    titleAr: 'فيلا دوبلكس بحديقة وتراس خاص رحب',
    developmentEn: 'Oasis Park Enclave',
    developmentAr: 'واحة بارك إنكليف',
    basePriceEgp: 9800000,
    areaM2: 310,
    bedrooms: 3,
    bathrooms: 4,
    floorLevel: 'Ground + 1st Floor',
    floorLevelAr: 'أرضي + طابق أول',
    orientation: 'Central Botanical Promenade',
    orientationAr: 'الممشى النباتي المركزي',
    finishing: 'Fully Finished with Solid Hardwood',
    finishingAr: 'تشطيب كامل بأرضيات خشب صلب',
    featuresEn: ['120 m² Private Landscaped Garden', 'Covered Outdoor Kitchen Terrace', 'Independent Service Suite', 'EV Charging Station'],
    featuresAr: ['حديقة خاصة منسقة 120 م²', 'تراس خارجي بمطبخ صيفي مغطى', 'جناح خدمات مستقل', 'محطة شحن سيارات كهربائية']
  },
  {
    id: 'prop-04',
    slug: 'prop-04',
    photoId: 'facade-tower',
    titleEn: 'Grand Royal Penthouse & Private Roof Deck',
    titleAr: 'بنتهاوس ملكي بروف خاص متسع',
    developmentEn: 'Meridian Crown Collection',
    developmentAr: 'مجموعة ميريديان كراون',
    basePriceEgp: 22000000,
    areaM2: 560,
    bedrooms: 5,
    bathrooms: 6,
    floorLevel: 'Top Floor + Exclusive Roof Lounge',
    floorLevelAr: 'الطابق الأخير + روف لاونج حصري',
    orientation: '360° Unobstructed City & Bay View',
    orientationAr: 'إطلالة كاملة 360 درجة على المدينة والخليج',
    finishing: 'Custom Bespoke Architecture Fit-out',
    finishingAr: 'تنفيذ معماري تفصيلي حسب الطلب',
    featuresEn: ['Private Rooftop Plunge Pool', 'Fireplace Observation Lounge', 'Separate Butler & Chef Pantry', '4 Secure Underground Bays'],
    featuresAr: ['مسبح روف خاص مدمج', 'صالة مراقبة بمدفأة مفتوحة', 'جناح منفصل للشيف والخدمة', '4 مواقف مؤمنة تحت الأرض']
  }
];

export default function MeridianUnitExplorer({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedId, setSelectedId] = useState<string>(PRESET_UNITS[0].id);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(7);

  const unit = PRESET_UNITS.find((u) => u.id === selectedId) || PRESET_UNITS[0];
  const photo = meridianPhotos.find((p) => p.id === unit.photoId) || meridianPhotos[0];

  // Financial calculations
  const price = unit.basePriceEgp;
  const downPaymentAmount = Math.round((price * downPaymentPct) / 100);
  const remainingBalance = price - downPaymentAmount;
  const totalMonths = tenureYears * 12;
  const totalQuarters = tenureYears * 4;
  const quarterlyInstallment = Math.round(remainingBalance / totalQuarters);
  const monthlyEquivalent = Math.round(remainingBalance / totalMonths);

  const formatEgp = (num: number) => {
    return new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', {
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8CCBD] shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
        <div>
          <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block mb-1">
            ARCHITECTURAL SPECIFICATIONS & FINANCIAL ESTIMATOR
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25312D] tracking-tight">
            {isAr ? 'مستكشف الوحدات وحاسبة خطط السداد' : 'Unit Architecture & Installment Calibrator'}
          </h2>
          <p className="text-[#574A3D] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'قارن بين النماذج المعمارية الحصرية، واطلع على المساحات الصافية والمواصفات الإنشائية وحاسبة الأقساط التقديرية بدقة شفافة.'
              : 'Screen bespoke unit typologies, inspect verified net built-up areas and specifications, and calibrate flexible installment schedules.'}
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex items-center gap-1.5 bg-[#EDE5D7] p-1.5 rounded-xl overflow-x-auto max-w-full w-full lg:w-auto">
          {PRESET_UNITS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#25312D] text-white shadow-sm'
                    : 'text-[#574A3D] hover:text-[#25312D] hover:bg-white'
                }`}
              >
                {isAr ? item.titleAr.split(' ')[0] + ' ' + item.titleAr.split(' ')[1] : item.titleEn.split(' ')[0] + ' ' + item.titleEn.split(' ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Visual + Specs & Payment Calibrator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Showcase & Architectural Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-[#D8CCBD] group">
            <Image
              src={photo.url}
              alt={isAr ? unit.titleAr : unit.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            <div className="absolute top-4 start-4 flex flex-wrap gap-2">
              <span className="bg-[#25312D]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-stone-700">
                {unit.id.toUpperCase()} // {isAr ? unit.developmentAr : unit.developmentEn}
              </span>
              <span className="bg-[#805333] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {unit.areaM2} m² BUA
              </span>
            </div>

            <div className="absolute bottom-4 start-4 end-4 text-white space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold">
                {isAr ? unit.titleAr : unit.titleEn}
              </h3>
              <p className="text-xs text-stone-200 line-clamp-1">
                {isAr ? unit.finishingAr : unit.finishing}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF6EF] p-4 rounded-2xl border border-[#D8CCBD]">
            <div className="flex items-center gap-2.5">
              <Maximize2 className="w-4 h-4 text-[#805333] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-[#574A3D] block font-semibold">{isAr ? 'المساحة الصافية' : 'BUA Area'}</span>
                <span className="text-sm font-bold text-[#25312D]">{unit.areaM2} m²</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bed className="w-4 h-4 text-[#805333] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-[#574A3D] block font-semibold">{isAr ? 'غرف النوم' : 'Bedrooms'}</span>
                <span className="text-sm font-bold text-[#25312D]">{unit.bedrooms} {isAr ? 'أجنحة' : 'Suites'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bath className="w-4 h-4 text-[#805333] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-[#574A3D] block font-semibold">{isAr ? 'الحمامات' : 'Bathrooms'}</span>
                <span className="text-sm font-bold text-[#25312D]">{unit.bathrooms} {isAr ? 'حمامات' : 'Baths'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#805333] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-[#574A3D] block font-semibold">{isAr ? 'الاتجاه والواجهة' : 'Orientation'}</span>
                <span className="text-xs font-bold text-[#25312D] truncate block max-w-[110px]">{isAr ? unit.orientationAr : unit.orientation}</span>
              </div>
            </div>
          </div>

          {/* Key Architectural Amenities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#574A3D] font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#805333]" />
              <span>{isAr ? 'مواصفات التميّز المعماري' : 'Signature Architectural Inclusions'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(isAr ? unit.featuresAr : unit.featuresEn).map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#FAF6EF] p-2.5 rounded-xl border border-[#D8CCBD] text-[#25312D]">
                  <ShieldCheck className="w-4 h-4 text-[#805333] shrink-0" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Calibrator & Booking Action (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF6EF] rounded-2xl p-6 sm:p-7 border border-[#D8CCBD] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D8CCBD]">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#805333] tracking-widest block">
                TOTAL CONTRACT INVESTMENT
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-black text-[#25312D]">
                {formatEgp(unit.basePriceEgp)} <span className="text-xs font-sans font-bold text-[#574A3D]">{isAr ? 'ج.م' : 'EGP'}</span>
              </div>
            </div>
            <div className="text-end">
              <span className="text-[10px] font-mono text-[#574A3D] block font-semibold">{isAr ? 'سعر المتر²' : 'Price / m²'}</span>
              <span className="text-xs font-bold text-[#25312D] font-mono">
                {formatEgp(Math.round(unit.basePriceEgp / unit.areaM2))} {isAr ? 'ج.م' : 'EGP'}
              </span>
            </div>
          </div>

          {/* Sliders: Down payment & Tenure */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[#25312D] mb-1.5">
                <span>{isAr ? 'نسبة الدفعة الأولى (المقدم)' : 'Down Payment Percentage'}</span>
                <span className="font-mono text-[#805333] bg-white px-2.5 py-0.5 rounded border border-[#D8CCBD]">
                  {downPaymentPct}% ({formatEgp(downPaymentAmount)} {isAr ? 'ج.م' : 'EGP'})
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPct}
                aria-label={isAr ? 'نسبة الدفعة الأولى كنسبة مئوية' : 'Down payment percentage slider'}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-[#805333] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#574A3D] font-bold mt-1">
                <span>10% ({formatEgp(Math.round(price * 0.1))} EGP)</span>
                <span>50% ({formatEgp(Math.round(price * 0.5))} EGP)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[#25312D] mb-1.5">
                <span>{isAr ? 'فترة السداد والتقسيط' : 'Payment Schedule Tenure'}</span>
                <span className="font-mono text-[#805333] bg-white px-2.5 py-0.5 rounded border border-[#D8CCBD]">
                  {tenureYears} {isAr ? 'سنوات' : 'Years'} ({totalQuarters} {isAr ? 'أقساط ربع سنوية' : 'Quarters'})
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={1}
                value={tenureYears}
                aria-label={isAr ? 'فترة السداد بالسنوات' : 'Payment schedule tenure in years'}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#805333] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#574A3D] font-bold mt-1">
                <span>3 {isAr ? 'سنوات' : 'Years'}</span>
                <span>10 {isAr ? 'سنوات' : 'Years'}</span>
              </div>
            </div>
          </div>

          {/* Calibrated Breakdown Card */}
          <div className="bg-white p-4 rounded-xl border border-[#D8CCBD] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#574A3D]">{isAr ? 'المتبقي بنظام الأقساط:' : 'Remaining Balance:'}</span>
              <span className="font-mono font-bold text-[#25312D]">{formatEgp(remainingBalance)} EGP</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-100">
              <span className="text-[#574A3D]">{isAr ? 'القسط ربع السنوي المتساوي:' : 'Equal Quarterly Installment:'}</span>
              <span className="font-mono font-bold text-[#805333] text-sm">{formatEgp(quarterlyInstallment)} EGP</span>
            </div>
            <div className="flex justify-between items-center text-xs text-[#574A3D]">
              <span>{isAr ? 'المعادل الشهري الاسترشادي:' : 'Monthly Equivalent:'}</span>
              <span className="font-mono font-semibold">{formatEgp(monthlyEquivalent)} EGP / mo</span>
            </div>
          </div>

          {/* Legal/Illustrative Notice */}
          <div className="flex items-start gap-2 bg-[#EDE5D7] p-3 rounded-lg text-[11px] text-[#574A3D] leading-relaxed">
            <Info className="w-4 h-4 text-[#805333] shrink-0 mt-0.5" />
            <span>
              {isAr
                ? 'الحاسبة استرشادية لتخطيط الميزانية وليست مشورة مالية أو تعاقدًا نهائيًا. الشروط النهائية وجدول الدفعات يحدده عقد الشراء المعتمد.'
                : 'Illustrative schedule for planning only, not financial advice. Final terms and payment milestones are governed by the formal purchase contract.'}
            </span>
          </div>

          {/* Action Button: Book Viewing */}
          <Link
            href={`/${locale}/preview/real-estate/viewing?unit=${unit.slug}`}
            className="w-full bg-[#805333] hover:bg-[#6e4629] text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{isAr ? 'طلب موعد معاينة لهذه الوحدة' : 'Schedule Private Viewing for This Unit'}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
