import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src', 'app', '[locale]', 'preview');
const required = {
  construction: ['about','contact','journal','process','projects','request-quote','services'],
  industrial: ['about','compare','contact','industries','process','products','resources','rfq'],
  'real-estate': ['about','compare','contact','developments','journal','properties','saved','viewing'],
  dental: ['contact','faq','locations','patient-guide','request-appointment','services','team'],
  ecommerce: ['cart','checkout','collections','help','journal','search','story','wishlist'],
  portfolio: ['about','contact','journal','now','services','work'],
  restaurant: ['faq','journal','locations','menu','order','reserve','story'],
  academy: ['courses','enrollment-interest','faq','instructors','learning-paths','resources'],
};

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(item => {
  const file = join(directory, item.name);
  return item.isDirectory() ? walk(file) : [file];
});
const results = [];
for (const [sector, paths] of Object.entries(required)) {
  const dir = join(root, sector);
  const homeFile = join(dir, 'page.tsx');
  const layoutFile = join(dir, 'layout.tsx');
  assert.ok(existsSync(homeFile) && existsSync(layoutFile), 'Missing home/layout: ' + sector);
  const home = readFileSync(homeFile, 'utf8');
  const sections = (home.match(/<section\b/g) || []).length;
  assert.ok(sections >= 6, sector + ' needs at least 6 meaningful homepage sections (found ' + sections + ')');
  assert.match(home, /<h1\b/, sector + ' missing main H1');
  assert.match(home, /SectorPhoto/, sector + ' missing editorial photography module');
  assert.match(home, /isAr/, sector + ' missing visible AR/EN localization');
  for (const route of paths) assert.ok(existsSync(join(dir, route, 'page.tsx')), sector + ' missing route ' + route);
  const files = walk(dir);
  const pageFiles = files.filter(p => p.endsWith('/page.tsx'));
  const detailRoutes = pageFiles.filter(p => relative(dir,p).includes('[')).length;
  const allSource = files.filter(p=>p.endsWith('.tsx')).map(p=>readFileSync(p,'utf8')).join('\n');
  results.push({
    sector,
    home_sections: sections,
    route_pages: pageFiles.length,
    dynamic_detail_pages: detailRoutes,
    image_gallery: (home.match(/<SectorPhoto/g) || []).length >= 2 ? 'yes' : 'no',
    conceptual_content_mentions: (allSource.match(/demo|simulat|fictional|تجريب|تصوري|توضيحي|خيالي/gi) || []).length,
    handoff: 'owner data & operational integrations pending',
  });
}
console.table(results);
assert.equal(results.length, 8, 'All eight sectors must exist');
writeFileSync('handoff-audit-results.json', JSON.stringify({scanned_at:new Date().toISOString(),results},null,2)+'\n');
console.log('PASS: complete source-level route/section/media/localization structure for all 8 sectors');
console.log('NOTE: structural checks and HTTP smoke tests do NOT validate client business identity, licensed media provenance, UX screenshots or operational fulfilment.');
