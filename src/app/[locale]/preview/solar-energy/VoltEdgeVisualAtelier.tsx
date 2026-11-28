'use client';

import { useState } from 'react';
import { Camera, Check, Copy, ExternalLink, ShieldCheck, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { VOLTEDGE_PHOTOS, type VoltEdgePhoto } from './media';

interface VoltEdgeVisualAtelierProps {
  locale: Locale;
}

type FilterCategory = 'all' | 'agricultural' | 'rooftop' | 'utility' | 'commercial' | 'inverter' | 'engineering';

export function VoltEdgeVisualAtelier({ locale }: VoltEdgeVisualAtelierProps) {
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<VoltEdgePhoto | null>(null);
  const [copied, setCopied] = useState(false);

  const categories: { id: FilterCategory; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'كافة المعروضات (6)', labelEn: 'All Assets (6)' },
    { id: 'utility', labelAr: 'محطات كبرى', labelEn: 'Utility Scale' },
    { id: 'commercial', labelAr: 'مجمعات صناعية', labelEn: 'Industrial PV' },
    { id: 'rooftop', labelAr: 'أسطح منشآت', labelEn: 'Rooftops' },
    { id: 'agricultural', labelAr: 'طاقة زراعية', labelEn: 'Agricultural' },
    { id: 'inverter', labelAr: 'إلكترونيات القوى', labelEn: 'Power Electronics' },
    { id: 'engineering', labelAr: 'معاينات هندسية', labelEn: 'Site Surveys' }
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? VOLTEDGE_PHOTOS
      : VOLTEDGE_PHOTOS.filter((p) => p.category === activeCategory);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      data-sector-specific="voltedge-visual-atelier"
      className="bg-[#F5F7F0] py-16 sm:py-24 border-b border-[#D2DBCC]"
      aria-labelledby="atelier-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12352D] text-[#C7DA59] text-xs font-bold tracking-widest uppercase">
            <Camera size={14} className="text-[#C7DA59]" />
            <span>{isAr ? 'أرشيف التوثيق الميداني والأصول' : 'Photographic Archive & Media Provenance'}</span>
          </div>
          <h2
            id="atelier-heading"
            className="mt-4 text-3xl sm:text-5xl font-black text-[#12352D] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                شواهد الطاقة المتجددة <span className="block text-[#264D43]">والأصول الموثقة بالبصمة الرقمية</span>
              </>
            ) : (
              <>
                Clean Energy Fieldwork <span className="block text-[#264D43]">& Cryptographically Verified Media</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'معرض فوتوغرافي مرخص ومستضاف محلياً يوثق محطات الطاقة الكهروضوئية الكبرى والمنظومات الصناعية والزراعية مع سجل إثبات الملكية الفكرية وبصمات SHA-256 المستقلة.'
              : 'Locally hosted, licensed editorial media documenting utility solar parks, industrial arrays, and agricultural systems with immutable SHA-256 cryptographic provenance manifests.'}
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
                    ? 'bg-[#12352D] text-white border-[#12352D]'
                    : 'bg-white text-[#182720] border-[#D2DBCC] hover:border-[#12352D]'
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
              className="bg-white border border-[#D2DBCC] flex flex-col justify-between overflow-hidden group hover:border-[#12352D] transition-colors"
            >
              <div className="relative aspect-[4/3] bg-[#E0E9DB] overflow-hidden">
                <img
                  src={photo.src}
                  alt={isAr ? photo.altAr : photo.altEn}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 end-3 bg-[#12352D]/90 text-[#C7DA59] px-2.5 py-1 text-[11px] font-mono font-bold backdrop-blur-sm">
                  {photo.id.replace('voltedge-', 'VE-')}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#12352D] group-hover:text-[#264D43] transition-colors">
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h3>
                  <p className="mt-2 text-xs text-[#334155] leading-5">
                    {isAr ? photo.subtitleAr : photo.subtitleEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#D2DBCC] flex items-center justify-between text-xs">
                  <span className="text-[#334155] font-mono">{photo.license}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="inline-flex items-center gap-1 font-bold text-[#12352D] hover:underline"
                  >
                    <span>{isAr ? 'سجل البصمة' : 'Provenance'}</span>
                    <ShieldCheck size={14} className="text-[#12352D]" />
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
            className="fixed inset-0 z-50 bg-[#12352D]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white border border-[#12352D] w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-[#D2DBCC]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#264D43] uppercase tracking-wider">
                    <ShieldCheck size={16} className="text-[#12352D]" />
                    <span>{isAr ? 'شهادة إثبات المصدر والترخيص' : 'Cryptographic Asset Provenance'}</span>
                  </div>
                  <h3 id="provenance-title" className="mt-1 text-xl font-black text-[#12352D]">
                    {isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 text-[#334155] hover:text-[#12352D]"
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
                  <code className="bg-[#F5F7F0] p-2 border border-[#D2DBCC] block font-mono text-[#182720]">
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
                      className="inline-flex items-center gap-1 text-[#12352D] font-bold hover:underline"
                    >
                      {copied ? <Check size={14} className="text-green-700" /> : <Copy size={14} />}
                      <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ البصمة' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="bg-[#F5F7F0] p-2 border border-[#D2DBCC] block font-mono text-[11px] text-[#182720] break-all">
                    {selectedPhoto.sha256}
                  </code>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'المؤلف / المصور' : 'Author / Source'}</span>
                    <span className="font-semibold text-[#182720]">{selectedPhoto.author}</span>
                  </div>
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'الترخيص' : 'License'}</span>
                    <a
                      href={selectedPhoto.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#12352D] font-bold underline inline-flex items-center gap-1"
                    >
                      <span>{selectedPhoto.license}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'الأبعاد وحجم الملف' : 'Dimensions & Size'}</span>
                    <span className="font-mono text-[#182720]">
                      {selectedPhoto.width}x{selectedPhoto.height} px ({Math.round(selectedPhoto.byteSize / 1024)} KB)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'صفحة المصدر الأصلي' : 'Original Source'}</span>
                    <a
                      href={selectedPhoto.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#12352D] font-bold underline inline-flex items-center gap-1 truncate max-w-[200px]"
                    >
                      <span>Wikimedia Commons</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-[#334155] leading-5 bg-[#E0E9DB] p-3 border border-[#D2DBCC]">
                    {isAr
                      ? 'ملاحظة: الصورة مستضافة محلياً لأغراض التوضيح والتوثيق التحريري كنموذج استرشادي مستقل. لا تمثل إقراراً بوجود تعاقد تجاري بين VoltEdge والمؤسسات الواردة في الصورة.'
                      : 'Editorial note: Locally hosted for contextual and demonstrative representation. Retains original public domain or Creative Commons licensing.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-[#12352D] text-white px-5 py-2.5 font-bold text-xs"
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
