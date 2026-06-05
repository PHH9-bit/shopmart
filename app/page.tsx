'use client';

import { useEffect, useState } from 'react';
import PromoSlider from '@/components/PromoSlider';
import CategorySlider from '@/components/CategorySlider';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Loader2, TrendingUp, Award, Clock, Truck, Shield, Headphones, RefreshCw, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockProducts } from '@/lib/products';

// تابع فرمت قیمت به هزار تومان
const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استفاده از دیتای محلی فارسی
    const data = mockProducts as Product[];
    setProducts(data);
    
    const sortedByRating = [...data].sort((a, b) => b.rating.rate - a.rating.rate);
    setFeaturedProducts(sortedByRating.slice(0, 4));
    
    const sortedByCount = [...data].sort((a, b) => b.rating.count - a.rating.count);
    setBestSellers(sortedByCount.slice(0, 4));
    
    setNewArrivals(data.slice(0, 8));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground">بارگذاری محصولات...</p>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* اسلایدر تبلیغاتی - جایگزین Hero */}
      <PromoSlider />
      
      <CategorySlider />

      {/* Featured Products */}
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm">انتخاب ویژه</span>
            </div>
            <h2 className="text-2xl font-bold">محصولات ویژه</h2>
            <p className="text-muted-foreground text-sm mt-1">محصولات با بالاترین امتیاز</p>
          </div>
          <Link href="/products?sort=rating" className="text-primary hover:underline text-sm">
            مشاهده همه
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-purple-600 p-8 md:p-12 text-center"
        >
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              تخفیف ویژه تابستانه
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              با کد تخفیف SUMMER از ۲۰٪ تخفیف ویژه بهره‌مند شوید
            </p>
            <Link href="/products">
              <button className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                خرید کنید
              </button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </div>

      {/* Best Sellers */}
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-semibold text-sm">پرطرفدار</span>
            </div>
            <h2 className="text-2xl font-bold">پرفروش‌ترین محصولات</h2>
            <p className="text-muted-foreground text-sm mt-1">محصولات محبوب مشتریان</p>
          </div>
          <Link href="/products?sort=rating" className="text-primary hover:underline text-sm">
            مشاهده همه
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-green-500 font-semibold text-sm">جدید</span>
            </div>
            <h2 className="text-2xl font-bold">جدیدترین محصولات</h2>
            <p className="text-muted-foreground text-sm mt-1">تازه‌های شاپ‌مارت</p>
          </div>
          <Link href="/products" className="text-primary hover:underline text-sm">
            مشاهده همه
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container-custom py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 hover:bg-secondary/30 rounded-xl transition-all">
            <Truck className="w-10 h-10 mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-sm">ارسال سریع</h4>
            <p className="text-xs text-muted-foreground mt-1">تحویل ۲۴ ساعته</p>
          </div>
          
          <div className="text-center p-4 hover:bg-secondary/30 rounded-xl transition-all">
            <Shield className="w-10 h-10 mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-sm">تضمین اصالت</h4>
            <p className="text-xs text-muted-foreground mt-1">کالاهای اصل</p>
          </div>
          
          <div className="text-center p-4 hover:bg-secondary/30 rounded-xl transition-all">
            <Headphones className="w-10 h-10 mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-sm">پشتیبانی ۲۴/۷</h4>
            <p className="text-xs text-muted-foreground mt-1">همیشه در کنار شما</p>
          </div>
          
          <div className="text-center p-4 hover:bg-secondary/30 rounded-xl transition-all">
            <RefreshCw className="w-10 h-10 mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-sm">بازگشت کالا</h4>
            <p className="text-xs text-muted-foreground mt-1">۷ روز ضمانت</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-secondary/30 py-12 mt-8">
        <div className="container-custom text-center">
          <Mail className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-bold mb-2">عضویت در خبرنامه</h3>
          <p className="text-muted-foreground text-sm mb-6">
            از جدیدترین محصولات و تخفیف‌ها باخبر شوید
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="flex-1 px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition">
              عضویت
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}