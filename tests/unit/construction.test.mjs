import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('Construction: Projects count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM example_projects p 
    JOIN demo_sites s ON s.id = p.site_id 
    WHERE s.slug = 'construction'
  `).get();
  assert.equal(row.count, 12, 'Construction must have exactly 12 seeded projects');
});

test('Construction: Articles count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM editorial_posts p 
    JOIN demo_sites s ON s.id = p.site_id 
    WHERE s.slug = 'construction'
  `).get();
  assert.equal(row.count, 6, 'Construction must have 6 editorial articles');
});

test('Construction: Localized Arabic and English content integrity', () => {
  const rows = db.prepare(`
    SELECT p.slug, c.locale, c.title
    FROM example_projects p
    JOIN demo_sites s ON s.id = p.site_id
    JOIN localized_content c ON c.owner_id = p.id AND c.owner_type = 'example_project'
    WHERE s.slug = 'construction' AND p.slug = 'project-01'
  `).all();
  
  assert.equal(rows.length, 2, 'Project 01 must have 2 localized versions (ar and en)');
  const ar = rows.find(r => r.locale === 'ar');
  const en = rows.find(r => r.locale === 'en');
  assert.ok(ar && ar.title.length > 0, 'Arabic title must be present');
  assert.ok(en && en.title.length > 0, 'English title must be present');
});

test('Construction Journey 1: Simulated Tender Quote submission persists to SQLite', () => {
  const site = db.prepare("SELECT id FROM demo_sites WHERE slug = 'construction'").get();
  assert.ok(site, 'Construction site record exists');

  const subId = 'test_sub_' + Date.now();
  const payload = {
    sector: 'commercial',
    projectStage: 'new_tender',
    services: ['fit-out', 'mep'],
    areaM2: 680,
    timeline: '3_months',
    budgetBand: 'medium',
    clientName: 'Test Corporation',
    clientContact: 'procurement@testcorp.com',
    refNumber: 'MVX-CON-999999'
  };

  db.prepare(`
    INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
    VALUES (?, ?, 'construction_quote', 'simulated', ?)
  `).run(subId, site.id, JSON.stringify(payload));

  // Insert lines
  db.prepare(`
    INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, quantity, unit_price_cents)
    VALUES (?, ?, 'service', 'fit-out', 1, 1500000)
  `).run('line_1_' + Date.now(), subId);

  // Assert submission exists in DB
  const fetched = db.prepare('SELECT * FROM demo_submissions WHERE id = ?').get(subId);
  assert.ok(fetched, 'Submission was persisted');
  assert.equal(fetched.flow_type, 'construction_quote');
  assert.equal(fetched.status, 'simulated');

  const parsed = JSON.parse(fetched.payload_json);
  assert.equal(parsed.areaM2, 680);
  assert.equal(parsed.clientName, 'Test Corporation');

  // Verify line items
  const lines = db.prepare('SELECT * FROM demo_submission_lines WHERE submission_id = ?').all(subId);
  assert.equal(lines.length, 1);
  assert.equal(lines[0].source_id, 'fit-out');

  // Admin status transition to 'reviewed'
  db.prepare("UPDATE demo_submissions SET status = 'reviewed' WHERE id = ?").run(subId);
  const updated = db.prepare('SELECT status FROM demo_submissions WHERE id = ?').get(subId);
  assert.equal(updated.status, 'reviewed', 'Admin was able to transition submission status to reviewed');
});

test('Atlas Construction uses six local WebP assets matching documented sizes and SHA-256', () => {
  const manifest = JSON.parse(fs.readFileSync('docs/30-verticals/media/construction.media-manifest.json', 'utf8'));
  const media = fs.readFileSync('src/app/[locale]/preview/construction/media.ts', 'utf8');

  assert.equal(manifest.vertical, 'construction');
  assert.equal(manifest.assets.length, 6);
  assert.equal(new Set(manifest.assets.map(a => a.id)).size, 6);

  for (const a of manifest.assets) {
    assert.match(a.local, /^\/assets\/portfolio\/construction\/[a-z]+\.webp$/);
    assert.ok(a.author && a.license && a.license_url && a.source_page && a.changes);
    assert.match(a.original_sha1, /^[a-f0-9]{40}$/);
    const bytes = fs.readFileSync('public' + a.local);
    assert.equal(bytes.length, a.bytes);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), a.sha256);
    assert.ok(media.includes("url: '" + a.local + "'"));
  }

  assert.ok(!media.includes('upload.wikimedia.org'));
  assert.ok(!media.includes('images.unsplash.com'));
});
