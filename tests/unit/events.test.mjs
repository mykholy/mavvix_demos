import { createHash, randomBytes, randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const data = JSON.parse(fs.readFileSync('data/verticals/events.json', 'utf8'));

test('Luma original bilingual event dossiers and safe event brief', () => {
  assert.equal(data.slug, 'events');
  assert.equal(data.services.length, 8);
  assert.equal(data.articles.length, 3);
  assert.equal(data.faq.length, 5);
  assert.equal(new Set(data.services.map((x) => x.slug)).size, 8);

  for (const s of data.services) {
    assert.ok(s.body.ar.length > 120 && s.body.en.length > 120);
    assert.ok(data.eventTypes.includes(s.category));
    assert.equal(s.checkpoints.ar.length, 3);
    assert.equal(s.checkpoints.en.length, 3);
  }

  assert.ok(data.media[0].licenseUrl.startsWith('https://creativecommons.org/'));

  const api = fs.readFileSync('src/server/portfolio/events.ts', 'utf8');
  assert.match(api, /EVENT_TYPE_MISMATCH/);
  assert.match(api, /INVALID_DATE/);
  assert.match(api, /pending_operator_confirmation/);
  assert.match(api, /\.strict\(\)/);
});

test('Luma locally hosted licensed WebP media matches provenance hashes with 6 assets', () => {
  const m = JSON.parse(
    fs.readFileSync('docs/30-verticals/media/events.media-manifest.json', 'utf8')
  );
  assert.equal(m.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(data.media.length, 6, 'events.json must contain exactly 6 media assets');

  for (const a of m.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/events\/[a-z_]+\.webp$/);
    assert.ok(
      data.media.some(
        (p) =>
          p.url === a.local &&
          p.source === a.source_page &&
          p.license === a.license
      ),
      `Asset ${a.local} must match entry in events.json`
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

test('Luma Journey 1: Simulated event planning brief enquiry persists to SQLite portfolio_requests', () => {
  const dbPath = path.join(process.cwd(), 'data', 'mavvix-demo.sqlite');
  const db = new DatabaseSync(dbPath);

  const reqId = 'luma_test_' + randomUUID();
  const clientReqId = randomUUID();
  const refNumber = 'MVX-LUM-' + randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'corporate-conferences',
    country: 'egypt',
    eventType: 'corporate',
    guestBand: '150-299',
    venueStatus: 'shortlisted',
    eventDate: '2026-12-15',
    budgetBand: 'premium',
    notice: 'Illustrative event enquiry only. No venue, vendor, capacity, price or payment confirmed.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'events', 'event_planning_request', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Kareem Mansour',
    '+20 100 987 6543',
    JSON.stringify(payload),
    JSON.stringify({ source: 'linkedin', campaign: 'csuite-summit' }),
    new Date().toISOString(),
    clientReqId
  );

  const row = db
    .prepare("SELECT * FROM portfolio_requests WHERE id = ? AND vertical_slug = 'events'")
    .get(reqId);

  assert.ok(row, 'Inserted row must be found in SQLite');
  assert.equal(row.ref_number, refNumber);
  assert.equal(row.guest_name, 'Kareem Mansour');
  assert.equal(row.flow_type, 'event_planning_request');

  const storedPayload = JSON.parse(row.payload_json);
  assert.equal(storedPayload.serviceSlug, 'corporate-conferences');
  assert.equal(storedPayload.guestBand, '150-299');
  assert.equal(storedPayload.budgetBand, 'premium');

  // Clean up test row
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
  const deleted = db.prepare('SELECT id FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.equal(deleted, undefined, 'Test row should be cleaned up');
});
