'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Camera, ExternalLink, X, ShieldCheck, Eye, Terminal } from 'lucide-react';
import { novaLearningPhotos, NovaLearningPhoto } from './media';

interface NovaVisualAtelierProps {
  locale: Locale;
}

export function NovaVisualAtelier({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<NovaLearningPhoto | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', labelEn: 'All Disciplines', labelAr: 'كافة المعامل' },
    { id: 'software_engineering', labelEn: 'Software Engineering', labelAr: 'هندسة البرمجيات' },
    { id: 'data_infrastructure', labelEn: 'Data Clusters', labelAr: 'عناقيد البيانات' },
    { id: 'design_systems', labelEn: 'Design Systems', labelAr: 'أنظمة التصميم' },
    { id: 'hardware_robotics', labelEn: 'Robotics Labs', labelAr: 'مختبرات الروبوتات' },
    { id: 'lecture_theater', labelEn: 'Amphitheaters', labelAr: 'المدرجات التعليمية' },
    { id: 'campus_architecture', labelEn: 'Campus Center', labelAr: 'المركز الأكاديمي' }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? novaLearningPhotos
    : novaLearningPhotos.filter(p => p.category === selectedCategory);

  return (
    <section className="bg-white rounded-[2rem] border border-[#192A48]/15 p-6 sm:p-10 lg:p-12 space-y-8" aria-labelledby="visual-atelier-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#192A48]/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B74132] font-bold">
            <Camera className="w-4 h-4 text-[#B74132]" />
            <span>{isAr ? 'الأرشيف البصري ومراجع التوجيه الفني' : 'Technical Facilities & Reference Archive'}</span>
          </div>
          <h2 id="visual-atelier-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#192A48]">
            {isAr ? 'شواهد فوتوغرافية توثق بيئات الحوسبة المتقدمة' : 'Verified Engineering Environments & Provenance'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl font-sans leading-relaxed">
            {isAr
              ? 'مجموعة مختارة من الصور الفوتوغرافية المرخصة توثق قاعات التطوير البرمجي التشاركي، مراكز البيانات وعناقيد GPU فائقة الأداء، استوديوهات التصميم، ومختبرات الروبوتات مع إثبات النزاهة الرقمية بموجب بصمة SHA-256.'
              : 'Curated licensed photography documenting collaborative coding labs, enterprise GPU clusters, design thinking workshops, robotics offices, and modern computer science campuses with verified open-license provenance.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(c => {
            const active = c.id === selectedCategory;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#192A48] text-white shadow-sm'
                    : 'bg-[#F5F7FF] text-slate-700 hover:text-[#192A48] border border-[#192A48]/15'
                }`}
                aria-label={isAr ? c.labelAr : c.labelEn}
              >
                {isAr ? c.labelAr : c.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 6 Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <article
            key={photo.id}
            className="group rounded-2xl border border-[#192A48]/15 bg-[#F5F7FF] overflow-hidden hover:border-[#192A48] hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/11] bg-[#E9EDFA] overflow-hidden">
              <Image
                src={photo.url}
                alt={isAr ? photo.titleAr : photo.titleEn}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                <span className="px-2.5 py-1 rounded-md bg-[#121D33]/85 text-[#D9D5A2] font-mono text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm">
                  {photo.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPhoto(photo)}
                className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 p-2 rounded-lg bg-[#121D33]/80 hover:bg-[#121D33] text-white backdrop-blur-sm transition-all opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-[11px] font-mono"
                aria-label={isAr ? `فحص تفاصيل ومصدر ${photo.titleAr}` : `Inspect provenance for ${photo.titleEn}`}
              >
                <Eye className="w-3.5 h-3.5 text-[#D9D5A2]" />
                <span className="hidden sm:inline">{isAr ? 'فحص المصدر' : 'Inspect'}</span>
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="font-serif text-base font-bold text-[#192A48] leading-snug group-hover:text-[#B74132] transition-colors">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h3>
                <p className="font-mono text-[11px] text-slate-700 font-semibold">
                  {photo.author} · {photo.license}
                </p>
              </div>

              <div className="pt-3 border-t border-[#192A48]/10 flex items-center justify-between font-mono text-[11px] text-slate-700 font-medium">
                <span>{photo.width} × {photo.height} px</span>
                <span className="text-[#192A48] font-bold">{(photo.bytes / 1024).toFixed(0)} KB</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Provenance Transparency Footer Note */}
      <div className="p-4 rounded-xl bg-[#F5F7FF] border border-[#192A48]/15 text-[11px] font-mono text-slate-700 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#B74132] shrink-0 mt-0.5" />
        <p className="leading-relaxed font-sans">
          {isAr
            ? 'تنبيه الشفافية: كافة الصور الفوتوغرافية المستخدمة أعلاه مرخصة بموجب المشاع الإبداعي (Creative Commons / Public Domain) مع توثيق المصور والمصدر ورقم بصمة SHA-256 لضمان أصالة المحتوى، وهي مراجع بصرية لاتجاه التصميم وليست توثيقاً لمرافق تجارية خاصة بأكاديمية نوفا.'
            : 'Editorial Provenance Disclosure: All photographs are hosted locally under verified Creative Commons and Public Domain licenses with exact SHA-256 checksums. They serve as authentic technical campus art direction references, not proprietary commercial facilities.'}
        </p>
      </div>

      {/* Modal Inspector */}
      {activeModalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? activeModalPhoto.titleAr : activeModalPhoto.titleEn}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="bg-[#121D33] text-white border border-white/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#D9D5A2] uppercase tracking-widest block font-bold">
                  {isAr ? 'شهادة توثيق الأصل والترخيص' : 'Media Provenance Dossier'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {isAr ? activeModalPhoto.titleAr : activeModalPhoto.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalPhoto(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={isAr ? 'إغلاق نافذة المصدر' : 'Close provenance modal'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Preview */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <Image
                src={activeModalPhoto.url}
                alt={isAr ? activeModalPhoto.titleAr : activeModalPhoto.titleEn}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Technical Metadata Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs bg-white/5 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-slate-300 block mb-1">{isAr ? 'المصور / الجهة الحافظة:' : 'Photographer / Author:'}</span>
                <span className="text-white font-bold">{activeModalPhoto.author}</span>
              </div>
              <div>
                <span className="text-slate-300 block mb-1">{isAr ? 'رخصة المشاع الإبداعي:' : 'License:'}</span>
                <span className="text-[#D9D5A2] font-bold">{activeModalPhoto.license}</span>
              </div>
              <div>
                <span className="text-slate-300 block mb-1">{isAr ? 'الأبعاد وحجم الملف:' : 'Dimensions & Byte Size:'}</span>
                <span className="text-white">{activeModalPhoto.width} × {activeModalPhoto.height} px · {(activeModalPhoto.bytes / 1024).toFixed(0)} KB</span>
              </div>
              <div>
                <span className="text-slate-300 block mb-1">{isAr ? 'المسار المحلي المباشر:' : 'Local WebP Path:'}</span>
                <span className="text-white truncate block">{activeModalPhoto.url}</span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-white/10">
                <span className="text-slate-300 block mb-1">{isAr ? 'بصمة النزاهة الرقمية (SHA-256):' : 'Cryptographic Hash (SHA-256):'}</span>
                <code className="text-[10px] text-white/80 bg-black/50 p-2 rounded block break-all font-mono">
                  {activeModalPhoto.sha256}
                </code>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <a
                href={activeModalPhoto.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D9D5A2] font-mono text-xs font-semibold transition-colors"
              >
                <span>{isAr ? 'فتح صفحة المصدر في ويكيميديا' : 'View Source on Wikimedia Commons'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setActiveModalPhoto(null)}
                className="px-5 py-2.5 rounded-xl bg-[#B74132] hover:bg-[#8F3327] text-white font-mono text-xs font-bold transition-colors"
              >
                {isAr ? 'تم' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
