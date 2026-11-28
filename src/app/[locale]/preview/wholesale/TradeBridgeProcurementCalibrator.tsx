'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { tradePath } from '@/lib/verticals/wholesale/data';
import {
  Boxes,
  Package,
  Truck,
  Layers,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  Store,
  CheckCircle2,
  Info,
  Scale
} from 'lucide-react';

export type BuyerSector = 'retail' | 'hospitality' | 'ecommerce' | 'corporate';
export type ProductCategory = 'packaging' | 'hospitality' | 'office' | 'operations';

interface SectorOption {
  id: BuyerSector;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  icon: typeof Store;
  typicalMoqAr: string;
  typicalMoqEn: string;
}

const SECTORS: SectorOption[] = [
  {
    id: 'retail',
    titleAr: 'سلاسل التجزئة والسوبرماركت',
    titleEn: 'Retail & Supermarket Chains',
    taglineAr: 'توريد مستمر لأكياس الكرافت، أشرطة الإغلاق ومستهلكات نقاط البيع',
    taglineEn: 'Continuous bulk supply of paper bags, checkout packaging, and sealing supplies',
    icon: Store,
    typicalMoqAr: 'الحد الأدنى الموصى به: 25 كرتونة',
    typicalMoqEn: 'Recommended MOQ: 25 cartons'
  },
  {
    id: 'hospitality',
    titleAr: 'الفنادق والمطاعم والكافيهات',
    titleEn: 'HORECA & Food Service',
    taglineAr: 'أكواب حفظ الحرارة، علب الوجبات، ومستلزمات الضيافة المعتمدة غذائيًا',
    taglineEn: 'Food-grade certified hot cups, meal boxes, and hospitality tableware',
    icon: UtensilsCrossed,
    typicalMoqAr: 'الحد الأدنى الموصى به: 20 كرتونة',
    typicalMoqEn: 'Recommended MOQ: 20 cartons'
  },
  {
    id: 'ecommerce',
    titleAr: 'المتاجر الإلكترونية وشركات الشحن',
    titleEn: 'E-Commerce & 3PL Logistics',
    taglineAr: 'كراتين الشحن المموجة، مواد الحماية من الصدمات والملصقات اللوجستية',
    taglineEn: 'Corrugated mailer cartons, void fill cushioning, and dispatch labels',
    icon: ShoppingBag,
    typicalMoqAr: 'الحد الأدنى الموصى به: 50 كرتونة',
    typicalMoqEn: 'Recommended MOQ: 50 cartons'
  },
  {
    id: 'corporate',
    titleAr: 'الشركات والمؤسسات الكبرى',
    titleEn: 'Corporate Facilities & Offices',
    taglineAr: 'أوراق الطباعة المعيارية، أدوات الأرشفة، ومهمات السلامة والنظافة للمباني',
    taglineEn: 'A4 printing paper reams, filing storage, and facility safety essentials',
    icon: Building2,
    typicalMoqAr: 'الحد الأدنى الموصى به: 15 كرتونة',
    typicalMoqEn: 'Recommended MOQ: 15 cartons'
  }
];

interface CategoryMeta {
  id: ProductCategory;
  labelAr: string;
  labelEn: string;
  defaultUnitsPerCarton: number;
  cartonsPerPallet: number;
  cbmPerCarton: number;
}

const CATEGORIES: Record<ProductCategory, CategoryMeta> = {
  packaging: {
    id: 'packaging',
    labelAr: 'مستلزمات التغليف والكراتين',
    labelEn: 'Packaging & Cartons',
    defaultUnitsPerCarton: 50,
    cartonsPerPallet: 28,
    cbmPerCarton: 0.045
  },
  hospitality: {
    id: 'hospitality',
    labelAr: 'مستهلكات الضيافة والأغذية',
    labelEn: 'Hospitality & Food Service',
    defaultUnitsPerCarton: 100,
    cartonsPerPallet: 32,
    cbmPerCarton: 0.038
  },
  office: {
    id: 'office',
    labelAr: 'الأوراق والمستلزمات المكتبية',
    labelEn: 'Office Papers & Printing',
    defaultUnitsPerCarton: 25,
    cartonsPerPallet: 40,
    cbmPerCarton: 0.026
  },
  operations: {
    id: 'operations',
    labelAr: 'مهمات التشغيل ومعدات السلامة',
    labelEn: 'Operations & Warehouse Supplies',
    defaultUnitsPerCarton: 40,
    cartonsPerPallet: 24,
    cbmPerCarton: 0.052
  }
};

export function TradeBridgeProcurementCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [sector, setSector] = useState<BuyerSector>('retail');
  const [category, setCategory] = useState<ProductCategory>('packaging');
  const [cartons, setCartons] = useState<number>(60);

  const activeSector = SECTORS.find(s => s.id === sector)!;
  const activeCat = CATEGORIES[category];

  // Logistics math
  const totalUnits = cartons * activeCat.defaultUnitsPerCarton;
  const estimatedPallets = Math.ceil(cartons / activeCat.cartonsPerPallet);
  const totalCbm = (cartons * activeCat.cbmPerCarton).toFixed(1);

  // Vehicle class selection
  const vehicleClass =
    cartons <= 30
      ? {
          nameAr: 'شاحنة بيك آب / فان خفيف (1.5 طن)',
          nameEn: '1.5-Ton Light Commercial Van',
          payloadAr: 'حمولة جزئية سريعة داخل المدينة',
          payloadEn: 'Rapid local intra-city partial load'
        }
      : cartons <= 100
      ? {
          nameAr: 'شاحنة نقل جامبو مغلقة (3.5 طن)',
          nameEn: '3.5-Ton Jumbo Freight Truck',
          payloadAr: 'سعة 4-6 منصات يوروباليت معيارية',
          payloadEn: 'Capacity for 4-6 standard Euro-pallets'
        }
      : cartons <= 250
      ? {
          nameAr: 'شاحنة توزيع متوسطة (7-10 طن)',
          nameEn: '7–10 Ton Medium Freight Truck',
          payloadAr: 'سعة 10-14 منصة لتوزيع الفروع الإقليمية',
          payloadEn: 'Capacity for 10-14 pallets for regional hubs'
        }
      : {
          nameAr: 'شاحنة مقطورة كبرى (تريلا 40 قدم)',
          nameEn: '40ft Heavy Inter-City Semi-Trailer',
          payloadAr: 'حمولة كاملة (FTL) حتى 26-30 منصة بضائع',
          payloadEn: 'Full Truckload (FTL) up to 26-30 pallets'
        };

  return (
    <section
      data-sector-specific="tradebridge-procurement-calibrator"
      aria-label={ar ? 'حاسبة طلبيات الجملة ورص المنصات' : 'Wholesale Procurement & Pallet Calibrator'}
      className="bg-[#F8F4EF] py-20 sm:py-28 border-b border-[#D9D2CA]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#9B3320] text-xs font-bold tracking-[.18em] uppercase">
            <Boxes size={16} />
            <span>{ar ? 'حاسبة التوريد اللوجستي' : 'B2B PROCUREMENT CALIBRATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#213044] mt-5 leading-tight tracking-tight">
            {ar ? (
              <>
                خطّط طلبيات الجملة، <span className="text-[#B9442E]">واحسب المنصات اللوجستية بدقة.</span>
              </>
            ) : (
              <>
                Plan wholesale batches, <span className="text-[#B9442E]">calibrate pallet footprints.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-8 text-[#26323B]">
            {ar
              ? 'تتطلب مشتريات الشركات B2B تخطيطًا دقيقًا لحجم الكراتين وسعة المنصات ووسيلة النقل المناسبة. استخدم هذه الأداة لتقدير احتياجك الفعلي قبل تقديم طلب عرض السعر المجمّع.'
              : 'Enterprise procurement demands rigorous calibration of carton quantities, pallet footprints, and freight vehicle classes. Calibrate your batch requirements before consolidating your RFQ.'}
          </p>
        </div>

        {/* Step 1: Sector Switcher */}
        <div className="mt-12 bg-white border border-[#D9D2CA] p-4 sm:p-5 rounded-sm shadow-sm">
          <span className="text-xs font-bold text-[#213044] uppercase tracking-wider block mb-3 px-1">
            {ar ? '01 / اختر قطاع منشأتك التجاري' : '01 / Select Your Business Sector'}
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SECTORS.map(s => {
              const isSelected = sector === s.id;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSector(s.id)}
                  className={`p-4 border-2 text-start rounded-sm transition-all flex flex-col justify-between min-h-28 ${
                    isSelected
                      ? 'bg-[#213044] border-[#213044] text-white shadow-md'
                      : 'bg-[#F8F4EF] border-[#D9D2CA] text-[#213044] hover:bg-[#EFE8DD]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-sm leading-snug">{ar ? s.titleAr : s.titleEn}</span>
                    <Icon size={20} className={isSelected ? 'text-[#F3C2B4]' : 'text-[#B9442E]'} />
                  </div>
                  <span
                    className={`text-xs mt-3 leading-relaxed ${
                      isSelected ? 'text-[#F8F4EF]' : 'text-[#4A5568]'
                    }`}
                  >
                    {ar ? s.typicalMoqAr : s.typicalMoqEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Category Selector */}
        <div className="mt-8">
          <span className="text-xs font-bold text-[#213044] uppercase tracking-wider block mb-3">
            {ar ? '02 / اختر فئة المنتجات الرئيسية' : '02 / Select Primary Product Category'}
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(CATEGORIES) as ProductCategory[]).map(key => {
              const cat = CATEGORIES[key];
              const isSelected = category === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setCategory(key)}
                  className={`p-4 border-2 text-start rounded-sm transition-all flex items-center gap-3 min-h-20 ${
                    isSelected
                      ? 'bg-[#213044] border-[#213044] text-white shadow-md'
                      : 'bg-white border-[#D9D2CA] text-[#213044] hover:bg-[#F8F4EF]'
                  }`}
                >
                  <Package
                    size={22}
                    className={`shrink-0 ${isSelected ? 'text-[#F3C2B4]' : 'text-[#B9442E]'}`}
                  />
                  <span className="font-bold text-xs sm:text-sm leading-snug">
                    {ar ? cat.labelAr : cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Interactive Carton Volume Calibrator */}
        <div className="mt-8 bg-white border border-[#D9D2CA] p-6 sm:p-10 shadow-sm rounded-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8DEC9]">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#9B3320]">
                {ar ? '03 / ضبط كمية الكراتين' : '03 / CALIBRATE CARTON QUANTITY'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#213044] mt-1">
                {cartons} {ar ? 'كرتونة معيارية' : 'Standard Cartons'}
              </h3>
            </div>

            {/* Quantity Presets */}
            <div className="flex flex-wrap gap-2">
              {[20, 60, 150, 350].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCartons(val)}
                  aria-label={`${val} cartons preset`}
                  className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors ${
                    cartons === val
                      ? 'bg-[#B9442E] text-white border-[#B9442E]'
                      : 'bg-[#F8F4EF] text-[#213044] border-[#D9D2CA] hover:bg-[#EFE8DD]'
                  }`}
                >
                  {val} {ar ? 'كرتونة' : 'ctn'}
                </button>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className="mt-8">
            <div className="flex justify-between text-xs font-bold text-[#4A5568] mb-2">
              <span>{ar ? 'الحد الأدنى: 10 كراتين' : 'Min: 10 cartons'}</span>
              <span>{ar ? 'الحد الأقصى: 500 كرتونة' : 'Max: 500 cartons'}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={cartons}
              onChange={e => setCartons(Number(e.target.value))}
              aria-label={ar ? 'شريط تحديد عدد الكراتين' : 'Carton quantity slider'}
              className="w-full h-3 bg-[#E8DEC9] rounded-lg appearance-none cursor-pointer accent-[#B9442E]"
            />
          </div>

          {/* Telemetry Output Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#E8DEC9]">
            <div className="p-4 bg-[#F8F4EF] border border-[#E4D9C7] rounded-sm">
              <span className="text-[11px] font-bold text-[#9B3320] uppercase block">
                {ar ? 'إجمالي الوحدات التقديري' : 'Estimated Total Units'}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#213044] mt-2">
                {totalUnits.toLocaleString()}
              </p>
              <span className="text-xs text-[#4A5568] mt-1 block">
                ({activeCat.defaultUnitsPerCarton} {ar ? 'وحدة/كرتونة' : 'units/ctn'})
              </span>
            </div>

            <div className="p-4 bg-[#F8F4EF] border border-[#E4D9C7] rounded-sm">
              <span className="text-[11px] font-bold text-[#9B3320] uppercase block">
                {ar ? 'عدد منصات البضائع (Pallets)' : 'Euro-Pallet Estimate'}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#213044] mt-2">
                {estimatedPallets} {ar ? 'منصات' : 'Pallets'}
              </p>
              <span className="text-xs text-[#4A5568] mt-1 block">
                (80 × 120 cm {ar ? 'يوروباليت' : 'Euro-pallet'})
              </span>
            </div>

            <div className="p-4 bg-[#F8F4EF] border border-[#E4D9C7] rounded-sm">
              <span className="text-[11px] font-bold text-[#9B3320] uppercase block">
                {ar ? 'الحجم التقديري المكعب' : 'Volumetric Cube (CBM)'}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#213044] mt-2">
                {totalCbm} <span className="text-base font-normal">m³</span>
              </p>
              <span className="text-xs text-[#4A5568] mt-1 block">
                {ar ? 'حجم الفراغ الشاحن' : 'Volumetric footprint'}
              </span>
            </div>

            <div className="p-4 bg-[#213044] text-white border border-[#213044] rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F3C2B4] uppercase block">
                  {ar ? 'فئة النقل اللوجستي الموصى بها' : 'Recommended Transport'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                  {ar ? vehicleClass.nameAr : vehicleClass.nameEn}
                </p>
              </div>
              <span className="text-[11px] text-[#F8F4EF] mt-2 block">
                {ar ? vehicleClass.payloadAr : vehicleClass.payloadEn}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-[#E8DEC9] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-2.5 max-w-xl text-xs text-[#26323B] leading-6">
              <Info size={17} className="text-[#9B3320] shrink-0 mt-0.5" />
              <span>
                {ar
                  ? 'الحسابات أعلاه تقديرية توضيحية لتخطيط سلاسل الإمداد. الكتالوج مخصص لجمع طلبات عروض الأسعار (RFQ) ولا يمثل متجرًا فوريًا للبيع بالتجزئة.'
                  : 'Calculations are engineering approximations for bulk supply chain planning. TradeBridge facilitates consolidated RFQs and does not operate as an instant consumer checkout store.'}
              </span>
            </div>

            <Link
              href={tradePath(locale, `rfq?category=${category}`)}
              className="inline-flex items-center gap-2 bg-[#B9442E] hover:bg-[#9B3320] text-white px-7 py-3.5 font-bold text-xs sm:text-sm rounded-sm transition-colors shadow-sm"
            >
              <span>{ar ? 'تكوين طلب عرض سعر (RFQ)' : 'Consolidate Multi-Line RFQ'}</span>
              <Arrow size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
