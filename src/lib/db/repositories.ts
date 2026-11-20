import crypto from 'node:crypto';
import { query, queryOne, execute } from './index';
import type { Locale } from '../i18n/config';

export interface SiteRecord {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  theme_json: string;
  published: number;
}

export interface LocalizedProject {
  id: string;
  slug: string;
  project_type: string;
  city: string;
  area_m2: number;
  attributes: any;
  title: string;
  summary: string;
  body: any;
  seo_title: string;
  seo_description: string;
}

export interface LocalizedCatalogItem {
  id: string;
  sku: string;
  slug: string;
  item_type: string;
  base_price_cents: number;
  currency: string;
  attributes: any;
  title: string;
  summary: string;
  body: any;
  seo_title: string;
  seo_description: string;
  variants?: any[];
}

export interface LocalizedPropertyUnit {
  id: string;
  development_id: string;
  slug: string;
  unit_type: string;
  price_cents: number;
  area_m2: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  attributes: any;
  title: string;
  summary: string;
  body: any;
}

export interface LocalizedDentalService {
  id: string;
  slug: string;
  category: string;
  base_price_cents: number;
  attributes: any;
  title: string;
  summary: string;
  body: any;
  seo_title?: string;
  seo_description?: string;
}

export interface LocalizedDentalPractitioner {
  id: string;
  slug: string;
  focus: string;
  name: string;
  bio: string;
  details: any;
}

export interface LocalizedPortfolioService {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  scope: string[];
  deliverables: string[];
  timeline: string;
  sampleOutputs: string[];
  idealFor: string;
}

export interface LocalizedRestaurantBranch {
  id: string;
  slug: string;
  name: string;
  district: string;
  address: string;
  hours: string;
  fridayNote: string;
  seating: string;
  capacityTables: number;
  phone: string;
  coverImage: string;
  features: string[];
}

export interface LocalizedDishModifier {
  id: string;
  dish_id: string;
  modifier_group: string;
  label: string;
  price_delta_cents: number;
  available: number;
}

export interface LocalizedDish {
  id: string;
  slug: string;
  category: string;
  price_cents: number;
  allergens: string[];
  attributes: any;
  available: number;
  title: string;
  summary: string;
  body: any;
  modifiers?: LocalizedDishModifier[];
}

export interface LocalizedAcademyInstructor {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  pedagogy: string;
  track: string;
  experienceYears: number;
  courseSlugs: string[];
  fictional: boolean;
}

export interface LocalizedCourse {
  id: string;
  slug: string;
  track: string;
  level: string;
  duration_minutes: number;
  example_price_cents: number;
  title: string;
  summary: string;
  body: any;
  lessons?: any[];
}

export interface LocalizedEditorialPost {
  id: string;
  slug: string;
  category: string;
  published_at: string;
  title: string;
  summary: string;
  body: any;
  seo_title: string;
  seo_description: string;
}

// Sites
export function getSiteBySlug(slug: string): SiteRecord | null {
  return queryOne<SiteRecord>('SELECT * FROM demo_sites WHERE slug = ?', [slug]);
}

export function getAllSites(): SiteRecord[] {
  return query<SiteRecord>('SELECT * FROM demo_sites ORDER BY id ASC');
}

// Projects (Construction / Portfolio)
export function getProjects(siteSlug: string, locale: Locale, filters?: { sector?: string; city?: string }): LocalizedProject[] {
  let sql = `
    SELECT p.id, p.slug, p.project_type, p.city, p.area_m2, p.attributes_json,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM example_projects p
    JOIN demo_sites s ON s.id = p.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'example_project' AND c.owner_id = p.id AND c.locale = ?
    WHERE s.slug = ? AND p.status = 'published'
  `;
  const params: any[] = [locale, siteSlug];

  if (filters?.sector) {
    sql += ` AND p.project_type = ?`;
    params.push(filters.sector);
  }
  if (filters?.city) {
    sql += ` AND p.city = ?`;
    params.push(filters.city);
  }

  sql += ` ORDER BY p.id ASC`;

  const rows = query<any>(sql, params);
  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    project_type: r.project_type,
    city: r.city,
    area_m2: r.area_m2,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  }));
}

export function getProjectBySlug(siteSlug: string, slug: string, locale: Locale): LocalizedProject | null {
  const sql = `
    SELECT p.id, p.slug, p.project_type, p.city, p.area_m2, p.attributes_json,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM example_projects p
    JOIN demo_sites s ON s.id = p.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'example_project' AND c.owner_id = p.id AND c.locale = ?
    WHERE s.slug = ? AND p.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, siteSlug, slug]);
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    project_type: r.project_type,
    city: r.city,
    area_m2: r.area_m2,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  };
}

// Catalog (Industrial / Ecommerce)
export function getCatalogItems(siteSlug: string, locale: Locale, category?: string): LocalizedCatalogItem[] {
  let sql = `
    SELECT i.id, i.sku, i.slug, i.item_type, i.base_price_cents, i.currency, i.attributes_json,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM catalog_items i
    JOIN demo_sites s ON s.id = i.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'catalog_item' AND c.owner_id = i.id AND c.locale = ?
    WHERE s.slug = ? AND i.status = 'published'
  `;
  const params: any[] = [locale, siteSlug];
  if (category) {
    sql += ` AND i.item_type = ?`;
    params.push(category);
  }
  sql += ` ORDER BY i.id ASC`;

  const rows = query<any>(sql, params);
  return rows.map(r => ({
    id: r.id,
    sku: r.sku,
    slug: r.slug,
    item_type: r.item_type,
    base_price_cents: r.base_price_cents,
    currency: r.currency,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  }));
}

export function getCatalogItemBySlug(siteSlug: string, slug: string, locale: Locale): LocalizedCatalogItem | null {
  const sql = `
    SELECT i.id, i.sku, i.slug, i.item_type, i.base_price_cents, i.currency, i.attributes_json,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM catalog_items i
    JOIN demo_sites s ON s.id = i.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'catalog_item' AND c.owner_id = i.id AND c.locale = ?
    WHERE s.slug = ? AND i.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, siteSlug, slug]);
  if (!r) return null;

  const variants = query<any>(
    'SELECT id, code, attributes_json, stock_qty, min_qty, pack_multiple, price_cents FROM catalog_variants WHERE item_id = ? AND active = 1',
    [r.id]
  ).map(v => ({
    ...v,
    attributes: JSON.parse(v.attributes_json || '{}')
  }));

  return {
    id: r.id,
    sku: r.sku,
    slug: r.slug,
    item_type: r.item_type,
    base_price_cents: r.base_price_cents,
    currency: r.currency,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
    variants,
  };
}

export interface LocalizedCollection {
  id: string;
  slug: string;
  sort_order: number;
  name: string;
  description: string;
}

export function getEcommerceCollections(locale: Locale): LocalizedCollection[] {
  const sql = `
    SELECT cat.id, cat.slug, cat.sort_order, c.title, c.summary
    FROM catalog_categories cat
    JOIN demo_sites s ON s.id = cat.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'catalog_category' AND c.owner_id = cat.id AND c.locale = ?
    WHERE s.slug = 'ecommerce'
    ORDER BY cat.sort_order ASC
  `;
  return query<any>(sql, [locale]).map(r => ({
    id: r.id,
    slug: r.slug,
    sort_order: r.sort_order,
    name: r.title || r.slug,
    description: r.summary || ''
  }));
}

export function getEcommerceCollectionBySlug(slug: string, locale: Locale): LocalizedCollection | null {
  const sql = `
    SELECT cat.id, cat.slug, cat.sort_order, c.title, c.summary
    FROM catalog_categories cat
    JOIN demo_sites s ON s.id = cat.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'catalog_category' AND c.owner_id = cat.id AND c.locale = ?
    WHERE s.slug = 'ecommerce' AND cat.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    sort_order: r.sort_order,
    name: r.title || r.slug,
    description: r.summary || ''
  };
}

export function verifyEcommerceCoupon(code: string, subtotalCents: number): { valid: boolean; discountCents: number; message: string } {
  const cleanCode = code.trim().toUpperCase();
  const rule = queryOne<any>(
    "SELECT * FROM demo_pricing_rules WHERE site_id = (SELECT id FROM demo_sites WHERE slug = 'ecommerce') AND code = ?",
    [cleanCode]
  );

  if (!rule) {
    return { valid: false, discountCents: 0, message: 'Invalid promotion code' };
  }

  if (rule.active !== 1) {
    return { valid: false, discountCents: 0, message: 'This promotion code has expired (Demo rule)' };
  }

  const config = JSON.parse(rule.config_json || '{}');
  const subtotalEgp = subtotalCents / 100;

  if (config.min_cart_egp && subtotalEgp < config.min_cart_egp) {
    return {
      valid: false,
      discountCents: 0,
      message: `Minimum order subtotal of ${config.min_cart_egp} EGP required for ${cleanCode}`
    };
  }

  let discountEgp = subtotalEgp * (config.rate || 0.1);
  if (config.cap_egp && discountEgp > config.cap_egp) {
    discountEgp = config.cap_egp;
  }

  return {
    valid: true,
    discountCents: Math.round(discountEgp * 100),
    message: `${Math.round((config.rate || 0.1) * 100)}% discount applied (-${Math.round(discountEgp)} EGP)`
  };
}

// Real Estate Properties
export function getPropertyUnits(locale: Locale, filters?: { type?: string; maxPrice?: number }): LocalizedPropertyUnit[] {
  let sql = `
    SELECT u.id, u.development_id, u.slug, u.unit_type, u.price_cents, u.area_m2, u.bedrooms, u.bathrooms, u.status, u.attributes_json,
           c.title, c.summary, c.body_json
    FROM property_units u
    JOIN demo_sites s ON s.id = u.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'property_unit' AND c.owner_id = u.id AND c.locale = ?
    WHERE s.slug = 'real-estate' AND u.status IN ('available', 'reserved_demo')
  `;
  const params: any[] = [locale];
  if (filters?.type) {
    sql += ` AND u.unit_type = ?`;
    params.push(filters.type);
  }
  if (filters?.maxPrice) {
    sql += ` AND u.price_cents <= ?`;
    params.push(filters.maxPrice * 100);
  }
  sql += ` ORDER BY u.price_cents ASC`;

  const rows = query<any>(sql, params);
  return rows.map(r => ({
    id: r.id,
    development_id: r.development_id,
    slug: r.slug,
    unit_type: r.unit_type,
    price_cents: r.price_cents,
    area_m2: r.area_m2,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    status: r.status,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
  }));
}

export function getPropertyUnitBySlug(slug: string, locale: Locale): LocalizedPropertyUnit | null {
  const sql = `
    SELECT u.id, u.development_id, u.slug, u.unit_type, u.price_cents, u.area_m2, u.bedrooms, u.bathrooms, u.status, u.attributes_json,
           c.title, c.summary, c.body_json
    FROM property_units u
    JOIN demo_sites s ON s.id = u.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'property_unit' AND c.owner_id = u.id AND c.locale = ?
    WHERE s.slug = 'real-estate' AND u.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;
  return {
    id: r.id,
    development_id: r.development_id,
    slug: r.slug,
    unit_type: r.unit_type,
    price_cents: r.price_cents,
    area_m2: r.area_m2,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    status: r.status,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
  };
}

export function getDevelopments(locale: Locale) {
  const sql = `
    SELECT d.id, d.slug, d.city, d.attributes_json, c.title, c.summary, c.body_json
    FROM property_developments d
    JOIN demo_sites s ON s.id = d.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'property_development' AND c.owner_id = d.id AND c.locale = ?
    WHERE s.slug = 'real-estate' AND d.status = 'published'
    ORDER BY d.id ASC
  `;
  return query<any>(sql, [locale]).map(r => ({
    id: r.id,
    slug: r.slug,
    city: r.city,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
  }));
}

export function getDevelopmentBySlug(slug: string, locale: Locale) {
  const sql = `
    SELECT d.id, d.slug, d.city, d.attributes_json, c.title, c.summary, c.body_json
    FROM property_developments d
    JOIN demo_sites s ON s.id = d.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'property_development' AND c.owner_id = d.id AND c.locale = ?
    WHERE s.slug = 'real-estate' AND d.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    city: r.city,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
  };
}

// Dental Practitioners & Services
export function getDentalPractitioners(locale: Locale, focus?: string): LocalizedDentalPractitioner[] {
  let sql = `
    SELECT d.id, d.slug, d.focus, c.title, c.summary, c.body_json
    FROM dental_practitioners d
    JOIN demo_sites s ON s.id = d.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'dental_practitioner' AND c.owner_id = d.id AND c.locale = ?
    WHERE s.slug = 'dental' AND d.status = 'published'
  `;
  const params: any[] = [locale];
  if (focus) {
    sql += ` AND d.focus = ?`;
    params.push(focus);
  }
  return query<any>(sql, params).map(r => ({
    id: r.id,
    slug: r.slug,
    focus: r.focus,
    name: r.title || r.slug,
    bio: r.summary || '',
    details: JSON.parse(r.body_json || '{}')
  }));
}

export function getDentalPractitionerBySlug(slug: string, locale: Locale): LocalizedDentalPractitioner | null {
  const sql = `
    SELECT d.id, d.slug, d.focus, c.title, c.summary, c.body_json
    FROM dental_practitioners d
    JOIN demo_sites s ON s.id = d.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'dental_practitioner' AND c.owner_id = d.id AND c.locale = ?
    WHERE s.slug = 'dental' AND d.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    focus: r.focus,
    name: r.title || r.slug,
    bio: r.summary || '',
    details: JSON.parse(r.body_json || '{}')
  };
}

export function getDentalServices(locale: Locale, category?: string): LocalizedDentalService[] {
  let sql = `
    SELECT i.id, i.slug, i.item_type as category, i.base_price_cents, i.attributes_json,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM catalog_items i
    JOIN demo_sites s ON s.id = i.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'catalog_item' AND c.owner_id = i.id AND c.locale = ?
    WHERE s.slug = 'dental'
  `;
  const params: any[] = [locale];
  if (category && category !== 'all') {
    sql += ` AND i.item_type = ?`;
    params.push(category);
  }
  sql += ` ORDER BY i.slug ASC`;
  return query<any>(sql, params).map(r => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    base_price_cents: r.base_price_cents,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  }));
}

export function getDentalServiceBySlug(slug: string, locale: Locale): LocalizedDentalService | null {
  const sql = `
    SELECT i.id, i.slug, i.item_type as category, i.base_price_cents, i.attributes_json,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM catalog_items i
    JOIN demo_sites s ON s.id = i.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'catalog_item' AND c.owner_id = i.id AND c.locale = ?
    WHERE s.slug = 'dental' AND i.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    category: r.category,
    base_price_cents: r.base_price_cents,
    attributes: JSON.parse(r.attributes_json || '{}'),
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  };
}

export function getDentalLocations(locale: Locale) {
  return [
    {
      id: 'clinic-1',
      slug: 'north',
      name: locale === 'ar' ? 'الفرع الشمالي (استوديو النيل)' : 'North Studio (Nile Terrace)',
      area: locale === 'ar' ? 'الشيخ زايد — الجيزة' : 'Sheikh Zayed, Giza',
      address: locale === 'ar' ? 'مبنى الأعمال الراقي — الطابق الثالث (عنوان توضيحي)' : 'Executive Medical Suites — 3rd Floor (Illustrative)',
      hours: locale === 'ar' ? 'السبت - الخميس: 9:00 ص - 8:00 م' : 'Sat - Thu: 9:00 AM - 8:00 PM',
      phone: '+20 2 0000 0111',
      features: locale === 'ar'
        ? ['غرف علاج عازلة للصوت', 'منطقة استقبال مريحة للأطفال', 'مواقف خاصة وسهولة وصول لذوي الإعاقة']
        : ['Acoustic-calmed treatment suites', 'Dedicated family lounge', 'Full ADA/wheelchair accessibility & parking'],
      note: locale === 'ar' ? 'فرع تجريبي استعراضي خيالي' : 'Simulated demonstration facility'
    },
    {
      id: 'clinic-2',
      slug: 'central',
      name: locale === 'ar' ? 'الفرع المركزي (وسط المدينة)' : 'Central Studio (Downtown Oasis)',
      area: locale === 'ar' ? 'مصر الجديدة — القاهرة' : 'Heliopolis, Cairo',
      address: locale === 'ar' ? 'مجمع الرعاية التخصصي — الطابق الثاني (عنوان توضيحي)' : 'Specialist Care Pavilion — 2nd Floor (Illustrative)',
      hours: locale === 'ar' ? 'يومياً: 10:00 ص - 9:00 م' : 'Daily: 10:00 AM - 9:00 PM',
      phone: '+20 2 0000 0222',
      features: locale === 'ar'
        ? ['جناح الأشعة البانورامية الرقمية ثلاثية الأبعاد', 'محطة استشارة هادئة مخصصة لشرح الخطط', 'إضاءة طبيعية واسترخائية']
        : ['3D digital panoramic imaging wing', 'Quiet private consultation pods', 'Circadian restorative lighting'],
      note: locale === 'ar' ? 'فرع تجريبي استعراضي خيالي' : 'Simulated demonstration facility'
    },
    {
      id: 'clinic-3',
      slug: 'west',
      name: locale === 'ar' ? 'الفرع الغربي (استوديو الزهور)' : 'West Studio (Gardens Pavilion)',
      area: locale === 'ar' ? 'التجمع الخامس — القاهرة الجديدة' : 'New Cairo, 5th Settlement',
      address: locale === 'ar' ? 'بلازا الأعمال الطبية — مبنى ب (عنوان توضيحي)' : 'MedPlaza Business Campus — Bldg B (Illustrative)',
      hours: locale === 'ar' ? 'السبت - الخميس: 10:00 ص - 7:00 م' : 'Sat - Thu: 10:00 AM - 7:00 PM',
      phone: '+20 2 0000 0333',
      features: locale === 'ar'
        ? ['عيادات طب أسنان الأطفال التفاعلية', 'نظام تعقيم رقمي فائق الشفافية', 'فريق دعم متحدث بالعربية والإنجليزية']
        : ['Pediatric interactive treatment suite', 'Medical-grade glass sterilization center', 'Bilingual care coordination'],
      note: locale === 'ar' ? 'فرع تجريبي استعراضي خيالي' : 'Simulated demonstration facility'
    }
  ];
}

// Portfolio Services (Salma Hassan Studio)
export function getPortfolioServices(locale: Locale): LocalizedPortfolioService[] {
  const isAr = locale === 'ar';
  return [
    {
      id: 'port-svc-1',
      slug: 'brand-identity',
      name: isAr ? 'أنظمة الهوية البصرية المتكاملة' : 'Comprehensive Brand Identity Systems',
      headline: isAr ? 'بناء لغة بصرية مميزة تتجاوز مجرد الشعار' : 'Building distinctive visual vernacular beyond logos',
      description: isAr
        ? 'تصميم متكامل لهوية العلامة يشمل النمط الطباعي، ولوحات الألوان المتقاطعة، وأنظمة الشبكات، وتطبيقات الهوية عبر كافة نقاط التماس المادية والرقمية.'
        : 'Holistic brand design encompassing custom typography hierarchy, dimensional color spaces, grid systems, and multi-surface collateral touchpoints.',
      scope: isAr ? ['تحليل التموضع والمنافسين', 'تطوير الهوية والطباعة', 'دليل المعايير البصرية الكامل'] : ['Competitive audit & visual positioning', 'Typography & asset crafting', 'Comprehensive brand guidelines'],
      deliverables: isAr ? ['ملفات الشعار والرموز المتجهة', 'أنظمة الخطوط المخصصة', 'كتاب الإرشادات المعياري (100+ صفحة)'] : ['Vector master marks & emblems', 'Custom type pairings & tokens', '100+ page design system manual'],
      timeline: isAr ? '6 إلى 8 أسابيع' : '6–8 weeks',
      sampleOutputs: isAr ? ['ملف هوية كامل', 'أصول وسائط متعددة'] : ['Master identity kit', 'Digital & physical templates'],
      idealFor: isAr ? 'الشركات الناشئة في مرحلة النمو والعلامات التراثية التي تعيد ابتكار نفسها' : 'Growth-stage ventures and heritage brands executing deliberate transformation'
    },
    {
      id: 'port-svc-2',
      slug: 'digital-experience',
      name: isAr ? 'تصميم المنصات الرقمية والتجارب التحريرية' : 'Digital Platforms & Editorial Web UX',
      headline: isAr ? 'واجهات مستخدم تجمع بين الدقة السويسرية وسلاسة التفاعل' : 'User interfaces combining Swiss discipline with fluid interactions',
      description: isAr
        ? 'تصميم وبناء تجارب ويب وتطبيقات رقمية تركز على الوضوح وسرعة الأداء وتكامل الخطوط والألوان في تناغم يرفع ثقة العميل.'
        : 'Engineering web platforms and digital editorial experiences that champion structural clarity, typography-first pacing, and conversion-focused elegance.',
      scope: isAr ? ['هندسة المعلومات وسيناريوهات الاستخدام', 'تصميم واجهات المستخدم عالية الدقة', 'بروتوكولات الحركة وتجربة التفاعل'] : ['Information architecture & user journeys', 'High-fidelity responsive UI', 'Micro-interaction & motion choreography'],
      deliverables: isAr ? ['ملفات Figma متكاملة بالمكونات', 'نماذج تفاعلية حية', 'مواصفات التسليم الهندسي للمطورين'] : ['Figma master system with auto-layout', 'Interactive prototypes', 'Complete developer handoff spec'],
      timeline: isAr ? '8 إلى 12 أسبوعاً' : '8–12 weeks',
      sampleOutputs: isAr ? ['موقع ويب تجاري كامل', 'نظام تفاعل رقمي'] : ['Production-ready web platform UI', 'Component interaction tokens'],
      idealFor: isAr ? 'الشركات التقنية والمنصات الاستشارية والمجلات الرقمية الراقية' : 'Technology companies, consultancy firms, and premium digital publications'
    },
    {
      id: 'port-svc-3',
      slug: 'creative-direction',
      name: isAr ? 'الإدارة الإبداعية وتوجيه الحملات' : 'Creative Direction & Campaign Conception',
      headline: isAr ? 'رؤية بصرية موحدة للحملات والمحتوى التحريري' : 'Unified visual authority for campaigns and brand communications',
      description: isAr
        ? 'توجيه فني واستراتيجي للمشاريع الكبرى، يشمل الإشراف على التصوير الفوتوغرافي، وتوجيه كتابة المحتوى، وبناء روح الحملات الموسمية.'
        : 'Strategic artistic direction guiding high-stakes brand moments, editorial photography curation, voice calibration, and seasonal campaigns.',
      scope: isAr ? ['صياغة المفهوم الإبداعي للحملة', 'توجيه جلسات التصوير والمودبورد', 'الإشراف على التنفيذ والإنتاج النهائي'] : ['Campaign conceptualization & moodboards', 'Art directing photography sessions', 'Production quality supervision'],
      deliverables: isAr ? ['وثيقة التوجيه الإبداعي الشاملة', 'دليل أسلوب التصوير والإضاءة', 'أصول الحملة المعتمدة'] : ['Comprehensive creative brief', 'Photography & lighting visual deck', 'Approved cross-media campaign assets'],
      timeline: isAr ? '4 إلى 6 أسابيع' : '4–6 weeks',
      sampleOutputs: isAr ? ['حملة بصرية متكاملة', 'مكتبة أصول موجهة'] : ['Seasonal campaign asset library', 'Art-directed lookbook'],
      idealFor: isAr ? 'دور الأزياء والمنتجات الفاخرة والمؤسسات الثقافية' : 'Fashion houses, luxury consumer goods, and cultural institutions'
    },
    {
      id: 'port-svc-4',
      slug: 'design-systems',
      name: isAr ? 'أنظمة التصميم المعيارية ورموز التفاعل' : 'Modular Design Systems & Token Architecture',
      headline: isAr ? 'توحيد اللغة التصميمية بين المصممين وفرق التطوير' : 'Bridging design and engineering with rigorous token systems',
      description: isAr
        ? 'بناء منظومة تصميم شاملة (Design System) تعتمد على الرموز الرقمية (Design Tokens) وتوفر كفاءة إنتاجية مضاعفة للمنتجات البرمجية المتعددة.'
        : 'Architecting scalable modular design systems leveraging design tokens, ensuring visual consistency and 3x development velocity across multi-platform products.',
      scope: isAr ? ['تدقيق المكونات الحالية', 'هيكلة الرموز والألوان والمسافات', 'مكتبة المكونات المشتركة في Figma وCode'] : ['UI component audit & debt cleanup', 'Token taxonomy (color, type, spacing)', 'Shared Figma/code atomic component suite'],
      deliverables: isAr ? ['مكتبة مكونات ذكية', 'دليل التوثيق التفاعلي', 'توصيف Tokens للـ Tailwind وCSS'] : ['Figma component library with variants', 'Living documentation portal', 'Tailwind / CSS design token config'],
      timeline: isAr ? '6 إلى 10 أسابيع' : '6–10 weeks',
      sampleOutputs: isAr ? ['نظام تصميم متكامل', 'ملف التوثيق البرمجي'] : ['Enterprise design system', 'Token integration documentation'],
      idealFor: isAr ? 'الفرق الهندسية والمؤسسات ذات المنتجات الرقمية المتشعبة' : 'Product teams scaling complex web apps and enterprise interfaces'
    },
    {
      id: 'port-svc-5',
      slug: 'packaging-editorial',
      name: isAr ? 'تصميم المطبوعات والتغليف الفاخر' : 'Tactile Packaging & Editorial Print',
      headline: isAr ? 'تجارب ملموسة تعبر عن القيمة الحقيقية للمنتج' : 'Sensory physical packaging that commands tactile reverence',
      description: isAr
        ? 'تصميم عبوات المنتجات، والكتب التحريرية، والمواد المطبوعة الفاخرة مع دراسة دقيقة لأنواع الورق وتقنيات الطباعة والتشطيبات الخاصة.'
        : 'Crafting packaging hierarchies, hardcover monographs, and print ephemera with meticulous paper stock curation and bespoke finishing techniques.',
      scope: isAr ? ['دراسة هياكل العبوات وقوالب القص', 'اختيار الخامات والتشطيبات الخاصة', 'التجهيز الطباعي المتقن وفحص الألوان'] : ['Structural dieline & carton engineering', 'Paper stock & foil curation', 'Pre-press proofing & color calibration'],
      deliverables: isAr ? ['قوالب القص Dielines الجاهزة للإنتاج', 'مواصفات الطباعة الدقيقة', 'نماذج ثلاثية الأبعاد 3D للمحاكاة'] : ['Production-ready vector dielines', 'Print finish specification sheet', 'High-res 3D packaging renders'],
      timeline: isAr ? '5 إلى 7 أسابيع' : '5–7 weeks',
      sampleOutputs: isAr ? ['مجموعة عبوات منتجات', 'كتاب تحريري فاخر'] : ['Full packaging suite', 'Hardcover exhibition monograph'],
      idealFor: isAr ? 'العلامات التجارية الفاخرة ومستحضرات العناية والمنتجات الحرفية' : 'Luxury lifestyle brands, niche perfumery, and artisanal producers'
    },
    {
      id: 'port-svc-6',
      slug: 'brand-strategy',
      name: isAr ? 'استراتيجية العلامة وصياغة السرد' : 'Brand Positioning & Narrative Architecture',
      headline: isAr ? 'تحديد الصوت الفريد والموقع التنافسي غير القابل للنسخ' : 'Carving unassailable strategic territory and authoritative tone',
      description: isAr
        ? 'بحث استراتيجي عميق يحدد رسالة العلامة، ومبرر وجودها، ونبرة صوتها، والسرد القصصي الذي يجعلها الخيار الأول لدى جمهورها المستهدف.'
        : 'In-depth strategic immersion identifying brand purpose, audience mental models, differentiation pillars, and tone of voice architecture.',
      scope: isAr ? ['ورش عمل استراتيجية مع الإدارة', 'صياغة أعمدة التموضع السردي', 'دليل نبرة الصوت والكتابة'] : ['Stakeholder discovery intensive', 'Core positioning matrix development', 'Tone of voice & messaging framework'],
      deliverables: isAr ? ['وثيقة الاستراتيجية المركزية', 'دليل الصياغة ونبرة الحديث', 'بيان التموضع التنافسي'] : ['Master brand strategy playbook', 'Messaging matrix by audience segment', 'Internal brand manifesto'],
      timeline: isAr ? '3 إلى 5 أسابيع' : '3–5 weeks',
      sampleOutputs: isAr ? ['كتيب الاستراتيجية المعتمد', 'رسائل العلامة الأساسية'] : ['Brand positioning document', 'Tone of voice guide'],
      idealFor: isAr ? 'القيادات التنفيذية والمؤسسين قبل إطلاق استثمارات جديدة' : 'Founders and C-suite leaders prior to major capital rounds or rebranding'
    },
    {
      id: 'port-svc-7',
      slug: 'advisory-retainer',
      name: isAr ? 'الاستشارة الإبداعية التوجيهية للقيادات' : 'Executive Design Advisory Retainer',
      headline: isAr ? 'مرافقة استراتيجية مستمرة لضمان التميز البصري والقرارات الصائبة' : 'Ongoing strategic counsel ensuring uncompromised aesthetic integrity',
      description: isAr
        ? 'شراكة شهرية مرنة تتضمن جلسات توجيه مباشرة، ومراجعة مخرجات فرق العمل والوكالات، وضمان بقاء المعايير الإبداعية في أعلى مستوياتها.'
        : 'Dedicated monthly partnership providing high-level design critique, agency review, creative steering, and executive board presentations.',
      scope: isAr ? ['جلسات استشارية نصف شهرية', 'مراجعة وتدقيق أعمال الفرق والوكالات', 'التوجيه في تعيين الكفاءات الإبداعية'] : ['Bi-weekly strategic steering sessions', 'Agency output critique & quality gates', 'Creative talent assessment assistance'],
      deliverables: isAr ? ['تقارير المراجعة والتدقيق النصف شهري', 'قوائم التوصيات الإجرائية المباشرة'] : ['Bi-weekly actionable critique decks', 'Executive strategic recommendations'],
      timeline: isAr ? 'عقود ربع سنوية أو سنوية' : 'Quarterly or annual retainer',
      sampleOutputs: isAr ? ['إشراف مستمر على جودة الهوية'] : ['Sustained creative governance'],
      idealFor: isAr ? 'الشركات الناضجة التي تحتاج خبيراً إبداعياً مرافقاً دون تعيين كامل' : 'Mature enterprises seeking elite fractional design leadership'
    }
  ];
}

export function getPortfolioServiceBySlug(slug: string, locale: Locale): LocalizedPortfolioService | null {
  const services = getPortfolioServices(locale);
  return services.find(s => s.slug === slug) || null;
}

// Restaurant Dishes
export function getRestaurantDishes(locale: Locale, category?: string): LocalizedDish[] {
  let sql = `
    SELECT d.id, d.slug, d.category, d.price_cents, d.allergens_json, d.attributes_json, d.available,
           c.title, c.summary, c.body_json
    FROM restaurant_dishes d
    JOIN demo_sites s ON s.id = d.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'restaurant_dish' AND c.owner_id = d.id AND c.locale = ?
    WHERE s.slug = 'restaurant' AND d.available = 1
  `;
  const params: any[] = [locale];
  if (category) {
    sql += ` AND d.category = ?`;
    params.push(category);
  }
  sql += ` ORDER BY d.id ASC`;

  const rows = query<any>(sql, params);
  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    price_cents: r.price_cents,
    allergens: JSON.parse(r.allergens_json || '[]'),
    attributes: JSON.parse(r.attributes_json || '{}'),
    available: r.available,
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
  }));
}

export function getRestaurantDishBySlug(slug: string, locale: Locale): LocalizedDish | null {
  const sql = `
    SELECT d.id, d.slug, d.category, d.price_cents, d.allergens_json, d.attributes_json, d.available,
           c.title, c.summary, c.body_json
    FROM restaurant_dishes d
    JOIN demo_sites s ON s.id = d.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'restaurant_dish' AND c.owner_id = d.id AND c.locale = ?
    WHERE s.slug = 'restaurant' AND d.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;

  const modLabelCol = locale === 'ar' ? 'label_ar' : 'label_en';
  const modsSql = `
    SELECT id, dish_id, modifier_group, ${modLabelCol} AS label, price_delta_cents, available
    FROM dish_modifiers
    WHERE dish_id = ? AND available = 1
    ORDER BY price_delta_cents ASC
  `;
  const modifiers = query<LocalizedDishModifier>(modsSql, [r.id]);

  return {
    id: r.id,
    slug: r.slug,
    category: r.category,
    price_cents: r.price_cents,
    allergens: JSON.parse(r.allergens_json || '[]'),
    attributes: JSON.parse(r.attributes_json || '{}'),
    available: r.available,
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    modifiers,
  };
}

export function getRestaurantBranches(locale: Locale): LocalizedRestaurantBranch[] {
  const isAr = locale === 'ar';
  return [
    {
      id: 'rest-branch-1',
      slug: 'branch-1',
      name: isAr ? 'فرع جاردن سيتي والحديقة' : 'Garden Pavilion Branch',
      district: isAr ? 'الزمالك' : 'Zamalek',
      address: isAr ? '١٤ شارع شجرة الدر، الزمالك، القاهرة' : '14 Shagaret El Dorr St, Zamalek, Cairo',
      hours: isAr ? 'السبت - الخميس: ١١:٠٠ ص - ١١:٠٠ م | الجمعة: ١:٠٠ م - ١٢:٠٠ منتصف الليل' : 'Sat - Thu: 11:00 AM - 11:00 PM | Fri: 1:00 PM - 12:00 Midnight',
      fridayNote: isAr ? 'يفتح بعد صلاة الجمعة الساعة ١:٠٠ ظهرًا' : 'Opens after Friday prayer at 1:00 PM',
      seating: isAr ? 'فناء خارجي مشجر + صالة داخلية عائلية' : 'Shaded botanical courtyard + intimate dining room',
      capacityTables: 18,
      phone: '+20 2 2736 0000',
      coverImage: '/images/restaurant-branch-1.jpg',
      features: isAr ? ['خدمة صف السيارات (فاليه)', 'مدافيء فناء شتوية', 'جلسات عائلية هادئة', 'قائمة حلال معتمدة'] : ['Valet Parking Service', 'Outdoor Courtyard Heaters', 'Quiet Family Salons', 'Certified Halal Kitchen']
    },
    {
      id: 'rest-branch-2',
      slug: 'branch-2',
      name: isAr ? 'فرع تراس الكورنيش' : 'Corniche Terrace Branch',
      district: isAr ? 'كورنيش المعادي' : 'Maadi Corniche',
      address: isAr ? '٧٨ طريق كورنيش النيل، المعادي، القاهرة' : '78 Nile Corniche Rd, Maadi, Cairo',
      hours: isAr ? 'السبت - الخميس: ١٢:٠٠ ظهرًا - ١٢:٠٠ منتصف الليل | الجمعة: ١:٠٠ م - ١:٠٠ ص' : 'Sat - Thu: 12:00 PM - 12:00 Midnight | Fri: 1:00 PM - 1:00 AM',
      fridayNote: isAr ? 'جلسات الغروب تبدأ من الساعة ٥:٠٠ مساءً' : 'Sunset dining window commences at 5:00 PM',
      seating: isAr ? 'تراس مفتوح بإطلالة نيلية كاملة + صالة مكيفة' : 'Open terrace with panoramic Nile views + climate-controlled lounge',
      capacityTables: 24,
      phone: '+20 2 2525 0000',
      coverImage: '/images/restaurant-branch-2.jpg',
      features: isAr ? ['إطلالة نيلية ساحرة', 'أولوية حجوزات الغروب', 'صالون خاص للمناسبات', 'مداخل مجهزة للكراسي المتحركة'] : ['Panoramic Nile View', 'Sunset Table Priority', 'Dedicated Event Salon', 'Accessible Ramps']
    },
    {
      id: 'rest-branch-3',
      slug: 'branch-3',
      name: isAr ? 'فرع وسط البلد العريق' : 'Historic Downtown Branch',
      district: isAr ? 'وسط البلد' : 'Downtown Cairo',
      address: isAr ? '٢٢ شارع طلعت حرب، وسط البلد، القاهرة' : '22 Talaat Harb St, Downtown, Cairo',
      hours: isAr ? 'السبت - الخميس: ١١:٠٠ ص - ١١:٠٠ م | الجمعة: ١:٠٠ م - ١١:٠٠ م' : 'Sat - Thu: 11:00 AM - 11:00 PM | Fri: 1:00 PM - 11:00 PM',
      fridayNote: isAr ? 'مواعيد الجمعة الاعتيادية من ١:٠٠ م' : 'Friday regular schedule starting at 1:00 PM',
      seating: isAr ? 'أقواس كلاسيكية شاهقة + غرف طعام خاصة للمجموعات' : 'High-vaulted heritage arches + private group dining salons',
      capacityTables: 20,
      phone: '+20 2 2392 0000',
      coverImage: '/images/restaurant-branch-3.jpg',
      features: isAr ? ['عمارة تراثية من طراز ١٩٢٨', 'قائمة غداء عمل سريعة', 'ديكور آرت ديكو تاريخي', 'قريب من محطة المترو'] : ['Heritage Architecture (1928)', 'Speedy Business Lunch', 'Art Deco Interior', 'Metro Proximity']
    }
  ];
}

export function getRestaurantBranchBySlug(slug: string, locale: Locale): LocalizedRestaurantBranch | null {
  const branches = getRestaurantBranches(locale);
  return branches.find(b => b.slug === slug || b.id === slug) || null;
}

export function getRestaurantTimeSlots(branchId?: string): any[] {
  let sql = `
    SELECT id, site_id, owner_type, owner_id, starts_at, capacity, status
    FROM demo_time_slots
    WHERE site_id = 'site-restaurant'
  `;
  const params: any[] = [];
  if (branchId) {
    sql += ` AND owner_id = ?`;
    params.push(branchId);
  }
  sql += ` ORDER BY starts_at ASC`;
  return query<any>(sql, params);
}

export function verifyRestaurantSlotAvailable(slotId: string): boolean {
  const sql = `
    SELECT status
    FROM demo_time_slots
    WHERE site_id = 'site-restaurant' AND id = ?
  `;
  const row = queryOne<{ status: string }>(sql, [slotId]);
  if (!row) return true; // If slot not strictly tracked by ID, default allow
  return row.status === 'available';
}

// Academy Courses & Lessons
export function getAcademyCourses(locale: Locale): LocalizedCourse[] {
  const sql = `
    SELECT co.id, co.slug, co.track, co.level, co.duration_minutes, co.example_price_cents,
           c.title, c.summary, c.body_json
    FROM academy_courses co
    JOIN demo_sites s ON s.id = co.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'academy_course' AND c.owner_id = co.id AND c.locale = ?
    WHERE s.slug = 'academy' AND co.status = 'published'
  `;
  return query<any>(sql, [locale]).map(r => ({
    id: r.id,
    slug: r.slug,
    track: r.track,
    level: r.level,
    duration_minutes: r.duration_minutes,
    example_price_cents: r.example_price_cents,
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
  }));
}

export function getAcademyCourseBySlug(slug: string, locale: Locale): LocalizedCourse | null {
  const sql = `
    SELECT co.id, co.slug, co.track, co.level, co.duration_minutes, co.example_price_cents,
           c.title, c.summary, c.body_json
    FROM academy_courses co
    JOIN demo_sites s ON s.id = co.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'academy_course' AND c.owner_id = co.id AND c.locale = ?
    WHERE s.slug = 'academy' AND co.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, slug]);
  if (!r) return null;

  const lessons = query<any>(
    'SELECT id, slug, module_index, lesson_index, minutes, content_json FROM academy_lessons WHERE course_id = ? ORDER BY module_index, lesson_index ASC',
    [r.id]
  ).map(l => ({
    ...l,
    content: JSON.parse(l.content_json || '{}')
  }));

  return {
    id: r.id,
    slug: r.slug,
    track: r.track,
    level: r.level,
    duration_minutes: r.duration_minutes,
    example_price_cents: r.example_price_cents,
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    lessons,
  };
}

export function getAcademyLesson(courseSlug: string, lessonSlug: string) {
  const sql = `
    SELECT l.id, l.slug, l.module_index, l.lesson_index, l.minutes, l.content_json, co.id as course_id, co.slug as course_slug
    FROM academy_lessons l
    JOIN academy_courses co ON co.id = l.course_id
    WHERE co.slug = ? AND l.slug = ?
  `;
  const r = queryOne<any>(sql, [courseSlug, lessonSlug]);
  if (!r) return null;

  const questions = query<any>(
    'SELECT id, prompt_json, answers_json, correct_index, explanation_json FROM academy_quiz_questions WHERE lesson_id = ? ORDER BY sort_order ASC',
    [r.id]
  ).map(q => ({
    id: q.id,
    prompt: JSON.parse(q.prompt_json || '{}'),
    answers: JSON.parse(q.answers_json || '{}'),
    correct_index: q.correct_index,
    explanation: JSON.parse(q.explanation_json || '{}'),
  }));

  return {
    id: r.id,
    slug: r.slug,
    courseSlug: r.course_slug,
    moduleIndex: r.module_index,
    lessonIndex: r.lesson_index,
    minutes: r.minutes,
    content: JSON.parse(r.content_json || '{}'),
    questions,
  };
}

export function getAcademyLessonBySlug(lessonSlug: string) {
  const sql = `
    SELECT l.id, l.slug, l.module_index, l.lesson_index, l.minutes, l.content_json, co.id as course_id, co.slug as course_slug
    FROM academy_lessons l
    JOIN academy_courses co ON co.id = l.course_id
    WHERE l.slug = ?
  `;
  const r = queryOne<any>(sql, [lessonSlug]);
  if (!r) return null;

  const questions = query<any>(
    'SELECT id, prompt_json, answers_json, correct_index, explanation_json FROM academy_quiz_questions WHERE lesson_id = ? ORDER BY sort_order ASC',
    [r.id]
  ).map(q => ({
    id: q.id,
    prompt: JSON.parse(q.prompt_json || '{}'),
    answers: JSON.parse(q.answers_json || '{}'),
    correct_index: q.correct_index,
    explanation: JSON.parse(q.explanation_json || '{}'),
  }));

  return {
    id: r.id,
    slug: r.slug,
    courseSlug: r.course_slug,
    moduleIndex: r.module_index,
    lessonIndex: r.lesson_index,
    minutes: r.minutes,
    content: JSON.parse(r.content_json || '{}'),
    questions,
  };
}

export function getAcademyInstructors(locale: Locale): LocalizedAcademyInstructor[] {
  const isAr = locale === 'ar';
  return [
    {
      id: 'ins-01',
      slug: 'instructor-01',
      name: isAr ? 'د. ليلى سمير' : 'Dr. Laila Samir',
      title: isAr ? 'كبير مهندسي تجربة المستخدم ونظم التصميم' : 'Lead UX Architect & Design Systems Lead',
      bio: isAr
        ? 'أكثر من ١٢ عامًا في قيادة فرق التصميم وتطوير مكتبات المكونات للأنظمة السحابية والشركات الناشئة.'
        : 'Over 12 years leading enterprise product design and scaling modular design token ecosystems.',
      pedagogy: isAr
        ? 'التركيز على التصميم المعياري المبني على أبحاث المستخدم واختبارات الجاهزية بدلاً من الجماليات السطحية.'
        : 'Emphasizing research-driven atomic tokens and WCAG compliance over subjective decoration.',
      track: 'design',
      experienceYears: 12,
      courseSlugs: ['course-04', 'course-05'],
      fictional: true
    },
    {
      id: 'ins-02',
      slug: 'instructor-02',
      name: isAr ? 'م. طارق منصور' : 'Eng. Tariq Mansour',
      title: isAr ? 'مهندس معماري أول للأنظمة السحابية الموزعة' : 'Principal Distributed Cloud Systems Engineer',
      bio: isAr
        ? 'خبير في معمارية المايكروسيرفيس وبناء الأنظمة عالية الموثوقية بالاعتماد على Go و Kubernetes.'
        : 'Expert in resilient microservices, distributed telemetry, and Kubernetes clusters under high scale.',
      pedagogy: isAr
        ? 'بناء بيئات عمل واقعية ومحاكاة انقطاعات الشبكة والأعطال لتدريب المهندسين على الصمود الإنتاجي.'
        : 'Hands-on chaos engineering and production failure simulation to forge instinctive architectural grit.',
      track: 'development',
      experienceYears: 14,
      courseSlugs: ['course-09', 'course-10'],
      fictional: true
    },
    {
      id: 'ins-03',
      slug: 'instructor-03',
      name: isAr ? 'يوسف الحسيني' : 'Youssef El-Husseini',
      title: isAr ? 'مدير استراتيجيات نمو الأعمال والتسويق الرقمي' : 'Head of Growth Marketing & Funnel Optimization',
      bio: isAr
        ? 'قاد استراتيجيات الاستحواذ والاحتفاظ لأكثر من ٢٠ شركة رقمية مع التركيز على نمذجة العائد والتخصيص.'
        : 'Orchestrated customer acquisition and retention economics for over 20 venture-backed digital products.',
      pedagogy: isAr
        ? 'دمج التحليل الرياضي الصارم مع الفهم العميق لعلم النفس السلوكي للعميل في مسارات التحويل.'
        : 'Fusing statistical rigor with cognitive behavioral principles to systematically eliminate conversion leaks.',
      track: 'marketing',
      experienceYears: 10,
      courseSlugs: ['course-06', 'course-08'],
      fictional: true
    },
    {
      id: 'ins-04',
      slug: 'instructor-04',
      name: isAr ? 'د. عمر خلدون' : 'Dr. Omar Khaldoun',
      title: isAr ? 'كبير علماء البيانات وباحث في الذكاء الاصطناعي' : 'Lead Data Scientist & Applied AI Researcher',
      bio: isAr
        ? 'دكتوراه في التعلم الإحصائي وخبرة عملية في نشر نماذج التنبؤ بالشركات المالية والتكنولوجية الكبرى.'
        : 'PhD in statistical learning with deep production experience deploying predictive models in fintech.',
      pedagogy: isAr
        ? 'تجريد المعادلات الرياضية الصعبة وتطبيقها فورًا في شيفرات بايثون واضحة وقابلة للتطوير.'
        : 'Demystifying complex linear algebra and statistics through immediate, test-driven Python labs.',
      track: 'data',
      experienceYears: 11,
      courseSlugs: ['course-01', 'course-02'],
      fictional: true
    },
    {
      id: 'ins-05',
      slug: 'instructor-05',
      name: isAr ? 'نورهان عادل' : 'Nourhan Adel',
      title: isAr ? 'أخصائية أبحاث وتفاعل المستخدم للمنتجات الرقمية' : 'Interaction Designer & User Research Specialist',
      bio: isAr
        ? 'أجرت مئات جلسات المقابلات الميدانية واختبارات القابلية للمستخدمين عبر منطقة الشرق الأوسط.'
        : 'Conducted hundreds of generative field interviews and enterprise usability evaluations across MENA.',
      pedagogy: isAr
        ? 'تدريب المتعلم على فن الاستماع النشط وملاحظة السلوكيات الصامتة التي تكشف المشاكل الحقيقية.'
        : 'Coaching active observation to uncover unspoken frictions rather than accepting superficial survey responses.',
      track: 'design',
      experienceYears: 9,
      courseSlugs: ['course-04', 'course-05'],
      fictional: true
    },
    {
      id: 'ins-06',
      slug: 'instructor-06',
      name: isAr ? 'كريم زكي' : 'Karim Zaki',
      title: isAr ? 'مهندس برمجيات متكامل وخبير تايب سكريبت ونود' : 'Senior Full-Stack Engineer & TypeScript Specialist',
      bio: isAr
        ? 'مساهم نشط في مكتبات المصدر المفتوح ومتخصص في بناء تطبيقات الويب المتكاملة سريعة الاستجابة.'
        : 'Active open-source contributor specializing in scalable TypeScript systems, Next.js, and Node pipelines.',
      pedagogy: isAr
        ? 'الكتابة الدفاعية للأكواد والتحقق الصارم من صحة البيانات عند حدود النظام لمنع الانهيارات.'
        : 'Defensive type modeling and runtime boundary enforcement to eradicate uncaught edge-case bugs.',
      track: 'development',
      experienceYears: 8,
      courseSlugs: ['course-09', 'course-11'],
      fictional: true
    },
    {
      id: 'ins-07',
      slug: 'instructor-07',
      name: isAr ? 'ميار الجوهري' : 'Mayar El-Gohary',
      title: isAr ? 'استشارية تحليلات رقمية وبناء مؤشرات الأداء' : 'Digital Analytics & Retention Strategist',
      bio: isAr
        ? 'متخصصة في بناء خطط التتبع المعقدة وإعداد لوحات التحكم التنفيذية للشركات سريعة النمو.'
        : 'Specialist in custom telemetry schemas, warehouse data modeling, and executive KPI attribution.',
      pedagogy: isAr
        ? 'ربط كل مقياس تحليلي بقرار استراتيجي قابل للتنفيذ بدلاً من إغراق الفريق في الرسوم البيانية العقيمة.'
        : 'Linking every tracked metric to an actionable operational decision rather than decorative vanity charts.',
      track: 'marketing',
      experienceYears: 9,
      courseSlugs: ['course-07', 'course-08'],
      fictional: true
    },
    {
      id: 'ins-08',
      slug: 'instructor-08',
      name: isAr ? 'شريف بهاء' : 'Sherif Bahaa',
      title: isAr ? 'قائد فريق هندسة البيانات والمنصات التحليلية' : 'Data Platform Engineering Lead',
      bio: isAr
        ? 'بنى خطوط معالجة بيانات تخدم أكثر من ٥٠ مليون حدث يوميًا مع خفض تكاليف الاستعلام السحابي.'
        : 'Engineered high-throughput pipelines handling 50M daily events while optimizing warehouse query compute.',
      pedagogy: isAr
        ? 'التطبيق العملي على مستودعات البيانات الحديثة وSQL المتقدمة مع التركيز على الكفاءة الحسابية.'
        : 'Pragmatic warehouse optimization, partitioned indexing, and cost-aware SQL query authoring.',
      track: 'data',
      experienceYears: 13,
      courseSlugs: ['course-01', 'course-03'],
      fictional: true
    }
  ];
}

export function getAcademyInstructorBySlug(slug: string, locale: Locale): LocalizedAcademyInstructor | null {
  const instructors = getAcademyInstructors(locale);
  return instructors.find(i => i.slug === slug || i.id === slug) || null;
}

export function getAcademyTracks(locale: Locale) {
  const isAr = locale === 'ar';
  return [
    {
      slug: 'data',
      name: isAr ? 'علم البيانات والذكاء الاصطناعي' : 'Data Science & Applied AI',
      headline: isAr ? 'من التحليل الإحصائي إلى نماذج التعلم الآلي الإنتاجية' : 'From statistical foundations to production ML pipelines',
      description: isAr
        ? 'مسار شامل يبدأ بأساسيات استخراج البيانات وتحليلها، مرورًا بمستودعات البيانات وSQL، وصولاً إلى تدريب ونشر نماذج التعلم الآلي.'
        : 'Comprehensive curriculum spanning data wrangling, cloud warehousing, and production machine learning engineering.',
      icon: '📊',
      coursesCount: 3,
      prerequisites: isAr ? 'أساسيات عامة في الرياضيات أو التفكير المنطقي' : 'Basic analytical thinking & math fundamentals'
    },
    {
      slug: 'development',
      name: isAr ? 'هندسة البرمجيات والأنظمة السحابية' : 'Software Engineering & Cloud',
      headline: isAr ? 'بناء تطبيقات قوية وموزعة تصمد في بيئات الإنتاج' : 'High-concurrency systems, TypeScript, and microservices',
      description: isAr
        ? 'يركز هذا المسار على تايب سكريبت الحديثة، معمارية المايكروسيرفيس، الحاويات السحابية، وهندسة الويب المتكاملة مع React و Node.'
        : 'Master modern TypeScript, cloud-native containerized microservices, and resilient full-stack systems.',
      icon: '⚙️',
      coursesCount: 3,
      prerequisites: isAr ? 'معرفة مبدئية بلغات البرمجة وأساسيات الويب' : 'Introductory programming & web concepts'
    },
    {
      slug: 'design',
      name: isAr ? 'هندسة تجربة المستخدم ونظم التصميم' : 'UX Architecture & Design Systems',
      headline: isAr ? 'تصميم واجهات معيارية تحل مشاكل المستخدمين الحقيقية' : 'Scalable design systems, usability research, and tokens',
      description: isAr
        ? 'تعلم بناء نظم التصميم المعيارية، وإجراء أبحاث المستخدم الاستكشافية، واختبارات الجاهزية لدعم المنتجات الرقمية الضخمة.'
        : 'Learn atomic token architecture, generative user research, and iterative usability benchmarking.',
      icon: '🎨',
      coursesCount: 2,
      prerequisites: isAr ? 'شغف بتصميم المنتجات وفهم السلوك البشري' : 'Empathy for users and visual design interest'
    },
    {
      slug: 'marketing',
      name: isAr ? 'استراتيجيات النمو والتسويق الرقمي' : 'Growth Marketing & Funnels',
      headline: isAr ? 'التسويق القائم على الأداء والبيانات لتحقيق نمو مستدام' : 'Performance-driven acquisition, retention, and lifecycle LTV',
      description: isAr
        ? 'مسار يجمع بين تحسين قمع التحويل، واختبارات أ/ب، واستراتيجيات التموضع السوقي، وأتمتة دورة حياة العميل لزيادة القيمة الدائمة.'
        : 'Data-driven funnel diagnostics, statistically rigorous AB testing, and lifecycle retention automation.',
      icon: '📈',
      coursesCount: 3,
      prerequisites: isAr ? 'فهم مبادئ الأعمال وتجربة العملاء' : 'Foundational business & marketing curiosity'
    }
  ];
}

export function saveGuestProgress(
  guestToken: string,
  itemType: 'lesson' | 'quiz',
  itemId: string,
  status: 'in_progress' | 'completed',
  score?: number
) {
  const hash = crypto.createHash('sha256').update(guestToken || 'default-guest').digest('hex');
  const id = `prog_${hash.slice(0, 8)}_${itemType}_${itemId}`;
  const sql = `
    INSERT INTO demo_guest_progress (id, site_id, guest_token_hash, item_type, item_id, status, score, updated_at)
    VALUES (?, 'site-academy', ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(site_id, guest_token_hash, item_type, item_id) DO UPDATE SET
      status = excluded.status,
      score = excluded.score,
      updated_at = CURRENT_TIMESTAMP
  `;
  execute(sql, [id, hash, itemType, itemId, status, score ?? null]);
  return { id, itemType, itemId, status, score };
}

export function getGuestProgress(guestToken: string) {
  const hash = crypto.createHash('sha256').update(guestToken || 'default-guest').digest('hex');
  const sql = `
    SELECT item_type, item_id, status, score, updated_at
    FROM demo_guest_progress
    WHERE site_id = 'site-academy' AND guest_token_hash = ?
  `;
  return query<any>(sql, [hash]);
}

// Editorial Posts (Articles)
export function getEditorialPosts(siteSlug: string, locale: Locale): LocalizedEditorialPost[] {
  const sql = `
    SELECT p.id, p.slug, p.category, p.published_at,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM editorial_posts p
    JOIN demo_sites s ON s.id = p.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'editorial_post' AND c.owner_id = p.id AND c.locale = ?
    WHERE s.slug = ? AND p.status = 'published'
    ORDER BY p.published_at DESC
  `;
  return query<any>(sql, [locale, siteSlug]).map(r => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    published_at: r.published_at,
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  }));
}

export function getEditorialPostBySlug(siteSlug: string, slug: string, locale: Locale): LocalizedEditorialPost | null {
  const sql = `
    SELECT p.id, p.slug, p.category, p.published_at,
           c.title, c.summary, c.body_json, c.seo_title, c.seo_description
    FROM editorial_posts p
    JOIN demo_sites s ON s.id = p.site_id
    LEFT JOIN localized_content c ON c.site_id = s.id AND c.owner_type = 'editorial_post' AND c.owner_id = p.id AND c.locale = ?
    WHERE s.slug = ? AND p.slug = ?
  `;
  const r = queryOne<any>(sql, [locale, siteSlug, slug]);
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    category: r.category,
    published_at: r.published_at,
    title: r.title || r.slug,
    summary: r.summary || '',
    body: JSON.parse(r.body_json || '{}'),
    seo_title: r.seo_title || '',
    seo_description: r.seo_description || '',
  };
}

// Submissions (Persistent SQLite state for quotes, RFQs, viewings, appointments, orders)
export function createSubmission(siteSlug: string, flowType: string, payload: any, lines: any[] = []): { id: string; refNumber: string } {
  const site = getSiteBySlug(siteSlug);
  if (!site) throw new Error(`Site not found: ${siteSlug}`);

  const subId = 'sub_' + crypto.randomUUID();
  const refNumber = `MVX-${siteSlug.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const fullPayload = { ...payload, refNumber, submittedAt: new Date().toISOString() };

  execute(
    `INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json) VALUES (?, ?, ?, 'simulated', ?)`,
    [subId, site.id, flowType, JSON.stringify(fullPayload)]
  );

  for (const line of lines) {
    const lineId = 'line_' + crypto.randomUUID();
    execute(
      `INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, variant_id, quantity, unit_price_cents, modifiers_json, snapshot_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lineId, subId, line.source_type || 'item', line.source_id,
        line.variant_id || null, line.quantity || 1, line.unit_price_cents || 0,
        JSON.stringify(line.modifiers || []), JSON.stringify(line.snapshot || {})
      ]
    );
  }

  return { id: subId, refNumber };
}

export function getSubmissions(siteSlug?: string) {
  let sql = `
    SELECT sub.id, sub.flow_type, sub.status, sub.payload_json, sub.created_at, s.slug as site_slug, s.name_ar, s.name_en
    FROM demo_submissions sub
    JOIN demo_sites s ON s.id = sub.site_id
  `;
  const params: any[] = [];
  if (siteSlug) {
    sql += ` WHERE s.slug = ?`;
    params.push(siteSlug);
  }
  sql += ` ORDER BY sub.created_at DESC`;

  return query<any>(sql, params).map(r => ({
    id: r.id,
    flow_type: r.flow_type,
    status: r.status,
    payload: JSON.parse(r.payload_json || '{}'),
    created_at: r.created_at,
    site_slug: r.site_slug,
    site_name: { ar: r.name_ar, en: r.name_en }
  }));
}

export function getSubmissionById(id: string) {
  const sql = `
    SELECT sub.id, sub.flow_type, sub.status, sub.payload_json, sub.created_at, s.slug as site_slug, s.name_ar, s.name_en
    FROM demo_submissions sub
    JOIN demo_sites s ON s.id = sub.site_id
    WHERE sub.id = ?
  `;
  const sub = queryOne<any>(sql, [id]);
  if (!sub) return null;

  const lines = query<any>(
    'SELECT * FROM demo_submission_lines WHERE submission_id = ?',
    [sub.id]
  ).map(l => ({
    ...l,
    modifiers: JSON.parse(l.modifiers_json || '[]'),
    snapshot: JSON.parse(l.snapshot_json || '{}')
  }));

  return {
    ...sub,
    payload: JSON.parse(sub.payload_json || '{}'),
    lines
  };
}

export function updateSubmissionStatus(id: string, status: string) {
  return execute('UPDATE demo_submissions SET status = ? WHERE id = ?', [status, id]);
}
