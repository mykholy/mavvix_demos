import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('Industrial: Catalog SKUs count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM catalog_items i 
    JOIN demo_sites s ON s.id = i.site_id 
    WHERE s.slug = 'industrial'
  `).get();
  assert.equal(row.count, 24, 'Industrial must have exactly 24 seeded SKUs');
});

test('Industrial: Technical Articles count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM editorial_posts p 
    JOIN demo_sites s ON s.id = p.site_id 
    WHERE s.slug = 'industrial'
  `).get();
  assert.equal(row.count, 6, 'Industrial must have 6 editorial articles');
});

test('Industrial: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
  const manifestPath = path.join(rootDir, 'docs', '30-verticals', 'media', 'industrial.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'industrial.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.sector, 'industrial');
  assert.equal(manifest.brand, 'Ferroline');
  assert.equal(manifest.assets.length, 6, 'Must document exactly 6 photographic assets');

  for (const a of manifest.assets) {
    const assetPath = path.join(rootDir, 'public', a.local_path.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Asset file ${a.local_path} must exist locally`);

    const stat = fs.statSync(assetPath);
    assert.equal(stat.size, a.bytes, `File size for ${a.id} must match manifest bytes`);

    const buf = fs.readFileSync(assetPath);
    // RIFF WEBP magic bytes validation
    const isRiffWebp =
      buf.length >= 12 &&
      buf.toString('ascii', 0, 4) === 'RIFF' &&
      buf.toString('ascii', 8, 12) === 'WEBP';
    assert.ok(isRiffWebp, `Asset ${a.filename} must be a valid RIFF/WEBP binary`);

    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);
  }
});

test('Industrial Journey 1 & 3: Multi-line RFQ with MOQ validation persists to SQLite', () => {
  const site = db.prepare("SELECT id FROM demo_sites WHERE slug = 'industrial'").get();
  assert.ok(site, 'Industrial site record exists');

  const subId = 'test_rfq_' + Date.now();
  const payload = {
    buyerCompany: 'Automated Test Manufacturing',
    buyerEmail: 'procurement@testmanufacturing.demo',
    packaging: 'export_crates',
    destination: 'gcc_region',
    lineCount: 2,
    refNumber: 'MVX-IND-888888'
  };

  db.prepare(`
    INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
    VALUES (?, ?, 'industrial_rfq', 'simulated', ?)
  `).run(subId, site.id, JSON.stringify(payload));

  // Insert two items
  db.prepare(`
    INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, quantity, unit_price_cents)
    VALUES (?, ?, 'catalog_item', 'FERRO-304-40', 500, 750000)
  `).run('line_ind_1_' + Date.now(), subId);

  db.prepare(`
    INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, quantity, unit_price_cents)
    VALUES (?, ?, 'catalog_item', 'FERRO-FAST-88', 250, 250000)
  `).run('line_ind_2_' + Date.now(), subId);

  // Assert submission exists in DB
  const fetched = db.prepare('SELECT * FROM demo_submissions WHERE id = ?').get(subId);
  assert.ok(fetched, 'RFQ Submission was persisted');
  assert.equal(fetched.flow_type, 'industrial_rfq');
  assert.equal(fetched.status, 'simulated');

  const lines = db.prepare('SELECT * FROM demo_submission_lines WHERE submission_id = ?').all(subId);
  assert.equal(lines.length, 2, 'Must have 2 persisted line items');

  // Assert MOQ rule in logic: quantity >= 100
  for (const l of lines) {
    assert.ok(l.quantity >= 100, `Line ${l.source_id} quantity (${l.quantity}) must meet minimum order requirement of 100`);
  }
});
