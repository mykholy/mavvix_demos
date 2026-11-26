import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import sharp from 'sharp';
const file='data/verticals/diagnostics-lab.json';
const data=JSON.parse(await fs.readFile(file,'utf8'));
const originals=[
 {index:0,name:'clearpath-glassware',url:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Laboratory_equipment.jpg',width:6000,height:3368},
 {index:1,name:'clearpath-analyzer',url:'https://upload.wikimedia.org/wikipedia/commons/5/55/Cobas_machine.jpg',width:1020,height:768,sha1:'390ffbe1236e4b547382366c0d0066a61512fa1e'}
];
const assets=[];
await fs.mkdir('public/assets/portfolio',{recursive:true});
for(const item of originals){
 const src=data.media[item.index];
 const temp=path.join(process.env.RUNNER_TEMP||'/tmp',item.name+'.jpg');
 execFileSync('curl',['--fail','--location','--proto','=https','--proto-redir','=https','--retry','3','--retry-delay','5','--retry-all-errors','--connect-timeout','15','--max-time','90','--max-filesize','25000000','--user-agent','MavvixPortfolio/1.0 (info@mavvix.com; licensed media mirror)','--output',temp,item.url],{stdio:'inherit'});
 const raw=await fs.readFile(temp), sha1=crypto.createHash('sha1').update(raw).digest('hex');
 if(item.sha1&&item.sha1!==sha1)throw Error('Original checksum mismatch '+item.name);
 const meta=await sharp(raw,{limitInputPixels:50000000}).metadata();
 if(meta.format!=='jpeg'||meta.width!==item.width||meta.height!==item.height)throw Error('Original dimensions/format mismatch '+item.name);
 const local='/assets/portfolio/'+item.name+'.webp';
 await sharp(raw,{limitInputPixels:50000000}).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:86}).toFile('public'+local);
 const bytes=await fs.readFile('public'+local), out=await sharp(bytes).metadata();
 await sharp(bytes).raw().toBuffer();
 const record={id:item.name,source_page:src.source,author:src.credit,license:src.license,license_url:src.licenseUrl,original_url:item.url,original_dimensions:meta.width+'x'+meta.height,original_sha1:sha1,source_sha1_verified:!!item.sha1,local,dimensions:out.width+'x'+out.height,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,changes:'Resized and WebP encoded; metadata stripped; display may crop. Original visible markings preserved. Independent scientific editorial media, not ClearPath property.'};
 assets.push(record);src.url=local;console.log('VERIFIED MEDIA',JSON.stringify(record));await fs.rm(temp,{force:true});
}
await fs.writeFile(file,JSON.stringify(data,null,2)+'\n');
await fs.writeFile('docs/30-verticals/media/diagnostics-lab.media-manifest.json',JSON.stringify({vertical:'diagnostics-lab',assets},null,2)+'\n');
