'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { NOMAD_MEDIA_COLLECTION, type NomadMediaAsset } from './media';
import {
  Maximize2,
  X,
  ExternalLink,
  ShieldCheck,
  Compass,
  Camera,
  FileCheck
} from 'lucide-react';

export function NomadVisualAtelier({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [activeAsset, setActiveAsset] = useState<NomadMediaAsset | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredAssets = NOMAD_MEDIA_COLLECTION.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'egypt') return item.id.includes('luxor') || item.id.includes('giza') || item.id.includes('aswan') || item.id.includes('reef');
    if (filter === 'saudi') return item.id.includes('alula') || item.id.includes('jeddah');
    if (filter === 'heritage') return item.id.includes('pyramids') || item.id.includes('balloon') || item.id.includes('alula') || item.id.includes('jeddah');
    return true;
  });

  return (
    <section
      data-sector-specific="nomad-visual-atelier"
      className="bg-[#F4EBDD] py-16 sm:py-24 border-b border-[#DDD0BD]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#DDD0BD]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FFF9F0] border border-[#DDD0BD] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#944129]">
              <Camera size={14} />
              <span>{ar ? 'الأرشيف البصري الموثق للرحلات' : 'Documented Visual Journey Archive'}</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#18352E] leading-tight">
              {ar ? 'مشاهد تراثية وطبيعية من قلب المنطقة' : 'Landscapes, living heritage & coastal horizons'}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3D5249]">
              {ar
                ? 'مجموعة من الصور التحريرية المرخصة توثق شروق المناطيد فوق الأقصر، هضبة الأهرامات، إبحار الفلوكة في أسوان، شعاب البحر الأحمر، وعمارة الحِجر والبلد التاريخية مع إثبات الملكية والتشفير.'
                : 'Licensed editorial photography capturing Luxor balloon drifts, the Giza plateau, Nile feluccas in Aswan, Red Sea coral biodiversity, and Hegra sandstone monuments with cryptographic provenance verification.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', ar: 'الكل (٦)', en: 'All (6)' },
              { id: 'egypt', ar: 'مصر (الأقصر، الجيزة، أسوان، البحر الأحمر)', en: 'Egypt Routes' },
              { id: 'saudi', ar: 'السعودية (العلا، جدة التاريخية)', en: 'Saudi Arabia Routes' },
              { id: 'heritage', ar: 'التراث والآثار العالمية', en: 'UNESCO Antiquities' }
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
                      ? 'bg-[#18352E] text-[#FFF9F0] shadow-sm'
                      : 'bg-white text-[#18352E] border border-[#DDD0BD] hover:border-[#944129]'
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
              className="group bg-white border border-[#DDD0BD] overflow-hidden hover:border-[#944129] transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#EAD8C7] overflow-hidden">
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
                  className="absolute inset-0 bg-[#18352E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 font-bold text-xs"
                >
                  <Maximize2 size={18} className="text-[#E0AB6A]" />
                  <span>{ar ? 'بيانات التوثيق والترخيص' : 'Inspect Provenance'}</span>
                </button>
                <div className="absolute top-3 end-3 bg-[#18352E]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-bold text-[#FFF9F0]">
                  {asset.dimensions}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#944129] mb-2">
                    <span className="font-bold">{asset.license}</span>
                    <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#18352E] leading-snug">
                    {asset.caption[locale]}
                  </h3>
                  <p className="mt-2 text-xs text-[#3D5249] leading-relaxed line-clamp-2">
                    {asset.alt[locale]}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#F4EBDD] flex items-center justify-between text-xs text-[#3D5249]">
                  <span>{ar ? 'المصور:' : 'Creator:'} {asset.author}</span>
                  <button
                    type="button"
                    onClick={() => setActiveAsset(asset)}
                    className="text-[#944129] hover:underline font-bold"
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
            aria-labelledby="nomad-modal-title"
            className="fixed inset-0 z-50 bg-[#18352E]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <div className="bg-white border-2 border-[#18352E] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                aria-label={ar ? 'إغلاق نافذة التوثيق' : 'Close provenance modal'}
                className="absolute top-4 end-4 p-2 text-[#18352E] hover:bg-[#F4EBDD] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#944129] uppercase tracking-wider mb-2">
                <FileCheck size={16} />
                <span>{ar ? 'سجل التوثيق والترخيص المشفر' : 'Cryptographic Provenance Manifest'}</span>
              </div>

              <h3 id="nomad-modal-title" className="font-serif text-2xl font-medium text-[#18352E]">
                {activeAsset.caption[locale]}
              </h3>

              <div className="mt-6 aspect-video bg-[#F4EBDD] overflow-hidden border border-[#DDD0BD]">
                <img
                  src={activeAsset.local}
                  alt={activeAsset.alt[locale]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#FFF9F0] border border-[#DDD0BD]">
                  <p className="text-[10px] uppercase font-bold text-[#944129]">
                    {ar ? 'البصمة المشفرة للتحقق (SHA-256 Digest)' : 'Cryptographic Hash (SHA-256)'}
                  </p>
                  <p className="mt-1 break-all text-[#18352E] font-bold">{activeAsset.sha256}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#FFF9F0] border border-[#DDD0BD]">
                    <p className="text-[10px] uppercase font-bold text-[#944129]">{ar ? 'الأبعاد' : 'Dimensions'}</p>
                    <p className="mt-1 text-[#18352E] font-bold">{activeAsset.dimensions} px</p>
                  </div>
                  <div className="p-3 bg-[#FFF9F0] border border-[#DDD0BD]">
                    <p className="text-[10px] uppercase font-bold text-[#944129]">{ar ? 'حجم الملف' : 'File Size'}</p>
                    <p className="mt-1 text-[#18352E] font-bold">
                      {activeAsset.bytes.toLocaleString()} bytes ({(activeAsset.bytes / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#FFF9F0] border border-[#DDD0BD] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#3D5249]">{ar ? 'المصور / الجهة:' : 'Creator / Attribution:'}</span>
                    <span className="font-bold text-[#18352E]">{activeAsset.author}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#3D5249]">{ar ? 'نوع الترخيص:' : 'License:'}</span>
                    <a
                      href={activeAsset.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#944129] hover:underline inline-flex items-center gap-1"
                    >
                      {activeAsset.license}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#3D5249]">{ar ? 'المصدر الأصلي:' : 'Source Repository:'}</span>
                    <a
                      href={activeAsset.sourcePage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#944129] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Wikimedia Commons</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-[#F4EBDD] border border-[#DDD0BD] flex items-center gap-2 text-[#18352E]">
                  <ShieldCheck size={16} className="text-[#944129] shrink-0" />
                  <span className="text-[11px] leading-tight font-sans">
                    {ar
                      ? 'صورة تحريرية مرخصة مستضافة محلياً لأغراض العرض والتخطيط، لا تمثل رحلة أو نشاطاً محجوزاً.'
                      : 'Locally hosted licensed editorial media for illustrative journey planning; does not depict a booked tour.'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveAsset(null)}
                  className="bg-[#18352E] text-white px-6 py-2.5 text-xs font-bold hover:bg-[#944129] transition-colors"
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
