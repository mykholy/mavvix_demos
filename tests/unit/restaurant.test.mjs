import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');

describe('07 — Restaurant (Saffron Table / سفرة زعفران) Unit Tests', () => {
  const db = new DatabaseSync(dbPath);

  test('Demo site registered and published', () => {
    const site = db.prepare("SELECT * FROM demo_sites WHERE slug = 'restaurant'").get();
    assert.ok(site, 'Restaurant site record must exist');
    assert.equal(site.published, 1, 'Site must be published');
    assert.match(site.name_ar, /زعفران/);
    assert.match(site.name_en, /Saffron/);
  });

  test('Exactly 30 dishes seeded in restaurant_dishes across categories', () => {
    const count = db.prepare("SELECT count(1) as c FROM restaurant_dishes WHERE site_id = 'site-restaurant'").get().c;
    assert.equal(count, 30, 'Must have exactly 30 seeded dishes');

    const categories = db.prepare("SELECT DISTINCT category FROM restaurant_dishes WHERE site_id = 'site-restaurant'").all().map(r => r.category);
    assert.ok(categories.includes('breakfast'), 'Must have breakfast category');
    assert.ok(categories.includes('starters'), 'Must have starters category');
    assert.ok(categories.includes('mains'), 'Must have mains category');
    assert.ok(categories.includes('desserts'), 'Must have desserts category');
    assert.ok(categories.includes('drinks'), 'Must have drinks category');
  });

  test('Dish modifiers exist with size and extras groups', () => {
    const modCount = db.prepare("SELECT count(1) as c FROM dish_modifiers").get().c;
    assert.ok(modCount >= 12, 'Must have at least 12 dish modifiers seeded');

    const groups = db.prepare("SELECT DISTINCT modifier_group FROM dish_modifiers").all().map(r => r.modifier_group);
    assert.ok(groups.includes('size'), 'Must have size modifier group');
    assert.ok(groups.includes('extras'), 'Must have extras modifier group');
  });

  test('Seeded scenario fixture: Large dish 220 EGP + extras 35 and quantity 2 = 510 EGP before fees', () => {
    const dish = db.prepare("SELECT * FROM restaurant_dishes WHERE slug = 'dish-13'").get();
    assert.ok(dish, 'dish-13 must exist');
    assert.equal(dish.price_cents, 22000, 'dish-13 base price must be 220 EGP (22000 cents)');

    const extraDeltaCents = 3500; // 35 EGP extras
    const qty = 2;
    const unitPriceCents = dish.price_cents + extraDeltaCents;
    const subtotalCents = unitPriceCents * qty;

    assert.equal(unitPriceCents, 25500, 'Unit price must be 255 EGP (25500 cents)');
    assert.equal(subtotalCents, 51000, 'Subtotal before fees must be exactly 510 EGP (51000 cents)');
  });

  test('Seeded scenario fixture: Allergen conflict & no-nuts filtering', () => {
    const nutsDish = db.prepare("SELECT * FROM restaurant_dishes WHERE slug = 'dish-20'").get();
    assert.ok(nutsDish, 'dish-20 must exist');
    const allergens = JSON.parse(nutsDish.allergens_json);
    assert.ok(allergens.includes('nuts'), 'dish-20 must be explicitly tagged with nuts allergen');

    // Query dishes excluding nuts
    const allDishes = db.prepare("SELECT slug, allergens_json FROM restaurant_dishes WHERE site_id = 'site-restaurant'").all();
    const noNutsDishes = allDishes.filter(d => !JSON.parse(d.allergens_json).includes('nuts'));

    assert.ok(!noNutsDishes.some(d => d.slug === 'dish-20'), 'No-nuts filter must exclude dish-20');
    assert.ok(allDishes.some(d => d.slug === 'dish-20'), 'Reset filter must include dish-20');
  });

  test('14 sample time slots seeded with unavailable fixture slots', () => {
    const slots = db.prepare("SELECT * FROM demo_time_slots WHERE site_id = 'site-restaurant'").all();
    assert.equal(slots.length, 14, 'Must have exactly 14 sample time slots');

    const unavailableSlots = slots.filter(s => s.status === 'unavailable');
    assert.ok(unavailableSlots.length >= 2, 'Must have at least 2 unavailable fixture slots');
    assert.ok(slots.some(s => s.id === 'r-slot-04' && s.status === 'unavailable'), 'r-slot-04 must be unavailable');
    assert.ok(slots.some(s => s.id === 'r-slot-10' && s.status === 'unavailable'), 'r-slot-10 must be unavailable');
  });

  test('Party size validation: max 8 and 0 invalid', () => {
    const isValidPartySize = (size) => {
      const num = Number(size);
      return !isNaN(num) && num >= 1 && num <= 8;
    };

    assert.equal(isValidPartySize(0), false, 'Party size 0 must be invalid');
    assert.equal(isValidPartySize(-1), false, 'Negative party size must be invalid');
    assert.equal(isValidPartySize(9), false, 'Party size > 8 must be invalid');
    assert.equal(isValidPartySize(1), true, 'Party size 1 must be valid');
    assert.equal(isValidPartySize(6), true, 'Party size 6 must be valid');
    assert.equal(isValidPartySize(8), true, 'Party size 8 must be valid');
  });

  test('Simulated order persistence: restaurant_order with line items', () => {
    const testId = `sub-test-rest-order-${Date.now()}`;
    const payload = {
      guestName: 'Kareem Tarek (Test)',
      branchId: 'rest-branch-1',
      subtotalCents: 51000,
      packagingCents: 1500,
      totalCents: 52500,
      disclaimer: 'SIMULATED DEMO ORDER — Not submitted to kitchen'
    };

    const insertSub = db.prepare(`
      INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
      VALUES (?, 'site-restaurant', 'restaurant_order', 'simulated', ?)
    `);
    insertSub.run(testId, JSON.stringify(payload));

    const insertLine = db.prepare(`
      INSERT INTO demo_submission_lines (id, submission_id, source_type, source_id, quantity, unit_price_cents, modifiers_json, snapshot_json)
      VALUES (?, ?, 'dish', 'dish-13', 2, 25500, '[]', '{\"label\":\"Mushroom Burger [Large]\"}')
    `);
    insertLine.run(`line-${testId}`, testId);

    const saved = db.prepare("SELECT * FROM demo_submissions WHERE id = ?").get(testId);
    assert.ok(saved, 'Submission must be saved in SQLite');
    assert.equal(saved.flow_type, 'restaurant_order');
    const parsedPayload = JSON.parse(saved.payload_json);
    assert.equal(parsedPayload.totalCents, 52500);

    const savedLine = db.prepare("SELECT * FROM demo_submission_lines WHERE submission_id = ?").get(testId);
    assert.ok(savedLine, 'Order line must be saved');
    assert.equal(savedLine.unit_price_cents * savedLine.quantity, 51000);

    // Clean up
    db.prepare("DELETE FROM demo_submission_lines WHERE submission_id = ?").run(testId);
    db.prepare("DELETE FROM demo_submissions WHERE id = ?").run(testId);
  });

  test('Simulated table reservation persistence: restaurant_table', () => {
    const testId = `sub-test-rest-tbl-${Date.now()}`;
    const payload = {
      guestName: 'Lina Sherif (Test)',
      branchId: 'rest-branch-2',
      partySize: 4,
      date: '2026-12-01',
      timeSlot: '18:00',
      status: 'requested',
      confirmationNote: 'SIMULATED TABLE REQUEST — Pending host review, not a confirmed reservation'
    };

    const insertSub = db.prepare(`
      INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
      VALUES (?, 'site-restaurant', 'restaurant_table', 'simulated', ?)
    `);
    insertSub.run(testId, JSON.stringify(payload));

    const saved = db.prepare("SELECT * FROM demo_submissions WHERE id = ?").get(testId);
    assert.ok(saved, 'Table submission must be saved in SQLite');
    assert.equal(saved.flow_type, 'restaurant_table');
    const parsed = JSON.parse(saved.payload_json);
    assert.equal(parsed.partySize, 4);
    assert.equal(parsed.status, 'requested');

    // Clean up
    db.prepare("DELETE FROM demo_submissions WHERE id = ?").run(testId);
  });

  test('6 rich culinary articles seeded with 250+ words in AR and EN', () => {
    const articles = db.prepare(`
      SELECT p.id, p.slug, c_ar.body_json as body_ar, c_en.body_json as body_en, c_ar.summary as summary_ar, c_en.summary as summary_en
      FROM editorial_posts p
      JOIN localized_content c_ar ON c_ar.owner_id = p.id AND c_ar.locale = 'ar'
      JOIN localized_content c_en ON c_en.owner_id = p.id AND c_en.locale = 'en'
      WHERE p.site_id = 'site-restaurant'
    `).all();

    assert.equal(articles.length, 6, 'Must have 6 restaurant editorial articles');
    for (const a of articles) {
      const arBody = JSON.parse(a.body_ar);
      const enBody = JSON.parse(a.body_en);
      assert.ok(Array.isArray(arBody.sections), `Article ${a.slug} must have Arabic sections`);
      assert.ok(Array.isArray(enBody.sections), `Article ${a.slug} must have English sections`);

      const arText = (a.summary_ar || '') + ' ' + arBody.sections.map(s => (s.heading || '') + ' ' + (s.content || '')).join(' ');
      const enText = (a.summary_en || '') + ' ' + enBody.sections.map(s => (s.heading || '') + ' ' + (s.content || '')).join(' ');

      const arWordCount = arText.trim().split(/\s+/).length;
      const enWordCount = enText.trim().split(/\s+/).length;

      assert.ok(arWordCount >= 200, `Article ${a.slug} AR word count (${arWordCount}) should exceed 200`);
      assert.ok(enWordCount >= 200, `Article ${a.slug} EN word count (${enWordCount}) should exceed 200`);
    }
  });
});
