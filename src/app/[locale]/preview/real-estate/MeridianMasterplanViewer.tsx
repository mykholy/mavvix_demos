'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { getMeridianPhoto } from './media';
import {
  MapPin,
  Trees,
  Waves,
  Shield,
  Coffee,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ZoneItem {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  summaryEn: string;
  summaryAr: string;
  stats: {
    coverage: string;
    radius: string;
    access: string;
    accessAr: string;
  };
  featuresEn: string[];
  featuresAr: string[];
}

const MASTERPLAN_ZONES: ZoneItem[] = [
  {
    id: 'towers',
    code: 'ZONE-A1',
    titleEn: 'Skyline Residential Towers & Sky Villas',
    titleAr: 'أبراج الأفق السكنية وأجنحة السكاي فيلا',
    categoryEn: 'Private Residential Enclave',
    categoryAr: 'منطقة سكنية خاصة فائقة الخصوصية',
    summaryEn: 'Low-density architectural towers positioned along optimum wind and sun angles to maximize natural sea breezes and panoramic horizons.',
    summaryAr: 'أبراج معمارية منخفضة الكثافة موزعة بزوايا مدروسة لمسار الشمس والرياح لتعظيم الإطلالات البانورامية وتدفق الهواء الطبيعي.',
    stats: {
      coverage: '18% Footprint',
      radius: 'Direct Lift Access',
      access: 'Biometric Access Control',
      accessAr: 'تحكم بيومتري للدخول'
    },
    featuresEn: ['Dedicated Resident Concierge', 'Double-Glazed Acoustic Facades', 'Private Basement Garages', 'Integrated EV Superchargers'],
    featuresAr: ['كونسيرج مخصص للمقيمين', 'واجهات زجاجية مزدوجة عازلة للصوت', 'مواقف خاصة أسفل الأبراج', 'شواحن فائقة السرعة للمركبات']
  },
  {
    id: 'wellness',
    code: 'ZONE-B2',
    titleEn: 'Horizon Wellness Club & Hydrotherapy Pools',
    titleAr: 'نادي هورايزون الصحي ومسابح العلاج المائي',
    categoryEn: 'Recreation & Athletic Pavilion',
    categoryAr: 'جناح اللياقة والاستجمام المائي',
    summaryEn: 'Over 8,500 m² of integrated wellness infrastructure featuring Olympic lap pools, therapeutic hydro-spas, and private pilates ateliers.',
    summaryAr: 'أكثر من 8,500 م² من البنية التحتية المتكاملة للياقة تضم مسبحًا أولمبيًا ومراكز سبا علاجية واستوديوهات بيلاتس خاصة.',
    stats: {
      coverage: '8,500 m² Facility',
      radius: '2 Min Walking Radius',
      access: 'Resident Membership Included',
      accessAr: 'عضوية مجانية للملاك والمقيمين'
    },
    featuresEn: ['Heated Infinity Lap Pool', 'Himalayan Salt & Cryo Suites', 'Technogym Biostrength Circuit', 'Private Athletic Coaching Studios'],
    featuresAr: ['مسبح إنفينيتي مدفأ بطول أولمبي', 'غرف ملح الهيمالايا والعلاج البارد', 'أجهزة تكنوجيم الذكية المؤتمتة', 'صالات تدريب رياضي فردي']
  },
  {
    id: 'promenade',
    code: 'ZONE-C3',
    titleEn: 'Central Botanical Promenade & Water Spine',
    titleAr: 'الممشى النباتي المركزي والمحور المائي',
    categoryEn: 'Landscape & Open Spaces',
    categoryAr: 'المساحات المفتوحة والحدائق المنسقة',
    summaryEn: 'Continuous 1.8-kilometer shaded linear park featuring native drought-tolerant flora, reflective water canals, and pedestrian jogging tracks.',
    summaryAr: 'حديقة خطية مظللة بطول 1.8 كم تضم نباتات بيئية مستدامة، وقنوات مائية عاكسة، ومسارات مخصصة للمشي والركض دون تقاطعات سيارات.',
    stats: {
      coverage: '82% Green Open Space',
      radius: '1.8 km Linear Loop',
      access: '100% Pedestrianized',
      accessAr: 'مخصصة بالكامل للمشاة بنسبة 100%'
    },
    featuresEn: ['Continuous Rubberized Jogging Track', 'Architectural Water Cascades', 'Shaded Meditation Pavilions', 'Smart Solar Lighting Poles'],
    featuresAr: ['مسار جري مطاطي احترافي متصل', 'شلالات مائية معمارية هادئة', 'أجنحة تأمل مظللة بين الأشجار', 'أعمدة إنارة ذكية بالطاقة الشمسية']
  },
  {
    id: 'retail',
    code: 'ZONE-D4',
    titleEn: 'Artisanal Piazza & Fine Dining Waterfront',
    titleAr: 'ساحة المطاعم والممشى التجاري الراقي',
    categoryEn: 'Lifestyle & Culinary Promenade',
    categoryAr: 'الممشى الحيوي والمطاعم المختارة',
    summaryEn: 'Boutique waterfront piazza offering specialty coffee roasteries, fine dining terraces, organic gourmet groceries, and concierge conveniences.',
    summaryAr: 'ساحة مائية حيوية تضم محامص قهوة متخصصة، ومطاعم راقية بتراسات مفتوحة، وسوبرماركت أورجانيك، ومتاجر خدمة متكاملة للمقيمين.',
    stats: {
      coverage: '32 Selected Venues',
      radius: '3 Min Walking Radius',
      access: 'Valet & Underground Parking',
      accessAr: 'خدمة فالي ومواقف مستقلة للزوار'
    },
    featuresEn: ['Signature Al Fresco Waterfront Terraces', 'Boutique Artisan Bakery & Grocer', 'Dry Cleaning & Tailoring Valet', 'Pharmacy & 24/7 Wellness Depot'],
    featuresAr: ['تراسات خارجية مطلة على المسطحات المائية', 'مخبز وبقالة فاخرة للمنتجات العضوية', 'خدمات غسيل وتعديل ملابس خاصة', 'صيدلية وخدمات رعاية متواصلة 24/7']
  }
];

export default function MeridianMasterplanViewer({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeId, setActiveId] = useState<string>(MASTERPLAN_ZONES[0].id);
  const activeZone = MASTERPLAN_ZONES.find((z) => z.id === activeId) || MASTERPLAN_ZONES[0];
  const photo = getMeridianPhoto('masterplan-model') || {
    url: '/assets/portfolio/real-estate/masterplan-model.webp',
    author: 'Meow2026',
    license: 'CC BY-SA 4.0'
  };

  return (
    <div className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-10 border border-[#D8CCBD] shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
        <div>
          <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block mb-1">
            COMMUNITY ARCHITECTURE & ENVIRONMENTAL ZONING
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25312D] tracking-tight">
            {isAr ? 'المخطط العام والتوزيع المعماري للمجمع' : 'Masterplan Strategy & Community Zoning'}
          </h2>
          <p className="text-[#574A3D] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'مخطط سكني متكامل بنسبة بنائية لا تتجاوز 18%، ومسارات مشاة مستقلة تضمن فصل حركة المركبات عن المتنزهات والمسطحات الخضراء.'
              : 'Holistic masterplanned community balancing an 18% residential footprint with 82% open parks, shaded pedestrian loops, and vehicular separation.'}
          </p>
        </div>

        {/* Global Key Ratios Badge */}
        <div className="inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#D8CCBD] text-xs font-mono text-[#805333] font-bold shrink-0">
          <Sparkles className="w-4 h-4 text-[#805333]" />
          <span>82% GREEN SPACE • 0% AT-GRADE CARS • LEED GOLD</span>
        </div>
      </div>

      {/* Main Layout: Masterplan Visual + Interactive Zone Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Masterplan Card (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-[#D8CCBD] shadow-md group">
            <Image
              src={photo.url}
              alt={isAr ? 'المجسم المعماري للمخطط العام' : 'Architectural scale model of the masterplanned community'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-4 start-4 flex items-center gap-2">
              <span className="bg-[#25312D]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-stone-700">
                MASTERPLAN SCALE // 1:250 PHYSICAL CAD
              </span>
            </div>

            <div className="absolute bottom-4 start-4 end-4 text-white flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-base sm:text-lg">
                {isAr ? activeZone.titleAr : activeZone.titleEn}
              </span>
              <span className="font-mono text-[#E4D6C5] font-semibold">
                {activeZone.code}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#574A3D] px-2">
            <span>{isAr ? 'أصول بصرية محلية مرخصة (WebP)' : 'Verified local licensed WebP asset'}</span>
            <span>CC BY-SA 4.0 • {photo.author}</span>
          </div>
        </div>

        {/* Right Column: Interactive Zone Selector & Specs (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Zone Selector Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {MASTERPLAN_ZONES.map((zone) => {
              const isSelected = zone.id === activeZone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setActiveId(zone.id)}
                  className={`p-3.5 rounded-xl border text-start transition-all ${
                    isSelected
                      ? 'bg-[#25312D] text-white border-[#25312D] shadow-md'
                      : 'bg-white text-[#25312D] border-[#D8CCBD] hover:border-[#805333]'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold block mb-0.5 ${isSelected ? 'text-amber-300' : 'text-[#805333]'}`}>
                    {zone.code}
                  </span>
                  <span className="text-xs font-bold font-serif line-clamp-1 block">
                    {isAr ? zone.titleAr : zone.titleEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Zone Detail Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#D8CCBD] shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#805333] uppercase tracking-wider block">
                {isAr ? activeZone.categoryAr : activeZone.categoryEn}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25312D] mt-0.5">
                {isAr ? activeZone.titleAr : activeZone.titleEn}
              </h3>
              <p className="text-xs text-[#574A3D] leading-relaxed mt-2">
                {isAr ? activeZone.summaryAr : activeZone.summaryEn}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D8CCBD] text-center">
              <div className="bg-[#FAF6EF] p-2.5 rounded-lg border border-[#D8CCBD]">
                <span className="text-[9px] font-mono uppercase text-[#574A3D] block">{isAr ? 'الكثافة/المساحة' : 'Coverage'}</span>
                <span className="text-xs font-bold text-[#25312D] font-mono mt-0.5 block">{activeZone.stats.coverage}</span>
              </div>
              <div className="bg-[#FAF6EF] p-2.5 rounded-lg border border-[#D8CCBD]">
                <span className="text-[9px] font-mono uppercase text-[#574A3D] block">{isAr ? 'نطاق الوصول' : 'Walking Radius'}</span>
                <span className="text-xs font-bold text-[#25312D] font-mono mt-0.5 block">{activeZone.stats.radius}</span>
              </div>
              <div className="bg-[#FAF6EF] p-2.5 rounded-lg border border-[#D8CCBD]">
                <span className="text-[9px] font-mono uppercase text-[#574A3D] block">{isAr ? 'نظام العبور' : 'Accessibility'}</span>
                <span className="text-xs font-bold text-[#25312D] font-mono mt-0.5 block truncate">{isAr ? activeZone.stats.accessAr : activeZone.stats.access}</span>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#25312D] font-mono uppercase tracking-wider block">
                {isAr ? 'مميزات هذا القطاع التخطيطي:' : 'Zone Architectural Inclusions:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(isAr ? activeZone.featuresAr : activeZone.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#574A3D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#805333] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
