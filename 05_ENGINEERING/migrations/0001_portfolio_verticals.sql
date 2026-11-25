-- Additive extension; legacy demo_sites and demo_submissions constraints must not be rebuilt.
CREATE TABLE IF NOT EXISTS portfolio_verticals (
 slug TEXT PRIMARY KEY CHECK(length(slug) BETWEEN 3 AND 64),
 name_ar TEXT NOT NULL, name_en TEXT NOT NULL,
 wave INTEGER NOT NULL CHECK(wave BETWEEN 1 AND 3),
 published INTEGER NOT NULL DEFAULT 0 CHECK(published IN (0,1)),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS portfolio_services (
 id TEXT PRIMARY KEY, vertical_slug TEXT NOT NULL REFERENCES portfolio_verticals(slug),
 slug TEXT NOT NULL, category TEXT NOT NULL,
 content_json TEXT NOT NULL CHECK(json_valid(content_json)),
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(vertical_slug,slug)
);
CREATE INDEX IF NOT EXISTS idx_portfolio_services_vertical ON portfolio_services(vertical_slug,category,active);
CREATE TABLE IF NOT EXISTS portfolio_requests (
 id TEXT PRIMARY KEY,
 ref_number TEXT NOT NULL UNIQUE,
 vertical_slug TEXT NOT NULL REFERENCES portfolio_verticals(slug),
 flow_type TEXT NOT NULL CHECK(length(flow_type) BETWEEN 4 AND 72),
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','qualified','quoted','won','lost','archived')),
 guest_name TEXT NOT NULL CHECK(length(guest_name) BETWEEN 2 AND 140),
 guest_phone TEXT NOT NULL CHECK(length(guest_phone) BETWEEN 8 AND 24),
 payload_json TEXT NOT NULL CHECK(json_valid(payload_json)),
 utm_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(utm_json)),
 consent_at TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 expires_at TEXT NOT NULL DEFAULT (datetime('now','+30 days'))
);
CREATE INDEX IF NOT EXISTS idx_portfolio_requests_list ON portfolio_requests(vertical_slug,status,created_at DESC);
