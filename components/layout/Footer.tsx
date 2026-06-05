'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, 
  Share2, Globe, MessageCircle, Video,
  CreditCard, Truck, Shield, Headphones,
  CheckCircle, XCircle, Loader2
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('لطفاً یک ایمیل معتبر وارد کنید');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('عضویت شما با موفقیت ثبت شد!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'خطا در عضویت');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('خطا در ارتباط با سرور');
    }
    
    setTimeout(() => setStatus('idle'), 3000);
  };




  const quickLinks = [
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
    { name: 'قوانین و مقررات', href: '/terms' },
    { name: 'حریم خصوصی', href: '/privacy' },
    { name: 'سوالات متداول', href: '/faq' },
  ];

  const categories = [
    { name: 'الکترونیک', href: '/products?category=electronics' },
    { name: 'پوشاک مردانه', href: '/products?category=mens-clothing' },
    { name: 'پوشاک زنانه', href: '/products?category=womens-clothing' },
    { name: 'جواهرات', href: '/products?category=jewelery' },
  ];

  const socialLinks = [
    { icon: Share2, name: 'اشتراک‌گذاری', href: '#', color: 'hover:bg-blue-500' },
    { icon: Globe, name: 'وبسایت', href: '#', color: 'hover:bg-green-500' },
    { icon: MessageCircle, name: 'پیام‌رسان', href: '#', color: 'hover:bg-emerald-500' },
    { icon: Video, name: 'ویدئو', href: '#', color: 'hover:bg-red-500' },
  ];

  return (
    <footer className="bg-gradient-to-b from-card to-secondary/30 border-t border-border mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Mail className="w-12 h-12 mx-auto mb-3 text-primary" />
              <h3 className="text-2xl font-bold mb-2">عضویت در خبرنامه</h3>
              <p className="text-muted-foreground mb-6">
                اولین نفری باشید که از تخفیف‌ها و محصولات جدید مطلع می‌شوید
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : status === 'error' ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    'عضویت'
                  )}
                </button>
              </form>
              {message && (
                <p className={`text-sm mt-3 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              شاپ‌مارت
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              اولین و بزرگترین فروشگاه آنلاین لوکس ایران با بهترین قیمت‌ها و کیفیت تضمینی.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`p-2 bg-secondary rounded-full text-muted-foreground transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-4">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground group">
                <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span>تهران، خیابان ولیعصر</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground group">
                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground group">
                <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span>info@shopmart.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground group">
                <Clock className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span>شنبه تا پنجشنبه ۹ تا ۱۸</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border"
        >
          {[
            { icon: CreditCard, title: 'پرداخت امن', desc: 'اتصال به درگاه‌های معتبر' },
            { icon: Truck, title: 'ارسال سریع', desc: 'تحویل در کمترین زمان' },
            { icon: Shield, title: 'ضمانت بازگشت', desc: '۷ روز ضمانت' },
            { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما' },
          ].map((feature, i) => (
            <div key={i} className="text-center p-3 rounded-xl hover:bg-secondary/50 transition-all duration-300 group cursor-pointer">
              <feature.icon className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-sm">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="text-center pt-8 mt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © {currentYear} شاپ‌مارت. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            طراحی شده با ❤️ برای بهترین تجربه خرید
          </p>
        </div>
      </div>
    </footer>
  );
}