'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Flame, Sparkles, Compass, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { saffronTablePhotos, SaffronTablePhoto } from './media';

interface HeritagePillar {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageId: SaffronTablePhoto['id'];
  thesisEn: string;
  thesisAr: string;
  standardsEn: string[];
  standardsAr: string[];
  sourcingEn: string;
  sourcingAr: string;
}

const PILLARS: HeritagePillar[] = [
  {
    id: 'saffron-spices',
    nameEn: 'Mountain Saffron & Heirloom Spice Craft',
    nameAr: 'الزعفران الجبلي النقي وحرفية التوابل',
    subtitleEn: '100% full crimson stigmas, certified ISO 3632 Category I without artificial coloring',
    subtitleAr: 'خيوط قرمزية كاملة نقية ١٠٠٪ معتمدة بمعايير الأيزو العالمية ودون أي ملونات صناعية',
    imageId: 'saffron',
    thesisEn: 'We source only first-pick mountain saffron threads harvested exclusively at daybreak before the blossom fully opens to protect the volatile safranal and crocin aromatic compounds. Every batch is steeped in warm spring water for a minimum of 45 minutes before seasoning.',
    thesisAr: 'ننتقي خيوط الزعفران الجبلي الأولى المقطوفة فجرًا قبل تفتح الزهرة للحفاظ على تركيز الزيوت العطرية النادرة ومادة الكروسين القرمزية. تُنقع الخيوط في ماء نبع فاتر لمدة ٤٥ دقيقة قبل إضافتها للطواجن.',
    standardsEn: [
      'ISO 3632 Grade I crocin absorbance > 240',
      'Whole stigmas without yellow style dilution',
      'Hand-ground in chilled granite mortars',
      'Zero synthetic dyes, curcuma blends, or preservatives'
    ],
    standardsAr: [
      'مطابقة لمعيار أيزو الصنف الأول بدرجة نقاء فائقة',
      'خيوط كاملة دون أي تخفيف أو شوائب صفراء',
      'طحن يدوي في هاون من حجر الغرانيت البارد',
      'خالٍ تمامًا من الأصباغ المصنعة والكركم والمواد الحافظة'
    ],
    sourcingEn: 'Harvested from smallholder high-altitude organic crocus plots and preserved in dark violet glass jars.',
    sourcingAr: 'يُجنى من مزارع جبلية عضوية صغيرة ويُحفظ في أوانٍ زجاجية داكنة معتمة لحماية النكهة من الضوء.'
  },
  {
    id: 'clay-tagines',
    nameEn: 'Clay Tagine Convective Simmering',
    nameAr: 'طهو الطواجن الفخارية والتسوية البطيئة',
    subtitleEn: 'Unglazed earthenware pots, conical steam condensation, and 8-hour olive wood embers',
    subtitleAr: 'فخار طيني طبيعي غير مدهون، تكثيف بخاري مخروطي، وحرارة هادئة على جمر خشب الزيتون',
    imageId: 'tagine',
    thesisEn: 'True heritage braising requires porous clay that breathes. Our conical tagine lids condense seasoned steam and continuously baste lamb shanks and poultry, locking in collagen and marrow without requiring excess cooking fats or water baths.',
    thesisAr: 'التسوية الشرقية الأصيلة تستلزم فخارًا طينيًا يتنفس. غطاء الطاجن المخروطي يكثف الأبخرة المعطرة بالزعفران ويعيد تدويرها باستمرار على اللحم، مما يُذيب الأنسجة بنعومة فائقة دون الحاجة لزيوت زائدة.',
    standardsEn: [
      'Heavy natural clay cured with virgin olive oil',
      'Conical lid continuous self-basting physics',
      'Low indirect heat over aged olive wood coals',
      'Simmer times strictly between 4 to 8 hours'
    ],
    standardsAr: [
      'طين طبيعي معتق ومدهون بزيت الزيتون البكر',
      'فيزياء التكثيف والترطيب الذاتي المستمر للطبق',
      'حرارة هادئة غير مباشرة فوق جمر خشب الزيتون المعتق',
      'مدد طهو دقيقة تتراوح بين ٤ إلى ٨ ساعات كاملة'
    ],
    sourcingEn: 'Hand-thrown by master potters using untreated Nile and Sinai earthen riverbed clays.',
    sourcingAr: 'مسبوك يدويًا على يد أمهر صانعي الفخار من طمي النيل النقي وخامات سيناء الطبيعية.'
  },
  {
    id: 'hearth-breads',
    nameEn: 'Wood-Fired Hearth & Levain Sourdoughs',
    nameAr: 'خبز الحجر ونار الحطب والتخمير الطبيعي',
    subtitleEn: 'Stone-milled heritage wheat flours, 48-hour wild levain, and live refractory stone baking',
    subtitleAr: 'طحين قمح بلدي مطحون على الحجر، خميرة برية معتقة ٤٨ ساعة، وخبز على الحجر الناري المباشر',
    imageId: 'bread',
    thesisEn: 'Bread is the heart of the table. We reject commercial bakers yeast in favor of a 12-year-old sourdough mother culture nurtured with heritage stone-ground whole wheat. Each loaf is slapped directly onto 450°C clay refractory stones upon guest order.',
    thesisAr: 'الخبز هو روح المائدة وسيدها. نبتعد كليًا عن الخمائر الصناعية السريعة ونعتمد على خميرة بلدية معمرة عمرها ١٢ عامًا تتغذى على دقيق القمح الكامل، وتُخبز كل رغيفة على حجر ناري بدرجة ٤٥٠ مئوية فور طلب الضيف.',
    standardsEn: [
      '48-hour cold fermentation for complete starch breakdown',
      'Refractory volcanic stone oven floor at 450°C',
      'Local whole-grain flour with intact nutrient germ',
      'Served piping hot within 180 seconds of oven emergence'
    ],
    standardsAr: [
      'تخمير بارد لمدة ٤٨ ساعة لهضم كامل وسهل للنشويات',
      'أرضية فرن من الحجر البركاني بحرارة ٤٥٠ درجة مئوية',
      'قمح بلدي كامل محتفظ بجنين القمح وقيمته الغذائية',
      'يصل إلى مائدة الضيف ساخنًا خلال ١٨٠ ثانية من خروجه'
    ],
    sourcingEn: 'Locally grown Egyptian heirloom durum and emmer wheat stone-milled in Beni Suef.',
    sourcingAr: 'قمح بلدي مصري أصيل يُطحن على حجر الطواحين التراثية في بني سويف أسبوعياً.'
  },
  {
    id: 'grove-oils',
    nameEn: 'Cold-Pressed Micro-Grove Olive Oils',
    nameAr: 'زيت الزيتون البكر المعصور على البارد',
    subtitleEn: 'Single-estate groves from Siwa Oasis and Sinai, cold-extracted under 27°C, acidity < 0.3%',
    subtitleAr: 'مزارع واحة سيوة وسيناء المنعزلة، استخلاص على البارد دون حرارة، ونسبة حموضة أقل من ٠.٣٪',
    imageId: 'mezze',
    thesisEn: 'Cooking fat is not a cooking medium; it is a vital flavor pillar. We cook and finish exclusively with extra virgin olive oil cold-pressed within 6 hours of tree harvesting, bringing peppery poly-phenols and golden richness to every mezze plate.',
    thesisAr: 'الزيت لدينا ليس مجرد وسيط طهو، بل ركيزة أساسية للنكهة والصحة. نعتمد حصريًا على زيت زيتون بكر ممتاز يُعصر خلال ٦ ساعات من قطف الثمار، مما يمنحه قوامًا ذهبيًا ونفحة فلفلية مميزة وغنية بمضادات الأكسدة.',
    standardsEn: [
      'First cold extraction strictly below 27°C',
      'Free oleic acidity verified below 0.30%',
      'Unfiltered green-gold turbidity with rich polyphenols',
      'Zero refined, hydrogenated, or palm oil blends'
    ],
    standardsAr: [
      'عصرة أولى على البارد بدرجة حرارة أقل من ٢٧ مئوية',
      'نسبة حموضة حرة معتمدة مخبرياً دون ٠.٣٠٪',
      'غير مكرر ومحتفظ بلونه الأخضر الذهبي ومضادات الأكسدة',
      'خالٍ كلياً من الزيوت المهدرجة أو المكررة أو زيت النخيل'
    ],
    sourcingEn: 'Single-estate certified groves in Siwa Oasis and Mount Sinai foothill orchards.',
    sourcingAr: 'مزارع عائلية موثقة في واحة سيوة وسفوح جبال سيناء المباركة.'
  }
];

export function SaffronCulinaryHeritage({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [activePillarId, setActivePillarId] = useState<string>('saffron-spices');

  const pillar = PILLARS.find(p => p.id === activePillarId) || PILLARS[0];
  const photo = saffronTablePhotos.find(p => p.id === pillar.imageId) || saffronTablePhotos[0];

  return (
    <section className="bg-[#FAF7F2] rounded-[2rem] border border-[#321F18]/15 p-6 sm:p-10 lg:p-12 space-y-8" aria-labelledby="heritage-pillars-heading">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#321F18]/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#984321] font-bold">
            {isAr ? 'فلسفة الطهي وأصول المكونات' : 'Culinary Philosophy & Sourcing'}
          </span>
          <h2 id="heritage-pillars-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#321F18] mt-2">
            {isAr ? 'أربعة أركان تصنع أصالة النكهة' : 'Four Pillars of Kitchen Integrity'}
          </h2>
        </div>
        <Link
          href={`/${locale}/preview/restaurant/story`}
          className="font-mono text-xs font-semibold text-[#321F18] hover:text-[#984321] inline-flex items-center gap-1.5"
        >
          <span>{isAr ? 'قراءة قصة المطبخ كاملة' : 'Read Full Kitchen Story'}</span>
          <Arrow className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#F2EBDF] p-1.5 rounded-2xl border border-[#321F18]/10">
        {PILLARS.map(p => {
          const active = p.id === activePillarId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePillarId(p.id)}
              className={`p-3 rounded-xl font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                active
                  ? 'bg-[#321F18] text-[#FAF3E6] shadow-sm'
                  : 'text-[#321F18]/70 hover:text-[#321F18] hover:bg-white/60'
              }`}
              aria-label={isAr ? p.nameAr : p.nameEn}
            >
              <Flame className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-[#F2B38E]' : 'text-[#984321]'}`} />
              <span className="truncate">{isAr ? p.nameAr : p.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Card */}
      <div className="bg-white rounded-3xl border border-[#321F18]/15 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
        {/* Left: Philosophy & Standards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#984321] uppercase tracking-wider font-bold block">
              {isAr ? 'المعيار التراثي' : 'Heritage Protocol'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18]">
              {isAr ? pillar.nameAr : pillar.nameEn}
            </h3>
            <p className="font-mono text-xs text-[#321F18] font-medium">
              {isAr ? pillar.subtitleAr : pillar.subtitleEn}
            </p>
          </div>

          <p className="text-sm text-[#321F18]/80 leading-relaxed font-sans">
            {isAr ? pillar.thesisAr : pillar.thesisEn}
          </p>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#321F18]/10 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#321F18] block">
              {isAr ? 'ضوابط الجودة المتبعة بالمطبخ:' : 'Kitchen Operational Standards:'}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#321F18]/80 font-sans">
              {(isAr ? pillar.standardsAr : pillar.standardsEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#984321] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/preview/restaurant/menu`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#321F18] hover:bg-[#452B21] text-[#FAF3E6] text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <span>{isAr ? 'استكشف أطباق هذا المعيار' : 'Explore Dishes with this Standard'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F2B38E]" />
            </Link>
            <div className="font-mono text-xs text-[#62622F]">
              {isAr ? 'سفرة زعفران — مافيكس' : 'Saffron Table — Mavvix'}
            </div>
          </div>
        </div>

        {/* Right: Curated Photo Showcase */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#321F18]/15 bg-[#FAF7F2] shadow-inner group">
            <Image
              src={photo.url}
              alt={isAr ? photo.titleAr : photo.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-white font-mono text-[11px] flex justify-between items-end">
              <span className="truncate max-w-[80%]">{isAr ? photo.titleAr : photo.titleEn}</span>
              <span className="text-[#F2B38E] font-bold uppercase">{photo.category}</span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-[#321F18]/70 text-center">
            {photo.author} · {photo.license} ({photo.width}×{photo.height}px)
          </p>
        </div>
      </div>
    </section>
  );
}
