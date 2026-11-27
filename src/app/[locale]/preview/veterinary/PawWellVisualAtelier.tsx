'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Camera, ExternalLink, X, ShieldCheck, Eye, PawPrint } from 'lucide-react';
import { PAWWELL_PHOTOS, PawWellPhoto } from './media';

export function PawWellVisualAtelier({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<PawWellPhoto | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', labelEn: 'All Facilities', labelAr: 'كافة مرافق الرعاية' },
    { id: 'canine_wellness', labelEn: 'Canine Wellness', labelAr: 'فحص الكلاب' },
    { id: 'feline_wellness', labelEn: 'Feline Care', labelAr: 'رعاية القطط' },
    { id: 'surgery', labelEn: 'Surgical Suite', labelAr: 'العمليات الجراحية' },
    { id: 'diagnostics', labelEn: 'Diagnostic Lab', labelAr: 'المختبر السريري' },
    { id: 'intake', labelEn: 'Triage & Weight', labelAr: 'الفرز والوزن' },
    { id: 'pediatrics', labelEn: 'Pediatric Care', labelAr: 'رعاية الصغار' }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? PAWWELL_PHOTOS
    : PAWWELL_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <section className="bg-white rounded-[2.5rem] border border-[#24463D]/15 p-6 sm:p-10 lg:p-12 space-y-8 shadow-sm" aria-labelledby="pawwell-archive-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#24463D]/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#915736] font-bold">
            <Camera className="w-4 h-4 text-[#915736]" />
            <span>{isAr ? 'الأرشيف البصري الموثق ومراجع الرعاية السريرية' : 'Verified Veterinary Environments & Provenance'}</span>
          </div>
          <h2 id="pawwell-archive-heading" className="paw-display text-2xl sm:text-4xl font-black text-[#24463D]">
            {isAr ? 'شواهد فوتوغرافية موثقة لبيئات الرعاية البيطرية' : 'Authentic Clinical Facilities & Photographic Archive'}
          </h2>
          <p className="text-xs sm:text-sm text-[#45645A] max-w-2xl font-sans leading-relaxed">
            {isAr
              ? 'مجموعة من الصور الفوتوغرافية المرخصة توثق غرف الفحص السريري، أجنحة الجراحة المعقمة، أجهزة التحليل المخبري الآلية، ومحطات قياس الوزن مع الشفافية الكاملة لرخص الاستخدام وبصمات SHA-256.'
              : 'Curated licensed photography documenting clinical consultation suites, sterile surgical suites, automated in-house blood analyzers, and triage floor scales with verified open-license provenance.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EFE5] border border-[#24463D]/20 text-xs font-mono text-[#24463D] shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#24463D]" />
          <span>{isAr ? '٦ صور مرخصة محليًا' : '6 Verified Local WebP Assets'}</span>
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
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                active
                  ? 'bg-[#24463D] text-white shadow-sm'
                  : 'bg-[#F4F7F0] text-[#35584A] border border-[#D9E6D7] hover:bg-[#E6EEDD]'
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
            className="group relative rounded-2xl overflow-hidden border border-[#24463D]/15 bg-[#FAFBF7] hover:shadow-xl transition-all duration-300 flex flex-col"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button
                  type="button"
                  onClick={() => setActiveModalPhoto(photo)}
                  aria-label={isAr ? `معاينة وثيقة الترخيص لصورة ${photo.titleAr}` : `Inspect provenance for ${photo.titleEn}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/95 text-[#24463D] text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-white transition-colors"
                >
                  <Eye className="w-4 h-4 text-[#915736]" />
                  <span>{isAr ? 'فحص وثيقة الترخيص والبيانات' : 'Inspect Provenance & Hash'}</span>
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#915736] font-bold">
                  <span>{photo.category.toUpperCase().replace('_', ' ')}</span>
                  <span className="bg-[#E8EFE5] px-2 py-0.5 rounded text-[#24463D] font-bold">{photo.license}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#24463D] mt-2 group-hover:text-[#915736] transition-colors">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h3>
                <p className="text-xs text-[#45645A] mt-1 line-clamp-2 leading-relaxed">
                  {isAr ? photo.subtitleAr : photo.subtitleEn}
                </p>
              </div>

              <div className="pt-3 border-t border-[#24463D]/10 flex items-center justify-between text-[11px] text-[#6E887E]">
                <span>{photo.author}</span>
                <span className="font-mono">{photo.width} × {photo.height}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Dialog for SHA-256 Provenance Inspection */}
      {activeModalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-provenance-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#915736] uppercase tracking-wider">
                  PROVENANCE MANIFEST AUDIT
                </span>
                <h3 id="modal-provenance-title" className="text-xl sm:text-2xl font-black text-[#24463D] mt-1">
                  {isAr ? activeModalPhoto.titleAr : activeModalPhoto.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPhoto(null)}
                aria-label={isAr ? 'إغلاق نافذة الترخيص' : 'Close provenance dialog'}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview & Metadata */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={activeModalPhoto.src}
                alt={isAr ? activeModalPhoto.altAr : activeModalPhoto.altEn}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>

            {/* Technical Verification Manifest Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block">{isAr ? 'البصمة المشفرة للتحقق (SHA-256):' : 'Cryptographic Checksum (SHA-256):'}</span>
                <span className="text-[#24463D] font-bold break-all select-all block text-[11px]">
                  {activeModalPhoto.sha256}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] block">{isAr ? 'الأبعاد' : 'Dimensions'}</span>
                  <span className="font-bold text-[#24463D]">{activeModalPhoto.width} × {activeModalPhoto.height}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] block">{isAr ? 'حجم الملف' : 'Byte Size'}</span>
                  <span className="font-bold text-[#24463D]">{(activeModalPhoto.byteSize / 1024).toFixed(1)} KB</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] block">{isAr ? 'الترخيص' : 'License'}</span>
                  <span className="font-bold text-[#24463D]">{activeModalPhoto.license}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] block">{isAr ? 'المصور / الجهة' : 'Author'}</span>
                  <span className="font-bold text-[#24463D] truncate block">{activeModalPhoto.author}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E8DFC9] flex items-center justify-between gap-3">
                <span className="text-[#875231] text-[11px] font-sans">
                  {isAr
                    ? 'هذه الصورة مرخصة للاستخدام التحريري المفتوح ومحفوظة ذاتيًا في السيرفر دون أي ارتباط بخوادم خارجية.'
                    : 'This asset is verified, self-hosted locally, and distributed under open creative commons terms.'}
                </span>
                <a
                  href={activeModalPhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-[#24463D] text-white text-[11px] font-sans font-bold flex items-center gap-1.5 hover:bg-[#35584A]"
                >
                  <span>{isAr ? 'المصدر' : 'Source'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
