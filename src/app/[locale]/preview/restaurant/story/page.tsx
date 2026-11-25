import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';

export default async function RestaurantStoryPage(
  props: {
    params: Promise<{ locale: Locale }>;
  }
) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';

  const sourcingPillars = [
    {
      title: isAr ? 'الذهب الأحمر: الزعفران الجبلي النقي' : 'Red Gold: Mountain Crocus Saffron',
      desc: isAr
        ? 'نعتمد فقط على خيوط الزعفران الكاملة من الدرجة الأولى، المقطوفة يدويًا في ساعات الفجر الأولى قبل تفتح الشمس للبتلات للحفاظ على الزيوت العطرية النقية.'
        : 'We source exclusively unadulterated crimson stigmas picked at dawn, preserving delicate volatile saffronals before morning sun wilts the blooms.',
      metric: isAr ? '١٠٠٪ نقي' : '100% Pure'
    },
    {
      title: isAr ? 'زيت زيتون بكر معصور على البارد' : 'Cold-Pressed Extra Virgin Olive Oil',
      desc: isAr
        ? 'زيت زيتون معصور من أول عصرة على البارد دون أي معالجة حرارية أو كيميائية، يمنح الأطباق مرارة نباتية ناعمة ونقاء يريح الهضم.'
        : 'First cold-press oil harvested from ancient Mediterranean groves, bringing a vibrant peppery finish and effortless digestibility.',
      metric: isAr ? 'عصرة أولى' : 'First Press'
    },
    {
      title: isAr ? 'فخار طبيعي وطهي هادئ بالصبر' : 'Natural Earthen Clay & Gentle Heat',
      desc: isAr
        ? 'نطبخ اللحوم والخضار في طواجن طينية غير مطلية كيميائيًا، مما يسمح للبخار بالدوران الطبيعي وتكثيف النكهات في ألياف المكونات.'
        : 'Cooking in porous clay tagines allows natural steam circulation, locking in moisture and deeply infusing meats without high-pressure scorch.',
      metric: isAr ? '٥ ساعات طهي' : '5-Hour Braise'
    },
    {
      title: isAr ? 'توابل تُطحن طازجة كل صباح' : 'Whole Spices Stone-Ground Daily',
      desc: isAr
        ? 'لا نستخدم التوابل الجاهزة مسبقة الطحن؛ بل نحمص حبات الهيل، الكمون، والكزبرة ونطحنها في مطحنة الحجر داخل مطبخنا صباح كل يوم.'
        : 'We never buy pre-ground powder; coriander, cardamom, and cumin are lightly toasted and stone-ground fresh every single dawn.',
      metric: isAr ? 'طحن يومي' : 'Daily Grind'
    }
  ];

  const seasonalRhythms = [
    {
      season: isAr ? 'الربيع والأعشاب البرية' : 'Spring & Wild Mountain Foraging',
      dishes: isAr ? 'سلطات الهندباء، الجبن الأبيض بحبة البركة، وفطائر السبانخ بالأعشاب' : 'Wild chicory mezze, aged nigella cheeses, hearth-baked wild herb fatayer'
    },
    {
      season: isAr ? 'الصيف ودبس الرمان النيلي' : 'Summer & Sun-Ripened Red Fruits',
      dishes: isAr ? 'طماطم العنب المشوية، متبل الباذنجان المدخن، ومشروبات التوت والكركديه المثلجة' : 'Blistered vine tomatoes, fire-charred eggplant tahini, iced wild hibiscus tea'
    },
    {
      season: isAr ? 'الخريف وحصاد السفرجل' : 'Autumn Quinces & Heritage Grains',
      dishes: isAr ? 'طواجن اللحم بالزعفران والسفرجل، أرز البسمتي المعتق، وشوربة العدس بالكمون' : 'Lamb tagine with poached quinces, spiced basmati, slow cumin lentil pot'
    },
    {
      season: isAr ? 'الشتاء ودفء المرق العطري' : 'Winter Broths & Spiced Hearth Feasts',
      dishes: isAr ? 'حساء الكوارع الشرقي بالهيل، بودينغ التمر بالكراميل والزعفران، وشاي الزنجبيل' : 'Cardamom bone broths, warm saffron date puddings, spiced ginger infusions'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-start">
      {/* Page Header */}
      <div className="border-b border-[#321F18]/10 pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
          {isAr ? 'فلسفة المطبخ وتراث التوابل' : 'Culinary Heritage & Philosophy'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
          {isAr ? 'حكاية سفرة زعفران ومصادر المكونات' : 'The Story of Fire, Spice & Hospitality'}
        </h1>
        <p className="text-sm sm:text-base text-[#321F18]/80 max-w-3xl leading-relaxed">
          {isAr
            ? 'تأسست سفرة زعفران كتحية للمطابخ الشرقية العريقة التي تعامل الطعام كفن ضيافة وشعيرة حب عائلية، بعيدًا عن ثقافة الوجبات السريعة والتصنيع التجاري.'
            : 'Saffron Table was founded as a homage to centuries-old Levantine and Egyptian hospitality, where a meal is an immersive gathering of unhurried patience, wholesome ingredients, and open generosity.'}
        </p>
      </div>

      {/* Sourcing Pillars Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18]">
            {isAr ? 'أركان الجودة ومصادر المكونات' : 'Our Sourcing Standards'}
          </h2>
          <span className="text-xs text-[#8B8B52]">
            {isAr ? 'شفافية كاملة في كل وجبة' : 'Total transparency in every bowl'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sourcingPillars.map((pillar, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-[#321F18]/15 space-y-4 shadow-sm hover:border-[#BA5C34] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-[#BA5C34]">{pillar.metric}</span>
                <span className="w-8 h-8 rounded-full bg-[#FAF3E6] text-[#321F18] flex items-center justify-center text-xs font-bold font-mono">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#321F18]">{pillar.title}</h3>
              <p className="text-xs text-[#321F18]/75 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Rhythms */}
      <section className="bg-white rounded-3xl border border-[#321F18]/15 p-8 sm:p-12 space-y-8">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
            {isAr ? 'دورة الفصول والمواسم' : 'Four Seasons at Saffron Table'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18]">
            {isAr ? 'قائمة تتغير مع مواسم الأرض' : 'A Menu Governed by Agricultural Rhythms'}
          </h2>
          <p className="text-xs sm:text-sm text-[#321F18]/70 max-w-2xl">
            {isAr
              ? 'لا نعتمد على استيراد المكونات خارج مواسمها؛ بل نترك الأرض تقود ما نقدمه في كل فصل لضمان أعلى درجات النكهة والقيمة الغذائية.'
              : 'We do not force out-of-season produce with chemical preservatives; we align our seasonal dishes with natural harvest abundance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {seasonalRhythms.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-3 flex flex-col justify-between"
            >
              <h3 className="font-serif text-base font-bold text-[#321F18]">{item.season}</h3>
              <p className="text-xs text-[#321F18]/70 leading-relaxed">{item.dishes}</p>
              <div className="pt-2 border-t border-[#321F18]/10 text-[10px] text-[#8B8B52] font-semibold">
                {isAr ? 'أطباق طازجة ومحدودة' : 'Limited Seasonal Batches'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kitchen Ethics & Concept Transparency Note */}
      <div className="p-8 rounded-3xl bg-[#321F18] text-[#FAF3E6] space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#BA5C34]">
          {isAr ? 'شفافية العرض المفهومي' : 'Demo Concept Transparency'}
        </span>
        <h3 className="font-serif text-xl font-bold">
          {isAr ? 'علامة تجارية توضيحية من ابتكار مافيكس' : 'A Mavvix Interactive Hospitality Concept'}
        </h3>
        <p className="text-xs text-white/80 leading-relaxed max-w-3xl">
          {isAr
            ? 'سفرة زعفران هي علامة تجارية افتراضية بالكامل طورتها شركة مافيكس (Mavvix) كنموذج استعراضي تجاري لإبراز إمكانيات بناء منصات المطاعم الحديثة. النصوص الوصفية والقصص التراثية تعبر عن رؤية إبداعية، ولا تتضمن أي شهادات عملاء ملفقة أو ادعاءات تجارية مضللة.'
            : 'Saffron Table is an entirely fictional concept brand crafted by Mavvix to demonstrate advanced restaurant e-commerce, real-time dish customization, and table booking workflows. No real client reviews or fabricated supplier endorsements are featured.'}
        </p>
        <div className="pt-2">
          <Link
            href={`/${locale}/preview/restaurant/menu`}
            className="inline-block px-5 py-2.5 rounded-xl bg-[#BA5C34] text-white text-xs font-semibold hover:bg-[#9E4A28] transition-colors"
          >
            {isAr ? 'استكشف قائمة الأطباق التراثية ←' : 'Browse Heritage Dishes →'}
          </Link>
        </div>
      </div>
    </div>
  );
}

