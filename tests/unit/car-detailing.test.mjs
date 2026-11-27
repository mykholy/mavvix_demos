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

test('GlossBay: Ten detailing treatments and content integrity', () => {
  const content = JSON.parse(fs.readFileSync(path.join(rootDir, 'data/verticals/car-detailing.json'), 'utf8'));
  assert.equal(content.slug, 'car-detailing');
  assert.equal(content.services.length, 10, 'Must have exactly 10 authored treatments');
  assert.equal(content.articles.length, 3, 'Must have exactly 3 editorial guides');
  assert.equal(content.faq.length, 5, 'Must have exactly 5 consumer FAQs');
  assert.equal(new Set(content.services.map((x) => x.slug)).size, 10, 'All service slugs must be distinct');
  assert.equal(new Set(content.addons.map((x) => x.slug)).size, 4, 'Must have 4 distinct add-ons');
  assert.equal(new Set(content.vehicleSizes.map((x) => x.slug)).size, 4, 'Must have 4 vehicle sizes');

  for (const s of content.services) {
    assert.ok(s.body.ar.length > 140, 'Arabic body must be substantive for: ' + s.slug);
    assert.ok(s.body.en.length > 140, 'English body must be substantive for: ' + s.slug);
    assert.ok(s.durations.length >= 2, 'Must have duration variations for: ' + s.slug);
    assert.ok(s.checks.ar.length >= 3 && s.checks.en.length >= 3, 'Must have quality checklist for: ' + s.slug);
  }
});

test('GlossBay: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
  const manifestPath = path.join(rootDir, 'docs', '30-verticals', 'media', 'car-detailing.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'car-detailing.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.sector, 'car-detailing');
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

test('GlossBay Journey 1: Simulated quote request persists to SQLite portfolio_requests', () => {
  const reqId = 'gbq_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-GB-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    vehicleSize: 'sedan',
    treatment: 'ceramic-protection',
    addons: ['wheels-off', 'glass-coating'],
    condition: 'paint-marring',
    requestedDate: '2026-12-15',
    requestedWindow: 'morning',
    city: 'Cairo',
    scope: 'Nonbinding car-care estimate enquiry',
    price: null,
    currency: null,
    operatorConfirmed: false
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'car-detailing', 'car_detailing_quote_request', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Tarek Mostafa (Test)',
    '+20 100 987 6543',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_test' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Request must be inserted');
  assert.equal(inserted.vertical_slug, 'car-detailing');
  assert.equal(inserted.flow_type, 'car_detailing_quote_request');
  assert.equal(inserted.ref_number, refNumber);

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.vehicleSize, 'sedan');
  assert.equal(parsed.treatment, 'ceramic-protection');
  assert.equal(parsed.addons.length, 2);

  // Clean up
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});
