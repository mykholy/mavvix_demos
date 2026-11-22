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
  ArrowUp,
  ArrowDown,
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
  Share2,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  HelpCircle,
  Layout,
  FilePlus,
  Send
} from 'lucide-react';
import type { SiteRecord } from '@/lib/db/repositories';
import type { CMSPage, CMSSection, CMSSectionSettings } from '@/lib/db/cms';

interface Props {
  site: SiteRecord;
  submissions: any[];
  sectorItems: any[];
  routes: string[];
  adminUser: { id: string; email: string; role: string };
  initialPages?: CMSPage[];
  initialHomeSections?: CMSSection[];
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
  sectorItems: initialSectorItems,
  routes,
  adminUser,
  initialPages = [],
  initialHomeSections = [],
}: Props) {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'pages' | 'catalog' | 'submissions' | 'settings' | 'routes'>('overview');
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

  // -------------------------------------------------------------
  // SECTOR INVENTORY CRUD STATE
  // -------------------------------------------------------------
  const [items, setItems] = useState<any[]>(initialSectorItems);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [savingItem, setSavingItem] = useState(false);

  // -------------------------------------------------------------
  // PAGES & BUILDER STATE
  // -------------------------------------------------------------
  const [pages, setPages] = useState<CMSPage[]>(initialPages);
  const [selectedPageId, setSelectedPageId] = useState<string>(
    initialPages.find(p => p.route_key === '/')?.id || initialPages[0]?.id || ''
  );
  const [sections, setSections] = useState<CMSSection[]>(initialHomeSections);
  const [editingSection, setEditingSection] = useState<CMSSection | null>(null);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [savingSections, setSavingSections] = useState(false);
  const [sectionSaveFeedback, setSectionSaveFeedback] = useState(false);

  // Custom Page Creator modal
  const [showPageModal, setShowPageModal] = useState(false);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [pageForm, setPageForm] = useState({
    slug: '',
    titleAr: '',
    titleEn: '',
    seoTitleAr: '',
    seoTitleEn: '',
    seoDescAr: '',
    seoDescEn: '',
    status: 'published' as 'published' | 'draft'
  });
  const [savingPage, setSavingPage] = useState(false);

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
    else estimatedValue += 3500;
  });

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

  // Settings saver
  async function handleSaveSettings() {
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

  // -------------------------------------------------------------
  // SECTOR ITEMS CRUD HANDLERS
  // -------------------------------------------------------------
  function handleOpenCreateItem() {
    setIsNewItem(true);
    setEditingItem({
      id: '',
      title: '',
      name_en: '',
      summary: '',
      summary_en: '',
      category: 'general',
      price_cents: 10000,
      image_url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
      status: 'active'
    });
  }

  function handleOpenEditItem(item: any) {
    setIsNewItem(false);
    setEditingItem({
      ...item,
      title: item.title || item.name || item.name_ar || '',
      name_en: item.name_en || item.slug || '',
      summary: item.summary || item.description || '',
      summary_en: item.summary_en || '',
      category: item.category || item.unit_type || item.project_type || 'general',
      price_cents: item.price_cents || item.example_price_cents || item.base_price_cents || 0,
    });
  }

  async function handleSaveItem() {
    if (!editingItem) return;
    setSavingItem(true);
    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNewItem ? 'create' : 'update',
          itemId: editingItem.id,
          itemData: {
            titleAr: editingItem.title,
            titleEn: editingItem.name_en || editingItem.title,
            summaryAr: editingItem.summary,
            summaryEn: editingItem.summary_en || editingItem.summary,
            category: editingItem.category,
            priceCents: Number(editingItem.price_cents),
            status: editingItem.status || 'published'
          }
        })
      });

      if (res.ok) {
        if (isNewItem) {
          setItems(prev => [
            {
              ...editingItem,
              id: `item-${Date.now()}`,
              price_cents: Number(editingItem.price_cents)
            },
            ...prev
          ]);
        } else {
          setItems(prev =>
            prev.map(it => (it.id === editingItem.id ? { ...it, ...editingItem, price_cents: Number(editingItem.price_cents) } : it))
          );
        }
        setEditingItem(null);
      }
    } catch (err) {
      console.error('Error saving item:', err);
    } finally {
      setSavingItem(false);
    }
  }

  async function handleDeleteItem(itemId: string) {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا العنصر نهائياً؟' : 'Are you sure you want to permanently delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', itemId })
      });
      if (res.ok) {
        setItems(prev => prev.filter(it => it.id !== itemId));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  }

  // -------------------------------------------------------------
  // SECTIONS & BUILDER HANDLERS
  // -------------------------------------------------------------
  async function loadSectionsForPage(page: CMSPage) {
    setSelectedPageId(page.id);
    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/sections?routeKey=${encodeURIComponent(page.route_key)}`);
      if (res.ok) {
        const data = await res.json();
        setSections(data.sections || []);
      }
    } catch (err) {
      console.error('Error loading sections:', err);
    }
  }

  function handleMoveSection(index: number, direction: 'up' | 'down') {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    newSections.forEach((s, idx) => {
      s.sort_order = (idx + 1) * 10;
    });

    setSections(newSections);
  }

  function handleToggleSectionActive(secId: string) {
    setSections(prev =>
      prev.map(s => (s.id === secId ? { ...s, active: s.active === 1 ? 0 : 1 } : s))
    );
  }

  function handleDeleteSection(secId: string) {
    if (!confirm(isAr ? 'هل تريد حذف هذا السكشن؟' : 'Remove this section?')) return;
    setSections(prev => prev.filter(s => s.id !== secId));
  }

  function handleAddSectionPreset(type: CMSSection['section_type']) {
    const newSec: CMSSection = {
      id: `temp-${Date.now().toString(36)}`,
      page_id: selectedPageId,
      section_type: type,
      section_variant: 'default',
      sort_order: (sections.length + 1) * 10,
      active: 1,
      settings: {
        badgeAr: 'سكشن جديد',
        badgeEn: 'New Section',
        titleAr: type === 'hero' ? 'عنوان البانر الرئيسي' : type === 'features' ? 'مزايا وخدمات استثنائية' : 'عنوان السكشن الجديد',
        titleEn: type === 'hero' ? 'Main Impact Headline' : type === 'features' ? 'Core Capabilities' : 'New Section Headline',
        subtitleAr: 'أدخل تفاصيل ومحتوى هذا السكشن هنا ليظهر مباشرة للزوار والعملاء.',
        subtitleEn: 'Enter relevant description and copy for this section to engage visitors.',
        buttonTextAr: 'تواصل معنا',
        buttonTextEn: 'Inquire Now',
        buttonUrl: '#contact',
        styleVariant: 'accent',
        items: type === 'features' ? [
          { titleAr: 'ميزة متقدمة 1', titleEn: 'Feature One', descAr: 'تفاصيل الميزة الأولى.', descEn: 'Description of feature one.' },
          { titleAr: 'ميزة متقدمة 2', titleEn: 'Feature Two', descAr: 'تفاصيل الميزة الثانية.', descEn: 'Description of feature two.' },
          { titleAr: 'ميزة متقدمة 3', titleEn: 'Feature Three', descAr: 'تفاصيل الميزة الثالثة.', descEn: 'Description of feature three.' }
        ] : type === 'faq' ? [
          { titleAr: 'سؤال شائع 1؟', titleEn: 'Common question one?', descAr: 'إجابة واضحة وتفصيلية للسؤال.', descEn: 'Clear explanation for question one.' },
          { titleAr: 'سؤال شائع 2؟', titleEn: 'Common question two?', descAr: 'إجابة واضحة وتفصيلية للسؤال.', descEn: 'Clear explanation for question two.' }
        ] : []
      }
    };

    setSections(prev => [...prev, newSec]);
    setShowAddSectionModal(false);
    setEditingSection(newSec);
  }

  async function handleSaveSectionsToDb() {
    setSavingSections(true);
    setSectionSaveFeedback(false);
    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: selectedPageId,
          sections: sections
        })
      });
      if (res.ok) {
        setSectionSaveFeedback(true);
        setTimeout(() => setSectionSaveFeedback(false), 3000);
      }
    } catch (err) {
      console.error('Error saving sections:', err);
    } finally {
      setSavingSections(false);
    }
  }

  // -------------------------------------------------------------
  // CUSTOM PAGES HANDLERS
  // -------------------------------------------------------------
  async function handleCreatePage() {
    if (!pageForm.titleAr || !pageForm.slug) return;
    setSavingPage(true);
    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: pageForm.slug,
          titleAr: pageForm.titleAr,
          titleEn: pageForm.titleEn || pageForm.titleAr,
          seoTitleAr: pageForm.seoTitleAr || pageForm.titleAr,
          seoTitleEn: pageForm.seoTitleEn || pageForm.titleEn,
          seoDescAr: pageForm.seoDescAr,
          seoDescEn: pageForm.seoDescEn,
          status: pageForm.status
        })
      });

      if (res.ok) {
        const pagesRes = await fetch(`/api/admin/sites/${site.slug}/pages`);
        if (pagesRes.ok) {
          const data = await pagesRes.json();
          setPages(data.pages || []);
        }
        setShowPageModal(false);
        setPageForm({ slug: '', titleAr: '', titleEn: '', seoTitleAr: '', seoTitleEn: '', seoDescAr: '', seoDescEn: '', status: 'published' });
      }
    } catch (err) {
      console.error('Error creating page:', err);
    } finally {
      setSavingPage(false);
    }
  }

  async function handleDeletePage(pageId: string) {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذه الصفحة وسكاشنها؟' : 'Delete this page and all its sections?')) return;
    try {
      const res = await fetch(`/api/admin/sites/${site.slug}/pages?pageId=${encodeURIComponent(pageId)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setPages(prev => prev.filter(p => p.id !== pageId));
      }
    } catch (err) {
      console.error('Error deleting page:', err);
    }
  }

  const selectedPage = pages.find(p => p.id === selectedPageId) || pages[0];

  return (
    <div className={`space-y-8 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div
          className="absolute -top-24 -end-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: brandColor }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/10"
              style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
            >
              <Icon className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {site.slug.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مركز تحكم نشط' : 'Active Control Center'}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {isAr ? siteNameAr : siteNameEn}
              </h1>

              <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                {isAr
                  ? `لوحة التحكم الإدارية لتعديل محتوى وسكاشن (${siteNameAr})، فحص الاستمارات، وتصدير الأوامر.`
                  : `Dedicated CMS for ${siteNameEn}: manage visual sections, custom pages, and live orders.`}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            <Link
              href={`/${lang}/preview/${site.slug}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center gap-2"
            >
              <span>{isAr ? 'المعاينة الحية للموقع' : 'Live Preview'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </Link>

            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-medium transition-all border border-slate-800"
            >
              {isAr ? '← كل المواقع' : '← All Sites'}
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
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'builder'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-cyan-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>{isAr ? `منشئ السكاشن (Section Builder)` : `Visual Builder (${sections.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pages'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FilePlus className="w-4 h-4" />
            <span>{isAr ? `صفحات مخصصة (${pages.length})` : `Custom Pages (${pages.length})`}</span>
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
            <span>{isAr ? `الكتالوج والمنتجات (${items.length})` : `Inventory (${items.length})`}</span>
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
            <span>{isAr ? `سجل الطلبات (${submissions.length})` : `Submissions (${submissions.length})`}</span>
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
            <span>{isAr ? 'الإعدادات و SEO' : 'Settings & SEO'}</span>
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
            <span>{isAr ? `المسارات (${routes.length})` : `Routes (${routes.length})`}</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: OVERVIEW & ANALYTICS
      ------------------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
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
                <span>{isAr ? 'عناصر الكتالوج والمنتجات' : 'Inventory Items'}</span>
                <Database className="w-4 h-4 text-amber-400" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-white">{items.length}</p>
              <p className="mt-1 text-[11px] text-amber-400 font-medium">
                {isAr ? 'بيانات علائقية قابلة للتعديل والإضافة' : 'Editable relational records'}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{isAr ? 'الصفحات والسكاشن النشطة' : 'Active Pages & Sections'}</span>
                <Layout className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-white">
                {pages.length} <span className="text-xs text-slate-400 font-normal">{isAr ? 'صفحات' : 'pages'}</span>
              </p>
              <p className="mt-1 text-[11px] text-indigo-400 font-medium">
                {isAr ? `${sections.length} سكشن في الـ Builder` : `${sections.length} sections in Builder`}
              </p>
            </div>
          </div>

          {/* Quick Overview Summary Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? 'منشئ السكاشن والمحتوى مفعل' : 'Visual Page Builder Ready'}</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {isAr ? 'تحكم كامل بالمحتوى، السكاشن، والصفحات المخصصة' : 'Complete Content & Layout Customization'}
              </h2>
              <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
                {isAr
                  ? 'يمكنك الآن إعادة ترتيب السكاشن، إضافة سكشن جديد من مكتبة النماذج الجاهزة، إنشاء صفحات إضافية باللغتين العربية والإنجليزية، وتعديل أسعار وبيانات المنتجات فورياً مع حفظها محلياً في SQLite.'
                  : 'Reorder sections, add presets from the component library, build custom bilingual landing pages, and edit inventory with instant SQLite persistence.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('builder')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <Layout className="w-4 h-4" />
                <span>{isAr ? 'فتح منشئ السكاشن ←' : 'Open Section Builder →'}</span>
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
              >
                {isAr ? 'إدارة المنتجات والأسعار' : 'Manage Products'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: VISUAL SECTION BUILDER (BUILDER احترافي)
      ------------------------------------------------------------- */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          {/* Builder Controls Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Visual Section Builder
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">
                  {isAr ? `تعديل سكاشن: ${selectedPage?.title_ar}` : `Editing: ${selectedPage?.title_en}`}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {isAr ? 'منشئ ومحرر السكاشن التفاعلي' : 'Visual Page & Section Manager'}
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                {isAr
                  ? 'قم بإعادة ترتيب السكاشن بالسهمين، إخفاء/إظهار أي سكشن، تعديل النصوص والصور، أو إضافة سكشن جديد من المكتبة.'
                  : 'Reorder sections, toggle active status, edit copy and images, or insert new components from the library.'}
              </p>
            </div>

            {/* Page Picker & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 px-2">{isAr ? 'الصفحة:' : 'Page:'}</span>
                <select
                  value={selectedPageId}
                  onChange={(e) => {
                    const p = pages.find(page => page.id === e.target.value);
                    if (p) loadSectionsForPage(p);
                  }}
                  className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
                >
                  {pages.map(p => (
                    <option key={p.id} value={p.id}>
                      {isAr ? p.title_ar : p.title_en} ({p.route_key})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowAddSectionModal(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-all border border-slate-700 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة سكشن جديد' : 'Add Section'}</span>
              </button>

              <button
                onClick={handleSaveSectionsToDb}
                disabled={savingSections}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 disabled:opacity-50"
              >
                {savingSections ? <Clock className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>{isAr ? 'حفظ السكاشن في SQLite' : 'Save To SQLite'}</span>
              </button>
            </div>
          </div>

          {/* Feedback alert */}
          {sectionSaveFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم حفظ ترتيب ومحتوى السكاشن بنجاح في قاعدة البيانات!' : 'Sections saved successfully in SQLite!'}</span>
            </div>
          )}

          {/* Sections List */}
          {sections.length === 0 ? (
            <div className="bg-slate-900 border border-dashed border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Layout className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-white">
                {isAr ? 'لا توجد سكاشن مضافة لهذه الصفحة بعد' : 'No sections added yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isAr ? 'انقر على "إضافة سكشن جديد" لاختيار قالب جاهز وإدراجه في الصفحة.' : 'Click "Add Section" to pick a template and insert it into this page.'}
              </p>
              <button
                onClick={() => setShowAddSectionModal(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
              >
                {isAr ? '+ إضافة أول سكشن' : '+ Add First Section'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sections.map((sec, idx) => {
                const settings = sec.settings || {};
                const title = isAr ? settings.titleAr : settings.titleEn;
                const subtitle = isAr ? settings.subtitleAr : settings.subtitleEn;
                const isFirst = idx === 0;
                const isLast = idx === sections.length - 1;
                const isHidden = sec.active === 0;

                const TYPE_COLORS: Record<string, string> = {
                  hero: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                  features: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                  split: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                  stats: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                  faq: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
                  cta: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
                  contact: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
                };

                return (
                  <div
                    key={sec.id || idx}
                    className={`bg-slate-900 border rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isHidden ? 'opacity-50 border-slate-800 bg-slate-950/60' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Reorder Arrows */}
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                        <button
                          onClick={() => handleMoveSection(idx, 'up')}
                          disabled={isFirst}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-20 transition-all"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {idx + 1}
                        </span>
                        <button
                          onClick={() => handleMoveSection(idx, 'down')}
                          disabled={isLast}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-20 transition-all"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${TYPE_COLORS[sec.section_type] || 'bg-slate-800 text-slate-300'}`}>
                            {sec.section_type}
                          </span>
                          {settings.badgeAr && (
                            <span className="text-[10px] font-semibold text-slate-400">
                              • {isAr ? settings.badgeAr : settings.badgeEn}
                            </span>
                          )}
                          {isHidden && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              {isAr ? 'مخفي' : 'Hidden'}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white">
                          {title || `Section ${idx + 1}`}
                        </h4>

                        {subtitle && (
                          <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => handleToggleSectionActive(sec.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
                        title={isHidden ? 'Show Section' : 'Hide Section'}
                      >
                        {isHidden ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
                      </button>

                      <button
                        onClick={() => setEditingSection(sec)}
                        className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold transition-all border border-cyan-500/30 flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تعديل المحتوى' : 'Edit Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSection(sec.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all border border-rose-500/20"
                        title="Delete Section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Preview link for selected page */}
          <div className="pt-4 flex justify-between items-center text-xs text-slate-400">
            <span>
              {isAr ? 'يمكنك معاينة هذه الصفحة وسكاشنها مباشرة:' : 'Preview this page with active sections:'}
            </span>
            <Link
              href={
                selectedPage?.route_key === '/'
                  ? `/${lang}/preview/${site.slug}`
                  : `/${lang}/preview/${site.slug}${selectedPage?.route_key}`
              }
              target="_blank"
              className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>{isAr ? 'فتح المعاينة الحية ↗' : 'Open Live Page ↗'}</span>
            </Link>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: CUSTOM PAGES MANAGER (صفحات مخصصة)
      ------------------------------------------------------------- */}
      {activeTab === 'pages' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAr ? 'إدارة وتصميم الصفحات المخصصة' : 'Custom Pages & Scopes'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr
                  ? 'أنشئ صفحات هبوط إضافية باللغتين العربية والإنجليزية مع إمكانية تصميم سكاشنها الخاصة في الـ Builder.'
                  : 'Create custom bilingual landing pages with their own unique section stack.'}
              </p>
            </div>

            <button
              onClick={() => {
                setPageForm({
                  slug: '',
                  titleAr: '',
                  titleEn: '',
                  seoTitleAr: '',
                  seoTitleEn: '',
                  seoDescAr: '',
                  seoDescEn: '',
                  status: 'published'
                });
                setShowPageModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إنشاء صفحة جديدة' : 'Create New Page'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => {
              const isHome = p.route_key === '/';
              return (
                <div
                  key={p.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {p.route_key}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          p.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {isAr ? p.title_ar : p.title_en}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {isAr ? (p.seo_desc_ar || 'صفحة معتمدة في المنصة') : (p.seo_desc_en || 'Platform scope page')}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        loadSectionsForPage(p);
                        setActiveTab('builder');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Layout className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تصميم السكاشن' : 'Design Sections'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href={
                          isHome
                            ? `/${lang}/preview/${site.slug}`
                            : `/${lang}/preview/${site.slug}${p.route_key}`
                        }
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-all"
                        title="View Live"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {!isHome && (
                        <button
                          onClick={() => handleDeletePage(p.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                          title="Delete Page"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 4: SECTOR INVENTORY & CATALOG (الكتالوج والمنتجات)
      ------------------------------------------------------------- */}
      {activeTab === 'catalog' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAr ? 'كتالوج ومحتوى المنصة الفعلي' : 'Sector Inventory & Catalog Items'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr
                  ? `تحكم كامل بعناصر (${siteNameAr}): يمكنك إضافة عناصر جديدة، تعديل الأسعار، أو حذف العناصر فورياً.`
                  : `Manage all domain records for ${siteNameEn}: add items, edit prices, or remove records.`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">
                {items.length} {isAr ? 'عنصر مسجل' : 'Items'}
              </div>
              <button
                onClick={handleOpenCreateItem}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة عنصر جديد' : 'Add Item'}</span>
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              {isAr ? 'لا توجد عناصر مسجلة في هذا القسم.' : 'No items found in this catalog.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, idx) => (
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

                  {/* Attributes & Edit Actions */}
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

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditItem(item)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        <span>{isAr ? 'تعديل' : 'Edit'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 5: SUBMISSIONS & ORDERS DOSSIER (WITH PDF PRINT & WHATSAPP)
      ------------------------------------------------------------- */}
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

      {/* -------------------------------------------------------------
          TAB 6: SETTINGS & SEO
      ------------------------------------------------------------- */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAr ? 'إعدادات الموقع، الاتصال، ومحركات البحث (SEO)' : 'Site Identity, Contact & SEO Settings'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr
                  ? 'يتم حفظ كافة التعديلات في SQLite وتنعكس مباشرة على صفحات الويب ومعاينة Google SERP.'
                  : 'Persisted to SQLite and reflected in website headers and Google SERP previews.'}
              </p>
            </div>

            <button
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 flex items-center gap-2 disabled:opacity-50"
            >
              {savingSettings ? <Clock className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>{isAr ? 'حفظ الإعدادات' : 'Save Changes'}</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم حفظ وتحديث الإعدادات بنجاح!' : 'Settings successfully updated in SQLite!'}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'اسم الموقع / العلامة (عربي)' : 'Site Name (Arabic)'}
              </label>
              <input
                type="text"
                value={siteNameAr}
                onChange={e => setSiteNameAr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'اسم الموقع / العلامة (English)' : 'Site Name (English)'}
              </label>
              <input
                type="text"
                value={siteNameEn}
                onChange={e => setSiteNameEn(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'عنوان صفحة البحث Meta Title (عربي)' : 'Meta Title (Arabic)'}
              </label>
              <input
                type="text"
                value={metaTitleAr}
                onChange={e => setMetaTitleAr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'عنوان صفحة البحث Meta Title (English)' : 'Meta Title (English)'}
              </label>
              <input
                type="text"
                value={metaTitleEn}
                onChange={e => setMetaTitleEn(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'وصف الموقع لمحركات البحث Meta Description' : 'Meta Description'}
              </label>
              <textarea
                rows={2}
                value={metaDescAr}
                onChange={e => setMetaDescAr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'رقم واتساب المباشر' : 'WhatsApp Number'}
              </label>
              <input
                type="text"
                value={contactWhatsapp}
                onChange={e => setContactWhatsapp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 7: ROUTES INDEX
      ------------------------------------------------------------- */}
      {activeTab === 'routes' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">
            {isAr ? 'فهرس ومسارات الموقع المعتمدة' : 'Blueprint Routes Index'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {routes.map((r, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400">/{site.slug}{r}</span>
                <Link
                  href={`/${lang}/preview/${site.slug}${r}`}
                  target="_blank"
                  className="text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: EDIT SECTION COPY & SETTINGS
      ------------------------------------------------------------- */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'تعديل محتوى السكشن' : 'Edit Section Details'}
                </h3>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'العنوان الرئيسي (عربي)' : 'Headline (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={editingSection.settings?.titleAr || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, titleAr: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'العنوان الرئيسي (English)' : 'Headline (English)'}
                  </label>
                  <input
                    type="text"
                    value={editingSection.settings?.titleEn || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, titleEn: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'الوصف الفرعي (عربي)' : 'Subtitle (Arabic)'}
                  </label>
                  <textarea
                    rows={2}
                    value={editingSection.settings?.subtitleAr || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, subtitleAr: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'الوصف الفرعي (English)' : 'Subtitle (English)'}
                  </label>
                  <textarea
                    rows={2}
                    value={editingSection.settings?.subtitleEn || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, subtitleEn: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'نص الشارة / البادج (عربي)' : 'Badge Label (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={editingSection.settings?.badgeAr || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, badgeAr: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'نص الشارة / البادج (English)' : 'Badge Label (English)'}
                  </label>
                  <input
                    type="text"
                    value={editingSection.settings?.badgeEn || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, badgeEn: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'نص زر الإجراء CTA (عربي)' : 'Button Label (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={editingSection.settings?.buttonTextAr || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, buttonTextAr: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'رابط الزر (URL)' : 'Button URL'}
                  </label>
                  <input
                    type="text"
                    value={editingSection.settings?.buttonUrl || ''}
                    onChange={e => setEditingSection({
                      ...editingSection,
                      settings: { ...editingSection.settings, buttonUrl: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isAr ? 'رابط الصورة (Image URL)' : 'Image URL'}
                </label>
                <input
                  type="text"
                  value={editingSection.settings?.imageUrl || ''}
                  onChange={e => setEditingSection({
                    ...editingSection,
                    settings: { ...editingSection.settings, imageUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  setSections(prev =>
                    prev.map(s => (s.id === editingSection.id ? editingSection : s))
                  );
                  setEditingSection(null);
                }}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black"
              >
                {isAr ? 'تحديث السكشن' : 'Apply Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: ADD SECTION PRESET LIBRARY
      ------------------------------------------------------------- */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'اختر قالباً لإضافته إلى الصفحة' : 'Choose Section Template'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: 'hero', titleAr: '🌟 بانر رئيسي (Hero)', titleEn: 'Hero Showcase', desc: 'عنوان كبير مع خلفية بصرية وأزرار إجراء.' },
                { type: 'features', titleAr: '⚡ شبكة المزايا (Features)', titleEn: 'Features Grid', desc: '3 كروت مع أيقونات ومواصفات تفصيلية.' },
                { type: 'split', titleAr: '📖 قصة مقسومة بصورة (Split)', titleEn: 'Split Editorial', desc: 'نص وقائمة نقاط إلى جانب صورة كبيرة.' },
                { type: 'stats', titleAr: '📊 شريط الأرقام (Stats)', titleEn: 'Metrics Banner', desc: '4 أرقام ومؤشرات إنجاز كبيرة وملفتة.' },
                { type: 'faq', titleAr: '❓ أسئلة شائعة (FAQ)', titleEn: 'FAQ Accordion', desc: 'أكورديون تفاعلي للأسئلة والإجابات.' },
                { type: 'cta', titleAr: '🚀 دعوة لاتخاذ إجراء (CTA)', titleEn: 'Call To Action', desc: 'بانر ملفت لتحفيز العميل على التواصل أو الشراء.' },
                { type: 'contact', titleAr: '✉️ استمارة استفسار (Contact)', titleEn: 'Inquiry Form', desc: 'استمارة تواصل مباشرة تسجل فورياً بالـ DB.' },
              ].map(tpl => (
                <button
                  key={tpl.type}
                  onClick={() => handleAddSectionPreset(tpl.type as any)}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-start space-y-1.5 transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {isAr ? tpl.titleAr : tpl.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {tpl.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: CREATE CUSTOM PAGE
      ------------------------------------------------------------- */}
      {showPageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'إنشاء صفحة مخصصة جديدة' : 'Create New Custom Page'}
                </h3>
              </div>
              <button
                onClick={() => setShowPageModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isAr ? 'مسار الصفحة بالرابط (Slug)' : 'URL Slug'}
                </label>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-400 font-mono">
                  <span>/preview/{site.slug}/p/</span>
                  <input
                    type="text"
                    required
                    value={pageForm.slug}
                    onChange={e => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-') })}
                    placeholder="special-offer"
                    className="bg-transparent text-white font-mono focus:outline-none flex-1 ms-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'عنوان الصفحة (عربي)' : 'Page Title (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={pageForm.titleAr}
                    onChange={e => setPageForm({ ...pageForm, titleAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="عرض حصري لمشروعات 2026"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'عنوان الصفحة (English)' : 'Page Title (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={pageForm.titleEn}
                    onChange={e => setPageForm({ ...pageForm, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Exclusive 2026 Scope Offer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isAr ? 'وصف الصفحة التوضيحي (SEO Description)' : 'Meta Description'}
                </label>
                <textarea
                  rows={2}
                  value={pageForm.seoDescAr}
                  onChange={e => setPageForm({ ...pageForm, seoDescAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                  placeholder="وصف مختصر يظهر في محركات البحث وبطاقات المشاركة..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowPageModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleCreatePage}
                disabled={savingPage || !pageForm.slug || !pageForm.titleAr}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black disabled:opacity-50"
              >
                {savingPage ? (isAr ? 'جاري الإنشاء...' : 'Creating...') : (isAr ? 'إنشاء الصفحة وتجهيز السكاشن' : 'Create & Seed Page')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: EDIT OR ADD SECTOR ITEM (PRODUCTS/SERVICES/DISHES)
      ------------------------------------------------------------- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isNewItem ? (isAr ? 'إضافة عنصر جديد' : 'Add New Item') : (isAr ? 'تعديل بيانات العنصر' : 'Edit Item')}
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'الاسم / العنوان (عربي)' : 'Title (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'الاسم / العنوان (English)' : 'Title (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name_en || ''}
                    onChange={e => setEditingItem({ ...editingItem, name_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'التصنيف / القسم' : 'Category'}
                  </label>
                  <input
                    type="text"
                    value={editingItem.category || ''}
                    onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isAr ? 'السعر (بالجنيه EGP)' : 'Price (EGP)'}
                  </label>
                  <input
                    type="number"
                    value={(editingItem.price_cents || 0) / 100}
                    onChange={e => setEditingItem({ ...editingItem, price_cents: Math.round(Number(e.target.value) * 100) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isAr ? 'الوصف والتفاصيل (عربي)' : 'Summary (Arabic)'}
                </label>
                <textarea
                  rows={2}
                  value={editingItem.summary || ''}
                  onChange={e => setEditingItem({ ...editingItem, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveItem}
                disabled={savingItem || !editingItem.title}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black disabled:opacity-50"
              >
                {savingItem ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ العنصر في SQLite' : 'Save To SQLite')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: SUBMISSION DETAILS WITH PRINT & WHATSAPP
      ------------------------------------------------------------- */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'تفاصيل الطلب الرسمي وإجراءات المتابعة' : 'Submission Dossier & Actions'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block mb-0.5">{isAr ? 'رقم المرجع' : 'Reference'}</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedSub.payload?.refNumber || selectedSub.id.slice(0, 12)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">{isAr ? 'النوع' : 'Flow'}</span>
                  <span className="font-bold text-white capitalize">{selectedSub.flow_type.replace(/_/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">{isAr ? 'الحالة الحالية' : 'Status'}</span>
                  <span className="font-bold text-amber-300 uppercase">{selectedSub.status}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">{isAr ? 'بيانات العميل والطلب' : 'Client Details'}</span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  {JSON.stringify(selectedSub.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {selectedSub.status === 'pending' ? (
                  <button
                    onClick={() => updateStatus(selectedSub.id, 'reviewed')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    {isAr ? 'اعتماد ومراجعة ✓' : 'Mark Reviewed ✓'}
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(selectedSub.id, 'pending')}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
                  >
                    {isAr ? 'إعادة لقيد الانتظار' : 'Mark Pending'}
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isAr ? 'طباعة / تصدير PDF' : 'Print PDF'}</span>
                </button>
              </div>

              {selectedSub.payload?.phone && (
                <a
                  href={`https://wa.me/${selectedSub.payload.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مراسلة عبر واتساب' : 'Chat WhatsApp'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
