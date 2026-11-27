import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const file = JSON.parse(fs.readFileSync(path.join(root, 'data/verticals/veterinary.json'), 'utf8'));
const dbPath = path.join(root, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('PawWell has eight distinct bilingual service dossiers and an actual species-aware catalog', () => {
  assert.equal(file.slug, 'veterinary');
  assert.equal(file.services.length, 8);
  assert.equal(new Set(file.services.map(s => s.slug)).size, 8);
  assert.equal(file.species.length, 5);
  for (const s of file.services) {
    assert.ok(s.title.ar.length >= 6 && s.title.en.length >= 8);
    assert.ok(s.body.ar.length > 130 && s.body.en.length > 130);
    assert.equal(s.checklist.ar.length, 3);
    assert.equal(s.checklist.en.length, 3);
    assert.ok(s.species.length >= 1);
    for (const id of s.species) assert.ok(file.species.some(p => p.id === id), 'invalid species ' + id);
  }
});

test('PawWell contains three real editorial guides and five focused FAQs', () => {
  assert.equal(file.articles.length, 3);
  assert.equal(file.faq.length, 5);
  for (const a of file.articles) {
    assert.ok(a.body.ar.length > 180 && a.body.en.length > 180);
  }
});

test('veterinary public form has no identifiable clinical record fields or impersonated confirmed booking', () => {
  const code = fs.readFileSync(path.join(root, 'src/server/portfolio/veterinary.ts'), 'utf8');
  const schema = code.slice(code.indexOf('const requestSchema'), code.indexOf('const reject='));
  assert.doesNotMatch(schema, /(medicalHistory|medicalHistory|diagnosis|prescription|microchip|petName|uploadedPhoto|notes:)/i);
  assert.match(code, /pending_operator_confirmation/);
  assert.match(code, /clientRequestId/);
  assert.match(code, /SERVICE_SPECIES_MISMATCH/);
});

test('PawWell: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
  const manifestPath = path.join(root, 'docs', '30-verticals', 'media', 'veterinary.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'veterinary.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.vertical, 'veterinary');
  assert.equal(manifest.assets.length, 6, 'Must document exactly 6 photographic assets');

  for (const a of manifest.assets) {
    const assetPath = path.join(root, 'public', a.local.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Asset file ${a.local} must exist locally`);

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

test('PawWell Journey 1: Simulated veterinary visit request persists to SQLite portfolio_requests', () => {
  const reqId = 'vet_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-VET-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    species: 'dog',
    ageBand: 'young',
    serviceSlug: 'wellness-visit',
    visitPreference: 'clinic',
    preferredDate: '2026-12-15',
    preferredWindow: 'morning',
    region: 'Cairo',
    disclosure: 'Showcase preference only, no veterinarian, actual appointment, clinical service or emergency response.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'veterinary', 'veterinary_visit_interest', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Farida Mansour (Test)',
    '+20 100 888 9999',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_test' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Veterinary request must be inserted');
  assert.equal(inserted.vertical_slug, 'veterinary');
  assert.equal(inserted.flow_type, 'veterinary_visit_interest');
  assert.equal(inserted.ref_number, refNumber);

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.species, 'dog');
  assert.equal(parsed.serviceSlug, 'wellness-visit');

  // Clean up
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});
