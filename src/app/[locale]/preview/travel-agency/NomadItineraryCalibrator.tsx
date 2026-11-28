'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Sun,
  Users,
  Route,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sliders
} from 'lucide-react';
import Link from 'next/link';
import { nomadPath } from '@/lib/verticals/travel-agency/data';

interface JourneyTrack {
  slug: string;
  country: 'egypt' | 'saudi-arabia';
  title: { ar: string; en: string };
  region: { ar: string; en: string };
  days: number;
  pace: string;
  summary: { ar: string; en: string };
  transport: { ar: string; en: string };
  culturalFocus: { ar: string; en: string };
  climateTip: { ar: string; en: string };
}

const FEATURED_TRACKS: readonly JourneyTrack[] = [
  {
    slug: 'cairo-heritage',
    country: 'egypt',
    title: { ar: 'القاهرة عبر العصور وأهرامات الجيزة', en: 'Cairo Through the Ages & Giza Plateau' },
    region: { ar: 'مصر — القاهرة والجيزة', en: 'Egypt — Cairo & Giza' },
    days: 3,
    pace: 'balanced',
    summary: {
      ar: 'ثلاثة أيام بين هضبة الجيزة ومتحف الحضارة والقاهرة التاريخية بأسواقها ومساجدها المملوكية.',
      en: 'Three days exploring the Giza pyramids, NMEC museum treasures, and historic Islamic Cairo alleys.'
    },
    transport: {
      ar: 'مركبة سياحية مكيفة خاصة مع سائق محترف لتجاوز زحام العاصمة بسلاسة',
      en: 'Private chauffeured climate-controlled executive van for seamless city navigation'
    },
    culturalFocus: {
      ar: 'جولات مشي برفقة مرشد أثري مرخص مع وقت كافٍ للراحة في مقاهي وسط البلد العريقة',
      en: 'Licensed Egyptologist-led walks with ample leisure intervals in Downtown heritage cafes'
    },
    climateTip: {
      ar: 'أفضل وقت: أكتوبر حتى إبريل. ابدأ زيارة الأهرامات في الصباح الباكر لتجنب حرارة الظهيرة',
      en: 'Optimal window: October to April. Morning plateau starts avoid midday thermal peaks'
    }
  },
  {
    slug: 'luxor-temples',
    country: 'egypt',
    title: { ar: 'الأقصر وعجائب الضفتين الخالدة', en: 'Luxor Across Both Banks of the Nile' },
    region: { ar: 'مصر — الأقصر وطيبة', en: 'Egypt — Luxor & Thebes' },
    days: 4,
    pace: 'balanced',
    summary: {
      ar: 'فصل متوازن بين معابد الكرنك والأقصر في الشرق، ومقابر وادي الملوك ومعبد حتشبسوت في الغرب.',
      en: 'Balanced separation between East Bank temples and West Bank royal necropolises.'
    },
    transport: {
      ar: 'معديات نيلية خاصة للتنقل بين الضفتين + سيارة مكيفة للمواقع الأثرية الغربية',
      en: 'Private Nile motorboat crossings paired with air-conditioned West Bank transfers'
    },
    culturalFocus: {
      ar: 'استراحة ظهيرة هادئة على ضفاف النيل لتجنب التعب والإرهاق من الزيارات المتتالية',
      en: 'Mandatory midday poolside or riverfront siestas preventing monument fatigue'
    },
    climateTip: {
      ar: 'أفضل وقت: نوفمبر حتى مارس. الزيارات الصباحية الباكرة للمقابر الملكية ضرورية',
      en: 'Prime season: November to March. Early morning royal tomb descents ensure cool air'
    }
  },
  {
    slug: 'aswan-nubian',
    country: 'egypt',
    title: { ar: 'أسوان ومعبد فيلة والقرى النوبية', en: 'Aswan, Philae Sanctuary & Nubian Shores' },
    region: { ar: 'مصر — أسوان والنيل الجنوبي', en: 'Egypt — Aswan & Nubia' },
    days: 3,
    pace: 'slow',
    summary: {
      ar: 'رحلة بطيئة على إيقاع النيل الخالد تجمع زيارة معبد فيلة في جزيرته وقوارب الفلوكة الشراعية.',
      en: 'Slow-travel rhythm on the Nile visiting island sanctuaries and heritage Nubian villages.'
    },
    transport: {
      ar: 'قوارب فلوكة خشبية شراعية تقليدية + قوارب نيلية سريعة لجزر المحمية',
      en: 'Traditional wooden sail feluccas for sunset cruising + private motor launches'
    },
    culturalFocus: {
      ar: 'التعرف على التراث النوبي، الحرف اليدوية، والتوابل الأصيلة مع مجتمعات محلية',
      en: 'Direct engagement with Nubian community artisans, botanical gardens, and spice markets'
    },
    climateTip: {
      ar: 'شمس أسوان دافئة ومثالية في فصل الشتاء. احرص على ارتداء قبعات ونظارات شمسية',
      en: 'Warm dry winter climate. Broad-brim sun hats and high-SPF protection recommended'
    }
  },
  {
    slug: 'jeddah-coast',
    country: 'saudi-arabia',
    title: { ar: 'جدة التاريخية وساحل البحر الأحمر', en: 'Historic Jeddah Al-Balad & Red Sea Coast' },
    region: { ar: 'السعودية — مكة المكرمة وجدة', en: 'Saudi Arabia — Historic Jeddah' },
    days: 4,
    pace: 'balanced',
    summary: {
      ar: 'اكتشاف البيوت الحجازية والرواشين التراثية في حي البلد العريق مع نسائم الكورنيش البحرية.',
      en: 'Exploring UNESCO coral stone townhouses, ornate Rawashin, and waterfront corniche culture.'
    },
    transport: {
      ar: 'مركبات مريحة مع مرشد محلي مرخص + مسارات مشي خاصة داخل حارات البلد القديمة',
      en: 'Chauffeured transport combined with pedestrian-only evening walks in historic lanes'
    },
    culturalFocus: {
      ar: 'تذوق المأكولات الحجازية التقليدية وزيارة معارض الفنون المعاصرة والمتاحف العريقة',
      en: 'Hejaz culinary tastings, traditional tea houses, and contemporary Saudi art galleries'
    },
    climateTip: {
      ar: 'المساء هو أفضل وقت للتجول في البلد مع انكسار الرطوبة وافتتاح المقاهي التقليدية',
      en: 'Late afternoons and evenings offer optimal breezes as heritage souks come alive'
    }
  }
];

export function NomadItineraryCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [selectedSlug, setSelectedSlug] = useState<string>('cairo-heritage');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [travelPace, setTravelPace] = useState<string>('balanced');
  const [groupType, setGroupType] = useState<string>('couple');
  const [travelSeason, setTravelSeason] = useState<string>('winter');

  const visibleTracks = FEATURED_TRACKS.filter((t) => {
    if (countryFilter === 'all') return true;
    return t.country === countryFilter;
  });

  const currentTrack =
    FEATURED_TRACKS.find((t) => t.slug === selectedSlug) ?? visibleTracks[0] ?? FEATURED_TRACKS[0];

  // Dynamic calculations
  const bufferDays = travelPace === 'slow' ? 2 : travelPace === 'balanced' ? 1 : 0;
  const totalRecommendedDays = currentTrack.days + bufferDays;

  return (
    <section
      data-sector-specific="nomad-itinerary-calibrator"
      className="bg-[#FFF9F0] py-16 sm:py-24 border-b border-[#DDD0BD]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F4EBDD] border border-[#DDD0BD] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#944129]">
            <Sliders size={14} />
            <span>{ar ? 'معاير المسارات والرحلات التفاعلي' : 'Interactive Itinerary & Pace Calibrator'}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#18352E] leading-tight">
            {ar ? 'صمم رحلتك بالوتيرة التي تناسبك' : 'Calibrate your journey pace, transit & seasonal flow'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3D5249]">
            {ar
              ? 'اختر الوجهة ونمط السفر المرغوب لمعاينة التوزيع الزمني المقترح، وسائل التنقل المريحة، وأيام الاستراحة لضمان تجربة عميقة خالية من الإرهاق.'
              : 'Select your preferred destination and travel style to review recommended duration buffers, climate-adapted ground transit, and cultural immersion checkpoints.'}
          </p>
        </div>

        {/* Country Filter Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 pb-6 border-b border-[#DDD0BD]">
          {[
            { id: 'all', ar: 'جميع الوجهات', en: 'All Destinations' },
            { id: 'egypt', ar: 'مصر (الأقصر، القاهرة، أسوان)', en: 'Egypt (Cairo, Luxor, Aswan)' },
            { id: 'saudi-arabia', ar: 'المملكة العربية السعودية (جدة، العلا)', en: 'Saudi Arabia (Jeddah, AlUla)' }
          ].map((tab) => {
            const active = countryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCountryFilter(tab.id)}
                aria-pressed={active}
                className={`px-4 py-2.5 text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#18352E] text-white shadow-sm'
                    : 'bg-[#F4EBDD] text-[#18352E] hover:bg-[#EAD8C7]'
                }`}
              >
                {ar ? tab.ar : tab.en}
              </button>
            );
          })}
        </div>

        {/* 4 Featured Journey Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleTracks.map((track) => {
            const isSelected = track.slug === currentTrack.slug;
            return (
              <button
                key={track.slug}
                type="button"
                onClick={() => setSelectedSlug(track.slug)}
                className={`text-start p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#18352E] text-[#FFF9F0] border-[#18352E] shadow-lg -translate-y-1'
                    : 'bg-white text-[#18352E] border-[#DDD0BD] hover:border-[#944129]'
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3 ${
                      isSelected ? 'bg-[#944129] text-white' : 'bg-[#F4EBDD] text-[#944129]'
                    }`}
                  >
                    {track.region[locale]}
                  </span>
                  <h3 className="font-serif text-xl font-medium leading-snug">{track.title[locale]}</h3>
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      isSelected ? 'text-[#E2E7DF]' : 'text-[#3D5249]'
                    }`}
                  >
                    {track.summary[locale]}
                  </p>
                </div>
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold ${
                    isSelected ? 'border-[#3D5249] text-[#E0AB6A]' : 'border-[#F4EBDD] text-[#944129]'
                  }`}
                >
                  <span>{track.days} {ar ? 'أيام برنامج' : 'Days Core'}</span>
                  <CheckCircle2 size={16} className={isSelected ? 'opacity-100' : 'opacity-20'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Calibrator Controls & Dynamic Summary */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-5 bg-[#F4EBDD] border border-[#DDD0BD] p-6 sm:p-8 space-y-6">
            <h4 className="font-serif text-xl text-[#18352E] font-medium border-b border-[#DDD0BD] pb-4">
              {ar ? 'تخصيص وتيرة الرحلة' : 'Travel Preferences'}
            </h4>

            {/* Travel Pace */}
            <div>
              <label htmlFor="nomad-travel-pace" className="block text-xs font-bold uppercase tracking-wider text-[#944129] mb-2">
                <Compass size={14} className="inline me-1" />
                {ar ? 'وتيرة الرحلة ونمط الاستكشاف' : 'Travel Rhythm & Pace'}
              </label>
              <select
                id="nomad-travel-pace"
                aria-label={ar ? 'وتيرة الرحلة' : 'Travel Pace'}
                value={travelPace}
                onChange={(e) => setTravelPace(e.target.value)}
                className="w-full bg-white border border-[#CBBB9E] text-[#18352E] text-sm p-3 font-medium focus:ring-2 focus:ring-[#944129] outline-none"
              >
                <option value="slow">{ar ? 'رحلة هادئة (صباح مرن + استراحة ظهيرة كاملة)' : 'Slow Travel (Gentle starts + full midday rest)'}</option>
                <option value="balanced">{ar ? 'متوازنة (زيارات رئيسية محددة مع وقت حر)' : 'Balanced (Key antiquities + leisure windows)'}</option>
                <option value="active">{ar ? 'نشطة (انطلاق مبكر واستكشاف ميداني موسع)' : 'Active (Early departures + extensive walking)'}</option>
              </select>
            </div>

            {/* Group Composition */}
            <div>
              <label htmlFor="nomad-group-type" className="block text-xs font-bold uppercase tracking-wider text-[#944129] mb-2">
                <Users size={14} className="inline me-1" />
                {ar ? 'طبيعة وتكوين المجموعة' : 'Travel Party Composition'}
              </label>
              <select
                id="nomad-group-type"
                aria-label={ar ? 'طبيعة المجموعة' : 'Party Composition'}
                value={groupType}
                onChange={(e) => setGroupType(e.target.value)}
                className="w-full bg-white border border-[#CBBB9E] text-[#18352E] text-sm p-3 font-medium focus:ring-2 focus:ring-[#944129] outline-none"
              >
                <option value="solo">{ar ? 'مسافر مستقل (Solo Explorer)' : 'Solo Explorer'}</option>
                <option value="couple">{ar ? 'ثنائي / زوجان (Couple / Duo)' : 'Couple / Duo'}</option>
                <option value="family">{ar ? 'عائلة مع أطفال أو كبار سن (Family)' : 'Family with Children / Seniors'}</option>
                <option value="group">{ar ? 'مجموعة أصدقاء خاصة (Private Group)' : 'Private Affinity Group'}</option>
              </select>
            </div>

            {/* Season Window */}
            <div>
              <label htmlFor="nomad-travel-season" className="block text-xs font-bold uppercase tracking-wider text-[#944129] mb-2">
                <Sun size={14} className="inline me-1" />
                {ar ? 'موسم السفر المفضل' : 'Intended Travel Window'}
              </label>
              <select
                id="nomad-travel-season"
                aria-label={ar ? 'موسم السفر' : 'Travel Season'}
                value={travelSeason}
                onChange={(e) => setTravelSeason(e.target.value)}
                className="w-full bg-white border border-[#CBBB9E] text-[#18352E] text-sm p-3 font-medium focus:ring-2 focus:ring-[#944129] outline-none"
              >
                <option value="winter">{ar ? 'الخريف / الشتاء (نوفمبر – مارس: طقس مثالي)' : 'Autumn / Winter (Nov–Mar: Peak Season)'}</option>
                <option value="spring">{ar ? 'الربيع (أبريل – مايو: طقس معتدل)' : 'Spring (Apr–May: Shoulder Season)'}</option>
                <option value="summer">{ar ? 'الصيف (يونيو – سبتمبر: عروض سواحل وواحات)' : 'Summer (Jun–Sep: Coastal Focus)'}</option>
              </select>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-7 bg-white border border-[#DDD0BD] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDD0BD]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#944129]">
                  {ar ? 'المسار المعاير' : 'Calibrated Route'}
                </p>
                <h4 className="mt-1 font-serif text-2xl text-[#18352E]">
                  {currentTrack.title[locale]}
                </h4>
              </div>
              <div className="bg-[#18352E] text-[#FFF9F0] px-5 py-3 text-center shrink-0">
                <div className="flex items-center gap-2 justify-center text-xs text-[#E0AB6A]">
                  <Calendar size={14} />
                  <span>{ar ? 'المدة المقترحة شاملة الراحة' : 'Suggested Duration'}</span>
                </div>
                <div className="font-serif text-2xl font-bold mt-1">
                  {totalRecommendedDays} {ar ? 'أيام' : 'Days'}
                </div>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF9F0] border border-[#DDD0BD]">
                <p className="text-xs font-bold text-[#944129] uppercase tracking-wide">
                  <Route size={14} className="inline me-1" />
                  {ar ? 'وسيلة النقل والانتقالات المعتمدة' : 'Ground Transit & Transfer Strategy'}
                </p>
                <p className="mt-1 text-sm text-[#18352E] leading-relaxed">
                  {currentTrack.transport[locale]}
                </p>
              </div>

              <div className="p-4 bg-[#FFF9F0] border border-[#DDD0BD]">
                <p className="text-xs font-bold text-[#944129] uppercase tracking-wide">
                  <Compass size={14} className="inline me-1" />
                  {ar ? 'العمق الثقافي ومسارات التجربة' : 'Cultural Immersion & Local Pacing'}
                </p>
                <p className="mt-1 text-sm text-[#18352E] leading-relaxed">
                  {currentTrack.culturalFocus[locale]}
                </p>
              </div>

              <div className="p-4 bg-[#FFF9F0] border border-[#DDD0BD]">
                <p className="text-xs font-bold text-[#944129] uppercase tracking-wide">
                  <Sun size={14} className="inline me-1" />
                  {ar ? 'نصائح الطقس والراحة البدنية' : 'Climate & Physical Comfort Guidelines'}
                </p>
                <p className="mt-1 text-sm text-[#18352E] leading-relaxed">
                  {currentTrack.climateTip[locale]}
                </p>
              </div>
            </div>

            {/* Non-Binding Advisory Box */}
            <div className="p-4 bg-[#F4EBDD] border-s-4 border-[#944129] flex gap-3 items-start">
              <ShieldCheck size={20} className="text-[#944129] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-[#18352E]">
                {ar
                  ? 'تنبيه تعاقدي: هذا المسار لأغراض التخطيط والاسترشاد فقط. لا يمثل تذكرة طيران، حجز فندق، أو تصريح دخول مؤكد. يجب التعاقد مع مشغل سياحي مرخص لاعتماد الجدول والأسعار الرسمية.'
                  : 'Notice: Editorial planning outline only. Does not constitute a flight ticket, hotel reservation, or confirmed monument admission. Formal delivery requires a licensed travel operator.'}
              </p>
            </div>

            {/* Deep-link Action Button */}
            <div className="pt-2">
              <Link
                href={`${nomadPath(locale, 'quote')}?journey=${currentTrack.slug}`}
                className="inline-flex items-center justify-center gap-3 w-full bg-[#18352E] text-white py-4 px-6 font-bold text-sm hover:bg-[#944129] transition-colors"
              >
                <span>
                  {ar
                    ? `إرسال ملف تخطيط لبرنامج ${currentTrack.title.ar}`
                    : `Submit Planning Brief for ${currentTrack.title.en}`}
                </span>
                <Arrow size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
