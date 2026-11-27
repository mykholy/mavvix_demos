'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { lumenPhotos, type LumenPhoto } from './media';
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function LumenVisualGallery({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedPhoto, setSelectedPhoto] = useState<LumenPhoto>(lumenPhotos[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPhotos = categoryFilter === 'all'
    ? lumenPhotos
    : lumenPhotos.filter((p) => p.category === categoryFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#CBDCD5] w-full min-w-0">
        <div>
          <span className="text-xs font-mono font-bold text-[#193A39] uppercase tracking-widest block mb-1">
            CLINICAL SUITE ARCHIVE // LICENSED PHOTOGRAPHY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#193A39] tracking-tight">
            {isAr ? 'الأرشيف البصري لبيئة العيادة وأدوات الفحص' : 'Clinical Operatory Archive & Equipment Provenance'}
          </h2>
          <p className="text-[#3D5C58] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'أصول بصرية محلية عالية الدقة (WebP) مرخصة وموثقة بالكامل، توضح بيئة العمل الجراحية المعقمة وراحة مقاعد المرضى والتجهيزات السريرية.'
              : 'Locally hosted high-resolution WebP photographs documented with full copyright provenance, licensing, and author credit.'}
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#E4EFEA] p-1.5 rounded-xl max-w-full">
          {(['all', 'operatory', 'suite', 'lounge', 'consultation', 'hygiene', 'prosthetics'] as const).map((cat) => {
            const labels = {
              all: isAr ? 'الكل (6)' : 'All (6)',
              operatory: isAr ? 'أجنحة العلاج' : 'Operatory',
              suite: isAr ? 'المقاعد الطبية' : 'Suites',
              lounge: isAr ? 'استراحة المرضى' : 'Lounge',
              consultation: isAr ? 'غرف الاستشارة' : 'Consult',
              hygiene: isAr ? 'أدوات الفحص' : 'Hygiene',
              prosthetics: isAr ? 'نماذج الزراعة' : 'Prosthetics'
            };
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  active
                    ? 'bg-[#193A39] text-white shadow-sm'
                    : 'text-[#3D5C58] hover:text-[#193A39] hover:bg-white'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#CBDCD5] shadow-sm">
        {/* Left: Selected Photo View (8 cols) */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-[#CBDCD5] group shadow-md">
            <Image
              src={selectedPhoto.url}
              alt={isAr ? selectedPhoto.ar : selectedPhoto.en}
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 start-4 end-4 text-white space-y-1">
              <span className="bg-[#193A39] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                {selectedPhoto.category.toUpperCase()}
              </span>
              <h3 className="text-lg sm:text-2xl font-serif font-bold">
                {isAr ? selectedPhoto.ar : selectedPhoto.en}
              </h3>
            </div>
          </div>
        </div>

        {/* Right: Provenance & Specification Sheet (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#193A39] uppercase tracking-wider block">
              CLINICAL ASSET PROVENANCE
            </span>
            <h4 className="text-xl font-serif font-bold text-[#193A39] mt-1">
              {isAr ? 'بيانات الصورة والتوثيق' : 'Asset Provenance Record'}
            </h4>
          </div>

          <div className="space-y-3 text-xs bg-[#EDF5F2] p-5 rounded-2xl border border-[#CBDCD5]">
            <div className="flex justify-between items-center py-1.5 border-b border-[#CBDCD5]">
              <span className="text-[#3D5C58]">{isAr ? 'المصور / الجهة:' : 'Author:'}</span>
              <span className="font-bold text-[#193A39]">{selectedPhoto.author}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-[#CBDCD5]">
              <span className="text-[#3D5C58]">{isAr ? 'نوع الترخيص:' : 'License:'}</span>
              <a
                href={selectedPhoto.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-[#193A39] hover:underline inline-flex items-center gap-1"
              >
                <span>{selectedPhoto.license}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {selectedPhoto.specs?.equipment && (
              <div className="flex justify-between items-center py-1.5 border-b border-[#CBDCD5]">
                <span className="text-[#3D5C58]">{isAr ? 'التجهيز السريري:' : 'Equipment:'}</span>
                <span className="font-bold text-[#193A39]">{selectedPhoto.specs.equipment}</span>
              </div>
            )}

            {selectedPhoto.specs?.comfort && (
              <div className="flex justify-between items-center py-1.5 border-b border-[#CBDCD5]">
                <span className="text-[#3D5C58]">{isAr ? 'ميزة الراحة:' : 'Comfort Detail:'}</span>
                <span className="font-bold text-[#193A39]">{selectedPhoto.specs.comfort}</span>
              </div>
            )}

            {selectedPhoto.specs?.standard && (
              <div className="flex justify-between items-center py-1.5 border-b border-[#CBDCD5]">
                <span className="text-[#3D5C58]">{isAr ? 'المعيار المعتمد:' : 'Protocol Standard:'}</span>
                <span className="font-bold text-[#193A39]">{selectedPhoto.specs.standard}</span>
              </div>
            )}

            <div className="pt-2">
              <a
                href={selectedPhoto.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#3D5C58] hover:text-[#193A39] flex items-center gap-1.5 underline"
              >
                <span>{isAr ? 'صفحة التوثيق في ويكيميديا كومنز' : 'Wikimedia Commons source file'}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#3D5C58]">
            <CheckCircle2 className="w-4 h-4 text-[#193A39] shrink-0" />
            <span>{isAr ? 'أصل محلي مستضاف 100% بصيغة WebP خفيفة ومحسنة.' : '100% self-hosted local WebP without third-party tracking.'}</span>
          </div>
        </div>
      </div>

      {/* Thumbnail Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredPhotos.map((photo) => {
          const isCurrent = photo.id === selectedPhoto.id;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                isCurrent
                  ? 'border-[#193A39] shadow-md ring-2 ring-[#193A39]/40 scale-105'
                  : 'border-[#CBDCD5] opacity-75 hover:opacity-100 hover:border-[#193A39]'
              }`}
            >
              <Image
                src={photo.url}
                alt={isAr ? photo.ar : photo.en}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
