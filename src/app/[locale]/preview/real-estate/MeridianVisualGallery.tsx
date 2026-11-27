'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { meridianPhotos, type MeridianPhoto } from './media';
import {
  ExternalLink,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Building,
  Shield,
  Layers
} from 'lucide-react';

export default function MeridianVisualGallery({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedPhoto, setSelectedPhoto] = useState<MeridianPhoto>(meridianPhotos[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPhotos = categoryFilter === 'all'
    ? meridianPhotos
    : meridianPhotos.filter((p) => p.category === categoryFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
        <div>
          <span className="text-xs font-mono font-bold text-[#805333] uppercase tracking-widest block mb-1">
            EDITORIAL RESIDENTIAL ARCHIVE // LICENSED PHOTOGRAPHY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25312D] tracking-tight">
            {isAr ? 'الأرشيف البصري المعماري وتفاصيل التنفيذ' : 'Architectural Living Archive & Horizon Views'}
          </h2>
          <p className="text-[#574A3D] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'أصول بصرية محلية عالية الدقة (WebP) مرخصة وموثقة بالكامل، توضح شفافية الإضاءة الطبيعية وجودة الخامات والواجهات الزجاجية.'
              : 'Locally hosted high-resolution WebP photographs documented with full copyright provenance, licensing, and author credit.'}
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 bg-[#EDE5D7] p-1.5 rounded-xl overflow-x-auto max-w-full w-full lg:w-auto">
          {(['all', 'sky-villa', 'living', 'terrace', 'architecture', 'arrival', 'masterplan'] as const).map((cat) => {
            const labels = {
              all: isAr ? 'الكل (6)' : 'All (6)',
              'sky-villa': isAr ? 'سكاي فيلا' : 'Sky Villa',
              living: isAr ? 'الصالونات' : 'Living',
              terrace: isAr ? 'التراسات' : 'Terraces',
              architecture: isAr ? 'الواجهات' : 'Towers',
              arrival: isAr ? 'ردهة الاستقبال' : 'Arrival',
              masterplan: isAr ? 'المخطط' : 'Masterplan'
            };
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#25312D] text-white shadow-sm'
                    : 'text-[#574A3D] hover:text-[#25312D] hover:bg-white'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#D8CCBD] shadow-sm">
        {/* Left: Selected Photo View (8 cols) */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-[#D8CCBD] group shadow-md">
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
              <span className="bg-[#805333] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
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
            <span className="text-[10px] font-mono font-bold text-[#805333] uppercase tracking-wider block">
              PHOTOGRAPHIC PROVENANCE & SPECS
            </span>
            <h4 className="text-xl font-serif font-bold text-[#25312D] mt-1">
              {isAr ? 'بيانات الصورة والتوثيق' : 'Asset Provenance Record'}
            </h4>
          </div>

          <div className="space-y-3 text-xs bg-[#FAF6EF] p-5 rounded-2xl border border-[#D8CCBD]">
            <div className="flex justify-between items-center py-1.5 border-b border-[#D8CCBD]">
              <span className="text-[#574A3D]">{isAr ? 'المصور / الجهة:' : 'Author:'}</span>
              <span className="font-bold text-[#25312D]">{selectedPhoto.author}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-[#D8CCBD]">
              <span className="text-[#574A3D]">{isAr ? 'نوع الترخيص:' : 'License:'}</span>
              <a
                href={selectedPhoto.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-[#805333] hover:underline inline-flex items-center gap-1"
              >
                <span>{selectedPhoto.license}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {selectedPhoto.specs?.area && (
              <div className="flex justify-between items-center py-1.5 border-b border-[#D8CCBD]">
                <span className="text-[#574A3D]">{isAr ? 'المساحة الصافية:' : 'Net Area:'}</span>
                <span className="font-bold text-[#25312D] font-mono">{selectedPhoto.specs.area}</span>
              </div>
            )}

            {selectedPhoto.specs?.level && (
              <div className="flex justify-between items-center py-1.5 border-b border-[#D8CCBD]">
                <span className="text-[#574A3D]">{isAr ? 'الطابق / التموضع:' : 'Level / Position:'}</span>
                <span className="font-bold text-[#25312D]">{selectedPhoto.specs.level}</span>
              </div>
            )}

            {selectedPhoto.specs?.orientation && (
              <div className="flex justify-between items-center py-1.5 border-b border-[#D8CCBD]">
                <span className="text-[#574A3D]">{isAr ? 'اتجاه الواجهة:' : 'Orientation:'}</span>
                <span className="font-bold text-[#25312D]">{selectedPhoto.specs.orientation}</span>
              </div>
            )}

            <div className="pt-2">
              <a
                href={selectedPhoto.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#574A3D] hover:text-[#25312D] flex items-center gap-1.5 underline"
              >
                <span>{isAr ? 'صفحة التوثيق في ويكيميديا كومنز' : 'Wikimedia Commons source file'}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#574A3D]">
            <CheckCircle2 className="w-4 h-4 text-[#805333] shrink-0" />
            <span>{isAr ? 'مستضافة محليًا 100% بصيغة WebP خفيفة ومحسنة.' : '100% self-hosted local WebP without third-party tracking.'}</span>
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
                  ? 'border-[#805333] shadow-md ring-2 ring-[#805333]/40 scale-105'
                  : 'border-[#D8CCBD] opacity-75 hover:opacity-100 hover:border-[#805333]'
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
