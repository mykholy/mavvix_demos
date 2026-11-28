'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Camera,
  ShieldCheck,
  ExternalLink,
  X,
  Sparkles,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Wrench
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { AUTO_MEDIA_ASSETS, type AutoMediaItem } from './media';

export function AutoServiceVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalAsset, setActiveModalAsset] = useState<AutoMediaItem | null>(null);

  const categories = [
    { id: 'all', label: { ar: 'كافة مرافق الورشة', en: 'All Facilities' } },
    { id: 'engine', label: { ar: 'حجرة وتشخيص المحرك', en: 'Engine Bay Diagnostics' } },
    { id: 'precision', label: { ar: 'أعمال الدقة الميكانيكية', en: 'Precision Mechanical' } },
    { id: 'chassis', label: { ar: 'العفشة والرافعة الهيدروليكية', en: 'Chassis & Hydraulic Lift' } },
    { id: 'powertrain', label: { ar: 'منظومة الدفع والحرارة', en: 'Powertrain & Thermal' } }
  ];

  const filteredAssets =
    selectedCategory === 'all'
      ? AUTO_MEDIA_ASSETS
      : AUTO_MEDIA_ASSETS.filter(
          (a) =>
            a.category === selectedCategory ||
            (selectedCategory === 'powertrain' && (a.category === 'powertrain' || a.category === 'overhaul' || a.category === 'electrical'))
        );

  return (
    <section
      data-sector-specific="auto-visual-atelier"
      className="py-20 sm:py-28 bg-[#0B0E14] text-white border-t border-[#1E2736] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#1E2736]">
          <div className="max-w-2xl">
            <p className="text-[#F95721] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-[#F95721]" />
              {ar ? 'معرض التوثيق الفني للورشة' : 'WORKSHOP ENGINEERING ARCHIVE'}
            </p>
            <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
              {ar ? (
                <>
                  كواليس الصيانة الحقيقية. <span className="text-[#F95721]">شفافية كاملة في كل خطوة.</span>
                </>
              ) : (
                <>
                  Inside The Diagnostic Bay. <span className="text-[#F95721]">Complete Mechanical Transparency.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-[#CBD5E1] text-sm sm:text-base leading-8">
              {ar
                ? 'استكشف صورًا حقيقية عالية الدقة لمنظومات العمل والفحص الميكانيكي داخل الورشة، مع التحقق من البصمة الرقمية وبيانات المصدر المرخص لكل صورة.'
                : 'Explore high-resolution, genuine photographic captures of diagnostic workstations, hydraulic lifts, and engine overhauls, with verifiable cryptographic SHA-256 provenance manifests.'}
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
                      ? 'bg-[#F95721] text-black border-[#F95721] shadow-lg shadow-[#F95721]/20'
                      : 'bg-[#171E29] text-[#CBD5E1] border-[#2A3649] hover:bg-[#1E2736] hover:text-white'
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
              className="group bg-[#121822] border border-[#2A3649] rounded-2xl overflow-hidden hover:border-[#F95721] transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <Image
                  src={asset.src}
                  alt={asset.alt[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121822] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 end-3 text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                  {asset.license}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-base text-white leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E2736] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#CBD5E1]">
                    {asset.width} × {asset.height} px
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalAsset(asset)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F95721] hover:text-[#FF7A45] transition-colors focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <Info size={14} />
                    <span>{ar ? 'سجل المصدر والتوثيق' : 'Provenance & Hash'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cryptographic SHA-256 Provenance Modal */}
      {activeModalAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-[#121822] border border-[#2A3649] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              type="button"
              onClick={() => setActiveModalAsset(null)}
              aria-label={ar ? 'إغلاق نافذة التوثيق' : 'Close provenance modal'}
              className="absolute top-6 end-6 text-[#94A3B8] hover:text-white p-2 rounded-full bg-[#1A2230] border border-[#2A3649] focus-visible:outline-2 focus-visible:outline-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[#2A3649]">
              <ShieldCheck size={24} className="text-[#F95721]" />
              <div>
                <h3 id="modal-title" className="font-black text-xl text-white">
                  {ar ? 'شهادة التوثيق الرقمي والترخيص' : 'Cryptographic Provenance Manifest'}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  {activeModalAsset.id} · {activeModalAsset.format.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div>
                <p className="text-[#94A3B8] uppercase font-mono tracking-wider">
                  {ar ? 'الوصف المعتمد' : 'VERIFIED DESCRIPTION'}
                </p>
                <p className="text-white font-medium mt-1 text-sm leading-relaxed">
                  {activeModalAsset.caption[locale]}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 bg-[#0B0E14] p-4 rounded-xl border border-[#1E2736]">
                <div>
                  <p className="text-[#94A3B8] uppercase font-mono tracking-wider">
                    {ar ? 'المصور / الجهة المالكة' : 'AUTHOR / ATTRIBUTION'}
                  </p>
                  <p className="text-white font-bold mt-1 text-sm">
                    {activeModalAsset.author}
                  </p>
                </div>
                <div>
                  <p className="text-[#94A3B8] uppercase font-mono tracking-wider">
                    {ar ? 'الترخيص القانوني' : 'LEGAL LICENSE'}
                  </p>
                  <a
                    href={activeModalAsset.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F95721] font-bold mt-1 inline-flex items-center gap-1 hover:underline text-sm"
                  >
                    <span>{activeModalAsset.license}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[#94A3B8] uppercase font-mono tracking-wider">
                  {ar ? 'البصمة الرقمية الفريدة (SHA-256 CHECKSUM)' : 'CRYPTOGRAPHIC SHA-256 HASH'}
                </p>
                <p className="text-[#E2E8F0] font-mono text-[11px] bg-[#0B0E14] p-3 rounded-lg border border-[#1E2736] break-all mt-1">
                  {activeModalAsset.sha256}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[#171E29] p-3 rounded-xl border border-[#2A3649]">
                  <p className="text-[10px] text-[#94A3B8] uppercase font-mono">
                    {ar ? 'الأبعاد الهندسية' : 'NATIVE DIMENSIONS'}
                  </p>
                  <p className="text-sm font-black text-white mt-1 font-mono">
                    {activeModalAsset.width} × {activeModalAsset.height}
                  </p>
                </div>
                <div className="bg-[#171E29] p-3 rounded-xl border border-[#2A3649]">
                  <p className="text-[10px] text-[#94A3B8] uppercase font-mono">
                    {ar ? 'المسار المحلي' : 'LOCAL HOSTED URI'}
                  </p>
                  <p className="text-[11px] font-bold text-[#E2E8F0] mt-1 truncate font-mono">
                    {activeModalAsset.src}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={activeModalAsset.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#1A2230] border border-[#2A3649] text-[#E2E8F0] hover:text-white hover:border-[#F95721] font-bold inline-flex items-center justify-center gap-2 transition-all"
                >
                  <span>{ar ? 'عرض سجل الصورة الأصلي في Wikimedia Commons' : 'View Source Record on Wikimedia Commons'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
