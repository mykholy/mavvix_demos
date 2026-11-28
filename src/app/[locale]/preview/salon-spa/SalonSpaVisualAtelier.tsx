'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  ExternalLink,
  X,
  Info,
  CheckCircle2,
  Scissors,
  Gem,
  Flower2,
  Sun,
  Eye
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { SALON_SPA_MEDIA_ASSETS, type SalonSpaMediaItem } from './media';

export function SalonSpaVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalAsset, setActiveModalAsset] = useState<SalonSpaMediaItem | null>(null);

  const categories = [
    { id: 'all', label: { ar: 'كافة الطقوس والتخصصات', en: 'All Visual Edits' }, icon: Sparkles },
    { id: 'hair', label: { ar: 'تصفيف وقص الشعر', en: 'Hair Artistry' }, icon: Scissors },
    { id: 'nails', label: { ar: 'العناية بالأظافر والطلاء', en: 'The Nail Edit' }, icon: Gem },
    { id: 'facial', label: { ar: 'العناية بالبشرة والترطيب', en: 'Facial Rituals' }, icon: Sparkles },
    { id: 'spa', label: { ar: 'التدليك والاسترخاء الحسي', en: 'Slow Wellness & Spa' }, icon: Flower2 },
    { id: 'interior', label: { ar: 'بيئة الصالون المعمارية', en: 'Salon Sanctuary' }, icon: Sun }
  ];

  const filteredAssets =
    selectedCategory === 'all'
      ? SALON_SPA_MEDIA_ASSETS
      : SALON_SPA_MEDIA_ASSETS.filter((a) => a.category === selectedCategory);

  return (
    <section
      data-sector-specific="velora-visual-atelier"
      className="py-20 sm:py-28 bg-[#4B2834] text-white border-t border-[#653D49] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#6E3C4B]">
          <div className="max-w-2xl">
            <p className="text-[#F1C3CD] text-xs font-bold tracking-[.22em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-[#F1C3CD]" />
              {ar ? 'أرشيف الجمال التحريري الموثق' : 'EDITORIAL BEAUTY MEDIA ATELIER'}
            </p>
            <h2 className="velora-display text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
              {ar ? (
                <>
                  جمال تحريري حقيقي. <span className="text-[#F1C3CD]">موثق بشفافية التراخيص والبصمة الرقمية.</span>
                </>
              ) : (
                <>
                  Genuine Editorial Visuals. <span className="text-[#F1C3CD]">Cryptographically Proven Provenance.</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#EAD0D5] mt-4 leading-8">
              {ar
                ? 'لا نعتمد على صور وهمية أو نتائج عميلات مفبركة؛ جميع الصور مأخوذة من مراجع فوتوغرافية عالمية مرخصة رسمياً (Creative Commons & Public Domain) مع توثيق اسم الفنان والبصمة المشفرة SHA-256.'
                : 'Zero fabricated client transformations. Every photograph is sourced from verified Creative Commons & CC0 repositories with strict author attribution and SHA-256 cryptographic validation.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const Icon = c.icon;
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#FAE9E5] text-[#4B2834] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon size={13} />
                  <span>{ar ? c.label.ar : c.label.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-[#3C1D27] rounded-2xl border border-[#653D49] overflow-hidden flex flex-col justify-between hover:border-[#F1C3CD]/60 transition-all shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2C121B]">
                <Image
                  src={asset.src}
                  alt={ar ? asset.alt.ar : asset.alt.en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C121B] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 end-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#4B2834]/90 text-[#F1C3CD] border border-[#6E3C4B] backdrop-blur-sm">
                    {asset.license}
                  </span>
                </div>

                <div className="absolute bottom-3 start-3 end-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F1C3CD] block mb-1">
                    {ar ? 'الفنان والمصدر' : 'Artist Attribution'}
                  </span>
                  <p className="text-xs font-extrabold text-white truncate">{asset.author}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#EAD0D5] leading-6 mb-4">
                    {ar ? asset.caption.ar : asset.caption.en}
                  </p>
                  <div className="space-y-1.5 text-[11px] font-mono text-[#D8B4BE] bg-[#2F1520] p-3 rounded-lg border border-[#522937]">
                    <div className="flex justify-between">
                      <span className="text-[#A87C89]">{ar ? 'الأبعاد' : 'Dimensions'}:</span>
                      <span>
                        {asset.width} × {asset.height} px
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#A87C89]">SHA-256:</span>
                      <span className="truncate max-w-[170px]" title={asset.sha256}>
                        {asset.sha256.substring(0, 16)}…
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalAsset(asset)}
                  className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAE9E5] text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <Eye size={14} />
                  <span>{ar ? 'فحص بيانات التحقق الكاملة' : 'View Cryptographic Provenance'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Provenance Modal */}
        {activeModalAsset && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="bg-[#FFFDF9] text-[#4B2834] rounded-3xl border border-[#DCC8C5] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
              <button
                type="button"
                onClick={() => setActiveModalAsset(null)}
                aria-label={ar ? 'إغلاق نافذة التوثيق' : 'Close modal'}
                className="absolute top-6 end-6 p-2 rounded-full bg-[#F4E8E5] text-[#4B2834] hover:bg-[#EBD8D5] transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-[#854D5C] mb-2">
                <ShieldCheck size={16} className="text-[#A46D7B]" />
                <span>{ar ? 'شهادة التوثيق والمصدر المفتوح' : 'Verified Provenance Certificate'}</span>
              </div>

              <h3 id="modal-title" className="velora-display text-xl sm:text-2xl font-bold text-[#4B2834]">
                {ar ? activeModalAsset.alt.ar : activeModalAsset.alt.en}
              </h3>

              <div className="mt-6 space-y-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FCF8F5] border border-[#EBDCD9] flex justify-between items-center">
                  <span className="font-bold text-[#704E59]">{ar ? 'المسار المحلي' : 'Local URI'}:</span>
                  <span className="font-mono text-[#4B2834]">{activeModalAsset.src}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FCF8F5] border border-[#EBDCD9] flex justify-between items-center">
                  <span className="font-bold text-[#704E59]">{ar ? 'المؤلف / المصور' : 'Creator'}:</span>
                  <span className="font-extrabold text-[#4B2834]">{activeModalAsset.author}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FCF8F5] border border-[#EBDCD9] flex justify-between items-center">
                  <span className="font-bold text-[#704E59]">{ar ? 'الترخيص القانوني' : 'License'}:</span>
                  <a
                    href={activeModalAsset.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#854D5C] hover:underline flex items-center gap-1.5"
                  >
                    <span>{activeModalAsset.license}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FCF8F5] border border-[#EBDCD9] flex justify-between items-center">
                  <span className="font-bold text-[#704E59]">{ar ? 'صفحة المصدر الأصلية' : 'Source File'}:</span>
                  <a
                    href={activeModalAsset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#854D5C] hover:underline flex items-center gap-1.5 truncate max-w-[280px]"
                  >
                    <span>Wikimedia Commons</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FCF8F5] border border-[#EBDCD9] flex flex-col gap-1.5">
                  <span className="font-bold text-[#704E59]">SHA-256 Digest:</span>
                  <span className="font-mono text-[11px] text-[#4B2834] break-all bg-white p-2 rounded-lg border border-[#EBDCD9]">
                    {activeModalAsset.sha256}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#F7ECE8] text-[#563440] text-xs leading-6 flex items-start gap-2.5">
                <Info size={16} className="text-[#854D5C] shrink-0 mt-0.5" />
                <p>
                  {ar
                    ? 'يتم تضمين هذا الأصل لتمثيل الهوية البصرية لصالونات التجميل في نموذج مافكس، مع التزام كامل بعدم انتحال ملكية الصور أو تقديمها كنتائج لعميلات فعليات.'
                    : 'This asset is integrated strictly to illustrate the aesthetic art direction in the Mavvix commercial prototype, honoring license terms without misrepresenting client outcomes.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalAsset(null)}
                className="mt-6 w-full py-3 rounded-full bg-[#4B2834] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#633B4A] transition-colors"
              >
                {ar ? 'إغلاق الشهادة' : 'Close Certificate'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
