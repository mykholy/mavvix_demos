'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { ELYRA_MEDIA_COLLECTION, type ElyraMediaAsset } from './media';
import {
  ExternalLink,
  Shield,
  Maximize2,
  X,
  FileCheck,
  Camera,
  Layers
} from 'lucide-react';

export function ElyraVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [activeAsset, setActiveAsset] = useState<ElyraMediaAsset | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAssets = ELYRA_MEDIA_COLLECTION.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'consultation') return item.id.includes('room') || item.id.includes('consultation');
    if (filter === 'device') return item.id.includes('device') || item.id.includes('optic');
    if (filter === 'spaces') return item.id.includes('suite') || item.id.includes('lounge');
    return true;
  });

  return (
    <section
      data-sector-specific="clinical-visual-atelier"
      className="bg-[#F7F3EF] py-16 sm:py-24 border-b border-[#E2D7DC]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D6C9CD]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#754458]">
              {ar ? '٠٨ / أرشيف المنشأة السريرية' : '08 / CLINICAL ATELIER & ARCHIVE'}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#352B39]">
              {ar ? 'بيئة علاجية مصممة للسكينة والأمان' : 'Clinical environments shaped for calm'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#50434F]">
              {ar
                ? 'توثيق بصري تحريري مستقل يجسد الأجواء السريرية المتخصصة وأجهزة الفحص البصري المجهري وأجنحة الرعاية الهادئة، موثق ببيانات الترخيص المفتوح.'
                : 'Independent licensed editorial documentation reflecting specialized dermatology consultation suites, dermoscopic optical devices, and tranquil restorative treatment rooms.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', ar: 'الكل (٦)', en: 'All (6)' },
              { id: 'consultation', ar: 'غرف الاستشارة', en: 'Consultation' },
              { id: 'device', ar: 'أجهزة الفحص', en: 'Optical Devices' },
              { id: 'spaces', ar: 'الأجنحة والصالات', en: 'Suites & Lounge' }
            ].map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`px-4 py-2 text-xs font-bold transition-all rounded-full ${
                    active
                      ? 'bg-[#352B39] text-white shadow-sm'
                      : 'bg-white text-[#352B39] border border-[#D6C9CD] hover:border-[#86566B]'
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
              className="group bg-white border border-[#D6C9CD] rounded-t-3xl overflow-hidden hover:border-[#754458] transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#EEE3E7] overflow-hidden">
                <img
                  src={asset.local}
                  alt={asset.alt[locale]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setActiveAsset(asset)}
                  aria-label={`${ar ? 'عرض تفاصيل المصدر لـ' : 'View provenance details for'} ${asset.caption[locale]}`}
                  className="absolute inset-0 bg-[#352B39]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-xs"
                >
                  <Maximize2 size={18} />
                  <span>{ar ? 'سجل المصدر والترخيص' : 'View Provenance'}</span>
                </button>
                <div className="absolute top-3 end-3 bg-[#352B39]/90 text-white text-[11px] font-mono px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {asset.license}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#352B39] leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#6B5A69] leading-relaxed line-clamp-2">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E8DFE2] flex items-center justify-between text-[11px] text-[#754458]">
                  <span className="font-mono">{asset.dimensions}</span>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(asset)}
                    className="inline-flex items-center gap-1 font-bold hover:underline text-[#352B39]"
                  >
                    <span>SHA-256</span>
                    <FileCheck size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cryptographic Provenance Modal */}
      {activeAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ar ? 'سجل الترخيص المفتوح والمصدر' : 'Editorial Provenance and Licensing'}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setActiveAsset(null)}
        >
          <div
            className="bg-white border border-[#D6C9CD] rounded-t-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveAsset(null)}
              aria-label={ar ? 'إغلاق' : 'Close'}
              className="absolute top-5 end-5 text-[#50434F] hover:text-[#352B39] p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#754458] uppercase">
              <Shield size={16} />
              <span>{ar ? 'توثيق الترخيص الرقمي المستقل' : 'Verified Editorial Provenance'}</span>
            </div>

            <h3 className="mt-2 font-serif text-2xl text-[#352B39]">
              {activeAsset.caption[locale]}
            </h3>

            <div className="mt-6 space-y-3 text-xs bg-[#F7F3EF] border border-[#E2D7DC] p-4 rounded-xl font-mono text-[#352B39]">
              <div>
                <span className="text-[#754458] block font-sans font-bold">SHA-256 Digest:</span>
                <span className="break-all text-[11px]">{activeAsset.sha256}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DFE2]">
                <div>
                  <span className="text-[#754458] block font-sans font-bold">Local File:</span>
                  <span className="text-[11px]">{activeAsset.local}</span>
                </div>
                <div>
                  <span className="text-[#754458] block font-sans font-bold">Dimensions & Size:</span>
                  <span className="text-[11px]">{activeAsset.dimensions} ({Math.round(activeAsset.bytes / 1024)} KB)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#E8DFE2]">
                <span className="text-[#754458] block font-sans font-bold">Creator / Credit:</span>
                <span className="text-[11px]">{activeAsset.author}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D6C9CD]">
              <span className="text-xs text-[#50434F]">
                {ar ? 'الترخيص المعتمد:' : 'License:'}{' '}
                <a
                  href={activeAsset.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#754458]"
                >
                  {activeAsset.license}
                </a>
              </span>
              <a
                href={activeAsset.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#352B39] hover:text-[#754458] underline"
              >
                <span>{ar ? 'صفحة المصدر الأصلية' : 'Wikimedia Source Page'}</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <p className="mt-4 text-[11px] text-[#6B5A69] leading-relaxed bg-[#EEE3E7] p-3 rounded">
              {ar
                ? 'إخلاء مسؤولية: صورة تحريرية مرخصة بموجب المشاع الإبداعي لأغراض استعراض تجربة التصميم. لا تمثل منشأة سريرية قائمة أو مرضى حقيقيين.'
                : 'Disclaimer: Independent editorial image licensed under Creative Commons for portfolio and design demonstration. Represents no commercial medical facility or actual patients.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
