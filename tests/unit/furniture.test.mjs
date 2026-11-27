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

test('Furniture: Products count in SQLite', () => {
  const row = db.prepare(`
    SELECT COUNT(*) as count 
    FROM portfolio_services 
    WHERE vertical_slug = 'furniture' AND active = 1
  `).get();
  assert.equal(row.count, 10, 'Furniture must have exactly 10 active products in portfolio_services');
});

test('Furniture: Localized product content integrity in catalog', () => {
  const catalogPath = path.join(rootDir, 'data', 'verticals', 'furniture.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  assert.equal(catalog.services.length, 10, 'Catalog must contain 10 services');
  
  for (const s of catalog.services) {
    assert.ok(s.slug && s.slug.length > 2, `Product slug must be valid: ${s.slug}`);
    assert.ok(s.title.ar && s.title.ar.length > 0, `Arabic title must be present for ${s.slug}`);
    assert.ok(s.title.en && s.title.en.length > 0, `English title must be present for ${s.slug}`);
    assert.ok(s.minMax && s.minMax.width && s.minMax.depth && s.minMax.height, `Dimensions must exist for ${s.slug}`);
  }
});

test('Furniture: Six local WebP assets match manifest and verified SHA-256 checksums', () => {
  const manifestPath = path.join(rootDir, 'docs', '30-verticals', 'media', 'furniture.media-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  assert.equal(manifest.assets.length, 6, 'Must document exactly 6 furniture photographic assets');
  
  for (const a of manifest.assets) {
    const localRel = a.file.startsWith('/') ? a.file.slice(1) : a.file;
    const localPath = path.join(rootDir, 'public', localRel.replace(/^public\//, '').replace(/^assets\//, 'assets/'));
    const exists = fs.existsSync(localPath);
    assert.ok(exists, `Local asset file must exist at ${localPath}`);
    
    const buf = fs.readFileSync(localPath);
    assert.equal(buf.length, a.byte_size, `Byte size for ${a.id} must match manifest`);
    
    // Check RIFF / WEBP magic headers
    const riff = buf.subarray(0, 4).toString('ascii');
    const webp = buf.subarray(8, 12).toString('ascii');
    assert.equal(riff, 'RIFF', 'File header must start with RIFF');
    assert.equal(webp, 'WEBP', 'File format must be WEBP');
    
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    assert.equal(hash, a.sha256, `SHA-256 for ${a.id} must match manifest`);
  }
});

test('Furniture Journey 1: Simulated multi-item quote request persists to SQLite', () => {
  const clientReqId = 'test_req_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  const ref = 'MVX-OAK-' + crypto.randomBytes(5).toString('hex').toUpperCase();
  const payload = {
    items: [
      {
        serviceSlug: 'modular-sofa',
        room: 'living',
        material: 'linen',
        finish: 'natural',
        widthMm: 2400,
        depthMm: 950,
        heightMm: 780,
        quantity: 1
      },
      {
        serviceSlug: 'dining-table',
        room: 'dining',
        material: 'oak',
        finish: 'natural',
        widthMm: 2000,
        depthMm: 900,
        heightMm: 750,
        quantity: 1
      }
    ],
    deliveryZone: 'Cairo',
    designStage: 'measurements_ready',
    totals: { units: 2, distinctProducts: 2 }
  };

  const insert = db.prepare(`
    INSERT INTO portfolio_requests
    (id, ref_number, vertical_slug, flow_type, guest_name, guest_phone, payload_json, utm_json, consent_at, client_request_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'oak_test_' + Date.now(),
    ref,
    'furniture',
    'furniture_custom_quote_request',
    'Karim Mostafa',
    '+201012345678',
    JSON.stringify(payload),
    JSON.stringify({ source: 'test' }),
    new Date().toISOString(),
    clientReqId
  );

  assert.ok(insert.changes > 0, 'Quote submission must insert row into portfolio_requests');

  const saved = db.prepare('SELECT * FROM portfolio_requests WHERE ref_number = ?').get(ref);
  assert.ok(saved, 'Saved quote request must be retrievable');
  assert.equal(saved.vertical_slug, 'furniture');
  assert.equal(saved.guest_name, 'Karim Mostafa');

  // Clean up test row
  db.prepare('DELETE FROM portfolio_requests WHERE ref_number = ?').run(ref);
});
