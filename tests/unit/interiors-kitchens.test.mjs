import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync('docs/30-verticals/media/interiors-kitchens.media-manifest.json','utf8'));
const media=fs.readFileSync('src/app/[locale]/preview/interiors-kitchens/media.ts','utf8');
const data=fs.readFileSync('src/lib/verticals/interiors-kitchens/data.ts','utf8');
test('Forma uses six local WebP assets matching documented sizes and SHA-256',()=>{
 assert.equal(manifest.vertical,'interiors-kitchens');
 assert.equal(manifest.assets.length,6);
 assert.equal(new Set(manifest.assets.map(a=>a.id)).size,6);
 for(const a of manifest.assets){
  assert.match(a.local,/^\/assets\/portfolio\/interiors-kitchens\/[a-z]+\.webp$/);
  assert.ok(a.author&&a.license&&a.license_url&&a.source_page&&a.changes);
  assert.match(a.original_sha1,/^[a-f0-9]{40}$/);
  const bytes=fs.readFileSync('public'+a.local);
  assert.equal(bytes.length,a.bytes);
  assert.equal(bytes.toString('ascii',0,4),'RIFF');
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),a.sha256);
  assert.ok(media.includes("url:'"+a.local+"'"));
 }
 const wood=manifest.assets.find(a=>a.id==='walnut');
 assert.equal(wood.source_page,'https://commons.wikimedia.org/wiki/File:Texture_de_noyer.jpg');
 assert.equal(wood.author,'Cyril5555');
 assert.equal(wood.license,'CC BY-SA 3.0');
 assert.ok(!media.includes('Walnut_textures.jpg'));
 assert.ok(!media.includes('upload.wikimedia.org'));
 assert.ok(!data.includes('upload.wikimedia.org'));
});
