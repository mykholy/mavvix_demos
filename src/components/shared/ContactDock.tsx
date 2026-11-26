'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageCircle,
  Phone,
  X,
  Sparkles,
  Layers,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  ChevronUp,
  Building2,
  Factory,
  Home,
  HeartPulse,
  Activity,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  GraduationCap,
  Wrench,
  Droplets,
  Trophy,
  ChartNoAxesCombined,
  Compass,
  Truck,
} from 'lucide-react';
import { MAVVIX_CONTACT, SECTOR_LABELS, type PortfolioSectorName } from '@/lib/business/mavvix-contact';

const DEMOS_LIST = [
  { slug: 'construction', nameAr: 'أطلس للمقاولات', nameEn: 'Atlas Contracting', icon: Building2, color: '#D26A3B' },
  { slug: 'industrial', nameAr: 'فيرولاين للصناعات', nameEn: 'Ferroline Industrial', icon: Factory, color: '#DE9E37' },
  { slug: 'real-estate', nameAr: 'ميريديان العقارية', nameEn: 'Meridian Residences', icon: Home, color: '#A8764F' },
  { slug: 'dental', nameAr: 'لومِن للأسنان', nameEn: 'Lumen Dental Clinic', icon: HeartPulse, color: '#2A8E7D' },
  { slug: 'ecommerce', nameAr: 'نوريا أتيليه', nameEn: 'Noria Atelier', icon: ShoppingBag, color: '#9E472A' },
  { slug: 'portfolio', nameAr: 'سلمى حسن ستوديو', nameEn: 'Salma Hassan Studio', icon: Palette, color: '#3B82F6' },
  { slug: 'restaurant', nameAr: 'سفرة زعفران', nameEn: 'Saffron Table', icon: UtensilsCrossed, color: '#C65D23' },
  { slug: 'academy', nameAr: 'نوفا للتعلم', nameEn: 'Nova Learning', icon: GraduationCap, color: '#4F46E5' },
  { slug: 'auto-service', nameAr: 'تورك جراج / صيانة سيارات', nameEn: 'Torque Garage · Auto service', icon: Wrench, color: '#FB6935' },
  { slug: 'home-maintenance', nameAr: 'فكسورا كير / صيانة منزلية', nameEn: 'Fixora · Home maintenance', icon: Home, color: '#F7B347' },
  { slug: 'salon-spa', nameAr: 'فيلورا بيوتي / صالون وسبا', nameEn: 'Velora Beauty · Salon & Spa', icon: HeartPulse, color: '#9B6070' },
  { slug: 'fitness', nameAr: 'بالس ديستريكت / جيم ولياقة', nameEn: 'Pulse District · Fitness Club', icon: Wrench, color: '#8E6BFF' },
  { slug: 'sports-venues', nameAr: 'أرينا كورتس / ملاعب', nameEn: 'Arena Courts · Sports Venues', icon: Trophy, color: '#F0B044' },
  { slug: 'furniture', nameAr: 'أوكلين ليفينج / أثاث', nameEn: 'Oakline Living · Furniture', icon: Home, color: '#BA9062' },
  { slug: 'interiors-kitchens', nameAr: 'فورما / مطابخ وتصميم داخلي', nameEn: 'Forma Atelier · Kitchen & Interiors', icon: Palette, color: '#B9866B' },
  { slug: 'nursery', nameAr: 'بلوم ستيبس / حضانات', nameEn: 'BloomSteps · Nursery & Preschool', icon: GraduationCap, color: '#F5C04E' },
  { slug: 'car-detailing', nameAr: 'جلوس باي / ديتيلنج السيارات', nameEn: 'GlossBay · Car detailing', icon: Droplets, color: '#4CCBF4' },
  { slug: 'physiotherapy', nameAr: 'موشن لاب / علاج طبيعي', nameEn: 'Motion Lab · Physiotherapy', icon: Activity, color: '#79C9C1' },
  { slug: 'veterinary', nameAr: 'بوويل / عيادات بيطرية', nameEn: 'PawWell · Veterinary', icon: HeartPulse, color: '#F3B98E' },
  { slug: 'law-firm', nameAr: 'ليكسورا / محاماة واستشارات', nameEn: 'Lexora Counsel · Law Firm', icon: Building2, color: '#B79B6A' },
  { slug: 'skin-clinic', nameAr: 'إيليرا / الجلدية والتجميل', nameEn: 'Elyra Skin · Dermatology & Aesthetics', icon: Sparkles, color: '#86566B' },
  { slug: 'logistics', nameAr: 'روت لاين / الشحن واللوجستيات', nameEn: 'RouteLine Cargo · Freight & Logistics', icon: Truck, color: '#31566C' },
  { slug: 'events', nameAr: 'لوما / تنظيم الفعاليات', nameEn: 'Luma Events · Event Planning', icon: Sparkles, color: '#874F63' },
  { slug: 'travel-agency', nameAr: 'نوماد روتس / سياحة وسفر', nameEn: 'Nomad Routes · Travel Planning', icon: Compass, color: '#A4492D' },
  { slug: 'accounting', nameAr: 'ليدجر بوينت / خدمات محاسبية', nameEn: 'LedgerPoint · Accounting Services', icon: ChartNoAxesCombined, color: '#50C2C3' },
];

export function ContactDock({
  sector,
  locale = 'ar',
}: {
  sector: PortfolioSectorName;
  locale: 'ar' | 'en';
}) {
  const [expanded, setExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const ar = locale === 'ar';

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectorLabel = SECTOR_LABELS[sector]
    ? (ar ? SECTOR_LABELS[sector].ar : SECTOR_LABELS[sector].en)
    : (ar ? 'منصة رقمية لشركتي' : 'a platform for my business');
  const message = ar
    ? `أهلًا مافكس، شفت الديمو التجاري لـ (${sectorLabel}) وعايز أطلب موقع متكامل بنفس الجودة والمواصفات لنشاطي التجاري.`
    : `Hello Mavvix, I explored the commercial demo for (${sectorLabel}) and want to order a production-grade website for my company.`;
  const wa = `https://wa.me/${MAVVIX_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const contactLink = ar ? MAVVIX_CONTACT.contactAr : MAVVIX_CONTACT.contactEn;

  function track(event: 'whatsapp_click' | 'phone_click' | 'contact_click') {
    // Never forward health-sector browsing or callback context to ad/analytics hooks.
    if (sector === 'skin-clinic' || sector === 'diagnostics-lab') return;
    try {
      const w = window as Window & {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
        fbq?: (...args: unknown[]) => void;
      };
      w.dataLayer?.push({ event, sector, placement: 'floating_hub', owner: 'Mavvix' });
      w.gtag?.('event', event, { event_category: 'lead', sector, placement: 'floating_hub' });
      if (event === 'whatsapp_click' || event === 'phone_click') {
        w.fbq?.('track', 'Contact', { content_name: sector, contact_method: event });
      }
    } catch {}
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const targetLocale = ar ? 'en' : 'ar';
  const switchedPath = pathname ? pathname.replace(`/${locale}`, `/${targetLocale}`) : `/${targetLocale}`;

  return (
    <aside
      data-mavvix-contact-dock
      aria-label={ar ? 'أدوات مافكس والتواصل التجاري' : 'Mavvix Commercial Hub & Navigation'}
      className="fixed z-[85] bottom-4 end-4 sm:bottom-6 sm:end-6 font-arabic no-print"
    >
      {/* Expanded Modal / Floating Drawer */}
      {expanded && (
        <div
          id={`mavvix-dock-options-${sector}`}
          role="dialog"
          aria-modal="true"
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md rounded-3xl bg-slate-900/95 backdrop-blur-2xl text-white shadow-2xl ring-1 ring-white/10 p-5 space-y-5 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-mavvix-blue flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{ar ? 'مركز تحكم مافكس التجاري' : 'Mavvix Commercial Hub'}</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-1.5 py-0.5 rounded font-semibold border border-cyan-500/30">
                    V2
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {ar ? 'تنقل بين القطاعات أو اطلب موقعك الآن' : 'Switch demo or order your site today'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label={ar ? 'إغلاق القائمة' : 'Close menu'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Commercial CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{ar ? 'واتساب مباشر' : 'WhatsApp'}</span>
            </a>

            <a
              href={`tel:${MAVVIX_CONTACT.phoneE164}`}
              onClick={() => track('phone_click')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
              <span className="font-mono text-[11px]">{MAVVIX_CONTACT.phoneDisplay}</span>
            </a>
          </div>

          {/* Quick Demo Switcher Grid (All 8 Demos) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>{ar ? 'الانتقال السريع بين المواقع المنفذة:' : 'Browse completed industry sites:'}</span>
              <span className="text-cyan-400 font-mono text-[10px]">LIVE EXAMPLES</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {DEMOS_LIST.map((d) => {
                const Icon = d.icon;
                const isCurrent = d.slug === sector;
                return (
                  <Link
                    key={d.slug}
                    href={`/${locale}/preview/${d.slug}`}
                    onClick={() => setExpanded(false)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${
                      isCurrent
                        ? 'bg-blue-600/20 border border-blue-500/50 text-white font-bold'
                        : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: d.color }}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="truncate text-[11px]">
                      {ar ? d.nameAr : d.nameEn}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation & Admin Studio Quick Links */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <Link
              href={`/${locale}/showcase`}
              onClick={() => setExpanded(false)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-center font-medium"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{ar ? 'معرض المنصات' : 'Showcase'}</span>
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setExpanded(false)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-center font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{ar ? 'لوحة الإدارة' : 'Admin Studio'}</span>
            </Link>
          </div>

          {/* Footer Bar in Menu: Language Switch & Scroll To Top */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <Link
              href={switchedPath}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{ar ? 'English Version' : 'النسخة العربية'}</span>
            </Link>

            {showScrollTop && (
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              >
                <span>{ar ? 'للأعلى' : 'Top'}</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button / Hub Pill */}
      <div className="flex items-center gap-2">
        {/* Persistent one-tap conversion controls; not hidden behind the expanded hub. */}
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')}
           className="sm:hidden flex items-center justify-center gap-2 min-h-12 rounded-full bg-[#16864F] text-white px-4 py-3 text-xs font-bold shadow-xl"
           aria-label={ar ? 'واتساب مافكس لتنفيذ موقع مشابه' : 'WhatsApp Mavvix to commission a website'}>
          <MessageCircle size={19} aria-hidden="true" />
          <span>{ar ? 'عايز موقع زي ده' : 'Build my site'}</span>
        </a>
        <a href={`tel:${MAVVIX_CONTACT.phoneE164}`} onClick={() => track('phone_click')}
           className="sm:hidden grid place-items-center min-w-12 min-h-12 rounded-full bg-slate-900 text-white shadow-xl"
           aria-label={ar ? 'اتصال مباشر بمافكس' : 'Call Mavvix directly'}>
          <Phone size={19} aria-hidden="true" />
        </a>
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={ar ? 'الصعود للأعلى' : 'Scroll to top'}
            className="hidden sm:flex w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white shadow-xl backdrop-blur-md border border-slate-700 flex items-center justify-center transition-all active:scale-95 hover:scale-105"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Primary Premium Floating Pill */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? (ar ? 'إغلاق خيارات التواصل' : 'Close contact options') : (ar ? 'المزيد من خيارات التواصل' : 'More contact options')}
          aria-controls={`mavvix-dock-options-${sector}`}
          onClick={() => setExpanded((v) => !v)}
          className={`relative group flex items-center gap-2.5 min-h-12 min-w-12 px-3 sm:px-4 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-2xl transition-all duration-300 active:scale-95 ${
            expanded
              ? 'bg-slate-900 ring-2 ring-slate-700'
              : 'bg-gradient-to-r from-mavvix-blue via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 ring-2 ring-blue-400/30 shadow-blue-500/25'
          }`}
        >
          {!expanded && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-30 blur-sm group-hover:opacity-60 transition duration-500 -z-10 animate-pulse-subtle" />
          )}

          {expanded ? (
            <X className="w-4 h-4 text-slate-300" />
          ) : (
            <div className="relative">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          )}

          <span className="hidden sm:inline font-arabic font-extrabold tracking-wide">
            {expanded
              ? (ar ? 'إغلاق القائمة' : 'Close Menu')
              : (ar ? 'عايز موقع لشركتك؟' : 'Need a site like this?')}
          </span>

          <span className="hidden sm:inline-flex items-center text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded-full font-bold">
            18 EXPERIENCES
          </span>
        </button>
      </div>
    </aside>
  );
}

export default ContactDock;
