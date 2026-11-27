'use client';

import React, { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Scissors,
  Feather,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  HeartHandshake
} from 'lucide-react';

interface CraftPillar {
  id: string;
  badge: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  metrics: { labelEn: string; labelAr: string; value: string }[];
  artisanQuoteEn: string;
  artisanQuoteAr: string;
}

const PILLARS: CraftPillar[] = [
  {
    id: 'flax',
    badge: 'GOTS & OEKO-TEX 100',
    titleEn: 'Delta-Grown Long-Staple Egyptian Flax',
    titleAr: 'كتان دلتا النيل طويل التيلة العضوي',
    subtitleEn: 'Naturally Retted & Woven on Heritage Shuttle Looms',
    subtitleAr: 'معالج مائيًا طبيعيًا ومحاك على أنوال تقليدية نادرة',
    descriptionEn: 'Our linen originates from pesticide-free flax fields cultivated along the fertile silts of the Nile Delta. Traditionally dew and water-retted to preserve fiber strength and natural tactile luster without chemical bleaching agents.',
    descriptionAr: 'ينمو كتان نوريا في حقول خالية من المبيدات الكيميائية على ضفاف طمي النيل الخصيب. يعالج بالتعطين المائي الطبيعي للحفاظ على متانة الألياف وبريقها اللمسي النقي دون أي مبيضات صناعية قاسية.',
    metrics: [
      { labelEn: 'Fiber Staple Length', labelAr: 'طول تيلة الألياف', value: '45 — 60 cm' },
      { labelEn: 'Air Permeability', labelAr: 'معامل نفاذية الهواء', value: '1,420 L/m²/s' },
      { labelEn: 'Chemical Residue', labelAr: 'المتبقيات الكيميائية', value: '0.00% Zero Synthetics' },
      { labelEn: 'Thermal Cool Index', labelAr: 'مؤشر البرودة الحرارية', value: 'Q-Max 0.28 W/cm²' }
    ],
    artisanQuoteEn: 'Egyptian linen softens with every wash, telling the intimate story of its wearer over decades.',
    artisanQuoteAr: 'الكتان المصري الأصيل يزداد نعومة مع كل غسلة، ليروي قصة صاحبه عبر العقود.'
  },
  {
    id: 'stitching',
    badge: 'HERITAGE JOINERY',
    titleEn: 'Double-Needle Saddle Stitching & French Seams',
    titleAr: 'غرز السراجة اليدوية المزدوجة والخياطة الفرنسية المغلقة',
    subtitleEn: 'Zero Adhesive Bonding — 100% Linen Thread Integrity',
    subtitleAr: 'بدون أي غراء صناعي — حياكة يدوية بخيوط الكتان المشمع',
    descriptionEn: 'Every garment seam is enclosed in an encased French finish, preventing internal fraying and skin friction. Leather bags and accessories are pierced by pricking irons and saddle-stitched by hand using two needles simultaneously.',
    descriptionAr: 'تغلف كافة فواصل الثوب داخل درزات فرنسية مزدوجة ناعمة تمنع التنسل واحتكاك البشرة. كما تُثقب المصنوعات الجلدية بالشوكة المعدنية وتُحاك بسراجة يدوية بإبرتين متزامنتين لا تنفك أبدًا.',
    metrics: [
      { labelEn: 'Stitch Density', labelAr: 'كثافة الغرز في البوصة', value: '9 — 11 Stitches/Inch' },
      { labelEn: 'Seam Burst Resistance', labelAr: 'مقاومة انفصال الخياطة', value: '> 380 kPa' },
      { labelEn: 'Thread Composition', labelAr: 'تركيب خيط الحياكة', value: '100% Waxed Flax Cord' },
      { labelEn: 'Synthetic Fusing Interlining', labelAr: 'الحشوات البلاستيكية اللاصقة', value: '0% None Used' }
    ],
    artisanQuoteEn: 'A true hand saddle stitch cannot unravel even if a single surface loop is cut.',
    artisanQuoteAr: 'غرزة السراجة اليدوية المزدوجة يستحيل أن تنفرط حتى لو انقطع أحد الخيوط السطحية.'
  },
  {
    id: 'bias',
    badge: 'GEOMETRIC ATELIER',
    titleEn: 'Architectural Draping & 45-Degree True Bias Cutting',
    titleAr: 'التشكيل الهندسي والقص المائل بزاوية ٤٥ درجة',
    subtitleEn: 'Fluid Kinetic Drape That Accentuates Natural Movement',
    subtitleAr: 'انسيابية حركية حرة تتناغم مع الجسد دون تقييد',
    descriptionEn: 'Rather than following rigid industrial factory grids, our master pattern cutters drape fabric directly on antique studio forms, aligning warp and weft diagonally at 45 degrees so woven textiles mold organically around the body.',
    descriptionAr: 'بدلاً من خطوط المصانع الجاهزة، يعتمد مصممو الأتيليه أسلوب التشكيل المباشر على المانيكان، بمحاذاة السداء واللحمة قطرياً بزاوية ٤٥ درجة، مما يمنح الثوب انسيابية سائلة تتشكل عضوياً حول القوام.',
    metrics: [
      { labelEn: 'Bias Alignment Precision', labelAr: 'دقة زاوية ميل النسيج', value: 'Exact 45.0° Bias' },
      { labelEn: 'Fabric Pattern Waste', labelAr: 'الهدر في الباترون', value: '< 6% Circular Reused' },
      { labelEn: 'Dynamic Stretch Without Elastane', labelAr: 'المرونة الطبيعية بدون ليكرا', value: '+18% Mechanical Give' },
      { labelEn: 'Drape Coefficient', labelAr: 'معامل الانسياب النسيجي', value: '0.34 Fluid Luxury' }
    ],
    artisanQuoteEn: 'Cutting on the bias breathes life and fluidity into otherwise structured natural fibers.',
    artisanQuoteAr: 'القص المائل يبعث الحياة والانسيابية السائلة في الخامات الطبيعية الأصيلة.'
  },
  {
    id: 'provenance',
    badge: 'SLOW FASHION',
    titleEn: 'Fair Trade Artisan Guilds & Circular Lifecycle',
    titleAr: 'نقابات الحرفيين العادلة ودورة الاستدامة الكاملة',
    subtitleEn: 'Ethical Direct Compensation & Lifetime Atelier Care',
    subtitleAr: 'أجور عادلة مباشرة وضمان صيانة الأتيليه مدى الحياة',
    descriptionEn: 'Every garment bears a numbered label signed by the master tailor who oversaw its construction. We guarantee complimentary seam tightening, button replacement, and garment rejuvenation for the life of the piece.',
    descriptionAr: 'تحمل كل قطعة رقم تسلسلي فريد موقع من الخياط الحرفي الذي أتم حياكتها. نوفر خدمة صيانة الأتيليه المجانية مدى الحياة لإعادة شد الخيوط واستبدال الأزرار الصدفية وتجديد نضارة النسيج.',
    metrics: [
      { labelEn: 'Direct Artisan Pay Above Minimum', labelAr: 'نسبة الأجر فوق الحد الأدنى', value: '+240% Living Wage' },
      { labelEn: 'Artisan Workshop Experience', labelAr: 'متوسط خبرة صناع الأتيليه', value: '14+ Years Master Level' },
      { labelEn: 'Biodegradability at End of Life', labelAr: 'التحلل البيولوجي في التربة', value: '100% Soil Compostable' },
      { labelEn: 'Lifetime Repair Guarantee', labelAr: 'ضمان الصيانة والترميم', value: 'Complimentary for Life' }
    ],
    artisanQuoteEn: 'Luxury is not fast abundance; it is knowing the hands and heritage that created what you cherish.',
    artisanQuoteAr: 'الفخامة الحقيقية ليست في الوفرة السريعة، بل في معرفة الأيدي التي نسجت ما ترتديه بفخر.'
  }
];

interface Props {
  locale: Locale;
}

export function AureliaSavoirFaire({ locale }: Props) {
  const isAr = locale === 'ar';
  const [activeTab, setActiveTab] = useState<string>('flax');
  const pillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-[#E8E1D9]" aria-labelledby="savoir-faire-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0D8D0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715]/5 border border-[#DDD4CB] text-[#7A4232] text-xs font-semibold uppercase tracking-widest mb-3">
              <Leaf className="w-3.5 h-3.5" />
              <span>{isAr ? 'حرفية الأتيليه وسر الصنعة (Savoir-Faire)' : 'Master Craftsmanship & Savoir-Faire Standards'}</span>
            </div>
            <h2 id="savoir-faire-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715] tracking-tight">
              {isAr ? (
                <>معايير حياكة <span className="italic font-normal text-[#895549]">تدوم عبر الأجيال</span></>
              ) : (
                <>Artisan Standards <span className="italic font-normal text-[#895549]">Engineered to Endure</span></>
              )}
            </h2>
            <p className="text-[#695E57] text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {isAr
                ? 'فلسفة قائمة على الخامات الصافية، والدرزات الفرنسية المغلقة، وحيادية الأثر البيئي، مع رعاية متصلة لكل قطعة تخرج من استوديوهاتنا.'
                : 'A disciplined commitment to pure unblended textiles, closed French seams, zero synthetic fusing, and lifetime atelier rejuvenation.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#695E57] self-start md:self-auto">
            <span className="px-3 py-1 bg-[#FAF8F5] rounded-lg border border-[#E8E1D9] font-bold">
              OEKO-TEX & GOTS Certified
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 max-w-full">
          {PILLARS.map((p) => {
            const isSelected = p.id === activeTab;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(p.id)}
                aria-label={`Inspect ${p.badge}`}
                className={`px-4 py-3 rounded-2xl text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#1A1715] text-[#FAF8F5] border-[#1A1715] shadow-md'
                    : 'bg-[#FAF8F5] text-[#1A1715] border-[#E8E1D9] hover:border-[#1A1715]'
                }`}
              >
                <span className={`${isSelected ? 'text-[#D8B4A6]' : 'text-[#7A4232]'} font-black me-2`}>
                  {p.badge}
                </span>
                <span>{isAr ? p.titleAr.split('(')[0].trim() : p.titleEn.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Pillar Details Card */}
        <div className="bg-[#FAF8F5] border border-[#E8E1D9] rounded-3xl p-6 sm:p-12 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E0D8D0] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-[#895549]/10 text-[#7A4232] border border-[#895549]/20 rounded-md text-[11px] font-mono font-bold">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715]">
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-[#695E57] mt-1 font-mono">
                {isAr ? pillar.subtitleAr : pillar.subtitleEn}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto bg-white px-4 py-2 rounded-xl border border-[#E8E1D9] text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-[#1A1715]">{isAr ? 'معيار الجودة:' : 'Quality Protocol:'}</span>
              <span className="text-emerald-700 font-bold">VERIFIED</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#4A423D] leading-relaxed max-w-4xl">
            {isAr ? pillar.descriptionAr : pillar.descriptionEn}
          </p>

          {/* 4 Quantitative Laboratory Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillar.metrics.map((m, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E8E1D9] shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#7A4232] tracking-wider">
                    {isAr ? m.labelAr : m.labelEn}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-base font-bold text-[#1A1715] font-mono">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Master Artisan Quote */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] flex items-start gap-4">
            <span className="font-serif text-4xl text-[#895549] leading-none shrink-0">“</span>
            <div>
              <p className="font-serif italic text-sm sm:text-base text-[#1A1715] leading-relaxed">
                {isAr ? pillar.artisanQuoteAr : pillar.artisanQuoteEn}
              </p>
              <span className="text-[11px] font-mono text-[#695E57] block mt-2 uppercase tracking-wider">
                — {isAr ? 'كبير حرفيي الأتيليه بالقاهرة' : 'Noria Atelier Master Tailor, Cairo'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
