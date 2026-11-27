'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { oaklinePhotos, type OaklinePhoto } from './media';
import { Camera, ExternalLink, Image as ImageIcon, Layers, Eye } from 'lucide-react';

export default function OaklineVisualGallery({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [activePhoto, setActivePhoto] = useState<OaklinePhoto>(oaklinePhotos[0]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'living' | 'dining' | 'bedroom' | 'craft' | 'seating'>('all');

  const filteredPhotos = categoryFilter === 'all'
    ? oaklinePhotos
    : oaklinePhotos.filter((p) => p.category === categoryFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
        <div>
          <span className="text-xs font-mono font-bold text-[#7E5322] uppercase tracking-widest block mb-1">
            EDITORIAL PHOTOGRAPHY & LIVING SPACES // CC LICENSED
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#30271F] tracking-tight">
            {isAr ? 'الأرشيف البصري المعماري وخامات التنفيذ' : 'Architectural Living Archive & Material Provenance'}
          </h2>
          <p className="text-[#65513D] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'أصول بصرية محلية عالية الدقة (WebP) مرخصة وموثقة بالكامل، توضح الضوء الطبيعي وتناسق الأخشاب والكتان.'
              : 'Locally hosted high-resolution WebP photographs documented with full copyright provenance, licensing, and author credit.'}
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 bg-[#EDE5D7] p-1.5 rounded-xl shrink-0 overflow-x-auto max-w-full">
          {(['all', 'living', 'dining', 'bedroom', 'craft', 'seating'] as const).map((cat) => {
            const labels = {
              all: isAr ? 'الكل (6)' : 'All (6)',
              living: isAr ? 'غرف المعيشة' : 'Living',
              dining: isAr ? 'السفرة والطاولات' : 'Dining',
              bedroom: isAr ? 'غرف النوم' : 'Bedroom',
              craft: isAr ? 'الصناعة والتعشيقات' : 'Craft',
              seating: isAr ? 'المقاعد والكنب' : 'Seating'
            };
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#30271F] text-white shadow-sm'
                    : 'text-[#65513D] hover:text-[#30271F] hover:bg-white'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Large Stage */}
        <div className="lg:col-span-8 bg-[#30271F] rounded-3xl overflow-hidden border border-[#4A3B2F] shadow-xl relative aspect-[16/10] group">
          <img
            src={activePhoto.url}
            alt={isAr ? activePhoto.ar : activePhoto.en}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Top category pill */}
          <div className="absolute top-4 start-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[#DAB48B]" />
            <span className="uppercase">{activePhoto.category} SCENE</span>
          </div>

          {/* Bottom metadata */}
          <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#DAB48B] font-bold uppercase tracking-wider block">
                CATEGORY // {activePhoto.category.toUpperCase()}
              </span>
              <h3 className="text-base sm:text-xl font-serif font-bold text-white leading-snug">
                {isAr ? activePhoto.ar : activePhoto.en}
              </h3>
            </div>
            <a
              href={activePhoto.source}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/60 hover:bg-black text-stone-200 hover:text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <span>{activePhoto.license}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Details & Thumbnail list */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#7E5322] font-bold uppercase tracking-wider block">
              LOCAL ASSET SPECIFICATION
            </span>
            <h4 className="text-xl font-serif font-bold text-[#30271F]">
              {isAr ? activePhoto.ar : activePhoto.en}
            </h4>
            <p className="text-xs text-[#65513D] leading-relaxed">
              {isAr
                ? 'أصل بصري محلي عالي الدقة (WebP) موثق التراخيص والمصدر، يوضح تفاصيل الخامات والتشطيبات المعمارية.'
                : 'Locally hosted, high-resolution WebP photograph documenting architectural craftsmanship and material texture.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D8CCBD] space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#65513D]">{isAr ? 'المصور / المؤلف:' : 'Author / Photographer:'}</span>
              <span className="font-semibold text-[#30271F]">{activePhoto.author}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#65513D]">{isAr ? 'الترخيص المعتمد:' : 'License:'}</span>
              <a href={activePhoto.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[#7E5322] font-bold hover:underline">
                {activePhoto.license}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-[#65513D]">{isAr ? 'المسار المحلي:' : 'Local WebP Path:'}</span>
              <span className="font-mono text-[#30271F] text-[11px] font-bold">{activePhoto.url}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#7E5322] uppercase tracking-wider block">
              {isAr ? 'تبديل المشهد:' : 'Switch Scene:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {filteredPhotos.map((p) => {
                const isCurrent = p.id === activePhoto.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={isAr ? p.ar : p.en}
                    onClick={() => setActivePhoto(p)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      isCurrent
                        ? 'border-[#BA9062] shadow-md ring-2 ring-[#BA9062]/40 scale-105'
                        : 'border-[#D8CCBD] opacity-70 hover:opacity-100 hover:border-[#BA9062]'
                    }`}
                  >
                    <img src={p.url} alt={isAr ? p.ar : p.en} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
