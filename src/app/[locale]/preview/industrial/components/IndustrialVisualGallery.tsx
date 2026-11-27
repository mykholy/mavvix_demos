'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { ferrolinePhotos, type FerrolinePhoto } from '../media';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Info,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface Props {
  locale: Locale;
}

export function IndustrialVisualGallery({ locale }: Props) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<FerrolinePhoto | null>(null);

  const categories = [
    { id: 'all', en: 'All Production Stages', ar: 'كافة مراحل الإنتاج والتصنيع' },
    { id: 'foundry', en: 'Foundry & Metallurgy', ar: 'السبك الحراري والمعادن' },
    { id: 'machining', en: 'CNC Machining', ar: 'التشغيل والتفريز الآلي' },
    { id: 'fabrication', en: 'Fiber Laser Cutting', ar: 'القص بألياف الليزر' },
    { id: 'robotics', en: 'Robotic Assembly', ar: 'اللحام الروبوتي الآلي' },
    { id: 'extrusion', en: 'Seamless Pipes', ar: 'المواسير غير الملحومة' },
    { id: 'materials', en: 'Coils & Logistics', ar: 'اللفائف والمستودعات' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? ferrolinePhotos
    : ferrolinePhotos.filter((p) => p.category === selectedCategory);

  return (
    <section className="bg-[#0B1523] text-white py-16 sm:py-20 border-b border-slate-800" aria-labelledby="industrial-gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'الأرشيف البصري لخطوط الإنتاج' : 'Living Production Archive & Visual Atelier'}</span>
            </div>
            <h2 id="industrial-gallery-heading" className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isAr ? (
                <>توثيق بصري حي <span className="text-[#DE9E37]">لمنشآت وسلاسل التوريد</span></>
              ) : (
                <>Living Visual Archive: <span className="text-[#DE9E37]">Metallurgy & Heavy Industry</span></>
              )}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {isAr
                ? 'استعراض مصور لعمليات الصهر الحراري وتشكيل القطاعات وقطع ألواح الصلب بالليزر وتجهيز الشحنات التصديرية مع كامل بيانات التوثيق والترخيص المفتوح.'
                : 'High-resolution photographic documentation of metallurgical casting, 5-axis CNC machining, high-power fiber laser cutting, and seaworthy logistics.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-start md:self-auto">
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
                aria-label={`Filter by ${cat.en}`}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#DE9E37] text-slate-950 border-[#DE9E37] shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>

        {/* Photographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg group hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <Image
                  src={photo.url}
                  alt={isAr ? photo.titleAr : photo.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 bg-slate-950/85 backdrop-blur-md rounded-md text-[11px] font-mono text-amber-400 font-bold border border-slate-800">
                  {photo.category.toUpperCase()}
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-2">
                    <span>{photo.width} × {photo.height}</span>
                    <span>•</span>
                    <span>{(photo.bytes / 1024).toFixed(0)} KB WebP</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[11px] truncate max-w-[150px]">
                    {photo.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePhotoModal(photo)}
                    aria-label={`View provenance for ${photo.id}`}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 group/btn"
                  >
                    <span>{isAr ? 'بيانات التوثيق' : 'Provenance'}</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Disclaimer Footer */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">{isAr ? 'إشعار الترخيص والتوثيق البصري:' : 'Licensed Photography & Art Direction Disclosure:'}</strong>{' '}
            {isAr
              ? 'الصور الفوتوغرافية المعروضة توثق عمليات صناعية ومعدات حقيقية مفتوحة الترخيص (Creative Commons وPublic Domain)، وتستخدم كاتجاه فني وتصميمي، وليست توثيقًا لمنشآت أو تعاقدات تجارية تابعة لشركة فيرولاين.'
              : 'Photographs show genuine industrial metallurgy, heavy manufacturing, CNC milling, fiber laser cutting, and pipe extrusion subjects with verified open-license provenance. They do NOT depict Ferroline commercial client projects, proprietary mills, or guaranteed fabrication outcomes.'}
          </p>
        </div>
      </div>

      {/* Modal / Provenance Drawer */}
      {activePhotoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 text-xs font-mono shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-amber-400 font-bold text-xs uppercase block">
                  {isAr ? 'توثيق حقوق الملكية الفكرية والترخيص' : 'Verified Provenance & License Dossier'}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  {isAr ? activePhotoModal.titleAr : activePhotoModal.titleEn}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                aria-label="Close modal"
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">File Identifier:</span>
                <span className="text-white font-bold">{activePhotoModal.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Photographer / Author:</span>
                <span className="text-amber-400 font-bold">{activePhotoModal.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">License Standard:</span>
                <span className="text-emerald-400 font-bold">{activePhotoModal.license}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Resolution & Format:</span>
                <span className="text-white">{activePhotoModal.width} × {activePhotoModal.height} (WebP)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Self-Hosted Bytes:</span>
                <span className="text-white">{activePhotoModal.bytes.toLocaleString()} bytes</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-bold block mb-1">SHA-256 Checksum:</span>
                <span className="text-[10px] text-amber-300 break-all select-all font-mono">
                  {activePhotoModal.sha256}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={activePhotoModal.source}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1.5"
              >
                <span>{isAr ? 'عرض المصدر في ويكيمديا كومنز' : 'View Source on Wikimedia Commons'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold"
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
