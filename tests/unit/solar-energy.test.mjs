import {createHash} from 'node:crypto';
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('data/verticals/solar-energy.json','utf8'));
test('VoltEdge authored solution dossiers and strict preliminary assessment',()=>{assert.equal(d.services.length,8);assert.equal(d.articles.length,3);assert.equal(d.faq.length,5);assert.equal(new Set(d.services.map(s=>s.slug)).size,8);for(const s of d.services){assert.ok(d.categories.includes(s.category));assert.ok(s.body.ar.length>120&&s.body.en.length>120);assert.equal(s.checkpoints.ar.length,3);assert.equal(s.checkpoints.en.length,3);}const api=fs.readFileSync('src/server/portfolio/solar-energy.ts','utf8');assert.match(api,/\.strict\(\)/);assert.match(api,/SITE_TYPE_MISMATCH/);assert.match(api,/pending_operator_confirmation/);assert.match(api,/Cache-Control/);const form=fs.readFileSync('src/app/[locale]/preview/solar-energy/assessment/AssessmentForm.tsx','utf8');assert.doesNotMatch(form,/type="file"|<textarea/);});

test('VoltEdge locally hosted editorial WebP assets match verified source and provenance hashes',()=>{
 const m=JSON.parse(fs.readFileSync('docs/30-verticals/media/solar-energy.media-manifest.json','utf8'));
 assert.equal(m.assets.length,2);assert.equal(d.media.length,2);
 for(const a of m.assets){assert.match(a.local,/^\/assets\/portfolio\/voltedge-[a-z]+\.webp$/);assert.ok(d.media.some(p=>p.url===a.local&&p.source===a.source_page&&p.license===a.license&&p.originalSha1===a.original_sha1));assert.equal(a.source_sha1_verified,true);const bytes=fs.readFileSync('public'+a.local);assert.equal(bytes.length,a.bytes);assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);assert.match(a.original_sha1,/^[a-f0-9]{40}$/);assert.ok(a.license_url.startsWith('https://creativecommons.org/'));}
});
