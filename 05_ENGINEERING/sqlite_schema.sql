-- Mavvix Demo Factory V2: SQLite reference schema. Use migrations in application.
-- Only synthetic data; demo mode is NOT a live service. Kept outside /public.
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS demo_sites (
 id TEXT PRIMARY KEY,
 slug TEXT NOT NULL UNIQUE CHECK(slug IN ('construction','industrial','real-estate','dental','ecommerce','portfolio','restaurant','academy')),
 name_ar TEXT NOT NULL, name_en TEXT NOT NULL,
 theme_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(theme_json)),
 published INTEGER NOT NULL DEFAULT 0 CHECK(published IN (0,1)),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS admin_users (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('owner','editor','viewer')),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS admin_sessions (
 id TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
 token_hash TEXT NOT NULL UNIQUE, expires_at TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_exp ON admin_sessions(expires_at);

CREATE TABLE IF NOT EXISTS site_pages (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 route_key TEXT NOT NULL, layout_variant TEXT NOT NULL DEFAULT 'default',
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','archived')),
 sort_order INTEGER NOT NULL DEFAULT 0,
 metadata_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(metadata_json)),
 revision INTEGER NOT NULL DEFAULT 1 CHECK(revision>0),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(site_id,route_key)
);
CREATE TABLE IF NOT EXISTS page_sections (
 id TEXT PRIMARY KEY, page_id TEXT NOT NULL REFERENCES site_pages(id) ON DELETE CASCADE,
 section_type TEXT NOT NULL, section_variant TEXT NOT NULL DEFAULT 'default',
 settings_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(settings_json)),
 sort_order INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1))
);
CREATE TABLE IF NOT EXISTS localized_content (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 owner_type TEXT NOT NULL, owner_id TEXT NOT NULL,
 locale TEXT NOT NULL CHECK(locale IN ('ar','en')), slug TEXT,
 title TEXT NOT NULL, summary TEXT NOT NULL DEFAULT '', body_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(body_json)),
 seo_title TEXT NOT NULL DEFAULT '', seo_description TEXT NOT NULL DEFAULT '',
 UNIQUE(site_id,owner_type,owner_id,locale)
);
CREATE TABLE IF NOT EXISTS media_assets (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 file_path TEXT NOT NULL, mime_type TEXT NOT NULL,
 alt_ar TEXT NOT NULL DEFAULT '', alt_en TEXT NOT NULL DEFAULT '',
 width INTEGER NOT NULL DEFAULT 0 CHECK(width>=0), height INTEGER NOT NULL DEFAULT 0 CHECK(height>=0),
 rights TEXT NOT NULL DEFAULT 'generated_concept',
 CHECK(file_path NOT LIKE 'http://%')
);
CREATE TABLE IF NOT EXISTS media_links (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 owner_type TEXT NOT NULL, owner_id TEXT NOT NULL,
 asset_id TEXT NOT NULL REFERENCES media_assets(id), sort_order INTEGER NOT NULL DEFAULT 0,
 caption_ar TEXT, caption_en TEXT
);
CREATE TABLE IF NOT EXISTS revision_snapshots (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 owner_type TEXT NOT NULL, owner_id TEXT NOT NULL,
 version INTEGER NOT NULL, snapshot_json TEXT NOT NULL CHECK(json_valid(snapshot_json)),
 created_by TEXT REFERENCES admin_users(id), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(site_id,owner_type,owner_id,version)
);
CREATE TABLE IF NOT EXISTS editorial_posts (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 slug TEXT NOT NULL, category TEXT NOT NULL, cover_asset_id TEXT REFERENCES media_assets(id),
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','archived')),
 published_at TEXT, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(site_id,slug)
);

-- Cross-vertical catalog and work examples: independent of localizations.
CREATE TABLE IF NOT EXISTS catalog_categories (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 slug TEXT NOT NULL, parent_id TEXT REFERENCES catalog_categories(id),
 sort_order INTEGER NOT NULL DEFAULT 0, UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS catalog_items (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id), category_id TEXT REFERENCES catalog_categories(id),
 sku TEXT, slug TEXT NOT NULL, item_type TEXT NOT NULL,
 base_price_cents INTEGER CHECK(base_price_cents IS NULL OR base_price_cents>=0),
 currency TEXT NOT NULL DEFAULT 'EGP',
 attributes_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(attributes_json)),
 status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE(site_id,slug), UNIQUE(site_id,sku)
);
CREATE TABLE IF NOT EXISTS catalog_variants (
 id TEXT PRIMARY KEY, item_id TEXT NOT NULL REFERENCES catalog_items(id) ON DELETE CASCADE,
 code TEXT NOT NULL, attributes_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(attributes_json)),
 stock_qty INTEGER CHECK(stock_qty IS NULL OR stock_qty>=0),
 min_qty INTEGER NOT NULL DEFAULT 1 CHECK(min_qty>0),
 pack_multiple INTEGER NOT NULL DEFAULT 1 CHECK(pack_multiple>0),
 price_cents INTEGER CHECK(price_cents IS NULL OR price_cents>=0),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), UNIQUE(item_id,code)
);
CREATE TABLE IF NOT EXISTS example_projects (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 slug TEXT NOT NULL, project_type TEXT NOT NULL, city TEXT,
 area_m2 INTEGER CHECK(area_m2 IS NULL OR area_m2>0),
 attributes_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(attributes_json)),
 status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
 UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS property_developments (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 slug TEXT NOT NULL, city TEXT NOT NULL, attributes_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(attributes_json)),
 status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
 UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS property_units (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 development_id TEXT NOT NULL REFERENCES property_developments(id), slug TEXT NOT NULL,
 unit_type TEXT NOT NULL, price_cents INTEGER NOT NULL CHECK(price_cents>=0),
 area_m2 INTEGER NOT NULL CHECK(area_m2>0), bedrooms INTEGER NOT NULL DEFAULT 0 CHECK(bedrooms>=0),
 bathrooms INTEGER NOT NULL DEFAULT 0 CHECK(bathrooms>=0),
 status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('available','reserved_demo','unavailable','draft')),
 attributes_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(attributes_json)), UNIQUE(site_id,slug)
);
CREATE INDEX IF NOT EXISTS idx_property_filters ON property_units(site_id,unit_type,status,price_cents,area_m2);
CREATE TABLE IF NOT EXISTS dental_practitioners (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id), slug TEXT NOT NULL,
 focus TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
 UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS demo_time_slots (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 owner_type TEXT NOT NULL, owner_id TEXT NOT NULL, starts_at TEXT NOT NULL,
 capacity INTEGER NOT NULL DEFAULT 1 CHECK(capacity>0),
 status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('available','unavailable')),
 UNIQUE(site_id,owner_type,owner_id,starts_at)
);
CREATE TABLE IF NOT EXISTS restaurant_dishes (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id), slug TEXT NOT NULL,
 category TEXT NOT NULL, price_cents INTEGER NOT NULL CHECK(price_cents>=0),
 allergens_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(allergens_json)),
 attributes_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(attributes_json)),
 available INTEGER NOT NULL DEFAULT 1 CHECK(available IN (0,1)), UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS dish_modifiers (
 id TEXT PRIMARY KEY, dish_id TEXT NOT NULL REFERENCES restaurant_dishes(id) ON DELETE CASCADE,
 modifier_group TEXT NOT NULL, label_ar TEXT NOT NULL, label_en TEXT NOT NULL,
 price_delta_cents INTEGER NOT NULL DEFAULT 0, available INTEGER NOT NULL DEFAULT 1 CHECK(available IN (0,1))
);
CREATE TABLE IF NOT EXISTS academy_courses (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id), slug TEXT NOT NULL,
 track TEXT NOT NULL, level TEXT NOT NULL, duration_minutes INTEGER NOT NULL CHECK(duration_minutes>0),
 example_price_cents INTEGER NOT NULL DEFAULT 0 CHECK(example_price_cents>=0),
 status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
 UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS academy_lessons (
 id TEXT PRIMARY KEY, course_id TEXT NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
 slug TEXT NOT NULL, module_index INTEGER NOT NULL, lesson_index INTEGER NOT NULL,
 minutes INTEGER NOT NULL CHECK(minutes>0),
 preview_enabled INTEGER NOT NULL DEFAULT 0 CHECK(preview_enabled IN (0,1)),
 content_json TEXT NOT NULL CHECK(json_valid(content_json)),
 UNIQUE(course_id,slug)
);
CREATE TABLE IF NOT EXISTS academy_quiz_questions (
 id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES academy_lessons(id) ON DELETE CASCADE,
 prompt_json TEXT NOT NULL CHECK(json_valid(prompt_json)),
 answers_json TEXT NOT NULL CHECK(json_valid(answers_json)),
 correct_index INTEGER NOT NULL CHECK(correct_index>=0),
 explanation_json TEXT NOT NULL CHECK(json_valid(explanation_json)), sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS demo_guest_progress (
 guest_token_hash TEXT NOT NULL, lesson_id TEXT NOT NULL REFERENCES academy_lessons(id),
 completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0,1)),
 quiz_score INTEGER CHECK(quiz_score IS NULL OR (quiz_score BETWEEN 0 AND 100)),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(guest_token_hash,lesson_id)
);

-- Demonstrative transactional records, no outbound effects.
CREATE TABLE IF NOT EXISTS demo_submissions (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 flow_type TEXT NOT NULL CHECK(flow_type IN ('construction_quote','industrial_rfq','real_estate_viewing','dental_appointment','ecommerce_order','portfolio_inquiry','restaurant_order','restaurant_table','academy_interest')),
 status TEXT NOT NULL DEFAULT 'simulated' CHECK(status IN ('simulated','reviewed','archived','rejected')),
 payload_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(payload_json)),
 guest_token_hash TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 expires_at TEXT NOT NULL DEFAULT (datetime('now','+7 days'))
);
CREATE TABLE IF NOT EXISTS demo_submission_lines (
 id TEXT PRIMARY KEY, submission_id TEXT NOT NULL REFERENCES demo_submissions(id) ON DELETE CASCADE,
 source_type TEXT NOT NULL, source_id TEXT NOT NULL,
 variant_id TEXT REFERENCES catalog_variants(id), quantity INTEGER NOT NULL CHECK(quantity>0),
 unit_price_cents INTEGER CHECK(unit_price_cents IS NULL OR unit_price_cents>=0),
 modifiers_json TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(modifiers_json)),
 snapshot_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(snapshot_json))
);
CREATE INDEX IF NOT EXISTS idx_demo_submissions_site_status ON demo_submissions(site_id,flow_type,status,created_at);
CREATE INDEX IF NOT EXISTS idx_demo_submission_lines_req ON demo_submission_lines(submission_id);

-- Demo pricing configuration, must be server-evaluated; never trust client total.
CREATE TABLE IF NOT EXISTS demo_pricing_rules (
 id TEXT PRIMARY KEY, site_id TEXT NOT NULL REFERENCES demo_sites(id),
 rule_type TEXT NOT NULL, code TEXT, config_json TEXT NOT NULL CHECK(json_valid(config_json)),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
 starts_at TEXT, ends_at TEXT, UNIQUE(site_id,rule_type,code)
);
CREATE TABLE IF NOT EXISTS admin_audit_log (
 id TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admin_users(id),
 site_id TEXT REFERENCES demo_sites(id), action TEXT NOT NULL, entity_type TEXT NOT NULL,
 entity_id TEXT NOT NULL, metadata_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(metadata_json)),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_site ON admin_audit_log(site_id,created_at);
