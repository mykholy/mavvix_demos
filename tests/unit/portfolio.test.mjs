import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');
const db = new DatabaseSync(dbPath);

test('Portfolio: Case studies count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM example_projects p 
    JOIN demo_sites s ON s.id = p.site_id 
    WHERE s.slug = 'portfolio'
  `).get();
  assert.equal(row.count, 12, 'Portfolio must have exactly 12 seeded case studies');
});

test('Portfolio: Thought articles count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM editorial_posts p 
    JOIN demo_sites s ON s.id = p.site_id 
    WHERE s.slug = 'portfolio'
  `).get();
  assert.equal(row.count, 6, 'Portfolio must have 6 thought essays');
});

test('Portfolio Journey 1: Project brief inquiry persists to SQLite', () => {
  const site = db.prepare("SELECT id FROM demo_sites WHERE slug = 'portfolio'").get();
  assert.ok(site, 'Portfolio site must exist');

  const refNumber = `MVX-PORT-${Math.floor(100000 + Math.random() * 900000)}`;
  const subId = `sub-test-port-${Date.now()}`;
  const payload = {
    serviceSlug: 'brand-identity',
    serviceName: 'Comprehensive Brand Identity Systems',
    referencedCaseSlug: 'case-01',
    projectGoal: 'Rebranding enterprise venture ahead of regional expansion',
    timelineWindow: 'q3-2025',
    budgetBand: 'growth',
    clientName: 'Marwan Khalil (Demo Test)',
    clientOrganization: 'Apex Ventures',
    clientEmail: 'marwan.test@mavvix.test',
    refNumber
  };

  db.prepare(`
    INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
    VALUES (?, ?, 'portfolio_inquiry', 'simulated', ?)
  `).run(
    subId,
    site.id,
    JSON.stringify(payload)
  );

  db.prepare(`
    INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, quantity, unit_price_cents)
    VALUES (?, ?, 'portfolio_service', 'brand-identity', 1, 5000000)
  `).run(
    `line-port-${Date.now()}`,
    subId
  );

  const inserted = db.prepare('SELECT * FROM demo_submissions WHERE id = ?').get(subId);
  assert.ok(inserted, 'Inquiry must be inserted');
  assert.equal(inserted.flow_type, 'portfolio_inquiry');
  assert.equal(inserted.status, 'simulated');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.serviceSlug, 'brand-identity');
  assert.equal(parsed.referencedCaseSlug, 'case-01');
  assert.equal(parsed.clientName, 'Marwan Khalil (Demo Test)');

  const lines = db.prepare('SELECT * FROM demo_submission_lines WHERE submission_id = ?').all(subId);
  assert.equal(lines.length, 1);
});

