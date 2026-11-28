import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const file = JSON.parse(fs.readFileSync(path.join(root, 'data/verticals/recruitment.json'), 'utf8'));
const dbPath = path.join(root, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('Talentyx authored service dossiers, illustrative roles and distinct intake contracts', () => {
  assert.equal(file.services.length, 8);
  assert.equal(file.roles.length, 6);
  assert.equal(file.articles.length, 3);
  assert.equal(file.faq.length, 5);
  assert.equal(new Set(file.services.map((s) => s.slug)).size, 8);

  for (const s of file.services) {
    assert.ok(file.categories.includes(s.category));
    assert.ok(s.body.ar.length > 120 && s.body.en.length > 120);
    assert.equal(s.checkpoints.ar.length, 3);
    assert.equal(s.checkpoints.en.length, 3);
  }

  for (const r of file.roles) {
    assert.equal(r.classification, 'illustrative_role_not_vacancy');
    assert.ok(file.sectors.includes(r.sector));
    assert.equal(r.skills.en.length, 3);
    assert.equal(r.skills.ar.length, 3);
  }

  const api = fs.readFileSync(path.join(root, 'src/server/portfolio/recruitment.ts'), 'utf8');
  assert.match(api, /discriminatedUnion/);
  assert.match(api, /REQUEST_TYPE_CONFLICT/);
  assert.match(api, /pending_operator_confirmation/);
  assert.match(api, /Cache-Control/);

  const form = fs.readFileSync(path.join(root, 'src/app/[locale]/preview/recruitment/RecruitmentForm.tsx'), 'utf8');
  assert.doesNotMatch(form, /type="file"|<textarea/);
});

test('Talentyx local editorial WebP assets match original source and provenance hashes with 6 assets', () => {
  const manifestPath = path.join(root, 'docs', '30-verticals', 'media', 'recruitment.media-manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'recruitment.media-manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.vertical, 'recruitment');
  assert.equal(manifest.assets.length, 6, 'Must document exactly 6 photographic assets');
  assert.equal(file.media.length, 6, 'recruitment.json must contain exactly 6 media assets');

  for (const a of manifest.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/recruitment\/[a-z_]+\.webp$/);
    assert.ok(
      file.media.some(
        (p) =>
          p.url === a.local &&
          p.source === a.source_page &&
          p.license === a.license &&
          p.originalSha1 === a.original_sha1 &&
          p.creditUrl === a.credit_url
      ),
      `Asset ${a.local} must match entry in recruitment.json`
    );
    assert.equal(a.source_sha1_verified, true);

    const assetPath = path.join(root, 'public', a.local.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Asset file ${a.local} must exist locally`);

    const bytes = fs.readFileSync(assetPath);
    assert.equal(bytes.length, a.bytes, `File size for ${a.id} must match manifest bytes`);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');

    const hash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);

    assert.match(a.original_sha1, /^[a-f0-9]{40}$/);
    assert.ok(
      a.license_url.startsWith('https://creativecommons.org/') ||
        a.license_url.startsWith('http://creativecommons.org/'),
      `License URL for ${a.id} must be Creative Commons`
    );
  }
});

test('Talentyx Journey 1: Simulated employer hiring brief enquiry persists to SQLite portfolio_requests', () => {
  const reqId = 'tlx_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-TLX-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'permanent-hiring',
    organization: 'Acme MENA Technologies (Test)',
    sector: 'technology',
    country: 'uae',
    headcount: '2-5',
    engagement: 'permanent',
    timeline: 'within-month',
    notice: 'Employer scope enquiry only; no candidate search or placement confirmed.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'recruitment', 'employer_hiring_brief', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Kareem Mansour (VP Engineering)',
    '+971 50 987 6543',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'headcount_calibrator' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Employer hiring brief enquiry must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'recruitment');
  assert.equal(inserted.flow_type, 'employer_hiring_brief');
  assert.equal(inserted.ref_number, refNumber);
  assert.equal(inserted.guest_name, 'Kareem Mansour (VP Engineering)');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.organization, 'Acme MENA Technologies (Test)');
  assert.equal(parsed.sector, 'technology');
  assert.equal(parsed.headcount, '2-5');
  assert.equal(parsed.engagement, 'permanent');
  assert.match(parsed.notice, /Employer scope enquiry only/);

  // Clean up test record
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});

test('Talentyx Journey 2: Simulated candidate career interest persists to SQLite portfolio_requests', () => {
  const reqId = 'tlx_test_' + crypto.randomUUID();
  const clientReqId = crypto.randomUUID();
  const refNumber = 'MVX-TLX-' + crypto.randomBytes(5).toString('hex').toUpperCase();

  const payload = {
    serviceSlug: 'career-guidance',
    roleSlug: 'senior-fullstack-engineer',
    sector: 'technology',
    country: 'egypt',
    workPreference: 'hybrid',
    experienceBand: 'senior',
    notice: 'Illustrative role interest only; no vacancy, application, interview, scoring or placement.'
  };

  db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, 'recruitment', 'candidate_career_interest', ?, ?, ?, ?, ?, ?)
  `).run(
    reqId,
    refNumber,
    'Nourhan Al-Sayed (Lead Developer Test)',
    '+20 101 234 5678',
    JSON.stringify(payload),
    JSON.stringify({ source: 'ci_unit_test', medium: 'role_explorer' }),
    new Date().toISOString(),
    clientReqId
  );

  const inserted = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(reqId);
  assert.ok(inserted, 'Candidate career interest must be inserted into SQLite');
  assert.equal(inserted.vertical_slug, 'recruitment');
  assert.equal(inserted.flow_type, 'candidate_career_interest');
  assert.equal(inserted.ref_number, refNumber);

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.roleSlug, 'senior-fullstack-engineer');
  assert.equal(parsed.workPreference, 'hybrid');
  assert.equal(parsed.experienceBand, 'senior');
  assert.match(parsed.notice, /Illustrative role interest only/);

  // Clean up test record
  db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(reqId);
});
