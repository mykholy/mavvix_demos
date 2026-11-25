#!/usr/bin/env node
/**
 * Dependency-free portfolio registry contract gate.
 * Run: node scripts/verify-vertical-registry.mjs
 * Prevents silent removal, duplication, reordering or premature launch of concepts.
 */
import fs from 'node:fs';
import assert from 'node:assert/strict';

const registry=fs.readFileSync('src/lib/verticals/registry.ts','utf8');
const expected={
  0:['construction','industrial','real-estate','dental','ecommerce','portfolio','restaurant','academy'],
  1:['auto-service','home-maintenance','salon-spa','fitness','sports-venues','furniture','interiors-kitchens','nursery'],
  2:['car-detailing','physiotherapy','veterinary','law-firm','accounting','travel-agency','events','logistics'],
  3:['skin-clinic','diagnostics-lab','boutique-hotel','solar-energy','recruitment','wholesale']
};
const entries=[...registry.matchAll(/\{\s*"slug":\s*"([^"]+)"[\s\S]*?"wave":\s*(\d+),[\s\S]*?"accent":\s*"([^"]+)",\s*"status":\s*"([^"]+)"\s*\}/g)]
 .map(m=>({slug:m[1],wave:Number(m[2]),accent:m[3],status:m[4]}));
assert.equal(entries.length,30,'Exactly 30 explicit registry entries are required');
assert.equal(new Set(entries.map(e=>e.slug)).size,30,'Duplicate registry slug');
assert.deepEqual(
 Object.entries(expected).flatMap(([wave,slugs])=>slugs.map(slug=>slug+'@'+wave)).sort(),
 entries.map(e=>e.slug+'@'+e.wave).sort(),
 'The original eight and ordered wave assignments are immutable'
);
for(const entry of entries){
 assert.match(entry.accent,/^#[0-9a-fA-F]{6}$/,'Invalid accent: '+entry.slug);
 assert.ok(['live','in_progress','planned'].includes(entry.status),'Unknown status: '+entry.slug);
 if(entry.wave===0)assert.equal(entry.status,'live','Original concept removed: '+entry.slug);
 if(entry.wave>0)assert.notEqual(entry.status,'live','Do not mark a new concept live without release evidence: '+entry.slug);
}
// Guard against accidentally skipping an unfinished wave when advancing the factory.
for (const wave of [2, 3]) {
 const active = entries.some(e => e.wave === wave && e.status === 'in_progress');
 if (active) {
  const unfinishedEarlier = entries.filter(e => e.wave > 0 && e.wave < wave && e.status === 'planned');
  assert.equal(unfinishedEarlier.length, 0,
   'Cannot start wave '+wave+' while earlier sectors remain planned: '+unfinishedEarlier.map(e => e.slug).join(', '));
 }
}
// Prevent placeholder records with missing identity from entering the catalogue.
const metadata = [...registry.matchAll(/"slug":\s*"([^"]+)"\s*,\s*"brand":\s*"([^"]+)"\s*,\s*"ar":\s*"([^"]+)"\s*,\s*"en":\s*"([^"]+)"/g)];
assert.equal(metadata.length, 30, 'Each sector requires an explicit brand and bilingual labels');
for (const match of metadata) {
 for (const value of match.slice(2)) assert.ok(value.trim().length >= 2, 'Missing identity metadata for '+match[1]);
}
assert.equal(new Set(metadata.map(m => m[2].trim().toLowerCase())).size, 30, 'Duplicate sector brand');

// Structural parity: the public curated gallery and Mavvix sector switcher must never
// omit implemented sites or promote a placeholder, as happened with BloomSteps.
const implemented=entries.filter(e=>e.status!=='planned').map(e=>e.slug).sort();
for(const [label,file] of [['Showcase','src/app/[locale]/showcase/page.tsx'],
                            ['ContactDock','src/components/shared/ContactDock.tsx']]){
 const source=fs.readFileSync(file,'utf8');
 const sectorSlugs=[...source.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/g)].map(x=>x[1]).sort();
 assert.equal(sectorSlugs.length,new Set(sectorSlugs).size,label+' has repeated sector card');
 assert.deepEqual(sectorSlugs,implemented,label+' is missing an implemented sector or advertising unbuilt concepts');
}
for(const entry of entries.filter(e=>e.status==='in_progress')){
 const route='src/app/[locale]/preview/'+entry.slug+'/page.tsx';
 assert.ok(fs.existsSync(route),'In-progress sector has no actual homepage source: '+entry.slug);
}
console.log('Portfolio parity PASS:',implemented.length,'real route families listed across Gallery and ContactDock');

const counts=Object.fromEntries(['live','in_progress','planned'].map(s=>[s,entries.filter(e=>e.status===s).length]));
console.log('Registry contract PASS:',JSON.stringify(counts));

/**
 * Dependency integrity gate: prevent manifest-only framework upgrades.
 * npm ci will additionally validate the complete transitive lock graph.
 */
const manifest=JSON.parse(fs.readFileSync('package.json','utf8'));
const lock=JSON.parse(fs.readFileSync('package-lock.json','utf8'));
assert.equal(lock.lockfileVersion,3,'Expected npm lockfile v3');
assert.equal(lock.name,manifest.name,'Lockfile package name mismatch');
for(const group of ['dependencies','devDependencies']){
 for(const [name,range] of Object.entries(manifest[group]||{})){
  assert.equal(lock.packages?.['']?.[group]?.[name],range,
   'Manifest/lockfile mismatch for '+name+'; regenerate package-lock.json with npm install');
 }
}
for(const name of ['next','eslint-config-next']){
 const declared=manifest.dependencies?.[name]??manifest.devDependencies?.[name];
 assert.ok(declared,'Missing framework dependency '+name);
 assert.equal(lock.packages?.['node_modules/'+name]?.version,declared,
  'Installed '+name+' lock version must match exact manifest pin');
}
assert.equal(manifest.dependencies.next,manifest.devDependencies['eslint-config-next'],
 'Next.js and eslint-config-next must be pinned to the same version');
console.log('Framework lockfile contract PASS:',manifest.dependencies.next);
