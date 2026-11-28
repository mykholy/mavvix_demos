import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const file = JSON.parse(fs.readFileSync(path.join(root, 'data/verticals/wholesale.json'), 'utf8'));
const dbPath = path.join(root, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('TradeBridge catalogue, carton units and strict dual-flow contracts', () => {
  assert.equal(file.services.length, 8);
  assert.equal(file.articles.length, 3);
  assert.equal(file.faq.length, 5);
  assert.equal(new Set(file.services.map(s => s.slug)).size, 8);
  assert.equal(new Set(file.services.map(s => s.sku)).size, 8);

  for (const s of file.services) {
    assert.ok(file.categories.includes(s.category));
    assert.ok(s.body.ar.length > 120 && s.body.en.length > 120);
    assert.equal(s.checkpoints.ar.length, 3);
    assert.equal(s.checkpoints.en.length, 3);
    assert.ok(Number.isInteger(s.unitsPerCarton) && s.unitsPerCarton > 0);
    assert.ok(Number.isInteger(s.minCartons) && s.minCartons >= 2 && s.maxCartons <= 1000);
    assert.equal(s.classification, 'illustrative_catalogue_no_live_inventory');
  }

  const api = fs.readFileSync(path.join(root, 'src/server/portfolio/wholesale.ts'), 'utf8');
  assert.match(api, /discriminatedUnion/);
  assert.match(api, /DUPLICATE_LINES/);
  assert.match(api, /TOTAL_CARTONS_EXCEEDED/);
  assert.match(api, /line\.cartons\*item\.unitsPerCarton/);
  assert.match(api, /REQUEST_TYPE_CONFLICT/);
  assert.match(api, /pending_operator_confirmation/);
  assert.match(api, /Cache-Control/);
});

test('TradeBridge licensed local media matches manifest and catalogue with 6 WebP assets', () => {
  const manifestPath = path.join(root, 'docs', '30-verticals', 'media', 'wholesale.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'wholesale.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.vertical, 'wholesale');
  assert.equal(manifest.assets.length, 6, 'Must document exactly 6 photographic assets');

  for (const a of manifest.assets) {
    assert.equal(a.source_sha1_verified, true);
    const assetPath = path.join(root, 'public', a.local.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Asset file ${a.local} must exist locally`);

    const bytes = fs.readFileSync(assetPath);
    assert.equal(bytes.length, a.bytes, `File size for ${a.id} must match manifest bytes`);

    // RIFF WEBP magic bytes validation
    const isRiffWebp =
      bytes.length >= 12 &&
      bytes.toString('ascii', 0, 4) === 'RIFF' &&
      bytes.toString('ascii', 8, 12) === 'WEBP';
    assert.ok(isRiffWebp, `Asset ${a.id} must be a valid RIFF/WEBP binary`);

    const hash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);

    assert.ok(
      file.media.some(m => m.url === a.local && m.source === a.source_page && m.license === a.license),
      `Asset ${a.local} must be present in wholesale.json media list`
    );
  }
});

test('TradeBridge Journey 1: Simulated wholesale RFQ multi-line enquiry persists to SQLite portfolio_requests', () => {
  const reqId = 'tbr_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-TBR-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const lines = [
    { serviceSlug: 'kraft-shipping-boxes', sku: 'PKG-BX-KFT-100', cartons: 20, unitsPerCarton: 50, illustrativeUnits: 1000 },
    { serviceSlug: 'thermal-receipt-rolls', sku: 'OFC-THM-8070-50', cartons: 10, unitsPerCarton: 50, illustrativeUnits: 500 }
  ];

  const payload = {
    organization: 'Al-Madina Retail Group (Test)',
    country: 'saudi-arabia',
    buyerType: 'retailer',
    deliveryPreference: 'delivery',
    lines,
    totalCartons: 30,
    illustrativeTotalUnits: 1500,
    notice: 'Illustrative RFQ only. No stock, confirmed price, purchase order, payment or delivery.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'wholesale', 'wholesale_rfq', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Fahad Al-Otaibi (Procurement Director)',
    '+966 50 123 4567',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'procurement_calibrator' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Wholesale RFQ must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'wholesale');
  assert.equal(inserted.flow_type, 'wholesale_rfq');
  assert.equal(inserted.ref_number, refNumber);
  assert.equal(inserted.guest_name, 'Fahad Al-Otaibi (Procurement Director)');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.organization, 'Al-Madina Retail Group (Test)');
  assert.equal(parsed.country, 'saudi-arabia');
  assert.equal(parsed.totalCartons, 30);
  assert.equal(parsed.illustrativeTotalUnits, 1500);
  assert.equal(parsed.lines.length, 2);
  assert.match(parsed.notice, /Illustrative RFQ only/);

  // Clean up test record
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});

test('TradeBridge Journey 2: Simulated supplier registration persists to SQLite portfolio_requests', () => {
  const reqId = 'tbr_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-TBR-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    organization: 'Delta Pack Manufacturing Egypt',
    country: 'egypt',
    category: 'packaging',
    supplierType: 'manufacturer',
    coverage: 'regional',
    notice: 'Supplier contact interest only; no verification, listing, marketplace access or contract.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'wholesale', 'wholesale_supplier_interest', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Sameh Abdel-Aziz (Plant Manager)',
    '+20 102 333 7890',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'supplier_intake' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Wholesale supplier registration must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'wholesale');
  assert.equal(inserted.flow_type, 'wholesale_supplier_interest');
  assert.equal(inserted.ref_number, refNumber);

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.organization, 'Delta Pack Manufacturing Egypt');
  assert.equal(parsed.category, 'packaging');
  assert.equal(parsed.supplierType, 'manufacturer');
  assert.match(parsed.notice, /Supplier contact interest only/);

  // Clean up test record
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});
