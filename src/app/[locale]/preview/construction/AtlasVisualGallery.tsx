'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { atlasPhotos, type AtlasPhoto } from './media';
import { Camera, ExternalLink, ShieldCheck, Layers } from 'lucide-react';

export function AtlasVisualGallery({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<'all' | 'structural' | 'facades' | 'interior' | 'systems' | 'technical'>('all');
  const [activePhoto, setActivePhoto] = useState<AtlasPhoto>(atlasPhotos[0]);

  const filteredPhotos = activeCategory === 'all'
    ? atlasPhotos
    : atlasPhotos.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-[#161D24] text-white py-16 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 border border-stone-700 rounded text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>ATLAS VERIFIED PHOTOGRAPHY & SITE ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isAr ? 'الأرشيف البصري الميداني للمشروعات' : 'Field Engineering & Architectural Archive'}
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {isAr
                ? 'توثيق بصري تفصيلي يغطي الهياكل الإنشائية، والواجهات المعمارية، وتجهيزات المكاتب الإدارية، والأنظمة الميكانيكية، والمخططات التنفيذية.'
                : 'Photographic documentation spanning civil superstructures, facade engineering, workplace fit-outs, central MEP systems, and approved CAD drafts.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#12181F] p-1.5 rounded-xl border border-stone-800 shrink-0 overflow-x-auto max-w-full">
            {(['all', 'structural', 'facades', 'interior', 'systems', 'technical'] as const).map((cat) => {
              const labels = {
                all: isAr ? 'الكل' : 'All',
                structural: isAr ? 'الهياكل الإنشائية' : 'Structural',
                facades: isAr ? 'الواجهات والخرسانة' : 'Facades',
                interior: isAr ? 'التشطيبات الإدارية' : 'Fit-Out',
                systems: isAr ? 'الكهروميكانيك' : 'MEP Systems',
                technical: isAr ? 'المخططات' : 'Blueprints'
              };
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    const matching = cat === 'all' ? atlasPhotos[0] : atlasPhotos.find((p) => p.category === cat);
                    if (matching) setActivePhoto(matching);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#B85629] text-white shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Main Photo Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-stone-800">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-black relative aspect-[16/10] group">
            <img
              src={activePhoto.url}
              alt={isAr ? activePhoto.ar : activePhoto.en}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#D97935] font-bold uppercase tracking-wider block">
                  CATEGORY // {activePhoto.category.toUpperCase()}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {isAr ? activePhoto.ar : activePhoto.en}
                </h3>
              </div>
              <a
                href={activePhoto.source}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/60 hover:bg-black text-stone-300 hover:text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <span>{activePhoto.license}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Details & Thumbnail list */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                SELECTED ASSET SPECIFICATION
              </span>
              <h4 className="text-xl font-bold text-white">
                {isAr ? activePhoto.ar : activePhoto.en}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {isAr
                  ? 'أصل بصري رقمي محلي عالي الدقة (WebP) مرخص للاستخدام التحريري، يوثق معايير التنفيذ والتشطيبات الهندسية.'
                  : 'Locally hosted, high-resolution WebP editorial photographic asset demonstrating execution fidelity and material standards.'}
              </p>
            </div>

            <div className="bg-[#161D24] p-4 rounded-xl border border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">{isAr ? 'المصور / المؤلف:' : 'Author / Photographer:'}</span>
                <span className="font-semibold text-white">{activePhoto.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isAr ? 'الترخيص المعتمد:' : 'License:'}</span>
                <a href={activePhoto.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-amber-400 hover:underline">
                  {activePhoto.license}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{isAr ? 'المسار المحلي:' : 'Local WebP Path:'}</span>
                <span className="font-mono text-stone-300 text-[11px]">{activePhoto.url}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-wider block">
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
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        isCurrent
                          ? 'border-[#D97935] shadow-md ring-2 ring-[#D97935]/40 scale-105'
                          : 'border-stone-800 opacity-60 hover:opacity-100 hover:border-stone-600'
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

        {/* Legal attribution note */}
        <p className="text-[11px] text-stone-300 text-center">
          {isAr
            ? 'جميع الصور التحريرية مستضافة محلياً بصيغة WebP وموثقة في سجل الوسائط المرخصة docs/30-verticals/media/construction.media-manifest.json، وهي لأغراض التوجيه الفني وليست وثائق لمشروعات فعلية منفذة لعملاء حقيقيين.'
            : 'All editorial imagery is self-hosted in WebP format and audited in docs/30-verticals/media/construction.media-manifest.json for art direction only; does not depict confirmed real commercial clients.'}
        </p>
      </div>
    </section>
  );
}
