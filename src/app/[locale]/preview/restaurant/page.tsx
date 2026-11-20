import { getSectorHeroStyle } from '@/lib/media/sector-images';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getRestaurantDishes, getRestaurantBranches, getEditorialPosts } from '@/lib/db/repositories';

export default function RestaurantHomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const isAr = locale === 'ar';

  const dishes = getRestaurantDishes(locale);
  const branches = getRestaurantBranches(locale);
  const articles = getEditorialPosts('restaurant', locale).slice(0, 3);

  // Curate 4 featured signature dishes across categories
  const featuredSlugs = ['dish-01', 'dish-05', 'dish-10', 'dish-20'];
  const featuredDishes = dishes.filter(d => featuredSlugs.includes(d.slug));

  const categories = [
    { slug: 'breakfast', name: isAr ? 'فطور شرقي' : 'Breakfast', count: dishes.filter(d => d.category === 'breakfast').length, icon: '☀️' },
    { slug: 'starters', name: isAr ? 'مقبلات وسلطات' : 'Starters & Mezze', count: dishes.filter(d => d.category === 'starters').length, icon: '🫒' },
    { slug: 'mains', name: isAr ? 'أطباق رئيسية' : 'Heritage Mains', count: dishes.filter(d => d.category === 'mains').length, icon: '🍲' },
    { slug: 'desserts', name: isAr ? 'حلويات بيتية' : 'Artisan Desserts', count: dishes.filter(d => d.category === 'desserts').length, icon: '🍯' },
    { slug: 'drinks', name: isAr ? 'مشروبات وعصائر' : 'Infusions & Drinks', count: dishes.filter(d => d.category === 'drinks').length, icon: '☕' },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF3E6] via-[#F4EADB] to-[#FAF3E6] py-16 md:py-24 border-b border-[#321F18]/10" style={getSectorHeroStyle('restaurant')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BA5C34]/10 border border-[#BA5C34]/20 text-[#BA5C34] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA5C34]" />
                <span>{isAr ? 'زعفران بلدي نقي • فخار حراري • خبز حجري' : '100% Mountain Saffron • Hearth Bread • Clay Tagines'}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#321F18] leading-[1.15]">
                {isAr ? (
                  <>
                    كرم الضيافة وسحر النكهة <br />
                    <span className="text-[#BA5C34] italic font-normal">على أصول التراث الشرقي</span>
                  </>
                ) : (
                  <>
                    Warm Eastern Gastronomy, <br />
                    <span className="text-[#BA5C34] italic font-normal">Steeped in Timeless Spice.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#321F18]/80 max-w-2xl leading-relaxed">
                {isAr
                  ? 'مرحبًا بكم في سفرة زعفران. قائمة طعام غنية تُحضر يوميًا بمكونات طازجة غير مصنعة، وزعفران جبل أصيل، في بيئة هادئة تجمع بين أناقة التصميم ودفء البيت.'
                  : 'Welcome to Saffron Table. An unhurried culinary sanctum honoring slow-simmered dishes, mountain saffron, and generous hospitality across three historic dining pavilions in Cairo.'}
              </p>

              {/* Primary Dual Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/${locale}/preview/restaurant/menu`}
                  className="px-6 py-3.5 rounded-xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] transition-all text-sm font-semibold shadow-md shadow-[#BA5C34]/20 flex items-center gap-2"
                >
                  <span>{isAr ? 'استكشف قائمة الطعام والطلب' : 'Explore Menu & Demo Order'}</span>
                  <span className="text-lg">→</span>
                </Link>

                <Link
                  href={`/${locale}/preview/restaurant/reserve`}
                  className="px-6 py-3.5 rounded-xl bg-[#321F18] text-[#FAF3E6] hover:bg-[#452B21] transition-all text-sm font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-[#BA5C34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{isAr ? 'طلب حجز طاولة' : 'Request Table Reservation'}</span>
                </Link>
              </div>

              {/* Discrete Notice */}
              <p className="text-xs text-[#8B8B52] font-medium pt-2">
                {isAr
                  ? '✦ نموذج رقمي استعراضي من مافيكس — يمكنك تجربة اختيار المكونات وتخصيص الأطباق وحجز الطاولات تجريبيًا.'
                  : '✦ Interactive Mavvix demonstration — customize portion sizes, test allergen filters, and preview table requests.'}
              </p>
            </div>

            {/* Right Atmospheric Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-[#321F18] to-[#1C120E] text-[#FAF3E6] p-8 shadow-2xl border border-[#321F18]/20 overflow-hidden">
                {/* Decorative Pattern Background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#BA5C34]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B8B52]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
                      {isAr ? 'ساعات اليوم' : 'Today’s Table Service'}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-medium">
                      {isAr ? 'متاح للحجز' : 'Slots Open'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-white/90">
                        {isAr ? 'فرع جاردن سيتي (الزمالك)' : 'Garden Pavilion (Zamalek)'}
                      </span>
                      <span className="text-xs text-[#8B8B52]">11:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-white/90">
                        {isAr ? 'فرع تراس الكورنيش (المعادي)' : 'Corniche Terrace (Maadi)'}
                      </span>
                      <span className="text-xs text-[#8B8B52]">12:00 PM - 12:00 AM</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-white/90">
                        {isAr ? 'فرع وسط البلد (طلعت حرب)' : 'Historic Downtown (Talaat)'}
                      </span>
                      <span className="text-xs text-[#8B8B52]">11:00 AM - 11:00 PM</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/60">
                      {isAr ? 'متوسط وقت التجهيز للطلب: ٢٥ دقيقة' : 'Avg demo prep time: 25 mins'}
                    </span>
                    <Link
                      href={`/${locale}/preview/restaurant/locations`}
                      className="text-[#BA5C34] hover:underline font-semibold"
                    >
                      {isAr ? 'تفاصيل الفروع ←' : 'View Branches →'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18]">
              {isAr ? 'أقسام القائمة الشرقية' : 'Menu Collections'}
            </h2>
            <p className="text-sm text-[#321F18]/70">
              {isAr ? '٣٠ طبقًا أصيلًا مع بيانات تفصيلية للمكونات ومسببات الحساسية' : '30 authentic dishes with complete ingredient and allergen transparency'}
            </p>
          </div>
          <Link
            href={`/${locale}/preview/restaurant/menu`}
            className="text-xs font-semibold text-[#BA5C34] hover:underline"
          >
            {isAr ? 'عرض القائمة الكاملة والفلاتر ←' : 'View Full Interactive Menu →'}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/${locale}/preview/restaurant/menu?category=${cat.slug}`}
              className="p-5 rounded-xl bg-white border border-[#321F18]/10 hover:border-[#BA5C34] hover:shadow-md transition-all group text-center"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <h3 className="font-serif text-base font-bold text-[#321F18] group-hover:text-[#BA5C34] transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-[#8B8B52] mt-1 inline-block">
                {cat.count} {isAr ? 'أطباق' : 'dishes'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Signature Dishes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
              {isAr ? 'مختارات الموسم' : 'Chef’s Seasonal Selection'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18] mt-1">
              {isAr ? 'أطباق تجسد هوية سفرة زعفران' : 'Signature Heritage Dishes'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/restaurant/menu`}
            className="text-xs font-semibold text-[#BA5C34] hover:underline"
          >
            {isAr ? 'استكشف كافة الأطباق ←' : 'Browse All 30 Dishes →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map(dish => (
            <div
              key={dish.id}
              className="rounded-2xl bg-white border border-[#321F18]/10 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              {/* Dish Header Color Ribbon */}
              <div className="h-3 bg-[#BA5C34]/80 group-hover:bg-[#BA5C34] transition-colors" />

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8B8B52] mb-2">
                    <span className="uppercase font-semibold tracking-wider">{dish.category}</span>
                    {dish.attributes?.dietary_tags?.includes('vegetarian') && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        {isAr ? 'نباتي' : 'Veg'}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#321F18] group-hover:text-[#BA5C34] transition-colors">
                    {dish.title}
                  </h3>

                  <p className="text-xs text-[#321F18]/70 mt-2 line-clamp-2 leading-relaxed">
                    {dish.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#321F18]/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#321F18]/60 block">{isAr ? 'السعر' : 'Price'}</span>
                    <span className="font-serif text-lg font-bold text-[#321F18]">
                      {(dish.price_cents / 100).toFixed(0)} <span className="text-xs font-normal">{isAr ? 'ج.م' : 'EGP'}</span>
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/preview/restaurant/menu/${dish.slug}`}
                    className="px-3.5 py-2 rounded-lg bg-[#FAF3E6] border border-[#321F18]/15 text-[#321F18] hover:bg-[#BA5C34] hover:text-white hover:border-[#BA5C34] transition-all text-xs font-semibold"
                  >
                    {isAr ? 'تخصيص وطلب' : 'Customize'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kitchen Philosophy & Heritage Snippet */}
      <section className="bg-[#321F18] text-[#FAF3E6] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
                {isAr ? 'أصول الحرفة' : 'Our Culinary Roots'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                {isAr ? (
                  <>
                    لا نؤمن بالوجبات السريعة، <br />
                    <span className="text-[#BA5C34] italic font-normal">بل بالطعام الذي يُصنع بالصبر والمحبة</span>
                  </>
                ) : (
                  <>
                    We do not believe in haste, <br />
                    <span className="text-[#BA5C34] italic font-normal">but in meals shaped by patience and fire.</span>
                  </>
                )}
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                {isAr
                  ? 'في سفرة زعفران، تبدأ رحلتنا من مزارع الزعفران الجبلية المعزولة، حيث تُقطف بتلات الأزهار باليد عند شروق الشمس. نرفض استخدام المنكهات المصنعة أو الزيوت المهدرجة، ونعتمد كليًا على الفخار الطيني، نار الحطب الهادئة، وزيت الزيتون المعصور على البارد.'
                  : 'At Saffron Table, our journey begins in high-altitude crocus fields harvested by hand at daybreak. We reject synthetic enhancers and commercial shortcuts in favor of unhurried clay tagines, first-press olive oils, and genuine hearth baking.'}
              </p>
              <div>
                <Link
                  href={`/${locale}/preview/restaurant/story`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#BA5C34] hover:underline"
                >
                  <span>{isAr ? 'اقرأ قصة التوابل ومصادر المكونات' : 'Read our full sourcing & spice manifesto'}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-serif text-3xl font-bold text-[#BA5C34]">100%</span>
                <h4 className="text-sm font-semibold text-white">
                  {isAr ? 'زعفران نقي موثق' : 'Pure Mountain Saffron'}
                </h4>
                <p className="text-xs text-white/70">
                  {isAr ? 'خيوط حمراء كاملة دون أي إضافات صبغية' : 'Full crimson stigmas without synthetic coloring'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-serif text-3xl font-bold text-[#BA5C34]">3</span>
                <h4 className="text-sm font-semibold text-white">
                  {isAr ? 'فروع ذات طابع تراثي' : 'Heritage Pavilions'}
                </h4>
                <p className="text-xs text-white/70">
                  {isAr ? 'فناء مشجر بالزمالك وتراس نيلي بالمعادي' : 'Shaded courtyards, Nile terraces & downtown arches'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-serif text-3xl font-bold text-[#BA5C34]">25</span>
                <h4 className="text-sm font-semibold text-white">
                  {isAr ? 'دقيقة تحضير متأنية' : 'Minutes Slow Prep'}
                </h4>
                <p className="text-xs text-white/70">
                  {isAr ? 'كل طبق يُطهى طازجًا فور استلام الطلب' : 'Freshly finished upon ticket receipt'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-serif text-3xl font-bold text-[#BA5C34]">0</span>
                <h4 className="text-sm font-semibold text-white">
                  {isAr ? 'زيوت مهدرجة صناعية' : 'Hydrogenated Fats'}
                </h4>
                <p className="text-xs text-white/70">
                  {isAr ? 'زيت زيتون بكر وزبدة طبيعية نقية فقط' : 'Only pure virgin olive oils & cultured butter'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches & Table Reservation Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
              {isAr ? 'أماكن اللقاء' : 'Dining Pavilions'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18] mt-1">
              {isAr ? 'فروع سفرة زعفران' : 'Our Three Concept Locations'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/restaurant/reserve`}
            className="text-xs font-semibold text-[#BA5C34] hover:underline"
          >
            {isAr ? 'طلب حجز طاولة مباشرة ←' : 'Request Table Reservation Directly →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map(branch => (
            <div
              key={branch.id}
              className="rounded-2xl bg-white border border-[#321F18]/10 p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#BA5C34] uppercase tracking-wider">{branch.district}</span>
                  <span className="text-xs text-[#8B8B52] font-medium">{branch.capacityTables} {isAr ? 'طاولة' : 'tables'}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#321F18]">
                  {branch.name}
                </h3>

                <p className="text-xs text-[#321F18]/70 leading-relaxed">
                  {branch.address}
                </p>

                <div className="p-3 rounded-lg bg-[#FAF3E6] border border-[#321F18]/10 text-xs space-y-1">
                  <span className="font-semibold block text-[#321F18]">{branch.hours}</span>
                  <span className="text-[11px] text-[#8B8B52] block">{branch.fridayNote}</span>
                </div>

                <p className="text-xs text-[#321F18]/80 italic">
                  {branch.seating}
                </p>
              </div>

              <div className="pt-4 border-t border-[#321F18]/10 flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/restaurant/locations/${branch.slug}`}
                  className="text-xs text-[#321F18] hover:text-[#BA5C34] font-medium"
                >
                  {isAr ? 'تفاصيل الفرع' : 'Branch Details'}
                </Link>

                <Link
                  href={`/${locale}/preview/restaurant/reserve?branch=${branch.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#321F18] text-[#FAF3E6] hover:bg-[#BA5C34] transition-all text-xs font-semibold"
                >
                  {isAr ? 'حجز طاولة' : 'Reserve Table'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culinary Journal Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
              {isAr ? 'يوميات المطبخ' : 'Culinary Essays'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18] mt-1">
              {isAr ? 'مقالات وأسرار الطهي الشرقي' : 'From the Saffron Table Journal'}
            </h2>
          </div>
          <Link
            href={`/${locale}/preview/restaurant/journal`}
            className="text-xs font-semibold text-[#BA5C34] hover:underline"
          >
            {isAr ? 'تصفح كافة المقالات ←' : 'Browse All Articles →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(art => (
            <Link
              key={art.id}
              href={`/${locale}/preview/restaurant/journal/${art.slug}`}
              className="p-6 rounded-2xl bg-white border border-[#321F18]/10 hover:border-[#BA5C34] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8B8B52]">
                  {art.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#321F18] group-hover:text-[#BA5C34] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#321F18]/70 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#321F18]/10 flex items-center justify-between text-xs text-[#BA5C34] font-semibold">
                <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

