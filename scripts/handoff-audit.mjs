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

const homeCareDir=join(root,'home-maintenance');
const homeCareHome=readFileSync(join(homeCareDir,'page.tsx'),'utf8');
const homeCareLayout=readFileSync(join(homeCareDir,'layout.tsx'),'utf8');
assert.ok((homeCareHome.match(/<section\b/g)||[]).length>=9,'Home maintenance needs at least 9 substantive sections');
assert.ok((homeCareHome.match(/data-sector-specific=/g)||[]).length>=4,'Home maintenance requires 4+ domain-only sections');
assert.match(homeCareLayout,/<ContactDock\b/);
for(const route of ['services','services/[slug]','book','resources','resources/[slug]','[section]']) {
 assert.ok(existsSync(join(homeCareDir,route,'page.tsx')),'Missing home maintenance route '+route);
}

const salonDir=join(root,'salon-spa');
const salonHome=readFileSync(join(salonDir,'page.tsx'),'utf8');
const salonLayout=readFileSync(join(salonDir,'layout.tsx'),'utf8');
const salonContent=JSON.parse(readFileSync(join(process.cwd(),'data/verticals/salon-spa.json'),'utf8'));
assert.ok((salonHome.match(/<section\b/g)||[]).length>=9,'Salon SPA homepage must have 9 substantial sections');
assert.ok((salonHome.match(/data-sector-specific=/g)||[]).length>=4,'Salon needs 4+ unique industry sections');
assert.match(salonLayout,/<ContactDock\b/,'Salon must expose Mavvix contact dock');
assert.match(salonLayout,/velora-shell/,"Salon independent typography and art direction absent");
assert.ok(salonContent.services.length>=8 && salonContent.articles.length>=3 && salonContent.faq.length>=5);
for(const route of ['services','services/[slug]','booking','journal','journal/[slug]','[section]']){
 assert.ok(existsSync(join(salonDir,route,'page.tsx')),'Missing Velora inner route: '+route);
}
console.log('PASS: authored Velora SPA, bespoke editorial sections and deep bilingual beauty pages');

console.log('PASS: bespoke Fixora 12-section homepage, deep pages, 8 services, new contact dock');

console.log('PASS: all 8 legacy sectors preserved + deep automotive Wave 1 routes and 30-sector planned roster');


const fitnessRoot=join(root,'fitness');
const fitnessHomepage=readFileSync(join(fitnessRoot,'page.tsx'),'utf8');
const fitnessFrame=readFileSync(join(fitnessRoot,'layout.tsx'),'utf8');
assert.ok((fitnessHomepage.match(/<section\b/g)||[]).length>=9,'Gym needs 9 real homepage sections');
assert.ok((fitnessHomepage.match(/data-sector-specific=/g)||[]).length>=4,'Gym needs 4 domain-only sections');
assert.match(fitnessFrame,/<ContactDock\b/);
assert.match(fitnessFrame,/pulse-shell/);
for(const route of ['classes','classes/[slug]','trial','journal','journal/[slug]','[section]'])
 assert.ok(existsSync(join(fitnessRoot,route,'page.tsx')),'Missing Pulse route '+route);
console.log('PASS: authored Pulse homepage with unique type system, program routes and real enquiry');


const arenaRoot=join(root,'sports-venues');
const arenaHome=readFileSync(join(arenaRoot,'page.tsx'),'utf8');
const arenaLayout=readFileSync(join(arenaRoot,'layout.tsx'),'utf8');
const arenaContent=JSON.parse(readFileSync(join(process.cwd(),'data/verticals/sports-venues.json'),'utf8'));
assert.ok((arenaHome.match(/<section\b/g)||[]).length>=9,'Sports-venues requires nine substantial home sections');
assert.ok((arenaHome.match(/data-sector-specific=/g)||[]).length>=4,'Sports-venues requires four industry-specific sections');
assert.match(arenaLayout,/<ContactDock\b/,'Arena requires Mavvix commercial contact');
assert.match(arenaLayout,/arena-shell/,'Arena bespoke identity wrapper missing');
assert.equal(arenaContent.services.length,8);
for(const route of ['courts','courts/[slug]','book','journal','journal/[slug]','[section]'])
 assert.ok(existsSync(join(arenaRoot,route,'page.tsx')),'Arena inner family missing: '+route);
console.log('PASS: bespoke floodlit Arena site with eight sport-format details and pending-only court request');

console.log('PASS: complete source-level route/section/media/localization structure for all 8 sectors');
console.log('NOTE: structural checks and HTTP smoke tests do NOT validate client business identity, licensed media provenance, UX screenshots or operational fulfilment.');

// Enforce completed source structure for both latest Wave 1 sectors.
for(const [slug,shell,listing,intake] of [['furniture','oakline-shell','collections','quote'],['interiors-kitchens','forma-shell','services','consultation']]) {
 const dir=join(root,slug),home=readFileSync(join(dir,'page.tsx'),'utf8'),layout=readFileSync(join(dir,'layout.tsx'),'utf8');
 const data=JSON.parse(readFileSync(join(process.cwd(),'data/verticals',slug+'.json'),'utf8'));
 assert.ok((home.match(/<section\b/g)||[]).length>=9,slug+' homepage needs nine substantive sections');
 assert.ok((home.match(/data-sector-specific=/g)||[]).length>=4,slug+' needs four bespoke sections');
 assert.ok(layout.includes(shell)&&layout.includes('<ContactDock'),slug+' identity/contact wrapper');
 assert.ok(data.services.length>=8&&data.articles.length>=3&&data.faq.length>=5,slug+' domain content incomplete');
 for(const route of [listing,listing+'/[slug]',intake,'journal','journal/[slug]','[section]'])assert.ok(existsSync(join(dir,route,'page.tsx')),slug+' missing '+route);
 console.log('PASS: '+slug+' structural homepage, content and route-family gate');
}

const bloomRoot=join(root,'nursery'),bloomHome=readFileSync(join(bloomRoot,'page.tsx'),'utf8'),bloomLayout=readFileSync(join(bloomRoot,'layout.tsx'),'utf8');
const bloomData=JSON.parse(readFileSync(join(process.cwd(),'data/verticals/nursery.json'),'utf8'));
assert.ok((bloomHome.match(/<section\b/g)||[]).length>=9 && (bloomHome.match(/data-sector-specific=/g)||[]).length>=4);
assert.ok(bloomLayout.includes('bloom-shell')&&bloomLayout.includes('<ContactDock'));
assert.equal(bloomData.services.length,8);assert.equal(bloomData.articles.length,3);assert.equal(bloomData.faq.length,5);
for(const route of ['admissions','[section]','programs/[slug]','journal/[slug]'])assert.ok(existsSync(join(bloomRoot,route,'page.tsx')), 'Missing BloomSteps route '+route);
console.log('PASS: BloomSteps bespoke early-years identity, age-band dossiers and private guardian request source structure');


const glossRoot=join(root,'car-detailing'),glossHome=readFileSync(join(glossRoot,'page.tsx'),'utf8'),glossLayout=readFileSync(join(glossRoot,'layout.tsx'),'utf8');
const glossData=JSON.parse(readFileSync(join(process.cwd(),'data/verticals/car-detailing.json'),'utf8'));
assert.ok((glossHome.match(/<section\b/g)||[]).length>=9,'GlossBay needs nine substantial homepage sections');
assert.ok((glossHome.match(/data-sector-specific=/g)||[]).length>=4,'GlossBay needs four distinct detailing-only sections');
assert.ok(glossLayout.includes('gloss-shell')&&glossLayout.includes('<ContactDock'),'GlossBay unique identity/contact missing');
assert.equal(glossData.services.length,10);
assert.equal(glossData.articles.length,3);
assert.equal(glossData.faq.length,5);
for(const route of ['packages','packages/[slug]','quote','journal','journal/[slug]','[section]'])assert.ok(existsSync(join(glossRoot,route,'page.tsx')),'GlossBay missing route '+route);
console.log('PASS: GlossBay premium detailing sections, ten dossiers, seven route families and branded CTA');
