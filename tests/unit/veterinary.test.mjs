import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const file=JSON.parse(fs.readFileSync(path.join(root,'data/verticals/veterinary.json'),'utf8'));

test('PawWell has eight distinct bilingual service dossiers and an actual species-aware catalog',()=>{
 assert.equal(file.slug,'veterinary');
 assert.equal(file.services.length,8);
 assert.equal(new Set(file.services.map(s=>s.slug)).size,8);
 assert.equal(file.species.length,5);
 for(const s of file.services){
  assert.ok(s.title.ar.length>=6&&s.title.en.length>=8);
  assert.ok(s.body.ar.length>130&&s.body.en.length>130);
  assert.equal(s.checklist.ar.length,3);
  assert.equal(s.checklist.en.length,3);
  assert.ok(s.species.length>=1);
  for(const id of s.species)assert.ok(file.species.some(p=>p.id===id),'invalid species '+id);
 }
});
test('PawWell contains three real editorial guides and five focused FAQs',()=>{
 assert.equal(file.articles.length,3);
 assert.equal(file.faq.length,5);
 for(const a of file.articles){assert.ok(a.body.ar.length>180 && a.body.en.length>180);}
});
test('veterinary public form has no identifiable clinical record fields or impersonated confirmed booking',()=>{
 const code=fs.readFileSync(path.join(root,'src/server/portfolio/veterinary.ts'),'utf8');
 const schema=code.slice(code.indexOf('const requestSchema'),code.indexOf('const reject='));
 assert.doesNotMatch(schema,/(medicalHistory|medicalHistory|diagnosis|prescription|microchip|petName|uploadedPhoto|notes:)/i);
 assert.match(code,/pending_operator_confirmation/);
 assert.match(code,/clientRequestId/);
 assert.match(code,/SERVICE_SPECIES_MISMATCH/);
});
