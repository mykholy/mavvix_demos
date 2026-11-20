'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OrderItem {
  id: string; // unique key e.g. `${slug}-${sizeLabel}-${extras.join(',')}`
  dishId: string;
  slug: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  sizeLabel?: string;
  extrasLabels?: string[];
}

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearOrder: () => void;
  subtotalCents: number;
  packagingFeeCents: number;
  totalCents: number;
  itemCount: number;
  generateOrderText: (locale: 'ar' | 'en') => string;
}

const STORAGE_KEY = 'mavvix_restaurant_order';
const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse saved restaurant order', e);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn('Failed to save restaurant order', e);
      }
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<OrderItem, 'quantity'> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity || 1;
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === newItem.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qtyToAdd };
        return copy;
      }
      return [...prev, { ...newItem, quantity: qtyToAdd }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.min(20, qty) } : item));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearOrder = () => {
    setItems([]);
  };

  const subtotalCents = items.reduce((sum, item) => sum + (item.unitPriceCents * item.quantity), 0);
  const packagingFeeCents = items.length > 0 ? 1500 : 0; // 15 EGP
  const totalCents = subtotalCents + packagingFeeCents;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const generateOrderText = (locale: 'ar' | 'en') => {
    const isAr = locale === 'ar';
    if (items.length === 0) {
      return isAr ? 'لا توجد عناصر في قائمة الطلب' : 'No items in order bag';
    }

    let out = isAr
      ? `طلب تجريبي — سفرة زعفران (Mavvix Demo)\n` +
        `----------------------------------------\n`
      : `DEMO ORDER SUMMARY — Saffron Table (Mavvix Concept)\n` +
        `----------------------------------------\n`;

    items.forEach((item, idx) => {
      const extrasStr = item.extrasLabels && item.extrasLabels.length > 0 ? ` (+ ${item.extrasLabels.join(', ')})` : '';
      const sizeStr = item.sizeLabel ? ` [${item.sizeLabel}]` : '';
      const lineTotal = ((item.unitPriceCents * item.quantity) / 100).toFixed(0);
      out += `${idx + 1}. ${item.name}${sizeStr}${extrasStr} x${item.quantity} = ${lineTotal} ${isAr ? 'ج.م' : 'EGP'}\n`;
    });

    out += `----------------------------------------\n`;
    out += `${isAr ? 'المجموع الفرعي' : 'Subtotal'}: ${(subtotalCents / 100).toFixed(0)} ${isAr ? 'ج.م' : 'EGP'}\n`;
    out += `${isAr ? 'رسوم التغليف التجريبية' : 'Sample Packaging'}: ${(packagingFeeCents / 100).toFixed(0)} ${isAr ? 'ج.م' : 'EGP'}\n`;
    out += `${isAr ? 'الإجمالي التقديري' : 'Estimated Total'}: ${(totalCents / 100).toFixed(0)} ${isAr ? 'ج.م' : 'EGP'}\n`;
    out += `\n* ${isAr ? 'ملاحظة: هذا ملخص طلب تجريبي للعرض التقني ولا يتم إرساله للمطبخ' : 'Note: Concept demo order summary — not submitted to kitchen'}`;

    return out;
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearOrder,
        subtotalCents,
        packagingFeeCents,
        totalCents,
        itemCount,
        generateOrderText,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return ctx;
}

