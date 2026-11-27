import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import sharp from 'sharp';
const file='data/verticals/boutique-hotel.json',manifest='docs/30-verticals/media/boutique-hotel.media-manifest.json';
const data=JSON.parse(await fs.readFile(file,'utf8')),records=JSON.parse(await fs.readFile(manifest,'utf8'));
const sources=[{index:1,name:'oasis-dining',url:'https://upload.wikimedia.org/wikipedia/commons/8/8a/TableSetting_20240504_073606.jpg',width:4608,height:2592},{index:2,name:'oasis-courtyard',url:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Riad_Maroc_034.JPG',width:1600,height:1200,sha1:'2988732a3bc4227bbc070756d3006f6c923b0eaa'}];
for(const item of sources){
 const src=data.media[item.index],temp=path.join(process.env.RUNNER_TEMP||'/tmp',item.name+'.jpg');if(src.url!==item.url)throw Error('Unexpected source');
 execFileSync('curl',['--fail','--location','--proto','=https','--proto-redir','=https','--retry','3','--retry-all-errors','--connect-timeout','15','--max-time','90','--max-filesize','25000000','--user-agent','MavvixPortfolio/1.0 (info@mavvix.com; licensed media mirror)','--output',temp,item.url],{stdio:'inherit'});
 const raw=await fs.readFile(temp),sha1=crypto.createHash('sha1').update(raw).digest('hex');if(item.sha1&&sha1!==item.sha1)throw Error('Original checksum mismatch');
 const meta=await sharp(raw,{limitInputPixels:50000000}).metadata();if(meta.width!==item.width||meta.height!==item.height||meta.format!=='jpeg')throw Error('Original metadata mismatch');
 const local='/assets/portfolio/'+item.name+'.webp';await sharp(raw,{limitInputPixels:50000000}).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:86}).toFile('public'+local);
 const bytes=await fs.readFile('public'+local),out=await sharp(bytes).metadata();await sharp(bytes).raw().toBuffer();
 const record={id:item.name,source_page:src.source,author:src.credit,license:src.license,license_url:src.licenseUrl,original_url:item.url,original_dimensions:meta.width+'x'+meta.height,original_sha1:sha1,source_sha1_verified:!!item.sha1,local,dimensions:out.width+'x'+out.height,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,changes:'Resized and WebP encoded; display may crop. Adapted image retains original CC BY-SA licence. Independent editorial photography, not Oasis property.'};
 src.url=local;records.assets.push(record);console.log('VERIFIED MEDIA',JSON.stringify(record));await fs.rm(temp,{force:true});
}
await fs.writeFile(file,JSON.stringify(data,null,2)+'\n');await fs.writeFile(manifest,JSON.stringify(records,null,2)+'\n');
