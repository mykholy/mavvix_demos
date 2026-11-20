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

test('Dental: Services count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM catalog_items i 
    JOIN demo_sites s ON s.id = i.site_id 
    WHERE s.slug = 'dental'
  `).get();
  assert.equal(row.count, 10, 'Dental must have exactly 10 seeded services');
});

test('Dental: Practitioners count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM dental_practitioners d 
    JOIN demo_sites s ON s.id = d.site_id 
    WHERE s.slug = 'dental'
  `).get();
  assert.equal(row.count, 6, 'Dental must have exactly 6 seeded practitioners');
});

test('Dental: Articles count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM editorial_posts p 
    JOIN demo_sites s ON s.id = p.site_id 
    WHERE s.slug = 'dental'
  `).get();
  assert.equal(row.count, 8, 'Dental must have exactly 8 seeded patient articles');
});

test('Dental Journey 1: Simulated Appointment request persists to SQLite', () => {
  const site = db.prepare("SELECT id FROM demo_sites WHERE slug = 'dental'").get();
  assert.ok(site, 'Dental site must exist');

  const refNumber = `MVX-DEN-${Math.floor(100000 + Math.random() * 900000)}`;
  const subId = `sub-test-den-${Date.now()}`;
  const payload = {
    serviceSlug: 'service-01',
    serviceTitle: 'Dental Consultation',
    doctorSlug: 'clinician-01',
    branchSlug: 'north',
    preferredDay: 'Tuesday',
    preferredWindow: 'morning',
    guestName: 'Kareem Tarek (Demo Test)',
    guestPhone: '+20 100 123 4567',
    guestEmail: 'kareem.test@mavvix.test',
    refNumber
  };

  db.prepare(`
    INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
    VALUES (?, ?, 'dental_appointment', 'simulated', ?)
  `).run(
    subId,
    site.id,
    JSON.stringify(payload)
  );

  const inserted = db.prepare('SELECT * FROM demo_submissions WHERE id = ?').get(subId);
  assert.ok(inserted, 'Submission must be inserted');
  assert.equal(inserted.flow_type, 'dental_appointment');
  assert.equal(inserted.status, 'simulated');

  const parsed = JSON.parse(inserted.payload_json);
  assert.equal(parsed.serviceSlug, 'service-01');
  assert.equal(parsed.doctorSlug, 'clinician-01');
  assert.equal(parsed.preferredDay, 'Tuesday');
  assert.equal(parsed.refNumber, refNumber);
});
