'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Utensils, Users, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Sparkles, ShieldCheck, Flame, Heart } from 'lucide-react';

interface CourseDish {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  priceEgp: number;
  dietary: ('veg' | 'gf' | 'df')[];
  allergens: string[];
}

const COURSES: {
  category: 'starters' | 'mains' | 'grains' | 'desserts';
  nameEn: string;
  nameAr: string;
  dishes: CourseDish[];
}[] = [
  {
    category: 'starters',
    nameEn: 'Course 1 — Mezze & Saffron Starters',
    nameAr: 'المرحلة الأولى — المقبلات والمزة الزعفرانية',
    dishes: [
      { id: 'm-hummus', nameEn: 'Saffron & Pine Nut Velvety Hummus', nameAr: 'حمص ناعم بزيت الزعفران وحبوب الصنوبر', descEn: 'Slow-cooked heirloom chickpeas, cold-pressed olive oil, mountain saffron drizzle.', descAr: 'حمص بلدي مطهو على نار هادئة مع زيت الزعفران المعصور على البارد.', priceEgp: 145, dietary: ['veg', 'gf', 'df'], allergens: [] },
      { id: 'm-mutabbal', nameEn: 'Charred Eggplant & Pomegranate Mutabbal', nameAr: 'متبل باذنجان مشوي على الحطب بحبات الرمان', descEn: 'Wood-smoked eggplant pulp, sesame tahini, ruby pomegranate pearls.', descAr: 'لب باذنجان مدخن على خشب الزيتون مع الطحينة السمسمية والرمان.', priceEgp: 160, dietary: ['veg', 'gf'], allergens: ['sesame'] },
      { id: 'm-sambusek', nameEn: 'Braised Spiced Lamb & Pine Sambusek', nameAr: 'سمبوسك رقائقي بلحم الضأن والبهار البلدي', descEn: 'Hand-laminated flaky pastry filled with spiced lamb and toasted pine nuts.', descAr: 'عجين مورق يدويًا محشو بلحم الضأن المتبل والصنوبر المحمص.', priceEgp: 195, dietary: [], allergens: ['gluten'] }
    ]
  },
  {
    category: 'mains',
    nameEn: 'Course 2 — Clay Tagines & Hearth Charcoal',
    nameAr: 'المرحلة الثانية — طواجن الفخار ومشاوي الحطب',
    dishes: [
      { id: 'm-tagine-lamb', nameEn: 'Slow-Braised Lamb Shank Tagine with Saffron & Prunes', nameAr: 'طاجن موزة الضأن المطهوة ببطء مع الزعفران والبرقوق', descEn: '8-hour convective clay simmering, caramelized dried apricots, toasted almonds.', descAr: 'طهو فخاري متأنٍ لمدة ٨ ساعات مع المشمش المعسل واللوز المحمص.', priceEgp: 480, dietary: ['gf', 'df'], allergens: ['nuts'] },
      { id: 'm-seabass', nameEn: 'Wood-Roasted Red Sea Bass with Saffron Chermoula', nameAr: 'سمك القاروص المشوي على الحطب بتتبيلة الشرمولة والزعفران', descEn: 'Charcoal-grilled Mediterranean wild catch, crushed coriander seeds, preserved lemon.', descAr: 'سمك طازج مشوي على الفحم الطبيعي مع الكزبرة والليمون المعصفر.', priceEgp: 520, dietary: ['gf', 'df'], allergens: ['fish'] },
      { id: 'm-vegetable-pot', nameEn: 'Heirloom Root Vegetable & Artichoke Clay Stew', nameAr: 'طاجن الخضار التراثية والخرشوف البري بالفخار', descEn: 'Nile Valley baby carrots, artichoke hearts, saffron broth, garden herbs.', descAr: 'خرشوف طازج وجزر بلدي في مرق الزعفران الصافي والأعشاب العطرية.', priceEgp: 310, dietary: ['veg', 'gf', 'df'], allergens: [] }
    ]
  },
  {
    category: 'grains',
    nameEn: 'Course 3 — Heritage Breads & Persian Saffron Grains',
    nameAr: 'المرحلة الثالثة — المخبوزات الحجرية والأرز الزعفراني',
    dishes: [
      { id: 'm-saffron-rice', nameEn: 'Steamed Saffron & Barberry Jeweled Basmati', nameAr: 'أرز بسمتي فاخر منقوع بالزعفران وحبات الزرشك', descEn: 'Aged long-grain rice steeped in crimson saffron, clarified butter, tart barberries.', descAr: 'أرز حبة طويلة معتق منقوع بخلاصة الزعفران والزبدة النقية.', priceEgp: 140, dietary: ['gf'], allergens: ['dairy'] },
      { id: 'm-hearth-bread', nameEn: 'Wood-Fired Hearth Sourdough Flatbread Basket', nameAr: 'سلة خبز التنور الساخن المخمر طبيعيًا على الحجر', descEn: '48-hour levain fermentation, sesame seed crust, baked fresh upon order.', descAr: 'تخمير طبيعي لمدة ٤٨ ساعة، مخبوز على الحجر الساخن لحظة الطلب.', priceEgp: 75, dietary: ['veg', 'df'], allergens: ['gluten', 'sesame'] }
    ]
  },
  {
    category: 'desserts',
    nameEn: 'Course 4 — Artisan Confectionery',
    nameAr: 'المرحلة الرابعة — الحلويات التراثية الفاخرة',
    dishes: [
      { id: 'm-baklava', nameEn: 'Crisp Pistachio Baklava with Orange Blossom Honey', nameAr: 'بقلاوة مقرمشة بالفستق الحلبي وعسل زهر البرتقال', descEn: '40 whisper-thin phyllo layers, clarified butter, green Antep pistachios.', descAr: 'أربعون طبقة رقائق هشة محشوة بأجود الفستق الأخضر وقطر زهر البرتقال.', priceEgp: 185, dietary: ['veg'], allergens: ['gluten', 'nuts', 'dairy'] },
      { id: 'm-mahalabiya', nameEn: 'Silky Cardamom & Saffron Infused Milk Pudding', nameAr: 'مهلبية الحليب الطازج بالهيل والزعفران وماء الورد', descEn: 'Full-cream Nile dairy, crushed green cardamom pods, edible gold leaf.', descAr: 'حليب بلدي كامل الدسم مع حب الهال الأخضر وخيوط الزعفران القرمزية.', priceEgp: 155, dietary: ['veg', 'gf'], allergens: ['dairy'] }
    ]
  }
];

export function SaffronTastingMenuBuilder({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedDishes, setSelectedDishes] = useState<Record<string, string>>({
    starters: 'm-hummus',
    mains: 'm-tagine-lamb',
    grains: 'm-saffron-rice',
    desserts: 'm-baklava'
  });

  const selectDishForCourse = (courseKey: string, dishId: string) => {
    setSelectedDishes(prev => ({ ...prev, [courseKey]: dishId }));
  };

  const currentSelectionItems = Object.entries(selectedDishes).map(([courseKey, dishId]) => {
    const courseObj = COURSES.find(c => c.category === courseKey);
    return courseObj?.dishes.find(d => d.id === dishId);
  }).filter(Boolean) as CourseDish[];

  const costPerGuest = currentSelectionItems.reduce((sum, d) => sum + d.priceEgp, 0);
  const totalBanquetCost = costPerGuest * guestCount;

  return (
    <section className="bg-white rounded-[2rem] border border-[#321F18]/15 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8" aria-labelledby="tasting-builder-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#321F18]/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#984321] font-bold">
            <Utensils className="w-4 h-4 text-[#984321]" />
            <span>{isAr ? 'منظم الولائم ومأدبة التذوق' : 'Bespoke Banquet & Tasting Menu Builder'}</span>
          </div>
          <h2 id="tasting-builder-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#321F18]">
            {isAr ? 'صمم مأدبتك الشرقية المتكاملة' : 'Compose Your Heritage Tasting Experience'}
          </h2>
          <p className="text-xs sm:text-sm text-[#321F18]/75 max-w-2xl font-sans leading-relaxed">
            {isAr
              ? 'اختر عدد الضيوف وطبقًا من كل مرحلة طهي لتركيب مأدبة تذوق متوازنة، واستكشف التكلفة التقديرية بدقة مع مراعاة المكونات ومسببات الحساسية.'
              : 'Select your dining party size and curate one dish per culinary course to compose a balanced gastronomic banquet with transparent live pricing.'}
          </p>
        </div>

        {/* Guest Count Selector */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#321F18]/15 font-mono text-xs">
          <span className="px-3 text-[#321F18] font-bold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#984321]" />
            <span>{isAr ? 'الضيوف:' : 'Party:'}</span>
          </span>
          {[2, 4, 6, 8].map(count => (
            <button
              key={count}
              type="button"
              onClick={() => setGuestCount(count)}
              className={`w-9 h-9 rounded-xl font-bold transition-all ${
                guestCount === count
                  ? 'bg-[#321F18] text-[#FAF3E6] shadow-sm'
                  : 'text-[#321F18]/70 hover:text-[#321F18] hover:bg-white'
              }`}
              aria-label={isAr ? `${count} ضيوف` : `${count} guests`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 4 Courses Accordion/Selector */}
        <div className="lg:col-span-7 space-y-6">
          {COURSES.map(course => (
            <div key={course.category} className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#984321] block">
                {isAr ? course.nameAr : course.nameEn}
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {course.dishes.map(dish => {
                  const selected = selectedDishes[course.category] === dish.id;
                  return (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => selectDishForCourse(course.category, dish.id)}
                      className={`w-full text-left rtl:text-right p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        selected
                          ? 'bg-[#FAF3E6] border-[#BA5C34] shadow-sm ring-1 ring-[#BA5C34]/30'
                          : 'bg-white border-[#321F18]/10 hover:border-[#BA5C34]/40 hover:bg-[#FAF7F2]'
                      }`}
                      aria-label={isAr ? dish.nameAr : dish.nameEn}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            selected ? 'bg-[#984321] border-[#984321] text-white' : 'border-[#321F18]/20 bg-white'
                          }`}>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <h4 className="font-serif text-sm font-bold text-[#321F18]">
                            {isAr ? dish.nameAr : dish.nameEn}
                          </h4>
                        </div>
                        <p className="text-xs text-[#321F18]/70 font-sans leading-relaxed ps-6">
                          {isAr ? dish.descAr : dish.descEn}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#984321] whitespace-nowrap">
                        {dish.priceEgp} EGP
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Calculated Banquet Summary */}
        <div className="lg:col-span-5 bg-[#321F18] text-[#FAF3E6] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl border border-[#321F18]">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-[#F2B38E]">
              <span className="uppercase tracking-widest font-bold">
                {isAr ? 'ملخص مأدبة التذوق' : 'Tasting Banquet Dossier'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold">
                {guestCount} {isAr ? 'أشخاص' : 'Guests'}
              </span>
            </div>

            {/* Selected Courses Inventory */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                {isAr ? 'الأطباق المختارة للقائمة:' : 'Selected Courses:'}
              </span>
              <ul className="space-y-2.5 text-xs text-white/90 font-sans">
                {currentSelectionItems.map((dish, idx) => (
                  <li key={dish.id} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#F2B38E] font-bold">0{idx + 1}</span>
                      <span className="font-medium text-white">{isAr ? dish.nameAr : dish.nameEn}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#D9D5A2] font-semibold">{dish.priceEgp} EGP</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-white/10 font-mono">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{isAr ? 'سعر الفرد الواحد:' : 'Per Guest Cost:'}</span>
                <span className="font-bold text-white">{costPerGuest} EGP</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>{isAr ? 'عدد الضيوف:' : 'Guest Multiplier:'}</span>
                <span className="font-bold text-white">× {guestCount}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                <span className="text-xs text-slate-300 uppercase tracking-wider">
                  {isAr ? 'إجمالي المأدبة التقديري:' : 'Total Banquet Estimate:'}
                </span>
                <div className="text-end">
                  <span className="font-serif text-3xl font-bold text-[#F2B38E]">
                    {totalBanquetCost.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#D9D5A2] ms-1">EGP</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
                {isAr
                  ? 'الأسعار تشمل ضيافة الشاي بالنعناع والخبز الحجري الساخن ولا تشمل رسوم الخدمة والضريبة المقررة.'
                  : 'Includes welcome mint tea and hot stone hearth flatbreads. Illustrative demonstration pricing.'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href={`/${locale}/preview/restaurant/reserve?party=${guestCount}&plan=banquet`}
              className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-[#BA5C34] hover:bg-[#984321] text-white font-mono text-xs font-bold transition-all shadow-md group"
              aria-label={isAr ? 'طلب حجز طاولة لهذه المأدبة' : 'Reserve table for this tasting banquet'}
            >
              <span>{isAr ? 'طلب حجز طاولة لهذه المأدبة' : 'Request Table for this Banquet'}</span>
              <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F2B38E]" />
              <span>{isAr ? 'نموذج محاكاة تجريبي تفاعلي من مافيكس' : 'Simulated interactive demo instrument by Mavvix'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
