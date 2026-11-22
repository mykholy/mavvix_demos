'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Inbox,
  Database,
  ShieldCheck,
  Building2,
  Factory,
  Home,
  HeartPulse,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Printer,
  MessageCircle,
  Mail,
  ExternalLink,
  Settings,
  Search,
  Globe,
  Sliders,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Copy,
  Check,
  X,
  Share2
} from 'lucide-react';
import type { SiteRecord } from '@/lib/db/repositories';

interface Props {
  site: SiteRecord;
  submissions: any[];
  sectorItems: any[];
  routes: string[];
  adminUser: { id: string; email: string; role: string };
}

const SECTOR_ICONS: Record<string, any> = {
  construction: Building2,
  industrial: Factory,
  'real-estate': Home,
  dental: HeartPulse,
  ecommerce: ShoppingBag,
  portfolio: Palette,
  restaurant: UtensilsCrossed,
  academy: GraduationCap,
};

const SECTOR_COLORS: Record<string, string> = {
  construction: '#D26A3B',
  industrial: '#DE9E37',
  'real-estate': '#A8764F',
  dental: '#2A8E7D',
  ecommerce: '#9E472A',
  portfolio: '#3B82F6',
  restaurant: '#C65D23',
  academy: '#4F46E5',
};

export function SiteDashboardClient({
  site,
  submissions: initialSubmissions,
  sectorItems,
  routes,
  adminUser,
}: Props) {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'submissions' | 'settings' | 'routes'>('overview');
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings state
  const rawTheme = typeof site.theme_json === 'string' ? JSON.parse(site.theme_json || '{}') : (site.theme_json || {});
  const [siteNameAr, setSiteNameAr] = useState(site.name_ar || '');
  const [siteNameEn, setSiteNameEn] = useState(site.name_en || '');
  const [metaTitleAr, setMetaTitleAr] = useState(rawTheme.metaTitleAr || `${site.name_ar} • المنصة الرقمية المعتمدة`);
  const [metaTitleEn, setMetaTitleEn] = useState(rawTheme.metaTitleEn || `${site.name_en} • Enterprise Platform`);
  const [metaDescAr, setMetaDescAr] = useState(rawTheme.metaDescAr || rawTheme.hero || 'تصفح أحدث المشروعات والعروض مع تفاصيل المواصفات الفنية والتنفيذية.');
  const [metaDescEn, setMetaDescEn] = useState(rawTheme.metaDescEn || 'Discover verified specifications, pricing models, and commercial deliverables.');
  const [contactPhone, setContactPhone] = useState(rawTheme.contactPhone || '+20 101 779 9042');
  const [contactWhatsapp, setContactWhatsapp] = useState(rawTheme.contactWhatsapp || '201017799042');
  const [contactEmail, setContactEmail] = useState(rawTheme.contactEmail || `info@${site.slug}.mavvix.demo`);

  const isAr = lang === 'ar';
  const Icon = SECTOR_ICONS[site.slug] || Layers;
  const brandColor = SECTOR_COLORS[site.slug] || '#1667F5';

  // Submissions calculation
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
  const reviewedSubmissions = submissions.filter(s => s.status === 'reviewed' || s.status === 'approved').length;
  const reviewedRate = totalSubmissions > 0 ? Math.round((reviewedSubmissions / totalSubmissions) * 100) : 100;

  // Approximate pipeline value (EGP)
  let estimatedValue = 0;
  submissions.forEach(s => {
    const p = s.payload || {};
    if (p.total_egp) estimatedValue += Number(p.total_egp);
    else if (p.estimated_budget_egp) estimatedValue += Number(p.estimated_budget_egp);
    else if (p.grand_total_cents) estimatedValue += Number(p.grand_total_cents) / 100;
    else estimatedValue += 3500; // Average simulated inquiry weight
  });

  // Filtered submissions
  const filteredSubmissions = statusFilter === 'all'
    ? submissions
    : submissions.filter(s => s.status === statusFilter);

  // Status updater
  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch('/api/admin/submissions/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setSubmissions(prev =>
          prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
        );
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub({ ...selectedSub, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Save Settings
  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameAr: siteNameAr,
          nameEn: siteNameEn,
          themeUpdates: {
            metaTitleAr,
            metaTitleEn,
            metaDescAr,
            metaDescEn,
            contactPhone,
            contactWhatsapp,
            contactEmail,
          },
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className={`space-y-6 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Header & Breadcrumbs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div
          className="absolute top-0 end-0 w-96 h-96 opacity-10 blur-3xl pointer-events-none rounded-full"
          style={{ backgroundColor: brandColor }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
              style={{ backgroundColor: brandColor }}
            >
              <Icon className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Link
                  href="/admin"
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>{isAr ? 'استوديو مافكس' : 'Mavvix Studio'}</span>
                  <span>/</span>
                </Link>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {site.slug}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {isAr ? 'متصل بـ SQLite' : 'SQLite Connected'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isAr ? siteNameAr : siteNameEn}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                {isAr
                  ? `لوحة التحكم الإدارية المستقلة لموقع ${siteNameAr} • إدارة الكتالوج والاستمارات والإعدادات.`
                  : `Dedicated operational control portal for ${siteNameEn} • Manage catalog, leads & SEO.`}
              </p>
            </div>
          </div>

          {/* Quick Actions & Lang Switcher */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setLang(l => (l === 'ar' ? 'en' : 'ar'))}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'English Interface' : 'الواجهة العربية'}</span>
            </button>

            <Link
              href={`/${lang}/preview/${site.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isAr ? 'معاينة الموقع لايف' : 'View Live Site'}</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{isAr ? 'نظرة عامة والتحليلات' : 'Overview & Analytics'}</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{isAr ? `إدارة الكتالوج والمحتوى (${sectorItems.length})` : `Sector Inventory (${sectorItems.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>{isAr ? `سجل الطلبات والاستفسارات (${submissions.length})` : `Submissions & Orders (${submissions.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{isAr ? 'إعدادات الموقع و SEO' : 'Settings & SEO'}</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'routes'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? `فهرس المسارات (${routes.length})` : `Site Routes (${routes.length})`}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{isAr ? 'إجمالي الطلبات والاستمارات' : 'Total Submissions'}</span>
                <Inbox className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-white">{totalSubmissions}</p>
              <p className="mt-1 text-[11px] text-cyan-400 font-medium">
                {isAr ? `${pendingSubmissions} بانتظار المراجعة` : `${pendingSubmissions} awaiting review`}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{isAr ? 'القيمة التقديرية للطلبات' : 'Pipeline Estimated Value'}</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-white">
                {estimatedValue.toLocaleString()} <span className="text-xs text-slate-400 font-normal">EGP</span>
              </p>
              <p className="mt-1 text-[11px] text-emerald-400 font-medium">
                {isAr ? 'محسوبة بناءً على عروض الأسعار المسجلة' : 'Calculated from simulated quotes'}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{isAr ? 'سجلات الكتالوج النشطة' : 'Active Catalog Records'}</span>
                <Database className="w-4 h-4 text-amber-400" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-white">{sectorItems.length}</p>
              <p className="mt-1 text-[11px] text-amber-400 font-medium">
                {isAr ? 'بيانات علائقية فعلية في SQLite' : 'Relational records in database'}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{isAr ? 'معدل المعالجة والمتابعة' : 'Resolution Rate'}</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-white">{reviewedRate}%</p>
              <p className="mt-1 text-[11px] text-indigo-400 font-medium">
                {isAr ? 'الطلبات المراجعة والمعتمدة' : 'Reviewed & Approved Leads'}
              </p>
            </div>
          </div>

          {/* Quick Overview Summary Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? 'حالة المنصة: جاهزة ومعتمدة' : 'Platform Status: Fully Verified'}</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {isAr ? 'إدارة سريعة ومتكاملة لكافة بيانات النشاط' : 'All Core Workflows Persisted to Local SQLite'}
              </h2>
              <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
                {isAr
                  ? 'تم تصميم لوحة التحكم لتمكين مديري المبيعات وفرق العمل من مراجعة استفسارات العملاء فور تقديمها، وتصدير أوامر العمل، والرد مباشرةً عبر واتساب بنقرة واحدة.'
                  : 'Engineered for operational clarity: review customer submissions as they land, export print-ready invoices, and trigger direct WhatsApp conversations with a single click.'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('submissions')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
              >
                {isAr ? 'فحص الطلبات الواردة ←' : 'Inspect Leads →'}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/20"
              >
                {isAr ? 'تعديل بيانات الـ SEO' : 'Edit SEO Settings'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECTOR CATALOG & INVENTORY */}
      {activeTab === 'catalog' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAr ? 'كتالوج ومحتوى المنصة الفعلي' : 'Sector Inventory & Catalog Items'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr
                  ? `عرض كافة العناصر المسجلة لنشاط (${siteNameAr}) في قاعدة بيانات SQLite.`
                  : `Showing all seeded domain items for ${siteNameEn} in SQLite.`}
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">
              {sectorItems.length} {isAr ? 'عنصر مسجل' : 'Items Total'}
            </div>
          </div>

          {sectorItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              {isAr ? 'لا توجد عناصر مسجلة في هذا القسم.' : 'No items found in this catalog.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectorItems.map((item, idx) => (
                <div
                  key={item.id || item.slug || idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {item.sku || item.code || item.slug || `ITEM-${idx + 1}`}
                      </span>
                      {item.category && (
                        <span className="text-[11px] font-semibold text-cyan-400 uppercase">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {item.title || item.name || item.name_ar}
                    </h3>

                    {item.summary && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    )}
                  </div>

                  {/* Attributes Bar */}
                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                    {(item.price_cents || item.example_price_cents) ? (
                      <span className="font-bold text-emerald-400">
                        {((item.price_cents || item.example_price_cents) / 100).toLocaleString()} EGP
                      </span>
                    ) : item.area_m2 ? (
                      <span className="font-mono text-slate-300">
                        {item.area_m2} m² • {item.city || item.unit_type || 'Unit'}
                      </span>
                    ) : item.duration_minutes ? (
                      <span className="font-mono text-indigo-400">
                        ~{Math.round(item.duration_minutes / 60)} hrs • {item.level || 'Course'}
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px]">Verified Spec</span>
                    )}

                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> {isAr ? 'منشور' : 'Live'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SUBMISSIONS & ORDERS DOSSIER (WITH PDF EXPORT & WHATSAPP) */}
      {activeTab === 'submissions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAr ? 'سجل الطلبات والاستشارات الواردة' : 'Submissions & Orders Queue'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr
                  ? 'انقر على أي طلب لعرض تفاصيله، طباعة إيصال PDF، أو التواصل الفوري مع العميل عبر واتساب.'
                  : 'Click any submission to view full breakdown, export PDF receipt, or trigger instant WhatsApp response.'}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  statusFilter === 'pending' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'قيد الانتظار' : 'Pending'}
              </button>
              <button
                onClick={() => setStatusFilter('reviewed')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  statusFilter === 'reviewed' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'تمت المراجعة' : 'Reviewed'}
              </button>
            </div>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
              <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white">
                {isAr ? 'لا توجد طلبات تطابق الفلتر المحدد' : 'No Submissions Match Active Filter'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? 'جرب تغيير حالة الفلتر أو تقديم طلب تجريبي من الموقع.' : 'Try selecting All status or simulate a new booking.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono">{isAr ? 'رقم المرجع' : 'Ref #'}</th>
                    <th className="py-3 px-4">{isAr ? 'نوع المعاملة' : 'Flow Type'}</th>
                    <th className="py-3 px-4">{isAr ? 'اسم العميل' : 'Customer'}</th>
                    <th className="py-3 px-4">{isAr ? 'التاريخ' : 'Date'}</th>
                    <th className="py-3 px-4">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-4 text-center">{isAr ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredSubmissions.map((s) => {
                    const p = s.payload || {};
                    const customerName = p.name || p.contactName || p.fullName || p.guestName || (isAr ? 'عميل تجريبي' : 'Demo Client');
                    const ref = p.refNumber || s.id.slice(0, 12);
                    const isPending = s.status === 'pending';

                    return (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                          {ref}
                        </td>
                        <td className="py-3.5 px-4 font-medium capitalize">
                          {s.flow_type.replace(/_/g, ' ')}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white">
                          {customerName}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              isPending
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedSub(s)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-semibold transition-all border border-slate-700"
                          >
                            <span>{isAr ? 'تفاصيل وإجراء' : 'View & Act'}</span>
                            <ArrowRight className="w-3 h-3 rotate-180 rtl:rotate-0" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SITE SETTINGS & SEO MANAGER */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">
              {isAr ? 'إعدادات المنصة وتهيئة محركات البحث (SEO)' : 'Site Identity, SEO & Commercial Contacts'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'قم بتعديل بيانات المنصة وعناوين الـ Meta وسطور التواصل، وسيتم حفظها مباشرة في قاعدة بيانات SQLite.'
                : 'Modify site titles, meta descriptions, and official sales channels. Persisted directly to SQLite.'}
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تم حفظ وتحديث الإعدادات بنجاح في قاعدة البيانات!' : 'Settings updated and persisted successfully to SQLite!'}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Site Name AR */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'اسم المنصة باللغة العربية' : 'Site Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={siteNameAr}
                  onChange={(e) => setSiteNameAr(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Site Name EN */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'اسم المنصة باللغة الإنجليزية' : 'Site Name (English)'}
                </label>
                <input
                  type="text"
                  value={siteNameEn}
                  onChange={(e) => setSiteNameEn(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Title AR */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'عنوان صفحة الويب (SEO Meta Title AR)' : 'SEO Meta Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={metaTitleAr}
                  onChange={(e) => setMetaTitleAr(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Meta Title EN */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'عنوان صفحة الويب (SEO Meta Title EN)' : 'SEO Meta Title (English)'}
                </label>
                <input
                  type="text"
                  value={metaTitleEn}
                  onChange={(e) => setMetaTitleEn(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Desc AR */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'وصف محركات البحث (Meta Description AR)' : 'Meta Description (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={metaDescAr}
                  onChange={(e) => setMetaDescAr(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Meta Desc EN */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'وصف محركات البحث (Meta Description EN)' : 'Meta Description (English)'}
                </label>
                <textarea
                  rows={3}
                  value={metaDescEn}
                  onChange={(e) => setMetaDescEn(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Contact Channels */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'رقم الهاتف المباشر' : 'Official Phone'}
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  dir="ltr"
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'رقم الواتساب التجاري' : 'WhatsApp Number (Digits)'}
                </label>
                <input
                  type="text"
                  value={contactWhatsapp}
                  onChange={(e) => setContactWhatsapp(e.target.value)}
                  dir="ltr"
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'البريد الإلكتروني التجاري' : 'Sales / Support Email'}
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  dir="ltr"
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Google Search Live Preview Card */}
            <div className="pt-4 border-t border-slate-800">
              <span className="block text-xs font-bold text-slate-400 mb-2">
                {isAr ? 'معاينة ظهور الموقع على بحث Google:' : 'Google SERP Snippet Preview:'}
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-sans max-w-xl" dir="ltr">
                <span className="text-xs text-slate-400 block truncate">
                  https://mavvix.demo/{lang}/preview/{site.slug}
                </span>
                <h4 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer mt-0.5 truncate">
                  {isAr ? metaTitleAr : metaTitleEn}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {isAr ? metaDescAr : metaDescEn}
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {savingSettings ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ التعديلات في SQLite' : 'Persist Settings')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: SITE ROUTES DIRECTORY */}
      {activeTab === 'routes' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">
              {isAr ? 'فهرس مسارات وصفحات المنصة' : 'Verified Route Patterns & Deep Screens'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? `كافة الـ ${routes.length} مسارات التفاعلية الخاصة بـ (${siteNameAr}) تم بناؤها واختبارها.`
                : `All ${routes.length} deep routes for ${siteNameEn} are rendered with verified static & dynamic patterns.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {routes.map((r, idx) => {
              const fullAr = `/ar/preview/${site.slug}${r}`;
              const fullEn = `/en/preview/${site.slug}${r}`;
              const label = r === '' ? (isAr ? 'الصفحة الرئيسية' : 'Homepage') : r;

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="truncate pr-2">
                    <span className="text-white font-semibold block truncate">
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {fullAr}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href={fullAr}
                      target="_blank"
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 text-[11px] font-bold border border-slate-800"
                    >
                      AR ↗
                    </Link>
                    <Link
                      href={fullEn}
                      target="_blank"
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 text-[11px] font-bold border border-slate-800"
                    >
                      EN ↗
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DETAILED SUBMISSION / ORDER MODAL (WITH PDF & WHATSAPP) */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div
            id="printable-receipt"
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 no-print">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    REF #{selectedSub.payload?.refNumber || selectedSub.id.slice(0, 12)}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      selectedSub.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {selectedSub.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {isAr ? 'ملف الطلب / الاستشارة الفنية' : 'Order & Quotation Dossier'}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSub(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Print Header (Only visible when printed) */}
            <div className="hidden print:block pb-4 border-b border-black">
              <h1 className="text-2xl font-bold text-black">{isAr ? siteNameAr : siteNameEn}</h1>
              <p className="text-xs text-gray-600">Mavvix Demo Factory Commercial Receipt</p>
              <p className="text-xs text-gray-600">Ref: #{selectedSub.payload?.refNumber || selectedSub.id}</p>
            </div>

            {/* Customer Contact Details */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{isAr ? 'الاسم' : 'Customer'}</span>
                <span className="text-white font-semibold text-sm">
                  {selectedSub.payload?.name || selectedSub.payload?.contactName || selectedSub.payload?.fullName || selectedSub.payload?.guestName || 'عميل تجريبي'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{isAr ? 'الهاتف' : 'Phone'}</span>
                <span className="text-white font-semibold font-mono">
                  {selectedSub.payload?.phone || selectedSub.payload?.phoneE164 || contactPhone}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{isAr ? 'البريد الإلكتروني' : 'Email'}</span>
                <span className="text-white font-semibold font-mono">
                  {selectedSub.payload?.email || 'customer@example.com'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{isAr ? 'تاريخ التقديم' : 'Submission Date'}</span>
                <span className="text-white font-mono">
                  {new Date(selectedSub.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payload Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isAr ? 'تفاصيل الطلب والبيانات الفنية:' : 'Requested Scope & Technical Lines:'}
              </h4>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono">
                {Object.entries(selectedSub.payload || {}).map(([key, value]: [string, any]) => {
                  if (typeof value === 'object') return null;
                  return (
                    <div key={key} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-0">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="text-cyan-300 font-semibold">{String(value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Commercial Action Buttons (Print, WhatsApp, Email, Status) */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-2">
                {/* Print PDF Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isAr ? 'طباعة / تصدير PDF' : 'Print / PDF'}</span>
                </button>

                {/* Direct WhatsApp Chat */}
                {selectedSub.payload?.phone && (
                  <a
                    href={`https://wa.me/${String(selectedSub.payload.phone).replace(/\D/g, '')}?text=${encodeURIComponent(
                      isAr
                        ? `أهلًا ${selectedSub.payload.name || ''}، معك فريق ${siteNameAr} بخصوص طلبك رقم (${selectedSub.payload?.refNumber || selectedSub.id.slice(0, 8)}). تم استلام تفاصيلك ونود تأكيد المتابعة.`
                        : `Hello ${selectedSub.payload.name || ''}, this is the ${siteNameEn} team regarding your reference #${selectedSub.payload?.refNumber || selectedSub.id.slice(0, 8)}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-xs font-bold transition-all shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isAr ? 'واتساب العميل' : 'WhatsApp'}</span>
                  </a>
                )}

                {/* Email Direct */}
                {selectedSub.payload?.email && (
                  <a
                    href={`mailto:${selectedSub.payload.email}?subject=${encodeURIComponent(
                      `${siteNameEn} - Reference #${selectedSub.payload?.refNumber || selectedSub.id.slice(0, 8)}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isAr ? 'إيميل' : 'Email'}</span>
                  </a>
                )}
              </div>

              {/* Status Updater Action */}
              <div className="flex items-center gap-2">
                {selectedSub.status !== 'reviewed' && (
                  <button
                    onClick={() => updateStatus(selectedSub.id, 'reviewed')}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    {isAr ? 'تأكيد المراجعة ✓' : 'Mark Reviewed ✓'}
                  </button>
                )}
                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

