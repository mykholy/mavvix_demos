import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const data = JSON.parse(fs.readFileSync('data/verticals/home-maintenance.json', 'utf8'));

test('ProFix Services / Fixora Care provides eight distinct bilingual dossiers and facility engineering content', () => {
  assert.equal(data.slug, 'home-maintenance');
  assert.equal(data.services.length, 8);
  assert.equal(data.articles.length, 3);
  assert.equal(data.faq.length, 5);
  assert.equal(new Set(data.services.map((s) => s.slug)).size, 8);

  for (const s of data.services) {
    assert.ok(s.body.ar.length > 50 && s.body.en.length > 50);
    assert.ok(s.title.ar && s.title.en);
    assert.ok(s.summary.ar && s.summary.en);
  }

  assert.equal(data.media[0].license, 'CC0-1.0');

  const home = fs.readFileSync('src/app/[locale]/preview/home-maintenance/page.tsx', 'utf8');
  assert.ok((home.match(/data-sector-specific=/g) || []).length >= 10);

  const api = fs.readFileSync('src/server/portfolio/home-maintenance.ts', 'utf8');
  assert.match(api, /home_maintenance_request/);
  assert.match(api, /INVALID_FIELDS/);
  assert.match(api, /pending_operator_confirmation/);
});

test('ProFix Services locally hosted licensed WebP media matches provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/home-maintenance.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(data.media.length, 6, 'home-maintenance.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/home-maintenance\/[a-z_]+\.webp$/);
    assert.ok(
      data.media.some(
        (p) =>
          (p.url === a.local || p.src === a.local) &&
          (p.source === a.source_page || p.sourceUrl === a.source_page) &&
          p.license === a.license
      ),
      `Asset ${a.local} must match entry in home-maintenance.json`
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

test('ProFix Services Journey 1: Simulated maintenance request persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'hm_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-HM-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'ac-maintenance',
    issue: 'poor_performance',
    urgency: 'priority',
    region: 'Cairo',
    visitType: 'inspection',
    preferredDate: '2026-12-28',
    preferredWindow: 'morning',
    propertyType: 'apartment',
    notice: 'Portfolio request only; no technician dispatch, visit, cost, or emergency support confirmed'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'home-maintenance', 'home_maintenance_request', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Hassan El-Sayed',
    '+201123456789',
    JSON.stringify(payload),
    JSON.stringify({ source: 'test', medium: 'unit', campaign: 'profix_check' }),
    new Date().toISOString(),
    clientReqId
  );

  const row = db
    .prepare('SELECT * FROM portfolio_requests WHERE id = ?')
    .get(reqId);

  assert.ok(row, 'Inserted row must exist in SQLite');
  assert.equal(row.ref_number, refNumber);
  assert.equal(row.vertical_slug, 'home-maintenance');
  assert.equal(row.flow_type, 'home_maintenance_request');
  assert.equal(row.guest_name, 'Hassan El-Sayed');

  const storedPayload = JSON.parse(row.payload_json);
  assert.equal(storedPayload.serviceSlug, 'ac-maintenance');
  assert.equal(storedPayload.issue, 'poor_performance');
  assert.equal(storedPayload.urgency, 'priority');
  assert.equal(storedPayload.propertyType, 'apartment');

  // Clean up test entry
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
  const checkClean = db.prepare('SELECT id FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.equal(checkClean, undefined);
});
