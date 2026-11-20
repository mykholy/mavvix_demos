import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const port = 31465;
const base = 'http://127.0.0.1:' + port;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], {
  env: { ...process.env, NODE_ENV: 'production', PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
server.stdout.on('data', chunk => output += chunk.toString());
server.stderr.on('data', chunk => output += chunk.toString());
const get = (path, options = {}) => fetch(base + path, options);
const post = (path, body) => get(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

try {
  let ready = false;
  for (let i = 0; i < 90; i++) {
    if (server.exitCode !== null) break;
    try {
      const response = await get('/ar/showcase');
      if (response.ok) { ready = true; break; }
    } catch { }
    await sleep(500);
  }
  assert.ok(ready, 'Production server failed to start: ' + output.slice(-2000));

  for (const locale of ['ar', 'en']) {
    for (const path of ['showcase', 'preview/construction', 'preview/industrial', 'preview/real-estate',
      'preview/dental', 'preview/ecommerce', 'preview/portfolio', 'preview/restaurant', 'preview/academy']) {
      const response = await get('/' + locale + '/' + path);
      assert.equal(response.status, 200, locale + '/' + path + ' rendered with status ' + response.status);
    }
  }
  console.log('PASS: 18 localized public pages return 200');

  const admin = await get('/api/admin/submissions/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(admin.status, 401, 'Admin mutation requires authenticated session');
  const emptyOrder = await post('/api/demo/ecommerce', { flowType: 'ecommerce_order', payload: { shippingZone: 'Cairo' }, lines: [] });
  assert.equal(emptyOrder.status, 422, 'Empty ecommerce order must be rejected');
  const wrongSector = await post('/api/demo/construction', { flowType: 'ecommerce_order', payload: { shippingZone: 'Cairo' }, lines: [] });
  assert.equal(wrongSector.status, 400, 'Cross-sector flow cannot be submitted');

  const quiz = await post('/api/demo/academy/progress', {
    guestToken: 'integration-test-guest-token-2026', itemType: 'quiz', itemId: 'lesson-01-01', status: 'completed', score: 75,
  });
  const qbody = await quiz.json();
  assert.equal(quiz.status, 200, 'Academy progress: ' + JSON.stringify(qbody));
  assert.equal(qbody.success, true);
  const saved = await get('/api/demo/academy/progress?guestToken=integration-test-guest-token-2026');
  const progress = await saved.json();
  assert.equal(saved.status, 200);
  assert.ok(progress.progress.some(r => r.item_type === 'quiz' && r.item_id === 'lesson-01-01' && r.score === 75));

  const order = await post('/api/demo/ecommerce', {
    flowType: 'ecommerce_order',
    payload: { shippingZone: 'Cairo', recipientName: 'QA Only', recipientPhone: '00000000000', streetAddress: 'QA fictional address' },
    lines: [{ source_type: 'product_variant', source_id: 'sku-01', variant_id: 'sku-01-v1', quantity: 1, unit_price_cents: 1 }],
  });
  const receipt = await order.json();
  assert.equal(order.status, 200, 'Trusted ecommerce checkout: ' + JSON.stringify(receipt));
  assert.ok(receipt.order.subtotalCents > 1, 'Client-supplied 1-cent price must be ignored');
  assert.equal(receipt.receiptToken.length, 64);
  const unauthorizedReceipt = await get('/ar/preview/ecommerce/orders/' + receipt.submissionId);
  assert.equal(unauthorizedReceipt.status, 404, 'Order receipt without access token must be private');
  const permittedReceipt = await get('/ar/preview/ecommerce/orders/' + receipt.submissionId + '?access=' + encodeURIComponent(receipt.receiptToken));
  assert.equal(permittedReceipt.status, 200, 'Order receipt with access token must be readable');


  // Exhaustively open every static page in every sector, not just eight homepages.
  const sectorRoutes = {
    construction: ['','about','contact','journal','process','projects','request-quote','services'],
    industrial: ['','about','compare','contact','industries','process','products','resources','rfq'],
    'real-estate': ['','about','compare','contact','developments','journal','properties','saved','viewing'],
    dental: ['','contact','faq','locations','patient-guide','request-appointment','services','team'],
    ecommerce: ['','cart','checkout','collections','help','journal','search','story','wishlist'],
    portfolio: ['','about','contact','journal','now','services','work'],
    restaurant: ['','faq','journal','locations','menu','order','reserve','story'],
    academy: ['','courses','enrollment-interest','faq','instructors','learning-paths','resources'],
  };
  const details = [
    'construction/services/fit-out','construction/projects/project-01','construction/journal/article-01',
    'industrial/products/al-40','industrial/resources/article-01',
    'real-estate/properties/listing-01','real-estate/developments/dawn-gardens','real-estate/journal/article-01',
    'dental/services/service-01','dental/team/clinician-01','dental/patient-guide/article-01',
    'ecommerce/products/product-01','ecommerce/collections/apparel','ecommerce/journal/article-01',
    'portfolio/services/brand-identity','portfolio/work/case-01','portfolio/journal/article-01',
    'restaurant/menu/dish-01','restaurant/locations/branch-1','restaurant/journal/article-01',
    'academy/courses/course-01','academy/instructors/instructor-01','academy/resources/article-01',
    'academy/learn/course-01/lesson-01-01','academy/quiz/lesson-01-01',
  ];
  const paths = [];
  for (const locale of ['ar','en']) {
    for (const [sector, routes] of Object.entries(sectorRoutes)) {
      for (const route of routes) paths.push('/' + locale + '/preview/' + sector + (route ? '/' + route : ''));
    }
    for (const detail of details) paths.push('/' + locale + '/preview/' + detail);
  }
  // Small batches keep the synchronous SQLite server stable and expose URL-specific failures.
  const errors = [];
  for (let i = 0; i < paths.length; i += 6) {
    const batch = paths.slice(i, i + 6);
    const results = await Promise.all(batch.map(async path => {
      const response = await get(path);
      return { path, status: response.status };
    }));
    for (const result of results) if (result.status !== 200) errors.push(result.path + ' returned ' + result.status);
  }
  assert.deepEqual(errors, [], 'Pages missing from the bilingual site route matrix');
  console.log('PASS: ' + paths.length + ' bilingual static/detail site journeys return 200');

  const examples = [
    ['construction', 'construction_quote', { sector:'residential', projectStage:'planning', services:['fit-out','mep'], areaM2:200,
      timeline:'next_quarter', budgetBand:'scoping', clientName:'QA Contact', clientContact:'qa@example.invalid' },
      [{source_type:'service',source_id:'fit-out',quantity:1},{source_type:'service',source_id:'mep',quantity:1}]],
    ['industrial','industrial_rfq',{buyerCompany:'QA Industrial',buyerEmail:'qa@example.invalid',packaging:'standard',destination:'Cairo'},
      [{source_type:'catalog_item',source_id:'AL-40',quantity:200}]],
    ['real-estate','real_estate_viewing',{unitSlug:'listing-01',preferredDay:'Monday',preferredTime:'15:00',
       clientName:'QA Contact',clientEmail:'qa@example.invalid',clientPhone:'00000000000'},
      [{source_type:'property_unit',source_id:'listing-01',quantity:1}]],
    ['dental','dental_appointment',{serviceSlug:'service-01', doctorSlug:'clinician-01',branchSlug:'north',
       preferredDay:'Monday',preferredWindow:'10:00-12:00',guestName:'QA Contact',guestPhone:'00000000000',guestEmail:''},
      [{source_type:'dental_service',source_id:'svc-01',quantity:1,snapshot:{title:'Consultation'}}]],
    ['portfolio','portfolio_inquiry',{serviceSlug:'service-01',projectGoal:'Accessible digital product identity',
       clientName:'QA Contact',clientEmail:'qa@example.invalid',timelineWindow:'q1-2027'},
      [{source_type:'portfolio_service',source_id:'port-svc-1',quantity:1}]],
    ['restaurant','restaurant_order',{guestName:'QA Contact',guestPhone:'00000000000',branchId:'rest-branch-1'},
      [{source_type:'restaurant_dish',source_id:'dish-01',quantity:1,modifiers:[]}]],
    ['academy','academy_interest',{courseSlug:'course-01',guestName:'QA Contact',guestEmail:'qa@example.invalid',learningPace:'part_time'},[]],
  ];
  for(const [sector, flowType, payload, lines] of examples) {
    const response = await post('/api/demo/' + sector, { flowType, payload, lines });
    const data = await response.json();
    assert.equal(response.status, 200, sector + ' client enquiry failed: ' + JSON.stringify(data));
    assert.ok(data.success && /^MVX-/.test(data.refNumber), sector + ' did not issue a proper request reference');
  }
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0,10);
  const reserved = await post('/api/demo/restaurant',{
    flowType:'restaurant_table',
    payload:{branchId:'rest-branch-1',slotId:'r-slot-00',date:tomorrow,
      partySize:2,guestName:'QA Contact',guestPhone:'00000000000',seatingPreference:'indoor'},
  });
  const reservation = await reserved.json();
  assert.equal(reserved.status,200,'Restaurant table request failed: '+JSON.stringify(reservation));
  console.log('PASS: 8 distinct sector business enquiry journeys persist and produce references');

  console.log('PASS: auth guard, flow validation, Academy SQLite progress, trusted ecommerce price, private receipt');
} catch (error) {
  console.error(error);
  console.error('Server tail:', output.slice(-5000));
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  await sleep(500);
}
