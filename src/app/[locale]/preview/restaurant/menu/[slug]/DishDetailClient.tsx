'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LocalizedDish, LocalizedDishModifier } from '@/lib/db/repositories';
import { useOrder } from '@/lib/restaurant/order-context';

export function DishDetailClient({
  dish,
  locale,
}: {
  dish: LocalizedDish;
  locale: 'ar' | 'en';
}) {
  const isAr = locale === 'ar';
  const router = useRouter();
  const { addItem } = useOrder();

  const modifiers = dish.modifiers || [];
  const sizeModifiers = modifiers.filter(m => m.modifier_group === 'size');
  const extrasModifiers = modifiers.filter(m => m.modifier_group === 'extras');

  // Default size is regular or the first size modifier
  const [selectedSizeId, setSelectedSizeId] = useState<string>(sizeModifiers[0]?.id || 'default');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedSizeMod = sizeModifiers.find(m => m.id === selectedSizeId);
  const sizeDeltaCents = selectedSizeMod ? selectedSizeMod.price_delta_cents : 0;

  const extrasDeltaCents = extrasModifiers
    .filter(m => selectedExtras.includes(m.id))
    .reduce((sum, m) => sum + m.price_delta_cents, 0);

  const unitPriceCents = dish.price_cents + sizeDeltaCents + extrasDeltaCents;
  const lineTotalCents = unitPriceCents * quantity;

  const toggleExtra = (modId: string) => {
    setSelectedExtras(prev =>
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  const handleAddToOrder = () => {
    const activeExtras = extrasModifiers.filter(m => selectedExtras.includes(m.id));
    const sizeName = selectedSizeMod ? selectedSizeMod.label : (isAr ? 'حجم عادي' : 'Regular Portion');
    const extrasNames = activeExtras.map(m => m.label);

    addItem({
      id: `${dish.slug}-${selectedSizeId}-${selectedExtras.sort().join('-')}`,
      dishId: dish.id,
      slug: dish.slug,
      name: dish.title,
      unitPriceCents,
      quantity,
      sizeLabel: sizeName,
      extrasLabels: extrasNames,
    });

    setAddedSuccess(true);
  };

  const spiceLevel = dish.attributes?.spice_level ?? 1;

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#321F18]/60">
        <Link href={`/${locale}/preview/restaurant`} className="hover:text-[#BA5C34]">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/preview/restaurant/menu`} className="hover:text-[#BA5C34]">
          {isAr ? 'قائمة الطعام' : 'Menu'}
        </Link>
        <span>/</span>
        <span className="text-[#321F18] font-semibold">{dish.title}</span>
      </nav>

      {/* Main Grid: Details on Left, Interactive Customizer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Dish Dossier & Heritage Story */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#BA5C34]/10 text-[#BA5C34] text-xs font-bold uppercase tracking-wider">
                {dish.category}
              </span>
              {dish.attributes?.dietary_tags?.includes('vegetarian') && (
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {isAr ? 'طبق نباتي 🌱' : 'Vegetarian 🌱'}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321F18]">
              {dish.title}
            </h1>

            <p className="text-base text-[#321F18]/80 leading-relaxed">
              {dish.summary}
            </p>
          </div>

          {/* Dish Narrative & Origin */}
          <div className="bg-white rounded-2xl border border-[#321F18]/10 p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#321F18]">
              {isAr ? 'أصول الوصفة وطريقة التحضير' : 'Recipe Heritage & Craft'}
            </h2>
            <p className="text-xs text-[#321F18]/75 leading-relaxed">
              {dish.body?.origin || (isAr
                ? 'تُحضر هذه الوصفة باتباع أسلوب الطهي البطيء في أواني الفخار الطبيعي للحفاظ على رطوبة المكونات ونكهاتها العطرية المركزة دون الحاجة لأي معززات صناعية.'
                : 'Prepared according to unhurried Eastern culinary methods using natural earthen clay to preserve volatile herbal notes and wholesome moisture.')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#321F18]/10 text-xs">
              <div>
                <span className="text-[#321F18]/50 block">{isAr ? 'وقت الطهي' : 'Prep Time'}</span>
                <span className="font-semibold text-[#321F18]">{dish.body?.prep_time || '25 mins'}</span>
              </div>
              <div>
                <span className="text-[#321F18]/50 block">{isAr ? 'درجة الحرارة' : 'Spice Level'}</span>
                <span className="font-semibold text-[#BA5C34]">
                  {'🌶️'.repeat(Math.max(1, spiceLevel))} {spiceLevel === 0 ? (isAr ? 'معتدل' : 'Mild') : (isAr ? 'دافئ' : 'Warm')}
                </span>
              </div>
              <div>
                <span className="text-[#321F18]/50 block">{isAr ? 'التقديم المقترح' : 'Pairing'}</span>
                <span className="font-semibold text-[#8B8B52]">{dish.body?.pairing || 'House Saffron Infusion'}</span>
              </div>
            </div>
          </div>

          {/* Ingredients & Allergens Disclosure */}
          <div className="bg-white rounded-2xl border border-[#321F18]/10 p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#321F18]">
              {isAr ? 'المكونات ومسببات الحساسية' : 'Ingredients & Allergen Transparency'}
            </h2>

            {/* Ingredients */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#8B8B52] block">
                {isAr ? 'المكونات الطبيعية المنتقاة:' : 'Key Natural Ingredients:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(dish.attributes?.ingredients || ['زعفران جبلي', 'توابل شرقية']).map((ing: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#FAF3E6] border border-[#321F18]/10 text-xs font-medium text-[#321F18]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergens */}
            <div className="pt-4 border-t border-[#321F18]/10">
              <span className="text-xs font-semibold text-amber-900 block mb-2">
                {isAr ? 'تنبيه مسببات الحساسية:' : 'Allergen Advisory:'}
              </span>
              {dish.allergens && dish.allergens.length > 0 ? (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-semibold">
                    ⚠️ {isAr ? 'يحتوي هذا الطبق على:' : 'This dish contains:'} {dish.allergens.join(', ')}
                  </p>
                  <p className="text-[11px] text-amber-800/80">
                    {isAr
                      ? 'يتم تحضير كافة الأطباق في مطبخ مشترك؛ ورغم عزل المحطات بدقة، قد يحدث تلامس عرضي غير مقصود.'
                      : 'All dishes are crafted in an open artisanal kitchen. While stations are segregated, cross-contact may occur.'}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  ✓ {isAr ? 'لا توجد مسببات حساسية رئيسية مدونة في مكونات هذا الطبق.' : 'No primary allergens flagged in this dish’s recipe.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customizer & Order Engine */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl bg-white border border-[#321F18]/15 p-8 shadow-xl space-y-6">
            <div className="border-b border-[#321F18]/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#BA5C34] font-bold">
                {isAr ? 'تخصيص الطلب التجريبي' : 'Customize Your Demo Meal'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#321F18] mt-1">
                {dish.title}
              </h2>
            </div>

            {/* Portion / Size Selector */}
            {sizeModifiers.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
                  {isAr ? 'اختر حجم الوجبة:' : 'Select Portion Size:'}
                </label>
                <div className="space-y-2">
                  {sizeModifiers.map(sizeMod => (
                    <label
                      key={sizeMod.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedSizeId === sizeMod.id
                          ? 'border-[#BA5C34] bg-[#FAF3E6]/60 font-semibold'
                          : 'border-[#321F18]/15 hover:border-[#BA5C34]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="dish-size"
                          value={sizeMod.id}
                          checked={selectedSizeId === sizeMod.id}
                          onChange={() => setSelectedSizeId(sizeMod.id)}
                          className="accent-[#BA5C34]"
                        />
                        <span className="text-xs text-[#321F18]">{sizeMod.label}</span>
                      </div>
                      <span className="text-xs text-[#8B8B52]">
                        {sizeMod.price_delta_cents > 0
                          ? `+${(sizeMod.price_delta_cents / 100).toFixed(0)} ${isAr ? 'ج.م' : 'EGP'}`
                          : (isAr ? 'مشمول' : 'Included')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Extras / Add-on Customizer */}
            {extrasModifiers.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#321F18]/10">
                <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
                  {isAr ? 'إضافات ومكونات اختيارية:' : 'Optional Add-ons & Extras:'}
                </label>
                <div className="space-y-2">
                  {extrasModifiers.map(extra => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <label
                        key={extra.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'border-[#BA5C34] bg-[#FAF3E6]/60'
                            : 'border-[#321F18]/15 hover:border-[#BA5C34]/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleExtra(extra.id)}
                            className="accent-[#BA5C34] rounded"
                          />
                          <span className="text-xs text-[#321F18]">{extra.label}</span>
                        </div>
                        <span className="text-xs text-[#8B8B52] font-medium">
                          {extra.price_delta_cents > 0
                            ? `+${(extra.price_delta_cents / 100).toFixed(0)} ${isAr ? 'ج.م' : 'EGP'}`
                            : (isAr ? 'مجاني' : 'Free')}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="pt-2 border-t border-[#321F18]/10 flex items-center justify-between">
              <span className="text-xs font-bold text-[#321F18] uppercase tracking-wider">
                {isAr ? 'الكمية:' : 'Quantity:'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-[#FAF3E6] border border-[#321F18]/20 flex items-center justify-center font-bold text-sm text-[#321F18] hover:bg-[#321F18] hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#321F18]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-[#FAF3E6] border border-[#321F18]/20 flex items-center justify-center font-bold text-sm text-[#321F18] hover:bg-[#321F18] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Real-time Pricing Summary */}
            <div className="p-4 rounded-xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-2">
              <div className="flex justify-between text-xs text-[#321F18]/70">
                <span>{isAr ? 'سعر الوحدة بعد التخصيص' : 'Customized Unit Price'}:</span>
                <span>{(unitPriceCents / 100).toFixed(0)} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
              <div className="flex justify-between text-xs text-[#321F18]/70">
                <span>{isAr ? 'الكمية' : 'Quantity'}:</span>
                <span>x{quantity}</span>
              </div>
              <div className="pt-2 border-t border-[#321F18]/10 flex justify-between items-baseline font-bold">
                <span className="text-sm text-[#321F18]">{isAr ? 'الإجمالي للطبق' : 'Item Total'}:</span>
                <span className="font-serif text-2xl text-[#BA5C34]">
                  {(lineTotalCents / 100).toFixed(0)} <span className="text-xs font-normal text-[#321F18]">{isAr ? 'ج.م' : 'EGP'}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                id="add-to-order-btn"
                onClick={handleAddToOrder}
                className="w-full py-3.5 px-6 rounded-xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] font-semibold text-sm transition-all shadow-md shadow-[#BA5C34]/20 flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'إضافة إلى حقيبة الطلب' : 'Add to Demo Order Bag'}</span>
                <span>→</span>
              </button>

              {addedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                  <span>✓ {isAr ? 'تمت الإضافة بنجاح إلى الطلب!' : 'Added to order bag!'}</span>
                  <Link
                    href={`/${locale}/preview/restaurant/order`}
                    className="font-bold underline text-emerald-800 hover:text-emerald-950"
                  >
                    {isAr ? 'عرض الطلب' : 'View Order'}
                  </Link>
                </div>
              )}

              <Link
                href={`/${locale}/preview/restaurant/menu`}
                className="block text-center text-xs text-[#321F18]/60 hover:text-[#BA5C34] transition-colors"
              >
                {isAr ? '← متابعة تصفح القائمة' : '← Continue Browsing Menu'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

