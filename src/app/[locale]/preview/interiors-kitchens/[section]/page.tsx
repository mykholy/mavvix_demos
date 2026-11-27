import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { FORMA,FORMA_IMAGES,formaPath,formaText } from '@/lib/verticals/interiors-kitchens/data';
import { LayoutStudio } from '../LayoutStudio';
import { FormaGallery } from '../FormaGallery';
import { MaterialSamples } from '../VisualLibrary';
import { ArrowUpRight,Layers,Ruler,PenTool,CheckCircle2,ShieldCheck,BookOpen,BoxSelect,LayoutGrid,Palette,AlertCircle,Lightbulb } from 'lucide-react';

const sections=['layouts','materials','measurement','process','gallery','finishes','about','contact','faq'] as const;
type Section=typeof sections[number];
const headlines:Record<Section,{ar:string;en:string}>={
 layouts:{ar:'المساحة قبل الشكل: دليل تخطيطات المطابخ',en:'Kitchen layouts begin with the room'},
 materials:{ar:'اختيار الخامات من المواصفات وليس الصور',en:'Materials should be selected by specification'},
 measurement:{ar:'قبل تصميم مطبخك: دليل المقاسات الأولية',en:'Prepare useful kitchen measurements'},
 process:{ar:'رحلة التصميم من الاستشارة للتصنيع المعتمد',en:'The design process from first brief to approved scope'},
 gallery:{ar:'صور مطابخ حقيقية من مصادر مرخصة',en:'Licensed real-world kitchen image references'},
 finishes:{ar:'تفاصيل الإضاءة والتشطيبات والتخزين',en:'Finishes, lighting and storage details'},
 about:{ar:'فكرة Forma Atelier من مافكس',en:'About the Forma Atelier experience'},
 contact:{ar:'موقع متخصص لشركة المطابخ الخاصة بك',en:'Create a tailored website for your kitchen business'},
 faq:{ar:'أهم أسئلة تصميم المطابخ قبل الاتفاق',en:'Kitchen consultation questions answered'}
};
export function generateStaticParams(){return sections.map(section=>({section}));}
export async function generateMetadata(props:{params: Promise<{locale:Locale;section:string}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 const title=headlines[section as Section]?.[locale];return title?{title:title+' | Forma Atelier',description:locale==='ar'?'دليل تخطيط مطابخ تفصيلي ضمن تجربة موقع مافكس؛ لا توجد شركة مصنعة أو عرض سعر مؤكد.':'Practical kitchen and cabinetry design guide by Mavvix; no live fabrication business, project or quote is claimed.',robots:{index:false}}:{};
}
const workflow=[
 {ar:'طلب فكرة أولية',en:'Initial project intent',detailAr:'يُحدد العميل نوع المشروع وشكل التخطيط والمواد التي يفضلها وحدود الميزانية لأغراض الاستشارة فقط.',detailEn:'The visitor shares a design type, layout and finish direction, preliminary measurements and a nonbinding budget band.'},
 {ar:'رفع مقاسات معتمد',en:'Verified site survey',detailAr:'يقوم متخصص لدى الشركة الحقيقية بمراجعة مواقع الأبواب والشبابيك والتوصيلات وأبعاد الأجهزة.',detailEn:'A real operator measures the site, noting openings, appliances, utility access and relevant technical constraints.'},
 {ar:'اعتماد التصميم والخامات',en:'Review design and materials',detailAr:'تتم مراجعة الرسم الفني وخامة الألواح والمفصلات والأسطح والتشطيبات وفق مستندات المورد.',detailEn:'The actual business must approve technical drawings, substrates, hardware, worktops and supplier specifications.'},
 {ar:'مقايسة واتفاق',en:'Itemized scope and contract',detailAr:'يُحدد المشغل الأسعار والمدة وشروط التركيب قبل أي طلب تصنيع، بعيدًا عن طلب الموقع التجريبي.',detailEn:'Only the operator can provide final fees, delivery timelines, guarantees and an installation agreement.'}
];
export default async function FormaTopic(props:{params: Promise<{locale:Locale;section:string}>}) {
 const params = await props.params;

 const {
  locale,
  section
 } = params;

 if(!sections.includes(section as Section))notFound();const topic=section as Section,ar=locale==='ar';
 const heading=(x:string)=><h2 className="forma-display text-3xl sm:text-4xl">{x}</h2>;
 const guidance=(title:string,body:string,i:number)=><article key={title} className="bg-white border border-[#D2BFB0] p-7 sm:p-8 min-h-[210px]"><span className="font-mono text-xs text-[#843F2B]">{String(i+1).padStart(2,'0')}</span><h3 className="forma-display text-2xl mt-6">{title}</h3><p className="text-[#625146] text-sm leading-8 mt-4">{body}</p></article>;
 return <div>
  <section className="bg-[#292722] text-[#F7F0E8] py-16 sm:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-8">
   <nav className="text-xs text-[#D1BDAB]"><Link href={formaPath(locale)}>{ar?'الرئيسية':'Home'}</Link> / {headlines[topic][locale]}</nav><div className="grid lg:grid-cols-[1.15fr_.6fr] gap-10 items-end mt-14">
    <div><p className="text-xs font-mono tracking-[.2em] text-[#E8BDA6]">FORMA / {topic.toUpperCase()}</p><h1 className="forma-display text-4xl sm:text-6xl leading-[1.15] mt-6">{headlines[topic][locale]}</h1></div>
    <p className="text-sm leading-8 text-[#DDCCBC]">{ar?'ملاحظات قطاعية توضيحية تستخدم لشرح ما يمكن تنفيذه لموقع شركة مطابخ؛ لا تمثل عروضًا أو مشاريع منفذة فعليًا.':'Original educational material for a Mavvix kitchen website concept, not claims about delivered kitchens or a functioning studio.'}</p>
   </div>
  </div></section>
  {topic==='layouts'&&<>
   <section className="max-w-7xl px-5 sm:px-8 mx-auto py-20 grid lg:grid-cols-[.55fr_1fr] gap-12"><div><LayoutGrid size={35} className="text-[#843F2B]"/>{heading(ar?'ابدأ بالممرات والأبواب':'Circulation comes before cabinetry')}</div><p className="leading-[2.1] text-[#5B4B41]">{ar?'مساحة المطبخ لا تتحدد بالطول والعرض وحدهما؛ موقع الحوض والبوتاجاز والباب والشباك وفتح الأجهزة يغير الحل المناسب. المخطط الذي يبدو جميلًا في صورة قد لا يصلح لمساحة ضيقة أو بنقاط توصيل مختلفة. سجّل القياسات المبدئية ثم راجعها مع متخصص قبل التصميم النهائي.':'A room’s wall lengths do not fully define its workable layout. Door swings, appliance positions, plumbing, ventilation and natural light can change which cabinet configuration is practical. Select a starting layout and request a real measured plan before any fabrication commitment.'}</p></section>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20"><LayoutStudio locale={locale}/></section>
  </>}
  {topic==='materials'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16"><MaterialSamples locale={locale}/></section>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.6fr_1fr] gap-12"><div><Palette size={34} className="text-[#843F2B]"/>{heading(ar?'تكوين المادة أهم من الوصف التجاري':'Ask for specifications, not vague labels')}</div><p className="text-[#58493F] leading-[2.1]">{ar?'خامات الواجهات وأسطح العمل تتغير في خصائصها حسب المكونات والتشطيب ونظام لصق الحواف ومواصفات المورد. يجب مقارنة العينات ووثائق التحمل والتنظيف بدل اعتبار لون مرئي دليلًا على الجودة أو ضمانًا ضد الرطوبة.':'Cabinet substrates, laminates, finishes, countertops and hardware differ by specific product and supplier. Compare maintenance, moisture exposure, edge treatment and documented ratings, rather than accepting unsupported promises based on an attractive colour sample.'}</p></section>
   <section className="bg-[#E8DBCB] py-16"><div className="max-w-7xl px-5 sm:px-8 mx-auto"><h2 className="forma-display text-3xl">{ar?'ثلاث نقاط ابدأ بها عند المقارنة':'Three practical material questions'}</h2><div className="grid md:grid-cols-3 gap-4 mt-10">{[[ar?'الخامة الأساسية':'Substrate',ar?'اسم المادة والمورد والمواصفة الفنية.':'Exact product and supplier technical details.'],[ar?'معالجة الحواف':'Edges and joints',ar?'حالة الاستخدام والرطوبة والتثبيت.':'Actual exposure, edge sealing and installation.'],[ar?'العناية والضمان':'Maintenance & terms',ar?'التنظيف وشروط الضمان المعتمد إن وجد.':'Care guidance and genuine warranty conditions.']].map(([title,body],i)=>guidance(title,body,i))}</div></div></section>
  </>}
  {topic==='measurement'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="text-[#5B4B41] leading-9 max-w-4xl">{ar?'الموقع لا يحتاج رفعًا هندسيًا تفصيليًا من الزائر. يكفي نوع المساحة وطول الحائط أو الحوائط التقريبي بالسنتمتر، بينما يُضاف توصيف أماكن الأبواب والشبابيك والتوصيلات شفهيًا عند الاستشارة. لا تغير وصلات الغاز أو الكهرباء أو المياه بنفسك.':'A public enquiry only needs rough room dimensions and a preferred layout, not a confidential architectural file. A proper survey should later identify doors, windows, appliance clearances and utility points. Never modify electrical or gas lines without a qualified professional.'}</p>
    <div className="grid md:grid-cols-3 gap-5 mt-10">{[[ar?'الأطوال والارتفاعات':'Walls and ceiling',ar?'أطوال مبدئية موحدة الوحدة لتكوين فكرة، وليست مقاسات تصنيع.':'Preliminary dimensions in consistent units, not for fabrication.'],[ar?'فتحات وأجهزة':'Doors and appliances',ar?'اتجاه فتح الباب وأماكن الثلاجة والموقد والحوض.':'Door swings, refrigerator, cooker and sink positions.'],[ar?'مراجعة على الطبيعة':'Qualified site survey',ar?'المشغل الحقيقي يؤكد الأبعاد والفواصل ومنافذ الخدمات.':'Actual operator verifies measurements and services on site.']].map(([x,y],i)=>guidance(x,y,i))}</div>
    <Link href={formaPath(locale,'consultation')} className="inline-flex mt-10 gap-3 bg-[#9A4B32] text-white px-7 py-4 font-bold text-sm">{ar?'جرّب إدخال المقاسات المبدئية':'Try the dimension planner'}<ArrowUpRight size={17}/></Link>
   </section>
  </>}
  {topic==='process'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20"><p className="max-w-4xl text-[#645349] leading-9">{ar?'هذه خطوات تشغيلية مقترحة لموقع شركة مطابخ حقيقية. Forma لا تنفذ تركيبًا أو تصنع خزائن أو تصدر فواتير فعلية.':'These are suggested operating stages for a real cabinetry business; Forma does not manufacture, install or invoice kitchens.'}</p><div className="mt-10 space-y-5">{workflow.map((s,i)=><article key={i} className="grid md:grid-cols-[100px_.7fr_1fr] gap-8 items-start bg-white border border-[#D5C3B4] p-8"><span className="font-mono text-[#843F2B] text-3xl">0{i+1}</span><h2 className="forma-display text-2xl">{s[locale]}</h2><p className="text-[#645349] leading-8 text-sm">{ar?s.detailAr:s.detailEn}</p></article>)}</div></section>
  </>}
  {topic==='gallery'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><p className="text-[#544D44] max-w-3xl leading-8 mb-9">{ar?'استلهم تفاصيل المساحات والخامات من مراجع مستقلة مرخصة. ليست أعمالًا منفذة من Forma أو مافكس.':'Explore independently licensed spaces and materials for inspiration. These are not Forma or Mavvix client projects.'}</p><FormaGallery locale={locale}/></section>}
  {topic==='finishes'&&<>
   <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.65fr_1fr] gap-10"><div><Lightbulb className="text-[#843F2B]" size={35}/>{heading(ar?'فرق كبير بين اللون والأداء':'Finishing choices have practical consequences')}</div><p className="text-[#645349] leading-[2.1]">{ar?'التشطيب يحدد شكل واجهات المطبخ وعلاقتها بالإضاءة ونظافة الأسطح. الأدراج والمفصلات والإنارة تحتاج مواصفات وتوريدًا وتركيبًا بمعايير جهة حقيقية. لا تستخدم رسمة إرشادية كأنها شهادة تحمّل أو ضمان منتجات.':'Finish selection changes reflectance, care and the feel of the room. Cabinet hardware, concealed lighting and worktops should be specified from real supplier documents. A website mood reference cannot stand in for material durability ratings or a qualified electrical design.'}</p></section><section className="bg-[#E8DBCB] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-3 gap-5">{FORMA.services.filter(s=>['countertops','lighting','pantry'].includes(s.slug)).map((s,i)=>guidance(s.title[locale],s.body[locale],i))}</div></section>
  </>}
  {topic==='about'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.6fr_1fr] gap-12"><div><PenTool className="text-[#843F2B]" size={38}/>{heading(ar?'Forma هي تجربة رقمية، مش ورشة مطابخ':'An editorial concept, not a kitchen factory')}</div><div className="space-y-7 text-[#645349] leading-9"><p>{ar?'FORMA ATELIER اسم وهوية صممتها Mavvix لعرض كيف يمكن لموقع مطابخ أن يحول وصف المساحة إلى استشارة متخصصة مفهومة. لا توجد فروع أو مهندسون أو مشروعات عملاء أو ضمانات تركيب تخص Forma في الواقع.':'Forma Atelier is a fictional editorial brand built to demonstrate a Mavvix kitchen business website. It is not an existing contractor with verified projects, team members or branches.'}</p><p>{ar?'المحتوى متخصص والمقاسات تحفظ للاستفسار بمرجع داخلي، لكن العمل التجاري الحقيقي يتطلب هوية الشركة وصورها وخامات موردها وسياسات الاستشارة والقياس والاتفاق.':'Real deliveries use the actual client\'s name, licensed photography, product specifications, surveying and quotation processes. The showcase stores an example design enquiry rather than placing manufacturing orders.'}</p></div></section>}
  {topic==='contact'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.85fr_1fr] gap-12"><div>{heading(ar?'شركة مطابخ محتاجة موقع يبيع خبرتها؟':'Your kitchen brand deserves design-led digital presence')}<p className="mt-6 leading-9 text-[#645349]">{ar?'مافكس يمكنها تنفيذ موقع باسم نشاطك، وكتالوج بخامات ومشروعات حقيقية، ونظام طلب استشارة وإدارة الاستفسارات. التواصل هنا مع شركة البرمجيات فقط.':'Mavvix can create an owner-specific interior design site, with actual supplier catalogues, project content and an isolated lead workspace. Contacting Mavvix is not a request to a fictional Forma kitchen manufacturer.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 mt-9 bg-[#9A4B32] text-white px-8 py-5 font-extrabold text-sm">{ar?'اطلب موقع لشركتك':'Request a business website proposal'}<ArrowUpRight size={17}/></a></div><div className="p-9 bg-[#EEE3D6]"><h2 className="forma-display text-3xl">{ar?'بيانات مفيدة قبل التنفيذ':'What to prepare for commissioning'}</h2>{[ar?'الخدمات الفعلية ومواد الموردين':'Real service list and approved supplier materials',ar?'صور مشروعات تملك حقوقها':'Licensed project photography you own',ar?'مراحل الرفع والتصميم والمقايسة':'Your surveying, design and quotation process',ar?'سياسات الدفع والضمان المعتمدة':'Genuine payments and warranty policies'].map(s=><p className="flex gap-3 items-center mt-6 text-sm font-bold" key={s}><CheckCircle2 size={18} className="text-[#843F2B]"/>{s}</p>)}</div></section>}
  {topic==='faq'&&<section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-[.55fr_1fr] gap-12"><div>{heading(ar?'إجابات تمنع سوء التوقعات':'Clarity before cost estimates')}</div><div className="space-y-4">{FORMA.faq.map((f,i)=><details key={i} className="bg-white border border-[#D3C0B0] p-7"><summary className="font-extrabold cursor-pointer">{f.q[locale]}</summary><p className="mt-4 text-[#645349] leading-8 text-sm">{f.a[locale]}</p></details>)}</div></section>}
  <section className="bg-[#9A4B32] text-[#F8F1EB] py-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-7"><div><p className="font-mono text-xs text-[#E7BBA2]">FORMA / PROJECT BRIEF</p><h2 className="forma-display text-3xl mt-4">{ar?'حوّل الفكرة لطلب استشارة مرتب':'Build a clear, nonbinding design brief'}</h2></div><Link href={formaPath(locale,'consultation')} className="bg-[#E3B69D] text-[#242526] inline-flex gap-3 items-center px-8 py-5 text-sm font-extrabold">{ar?'ابدأ الاستفسار':'Prepare project request'}<ArrowUpRight size={17}/></Link></div></section>
 </div>;
}
