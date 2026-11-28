import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const data = JSON.parse(fs.readFileSync('data/verticals/salon-spa.json', 'utf8'));

test('Velora Beauty / Serene Sanctuary provides ten distinct bilingual dossiers and salon & spa content', () => {
  assert.equal(data.slug, 'salon-spa');
  assert.equal(data.services.length, 10);
  assert.equal(data.articles.length, 3);
  assert.equal(data.faq.length, 5);
  assert.equal(new Set(data.services.map((s) => s.slug)).size, 10);

  for (const s of data.services) {
    assert.ok(s.body.ar.length > 50 && s.body.en.length > 50);
    assert.ok(s.title.ar && s.title.en);
    assert.ok(s.summary.ar && s.summary.en);
  }

  assert.equal(data.media[0].license, 'CC0-1.0');

  const home = fs.readFileSync('src/app/[locale]/preview/salon-spa/page.tsx', 'utf8');
  assert.ok((home.match(/data-sector-specific=/g) || []).length >= 10);

  const api = fs.readFileSync('src/server/portfolio/salon-spa.ts', 'utf8');
  assert.match(api, /salon_appointment_interest/);
  assert.match(api, /INVALID_FIELDS/);
});

test('Velora Beauty locally hosted licensed WebP media matches provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/salon-spa.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(data.media.length, 6, 'salon-spa.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/salon-spa\/[a-z_]+\.webp$/);
    assert.ok(
      data.media.some(
        (p) =>
          (p.url === a.local || p.src === a.local) &&
          (p.source === a.source_page || p.sourceUrl === a.source_page) &&
          p.license === a.license
      ),
      `Asset ${a.local} must match entry in salon-spa.json`
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

test('Velora Beauty Journey 1: Simulated appointment interest persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'spa_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-SPA-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'shape-cut',
    durationMinutes: 60,
    staffPreference: 'hair-stylist',
    preferredDate: '2026-12-28',
    preferredWindow: 'morning',
    region: 'Cairo',
    occasion: 'everyday',
    notice: 'Demonstration concept only; no real salon, staff or appointment confirmed'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'salon-spa', 'salon_appointment_interest', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Farida El-Sayed',
    '+201012345678',
    JSON.stringify(payload),
    JSON.stringify({ source: 'direct_test', medium: 'unit_test' }),
    new Date().toISOString(),
    clientReqId
  );

  const row = db
    .prepare('SELECT id, ref_number, vertical_slug, flow_type, guest_name, payload_json FROM portfolio_requests WHERE id = ?')
    .get(reqId);

  assert.ok(row, 'Inserted row must be retrievable from portfolio_requests');
  assert.equal(row.id, reqId);
  assert.equal(row.ref_number, refNumber);
  assert.equal(row.vertical_slug, 'salon-spa');
  assert.equal(row.flow_type, 'salon_appointment_interest');
  assert.equal(row.guest_name, 'Farida El-Sayed');

  const parsedPayload = JSON.parse(row.payload_json);
  assert.equal(parsedPayload.serviceSlug, 'shape-cut');
  assert.equal(parsedPayload.durationMinutes, 60);

  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});
