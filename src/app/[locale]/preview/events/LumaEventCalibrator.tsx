'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import Link from 'next/link';
import { lumaPath } from '@/lib/verticals/events/data';

interface EventTrack {
  slug: string;
  title: { ar: string; en: string };
  badge: { ar: string; en: string };
  baseWeeks: number;
  leadTimeMultiplier: number;
  summary: { ar: string; en: string };
  avFocus: { ar: string; en: string };
  stagingFocus: { ar: string; en: string };
  complianceCheck: { ar: string; en: string };
}

const EVENT_TRACKS: readonly EventTrack[] = [
  {
    slug: 'corporate-conferences',
    title: { ar: 'مؤتمرات الأعمال والقمم التنفيذية', en: 'Corporate Conferences & Summits' },
    badge: { ar: 'مؤسسي / أعمال', en: 'Enterprise' },
    baseWeeks: 8,
    leadTimeMultiplier: 1.2,
    summary: {
      ar: 'إدارة متكاملة للجلسات المتزامنة، تسجيل الحضور الرقمي، والبث المرئي عالي الدقة.',
      en: 'Comprehensive parallel breakout orchestration, smart registration, and low-latency broadcast.'
    },
    avFocus: {
      ar: 'مصفوفات صوتية موجهة (Line-Array) + شاشات LED متطورة بدقة 4K',
      en: 'Direct-dispersion line arrays + calibrated high-lumen 4K LED backdrops'
    },
    stagingFocus: {
      ar: 'منصة متحدثين رسمية + غرف تحضير VIP مجهزة بشاشات عودة',
      en: 'Executive speaker rostrum + backstage VIP green room with confidence monitors'
    },
    complianceCheck: {
      ar: 'تصاريح التجمع المؤسسي + مسارات إخلاء طوارئ معتمدة',
      en: 'Corporate assembly licensing + certified multi-zone emergency egress'
    }
  },
  {
    slug: 'brand-launches',
    title: { ar: 'إطلاق المنتجات وتجارب العلامات', en: 'Brand & Product Reveals' },
    badge: { ar: 'ابتكار وعلامات', en: 'Brand Launch' },
    baseWeeks: 10,
    leadTimeMultiplier: 1.3,
    summary: {
      ar: 'تصميم تجربة إبهار بصري تركز على لحظة الكشف وتفاعل الجمهور والإعلام مع المنتج.',
      en: 'High-impact sensory reveal choreography designed for press, influencers, and VIP buyers.'
    },
    avFocus: {
      ar: 'إضاءة متحركة DMX متزامنة مع العروض الموسيقية والمؤثرات البيئية',
      en: 'Timecode-synced moving heads + volumetric haze and laser mapping'
    },
    stagingFocus: {
      ar: 'منصة عرض دوارة ثلاثية الأبعاد + شاشات تفاعلية لاستعراض المنتج',
      en: 'Custom reveal podium / turntable with integrated live demonstration lighting'
    },
    complianceCheck: {
      ar: 'اعتماد أوزان التعليق السقفي (Rigging) لمعدات الكشف الثقيلة',
      en: 'Structural point-load certification for aerial reveal drapery & trusses'
    }
  },
  {
    slug: 'gala-dinners',
    title: { ar: 'حفلات التكريم والجوائز والضيافة الرفيعة', en: 'Gala Dinners & Award Ceremonies' },
    badge: { ar: 'ضيافة وجوائز', en: 'Gala & Honors' },
    baseWeeks: 7,
    leadTimeMultiplier: 1.1,
    summary: {
      ar: 'تناغم دقيق بين تقديم وجبات الضيافة الفاخرة وتوقيت تسليم الجوائز وفق جدول زمني محكم.',
      en: 'Seamless synchronization between formal haute cuisine banqueting and award presentations.'
    },
    avFocus: {
      ar: 'إضاءة طاولات خافتة وموجهة (Pin-spotting) + نظام صوتي محيطي متوازن',
      en: 'Precision floral pin-spotting + distributed zone-controlled acoustic wash'
    },
    stagingFocus: {
      ar: 'مسرح رئيسي بممرات صعود آمنة للفائزين ومنصة تصوير خلفية رسمية',
      en: 'Illuminated dual-access award stage + branded media photo wall'
    },
    complianceCheck: {
      ar: 'اشتراطات سلامة الأغذية وسعة الطاولات وممرات خدمة الضيافة',
      en: 'Hospitality circulation corridors + food hygiene safety clearances'
    }
  },
  {
    slug: 'exhibitions',
    title: { ar: 'المعارض والأجنحة المعمارية التفاعلية', en: 'Exhibition Pavilions & Activations' },
    badge: { ar: 'أجنحة ومعارض', en: 'Pavilion' },
    baseWeeks: 12,
    leadTimeMultiplier: 1.4,
    summary: {
      ar: 'تخطيط معماري للأجنحة يوازن بين انسيابية حركة الزوار وتوفير مساحات الاجتماع الخاصة.',
      en: 'Bespoke architectural booth build-outs optimizing visitor throughput and private B2B salons.'
    },
    avFocus: {
      ar: 'شاشات لمس تفاعلية + أنظمة صوت موجه موضعي لكل ركن عرض',
      en: 'Interactive touch kiosks + localized parametric acoustic domes'
    },
    stagingFocus: {
      ar: 'هياكل بناء معمارية مسبقة الصنع بمواد مقاومة للحريق',
      en: 'Class-A fire-rated prefabricated exhibition joinery and raised flooring'
    },
    complianceCheck: {
      ar: 'مخططات أحمال الكهرباء المعتمدة من إدارة مركز المعارض',
      en: 'Convention center certified three-phase electrical distribution diagrams'
    }
  }
];

export function LumaEventCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [selectedTrack, setSelectedTrack] = useState<string>('corporate-conferences');
  const [guestBand, setGuestBand] = useState<string>('150-299');
  const [venueStatus, setVenueStatus] = useState<string>('shortlisted');
  const [budgetBand, setBudgetBand] = useState<string>('premium');

  const currentTrack = EVENT_TRACKS.find((t) => t.slug === selectedTrack) ?? EVENT_TRACKS[0];

  // Dynamic Lead Time Calculation
  const attendanceMultiplier =
    guestBand === 'under-50'
      ? 0.8
      : guestBand === '50-149'
      ? 1.0
      : guestBand === '150-299'
      ? 1.2
      : guestBand === '300-499'
      ? 1.4
      : 1.7;

  const venuePrepWeeks = venueStatus === 'not-selected' ? 3 : venueStatus === 'shortlisted' ? 1.5 : 0;
  const estimatedLeadWeeksMin = Math.round((currentTrack.baseWeeks * attendanceMultiplier + venuePrepWeeks) * 0.9);
  const estimatedLeadWeeksMax = Math.round((currentTrack.baseWeeks * attendanceMultiplier + venuePrepWeeks) * 1.3);

  return (
    <section
      data-sector-specific="luma-production-calibrator"
      className="bg-[#FCF7F1] py-16 sm:py-24 border-b border-[#D8C7C4]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F1E4DF] border border-[#D8C7C4] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#874F63]">
            <Sliders size={14} />
            <span>{ar ? 'معاير الإنتاج التفاعلي للفعاليات' : 'Interactive Event Production Calibrator'}</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#291C2D] leading-tight">
            {ar ? 'حساب متطلبات الفعالية وتوقيتات الإنتاج' : 'Calibrate your event staging & production lead times'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A4650]">
            {ar
              ? 'اختر نوع الفعالية ونطاق الحضور لمعاينة الجدول الزمني التقديري للإنتاج، ومحددات الهندسة الصوتية، واشتراطات السلامة المعمارية قبل بدء أي تجهيز ميداني.'
              : 'Select your event format and attendance band to review estimated staging lead times, audio-visual technical rider specifications, and structural compliance milestones.'}
          </p>
        </div>

        {/* 4 Format Track Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENT_TRACKS.map((track) => {
            const isSelected = track.slug === selectedTrack;
            return (
              <button
                key={track.slug}
                type="button"
                onClick={() => setSelectedTrack(track.slug)}
                className={`text-start p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#291C2D] text-[#FCF7F1] border-[#291C2D] shadow-lg -translate-y-1'
                    : 'bg-white text-[#291C2D] border-[#D8C7C4] hover:border-[#874F63]'
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3 ${
                      isSelected ? 'bg-[#874F63] text-white' : 'bg-[#F1E4DF] text-[#874F63]'
                    }`}
                  >
                    {track.badge[locale]}
                  </span>
                  <h3 className="font-serif text-xl font-medium leading-snug">{track.title[locale]}</h3>
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      isSelected ? 'text-[#ECDDD8]' : 'text-[#5A4650]'
                    }`}
                  >
                    {track.summary[locale]}
                  </p>
                </div>
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold ${
                    isSelected ? 'border-[#5A4650] text-[#DCB8A6]' : 'border-[#F1E4DF] text-[#874F63]'
                  }`}
                >
                  <span>{ar ? 'اختر هذا النمط' : 'Select Format'}</span>
                  <CheckCircle2 size={16} className={isSelected ? 'opacity-100' : 'opacity-20'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Controls & Output Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#F1E4DF] border border-[#D8C7C4] p-6 sm:p-8 space-y-6">
            <h4 className="font-serif text-xl text-[#291C2D] font-medium border-b border-[#D8C7C4] pb-4">
              {ar ? 'معايير التخطيط الميداني' : 'Event Parameters'}
            </h4>

            {/* Attendance Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#874F63] mb-2">
                <Users size={14} className="inline me-1" />
                {ar ? 'نطاق الحضور المتوقع' : 'Target Guest Count'}
              </label>
              <select
                value={guestBand}
                onChange={(e) => setGuestBand(e.target.value)}
                className="w-full bg-white border border-[#AD979B] text-[#291C2D] text-sm p-3 font-medium focus:ring-2 focus:ring-[#874F63] outline-none"
              >
                <option value="under-50">{ar ? 'أقل من ٥٠ ضيفاً (لقاء تنفيذي مغلق)' : 'Under 50 (Executive Salon)'}</option>
                <option value="50-149">{ar ? '٥٠ – ١٤٩ ضيفاً (ندوة أو إطلاق متوسط)' : '50–149 (Medium Seminar / Reveal)'}</option>
                <option value="150-299">{ar ? '١٥٠ – ٢٩٩ ضيفاً (مؤتمر أو حفل عشاء رئيسي)' : '150–299 (Major Conference / Gala)'}</option>
                <option value="300-499">{ar ? '٣٠٠ – ٤٩٩ ضيفاً (قمة إقليمية واسعة)' : '300–499 (Regional Corporate Summit)'}</option>
                <option value="500-plus">{ar ? '٥٠٠+ ضيف (مؤتمر ضخم أو معرض عام)' : '500+ (Convention / Exhibition)'}</option>
              </select>
            </div>

            {/* Venue Readiness */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#874F63] mb-2">
                <MapPin size={14} className="inline me-1" />
                {ar ? 'حالة اختيار وتأكيد المكان' : 'Venue Readiness Status'}
              </label>
              <select
                value={venueStatus}
                onChange={(e) => setVenueStatus(e.target.value)}
                className="w-full bg-white border border-[#AD979B] text-[#291C2D] text-sm p-3 font-medium focus:ring-2 focus:ring-[#874F63] outline-none"
              >
                <option value="selected">{ar ? 'تم التعاقد واختيار القاعة رسمياً' : 'Contracted & Confirmed Venue'}</option>
                <option value="shortlisted">{ar ? 'خيارات مبدئية قيد المعاينة والمفاضلة' : 'Shortlisted Options (Under Review)'}</option>
                <option value="not-selected">{ar ? 'يلزم استكشاف واقتراح مواقع ملائمة' : 'Scouting & Inspection Required'}</option>
              </select>
            </div>

            {/* Budget Scope */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#874F63] mb-2">
                <Sparkles size={14} className="inline me-1" />
                {ar ? 'نطاق الميزانية ومستوى التجهيز' : 'Production Scope Tier'}
              </label>
              <select
                value={budgetBand}
                onChange={(e) => setBudgetBand(e.target.value)}
                className="w-full bg-white border border-[#AD979B] text-[#291C2D] text-sm p-3 font-medium focus:ring-2 focus:ring-[#874F63] outline-none"
              >
                <option value="essential">{ar ? 'أساسي (تجهيزات صوت وعرض قياسية)' : 'Essential (Standard AV & Backdrops)'}</option>
                <option value="standard">{ar ? 'نموذجي (إضاءة مسرحية متكاملة وإخراج)' : 'Standard (Full Theatrical Lighting & Run)'}</option>
                <option value="premium">{ar ? 'متميز (شاشات LED وبث وهياكل مخصصة)' : 'Premium (Bespoke Joinery & LED Stages)'}</option>
                <option value="flexible">{ar ? 'مفتوح / مفصل (تصميم تجربة معمارية كاملة)' : 'Bespoke / Custom Architecture'}</option>
              </select>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 bg-white border border-[#D8C7C4] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C7C4]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#874F63]">
                  {ar ? 'المخرجات الزمنية المقدرة' : 'Staging Output'}
                </p>
                <h4 className="mt-1 font-serif text-2xl text-[#291C2D]">
                  {currentTrack.title[locale]}
                </h4>
              </div>
              <div className="bg-[#291C2D] text-[#FCF7F1] px-5 py-3 text-center shrink-0">
                <div className="flex items-center gap-2 justify-center text-xs text-[#DCB8A6]">
                  <Clock size={14} />
                  <span>{ar ? 'المهلة المقترحة للتجهيز' : 'Production Lead Time'}</span>
                </div>
                <div className="font-serif text-2xl font-bold mt-1">
                  {estimatedLeadWeeksMin} – {estimatedLeadWeeksMax} {ar ? 'أسبوع' : 'Weeks'}
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4">
              <div className="p-4 bg-[#FCF7F1] border border-[#D8C7C4]">
                <p className="text-xs font-bold text-[#874F63] uppercase tracking-wide">
                  {ar ? 'محددات الهندسة الصوتية والمرئية (AV Technical Rider)' : 'Audio-Visual Engineering Rider'}
                </p>
                <p className="mt-1 text-sm text-[#291C2D] leading-relaxed">
                  {currentTrack.avFocus[locale]}
                </p>
              </div>

              <div className="p-4 bg-[#FCF7F1] border border-[#D8C7C4]">
                <p className="text-xs font-bold text-[#874F63] uppercase tracking-wide">
                  {ar ? 'هندسة المسرح وبروتوكول إدارة العرض (Run-of-Show)' : 'Stagecraft & Run-of-Show Protocol'}
                </p>
                <p className="mt-1 text-sm text-[#291C2D] leading-relaxed">
                  {currentTrack.stagingFocus[locale]}
                </p>
              </div>

              <div className="p-4 bg-[#FCF7F1] border border-[#D8C7C4]">
                <p className="text-xs font-bold text-[#874F63] uppercase tracking-wide">
                  {ar ? 'اشتراطات السلامة والامتثال الميداني' : 'Structural & Venue Safety Governance'}
                </p>
                <p className="mt-1 text-sm text-[#291C2D] leading-relaxed">
                  {currentTrack.complianceCheck[locale]}
                </p>
              </div>
            </div>

            {/* Strictly Non-Binding Notice */}
            <div className="p-4 bg-[#F1E4DF] border-s-4 border-[#874F63] flex gap-3 items-start">
              <ShieldCheck size={20} className="text-[#874F63] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-[#291C2D]">
                {ar
                  ? 'تنبيه تعاقدي: هذه المحاكاة لغايات الاسترشاد الإداري والتخطيط المبدئي فقط. لا تمثل حجزاً مؤكداً لمكان الفعالية أو التزاماً بأسعار الموردين أو موافقة على السعات دون معاينة ميدانية معتمدة.'
                  : 'Notice: Illustrative staging estimation only. Does not constitute a confirmed venue reservation, guaranteed vendor rate, or structural capacity approval prior to formal site audit.'}
              </p>
            </div>

            {/* Deep-link Action Button */}
            <div className="pt-2">
              <Link
                href={`${lumaPath(locale, 'enquiry')}?service=${currentTrack.slug}`}
                className="inline-flex items-center justify-center gap-3 w-full bg-[#291C2D] text-white py-4 px-6 font-bold text-sm hover:bg-[#874F63] transition-colors"
              >
                <span>
                  {ar
                    ? `إرسال ملف متطلبات لفعالية ${currentTrack.title.ar}`
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
