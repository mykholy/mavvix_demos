'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Feather,
  Layers,
  Palette,
  Clock
} from 'lucide-react';

interface Silhouette {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryEn: string;
  categoryAr: string;
  basePriceEgp: number;
  craftHours: number;
  descriptionEn: string;
  descriptionAr: string;
  sku: string;
}

const SILHOUETTES: Silhouette[] = [
  {
    id: 'kimono',
    nameEn: 'Architectural Linen Kimono',
    nameAr: 'كيمونو الكتان المعماري الفضفاض',
    categoryEn: 'Outerwear & Robes',
    categoryAr: 'الأرواب والعباءات المعمارية',
    basePriceEgp: 3450,
    craftHours: 14,
    descriptionEn: 'Drop-shoulder relaxed silhouette with structured wide cuffs and hand-finished French flat-felled seams.',
    descriptionAr: 'قصة كتف مريحة مع أساور عريضة هندسية وخياطة فرنسية مسطحة مشطبة يدوياً.',
    sku: 'NORIA-KIMONO-01'
  },
  {
    id: 'midi-dress',
    nameEn: 'Belted Sculptural Midi Dress',
    nameAr: 'فستان الميدي المنحوت مع حزام قماشي',
    categoryEn: 'Atelier Dresses',
    categoryAr: 'فساتين الأتيليه الحصرية',
    basePriceEgp: 4200,
    craftHours: 18,
    descriptionEn: 'Fitted waist with architectural box pleats, concealed side seam pockets and mother-of-pearl button closure.',
    descriptionAr: 'خصر محدد مع طيات هندسية مدمجة وجيوب جانبية خفية وأزرار من صدف اللؤلؤ الطبيعي.',
    sku: 'NORIA-DRESS-02'
  },
  {
    id: 'slip-dress',
    nameEn: 'Raw Mulberry Silk Bias Slip',
    nameAr: 'فستان الحرير التوتي المنساب بالقص المائل',
    categoryEn: 'Silk Edition',
    categoryAr: 'إصدار الحرير الخالص',
    basePriceEgp: 5100,
    craftHours: 16,
    descriptionEn: 'Cut on the true 45-degree bias for liquid body drape, finished with rolled baby hems and delicate micro-straps.',
    descriptionAr: 'مقصوص بزاوية 45 درجة حقيقية لانسياب انسيابي مع حواف ناعمة مشغولة بدقة ميكرو.',
    sku: 'NORIA-SLIP-03'
  },
  {
    id: 'tote',
    nameEn: 'Artisanal Saddle-Stitched Tote',
    nameAr: 'حقيبة التسوق الجلدية المخيطة بسراجة يدوية',
    categoryEn: 'Leather Goods',
    categoryAr: 'المصنوعات الجلدية الحرفية',
    basePriceEgp: 6800,
    craftHours: 24,
    descriptionEn: 'Full-grain vegetable-tanned leather, double-needle linen thread saddle stitch, raw beveled and burnished edges.',
    descriptionAr: 'جلد طبيعي مدبوغ نباتياً بالكامل، محاك بخيط الكتان المزدوج وحواف مصقولة يدوياً بحرفية.',
    sku: 'NORIA-TOTE-04'
  }
];

interface FabricOption {
  id: string;
  nameEn: string;
  nameAr: string;
  hex: string;
  weightGsm: number;
  originEn: string;
  originAr: string;
}

const FABRICS: FabricOption[] = [
  {
    id: 'nile-sand',
    nameEn: 'Nile Sand Raw Linen',
    nameAr: 'كتان رمال النيل غير المعالج',
    hex: '#D7C4B2',
    weightGsm: 280,
    originEn: 'Delta Grown Organic Flax',
    originAr: 'كتان عضوي نقي من دلتا النيل'
  },
  {
    id: 'desert-obsidian',
    nameEn: 'Charred Obsidian Black',
    nameAr: 'أسود بركاني فحمي داكن',
    hex: '#23201D',
    weightGsm: 320,
    originEn: 'Vat-Dyed Organic Flax',
    originAr: 'كتان مصبوغ بأصباغ نباتية آمنة'
  },
  {
    id: 'terracotta',
    nameEn: 'Sun-Drenched Clay Terracotta',
    nameAr: 'طمي التيراكوتا المشمس الدافئ',
    hex: '#A45D4B',
    weightGsm: 260,
    originEn: 'Mineral Washed Linen',
    originAr: 'كتان مغسول بأملاح معدنية طبيعية'
  },
  {
    id: 'mulberry-ivory',
    nameEn: 'Raw Mulberry Silk Ivory',
    nameAr: 'حرير توتي خام بلون العاج الطبيعي',
    hex: '#EFE9DE',
    weightGsm: 110,
    originEn: 'Pure Mulberry Filament Silk',
    originAr: 'حرير توتي فاخر خفيف الانسياب'
  }
];

interface HardwareOption {
  id: string;
  nameEn: string;
  nameAr: string;
  finishCode: string;
}

const HARDWARES: HardwareOption[] = [
  { id: 'brass', nameEn: 'Brushed Champagne Brass', nameAr: 'نحاس شامبانيا مطفأ مصقول', finishCode: 'CB-18' },
  { id: 'silver', nameEn: 'Hand-Hammered Sterling Silver', nameAr: 'فضة إسترلينية مطروقة يدوياً', finishCode: 'SS-925' },
  { id: 'gold', nameEn: 'Rose Vermeil Gold Accents', nameAr: 'تفاصيل فيرميل الذهب الوردي', finishCode: 'RG-14' },
  { id: 'ruthenium', nameEn: 'Smoked Ruthenium Gunmetal', nameAr: 'روثينيوم مدخن داكن مضاد للخدش', finishCode: 'RU-01' }
];

interface Props {
  locale: Locale;
}

export function AureliaAtelierConfigurator({ locale }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedSilhouetteId, setSelectedSilhouetteId] = useState<string>('kimono');
  const [selectedFabricId, setSelectedFabricId] = useState<string>('nile-sand');
  const [selectedHardwareId, setSelectedHardwareId] = useState<string>('brass');
  const [monogramText, setMonogramText] = useState<string>('');
  const [orderedNotice, setOrderedNotice] = useState<boolean>(false);

  const silhouette = SILHOUETTES.find((s) => s.id === selectedSilhouetteId) || SILHOUETTES[0];
  const fabric = FABRICS.find((f) => f.id === selectedFabricId) || FABRICS[0];
  const hardware = HARDWARES.find((h) => h.id === selectedHardwareId) || HARDWARES[0];

  // Dynamic price calculation
  const fabricSurcharge = fabric.id === 'mulberry-ivory' ? 950 : fabric.id === 'desert-obsidian' ? 300 : 0;
  const hardwareSurcharge = hardware.id === 'gold' ? 650 : hardware.id === 'silver' ? 450 : 0;
  const monogramSurcharge = monogramText.trim().length > 0 ? 350 : 0;
  const totalPriceEgp = silhouette.basePriceEgp + fabricSurcharge + hardwareSurcharge + monogramSurcharge;

  return (
    <section className="bg-[#FAF8F5] py-16 sm:py-24 border-y border-[#E8E1D9]" aria-labelledby="atelier-configurator-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E0D8D0]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715]/5 border border-[#DDD4CB] text-[#7A4232] text-xs font-semibold uppercase tracking-widest mb-3">
              <Scissors className="w-3.5 h-3.5" />
              <span>{isAr ? 'استوديو التخصيص الحرفي للأزياء' : 'Bespoke Atelier Garment Configurator'}</span>
            </div>
            <h2 id="atelier-configurator-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715] tracking-tight">
              {isAr ? (
                <>صمم قطعتك الخاصة <span className="italic font-normal text-[#895549]">بحرفية الأتيليه</span></>
              ) : (
                <>Commission Your <span className="italic font-normal text-[#895549]">Bespoke Atelier Cut</span></>
              )}
            </h2>
            <p className="text-[#695E57] text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {isAr
                ? 'اختر القصة المعمارية، ودرجة النسيج الطبيعي، ولمسات المعادن الثمينة مع نقش حروف اسمك يدوياً بخيوط الحرير أو الذهب.'
                : 'Select the architectural silhouette, pure natural textile weave, precious hardware finish, and personalized calligraphic monogramming.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#695E57]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
            <span>{isAr ? 'حياكة يدوية حسب الطلب' : 'Handcrafted Made-to-Order'}</span>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Silhouette Choice */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#7A4232] block">
                {isAr ? '١. اختيار القصة والتصميم المعماري' : '1. Choose Silhouette & Architecture'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SILHOUETTES.map((s) => {
                  const isSelected = s.id === selectedSilhouetteId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSilhouetteId(s.id)}
                      aria-label={`Select ${s.nameEn}`}
                      className={`p-4 rounded-2xl text-left rtl:text-right border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1A1715] text-[#FAF8F5] border-[#1A1715] shadow-md'
                          : 'bg-white text-[#1A1715] border-[#E8E1D9] hover:border-[#1A1715]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] uppercase tracking-wider font-mono ${isSelected ? 'text-[#D8B4A6]' : 'text-[#7A4232]'}`}>
                            {isAr ? s.categoryAr : s.categoryEn}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D8B4A6]" />}
                        </div>
                        <h4 className="font-serif text-sm font-bold">{isAr ? s.nameAr : s.nameEn}</h4>
                        <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#695E57]'}`}>
                          {isAr ? s.descriptionAr : s.descriptionEn}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-current/10 flex items-center justify-between text-xs font-mono">
                        <span>{s.basePriceEgp.toLocaleString()} EGP</span>
                        <span className="text-[11px] opacity-75">{s.craftHours}h {isAr ? 'حياكة' : 'craft'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Natural Textile Weave */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#7A4232] block">
                {isAr ? '٢. خامة النسيج والألياف الطبيعية' : '2. Natural Textile Weave & Colorway'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FABRICS.map((f) => {
                  const isSelected = f.id === selectedFabricId;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFabricId(f.id)}
                      aria-label={`Select fabric ${f.nameEn}`}
                      className={`p-3.5 rounded-xl text-left rtl:text-right border transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-white border-[#1A1715] shadow-md ring-1 ring-[#1A1715]'
                          : 'bg-white/70 border-[#E8E1D9] hover:border-[#DDD4CB]'
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full border border-black/10 shrink-0 shadow-inner"
                        style={{ backgroundColor: f.hex }}
                      ></span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#1A1715] truncate">
                          {isAr ? f.nameAr : f.nameEn}
                        </div>
                        <div className="text-[11px] text-[#695E57] font-mono mt-0.5">
                          {f.weightGsm} gsm • {isAr ? f.originAr : f.originEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Hardware & Metallic Trim */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#7A4232] block">
                {isAr ? '٣. لمسات المعادن الثمينة والأزرار' : '3. Precious Hardware & Button Accents'}
              </label>
              <div className="flex flex-wrap gap-2 max-w-full">
                {HARDWARES.map((h) => {
                  const isSelected = h.id === selectedHardwareId;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setSelectedHardwareId(h.id)}
                      aria-label={`Select hardware ${h.nameEn}`}
                      className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all border ${
                        isSelected
                          ? 'bg-[#1A1715] text-[#FAF8F5] border-[#1A1715] font-bold shadow-sm'
                          : 'bg-white text-[#1A1715] border-[#E8E1D9] hover:border-[#1A1715]'
                      }`}
                    >
                      <span>{isAr ? h.nameAr : h.nameEn}</span>
                      <span className="ms-2 opacity-70 text-[10px]">({h.finishCode})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Monogram Personalization */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#7A4232] block">
                {isAr ? '٤. تطريز الحروف المونوغرام (اختياري)' : '4. Bespoke Calligraphic Monogram (Optional)'}
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  maxLength={4}
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                  placeholder={isAr ? 'مثال: ن.أ (حد أقصى ٣ أحرف)' : 'e.g. N.A (Up to 3 Initials)'}
                  aria-label={isAr ? 'حروف المونوغرام' : 'Monogram initials'}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E1D9] text-xs font-mono font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-[#895549] text-[#1A1715] w-full sm:w-64"
                />
                <span className="text-[11px] text-[#695E57] font-sans">
                  {isAr ? '+٣٥٠ ج.م تطريز يدوي بخيوط الحرير الخالص' : '+350 EGP Hand-embroidered with pure silk thread'}
                </span>
              </div>
            </div>
          </div>

          {/* Live Summary Dossier Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E8E1D9] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D9]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A4232] block">
                  ATELIER SPECIFICATION // MADE-TO-MEASURE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715] mt-0.5">
                  {isAr ? silhouette.nameAr : silhouette.nameEn}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-xs font-mono font-bold text-[#7A4232] border border-[#E8E1D9]">
                {silhouette.sku}
              </span>
            </div>

            {/* Configured attributes table */}
            <div className="space-y-3 text-xs font-mono text-[#1A1715]">
              <div className="flex justify-between py-1.5 border-b border-[#FAF8F5]">
                <span className="text-[#695E57]">{isAr ? 'خامة النسيج:' : 'Selected Fabric:'}</span>
                <span className="font-bold">{isAr ? fabric.nameAr : fabric.nameEn}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#FAF8F5]">
                <span className="text-[#695E57]">{isAr ? 'وزن القماش والكثافة:' : 'Weave Density:'}</span>
                <span className="font-bold">{fabric.weightGsm} gsm</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#FAF8F5]">
                <span className="text-[#695E57]">{isAr ? 'المعادن والإكسسوار:' : 'Hardware Trim:'}</span>
                <span className="font-bold">{isAr ? hardware.nameAr.split('(')[0] : hardware.nameEn.split('(')[0]}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#FAF8F5]">
                <span className="text-[#695E57]">{isAr ? 'نقش المونوغرام:' : 'Personalized Monogram:'}</span>
                <span className="font-bold text-[#7A4232]">{monogramText.trim() ? monogramText.trim() : (isAr ? 'بدون تطريز' : 'None')}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#695E57]">{isAr ? 'مدة الحياكة اليدوية:' : 'Artisan Craft Duration:'}</span>
                <span className="font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7A4232]" />
                  <span>{silhouette.craftHours} {isAr ? 'ساعات عمل متقنة' : 'Master Craft Hours'}</span>
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D9] space-y-1">
              <span className="text-[11px] text-[#695E57] uppercase tracking-wider block font-mono">
                {isAr ? 'القيمة الإجمالية المقدرة للتفصيل' : 'Estimated Atelier Commission'}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-3xl font-bold text-[#1A1715]">
                  {totalPriceEgp.toLocaleString()} <span className="text-sm font-sans font-normal text-[#695E57]">EGP</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {isAr ? 'شحن مجاني بالقاهرة والخليج' : 'Complimentary GCC Delivery'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setOrderedNotice(true)}
                aria-label={isAr ? 'إضافة إلى حقيبة التسوق' : 'Add custom piece to bag'}
                className="w-full py-4 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8B4A6]" />
                <span>{isAr ? 'طلب تفصيل القطعة في الأتيليه' : 'Commission Atelier Piece'}</span>
                <Arrow className="w-4 h-4 text-[#D8B4A6]" />
              </button>

              <Link
                href={`/${locale}/preview/ecommerce/cart`}
                className="w-full py-3 rounded-xl bg-white border border-[#E8E1D9] hover:border-[#1A1715] text-[#1A1715] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{isAr ? 'عرض حقيبة المقتنيات' : 'View Shopping Bag'}</span>
              </Link>
            </div>

            {orderedNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>{isAr ? 'تم حفظ طلب التخصيص:' : 'Commission Saved:'}</strong>{' '}
                  {isAr
                    ? `تم تسجيل مواصفات ${silhouette.nameAr} بخامة ${fabric.nameAr} بنجاح ضمن جلسة العميل.`
                    : `Bespoke configuration for ${silhouette.nameEn} in ${fabric.nameEn} saved to customer session.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
