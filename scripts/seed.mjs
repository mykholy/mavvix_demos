import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dbPath = process.env.SQLITE_DB_PATH || path.join(rootDir, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');

console.log('Seeding Mavvix Demo Factory database...');

const seedData = JSON.parse(fs.readFileSync(path.join(rootDir, '05_ENGINEERING', 'SEED_DATA.json'), 'utf8'));
const designSystems = JSON.parse(fs.readFileSync(path.join(rootDir, '02_DESIGN', 'DESIGN_SYSTEMS.json'), 'utf8'));

// 1. Seed Admin User
const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
const adminPass = process.env.ADMIN_BOOTSTRAP_PASSWORD;
if (adminEmail && adminPass && adminPass.length >= 16) {
  const passHash = bcrypt.hashSync(adminPass, 12);
  db.prepare("INSERT INTO admin_users (id, email, password_hash, role, active) VALUES ('admin-01', ?, ?, 'owner', 1) ON CONFLICT(email) DO NOTHING")
    .run(adminEmail.toLowerCase().trim(), passHash);
  console.log('✅ Initial admin seeded without resetting existing passwords.');
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('Secure ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD are required for the first production seed.');
} else {
  console.log('No admin seeded; set both ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD.');
}

// 2. Seed Demo Sites
const sites = [
  { slug: 'construction', ar: 'أطلس للبناء والتطوير الهندسي', en: 'Atlas Structures & Contracting' },
  { slug: 'industrial', ar: 'فيرولاين للصناعات والتشكيل المعدني', en: 'Ferroline Industrial Supplies' },
  { slug: 'real-estate', ar: 'ميريديان للتطوير والاستثمار العقاري', en: 'Meridian Residences & Developments' },
  { slug: 'dental', ar: 'لومِن لطب وجراحة الأسنان التخصصية', en: 'Lumen Dental Clinic & Specialists' },
  { slug: 'ecommerce', ar: 'نوريا أتيليه للأزياء والمقتنيات الفاخرة', en: 'Noria Atelier Fashion & Objects' },
  { slug: 'portfolio', ar: 'سلمى حسن — استوديو التصميم المعماري', en: 'Salma Hassan Architecture Studio' },
  { slug: 'restaurant', ar: 'سفرة زعفران — مطبخ شرقي أصيل', en: 'Saffron Table Heritage Dining' },
  { slug: 'academy', ar: 'نوفا للتعلم والتدريب المهني المتقدم', en: 'Nova Learning Academy' },
];

const upsertSite = db.prepare(`
  INSERT INTO demo_sites (id, slug, name_ar, name_en, theme_json, published)
  VALUES (?, ?, ?, ?, ?, 1)
  ON CONFLICT(slug) DO UPDATE SET
    name_ar = excluded.name_ar,
    name_en = excluded.name_en,
    theme_json = excluded.theme_json,
    published = 1;
`);

for (const s of sites) {
  const theme = designSystems[s.slug] || {};
  upsertSite.run(`site-${s.slug}`, s.slug, s.ar, s.en, JSON.stringify(theme));
}
console.log('✅ 8 Demo sites registered and published.');

// Helper to insert localized content
const upsertContent = db.prepare(`
  INSERT INTO localized_content (id, site_id, owner_type, owner_id, locale, slug, title, summary, body_json, seo_title, seo_description)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(site_id, owner_type, owner_id, locale) DO UPDATE SET
    title = excluded.title,
    summary = excluded.summary,
    body_json = excluded.body_json,
    seo_title = excluded.seo_title,
    seo_description = excluded.seo_description;
`);

// Helper to insert editorial posts
const upsertPost = db.prepare(`
  INSERT INTO editorial_posts (id, site_id, slug, category, status, published_at)
  VALUES (?, ?, ?, ?, 'published', CURRENT_TIMESTAMP)
  ON CONFLICT(site_id, slug) DO UPDATE SET
    category = excluded.category,
    status = 'published';
`);

// 3. Seed Construction
console.log('Seeding Construction...');
const constSiteId = 'site-construction';
const upsertProject = db.prepare(`
  INSERT INTO example_projects (id, site_id, slug, project_type, city, area_m2, attributes_json, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'published')
  ON CONFLICT(site_id, slug) DO UPDATE SET
    project_type = excluded.project_type,
    city = excluded.city,
    area_m2 = excluded.area_m2,
    attributes_json = excluded.attributes_json;
`);

for (const p of seedData.construction.projects) {
  const attrs = {
    scope_tags: p.scope_tags,
    decision_points: p.decision_points,
    scope_deliverables: p.scope_deliverables,
    cover_media_id: p.cover_media_id,
    gallery_media_ids: p.gallery_media_ids,
  };
  upsertProject.run(p.id, constSiteId, p.slug, p.sector, p.city_key, p.area_m2, JSON.stringify(attrs));

  upsertContent.run(
    `${p.id}-ar`, constSiteId, 'example_project', p.id, 'ar', p.slug,
    p.name.ar,
    `مشروع ${p.name.ar} بمساحة ${p.area_m2} م² في ${p.location_label}.`,
    JSON.stringify({
      challenge: 'تنظيم حركة المواد والتنفيذ الإنشائي الدقيق ضمن الجدول الزمني الصارم.',
      solution: 'اعتماد منهجية الهندسة القيمية وإدارة التوريد المسبق مع تقليل الهدر الإنشائي.',
      deliverables: p.scope_deliverables,
      decision_points: p.decision_points.map(d => d.ar),
    }),
    `${p.name.ar} | أطلس للبناء`,
    `تفاصيل دراسة تنفيذ ${p.name.ar} من أطلس للبناء.`
  );

  upsertContent.run(
    `${p.id}-en`, constSiteId, 'example_project', p.id, 'en', p.slug,
    p.name.en,
    `${p.name.en} spanning ${p.area_m2} sqm located in ${p.location_label}.`,
    JSON.stringify({
      challenge: 'Managing access routing and rigorous structural execution under strict schedule.',
      solution: 'Implementing value engineering and prefabricated coordination to minimize site disruption.',
      deliverables: p.scope_deliverables,
      decision_points: p.decision_points.map(d => d.en),
    }),
    `${p.name.en} | Atlas Structures`,
    `Case study and structural scope for ${p.name.en} by Atlas Structures.`
  );
}

// Construction Articles
for (const a of seedData.construction.articles) {
  upsertPost.run(a.id, constSiteId, a.slug, 'Engineering Insights');
  upsertContent.run(
    `${a.id}-ar`, constSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    `دليل عملي وتفصيلي حول ${a.title.ar} لفرق الهندسة والمقاولات.`,
    JSON.stringify({
      intro: 'يبدأ نجاح أي مشروع إنشائي كبير بضبط النطاق والتوصيف الهندسي الواقعي قبل توقيع عقود التوريد.',
      sections: [
        { heading: 'أهمية توثيق بنود الأعمال (BOQ)', text: 'تحديد المسؤوليات وجداول الكميات الدقيقة يحمي المالك والمقاول من التكاليف غير المحسوبة أثناء التنفيذ.' },
        { heading: 'إدارة المخاطر وتغير الأسعار', text: 'صياغة بنود التحوط وتحديد البدائل المعتمدة مسبقًا تضمن استمرارية العمل دون توقف.' }
      ],
      conclusion: 'المقاولات الناجحة تعتمد على الشفافية والتوثيق الهندسي الصارم في كل خطوة.'
    }),
    `${a.title.ar} | أطلس`,
    `مقال تخصصي حول ${a.title.ar} من خبراء أطلس للبناء.`
  );

  upsertContent.run(
    `${a.id}-en`, constSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    `Practical guidelines on ${a.title.en} for engineering and procurement teams.`,
    JSON.stringify({
      intro: 'Successful engineering delivery begins with definitive scope breakdown and technical qualification prior to contract signing.',
      sections: [
        { heading: 'The Critical Value of Precise BOQ', text: 'Clear quantity surveys and milestone definitions protect all stakeholders from unplanned budget overruns.' },
        { heading: 'Mitigating Procurement Volatility', text: 'Specifying pre-approved alternative materials prevents costly critical-path delays on site.' }
      ],
      conclusion: 'Disciplined documentation and proactive engineering remain the true pillars of predictable delivery.'
    }),
    `${a.title.en} | Atlas Structures`,
    `Editorial insight on ${a.title.en} by Atlas Structures.`
  );
}

// 4. Seed Industrial (Ferroline)
console.log('Seeding Industrial...');
const indSiteId = 'site-industrial';
const upsertItem = db.prepare(`
  INSERT INTO catalog_items (id, site_id, sku, slug, item_type, base_price_cents, currency, attributes_json, status)
  VALUES (?, ?, ?, ?, ?, ?, 'EGP', ?, 'published')
  ON CONFLICT(site_id, slug) DO UPDATE SET
    sku = excluded.sku,
    item_type = excluded.item_type,
    base_price_cents = excluded.base_price_cents,
    attributes_json = excluded.attributes_json;
`);

const upsertVariant = db.prepare(`
  INSERT INTO catalog_variants (id, item_id, code, attributes_json, stock_qty, min_qty, pack_multiple, price_cents, active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  ON CONFLICT(item_id, code) DO UPDATE SET
    stock_qty = excluded.stock_qty,
    min_qty = excluded.min_qty,
    pack_multiple = excluded.pack_multiple,
    price_cents = excluded.price_cents;
`);

for (const p of seedData.industrial.products) {
  const basePriceCents = (p.minimum_order_qty || 10) * 15000;
  upsertItem.run(p.id, indSiteId, p.sku, p.slug, p.category, basePriceCents, JSON.stringify(p.attributes || {}));

  // Create default variant
  upsertVariant.run(
    `${p.id}-var-01`, p.id, `${p.sku}-STD`,
    JSON.stringify({ material: p.material, grade: p.grade, finish: p.finish, size_mm: p.size_mm }),
    5000, p.minimum_order_qty || 1, p.pack_qty || 1, basePriceCents
  );

  upsertContent.run(
    `${p.id}-ar`, indSiteId, 'catalog_item', p.id, 'ar', p.slug,
    p.name.ar,
    `مواصفات توريد ${p.name.ar} عالي الجودة معتمد للمصانع والمنشآت.`,
    JSON.stringify({
      specs: p.datasheet_fields || {},
      standards: ['DIN EN 10025', 'ASTM A36', 'ISO 9001:2015 compliant test'],
      applications: ['الهياكل الصناعية', 'محطات المعالجة', 'خطوط الإنتاج والتصدير'],
      grade: p.grade,
      material: p.material
    }),
    `${p.name.ar} (SKU: ${p.sku}) | فيرولاين`,
    `طلب تسعير ومواصفات ${p.name.ar} كود ${p.sku} من فيرولاين للصناعات.`
  );

  upsertContent.run(
    `${p.id}-en`, indSiteId, 'catalog_item', p.id, 'en', p.slug,
    p.name.en,
    `Certified industrial supply specifications for ${p.name.en}.`,
    JSON.stringify({
      specs: p.datasheet_fields || {},
      standards: ['DIN EN 10025', 'ASTM A36', 'ISO 9001:2015 compliant test'],
      applications: ['Heavy structures', 'Manufacturing plants', 'Export fabrication'],
      grade: p.grade,
      material: p.material
    }),
    `${p.name.en} (SKU: ${p.sku}) | Ferroline`,
    `Request RFQ and technical datasheet for ${p.name.en} (SKU: ${p.sku}) from Ferroline.`
  );
}

for (const a of seedData.industrial.articles) {
  upsertPost.run(a.id, indSiteId, a.slug, 'Manufacturing & Standards');
  upsertContent.run(
    `${a.id}-ar`, indSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    `دليل فني حول ${a.title.ar} وكيفية فحص شهادات الجودة.`,
    JSON.stringify({
      intro: 'تعتمد كفاءة سلاسل التوريد الصناعية على الالتزام الصارم بالمواصفات القياسية واختبارات الشد والصلابة.',
      sections: [
        { heading: 'معايير اختيار الدرجة المعدنية', text: 'مطابقة درجات الصلب والسبائك للبيئة التشغيلية تضمن مقاومة التآكل والتحمل الميكانيكي المستمر.' }
      ]
    }),
    `${a.title.ar} | فيرولاين`,
    `مقال صناعي تخصصي حول ${a.title.ar}.`
  );
  upsertContent.run(
    `${a.id}-en`, indSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    `Technical dossier on ${a.title.en} and quality certification testing.`,
    JSON.stringify({
      intro: 'Industrial supply chain integrity relies on strict compliance with metallurgical grades and mechanical testing.',
      sections: [
        { heading: 'Specifying the Correct Material Grade', text: 'Matching alloy compositions to environmental conditions prevents premature fatigue and corrosive degradation.' }
      ]
    }),
    `${a.title.en} | Ferroline`,
    `Industrial technical publication on ${a.title.en}.`
  );
}

// 5. Seed Real Estate (Meridian)
console.log('Seeding Real Estate...');
const reSiteId = 'site-real-estate';
const upsertDev = db.prepare(`
  INSERT INTO property_developments (id, site_id, slug, city, attributes_json, status)
  VALUES (?, ?, ?, ?, ?, 'published')
  ON CONFLICT(site_id, slug) DO UPDATE SET
    city = excluded.city,
    attributes_json = excluded.attributes_json;
`);

for (const d of seedData['real-estate'].developments) {
  upsertDev.run(d.id, reSiteId, d.slug, d.city_key || 'cairo', JSON.stringify({ amenities: d.amenities_sample || [] }));
  upsertContent.run(
    `${d.id}-ar`, reSiteId, 'property_development', d.id, 'ar', d.slug,
    d.name.ar,
    `مشروع ${d.name.ar} السكني الفاخر في موقع استراتيجي مختار بعناية.`,
    JSON.stringify({ location: 'القاهرة الجديدة', handover: '2027', units_count: 120 }),
    `${d.name.ar} | ميريديان العقارية`,
    `اكتشف مجمع ${d.name.ar} السكني الراقي.`
  );
  upsertContent.run(
    `${d.id}-en`, reSiteId, 'property_development', d.id, 'en', d.slug,
    d.name.en,
    `Exclusive residential community ${d.name.en} in a prime strategic location.`,
    JSON.stringify({ location: 'New Cairo', handover: '2027', units_count: 120 }),
    `${d.name.en} | Meridian Residences`,
    `Explore luxury residences at ${d.name.en}.`
  );
}

const upsertUnit = db.prepare(`
  INSERT INTO property_units (id, site_id, development_id, slug, unit_type, price_cents, area_m2, bedrooms, bathrooms, status, attributes_json)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(site_id, slug) DO UPDATE SET
    price_cents = excluded.price_cents,
    area_m2 = excluded.area_m2,
    bedrooms = excluded.bedrooms,
    bathrooms = excluded.bathrooms,
    status = excluded.status,
    attributes_json = excluded.attributes_json;
`);

for (const u of seedData['real-estate'].properties) {
  const priceCents = (u.price_egp || 5000000) * 100;
  const status = u.availability === 'available' ? 'available' : 'reserved_demo';
  upsertUnit.run(
    u.id, reSiteId, u.development_id, u.slug, u.property_type, priceCents,
    u.area_m2, u.bedrooms || 0, u.bathrooms || 0, status,
    JSON.stringify({ amenities: u.amenities || [], floor: u.floor, finishing: u.finishing, gallery: u.gallery_media_ids })
  );

  upsertContent.run(
    `${u.id}-ar`, reSiteId, 'property_unit', u.id, 'ar', u.slug,
    u.name.ar,
    `وحدة ${u.name.ar} بمساحة ${u.area_m2} م² وتصميم داخلي راقٍ.`,
    JSON.stringify({ view: 'حدائق ومساحات مفتوحة', payment_plan: '10% مقدم وتقسيط حتى 7 سنوات' }),
    `${u.name.ar} | ميريديان`,
    `تفاصيل وحدة ${u.name.ar} وحجز موعد معاينة تجريبي.`
  );
  upsertContent.run(
    `${u.id}-en`, reSiteId, 'property_unit', u.id, 'en', u.slug,
    u.name.en,
    `${u.name.en} featuring ${u.area_m2} sqm of refined living space.`,
    JSON.stringify({ view: 'Open gardens & water features', payment_plan: '10% downpayment with 7-year installment plans' }),
    `${u.name.en} | Meridian`,
    `Details and simulated viewing request for ${u.name.en}.`
  );
}

for (const a of seedData['real-estate'].articles) {
  upsertPost.run(a.id, reSiteId, a.slug, 'Property Advisory');
  upsertContent.run(
    `${a.id}-ar`, reSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    `دليل استشاري حول ${a.title.ar} لمشتري الوحدات الراقية.`,
    JSON.stringify({ intro: 'شراء العقار الفاخر يتطلب فهم المخططات الهندسية ونسب التحميل وعوائد القيمة المستقبلية.' }),
    `${a.title.ar} | ميريديان`,
    `مقال عقاري حول ${a.title.ar}.`
  );
  upsertContent.run(
    `${a.id}-en`, reSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    `Advisory insights on ${a.title.en} for discerning real estate buyers.`,
    JSON.stringify({ intro: 'Acquiring premier property requires careful scrutiny of architectural efficiency, layout functionality and long-term asset value.' }),
    `${a.title.en} | Meridian`,
    `Real estate advisory editorial on ${a.title.en}.`
  );
}

// 6. Seed Dental (Lumen)
console.log('Seeding Dental...');
const denSiteId = 'site-dental';
const upsertDentist = db.prepare(`
  INSERT INTO dental_practitioners (id, site_id, slug, focus, status)
  VALUES (?, ?, ?, ?, 'published')
  ON CONFLICT(site_id, slug) DO UPDATE SET focus = excluded.focus;
`);

for (const svc of seedData.dental.services) {
  const basePriceCents = 45000;
  upsertItem.run(svc.id, denSiteId, svc.slug.toUpperCase(), svc.slug, svc.category, basePriceCents, JSON.stringify({
    category: svc.category,
    linked_practitioner_ids: svc.linked_practitioner_ids || ['doc-01'],
    requires_clinical_review: true,
    is_demo: true
  }));

  upsertContent.run(
    `${svc.id}-ar`, denSiteId, 'catalog_item', svc.id, 'ar', svc.slug,
    svc.name.ar,
    svc.summary?.ar || `جلسة استشارية متخصصة لفحص ${svc.name.ar} ضمن بيئة طبية حديثة ومريحة.`,
    JSON.stringify({
      scope: 'فحص سريري واستشارة هادئة تضع راحة المريض وصحة أسنانه في المقام الأول.',
      visit_flow: [
        'الاستقبال والحديث عن أي تحسس أو انزعاج عام',
        'الفحص المباشر باستخدام التقنيات التشخيصية الحديثة',
        'شرح الخيارات المتاحة ووضع خطة الرعاية المتفق عليها'
      ],
      faqs: [
        { q: 'هل الجلسة مؤلمة؟', a: 'نحرص على استخدام أساليب مهدئة وتخدير موضعي رقيق عند الحاجة لضمان تجربة خالية من القلق.' },
        { q: 'كم تستغرق جلسة الاستشارة؟', a: 'تستغرق الجلسة المبدئية عادة من 30 إلى 45 دقيقة تتضمن الفحص الكامل.' }
      ],
      clinical_note: 'محتوى توضيحي لمنظومة مافيكس التجريبية — يخضع لمراجعة الفريق الطبي المتخصص.'
    }),
    `${svc.name.ar} | لومن لطب الأسنان`,
    `تفاصيل خدمة ${svc.name.ar} من عيادة لومن لطب الأسنان.`
  );

  upsertContent.run(
    `${svc.id}-en`, denSiteId, 'catalog_item', svc.id, 'en', svc.slug,
    svc.name.en,
    svc.summary?.en || `Specialized clinical consultation for ${svc.name.en} in a modern, patient-first setting.`,
    JSON.stringify({
      scope: 'Thorough clinical evaluation and consultation focused on patient comfort and evidence-based oral wellness.',
      visit_flow: [
        'Welcoming reception and discussion of any specific sensitivity or concerns',
        'Clinical inspection utilizing gentle modern diagnostic aids',
        'Review of findings and joint discussion of tailored care steps'
      ],
      faqs: [
        { q: 'Is this procedure uncomfortable?', a: 'Our clinicians prioritize patient comfort with gentle techniques and micro-anesthesia when indicated.' },
        { q: 'How long does a consultation take?', a: 'An initial consultation typically lasts 30 to 45 minutes including full examination.' }
      ],
      clinical_note: 'Demonstrative concept content by Mavvix — subject to licensed clinical review.'
    }),
    `${svc.name.en} | Lumen Dental`,
    `Clinical service details for ${svc.name.en} at Lumen Dental Clinic.`
  );
}

for (const doc of seedData.dental.practitioners) {
  upsertDentist.run(doc.id, denSiteId, doc.slug, doc.speciality || 'general');
  upsertContent.run(
    `${doc.id}-ar`, denSiteId, 'dental_practitioner', doc.id, 'ar', doc.slug,
    doc.name.ar,
    `ممارس طب أسنان يركز على الرعاية الدقيقة والراحة النفسية للمراجعين.`,
    JSON.stringify({
      specialty: doc.speciality || 'general',
      qualifications: ['زمالة دراسات عليا في طب الأسنان الوقائي والترميمي', 'تدريب مستمر على تقنيات تقليل توتر المرضى'],
      philosophy: 'الاستماع الجيد للمريض وتوفير بيئة مطمئنة هما الأساس الحقيقي لأي علاج ناجح.',
      consultation_days: ['الأحد', 'الثلاثاء', 'الخميس'],
      fictional_note: 'شخصية توضيحية خيالية مخصصة لعرض مافيكس التقني وليست طبيباً حقيقياً.'
    }),
    `${doc.name.ar} | لومن لطب الأسنان`,
    `الملف التعريفي لدكتور ${doc.name.ar} في لومن لطب الأسنان.`
  );
  upsertContent.run(
    `${doc.id}-en`, denSiteId, 'dental_practitioner', doc.id, 'en', doc.slug,
    doc.name.en,
    `Clinical practitioner dedicated to meticulous oral care and reassuring patient communication.`,
    JSON.stringify({
      specialty: doc.speciality || 'general',
      qualifications: ['Postgraduate Fellowship in Restorative & Preventative Dentistry', 'Certified in Gentle Clinical Techniques'],
      philosophy: 'Attentive communication and calm care delivery are fundamental to every positive clinical outcome.',
      consultation_days: ['Sunday', 'Tuesday', 'Thursday'],
      fictional_note: 'Fictional illustrative practitioner persona for Mavvix commercial demonstration.'
    }),
    `${doc.name.en} | Lumen Dental`,
    `Clinical profile for ${doc.name.en} at Lumen Dental Clinic.`
  );
}

for (const a of seedData.dental.articles) {
  upsertPost.run(a.id, denSiteId, a.slug, 'Oral Health & Guides');
  upsertContent.run(
    `${a.id}-ar`, denSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    `إرشادات توعوية حول ${a.title.ar} للعناية بصحة الفم والأسنان.`,
    JSON.stringify({ intro: 'الوقاية والفحص المبكر يجنبانك العلاجات المعقدة ويحافظان على ابتسامة صحية تدوم طويلاً.' }),
    `${a.title.ar} | لومن`,
    `دليل تثقيفي حول ${a.title.ar} من لومن.`
  );
  upsertContent.run(
    `${a.id}-en`, denSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    `Patient education guide on ${a.title.en} for comprehensive oral wellness.`,
    JSON.stringify({ intro: 'Preventative diagnostics and routine care protect tooth longevity and prevent invasive clinical interventions.' }),
    `${a.title.en} | Lumen`,
    `Patient guide on ${a.title.en} by Lumen Dental.`
  );
}

// 7. Seed Ecommerce (Noria Atelier)
console.log('Seeding Ecommerce...');
const ecomSiteId = 'site-ecommerce';

const upsertCategory = db.prepare(`
  INSERT INTO catalog_categories (id, site_id, slug, sort_order)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(site_id, slug) DO UPDATE SET sort_order = excluded.sort_order;
`);

let catSort = 1;
for (const col of seedData.ecommerce.collections) {
  upsertCategory.run(col.id, ecomSiteId, col.slug, catSort++);
  upsertContent.run(
    `${col.id}-ar`, ecomSiteId, 'catalog_category', col.id, 'ar', col.slug,
    col.name.ar,
    `مجموعة ${col.name.ar} من نوريا أتيليه المصممة بأقمشة طبيعية وقصات عصرية خالدة.`,
    JSON.stringify({ banner: 'hero-collection', description: `تشكيلة ${col.name.ar}` }),
    `${col.name.ar} | نوريا أتيليه`,
    `تصفح قطع تشكيلة ${col.name.ar} من نوريا أتيليه.`
  );
  upsertContent.run(
    `${col.id}-en`, ecomSiteId, 'catalog_category', col.id, 'en', col.slug,
    col.name.en,
    `The ${col.name.en} collection at Noria Atelier — crafted with honest natural fabrics and timeless silhouettes.`,
    JSON.stringify({ banner: 'hero-collection', description: `${col.name.en} curation` }),
    `${col.name.en} | Noria Atelier`,
    `Explore the ${col.name.en} collection at Noria Atelier.`
  );
}

for (const p of seedData.ecommerce.products) {
  const priceCents = (p.price_egp || 1200) * 100;
  upsertItem.run(
    p.id, ecomSiteId, p.sku, p.slug, p.category, priceCents,
    JSON.stringify({
      material: p.material || 'Linen / Cotton',
      care: p.product_care?.en || 'Dry clean or gentle cycle',
      gallery: p.gallery_media_ids || [],
      isDemo: true
    })
  );

  // Seed all real variants from seedData (sizes, colors, and actual stock including 0)
  if (Array.isArray(p.variants) && p.variants.length > 0) {
    for (const v of p.variants) {
      const vPrice = v.priceOverride ? v.priceOverride * 100 : priceCents;
      upsertVariant.run(
        v.id, p.id, `${p.sku}-${v.size}-${v.color.toUpperCase()}`,
        JSON.stringify({ size: v.size, color: v.color }),
        v.stock ?? 10, 1, 1, vPrice
      );
    }
  } else {
    upsertVariant.run(
      `${p.id}-var-default`, p.id, `${p.sku}-DEF`,
      JSON.stringify({ size: 'M', color: 'Natural' }),
      15, 1, 1, priceCents
    );
  }

  upsertContent.run(
    `${p.id}-ar`, ecomSiteId, 'catalog_item', p.id, 'ar', p.slug,
    p.name.ar,
    `قطعة فاخرة مصنوعة من ألياف ${p.material || 'طبيعية'} منتقاة بعناية فائقة، تجمع بين راحة الارتداء والخطوط الهندسية الهادئة.`,
    JSON.stringify({
      fabric: p.material || 'كتان مصري طبيعي وصوف ناعم',
      dimensions: 'قصة عصرية مسترخية تلائم مختلف الإطلالات',
      care: p.product_care?.ar || 'غسيل يدوي بماء بارد أو تنظيف جاف لطيف للحفاظ على نعومة النسيج'
    }),
    `${p.name.ar} | نوريا أتيليه`,
    `اقتنِ ${p.name.ar} من تشكيلة نوريا أتيليه.`
  );
  upsertContent.run(
    `${p.id}-en`, ecomSiteId, 'catalog_item', p.id, 'en', p.slug,
    p.name.en,
    `Tailored garment crafted with selected ${p.material || 'natural'} fibers, blending tactile everyday comfort with subtle architectural lines.`,
    JSON.stringify({
      fabric: p.material || 'Natural Egyptian linen & fine wool blend',
      dimensions: 'Relaxed contemporary silhouette with balanced drape',
      care: p.product_care?.en || 'Gentle cold cycle or eco dry-clean recommended'
    }),
    `${p.name.en} | Noria Atelier`,
    `Discover ${p.name.en} at Noria Atelier.`
  );
}

// Seed Demo Promotions into demo_pricing_rules
const upsertPricing = db.prepare(`
  INSERT INTO demo_pricing_rules (id, site_id, rule_type, code, config_json, active)
  VALUES (?, ?, 'coupon', ?, ?, ?)
  ON CONFLICT(site_id, rule_type, code) DO UPDATE SET
    config_json = excluded.config_json,
    active = excluded.active;
`);

for (const promo of seedData.ecommerce.promotions) {
  upsertPricing.run(
    `promo-${promo.code}`, ecomSiteId, promo.code,
    JSON.stringify(promo),
    promo.state === 'active' ? 1 : 0
  );
}

for (const a of seedData.ecommerce.articles) {
  upsertPost.run(a.id, ecomSiteId, a.slug, 'Style & Atelier Notes');
  upsertContent.run(
    `${a.id}-ar`, ecomSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    `مقالة في الأناقة والتصميم حول ${a.title.ar}.`,
    JSON.stringify({ intro: 'الجمال الحقيقي يكمن في بساطة الخطوط وجودة المواد التي تزداد قيمة مع الزمن.' }),
    `${a.title.ar} | نوريا`,
    `إلهام وتنسيق حول ${a.title.ar}.`
  );
  upsertContent.run(
    `${a.id}-en`, ecomSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    `Atelier journal note exploring ${a.title.en}.`,
    JSON.stringify({ intro: 'Enduring aesthetics stem from restraint, honest materials, and precise tailoring designed to outlast fast trends.' }),
    `${a.title.en} | Noria`,
    `Style perspectives on ${a.title.en}.`
  );
}

// 8. Seed Portfolio (Salma Hassan)
console.log('Seeding Portfolio...');
const portSiteId = 'site-portfolio';
for (const c of seedData.portfolio.cases) {
  upsertProject.run(c.id, portSiteId, c.slug, c.discipline || 'Architecture', 'Cairo', 350, JSON.stringify({ deliverables: c.deliverables || [], gallery: c.gallery_media_ids || [] }));
  upsertContent.run(
    `${c.id}-ar`, portSiteId, 'example_project', c.id, 'ar', c.slug,
    c.name.ar,
    `دراسة حالة معمارية وتصميمية: ${c.name.ar} تركز على القرارات البصرية والوظيفية.`,
    JSON.stringify({
      concept: 'دراسة الفراغات والهوية والتكامل البصري مع تجنب الافتراضات الشائعة.',
      deliverables: c.deliverables,
      discipline: c.discipline
    }),
    `${c.name.ar} | سلمى حسن ستوديو`,
    `دراسة تفصيلية لمشروع ${c.name.ar}.`
  );
  upsertContent.run(
    `${c.id}-en`, portSiteId, 'example_project', c.id, 'en', c.slug,
    c.name.en,
    `Design and spatial case study: ${c.name.en} exploring deliberate creative decisions.`,
    JSON.stringify({
      concept: 'Exploring functional discipline, spatial restraint, and identity alignment.',
      deliverables: c.deliverables,
      discipline: c.discipline
    }),
    `${c.name.en} | Salma Hassan Studio`,
    `Design case study for ${c.name.en}.`
  );
}

for (const a of seedData.portfolio.articles) {
  upsertPost.run(a.id, portSiteId, a.slug, 'Design Philosophy');
  upsertContent.run(
    `${a.id}-ar`, portSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    `تأملات معمارية حول ${a.title.ar}.`,
    JSON.stringify({ intro: 'كل خط معماري هو قرار يؤثر في تجربة الإنسان اليومية وشعوره بالانتماء للمكان.' }),
    `${a.title.ar} | سلمى حسن`,
    `مقال فلسفة التصميم حول ${a.title.ar}.`
  );
  upsertContent.run(
    `${a.id}-en`, portSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    `Architectural reflections on ${a.title.en}.`,
    JSON.stringify({ intro: 'Every spatial gesture is a deliberate decision framing human interaction and tactile comfort.' }),
    `${a.title.en} | Salma Hassan`,
    `Design philosophy essay on ${a.title.en}.`
  );
}

// 9. Seed Restaurant (Saffron Table)
console.log('Seeding Restaurant...');
const restSiteId = 'site-restaurant';
const upsertDish = db.prepare(`
  INSERT INTO restaurant_dishes (id, site_id, slug, category, price_cents, allergens_json, attributes_json, available)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  ON CONFLICT(site_id, slug) DO UPDATE SET
    category = excluded.category,
    price_cents = excluded.price_cents,
    allergens_json = excluded.allergens_json,
    attributes_json = excluded.attributes_json,
    available = 1;
`);

const upsertDishMod = db.prepare(`
  INSERT INTO dish_modifiers (id, dish_id, modifier_group, label_ar, label_en, price_delta_cents, available)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    dish_id = excluded.dish_id,
    modifier_group = excluded.modifier_group,
    label_ar = excluded.label_ar,
    label_en = excluded.label_en,
    price_delta_cents = excluded.price_delta_cents,
    available = excluded.available;
`);

const upsertRestSlot = db.prepare(`
  INSERT INTO demo_time_slots (id, site_id, owner_type, owner_id, starts_at, capacity, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(site_id, owner_type, owner_id, starts_at) DO UPDATE SET
    capacity = excluded.capacity,
    status = excluded.status;
`);

for (const d of seedData.restaurant.dishes) {
  // Scenario fixture: dish-13 (Mushroom Burger) base price = 220 EGP (22000 cents) for the fixture
  const priceCents = d.slug === 'dish-13' ? 22000 : (d.price_egp || 180) * 100;
  upsertDish.run(
    d.id, restSiteId, d.slug, d.category, priceCents,
    JSON.stringify(d.allergens || []),
    JSON.stringify({
      dietary_tags: d.dietary_tags || [],
      ingredients: d.ingredients_example || [],
      spice_level: d.category === 'mains' ? 2 : (d.category === 'starters' ? 1 : 0),
      prep_time_minutes: d.category === 'breakfast' ? 15 : (d.category === 'mains' ? 25 : 10),
      pairing_suggestion: d.category === 'mains' ? 'Mint Lemonade or Cardamom Tea' : 'Fresh House Hibiscus'
    })
  );

  // Seed size modifiers (Regular +0, Large +35 EGP)
  upsertDishMod.run(`${d.id}-size-reg`, d.id, 'size', 'حجم عادي', 'Regular Portion', 0, 1);
  upsertDishMod.run(`${d.id}-size-large`, d.id, 'size', 'حجم عائلي كبير (+٣٥ ج.م)', 'Large Feast Portion (+35 EGP)', 3500, 1);

  upsertContent.run(
    `${d.id}-ar`, restSiteId, 'restaurant_dish', d.id, 'ar', d.slug,
    d.name.ar,
    `طبق شرقي تراثي يُحضر يوميًا بمكونات طازجة وبهارات زعفران منتقاة بعناية، يقدم ساخنًا مع خيارات الحجم والإضافات.`,
    JSON.stringify({
      ingredients: d.ingredients_example || ['زعفران بلدي حر', 'أرز بسمتي عالي الجودة', 'توابل شرقية أصيلة'],
      prep_time: '٢٥ دقيقة',
      origin: 'وصفة متوارثة مستوحاة من مطابخ بلاد الشام والمغرب العربي ومصر',
      pairing: 'يقدم مع مشروب النعناع المنعش أو شاي الزعفران'
    }),
    `${d.name.ar} | سفرة زعفران`,
    `تذوق ${d.name.ar} المحضر على أصوله في سفرة زعفران.`
  );
  upsertContent.run(
    `${d.id}-en`, restSiteId, 'restaurant_dish', d.id, 'en', d.slug,
    d.name.en,
    `Authentic heritage dish prepared daily with selected saffron, fresh herbs, and balanced spices. Served with portion and modifier customizations.`,
    JSON.stringify({
      ingredients: d.ingredients_example || ['Wild mountain saffron', 'Aromatic heritage rice', 'Slow-roasted spices'],
      prep_time: '25 mins',
      origin: 'Traditional Eastern recipe combining Mediterranean warmth and Levantine spice craft',
      pairing: 'Pairs ideally with cold hibiscus infusion or crushed mint iced tea'
    }),
    `${d.name.en} | Saffron Table`,
    `Order ${d.name.en} from Saffron Table heritage dining.`
  );
}

// Seed the 12 specific modifiers from SEED_DATA
for (const mod of seedData.restaurant.modifiers) {
  upsertDishMod.run(
    mod.id,
    mod.dish_id,
    'extras',
    mod.name.ar,
    mod.name.en,
    (mod.price_delta_egp || 0) * 100,
    1
  );
}

// Seed time slots for table requests
for (const slot of seedData.restaurant.time_slots) {
  upsertRestSlot.run(
    slot.id,
    restSiteId,
    'restaurant_branch',
    slot.branch_id,
    slot.local_hour,
    slot.capacity || 4,
    slot.available ? 'available' : 'unavailable'
  );
}

// Rich culinary editorial articles (250+ words each)
const richRestaurantArticles = [
  {
    id: 'restaurant-article-01',
    slug: 'article-01',
    title: { ar: 'أفكار فطور موسمي وطقوس الصباح الشرقي', en: 'Seasonal Breakfast Ideas & Eastern Morning Rituals' },
    category: 'Breakfast Traditions',
    summary: {
      ar: 'استكشف طقوس الفطور التقليدي المعتمد على الخبز الطازج، الأعشاب الجبلية، وزيت الزيتون المعصور على البارد.',
      en: 'Explore heritage morning rituals centered on hearth-baked bread, wild mountain herbs, and first-press cold olive oil.'
    },
    body_ar: {
      sections: [
        {
          heading: 'دفء الصباح والبداية الهادئة',
          content: 'يبدأ الصباح في تراثنا الشرقي برائحة الخبز الطازج الخارج من الفرن الحجري، حيث لا يقتصر الفطور على كونه وجبة سريعة، بل هو طقس متكامل من السكينة والاجتماع العائلي. يتميز فطورنا الموسمي باعتماده على خيرات الأرض الطازجة: الجبن الأبيض القريش المنكه بحبة البركة، زيت الزيتون البكر الممتاز المستخرج من أول عصرة، والزعتر البري المجفف بعناية تحت شمس الخريف الدافئة. هذه الطقوس تعيد للإنسان ارتباطه بالأرض وتبني بداية يوم مفعمة بالهدوء والسكينة والتركيز الذهني بعيدًا عن صخب الحياة المعاصرة.'
        },
        {
          heading: 'مكونات متوازنة تمنح طاقة مستدامة',
          content: 'نحرص في سفرة زعفران على تقديم أطباق البيض البلدي المطهوة ببطء في أواني الفخار مع الطماطم المشوية والفلفل الحلو والكمون المطحون يدويًا. هذا التوازن بين البروتين العضوي والدهون الصحية غير المشبعة يمنح الجسم نشاطًا مستمرًا دون الشعور بالثقل، مما يجعله الخيار الأمثل لبدء يوم عمل حافل أو صباح عطلة هادئ. كما نضيف حبوب الحمص المسلوقة ببطء والمتبلة بزيت الزيتون والليمون والكمون لتكتمل الوجبة الغذائية بعناصر الألياف الطبيعية والمغنيسيوم والبوتاسيوم.'
        },
        {
          heading: 'مشروبات الصباح وتناغم النكهات',
          content: 'تكتمل المائدة الصباحية بالشاي الأسود المخمر بأوراق النعناع الطازجة أو شاي الزعفران والهيل الدافئ الذي يوقظ الحواس. الفطور المتأني يعيدنا إلى جذورنا ويذكرنا بأن الطعام الحقيقي يُصنع بالصبر والمحبة، وهو ما نسعى لتجسيده في كل طبق نقدمه لضيوفنا كل صباح. جلسة الفطور المريحة بين الأهل والأصدقاء تمثل ركنًا أصيلاً من ثقافة الكرم الشرقي التي توارثناها عبر الأجيال ونعتز بتقديمها بكل أمانة وإخلاص.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'The Hearth and Morning Serenity',
          content: 'In Eastern culinary heritage, morning begins with the intoxicating aroma of hearth-baked bread rising in stone ovens. Breakfast is never a hurried afterthought; it is an immersive ritual of gathering, quiet gratitude, and restorative warmth. Our seasonal morning table centers around pure ingredients: crumbly aged cheeses scented with nigella seeds, first-press extra virgin olive oil with intense herbal brightness, and wild zaatar dried gently under Mediterranean sunshine. This grounded morning ceremony re-anchors our senses and sets an intentional, serene tone for the hours ahead.'
        },
        {
          heading: 'Balanced Nourishment for Enduring Energy',
          content: 'At Saffron Table, we celebrate farm-fresh eggs gently simmered in earthen clay vessels with sun-ripened vine tomatoes, charred sweet peppers, and freshly ground cumin. This delicate harmony of wholesome proteins and cold-pressed botanical fats sustains vitality throughout the day without lethargy, whether preparing for focused work or relishing an unhurried weekend. We also pair slow-simmered fava beans dressed with cold-pressed olive oil, fresh crushed garlic, and bright lemon juice to ensure clean fiber and sustained endurance.'
        },
        {
          heading: 'Aromatic Infusions and Table Fellowship',
          content: 'No morning spread is complete without rich Ceylon tea steeped with freshly picked spearmint leaves or soothing green tea perfumed with crushed cardamom pods and crimson saffron threads. Taking the time to savor every bite anchors our busy lives, offering a grounded reminder of what true culinary craftsmanship brings to the soul. Sharing warm bread and fragrant tea honors ancestral hospitality that celebrates humanity across every table.'
        }
      ]
    }
  },
  {
    id: 'restaurant-article-02',
    slug: 'article-02',
    title: { ar: 'فنون تحضير صوص الباستا وتناغم النكهات', en: 'The Craft of Pasta Sauces & Emulsified Flavor Harmony' },
    category: 'Kitchen Craft',
    summary: {
      ar: 'كيف نصنع توازنًا مثاليًا بين حموضة الطماطم المشوية، قوام الزبدة المنكهة، وحرارة التوابل الشرقية.',
      en: 'How we balance roasted tomato acidity, infused botanical oils, and subtle Eastern aromatics.'
    },
    body_ar: {
      sections: [
        {
          heading: 'أسرار تحميص الطماطم على نار هادئة',
          content: 'الصلصة الاستثنائية لا تُولد من الغليان السريع، بل من التحميص البطيء الذي يركز السكريات الطبيعية داخل ثمار الطماطم. نستخدم طماطم كرزية ناضجة مع فصوص ثوم كاملة وأغصان ريحان طازج، مدهونة بزيت الزيتون الصافي وملح البحر الخشن، ونتركها تتحمص حتى تتكرمل حوافها وتكتسب نكهة دخانية عميقة تمنح الصلصة بعدًا مميزًا لا يمكن تعويضه بالمعجون الصناعي. هذا التركيز الطبيعي يغني عن إضافة أي سكريات مكررة أو محسنات قوام غير طبيعية، ويمنح المزيج لزوجة مخملية وقوامًا غنيًا يبهج كل من يتذوقه.'
        },
        {
          heading: 'فن الاستحلاب ومياه سلق الباستا',
          content: 'السر الحقيقي الذي يربط الباستا بالصلصة هو ماء السلق الغني بالنشويات. عند خلط كمية مدروسة من ماء السلق الساخن مع الزبدة الطبيعية وزيت الزيتون والصلصة على حرارة مرتفعة، يتكون مستحلب حريري يغلف كل قطعة باستا بالتساوي دون أن يترك بركة زيتية في قاع الطبق. يتطلب هذا التقليب السريع مهارة يدوية عالية تدمج الدهون والنشا والماء في سائل كريمي متماسك ولذيذ، حيث تعمل حرارة المقلاة كحاضنة طبيعية تربط النكهات معًا بانسجام لا مثيل له.'
        },
        {
          heading: 'اللمسة الشرقية: الزعفران والأعشاب الجافة',
          content: 'نضيف في سفرة زعفران لمستنا التراثية بإضافة خيوط الزعفران المنقوعة في مرق دافئ وقليل من الفلفل الحلبي المجروش. هذه الإضافة الدقيقة تضفي لونًا ذهبيًا خلابًا ورائحة ترابية زكية ترفع طبق الباستا البسيط إلى مستوى تجربة طهي راقية ومميزة. التناغم بين عبق الزعفران وحموضة الطماطم المتكرملة يخلق توازنًا نادرًا يدهش الحواس ويترك انطباعًا ممتعًا يدوم طويلاً، مع تزيين الطبق بأوراق الحبق الأخضر ورشة خفيفة من جبن القريش المعتق.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'The Geometry of Slow-Roasted Vine Tomatoes',
          content: 'An extraordinary pasta sauce is never rushed through vigorous boiling. It demands the unhurried patience of gentle heat that caramelizes the natural sugars in vine-ripened tomatoes. We roast plum and cherry varieties with whole unpeeled garlic cloves, fresh oregano sprigs, and coarse sea salt until blistered and jam-like, yielding an irreplaceable sweet-savory complexity. This natural evaporation concentrates vibrant acidity without resorting to artificial tomato pastes or refined sweeteners.'
        },
        {
          heading: 'Emulsification and Starch Integration',
          content: 'The pivotal secret linking sauce to noodle lies in the heavily salted, starchy cooking water. By vigorously tossing hot pasta water with pure cultured butter and extra virgin olive oil over intense heat, a glossy, velvety emulsion coats every curve and ridge of the pasta, eliminating oily pooling at the bottom of the plate. Mastering this vigorous skillet movement binds moisture, natural fats, and wheat starches into a unified culinary mantle.'
        },
        {
          heading: 'Eastern Nuance: Saffron Bloom and Aleppo Pepper',
          content: 'At Saffron Table, we incorporate our regional heritage by blooming saffron threads in warm bone or vegetable broth before folding it into the sauce, complemented by mild Aleppo chili flakes. This subtle interplay imparts an alluring golden sheen and a warm, floral depth that redefines comfort dining. The delicate bitterness of saffron harmonizes with tomato sweetness to deliver a memorable, nuanced plate.'
        }
      ]
    }
  },
  {
    id: 'restaurant-article-03',
    slug: 'article-03',
    title: { ar: 'دليل الشفافية في التعامل مع مسببات الحساسية', en: 'Allergen Transparency & Cross-Contact Protocols' },
    category: 'Safety & Quality',
    summary: {
      ar: 'معاييرنا الصارمة في المطبخ لضمان سلامة ضيوفنا وتوضيح مسببات الحساسية بكل وضوح وشفافية.',
      en: 'Our rigorous kitchen protocols to ensure guest safety and transparent allergen disclosure.'
    },
    body_ar: {
      sections: [
        {
          heading: 'حق الضيف في المعرفة الكاملة',
          content: 'نؤمن في سفرة زعفران بأن تجربة تناول الطعام المطمئنة تبدأ بالصدق التام حول ما يحتويه كل طبق. لا نكتفي بذكر المكونات الرئيسية، بل نوضح بالتفصيل مسببات الحساسية الشائعة مثل المكسرات، منتجات الألبان، الجلوتين، والبيض، مع التنبيه الصريح إلى احتمالية التلامس العرضي في بيئة المطبخ المشتركة. الصدق مع الضيف يبني علاقة ثقة مستدامة تتيح له الاستمتاع بوجبته دون أي قلق أو تردد.'
        },
        {
          heading: 'إجراءات الفصل والتحضير الدقيق',
          content: 'يتبع فريق الطهاة لدينا بروتوكولات صارمة للفصل بين محطات العمل، حيث تُستخدم ألواح تقطيع وأدوات مخصصة للأطباق الخالية من المكسرات أو الخالية من الجلوتين، مع تنظيف شامل بين دورات الطهي. ورغم حرصنا الشديد، نفضل دائمًا توعية الضيوف ذوي الحساسيات المفرطة بطبيعة مطبخنا المتكامل لضمان اتخاذهم للقرار الأنسب لسلامتهم. نرفض تقديم وعود زائفة ببيئة خالية تمامًا من الحساسية لأن سلامة الضيف تأتي أولاً دائمًا.'
        },
        {
          heading: 'فلاتر قائمة الطعام الرقمية الذكية',
          content: 'تم تصميم قائمتنا الرقمية لتتيح تصفية الأطباق بضغطة زر واحدة، مثل خيار "خالٍ من المكسرات" أو "نباتي"، مما يتيح للضيف استعراض الخيارات المناسبة بثقة وسلاسة دون الحاجة للسؤال المتكرر، مع بقاء فريق الضيافة جاهزًا للإجابة على أي استفسار دقيق. التكنولوجيا المسؤولة تسهم في تسهيل حياة الضيوف وتعزيز أمانهم الغذائي في كل زيارة.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'The Guest’s Right to Complete Clarity',
          content: 'At Saffron Table, we firmly believe peace of mind is an essential seasoning. We never obscure ingredient origins or take shortcuts with dietary risks. Every dish on our roster carries explicit allergen disclosures covering tree nuts, dairy, gluten, and eggs, alongside clear reminders about shared prep environments. Transparent communication empowers diners to dine with profound trust and comfort. Guests can explore full ingredient profiles without ambiguity, ensuring relaxed social occasions around our tables.'
        },
        {
          heading: 'Segregated Preparation and Station Cleanliness',
          content: 'Our culinary brigade adheres to rigorous station segregation. Separate color-coded cutting boards, dedicated utensils, and thorough sanitization protocols are observed when crafting allergen-conscious orders. While we take every human precaution, we remain transparent about our working artisan kitchen so guests with severe anaphylaxis can make informed choices. We never make reckless claims of clinical isolation because honest safety always supersedes marketing slogans.'
        },
        {
          heading: 'Intuitive Digital Menu Filters',
          content: 'Our digital interface empowers diners to filter dishes instantly—such as removing tree nuts or dairy-laden preparations—with dynamic item counts and verified tag indicators. This technological clarity removes anxiety from ordering, leaving only the pleasure of wholesome companionship and rich heritage dining. Our hospitality hosts remain trained and ready to answer any nuance regarding recipe modifications.'
        }
      ]
    }
  },
  {
    id: 'restaurant-article-04',
    slug: 'article-04',
    title: { ar: 'أساسيات استخلاص القهوة المختصة والهيل الأخضر', en: 'Artisanal Coffee Extraction & Green Cardamom Notes' },
    category: 'Coffee & Infusions',
    summary: {
      ar: 'رحلة من حبوب البن المحمصة يدويًا إلى الفنجان الشرقي العريق المعطر بالهيل والزعفران.',
      en: 'A journey from hand-roasted heirloom beans to the traditional Eastern cup spiced with cardamom and saffron.'
    },
    body_ar: {
      sections: [
        {
          heading: 'سحر حبة البن الإثيوبية واليمنية',
          content: 'القهوة في الشرق ليست مجرد جرعة كافيين صباحية، بل هي موروث كرم وعنوان ترحيب. نختار حبوب البن من السلالات الإثيوبية واليمنية القديمة المزروعة على ارتفاعات عالية، حيث تمنح التربة البركانية والمناخ المعتدل الحبوب حموضة فاكهية رقيقة ونكهات شوكولاتة داكنة متوازنة تبرز بوضوح عند التحميص المتوسط. حبوب البن النقية تُعامل ككنز ثمين يُحفظ بعيدًا عن الضوء والرطوبة لحماية زيوتها.'
        },
        {
          heading: 'حرارة الماء وتوقيت الاستخلاص',
          content: 'يتطلب إعداد القهوة الشرقية في الكنكة النحاسية التقليدية دقة هندسية في درجة حرارة الماء (بين ٩٠ و ٩٤ درجة مئوية) مع طحن فائق النعومة يشبه بودرة الحرير. يُترك المزيج ليرتفع ببطء شديد على نار هادئة أو فوق رمال ساخنة حتى تتكون طبقة الكريما الكثيفة دون أن يغلي السائل، محافظًا على الزيوت العطرية الطيارة. هذا الصبر في التحضير يضمن استخلاص كافة أبعاد النكهة دون أي طعم محروق أو مرارة حادة.'
        },
        {
          heading: 'تناغم الهيل والزعفران الذهبي',
          content: 'نطحن حبات الهيل الأخضر الطازج في نفس لحظة التحضير لنحافظ على زيوته النفاذة، مع إسقاط شعيرة واحدة من الزعفران النقي في قاع الفنجان. هذا المزيج العطري يهدئ الأعصاب ويمنح الفم لمسة ختامية راقية تدوم طويلاً. احتساء فنجان قهوة محضر بهذه الطريقة يمثل لحظة تأمل واحتفاء بالأصالة والضيافة الكريمة.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Heirloom Terroirs: Ethiopia and Yemen',
          content: 'Coffee across Eastern cultures represents the pinnacle of hospitality. We source shade-grown heirloom beans cultivated on mist-covered volcanic highlands in Ethiopia and Yemen. These high-altitude cherries develop delicate stone-fruit acidity and deep cocoa undertones that flourish under our slow, artisanal medium roast. Treating the green bean with reverence safeguards its volatile aromatic compounds. Guests are invited to observe the grinding ritual right beside our copper brewing hearth.'
        },
        {
          heading: 'Thermal Precision in Handcrafted Cezves',
          content: 'Brewing heritage coffee in hand-hammered copper pots demands precise temperature control between 90°C and 94°C. The grind must be ultra-fine—resembling powdered silk. Simmering over gentle radiant heat or traditional heated sand beds coaxes out a dense, golden crema without scorching the volatile aromatic oils. This deliberate patience prevents astringency while highlighting chocolate and floral notes. We adjust our brewing rhythm according to room temperature and ambient humidity.'
        },
        {
          heading: 'The Alchemy of Green Cardamom and Saffron',
          content: 'We crush green cardamom pods at the exact moment of brewing to preserve volatile essential oils, accompanied by a single thread of crimson saffron placed in the ceramic demitasse. This aromatic harmony transforms an everyday beverage into a meditative sensory experience honoring deep cultural traditions. Each warm cup tells a multi-century story of shared conversations across open desert and city squares.'
        }
      ]
    }
  },
  {
    id: 'restaurant-article-05',
    slug: 'article-05',
    title: { ar: 'دليل تنسيق الأطباق مع بهار الزعفران الأصيل', en: 'Pairing Gastronomy with Pure Mountain Saffron' },
    category: 'Culinary Heritage',
    summary: {
      ar: 'كيف يغير الزعفران طبيعة المكونات المجاورة ويحول الأرز واللحوم والحلويات إلى تحف فنية.',
      en: 'How saffron elevates companion ingredients and transforms grain, slow-cooked meat, and sweets into art.'
    },
    body_ar: {
      sections: [
        {
          heading: 'الذهب الأحمر: تاريخ وتراث عريق',
          content: 'يُعد الزعفران أثمن بهارات الأرض، إذ يتطلب إنتاج كيلوغرام واحد قطف مئات الآلاف من أزهار الزعفران البنفسجية يدويًا عند بزوغ الفجر. يتميز الزعفران الأصلي بنكهته الترابية الحلوة والمرّة في آن واحد، ولونه البرتقالي القاني الذي يصبغ الأطعمة ببريق ذهبي لا مثيل له. هذا البهار العريق ارتبط بالموائد الملكية والاحتفالات التاريخية الكبرى لقرون طويلة، وظل رمزًا للأناقة والترف المحمود.'
        },
        {
          heading: 'التناغم مع اللحوم المطهوة ببطء',
          content: 'عند دمج منقوع الزعفران مع قطع لحم الضأن المتبلة بالبصل والكزبرة والمطهوة في طواجن الفخار لمدة خمس ساعات، يتغلغل عطر الزعفران في الألياف العضلية للحم ويكسر دسامته ليمنحه مذاقًا ناعمًا ومريحًا للهضم، خاصة عند تقديمه إلى جانب أرز بسمتي معتق بالزبدة. هذا التمازج يخلق عمقًا نكهيًا فريدًا لا يمكن تحقيقه بأي بهار آخر، ويترك طعمًا عذبًا في الفم يدوم بعد انتهاء الوجبة.'
        },
        {
          heading: 'حضور مفاجئ في الحلويات الشرقية',
          content: 'لا يتوقف إبداع الزعفران عند الأطباق المالحة، بل يمتد إلى حلويات الحليب والمهلبية وبودينغ التمر، حيث يخلق تباينًا شاعريًا مع حلاوة السكر والقرفة وجوز الهند، ليعطي تجربة تذوق استثنائية تبقى في الذاكرة. لمسة الزعفران الخفيفة في الحلوى تكسر الحلاوة المفرطة وتمنح الفم إحساسًا راقيًا بالأناقة والتجدد، مع تزيين الأطباق بالفستق الحلبي المقشر والمحمص بعناية.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Red Gold: Heritage and Labor of Love',
          content: 'Saffron is rightfully heralded as the world’s most prized spice. Harvesting a single kilogram requires delicately hand-picking hundreds of thousands of purple crocus blossoms at dawn before the sun wilt their stigmas. Authentic mountain saffron balances bittersweet earthy warmth with a distinctive golden infusion that has graced imperial banquets for centuries. Its presence transforms humble grains into celebration centerpieces.'
        },
        {
          heading: 'Harmonizing with Slow-Braised Heritage Meats',
          content: 'When infused saffron broth joins tender lamb shanks braised for five hours in clay tagines with sweet onions and crushed coriander, the floral earthiness penetrates the meat, balancing rich savory fats and imparting a melt-in-the-mouth tenderness alongside aged buttered basmati rice. The result is a comforting yet majestic centerpiece for family dining that honours culinary generosity.'
        },
        {
          heading: 'Subtle Elegance in Pastries and Creams',
          content: 'Beyond savory fare, saffron works wondrous magic in milk puddings, pistachio pastries, and date desserts. Its herbal undertone cuts through cloying sweetness, offering complex floral balance that cleanses the palate and honors centuries of palace banquet traditions. The aromatic contrast between sweet reduction and crocus florals is truly extraordinary, creating an unforgettable finish to unhurried Eastern feasts.'
        }
      ]
    }
  },
  {
    id: 'restaurant-article-06',
    slug: 'article-06',
    title: { ar: 'اختيارات نباتية أصيلة تحتفي بخيرات الأرض', en: 'Wholesome Plant-Based Heritage Dining' },
    category: 'Plant-Based Kitchen',
    summary: {
      ar: 'المطبخ الشرقي بطبيعته غني بالبقوليات، الخضروات المشوية، وزيت الزيتون دون الحاجة لبدائل مصنعة.',
      en: 'Eastern cuisine is naturally abundant in legumes, charred vegetables, and botanical oils without synthetic substitutes.'
    },
    body_ar: {
      sections: [
        {
          heading: 'المطبخ الشرقي: نباتي بالفطرة',
          content: 'على عكس المطابخ الغربية التي تبحث عن بدائل لحوم مصنعة، يمتلك المطبخ الشرقي مئات الأطباق النباتية الأصيلة التي تشكلت عبر قرون من الممارسة اليومية. من أطباق العدس البني المسلوق مع البصل المكرمل ودبس الرمان، إلى كرات الفلافل المقرمشة المحضرة بالفول والكزبرة الخضراء، يقدم طعامنا قيمة غذائية متكاملة ونكهات أصيلة تنبض بالحياة. الطبيعة النقية للمكونات تمنح الجسم حيوية وصحة مستدامة وتكفي لإشباع أشد الشهيات تطلبًا.'
        },
        {
          heading: 'سحر الباذنجان والسمسم المحمص',
          content: 'يحتل الباذنجان المشوي على اللهب مكانة رفيعة في قائمتنا، حيث نخلط لحمه المدخن مع الطحينة النقية المصنوعة من السمسم المعصور على البارد، الثوم المهروس، وعصير الليمون الطازج لنبتكر متبل بابا غنوج بقوام كريمي ساحر يجمع بين الدفء والانتعاش. تدخين قشر الباذنجان على الفحم يضفي نكهة عطرية غنية تجعل كل لقمة تجربة فريدة، خاصة عند تناولها مع خبز التنور الساخن.'
        },
        {
          heading: 'حبوب كاملة وأعشاب موسمية خضراء',
          content: 'نحتفي في سفرة زعفران بالحبوب الكاملة مثل الفريك والبرغل، ونطبخها مع مرق الخضار المشوية وحبوب الحمص المسلوقة وأوراق السلق الطازجة. هذا التنوع يضمن للضيف النباتي وجبة مشبعة غنية بالألياف والمعادن وممتعة لكل حاسة. نحن نؤمن بأن الطعام النباتي الحقيقي لا يحتاج لتقليد أي شيء، بل يفتخر بذاته وبخيرات الأرض المباركة التي تغذي الروح والجسد معًا.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Eastern Dining: Naturally Plant-Forward',
          content: 'Unlike contemporary trends reliant on synthetic meat substitutes, Eastern gastronomy has celebrated plant-forward cooking for millennia. From earthy brown lentils simmered with caramelized shallots and tart pomegranate molasses to golden fava-bean falafel speckled with coriander seeds, our kitchen delivers deeply satisfying, whole-food nourishment. These ancient preparations honor seasonal crops with simplicity and dignity, offering honest nutrition rooted in soil and sunlight.'
        },
        {
          heading: 'The Magic of Fire-Charred Eggplants and Tahini',
          content: 'Fire-roasted aubergine remains an undisputed star of our table. Its smoky tender flesh is gently folded into stone-ground cold-pressed sesame tahini, crushed garlic, and freshly squeezed lemon juice to craft a silky baba ghanoush that harmonizes smokiness, nuttiness, and bright acidity. Direct wood-smoke charring unlocks profound umami layers without any animal products, creating an addictive starter alongside fresh hearth bread.'
        },
        {
          heading: 'Ancient Grains and Wild Foraged Greens',
          content: 'We celebrate ancient grains like toasted green freekeh and cracked bulgur, simmering them in rich vegetable broth with tender chickpeas, wild chard, and cumin. This wholesome diversity ensures plant-based guests experience an abundant, fiber-rich feast steeped in culinary dignity. Eating plant-forward at Saffron Table is an authentic celebration of seasonal abundance.'
        }
      ]
    }
  }
];

for (const a of richRestaurantArticles) {
  upsertPost.run(a.id, restSiteId, a.slug, a.category);
  upsertContent.run(
    `${a.id}-ar`, restSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    a.summary.ar,
    JSON.stringify(a.body_ar),
    `${a.title.ar} | سفرة زعفران`,
    a.summary.ar
  );
  upsertContent.run(
    `${a.id}-en`, restSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    a.summary.en,
    JSON.stringify(a.body_en),
    `${a.title.en} | Saffron Table`,
    a.summary.en
  );
}


// 10. Seed Academy (Nova Learning)
console.log('Seeding Academy...');
const acadSiteId = 'site-academy';
const upsertCourse = db.prepare(`
  INSERT INTO academy_courses (id, site_id, slug, track, level, duration_minutes, example_price_cents, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'published')
  ON CONFLICT(site_id, slug) DO UPDATE SET
    track = excluded.track,
    level = excluded.level,
    duration_minutes = excluded.duration_minutes,
    example_price_cents = excluded.example_price_cents;
`);

const upsertLesson = db.prepare(`
  INSERT INTO academy_lessons (id, course_id, slug, module_index, lesson_index, minutes, preview_enabled, content_json)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(course_id, slug) DO UPDATE SET
    module_index = excluded.module_index,
    lesson_index = excluded.lesson_index,
    minutes = excluded.minutes,
    preview_enabled = excluded.preview_enabled,
    content_json = excluded.content_json;
`);

const upsertQuiz = db.prepare(`
  INSERT INTO academy_quiz_questions (id, lesson_id, prompt_json, answers_json, correct_index, explanation_json, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    prompt_json = excluded.prompt_json,
    answers_json = excluded.answers_json,
    correct_index = excluded.correct_index,
    explanation_json = excluded.explanation_json,
    sort_order = excluded.sort_order;
`);

// Seed all 12 courses
for (const c of seedData.academy.courses) {
  const priceCents = (c.example_price_egp || 650) * 100;
  upsertCourse.run(c.id, acadSiteId, c.slug, c.track, c.level, c.duration_minutes || 270, priceCents);

  upsertContent.run(
    `${c.id}-ar`, acadSiteId, 'academy_course', c.id, 'ar', c.slug,
    c.name.ar,
    `منهج تطبيقي متكامل في ${c.name.ar} مع مشاريع عملية وتطبيقات واقعية من سوق العمل.`,
    JSON.stringify({
      prerequisites: 'أساسيات عامة في الحاسوب وشغف عميق بالتطوير المهني والتطبيق المباشر',
      certificate: 'شهادة إتمام معتمدة تجريبيًا من أكاديمية نوفا (غير رسمية)',
      target_outcomes: [
        `إتقان المفاهيم المعيارية والأدوات الأساسية في ${c.name.ar}`,
        'بناء مشروع تطبيقي متكامل يُضاف لمحفظة أعمالك المهنية',
        'تجنب الأخطاء الشائعة وحل المشكلات الهندسية والتصميمية بأسلوب منهجي'
      ],
      practical_projects: 'مشروع تخرج تطبيقي يحاكي تحديات الشركات الناشئة والمؤسسات الكبرى'
    }),
    `${c.name.ar} | نوفا للتعلم`,
    `تعلم ${c.name.ar} مع أكاديمية نوفا.`
  );
  upsertContent.run(
    `${c.id}-en`, acadSiteId, 'academy_course', c.id, 'en', c.slug,
    c.name.en,
    `Production-grade applied curriculum in ${c.name.en} with hands-on labs and project evaluation.`,
    JSON.stringify({
      prerequisites: 'Basic technical familiarity and commitment to rigorous project execution',
      certificate: 'Demo verified certificate of completion from Nova Learning (non-accredited)',
      target_outcomes: [
        `Master fundamental principles and standard toolchains in ${c.name.en}`,
        'Build and ship a capstone portfolio project demonstrating real competencies',
        'Diagnose architectural bottlenecks and adopt industry best practices'
      ],
      practical_projects: 'Capstone simulation project solving realistic enterprise constraints'
    }),
    `${c.name.en} | Nova Learning`,
    `Master ${c.name.en} with Nova Learning.`
  );
}

// Seed all 60 lessons from seedData
for (const les of seedData.academy.lessons) {
  const isPreview = les.preview_enabled ? 1 : 0;
  const modIdx = Math.ceil(les.sequence / 2) || 1;
  const lesIdx = les.sequence || 1;

  upsertLesson.run(
    les.id,
    les.course_id,
    les.slug,
    modIdx,
    lesIdx,
    les.minutes || 20,
    isPreview,
    JSON.stringify({
      title_ar: les.title.ar,
      title_en: les.title.en,
      sequence: les.sequence,
      preview: Boolean(isPreview),
      summary_ar: `الوحدة ${modIdx} — الدرس ${lesIdx}: المبادئ التطبيقية والممارسة العملية المباشرة.`,
      summary_en: `Module ${modIdx} — Lesson ${lesIdx}: Applied architectural principles and structured lab execution.`,
      transcript_ar: `في هذا الدرس نتناول المفاهيم الجوهرية والمنهجية المتبعة لبناء أساس احترافي متين. نناقش الركائز المعيارية للمجال، وأهم الأخطاء الشائعة وكيفية تجنبها عند بدء التطبيق العملي. يبدأ التطبيق العملي بفهم المشكلة وتحديد المتطلبات بدقة قبل كتابة أي سطر برمجي أو تنفيذ أي رسم تخطيطي. كما نستعرض حالات عملية واقعية توضح الفارق بين الممارسات السريعة الهشة والحلول الهندسية المتينة التي تصمد في بيئات الإنتاج الحقيقية وتتيح التوسع السلس دون ديون تقنية مكلفة.`,
      transcript_en: `In this applied lesson, we break down core principles and methodological foundations for professional mastery. We explore standard architectural patterns, key pitfalls, and practical execution frameworks. Real-world execution begins with precise requirement analysis and diagnostic rigor before writing code or assembling visual assets. We examine enterprise case studies illustrating the critical difference between fragile quick fixes and enduring production-grade solutions designed for long-term scalability.`,
      exercise_ar: les.exercise_direction || 'قم بتنفيذ التمرين العملي باتباع الخطوات المشروحة ومقارنة النتيجة بالمثال المرجعي.',
      exercise_en: les.exercise_direction || 'Execute the hands-on lab following the outlined steps and verify against reference artifacts.'
    })
  );
}

// Seed 4 specific quiz questions for lesson-01-01 (Journey 1 & 75% test fixture: 3/4 correct = 75%)
const quizLesson01 = [
  {
    id: 'quiz-01-01-01',
    lesson_id: 'lesson-01-01',
    prompt: {
      ar: 'ما هو الهدف الأساسي من تنظيف البيانات وتجهيزها (Data Cleansing) قبل مرحلة التجميع الإحصائي؟',
      en: 'What is the primary objective of data cleansing before statistical aggregation?'
    },
    answers: {
      ar: [
        'تسريع عمليات القراءة من القرص الصلب فقط',
        'استبعاد السجلات المكررة والقيم الشاذة ومعالجة الفراغات غير المبررة',
        'استبدال البيانات الواقعية ببيانات افتراضية غير حقيقية',
        'تجاوز مرحلة التحليل الاستكشافي المبدئي'
      ],
      en: [
        'Accelerating hard disk read operations only',
        'Eliminating duplicate records, handling missing values, and filtering artifacts',
        'Replacing observed real data with synthetic placeholders',
        'Bypassing initial exploratory data inspection'
      ]
    },
    correct_index: 1,
    explanation: {
      ar: 'تنظيف البيانات يضمن دقة النماذج التحليلية ويمنع تشويه المؤشرات الإحصائية الناتجة.',
      en: 'Data cleansing preserves statistical fidelity and prevents skewed downstream insights.'
    },
    sort_order: 1
  },
  {
    id: 'quiz-01-01-02',
    lesson_id: 'lesson-01-01',
    prompt: {
      ar: 'عندما تظهر البيانات انحرافًا إيجابيًا حادًا (Positive Skewness) مع وجود قيم متطرفة كبيرة، ما هو المقياس الأنسب للنزعة المركزية؟',
      en: 'When metric distributions exhibit extreme positive skewness with severe outliers, which measure of central tendency is most robust?'
    },
    answers: {
      ar: [
        'المتوسط الحسابي البسيط (Mean)',
        'الوسيط الإحصائي (Median - القيمة في المئين الخمسين)',
        'الانحراف المعياري العام (Standard Deviation)',
        'أعلى قيمة مسجلة في العينة (Maximum Value)'
      ],
      en: [
        'Arithmetic Mean',
        'Statistical Median (50th percentile value)',
        'Standard Deviation',
        'Maximum Observed Value'
      ]
    },
    correct_index: 1,
    explanation: {
      ar: 'الوسيط الإحصائي لا يتأثر بالقيم الشاذة المتطرفة مقارنة بالمتوسط الحسابي الذي ينجذب نحو الأطراف.',
      en: 'The median remains resilient to extreme outliers, whereas the mean is heavily skewed.'
    },
    sort_order: 2
  },
  {
    id: 'quiz-01-01-03',
    lesson_id: 'lesson-01-01',
    prompt: {
      ar: 'معامل ارتباط بيرسون المرتفع (r = 0.88) بين وقت بقاء الزائر ومعدل الشراء يثبت علميًا أن:',
      en: 'A high Pearson correlation coefficient (r = 0.88) between visitor dwell time and purchase conversion demonstrates:'
    },
    answers: {
      ar: [
        'إطالة بقاء الزائر تتسبب بصورة قاطعة في زيادة المبيعات حتميًا',
        'وجود اقتران خطي قوي بين المتغيرين، دون أن يمثل ذلك إثباتًا للسببية المباشرة دون تجربة منضبطة',
        'وجود خلل في تسجيل الأحداث داخل نظام التتبع الرقمي',
        'أن معدل الشراء الفعلي سيكون حتمًا 88%'
      ],
      en: [
        'Prolonging user dwell time directly causes increased conversion rates',
        'A strong linear association, without constituting causal proof in the absence of controlled AB testing',
        'A systemic tracking instrumentation error in session logs',
        'That purchase conversion will deterministically equal 88%'
      ]
    },
    correct_index: 1,
    explanation: {
      ar: 'الارتباط لا يعني السببية بالضرورة؛ قد يكون هناك عامل ثالث مشترك مثل اهتمام العميل المسبق بالمنتج.',
      en: 'Correlation does not imply causation; confounding latent variables often drive observed alignment.'
    },
    sort_order: 3
  },
  {
    id: 'quiz-01-01-04',
    lesson_id: 'lesson-01-01',
    prompt: {
      ar: 'أي المخططات البيانية التالية هو الأفضل لفحص شكل التوزيع الإحصائي واكتشاف القيم الشاذة لمتغير كمي مستمر؟',
      en: 'Which chart format is most effective for evaluating distribution morphology and identifying outliers in a continuous numerical variable?'
    },
    answers: {
      ar: [
        'المخطط الدائري التقليدي (Pie Chart)',
        'مخطط الصندوق والطرفين أو المدرج التكراري (Box Plot / Histogram)',
        'مخطط الدونات الدائري (Donut Chart)',
        'الأعمدة التراكمية بنسبة 100% (100% Stacked Bar)'
      ],
      en: [
        'Conventional Pie Chart',
        'Box Plot or Frequency Histogram',
        'Donut Chart',
        '100% Stacked Bar Chart'
      ]
    },
    correct_index: 1,
    explanation: {
      ar: 'مخطط الصندوق يوضح الوسيط والربيعات ومجال التشتت والقيم المتطرفة بوضوح لا يقارن بالرسوم الدائرية.',
      en: 'Box plots explicitly depict median, quartiles, interquartile range, and suspected outliers.'
    },
    sort_order: 4
  }
];

for (const q of quizLesson01) {
  upsertQuiz.run(
    q.id,
    q.lesson_id,
    JSON.stringify(q.prompt),
    JSON.stringify(q.answers),
    q.correct_index,
    JSON.stringify(q.explanation),
    q.sort_order
  );
}

// Rich educational articles (300+ words each)
const richAcademyArticles = [
  {
    id: 'academy-article-01',
    slug: 'article-01',
    title: { ar: 'دليل الانتقال المهني إلى هندسة البيانات والذكاء الاصطناعي', en: 'The Strategic Career Transition into Data Engineering & AI' },
    category: 'Career Pathways',
    summary: {
      ar: 'خارطة طريق عملية للمطورين والمحللين للانتقال نحو بناء خطوط أنابيب البيانات الضخمة ونماذج التعلم الآلي.',
      en: 'A pragmatic roadmap for developers and analysts transitioning toward high-throughput data pipelines and machine learning systems.'
    },
    body_ar: {
      sections: [
        {
          heading: 'لماذا هندسة البيانات هي الأساس الحقيقي للذكاء الاصطناعي؟',
          content: 'كثيرًا ما يُختزل الذكاء الاصطناعي في النماذج والخوارزميات المعقدة، لكن الحقيقة الميدانية تثبت أن أكثر من 80% من نجاح أي مشروع ذكاء اصطناعي يعتمد كليًا على جودة خطوط نقل البيانات (Data Pipelines) واستقرارها. يحتاج المهندس المبتدئ لفهم كيفية سحب البيانات غير المهيكلة، وتنقيتها، وتخزينها في مستودعات سحابية قابلة للتوسع الفوري. هذا الأساس الهندسي هو ما يحول النماذج التجريبية إلى حلول إنتاجية موثوقة تخدم ملايين المستخدمين يوميًا دون توقف.'
        },
        {
          heading: 'المهارات المعيارية التي يبحث عنها سوق العمل الحديث',
          content: 'لم يعد كافيًا إتقان الاستعلامات البسيطة بلغة SQL؛ بل يتطلب سوق العمل المعاصر إتقان لغة بايثون لبناء معالجات البيانات، وفهم أدوات التنسيق الآلي مثل Airflow، والتعامل مع تقنيات التدفق الحي مثل Kafka و Spark. كما تتزايد أهمية الحوسبة السحابية (AWS و GCP) وكيفية تحسين تكاليف الاستعلامات في Snowflake و BigQuery لتجنب الفواتير الباهظة الناتجة عن الاستعلامات غير المنضبطة.'
        },
        {
          heading: 'بناء محفظة أعمال تطبيقية تثبت الكفاءة',
          content: 'أفضل طريقة لإثبات كفاءتك لأصحاب العمل ليست جمع الشهادات الورقية، بل بناء مشروع متكامل مفتوح المصدر على GitHub. قم بإنشاء خط أنابيب يجمع بيانات عامة حية، ويجري عليها عمليات تنظيف وتحويل، ويخزنها في قاعدة بيانات تحليلية، ثم يعرض النتائج في لوحة معلومات تفاعلية. هذا المشروع المتكامل يقدم دليلاً قاطعًا على قدرتك على التعامل مع التحديات التقنية الشاملة.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Why Data Engineering Underpins All Applied AI',
          content: 'Popular discourse frequently fixates on frontier machine learning algorithms, yet enterprise reality reveals that over 80% of applied AI viability hinges entirely on robust data pipeline architecture. Aspiring practitioners must master the ingest of unstructured telemetry, systematic cleansing, and resilient cloud storage orchestration. This disciplined foundation transforms ephemeral academic notebooks into high-availability systems serving millions of production requests daily.'
        },
        {
          heading: 'Core Competencies Demanded by Modern Engineering Teams',
          content: 'Fluency in basic SQL is no longer a sufficient differentiator. Contemporary teams seek engineers who wield Python for robust distributed ETL, master workflow orchestrators such as Airflow, and configure event streaming frameworks like Kafka and Spark. Equally critical is cloud cost stewardship across Snowflake and BigQuery, where query partitioning prevents costly budgetary overruns.'
        },
        {
          heading: 'Architecting an Evidence-Based Technical Portfolio',
          content: 'The most compelling demonstration of your capability is not a passive certificate but an open-source end-to-end repository. Construct a public pipeline that ingests real-time API feeds, executes idempotent transformations, loads an analytical warehouse, and surfaces business insights via an interactive dashboard. Such an artifact provides unequivocal evidence of your architectural readiness.'
        }
      ]
    }
  },
  {
    id: 'academy-article-02',
    slug: 'article-02',
    title: { ar: 'بناء نظم التصميم المعيارية للتطبيقات الضخمة', en: 'Architecting Enterprise Design Systems & Component Tokens' },
    category: 'Design Systems',
    summary: {
      ar: 'كيف توحد الفرق الهندسية والتصميمية لغة الواجهات باستخدام الرموز المعيارية والمكونات المعزولة. ابدأ بجرد الألوان والمسافات والخطوط وحالات التفاعل في المنتج الحالي، ثم أنشئ قاموسًا موحدًا للرموز التصميمية مع توثيق مصادر كل قيمة. بعد ذلك اربط الرموز بمكونات قابلة للاختبار، وأضف أمثلة عملية للحالات الفارغة والأخطاء والاستجابة لمقاسات الشاشات والاتجاه العربي. راجع التباين ولوحة المفاتيح وقارئات الشاشة قبل نشر الإصدارات الجديدة، وخصص مراجعة دورية لرصد التباين بين الفرق.',
      en: 'How cross-functional product teams synchronize visual language using atomic design tokens and isolated component libraries.'
    },
    body_ar: {
      sections: [
        {
          heading: 'الفارق بين مكتبة الأزرار ونظام التصميم المتكامل',
          content: 'يخلط العديد من المطورين بين مكتبة مكونات UI البسيطة ونظام التصميم الحقيقي (Design System). نظام التصميم ليس مجرد ملفات فيجما أو مكتبة أزرار في رياكت، بل هو لغة تواصل موحدة بين المصمم والمهندس ومدير المنتج. يتضمن النظام مبادئ إمكانية الوصول (A11y)، وتوثيق حالات الاستخدام، وإرشادات واضحة للتعامل مع التدرج اللوني والمسافات البينية والطباعة لتجنب التباين العشوائي في تجربة المستخدم.'
        },
        {
          heading: 'قوة رموز التصميم المعيارية (Design Tokens)',
          content: 'تشكل رموز التصميم (Tokens) الجسر التقني الفاصل بين التصميم والكود البرمجي. عندما نحدد قيم الألوان والمسافات والظلال في صورة متغيرات مركزية (مثل JSON أو CSS Variables)، يصبح تعديل الهوية البصرية أو دعم الوضع الليلي (Dark Mode) مسألة دقائق معدودة بدلاً من أسابيع من إعادة الكتابة اليدوية المرهقة. هذا العزل المعياري يضمن بقاء النظام متسقًا عبر مختلف المنصات.'
        },
        {
          heading: 'اختبارات المكونات وحوكمة التحديثات',
          content: 'الحفاظ على نظام تصميم ناجح يتطلب حوكمة برمجية صارمة. يجب اختبار كل مكون في بيئة معزولة مثل Storybook مع تفعيل اختبارات الانحدار البصري (Visual Regression Testing) واختبارات قارئات الشاشة للمكفوفين. عندما يشعر المطور بأن المكون مستقر وموثق، يرتفع معدل إعادة الاستخدام وتقل الأخطاء البرمجية في واجهات الإنتاج.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Distinguishing a Component Library from a True Design System',
          content: 'Product engineers frequently conflate basic UI widget kits with authentic design systems. A design system is not merely a Figma library or React button collection; it is an organizational language harmonizing designers, developers, and product managers. It encompasses accessibility criteria (WCAG), rigorous interaction state documentation, and programmatic constraints governing typographic rhythm and spatial balance.'
        },
        {
          heading: 'The Leverage of Platform-Agnostic Design Tokens',
          content: 'Design tokens constitute the immutable contract between creative tooling and production repositories. By declaring colors, radiuses, elevations, and type scales within centralized JSON schemas exported to CSS variables, theme migrations or multi-brand adaptations execute in minutes rather than quarters of manual refactoring. This modular abstraction ensures cross-platform consistency.'
        },
        {
          heading: 'Isolated Component Sandboxes & Regression Testing',
          content: 'Sustaining a living design system requires disciplined automation. Every atomic primitive must be isolated within environments like Storybook, verified against automated visual regression suites, and audited for screen-reader compatibility. When teams trust component robustness, feature delivery velocity accelerates exponentially without technical debt.'
        }
      ]
    }
  },
  {
    id: 'academy-article-03',
    slug: 'article-03',
    title: { ar: 'أساسيات تايب سكريبت لكتابة كود إنتاجي منيع ضد الأخطاء', en: 'Production TypeScript: Type Safety & Defensiveness at Scale' },
    category: 'Software Engineering',
    summary: {
      ar: 'استراتيجيات عملية لكتابة شيفرات برمجية واضحة وموثوقة تقلل من أخطاء وقت التشغيل وتبسط الصيانة.',
      en: 'Practical strategies for writing expressive, predictable TypeScript code that minimizes runtime crashes and simplifies maintenance.'
    },
    body_ar: {
      sections: [
        {
          heading: 'تجاوز مستوى المبتدئين في تايب سكريبت',
          content: 'يقتصر استخدام تايب سكريبت لدى الكثيرين على تعريف أنواع بسيطة مثل string و number، أو الهروب باستخدام any عند مواجهة تعقيد. لكن القوة الحقيقية للغة تبرز عند استخدام الأنواع المتقدمة مثل Generics، وDiscriminated Unions، وTemplate Literal Types. هذه الأدوات تجعل من المستحيل على المطور تمرير حالات غير صالحة، وتحول الأخطاء المحتملة من وقت التشغيل (Runtime) إلى وقت التحويل البرمجي (Compile-time).'
        },
        {
          heading: 'التحقق عند حدود النظام (Boundary Validation)',
          content: 'أخطر الأخطاء في تطبيقات الويب تقع عند استقبال البيانات الخارجية من خوادم API أو مدخلات المستخدم. تايب سكريبت بمفرده لا يحمي في وقت التشغيل، لذا يجب دمجه مع مكتبات تحقق مخططي مثل Zod. يتيح لك هذا النهج مطابقة البيانات الواردة مع المخطط الهندسي بدقة، مما يمنع تمرير بيانات مشوهة أو ناقصة إلى منطق العمل الأساسي في تطبيقك.'
        },
        {
          heading: 'هندسة الأنواع القابلة لإعادة الاستخدام والتوثيق الحي',
          content: 'عند كتابة أنواع جيدة التسمية والتركيب، يتحول نظام الأنواع في محرر الأكواد إلى توثيق حي متجدد لا يتقادم. يستطيع أي مطور جديد في الفريق فهم تدفق البيانات والقيود بمجرد تمرير مؤشر الفأرة، مما يقلل من وقت الاندماج ويزيد من ثقة الفريق عند إجراء تحسينات أو تعديلات هيكلية كبيرة في قاعدة الشيفرة البرمجية.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Transcending Superficial TypeScript Conventions',
          content: 'Many development teams deploy TypeScript as little more than basic scalar annotations, resorting to permissive any escapes under pressure. True production resilience emerges when leveraging advanced type algebra: discriminated unions, mapped types, and branded primitives. This expressive modeling makes invalid state transitions mathematically unrepresentable, shifting regressions from runtime crashes to compile-time guarantees.'
        },
        {
          heading: 'Enforcing Runtime Invariants at System Boundaries',
          content: 'The most precarious failure mode in web applications manifests at external integration boundaries: HTTP payloads, user forms, and environment variables. Because TypeScript types erase at runtime, pairing static declarations with runtime schema validators like Zod is mandatory. This strict parsing guarantees that corrupted or truncated payloads are repelled before corrupting business logic.'
        },
        {
          heading: 'Self-Documenting Codebases and Confident Refactoring',
          content: 'Deliberately structured type definitions serve as living documentation within IDEs that never goes stale. New engineers decipher complex transactional workflows simply through autocomplete hints and diagnostic boundaries. This clarity empowers fearless refactoring, ensuring legacy systems evolve gracefully alongside expanding business scale.'
        }
      ]
    }
  },
  {
    id: 'academy-article-04',
    slug: 'article-04',
    title: { ar: 'مؤشرات الأداء وتحسين مسار التحويل في التسويق الرقمي', en: 'Performance Metrics & Conversion Funnel Optimization' },
    category: 'Growth & Marketing',
    summary: {
      ar: 'كيف تحلل تجربة العميل رقميًا وتكتشف نقاط الهدر في مسار المبيعات لزيادة العائد على الاستثمار.',
      en: 'How to diagnose drop-off friction across user conversion funnels and maximize return on acquisition spend.'
    },
    body_ar: {
      sections: [
        {
          heading: 'تشريح قمع التحويل الرقمي (The Modern Funnel)',
          content: 'لا تبدأ رحلة العميل عند الضغط على زر الشراء، بل من اللحظة الأولى التي يشاهد فيها الإعلان أو يبحث عن حل لمشكلته. يتكون مسار التحويل من مراحل متتالية: الوعي، الاهتمام، التقييم، ثم اتخاذ القرار. يساعد تحليل كل مرحلة بشكل مستقل في معرفة أين يفقد الموقع اهتمام الزوار وتحديد المشكلات بدقة سواء كانت في سرعة التحميل، أو غموض الرسالة التسويقية، أو تعقيد نموذج الطلب.'
        },
        {
          heading: 'اختبارات أ/ب المنضبطة إحصائيًا',
          content: 'الاعتماد على الحدس والتخمين في تعديل الواجهات غالبًا ما يؤدي إلى نتائج مضللة. التحسين الحقيقي يعتمد على اختبارات أ/ب (A/B Testing) مع تحديد فرضية واضحة وحجم عينة كافٍ للوصول إلى دلالة إحصائية موثوقة (Statistical Significance). تغيير لون زر الدعوة لاتخاذ إجراء قد لا يحدث فارقًا، بينما إعادة صياغة القيمة المقترحة أو إزالة الحقول غير الضرورية في النموذج يضاعف النتائج.'
        },
        {
          heading: 'التركيز على القيمة الدائمة للعميل (LTV)',
          content: 'التركيز المفرط على تكلفة الاستحواذ الأولى (CAC) يتجاهل العامل الأهم لربحية أي مشروع: القيمة الدائمة للعميل على المدى الطويل. استراتيجيات الاحتفاظ بالعملاء، والتواصل المخصص عبر البريد الإلكتروني، وتقديم قيمة مستمرة بعد الشراء الأول هي التي تبني علامات تجارية مستدامة قادرة على النمو دون استنزاف ميزانيات الإعلانات المدفوعة.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'Dissecting the Multistage Acquisition Funnel',
          content: 'Customer decision journeys rarely culminate in a single impulsive checkout. They traverse distinct, interconnected stages: awareness, evaluation, intent, and retention. By instrumenting granular telemetry across every touchpoint, growth teams pinpoint precise drop-off friction—whether triggered by page latency, ambiguous value propositions, or unnecessary checkout fields.'
        },
        {
          heading: 'Statistically Disciplined A/B Experimentation',
          content: 'Heuristic guesswork and subjective opinions routinely mislead optimization initiatives. Enduring conversion gains stem from rigorous hypothesis testing backed by statistical power calculations and pre-determined sample sizes. While trivial button tweaks yield negligible delta, clarifying core product propositions and reducing friction consistently unlocks outsized revenue growth.'
        },
        {
          heading: 'Aligning Acquisition Economics with Lifetime Value',
          content: 'Over-indexing on upfront Customer Acquisition Cost (CAC) obscures the true driver of enterprise viability: Customer Lifetime Value (LTV). Sophisticated growth organizations prioritize lifecycle onboarding, personalized behavioral communications, and continuous customer success, fostering recurring retention that outlasts escalating paid ad bidding wars.'
        }
      ]
    }
  },
  {
    id: 'academy-article-05',
    slug: 'article-05',
    title: { ar: 'فن أبحاث المستخدم واكتشاف الاحتياجات غير المصرح بها', en: 'Uncovering Latent User Needs Through Generative Research' },
    category: 'Product & Design',
    summary: {
      ar: 'منهجيات إجراء المقابلات الاستكشافية وتحليل سلوك المستخدمين الفعلي بعيدًا عن الآراء السطحية.',
      en: 'Methodologies for conducting generative user discovery interviews and separating stated desires from real behavioral motivations.'
    },
    body_ar: {
      sections: [
        {
          heading: 'المعضلة الكلاسيكية: المستخدم لا يعرف ما يحتاجه بدقة',
          content: 'عند سؤال المستخدمين عما يريدونه في استطلاعات الرأي السريعة، غالبًا ما يطلبون ميزات إضافية معقدة لا يستخدمونها أبدًا عند إطلاقها. الباحث الماهر لا يسأل "ماذا تريد أن نضيف؟"، بل يستكشف المشاكل الحقيقية التي يواجهها المستخدم في حياته اليومية وسلوكياته السابقة. فهم الألم والجهد المبذول في الحلول البديلة الحالية هو المفتاح الحقيقي لابتكار منتجات يحبها الناس.'
        },
        {
          heading: 'صياغة الأسئلة المفتوحة وتجنب التوجيه المنحاز',
          content: 'الأسئلة التوجيهية في المقابلات تدمر جودة البيانات البحثية لأنها تدفع المستخدم للمجاملة وإعطاء إجابات ترضي الباحث. يجب صياغة أسئلة مفتوحة ومحايدة تبدأ بـ "أخبرني عن آخر مرة واجهت فيها..." مع الصمت التام وترك مساحة للمستخدم للتعبير بحرية. التركيز على الأحداث الماضية الفعلية يمنح رؤى أدق بكثير من التوقعات المستقبلية الافتراضية.'
        },
        {
          heading: 'تحويل الرؤى البحثية إلى قرارات تصميمية قابلة للقياس',
          content: 'لا تنتهي مهمة البحث بكتابة تقرير طويل يوضع في الأدراج، بل بتحويل الملاحظات إلى نماذج تفاعلية سريعة تُختبر مع مستخدمين حقيقيين. رسم خرائط رحلة العميل (Journey Maps) وتحديد نقاط الاحتكاك الأساسية يساعد الفريق الهندسي والتصميمي على توجيه طاقاتهم نحو حل المشكلات ذات الأثر الأكبر على نجاح المنتج.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'The Fallacy of Direct Feature Inquiries',
          content: 'When survey instruments directly ask users what capabilities they desire, participants routinely request superficial features they never touch in production. Astute discovery researchers avoid asking "What should we build next?", focusing instead on historical behaviors, friction workarounds, and underlying anxieties. Observing real user compensatory habits reveals authentic product opportunity.'
        },
        {
          heading: 'Formulating Neutral Prompts to Mitigate Confirmation Bias',
          content: 'Leading questions in stakeholder interviews corrupt research validity by prompting conversational acquiescence. Seasoned interviewers deploy non-directional prompts anchored in tangible past occurrences: "Walk me through the last time you attempted to...". Practicing deliberate silence allows informants to articulate latent motivations without interviewer steerage.'
        },
        {
          heading: 'Translating Qualitative Insights into Actionable Prototypes',
          content: 'Discovery research delivers zero enterprise value if confined to static slide decks. Qualitative findings must translate into testable journey maps and rapid interactive prototypes evaluated against real usability benchmarks. This iterative loop ensures engineering roadmaps resolve verified user friction rather than executive assumptions.'
        }
      ]
    }
  },
  {
    id: 'academy-article-06',
    slug: 'article-06',
    title: { ar: 'التعليم القائم على المشاريع: لماذا تتفوق الممارسة على المشاهدة السلبية؟', en: 'Project-Based Pedagogy: Why Hands-On Craft Outperforms Passive Video' },
    category: 'Pedagogy & Learning',
    summary: {
      ar: 'فلسفة التعلم في أكاديمية نوفا: كيف يساعد بناء الحلول ومواجهة الأخطاء في ترسيخ المعرفة الحقيقية.',
      en: 'The pedagogical philosophy at Nova Learning: how active problem solving and debug struggles cement enduring technical fluency.'
    },
    body_ar: {
      sections: [
        {
          heading: 'وهم الكفاءة في المشاهدة السلبية (Passive Consumption Trap)',
          content: 'يشعر الكثير من المتعلمين بالرضا الزائف عند مشاهدة ساعات طويلة من دروس الفيديو التعليمية، لكنهم يتفاجأون بالعجز التام عند فتح محرر الأكواد بمفردهم للبدء في مشروع جديد. هذا يسمى "وهم الكفاءة"، حيث يخلط الدماغ بين سهولة استيعاب الشرح والقدرة الفعلية على إنتاج الحل. لا تترسخ المعرفة التقنية إلا عندما يواجه المتعلم شاشة بيضاء ويبدأ في اتخاذ قرارات مستقلة بنفسه.'
        },
        {
          heading: 'قيمة مواجهة الأخطاء البرمجية (The Debugging Muscle)',
          content: 'في أكاديمية نوفا، نعتبر رسائل الخطأ جزءًا أساسيًا ومبهجًا من عملية التعلم. عندما يقضي المتعلم وقتًا في قراءة رسالة الخطأ، وتتبع مسار التنفيذ، والبحث عن السبب الجذري، فإنه يبني مهارة التفكير النقدي التي تميز المهندس المحترف عن المبتدئ. هذه التجربة الحية في استكشاف الأخطاء وإصلاحها هي ما يصنع الثقة الحقيقية في بيئات العمل الإنتاجية.'
        },
        {
          heading: 'مشاريع واقعية تحاكي معايير الصناعة',
          content: 'نصمم كافة تماريننا ومشاريعنا التطبيقية لتحاكي بيئات العمل الحقيقية، بما في ذلك قيود الوقت، ومتطلبات الأداء، وتنسيق الأكواد المشتركة. التخرج بمشروع متكامل تم اختباره ومراجعته بدقة يمنح المتعلم دافعًا لا مثيل له وشعورًا فوريًا بالفخر والجاهزية للانخراط في فرق العمل الحديثة بكفاءة واقتدار.'
        }
      ]
    },
    body_en: {
      sections: [
        {
          heading: 'The Illusion of Competence in Passive Video Streaming',
          content: 'Learners routinely fall prey to the passive streaming trap: spending dozens of hours watching instructors execute code seamlessly, only to encounter total paralysis when confronted with a blank editor. Neurocognitive research terms this the "illusion of competence." True neurological retention only crystallizes when the student actively synthesizes decisions, struggles with edge cases, and constructs solutions autonomously.'
        },
        {
          heading: 'Forging Critical Intuition Through Debugging Friction',
          content: 'At Nova Learning, runtime exceptions and failing test suites are heralded as pivotal milestones in mastery. The deliberate process of parsing error traces, formulating diagnostic hypotheses, and testing targeted fixes develops the analytical grit separating elite engineers from passive code copiers. Embracing productive struggle builds resilient production instincts.'
        },
        {
          heading: 'Real-World Project Simulators and Industry Benchmarks',
          content: 'We architect all capstone assignments to mirror rigorous enterprise conditions: version-controlled code reviews, automated linting, latency constraints, and boundary edge cases. Shipping a polished project evaluated against realistic industry rubrics provides unmatched professional confidence and demonstrable hiring appeal.'
        }
      ]
    }
  }
];

for (const [index, article] of richAcademyArticles.entries()) {
  const enrichment = [
  {
    "ar": "حول تحويل المعرفة إلى ممارسة عملية",
    "en": "Turning learning into a repeatable professional practice",
    "arText": "حتى يكون مسارك المهني قابلاً للقياس، قسّم خطة التعلم إلى أربع دورات قصيرة، وخصص لكل دورة مخرجًا واضحًا يمكن عرضه ومراجعته. اكتب مصادر البيانات التي تستخدمها، وحدد معايير الجودة، واحفظ قراراتك الهندسية مع بدائلها. نفّذ تجربة أولية، ثم اطلب مراجعة من زميل مستقل، وحسّن الأداء بعد تحليل الأخطاء. لا تكتفِ بعرض النتيجة النهائية؛ اشرح أيضًا كيف تأكدت من سلامة البيانات، وما القيود التي لم تتمكن من تجاوزها، وأي خطوات ستنفذها عند توسيع الحل.",
    "enText": "Translate your learning plan into four short delivery cycles, each with a reviewable artifact and clear acceptance criteria. Document your data sources, describe quality checks, and preserve engineering decisions alongside the alternatives you rejected. Deliver an early implementation, request peer review, and profile failures before optimizing performance. A convincing portfolio does more than show the final dashboard: it explains validation methods, resource constraints, trade-offs and the next steps needed to operate the system safely at higher scale."
  },
  {
    "ar": "خطة تطبيقية لتأسيس نظام تصميم موحد",
    "en": "A practical implementation checklist for design systems",
    "arText": "ابدأ بمراجعة ثلاث شاشات من المنتج الحالي وحدد مواضع الاختلاف في المسافات والألوان ونصوص الأزرار ورسائل الأخطاء. أنشئ جدولًا يربط كل اختلاف برمز تصميمي أو قاعدة استخدام، ثم اختبر المكونات في حالاتها المختلفة مثل التحميل والتعطيل والأخطاء. أضف دعم اتجاه النص العربي وتباين الألوان والتنقل باستخدام لوحة المفاتيح منذ البداية، ولا تؤجل إمكانية الوصول إلى نهاية المشروع. اختبر نسختين من المكون مع مطورين مختلفين وسجل الصعوبات، واجعل التوثيق جزءًا من مراجعة كل طلب دمج.",
    "enText": "Start by auditing three representative product screens. Record inconsistencies in spacing, typography, button labels, error messages and interaction states. Map each variation to a design token or documented usage rule, then verify components in loading, disabled, empty and failure states. Include right-to-left content, color contrast, keyboard navigation and screen-reader semantics from the first iteration. Ask two developers to implement the same flow using the system, compare friction points, and make documentation updates a required part of code review rather than optional cleanup."
  },
  {
    "ar": "ممارسة عملية للتحقق من سلامة الأنواع",
    "en": "A hands-on workflow for reliable TypeScript",
    "arText": "اختر وظيفة تتعامل مع بيانات واردة من API خارجي، وحدد شكل البيانات المتوقع ومجموعة حالات الفشل الواقعية. استخدم التحقق في وقت التشغيل قبل تحويل البيانات إلى أنواع موثوقة، ولا تعتمد على فرضيات ثابتة أو تحويلات قسرية دون دليل. اكتب اختبارات للحقل المفقود والقيمة غير المتوقعة والاستجابة المتأخرة، ثم راقب الرسائل التي سيقرأها المستخدم عند حدوث الخطأ. الهدف ليس زيادة عدد الأنواع في المشروع، بل تقليل المسارات التي تفشل بصمت وتسهيل فهم سبب العطل قبل أن يصل إلى العملاء.",
    "enText": "Choose a function that consumes data from an external API and describe the expected response alongside plausible failure cases. Validate untrusted values at runtime before promoting them to trusted TypeScript types. Avoid assertions that hide uncertainty. Add tests for missing properties, unexpected enum values, delayed responses and malformed dates. Review the error states that users will actually encounter. The objective is not maximal type complexity; it is predictable failure behavior, clearer debugging and safer refactoring when business requirements change."
  },
  {
    "ar": "دورة تحسين قابلة للقياس",
    "en": "An evidence-based optimization cycle",
    "arText": "قبل تغيير إعلان أو صفحة هبوط، سجل معدل التحويل الأساسي وحدد الحد الأدنى من البيانات المطلوبة لاتخاذ قرار. افصل بين جودة الزيارات وسهولة استخدام الصفحة وسرعة الرد على الاستفسارات، لأن كل عامل يتطلب إجراء مختلفًا. صمم تجربة تقارن تغييرًا واحدًا واضحًا، مثل صياغة العرض أو ترتيب الحقول، ثم راجع أثره على العملاء المؤهلين وليس على النقرات فقط. احتفظ بسجل القرارات والنتائج لتجنب تكرار الاختبارات الفاشلة، وراعِ خصوصية الزوار عند جمع بيانات القياس.",
    "enText": "Before changing an advertisement or landing page, record the baseline conversion rate and define the minimum evidence required for a decision. Separate traffic quality from page usability and lead-response speed because each issue requires a different intervention. Design a controlled experiment around one specific change, such as the offer or the order of form fields. Evaluate qualified leads rather than clicks alone, and maintain a decision log so unsuccessful experiments are not repeated. Preserve user privacy throughout analytics collection."
  },
  {
    "ar": "من مقابلة المستخدم إلى قرار المنتج",
    "en": "From discovery interviews to product decisions",
    "arText": "صغ سؤالًا بحثيًا محددًا عن سلوك المستخدم بدل أن تسأله هل يحب فكرة منتج جديد. اطلب منه وصف آخر مرة واجه فيها المشكلة، والخطوات التي اتبعها، والبدائل التي جربها، والتكلفة التي تحملها. قارن إجابات عدة أشخاص قبل أن تعمم النتائج، ولا تخلط بين رغبة عابرة واستعداد فعلي لتغيير السلوك. حول الملاحظات إلى فرضيات قابلة للاختبار بنموذج بسيط، ثم راقب ما يفعله المشاركون دون توجيههم إلى الإجابة التي تريدها.",
    "enText": "Frame a specific behavioral research question rather than asking whether someone likes a proposed feature. Invite participants to describe the last time they encountered the problem, their workaround, its cost and the alternatives they considered. Compare several interviews before generalizing patterns, and distinguish polite enthusiasm from willingness to change behavior. Convert observations into falsifiable hypotheses, test them with a narrow prototype, and watch how participants act without leading them toward the answer your team hopes to hear."
  },
  {
    "ar": "تعلم مبني على مشروع يمكن مراجعته",
    "en": "Build a reviewable project, not just a completed lesson",
    "arText": "لكل مهارة جديدة، حدد مشروعًا صغيرًا يوضح مفهومًا واحدًا بوضوح، ثم ضع شروط نجاح قابلة للفحص قبل بدء التنفيذ. اطلب من المتعلم شرح اختيار الأدوات وبدائلها ومصدر الأخطاء وكيف تحقق من النتيجة. استخدم مراجعة الأقران وأسئلة التفكير النقدي لتثبيت الفهم بدل الاعتماد على مشاهدة الفيديو حتى النهاية. عندما يفشل المشروع، سجل سبب الفشل والإصلاح الذي جربته والاختبار الذي منع تكراره. بهذه الطريقة يصبح سجل التعلم دليلًا على مهارة حقيقية قابلة للنقل إلى بيئة العمل.",
    "enText": "For every new skill, define a small project that demonstrates one concept and write testable success criteria before implementation. Ask the learner to explain tool selection, rejected alternatives, encountered failures and the evidence used to validate the result. Use peer review and reflective questioning to reinforce understanding rather than measuring only video completion. When a project fails, document the cause, corrective action and regression test. A visible record of these decisions becomes stronger evidence of practical competency than a completed progress bar."
  }
][index];
  article.body_ar.sections.push({ heading: enrichment.ar, content: enrichment.arText });
  article.body_en.sections.push({ heading: enrichment.en, content: enrichment.enText });
}

for (const a of richAcademyArticles) {
  upsertPost.run(a.id, acadSiteId, a.slug, a.category);
  upsertContent.run(
    `${a.id}-ar`, acadSiteId, 'editorial_post', a.id, 'ar', a.slug,
    a.title.ar,
    a.summary.ar,
    JSON.stringify(a.body_ar),
    `${a.title.ar} | نوفا للتعلم`,
    a.summary.ar
  );
  upsertContent.run(
    `${a.id}-en`, acadSiteId, 'editorial_post', a.id, 'en', a.slug,
    a.title.en,
    a.summary.en,
    JSON.stringify(a.body_en),
    `${a.title.en} | Nova Learning`,
    a.summary.en
  );
}


console.log('🎉 Full database seeding completed successfully!');
db.close();
