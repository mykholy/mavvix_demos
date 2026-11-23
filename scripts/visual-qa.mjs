import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

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
const app=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','31467','-H','127.0.0.1'],{
 cwd:root,env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','pipe','pipe']
});
let serverLog='';
for(const stream of [app.stdout,app.stderr])stream.on('data',b=>{serverLog+=String(b).slice(-2000)});
async function ready(){
 for(let i=0;i<75;i++){
  try{const r=await fetch(base+'/ar/showcase');if(r.ok)return;}catch{}
  await new Promise(r=>setTimeout(r,800));
 }
 throw Error('Next server did not start: '+serverLog.slice(-2000));
}
const cases=[
 ['auto-service',''],['auto-service','services'],['auto-service','services/brakes'],['auto-service','booking'],
 ['home-maintenance',''],['home-maintenance','services'],['home-maintenance','services/ac-maintenance'],['home-maintenance','book'],
 ['showcase','']
];
const viewports=[{name:'mobile-360',width:360,height:780},{name:'mobile-390',width:390,height:844},
 {name:'tablet-768',width:768,height:1024},{name:'desktop-1440',width:1440,height:900}];
const results=[],issues=[];
let browser;
try{
 await ready();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const locale of ['ar','en']){
  for(const [sector,subpath] of cases){
   const url='/'+locale+(sector==='showcase'?'/showcase':'/preview/'+sector+(subpath?'/'+subpath:''));
   const widths=(subpath===''&&sector!=='showcase')?viewports:[viewports[1],viewports[3]];
   for(const viewport of widths){
    const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1,
     isMobile:viewport.width<=390,hasTouch:viewport.width<=390,reducedMotion:'reduce'});
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
     if(pre.scrollWidth>viewport.width+5)entry.issues.push('Horizontal overflow: '+pre.scrollWidth+'/'+viewport.width);
     if(pre.direction!==(locale==='ar'?'rtl':'ltr'))entry.issues.push('Incorrect direction: '+pre.direction);
     if(pre.h1!==1)entry.issues.push('Expected one H1, got '+pre.h1);
     if(!pre.title||pre.title.length<14||!pre.description)entry.issues.push('Missing meaningful title/description');
     if(pre.unlabeled.length)entry.issues.push('Unlabeled form controls: '+JSON.stringify(pre.unlabeled));
     if(sector!=='showcase'&&(!pre.hasWhatsApp||!pre.hasCall))entry.issues.push('Missing persistent Mavvix contact link');
     if(entry.images.length)entry.issues.push('Broken image(s): '+entry.images.map(x=>x.src).join(' | '));
     await page.addScriptTag({path:axePath});
     const axe=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
     entry.a11y=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,summary:v.nodes.slice(0,2).map(x=>x.target.join(' '))}));
     if(entry.a11y.some(x=>x.impact==='critical'||x.impact==='serious'))entry.issues.push('Axe serious/critical: '+entry.a11y.filter(x=>['critical','serious'].includes(x.impact)).map(x=>x.id).join(','));
     const png=locale+'-'+sector+(subpath?'-'+subpath.replaceAll('/','-'):'-home')+'-'+viewport.name+'.png';
     await page.screenshot({path:path.join(out,png),fullPage:true,animations:'disabled',timeout:25000});
     entry.screenshot=png;
     entry.title=pre.title;
    }catch(e){entry.issues.push('Browser error: '+String(e instanceof Error?e.message:e));}
    finally{await page.close();}
    results.push(entry);
    console.log((entry.issues.length?'FAIL':'PASS')+' '+url+' '+viewport.name+(entry.issues.length?' => '+entry.issues.join('; '):''));
    issues.push(...entry.issues.map(e=>({url,viewport:viewport.name,error:e})));
   }
  }
 }
 const data={date:new Date().toISOString(),browser:'Chromium (Playwright 1.58.2)',cases:results.length,
  screenshotCount:results.filter(x=>x.screenshot).length,issues,results};
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(data,null,2));
 fs.writeFileSync(path.join(out,'summary.md'),
  '# Mavvix real-browser AR/EN QA\n\nCases: '+data.cases+' | screenshots: '+data.screenshotCount+
  ' | issues: '+issues.length+'\n\n'+issues.map(x=>'- '+x.url+' ['+x.viewport+']: '+x.error).join('\n')+'\n');
 assert.equal(issues.length,0,'Browser visual/a11y/image findings recorded in artifacts/visual-qa/report.json');
}finally{
 if(browser)await browser.close();
 app.kill('SIGTERM');
}
