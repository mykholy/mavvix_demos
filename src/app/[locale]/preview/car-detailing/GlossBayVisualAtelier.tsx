'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { glossBayPhotos, type GlossBayPhoto } from './media';
import {
  Camera,
  ShieldCheck,
  Maximize2,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
  FileCheck2,
  Droplets
} from 'lucide-react';

export default function GlossBayVisualAtelier({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedPhoto, setSelectedPhoto] = useState<GlossBayPhoto>(glossBayPhotos[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [provenanceModalOpen, setProvenanceModalOpen] = useState<boolean>(false);

  const filteredPhotos = activeCategory === 'all'
    ? glossBayPhotos
    : glossBayPhotos.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#CBDCE5] w-full min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#086786] uppercase tracking-widest block">
              AUTOMOTIVE COSMETICS ATELIER // LICENSED PHOTOGRAPHY
            </span>
            <span className="text-[10px] font-mono bg-[#E0F3FA] text-[#086786] px-2 py-0.5 rounded font-bold">
              VERIFIED PROVENANCE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D1626] tracking-tight mt-2 gloss-display">
            {isAr ? 'الأرشيف البصري لاستوديو العناية بالطلاء والأسطح' : 'Automotive Surface Studio Archive & Image Provenance'}
          </h2>
          <p className="text-[#314A5C] text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            {isAr
              ? 'أصول بصرية محلية عالية الدقة (WebP) مرخصة وموثقة بالكامل، توضح بيئة العمل التخصصية للغسيل المتطور وتصحيح الطلاء وحماية السطح بأفلام PPF والنانو سيراميك.'
              : 'Locally hosted high-resolution WebP photographs documented with full copyright provenance, licensing, and author credit, representing authentic automotive cosmetic workflows.'}
          </p>
        </div>

        {/* Category Filter Pills (Wrapping on Mobile, Zero Overflow) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#E4EFEA]/60 p-1.5 rounded-xl border border-[#CBDCE5] max-w-full">
          {[
            { id: 'all', en: 'All Media (6)', ar: 'الكل (6)' },
            { id: 'wash', en: 'Wash & Rinse', ar: 'الغسيل والشطف' },
            { id: 'correction', en: 'Paint Correction', ar: 'تصحيح الطلاء' },
            { id: 'protection', en: 'PPF & Ceramic', ar: 'الحماية والسيراميك' },
            { id: 'interior', en: 'Cabin Care', ar: 'المقصورة الداخلية' }
          ].map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  active
                    ? 'bg-[#0D1626] text-white shadow-sm'
                    : 'text-[#314A5C] hover:text-[#0D1626] hover:bg-white'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Feature Layout: Large Display + Provenance Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#CBDCE5] shadow-sm">
        {/* Left: Active Photo Visual (8 cols) */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#08111F] border border-[#CBDCE5] group shadow-md">
            <Image
              src={selectedPhoto.url}
              alt={isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08111F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white text-xs font-mono">
                <span className="bg-[#4CCBF4] text-[#08111F] px-2 py-0.5 rounded font-bold uppercase me-2">
                  {selectedPhoto.category}
                </span>
                <span>{selectedPhoto.author} · {selectedPhoto.license}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Provenance Dossier (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#086786] font-bold uppercase tracking-wider">
              {selectedPhoto.category.toUpperCase()} // ATELIER ASSET
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0D1626] leading-snug">
            {isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
          </h3>

          <div className="space-y-3 pt-3 border-t border-[#CBDCE5] text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#314A5C]">{isAr ? 'المصور / الجهة' : 'Author / Source'}</span>
              <span className="font-mono font-bold text-[#0D1626]">{selectedPhoto.author}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#314A5C]">{isAr ? 'الترخيص المعتمد' : 'License'}</span>
              <span className="font-mono font-bold text-[#086786]">{selectedPhoto.license}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#314A5C]">{isAr ? 'الأبعاد الدقيقة' : 'Dimensions'}</span>
              <span className="font-mono text-[#0D1626]">{selectedPhoto.width} × {selectedPhoto.height} px</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#314A5C]">{isAr ? 'صيغة الملف' : 'Optimized Format'}</span>
              <span className="font-mono text-[#0D1626]">WebP (Q84) · {Math.round(selectedPhoto.bytes / 1024)} KB</span>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[#314A5C] block text-[11px]">{isAr ? 'بصمة التحقق الرقمية SHA-256' : 'SHA-256 Integrity Hash'}</span>
              <span className="font-mono text-[10px] text-slate-500 break-all block bg-slate-50 p-2 rounded border border-slate-200">
                {selectedPhoto.sha256}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={selectedPhoto.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#086786] hover:text-[#0D1626] underline underline-offset-4"
            >
              <span>{isAr ? 'الاطلاع على المصدر الأصلي' : 'View Wikimedia Commons Source'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Thumbnail Selection Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredPhotos.map((photo) => {
          const isSelected = photo.id === selectedPhoto.id;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all text-start ${
                isSelected
                  ? 'border-[#086786] ring-2 ring-[#086786]/30 shadow-md'
                  : 'border-[#CBDCE5] opacity-75 hover:opacity-100 hover:border-slate-400'
              }`}
            >
              <Image
                src={photo.url}
                alt={isAr ? photo.titleAr : photo.titleEn}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#08111F]/30 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-1 start-1 end-1 bg-[#08111F]/80 backdrop-blur-sm p-1 rounded text-[10px] text-white font-mono truncate">
                {photo.id.toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
