import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chooseScope,filterCases,sectorsFromRegistry} from '../../scripts/visual-scope.mjs';
const sectors=sectorsFromRegistry(fs.readFileSync('src/lib/verticals/registry.ts','utf8'));
const forma='src/app/[locale]/preview/interiors-kitchens/page.tsx';
const atlas='src/app/[locale]/preview/construction/layout.tsx';
test('visual scope: exact sector and QA infrastructure in the same PR',()=>{
 assert.deepEqual(chooseScope([forma,'scripts/visual-qa.mjs','scripts/visual-scope.mjs','tests/unit/visual-scope.test.mjs','.github/workflows/visual-quality.yml'],sectors).sectors,['interiors-kitchens']);
});
test('visual scope: multiple sectors, data and showcase',()=>{
 assert.deepEqual(chooseScope([forma,atlas,'data/verticals/dental.json','src/app/[locale]/showcase/page.tsx'],sectors).sectors,['construction','dental','interiors-kitchens','showcase']);
});
test('visual scope: shared files and unknown changes run all',()=>{
 for(const f of ['src/components/shared/ContactDock.tsx','src/app/layout.tsx','package-lock.json','src/lib/db/index.ts','public/assets/portfolio/ambiguous.webp','src/app/[locale]/preview/new-sector/page.tsx'])assert.equal(chooseScope([forma,f],sectors).mode,'all');
 assert.equal(chooseScope(['scripts/visual-qa.mjs'],sectors).mode,'all');
 assert.equal(chooseScope([],sectors).mode,'all');
});
test('visual scope: manual input and nonempty cases',()=>{
 assert.equal(chooseScope([],sectors,'all').mode,'all');
 assert.deepEqual(chooseScope([],sectors,'dental, construction,dental').sectors,['construction','dental']);
 assert.throws(()=>chooseScope([],sectors,'typo'));
 const cases=[['construction',''],['dental',''],['dental','request-appointment']];
 assert.equal(filterCases(cases,'dental').length,2);
 assert.equal(filterCases(cases,'all').length,3);
 assert.throws(()=>filterCases(cases,'typo'));
 assert.throws(()=>filterCases(cases,''));
});
