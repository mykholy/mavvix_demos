'use client';

import React, { useState } from 'react';
import { Camera, ExternalLink, ShieldCheck, Check, Copy, X } from 'lucide-react';
import { TALENTYX_PHOTOS, TalentyxPhoto } from './media';

interface TalentyxVisualAtelierProps {
  locale: string;
}

export default function TalentyxVisualAtelier({ locale }: TalentyxVisualAtelierProps) {
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<TalentyxPhoto | null>(null);
  const [copiedSha, setCopiedSha] = useState<boolean>(false);

  const categories = [
    { key: 'all', labelAr: 'كافة الأرشيف', labelEn: 'Complete Archive' },
    { key: 'interview', labelAr: 'المقابلات والتقييم', labelEn: 'Interviews & Evaluation' },
    { key: 'collaboration', labelAr: 'الفرق والتخطيط', labelEn: 'Team Collaboration' },
    { key: 'workplace', labelAr: 'بيئات العمل المعاصرة', labelEn: 'Modern Workplaces' },
    { key: 'executive', labelAr: 'القيادات التنفيذية', labelEn: 'Executive Search' },
    { key: 'matchmaking', labelAr: 'جلسات التعارف المهني', labelEn: 'Talent Matchmaking' }
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? TALENTYX_PHOTOS
      : TALENTYX_PHOTOS.filter((p) => p.category === activeCategory);

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <section
      data-sector-specific="talentyx-visual-atelier"
      className="py-16 sm:py-24 bg-white text-[#17243E] border-b border-[#D8DFED]"
      aria-label={isAr ? 'أرشيف بيئات العمل والتقييم المهني' : 'Talentyx Visual Atelier & Workplace Archive'}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D8DFED]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EEFF] border border-[#C6D4FF] text-[#3549A5] text-xs font-bold tracking-wider uppercase">
              <Camera size={14} className="text-[#3549A5]" />
              <span>{isAr ? 'معرض التوثيق البصري الحي' : 'Verified Photographic Atelier'}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-[#17243E]">
              {isAr ? (
                <>
                  توثيق بيئات العمل <span className="text-[#3549A5]">وجلسات التقييم.</span>
                </>
              ) : (
                <>
                  Workplace Dynamics & <span className="text-[#3549A5]">Assessment Spaces.</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4E5D78] leading-relaxed">
              {isAr
                ? 'مجموعة مختارة من الصور التحريرية الحقيقية المرخصة ذات الدقة الفائقة لتوثيق جلسات المقابلات، بيئات العمل الحديثة، والتخطيط الاستراتيجي للفرق.'
                : 'A curated living collection of genuine licensed high-resolution photographs documenting assessment dialogues, collaborative team hubs, and executive talent environments.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCategory(c.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#17243E] text-white shadow-sm'
                      : 'bg-[#F8F9FC] text-[#4E5D78] border border-[#E1E6F0] hover:border-[#3549A5] hover:bg-white'
                  }`}
                  aria-pressed={active}
                >
                  {isAr ? c.labelAr : c.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-[#F8F9FC] border border-[#D8DFED] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={photo.src}
                    alt={isAr ? photo.altAr : photo.altEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#17243E]/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {photo.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-black text-base sm:text-lg text-[#17243E] line-clamp-1">
                    {isAr ? photo.titleAr : photo.titleEn}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#4E5D78] leading-relaxed line-clamp-2">
                    {isAr ? photo.subtitleAr : photo.subtitleEn}
                  </p>
                </div>
              </div>

              {/* Card Footer with Provenance Trigger */}
              <div className="px-5 py-3.5 bg-white border-t border-[#E1E6F0] flex items-center justify-between text-xs">
                <span className="text-[#334155] font-medium text-[11px] truncate max-w-[170px]">
                  {photo.author} · {photo.license}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className="inline-flex items-center gap-1.5 text-[#3549A5] font-bold hover:underline text-[11px]"
                >
                  <ShieldCheck size={13} />
                  <span>{isAr ? 'التحقق والترخيص' : 'Provenance'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cryptographic Provenance Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-[#17243E]/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={isAr ? 'تفاصيل ترخيص وتوثيق الصورة' : 'Image Provenance & Cryptographic Verification'}
          >
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D8DFED] relative animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg text-[#334155] hover:bg-[#F8F9FC] hover:text-[#17243E] transition-colors"
                aria-label={isAr ? 'إغلاق' : 'Close'}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3549A5] uppercase tracking-wider mb-2">
                <ShieldCheck size={16} />
                <span>{isAr ? 'سجل التوثيق والترخيص الرقمي' : 'Cryptographic Provenance Manifest'}</span>
              </div>

              <h3 className="text-xl font-black text-[#17243E]">
                {isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
              </h3>
              <p className="mt-1 text-xs text-[#4E5D78]">
                {isAr ? selectedPhoto.subtitleAr : selectedPhoto.subtitleEn}
              </p>

              <div className="mt-5 space-y-3 bg-[#F8F9FC] p-4 rounded-xl border border-[#E1E6F0] text-xs font-mono">
                <div>
                  <span className="text-[#334155] block text-[10px] uppercase">{isAr ? 'المسار المحلي:' : 'Local Path:'}</span>
                  <span className="text-[#17243E] font-bold break-all">{selectedPhoto.src}</span>
                </div>

                <div>
                  <span className="text-[#334155] block text-[10px] uppercase">{isAr ? 'الأبعاد وحجم الملف:' : 'Dimensions & Byte Size:'}</span>
                  <span className="text-[#17243E] font-bold">
                    {selectedPhoto.width}x{selectedPhoto.height} px · {selectedPhoto.byteSize.toLocaleString()} bytes
                  </span>
                </div>

                <div>
                  <span className="text-[#334155] block text-[10px] uppercase">{isAr ? 'المؤلف والترخيص المعتمد:' : 'Author & Applicable License:'}</span>
                  <span className="text-[#17243E] font-bold">
                    {selectedPhoto.author} ({selectedPhoto.license})
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#334155] text-[10px] uppercase">{isAr ? 'بصمة SHA-256 للملف:' : 'SHA-256 Checksum:'}</span>
                    <button
                      type="button"
                      onClick={() => handleCopySha(selectedPhoto.sha256)}
                      className="inline-flex items-center gap-1 text-[10px] text-[#3549A5] hover:underline"
                    >
                      {copiedSha ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedSha ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                    </button>
                  </div>
                  <span className="text-[#17243E] font-bold text-[11px] break-all block bg-white p-2 rounded border border-[#E1E6F0]">
                    {selectedPhoto.sha256}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 text-xs">
                <a
                  href={selectedPhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#3549A5] hover:underline font-bold"
                >
                  <span>{isAr ? 'صفحة المصدر الأصلية (ويكيميديا)' : 'Wikimedia Commons Source'}</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 bg-[#17243E] text-white rounded-lg font-bold hover:bg-[#2B3A58] transition-colors"
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
