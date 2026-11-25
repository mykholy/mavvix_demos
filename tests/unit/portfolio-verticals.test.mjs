import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPortfolioMigrations } from '../../scripts/apply-portfolio-migrations.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const automotive=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/auto-service.json'),'utf8'));

test('master registry contains thirty distinct sector IDs, but planned are not marked live',()=>{
 const source=fs.readFileSync(path.join(root,'src/lib/verticals/registry.ts'),'utf8');
 const entries=[...source.matchAll(/"slug":\s*"([^"]+)"/g)].map(m=>m[1]);
 assert.equal(entries.length,30);assert.equal(new Set(entries).size,30);
 assert.equal(entries.filter(x=>x==='auto-service').length,1);
 assert.equal((source.match(/"status": "live"/g)||[]).length,8);
});
test('auto-service includes distinct authored bilingual service dossiers and buyer education',()=>{
 assert.equal(automotive.services.length,8);assert.equal(automotive.articles.length,3);assert.equal(automotive.faq.length,5);
 assert.equal(new Set(automotive.services.map(s=>s.slug)).size,8);
 for(const service of automotive.services){
  assert.ok(service.title.ar.length>5 && service.title.en.length>7);
  assert.ok(service.body.ar.length>140 && service.body.en.length>140);
  assert.equal(service.whatToCheck.ar.length,3);
 }
});
test('home maintenance has eight industry dossiers, three buyer guides and five FAQs',()=>{
 const content=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/home-maintenance.json'),'utf8'));
 assert.equal(content.slug,'home-maintenance');
 assert.equal(content.services.length,8);
 assert.equal(content.articles.length,3);
 assert.equal(content.faq.length,5);
 assert.equal(new Set(content.services.map(s=>s.slug)).size,8);
 for(const service of content.services){
  assert.ok(service.body.ar.length>140&&service.body.en.length>140);
  assert.equal(service.checklist.ar.length,3);
  assert.equal(service.checklist.en.length,3);
 }
});

test('salon spa is an original bilingual beauty service implementation, not a generic cloning placeholder',()=>{
 const v=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/salon-spa.json'),'utf8'));
 assert.equal(v.services.length,10);
 assert.equal(v.articles.length,3);
 assert.equal(v.faq.length,5);
 assert.equal(new Set(v.services.map(s=>s.slug)).size,10);
 for(const s of v.services){
  assert.ok(s.body.ar.length>150 && s.body.en.length>150);
  assert.ok(s.durations.length>=2 && s.durations.every(n=>Number.isInteger(n)));
  assert.equal(s.questions.ar.length,3);
 }
 const names=v.services.map(s=>s.title.en.toLowerCase());
 assert.equal(new Set(names).size,10);
});

test('Pulse gym has nine independently authored bilingual training class dossiers',()=>{
 const v=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/fitness.json'),'utf8'));
 assert.equal(v.services.length,9);
 assert.equal(v.articles.length,3);
 assert.equal(v.faq.length,5);
 assert.equal(new Set(v.services.map(c=>c.slug)).size,9);
 for(const s of v.services){
  assert.ok(s.body.ar.length>150 && s.body.en.length>150,'Class too shallow: '+s.slug);
  assert.equal(s.checklist.ar.length,3);
  assert.ok(s.levels.every(level=>v.levels.includes(level)));
  assert.ok(s.durations.every(n=>n>=30 && n<=60));
 }
});
test('Arena sports venue has eight factual team-aware court formats and original field notes',()=>{
 const v=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/sports-venues.json'),'utf8'));
 assert.equal(v.slug,'sports-venues');
 assert.equal(v.services.length,8);
 assert.equal(v.articles.length,3);
 assert.equal(v.faq.length,5);
 assert.equal(new Set(v.services.map(x=>x.slug)).size,8);
 for(const court of v.services){
  assert.ok(court.body.ar.length>150&&court.body.en.length>160,'Shallow court format: '+court.slug);
  assert.equal(court.category,court.sport);
  assert.ok(court.durations.length>=2);
  if(court.sport==='padel')assert.equal(court.players,4);
  else assert.ok([10,14].includes(court.players));
 }
});

test('GlossBay data has ten original bilingual detailing dossiers with valid add-ons and vehicle sizes',()=>{
 const s=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/car-detailing.json'),'utf8'));
 assert.equal(s.slug,'car-detailing');
 assert.equal(s.services.length,10);
 assert.equal(s.articles.length,3);
 assert.equal(s.faq.length,5);
 assert.equal(new Set(s.services.map(x=>x.slug)).size,10);
 assert.equal(new Set(s.addons.map(x=>x.slug)).size,4);
 assert.equal(new Set(s.vehicleSizes.map(x=>x.slug)).size,4);
 for(const x of s.services){
  assert.ok(x.body.ar.length>140 && x.body.en.length>140,'Incomplete bilingual material: '+x.slug);
  assert.ok(x.durations.length>=2 && x.checks.ar.length>=3 && x.checks.en.length>=3);
 }
});

test('Motion Lab has ten original bilingual rehabilitation dossiers and a no-PHI user-facing form',()=>{
 const content=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/physiotherapy.json'),'utf8'));
 assert.equal(content.services.length,10);
 assert.equal(content.articles.length,3);
 assert.equal(content.faq.length,5);
 assert.equal(new Set(content.services.map(s=>s.slug)).size,10);
 for(const service of content.services){
  assert.ok(service.body.ar.length>140&&service.body.en.length>140);
  assert.equal(service.questions.ar.length,3);
  assert.equal(service.questions.en.length,3);
 }
 const form=fs.readFileSync(path.join(root,'src/app/[locale]/preview/physiotherapy/appointment/MotionAssessmentForm.tsx'),'utf8');
 assert.ok(!form.includes('medicalHistory:')&&!form.includes('diagnosis:')&&!form.includes('medicalRecords:'));
});

test('additive schema upgrades on existing legacy database without dropping its records',()=>{
 const db=new DatabaseSync(':memory:');
 try {
  db.exec(fs.readFileSync(path.join(root,'05_ENGINEERING/sqlite_schema.sql'),'utf8'));
  db.prepare("INSERT INTO demo_sites(id,slug,name_ar,name_en) VALUES('legacy-1','construction','قديم','Original')").run();
  db.prepare("INSERT INTO admin_users(id,email,password_hash,role) VALUES('demo-admin','admin@mavvix.demo','fixed','owner')").run();
  const migrations=applyPortfolioMigrations(db,root);
  assert.equal(migrations.length,4);
  assert.equal(applyPortfolioMigrations(db,root).length,0);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM demo_sites WHERE id='legacy-1'").get().n,1);
  assert.equal(db.prepare("SELECT active FROM admin_users WHERE id='demo-admin'").get().active,0);
  db.prepare("INSERT INTO portfolio_verticals(slug,name_ar,name_en,wave,published) VALUES('auto-service','سيارات','Auto',1,1)").run();
  const stmt=db.prepare("INSERT INTO portfolio_requests(id,ref_number,vertical_slug,flow_type,guest_name,guest_phone,payload_json,consent_at,client_request_id) VALUES(?,?,?,?,?,?,?,?,?)");
  const args=['test-1','MVX-AS-TEST','auto-service','auto_service_request','QA Visitor','01000000000','{}',new Date().toISOString(),'11111111-1111-4111-8111-111111111111'];
  stmt.run(...args);
  assert.throws(()=>stmt.run('test-2','MVX-AS-TEST2',...args.slice(2)),/UNIQUE/);
  assert.equal(db.prepare("SELECT status FROM portfolio_requests WHERE id='test-1'").get().status,'new');
 } finally {db.close();}
});
test('demo seed has no fixed fallback admin password',()=>{
 const seed=fs.readFileSync(path.join(root,'scripts/seed.mjs'),'utf8');
 assert.ok(!seed.includes("bcrypt.hashSync('MavvixDemo2026!'"));
 assert.ok(!seed.includes("'operator@mavvix.local', ?"));
});

test('law firm includes eight independent bilingual dossiers, private-safe intake and meaningful guides',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/law-firm.json'),'utf8'));
 assert.equal(data.services.length,8);
 assert.equal(new Set(data.services.map(s=>s.slug)).size,8);
 assert.equal(data.articles.length,3);
 assert.equal(data.faq.length,5);
 for(const s of data.services){
  assert.ok(s.body.ar.length>160 && s.body.en.length>160);
  assert.equal(s.reviewPoints.ar.length,3);
 }
 const api=fs.readFileSync(path.join(root,'src/server/portfolio/law-firm.ts'),'utf8');
 assert.ok(api.includes('.strict()'));
 assert.ok(!api.includes('caseDescription:')&&!api.includes('adverseParty:')&&!api.includes('documentUpload:'));
});
