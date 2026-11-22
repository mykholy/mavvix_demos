'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Clock,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  Award,
  Zap,
  HelpCircle,
  Layers,
  Send
} from 'lucide-react';
import type { CMSPage, CMSSection } from '@/lib/db/cms';
import type { SiteRecord } from '@/lib/db/repositories';

interface Props {
  site: SiteRecord;
  page: CMSPage;
  sections: CMSSection[];
  locale: 'ar' | 'en';
}

const SECTOR_ACCENTS: Record<string, { primary: string; secondary: string; glow: string }> = {
  construction: { primary: '#D26A3B', secondary: '#162327', glow: 'rgba(210, 106, 59, 0.15)' },
  industrial: { primary: '#DE9E37', secondary: '#12243C', glow: 'rgba(222, 158, 55, 0.15)' },
  'real-estate': { primary: '#A8764F', secondary: '#25312D', glow: 'rgba(168, 118, 79, 0.15)' },
  dental: { primary: '#2A8E7D', secondary: '#182B2A', glow: 'rgba(42, 142, 125, 0.15)' },
  ecommerce: { primary: '#9E472A', secondary: '#1A1918', glow: 'rgba(158, 71, 42, 0.15)' },
  portfolio: { primary: '#3B82F6', secondary: '#0D0F12', glow: 'rgba(59, 130, 246, 0.15)' },
  restaurant: { primary: '#C65D23', secondary: '#221611', glow: 'rgba(198, 93, 35, 0.15)' },
  academy: { primary: '#4F46E5', secondary: '#0F172A', glow: 'rgba(79, 70, 229, 0.15)' },
};

export function CustomPageRenderer({ site, page, sections, locale }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const theme = SECTOR_ACCENTS[site.slug] || { primary: '#1667F5', secondary: '#08132D', glow: 'rgba(22, 103, 245, 0.15)' };

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const activeSections = sections.filter(s => s.active !== 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Breadcrumb & Return Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/preview/${site.slug}`}
              className="text-xs font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? site.name_ar : site.name_en}</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-400 font-medium">
              {isAr ? page.title_ar : page.title_en}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/${isAr ? 'en' : 'ar'}/preview/${site.slug}${page.route_key}`}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all border border-slate-700"
            >
              {isAr ? 'English' : 'عربي'}
            </Link>
            <Link
              href={`/${locale}/preview/${site.slug}`}
              className="text-xs px-3 py-1.5 rounded-lg text-white font-bold transition-all flex items-center gap-1"
              style={{ backgroundColor: theme.primary }}
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* RENDER SECTIONS */}
      <main className="space-y-16 sm:space-y-24 py-8 sm:py-12">
        {activeSections.map((sec, idx) => {
          const settings = sec.settings || {};
          const title = isAr ? settings.titleAr : settings.titleEn;
          const subtitle = isAr ? settings.subtitleAr : settings.subtitleEn;
          const badge = isAr ? settings.badgeAr : settings.badgeEn;
          const btnText = isAr ? settings.buttonTextAr : settings.buttonTextEn;
          const secBtnText = isAr ? settings.secondaryButtonTextAr : settings.secondaryButtonTextEn;

          // 1. HERO SECTION
          if (sec.section_type === 'hero') {
            return (
              <section key={sec.id || idx} className="relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div
                  className="rounded-3xl p-8 sm:p-14 lg:p-20 relative overflow-hidden border border-slate-800"
                  style={{
                    background: `linear-gradient(135deg, ${theme.secondary} 0%, #090E17 100%)`,
                    boxShadow: `0 20px 60px ${theme.glow}`
                  }}
                >
                  {settings.imageUrl && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
                      style={{ backgroundImage: `url(${settings.imageUrl})` }}
                    />
                  )}
                  <div className="relative z-10 max-w-3xl space-y-6">
                    {badge && (
                      <div
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border"
                        style={{
                          backgroundColor: `${theme.primary}20`,
                          borderColor: `${theme.primary}50`,
                          color: theme.primary
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{badge}</span>
                      </div>
                    )}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                        {subtitle}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      {btnText && (
                        <a
                          href={settings.buttonUrl || '#contact'}
                          className="px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-xl flex items-center gap-2 hover:opacity-95 transition-all"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <span>{btnText}</span>
                          <Arrow className="w-4 h-4" />
                        </a>
                      )}
                      {secBtnText && (
                        <a
                          href={settings.secondaryButtonUrl || '#'}
                          className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold text-sm border border-slate-700 transition-all"
                        >
                          {secBtnText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // 2. FEATURES GRID
          if (sec.section_type === 'features') {
            return (
              <section key={sec.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  {badge && (
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block"
                      style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: `${theme.primary}10` }}
                    >
                      {badge}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-4xl font-black text-white">{title}</h2>
                  {subtitle && <p className="text-sm sm:text-base text-slate-400">{subtitle}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(settings.items || []).map((it, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-slate-700 transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all"
                        style={{
                          backgroundColor: `${theme.primary}15`,
                          borderColor: `${theme.primary}30`,
                          color: theme.primary
                        }}
                      >
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {isAr ? it.titleAr : it.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {isAr ? it.descAr : it.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // 3. SPLIT SECTION
          if (sec.section_type === 'split') {
            return (
              <section key={sec.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8 sm:p-12">
                  <div className="space-y-6">
                    {badge && (
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block"
                        style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: `${theme.primary}10` }}
                      >
                        {badge}
                      </span>
                    )}
                    <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">{title}</h2>
                    {subtitle && <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{subtitle}</p>}

                    {settings.items && settings.items.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {settings.items.map((it, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span>{isAr ? it.titleAr : it.titleEn}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {btnText && (
                      <div className="pt-4">
                        <a
                          href={settings.buttonUrl || '#contact'}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <span>{btnText}</span>
                          <Arrow className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-video lg:aspect-square">
                    {settings.imageUrl ? (
                      <img
                        src={settings.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        <Layers className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 4. STATS SECTION
          if (sec.section_type === 'stats') {
            return (
              <section key={sec.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className="rounded-3xl p-8 sm:p-12 border border-slate-800"
                  style={{ background: `linear-gradient(180deg, #090E17 0%, ${theme.secondary}40 100%)` }}
                >
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-white">{title}</h2>
                    {subtitle && <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(settings.items || []).map((st, i) => (
                      <div key={i} className="text-center space-y-1">
                        <p
                          className="text-3xl sm:text-5xl font-black tracking-tight"
                          style={{ color: theme.primary }}
                        >
                          {st.value || '100%'}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-300">
                          {isAr ? st.titleAr : st.titleEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // 5. FAQ ACCORDION
          if (sec.section_type === 'faq') {
            return (
              <section key={sec.id || idx} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-3">
                  {badge && (
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block"
                      style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: `${theme.primary}10` }}
                    >
                      {badge}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-4xl font-black text-white">{title}</h2>
                  {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
                </div>

                <div className="space-y-3">
                  {(settings.items || []).map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full text-start p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors"
                        >
                          <span>{isAr ? faq.titleAr : faq.titleEn}</span>
                          <ChevronDown
                            className={`w-5 h-5 shrink-0 transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                            {isAr ? faq.descAr : faq.descEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          // 6. CALL TO ACTION (CTA)
          if (sec.section_type === 'cta') {
            return (
              <section key={sec.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden border border-slate-800"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}25 0%, #090E17 100%)`,
                    boxShadow: `0 10px 40px ${theme.glow}`
                  }}
                >
                  <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                    {badge && (
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 inline-block">
                        {badge}
                      </span>
                    )}
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{title}</h2>
                    {subtitle && <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                      {btnText && (
                        <a
                          href={settings.buttonUrl || 'https://wa.me/201017799042'}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-xl flex items-center gap-2 hover:opacity-90 transition-all"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <span>{btnText}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {secBtnText && (
                        <a
                          href={settings.secondaryButtonUrl || '#contact'}
                          className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
                        >
                          {secBtnText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // 7. CONTACT / INQUIRY FORM
          if (sec.section_type === 'contact') {
            return (
              <section key={sec.id || idx} id="contact" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{title}</h2>
                  {subtitle && <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                  {formSubmitted ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Received Successfully!'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isAr
                          ? 'سيقوم فريق العمل بالتواصل معك عبر الهاتف أو واتساب في أقرب وقت.'
                          : 'Our team will contact you via phone or WhatsApp shortly.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {isAr ? 'الاسم بالكامل' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                          placeholder={isAr ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            {isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                            placeholder="+20 101 234 5678"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                            placeholder="user@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {isAr ? 'تفاصيل الاستفسار أو متطلبات المشروع' : 'Inquiry / Project Scope'}
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                          placeholder={isAr ? 'أدخل تفاصيل طلبك والموعد المطلوب...' : 'Describe your timeline and requirements...'}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:opacity-90 transition-all"
                        style={{ backgroundColor: theme.primary }}
                      >
                        <Send className="w-4 h-4" />
                        <span>{isAr ? 'إرسال الاستفسار الآن' : 'Submit Inquiry'}</span>
                      </button>
                    </form>
                  )}
                </div>
              </section>
            );
          }

          return null;
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-10 mt-20 text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()} {isAr ? site.name_ar : site.name_en}. All rights reserved.</p>
        <p className="text-[11px] text-slate-600">Mavvix Demo Concept Platform • Fully Persisted in SQLite</p>
      </footer>
    </div>
  );
}
