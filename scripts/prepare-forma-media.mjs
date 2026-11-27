import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import sharp from 'sharp';
const sources=[['walnut','Texture_de_noyer.jpg','Cyril5555','CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/']];
const dir='public/assets/portfolio/interiors-kitchens';await fs.mkdir(dir,{recursive:true});
const manifestPath='docs/30-verticals/media/interiors-kitchens.media-manifest.json';
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const assets=[];
for(const [id,name,author,license,license_url] of sources){
 const hash=crypto.createHash('md5').update(name).digest('hex');
 const url='https://upload.wikimedia.org/wikipedia/commons/'+hash[0]+'/'+hash.slice(0,2)+'/'+name;
 const tmp=process.env.RUNNER_TEMP+'/'+id;
 execFileSync('curl',['--fail','--location','--proto','=https','--proto-redir','=https','--retry','4','--retry-all-errors','--connect-timeout','15','--max-time','90','--max-filesize','40000000','--user-agent','MavvixPortfolio/1.0 (info@mavvix.com; licensed media mirror)','--output',tmp,url],{stdio:'inherit'});
 const raw=await fs.readFile(tmp),meta=await sharp(raw,{limitInputPixels:90000000}).metadata();
 if(meta.format!=='jpeg'||meta.width!==3072||meta.height!==2304)throw Error('Invalid source image '+id);
 const local='/assets/portfolio/interiors-kitchens/'+id+'.webp';
 await sharp(raw,{limitInputPixels:90000000}).rotate().resize({width:id==='walnut'||id==='marble'?900:1800,height:id==='walnut'||id==='marble'?900:1800,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile('public'+local);
 const bytes=await fs.readFile('public'+local),out=await sharp(bytes).metadata();await sharp(bytes).raw().toBuffer();
 assets.push({id,source_page:'https://commons.wikimedia.org/wiki/File:'+name,author,license,license_url,original_url:url,original_sha1:crypto.createHash('sha1').update(raw).digest('hex'),original_dimensions:meta.width+'x'+meta.height,local,dimensions:out.width+'x'+out.height,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),changes:'Resized and WebP encoded; display crop possible. Original license retained. Independent design reference, not a client project.'});
 console.log('VERIFIED MEDIA '+id+' '+out.width+'x'+out.height+' '+bytes.length);
 await fs.rm(tmp,{force:true});
}
await fs.mkdir('docs/30-verticals/media',{recursive:true});
await fs.writeFile('docs/30-verticals/media/interiors-kitchens.media-manifest.json',JSON.stringify({...manifest,assets:manifest.assets.map(a=>a.id==='walnut'?assets[0]:a)},null,2)+'\n');
