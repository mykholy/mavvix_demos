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
const counts=Object.fromEntries(['live','in_progress','planned'].map(s=>[s,entries.filter(e=>e.status===s).length]));
console.log('Registry contract PASS:',JSON.stringify(counts));
