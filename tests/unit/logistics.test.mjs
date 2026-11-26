import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('data/verticals/logistics.json','utf8'));
test('RouteLine original bilingual freight dossiers and strict quote boundaries',()=>{
 assert.equal(d.services.length,8);assert.equal(d.articles.length,3);assert.equal(d.faq.length,5);assert.equal(new Set(d.services.map(s=>s.slug)).size,8);
 for(const s of d.services){assert.ok(d.modes.includes(s.category));assert.ok(s.body.ar.length>120&&s.body.en.length>120);assert.equal(s.checkpoints.ar.length,3);assert.equal(s.checkpoints.en.length,3);}
 const api=fs.readFileSync('src/server/portfolio/logistics.ts','utf8');assert.match(api,/MODE_MISMATCH/);assert.match(api,/ROUTE_REVIEW_REQUIRED/);assert.match(api,/INVALID_DATE/);assert.match(api,/\.strict\(\)/);assert.match(api,/pending_operator_confirmation/);
});
