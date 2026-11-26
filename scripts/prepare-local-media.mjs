import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const luma = JSON.parse(await fs.readFile('data/verticals/events.json','utf8')).media[0];
const assets=[
 {name:'montessori-shelves',source:'https://commons.wikimedia.org/wiki/File:Montessorishelves.jpg',author:'Clematitedusud',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',remote:'https://upload.wikimedia.org/wikipedia/commons/7/71/Montessorishelves.jpg',fallback:'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Montessorishelves.jpg/1280px-Montessorishelves.jpg',files:['src/lib/verticals/nursery/data.ts','src/app/[locale]/showcase/page.tsx'],manifest:'docs/30-verticals/media/nursery.media-manifest.json',assetId:'educational-shelves'},
 {name:'physiotherapy',source:'https://commons.wikimedia.org/wiki/File:Rehabilitaci%C3%B3n_fisioterapia.jpg',author:'Ceibos',license:'CC BY 4.0',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',remote:'https://upload.wikimedia.org/wikipedia/commons/6/6a/Rehabilitaci%C3%B3n_fisioterapia.jpg',fallback:'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Rehabilitaci%C3%B3n_fisioterapia.jpg/960px-Rehabilitaci%C3%B3n_fisioterapia.jpg',files:['src/lib/verticals/physiotherapy/data.ts','src/app/[locale]/showcase/page.tsx'],manifest:'docs/30-verticals/media/physiotherapy.media-manifest.json',assetId:'ceibos-rehabilitation'},
 {name:'luma-conference-hall',source:luma.source,author:luma.credit,license:luma.license,licenseUrl:luma.licenseUrl,remote:luma.url,fallback:'https://upload.wikimedia.org/wikipedia/commons/a/a8/DZ6_0468_Spacious_elegantly_lit_banquet_hall_set_up_with_rows_of_white-covered_chairs_facing_a_stage_ready_for_a_large_conference_or_formal_event.jpg',files:['data/verticals/events.json']}
];
const dest='public/assets/portfolio';
await fs.mkdir(dest,{recursive:true});
const reports=[];
for(const a of assets){
 const temp=path.join(process.env.RUNNER_TEMP||'/tmp',a.name+'.image');
 let downloaded;
 for(const url of [a.remote,a.fallback]){
   try{
     execFileSync('curl',['--fail','--location','--proto','=https','--proto-redir','=https','--retry','2','--retry-delay','4','--retry-all-errors','--connect-timeout','15','--max-time','60','--max-filesize','25000000','--user-agent','MavvixPortfolio/1.0 (info@mavvix.com; licensed media mirror)','--output',temp,url],{stdio:'inherit'});
     const meta=await sharp(temp,{limitInputPixels:50000000}).metadata();
     if(!['jpeg','png','webp'].includes(meta.format)||!meta.width||!meta.height||meta.width<500||meta.height<500)throw Error('Unexpected image dimensions/format');
     await sharp(temp,{limitInputPixels:50000000}).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(path.join(dest,a.name+'.webp'));
     downloaded=url;break;
   }catch(e){console.error('Image source failed',a.name,String(e.message).slice(0,180));}
 }
 if(!downloaded)throw Error('Could not retrieve verified source: '+a.name);
 const local='/assets/portfolio/'+a.name+'.webp';
 const bytes=await fs.readFile('public'+local), meta=await sharp(bytes).metadata();
 await sharp(bytes).raw().toBuffer();
 const report={id:a.name,source_page:a.source,author:a.author,license:a.license,license_url:a.licenseUrl,downloaded_from:downloaded,local,dimensions:meta.width+'x'+meta.height,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,changes:'Resized, orientation normalized, WebP encoding; display may crop. Derivative image retains source license.'};
 reports.push(report);
 for(const file of a.files){const before=await fs.readFile(file,'utf8');if(!before.includes(a.remote))throw Error('Expected media URL not present: '+file);await fs.writeFile(file,before.replaceAll(a.remote,local));}
 if(a.manifest){const m=JSON.parse(await fs.readFile(a.manifest,'utf8'));const item=m.assets.find(x=>x.id===a.assetId);if(!item)throw Error('Missing manifest entry');Object.assign(item,{local,served_dimensions:report.dimensions,sha256:report.sha256,downloaded_from:downloaded,changes:report.changes});await fs.writeFile(a.manifest,JSON.stringify(m,null,2)+'\n');}
 console.log('VERIFIED MEDIA',JSON.stringify(report));
 await fs.rm(temp,{force:true});
}
await fs.writeFile('docs/30-verticals/media/self-hosted-media.json',JSON.stringify({assets:reports},null,2)+'\n');
