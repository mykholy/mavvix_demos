import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SECTOR_IMAGES } from '@/lib/media/sector-images';
import type { SectorName } from '@/lib/business/mavvix-contact';

type Pair={ar:string;en:string};
type Info={title:Pair;body:Pair};
type SectorRecord={
 eyebrow:Pair; heading:Pair; intro:Pair; editorial:Pair; photoAlt:Pair;
 pillars:[Info,Info,Info,Info]; questions:[Info,Info,Info];
 primary:Pair; primaryPath:string; secondPath:string; secondary:Pair;
};
const DATA:Record<SectorName,SectorRecord>={
 construction:{
  eyebrow:{ar:'التنفيذ يبدأ من وضوح النطاق',en:'SCOPE BEFORE EXECUTION'},
  heading:{ar:'مشروع مضبوط من أول المعاينة لآخر بند تسليم',en:'From the first site visit to a clear handover'},
  intro:{ar:'الموقع الهندسي الجيد لا يكتفي بعرض مشروعات جميلة؛ يساعد العميل يفهم الخدمات، المراحل، ومستندات التعاقد والرقابة قبل ما يطلب مقايسة.',en:'A contracting website should clarify deliverables, procurement decisions, review milestones and what happens after the quotation is accepted.'},
  editorial:{ar:'تسلسل العرض: استكشاف الأعمال ← اختيار التخصص ← تحديد نطاق ومراحل المشروع ← طلب معاينة أو مقايسة.',en:'Client journey: inspect projects → choose discipline → define project milestones → request a scoped quotation.'},
  photoAlt:{ar:'صورة تحريرية مرجعية للتخطيط والتنفيذ الهندسي',en:'Editorial reference photography of architectural planning and execution'},
  pillars:[
   {title:{ar:'تحديد نطاق الأعمال',en:'Scope definition'},body:{ar:'توضيح الأعمال المشمولة والاستثناءات والمتطلبات قبل التسعير.',en:'Document inclusions, exclusions and assumptions before pricing.'}},
   {title:{ar:'تنسيق التخصصات',en:'Trade coordination'},body:{ar:'ربط الأعمال المدنية والمعمارية والكهربية والميكانيكية بمراحل واضحة.',en:'Plan architectural, civil and MEP interfaces with review points.'}},
   {title:{ar:'الجداول والمراحل',en:'Milestone planning'},body:{ar:'مستندات استلام لكل مرحلة بدلاً من وعود عامة بمدة التنفيذ.',en:'Track stage gates and reviewable deliverables rather than vague timelines.'}},
   {title:{ar:'التسليم وضمان الجودة',en:'Quality & handover'},body:{ar:'قوائم فحص ورسومات محدثة ومستندات مراجعة عند التسليم.',en:'Use punch lists, as-built drawings and documented final checks.'}},
  ],
  questions:[
   {title:{ar:'هل ممكن أطلب معاينة قبل المقايسة؟',en:'Can I request a visit before quoting?'},body:{ar:'نعم، نموذج نطاق الأعمال يجمع المعلومات المطلوبة للتواصل وتحديد المتطلبات.',en:'The scoping form captures requirements for a follow-up assessment.'}},
   {title:{ar:'إيه اللي بيحدد التكلفة؟',en:'What determines the quote?'},body:{ar:'المساحة والموقع والمواصفات والتشطيبات والجدول الزمني والتوريدات.',en:'Area, location, materials, specifications, schedule and procurement scope.'}},
   {title:{ar:'أحتاج أجهز إيه؟',en:'What should I prepare?'},body:{ar:'الرسومات المتاحة وصور الموقع والميزانية المبدئية وموعد البدء.',en:'Existing drawings, site photos, approximate budget and intended start date.'}}
  ],primary:{ar:'حدّد نطاق مشروعك',en:'Scope a project'},primaryPath:'request-quote',secondary:{ar:'تصفّح الأعمال',en:'Explore projects'},secondPath:'projects'
 },
 industrial:{
  eyebrow:{ar:'قرارات مشتريات قائمة على مواصفات',en:'SPECIFICATION-LED PROCUREMENT'},
  heading:{ar:'المواصفة الصحيحة أهم من صورة المنتج',en:'Engineering specifications before purchasing'},
  intro:{ar:'قارن الخامة والدرجة والمقاس ووحدة البيع ومضاعفات التعبئة. جهّز طلب عرض أسعار من عدة بنود بمواصفات واضحة تسهل مناقشتها مع المورد.',en:'Compare material grades, dimensions, units, minimum order quantities and packaging. Build a multi-line RFQ that procurement teams can review.'},
  editorial:{ar:'التركيز على عناصر قابلة للتحقق: SKU، أبعاد، درجة خامة، كميات، تغليف، متطلبات شهادات عند وجودها.',en:'Use verifiable fields: SKU, dimensions, grade, quantity, packaging and requested documentation.'},
  photoAlt:{ar:'صورة تحريرية مرجعية للعمليات الصناعية',en:'Editorial reference of industrial equipment and production'},
  pillars:[
   {title:{ar:'مقارنة الدرجات',en:'Material grades'},body:{ar:'اختيار الخامة مناسب للمقاومة والتآكل والاستخدام المقصود.',en:'Match material properties to corrosion, loads and intended use.'}},
   {title:{ar:'قواعد الكميات',en:'MOQ & pack sizes'},body:{ar:'منع الكميات غير المتوافقة مع الحدود الدنيا ومضاعفات العبوات.',en:'Validate minimum orders and multiples at the point of request.'}},
   {title:{ar:'جدول المواصفات',en:'Specification sheets'},body:{ar:'البيانات الفنية الأساسية واضحة وقابلة للمقارنة بين البنود.',en:'Provide structured, comparable product attributes.'}},
   {title:{ar:'طلب تسعير متعدد',en:'Multi-item quotation'},body:{ar:'سلة بنود واحدة تجمع احتياجات المشروع بدلاً من عشرات الاستفسارات.',en:'Consolidate technical requirements into one enquiry.'}}
  ],
  questions:[
   {title:{ar:'هل السعر شامل الشحن؟',en:'Are shipping fees included?'},body:{ar:'يتحدد العرض النهائي حسب الوجهة والتغليف والكميات وشروط التسليم.',en:'Final commercial terms depend on destination, packaging, volume and Incoterms.'}},
   {title:{ar:'هل أقدر أطلب شهادة خامة؟',en:'Can I request a material certificate?'},body:{ar:'يمكن تحديد الوثائق المطلوبة في ملاحظات RFQ، ويؤكدها المورد قبل الاتفاق.',en:'Specify required test documentation in the RFQ; suppliers must verify availability.'}},
   {title:{ar:'إزاي أحسب كمية الطلب؟',en:'How do I calculate quantity?'},body:{ar:'راجع وحدة البيع والحد الأدنى ومضاعفات التعبئة لكل SKU.',en:'Check unit of measure, MOQ and pack multiples for each SKU.'}}
  ],primary:{ar:'جهّز طلب تسعير',en:'Build an RFQ'},primaryPath:'rfq',secondary:{ar:'كتالوج المواصفات',en:'Explore specifications'},secondPath:'products'
 },
 'real-estate':{
  eyebrow:{ar:'اعرف قبل ما تقرر',en:'PROPERTY DECISIONS WITH CLARITY'},
  heading:{ar:'قارن الوحدات على أساس احتياجاتك مش الصور بس',en:'Find the residence that actually fits your needs'},
  intro:{ar:'قارن الأسعار والمساحة والغرف ونوع الوحدة والمخطط. طلب المعاينة يسجل تفضيلك، ولا يعني تأكيد موعد بدون رد الجهة المسؤولة.',en:'Compare the layout, area, bedrooms, budget and development context. Viewing requests require operator confirmation.'},
  editorial:{ar:'رحلة واضحة تبدأ باختيار المشروع، ثم المقارنة والتفاصيل، وتنتهي بطلب معاينة أو استفسار.',en:'Explore communities, compare unit layouts, inspect details and request a viewing.'},
  photoAlt:{ar:'صورة معمارية تحريرية مرجعية لمساحات سكنية',en:'Editorial architectural reference of residential interiors'},
  pillars:[
   {title:{ar:'الاحتياجات الفعلية',en:'Lifestyle fit'},body:{ar:'عدد الغرف والقرب من الخدمات وتوزيع المساحات وليس السعر فقط.',en:'Bed count, location and practical room arrangements.'}},
   {title:{ar:'تجربة مقارنة',en:'Side-by-side comparison'},body:{ar:'عرض المساحة والحمامات والسعر وخصائص الوحدة جنبًا إلى جنب.',en:'Compare key unit attributes without losing context.'}},
   {title:{ar:'فهم خطط الدفع',en:'Payment clarity'},body:{ar:'أي حاسبة أقساط توضيحية؛ العقد هو المرجع النهائي للرسوم.',en:'Illustrative calculations are never a binding finance offer.'}},
   {title:{ar:'استفسار معاينة منظم',en:'Viewing enquiries'},body:{ar:'اختيار الوحدة واليوم والتوقيت لتسهيل المتابعة الفعلية.',en:'Capture a preferred unit and viewing window for follow-up.'}}
  ],
  questions:[
   {title:{ar:'السعر المكتوب نهائي؟',en:'Is the displayed price final?'},body:{ar:'يتم تأكيد السعر الحالي والرسوم مع الجهة المالكة قبل أي تعاقد.',en:'Confirm current prices and all fees with the legal seller.'}},
   {title:{ar:'إزاي أعرف المستندات المطلوبة؟',en:'Which documents matter?'},body:{ar:'راجع الملكية والتراخيص والتسليم الفعلي والشروط المكتوبة.',en:'Check legal title, approvals, handover and written terms.'}},
   {title:{ar:'هل طلب المعاينة حجز مؤكد؟',en:'Is a requested viewing confirmed?'},body:{ar:'لا، الطلب يحتاج تأكيدًا من مسؤول المعاينات.',en:'No. A team member must explicitly confirm the appointment.'}}
  ],primary:{ar:'قارن الوحدات',en:'Compare residences'},primaryPath:'compare',secondary:{ar:'اطلب معاينة',en:'Request a viewing'},secondPath:'viewing'
 },
 dental:{
  eyebrow:{ar:'الوضوح والراحة قبل الموعد',en:'A CALM, INFORMED PATIENT JOURNEY'},
  heading:{ar:'اعرف خطوات الاستشارة وخيارات الرعاية قبل الزيارة',en:'Know what to expect before your consultation'},
  intro:{ar:'تعرف على طبيعة الخدمات وما الذي تسأل عنه الطبيب وكيف تستعد لزيارتك. المعلومات للتثقيف ولا تعوض التشخيص لدى طبيب مرخّص.',en:'Understand treatment categories, prepare questions and know what to expect. Information is educational and not a diagnosis or substitute for licensed care.'},
  editorial:{ar:'ابدأ بخدمة مناسبة، اطّلع على إرشادات الزيارة، ثم اترك طلب تواصل لترتيب الموعد.',en:'Choose an appropriate service, read first-visit guidance, then request an appointment follow-up.'},
  photoAlt:{ar:'صورة تحريرية مرجعية لعيادة أسنان مجهزة',en:'Editorial reference photograph of a modern dental room'},
  pillars:[
   {title:{ar:'زيارة أولى بلا ارتباك',en:'First-visit preparation'},body:{ar:'قائمة عملية بالأسئلة والمعلومات المفيدة قبل الموعد.',en:'A practical checklist of questions to discuss with a clinician.'}},
   {title:{ar:'فهم الإجراءات',en:'Understand procedures'},body:{ar:'شرح مبسط للخدمات والتقييمات التي يحددها الطبيب.',en:'Plain-language descriptions of clinician-led assessment and care.'}},
   {title:{ar:'أولويات المريض',en:'Patient-first communication'},body:{ar:'توضيح الوقت المتوقع والخيارات والأسئلة الواجب طرحها.',en:'Clear expectations, options and questions to prepare.'}},
   {title:{ar:'خطوة طلب موعد',en:'Appointment enquiry'},body:{ar:'تحديد الخدمة والوقت المناسب ووسيلة التواصل للمتابعة.',en:'Select a service and preferred time for a follow-up response.'}}
  ],
  questions:[
   {title:{ar:'هل ممكن تشخيص الحالة من الموقع؟',en:'Can this website diagnose me?'},body:{ar:'لا. التشخيص يعتمد على تقييم مباشر من مختص مرخّص.',en:'No. Only a qualified clinician can evaluate and diagnose an individual patient.'}},
   {title:{ar:'أستعد لأول زيارة إزاي؟',en:'How should I prepare?'},body:{ar:'جهّز أسئلتك وسجلك الطبي مع الطبيب مباشرةً، ولا ترسل بيانات صحية حساسة عبر الفورم.',en:'Prepare questions and discuss sensitive medical history privately with your practitioner.'}},
   {title:{ar:'الطلب معناه الموعد اتأكد؟',en:'Is my appointment confirmed?'},body:{ar:'لا. يتم إرسال تفضيل الموعد ويُؤكد لاحقًا.',en:'No. A scheduling team must explicitly confirm the time.'}}
  ],primary:{ar:'اطلب موعد استشارة',en:'Request an appointment'},primaryPath:'request-appointment',secondary:{ar:'دليل أول زيارة',en:'First-visit guide'},secondPath:'patient-guide'
 },
 ecommerce:{
  eyebrow:{ar:'اختيار أنسب مع عناية بالتفاصيل',en:'THOUGHTFUL SHOPPING EXPERIENCE'},
  heading:{ar:'التفاصيل والمقاس والعناية قبل إتمام الطلب',en:'Beautiful pieces deserve a clearer buying journey'},
  intro:{ar:'تصفح القطع حسب المجموعة، راجع الخيارات المتاحة، ودليل العناية ورسوم الشحن قبل إضافة أي منتج للسلة.',en:'Shop collections, evaluate variants and fit, and review delivery and fabric-care guidance before checkout.'},
  editorial:{ar:'من كتالوج وفلاتر حقيقية إلى اختيار Variant وسلة وإيصال طلب؛ الصور التحريرية لا تمثل بالضرورة القطعة المطابقة.',en:'From catalog filters to size choices, cart and receipt preview. Editorial styling images are not SKU-specific product photography.'},
  photoAlt:{ar:'صورة أزياء تحريرية مرجعية للأقمشة الطبيعية',en:'Editorial fashion photography for natural fabrics and styling'},
  pillars:[
   {title:{ar:'مقاس ولون واضح',en:'Variant-aware selection'},body:{ar:'اختيارات لون ومقاس ومخزون على مستوى الصنف، وليس زر شراء عام.',en:'Size, color and stock selections matched to product variants.'}},
   {title:{ar:'دليل العناية',en:'Fabric care'},body:{ar:'إرشادات عملية لغسيل الأقمشة الطبيعية وحفظها.',en:'Practical care guidance for natural fibers.'}},
   {title:{ar:'شفافية الشحن',en:'Delivery clarity'},body:{ar:'حساب رسوم التوصيل حسب المنطقة قبل إرسال الطلب.',en:'Show delivery zone fees before the checkout step.'}},
   {title:{ar:'إيصال طلب خاص',en:'Private order receipts'},body:{ar:'ملخص أسعار محسوب من الخادم ورابط وصول خاص لكل طلب.',en:'Server-verified totals and individually access-controlled receipts.'}}
  ],
  questions:[
   {title:{ar:'أختار مقاسي إزاي؟',en:'How do I choose a size?'},body:{ar:'راجع مقاسات القطعة نفسها ولا تفترض تطابق المقاسات بين الموديلات.',en:'Compare item measurements rather than assuming sizes are identical across styles.'}},
   {title:{ar:'رسوم الشحن ثابتة؟',en:'Are delivery charges fixed?'},body:{ar:'السعر النهائي يتحدد حسب المنطقة والشروط المعلنة قبل الإرسال.',en:'Fees depend on the destination shown at checkout.'}},
   {title:{ar:'هل الصور تعرض نفس القطعة؟',en:'Are editorial photos the exact SKU?'},body:{ar:'الصور المستخدمة لتوضيح طابع العلامة؛ يجب توفير تصوير مطابق لكل منتج قبل بيعه فعليًا.',en:'Editorial images demonstrate styling; exact SKU photos must be supplied before real commerce.'}}
  ],primary:{ar:'تصفح المنتجات',en:'Explore products'},primaryPath:'collections',secondary:{ar:'الشحن والمقاسات',en:'Delivery and size guide'},secondPath:'help'
 },
 portfolio:{
  eyebrow:{ar:'قرارات تصميم تُبنى على هدف',en:'DISCIPLINED CREATIVE DELIVERY'},
  heading:{ar:'مش مجرد شكل حلو؛ منهجية ومخرجات قابلة للتسليم',en:'Beyond beautiful visuals: a defensible design process'},
  intro:{ar:'من البريف والبحث إلى الأسلوب البصري والملفات النهائية والتوثيق. استعرض الخدمات ودراسات الحالة لمعرفة كيف تُتخذ القرارات.',en:'From a clear brief to positioning, system design and documented handover. Explore service dossiers and the rationale behind each direction.'},
  editorial:{ar:'التجربة تبرز التفكير وراء كل عمل: المشكلة والخيارات التي استُبعدت والحل النهائي والمخرجات.',en:'A case study should explain the problem, constraints, rejected directions, final rationale and usable outputs.'},
  photoAlt:{ar:'صورة تحريرية مرجعية لاستوديو تصميم وإنتاج',en:'Editorial reference photograph of a design studio'},
  pillars:[
   {title:{ar:'بريف قابل للتنفيذ',en:'A useful creative brief'},body:{ar:'تحديد الجمهور والنتيجة المطلوبة والمخرجات قبل التسعير.',en:'Align audiences, objectives, constraints and deliverables.'}},
   {title:{ar:'اتجاه بصري مدروس',en:'A considered direction'},body:{ar:'قرارات الطباعة والألوان والتكوين مرتبطة بالتموضع.',en:'Typography, color and layout choices anchored in positioning.'}},
   {title:{ar:'نظام قابل للتوسع',en:'Design systems'},body:{ar:'مكونات وأنماط ثابتة تسهّل تطوير العلامة عبر القنوات.',en:'Reusable design tokens, components and guidelines.'}},
   {title:{ar:'تسليم قابل للاستخدام',en:'Handover-ready output'},body:{ar:'ملفات المصدر ودليل الاستخدام وتوثيق النطاق المتفق عليه.',en:'Editable assets, usage guidance and documented scope.'}}
  ],
  questions:[
   {title:{ar:'إيه الفرق بين هوية ولوجو؟',en:'How is an identity different from a logo?'},body:{ar:'الهوية نظام كامل يشمل الاستخدام واللغة البصرية وليس علامة منفردة.',en:'An identity governs visual behavior across many contexts, not just a mark.'}},
   {title:{ar:'كيف يبدأ المشروع؟',en:'How does an engagement begin?'},body:{ar:'بنموذج موجز لفهم المشكلة والمخرجات والميزانية والوقت.',en:'A structured brief defines the problem, outputs, schedule and budget.'}},
   {title:{ar:'هل فيه ملفات قابلة للتعديل؟',en:'Will files be editable?'},body:{ar:'مواصفات التسليم تحدد حسب نطاق كل مشروع وعقده.',en:'Editable deliverables depend on the agreed scope and contract.'}}
  ],primary:{ar:'اكتب موجز مشروعك',en:'Start your project brief'},primaryPath:'contact',secondary:{ar:'تصفّح الأعمال',en:'Explore case studies'},secondPath:'work'
 },
 restaurant:{
  eyebrow:{ar:'جودة الخدمة تبدأ من تجربة واضحة',en:'A THOUGHTFUL DINING JOURNEY'},
  heading:{ar:'من اختيار الطبق لطلب الطاولة في خطوات بسيطة',en:'Discover, choose and plan your dining experience'},
  intro:{ar:'قائمة طعام منظمة، تفاصيل المكونات والتنبيهات، إضافات محسوبة وتفضيلات الحجز؛ كل خطوة واضحة قبل إرسال الطلب.',en:'Browse a structured menu, inspect ingredients and modifiers, and choose a table time. Real fulfillment requires an operating restaurant.'},
  editorial:{ar:'تصفح المنيو، اقرأ تفاصيل الطبق، اضبط الإضافات والسلة، أو اختَر فرعًا وتوقيتًا مناسبًا.',en:'Explore dishes, customize the order, review the basket or choose a preferred branch and dining window.'},
  photoAlt:{ar:'صورة فوتوغرافية تحريرية للطعام وتنسيق الطاولة',en:'Editorial food and dining table photography'},
  pillars:[
   {title:{ar:'منيو سهل',en:'A browsable menu'},body:{ar:'تقسيم حسب الوجبات مع تفاصيل واضحة وسعر ظاهر.',en:'Browse dishes by category with visible pricing.'}},
   {title:{ar:'اختيارات الطبق',en:'Dish customization'},body:{ar:'أحجام وإضافات تؤثر في إجمالي الطلب.',en:'Portions and extras incorporated into the total.'}},
   {title:{ar:'معلومات حساسية',en:'Allergen awareness'},body:{ar:'معلومات المكونات تحتاج تأكيدًا من المطبخ قبل الطلب الحقيقي.',en:'Ingredient and allergen information must be approved by the kitchen.'}},
   {title:{ar:'طلب حجز طاولة',en:'Table enquiries'},body:{ar:'اختر الفرع واليوم وعدد الأفراد والموعد المفضل.',en:'Choose branch, party size, day and preferred time.'}}
  ],
  questions:[
   {title:{ar:'هل في حجز مؤكد لحظة الطلب؟',en:'Is my table confirmed immediately?'},body:{ar:'لا. طلب التوقيت يحتاج تأكيدًا من إدارة المطعم.',en:'No. A real operating restaurant must confirm the table.'}},
   {title:{ar:'أقدر أضيف ملاحظات؟',en:'Can I add preferences?'},body:{ar:'نعم، توجد خيارات للطبق وملاحظات للحجز، وينبغي تأكيد الحساسية مباشرةً.',en:'Dish preferences and booking notes are available; confirm allergies with staff.'}},
   {title:{ar:'هل الطلب بيتبعت للمطبخ؟',en:'Does an order reach a kitchen?'},body:{ar:'إرسال الطلب هنا يسجل الاستفسار فقط، ويتطلب التشغيل الحقيقي ربطًا بالمطعم.',en:'The intake records an enquiry; live kitchen fulfillment requires POS integration.'}}
  ],primary:{ar:'تصفح المنيو',en:'View the menu'},primaryPath:'menu',secondary:{ar:'اطلب حجز طاولة',en:'Request a table'},secondPath:'reserve'
 },
 academy:{
  eyebrow:{ar:'التعلم بالممارسة، مش بالوعود',en:'SKILLS THROUGH PRACTICE'},
  heading:{ar:'مسار واضح، دروس منظمة، وقياس تقدّم حقيقي',en:'Build skills with a clear learning path'},
  intro:{ar:'اكتشف المسارات والدورات، تابع الدروس المتاحة، اختبر معلوماتك وأسئلتك وتابع تقدمك؛ المحتوى العملي المتخصص يختلف حسب المقرر.',en:'Choose a career track, explore course outlines, complete lessons and scored quizzes, and see saved progress.'},
  editorial:{ar:'التعلم الجاد يعتمد على مشاريع قابلة للمراجعة وتقييم مفهوم، لا على عدد الدروس وحده.',en:'Meaningful learning requires reviewable work and transparent assessments, not a large lesson counter alone.'},
  photoAlt:{ar:'صورة تحريرية مرجعية للتعلم والدراسة',en:'Editorial reference photograph of focused studying'},
  pillars:[
   {title:{ar:'خريطة تعلم',en:'Learning roadmap'},body:{ar:'تنظيم المهارات من الأساسيات إلى التطبيق.',en:'See how prerequisites lead to applied topics.'}},
   {title:{ar:'تعلم تفاعلي',en:'Active lessons'},body:{ar:'عرض المحتوى مع تتبع الإنجاز والعودة لنفس المسار.',en:'Complete reading activities and resume your progress.'}},
   {title:{ar:'اختبارات مفسّرة',en:'Scored questions'},body:{ar:'أسئلة مع نتيجة توضح ما تحتاج مراجعته.',en:'Receive scored feedback to identify what to revisit.'}},
   {title:{ar:'مشاريع تطبيقية',en:'Practice projects'},body:{ar:'تدريبات مرتبطة بمخرجات قابلة للفحص.',en:'Practical briefs with reviewable learning outcomes.'}}
  ],
  questions:[
   {title:{ar:'هل الشهادات معتمدة؟',en:'Are certificates accredited?'},body:{ar:'لا يُذكر أي اعتماد ما لم توجد جهة مانحة موثقة؛ الإنجاز التعليمي وحده لا يعني اعتمادًا رسميًا.',en:'Accreditation must be independently verified. Course completion does not imply official certification.'}},
   {title:{ar:'أقدر أجرب التعلم قبل التسجيل؟',en:'Can I explore a lesson first?'},body:{ar:'يمكنك تصفح الدروس العامة والاختبارات المتاحة لفهم أسلوب الدراسة.',en:'Explore available preview lessons and sample assessment flows.'}},
   {title:{ar:'الاختبارات تحفظ التقدم؟',en:'Will my progress be remembered?'},body:{ar:'يوجد تقدم محفوظ للجلسة في محرك الدروس؛ الحسابات المؤسسية تتطلب تكاملاً منفصلاً.',en:'The learning interface stores guest-session progress; full user accounts require further integration.'}}
  ],primary:{ar:'اختر مسارًا تعليميًا',en:'Explore learning tracks'},primaryPath:'learning-paths',secondary:{ar:'تصفح الدورات',en:'Browse courses'},secondPath:'courses'
 }
};
const theme:Record<SectorName,{ink:string;paper:string;accent:string;muted:string}>={
 construction:{ink:'#162327',paper:'#F1EEE8',accent:'#A64B26',muted:'#52605A'},
 industrial:{ink:'#12243C',paper:'#EDF2F6',accent:'#895807',muted:'#506276'},
 'real-estate':{ink:'#25312D',paper:'#F1EBE0',accent:'#805333',muted:'#55665A'},
 dental:{ink:'#193A39',paper:'#EAF5F1',accent:'#306D59',muted:'#4E6967'},
 ecommerce:{ink:'#1A1715',paper:'#F8F0E8',accent:'#8A503E',muted:'#766359'},
 portfolio:{ink:'#0F0F10',paper:'#F4F3EE',accent:'#5D6E4A',muted:'#64635D'},
 restaurant:{ink:'#321F18',paper:'#F8EEE0',accent:'#984321',muted:'#795D4D'},
 academy:{ink:'#192A48',paper:'#F1F4FC',accent:'#B74132',muted:'#536078'}
};
export function SectorDepth({sector,locale}:{sector:SectorName;locale:'ar'|'en'}){
 const d=DATA[sector],t=theme[sector],ar=locale==='ar';
 const pick=(p:Pair)=>p[locale];
 const path=(suffix:string)=>`/${locale}/preview/${sector}/${suffix}`;
 const Arrow=ar?ArrowLeft:ArrowRight;
 return <>
  <section aria-labelledby={`sector-${sector}-approach`} className="relative overflow-hidden py-16 sm:py-24" style={{backgroundColor:t.paper}}>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-9 lg:gap-14 items-center">
     <div>
      <p className="text-xs font-bold uppercase tracking-[.2em]" style={{color:t.accent}}>{pick(d.eyebrow)}</p>
      <h2 id={`sector-${sector}-approach`} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mt-4" style={{color:t.ink}}>{pick(d.heading)}</h2>
      <p className="mt-5 text-sm sm:text-base leading-8" style={{color:t.muted}}>{pick(d.intro)}</p>
      <p className="mt-5 text-sm leading-7 font-semibold" style={{color:t.ink}}>{pick(d.editorial)}</p>
      <div className="flex flex-wrap gap-3 mt-8">
       <Link href={path(d.primaryPath)} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-1" style={{backgroundColor:t.ink}}>{pick(d.primary)}<Arrow size={17}/></Link>
       <Link href={path(d.secondPath)} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold border transition-transform hover:-translate-y-1" style={{color:t.ink,borderColor:t.ink}}>{pick(d.secondary)}<ArrowUpRight size={17}/></Link>
      </div>
     </div>
     <figure className="relative overflow-hidden rounded-[2rem] min-h-[320px] sm:min-h-[430px] shadow-[0_28px_80px_rgba(0,0,0,.16)]">
      <img src={SECTOR_IMAGES[sector][1]} alt={pick(d.photoAlt)} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 pt-20">
       <span className="text-white/85 text-xs font-bold uppercase tracking-widest">{pick(d.eyebrow)}</span>
      </div>
     </figure>
    </div>
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
     {d.pillars.map((card,i)=><article key={i} className="rounded-3xl bg-white/90 border border-black/5 p-6 sm:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
      <span className="font-mono text-xs font-bold" style={{color:t.accent}}>{String(i+1).padStart(2,'0')}</span>
      <h3 className="font-extrabold text-lg mt-5 leading-snug" style={{color:t.ink}}>{pick(card.title)}</h3>
      <p className="text-sm leading-7 mt-3" style={{color:t.muted}}>{pick(card.body)}</p>
     </article>)}
    </div>
   </div>
  </section>
  <section className="py-16 sm:py-20 bg-white" aria-labelledby={`sector-${sector}-questions`}>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[.7fr_1.3fr] gap-10">
    <div>
     <span className="text-xs tracking-[.2em] uppercase font-bold" style={{color:t.accent}}>{ar?'أسئلة قبل ما تبدأ':'QUESTIONS WORTH ASKING'}</span>
     <h2 id={`sector-${sector}-questions`} className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight" style={{color:t.ink}}>{ar?'كل التفاصيل اللي تساعدك تقرر بثقة':'Straight answers before you decide'}</h2>
     <div className="flex items-center gap-2 text-sm mt-5" style={{color:t.muted}}><CheckCircle2 size={18} style={{color:t.accent}}/>{ar?'إجابات واضحة بدل الوعود العامة':'Transparent information, without vague promises'}</div>
    </div>
    <div className="space-y-3">{d.questions.map((q,i)=><details key={i} className="group rounded-2xl border border-slate-200 bg-[#FAFAF9] p-5 sm:p-6 open:bg-white open:shadow-md transition-colors">
      <summary className="cursor-pointer font-bold text-base sm:text-lg leading-6" style={{color:t.ink}}>{pick(q.title)}</summary>
      <p className="text-sm leading-7 mt-4" style={{color:t.muted}}>{pick(q.body)}</p>
     </details>)}</div>
   </div>
  </section>
 </>;
}
