import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { OAKLINE,OAK_PHOTOS,oakPath,oakText } from '@/lib/verticals/furniture/data';
import { ArrowUpRight,Armchair,House,Palette,Ruler,BookOpen,Leaf,CheckCircle2,Layers,ShieldCheck,Truck,AlertTriangle,MoveHorizontal,Image as PhotoIcon } from 'lucide-react';

const topics=['rooms','materials','measurement-guide','projects','gallery','process','about','contact'] as const;
type Topic=typeof topics[number];
const pages:Record<Topic,{ar:string;en:string}>={
 rooms:{ar:'اختار الغرفة قبل قطعة الأثاث',en:'Room-first furniture planning'},
 materials:{ar:'دليل الخشب والقماش والتشطيب',en:'Wood, upholstery and finish selection'},
 'measurement-guide':{ar:'مقاسات الغرفة قبل الأثاث',en:'An honest pre-fabrication measurement guide'},
 projects:{ar:'كيف يتحول طلب الأثاث لمشروع؟',en:'From a furniture brief to a real project'},
 gallery:{ar:'صور تحريرية حقيقية ومصادرها',en:'Actual editorial interiors and photographic credits'},
 process:{ar:'خطوات طلب تصميم أثاث واضح',en:'The custom furniture consultation process'},
 about:{ar:'Oakline Living فكرة من مافكس',en:'Oakline Living — an editorial Mavvix identity'},
 contact:{ar:'صمّم موقع معرض أثاث باسمك',en:'Commission a furniture website from Mavvix'},
};
export function generateStaticParams(){return topics.map(section=>({section}));}
export function generateMetadata({params:{locale,section}}:{params:{locale:Locale;section:string}}):Metadata{
 const p=pages[section as Topic];return p?{title:p[locale]+' | Oakline Living',description:locale==='ar'?'تجربة موقع أثاث مخصص من مافكس بخامات وأبعاد استرشادية وطلبات تسعير غير ملزمة.':'A visually distinct furniture site by Mavvix with authentic editorial imagery, real manufacturing questions and nonbinding specifications.',robots:{index:false,follow:false}}:{};
}
const roomCards=[
 {id:'living',ar:'غرفة المعيشة',en:'Living room',descAr:'الكنب والكراسي وممرات الحركة ومسافة فتح الأبواب.',descEn:'Seating, circulation, door swing and traffic flow.'},
 {id:'bedroom',ar:'غرفة النوم',en:'Bedroom',descAr:'مقاس المرتبة والأبعاد الخارجية للسرير ومساحة فتح الدولاب.',descEn:'Mattress footprint, wardrobe clearance and access.'},
 {id:'dining',ar:'غرفة الطعام',en:'Dining room',descAr:'ترابيزة الطعام وحركة الكراسي وبنش الأسرة.',descEn:'Table length, chair movement and flexible bench seating.'},
 {id:'workspace',ar:'مكتب منزلي',en:'Home workspace',descAr:'سطح العمل وتوزيع الأسلاك وطول المكتبة وثباتها.',descEn:'Desk depth, wiring, shelf spans and safe anchoring.'},
];
const materials=[
 {name:'oak',ar:'خشب أو مظهر أوك',en:'Oak look',arBody:'تأكد إذا الخامة خشب طبيعي أم قشرة أو لوح هندسي، لأن الاسم الشائع وحده لا يكفي.',enBody:'Ask whether this means solid timber, veneer or engineered board; the aesthetic label alone is insufficient.'},
 {name:'walnut',ar:'مظهر جوز',en:'Walnut look',arBody:'درجات الخشب قد تختلف بين العينات والصورة والدفعات؛ اطلب عينة صالحة للاعتماد.',enBody:'Visual tone varies across physical samples and photos. Request a real finish sample for approval.'},
 {name:'engineered',ar:'ألواح هندسية',en:'Engineered panels',arBody:'اطلب توضيح التركيب والسماكة والحواف ومواضع الاستخدام الفعلي.',enBody:'Clarify construction, surface treatment, edge banding and where the board will be installed.'},
 {name:'linen',ar:'تنجيد بملمس الكتان',en:'Linen-style upholstery',arBody:'قابلية التنظيف والتحمل تعتمد على المنتج الفعلي وتعليماته وليس اسم القماش فقط.',enBody:'Cleaning and durability depend on the actual fabric and maker's instructions, not a generic label.'},
 {name:'velvet',ar:'مخمل',en:'Velvet touch',arBody:'الملمس واللمعان واتجاه الوبر يغيروا الإحساس؛ اتأكد من العينة ومراعاة الاستخدام.',enBody:'Texture, pile direction and sheen affect the finish. Check the actual selected sample.'},
 {name:'boucle',ar:'بوكليه',en:'Bouclé texture',arBody:'ملمس العقد يضيف إحساسًا مميزًا لكن متطلبات العناية تختلف من منتج لآخر.',enBody:'Looped texture adds character but practical cleaning and wear vary by product.'},
];
const process=[
 {ar:'قياس وتصور المساحة',en:'Measure and map the room',bodyAr:'تحديد طول الجدار والأبواب ومداخل توصيل القطعة ومساحة السحب.',bodyEn:'Wall lengths, openings, delivery route and room circulation matter.'},
 {ar:'بناء السلة والمقاسات',en:'Prepare the item specification',bodyAr:'اختيار قطع وخامة وتشطيب ومقاسات أولية لكل واحدة منها.',bodyEn:'Select pieces, material, finish and tentative dimensions.'},
 {ar:'اعتماد المصنع الفعلي',en:'Owner/maker review',bodyAr:'الصانع يتحقق من المقاسات والخامات والهياكل وقدرة التنفيذ ومهلة الإنتاج.',bodyEn:'A real maker validates feasibility, materials, joinery and production timing.'},
 {ar:'عرض مكتوب قبل الاتفاق',en:'Written quote before purchase',bodyAr:'تفاصيل السعر والتسليم والتركيب والضمان والإلغاء يحددها نشاط حقيقي.',bodyEn:'The real seller specifies price, delivery, assembly, warranty and cancellation.'}
];
export default function OaklineInfo({params:{locale,section}}:{params:{locale:Locale;section:string}}){
 if(!topics.includes(section as Topic))notFound();const topic=section as Topic,ar=locale==='ar';
 const h=(v:string)=><h2 className="oakline-display text-3xl sm:text-5xl">{v}</h2>;
 return <div><section className="bg-[#E9DECE] py-14 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8"><nav className="text-xs text-[#72573F]"><Link href={oakPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {pages[topic][locale]}</nav>
  <div className="grid lg:grid-cols-[1fr_.55fr] gap-10 items-end mt-14"><div><p className="text-xs text-[#755739] font-bold tracking-widest uppercase">OAKLINE INTERIORS / {topic.toUpperCase()}</p><h1 className="oakline-display text-4xl sm:text-7xl leading-tight mt-6">{pages[topic][locale]}</h1></div><p className="text-sm leading-9 text-[#624C37]">{ar?'محتوى تخصصي لتجربة موقع أثاث من مافكس. لا يتم تصنيع أو شحن أي قطعة، والصور للاتجاه البصري وليست من مشاريع شركة حقيقية.':'A Mavvix editorial furniture website experience. No actual items are manufactured or shipped; photography illustrates unrelated interiors.'}</p></div>
 </div></section>
 {topic==='rooms'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="text-[#65513C] max-w-3xl leading-9">{ar?'لازم نفهم وظيفة الغرفة قبل اختيار القطعة. عرض أي كنبة أو مكتب من غير أبعاد المكان والمداخل قد ينتج طلب غير مناسب.':'Furniture selections should respond to room usage, clearances and delivery access. A beautiful sofa photo alone cannot prove that a piece fits the real space.'}</p>
   <div className="grid md:grid-cols-2 gap-5 mt-11">{roomCards.map((r,i)=><Link key={r.id} href={oakPath(locale,'collections')+'?room='+r.id} className="bg-white border border-[#D2BFAC] p-8 min-h-[290px] flex flex-col hover:bg-[#F2E8D9]"><span className="text-xs font-mono text-[#76573A]">ROOM 0{i+1}</span><House size={33} className="mt-8"/><h2 className="oakline-display text-3xl mt-5">{ar?r.ar:r.en}</h2><p className="text-[#65513C] text-sm leading-8 mt-4">{ar?r.descAr:r.descEn}</p><span className="font-bold text-sm inline-flex items-center gap-2 mt-auto pt-6">{ar?'قطع الغرفة':'FURNITURE IDEAS'}<ArrowUpRight size={17}/></span></Link>)}</div>
  </section>
 </>}
 {topic==='materials'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="leading-9 text-[#65513C] max-w-3xl">{ar?'كل وصف خامة في النموذج يعني تفضيل مبدئي مش عينة منتج متاح. لازم الصانع الحقيقي يؤكد مصدر الخامة والسماكات والأنسجة والتشطيب.':'Material names in this website are preferences, not physical samples or verified inventories. A real maker must confirm actual construction, source and care instructions.'}</p>
   <div className="grid md:grid-cols-3 gap-5 mt-11">{materials.map((m,i)=><article key={m.name} className="bg-white border border-[#D4C1AC] p-8 min-h-[290px]"><Palette size={30} className="text-[#87623F]"/><span className="font-mono text-xs text-[#826044] block mt-7">MATERIAL / 0{i+1}</span><h2 className="oakline-display text-2xl sm:text-3xl mt-4">{ar?m.ar:m.en}</h2><p className="text-[#65513C] leading-8 mt-5 text-sm">{ar?m.arBody:m.enBody}</p></article>)}</div>
  </section>
 </>}
 {topic==='measurement-guide'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.7fr_1fr] gap-12"><div><Ruler size={40} className="text-[#8B663D]"/>{h(ar?'العرض والعمق والارتفاع... والممرات':'WIDTH, DEPTH, HEIGHT AND ACCESS')}<p className="text-[#65513C] leading-9 mt-6">{ar?'قبل اختيار مقاس نهائي، راجع الفتحات وموقع التكييف والمخارج الكهربائية ومساحة التفاف القطع حول الأركان.':'Before committing, consider door openings, switches, air conditioning units and whether the item will physically turn around stairs and corridors.'}</p></div>
   <div className="space-y-4">{[[ar?'الأبعاد الداخلية':'Usable room dimensions',ar?'الجدار الصافي وليس المقاس الاسمي للشقة.':'Measure the actual usable wall and floor.'],[ar?'مسار القطعة':'Delivery clearance',ar?'الأبواب والمصاعد والسلالم والممرات.':'Record doors, lifts, stairs and corridor widths.'],[ar?'الفتح والحركة':'Door and drawer swing',ar?'اترك مساحة لفتح أدراج وخزائن وسحب الكراسي.':'Leave clearance for drawers, wardrobes and chairs.'],[ar?'اعتماد الصانع':'Final maker signoff',ar?'أرقام الموقع لا تعوض زيارة قياس حقيقية.':'A web estimate cannot replace on-site measurement.']].map(([a,b],i)=><div key={i} className="bg-white border border-[#D8C6B4] p-7 flex gap-5"><span className="font-mono text-[#7A5A3E] text-2xl">0{i+1}</span><div><h3 className="font-black">{a}</h3><p className="text-[#65513C] text-sm leading-8 mt-4">{b}</p></div></div>)}</div>
  </section>
 </>}
 {topic==='projects'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.75fr_1.1fr] gap-12"><div>{h(ar?'مفيش مشاريع عميل وهمية هنا':'NO FABRICATED CUSTOMER PROJECTS')}<p className="leading-9 text-[#65513C] mt-6">{ar?'قسم المشاريع في موقع أثاث حقيقي لازم يتضمن صور موثقة، موافقة العملاء، مواصفات الخامات، وأبعاد فعلية تم تنفيذها. المثال الحالي يوضح مكونات الصفحة ولا ينسب أعمال لأي ورشة غير موجودة.':'An actual furniture-project portfolio needs genuine commissioned photographs, customer consent, verified dimensions and owner-approved materials. Oakline intentionally does not invent completed projects, named buyers or client testimonials.'}</p></div>
    <div className="bg-white border border-[#D2BFAC] p-9"><h2 className="oakline-display text-3xl">{ar?'مكونات دراسة حالة حقيقية':'WHAT AN HONEST CASE STUDY NEEDS'}</h2>{[ar?'صور أصلية بإذن صاحب المكان':'Original, consented project photography',ar?'مقاسات التصميم والقطعة المنفذة':'Actual built dimensions',ar?'تفاصيل الخامة والأسلوب المعتمد':'Confirmed material and joinery',ar?'حدود الخدمة والدروس المستفادة':'Real project scope and learnings'].map((x,i)=><div className="flex gap-3 items-start text-sm mt-7" key={i}><CheckCircle2 size={20} className="shrink-0 text-[#7A613F]"/>{x}</div>)}</div>
  </section>
 </>}
 {topic==='gallery'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="max-w-3xl text-[#65513C] leading-9">{ar?'كل الصور من مصادر Commons مرخصة CC0. ليست صورًا لأثاث تم تصميمه أو شحنه بواسطة Oakline؛ روابط المصدر تعرض حقوق الاستخدام واسم المصور.':'All imagery is independent Commons CC0 editorial material, not Oakline’s client interiors, products or finished installations. The photographer and licensing sources are credited below.'}</p>
   <div className="grid lg:grid-cols-2 gap-6 mt-11">{[[OAK_PHOTOS.room,ar?'غرفة معيشة بكنبة زرقاء':'Blue-sofa living room','Jarosław Ceborski','https://commons.wikimedia.org/wiki/File:Living_room_(Unsplash).jpg'],[OAK_PHOTOS.vignette,ar?'مساحة معيشة مستقلة بكندا':'Independent furnished room in Canada','Stephen Di Donato','https://commons.wikimedia.org/wiki/File:Furnished_living_room._(Unsplash).jpg'],[OAK_PHOTOS.sofa,ar?'صورة أريكة بمصدر مستقل':'Independent sofa photograph','Pixel.la Free Stock Photos','https://commons.wikimedia.org/wiki/File:Couch-furniture-living-room-sofa_(24300293356).jpg']].map(([src,title,artist,link],i)=><figure key={i} className="bg-white border border-[#D1C0AE]"><div className="h-[370px] overflow-hidden bg-[#D0BAA0]"><img loading="lazy" alt={title} src={src} className="w-full h-full object-cover"/></div><figcaption className="p-7"><h2 className="font-black">{title}</h2><p className="text-xs text-[#73583B] mt-4">{artist} · CC0 / Wikimedia Commons</p><a className="inline-block mt-5 underline underline-offset-8 text-xs font-bold" href={link} target="_blank" rel="noopener noreferrer">{ar?'المصدر والترخيص':'SOURCE / LICENSE'}</a></figcaption></figure>)}</div>
  </section>
 </>}
 {topic==='process'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="max-w-3xl leading-9 text-[#65513C]">{ar?'تكوين طلب تسعير في تجربة الموقع لا يعني عمل رسم تنفيذ أو اتفاق شراء. اعرف المراحل التي يحتاجها مشروع أثاث حقيقي عند وجود مشغل فعلي.':'This interactive quote builder does not create engineering drawings, production slots or binding orders. It models a sensible handoff to a real operator.'}</p>
   <div className="mt-12 space-y-4">{process.map((x,i)=><article key={i} className="grid lg:grid-cols-[80px_.65fr_1.1fr] gap-7 p-7 sm:p-10 bg-white border border-[#D4C2AD]"><span className="text-4xl oakline-display text-[#7F5D40]">0{i+1}</span><h2 className="oakline-display text-3xl">{ar?x.ar:x.en}</h2><p className="text-[#65513C] leading-8">{ar?x.bodyAr:x.bodyEn}</p></article>)}</div>
  </section>
 </>}
 {topic==='about'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.7fr_1fr] gap-11"><div><Leaf size={41} className="text-[#89683F]"/>{h(ar?'اسم تحريري... وتنفيذ مافكس الفعلي':'EDITORIAL BRAND. REAL WEB ENGINEERING.')}</div><div className="space-y-6 text-[#65513C] leading-9"><p>{ar?'Oakline Living علامة تحريرية ابتكرتها Mavvix لعرض إمكانية بناء موقع أثاث راقٍ مع تحديد خامات وتشطيبات وأبعاد وسلة طلب تسعير متكاملة. ليست مصنعًا أو معرضًا حقيقيًا ولا تملك مخزونًا.':'Oakline Living is an original editorial identity built by Mavvix to demonstrate a premium furniture website, material and dimension configurators, a real multi-item RFQ workflow and admin review. It is not an actual maker, showroom or inventory business.'}</p><p>{ar?'عند تشغيل مشروع لصاحب نشاط حقيقي، تُعتمد المنتجات والأبعاد والخامات والصور والأسعار وسياسات النقل والتركيب والضمان منه مباشرة.':'An actual client launch requires authorized product data, photos, materials, real price/stock status, delivery policies and production terms from the owner.'}</p></div></section>
 </>}
 {topic==='contact'&&<>
  <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-12"><div>{h(ar?'موقع معرض أثاث يستاهل اسمك':'A BRAND WEBSITE THAT ACTUALLY FITS YOUR FURNITURE BUSINESS')}<p className="mt-6 text-[#65513C] leading-9">{ar?'Mavvix تقدر تحول منتجاتك وصورك وأسعارك وأبعادك المعتمدة لكتالوج وترتيب طلبات تسعير مع لوحة الإدارة ومصادر العملاء. التواصل هنا مع شركة برمجيات وليس معرض أثاث.':'Mavvix can build a specialized website around your verified collection, bespoke dimensions, authentic imagery and customer quote pipeline. The contact reaches a software company, not an operating furniture store.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#392C24] text-white px-8 py-5 mt-9 font-bold text-sm gap-3 items-center">{ar?'اطلب عرض تنفيذ':'DISCUSS THE WEBSITE'}<ArrowUpRight size={18}/></a></div>
   <div className="bg-[#E5DACB] p-8 sm:p-12"><h3 className="oakline-display text-3xl">{ar?'إيه البيانات اللي تجهزها؟':'CLIENT-SUPPLIED LAUNCH BRIEF'}</h3>{[ar?'قائمة المنتجات وتصنيفات غرفها':'Owner product catalogue and room categories',ar?'المقاسات وخيارات الخامة الموجودة بالفعل':'Actual allowable sizes and materials',ar?'الصور الحقوقية للقطع والمنشأة':'Rights-cleared product/venue photography',ar?'سياسات العروض والتصنيع والتوصيل':'Production, quote and delivery policies',ar?'إعدادات المستخدمين والإدارة':'Staff permissions and request workflow'].map((x,i)=><div key={i} className="flex items-start gap-3 text-sm mt-6"><CheckCircle2 size={18} className="shrink-0 text-[#76583A]"/>{x}</div>)}</div>
  </section>
 </>}
 <section className="bg-[#392C24] text-white py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap justify-between gap-7 items-center"><div><p className="text-xs text-[#E7C399] font-black tracking-widest">OAKLINE / NEXT STEP</p><h2 className="oakline-display text-3xl sm:text-4xl mt-4">{ar?'اجمع فكرتك في طلب تسعير واحد':'PREPARE A CUSTOM FURNITURE BRIEF'}</h2></div><Link href={oakPath(locale,'quote')} className="bg-[#DDB88B] text-[#392C24] px-8 py-5 text-sm font-black">{ar?'افتح السلة':'OPEN THE QUOTE BUILDER'}</Link></div></section>
 </div>;
}
