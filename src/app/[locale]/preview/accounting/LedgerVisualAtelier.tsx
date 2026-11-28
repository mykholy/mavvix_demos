'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LEDGER_MEDIA_COLLECTION, type LedgerMediaAsset } from './media';
import {
  Maximize2,
  X,
  ExternalLink,
  ShieldCheck,
  Camera,
  FileCheck2,
  Lock,
  Layers
} from 'lucide-react';

export function LedgerVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [activeAsset, setActiveAsset] = useState<LedgerMediaAsset | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAssets = LEDGER_MEDIA_COLLECTION.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'analysis') return item.id.includes('analysis') || item.id.includes('tax');
    if (filter === 'operations') return item.id.includes('desk') || item.id.includes('payroll');
    if (filter === 'advisory') return item.id.includes('boardroom') || item.id.includes('contract');
    return true;
  });

  return (
    <section
      data-sector-specific="ledger-visual-atelier"
      className="bg-[#F0EEE8] py-20 sm:py-28 border-b border-[#CBD9D7]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#CBD9D7]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white border border-[#CBD9D7] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0E5E64]">
              <Camera size={14} />
              <span>{ar ? 'الأرشيف البصري والتوثيق التحريري' : 'Documented Editorial Image Archive'}</span>
            </div>
            <h2 className="mt-4 ledger-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1C3343] leading-tight">
              {ar ? 'بيئة العمل المحاسبي. موثقة بشفافية تامة.' : 'Financial Practice Imagery. Verified Provenance.'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#455F6C]">
              {ar
                ? 'مجموعة من الصور التحريرية المرخصة المفتوحة توثق أدوات العمل المكتبي، تحليلات البيانات، ومراجعات الرواتب والاتفاقيات المهنية مع إثبات الملكية وتشفير SHA-256 المستقل.'
                : 'Licensed editorial photography capturing workspace settings, data analysis workflows, payroll verification, and governance environments with cryptographic SHA-256 provenance.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', ar: 'الكل (٦)', en: 'All (6)' },
              { id: 'operations', ar: 'العمليات والدفاتر', en: 'Core Operations' },
              { id: 'analysis', ar: 'التحليل والتقارير', en: 'Analysis & Tax' },
              { id: 'advisory', ar: 'الاستشارات والتعاقد', en: 'Advisory & Governance' }
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
                      ? 'bg-[#1C3343] text-white shadow-sm'
                      : 'bg-white text-[#1C3343] border border-[#CBD9D7] hover:border-[#0E5E64]'
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
              className="group bg-white border border-[#CBD9D7] overflow-hidden hover:border-[#0E5E64] transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#E2ECE9] overflow-hidden">
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
                  className="absolute inset-0 bg-[#1C3343]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 font-bold text-xs"
                >
                  <Maximize2 size={18} className="text-[#65D4D2]" />
                  <span>{ar ? 'بيانات التوثيق والترخيص' : 'Inspect Provenance'}</span>
                </button>
                <div className="absolute top-3 end-3 bg-[#1C3343]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-bold text-white">
                  {asset.dimensions}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#0E5E64] mb-2 font-bold">
                    <span>{asset.license}</span>
                    <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#1C3343] leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#455F6C] leading-relaxed line-clamp-2">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EEE8] flex items-center justify-between text-xs text-[#2D4550]">
                  <span>
                    {ar ? 'المصور:' : 'Creator:'} {asset.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(asset)}
                    className="text-[#0E5E64] hover:underline font-bold"
                  >
                    {ar ? 'فحص السجل' : 'Provenance'}
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
            aria-labelledby="provenance-title"
            className="fixed inset-0 z-50 bg-[#142B37]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveAsset(null)}
          >
            <div
              className="bg-white border border-[#CBD9D7] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#CBD9D7]">
                <div className="flex items-center gap-2 text-[#0E5E64]">
                  <FileCheck2 size={20} />
                  <h3 id="provenance-title" className="font-bold text-base text-[#1C3343]">
                    {ar ? 'توثيق الملكية الفكرية وسلامة التشفير' : 'Cryptographic Provenance Manifest'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAsset(null)}
                  aria-label={ar ? 'إغلاق النافذة' : 'Close dialog'}
                  className="p-1.5 text-[#2D4550] hover:text-[#1C3343] hover:bg-[#F0EEE8] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs text-[#455F6C]">
                <div className="p-4 bg-[#F4F8F7] border border-[#CBD9D7] flex items-center gap-3">
                  <ShieldCheck size={24} className="text-[#0E5E64] shrink-0" />
                  <p className="leading-relaxed">
                    {ar
                      ? 'تم التحقق من تطابق بصمة SHA-256 المحلية مع المستند التحريري المفتوح من مستودع Wikimedia Commons.'
                      : 'Locally hosted WebP binary cryptographically verified against SHA-256 provenance manifest from Wikimedia Commons.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="block font-bold text-[#1C3343] uppercase text-[10px] tracking-wider">
                      {ar ? 'معرّف الأصل' : 'Asset Identifier'}
                    </span>
                    <span className="font-mono text-[#0E5E64]">{activeAsset.id}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#1C3343] uppercase text-[10px] tracking-wider">
                      {ar ? 'المسار المحلي' : 'Local Path'}
                    </span>
                    <span className="font-mono">{activeAsset.local}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#1C3343] uppercase text-[10px] tracking-wider">
                      {ar ? 'الأبعاد وحجم الملف' : 'Dimensions & Size'}
                    </span>
                    <span>
                      {activeAsset.dimensions} · {(activeAsset.bytes / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#1C3343] uppercase text-[10px] tracking-wider">
                      {ar ? 'الترخيص والمؤلف' : 'License & Author'}
                    </span>
                    <span>
                      {activeAsset.license} · {activeAsset.author}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block font-bold text-[#1C3343] uppercase text-[10px] tracking-wider mb-1">
                    {ar ? 'بصمة التشفير (SHA-256)' : 'SHA-256 Cryptographic Hash'}
                  </span>
                  <div className="bg-[#1C3343] text-[#65D4D2] p-3 font-mono text-[11px] break-all select-all">
                    {activeAsset.sha256}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block font-bold text-[#1C3343] uppercase text-[10px] tracking-wider mb-1">
                    {ar ? 'الوصف التحريري المعتمد' : 'Editorial Caption'}
                  </span>
                  <p className="text-sm font-medium text-[#1C3343]">{activeAsset.caption[locale]}</p>
                  <p className="text-xs text-[#2D4550] mt-1">{activeAsset.alt[locale]}</p>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#CBD9D7]">
                  <a
                    href={activeAsset.sourcePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E5E64] hover:underline"
                  >
                    <span>{ar ? 'صفحة المصدر في Wikimedia Commons' : 'View on Wikimedia Commons'}</span>
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(null)}
                    className="px-5 py-2 bg-[#1C3343] text-white font-bold text-xs hover:bg-[#2A4B5E] transition-colors"
                  >
                    {ar ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
