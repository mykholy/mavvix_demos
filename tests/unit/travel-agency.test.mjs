import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const data = JSON.parse(fs.readFileSync('data/verticals/travel-agency.json', 'utf8'));

test('Nomad Routes provides eight distinct bilingual journey dossiers and credible planning material', () => {
  assert.equal(data.slug, 'travel-agency');
  assert.equal(data.services.length, 8);
  assert.equal(data.articles.length, 3);
  assert.equal(data.faq.length, 5);
  assert.equal(new Set(data.services.map((j) => j.slug)).size, 8);

  for (const j of data.services) {
    assert.ok(j.body.ar.length > 140 && j.body.en.length > 140);
    assert.equal(j.checkpoints.ar.length, 3);
    assert.equal(j.checkpoints.en.length, 3);
    if (j.days !== null) assert.ok(j.days >= 2 && j.days <= 5);
  }

  assert.equal(data.media[0].license, 'CC0-1.0');

  const home = fs.readFileSync('src/app/[locale]/preview/travel-agency/page.tsx', 'utf8');
  assert.ok((home.match(/data-sector-specific=/g) || []).length >= 9);

  const api = fs.readFileSync('src/server/portfolio/travel-agency.ts', 'utf8');
  assert.match(api, /COUNTRY_MISMATCH/);
  assert.match(api, /DURATION_MISMATCH/);
  assert.match(api, /INVALID_DATE/);
  assert.match(api, /pending_operator_confirmation/);
  assert.match(api, /\.strict\(\)/);
});

test('Nomad Routes locally hosted licensed WebP media matches provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/travel-agency.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(data.media.length, 6, 'travel-agency.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/travel-agency\/[a-z_]+\.webp$/);
    assert.ok(
      data.media.some(
        (p) =>
          p.url === a.local &&
          p.source === a.source_page &&
          p.license === a.license
      ),
      `Asset ${a.local} must match entry in travel-agency.json`
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

test('Nomad Routes Journey 1: Simulated travel planning enquiry persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'nomad_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-NOM-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'cairo-heritage',
    country: 'egypt',
    duration: 3,
    groupSize: 2,
    departureDate: '2026-12-10',
    pace: 'balanced',
    budgetBand: 'comfort',
    notice: 'Illustrative travel planning request. No reservation, ticket, visa, price or payment confirmed.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'travel-agency', 'travel_planning_request', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Farida El-Gendy',
    '+20 100 234 5678',
    JSON.stringify(payload),
    JSON.stringify({ source: 'instagram', campaign: 'heritage-cairo' }),
    new Date().toISOString(),
    clientReqId
  );

  const row = db
    .prepare("SELECT * FROM portfolio_requests WHERE id = ? AND vertical_slug = 'travel-agency'")
    .get(reqId);

  assert.ok(row, 'Inserted row must be found in SQLite');
  assert.equal(row.ref_number, refNumber);
  assert.equal(row.guest_name, 'Farida El-Gendy');
  assert.equal(row.flow_type, 'travel_planning_request');

  const storedPayload = JSON.parse(row.payload_json);
  assert.equal(storedPayload.serviceSlug, 'cairo-heritage');
  assert.equal(storedPayload.country, 'egypt');
  assert.equal(storedPayload.duration, 3);
  assert.equal(storedPayload.groupSize, 2);

  // Clean up test row
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
  const deleted = db.prepare('SELECT id FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.equal(deleted, undefined, 'Test row should be cleaned up');
});
