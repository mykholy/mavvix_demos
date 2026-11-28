'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Zap,
  ShieldCheck,
  ExternalLink,
  X,
  Info,
  CheckCircle2,
  Activity,
  Dumbbell,
  Flame,
  Eye
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { FITNESS_MEDIA_ASSETS, type FitnessMediaItem } from './media';

export function FitnessVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalAsset, setActiveModalAsset] = useState<FitnessMediaItem | null>(null);

  const categories = [
    { id: 'all', label: { ar: 'كافة مرافق ومعدات النادي', en: 'All Facility Hardware' }, icon: Zap },
    { id: 'strength', label: { ar: 'أجهزة القوة والأوزان الحرة', en: 'Strength & Free Weights' }, icon: Dumbbell },
    { id: 'functional', label: { ar: 'الكيتل بل والتدريب الوظيفي', en: 'Functional Conditioning' }, icon: Flame },
    { id: 'cardio', label: { ar: 'أجهزة التحمل الهوائي والركض', en: 'Cardiovascular Bays' }, icon: Activity }
  ];

  const filteredAssets =
    selectedCategory === 'all'
      ? FITNESS_MEDIA_ASSETS
      : FITNESS_MEDIA_ASSETS.filter((a) => a.category === selectedCategory);

  return (
    <section
      data-sector-specific="pulse-visual-atelier"
      className="py-20 sm:py-28 bg-[#141421] text-white border-t border-[#26243A] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#29273D]">
          <div className="max-w-2xl">
            <p className="text-[#E0FE61] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-[#E0FE61]" />
              {ar ? 'أرشيف التوثيق الرياضي والهندسي' : 'ATHLETIC HARDWARE MEDIA ATELIER'}
            </p>
            <h2 className="pulse-display text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
              {ar ? (
                <>
                  معدات وأوزان حقيقية. <span className="text-[#E0FE61]">موثقة بشفافية التراخيص والبصمة الرقمية.</span>
                </>
              ) : (
                <>
                  Genuine Equipment & Rigging. <span className="text-[#E0FE61]">Cryptographically Proven Provenance.</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#D4D1E2] mt-4 leading-8">
              {ar
                ? 'لا نعتمد على صور محملة من منصات تسويق مغلقة أو صور أبطال مفبركة؛ جميع الصور مأخوذة من مراجع فوتوغرافية عالمية مرخصة رسمياً (Creative Commons & CC0) مع توثيق اسم الفنان والبصمة المشفرة SHA-256.'
                : 'Zero fabricated member transformations. Every photograph is sourced from verified Creative Commons & CC0 repositories with strict author attribution and SHA-256 cryptographic validation.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const Icon = c.icon;
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#E0FE61] text-[#141421] shadow-md'
                      : 'bg-[#1C1A2E] text-white hover:bg-white/10 border border-[#2D2A42]'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon size={13} />
                  <span>{ar ? c.label.ar : c.label.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-[#181628] border-2 border-[#29273D] overflow-hidden flex flex-col justify-between hover:border-[#E0FE61] transition-all shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F0F1A]">
                <Image
                  src={asset.src}
                  alt={ar ? asset.alt.ar : asset.alt.en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141421] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 end-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-black bg-[#141421]/90 text-[#E0FE61] border border-[#2D2A42] backdrop-blur-sm">
                    {asset.license}
                  </span>
                </div>

                <div className="absolute bottom-3 start-3 end-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A28BFF] block mb-1">
                    {ar ? 'الفنان والمصور' : 'Attribution'}
                  </span>
                  <p className="text-xs font-black text-white truncate">{asset.author}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#DCD9ED] leading-6 mb-4">
                    {ar ? asset.caption.ar : asset.caption.en}
                  </p>
                  <div className="space-y-1.5 text-[11px] font-mono text-[#A28BFF] bg-[#11111C] p-3 border border-[#252338]">
                    <div className="flex justify-between">
                      <span className="text-[#77748F]">{ar ? 'الأبعاد' : 'Dimensions'}:</span>
                      <span>
                        {asset.width} × {asset.height} px
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#77748F]">SHA-256:</span>
                      <span className="truncate max-w-[170px]" title={asset.sha256}>
                        {asset.sha256.substring(0, 16)}…
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalAsset(asset)}
                  className="mt-4 w-full py-2.5 px-4 bg-[#232038] hover:bg-[#2C2945] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#383552]"
                >
                  <Eye size={14} className="text-[#E0FE61]" />
                  <span>{ar ? 'فحص بيانات التحقق الكاملة' : 'View Cryptographic Provenance'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Provenance Modal */}
        {activeModalAsset && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="bg-[#181628] text-white border-2 border-[#E0FE61] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
              <button
                type="button"
                onClick={() => setActiveModalAsset(null)}
                aria-label={ar ? 'إغلاق نافذة التوثيق' : 'Close modal'}
                className="absolute top-6 end-6 p-2 bg-[#232038] text-white hover:bg-[#2F2C4A] transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider text-[#E0FE61] mb-2">
                <ShieldCheck size={16} />
                <span>{ar ? 'شهادة التوثيق والمصدر المفتوح' : 'Verified Provenance Certificate'}</span>
              </div>

              <h3 id="modal-title" className="pulse-display text-xl sm:text-2xl font-black text-white">
                {ar ? activeModalAsset.alt.ar : activeModalAsset.alt.en}
              </h3>

              <div className="mt-6 space-y-3.5 text-xs">
                <div className="p-3.5 bg-[#141421] border border-[#2D2A42] flex justify-between items-center">
                  <span className="font-bold text-[#A28BFF]">{ar ? 'المسار المحلي' : 'Local URI'}:</span>
                  <span className="font-mono text-white">{activeModalAsset.src}</span>
                </div>

                <div className="p-3.5 bg-[#141421] border border-[#2D2A42] flex justify-between items-center">
                  <span className="font-bold text-[#A28BFF]">{ar ? 'المؤلف / المصور' : 'Creator'}:</span>
                  <span className="font-black text-white">{activeModalAsset.author}</span>
                </div>

                <div className="p-3.5 bg-[#141421] border border-[#2D2A42] flex justify-between items-center">
                  <span className="font-bold text-[#A28BFF]">{ar ? 'الترخيص القانوني' : 'License'}:</span>
                  <a
                    href={activeModalAsset.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#E0FE61] hover:underline flex items-center gap-1.5"
                  >
                    <span>{activeModalAsset.license}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="p-3.5 bg-[#141421] border border-[#2D2A42] flex justify-between items-center">
                  <span className="font-bold text-[#A28BFF]">{ar ? 'صفحة المصدر الأصلية' : 'Source File'}:</span>
                  <a
                    href={activeModalAsset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#E0FE61] hover:underline flex items-center gap-1.5 truncate max-w-[280px]"
                  >
                    <span>Wikimedia Commons</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="p-3.5 bg-[#141421] border border-[#2D2A42] flex flex-col gap-1.5">
                  <span className="font-bold text-[#A28BFF]">SHA-256 Digest:</span>
                  <span className="font-mono text-[11px] text-white break-all bg-[#0D0D17] p-2 border border-[#252338]">
                    {activeModalAsset.sha256}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#1F1D33] text-[#E0DFED] text-xs leading-6 flex items-start gap-2.5 border-s-4 border-[#E0FE61]">
                <Info size={16} className="text-[#E0FE61] shrink-0 mt-0.5" />
                <p>
                  {ar
                    ? 'يتم تضمين هذا الأصل لتمثيل الهوية البصرية للنوادي الرياضية في نموذج مافكس، مع التزام كامل بعدم انتحال ملكية الصور أو تقديمها كمنشأة خاصة بعلامة تجارية محددة.'
                    : 'This asset is integrated strictly to illustrate the athletic engineering art direction in the Mavvix commercial prototype, honoring license terms without misrepresenting venue exclusivity.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalAsset(null)}
                className="mt-6 w-full py-3 bg-[#E0FE61] text-[#141421] font-black text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                {ar ? 'إغلاق الشهادة' : 'Close Certificate'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
