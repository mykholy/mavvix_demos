'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export function RestaurantFaqClient({
  faqs,
  locale,
}: {
  faqs: FaqItem[];
  locale: 'ar' | 'en';
}) {
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [search, setSearch] = useState('');

  const categories = [
    { slug: 'all', name: isAr ? 'كافة الأسئلة' : 'All Topics' },
    { slug: 'allergens', name: isAr ? 'الحساسية والمكونات' : 'Allergens & Kitchen' },
    { slug: 'reservations', name: isAr ? 'حجز الطاولات' : 'Reservations' },
    { slug: 'ordering', name: isAr ? 'الطلبات والاستلام' : 'Takeaway & Orders' },
    { slug: 'demo', name: isAr ? 'عن هذا العرض التقني' : 'About This Demo' },
  ];

  const filteredFaqs = faqs.filter(faq => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchQ = faq.question.toLowerCase().includes(q);
      const matchA = faq.answer.toLowerCase().includes(q);
      if (!matchQ && !matchA) return false;
    }
    return true;
  });

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-8 text-start">
      {/* Category Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#321F18]/10 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-[#321F18] text-[#FAF3E6]'
                    : 'bg-[#FAF3E6] text-[#321F18] hover:bg-[#FAF3E6]/70'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث في الأسئلة...' : 'Search questions...'}
              className="w-full px-3 py-2 rounded-lg border border-[#321F18]/15 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map(faq => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white border border-[#321F18]/15 overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full p-6 text-start flex items-center justify-between gap-4 hover:bg-[#FAF3E6]/30 transition-colors"
              >
                <span className="font-serif text-base sm:text-lg font-bold text-[#321F18]">
                  {faq.question}
                </span>
                <span className={`w-8 h-8 rounded-full bg-[#FAF3E6] text-[#321F18] flex items-center justify-center font-bold text-sm shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-[#BA5C34] text-white' : ''}`}>
                  ↓
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[#321F18]/10 text-xs sm:text-sm text-[#321F18]/80 leading-relaxed space-y-2">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-8 rounded-3xl bg-[#FAF3E6] border border-[#321F18]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-[#321F18]">
            {isAr ? 'هل لديك استفسار غذائي أو مناسبة خاصة لم تُذكر هنا؟' : 'Have a Dietary Question or Special Occasion?'}
          </h3>
          <p className="text-xs text-[#321F18]/70">
            {isAr
              ? 'يمكنك زيارة أحد فروعنا التوضيحية أو تجربة إرسال طلب حجز طاولة مع إضافة ملاحظاتك الخاصة.'
              : 'Feel free to submit a table reservation request with your custom allergy notes.'}
          </p>
        </div>

        <Link
          href={`/${locale}/preview/restaurant/reserve`}
          className="px-5 py-3 rounded-xl bg-[#BA5C34] text-white text-xs font-semibold hover:bg-[#9E4A28] whitespace-nowrap shadow-sm transition-colors"
        >
          {isAr ? 'طلب حجز طاولة' : 'Reserve a Table'}
        </Link>
      </div>
    </div>
  );
}

