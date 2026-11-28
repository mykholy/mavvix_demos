'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { Camera, ExternalLink, X, ShieldCheck, Eye, Scale, BookOpen } from 'lucide-react';
import { LEXORA_PHOTOS, LexoraPhoto } from './media';

export function LexoraVisualAtelier({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<LexoraPhoto | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', labelEn: 'All Archives', labelAr: 'كافة المعروضات' },
    { id: 'jurisprudence', labelEn: 'Jurisprudence & Law Reports', labelAr: 'المكتبة والفقه' },
    { id: 'contracts', labelEn: 'Commercial Agreements', labelAr: 'العقود والاتفاقيات' },
    { id: 'disputes', labelEn: 'Arbitration & Courts', labelAr: 'التحكيم والمحاكم' },
    { id: 'governance', labelEn: 'Ethics & Justice', labelAr: 'العدالة والحوكمة' }
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? LEXORA_PHOTOS
      : LEXORA_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <section
      data-sector-specific="lexora-visual-atelier"
      className="bg-white rounded-sm border border-[#D5C8B5] p-6 sm:p-10 lg:p-12 space-y-8 shadow-sm"
      aria-labelledby="lexora-archive-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC9]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#775A2E] font-bold">
            <Camera className="w-4 h-4 text-[#8B6E39]" />
            <span>
              {isAr
                ? 'الأرشيف البصري الموثق ومراجع البيئة القانونية'
                : 'Verified Legal Archives & Photographic Provenance'}
            </span>
          </div>
          <h2
            id="lexora-archive-heading"
            className="lexora-display text-2xl sm:text-4xl font-bold text-[#251D34]"
          >
            {isAr
              ? 'شواهد فوتوغرافية موثقة لمراجع الفقه وأروقة العدالة'
              : 'Authentic Jurisprudence & Legal Chamber Archives'}
          </h2>
          <p className="text-xs sm:text-sm text-[#3F314B] max-w-2xl leading-relaxed">
            {isAr
              ? 'مجموعة منتقاة من الصور الفوتوغرافية المرخصة توثق مجلدات التقارير القانونية الكلاسيكية، وتوقيع العقود التجارية، وصروح المحاكم العليا، وقاعات التحكيم مع الشفافية الكاملة لرخص الاستخدام وبصمات SHA-256.'
              : 'Curated licensed photography documenting classical jurisprudence folio volumes, commercial contract execution, supreme court architecture, and arbitration suites with verified open-license provenance.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#FAF7F1] border border-[#D5C8B5] text-xs font-mono text-[#251D34] shrink-0 font-bold">
          <ShieldCheck className="w-4 h-4 text-[#397D58]" />
          <span>{isAr ? '٦ صور محلية موثقة SHA-256' : '6 Verified Local WebP Assets'}</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map(cat => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={active}
              aria-label={isAr ? `تصفية: ${cat.labelAr}` : `Filter: ${cat.labelEn}`}
              className={`px-4 py-2 rounded-sm text-xs font-bold transition-all border ${
                active
                  ? 'bg-[#251D34] text-white border-[#251D34] shadow-sm'
                  : 'bg-[#FAF7F1] text-[#251D34] border-[#D5C8B5] hover:bg-[#F2ECE1]'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Photography Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredPhotos.map(photo => (
          <article
            key={photo.id}
            className="group relative rounded-sm overflow-hidden border border-[#D5C8B5] bg-[#FAF7F1] hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image
                src={photo.src}
                alt={isAr ? photo.altAr : photo.altEn}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button
                  type="button"
                  onClick={() => setActiveModalPhoto(photo)}
                  aria-label={
                    isAr
                      ? `معاينة وثيقة الترخيص لصورة ${photo.titleAr}`
                      : `Inspect provenance for ${photo.titleEn}`
                  }
                  className="w-full py-2.5 px-4 rounded-sm bg-white text-[#251D34] text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#FAF7F1] transition-colors"
                >
                  <Eye className="w-4 h-4 text-[#775A2E]" />
                  <span>{isAr ? 'فحص وثيقة الترخيص والبصمة' : 'Inspect Provenance & Hash'}</span>
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#775A2E] font-bold">
                  <span>{photo.category.toUpperCase()}</span>
                  <span className="bg-white px-2 py-0.5 border border-[#D5C8B5] rounded-sm text-[#251D34] font-bold">
                    {photo.license}
                  </span>
                </div>
                <h3 className="lexora-display font-bold text-base text-[#251D34] mt-2 leading-snug">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h3>
                <p className="text-xs text-[#3F314B] mt-1.5 leading-relaxed">
                  {isAr ? photo.subtitleAr : photo.subtitleEn}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DEC9] flex items-center justify-between text-[11px] text-[#3F314B]">
                <span className="truncate max-w-[170px]">
                  {isAr ? 'المصور / المصدر:' : 'Author:'} <strong>{photo.author}</strong>
                </span>
                <span className="font-mono text-[10px] text-[#775A2E] font-semibold">
                  {Math.round(photo.byteSize / 1024)} KB
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Provenance Inspection Modal */}
      {activeModalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-provenance-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white border border-[#D5C8B5] rounded-sm shadow-2xl p-6 sm:p-8 space-y-6 text-[#251D34] max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8DEC9]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#775A2E] uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#397D58]" />
                  <span>{isAr ? 'شهادة أصالة وترخيص المحتوى البصري' : 'Photographic Provenance Certificate'}</span>
                </div>
                <h3 id="modal-provenance-title" className="lexora-display text-xl sm:text-2xl font-bold">
                  {isAr ? activeModalPhoto.titleAr : activeModalPhoto.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPhoto(null)}
                aria-label={isAr ? 'إغلاق نافذة الفحص' : 'Close provenance dialog'}
                className="p-1.5 rounded-sm hover:bg-[#FAF7F1] border border-[#D5C8B5] text-[#251D34] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Preview */}
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-slate-100 border border-[#D5C8B5]">
              <Image
                src={activeModalPhoto.src}
                alt={isAr ? activeModalPhoto.altAr : activeModalPhoto.altEn}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Provenance Metadata Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF7F1] border border-[#D5C8B5] rounded-sm space-y-1">
                <span className="text-[#775A2E] font-bold block">{isAr ? 'المصور / الجهة:' : 'Creator / Attributed to:'}</span>
                <span className="font-semibold text-sm">{activeModalPhoto.author}</span>
              </div>
              <div className="p-3 bg-[#FAF7F1] border border-[#D5C8B5] rounded-sm space-y-1">
                <span className="text-[#775A2E] font-bold block">{isAr ? 'الترخيص القانوني:' : 'License Framework:'}</span>
                <a
                  href={activeModalPhoto.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-sm text-[#775A2E] underline underline-offset-4 hover:text-[#251D34]"
                >
                  <span>{activeModalPhoto.license}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="p-3 bg-[#FAF7F1] border border-[#D5C8B5] rounded-sm space-y-1">
                <span className="text-[#775A2E] font-bold block">{isAr ? 'الأبعاد القياسية والحجم:' : 'Pixel Dimensions & Size:'}</span>
                <span className="font-mono font-semibold">
                  {activeModalPhoto.width} × {activeModalPhoto.height} px ({Math.round(activeModalPhoto.byteSize / 1024)} KB)
                </span>
              </div>
              <div className="p-3 bg-[#FAF7F1] border border-[#D5C8B5] rounded-sm space-y-1">
                <span className="text-[#775A2E] font-bold block">{isAr ? 'المصدر الأصلي (ويكيميديا):' : 'Original Source (Commons):'}</span>
                <a
                  href={activeModalPhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-sm text-[#775A2E] underline underline-offset-4 hover:text-[#251D34] truncate max-w-[200px]"
                >
                  <span>{isAr ? 'صفحة الوثيقة الأصلية' : 'View Source Page'}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Cryptographic SHA-256 Digest */}
            <div className="p-4 bg-[#251D34] text-white rounded-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#E4CA91] font-bold">SHA-256 CRYPTOGRAPHIC DIGEST</span>
                <span className="text-white/80">VERIFIED BIT-EXACT</span>
              </div>
              <p className="font-mono text-[11px] text-[#FAF7F1] break-all bg-black/40 p-2.5 rounded-sm border border-white/10 select-all">
                {activeModalPhoto.sha256}
              </p>
            </div>

            {/* Ethical Legal Context Notice */}
            <div className="p-4 bg-[#F2ECE1] border-s-4 border-[#775A2E] rounded-sm text-xs leading-relaxed text-[#3F314B]">
              <p>
                {isAr
                  ? 'إقرار الشفافية المهنية: هذه صورة فوتوغرافية حقيقية مرخصة للاستخدام التحريري والتوضيحي. لا تمثل مكتبة حصرية أو مقر عمل فعلي أو وثائق نزاع لمكتب محاماة مشغل، بل تجسيد بصري رفيع لتجربة العرض الرقمي لشركة مافكس.'
                  : 'Editorial Authenticity Notice: This photograph is genuine licensed editorial media. It does not represent an operating law firm office, proprietary case files, or real litigants, serving as a client-grade visual reference for Mavvix specialized web architecture.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
