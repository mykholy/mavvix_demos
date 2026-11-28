'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { ROUTELINE_MEDIA_COLLECTION, type RouteLineMediaAsset } from './media';
import {
  ExternalLink,
  Shield,
  Maximize2,
  X,
  FileCheck,
  Ship,
  Plane,
  Truck
} from 'lucide-react';

export function RouteLineVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [activeAsset, setActiveAsset] = useState<RouteLineMediaAsset | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAssets = ROUTELINE_MEDIA_COLLECTION.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'ocean') return item.id.includes('terminal') || item.id.includes('vessel') || item.id.includes('cranes');
    if (filter === 'air') return item.id.includes('air');
    if (filter === 'land') return item.id.includes('highway') || item.id.includes('intermodal');
    return true;
  });

  return (
    <section
      data-sector-specific="freight-visual-atelier"
      className="bg-[#F5F3ED] py-16 sm:py-24 border-b border-[#B9C3C8]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#B9C3C8]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-[.2em] text-[#31566C]">
              {ar ? '٠٨ / الأرشيف البصري لمحطات وأساطيل الشحن' : '08 / FREIGHT & INTERMODAL ARCHIVE'}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#102A3A] leading-tight">
              {ar ? 'بنية تحتية لوجستية تربط الأسواق العالمية' : 'Global transport arteries & cargo hubs'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#31566C]">
              {ar
                ? 'توثيق بصري مستقل يجسد حركة سلاسل الإمداد العالمية: موانئ الحاويات، سفن الخطوط الملاحية، طائرات الشحن الجوي، وأساطيل النقل البري متعدد الوسائط.'
                : 'Independent licensed photographic archive capturing international intermodal arteries: deep-water container ports, ocean liners, cargo freighters, and regional freight corridors.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', ar: 'الكل (٦)', en: 'All (6)' },
              { id: 'ocean', ar: 'بحري وموانئ', en: 'Ocean & Ports' },
              { id: 'air', ar: 'شحن جوي', en: 'Air Cargo' },
              { id: 'land', ar: 'بري ومتعدد الوسائط', en: 'Road & Intermodal' }
            ].map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all ${
                    active
                      ? 'bg-[#102A3A] text-[#F3B43F] shadow-sm'
                      : 'bg-white text-[#102A3A] border border-[#B9C3C8] hover:border-[#31566C]'
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
              className="group bg-white border border-[#B9C3C8] border-t-4 border-t-[#31566C] overflow-hidden hover:border-[#102A3A] transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#DDE6E9] overflow-hidden">
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
                  className="absolute inset-0 bg-[#102A3A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-xs"
                >
                  <Maximize2 size={18} className="text-[#F3B43F]" />
                  <span>{ar ? 'سجل المصدر والترخيص' : 'View Provenance'}</span>
                </button>
                <div className="absolute top-3 end-3 bg-[#102A3A]/90 text-[#F3B43F] text-[11px] font-mono px-2.5 py-1 backdrop-blur-sm">
                  {asset.license}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-base text-[#102A3A] leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#4A6472] leading-relaxed line-clamp-2">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#DDE6E9] flex items-center justify-between text-[11px] text-[#31566C]">
                  <span className="font-mono">{asset.dimensions}</span>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(asset)}
                    className="inline-flex items-center gap-1 font-mono font-bold hover:underline text-[#102A3A]"
                  >
                    <span>SHA-256</span>
                    <FileCheck size={13} className="text-[#31566C]" />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveAsset(null)}
        >
          <div
            className="bg-white border-2 border-[#102A3A] max-w-xl w-full p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveAsset(null)}
              aria-label={ar ? 'إغلاق' : 'Close'}
              className="absolute top-5 end-5 text-[#4A6472] hover:text-[#102A3A] p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#31566C] uppercase">
              <Shield size={16} className="text-[#102A3A]" />
              <span>{ar ? 'توثيق الترخيص الرقمي المستقل' : 'Verified Editorial Provenance'}</span>
            </div>

            <h3 className="mt-2 font-serif text-2xl font-bold text-[#102A3A]">
              {activeAsset.caption[locale]}
            </h3>

            <div className="mt-6 space-y-3 text-xs bg-[#DDE6E9] border border-[#B9C3C8] p-4 font-mono text-[#102A3A]">
              <div>
                <span className="text-[#31566C] block font-sans font-bold">SHA-256 Digest:</span>
                <span className="break-all text-[11px]">{activeAsset.sha256}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#B9C3C8]">
                <div>
                  <span className="text-[#31566C] block font-sans font-bold">Local Path:</span>
                  <span className="text-[11px]">{activeAsset.local}</span>
                </div>
                <div>
                  <span className="text-[#31566C] block font-sans font-bold">Dimensions & Size:</span>
                  <span className="text-[11px]">{activeAsset.dimensions} ({Math.round(activeAsset.bytes / 1024)} KB)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#B9C3C8]">
                <span className="text-[#31566C] block font-sans font-bold">Attribution / Credit:</span>
                <span className="text-[11px]">{activeAsset.author}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#B9C3C8]">
              <span className="text-xs text-[#31566C]">
                {ar ? 'الترخيص المعتمد:' : 'License:'}{' '}
                <a
                  href={activeAsset.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#102A3A]"
                >
                  {activeAsset.license}
                </a>
              </span>
              <a
                href={activeAsset.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#102A3A] hover:text-[#31566C] underline"
              >
                <span>{ar ? 'صفحة المصدر الأصلية' : 'Wikimedia Source Page'}</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <p className="mt-4 text-[11px] text-[#4A6472] leading-relaxed bg-[#F5F3ED] p-3 border border-[#B9C3C8]">
              {ar
                ? 'إخلاء مسؤولية: صورة تحريرية مرخصة لأغراض استعراض تجربة التصميم. لا تمثل منشأة تابعة لروت لاين أو شحنات حقيقية.'
                : 'Disclaimer: Independent editorial image licensed under Creative Commons or Public Domain for portfolio demonstration. Represents no proprietary RouteLine facility or live customer consignment.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
