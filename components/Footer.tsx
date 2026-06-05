'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, CreditCard, Truck, Shield, Headphones,
  Share2, Globe, MessageCircle, Video, Briefcase
} from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
    { name: 'قوانین و مقررات', href: '/terms' },
    { name: 'حریم خصوصی', href: '/privacy' },
    { name: 'سوالات متداول', href: '/faq' },
  ];

  const categories = [
    { name: 'الکترونیک', href: '/category/electronics' },
    { name: 'پوشاک مردانه', href: "/category/men's clothing" },
    { name: 'پوشاک زنانه', href: "/category/women's clothing" },
    { name: 'جواهرات', href: '/category/jewelery' },
  ];

  const socials = [
    { icon: Share2, href: '#', color: 'hover:bg-blue-500', name: 'اشتراک گذاری' },
    { icon: Globe, href: '#', color: 'hover:bg-green-500', name: 'وبسایت' },
    { icon: MessageCircle, href: '#', color: 'hover:bg-emerald-500', name: 'پیام رسان' },
    { icon: Video, href: '#', color: 'hover:bg-red-500', name: 'ویدئو' },
    { icon: Briefcase, href: '#', color: 'hover:bg-purple-500', name: 'حرفه ای' },
  ];

  return (
    <footer className="bg-gradient-to-b from-card to-secondary/30 border-t border-border mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-2"
            >
              عضویت در خبرنامه
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-6"
            >
              اولین نفری باشید که از تخفیف‌ها و محصولات جدید مطلع می‌شوید
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                عضویت
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              شاپ‌مارت
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              بزرگترین فروشگاه آنلاین ایران با بهترین قیمت‌ها و کیفیت تضمینی. تجربه خریدی لذت‌بخش و آسان.
            </p>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 bg-secondary rounded-full text-muted-foreground transition-all ${social.color} hover:text-white`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
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
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
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
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link 
                    href={cat.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
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
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
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
            { icon: Shield, title: 'ضمانت بازگشت', desc: '۷ روز ضمانت بدون قید و شرط' },
            { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در خدمت شما' },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-4 rounded-xl hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
            >
              <feature.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h5 className="font-semibold text-sm">{feature.title}</h5>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="text-center pt-8 mt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} شاپ‌مارت. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            طراحی و توسعه با ❤️ برای بهترین تجربه خرید
          </p>
        </div>
      </div>
    </footer>
  );
}