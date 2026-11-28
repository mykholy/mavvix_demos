'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LUMA_MEDIA_COLLECTION, type LumaMediaAsset } from './media';
import {
  Maximize2,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Camera,
  FileCheck
} from 'lucide-react';

export function LumaVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [activeAsset, setActiveAsset] = useState<LumaMediaAsset | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAssets = LUMA_MEDIA_COLLECTION.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'conferences') return item.id.includes('conference') || item.id.includes('ballroom');
    if (filter === 'galas') return item.id.includes('banquet') || item.id.includes('ballroom');
    if (filter === 'stage') return item.id.includes('stage') || item.id.includes('lighting');
    if (filter === 'pavilions') return item.id.includes('pavilion');
    return true;
  });

  return (
    <section
      data-sector-specific="luma-visual-atelier"
      className="bg-[#FAF6F2] py-16 sm:py-24 border-b border-[#D8C7C4]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D8C7C4]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F1E4DF] border border-[#D8C7C4] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#874F63]">
              <Camera size={14} />
              <span>{ar ? 'الأرشيف البصري الموثق للإنتاج' : 'Curated Visual Staging Archive'}</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#291C2D] leading-tight">
              {ar ? 'توثيق معماري وميداني لأجواء الفعاليات' : 'Atmosphere, stagecraft & spatial design'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A4650]">
              {ar
                ? 'مجموعة مختارة من الصور التحريرية المرخصة توضح معايير الإضاءة المسرحية، ترتيب القاعات الكبرى، طاولات الضيافة الرفيعة، وأجنحة المعارض التفاعلية مع إثبات الملكية والتشفير.'
                : 'Licensed editorial photography illustrating stage illumination, grand ballroom proportions, banqueting aesthetics, and brand activation architecture with cryptographic provenance verification.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', ar: 'الكل (٦)', en: 'All (6)' },
              { id: 'conferences', ar: 'المؤتمرات والقمم', en: 'Conferences' },
              { id: 'galas', ar: 'حفلات العشاء', en: 'Galas & Dinners' },
              { id: 'stage', ar: 'المسرح والصوتيات', en: 'Stage & AV' },
              { id: 'pavilions', ar: 'أجنحة المعارض', en: 'Pavilions' }
            ].map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`px-4 py-2 text-xs font-bold transition-all duration-200 ${
                    active
                      ? 'bg-[#291C2D] text-[#FCF7F1] shadow-sm'
                      : 'bg-white text-[#291C2D] border border-[#D8C7C4] hover:border-[#874F63]'
                  }`}
                >
                  {ar ? f.ar : f.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-white border border-[#D8C7C4] overflow-hidden hover:border-[#874F63] transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#F1E4DF] overflow-hidden">
                <img
                  src={asset.local}
                  alt={asset.alt[locale]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setActiveAsset(asset)}
                  aria-label={`${ar ? 'عرض تفاصيل المصدر لـ' : 'View provenance details for'} ${asset.caption[locale]}`}
                  className="absolute inset-0 bg-[#291C2D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 font-bold text-xs"
                >
                  <Maximize2 size={18} className="text-[#DCB8A6]" />
                  <span>{ar ? 'بيانات التوثيق والترخيص' : 'Inspect Provenance'}</span>
                </button>
                <div className="absolute top-3 end-3 bg-[#291C2D]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-bold text-[#FCF7F1]">
                  {asset.dimensions}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#874F63] mb-2">
                    <span className="font-bold">{asset.license}</span>
                    <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#291C2D] leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#5A4650] leading-relaxed line-clamp-2">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#F1E4DF] flex items-center justify-between text-xs text-[#5A4650]">
                  <span>{ar ? 'المصور:' : 'Creator:'} {asset.author}</span>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(asset)}
                    className="text-[#874F63] hover:underline font-bold"
                  >
                    {ar ? 'المصدر' : 'Source'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Dialog for Cryptographic Provenance */}
        {activeAsset && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="luma-modal-title"
            className="fixed inset-0 z-50 bg-[#291C2D]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <div className="bg-white border-2 border-[#291C2D] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                aria-label={ar ? 'إغلاق نافذة التوثيق' : 'Close provenance modal'}
                className="absolute top-4 end-4 p-2 text-[#291C2D] hover:bg-[#F1E4DF] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#874F63] uppercase tracking-wider mb-2">
                <FileCheck size={16} />
                <span>{ar ? 'سجل التوثيق والترخيص المشفر' : 'Cryptographic Provenance Manifest'}</span>
              </div>

              <h3 id="luma-modal-title" className="font-serif text-2xl font-medium text-[#291C2D]">
                {activeAsset.caption[locale]}
              </h3>

              <div className="mt-6 aspect-video bg-[#F1E4DF] overflow-hidden border border-[#D8C7C4]">
                <img
                  src={activeAsset.local}
                  alt={activeAsset.alt[locale]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#FAF6F2] border border-[#D8C7C4]">
                  <p className="text-[10px] uppercase font-bold text-[#874F63]">
                    {ar ? 'البصمة المشفرة للتحقق (SHA-256 Digest)' : 'Cryptographic Hash (SHA-256)'}
                  </p>
                  <p className="mt-1 break-all text-[#291C2D] font-bold">{activeAsset.sha256}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#FAF6F2] border border-[#D8C7C4]">
                    <p className="text-[10px] uppercase font-bold text-[#874F63]">{ar ? 'الأبعاد' : 'Dimensions'}</p>
                    <p className="mt-1 text-[#291C2D] font-bold">{activeAsset.dimensions} px</p>
                  </div>
                  <div className="p-3 bg-[#FAF6F2] border border-[#D8C7C4]">
                    <p className="text-[10px] uppercase font-bold text-[#874F63]">{ar ? 'حجم الملف' : 'File Size'}</p>
                    <p className="mt-1 text-[#291C2D] font-bold">
                      {activeAsset.bytes.toLocaleString()} bytes ({(activeAsset.bytes / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF6F2] border border-[#D8C7C4] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A4650]">{ar ? 'المصور / الجهة:' : 'Creator / Attribution:'}</span>
                    <span className="font-bold text-[#291C2D]">{activeAsset.author}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A4650]">{ar ? 'نوع الترخيص:' : 'License:'}</span>
                    <a
                      href={activeAsset.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#874F63] hover:underline inline-flex items-center gap-1"
                    >
                      {activeAsset.license}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A4650]">{ar ? 'المصدر الأصلي:' : 'Source Repository:'}</span>
                    <a
                      href={activeAsset.sourcePage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#874F63] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Wikimedia Commons</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-[#F1E4DF] border border-[#D8C7C4] flex items-center gap-2 text-[#291C2D]">
                  <ShieldCheck size={16} className="text-[#874F63] shrink-0" />
                  <span className="text-[11px] leading-tight font-sans">
                    {ar
                      ? 'صورة تحريرية مرخصة مستضافة محلياً لأغراض العرض التوضيحي، لا تمثل منشأة أو فعالية حقيقية لشركة لوما.'
                      : 'Locally hosted licensed editorial media for illustrative concept demonstration; does not depict a real Luma production event.'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveAsset(null)}
                  className="bg-[#291C2D] text-white px-6 py-2.5 text-xs font-bold hover:bg-[#874F63] transition-colors"
                >
                  {ar ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
