import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('data/verticals/skin-clinic.json','utf8'));
test('Elyra original consultation dossiers and strictly limited callback',()=>{
 assert.equal(d.services.length,8);assert.equal(d.articles.length,3);assert.equal(d.faq.length,5);assert.equal(new Set(d.services.map(s=>s.slug)).size,8);
 for(const s of d.services){assert.ok(d.categories.includes(s.category));assert.ok(s.body.ar.length>120&&s.body.en.length>120);assert.equal(s.checkpoints.ar.length,3);assert.equal(s.checkpoints.en.length,3);}
 const api=fs.readFileSync('src/server/portfolio/skin-clinic.ts','utf8');assert.match(api,/\.strict\(\)/);assert.match(api,/consent:z.literal\(true\)/);assert.match(api,/pending_operator_confirmation/);assert.match(api,/Cache-Control/);
 const form=fs.readFileSync('src/app/[locale]/preview/skin-clinic/contact/CallbackForm.tsx','utf8');assert.doesNotMatch(form,/URLSearchParams|type="file"|<textarea/);assert.match(form,/referrerPolicy:'no-referrer'/);
});

test('health-sector contact dock never forwards sector context to advertising hooks',()=>{
 const dock=fs.readFileSync('src/components/shared/ContactDock.tsx','utf8');
 const guard=dock.indexOf("if (sector === 'skin-clinic' || sector === 'diagnostics-lab') return;");
 assert.ok(guard>=0&&guard<dock.indexOf('w.dataLayer?.push')&&guard<dock.indexOf("w.fbq?.('track'"));
});
