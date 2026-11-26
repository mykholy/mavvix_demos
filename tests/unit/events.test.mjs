import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('data/verticals/events.json','utf8'));
test('Luma original bilingual event dossiers and safe event brief',()=>{
 assert.equal(data.slug,'events');assert.equal(data.services.length,8);assert.equal(data.articles.length,3);assert.equal(data.faq.length,5);
 assert.equal(new Set(data.services.map(x=>x.slug)).size,8);
 for(const s of data.services){assert.ok(s.body.ar.length>120&&s.body.en.length>120);assert.ok(data.eventTypes.includes(s.category));assert.equal(s.checkpoints.ar.length,3);assert.equal(s.checkpoints.en.length,3);}
 assert.ok(data.media[0].licenseUrl.startsWith('https://creativecommons.org/'));
 const api=fs.readFileSync('src/server/portfolio/events.ts','utf8');
 assert.match(api,/EVENT_TYPE_MISMATCH/);assert.match(api,/INVALID_DATE/);assert.match(api,/pending_operator_confirmation/);assert.match(api,/\.strict\(\)/);
});
