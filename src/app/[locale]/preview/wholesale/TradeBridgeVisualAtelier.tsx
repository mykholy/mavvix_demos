'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { Camera, ExternalLink, X, ShieldCheck, Eye, Boxes, Truck } from 'lucide-react';
import { TRADEBRIDGE_PHOTOS, TradeBridgePhoto } from './media';

export function TradeBridgeVisualAtelier({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<TradeBridgePhoto | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', labelEn: 'All Facilities', labelAr: 'كافة المرافق اللوجستية' },
    { id: 'logistics', labelEn: 'Transport & Staging', labelAr: 'النقل والمناولة' },
    { id: 'storage', labelEn: 'Racking & Inventory', labelAr: 'التخزين والأرفف' },
    { id: 'packaging', labelEn: 'Pallets & Packaging', labelAr: 'المنصات والتغليف' },
    { id: 'automation', labelEn: 'High-Bay Automated', labelAr: 'المستودعات الذكية' }
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? TRADEBRIDGE_PHOTOS
      : TRADEBRIDGE_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <section
      data-sector-specific="tradebridge-visual-atelier"
      className="bg-white rounded-sm border border-[#D9D2CA] p-6 sm:p-10 lg:p-12 space-y-8 shadow-sm"
      aria-labelledby="tradebridge-archive-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC9]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9B3320] font-bold">
            <Camera className="w-4 h-4 text-[#B9442E]" />
            <span>
              {isAr
                ? 'الأرشيف البصري الموثق لمرافق التوريد وسلاسل الإمداد'
                : 'Verified Wholesale Facilities & Photographic Provenance'}
            </span>
          </div>
          <h2
            id="tradebridge-archive-heading"
            className="text-2xl sm:text-4xl font-black text-[#213044] tracking-tight"
          >
            {isAr
              ? 'شواهد فوتوغرافية موثقة لمراكز التوزيع وسلاسل الإمداد'
              : 'Authentic Bulk Logistics & Distribution Facilities'}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5568] max-w-2xl leading-relaxed">
            {isAr
              ? 'مجموعة منتقاة من الصور الفوتوغرافية المرخصة توثق مراكز التوزيع اللوجستية، وأرفف التخزين العالية، ورافعات المناولة الصناعية، ورص المنصات المعيارية مع الشفافية الكاملة لرخص الاستخدام وبصمات SHA-256.'
              : 'Curated licensed photography documenting regional distribution centers, high-bay automated racking, industrial material handling, and shrink-wrapped pallets with verified open-license provenance.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#F8F4EF] border border-[#D9D2CA] text-xs font-mono text-[#213044] shrink-0 font-bold">
          <ShieldCheck className="w-4 h-4 text-[#38A169]" />
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
                  ? 'bg-[#213044] text-white border-[#213044] shadow-sm'
                  : 'bg-[#F8F4EF] text-[#213044] border-[#D9D2CA] hover:bg-[#EFE8DD]'
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
            className="group relative rounded-sm overflow-hidden border border-[#D9D2CA] bg-[#F8F4EF] hover:shadow-lg transition-all duration-300 flex flex-col"
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
                  className="w-full py-2.5 px-4 rounded-sm bg-white text-[#213044] text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#F8F4EF] transition-colors"
                >
                  <Eye className="w-4 h-4 text-[#B9442E]" />
                  <span>{isAr ? 'فحص وثيقة الترخيص والبصمة' : 'Inspect Provenance & Hash'}</span>
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9B3320] font-bold">
                  <span>{photo.category.toUpperCase()}</span>
                  <span className="bg-white px-2 py-0.5 border border-[#D9D2CA] rounded-sm text-[#213044] font-bold">
                    {photo.license}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#213044] mt-2 leading-snug">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h3>
                <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                  {isAr ? photo.subtitleAr : photo.subtitleEn}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DEC9] flex items-center justify-between text-[11px] text-[#4A5568]">
                <span className="truncate max-w-[170px]">
                  {isAr ? 'المصور / المصدر:' : 'Author:'} <strong>{photo.author}</strong>
                </span>
                <span className="font-mono text-[10px] text-[#9B3320] font-semibold">
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
            className="relative w-full max-w-2xl bg-white border border-[#D9D2CA] rounded-sm shadow-2xl p-6 sm:p-8 space-y-6 text-[#213044] max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8DEC9]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9B3320] uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#38A169]" />
                  <span>{isAr ? 'شهادة أصالة وترخيص المحتوى البصري' : 'Photographic Provenance Certificate'}</span>
                </div>
                <h3 id="modal-provenance-title" className="text-xl sm:text-2xl font-bold">
                  {isAr ? activeModalPhoto.titleAr : activeModalPhoto.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPhoto(null)}
                aria-label={isAr ? 'إغلاق نافذة الفحص' : 'Close provenance dialog'}
                className="p-1.5 rounded-sm hover:bg-[#F8F4EF] border border-[#D9D2CA] text-[#213044] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Preview */}
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-slate-100 border border-[#D9D2CA]">
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
              <div className="p-3 bg-[#F8F4EF] border border-[#D9D2CA] rounded-sm space-y-1">
                <span className="text-[#9B3320] font-bold block">{isAr ? 'المصور / الجهة:' : 'Creator / Attributed to:'}</span>
                <span className="font-semibold text-sm">{activeModalPhoto.author}</span>
              </div>
              <div className="p-3 bg-[#F8F4EF] border border-[#D9D2CA] rounded-sm space-y-1">
                <span className="text-[#9B3320] font-bold block">{isAr ? 'الترخيص القانوني:' : 'License Framework:'}</span>
                <a
                  href={activeModalPhoto.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-sm text-[#9B3320] underline underline-offset-4 hover:text-[#213044]"
                >
                  <span>{activeModalPhoto.license}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="p-3 bg-[#F8F4EF] border border-[#D9D2CA] rounded-sm space-y-1">
                <span className="text-[#9B3320] font-bold block">{isAr ? 'الأبعاد القياسية والحجم:' : 'Pixel Dimensions & Size:'}</span>
                <span className="font-mono font-semibold">
                  {activeModalPhoto.width} × {activeModalPhoto.height} px ({Math.round(activeModalPhoto.byteSize / 1024)} KB)
                </span>
              </div>
              <div className="p-3 bg-[#F8F4EF] border border-[#D9D2CA] rounded-sm space-y-1">
                <span className="text-[#9B3320] font-bold block">{isAr ? 'المصدر الأصلي (ويكيميديا):' : 'Original Source (Commons):'}</span>
                <a
                  href={activeModalPhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-sm text-[#9B3320] underline underline-offset-4 hover:text-[#213044] truncate max-w-[200px]"
                >
                  <span>{isAr ? 'صفحة الوثيقة الأصلية' : 'View Source Page'}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Cryptographic SHA-256 Digest */}
            <div className="p-4 bg-[#213044] text-white rounded-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#F3C2B4] font-bold">SHA-256 CRYPTOGRAPHIC DIGEST</span>
                <span className="text-white/80">VERIFIED BIT-EXACT</span>
              </div>
              <p className="font-mono text-[11px] text-[#F8F4EF] break-all bg-black/40 p-2.5 rounded-sm border border-white/10 select-all">
                {activeModalPhoto.sha256}
              </p>
            </div>

            {/* Ethical Context Notice */}
            <div className="p-4 bg-[#EFE8DD] border-s-4 border-[#9B3320] rounded-sm text-xs leading-relaxed text-[#26323B]">
              <p>
                {isAr
                  ? 'إقرار الشفافية التجارية: هذه صورة فوتوغرافية حقيقية مرخصة للاستخدام التحريري والتوضيحي. لا تمثل مستودعات حصرية أو مخزونًا تجاريًا مباشرًا لشركة تريد بريدج، بل تجسيد بصري رفيع لتجربة العرض الرقمي المتخصص لشركة مافكس.'
                  : 'Editorial Authenticity Notice: This photograph is genuine licensed editorial media. It does not represent proprietary inventory or active premises of TradeBridge, serving as a client-grade visual benchmark for Mavvix specialized web architecture.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
