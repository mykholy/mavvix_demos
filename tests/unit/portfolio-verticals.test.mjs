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
