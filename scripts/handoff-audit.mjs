import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { getLessonPlan, authoredLessonCount } from './academy-curriculum.mjs';

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
  const layout = readFileSync(layoutFile, 'utf8');
  assert.match(layout, /<ContactDock\b/, sector + ' missing persistent WhatsApp and phone CTA');
  assert.match(home, /<SectorDepth\b/, sector + ' missing industry-specific editorial and FAQ journeys');
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
const tracks=Array.from({length:12},(_,i)=>'course-'+String(i+1).padStart(2,'0'));
const names=new Set();
for(const course of tracks){
 for(let i=1;i<=5;i++){
  const lesson=getLessonPlan(course,i);
  assert.ok(lesson.transcriptAr.length>=350 && lesson.transcriptEn.length>=400,'Too little teaching content: '+course+'/'+i);
  assert.ok(lesson.exerciseAr.length>90 && lesson.exerciseEn.length>90,'Weak exercise: '+course+'/'+i);
  assert.ok(!names.has(lesson.titleEn), 'Duplicated lesson: '+lesson.titleEn);
  names.add(lesson.titleEn);
 }
}
assert.equal(authoredLessonCount,60);
assert.equal(names.size,60);
console.table(results);
console.log('PASS: 60 distinct real topic-based AR/EN Academy lesson plans with exercises');
assert.equal(results.length, 8, 'All eight sectors must exist');
writeFileSync('handoff-audit-results.json', JSON.stringify({scanned_at:new Date().toISOString(),results},null,2)+'\n');

const automotiveDir=join(root,'auto-service');
const automotiveHome=readFileSync(join(automotiveDir,'page.tsx'),'utf8');
const automotiveLayout=readFileSync(join(automotiveDir,'layout.tsx'),'utf8');
assert.ok((automotiveHome.match(/<section\b/g)||[]).length>=9,'Auto-service must have 9 substantial homepage sections');
assert.ok((automotiveHome.match(/data-sector-specific=/g)||[]).length>=4,'Auto-service needs 4 unique industry sections');
assert.match(automotiveLayout,/<ContactDock\b/,'Every auto-service page needs commercial contact CTA');
const automotivePaths=['services','services/[slug]','booking','resources','resources/[slug]','[section]'];
for(const route of automotivePaths){
 assert.ok(existsSync(join(automotiveDir,route,'page.tsx')),'Missing Auto-service route: '+route);
}
const roster=readFileSync(join(process.cwd(),'src/lib/verticals/registry.ts'),'utf8');
assert.equal((roster.match(/"slug":/g)||[]).length,30,'Registry must contain 30 declared sectors');
assert.equal((roster.match(/"status": "live"/g)||[]).length,8,'Only the original eight sectors are marked live until Gate 1 approval');
console.log('PASS: all 8 legacy sectors preserved + deep automotive Wave 1 routes and 30-sector planned roster');

console.log('PASS: complete source-level route/section/media/localization structure for all 8 sectors');
console.log('NOTE: structural checks and HTTP smoke tests do NOT validate client business identity, licensed media provenance, UX screenshots or operational fulfilment.');
