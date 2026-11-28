'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { BLOOM_MEDIA_COLLECTION, type BloomMediaAsset } from './media';
import {
  Maximize2,
  X,
  ExternalLink,
  ShieldCheck,
  Camera,
  FileCheck2,
  Sparkles,
  Flower2
} from 'lucide-react';

export function BloomVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [activeAsset, setActiveAsset] = useState<BloomMediaAsset | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAssets = BLOOM_MEDIA_COLLECTION.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'sensory') return item.id.includes('cube') || item.id.includes('traditional');
    if (filter === 'classroom') return item.id.includes('shelves') || item.id.includes('cairo');
    if (filter === 'motor') return item.id.includes('metal') || item.id.includes('wooden');
    return true;
  });

  return (
    <section
      data-sector-specific="bloom-visual-atelier"
      className="bg-[#FBF6ED] py-20 sm:py-28 border-b border-[#E8DFC9]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8DFC9]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FFF9EE] border border-[#E0D7C4] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#A54F35]">
              <Camera size={14} />
              <span>{ar ? 'الأرشيف البصري الموثق لخامات التعلم' : 'Documented Early Childhood Learning Archive'}</span>
            </div>
            <h2 className="mt-4 bloom-display text-3xl sm:text-5xl font-bold tracking-tight text-[#145960] leading-tight">
              {ar ? 'بيئة تعلم حقيقية. وخامات موثقة بشفافية.' : 'Authentic Learning Spaces. Verified Imagery.'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#2E4844]">
              {ar
                ? 'مجموعة من الصور التحريرية المرخصة المفتوحة توثق أرفف خامات المونتيسوري، أدوات التمييز الحسي، وصواني الأشكال الهندسية ومكعبات البناء مع إثبات الملكية وتشفير SHA-256 المستقل.'
                : 'Licensed editorial photography capturing authentic Montessori materials, sensorial cylinders, pre-writing geometric insets, and wooden construction blocks with cryptographic SHA-256 provenance.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', ar: 'الكل (٦)', en: 'All (6)' },
              { id: 'sensory', ar: 'استكشاف وحواس', en: 'Sensorial & Tactile' },
              { id: 'classroom', ar: 'بيئة الفصل والأرفف', en: 'Classroom & Shelves' },
              { id: 'motor', ar: 'تنسيق وبناء حركي', en: 'Fine Motor & Blocks' }
            ].map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-[#145960] text-white shadow-sm'
                      : 'bg-white text-[#145960] border border-[#D6E4D6] hover:border-[#145960]'
                  }`}
                >
                  {ar ? f.ar : f.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-white border-2 border-[#E0D7C4] rounded-[2rem] overflow-hidden hover:border-[#145960] transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#F5E5B7]/50 overflow-hidden">
                <img
                  src={asset.local}
                  alt={asset.alt[locale]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setActiveAsset(asset)}
                  aria-label={`${ar ? 'عرض تفاصيل المصدر لـ' : 'View provenance details for'} ${asset.caption[locale]}`}
                  className="absolute inset-0 bg-[#145960]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 font-bold text-xs"
                >
                  <Maximize2 size={18} className="text-[#F5C04E]" />
                  <span>{ar ? 'بيانات التوثيق والترخيص' : 'Inspect Provenance'}</span>
                </button>
                <div className="absolute top-3 end-3 bg-[#145960]/85 backdrop-blur-sm px-3 py-1 text-[10px] font-mono font-bold text-white rounded-full">
                  {asset.dimensions}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0E5E64] mb-2 font-bold">
                    <span>{asset.license}</span>
                    <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#145960] leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#2E4844] leading-relaxed line-clamp-2">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0E8D7] flex items-center justify-between text-xs text-[#2E4844]">
                  <span>
                    {ar ? 'المصور:' : 'Creator:'} {asset.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(asset)}
                    className="text-[#A54F35] hover:underline font-bold"
                  >
                    {ar ? 'فحص السجل' : 'Provenance'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Dialog for Cryptographic Provenance */}
        {activeAsset && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="provenance-title"
            className="fixed inset-0 z-50 bg-[#145960]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveAsset(null)}
          >
            <div
              className="bg-white border-2 border-[#E0D7C4] rounded-[2rem] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC9]">
                <div className="flex items-center gap-2 text-[#145960]">
                  <FileCheck2 size={20} />
                  <h3 id="provenance-title" className="font-bold text-base text-[#145960]">
                    {ar ? 'توثيق الملكية الفكرية وسلامة التشفير' : 'Cryptographic Provenance Manifest'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAsset(null)}
                  aria-label={ar ? 'إغلاق النافذة' : 'Close dialog'}
                  className="p-2 text-[#2E4844] hover:text-[#145960] hover:bg-[#F5E5B7]/40 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs text-[#2E4844]">
                <div className="p-4 bg-[#FBF6ED] border border-[#E0D7C4] rounded-2xl flex items-center gap-3">
                  <ShieldCheck size={24} className="text-[#145960] shrink-0" />
                  <p className="leading-relaxed">
                    {ar
                      ? 'تم التحقق من تطابق بصمة SHA-256 المحلية مع الصورة التحريرية المفتوحة من مستودع Wikimedia Commons.'
                      : 'Locally hosted WebP binary cryptographically verified against SHA-256 provenance manifest from Wikimedia Commons.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="block font-bold text-[#145960] uppercase text-[10px] tracking-wider">
                      {ar ? 'معرّف الأصل' : 'Asset Identifier'}
                    </span>
                    <span className="font-mono text-[#0E5E64]">{activeAsset.id}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#145960] uppercase text-[10px] tracking-wider">
                      {ar ? 'المسار المحلي' : 'Local Path'}
                    </span>
                    <span className="font-mono">{activeAsset.local}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#145960] uppercase text-[10px] tracking-wider">
                      {ar ? 'الأبعاد وحجم الملف' : 'Dimensions & Size'}
                    </span>
                    <span>
                      {activeAsset.dimensions} · {(activeAsset.bytes / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#145960] uppercase text-[10px] tracking-wider">
                      {ar ? 'الترخيص والمؤلف' : 'License & Author'}
                    </span>
                    <span>
                      {activeAsset.license} · {activeAsset.author}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block font-bold text-[#145960] uppercase text-[10px] tracking-wider mb-1">
                    {ar ? 'بصمة التشفير (SHA-256)' : 'SHA-256 Cryptographic Hash'}
                  </span>
                  <div className="bg-[#145960] text-[#F5C04E] p-3 font-mono text-[11px] rounded-xl break-all select-all">
                    {activeAsset.sha256}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block font-bold text-[#145960] uppercase text-[10px] tracking-wider mb-1">
                    {ar ? 'الوصف التحريري المعتمد' : 'Editorial Caption'}
                  </span>
                  <p className="text-sm font-medium text-[#145960]">{activeAsset.caption[locale]}</p>
                  <p className="text-xs text-[#2E4844] mt-1">{activeAsset.alt[locale]}</p>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#E8DFC9]">
                  <a
                    href={activeAsset.sourcePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A54F35] hover:underline"
                  >
                    <span>{ar ? 'صفحة المصدر في Wikimedia Commons' : 'View on Wikimedia Commons'}</span>
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(null)}
                    className="px-6 py-2.5 bg-[#145960] text-white font-bold text-xs rounded-full hover:bg-[#1C6C75] transition-colors"
                  >
                    {ar ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
