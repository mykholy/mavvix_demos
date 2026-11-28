'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Wrench,
  ShieldCheck,
  ExternalLink,
  X,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Wind,
  Droplets,
  Zap,
  Hammer
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { HOME_MAINTENANCE_MEDIA_ASSETS, type HomeMaintenanceMediaItem } from './media';

export function HomeMaintenanceVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalAsset, setActiveModalAsset] = useState<HomeMaintenanceMediaItem | null>(null);

  const categories = [
    { id: 'all', label: { ar: 'كافة تخصصات الصيانة', en: 'All Disciplines' } },
    { id: 'ac', label: { ar: 'أنظمة التكييف والتبريد', en: 'Air Conditioning' } },
    { id: 'plumbing', label: { ar: 'السباكة والشبكات المائية', en: 'Sanitary Plumbing' } },
    { id: 'electrical', label: { ar: 'الكهرباء والقواطع الذكية', en: 'Electrical Protection' } },
    { id: 'carpentry', label: { ar: 'النجارة المعمارية الدقيقة', en: 'Architectural Carpentry' } }
  ];

  const filteredAssets =
    selectedCategory === 'all'
      ? HOME_MAINTENANCE_MEDIA_ASSETS
      : HOME_MAINTENANCE_MEDIA_ASSETS.filter((a) => a.category === selectedCategory);

  return (
    <section
      data-sector-specific="maintenance-visual-atelier"
      className="py-20 sm:py-28 bg-[#0B1726] text-white border-t border-[#1B324D] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#1B324D]">
          <div className="max-w-2xl">
            <p className="text-[#F7B347] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-[#F7B347]" />
              {ar ? 'أرشيف التوثيق الفني والهندسي' : 'FACILITY ENGINEERING MEDIA ATELIER'}
            </p>
            <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
              {ar ? (
                <>
                  أدوات ومعدات حقيقية. <span className="text-[#F7B347]">موثقة بشفافية الترخيص والبصمة الرقمية.</span>
                </>
              ) : (
                <>
                  Genuine Equipment & Hardware. <span className="text-[#F7B347]">Cryptographically Proven Provenance.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-[#CBD5E1] text-sm sm:text-base leading-8">
              {ar
                ? 'استكشف صورًا واقعية عالية الدقة لمعدات التكييف والسباكة واللوحات الكهربائية وأدوات النجارة الدقيقة، مع التحقق من البصمة الرقمية وبيانات المصدر القانوني لكل صورة.'
                : 'Explore high-resolution, genuine photographic captures of residential split ACs, outdoor condensers, plumbing distribution manifolds, open breaker enclosures, and multimeters, with complete cryptographic SHA-256 provenance manifests.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? 'bg-[#F7B347] text-[#0B1726] border-[#F7B347] shadow-lg shadow-[#F7B347]/20'
                      : 'bg-[#13253B] text-[#CBD5E1] border-[#1B324D] hover:bg-[#1A3350] hover:text-white'
                  }`}
                >
                  {cat.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-[#0E1E31] border border-[#1B324D] rounded-2xl overflow-hidden hover:border-[#F7B347] transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <Image
                  src={asset.src}
                  alt={asset.alt[locale]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 start-3">
                  <span className="px-3 py-1 bg-[#0B1726]/85 backdrop-blur-md text-[#F7B347] text-[10px] font-mono font-bold rounded-lg border border-[#1B324D]">
                    {asset.category.toUpperCase()} · {asset.license}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-[#F7B347] transition-colors leading-snug">
                    {asset.alt[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#CBD5E1] leading-relaxed">
                    {asset.caption[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1B324D] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#CBD5E1]">
                    {asset.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalAsset(asset)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F7B347] hover:underline"
                  >
                    <Info size={14} />
                    <span>{ar ? 'فحص البصمة' : 'Audit Provenance'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provenance Verification Modal */}
      {activeModalAsset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveModalAsset(null)}
        >
          <div
            className="bg-[#0E1E31] border border-[#F7B347] rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalAsset(null)}
              className="absolute top-6 end-6 text-[#CBD5E1] hover:text-white p-2 rounded-full bg-[#13253B] border border-[#1B324D] focus-visible:outline-2 focus-visible:outline-white"
              aria-label={ar ? 'إغلاق نافذة التوثيق' : 'Close provenance modal'}
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#F7B347]" size={28} />
              <div>
                <h3 className="font-black text-xl text-white">
                  {ar ? 'توثيق الأصل والمصدر القانوني' : 'Asset Provenance & License Manifest'}
                </h3>
                <p className="text-xs text-[#CBD5E1] mt-0.5">
                  {ar ? 'معيار الشفافية التحريرية والتشفير الرقمي' : 'Mavvix Editorial Standards · SHA-256 Proof'}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="bg-[#0B1726] border border-[#1B324D] p-4 rounded-xl">
                <p className="text-[#CBD5E1] uppercase font-mono tracking-wider">
                  {ar ? 'البصمة الرقمية المشفرة (SHA-256):' : 'Cryptographic SHA-256 Checksum:'}
                </p>
                <p className="font-mono text-[#F7B347] break-all mt-1 font-bold">
                  {activeModalAsset.sha256}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#0B1726] border border-[#1B324D] p-4 rounded-xl">
                  <p className="text-[#CBD5E1] uppercase font-mono tracking-wider">
                    {ar ? 'المؤلف والمصور الأصلي:' : 'Attributed Photographer:'}
                  </p>
                  <p className="font-bold text-white mt-1">{activeModalAsset.author}</p>
                </div>
                <div className="bg-[#0B1726] border border-[#1B324D] p-4 rounded-xl">
                  <p className="text-[#CBD5E1] uppercase font-mono tracking-wider">
                    {ar ? 'رخصة الاستخدام القانونية:' : 'Legal License:'}
                  </p>
                  <a
                    href={activeModalAsset.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#F7B347] underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>{activeModalAsset.license}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="bg-[#0B1726] border border-[#1B324D] p-4 rounded-xl">
                <p className="text-[#CBD5E1] uppercase font-mono tracking-wider">
                  {ar ? 'المستودع ومصدر الصورة الأصلي:' : 'Original Archive Repository:'}
                </p>
                <a
                  href={activeModalAsset.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-white/90 break-all underline inline-flex items-center gap-1.5 mt-1 hover:text-[#F7B347]"
                >
                  <span>{activeModalAsset.sourceUrl}</span>
                  <ExternalLink size={14} className="shrink-0" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0B1726] border border-[#1B324D] p-4 rounded-xl">
                  <p className="text-[10px] text-[#CBD5E1] uppercase font-mono">
                    {ar ? 'الأبعاد المحلية المستضافة:' : 'Render Dimensions:'}
                  </p>
                  <p className="font-mono font-bold text-white mt-0.5">
                    {activeModalAsset.width} × {activeModalAsset.height} px
                  </p>
                </div>
                <div className="bg-[#0B1726] border border-[#1B324D] p-4 rounded-xl">
                  <p className="text-[10px] text-[#CBD5E1] uppercase font-mono">
                    {ar ? 'الصيغة والترميز:' : 'WebP Encoding:'}
                  </p>
                  <p className="font-mono font-bold text-white mt-0.5">
                    Lossy WebP Q85 (Optimized)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1B324D] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalAsset(null)}
                className="px-6 py-2.5 bg-[#F7B347] text-[#0B1726] font-bold text-xs rounded-xl hover:bg-[#FFC966] transition-colors"
              >
                {ar ? 'إغلاق' : 'Close Manifest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
