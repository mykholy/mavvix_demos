'use client';

import { useState } from 'react';
import { Camera, Check, Copy, ExternalLink, ShieldCheck, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { CLEARPATH_PHOTOS, type ClearPathPhoto } from './media';

interface ClearPathVisualAtelierProps {
  locale: Locale;
}

type FilterCategory = 'all' | 'analyzer' | 'glassware' | 'microscope' | 'centrifuge' | 'accessioning' | 'assay';

export function ClearPathVisualAtelier({ locale }: ClearPathVisualAtelierProps) {
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<ClearPathPhoto | null>(null);
  const [copied, setCopied] = useState(false);

  const categories: { id: FilterCategory; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'كافة المعروضات (6)', labelEn: 'All Assets (6)' },
    { id: 'analyzer', labelAr: 'المحللات الآلية', labelEn: 'Auto Analyzers' },
    { id: 'microscope', labelAr: 'المجهر الضوئي', labelEn: 'Microscopy' },
    { id: 'accessioning', labelAr: 'استلام العينات', labelEn: 'Accessioning' },
    { id: 'centrifuge', labelAr: 'الطرد المركزي', labelEn: 'Centrifugation' },
    { id: 'glassware', labelAr: 'الكواشف والزجاجيات', labelEn: 'Reagents & Glass' },
    { id: 'assay', labelAr: 'أطباق المعايرة', labelEn: 'Microplates' }
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? CLEARPATH_PHOTOS
      : CLEARPATH_PHOTOS.filter((p) => p.category === activeCategory);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      data-sector-specific="clearpath-visual-atelier"
      className="bg-[#E7F4F6] py-16 sm:py-24 border-b border-[#B8DCE2]"
      aria-labelledby="atelier-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12334A] text-white text-xs font-bold tracking-widest uppercase">
            <Camera size={14} className="text-[#38BDF8]" />
            <span>{isAr ? 'أرشيف التوثيق المخبري والأصول' : 'Diagnostic Archive & Media Provenance'}</span>
          </div>
          <h2
            id="atelier-heading"
            className="mt-4 text-3xl sm:text-5xl font-black text-[#12334A] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                شواهد المختبر والتقنيات السريرية <span className="block text-[#126B8A]">موثقة بالبصمة الرقمية المستقلة</span>
              </>
            ) : (
              <>
                Clinical Instrumentation <span className="block text-[#126B8A]">& Cryptographically Verified Media</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'معرض فوتوغرافي مرخص ومستضاف محلياً يوثق أجهزة التحليل الآلية والمجاهر المضيئة واستلام العينات المشفرة مع سجل إثبات الملكية الفكرية وبصمات SHA-256 المستقلة.'
              : 'Locally hosted, licensed scientific editorial media documenting automated analyzers, optical microscopy, and cold-chain sample accessioning with immutable SHA-256 cryptographic provenance manifests.'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold border transition-colors ${
                  active
                    ? 'bg-[#12334A] text-white border-[#12334A]'
                    : 'bg-white text-[#12334A] border-[#B8DCE2] hover:border-[#12334A]'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.id}
              className="bg-white border border-[#B8DCE2] flex flex-col justify-between overflow-hidden group hover:border-[#12334A] transition-colors"
            >
              <div className="relative aspect-[4/3] bg-[#E7F4F6] overflow-hidden">
                <img
                  src={photo.src}
                  alt={isAr ? photo.altAr : photo.altEn}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 end-3 bg-[#12334A]/90 text-[#38BDF8] px-2.5 py-1 text-[11px] font-mono font-bold backdrop-blur-sm">
                  {photo.id.replace('clearpath-', 'CP-')}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-base text-[#12334A] group-hover:text-[#126B8A] transition-colors">
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h3>
                  <p className="mt-2 text-xs text-[#334155] leading-5">
                    {isAr ? photo.subtitleAr : photo.subtitleEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#B8DCE2] flex items-center justify-between text-xs">
                  <span className="text-[#334155] font-mono">{photo.license}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="inline-flex items-center gap-1 font-bold text-[#126B8A] hover:underline"
                  >
                    <span>{isAr ? 'سجل البصمة' : 'Provenance'}</span>
                    <ShieldCheck size={14} className="text-[#126B8A]" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Provenance Modal */}
        {selectedPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="provenance-title"
            className="fixed inset-0 z-50 bg-[#12334A]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white border border-[#12334A] w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-[#B8DCE2]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#126B8A] uppercase tracking-wider">
                    <ShieldCheck size={16} className="text-[#126B8A]" />
                    <span>{isAr ? 'شهادة إثبات المصدر والترخيص' : 'Cryptographic Asset Provenance'}</span>
                  </div>
                  <h3 id="provenance-title" className="mt-1 text-xl font-black text-[#12334A]">
                    {isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 text-[#334155] hover:text-[#12334A]"
                  aria-label={isAr ? 'إغلاق' : 'Close'}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-[#334155] block mb-1 font-bold">
                    {isAr ? 'المسار المحلي للملف' : 'Local Hosted Path'}
                  </span>
                  <code className="bg-[#E7F4F6] p-2 border border-[#B8DCE2] block font-mono text-[#12334A]">
                    {selectedPhoto.src}
                  </code>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#334155] font-bold">
                      {isAr ? 'بصمة SHA-256 للتحقق المستقل' : 'Cryptographic SHA-256 Checksum'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(selectedPhoto.sha256)}
                      className="inline-flex items-center gap-1 text-[#126B8A] font-bold hover:underline"
                    >
                      {copied ? <Check size={14} className="text-green-700" /> : <Copy size={14} />}
                      <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ البصمة' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="bg-[#E7F4F6] p-2 border border-[#B8DCE2] block font-mono text-[11px] text-[#12334A] break-all">
                    {selectedPhoto.sha256}
                  </code>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'المؤلف / المصور' : 'Author / Source'}</span>
                    <span className="font-semibold text-[#12334A]">{selectedPhoto.author}</span>
                  </div>
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'الترخيص' : 'License'}</span>
                    <a
                      href={selectedPhoto.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#126B8A] font-bold underline inline-flex items-center gap-1"
                    >
                      <span>{selectedPhoto.license}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'الأبعاد وحجم الملف' : 'Dimensions & Size'}</span>
                    <span className="font-mono text-[#12334A]">
                      {selectedPhoto.width}x{selectedPhoto.height} px ({Math.round(selectedPhoto.byteSize / 1024)} KB)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'صفحة المصدر الأصلي' : 'Original Source'}</span>
                    <a
                      href={selectedPhoto.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#126B8A] font-bold underline inline-flex items-center gap-1 truncate max-w-[200px]"
                    >
                      <span>Wikimedia Commons</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-[#334155] leading-5 bg-[#E7F4F6] p-3 border border-[#B8DCE2]">
                    {isAr
                      ? 'ملاحظة: الصورة مستضافة محلياً لأغراض التوضيح والتوثيق العلمي كنموذج استرشادي مستقل. لا تمثل إقراراً بوجود تعاقد تجاري بين ClearPath Diagnostics والمؤسسات الواردة في الصورة.'
                      : 'Scientific editorial note: Locally hosted for contextual and demonstrative representation. Retains original Creative Commons licensing.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-[#12334A] text-white px-5 py-2.5 font-bold text-xs"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
