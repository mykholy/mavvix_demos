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


  for (const locale of ['ar','en']) {
    for (const sector of Object.keys(sectorRoutes)) {
      const url='/' + locale + '/preview/' + sector;
      const html=await (await get(url)).text();
      assert.ok(html.includes('wa.me/201062015302'), 'Verified WhatsApp contact missing: '+url);
      assert.ok(html.includes('tel:+201062015302'), 'Verified click-to-call missing: '+url);
      assert.ok(html.includes('data-mavvix-contact-dock'), 'Floating conversion UI absent: '+url);
    }
  }
  console.log('PASS: 8/8 industry sites include actual Mavvix WhatsApp and call conversion links in AR/EN');

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


  // Wave 1 first sector. Test every substantive AR/EN page and detail route.
  const automotiveRoutes=['','services','services/brakes','services/oil-filters','resources',
    'resources/warning-lights','diagnostics','packages','car-brands','locations','process','about','contact','booking'];
  for(const locale of ['ar','en']){
    for(const route of automotiveRoutes){
      const url='/'+locale+'/preview/auto-service'+(route?'/'+route:'');
      const response=await get(url);
      assert.equal(response.status,200,'Auto-service site route failed: '+url);
      const html=await response.text();
      assert.ok(html.includes('data-mavvix-contact-dock'),'Auto-service sales dock missing: '+url);
    }
  }
  const automotiveBody={flowType:'auto_service_request',clientRequestId:'11111111-1111-4111-8111-111111111112',
    guestName:'QA Automotive',guestPhone:'01000000000',make:'Toyota',model:'Corolla',year:2023,
    serviceSlug:'brakes',category:'safety',preferredDate:'',preferredWindow:'flexible',region:'Cairo',
    consent:true,honeypot:'',utm:{source:'qa',medium:'integration',campaign:'auto-service'}};
  const incompleteSector=await post('/api/portfolio/veterinary',automotiveBody);
  assert.equal(incompleteSector.status,404,'Unimplemented sectors must never impersonate a live flow');
  const crossSector=await post('/api/portfolio/fitness',automotiveBody);
  assert.equal(crossSector.status,400,'A fitness API must reject automotive cross-sector payloads');
  const invalidAuto=await post('/api/portfolio/auto-service',{...automotiveBody,consent:false});
  assert.equal(invalidAuto.status,400,'Nonconsensual auto request must be rejected');
  const autoResp=await post('/api/portfolio/auto-service',automotiveBody);
  const autoResult=await autoResp.json();
  assert.equal(autoResp.status,201,'Auto-service intake failed: '+JSON.stringify(autoResult));
  assert.ok(/^MVX-AS-[A-F0-9]+$/.test(autoResult.refNumber));
  assert.equal(autoResult.status,'pending_operator_confirmation');
  const duplicateAuto=await post('/api/portfolio/auto-service',automotiveBody);
  const duplicateBody=await duplicateAuto.json();
  assert.equal(duplicateAuto.status,200);
  assert.equal(duplicateBody.refNumber,autoResult.refNumber);
  assert.equal(duplicateBody.duplicate,true);
  const unauthedPortfolioUpdate=await post('/api/admin/portfolio-requests/status',{
    id:'psr_123',status:'qualified',notes:'Not authorized'
  });
  assert.equal(unauthedPortfolioUpdate.status,401,'Protected industry lead mutation must reject guests');
  console.log('PASS: 28 bilingual auto-service journeys + 1 persisted idempotent inspection request and admin auth');


  // Distinct second industry route family, with actual persisted pending-only service enquiry.
  const homeCareRoutes=['','services','services/ac-maintenance','services/water-leaks','resources',
   'resources/air-conditioner-prepare','ac','plumbing','electrical','coverage','pricing-guide','process','about','contact','book'];
  for(const locale of ['ar','en']){
    for(const route of homeCareRoutes){
      const path='/'+locale+'/preview/home-maintenance'+(route?'/'+route:'');
      const response=await get(path);
      assert.equal(response.status,200,'Home maintenance route failed: '+path);
      const html=await response.text();
      assert.ok(html.includes('data-mavvix-contact-dock'),'Mavvix sales dock missing: '+path);
    }
  }
  const hmData={flowType:'home_maintenance_request',clientRequestId:'22222222-2222-4222-8222-222222222222',
    serviceSlug:'ac-maintenance',issue:'poor_performance',urgency:'routine',region:'Cairo',
    visitType:'inspection',preferredDate:'',preferredWindow:'flexible',propertyType:'apartment',
    guestName:'QA Maintenance',guestPhone:'01000000000',consent:true,honeypot:'',
    utm:{source:'qa',medium:'integration',campaign:'home-maintenance'}};
  const failedConsent=await post('/api/portfolio/home-maintenance',{...hmData,consent:false});
  assert.equal(failedConsent.status,400,'Home maintenance requires explicit consent');
  const homeResponse=await post('/api/portfolio/home-maintenance',hmData);
  const homeBody=await homeResponse.json();
  assert.equal(homeResponse.status,201,'Home maintenance request could not persist: '+JSON.stringify(homeBody));
  assert.ok(/^MVX-HM-[A-F0-9]+$/.test(homeBody.refNumber));
  assert.equal(homeBody.status,'pending_operator_confirmation');
  const again=await post('/api/portfolio/home-maintenance',hmData);
  const againResult=await again.json();
  assert.equal(again.status,200,'Idempotent repeat must be accepted');
  assert.equal(againResult.refNumber,homeBody.refNumber);
  assert.equal(againResult.duplicate,true);
  console.log('PASS: 30 bilingual Fixora routes, stored home service request and replay-safe reference');


  // Salon is a fundamentally different cosmetic-service request, never a real confirmed booking.
  const salonRoutes=['','services','services/shape-cut','services/classic-manicure','journal',
   'journal/choosing-treatment','rituals','packages','specialists','gallery','about','process','contact','questions','booking'];
  for(const locale of ['ar','en']){
    for(const route of salonRoutes){
      const path='/'+locale+'/preview/salon-spa'+(route?'/'+route:'');
      const response=await get(path);
      assert.equal(response.status,200,'Velora salon route failed: '+path);
      const html=await response.text();
      assert.ok(html.includes('data-mavvix-contact-dock'),'Mavvix sales dock absent on '+path);
    }
  }
  const salonDate=new Date(Date.now()+2*86400000).toISOString().slice(0,10);
  const salonBody={flowType:'salon_appointment_interest',clientRequestId:'33333333-3333-4333-8333-333333333333',
    serviceSlug:'classic-manicure',durationMinutes:45,staffPreference:'nail-artist',
    preferredDate:salonDate,preferredWindow:'afternoon',region:'Cairo',occasion:'self-care',
    guestName:'QA Salon Enquiry',guestPhone:'01000000000',consent:true,honeypot:'',
    utm:{source:'qa',medium:'visual',campaign:'velora-wave1'}};
  const salonNoConsent=await post('/api/portfolio/salon-spa',{...salonBody,consent:false});
  assert.equal(salonNoConsent.status,400,'Salon must reject nonconsensual intake');
  const salonBadDuration=await post('/api/portfolio/salon-spa',{...salonBody,durationMinutes:120});
  assert.equal(salonBadDuration.status,400,'Salon must use actual allowed service duration');
  const salonBadSpecialist=await post('/api/portfolio/salon-spa',{...salonBody,staffPreference:'hair-stylist'});
  assert.equal(salonBadSpecialist.status,400,'Salon speciality is subject to chosen service');
  const salonSaved=await post('/api/portfolio/salon-spa',salonBody);
  const salonResult=await salonSaved.json();
  assert.equal(salonSaved.status,201,'Salon request must persist: '+JSON.stringify(salonResult));
  assert.ok(/^MVX-VLR-[A-F0-9]+$/.test(salonResult.refNumber));
  assert.equal(salonResult.status,'pending_operator_confirmation');
  const salonRepeat=await post('/api/portfolio/salon-spa',salonBody);
  const salonDuplicate=await salonRepeat.json();
  assert.equal(salonRepeat.status,200,'Repeated salon UUID must not duplicate a record');
  assert.equal(salonDuplicate.refNumber,salonResult.refNumber);
  assert.equal(salonDuplicate.duplicate,true);
  console.log('PASS: 30 bilingual Velora pages + valid pending-only salon request, idempotency and strict validation');


  // Fourth distinct Wave 1 site. Verify localized gym content and persisted consented visitor state.
  const fitnessRoutes=['','classes','classes/foundations','classes/mobility-reset','trial','journal',
   'journal/starting-with-strength','memberships','schedule','coaching','first-visit','locations','process','about','contact'];
  for(const locale of ['ar','en']){
    for(const route of fitnessRoutes){
      const url='/'+locale+'/preview/fitness'+(route?'/'+route:'');
      const response=await get(url);
      assert.equal(response.status,200,'Pulse fitness route missing '+url);
      const html=await response.text();
      assert.ok(html.includes('data-mavvix-contact-dock'),'Pulse Mavvix CTA absent on '+url);
    }
  }
  const fitPayload={flowType:'fitness_trial_interest',clientRequestId:'44444444-4444-4444-8444-444444444444',
    serviceSlug:'foundations',level:'beginner',goal:'strength_skill',requestType:'trial',preferredDate:'',
    preferredWindow:'flexible',daysPerWeek:3,region:'Cairo',guestName:'QA Fitness',
    guestPhone:'01000000000',consent:true,honeypot:'',
    utm:{source:'qa',medium:'integration',campaign:'pulse-fitness'}};
  assert.equal((await post('/api/portfolio/fitness',{...fitPayload,consent:false})).status,400,'Gym requires user consent');
  assert.equal((await post('/api/portfolio/fitness',{...fitPayload,level:'intermediate'})).status,400,'Gym must enforce class-level compatibility');
  assert.equal((await post('/api/portfolio/fitness',{...fitPayload,serviceSlug:'fake-class'})).status,400,'Unregistered gym class rejected');
  const fitResp=await post('/api/portfolio/fitness',fitPayload),fitResult=await fitResp.json();
  assert.equal(fitResp.status,201,'Pulse request failed: '+JSON.stringify(fitResult));
  assert.match(fitResult.refNumber,/^MVX-PUL-[A-F0-9]+$/);
  assert.equal(fitResult.status,'pending_operator_confirmation');
  const fitAgain=await post('/api/portfolio/fitness',fitPayload),fitDuplicate=await fitAgain.json();
  assert.equal(fitAgain.status,200);
  assert.equal(fitDuplicate.refNumber,fitResult.refNumber);
  assert.equal(fitDuplicate.duplicate,true);
  console.log('PASS: 30 bilingual gym routes and strictly validated persisted idempotent trial enquiry');


  // Arena is not live inventory: sport/team validation plus persisted pending-only court request.
  const arenaRoutes=['','courts','courts/football-five','courts/padel-doubles','book','sports',
   'schedule','pricing','leagues','coaches','process','about','contact','journal','journal/venue-questions'];
  for(const locale of ['ar','en']){
    for(const route of arenaRoutes){
      const url='/'+locale+'/preview/sports-venues'+(route?'/'+route:'');
      const response=await get(url);
      assert.equal(response.status,200,'Arena court route unavailable: '+url);
      const html=await response.text();
      assert.ok(html.includes('data-mavvix-contact-dock'),'Missing Mavvix conversion dock: '+url);
    }
  }
  const arenaDate=new Date(Date.now()+2*86400000).toISOString().slice(0,10);
  const arenaBody={flowType:'sports_venue_request',clientRequestId:'55555555-5555-4555-8555-555555555555',
    serviceSlug:'padel-doubles',sport:'padel',players:4,durationMinutes:90,
    preferredDate:arenaDate,preferredStart:'18:30',region:'Cairo',sessionType:'friendly',
    guestName:'QA Venue Visitor',guestPhone:'01000000000',consent:true,honeypot:'',
    utm:{source:'qa',medium:'integration',campaign:'arena-courts'}};
  assert.equal((await post('/api/portfolio/sports-venues',{...arenaBody,consent:false})).status,400,'Court consent is required');
  assert.equal((await post('/api/portfolio/sports-venues',{...arenaBody,players:14})).status,400,'Padel doubles cannot have 14 players');
  assert.equal((await post('/api/portfolio/sports-venues',{...arenaBody,sport:'football'})).status,400,'Sport must match exact court format');
  const arenaResponse=await post('/api/portfolio/sports-venues',arenaBody),arenaResult=await arenaResponse.json();
  assert.equal(arenaResponse.status,201,'Arena court request failed: '+JSON.stringify(arenaResult));
  assert.match(arenaResult.refNumber,/^MVX-ARN-[A-F0-9]+$/);
  assert.equal(arenaResult.status,'pending_operator_confirmation');
  const arenaAgain=await post('/api/portfolio/sports-venues',arenaBody),arenaDupe=await arenaAgain.json();
  assert.equal(arenaAgain.status,200,'Idempotent Arena request must not create a second row');
  assert.equal(arenaDupe.refNumber,arenaResult.refNumber);
  assert.equal(arenaDupe.duplicate,true);
  console.log('PASS: 30 bilingual Arena court routes and strict, persisted, nonbinding booking preference');

  // Oakline and Forma: every actual detail route, not only the home page.
  const oakRoutes=['','collections','quote','journal','rooms','materials','measurement-guide','projects','gallery','process','about','contact',
    ...['modular-sofa','accent-armchair','oak-coffee-table','storage-console','platform-bed','wardrobe-front','dining-table','bench-seating','writing-desk','open-bookshelf'].map(s=>'collections/'+s),
    ...['measuring-a-room','fabric-and-wood','delivery-access'].map(s=>'journal/'+s)];
  const formaRoutes=['','services','consultation','journal','layouts','materials','measurement','process','gallery','finishes','about','contact','faq',
    ...['l-shaped','u-shaped','galley','island','wardrobes','vanity','pantry','countertops','lighting'].map(s=>'services/'+s),
    ...['measure-before-design','finishes-matter','layout-decision'].map(s=>'journal/'+s)];
  for(const locale of ['ar','en']){
    for(const [sector,routes] of [['furniture',oakRoutes],['interiors-kitchens',formaRoutes]]){
      for(const route of routes){
        const url='/'+locale+'/preview/'+sector+(route?'/'+route:'');
        const response=await get(url);
        assert.equal(response.status,200,'Missing industry route '+url);
        assert.ok((await response.text()).includes('data-mavvix-contact-dock'),'Missing conversion dock '+url);
      }
      const missing=await get('/'+locale+'/preview/'+sector+'/not-a-real-section');
      assert.equal(missing.status,404,'Unknown topic must return 404');
    }
  }
  const oakBody={flowType:'furniture_custom_quote_request',clientRequestId:'66666666-6666-4666-8666-666666666666',
    items:[{serviceSlug:'modular-sofa',room:'living',material:'linen',finish:'sand',widthMm:2400,depthMm:950,heightMm:850,quantity:2},
      {serviceSlug:'oak-coffee-table',room:'living',material:'oak',finish:'natural',widthMm:1000,depthMm:600,heightMm:450,quantity:1}],
    deliveryZone:'Cairo',designStage:'measurements_ready',guestName:'QA Furniture',guestPhone:'01000000000',consent:true,honeypot:''};
  assert.equal((await post('/api/portfolio/furniture',{...oakBody,items:[{...oakBody.items[0],material:'oak'}]})).status,400,'Reject incompatible upholstery');
  assert.equal((await post('/api/portfolio/furniture',{...oakBody,items:[{...oakBody.items[0],widthMm:4900}]})).status,400,'Reject out-of-range dimensions');
  const oakSaved=await post('/api/portfolio/furniture',oakBody),oakReceipt=await oakSaved.json();
  assert.equal(oakSaved.status,201,JSON.stringify(oakReceipt));
  assert.match(oakReceipt.refNumber,/^MVX-OAK-[A-F0-9]+$/);
  assert.equal(oakReceipt.status,'pending_operator_confirmation');
  const oakRepeat=await post('/api/portfolio/furniture',oakBody),oakDupe=await oakRepeat.json();
  assert.equal(oakRepeat.status,200);assert.equal(oakDupe.refNumber,oakReceipt.refNumber);assert.equal(oakDupe.duplicate,true);
  const formaBody={flowType:'interior_design_brief',clientRequestId:'77777777-7777-4777-8777-777777777777',
    serviceSlug:'l-shaped',layout:'L',wallLengthsCm:[320,260],floorAreaSqm:12,finish:'matte',countertop:'quartz',
    budgetBand:'quotation-needed',timeline:'1-3-months',area:'Cairo',guestName:'QA Kitchen',guestPhone:'01000000000',consent:true,honeypot:''};
  assert.equal((await post('/api/portfolio/interiors-kitchens',{...formaBody,consent:false})).status,400,'Consent required');
  assert.equal((await post('/api/portfolio/interiors-kitchens',{...formaBody,wallLengthsCm:[320]})).status,400,'Wall count must match layout');
  assert.equal((await post('/api/portfolio/interiors-kitchens',{...formaBody,wallLengthsCm:[50,260]})).status,400,'Reject invalid measurements');
  const formaSaved=await post('/api/portfolio/interiors-kitchens',formaBody),formaReceipt=await formaSaved.json();
  assert.equal(formaSaved.status,201,JSON.stringify(formaReceipt));
  assert.match(formaReceipt.refNumber,/^MVX-FRM-[A-F0-9]+$/);
  assert.equal(formaReceipt.status,'pending_operator_confirmation');
  const formaRepeat=await post('/api/portfolio/interiors-kitchens',formaBody),formaDupe=await formaRepeat.json();
  assert.equal(formaRepeat.status,200);assert.equal(formaDupe.refNumber,formaReceipt.refNumber);assert.equal(formaDupe.duplicate,true);
  console.log('PASS: '+(2*(oakRoutes.length+formaRoutes.length))+' localized Oakline/Forma pages, two saved requests, invalid configurations and idempotency');

  const bloomRoutes=['','age-groups','curriculum','daily-routine','safety','gallery','admissions','journal','about','process','contact','faq',
   ...['little-explorers','curious-toddlers','ready-for-school','story-language','sensory-discovery','art-expression','movement-play','practical-life'].map(s=>'programs/'+s),
   ...['first-nursery-visit','settling-in-routines','privacy-and-pickup'].map(s=>'journal/'+s)];
  for(const locale of ['ar','en'])for(const route of bloomRoutes){
   const url='/'+locale+'/preview/nursery'+(route?'/'+route:'');const response=await get(url);
   assert.equal(response.status,200,'BloomSteps route missing '+url);assert.ok((await response.text()).includes('data-mavvix-contact-dock'),'Missing BloomSteps contact dock');
  }
  const bloomBody={flowType:'nursery_visit_interest',clientRequestId:'88888888-8888-4888-8888-888888888888',ageBand:'2-3',serviceSlug:'curious-toddlers',
   requestType:'visit',region:'Cairo',preferredDate:'',preferredWindow:'flexible',guestName:'QA Guardian',guestPhone:'01000000000',consent:true,honeypot:''};
  assert.equal((await post('/api/portfolio/nursery',{...bloomBody,childName:'Forbidden test field'})).status,400,'Reject child identifying fields');
  assert.equal((await post('/api/portfolio/nursery',{...bloomBody,ageBand:'1-2'})).status,400,'Reject mismatched age group');
  assert.equal((await post('/api/portfolio/nursery',{...bloomBody,consent:false})).status,400,'Guardian consent required');
  const bloomSaved=await post('/api/portfolio/nursery',bloomBody),bloomReceipt=await bloomSaved.json();
  assert.equal(bloomSaved.status,201,JSON.stringify(bloomReceipt));assert.match(bloomReceipt.refNumber,/^MVX-BLM-[A-F0-9]+$/);
  assert.equal(bloomReceipt.status,'pending_operator_confirmation');
  const bloomAgain=await post('/api/portfolio/nursery',bloomBody),bloomDuplicate=await bloomAgain.json();
  assert.equal(bloomAgain.status,200);assert.equal(bloomDuplicate.refNumber,bloomReceipt.refNumber);assert.equal(bloomDuplicate.duplicate,true);
  console.log('PASS: '+2*bloomRoutes.length+' localized nursery routes, guardian-only persisted request and privacy validation');


  const glossRoutes=['','packages','packages/studio-wash','packages/interior-detail','packages/ceramic-protection',
   'quote','journal','journal/coating-vs-ppf','journal/before-detail',
   'detailing','ceramic','gallery','fleet','process','about','contact','faq'];
  for(const locale of ['ar','en'])for(const route of glossRoutes){
   const url='/'+locale+'/preview/car-detailing'+(route?'/'+route:'');
   const response=await get(url);
   assert.equal(response.status,200,'GlossBay route failed: '+url);
   const html=await response.text();
   assert.ok(html.includes('data-mavvix-contact-dock'),'Missing Mavvix contact dock on GlossBay '+url);
  }
  const quoteDate=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
  const glossReq={flowType:'car_detailing_quote_request',clientRequestId:'99999999-9999-4999-8999-999999999999',
   vehicleSize:'sedan',treatment:'ceramic-protection',addons:['trunk','wheels'],
   condition:'new-vehicle',requestedDate:quoteDate,requestedWindow:'flexible',
   city:'Giza',guestName:'QA Detailing',guestPhone:'01000000000',consent:true,honeypot:'',
   utm:{source:'qa',medium:'integration',campaign:'car-detailing'}};
  assert.equal((await post('/api/portfolio/car-detailing',{...glossReq,consent:false})).status,400,'GlossBay rejects requests without consent');
  assert.equal((await post('/api/portfolio/car-detailing',{...glossReq,vehicleSize:'truck-100'})).status,400,'GlossBay rejects invented vehicle size');
  // Service and size validity, consent, initial write and replay use all 5 allowed requests/minute.
  // Add-on duplicate rejection is implemented server-side; abuse/load tests must use isolated identities.
  assert.equal((await post('/api/portfolio/car-detailing',{...glossReq,treatment:'not-real'})).status,400,'GlossBay validates authored treatment');
  const glossSaved=await post('/api/portfolio/car-detailing',glossReq);
  const glossReceipt=await glossSaved.json();
  assert.equal(glossSaved.status,201,'GlossBay request persistence failed: '+JSON.stringify(glossReceipt));
  assert.match(glossReceipt.refNumber,/^MVX-GB-[A-F0-9]+$/);
  assert.equal(glossReceipt.status,'pending_operator_confirmation');
  const glossAgain=await post('/api/portfolio/car-detailing',glossReq);
  const glossDuplicate=await glossAgain.json();
  assert.equal(glossAgain.status,200);
  assert.equal(glossDuplicate.duplicate,true);
  assert.equal(glossDuplicate.refNumber,glossReceipt.refNumber);
  console.log('PASS: '+(glossRoutes.length*2)+' bilingual GlossBay routes and idempotent vehicle-size/add-on quote with strict negatives');

 
  const motionRoutes=['','services','services/initial-movement-assessment','services/sports-return-planning','appointment',
    'journal','journal/first-appointment','first-visit','mobility','sports','programmes',
    'team','process','privacy','about','contact','questions'];
  for(const locale of ['ar','en'])for(const route of motionRoutes){
    const url='/'+locale+'/preview/physiotherapy'+(route?'/'+route:'');
    const response=await get(url);
    assert.equal(response.status,200,'Motion Lab route failed: '+url);
    assert.ok((await response.text()).includes('data-mavvix-contact-dock'),'Missing Mavvix contact dock on '+url);
  }
  const motionDate=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
  const motionReq={flowType:'physiotherapy_assessment_interest',clientRequestId:'11111111-1111-4111-8111-222222222222',
    serviceSlug:'initial-movement-assessment',visitType:'first-assessment',goalType:'daily-movement',
    preferredDate:motionDate,preferredWindow:'flexible',region:'Cairo',guestName:'QA Movement',
    guestPhone:'01000000000',consent:true,honeypot:'',utm:{source:'qa',medium:'integration',campaign:'physiotherapy'}};
  assert.equal((await post('/api/portfolio/physiotherapy',{...motionReq,consent:false})).status,400,
    'Motion Lab enforces explicit contact consent');
  assert.equal((await post('/api/portfolio/physiotherapy',{...motionReq,medicalHistory:'FORBIDDEN SENSITIVE DATA'})).status,400,
    'Motion Lab must reject clinical information');
  const motionSaved=await post('/api/portfolio/physiotherapy',motionReq);
  const motionReceipt=await motionSaved.json();
  assert.equal(motionSaved.status,201,'Motion Lab intake not saved: '+JSON.stringify(motionReceipt));
  assert.match(motionReceipt.refNumber,/^MVX-ML-[A-F0-9]+$/);
  assert.equal(motionReceipt.status,'pending_operator_confirmation');
  const motionAgain=await post('/api/portfolio/physiotherapy',motionReq);
  const motionReplay=await motionAgain.json();
  assert.equal(motionAgain.status,200);
  assert.equal(motionReplay.duplicate,true);
  assert.equal(motionReplay.refNumber,motionReceipt.refNumber);
  console.log('PASS: 34 bilingual Motion Lab routes, no-PHI form rejection and saved idempotent pending enquiry');


  // PawWell: pet-species-aware request and explicit no-medical-history safety policy.
  const pawRoutes=['','pets','services','services/wellness-visit','services/vaccination-review',
    'request','guides','guides/pet-first-visit','prevention','team','emergencies',
    'process','about','contact','questions','care-plan'];
  for(const locale of ['ar','en'])for(const route of pawRoutes){
    const url='/'+locale+'/preview/veterinary'+(route?'/'+route:'');
    const response=await get(url);
    assert.equal(response.status,200,'PawWell route failed: '+url);
    assert.ok((await response.text()).includes('data-mavvix-contact-dock'),'Missing Mavvix dock on '+url);
  }
  const vetDate=new Date(Date.now()+4*86400000).toISOString().slice(0,10);
  const vetReq={flowType:'veterinary_visit_interest',clientRequestId:'55555555-5555-4555-8555-555555555555',
    species:'dog',ageBand:'adult',serviceSlug:'wellness-visit',visitPreference:'clinic',
    preferredDate:vetDate,preferredWindow:'flexible',region:'Cairo',
    guestName:'QA Pet Guardian',guestPhone:'01000000000',consent:true,honeypot:'',
    utm:{source:'qa',medium:'integration',campaign:'veterinary'}};
  assert.equal((await post('/api/portfolio/veterinary',{...vetReq,consent:false})).status,400,
    'Veterinary intake without consent must be rejected');
  assert.equal((await post('/api/portfolio/veterinary',{...vetReq,species:'bird',serviceSlug:'puppy-kitten-visit'})).status,400,
    'Veterinary intake must reject species-service mismatches');
  assert.equal((await post('/api/portfolio/veterinary',{...vetReq,medicalHistory:'DO NOT COLLECT'})).status,400,
    'Veterinary public enquiry must not collect medical history');
  const response=await post('/api/portfolio/veterinary',vetReq);
  const result=await response.json();
  assert.equal(response.status,201,'PawWell enquiry not saved: '+JSON.stringify(result));
  assert.match(result.refNumber,/^MVX-VET-[A-F0-9]+$/);
  assert.equal(result.status,'pending_operator_confirmation');
  const duplicate=await post('/api/portfolio/veterinary',vetReq);
  const second=await duplicate.json();
  assert.equal(duplicate.status,200);
  assert.equal(second.duplicate,true);
  assert.equal(second.refNumber,result.refNumber);
  console.log('PASS: 32 bilingual PawWell routes, strict pet-species validation and idempotent pending visit receipt');

  console.log('PASS: auth guard, flow validation, Academy SQLite progress, trusted ecommerce price, private receipt');
} catch (error) {
  console.error(error);
  console.error('Server tail:', output.slice(-5000));
  process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
  await sleep(500);
}
