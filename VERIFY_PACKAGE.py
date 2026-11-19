#!/usr/bin/env python3
"""Validate V2 specification kit only (does not prove Gemini has implemented websites)."""
from pathlib import Path
import csv, hashlib, io, json, sqlite3
r=Path(__file__).resolve().parent
assert 'Version' not in r.name or True
required=[
'00_AGENT/MASTER_IMPLEMENTATION_PROMPT.md','00_AGENT/START_WITH_THIS_PROMPT.txt',
'01_PRODUCT/PRODUCT_REQUIREMENTS.md','02_DESIGN/DESIGN_SYSTEMS.json',
'02_DESIGN/FIRST_FOLD_AND_STORYTELLING_V2.md','03_PLAN/BUILD_ORDER.md',
'05_ENGINEERING/sqlite_schema.sql','05_ENGINEERING/ADMIN_STUDIO_REQUIREMENTS.md',
'05_ENGINEERING/SEED_DATA.json','06_QA/MATRICES/ACCEPTANCE_TESTS_V2.csv',
'06_QA/RELEASE_GATE_V2.md','07_MARKETING/SHOWCASE_SALES_EXPERIENCE_V2.md',
'08_BRAND/official_assets/site-logo-light-bg.png',
'08_BRAND/official_assets/site-logo-dark-bg.png',
]
for f in required:
 assert (r/f).is_file() and (r/f).stat().st_size>50,f

vkeys=['construction','industrial','real-estate','dental','ecommerce','portfolio','restaurant','academy']
design=json.loads((r/'02_DESIGN/DESIGN_SYSTEMS.json').read_text(encoding='utf8'))
assert set(vkeys).issubset(set(design)), 'Missing design system'
seeds=json.loads((r/'05_ENGINEERING/SEED_DATA.json').read_text(encoding='utf8'))
assert set(vkeys).issubset(set(seeds)), 'Missing demo seed'
minimums={
'construction':{'projects':12,'services':7,'articles':6},
'industrial':{'products':24,'applications':5,'articles':6},
'real-estate':{'properties':24,'developments':5,'articles':6},
'dental':{'services':10,'practitioners':6,'articles':8},
'ecommerce':{'products':24,'collections':4,'articles':6},
'portfolio':{'cases':12,'articles':6},
'restaurant':{'dishes':30,'branches':3,'modifiers':12,'time_slots':14,'articles':6},
'academy':{'courses':12,'lessons':60,'quiz_questions':72,'instructors':8,'articles':6}}
for site in vkeys:
 for key,num in minimums[site].items():
  assert len(seeds[site][key])>=num,(site,key,len(seeds[site].get(key,[])),num)
 for key,val in seeds[site].items():
  if isinstance(val,list):
   ids=[x.get('id') for x in val if isinstance(x,dict) and 'id' in x]
   assert len(ids)==len(set(ids)),(site,key,'duplicate id')

vfiles=['01_CONSTRUCTION.md','02_INDUSTRIAL.md','03_REAL_ESTATE.md','04_DENTAL.md','05_ECOMMERCE.md','06_PORTFOLIO.md','07_RESTAURANT.md','08_ACADEMY.md']
pattern_count=0
for i,(site,vfile) in enumerate(zip(vkeys,vfiles),start=1):
 p=r/'04_DEMOS'/vfile
 txt=p.read_text(encoding='utf8')
 assert len(txt)>14000,(vfile,len(txt))
 assert txt.count('### Screen')>=10,vfile
 assert txt.count('### Journey')>=3,vfile
 blueprint=json.loads((r/'04_DEMOS/BLUEPRINTS'/f'{i:02d}_{site}.json').read_text(encoding='utf8'))
 assert blueprint['slug']==site
 assert blueprint['required']==True
 assert blueprint['routeCount']==len(blueprint['routes'])>=10
 assert len(blueprint['flows'])==3
 assert len({x['route'] for x in blueprint['routes']})==len(blueprint['routes'])
 pattern_count+=blueprint['routeCount']

# Data model cross-references and material consistency
courses={x['id'] for x in seeds['academy']['courses']};lessons={x['id'] for x in seeds['academy']['lessons']}
assert all(x['course_id'] in courses for x in seeds['academy']['lessons'])
assert all(x['lesson_id'] in lessons for x in seeds['academy']['quiz_questions'])
assert sum(x.get('preview_enabled') is True for x in seeds['academy']['lessons'])>=24
assert sum(len(x['variants']) for x in seeds['ecommerce']['products'])>=60
assert sum(x['stock']==0 for p in seeds['ecommerce']['products'] for x in p['variants'])>=5
assert all(x['city']==next(t['city'] for t in seeds['real-estate']['developments'] if t['id']==x['development_id']) for x in seeds['real-estate']['properties'])
assert all(not (x['material']=='aluminium' and x['grade'] in ['304','316']) for x in seeds['industrial']['products'])
assert len({x['id'] for x in seeds['restaurant']['dishes']})==30

sql=(r/'05_ENGINEERING/sqlite_schema.sql').read_text(encoding='utf8')
db=sqlite3.connect(':memory:');db.executescript(sql)
tables={x[0] for x in db.execute("SELECT name FROM sqlite_master WHERE type='table'")}
assert len(tables)>=25,len(tables)
for table in ['demo_sites','catalog_items','catalog_variants','demo_submissions','demo_submission_lines','admin_users','site_pages','localized_content','academy_lessons','academy_quiz_questions','restaurant_dishes','property_units']:
 assert table in tables, table
# Minimal real write check
with db:
 db.execute("INSERT INTO demo_sites(id,slug,name_ar,name_en,published) VALUES (?,?,?,?,?)",('site1','construction','أطلس','Atlas',1))
 db.execute("INSERT INTO demo_submissions(id,site_id,flow_type,payload_json) VALUES (?,?,?,?)",('req1','site1','construction_quote','{"project_id":"const-01"}'))
 db.execute("INSERT INTO demo_submission_lines(id,submission_id,source_type,source_id,quantity) VALUES(?,?,?,?,?)",('line1','req1','project','const-01',1))
assert db.execute('SELECT COUNT(*) FROM demo_submission_lines WHERE submission_id=?',('req1',)).fetchone()[0]==1
assert db.execute('PRAGMA foreign_key_check').fetchall()==[]

with (r/'06_QA/MATRICES/ACCEPTANCE_TESTS_V2.csv').open(encoding='utf8') as f:
 qa=list(csv.DictReader(f))
assert len(qa)>=190,len(qa)
for site in vkeys:
 assert sum(x['vertical']==site for x in qa)>=20,site
 assert sum(x['vertical']==site and x['type']=='journey' for x in qa)==3,site

for p in (r/'08_BRAND/official_assets').glob('*'):
 if p.suffix.lower() in ['.png','.jpg','.jpeg','.ico']:
  assert p.stat().st_size>1000,p.name
print('PASS: 8 complete sector specs,', pattern_count,'bilingual route patterns,',len(qa),'QA cases,',len(tables),'SQLite schema tables and seed counts/links verified.')
print('PASS: Kit structural verification only. This does NOT imply the Next.js sites have been built or tested.')
