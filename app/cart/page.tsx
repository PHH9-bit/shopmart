'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, Minus, Plus, ArrowRight, 
  CreditCard, Truck, Shield, Tag, X 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

// تابع فرمت قیمت به هزار تومان
const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

export default function CartPage() {
  const { 
    items, updateQuantity, removeItem, clearCart,
    subtotal, shipping, tax, total, totalItems 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [savedItems, setSavedItems] = useState<typeof items>([]);

  const handleApplyPromo = () => {
    setIsApplying(true);
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SAVE10') {
        setDiscount(subtotal * 0.1);
        toast.success('کد تخفیف با موفقیت اعمال شد');
      } else if (promoCode.toUpperCase() === 'WELCOME') {
        setDiscount(50000);
        toast.success('۵۰,۰۰۰ هزار تومان تخفیف اعمال شد');
      } else {
        toast.error('کد تخفیف نامعتبر است');
      }
      setIsApplying(false);
    }, 500);
  };

  const finalTotal = total - discount;

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-4">سبد خرید شما خالی است</h2>
          <p className="text-muted-foreground mb-8">
            محصولات مورد علاقه خود را به سبد خرید اضافه کنید
          </p>
          <Link href="/products">
            <button className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition">
              شروع خرید <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">سبد خرید</h1>
              <p className="text-muted-foreground mt-1">{totalItems} کالا</p>
            </div>
            <button
              onClick={() => {
                clearCart();
                toast.success('سبد خرید خالی شد');
              }}
              className="text-destructive hover:underline text-sm"
            >
              خالی کردن سبد
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-lg transition-all"
                >
                  <Link href={`/products/${item.id}`} className="relative w-24 h-24 bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden flex-shrink-0 self-center sm:self-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2 hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  
                  <div className="flex-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold line-clamp-2 hover:text-primary transition">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.category === "men's clothing" ? "پوشاک مردانه" :
                       item.category === "women's clothing" ? "پوشاک زنانه" :
                       item.category === "jewelery" ? "جواهرات" :
                       item.category === "electronics" ? "الکترونیک" : item.category}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-primary font-bold">{formatPrice(item.price)}</span>
                      {item.price > 1800000 && (
                        <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                          ارسال رایگان
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSavedItems([...savedItems, item]);
                          removeItem(item.id);
                          toast.success('محصول به لیست بعدی اضافه شد');
                        }}
                        className="text-muted-foreground hover:text-primary text-sm"
                      >
                        خرید بعد
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right sm:text-left">
                    <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {savedItems.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">خرید بعد ({savedItems.length})</h3>
              <div className="space-y-3">
                {savedItems.map((item) => (
                  <div key={`saved-${item.id}`} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                    <div className="relative w-12 h-12 bg-background rounded">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-primary">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateQuantity(item.id, 1);
                        setSavedItems(savedItems.filter(i => i.id !== item.id));
                        toast.success('محصول به سبد خرید اضافه شد');
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      افزودن به سبد
                    </button>
                    <button
                      onClick={() => setSavedItems(savedItems.filter(i => i.id !== item.id))}
                      className="text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="sticky top-24 space-y-4">
            {subtotal < 1800000 && (
              <div className="bg-primary/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>
                    {formatPrice(1800000 - subtotal)} دیگر تا ارسال رایگان
                  </span>
                </div>
                <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(subtotal / 1800000) * 100}%` }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            )}

            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-primary" />
                <span className="font-semibold">کد تخفیف</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="SAVE10 یا WELCOME"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={isApplying || !promoCode}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isApplying ? '...' : 'اعمال'}
                </button>
              </div>
              {discount > 0 && (
                <p className="text-xs text-green-500 mt-2">
                  تخفیف {formatPrice(discount)} اعمال شد
                </p>
              )}
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">مجموع قیمت ({totalItems} کالا)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">هزینه ارسال</span>
                  <span>{shipping === 0 ? 'رایگان' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">مالیات (۹%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>تخفیف</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>قابل پرداخت</span>
                    <span className="text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  ادامه فرآیند خرید
                </button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                <span>پرداخت امن و تضمین شده</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
