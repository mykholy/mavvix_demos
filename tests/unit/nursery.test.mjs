import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const data = JSON.parse(fs.readFileSync('data/verticals/nursery.json', 'utf8'));

test('BloomSteps Early Education provides eight distinct bilingual programmes and credible early years material', () => {
  assert.equal(data.slug, 'nursery');
  assert.equal(data.services.length, 8);
  assert.equal(data.articles.length, 3);
  assert.equal(data.faq.length, 5);
  assert.equal(new Set(data.services.map((s) => s.slug)).size, 8);

  for (const s of data.services) {
    assert.ok(s.body.ar.length > 100 && s.body.en.length > 100);
    assert.ok(s.title.ar && s.title.en);
    assert.ok(s.summary.ar && s.summary.en);
  }

  assert.equal(data.media[0].license, 'CC0-1.0');

  const home = fs.readFileSync('src/app/[locale]/preview/nursery/page.tsx', 'utf8');
  assert.ok((home.match(/data-sector-specific=/g) || []).length >= 9);

  const api = fs.readFileSync('src/server/portfolio/nursery.ts', 'utf8');
  assert.match(api, /nursery_visit_interest/);
  assert.match(api, /AGE_PROGRAM_MISMATCH/);
  assert.match(api, /PROGRAMME_UNAVAILABLE/);
  assert.match(api, /pending_operator_confirmation/);
  assert.match(api, /\.strict\(\)/);
});

test('BloomSteps locally hosted licensed WebP media matches provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/nursery.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(data.media.length, 6, 'nursery.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/nursery\/[a-z_]+\.webp$/);
    assert.ok(
      data.media.some(
        (p) =>
          p.url === a.local &&
          p.source === a.source_page &&
          p.license === a.license
      ),
      `Asset ${a.local} must match entry in nursery.json`
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

test('BloomSteps Journey 1: Simulated guardian visit enquiry persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'bloom_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-BLM-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    ageBand: '2-3',
    serviceSlug: 'curious-toddlers',
    requestType: 'visit',
    region: 'Cairo',
    preferredDate: '2026-12-15',
    preferredWindow: 'morning',
    notice: 'Illustrative guardian enquiry only; no real nursery capacity or admission confirmed.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'nursery', 'nursery_visit_interest', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Yasmin Radwan',
    '+20 101 234 5678',
    JSON.stringify(payload),
    JSON.stringify({ source: 'facebook', campaign: 'early-years-cairo' }),
    new Date().toISOString(),
    clientReqId
  );

  const row = db
    .prepare("SELECT * FROM portfolio_requests WHERE id = ? AND vertical_slug = 'nursery'")
    .get(reqId);

  assert.ok(row, 'Inserted row must be found in SQLite');
  assert.equal(row.ref_number, refNumber);
  assert.equal(row.guest_name, 'Yasmin Radwan');
  assert.equal(row.flow_type, 'nursery_visit_interest');

  const storedPayload = JSON.parse(row.payload_json);
  assert.equal(storedPayload.ageBand, '2-3');
  assert.equal(storedPayload.serviceSlug, 'curious-toddlers');
  assert.equal(storedPayload.requestType, 'visit');
  assert.equal(storedPayload.region, 'Cairo');

  // Clean up test row
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
  const deleted = db.prepare('SELECT id FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.equal(deleted, undefined, 'Test row should be cleaned up');
});
