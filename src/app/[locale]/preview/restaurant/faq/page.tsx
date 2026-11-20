import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { RestaurantFaqClient } from './RestaurantFaqClient';

export default function RestaurantFaqPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const isAr = locale === 'ar';

  const faqs = [
    {
      id: 'faq-01',
      category: 'allergens',
      question: isAr ? 'كيف تتعاملون مع مسببات الحساسية والتلامس العرضي في المطبخ؟' : 'How does your kitchen manage food allergens and cross-contact?',
      answer: isAr
        ? 'نوضح مسببات الحساسية الرئيسية (المكسرات، الألبان، الجلوتين، البيض) بوضوح على كل طبق. وعلى الرغم من استخدام أدوات منفصلة ومحطات تحضير معزولة للأطباق الخالية من المكسرات أو الجلوتين، فإن مطبخنا الحرفي مشترك ولا يمكننا تقديم ضمان طبي بنسبة ١٠٠٪ بعدم حدوث تلامس عرضي غير مقصود.'
        : 'We transparently disclose all major allergens (tree nuts, dairy, gluten, eggs) on each dish dossier. While separate sanitized utensils and preparation stations are maintained for allergen-conscious orders, our artisan kitchen is integrated, and we cannot medically guarantee zero cross-contact.'
    },
    {
      id: 'faq-02',
      category: 'allergens',
      question: isAr ? 'هل تتوفر خيارات نباتية كاملة (خالية من اللحوم ومشتقات الألبان)؟' : 'Are wholesome vegan and vegetarian options available?',
      answer: isAr
        ? 'نعم، المطبخ الشرقي بطبيعته غني بالأطباق النباتية الأصيلة مثل الحمص بالطحينة، الفول المدمس بزيت الزيتون، سلطة الفتوش، بابا غنوج المدخن، وفطائر السبانخ بالأعشاب البرية. يمكنك تصفية القائمة بضغطة زر لرؤية الأطباق النباتية فقط.'
        : 'Yes, Eastern cuisine is naturally abundant in whole plant-based options including stone-ground hummus, fava beans in extra virgin olive oil, fattoush, fire-charred baba ghanoush, and wild zaatar fatayer. Our digital menu features a one-click vegetarian filter.'
    },
    {
      id: 'faq-03',
      category: 'allergens',
      question: isAr ? 'ما هو مصدر الزعفران وزيت الزيتون المستخدم في المطبخ؟' : 'Where are your saffron and olive oils sourced?',
      answer: isAr
        ? 'نستورد الزعفران الجبلي النقي من مزارع جبلية عالية الارتفاع في صورة خيوط حمراء كاملة، ونستخدم زيت زيتون بكر ممتاز معصور على البارد من أول عصرة دون أي زيوت نباتية مهدرجة أو مكررة.'
        : 'We source pure high-altitude crocus saffron threads harvested at dawn. All cooking utilizes first-press cold extra virgin olive oil, completely free of hydrogenated seed oils.'
    },
    {
      id: 'faq-04',
      category: 'reservations',
      question: isAr ? 'ما هو الحد الأقصى لحجم المجموعة عند طلب حجز طاولة إلكترونيًا؟' : 'What is the maximum party size for online table requests?',
      answer: isAr
        ? 'يتيح نظام الحجز التجريبي اختيار حتى ٨ ضيوف للحفاظ على انسيابية الخدمة. للمجموعات التي تتجاوز ٨ أفراد أو للمناسبات العائلية الكبرى، نوفر صالونات خاصة تتطلب تنسيقًا مباشرًا مسبقًا.'
        : 'Our interactive reservation wizard accommodates up to 8 guests. For banquet gatherings exceeding 8 individuals, private dining salons are coordinated directly to ensure unhurried service.'
    },
    {
      id: 'faq-05',
      category: 'reservations',
      question: isAr ? 'هل يمثل إرسال طلب الحجز تأكيدًا فوريًا للطاولة؟' : 'Does submitting a table request constitute an instant guaranteed seat?',
      answer: isAr
        ? 'في هذا النموذج الاستعراضي، يتم تسجيل الطلب بحالة "قيد المراجعة" (REQUESTED) في قاعدة البيانات المحلية، لتوضيح كيفية استقبال الطاقم للطلبات ومطابقتها مع السعة المتاحة قبل التأكيد النهائي.'
        : 'In this demonstration model, requests are logged into SQLite with status REQUESTED to illustrate the host review and seating allocation workflow prior to guest confirmation.'
    },
    {
      id: 'faq-06',
      category: 'reservations',
      question: isAr ? 'كيف تختلف مواعيد العمل في يوم الجمعة المباركة؟' : 'How do operating hours differ on Fridays?',
      answer: isAr
        ? 'تفتح فروعنا أبوابها يوم الجمعة بعد انقضاء صلاة الجمعة عند الساعة ١:٠٠ ظهرًا، وتستمر في استقبال الضيوف حتى منتصف الليل أو الواحدة صباحًا حسب الفرع المختار.'
        : 'All branches commence service on Friday following congregational prayers at 1:00 PM, remaining open through midnight or 1:00 AM depending on the selected pavilion.'
    },
    {
      id: 'faq-07',
      category: 'ordering',
      question: isAr ? 'كم يستغرق تجهيز طلبات الاستلام التجريبية؟' : 'What is the estimated preparation window for takeaway orders?',
      answer: isAr
        ? 'نظرًا لأن أطباقنا تُطهى وتُشوى طازجة، فإن متوسط وقت التجهيز يتراوح بين ٢٠ إلى ٣٠ دقيقة حسب حجم الطلب ونوع الأطباق الرئيسية.'
        : 'Because dishes are finished to order over flame and in earthen ovens, preparation windows average 20 to 30 minutes depending on order volume.'
    },
    {
      id: 'faq-08',
      category: 'ordering',
      question: isAr ? 'ما هي رسوم التغليف التجريبية المضافة إلى ملخص الطلب؟' : 'What does the sample packaging fee cover?',
      answer: isAr
        ? 'تغطي رسوم التغليف التوضيحية (١٥ ج.م) استخدام علب كرتونية حرارية صديقة للبيئة وقابلة للتحلل تحفظ حرارة الطعام الفخاري ونكهته حتى الوصول للمنزل.'
        : 'The demonstrative 15 EGP packaging fee accounts for thermal eco-friendly compostable containers designed to preserve tagine heat and aromatic moisture.'
    },
    {
      id: 'faq-09',
      category: 'ordering',
      question: isAr ? 'هل اللحوم والدواجن حلال معتمدة؟' : 'Are all meats and poultry certified Halal?',
      answer: isAr
        ? 'نعم، كافة اللحوم البلدية والدواجن المستخدمة في سفرة زعفران مذبوحة وفق الشريعة الإسلامية وخاضعة لرقابة بيطرية وصحية دقيقة.'
        : 'Yes, 100% of all lamb, beef, and poultry utilized across our kitchens adhere to strict verified Halal slaughter and veterinary standards.'
    },
    {
      id: 'faq-10',
      category: 'demo',
      question: isAr ? 'ما هي طبيعة هذا الموقع الإلكتروني وعلاقته بشركة مافيكس (Mavvix)؟' : 'What is the nature of this platform and its relationship to Mavvix?',
      answer: isAr
        ? 'هذا الموقع هو نموذج تجاري تفاعلي عالي الجودة صممته وطورته مافيكس (Mavvix) لعرض حلولها التقنية لقطاع المطاعم والضيافة. لا يقوم الموقع بمعالجة بطاقات ائتمان فعلية أو إرسال طلبات حقيقية للمطابخ.'
        : 'This website is a production-grade interactive showcase engineered by Mavvix to exhibit mobile-first ordering, dish modifiers, and reservation platforms for hospitality brands. No financial transactions or kitchen dispatches occur.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#321F18]/10 pb-8 space-y-3 text-start">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'الشفافية والمعلومات' : 'Transparency & Policies'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {isAr ? 'الأسئلة الشائعة وسياسات المطبخ' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-sm text-[#321F18]/70 max-w-2xl leading-relaxed">
          {isAr
            ? 'إجابات تفصيلية حول مسببات الحساسية، مصادر المكونات، سياسات حجز الطاولات، والتوضيحات التقنية لنموذج العرض.'
            : 'Detailed clarity regarding kitchen allergen protocols, pure sourcing, table booking windows, and concept demo boundaries.'}
        </p>
      </div>

      <RestaurantFaqClient faqs={faqs} locale={locale} />
    </div>
  );
}

