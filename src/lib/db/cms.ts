import crypto from 'node:crypto';
import { query, queryOne, execute, getDb } from './index';
import type { Locale } from '../i18n/config';

export interface CMSSectionSettings {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr?: string;
  badgeEn?: string;
  buttonTextAr?: string;
  buttonTextEn?: string;
  buttonUrl?: string;
  secondaryButtonTextAr?: string;
  secondaryButtonTextEn?: string;
  secondaryButtonUrl?: string;
  imageUrl?: string;
  styleVariant?: 'default' | 'glass' | 'dark' | 'accent' | 'light';
  items?: Array<{
    titleAr: string;
    titleEn: string;
    descAr?: string;
    descEn?: string;
    icon?: string;
    value?: string;
    url?: string;
  }>;
}

export interface CMSSection {
  id: string;
  page_id: string;
  section_type: 'hero' | 'features' | 'split' | 'stats' | 'faq' | 'cta' | 'testimonials' | 'contact';
  section_variant: string;
  sort_order: number;
  active: number;
  settings: CMSSectionSettings;
}

export interface CMSPage {
  id: string;
  site_id: string;
  site_slug: string;
  route_key: string;
  is_custom: boolean;
  layout_variant: string;
  status: 'published' | 'draft' | 'archived';
  sort_order: number;
  revision: number;
  updated_at: string;
  title_ar: string;
  title_en: string;
  seo_title_ar: string;
  seo_title_en: string;
  seo_desc_ar: string;
  seo_desc_en: string;
  sections_count?: number;
}

// Ensure default site home page exists and is seeded with sections
export function getOrCreateHomePage(siteSlug: string): string {
  const site = queryOne<{ id: string; slug: string; name_ar: string; name_en: string }>(
    `SELECT id, slug, name_ar, name_en FROM demo_sites WHERE slug = ?`,
    [siteSlug]
  );
  if (!site) throw new Error(`Site not found: ${siteSlug}`);

  let homePage = queryOne<{ id: string }>(
    `SELECT id FROM site_pages WHERE site_id = ? AND route_key = '/'`,
    [site.id]
  );

  if (!homePage) {
    const pageId = `page-${siteSlug}-home`;
    execute(
      `INSERT INTO site_pages (id, site_id, route_key, layout_variant, status, sort_order, revision, updated_at)
       VALUES (?, ?, '/', 'default', 'published', 0, 1, CURRENT_TIMESTAMP)`,
      [pageId, site.id]
    );

    // Insert localized titles
    execute(
      `INSERT OR REPLACE INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, seo_title, seo_description)
       VALUES (?, ?, 'page', ?, 'ar', ?, ?, ?, ?)`,
      [
        `lc-${pageId}-ar`,
        site.id,
        pageId,
        `الرئيسية • ${site.name_ar}`,
        `الصفحة الرئيسية لمنصة ${site.name_ar}`,
        `${site.name_ar} • المنصة المعتمدة`,
        `استكشف الخدمات والمشاريع المعتمدة لمنصة ${site.name_ar}`
      ]
    );

    execute(
      `INSERT OR REPLACE INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, seo_title, seo_description)
       VALUES (?, ?, 'page', ?, 'en', ?, ?, ?, ?)`,
      [
        `lc-${pageId}-en`,
        site.id,
        pageId,
        `Home • ${site.name_en}`,
        `Official Home for ${site.name_en}`,
        `${site.name_en} • Official Enterprise Platform`,
        `Explore verified services, catalog and solutions for ${site.name_en}`
      ]
    );

    seedDefaultSectionsForPage(pageId, siteSlug, site.name_ar, site.name_en);
    return pageId;
  }

  // If page exists but has 0 sections, seed them
  const count = queryOne<{ c: number }>(
    `SELECT count(*) as c FROM page_sections WHERE page_id = ?`,
    [homePage.id]
  )?.c || 0;

  if (count === 0) {
    seedDefaultSectionsForPage(homePage.id, siteSlug, site.name_ar, site.name_en);
  }

  return homePage.id;
}

function seedDefaultSectionsForPage(pageId: string, siteSlug: string, siteNameAr: string, siteNameEn: string) {
  const defaultSections: Array<{
    type: CMSSection['section_type'];
    variant: string;
    settings: CMSSectionSettings;
  }> = [
    {
      type: 'hero',
      variant: 'default',
      settings: {
        badgeAr: 'منصة معتمدة وحصرية',
        badgeEn: 'Verified Enterprise Solution',
        titleAr: `التميز الرقمي وتجربة المستخدم مع ${siteNameAr}`,
        titleEn: `Elevating Standards & Precision with ${siteNameEn}`,
        subtitleAr: 'حلول متكاملة، مقاييس دقيقة، وتجربة سلسة مصممة لأصحاب الأعمال والمشروعات الرائدة.',
        subtitleEn: 'Comprehensive solutions, high precision delivery, and client-centric workflows tailored for industry leaders.',
        buttonTextAr: 'استكشف الخدمات والمنتجات',
        buttonTextEn: 'Explore Solutions',
        buttonUrl: '#services',
        secondaryButtonTextAr: 'طلب عرض سعر سريع',
        secondaryButtonTextEn: 'Request Quote',
        secondaryButtonUrl: '#contact',
        styleVariant: 'accent',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=82'
      }
    },
    {
      type: 'features',
      variant: 'grid-3',
      settings: {
        badgeAr: 'المزايا التنافسية',
        badgeEn: 'Core Advantages',
        titleAr: 'لماذا يختارنا كبرى الشركات والعملاء؟',
        titleEn: 'Why Leading Enterprises Choose Our Platform?',
        subtitleAr: 'ركائز هندسية وتشغيلية تضمن أعلى جودة وسرعة تنفيذ.',
        subtitleEn: 'Engineered pillars guaranteeing quality, transparency, and operational velocity.',
        items: [
          {
            titleAr: 'دقة واحترافية معتمدة',
            titleEn: 'Verified Precision',
            descAr: 'معايير جودة صارمة وفحص شامل لكل مرحلة من مراحل التنفيذ.',
            descEn: 'Stringent standards and rigorous verification at every project stage.',
            icon: 'shield'
          },
          {
            titleAr: 'تنفيذ سريع ومواعيد دقيقة',
            titleEn: 'Guaranteed Velocity',
            descAr: 'التزام كامل بجداول التسليم وإدارة رقمية مباشرة للعمليات.',
            descEn: 'Punctual milestones managed with real-time digital oversight.',
            icon: 'clock'
          },
          {
            titleAr: 'دعم فني واستشارات متخصصة',
            titleEn: 'Specialist Support',
            descAr: 'فريق خبراء استشاري متاح عبر واتساب وقنوات التواصل لمتابعتك فورياً.',
            descEn: 'Dedicated advisory team ready on WhatsApp and direct channels.',
            icon: 'message'
          }
        ]
      }
    },
    {
      type: 'split',
      variant: 'image-right',
      settings: {
        badgeAr: 'نهجنا التشغيلي',
        badgeEn: 'Our Operational DNA',
        titleAr: 'تقنيات متطورة تلتقي مع الإتقان الحقيقي',
        titleEn: 'Advanced Systems Meeting Flawless Execution',
        subtitleAr: 'نحول الرؤى المعقدة إلى نتائج ملموسة عبر بنية رقمية متقدمة وفريق عمل محترف يضمن لك عائداً استثمارياً ملموساً.',
        subtitleEn: 'We bridge strategic ambition with concrete realization through modular tech and disciplined delivery.',
        buttonTextAr: 'تحدث مع المستشار المختص',
        buttonTextEn: 'Speak With A Specialist',
        buttonUrl: '#contact',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        items: [
          { titleAr: 'أنظمة متابعة حية ومحدثة على مدار الساعة', titleEn: '24/7 Digital Oversight and Status Tracking' },
          { titleAr: 'عقود واضحة ومواصفات تفصيلية بلا مفاجآت', titleEn: 'Transparent Scope Specifications and Terms' },
          { titleAr: 'تصدير فوري للمقايسات وأوامر العمل بصيغة PDF', titleEn: 'Instant PDF Dossiers and Commercial Invoices' }
        ]
      }
    },
    {
      type: 'stats',
      variant: 'accent',
      settings: {
        titleAr: 'أرقام تتحدث عن إنجازاتنا',
        titleEn: 'Measurable Achievements',
        subtitleAr: 'مؤشرات أداء تعكس ثقة عملائنا في مختلف القطاعات.',
        subtitleEn: 'Key metrics reflecting trust and sustained excellence.',
        items: [
          { value: '+99%', titleAr: 'نسبة الرضا والاعتماد', titleEn: 'Client Satisfaction Rate' },
          { value: '24/7', titleAr: 'جاهزية الاستجابة والدعم', titleEn: 'Instant Channel Availability' },
          { value: '100%', titleAr: 'حفظ وتأمين البيانات محلياً', titleEn: 'Zero-Leakage Local Persistence' },
          { value: '+150', titleAr: 'مشروع وسجل منجز بنجاح', titleEn: 'Completed Scopes & Deliverables' }
        ]
      }
    },
    {
      type: 'faq',
      variant: 'accordion',
      settings: {
        badgeAr: 'الأسئلة الشائعة',
        badgeEn: 'FAQ',
        titleAr: 'كل ما تحتاج لمعرفته قبل بدء التعاون',
        titleEn: 'Everything You Need To Know Before Getting Started',
        subtitleAr: 'إجابات واضحة ومباشرة لأكثر الاستفسارات تكراراً.',
        subtitleEn: 'Clear, concise answers to our most common client inquiries.',
        items: [
          {
            titleAr: 'كيف يمكنني طلب عرض سعر أو مقايسة رسمية؟',
            titleEn: 'How can I request an official quotation?',
            descAr: 'يمكنك بسهولة تقديم طلب عبر الاستمارة المباشرة أو النقر على زر واتساب وسيقوم فريق المبيعات بتزويدك بملف تفصيلي خلال دقائق.',
            descEn: 'Simply submit your inquiry through the direct form or WhatsApp button to receive an itemized proposal.'
          },
          {
            titleAr: 'هل يمكن تخصيص الباقات والخدمات حسب ميزانيتنا؟',
            titleEn: 'Can services and packages be customized to our budget?',
            descAr: 'نعم بالتأكيد، كافة الخدمات قابلة للتعديل والتخصيص بما يوافق متطلبات مشروعك وجدولك الزمني.',
            descEn: 'Yes, all packages can be dynamically scoped to align with your project scale and deadlines.'
          },
          {
            titleAr: 'ما هي مدة الاستجابة للطلبات الواردة؟',
            titleEn: 'What is the standard response SLA?',
            descAr: 'يتم فحص وتأكيد جميع الطلبات الواردة في لوحة التحكم وتعيين مسؤول متابعة في أقل من ساعة عمل.',
            descEn: 'All incoming submissions are processed in the dashboard within one business hour.'
          }
        ]
      }
    },
    {
      type: 'cta',
      variant: 'banner',
      settings: {
        badgeAr: 'ابدأ الآن',
        badgeEn: 'Take Action',
        titleAr: 'جاهز لبدء مشروعك القادم بأعلى معايير الجودة؟',
        titleEn: 'Ready To Accelerate Your Next Venture?',
        subtitleAr: 'تواصل مع فريقنا اليوم واحصل على استشارة مبدئية مجانية ومقايسة مخصصة لنشاطك.',
        subtitleEn: 'Connect with our specialists today for a preliminary consultation and custom scope.',
        buttonTextAr: 'تواصل عبر واتساب مباشرة',
        buttonTextEn: 'Instant WhatsApp Chat',
        buttonUrl: 'https://wa.me/201017799042',
        secondaryButtonTextAr: 'تقديم طلب عبر الموقع',
        secondaryButtonTextEn: 'Submit Online Brief',
        secondaryButtonUrl: '#contact'
      }
    }
  ];

  defaultSections.forEach((sec, idx) => {
    const secId = `sec-${pageId}-${idx + 1}`;
    execute(
      `INSERT OR REPLACE INTO page_sections (id, page_id, section_type, section_variant, settings_json, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [secId, pageId, sec.type, sec.variant, JSON.stringify(sec.settings), (idx + 1) * 10]
    );
  });
}

// Fetch all pages for a site (including home and custom pages)
export function getSitePages(siteSlug: string): CMSPage[] {
  const site = queryOne<{ id: string; slug: string }>(
    `SELECT id, slug FROM demo_sites WHERE slug = ?`,
    [siteSlug]
  );
  if (!site) return [];

  // Ensure home page exists
  getOrCreateHomePage(siteSlug);

  const pages = query<any>(
    `SELECT p.id, p.site_id, ? as site_slug, p.route_key, p.layout_variant, p.status, p.sort_order, p.revision, p.updated_at,
            car.title as title_ar, car.seo_title as seo_title_ar, car.seo_description as seo_desc_ar,
            cen.title as title_en, cen.seo_title as seo_title_en, cen.seo_description as seo_desc_en,
            (SELECT count(*) FROM page_sections WHERE page_id = p.id) as sections_count
     FROM site_pages p
     LEFT JOIN localized_content car ON car.site_id = p.site_id AND car.owner_type = 'page' AND car.owner_id = p.id AND car.locale = 'ar'
     LEFT JOIN localized_content cen ON cen.site_id = p.site_id AND cen.owner_type = 'page' AND cen.owner_id = p.id AND cen.locale = 'en'
     WHERE p.site_id = ?
     ORDER BY p.route_key = '/' DESC, p.sort_order ASC, p.updated_at DESC`,
    [siteSlug, site.id]
  );

  return pages.map(p => ({
    ...p,
    is_custom: p.route_key !== '/',
    title_ar: p.title_ar || (p.route_key === '/' ? 'الرئيسية' : p.route_key.replace('/p/', '')),
    title_en: p.title_en || (p.route_key === '/' ? 'Home' : p.route_key.replace('/p/', '')),
    seo_title_ar: p.seo_title_ar || '',
    seo_title_en: p.seo_title_en || '',
    seo_desc_ar: p.seo_desc_ar || '',
    seo_desc_en: p.seo_desc_en || '',
  }));
}

// Fetch single page by route key
export function getPageByRouteKey(siteSlug: string, routeKey: string): { page: CMSPage; sections: CMSSection[] } | null {
  const site = queryOne<{ id: string }>(`SELECT id FROM demo_sites WHERE slug = ?`, [siteSlug]);
  if (!site) return null;

  if (routeKey === '/') {
    getOrCreateHomePage(siteSlug);
  }

  const p = queryOne<any>(
    `SELECT p.id, p.site_id, ? as site_slug, p.route_key, p.layout_variant, p.status, p.sort_order, p.revision, p.updated_at,
            car.title as title_ar, car.seo_title as seo_title_ar, car.seo_description as seo_desc_ar,
            cen.title as title_en, cen.seo_title as seo_title_en, cen.seo_description as seo_desc_en
     FROM site_pages p
     LEFT JOIN localized_content car ON car.site_id = p.site_id AND car.owner_type = 'page' AND car.owner_id = p.id AND car.locale = 'ar'
     LEFT JOIN localized_content cen ON cen.site_id = p.site_id AND cen.owner_type = 'page' AND cen.owner_id = p.id AND cen.locale = 'en'
     WHERE p.site_id = ? AND p.route_key = ?`,
    [siteSlug, site.id, routeKey]
  );

  if (!p) return null;

  const sections = query<any>(
    `SELECT id, page_id, section_type, section_variant, settings_json, sort_order, active
     FROM page_sections
     WHERE page_id = ?
     ORDER BY sort_order ASC`,
    [p.id]
  ).map(s => ({
    id: s.id,
    page_id: s.page_id,
    section_type: s.section_type,
    section_variant: s.section_variant,
    sort_order: s.sort_order,
    active: s.active,
    settings: JSON.parse(s.settings_json || '{}') as CMSSectionSettings
  }));

  const page: CMSPage = {
    ...p,
    is_custom: p.route_key !== '/',
    title_ar: p.title_ar || (p.route_key === '/' ? 'الرئيسية' : p.route_key),
    title_en: p.title_en || (p.route_key === '/' ? 'Home' : p.route_key),
    seo_title_ar: p.seo_title_ar || '',
    seo_title_en: p.seo_title_en || '',
    seo_desc_ar: p.seo_desc_ar || '',
    seo_desc_en: p.seo_desc_en || '',
    sections_count: sections.length
  };

  return { page, sections };
}

// Create a custom page
export function createCustomPage(siteSlug: string, data: {
  slug: string;
  titleAr: string;
  titleEn: string;
  seoTitleAr?: string;
  seoTitleEn?: string;
  seoDescAr?: string;
  seoDescEn?: string;
  layoutVariant?: string;
  status?: 'published' | 'draft';
}) {
  const site = queryOne<{ id: string; name_ar: string; name_en: string }>(
    `SELECT id, name_ar, name_en FROM demo_sites WHERE slug = ?`,
    [siteSlug]
  );
  if (!site) throw new Error(`Site not found: ${siteSlug}`);

  const cleanSlug = data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/^-+|-+$/g, '');
  const routeKey = `/p/${cleanSlug}`;

  const existing = queryOne<{ id: string }>(
    `SELECT id FROM site_pages WHERE site_id = ? AND route_key = ?`,
    [site.id, routeKey]
  );
  if (existing) {
    throw new Error(`الصفحة ذات المسار (${routeKey}) موجودة بالفعل.`);
  }

  const pageId = `page-${siteSlug}-${cleanSlug}-${Date.now().toString(36)}`;
  execute(
    `INSERT INTO site_pages (id, site_id, route_key, layout_variant, status, sort_order, revision, updated_at)
     VALUES (?, ?, ?, ?, ?, (SELECT COALESCE(MAX(sort_order), 0) + 10 FROM site_pages WHERE site_id = ?), 1, CURRENT_TIMESTAMP)`,
    [pageId, site.id, routeKey, data.layoutVariant || 'default', data.status || 'published', site.id]
  );

  // Localized content for Arabic
  execute(
    `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, seo_title, seo_description)
     VALUES (?, ?, 'page', ?, 'ar', ?, ?, ?, ?)`,
    [
      `lc-${pageId}-ar`,
      site.id,
      pageId,
      data.titleAr,
      data.seoDescAr || `صفحة ${data.titleAr} على منصة ${site.name_ar}`,
      data.seoTitleAr || `${data.titleAr} • ${site.name_ar}`,
      data.seoDescAr || ''
    ]
  );

  // Localized content for English
  execute(
    `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, seo_title, seo_description)
     VALUES (?, ?, 'page', ?, 'en', ?, ?, ?, ?)`,
    [
      `lc-${pageId}-en`,
      site.id,
      pageId,
      data.titleEn,
      data.seoDescEn || `${data.titleEn} page on ${site.name_en}`,
      data.seoTitleEn || `${data.titleEn} • ${site.name_en}`,
      data.seoDescEn || ''
    ]
  );

  // Seed default 3 sections for the new custom page so it's ready to customize immediately
  const initialSections = [
    {
      type: 'hero' as const,
      variant: 'default',
      settings: {
        badgeAr: 'صفحة مخصصة',
        badgeEn: 'Special Page',
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        subtitleAr: data.seoDescAr || 'اكتشف كافة التفاصيل والعروض الخاصة الحصرية على منصتنا.',
        subtitleEn: data.seoDescEn || 'Discover exclusive details, specialized scopes, and client benefits.',
        buttonTextAr: 'تواصل معنا الآن',
        buttonTextEn: 'Inquire Now',
        buttonUrl: '#contact',
        styleVariant: 'accent' as const
      }
    },
    {
      type: 'split' as const,
      variant: 'image-right',
      settings: {
        badgeAr: 'تفاصيل المحتوى',
        badgeEn: 'Detailed Scope',
        titleAr: `أهم مميزات ${data.titleAr}`,
        titleEn: `Highlights of ${data.titleEn}`,
        subtitleAr: 'نوفر لك تجربة احترافية متكاملة مصممة لتلبية متطلباتك بأعلى مقاييس الجودة.',
        subtitleEn: 'Engineered to provide unparalleled value and transparent delivery.',
        buttonTextAr: 'طلب استشارة فورية',
        buttonTextEn: 'Book Consultation',
        buttonUrl: '#contact',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        items: [
          { titleAr: 'مرونة كاملة في التخصيص والمواصفات', titleEn: 'Full Flexibility & Customization' },
          { titleAr: 'تنفيذ احترافي من قبل خبراء معتمدين', titleEn: 'Execution by Certified Specialists' },
          { titleAr: 'متابعة مباشرة عبر قنوات التواصل السريعة', titleEn: 'Direct Coordination via WhatsApp' }
        ]
      }
    },
    {
      type: 'cta' as const,
      variant: 'banner',
      settings: {
        badgeAr: 'استفسار مباشر',
        badgeEn: 'Direct Inquiry',
        titleAr: 'هل لديك استفسار محدد حول هذه الصفحة؟',
        titleEn: 'Have Questions Regarding This Scope?',
        subtitleAr: 'تحدث مع فريقنا الفني والمبيعات للحصول على رد فوري ومخصص.',
        subtitleEn: 'Speak with our dedicated team for instant guidance and custom quotation.',
        buttonTextAr: 'مراسلة عبر واتساب',
        buttonTextEn: 'Chat On WhatsApp',
        buttonUrl: 'https://wa.me/201017799042'
      }
    }
  ];

  initialSections.forEach((sec, idx) => {
    execute(
      `INSERT INTO page_sections (id, page_id, section_type, section_variant, settings_json, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [`sec-${pageId}-${idx + 1}`, pageId, sec.type, sec.variant, JSON.stringify(sec.settings), (idx + 1) * 10]
    );
  });

  return { id: pageId, route_key: routeKey };
}

// Update custom page metadata
export function updateCustomPage(pageId: string, data: {
  titleAr?: string;
  titleEn?: string;
  seoTitleAr?: string;
  seoTitleEn?: string;
  seoDescAr?: string;
  seoDescEn?: string;
  status?: 'published' | 'draft';
  layoutVariant?: string;
}) {
  const page = queryOne<{ id: string; site_id: string }>(
    `SELECT id, site_id FROM site_pages WHERE id = ?`,
    [pageId]
  );
  if (!page) throw new Error(`Page not found: ${pageId}`);

  if (data.status || data.layoutVariant) {
    execute(
      `UPDATE site_pages
       SET status = COALESCE(?, status),
           layout_variant = COALESCE(?, layout_variant),
           revision = revision + 1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [data.status, data.layoutVariant, pageId]
    );
  }

  if (data.titleAr || data.seoTitleAr || data.seoDescAr) {
    execute(
      `UPDATE localized_content
       SET title = COALESCE(?, title),
           seo_title = COALESCE(?, seo_title),
           seo_description = COALESCE(?, seo_description)
       WHERE site_id = ? AND owner_type = 'page' AND owner_id = ? AND locale = 'ar'`,
      [data.titleAr, data.seoTitleAr, data.seoDescAr, page.site_id, pageId]
    );
  }

  if (data.titleEn || data.seoTitleEn || data.seoDescEn) {
    execute(
      `UPDATE localized_content
       SET title = COALESCE(?, title),
           seo_title = COALESCE(?, seo_title),
           seo_description = COALESCE(?, seo_description)
       WHERE site_id = ? AND owner_type = 'page' AND owner_id = ? AND locale = 'en'`,
      [data.titleEn, data.seoTitleEn, data.seoDescEn, page.site_id, pageId]
    );
  }

  return true;
}

// Delete custom page
export function deleteCustomPage(pageId: string) {
  const page = queryOne<{ id: string; site_id: string; route_key: string }>(
    `SELECT id, site_id, route_key FROM site_pages WHERE id = ?`,
    [pageId]
  );
  if (!page) throw new Error(`Page not found: ${pageId}`);
  if (page.route_key === '/') {
    throw new Error('لا يمكن حذف الصفحة الرئيسية.');
  }

  execute(`DELETE FROM page_sections WHERE page_id = ?`, [pageId]);
  execute(`DELETE FROM localized_content WHERE site_id = ? AND owner_type = 'page' AND owner_id = ?`, [page.site_id, pageId]);
  execute(`DELETE FROM site_pages WHERE id = ?`, [pageId]);
  return true;
}

// Save all sections for a page (reorder, edit, add, delete)
export function savePageSections(pageId: string, sections: Array<{
  id?: string;
  section_type: CMSSection['section_type'];
  section_variant?: string;
  sort_order: number;
  active: number;
  settings: CMSSectionSettings;
}>) {
  const page = queryOne<{ id: string }>(`SELECT id FROM site_pages WHERE id = ?`, [pageId]);
  if (!page) throw new Error(`Page not found: ${pageId}`);

  // Fetch current section IDs
  const existingSecs = query<{ id: string }>(`SELECT id FROM page_sections WHERE page_id = ?`, [pageId]);
  const incomingIds = new Set(sections.filter(s => s.id).map(s => s.id));

  // Delete removed sections
  for (const es of existingSecs) {
    if (!incomingIds.has(es.id)) {
      execute(`DELETE FROM page_sections WHERE id = ?`, [es.id]);
    }
  }

  // Insert or update incoming sections
  sections.forEach((sec, idx) => {
    const secId = sec.id && !sec.id.startsWith('temp-') ? sec.id : `sec-${pageId}-${Date.now().toString(36)}-${idx}`;
    execute(
      `INSERT OR REPLACE INTO page_sections (id, page_id, section_type, section_variant, settings_json, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        secId,
        pageId,
        sec.section_type,
        sec.section_variant || 'default',
        JSON.stringify(sec.settings),
        (idx + 1) * 10,
        sec.active !== undefined ? sec.active : 1
      ]
    );
  });

  // Touch page revision
  execute(`UPDATE site_pages SET revision = revision + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [pageId]);

  return getPageByRouteKey('', '') // or return updated list
}

// -------------------------------------------------------------
// DOMAIN ITEM CRUD (Sector Inventory: Dishes, Units, Services, etc.)
// -------------------------------------------------------------

export function updateDomainItem(siteSlug: string, itemId: string, data: {
  titleAr?: string;
  titleEn?: string;
  summaryAr?: string;
  summaryEn?: string;
  category?: string;
  priceCents?: number;
  available?: number;
  imageUrl?: string;
  status?: string;
}) {
  const site = queryOne<{ id: string }>(`SELECT id FROM demo_sites WHERE slug = ?`, [siteSlug]);
  if (!site) throw new Error(`Site not found: ${siteSlug}`);

  if (siteSlug === 'restaurant') {
    execute(
      `UPDATE restaurant_dishes
       SET category = COALESCE(?, category),
           price_cents = COALESCE(?, price_cents),
           available = COALESCE(?, available)
       WHERE id = ? AND site_id = ?`,
      [data.category, data.priceCents, data.available, itemId, site.id]
    );
  } else if (siteSlug === 'real-estate') {
    execute(
      `UPDATE property_units
       SET unit_type = COALESCE(?, unit_type),
           price_cents = COALESCE(?, price_cents),
           status = COALESCE(?, status)
       WHERE id = ? AND site_id = ?`,
      [data.category, data.priceCents, data.status, itemId, site.id]
    );
  } else if (siteSlug === 'dental' || siteSlug === 'industrial' || siteSlug === 'ecommerce') {
    execute(
      `UPDATE catalog_items
       SET item_type = COALESCE(?, item_type),
           base_price_cents = COALESCE(?, base_price_cents),
           status = COALESCE(?, status)
       WHERE id = ? AND site_id = ?`,
      [data.category, data.priceCents, data.status, itemId, site.id]
    );
  } else if (siteSlug === 'construction' || siteSlug === 'portfolio') {
    execute(
      `UPDATE example_projects
       SET project_type = COALESCE(?, project_type),
           status = COALESCE(?, status)
       WHERE id = ? AND site_id = ?`,
      [data.category, data.status, itemId, site.id]
    );
  } else if (siteSlug === 'academy') {
    execute(
      `UPDATE academy_courses
       SET track = COALESCE(?, track),
           level = COALESCE(?, level),
           status = COALESCE(?, status)
       WHERE id = ? AND site_id = ?`,
      [data.category, data.category, data.status, itemId, site.id]
    );
  }

  // Update localized title & summary for Arabic
  if (data.titleAr || data.summaryAr) {
    execute(
      `UPDATE localized_content
       SET title = COALESCE(?, title),
           summary = COALESCE(?, summary)
       WHERE site_id = ? AND owner_id = ? AND locale = 'ar'`,
      [data.titleAr, data.summaryAr, site.id, itemId]
    );
  }

  // Update localized title & summary for English
  if (data.titleEn || data.summaryEn) {
    execute(
      `UPDATE localized_content
       SET title = COALESCE(?, title),
           summary = COALESCE(?, summary)
       WHERE site_id = ? AND owner_id = ? AND locale = 'en'`,
      [data.titleEn, data.summaryEn, site.id, itemId]
    );
  }

  return true;
}

export function createDomainItem(siteSlug: string, data: {
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  category: string;
  priceCents?: number;
  imageUrl?: string;
  sku?: string;
}) {
  const site = queryOne<{ id: string }>(`SELECT id FROM demo_sites WHERE slug = ?`, [siteSlug]);
  if (!site) throw new Error(`Site not found: ${siteSlug}`);

  const cleanSlug = (data.titleEn || data.titleAr)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/^-+|-+$/g, '') || `item-${Date.now().toString(36)}`;
  const itemId = `${siteSlug}-${cleanSlug}-${Date.now().toString(36).slice(-4)}`;
  const price = data.priceCents || 0;

  if (siteSlug === 'restaurant') {
    execute(
      `INSERT INTO restaurant_dishes (id, site_id, slug, category, price_cents, allergens_json, attributes_json, available)
       VALUES (?, ?, ?, ?, ?, '[]', '{}', 1)`,
      [itemId, site.id, cleanSlug, data.category || 'mains', price]
    );
    // Localized content
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'restaurant_dish', ?, 'ar', ?, ?, '{}')`,
      [`lc-${itemId}-ar`, site.id, itemId, data.titleAr, data.summaryAr]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'restaurant_dish', ?, 'en', ?, ?, '{}')`,
      [`lc-${itemId}-en`, site.id, itemId, data.titleEn, data.summaryEn]
    );
  } else if (siteSlug === 'real-estate') {
    execute(
      `INSERT INTO property_units (id, site_id, development_id, slug, unit_type, price_cents, area_m2, bedrooms, bathrooms, status, attributes_json)
       VALUES (?, ?, 'dev-meridian-cove', ?, ?, ?, 180, 3, 2, 'available', '{}')`,
      [itemId, site.id, cleanSlug, data.category || 'Apartment', price]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'property_unit', ?, 'ar', ?, ?, '{}')`,
      [`lc-${itemId}-ar`, site.id, itemId, data.titleAr, data.summaryAr]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'property_unit', ?, 'en', ?, ?, '{}')`,
      [`lc-${itemId}-en`, site.id, itemId, data.titleEn, data.summaryEn]
    );
  } else if (siteSlug === 'dental' || siteSlug === 'industrial' || siteSlug === 'ecommerce') {
    execute(
      `INSERT INTO catalog_items (id, site_id, sku, slug, item_type, base_price_cents, currency, status, attributes_json)
       VALUES (?, ?, ?, ?, ?, ?, 'EGP', 'published', '{}')`,
      [itemId, site.id, data.sku || itemId.toUpperCase(), cleanSlug, data.category || 'general', price]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'catalog_item', ?, 'ar', ?, ?, '{}')`,
      [`lc-${itemId}-ar`, site.id, itemId, data.titleAr, data.summaryAr]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'catalog_item', ?, 'en', ?, ?, '{}')`,
      [`lc-${itemId}-en`, site.id, itemId, data.titleEn, data.summaryEn]
    );
  } else if (siteSlug === 'construction' || siteSlug === 'portfolio') {
    execute(
      `INSERT INTO example_projects (id, site_id, slug, project_type, city, area_m2, status, attributes_json)
       VALUES (?, ?, ?, ?, 'القاهرة', 1200, 'published', '{}')`,
      [itemId, site.id, cleanSlug, data.category || 'commercial']
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'example_project', ?, 'ar', ?, ?, '{}')`,
      [`lc-${itemId}-ar`, site.id, itemId, data.titleAr, data.summaryAr]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'example_project', ?, 'en', ?, ?, '{}')`,
      [`lc-${itemId}-en`, site.id, itemId, data.titleEn, data.summaryEn]
    );
  } else if (siteSlug === 'academy') {
    execute(
      `INSERT INTO academy_courses (id, site_id, slug, track, level, duration_weeks, price_cents, status)
       VALUES (?, ?, ?, ?, 'متقدم', 8, ?, 'published')`,
      [itemId, site.id, cleanSlug, data.category || 'Full-Stack', price]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'academy_course', ?, 'ar', ?, ?, '{}')`,
      [`lc-${itemId}-ar`, site.id, itemId, data.titleAr, data.summaryAr]
    );
    execute(
      `INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, title, summary, body_json)
       VALUES (?, ?, 'academy_course', ?, 'en', ?, ?, '{}')`,
      [`lc-${itemId}-en`, site.id, itemId, data.titleEn, data.summaryEn]
    );
  }

  return { id: itemId, slug: cleanSlug };
}

export function deleteDomainItem(siteSlug: string, itemId: string) {
  const site = queryOne<{ id: string }>(`SELECT id FROM demo_sites WHERE slug = ?`, [siteSlug]);
  if (!site) throw new Error(`Site not found: ${siteSlug}`);

  if (siteSlug === 'restaurant') {
    execute(`DELETE FROM restaurant_dishes WHERE id = ? AND site_id = ?`, [itemId, site.id]);
  } else if (siteSlug === 'real-estate') {
    execute(`DELETE FROM property_units WHERE id = ? AND site_id = ?`, [itemId, site.id]);
  } else if (siteSlug === 'dental' || siteSlug === 'industrial' || siteSlug === 'ecommerce') {
    execute(`DELETE FROM catalog_items WHERE id = ? AND site_id = ?`, [itemId, site.id]);
  } else if (siteSlug === 'construction' || siteSlug === 'portfolio') {
    execute(`DELETE FROM example_projects WHERE id = ? AND site_id = ?`, [itemId, site.id]);
  } else if (siteSlug === 'academy') {
    execute(`DELETE FROM academy_courses WHERE id = ? AND site_id = ?`, [itemId, site.id]);
  }

  execute(`DELETE FROM localized_content WHERE site_id = ? AND owner_id = ?`, [site.id, itemId]);
  return true;
}
