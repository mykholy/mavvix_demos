'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { noriaAtelierPhotos, type NoriaAtelierPhoto } from '../media';
import {
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Info,
  CheckCircle2,
  Camera,
  Layers
} from 'lucide-react';

interface Props {
  locale: Locale;
}

export function AureliaVisualAtelier({ locale }: Props) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<NoriaAtelierPhoto | null>(null);

  const categories = [
    { id: 'all', en: 'All Creations', ar: 'كافة إبداعات الأتيليه' },
    { id: 'textiles', en: 'Pure Linen Weaves', ar: 'الكتان والأنسجة الطبيعية' },
    { id: 'haute_couture', en: 'Haute Couture Gowns', ar: 'فساتين السهرة الراقية' },
    { id: 'leather_craft', en: 'Handcrafted Leather', ar: 'المصنوعات الجلدية الحرفية' },
    { id: 'tailoring', en: 'Bespoke Atelier', ar: 'حياكة الأتيليه والتفصيل' },
    { id: 'jewelry', en: 'Artisanal Jewelry', ar: 'صياغة المجوهرات اليدوية' },
    { id: 'accessories', en: 'Fine Accessories', ar: 'الإكسسوارات واللؤلؤ' }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? noriaAtelierPhotos
    : noriaAtelierPhotos.filter((p) => p.category === selectedCategory);

  return (
    <section className="bg-[#141210] text-[#FAF8F5] py-16 sm:py-24 border-b border-[#26221E]" aria-labelledby="visual-atelier-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D8B4A6] text-xs font-semibold uppercase tracking-widest mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>{isAr ? 'الأرشيف البصري ومجلة الإطلالات' : 'Living Editorial Lookbook & Atelier Archive'}</span>
            </div>
            <h2 id="visual-atelier-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {isAr ? (
                <>توثيق بصري حي <span className="italic font-normal text-[#D8B4A6]">لفنون الحياكة والتطريز</span></>
              ) : (
                <>Living Visual Atelier: <span className="italic font-normal text-[#D8B4A6]">Tactile Haute Craft</span></>
              )}
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {isAr
                ? 'مجموعة فوتوغرافية توثق تفاصيل الأقمشة الطبيعية، وخياطة الجلود بسراجة يدوية، وصياغة الذهب، بأعلى درجات الدقة والتوثيق المفتوح.'
                : 'High-resolution photographic lookbook celebrating pure linen draping, bespoke leather crafting, museum evening silhouettes, and fine goldsmithing.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/60 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>6 Self-Hosted WebP Assets</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 max-w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-label={`Filter lookbook by ${cat.en}`}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#FAF8F5] text-[#141210] border-[#FAF8F5] shadow-md'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>

        {/* Lookbook Photographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-[#1C1816] border border-white/10 rounded-3xl overflow-hidden shadow-xl group hover:border-[#D8B4A6]/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-black/40">
                <Image
                  src={photo.url}
                  alt={isAr ? photo.titleAr : photo.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 bg-[#141210]/85 backdrop-blur-md rounded-full text-[10px] font-mono text-[#D8B4A6] font-bold border border-white/10 uppercase">
                  {photo.category.replace('_', ' ')}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-[#D8B4A6] transition-colors line-clamp-2">
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-white/50 mt-2">
                    <span>{photo.width} × {photo.height}</span>
                    <span>•</span>
                    <span>{(photo.bytes / 1024).toFixed(0)} KB WebP</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60 text-[11px] truncate max-w-[150px]">
                    {photo.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePhotoModal(photo)}
                    aria-label={`View provenance for ${photo.id}`}
                    className="text-[#D8B4A6] hover:text-white font-bold flex items-center gap-1 group/btn"
                  >
                    <span>{isAr ? 'توثيق الترخيص' : 'Provenance'}</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Disclosure Footer */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/70 text-xs leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#D8B4A6] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">{isAr ? 'إشعار الترخيص والتوثيق البصري:' : 'Licensed Photography & Art Direction Disclosure:'}</strong>{' '}
            {isAr
              ? 'الصور الفوتوغرافية المعروضة توثق فنون حياكة راقية، وتفاصيل نسيج طبيعي، ومصنوعات جلدية من مصادر موثقة ومفتوحة الترخيص (Creative Commons والمجال العام بما فيها مقتنيات متحف المتروبوليتان للفنون)، وتستخدم كاتجاه فني وتصميمي، وليست توثيقًا لمنتجات أو مرافق تجارية حصرية لنوريا أتيليه.'
              : 'Photographs show genuine haute couture tailoring, leather saddle stitching, artisanal goldsmithing, natural woven linen, and museum-curated evening gowns with verified open-license provenance (Creative Commons and Public Domain). They do NOT depict proprietary Noria Atelier commercial inventory, private atelier facilities, or guaranteed garment outcomes.'}
          </p>
        </div>
      </div>

      {/* Modal / Provenance Drawer */}
      {activePhotoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="bg-[#1C1816] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-xs font-mono shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[#D8B4A6] font-bold text-xs uppercase tracking-wider block">
                  {isAr ? 'توثيق حقوق الملكية الفكرية والترخيص' : 'Verified Provenance & License Dossier'}
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-1">
                  {isAr ? activePhotoModal.titleAr : activePhotoModal.titleEn}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                aria-label="Close modal"
                className="text-white/60 hover:text-white p-1 rounded-lg bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-white/10 text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">File Identifier:</span>
                <span className="text-white font-bold">{activePhotoModal.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Creator / Author:</span>
                <span className="text-[#D8B4A6] font-bold">{activePhotoModal.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">License Standard:</span>
                <span className="text-emerald-400 font-bold">{activePhotoModal.license}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Resolution & Format:</span>
                <span className="text-white">{activePhotoModal.width} × {activePhotoModal.height} (WebP)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Self-Hosted Bytes:</span>
                <span className="text-white">{activePhotoModal.bytes.toLocaleString()} bytes</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-white/50 block mb-1">SHA-256 Checksum:</span>
                <span className="text-[10px] text-[#D8B4A6] break-all select-all font-mono">
                  {activePhotoModal.sha256}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={activePhotoModal.source}
                target="_blank"
                rel="noreferrer"
                className="text-[#D8B4A6] hover:text-white underline flex items-center gap-1.5"
              >
                <span>{isAr ? 'عرض المصدر الأصلي في ويكيميديا' : 'View Source on Wikimedia Commons'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
