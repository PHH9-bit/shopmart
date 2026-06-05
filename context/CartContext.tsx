'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { CartItem, Product } from '@/types';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // استفاده از ref برای جلوگیری از رندر مجدد غیرضروری
  const isUpdatingRef = useRef(false);

  // ==================== بارگذاری از localStorage ====================
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // ==================== ذخیره در localStorage ====================
  useEffect(() => {
    if (isHydrated && !isUpdatingRef.current) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  // ==================== نمایش toast به صورت جداگانه (حل مشکل اصلی) ====================
  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === 'success') {
        toast.success(toastMessage.message);
      } else {
        toast.error(toastMessage.message);
      }
      // پاک کردن پیام بعد از نمایش
      setTimeout(() => setToastMessage(null), 100);
    }
  }, [toastMessage]);

  // ==================== اضافه کردن به سبد خرید ====================
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    // جلوگیری از به‌روزرسانی همزمان
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === product.id);
      
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        setToastMessage({ 
          message: `تعداد ${product.title.slice(0, 30)} افزایش یافت`, 
          type: 'success' 
        });
        return updated;
      }
      
      setToastMessage({ 
        message: `${product.title.slice(0, 30)} به سبد خرید اضافه شد`, 
        type: 'success' 
      });
      return [...prev, { ...product, quantity }];
    });
    
    // ریست کردن ref بعد از یک تأخیر کوتاه
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  }, []);

  // ==================== حذف از سبد خرید ====================
  const removeItem = useCallback((id: number) => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        setToastMessage({ 
          message: `${item.title.slice(0, 30)} حذف شد`, 
          type: 'success' 
        });
      }
      return prev.filter(i => i.id !== id);
    });
    
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  }, []);

  // ==================== به‌روزرسانی تعداد ====================
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
    
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  }, [removeItem]);

  // ==================== خالی کردن سبد خرید ====================
  const clearCart = useCallback(() => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    setItems([]);
    setToastMessage({ message: 'سبد خرید خالی شد', type: 'success' });
    
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  }, []);

  // ==================== محاسبات ====================
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 1800000 ? 0 : 180000;
  const tax = subtotal * 0.09;
  const total = subtotal + shipping + tax;

  // ==================== مقدار پیش‌فرض برای زمان هیدریشن ====================
  const defaultValue = {
    items: [],
    addItem: () => {},
    removeItem: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    totalItems: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  };

  // در زمان هیدریشن نشده، مقدار پیش‌فرض برگردون
  if (!isHydrated) {
    return (
      <CartContext.Provider value={defaultValue}>
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ==================== هوک سفارشی برای استفاده از سبد خرید ====================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};