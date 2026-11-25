import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {seedPortfolioVerticals} from '../../scripts/seed-portfolio.mjs';
import {applyPortfolioMigrations} from '../../scripts/apply-portfolio-migrations.mjs';
const data=JSON.parse(fs.readFileSync('data/verticals/travel-agency.json','utf8'));
test('Nomad Routes provides eight distinct bilingual journey dossiers and credible planning material',()=>{
 assert.equal(data.slug,'travel-agency');assert.equal(data.services.length,8);assert.equal(data.articles.length,3);assert.equal(data.faq.length,5);
 assert.equal(new Set(data.services.map(j=>j.slug)).size,8);
 for(const j of data.services){assert.ok(j.body.ar.length>140&&j.body.en.length>140);assert.equal(j.checkpoints.ar.length,3);assert.equal(j.checkpoints.en.length,3);if(j.days!==null)assert.ok(j.days>=2&&j.days<=5);}
 assert.equal(data.media[0].license,'CC0-1.0');
 const home=fs.readFileSync('src/app/[locale]/preview/travel-agency/page.tsx','utf8');
 assert.ok((home.match(/data-sector-specific=/g)||[]).length>=9);
 const api=fs.readFileSync('src/server/portfolio/travel-agency.ts','utf8');
 assert.match(api,/COUNTRY_MISMATCH/);assert.match(api,/DURATION_MISMATCH/);assert.match(api,/INVALID_DATE/);assert.match(api,/pending_operator_confirmation/);assert.match(api,/\.strict\(\)/);
});
