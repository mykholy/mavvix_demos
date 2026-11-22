'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { LocalizedDish } from '@/lib/db/repositories';
import { useOrder } from '@/lib/restaurant/order-context';
import { getDishPhoto } from '@/lib/media/sector-images';

export function RestaurantMenuClient({
  initialDishes,
  locale,
}: {
  initialDishes: LocalizedDish[];
  locale: 'ar' | 'en';
}) {
  const isAr = locale === 'ar';
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useOrder();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [excludeNuts, setExcludeNuts] = useState(false);
  const [excludeDairy, setExcludeDairy] = useState(false);
  const [excludeGluten, setExcludeGluten] = useState(false);
  const [excludeEggs, setExcludeEggs] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const categories = [
    { slug: 'all', name: isAr ? 'الكل' : 'All' },
    { slug: 'breakfast', name: isAr ? 'فطور' : 'Breakfast' },
    { slug: 'starters', name: isAr ? 'مقبلات وسلطات' : 'Starters & Mezze' },
    { slug: 'mains', name: isAr ? 'أطباق رئيسية' : 'Mains' },
    { slug: 'desserts', name: isAr ? 'حلويات' : 'Desserts' },
    { slug: 'drinks', name: isAr ? 'مشروبات' : 'Drinks' },
  ];

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setVegetarianOnly(false);
    setExcludeNuts(false);
    setExcludeDairy(false);
    setExcludeGluten(false);
    setExcludeEggs(false);
    router.replace(`?`, { scroll: false });
  };

  const filteredDishes = useMemo(() => {
    return initialDishes.filter(dish => {
      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }

      // Vegetarian filter
      if (vegetarianOnly) {
        const isVeg = dish.attributes?.dietary_tags?.includes('vegetarian');
        if (!isVeg) return false;
      }

      // Allergen exclusion filters
      const allergens = dish.allergens || [];
      if (excludeNuts && allergens.includes('nuts')) return false;
      if (excludeDairy && allergens.includes('dairy')) return false;
      if (excludeGluten && allergens.includes('gluten')) return false;
      if (excludeEggs && allergens.includes('eggs')) return false;

      // Text search
      if (search.trim()) {
        const query = search.toLowerCase();
        const titleMatch = dish.title.toLowerCase().includes(query);
        const summaryMatch = dish.summary.toLowerCase().includes(query);
        const ingMatch = Array.isArray(dish.attributes?.ingredients) &&
          dish.attributes.ingredients.some((ing: string) => ing.toLowerCase().includes(query));
        if (!titleMatch && !summaryMatch && !ingMatch) return false;
      }

      return true;
    });
  }, [initialDishes, selectedCategory, vegetarianOnly, excludeNuts, excludeDairy, excludeGluten, excludeEggs, search]);

  const handleQuickAdd = (dish: LocalizedDish) => {
    addItem({
      id: `${dish.slug}-reg`,
      dishId: dish.id,
      slug: dish.slug,
      name: dish.title,
      unitPriceCents: dish.price_cents,
      quantity: 1,
      sizeLabel: isAr ? 'حجم عادي' : 'Regular Portion',
      extrasLabels: [],
    });
    setQuickAddedId(dish.id);
    setTimeout(() => setQuickAddedId(null), 2000);
  };

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (vegetarianOnly ? 1 : 0) +
    (excludeNuts ? 1 : 0) +
    (excludeDairy ? 1 : 0) +
    (excludeGluten ? 1 : 0) +
    (excludeEggs ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#321F18]/10 p-6 shadow-sm space-y-6">
        {/* Top: Search Input & Category Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث باسم الطبق أو المكونات...' : 'Search dish by name or ingredients...'}
              className="w-full px-4 py-2.5 ps-10 rounded-xl bg-[#FAF3E6]/60 border border-[#321F18]/15 text-sm focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
            <svg
              className={`w-4 h-4 text-[#321F18]/40 absolute top-3.5 ${isAr ? 'right-3' : 'left-3'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch('')}
                className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} text-xs text-[#321F18]/50 hover:text-[#321F18]`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-[#321F18] text-[#FAF3E6]'
                    : 'bg-[#FAF3E6] text-[#321F18] hover:bg-[#FAF3E6]/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: Dietary & Allergen Exclusion Filters */}
        <div className="pt-4 border-t border-[#321F18]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#8B8B52] uppercase tracking-wider">
              {isAr ? 'تصفية حسب الحمية والحساسية:' : 'Dietary & Allergen Filters:'}
            </span>

            {/* Vegetarian Toggle */}
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                vegetarianOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-emerald-600'
              }`}
            >
              <span>🌱</span>
              <span>{isAr ? 'نباتي فقط' : 'Vegetarian Only'}</span>
            </button>

            {/* No Nuts Filter (Journey 3) */}
            <button
              id="filter-no-nuts"
              onClick={() => setExcludeNuts(!excludeNuts)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                excludeNuts
                  ? 'bg-[#BA5C34] text-white border-[#BA5C34]'
                  : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34]'
              }`}
            >
              <span>🥜</span>
              <span>{isAr ? 'خالٍ من المكسرات' : 'No Nuts'}</span>
            </button>

            {/* No Dairy Filter */}
            <button
              onClick={() => setExcludeDairy(!excludeDairy)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                excludeDairy
                  ? 'bg-[#BA5C34] text-white border-[#BA5C34]'
                  : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34]'
              }`}
            >
              <span>🥛</span>
              <span>{isAr ? 'خالٍ من الألبان' : 'No Dairy'}</span>
            </button>

            {/* No Gluten Filter */}
            <button
              onClick={() => setExcludeGluten(!excludeGluten)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                excludeGluten
                  ? 'bg-[#BA5C34] text-white border-[#BA5C34]'
                  : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34]'
              }`}
            >
              <span>🌾</span>
              <span>{isAr ? 'خالٍ من الجلوتين' : 'No Gluten'}</span>
            </button>

            {/* No Eggs Filter */}
            <button
              onClick={() => setExcludeEggs(!excludeEggs)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                excludeEggs
                  ? 'bg-[#BA5C34] text-white border-[#BA5C34]'
                  : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34]'
              }`}
            >
              <span>🥚</span>
              <span>{isAr ? 'خالٍ من البيض' : 'No Eggs'}</span>
            </button>
          </div>

          {/* Reset Filters & Count */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#8B8B52] font-medium">
              {isAr
                ? `عرض ${filteredDishes.length} من أصل ${initialDishes.length} طبق`
                : `Showing ${filteredDishes.length} of ${initialDishes.length} dishes`}
            </span>

            {activeFiltersCount > 0 && (
              <button
                id="reset-menu-filters"
                onClick={handleResetFilters}
                className="text-xs text-[#BA5C34] hover:underline font-semibold"
              >
                {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dishes Listing — Menu List / Editorial Format */}
      {filteredDishes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#321F18]/10 space-y-4">
          <span className="text-4xl block">🔍</span>
          <h3 className="font-serif text-xl font-bold text-[#321F18]">
            {isAr ? 'لم نجد أطباق تطابق الفلاتر المحددة' : 'No dishes match your active filters'}
          </h3>
          <p className="text-xs text-[#321F18]/70 max-w-md mx-auto">
            {isAr
              ? 'جرّب إلغاء بعض استثناءات الحساسية أو البحث بكلمة عامة، أو اضغط زر إعادة الضبط للاطلاع على القائمة الكاملة.'
              : 'Try clearing some allergen exclusion tags or searching with a broader ingredient term.'}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-[#321F18] text-[#FAF3E6] text-xs font-semibold hover:bg-[#BA5C34] transition-colors"
          >
            {isAr ? 'إعادة ضبط الفلاتر وعرض القائمة' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDishes.map(dish => {
            const hasNuts = dish.allergens?.includes('nuts');
            const isVeg = dish.attributes?.dietary_tags?.includes('vegetarian');
            const isAdded = quickAddedId === dish.id;

            return (
              <div
                key={dish.id}
                data-dish-slug={dish.slug}
                data-has-nuts={hasNuts ? 'true' : 'false'}
                className="bg-white rounded-2xl border border-[#321F18]/10 overflow-hidden flex flex-col justify-between hover:border-[#BA5C34] hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={`/${locale}/preview/restaurant/menu/${dish.slug}`} className="relative h-48 w-full block overflow-hidden bg-stone-100">
                  <img
                    src={getDishPhoto(dish.id, dish.category)}
                    alt={dish.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 start-3 text-xs font-bold text-white px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                    {dish.price_cents ? (dish.price_cents / 100).toFixed(0) : 180} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </Link>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Category and Badges */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-wider font-semibold text-[#8B8B52]">
                      {dish.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isVeg && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          {isAr ? 'نباتي' : 'Veg'}
                        </span>
                      )}
                      {hasNuts && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          {isAr ? 'يحتوي على مكسرات' : 'Contains Nuts'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/${locale}/preview/restaurant/menu/${dish.slug}`}>
                    <h3 className="font-serif text-xl font-bold text-[#321F18] group-hover:text-[#BA5C34] transition-colors">
                      {dish.title}
                    </h3>
                  </Link>

                  {/* Summary */}
                  <p className="text-xs text-[#321F18]/75 leading-relaxed">
                    {dish.summary}
                  </p>

                  {/* Ingredients Preview */}
                  {Array.isArray(dish.attributes?.ingredients) && dish.attributes.ingredients.length > 0 && (
                    <div className="text-[11px] text-[#321F18]/60 pt-1">
                      <span className="font-semibold text-[#321F18]/80">{isAr ? 'المكونات: ' : 'Ingredients: '}</span>
                      <span>{dish.attributes.ingredients.join(' • ')}</span>
                    </div>
                  )}

                  {/* Allergen List Tag */}
                  {dish.allergens && dish.allergens.length > 0 && (
                    <div className="text-[10px] text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded border border-amber-100 flex items-center gap-1">
                      <span>⚠️ {isAr ? 'مسببات حساسية محتملة: ' : 'Potential Allergens: '}</span>
                      <span className="font-medium">{dish.allergens.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Pricing & Actions */}
                <div className="pt-5 mt-4 border-t border-[#321F18]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#321F18]/60 uppercase tracking-wider block">
                      {isAr ? 'السعر العادي' : 'Base Price'}
                    </span>
                    <span className="font-serif text-xl font-bold text-[#321F18]">
                      {(dish.price_cents / 100).toFixed(0)} <span className="text-xs font-normal">{isAr ? 'ج.م' : 'EGP'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAdd(dish)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#FAF3E6] border border-[#321F18]/15 text-[#321F18] hover:bg-[#FAF3E6]/70'
                      }`}
                    >
                      {isAdded ? (isAr ? '✓ أضيف' : '✓ Added') : (isAr ? 'إضافة سريعة' : 'Quick Add')}
                    </button>

                    <Link
                      href={`/${locale}/preview/restaurant/menu/${dish.slug}`}
                      className="px-4 py-2 rounded-lg bg-[#BA5C34] text-white hover:bg-[#9E4A28] transition-all text-xs font-semibold shadow-sm"
                    >
                      {isAr ? 'تخصيص' : 'Customize'}
                    </Link>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

