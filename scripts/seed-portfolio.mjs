import fs from 'node:fs';
import path from 'node:path';

/**
 * Seed one verified vertical at a time. Never overwrite request rows or legacy clients.
 * The site is a sales showcase; brand and services are editorial, not a live workshop.
 */
export function seedPortfolioVerticals(db, rootDir=process.cwd()) {
  const files=['auto-service.json'];
  const addSite=db.prepare(`INSERT INTO portfolio_verticals(slug,name_ar,name_en,wave,published)
 VALUES (?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET
 name_ar=excluded.name_ar,name_en=excluded.name_en,wave=excluded.wave`);
  const addService=db.prepare(`INSERT INTO portfolio_services(id,vertical_slug,slug,category,content_json,active)
 VALUES (?,?,?,?,?,1) ON CONFLICT(id) DO UPDATE SET
 category=excluded.category,content_json=excluded.content_json,active=1`);
  db.exec('BEGIN IMMEDIATE');
  try {
    for(const filename of files){
      const source=JSON.parse(fs.readFileSync(path.join(rootDir,'data','verticals',filename),'utf8'));
      if(!source.slug || source.services.length<8) throw new Error('Incomplete sector content: '+filename);
      addSite.run(source.slug,'تورك جراج — تجربة موقع صيانة سيارات','Torque Garage · Mavvix concept',1,1);
      for(const service of source.services) {
        addService.run('portfolio:'+source.slug+':'+service.slug,source.slug,service.slug,service.category,JSON.stringify(service));
      }
      console.log('Portfolio vertical seeded:', source.slug, source.services.length, 'services');
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
