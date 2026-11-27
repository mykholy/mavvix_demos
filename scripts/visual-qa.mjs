import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { filterCases } from './visual-scope.mjs';

/**
 * Real Chromium visual QA. Run only with an isolated seeded SQLite database.
 * The GitHub workflow installs pinned Playwright + axe-core under /tmp.
 */
const root=process.cwd();
const qaRoot=process.env.MAVVIX_VISUAL_QA_PACKAGES || '/tmp/mavvix-visual-qa';
const { chromium }=await import(pathToFileURL(path.join(qaRoot,'node_modules','playwright','index.mjs')).href);
const axePath=path.join(qaRoot,'node_modules','axe-core','axe.min.js');
const out=path.join(root,'artifacts','visual-qa');
fs.mkdirSync(out,{recursive:true});
const base='http://127.0.0.1:31467';
let serverLog='';
async function ready(){
 for(let i=0;i<75;i++){
  try{const r=await fetch(base+'/ar/showcase');if(r.ok)return;}catch{}
  await new Promise(r=>setTimeout(r,800));
 }
 throw Error('Next server did not start: '+serverLog.slice(-2000));
}
const cases=[
 ['wholesale',''],['wholesale','catalogue'],['wholesale','catalogue/kraft-paper-bags'],['wholesale','categories'],['wholesale','buyers'],['wholesale','suppliers'],['wholesale','process'],['wholesale','terms'],['wholesale','rfq'],['wholesale','supplier-interest'],['wholesale','guides/carton-vs-unit'],
 ['recruitment',''],['recruitment','services'],['recruitment','services/permanent-hiring'],['recruitment','employers'],['recruitment','candidates'],['recruitment','roles'],['recruitment','roles/software-engineering'],['recruitment','hiring-brief'],['recruitment','career-interest'],['recruitment','privacy'],['recruitment','insights/fair-selection'],
 ['solar-energy',''],['solar-energy','solutions'],['solar-energy','solutions/commercial-rooftop'],['solar-energy','assessment'],['solar-energy','sectors'],['solar-energy','process'],['solar-energy','feasibility'],['solar-energy','maintenance'],['solar-energy','guides/site-survey-checklist'],
 ['boutique-hotel',''],['boutique-hotel','rooms'],['boutique-hotel','rooms/courtyard-king'],['boutique-hotel','compare'],['boutique-hotel','stay'],['boutique-hotel','dining'],['boutique-hotel','experiences'],['boutique-hotel','policies'],['boutique-hotel','arrival'],['boutique-hotel','journal/choose-your-room'],
 // The original eight must receive direct browser coverage, not showcase-only coverage.
 ['construction',''],['construction','request-quote'],
 ['industrial',''],['industrial','rfq'],
 ['real-estate',''],['real-estate','viewing'],
 ['dental',''],['dental','request-appointment'],
 ['ecommerce',''],['ecommerce','checkout'],
 ['portfolio',''],['portfolio','contact'],
 ['restaurant',''],['restaurant','reserve'],
 ['academy',''],['academy','enrollment-interest'],
 ['diagnostics-lab',''],['diagnostics-lab','services'],['diagnostics-lab','services/clinical-chemistry'],['diagnostics-lab','contact'],['diagnostics-lab','results'],['diagnostics-lab','home-collection'],['diagnostics-lab','privacy'],['diagnostics-lab','guides/private-results'],
 ['skin-clinic',''],['skin-clinic','services'],['skin-clinic','services/consultation'],['skin-clinic','contact'],['skin-clinic','privacy'],['skin-clinic','informed-choice'],['skin-clinic','guides/prepare-for-consultation'],
 ['logistics',''],['logistics','services'],['logistics','services/ocean-fcl'],['logistics','quote'],['logistics','scope'],['logistics','tracking'],['logistics','guides/freight-quote-checklist'],
 ['events',''],['events','experiences'],['events','experiences/corporate-conferences'],['events','enquiry'],['events','venue-brief'],['events','guides/event-brief'],
 ['travel-agency',''],['travel-agency','destinations'],['travel-agency','journeys'],['travel-agency','journeys/luxor-temples'],['travel-agency','quote'],['travel-agency','guides/before-you-book'],
 ['accounting',''],['accounting','services'],['accounting','services/bank-reconciliation'],['accounting','quote'],['accounting','resources/monthly-close'],
 ['law-firm',''],['law-firm','practices'],['law-firm','practices/commercial-contracts'],['law-firm','consultation'],['law-firm','insights/engagement-boundaries'],
 ['auto-service',''],['auto-service','services'],['auto-service','services/brakes'],['auto-service','booking'],
 ['home-maintenance',''],['home-maintenance','services'],['home-maintenance','services/ac-maintenance'],['home-maintenance','book'],
 ['salon-spa',''],['salon-spa','services'],['salon-spa','services/classic-manicure'],['salon-spa','booking'],['salon-spa','journal/choosing-treatment'],
 ['fitness',''],['fitness','classes'],['fitness','classes/foundations'],['fitness','trial'],['fitness','journal/starting-with-strength'],
 ['sports-venues',''],['sports-venues','courts'],['sports-venues','courts/padel-doubles'],['sports-venues','book'],['sports-venues','schedule'],
 ['furniture',''],['furniture','collections'],['furniture','collections/modular-sofa'],['furniture','quote'],['furniture','gallery'],['furniture','journal/measuring-a-room'],
 ['interiors-kitchens',''],['interiors-kitchens','services'],['interiors-kitchens','services/l-shaped'],['interiors-kitchens','consultation'],['interiors-kitchens','layouts'],['interiors-kitchens','gallery'],['interiors-kitchens','journal/measure-before-design'],['interiors-kitchens','journal'],['interiors-kitchens','materials'],['interiors-kitchens','finishes'],['interiors-kitchens','process'],['interiors-kitchens','measurement'],['interiors-kitchens','contact'],['interiors-kitchens','about'],['interiors-kitchens','faq'],['interiors-kitchens','services/u-shaped'],['interiors-kitchens','services/island'],['interiors-kitchens','services/galley'],['interiors-kitchens','services/wardrobes'],['interiors-kitchens','services/vanity'],['interiors-kitchens','services/pantry'],['interiors-kitchens','services/countertops'],['interiors-kitchens','services/lighting'],['interiors-kitchens','journal/finishes-matter'],['interiors-kitchens','journal/layout-decision'],
 ['nursery',''],['nursery','age-groups'],['nursery','programs/curious-toddlers'],['nursery','curriculum'],['nursery','safety'],['nursery','gallery'],['nursery','admissions'],['nursery','journal/first-nursery-visit'],
 ['car-detailing',''],['car-detailing','packages'],['car-detailing','packages/ceramic-protection'],
 ['car-detailing','quote'],['car-detailing','journal/coating-vs-ppf'],['car-detailing','gallery'],
 ['physiotherapy',''],['physiotherapy','services'],['physiotherapy','services/initial-movement-assessment'],
 ['physiotherapy','appointment'],['physiotherapy','journal/first-appointment'],['physiotherapy','privacy'],
 ['veterinary',''],['veterinary','services'],['veterinary','services/wellness-visit'],['veterinary','request'],
 ['veterinary','pets'],['veterinary','guides/pet-first-visit'],['veterinary','emergencies'],
 ['showcase','']
];
const visualScope=process.env.MAVVIX_VISUAL_SECTORS??'all';
const selectedCases=filterCases(cases,visualScope);
console.log('VISUAL_QA_SELECTED '+visualScope+' | routes per locale: '+selectedCases.length+' / '+cases.length);
const viewports=[{name:'mobile-360',width:360,height:780},{name:'mobile-390',width:390,height:844},
 {name:'tablet-768',width:768,height:1024},{name:'tablet-1024',width:1024,height:768},{name:'desktop-1440',width:1440,height:900}];
const results=[],issues=[];
const app=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','31467','-H','127.0.0.1'],{
 cwd:root,env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','pipe','pipe']
});
for(const stream of [app.stdout,app.stderr])stream.on('data',b=>{serverLog+=String(b).slice(-2000)});

let browser;
try{
 await ready();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const locale of ['ar','en']){
  for(const [sector,subpath] of selectedCases){
   const url='/'+locale+(sector==='showcase'?'/showcase':'/preview/'+sector+(subpath?'/'+subpath:''));
   const widths=(subpath===''&&sector!=='showcase')?viewports:[viewports[1],viewports[viewports.length-1]];
   for(const viewport of widths){
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1,
     isMobile:viewport.width<=390,hasTouch:viewport.width<=390,reducedMotion:'reduce'});
    const page=await context.newPage();
    const entry={url,locale,sector,viewport:viewport.name,issues:[],images:[],a11y:[]};
    try{
     const response=await page.goto(base+url,{waitUntil:'domcontentloaded',timeout:25000});
     if(response?.status()!==200)entry.issues.push('HTTP '+response?.status());
     await page.waitForTimeout(550);
     const pre=await page.evaluate(async()=>{
      await Promise.all([...document.images].map(img=>new Promise(resolve=>{
       img.loading='eager';
       if(img.complete)return resolve();
       const done=()=>resolve();
       img.addEventListener('load',done,{once:true});
       img.addEventListener('error',done,{once:true});
       setTimeout(done,3000);
      })));
      return {
       viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
       overflowingElements:[...document.querySelectorAll('body *')].filter(el=>{
         const r=el.getBoundingClientRect();
         return r.width>0 && (r.right>innerWidth+4 || r.left< -4);
       }).slice(0,14).map(el=>({tag:el.tagName,classes:String(el.className?.baseVal||el.className||'').slice(0,160),
         text:(el.textContent||'').trim().slice(0,70),rect:{left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}})),
       title:document.title,description:document.querySelector('meta[name=description]')?.content,
       h1:document.querySelectorAll('h1').length,
       direction:document.querySelector('main')?.closest('[dir]')?.getAttribute('dir')||document.documentElement.dir,
       brokenImages:[...document.images].filter(img=>img.complete&&img.naturalWidth===0).map(img=>({src:img.currentSrc||img.src,alt:img.alt})),
       unlabeled:[...document.querySelectorAll('input,select,textarea')].filter(x=>x.type!=='hidden'&&
         !x.labels?.length&&!x.getAttribute('aria-label')).map(x=>x.outerHTML.slice(0,170)),
       hasWhatsApp:[...document.querySelectorAll('a[href]')].some(a=>a.href.includes('wa.me/201062015302')),
       hasCall:[...document.querySelectorAll('a[href]')].some(a=>a.href.includes('tel:+201062015302')),
      };
     });
     entry.images=pre.brokenImages;
     if(pre.scrollWidth>viewport.width+5)entry.issues.push('Horizontal overflow: '+pre.scrollWidth+'/'+viewport.width+' | offenders: '+JSON.stringify(pre.overflowingElements));
     if(pre.direction!==(locale==='ar'?'rtl':'ltr'))entry.issues.push('Incorrect direction: '+pre.direction);
     if(pre.h1!==1)entry.issues.push('Expected one H1, got '+pre.h1);
     if(!pre.title||pre.title.length<14||!pre.description)entry.issues.push('Missing meaningful title/description');
     if(pre.unlabeled.length)entry.issues.push('Unlabeled form controls: '+JSON.stringify(pre.unlabeled));
     if(sector!=='showcase'&&(!pre.hasWhatsApp||!pre.hasCall))entry.issues.push('Missing persistent Mavvix contact link');
     if(entry.images.length)entry.issues.push('Broken image(s): '+entry.images.map(x=>x.src).join(' | '));
     const legacySharedBreakpoints={construction:1024,industrial:1024,'real-estate':1024,portfolio:768};
     const customBreakpoints={ecommerce:768,restaurant:1024,academy:1024};
     const customHeader=Object.hasOwn(customBreakpoints,sector);
     const navBreakpoint=legacySharedBreakpoints[sector]??1280;
     if(sector!=='showcase'&&!customHeader&&subpath===''&&viewport.width<navBreakpoint){
       const trigger=page.locator('[data-mobile-sector-nav] button').first();
       if(!(await trigger.isVisible()))entry.issues.push('Mobile/tablet navigation unavailable');
       else{
         await trigger.click();
         const menu=page.locator('[data-mobile-sector-nav] nav').first();
         if(!(await menu.isVisible())||!(await menu.locator('a[href]').count()))entry.issues.push('Navigation drawer did not expose links');
         const box=await menu.boundingBox();
         if(box&&(box.x< -1||box.x+box.width>viewport.width+1))entry.issues.push('Navigation drawer overflows viewport');
         await trigger.press('Escape');
         if(await menu.isVisible())entry.issues.push('Navigation drawer did not close on Escape');
       }
     }
     if(customHeader&&subpath===''&&viewport.width<customBreakpoints[sector]){
       const trigger=page.getByRole('button',{name:sector==='ecommerce'?'Toggle Navigation':'Toggle navigation menu',exact:true});
       if(!(await trigger.isVisible()))entry.issues.push('Legacy mobile navigation unavailable');
       else{
         const header=page.locator('header').first();
         const visibleLinks=()=>header.locator('a[href]').evaluateAll(links=>links.filter(a=>a.getClientRects().length>0).length);
         const before=await visibleLinks();
         await trigger.click();
         if(await visibleLinks()<=before)entry.issues.push('Legacy mobile menu did not expose navigation links');
         if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+5))entry.issues.push('Legacy mobile menu overflows viewport');
         await trigger.click();
       }
     }
     await page.addScriptTag({path:axePath});
     const axe=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
     entry.a11y=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,summary:v.nodes.slice(0,24).map(x=>({selector:x.target.join(' '),failureSummary:x.failureSummary}))}));
     if(entry.a11y.length){
       entry.issues.push('Axe WCAG violations: '+entry.a11y.map(x=>x.id+' ('+x.impact+', '+x.nodes+' nodes)').join(', '));
       console.log('A11Y_DETAILS '+url+' '+viewport.name+' '+JSON.stringify(entry.a11y).slice(0,10000));
     }
     const png=locale+'-'+sector+(subpath?'-'+subpath.replaceAll('/','-'):'-home')+'-'+viewport.name+'.png';
     await page.screenshot({path:path.join(out,png),fullPage:true,animations:'disabled',timeout:25000});
     entry.screenshot=png;
     entry.title=pre.title;
     if(sector==='interiors-kitchens'&&!subpath&&['mobile-390','desktop-1440'].includes(viewport.name)){
       const studio=page.locator('#layout-studio'),buttons=studio.locator('button[aria-pressed]');
       assert.equal(await buttons.count(),4);
       const diagram=studio.locator('svg[role=img] path').first();
       const initial=await diagram.getAttribute('d');
       for(const [i,slug] of ['l-shaped','u-shaped','galley','island'].entries()){
         await buttons.nth(i).click();
         assert.equal(await buttons.nth(i).getAttribute('aria-pressed'),'true');
         assert.equal(await studio.locator('button[aria-pressed=true]').count(),1);
         assert.equal(await studio.locator('a[href*="consultation?service="]').getAttribute('href'),'/'+locale+'/preview/interiors-kitchens/consultation?service='+slug);
       }
       assert.notEqual(await diagram.getAttribute('d'),initial);
       const consultation=await page.context().newPage();
       try{
         for(const [slug,layout,walls] of [['l-shaped','L',2],['u-shaped','U',3],['galley','galley',2],['island','island',2]]){
           const res=await consultation.goto(base+'/'+locale+'/preview/interiors-kitchens/consultation?service='+slug);
           assert.equal(res.status(),200);
           assert.equal(await consultation.locator('#forma-design-scope').inputValue(),slug);
           assert.equal(await consultation.locator('button[data-layout][aria-pressed=true]').getAttribute('data-layout'),layout);
           const lengths=consultation.locator('input[type=number][min="120"][max="1200"]');
           assert.equal(await lengths.count(),walls);
         }
       }finally{await consultation.close();}
       entry.formaLayoutStudio={allFourLayouts:true,selectedConsultationLink:true,consultationLayoutAndWallCount:true};
       console.log('PASS FORMA_LAYOUT_STUDIO '+locale+' '+viewport.name);
     }

     if(sector==='interiors-kitchens'&&subpath==='gallery'&&viewport.name==='mobile-390'){
       assert.equal(await page.locator('[data-gallery-item]').count(),6);
       await page.locator('[data-gallery-filter=materials]').click();
       assert.equal(await page.locator('[data-gallery-item]').count(),2);
       await page.locator('[data-gallery-filter=kitchens]').click();
       assert.equal(await page.locator('[data-gallery-item]').count(),4);
       await page.locator('[data-gallery-filter=all]').click();
       assert.equal(await page.locator('[data-gallery-item]').count(),6);
       console.log('PASS FORMA_GALLERY '+locale);
     }
     if(sector==='interiors-kitchens'&&subpath==='consultation'&&viewport.name==='mobile-390'){
       const form=page.locator('main form'),next=form.locator('[data-forma-next]');
       await form.locator('button[data-layout=U]').click();
       await next.click();
       assert.ok(await form.locator('select:visible').count()>0);
       await form.locator('[data-forma-back]').click();
       assert.equal(await form.locator('button[data-layout=U]').getAttribute('aria-pressed'),'true');
       await next.click();await next.click();
       assert.ok(await next.isDisabled());
       await form.locator('input[autocomplete=name]').fill('QA Forma');
       await form.locator('input[type=tel]').fill('01000000000');
       await form.locator('input[type=checkbox]').check();
       assert.ok(await next.isEnabled());
       const response=page.waitForResponse(res=>res.url().endsWith('/api/portfolio/interiors-kitchens')&&res.request().method()==='POST');
       await next.click();const saved=await response;assert.equal(saved.status(),201);
       const sent=saved.request().postDataJSON();assert.equal(sent.layout,'U');assert.equal(sent.serviceSlug,'u-shaped');assert.equal(sent.wallLengthsCm.length,3);
       const data=await saved.json();assert.ok(data.refNumber);
       const receipt=page.locator('main [role=status]');await receipt.waitFor({state:'visible'});assert.ok((await receipt.innerText()).includes(data.refNumber));
       console.log('PASS FORMA_CONSULTATION_WIZARD '+locale);
     }
     if(sector==='wholesale'&&['rfq','supplier-interest'].includes(subpath)&&viewport.name==='mobile-390'){
        const form=page.locator('main form'),button=form.locator('button[type=submit]'),buyer=subpath==='rfq';
        assert.ok(await button.isDisabled(),'Consent required');
        if(buyer){await form.locator('[data-add-rfq-line]').click();assert.equal(await form.locator('[data-rfq-line]').count(),2);await form.locator('input[type=number]').first().fill('3');assert.match(await form.locator('[data-total-cartons]').innerText(),/5/);}
        await form.locator('input[autocomplete=organization]').fill('Browser QA Wholesale');
        await form.locator('input[autocomplete=name]').fill('Browser QA Contact');await form.locator('input[type=tel]').fill('01000000000');await form.locator('input[type=checkbox]').check();
        assert.ok(await button.isEnabled(),'Valid wholesale enquiry must be submittable');
        const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/portfolio/wholesale')&&r.request().method()==='POST');await button.click();const saved=await responsePromise;assert.equal(saved.status(),201);
        const sent=saved.request().postDataJSON();assert.equal(sent.flowType,buyer?'wholesale_rfq':'wholesale_supplier_interest');if(buyer)assert.equal(sent.lines.length,2);
        const body=await saved.json();assert.match(body.refNumber,/^MVX-TBR-[A-F0-9]{10}$/);assert.equal(body.status,'pending_operator_confirmation');
        const status=page.locator('main [role=status]');await status.waitFor({state:'visible',timeout:10000});assert.ok((await status.innerText()).includes(body.refNumber));
        entry.wholesaleFlow={flowType:sent.flowType,consentRequired:true,validRequestSaved:true,referenceDisplayed:true};console.log('PASS TRADEBRIDGE_INTAKE_FLOW '+locale+' '+subpath);
      }
      if(sector==='recruitment'&&['hiring-brief','career-interest'].includes(subpath)&&viewport.name==='mobile-390'){
       const form=page.locator('main form'),button=form.locator('button[type=submit]');const employer=subpath==='hiring-brief';
       assert.ok(await button.isDisabled(),'Consent required');
       if(employer)await form.locator('input[autocomplete=organization]').fill('Browser QA Company');
       await form.locator('input[autocomplete=name]').fill('Browser QA Recruitment');await form.locator('input[type=tel]').fill('01000000000');await form.locator('input[type=checkbox]').check();
       assert.ok(await button.isEnabled(),'Valid recruitment enquiry must be submittable');
       const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/portfolio/recruitment')&&r.request().method()==='POST');await button.click();const saved=await responsePromise;assert.equal(saved.status(),201);
       const sent=saved.request().postDataJSON();assert.equal(sent.flowType,employer?'employer_hiring_brief':'candidate_career_interest');
       const body=await saved.json();assert.match(body.refNumber,/^MVX-TLX-[A-F0-9]{10}$/);assert.equal(body.status,'pending_operator_confirmation');
       const status=page.locator('main [role=status]');await status.waitFor({state:'visible',timeout:10000});assert.ok((await status.innerText()).includes(body.refNumber));
       entry.recruitmentFlow={flowType:sent.flowType,consentRequired:true,validRequestSaved:true,referenceDisplayed:true};console.log('PASS TALENTYX_INTAKE_FLOW '+locale+' '+subpath);
     }
     if(sector==='solar-energy'&&subpath==='assessment'&&viewport.name==='mobile-390'){
       const form=page.locator('main form'),button=form.locator('button[type=submit]'),selects=form.locator('select');
       await selects.nth(0).selectOption('commercial-rooftop');await selects.nth(1).selectOption('home');
       await form.locator('input[autocomplete=name]').fill('Browser QA Solar');await form.locator('input[type=tel]').fill('01000000000');await form.locator('input[type=checkbox]').check();
       assert.ok(await button.isDisabled(),'VoltEdge must reject mismatched site');
       await selects.nth(1).selectOption('commercial');assert.ok(await button.isEnabled(),'Valid scope must be submittable');
       const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/portfolio/solar-energy')&&r.request().method()==='POST');await button.click();const saved=await responsePromise;assert.equal(saved.status(),201);
       const body=await saved.json();assert.match(body.refNumber,/^MVX-VLT-[A-F0-9]{10}$/);assert.equal(body.status,'pending_operator_confirmation');
       const status=page.locator('main [role=status]');await status.waitFor({state:'visible',timeout:10000});assert.ok((await status.innerText()).includes(body.refNumber));
       entry.assessmentFlow={mismatchRejected:true,validRequestSaved:true,referenceDisplayed:true};console.log('PASS VOLTEDGE_ASSESSMENT_FLOW '+locale);
     }
     if(sector==='boutique-hotel'&&subpath==='stay'&&viewport.name==='mobile-390'){
       const form=page.locator('main form');
       const button=form.locator('button[type=submit]');
       const inputDates=form.locator('input[type=date]');
       const selects=form.locator('select');
       const dates=n=>new Date(Date.now()+n*86400000).toISOString().slice(0,10);
       await inputDates.nth(0).fill(dates(5));await inputDates.nth(1).fill(dates(5));
       await selects.nth(2).selectOption('courtyard-king');
       await form.locator('input[autocomplete=name]').fill('Browser QA Guest');
       await form.locator('input[type=tel]').fill('01000000000');
       await form.locator('input[type=checkbox]').check();
       assert.ok(await button.isDisabled(),'Oasis must reject zero-night stays');
       await inputDates.nth(1).fill(dates(8));await selects.nth(0).selectOption('4');
       assert.ok(await button.isDisabled(),'Oasis must reject excess occupancy');
       await selects.nth(0).selectOption('2');await selects.nth(1).selectOption('0');
       assert.ok(await button.isEnabled(),'Valid stay should be submittable');
       const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/portfolio/boutique-hotel')&&r.request().method()==='POST');
       await button.click();const saved=await responsePromise;assert.equal(saved.status(),201);
       const body=await saved.json();assert.match(body.refNumber,/^MVX-OAS-[A-F0-9]{10}$/);assert.equal(body.status,'pending_operator_confirmation');
       const status=page.locator('main [role=status]');await status.waitFor({state:'visible',timeout:10000});assert.ok((await status.innerText()).includes(body.refNumber),'Oasis receipt must render saved reference');
       entry.stayFlow={invalidDatesRejected:true,overCapacityRejected:true,validRequestSaved:true,referenceDisplayed:true};
       console.log('PASS OASIS_STAY_FLOW '+locale);
     }
    }catch(e){entry.issues.push('Browser error: '+String(e instanceof Error?e.message:e));}
    finally{await context.close();}
    results.push(entry);
    console.log((entry.issues.length?'FAIL':'PASS')+' '+url+' '+viewport.name+(entry.issues.length?' => '+entry.issues.join('; '):''));
    issues.push(...entry.issues.map(e=>({url,viewport:viewport.name,error:e})));
   }
  }
 }
 assert.ok(results.length>0,'Visual QA must execute at least one case');
 const data={scope:visualScope,selectedRoutes:selectedCases.length,date:new Date().toISOString(),browser:'Chromium (Playwright 1.58.2)',cases:results.length,
  screenshotCount:results.filter(x=>x.screenshot).length,issues,results};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(data,null,2));
 fs.writeFileSync(path.join(out,'summary.md'),
  '# Mavvix real-browser AR/EN QA\n\nScope: '+visualScope+'\n\nCases: '+data.cases+' | screenshots: '+data.screenshotCount+
  ' | issues: '+issues.length+'\n\n'+issues.map(x=>'- '+x.url+' ['+x.viewport+']: '+x.error).join('\n')+'\n');
 assert.equal(issues.length,0,'Browser visual/a11y/image findings recorded in artifacts/visual-qa/report.json');
}finally{
 if(browser)await browser.close();
 app.kill('SIGTERM');
}
