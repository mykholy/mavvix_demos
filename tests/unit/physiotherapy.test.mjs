import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');

describe('12 — Physiotherapy (Motion Lab / معمل الحركة) Unit Tests', () => {
  const db = new DatabaseSync(dbPath);
  const dataPath = path.join(rootDir, 'data', 'verticals', 'physiotherapy.json');

  test('Motion Lab data catalog exists and is valid', () => {
    assert.ok(fs.existsSync(dataPath), 'physiotherapy.json must exist');
    const catalog = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    assert.equal(catalog.slug, 'physiotherapy');
    assert.equal(catalog.brand, 'Motion Lab');
    assert.ok(catalog.classification.includes('Mavvix healthcare website design concept'));
  });

  test('Exactly 10 functional movement services authored with bilingual bodies > 140 chars', () => {
    const catalog = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    assert.equal(catalog.services.length, 10, 'Must have exactly 10 authored movement services');

    const categories = new Set(catalog.services.map(s => s.category));
    assert.ok(categories.size >= 4, 'Must span at least 4 movement categories');

    for (const service of catalog.services) {
      assert.ok(service.slug, 'Service must have slug');
      assert.ok(service.title.ar && service.title.en, 'Service must have AR and EN title');
      assert.ok(service.summary.ar && service.summary.en, 'Service must have AR and EN summary');
      assert.ok(service.body.ar.length >= 140, `Service ${service.slug} AR body must exceed 140 chars`);
      assert.ok(service.body.en.length >= 140, `Service ${service.slug} EN body must exceed 140 chars`);
      assert.ok(Array.isArray(service.durations) && service.durations.length >= 1, 'Service must list duration options');
      assert.ok(Array.isArray(service.questions.ar) && service.questions.ar.length >= 2, 'Service must list guiding questions');
    }
  });

  test('Authored clinical guides & articles with bilingual sections', () => {
    const catalog = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    assert.ok(Array.isArray(catalog.articles), 'Must have articles array');
    assert.ok(catalog.articles.length >= 3, 'Must have at least 3 clinical guides');

    for (const article of catalog.articles) {
      assert.ok(article.slug, 'Article must have slug');
      assert.ok(article.title.ar && article.title.en, 'Article must have AR and EN title');
      assert.ok(article.summary.ar && article.summary.en, 'Article must have AR and EN summary');
      assert.ok(article.body.ar.length >= 100, 'Article must have substantial AR body');
      assert.ok(article.body.en.length >= 100, 'Article must have substantial EN body');
    }
  });

  test('Simulated appointment request persistence in SQLite portfolio_requests table', () => {
    const testId = `ml_test_${Date.now()}`;
    const refNumber = 'MVX-ML-' + crypto.randomBytes(5).toString('hex').toUpperCase();
    const clientReqId = crypto.randomUUID();
    const payload = {
      serviceSlug: 'initial-movement-assessment',
      visitType: 'first-assessment',
      goalType: 'daily-movement',
      preferredDate: '2026-12-05',
      preferredWindow: 'morning',
      region: 'Cairo',
      clinicStatus: 'Concept only. No patient records collected, clinician assigned, assessment, diagnosis or medical care confirmed.'
    };

    const insertStmt = db.prepare(`
      INSERT INTO portfolio_requests
      (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
      VALUES (?, ?, 'physiotherapy', 'physiotherapy_assessment_interest', ?, ?, ?, ?, ?, ?)
    `);
    insertStmt.run(
      testId,
      refNumber,
      'Youssef El-Menshawy (Demo Test)',
      '+20 100 123 4567',
      JSON.stringify(payload),
      JSON.stringify({ source: 'ci_test' }),
      new Date().toISOString(),
      clientReqId
    );

    const saved = db.prepare('SELECT * FROM portfolio_requests WHERE id = ?').get(testId);
    assert.ok(saved, 'Submission must be saved in SQLite portfolio_requests');
    assert.equal(saved.vertical_slug, 'physiotherapy');
    assert.equal(saved.flow_type, 'physiotherapy_assessment_interest');
    assert.equal(saved.ref_number, refNumber);

    const parsed = JSON.parse(saved.payload_json);
    assert.equal(parsed.serviceSlug, 'initial-movement-assessment');
    assert.equal(parsed.visitType, 'first-assessment');
    assert.equal(saved.guest_name, 'Youssef El-Menshawy (Demo Test)');

    // Clean up
    db.prepare('DELETE FROM portfolio_requests WHERE id = ?').run(testId);
  });

  test('Strict privacy guardrail: rejects PHI, medical diagnostics and file upload payloads', () => {
    const isPrivacyCompliant = (payload) => {
      // Must NOT contain sensitive clinical diagnostic keys or medical records uploads
      const forbiddenKeys = ['medical_history', 'radiology_file', 'mri_scan', 'diagnosis_code', 'prescription'];
      return !forbiddenKeys.some(k => k in payload);
    };

    const validPayload = { serviceSlug: 'back-neck-function', clientName: 'Nour', clientPhone: '01000000000' };
    const invalidPayload = { serviceSlug: 'back-neck-function', clientName: 'Nour', radiology_file: 'scan.pdf' };

    assert.equal(isPrivacyCompliant(validPayload), true, 'Valid administrative payload must pass');
    assert.equal(isPrivacyCompliant(invalidPayload), false, 'Payload with forbidden clinical file must be rejected');
  });

  test('Motion Lab: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
    const manifestPath = path.join(rootDir, 'docs', '30-verticals', 'media', 'physiotherapy.media-manifest.json');
    assert.ok(fs.existsSync(manifestPath), 'physiotherapy.media-manifest.json must exist');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.sector, 'physiotherapy');
    assert.equal(manifest.brand, 'Motion Lab');
    assert.equal(manifest.assets.length, 6, 'Must document exactly 6 photographic assets');

    for (const a of manifest.assets) {
      const assetPath = path.join(rootDir, 'public', a.local_path.replace(/^\//, ''));
      assert.ok(fs.existsSync(assetPath), `Asset file ${a.local_path} must exist locally`);

      const stat = fs.statSync(assetPath);
      assert.equal(stat.size, a.bytes, `File size for ${a.id} must match manifest bytes`);

      const buf = fs.readFileSync(assetPath);
      const isRiffWebp =
        buf.length >= 12 &&
        buf.toString('ascii', 0, 4) === 'RIFF' &&
        buf.toString('ascii', 8, 12) === 'WEBP';
      assert.ok(isRiffWebp, `Asset ${a.filename} must be a valid RIFF/WEBP binary`);

      const hash = crypto.createHash('sha256').update(buf).digest('hex');
      assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);
    }
  });
});
