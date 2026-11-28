'use client';

import { useState } from 'react';
import { Camera, Check, Copy, ExternalLink, ShieldCheck, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { OASIS_PHOTOS, type OasisPhoto } from './media';

interface OasisVisualAtelierProps {
  locale: Locale;
}

type FilterCategory = 'all' | 'suite' | 'dining' | 'courtyard' | 'terrace' | 'wellness' | 'library';

export function OasisVisualAtelier({ locale }: OasisVisualAtelierProps) {
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<OasisPhoto | null>(null);
  const [copied, setCopied] = useState(false);

  const categories: { id: FilterCategory; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'كافة المعروضات (6)', labelEn: 'All Assets (6)' },
    { id: 'suite', labelAr: 'الأجنحة والغرف', labelEn: 'Chambers & Suites' },
    { id: 'courtyard', labelAr: 'الأفنية الداخلية', labelEn: 'Courtyards' },
    { id: 'dining', labelAr: 'مائدة المزرعة', labelEn: 'Artisan Dining' },
    { id: 'terrace', labelAr: 'تراسات الغروب', labelEn: 'Rooftop Terraces' },
    { id: 'wellness', labelAr: 'المسبح والعافية', labelEn: 'Thermal Wellness' },
    { id: 'library', labelAr: 'الصالون والمكتبة', labelEn: 'Heritage Library' }
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? OASIS_PHOTOS
      : OASIS_PHOTOS.filter((p) => p.category === activeCategory);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      data-sector-specific="oasis-visual-atelier"
      className="bg-[#F5F0E6] py-16 sm:py-24 border-b border-[#D9CDBB]"
      aria-labelledby="atelier-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#46543C] text-[#F5F0E6] text-xs font-bold tracking-widest uppercase">
            <Camera size={14} className="text-[#CBA676]" />
            <span>{isAr ? 'أرشيف التوثيق البصري والأصول' : 'Photographic Archive & Media Provenance'}</span>
          </div>
          <h2
            id="atelier-heading"
            className="mt-4 font-serif text-3xl sm:text-5xl font-normal text-[#282A25] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                مشاهد من روح الواحة <span className="block italic text-[#46543C]">موثقة بالبصمة الرقمية المستقلة</span>
              </>
            ) : (
              <>
                Echoes of the Oasis <span className="block italic text-[#46543C]">& Cryptographically Verified Media</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'معرض فوتوغرافي مرخص ومستضاف محلياً يوثق أجنحة الاسترخاء والأفنية والمسابح وموائد الطهي البطيء مع سجل إثبات الملكية الفكرية وبصمات SHA-256 المستقلة.'
              : 'Locally hosted, licensed editorial media documenting sanctuary suites, cloistered courtyards, thermal pools, and artisan dining with immutable SHA-256 cryptographic provenance manifests.'}
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
                    ? 'bg-[#46543C] text-white border-[#46543C]'
                    : 'bg-white text-[#282A25] border-[#D9CDBB] hover:border-[#46543C]'
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
              className="bg-white border border-[#D9CDBB] flex flex-col justify-between overflow-hidden group hover:border-[#46543C] transition-colors"
            >
              <div className="relative aspect-[4/3] bg-[#E7DCC9] overflow-hidden">
                <img
                  src={photo.src}
                  alt={isAr ? photo.altAr : photo.altEn}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 end-3 bg-[#282A25]/90 text-[#CBA676] px-2.5 py-1 text-[11px] font-mono font-bold backdrop-blur-sm">
                  {photo.id.replace('oasis-', 'OAS-')}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#282A25] group-hover:text-[#46543C] transition-colors">
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h3>
                  <p className="mt-2 text-xs text-[#334155] leading-5">
                    {isAr ? photo.subtitleAr : photo.subtitleEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#D9CDBB] flex items-center justify-between text-xs">
                  <span className="text-[#334155] font-mono">{photo.license}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="inline-flex items-center gap-1 font-bold text-[#46543C] hover:underline"
                  >
                    <span>{isAr ? 'سجل البصمة' : 'Provenance'}</span>
                    <ShieldCheck size={14} className="text-[#46543C]" />
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
            className="fixed inset-0 z-50 bg-[#282A25]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white border border-[#46543C] w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-[#D9CDBB]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#46543C] uppercase tracking-wider">
                    <ShieldCheck size={16} className="text-[#46543C]" />
                    <span>{isAr ? 'شهادة إثبات المصدر والترخيص' : 'Cryptographic Asset Provenance'}</span>
                  </div>
                  <h3 id="provenance-title" className="mt-1 font-serif text-2xl font-bold text-[#282A25]">
                    {isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 text-[#334155] hover:text-[#282A25]"
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
                  <code className="bg-[#F5F0E6] p-2 border border-[#D9CDBB] block font-mono text-[#282A25]">
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
                      className="inline-flex items-center gap-1 text-[#46543C] font-bold hover:underline"
                    >
                      {copied ? <Check size={14} className="text-green-700" /> : <Copy size={14} />}
                      <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ البصمة' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="bg-[#F5F0E6] p-2 border border-[#D9CDBB] block font-mono text-[11px] text-[#282A25] break-all">
                    {selectedPhoto.sha256}
                  </code>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'المؤلف / المصور' : 'Author / Source'}</span>
                    <span className="font-semibold text-[#282A25]">{selectedPhoto.author}</span>
                  </div>
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'الترخيص' : 'License'}</span>
                    <a
                      href={selectedPhoto.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#46543C] font-bold underline inline-flex items-center gap-1"
                    >
                      <span>{selectedPhoto.license}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'الأبعاد وحجم الملف' : 'Dimensions & Size'}</span>
                    <span className="font-mono text-[#282A25]">
                      {selectedPhoto.width}x{selectedPhoto.height} px ({Math.round(selectedPhoto.byteSize / 1024)} KB)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#334155] block mb-1 font-bold">{isAr ? 'صفحة المصدر الأصلي' : 'Original Source'}</span>
                    <a
                      href={selectedPhoto.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#46543C] font-bold underline inline-flex items-center gap-1 truncate max-w-[200px]"
                    >
                      <span>Wikimedia Commons</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-[#334155] leading-5 bg-[#E7DCC9] p-3 border border-[#D9CDBB]">
                    {isAr
                      ? 'ملاحظة: الصورة مستضافة محلياً لأغراض التوضيح والتوثيق التحريري كنموذج استرشادي مستقل. لا تمثل إقراراً بوجود تعاقد تجاري بين Oasis & Co والمؤسسات الواردة في الصورة.'
                      : 'Editorial note: Locally hosted for contextual and demonstrative representation. Retains original Creative Commons licensing.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-[#282A25] text-white px-5 py-2.5 font-bold text-xs"
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
