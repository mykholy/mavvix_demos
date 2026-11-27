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

test('Real Estate: Developments and Units count in SQLite', () => {
  const devs = db.prepare("SELECT COUNT(*) as count FROM property_developments WHERE site_id = 'site-real-estate'").get();
  assert.equal(devs.count, 5, 'Real Estate must have 5 developments');

  const units = db.prepare("SELECT COUNT(*) as count FROM property_units WHERE site_id = 'site-real-estate'").get();
  assert.equal(units.count, 24, 'Real Estate must have 24 property units');
});

test('Real Estate: Articles count in SQLite', () => {
  const row = db.prepare("SELECT COUNT(*) as count FROM editorial_posts WHERE site_id = 'site-real-estate'").get();
  assert.equal(row.count, 6, 'Real Estate must have 6 buyer guides/articles');
});

test('Real Estate: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
  const manifestPath = path.join(rootDir, 'docs', '30-verticals', 'media', 'real-estate.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'real-estate.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.vertical, 'real-estate');
  assert.equal(manifest.assets.length, 6, 'Must document exactly 6 photographic assets');

  for (const a of manifest.assets) {
    const assetPath = path.join(rootDir, 'public', a.file.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Asset file ${a.file} must exist locally`);

    const stat = fs.statSync(assetPath);
    assert.equal(stat.size, a.byte_size, `File size for ${a.id} must match manifest byte_size`);

    const buf = fs.readFileSync(assetPath);
    // RIFF WEBP magic bytes validation
    const isRiffWebp = buf.length >= 12 &&
      buf.toString('ascii', 0, 4) === 'RIFF' &&
      buf.toString('ascii', 8, 12) === 'WEBP';
    assert.ok(isRiffWebp, `Asset ${a.file} must be a valid RIFF/WEBP binary`);

    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);
  }
});

test('Real Estate Journey 1: Viewing request persists to SQLite', () => {
  const site = db.prepare("SELECT id FROM demo_sites WHERE slug = 'real-estate'").get();
  assert.ok(site, 'Real estate site record exists');

  const subId = 'test_viewing_' + Date.now();
  const payload = {
    unitSlug: 'prop-01',
    unitTitle: 'Sky Villa Penthouse',
    priceEgp: 14500000,
    preferredDay: 'tuesday',
    preferredTime: 'afternoon_2pm',
    viewingMode: 'in_person',
    clientName: 'Sarah Mansour',
    clientEmail: 'sarah.mansour@example.com',
    clientPhone: '+20 100 123 4567',
    notes: 'Interested in payment plans',
    refNumber: 'MVX-REA-777777'
  };

  db.prepare(`
    INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
    VALUES (?, ?, 'real_estate_viewing', 'simulated', ?)
  `).run(subId, site.id, JSON.stringify(payload));

  db.prepare(`
    INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, quantity, unit_price_cents)
    VALUES (?, ?, 'property_unit', 'prop-01', 1, 1450000000)
  `).run('line_rea_' + Date.now(), subId);

  // Assert submission in DB
  const fetched = db.prepare('SELECT * FROM demo_submissions WHERE id = ?').get(subId);
  assert.ok(fetched, 'Viewing request was persisted');
  assert.equal(fetched.flow_type, 'real_estate_viewing');
  assert.equal(fetched.status, 'simulated');

  const parsed = JSON.parse(fetched.payload_json);
  assert.equal(parsed.unitSlug, 'prop-01');
  assert.equal(parsed.preferredDay, 'tuesday');
  assert.equal(parsed.clientName, 'Sarah Mansour');

  // Clean up
  db.prepare('DELETE FROM demo_submission_lines WHERE submission_id = ?').run(subId);
  db.prepare('DELETE FROM demo_submissions WHERE id = ?').run(subId);
});
