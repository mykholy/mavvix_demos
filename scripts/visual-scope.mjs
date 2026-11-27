import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const sectorsFromRegistry = (source) => [...source.matchAll(/"slug"\s*:\s*"([a-z0-9-]+)"/g)].map(m=>m[1]);
const qaInfrastructure = new Set(['scripts/visual-qa.mjs','scripts/visual-scope.mjs','tests/unit/visual-scope.test.mjs','.github/workflows/visual-quality.yml']);
const scopedPatterns = [
 /^src\/app\/\[locale\]\/preview\/([^/]+)\//,
 /^src\/lib\/verticals\/([^/]+)\//,
 /^src\/server\/portfolio\/([^/]+)\.ts$/,
 /^data\/verticals\/([^/]+)\.json$/,
 /^tests\/unit\/([^/]+)\.test\.mjs$/,
 /^docs\/30-verticals\/(?:research|media)\/([^/.]+)(?:\.media-manifest\.json|\.md)$/,
 /^public\/assets\/portfolio\/([^/]+)\//,
];
export function chooseScope(files,sectors,requested=''){
 const known=new Set([...sectors,'showcase']);
 if(requested.trim()){
  if(requested.trim()==='all')return {mode:'all',sectors:[],reason:'manual full run'};
  const selection=[...new Set(requested.split(',').map(x=>x.trim()).filter(Boolean))].sort();
  if(!selection.length||selection.some(x=>!known.has(x)))throw Error('Unknown visual scope: '+requested);
  return {mode:'selected',sectors:selection,reason:'explicit manual selection'};
 }
 const affected=new Set(),shared=[];
 for(const file of files){
  if(qaInfrastructure.has(file))continue;
  if(/^src\/app\/\[locale\]\/showcase\//.test(file)){affected.add('showcase');continue;}
  const match=scopedPatterns.map(re=>file.match(re)).find(m=>m);
  if(match&&known.has(match[1])&&match[1]!=='showcase'){affected.add(match[1]);continue;}
  // Anything not provably sector-local can affect other sites, including shared assets.
  shared.push(file);
 }
 if(shared.length)return {mode:'all',sectors:[],reason:'shared or unclassified changes',shared};
 if(!affected.size)return {mode:'all',sectors:[],reason:'no sector-local changes (QA-only or empty diff)'};
 return {mode:'selected',sectors:[...affected].sort(),reason:'changed sector files'};
}
export function filterCases(cases,requested='all'){
 if(requested==='all')return cases;
 const names=[...new Set(requested.split(',').map(x=>x.trim()).filter(Boolean))];
 if(!names.length||names.some(n=>!cases.some(([sector])=>sector===n)))throw Error('Invalid or empty visual QA scope: '+requested);
 return cases.filter(([sector])=>names.includes(sector));
}
function main(){
 const sectors=sectorsFromRegistry(fs.readFileSync('src/lib/verticals/registry.ts','utf8'));
 if(!sectors.length)throw Error('Cannot read sector registry');
 const requested=process.env.MAVVIX_REQUESTED_SCOPE||'';
 let selected;
 if(process.env.GITHUB_EVENT_NAME==='pull_request'){
  const event=JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH,'utf8'));
  const base=event.pull_request.base.sha,head=event.pull_request.head.sha;
  if(!/^[a-f0-9]{40}$/.test(base)||!/^[a-f0-9]{40}$/.test(head))throw Error('Invalid PR SHAs');
  // Three-dot diff; --no-renames includes both old and new sector paths on moves.
  const files=execFileSync('git',['diff','--name-only','--no-renames','-z',base+'...'+head],{encoding:'utf8',maxBuffer:16*1024*1024}).split('\0').filter(Boolean);
  selected=chooseScope(files,sectors);
  selected.changedFiles=files;
 }else selected=chooseScope([],sectors,requested||'all');
 const value=selected.mode==='all'?'all':selected.sectors.join(',');
 console.log('VISUAL_SCOPE '+JSON.stringify(selected));
 if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,'sectors='+value+'\n');
 if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'### Visual QA scope\n\n'+value+' — '+selected.reason+'\n');
 fs.mkdirSync('artifacts/visual-qa',{recursive:true});
 fs.writeFileSync('artifacts/visual-qa/scope.json',JSON.stringify(selected,null,2));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)main();
