import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, CartStore } from '@/types';
import toast from 'react-hot-toast';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ items: updatedItems });
          toast.success(`${product.title.slice(0, 30)}... تعداد افزایش یافت`);
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
          toast.success(`${product.title.slice(0, 30)}... به سبد خرید اضافه شد`);
        }
      },

      removeItem: (productId: number) => {
        const { items } = get();
        const item = items.find((i) => i.id === productId);
        set({ items: items.filter((item) => item.id !== productId) });
        if (item) {
          toast.success(`${item.title.slice(0, 30)}... از سبد خرید حذف شد`);
        }
      },

      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get();
        
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('سبد خرید خالی شد');
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);