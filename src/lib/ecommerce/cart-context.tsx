'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartLineItem {
  itemId: string;
  variantId: string;
  sku: string;
  slug: string;
  title: string;
  size: string;
  color: string;
  priceCents: number;
  quantity: number;
  maxStock: number;
  category: string;
}

interface CartContextType {
  cart: CartLineItem[];
  addToCart: (item: Omit<CartLineItem, 'quantity'>, qty?: number) => { success: boolean; message?: string };
  updateQuantity: (variantId: string, delta: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  subtotalCents: number;
  itemCount: number;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  recentlyViewed: string[];
  addRecentlyViewed: (slug: string) => void;
  shippingZone: string;
  setShippingZone: (zone: string) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponDiscountCents: number;
  setCouponDiscountCents: (cents: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [shippingZone, setShippingZone] = useState<string>('Cairo');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscountCents, setCouponDiscountCents] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('noria_cart_v2');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWish = localStorage.getItem('noria_wishlist_v2');
      if (savedWish) setWishlist(JSON.parse(savedWish));

      const savedRecent = localStorage.getItem('noria_recent_v2');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch (e) {
      // Storage read error fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('noria_cart_v2', JSON.stringify(cart));
    } catch (e) {}
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('noria_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('noria_recent_v2', JSON.stringify(recentlyViewed));
    } catch (e) {}
  }, [recentlyViewed, isLoaded]);

  const addToCart = (item: Omit<CartLineItem, 'quantity'>, qty: number = 1) => {
    if (item.maxStock <= 0) {
      return { success: false, message: 'This variant is currently sold out.' };
    }

    let result = { success: true, message: 'Added to your bag' };

    setCart(prev => {
      const existingIndex = prev.findIndex(l => l.variantId === item.variantId);
      if (existingIndex > -1) {
        const existing = prev[existingIndex];
        const newQty = Math.min(existing.quantity + qty, existing.maxStock);
        if (existing.quantity >= existing.maxStock) {
          result = { success: false, message: `Maximum available inventory (${existing.maxStock}) reached in cart.` };
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = { ...existing, quantity: newQty };
        return updated;
      } else {
        const initialQty = Math.min(qty, item.maxStock);
        return [...prev, { ...item, quantity: initialQty }];
      }
    });

    return result;
  };

  const updateQuantity = (variantId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.variantId === variantId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            if (nextQty > item.maxStock) return item;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(Boolean) as CartLineItem[];
    });
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(i => i.variantId !== variantId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscountCents(0);
  };

  const toggleWishlist = (slug: string) => {
    setWishlist(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isWishlisted = (slug: string) => wishlist.includes(slug);

  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s !== slug);
      return [slug, ...filtered].slice(0, 8);
    });
  };

  const subtotalCents = cart.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotalCents,
        itemCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        recentlyViewed,
        addRecentlyViewed,
        shippingZone,
        setShippingZone,
        couponCode,
        setCouponCode,
        couponDiscountCents,
        setCouponDiscountCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

