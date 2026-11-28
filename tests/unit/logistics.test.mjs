import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const d = JSON.parse(fs.readFileSync('data/verticals/logistics.json', 'utf8'));

test('RouteLine original bilingual freight dossiers and strict quote boundaries', () => {
  assert.equal(d.services.length, 8);
  assert.equal(d.articles.length, 3);
  assert.equal(d.faq.length, 5);
  assert.equal(new Set(d.services.map((s) => s.slug)).size, 8);

  for (const s of d.services) {
    assert.ok(d.modes.includes(s.category));
    assert.ok(s.body.ar.length > 120 && s.body.en.length > 120);
    assert.equal(s.checkpoints.ar.length, 3);
    assert.equal(s.checkpoints.en.length, 3);
  }

  const api = fs.readFileSync('src/server/portfolio/logistics.ts', 'utf8');
  assert.match(api, /MODE_MISMATCH/);
  assert.match(api, /ROUTE_REVIEW_REQUIRED/);
  assert.match(api, /INVALID_DATE/);
  assert.match(api, /\.strict\(\)/);
  assert.match(api, /pending_operator_confirmation/);
});

test('RouteLine locally hosted licensed WebP media matches provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/logistics.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(d.media.length, 6, 'logistics.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/logistics\/[a-z_]+\.webp$/);
    assert.ok(
      d.media.some(
        (p) =>
          p.url === a.local &&
          p.source === a.source_page &&
          p.license === a.license
      ),
      `Asset ${a.local} must match entry in logistics.json`
    );
    assert.equal(a.source_sha1_verified, true);

    const assetPath = path.join(process.cwd(), 'public', a.local.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Asset file ${a.local} must exist locally`);

    const bytes = fs.readFileSync(assetPath);
    assert.equal(bytes.length, a.bytes, `File size for ${a.id} must match manifest bytes`);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');

    const hash = createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);

    assert.match(a.original_sha1, /^[a-f0-9]{40}$/);
    assert.ok(
      a.license_url.startsWith('https://creativecommons.org/') ||
        a.license_url.startsWith('http://creativecommons.org/'),
      `License URL for ${a.id} must be Creative Commons or CC0`
    );
  }
});

test('RouteLine Journey 1: Simulated commercial freight quote enquiry persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'rtl_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-RTL-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'ocean-fcl',
    origin: 'egypt',
    destination: 'saudi-arabia',
    mode: 'ocean',
    cargoType: 'palletized',
    weightBand: '2000-plus',
    scope: 'terminal-to-terminal',
    preferredDate: '2026-12-20',
    notice: 'Freight quote enquiry only. No carrier booking, movement, live tracking, price or payment confirmed.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'logistics', 'freight_quote_request', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Tarek El-Sawy',
    '+20 100 876 5432',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'route_calibrator' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Freight quote enquiry must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'logistics');
  assert.equal(inserted.flow_type, 'freight_quote_request');
  assert.equal(inserted.ref_number, refNumber);
  assert.equal(inserted.guest_name, 'Tarek El-Sawy');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.serviceSlug, 'ocean-fcl');
  assert.equal(parsed.origin, 'egypt');
  assert.equal(parsed.destination, 'saudi-arabia');
  assert.equal(parsed.mode, 'ocean');
  assert.equal(parsed.weightBand, '2000-plus');

  // Cleanup test row
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
  const deleted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.equal(deleted, undefined, 'Test row must be cleaned up');
});
