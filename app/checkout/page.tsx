'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { CreditCard, Lock, Truck, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart, totalItems } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // ===== مهم: فقط در سمت کلاینت اجرا بشه =====
  useEffect(() => {
    setIsClient(true);
  }, []);

  // چک کردن سبد خرید فقط در سمت کلاینت
  useEffect(() => {
    if (isClient && items.length === 0) {
      toast.error('سبد خرید شما خالی است');
      router.push('/cart');
    }
  }, [isClient, items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        toast.error('لطفاً تمام اطلاعات را پر کنید');
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      setIsSubmitting(true);
      
      setTimeout(() => {
        toast.success('سفارش شما با موفقیت ثبت شد!');
        clearCart();
        setStep(3);
        setIsSubmitting(false);
      }, 2000);
    }
  };

  // نمایش لودینگ تا وقتی کلاینت آماده نشده
  if (!isClient) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="animate-pulse">در حال بارگذاری...</div>
      </div>
    );
  }

  // اگر سبد خرید خالی باشه
  if (items.length === 0 && step !== 3) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
          <p className="text-muted-foreground mb-8">
            برای ادامه فرآیند خرید، ابتدا محصولات را به سبد خرید اضافه کنید
          </p>
          <Link href="/products">
            <Button>بازگشت به فروشگاه</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">سفارش شما ثبت شد!</h2>
          <p className="text-muted-foreground mb-4">
            شماره پیگیری سفارش: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-muted-foreground mb-8">
            ایمیل تاییدیه برای شما ارسال شد.
          </p>
          <Link href="/">
            <Button>بازگشت به صفحه اصلی</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">تکمیل سفارش</h1>

        {/* Summary Cards - نمایش خلاصه سفارش */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <h3 className="font-bold mb-3">خلاصه سفارش ({totalItems} کالا)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">مجموع:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">هزینه ارسال:</span>
              <span>{shipping === 0 ? 'رایگان' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">مالیات:</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>قابل پرداخت:</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex justify-between mb-8">
          {['اطلاعات', 'پرداخت', 'تایید'].map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                step > index + 1 ? 'bg-green-500 text-white' :
                step === index + 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <div className="text-sm hidden sm:block">{label}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-bold mb-4">اطلاعات ارسال</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">نام کامل *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="نام و نام خانوادگی"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ایمیل *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">شماره تماس *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="09xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">شهر *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="تهران، اصفهان، ..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">آدرس کامل *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="خیابان، پلاک، واحد..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">کد پستی</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="کد پستی 10 رقمی"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  ادامه <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-bold mb-4">اطلاعات پرداخت</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">شماره کارت</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="**** **** **** ****"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">تاریخ انقضا</label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV2</label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        placeholder="***"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  بازگشت
                </Button>
                <Button type="submit" isLoading={isSubmitting} className="gap-2">
                  <Lock className="w-4 h-4" />
                  پرداخت نهایی
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
