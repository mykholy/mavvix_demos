import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const d = JSON.parse(fs.readFileSync('data/verticals/solar-energy.json', 'utf8'));

test('VoltEdge authored solution dossiers and strict preliminary assessment', () => {
  assert.equal(d.services.length, 8);
  assert.equal(d.articles.length, 3);
  assert.equal(d.faq.length, 5);
  assert.equal(new Set(d.services.map((s) => s.slug)).size, 8);

  for (const s of d.services) {
    assert.ok(d.categories.includes(s.category));
    assert.ok(s.body.ar.length > 120 && s.body.en.length > 120);
    assert.equal(s.checkpoints.ar.length, 3);
    assert.equal(s.checkpoints.en.length, 3);
  }

  const api = fs.readFileSync('src/server/portfolio/solar-energy.ts', 'utf8');
  assert.match(api, /\.strict\(\)/);
  assert.match(api, /SITE_TYPE_MISMATCH/);
  assert.match(api, /pending_operator_confirmation/);
  assert.match(api, /Cache-Control/);

  const form = fs.readFileSync(
    'src/app/[locale]/preview/solar-energy/assessment/AssessmentForm.tsx',
    'utf8'
  );
  assert.doesNotMatch(form, /type="file"|<textarea/);
});

test('VoltEdge locally hosted editorial WebP assets match verified source and provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/solar-energy.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(d.media.length, 6, 'solar-energy.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/solar-energy\/[a-z_]+\.webp$/);
    assert.ok(
      d.media.some(
        (p) =>
          p.url === a.local &&
          p.source === a.source_page &&
          p.license === a.license &&
          p.originalSha1 === a.original_sha1
      ),
      `Asset ${a.local} must match entry in solar-energy.json`
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
      `License URL for ${a.id} must be Creative Commons`
    );
  }
});

test('VoltEdge Journey 1: Simulated solar assessment enquiry persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'vlt_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-VLT-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'commercial-rooftop',
    siteType: 'commercial',
    consumptionBand: '2000-9999',
    gridType: 'connected',
    spaceType: 'roof',
    country: 'egypt',
    notice:
      'Preliminary project enquiry only. No engineered system, savings estimate, quote, site visit or installation confirmed.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'solar-energy', 'solar_assessment_request', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Eng. Tarek Radwan (Operations Dir)',
    '+20 100 123 4567',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'yield_calibrator' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Solar assessment enquiry must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'solar-energy');
  assert.equal(inserted.flow_type, 'solar_assessment_request');
  assert.equal(inserted.ref_number, refNumber);
  assert.equal(inserted.guest_name, 'Eng. Tarek Radwan (Operations Dir)');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.serviceSlug, 'commercial-rooftop');
  assert.equal(parsed.siteType, 'commercial');
  assert.equal(parsed.consumptionBand, '2000-9999');
  assert.equal(parsed.gridType, 'connected');
  assert.equal(parsed.spaceType, 'roof');

  // Cleanup test row
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
  const deleted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.equal(deleted, undefined, 'Test row must be cleaned up');
});
