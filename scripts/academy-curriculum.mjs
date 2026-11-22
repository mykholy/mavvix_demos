// Subject-specific bilingual learning plans. Each lesson has a distinct practical task.
// General educational material; do not represent completion as professional accreditation.
const TOPICS = {
 'course-01': [
 ['فهم مشكلة البيانات','Frame a Data Question','حدّد قرار مبيعات واحدًا وعرّف المقياس الذي يقيسه قبل فتح ملف البيانات.','Define one sales decision and the metric that could inform it before opening the dataset.'],
 ['فحص الجودة والقيم المفقودة','Audit Missing & Duplicate Values','اصنع جدولاً يوضح عدد السجلات المكررة والمفقودة ونوع المعالجة المقترحة لكل حقل.','Create a missingness and duplicate audit and document a defensible treatment for each field.'],
 ['التوزيعات والقيم الشاذة','Explore Distributions & Outliers','قارن المتوسط والوسيط لأعمار العملاء وحدد لماذا تغيّر القيم المتطرفة القرار.','Compare mean and median customer ages and explain how outliers change interpretation.'],
 ['التقسيم والتحليل المقارن','Segment Data Responsibly','قسّم نتائج الطلبات حسب القناة والمدينة وراجع حجم العينة قبل أي استنتاج.','Segment orders by acquisition channel and city and inspect sample size before drawing conclusions.'],
 ['من النتائج إلى تقرير تنفيذي','Communicate a Decision','اكتب تقرير صفحة واحدة يربط ملاحظة رقمية بقرار وحدود الثقة في البيانات.','Write a one-page decision memo stating a finding, recommended action and data limitations.'],
 ],
 'course-02': [
 ['تعريف مؤشرات الأداء','Define KPI Contracts','عرّف الإيراد الصافي وعدد الطلبات ومتوسط قيمة الطلب ووحدة كل مؤشر.','Specify net revenue, completed orders and average order value with exact units and scope.'],
 ['تصميم نموذج بيانات التقرير','Model Dashboard Data','ارسم علاقة جدول الطلبات بالعملاء والتواريخ دون مضاعفة المبيعات في الربط.','Design a date, customer and orders model that avoids duplicated revenue after joins.'],
 ['ترتيب المعلومات على الشاشة','Build Visual Hierarchy','صمم لوحة تعرض المؤشرات الأساسية أولاً ثم التشخيص حسب الفئة والوقت.','Place core metrics first, then diagnostic breakdowns by segment and time.'],
 ['فلاتر وتفاعل آمن','Design Useful Filters','أضف مرشح تاريخ وقناة وتحقق من اتساق الإجمالي عبر جميع الرسوم.','Add date and channel filters and verify totals reconcile across every visual.'],
 ['تدقيق المؤشرات قبل العرض','Validate Dashboard Accuracy','قارن ثلاثة مؤشرات مع استعلامات قاعدة البيانات واكتب حالات انعدام البيانات.','Reconcile three dashboard values against source queries and document empty states.'],
 ],
 'course-03': [
 ['استعلامات SELECT و WHERE','Select & Filter Rows','استخرج الطلبات المكتملة خلال فترة محددة ورتبها دون حذف سجلات مطلوبة.','Query completed orders in a date window and sort them without dropping relevant rows.'],
 ['العلاقات والربط بين الجداول','Use JOINs Without Duplication','اربط الطلبات بالعملاء وقارن INNER JOIN و LEFT JOIN وعدّ السجلات الناتجة.','Join orders and customers and compare inner versus left joins with row-count checks.'],
 ['التجميع و GROUP BY','Aggregate Reliable Metrics','احسب إجمالي الطلبات وقيمتها لكل شهر واستخدم HAVING لاستبعاد مجموعات صغيرة.','Aggregate monthly orders and revenue, using HAVING for qualifying groups.'],
 ['الاستعلامات المركبة والنوافذ','CTEs & Window Functions','رتب أفضل خمس فئات شهريًا باستخدام CTE و ROW_NUMBER مع توثيق ترتيب التساوي.','Rank the top five categories each month with CTEs and ROW_NUMBER tie rules.'],
 ['فهم EXPLAIN والفهارس','Profile Query Plans','قارن خطة التنفيذ قبل وبعد إنشاء فهرس مناسب ووثّق تأثيره على التصفية.','Compare query plans before and after an appropriate filter index.'],
 ],
 'course-04': [
 ['اختيار السؤال البحثي','Frame a UX Research Question','اكتب سؤال بحث عن خطوة إتمام الشراء وليس سؤالاً عن إعجاب المستخدم بالتصميم.','Frame a research question about checkout behavior rather than asking if someone likes a design.'],
 ['المقابلة دون توجيه','Conduct Neutral Interviews','حضر خمسة أسئلة عن آخر تجربة شراء للمشارك مع أسئلة متابعة غير موجهة.','Prepare five neutral questions about a participant’s most recent purchase experience.'],
 ['رسم رحلة المستخدم','Map the User Journey','ارسم خطوات البحث والمقارنة والدفع وحدد نقاط التعطل والبيانات التي تؤكدها.','Map discovery, evaluation and payment steps and mark evidenced friction points.'],
 ['اختبار Wireframes','Test Low-Fidelity Concepts','اختبر إجراء حجز في نموذج منخفض الدقة دون شرح الخطوات مسبقاً للمشارك.','Test a booking task in a low-fidelity prototype without coaching the participant.'],
 ['تحويل الملاحظات إلى قرارات','Synthesize Research Evidence','اجمع نتائج المشاركين وصنّفها حسب التكرار والأثر قبل اقتراح التعديلات.','Cluster participant observations by frequency and impact before proposing changes.'],
 ],
 'course-05': [
 ['الرموز التصميمية','Create Design Tokens','حدد ألوان الواجهة ومسافات الشبكة والطباعة في نظام قيم قابل لإعادة الاستخدام.','Define reusable color, spacing and typography tokens for a small interface.'],
 ['بناء واجهة مكونات','Design Component Contracts','اكتب حالات الزر والنموذج والبطاقة وحدد المدخلات والمخرجات لكل مكون.','Define button, form and card states with documented component inputs and outputs.'],
 ['أنماط RTL وترجمة الواجهة','Internationalize RTL Layouts','حوّل واجهة قائمة من اتجاه LTR إلى RTL دون قلب الأيقونات التي لا تتغير دلالتها.','Adapt a navigation pattern for RTL while preserving semantic icon direction.'],
 ['إمكانية الوصول','Review Keyboard & Contrast','اختبر التباين والتركيز والتنقل بلوحة المفاتيح لمكونات النموذج.','Audit color contrast, focus visibility and keyboard navigation in a form.'],
 ['حوكمة مكتبة التصميم','Maintain a Component Library','وثق كيفية إضافة مكون جديد ومراجعة التغييرات دون كسر الصفحات القائمة.','Document contribution and regression procedures for a component library.'],
 ],
 'course-06': [
 ['إعداد موجز المحتوى','Build a Content Brief','حدد الجمهور والهدف ومرحلة اتخاذ القرار والدليل المطلوب لكل قطعة محتوى.','Specify audience, goal, buyer stage and supporting evidence for an article.'],
 ['صوت العلامة ونبرتها','Define Brand Voice','اكتب نسختين من رسالة واحدة لنشاط احترافي مع معايير واضحة للنبرة.','Rewrite the same core message in two tones while preserving factual claims.'],
 ['العناوين الواضحة','Write Useful Headlines','اكتب خمسة عناوين تشرح النتيجة الحقيقية دون مبالغة أو وعود غير مثبتة.','Create five outcome-oriented headings without unsupported guarantees.'],
 ['مراجعة النصوص والتحقق','Edit & Fact-Check Copy','راجع نصًا تسويقيًا وحدد الادعاءات التي تحتاج مصدرًا واستبدل الغامض.','Edit promotional copy, flag unsupported claims and remove vague language.'],
 ['صياغة عربية وإنجليزية مستقلة','Localize for Meaning','صغ صفحة خدمات بالعربية والإنجليزية تراعي اختلاف الأسلوب دون ترجمة حرفية.','Author equivalent Arabic and English service descriptions without literal translation.'],
 ],
 'course-07': [
 ['فهم شرائح الجمهور','Segment Your Audience','حدد شريحتين من العملاء واحتياجات كل واحدة قبل اقتراح أي منشور.','Define two audience segments and the problems each one needs solved.'],
 ['محاور محتوى قابلة للاستمرار','Develop Content Pillars','أنشئ أربعة محاور تغطي التوعية والمقارنة والدليل والتواصل.','Create four durable pillars spanning education, evaluation, evidence and conversion.'],
 ['تقويم نشر عملي','Plan an Editorial Calendar','وزع ثمانية موضوعات على أسبوعين مع الهدف والمالك ومؤشر القياس.','Schedule eight topics over two weeks with owners, objectives and measurement.'],
 ['بنية المقال والبحث','Structure Content for Discovery','ابنِ مخطط مقال يستجيب لنية البحث ويستخدم أمثلة دون حشو كلمات مفتاحية.','Outline an article matching search intent with examples rather than keyword stuffing.'],
 ['تقييم أثر المحتوى','Measure Qualified Interest','قارن زيارات المقال ونقرات التواصل والاستفسارات المؤهلة دون الخلط بينها.','Distinguish article traffic, contact clicks and qualified business inquiries.'],
 ],
 'course-08': [
 ['الجمهور والعرض','Match Offer to Audience','اكتب عرضًا لصفحة هبوط يحدد العميل المستهدف والمشكلة والنتيجة المتوقعة.','Write a landing-page proposition defining audience, problem and realistic outcome.'],
 ['تسلسل السكاشن','Structure the Persuasion Flow','رتب Hero ومزايا ودليل عمل وأسئلة شائعة و CTA حسب أسئلة المشتري.','Sequence hero, capabilities, proof, FAQ and CTA around buyer objections.'],
 ['تقليل احتكاك الفورم','Reduce Form Friction','راجع نموذج استفسار واحذف حقولًا غير ضرورية مع الحفاظ على جودة البيانات.','Remove unnecessary inquiry fields while retaining essential lead quality.'],
 ['اختبار فرضية واحدة','Design an A/B Hypothesis','قارن عنوانين مختلفين فقط وسجّل مدة التجربة ومقياس النجاح قبل البدء.','Plan a one-variable headline experiment with predefined success criteria.'],
 ['قياس التحويلات الفعلية','Track Meaningful Conversions','ميز أحداث عرض الصفحة ونقر واتساب والاستفسار المقبول وراجع التكرار.','Separate page views, WhatsApp clicks and accepted leads; audit duplicate events.'],
 ],
 'course-09': [
 ['القيم والأنواع في JavaScript','Understand Values & Types','اكتب دالة تعالج السعر والكمية وتتجنب جمع النصوص كأنها أرقام.','Build a price calculator handling numeric conversion and invalid inputs.'],
 ['الوظائف والنطاق','Functions & Scope','قسم منطق نموذج طلب إلى دوال صغيرة دون الاعتماد على متغيرات عامة متغيرة.','Refactor form processing into small functions without mutable global state.'],
 ['المصفوفات والكائنات','Transform Arrays & Objects','اجمع مبالغ الطلبات حسب الفئة باستخدام map و filter و reduce مع الاختبارات.','Aggregate order totals by category using map, filter and reduce with tests.'],
 ['العمليات غير المتزامنة','Promises & Async/Await','نفذ طلب بيانات API مع معالجة مهلة الانتظار والاستجابة غير الصالحة.','Fetch API data with explicit timeout and malformed-response handling.'],
 ['تنظيم الوحدات والتصحيح','Modules & Debugging','قسّم مشروعًا صغيرًا إلى وحدات وراجع أثر الأخطاء باستخدام Debugger.','Split a small project into modules and debug execution with breakpoints.'],
 ],
 'course-10': [
 ['بناء مكونات مستقلة','Compose React Components','قسم صفحة منتجات إلى Header و ProductCard و FilterPanel بمسؤوليات واضحة.','Split a catalog into Header, ProductCard and FilterPanel responsibilities.'],
 ['الحالة والفورمات','Manage State & Forms','ابنِ نموذجًا متحكمًا يتحقق من الاسم والكمية ويحافظ على عرض الأخطاء.','Create a controlled form validating contact name and quantity with clear errors.'],
 ['جلب البيانات والآثار','Handle Effects & Data','حمّل قائمة منتجات مع حالات التحميل والخطأ وإلغاء الطلب السابق.','Fetch product data with loading, error and cancellation behavior.'],
 ['اختبارات الواجهة والوصول','Test User Interactions','اكتب اختبارًا لإضافة منتج ثم إزالته وتحقق من التنقل بلوحة المفاتيح.','Test adding and removing an item and keyboard navigation across controls.'],
 ['تقليل الرندر والتحسين','Profile React Performance','افحص سبب إعادة الرندر وقارن التحسين الفعلي قبل إضافة memo في كل مكان.','Profile unnecessary rerenders and validate improvements before applying memoization.'],
 ],
 'course-11': [
 ['تصميم الموارد والـ HTTP','Model REST Resources','صمم مسارات CRUD للطلبات واختر أفعال HTTP وأكواد الحالة الصحيحة.','Design order CRUD endpoints with appropriate methods and response codes.'],
 ['التحقق والتعاقدات','Validate API Contracts','عرّف Schema للطلب وارفض السعر السلبي والحقول الناقصة دون أخطاء 500.','Validate payload schemas, rejecting negative prices and missing fields with 4xx responses.'],
 ['التوثيق والصلاحيات','Authentication & Authorization','فرق بين هوية المستخدم وصلاحية تعديل الطلب واختبر وصول المستخدم غير المصرح.','Separate authentication from authorization and test forbidden mutations.'],
 ['منع التكرار وحالات السباق','Idempotency & Concurrency','طبق مفتاح منع التكرار على إنشاء الطلب وناقش المعاملات وقفل السجلات.','Design idempotency keys for order creation and discuss transactional consistency.'],
 ['الرصد وتوثيق الأخطاء','Observability & Error Contracts','أضف معرف طلب وسجلات آمنة ورسالة خطأ لا تكشف بيانات حساسة.','Add request IDs, safe logs and client errors that do not expose secrets.'],
 ],
 'course-12': [
 ['رسم خريطة الفرص','Map the Opportunity Space','اكتب مشكلة عميل بصياغة سلوكية وحدد البدائل التي يستخدمها الآن.','Write a behavioral problem statement and map existing alternatives.'],
 ['مقابلات اكتشاف','Interview for Real Behavior','اطلب من خمسة مشاركين وصف آخر مرة واجهوا فيها المشكلة وسجل الأدلة.','Ask five participants to recount their last real problem experience.'],
 ['فهم المهمة المطلوبة','Use Jobs to Be Done','حدد السياق والدافع والنتيجة المرجوة دون الاكتفاء بطلب ميزة جديدة.','Identify situation, motivation and desired outcome beyond feature requests.'],
 ['اختبار MVP ضيق','Prototype a Focused MVP','ابنِ نموذجًا يحل خطوة واحدة واختبر استعداد المستخدم لتغيير سلوكه.','Prototype one narrow workflow and test whether users change behavior.'],
 ['مقاييس قرار المنتج','Choose Decision Metrics','حدد مؤشر تفعيل واحتفاظ ومقياس منع تدهور قبل إطلاق الميزة.','Define activation, retention and guardrail metrics before rollout.'],
 ]
};
export function getLessonPlan(courseId, sequence) {
 const idx=Math.max(0,Math.min(4,Number(sequence||1)-1));
 const row=TOPICS[courseId]?.[idx];
 if(!row)throw new Error(`Missing authored lesson plan for ${courseId} lesson ${sequence}`);
 const [titleAr,titleEn,labAr,labEn]=row;
 return {
  titleAr,titleEn,
  summaryAr:`الدرس ${sequence}: ${titleAr}. الهدف هو تحويل المفهوم إلى تطبيق صغير يمكن مراجعته وتقييمه بدل الاكتفاء بالمصطلحات.`,
  summaryEn:`Lesson ${sequence}: ${titleEn}. Turn the core concept into a small, reviewable artifact with explicit criteria.`,
  transcriptAr:`نتعلم في هذا الدرس «${titleAr}» باعتباره جزءاً عملياً من مهارات المقرر. نبدأ بتحديد المشكلة وحدودها، وتوضيح نوع البيانات أو الأدوات المطلوبة قبل اتخاذ القرار. ثم نناقش خطوات التنفيذ بترتيب واضح، ونقارن بين إجراء سريع لكنه غير موثوق وطريقة يمكن مراجعتها والتحقق من نتيجتها. التمرين العملي: ${labAr} بعد التنفيذ، راجع جودة النتيجة مع زميل أو باستخدام اختبار بسيط؛ سجل الافتراضات وما الذي لا يمكن إثباته من البيانات الحالية. ينبغي أن يكون الناتج قابلاً للعرض والفهم دون معرفة سياق الشخص الذي أنجزه، وأن يتضمن سبب اختيار النهج وما ستغيره في النسخة التالية.`,
  transcriptEn:`This lesson focuses on ${titleEn.toLowerCase()} through a reviewable practical workflow. Start by defining the problem, its constraints and the tools or data necessary for a reasoned decision. Break down the implementation into small steps and compare a quick but unreliable approach with one that can be independently checked. Your practical task: ${labEn} After completing the task, review output quality with a peer or a simple test; record assumptions and explicitly note what cannot be established from the available evidence. The deliverable should be understandable without the author explaining every step and should articulate why the approach was chosen and what would be improved next.`,
  exerciseAr:`تطبيق الدرس: ${labAr} سلّم ملفاً أو لقطة أو استعلاماً يمكن التحقق منه، مع ثلاثة معايير قبول وحدود النتيجة.`,
  exerciseEn:`Applied exercise: ${labEn} Submit a reviewable artifact, three acceptance criteria and a note on limitations.`,
 };
}
export const authoredLessonCount=Object.values(TOPICS).reduce((sum,list)=>sum+list.length,0);
