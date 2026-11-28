import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const file = JSON.parse(fs.readFileSync(path.join(root, 'data/verticals/law-firm.json'), 'utf8'));
const dbPath = path.join(root, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('Lexora Counsel has eight distinct bilingual service dossiers and valid taxonomy', () => {
  assert.equal(file.slug, 'law-firm');
  assert.equal(file.services.length, 8);
  assert.equal(new Set(file.services.map(s => s.slug)).size, 8);

  for (const s of file.services) {
    assert.ok(s.title.ar.length >= 6 && s.title.en.length >= 8, `Title for ${s.slug} must be substantive`);
    assert.ok(s.body.ar.length > 130 && s.body.en.length > 130, `Body for ${s.slug} must be comprehensive`);
    assert.ok(s.reviewPoints.ar.length >= 3, `reviewPoints.ar for ${s.slug} must have >= 3 items`);
    assert.ok(s.reviewPoints.en.length >= 3, `reviewPoints.en for ${s.slug} must have >= 3 items`);
  }
});

test('Lexora Counsel contains three original editorial guides and structured FAQs', () => {
  assert.equal(file.articles.length, 3);
  assert.ok(file.faq.length >= 4);
  for (const a of file.articles) {
    assert.ok(a.body.ar.length > 150 && a.body.en.length > 150);
  }
});

test('Law firm public intake enforces strict confidentiality guardrails', () => {
  const code = fs.readFileSync(path.join(root, 'src/server/portfolio/law-firm.ts'), 'utf8');
  const schema = code.slice(code.indexOf('const schema='), code.indexOf('.strict();'));
  // Ensure no adverse party, case ID, privileged documents, or confidential dispute details can be accepted
  assert.doesNotMatch(schema, /(adverseParty|caseNumber|caseId|courtDocket|documentUpload|uploadedFile|confidentialFacts|disputeAmount)/i);
  assert.match(code, /pending_operator_confirmation/);
  assert.match(code, /clientRequestId/);
  assert.match(code, /legal_consultation_interest/);
});

test('Lexora Counsel: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
  const manifestPath = path.join(root, 'docs', '30-verticals', 'media', 'law-firm.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'law-firm.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.vertical, 'law-firm');
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

test('Lexora Counsel Journey 1: Simulated consultation enquiry persists to SQLite portfolio_requests', () => {
  const reqId = 'lex_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-LEX-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    practiceSlug: 'corporate-governance',
    jurisdiction: 'egypt',
    clientType: 'business',
    contactChannel: 'phone',
    preferredWindow: 'morning',
    importantNotice: 'Portfolio interest only. No legal engagement, attorney-client relationship, confidentiality privilege, representation, consultation, deadline monitoring or fee quote.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'law-firm', 'legal_consultation_interest', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Tarek El-Sayed (Corporate Counsel Test)',
    '+20 100 555 4321',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'autonomous_v3' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Legal consultation request must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'law-firm');
  assert.equal(inserted.flow_type, 'legal_consultation_interest');
  assert.equal(inserted.ref_number, refNumber);
  assert.equal(inserted.guest_name, 'Tarek El-Sayed (Corporate Counsel Test)');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.practiceSlug, 'corporate-governance');
  assert.equal(parsed.jurisdiction, 'egypt');
  assert.match(parsed.importantNotice, /No legal engagement/);

  // Clean up test record
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});
