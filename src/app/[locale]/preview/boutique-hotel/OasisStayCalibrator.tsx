'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Calendar,
  Users,
  Sparkles,
  BedDouble,
  Coffee,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
  TreePine,
  Sliders
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { OASIS, oasisPath } from '@/lib/verticals/boutique-hotel/data';

interface OasisStayCalibratorProps {
  locale: Locale;
}

type StayExperience = 'sanctuary' | 'heritage' | 'creative' | 'family';

interface ExperienceProfile {
  id: StayExperience;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  recommendedSlug: string;
  minNights: number;
  defaultNights: number;
  defaultGuests: number;
  maxParty: number;
  highlightsAr: string[];
  highlightsEn: string[];
}

const EXPERIENCES: ExperienceProfile[] = [
  {
    id: 'sanctuary',
    titleAr: 'خلوة الهدوء والسكينة',
    titleEn: 'Tranquil Rest & Wellness',
    descAr: 'إقامة بطيئة مصممة للأزواج والمسافرين الباحثين عن الراحة العميقة والاسترخاء وسط ظلال النخيل.',
    descEn: 'A restorative sanctuary for couples and solo guests seeking quiet contemplation and thermal waters.',
    recommendedSlug: 'courtyard-king',
    minNights: 2,
    defaultNights: 3,
    defaultGuests: 2,
    maxParty: 2,
    highlightsAr: ['إفطار عضوي بالمزرعة', 'جلسة استرخاء بالمسبح الحراري', 'شاي الأعشاب المسائي'],
    highlightsEn: ['Organic courtyard breakfast', 'Thermal plunge pool access', 'Evening botanical herbal infusions']
  },
  {
    id: 'heritage',
    titleAr: 'اكتشاف التراث ومائدة الواحة',
    titleEn: 'Heritage & Culinary Discovery',
    descAr: 'رحلة حية في التراث المعماري وعادات الضيافة الأصيلة مع تذوق وصفات الطهي البطيء التقليدية.',
    descEn: 'An authentic immersion into vernacular architecture, heritage storytelling, and slow tagine culinary crafts.',
    recommendedSlug: 'garden-studio',
    minNights: 2,
    defaultNights: 4,
    defaultGuests: 2,
    maxParty: 3,
    highlightsAr: ['جولة معمارية وتراثية', 'مائدة عشاء بمنتجات الواحة', 'أمسية في صالون المكتبة'],
    highlightsEn: ['Architectural vernacular tour', 'Farm-to-table tasting dinner', 'Heritage library salon evening']
  },
  {
    id: 'creative',
    titleAr: 'إقامة إبداعية وكتابة',
    titleEn: 'Creative Sabbatical & Writing',
    descAr: 'مساحة عمل هادئة بإضاءة طبيعية وتراس مستقل مخصصة للمفكرين والكتّاب والمبدعين.',
    descEn: 'A focused daylight workspace with a private terrace designed for writers, designers, and creative sabbaticals.',
    recommendedSlug: 'terrace-twin',
    minNights: 3,
    defaultNights: 7,
    defaultGuests: 1,
    maxParty: 2,
    highlightsAr: ['مكتب عمل خشبي مستقل', 'خدمة قهوة مختصة بالغرفة', 'تراس خاص بفيو مفتوح'],
    highlightsEn: ['Private artisan timber desk', 'Specialty room pour-over coffee', 'Secluded writing terrace view']
  },
  {
    id: 'family',
    titleAr: 'جناح الفناء العائلي',
    titleEn: 'Private Courtyard Family Suite',
    descAr: 'جناح رحب يجمع غرفتين متصلتين مع فناء مغلق يوفر الخصوصية والراحة التامة للأسرة.',
    descEn: 'Generous multi-room suite with an interconnected private cloistered courtyard for intimate families.',
    recommendedSlug: 'palm-suite',
    minNights: 2,
    defaultNights: 5,
    defaultGuests: 3,
    maxParty: 4,
    highlightsAr: ['غرفتان مع فناء خاص', 'قائمة طعام مناسبة للأطفال', 'خدمة استقبال وترحيب عائلية'],
    highlightsEn: ['Interconnected dual chambers', 'Child-friendly wholesome dining', 'Dedicated family concierge host']
  }
];

export function OasisStayCalibrator({ locale }: OasisStayCalibratorProps) {
  const isAr = locale === 'ar';
  const [selectedExp, setSelectedExp] = useState<StayExperience>('sanctuary');

  const currentProfile = EXPERIENCES.find((e) => e.id === selectedExp) || EXPERIENCES[0];
  const [nights, setNights] = useState<number>(currentProfile.defaultNights);
  const [guests, setGuests] = useState<number>(currentProfile.defaultGuests);

  const handleExpChange = (expId: StayExperience) => {
    setSelectedExp(expId);
    const p = EXPERIENCES.find((e) => e.id === expId);
    if (p) {
      setNights(p.defaultNights);
      setGuests(Math.min(guests, p.maxParty) || p.defaultGuests);
    }
  };

  // Find matching service from catalog
  const matchedService =
    OASIS.services.find((s) => s.slug === currentProfile.recommendedSlug) ||
    OASIS.services.find((s) => s.maxGuests >= guests) ||
    OASIS.services[0];

  return (
    <section
      data-sector-specific="oasis-stay-calibrator"
      className="bg-[#F5F0E6] border-y border-[#D9CDBB] py-16 sm:py-24"
      aria-labelledby="calibrator-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#46543C] text-[#F5F0E6] text-xs font-bold tracking-widest uppercase">
            <Compass size={14} className="text-white" />
            <span>{isAr ? 'منسق تجربة الإقامة' : 'Stay Curation Calibrator'}</span>
          </div>
          <h2
            id="calibrator-heading"
            className="mt-4 font-serif text-3xl sm:text-5xl font-normal text-[#282A25] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                صمم إقامتك على مهل <span className="block italic text-[#46543C]">بما يلائم إيقاعك وتطلعاتك</span>
              </>
            ) : (
              <>
                Curate Your Stay Slowly <span className="block italic text-[#46543C]">Around Your Personal Rhythm</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'حدد طبيعة زيارتك وعدد الضيوف ومدة الإقامة المقترحة لاكتشاف الجناح الأنسب لك وحزمة التجارب اليومية المعدّة بعناية.'
              : 'Select your travel intention, party size, and intended duration to explore our matching chamber concept and bespoke daily hospitality touches.'}
          </p>
        </div>

        {/* Calibrator Console */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D9CDBB] p-6 sm:p-8 space-y-8 shadow-sm">
            {/* Step 1: Stay Intentions */}
            <div>
              <label className="block text-xs font-bold text-[#46543C] uppercase tracking-wider mb-3">
                {isAr ? '01 / غاية الزيارة ونمط الإقامة' : '01 / Travel Intention & Pace'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXPERIENCES.map((exp) => {
                  const active = exp.id === selectedExp;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => handleExpChange(exp.id)}
                      className={`text-start p-4 border transition-all ${
                        active
                          ? 'border-[#46543C] bg-[#46543C] text-white shadow-sm'
                          : 'border-[#D9CDBB] bg-[#F5F0E6] text-[#282A25] hover:border-[#46543C]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${active ? 'text-white' : 'text-[#282A25]'}`}>
                          {isAr ? exp.titleAr : exp.titleEn}
                        </span>
                        {active && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <p className={`mt-2 text-xs leading-5 line-clamp-2 ${active ? 'text-[#F5F0E6]' : 'text-[#334155]'}`}>
                        {isAr ? exp.descAr : exp.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="nights-slider"
                  className="text-xs font-bold text-[#46543C] uppercase tracking-wider"
                >
                  {isAr ? '02 / مدة الإقامة (عدد الليالي)' : '02 / Stay Duration (Nights)'}
                </label>
                <div className="font-mono text-xl font-bold text-[#282A25] bg-[#E7DCC9] px-3 py-1 border border-[#D9CDBB]">
                  {nights} {isAr ? (nights === 1 ? 'ليلة واحدة' : nights === 2 ? 'ليلتان' : 'ليالٍ') : nights === 1 ? 'Night' : 'Nights'}
                </div>
              </div>
              <input
                id="nights-slider"
                type="range"
                min={1}
                max={21}
                step={1}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                aria-label={isAr ? 'عدد الليالي' : 'Number of nights'}
                className="w-full h-3 bg-[#E7DCC9] rounded-none appearance-none cursor-pointer accent-[#46543C]"
              />
              <div className="flex justify-between text-xs text-[#334155] font-mono mt-2">
                <span>1 {isAr ? 'ليلة' : 'Night'}</span>
                <span>7 {isAr ? 'ليالٍ (أسبوع)' : 'Nights (1 Wk)'}</span>
                <span>21 {isAr ? 'ليلة (إقامة ممتدة)' : 'Nights (Extended)'}</span>
              </div>
            </div>

            {/* Step 3: Guest Party Occupancy */}
            <div>
              <label className="block text-xs font-bold text-[#46543C] uppercase tracking-wider mb-3">
                {isAr ? '03 / عدد الضيوف في الغرفة' : '03 / Room Occupancy'}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((n) => {
                  const active = guests === n;
                  const disabled = n > currentProfile.maxParty;
                  return (
                    <button
                      key={n}
                      type="button"
                      disabled={disabled}
                      onClick={() => setGuests(n)}
                      className={`p-3 border text-center transition-all ${
                        disabled
                          ? 'opacity-40 border-[#D9CDBB] bg-gray-100 cursor-not-allowed text-gray-500'
                          : active
                          ? 'border-[#46543C] bg-[#46543C] text-white'
                          : 'border-[#D9CDBB] bg-[#F5F0E6] text-[#282A25] hover:border-[#46543C]'
                      }`}
                    >
                      <div className="font-mono text-lg font-bold">{n}</div>
                      <div className="text-[11px] mt-1">{isAr ? (n === 1 ? 'ضيف' : 'ضيوف') : n === 1 ? 'Guest' : 'Guests'}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Recommendation Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#282A25] text-[#F5F0E6] p-7 sm:p-9 border border-[#282A25] space-y-6">
            <div>
              <p className="text-[#CBA676] text-xs font-bold tracking-widest uppercase">
                {isAr ? 'التوصية المقترحة لإقامتك' : 'Suggested Sanctuary Suite'}
              </p>
              <h3 className="mt-2 font-serif text-3xl font-normal text-white">
                {matchedService.title[locale]}
              </h3>
              <p className="mt-2 text-xs text-[#E7DCC9] leading-5">
                {matchedService.summary[locale]}
              </p>
            </div>

            {/* Room Features Card */}
            <div className="bg-[#363832] p-5 border border-[#484A43] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#CBA676]">
                <span className="uppercase tracking-wider">{isAr ? 'مواصفات الفئة' : 'Chamber Dossier'}</span>
                <span className="font-mono">OAS-{String(matchedService.rank).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white pt-1">
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-[#CBA676]" />
                  <span>{matchedService.maxGuests} {isAr ? 'ضيوف كحد أقصى' : 'Guests Max'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-[#CBA676]" />
                  <span>{nights} {isAr ? 'ليالٍ مقترحة' : 'Nights Planned'}</span>
                </div>
              </div>
              <p className="text-xs text-[#E7DCC9] leading-5 border-t border-[#484A43] pt-3">
                {matchedService.body[locale]}
              </p>
            </div>

            {/* Included Hospitality Touches */}
            <div>
              <div className="text-xs font-bold text-[#CBA676] uppercase tracking-wider mb-2">
                {isAr ? 'لمسات الضيافة المشمولة' : 'Curated Hospitality Touches'}
              </div>
              <ul className="space-y-2 text-xs text-[#F5F0E6]">
                {(isAr ? currentProfile.highlightsAr : currentProfile.highlightsEn).map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#CBA676] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-binding Notice */}
            <div className="border-t border-[#484A43] pt-4 flex gap-3 text-xs leading-5 text-[#E7DCC9]">
              <ShieldAlert size={18} className="text-[#CBA676] shrink-0 mt-0.5" />
              <p>
                {isAr
                  ? 'هذه التوصية استرشادية بحتة لتنظيم تفضيلات السفر. لا يمثل هذا العرض حجزاً فندقياً مؤكداً أو سعراً نهائياً، ويخضع للتأكيد الكتابي مع الفندق الفعلي.'
                  : 'This curation is purely demonstrative to align personal preferences. It confirms no reservation or pricing and requires verified written operator confirmation.'}
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <Link
                href={oasisPath(locale, 'stay')}
                className="w-full bg-[#CBA676] text-[#282A25] hover:bg-white transition-colors py-4 px-6 font-bold text-sm flex items-center justify-center gap-3"
              >
                <span>{isAr ? 'طلب تسجيل تفضيلات الإقامة' : 'Submit Stay Enquiry'}</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
