import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('Ecommerce: Products count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM catalog_items i 
    JOIN demo_sites s ON s.id = i.site_id 
    WHERE s.slug = 'ecommerce'
  `).get();
  assert.equal(row.count, 24, 'Ecommerce must have exactly 24 seeded products');
});

test('Ecommerce: Variants count and out-of-stock fixtures', () => {
  const variants = db.prepare(`
    SELECT COUNT(*) as count 
    FROM catalog_variants v 
    JOIN catalog_items i ON i.id = v.item_id 
    JOIN demo_sites s ON s.id = i.site_id 
    WHERE s.slug = 'ecommerce'
  `).get();
  assert.ok(variants.count >= 60, `Ecommerce must have at least 60 variants (got ${variants.count})`);

  // Check sold-out variants for Journey 2
  const soldOut = db.prepare(`
    SELECT COUNT(*) as count 
    FROM catalog_variants v 
    JOIN catalog_items i ON i.id = v.item_id 
    JOIN demo_sites s ON s.id = i.site_id 
    WHERE s.slug = 'ecommerce' AND v.stock_qty = 0
  `).get();
  assert.ok(soldOut.count >= 5, `Ecommerce must have at least 5 intentionally sold out variants (got ${soldOut.count})`);
});

test('Ecommerce: Collections count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM catalog_categories c 
    JOIN demo_sites s ON s.id = c.site_id 
    WHERE s.slug = 'ecommerce'
  `).get();
  assert.equal(row.count, 4, 'Ecommerce must have 4 collections (apparel, dresses, accessories, sets)');
});

test('Ecommerce Journey 3: Coupon pricing rules verification in SQLite', () => {
  const rules = db.prepare(`
    SELECT code, active, config_json 
    FROM demo_pricing_rules 
    WHERE site_id = (SELECT id FROM demo_sites WHERE slug = 'ecommerce')
  `).all();

  assert.equal(rules.length, 3, 'Must have 3 demo pricing rules');

  const demo10 = rules.find(r => r.code === 'DEMO10');
  assert.ok(demo10, 'DEMO10 rule must exist');
  assert.equal(demo10.active, 1, 'DEMO10 must be active');

  const old20 = rules.find(r => r.code === 'OLD20');
  assert.ok(old20, 'OLD20 rule must exist');
  assert.equal(old20.active, 0, 'OLD20 must be expired/inactive');

  const huge = rules.find(r => r.code === 'HUGE');
  assert.ok(huge, 'HUGE rule must exist');
  const hugeConfig = JSON.parse(huge.config_json);
  assert.equal(hugeConfig.min_cart_egp, 5000, 'HUGE requires 5000 EGP minimum subtotal');
});

test('Ecommerce Journey 1: Simulated Order with lines persists to SQLite', () => {
  const site = db.prepare("SELECT id FROM demo_sites WHERE slug = 'ecommerce'").get();
  assert.ok(site, 'Ecommerce site must exist');

  const refNumber = `MVX-ECOM-${Math.floor(100000 + Math.random() * 900000)}`;
  const subId = `sub-test-ecom-${Date.now()}`;
  const payload = {
    recipientName: 'Farida Mansour (Demo Customer)',
    recipientPhone: '+20 100 555 7777',
    recipientEmail: 'farida.test@mavvix.test',
    shippingZone: 'Cairo',
    streetAddress: '22 Gezira St, Zamalek',
    subtotalCents: 179800,
    shippingCents: 7000,
    discountCents: 17980,
    totalCents: 168820,
    paymentMethod: 'SIMULATED_COD',
    refNumber
  };

  db.prepare(`
    INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
    VALUES (?, ?, 'ecommerce_order', 'simulated', ?)
  `).run(
    subId,
    site.id,
    JSON.stringify(payload)
  );

  // Insert two order lines
  db.prepare(`
    INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, variant_id, quantity, unit_price_cents, modifiers_json, snapshot_json)
    VALUES (?, ?, 'product_variant', 'sku-01', 'sku-01-v1', 2, 89900, '[]', ?)
  `).run(
    `line-test-${Date.now()}`,
    subId,
    JSON.stringify({ title: 'Linen Cotton Shirt', size: 'M', color: 'black' })
  );

  const inserted = db.prepare('SELECT * FROM demo_submissions WHERE id = ?').get(subId);
  assert.ok(inserted, 'Order submission must exist');
  assert.equal(inserted.flow_type, 'ecommerce_order');
  assert.equal(inserted.status, 'simulated');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.totalCents, 168820);
  assert.equal(parsed.paymentMethod, 'SIMULATED_COD');

  const lines = db.prepare('SELECT * FROM demo_submission_lines WHERE submission_id = ?').all(subId);
  assert.equal(lines.length, 1);
  assert.equal(lines[0].quantity, 2);
});

