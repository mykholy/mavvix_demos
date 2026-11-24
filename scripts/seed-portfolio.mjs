import fs from 'node:fs';
import path from 'node:path';

/**
 * Seed one verified vertical at a time. Never overwrite request rows or legacy clients.
 * The site is a sales showcase; brand and services are editorial, not a live workshop.
 */
export function seedPortfolioVerticals(db, rootDir=process.cwd()) {
  const files=[
    {filename:'nursery.json',slug:'nursery',ar:'بلوم ستيبس — حضانة ورياض أطفال',en:'BloomSteps · Early Years'},
    {filename:'auto-service.json',slug:'auto-service',ar:'تورك جراج — صيانة السيارات',en:'Torque Garage · Automotive'},
    {filename:'home-maintenance.json',slug:'home-maintenance',ar:'فكسورا — صيانة المنازل والتكييف',en:'Fixora Care · Home Maintenance'},
    {filename:'salon-spa.json',slug:'salon-spa',ar:'فيلورا بيوتي — خدمات تجميل وعناية',en:'Velora Beauty · Salon & Spa'},
    {filename:'sports-venues.json',slug:'sports-venues',ar:'أرينا كورتس — ملاعب كرة وبادل',en:'Arena Courts · Football & Padel'},
    {filename:'furniture.json',slug:'furniture',ar:'أوكلين ليفينج — أثاث حسب الطلب',en:'Oakline Living · Furniture Design'},
    {filename:'interiors-kitchens.json',slug:'interiors-kitchens',ar:'فورما — تصميم مطابخ ودريسنج',en:'Forma Atelier · Kitchen and Interiors'} ,
    {filename:'fitness.json',slug:'fitness',ar:'بالس ديستريكت — تدريبات قوة ولياقة',en:'Pulse District · Fitness Club'},
  ];
  const addSite=db.prepare(`INSERT INTO portfolio_verticals(slug,name_ar,name_en,wave,published)
 VALUES (?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET
 name_ar=excluded.name_ar,name_en=excluded.name_en,wave=excluded.wave`);
  const addService=db.prepare(`INSERT INTO portfolio_services(id,vertical_slug,slug,category,content_json,active)
 VALUES (?,?,?,?,?,1) ON CONFLICT(id) DO UPDATE SET
 category=excluded.category,content_json=excluded.content_json,active=1`);
  db.exec('BEGIN IMMEDIATE');
  try {
    for(const definition of files){
      const source=JSON.parse(fs.readFileSync(path.join(rootDir,'data','verticals',definition.filename),'utf8'));
      if(source.slug!==definition.slug)throw new Error('Sector slug mismatch: '+definition.filename);
      if(!source.slug || source.services.length<8) throw new Error('Incomplete sector content: '+definition.filename);
      addSite.run(source.slug,definition.ar,definition.en,1,1);
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
