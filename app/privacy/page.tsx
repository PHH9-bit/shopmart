'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Trash2, Globe } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: 'حریم خصوصی شما برای ما مهم است',
      content: 'در شاپ‌مارت، حریم خصوصی کاربران برای ما اولویت دارد. ما متعهد هستیم که از اطلاعات شخصی شما محافظت کرده و آنها را با هیچ شخص ثالثی به اشتراک نگذاریم.'
    },
    {
      icon: Database,
      title: 'چه اطلاعاتی جمع‌آوری می‌کنیم؟',
      content: 'ما اطلاعات زیر را جمع‌آوری می‌کنیم: نام و نام خانوادگی، آدرس ایمیل، شماره تماس، آدرس تحویل سفارش، اطلاعات پرداخت، تاریخچه خرید و اطلاعات مرورگر شما.'
    },
    {
      icon: Lock,
      title: 'چگونه از اطلاعات شما محافظت می‌کنیم؟',
      content: 'ما از پروتکل SSL برای رمزگذاری اطلاعات استفاده می‌کنیم. تمام اطلاعات پرداخت شما مستقیماً به درگاه‌های بانکی متصل می‌شود و در سرورهای ما ذخیره نمی‌شود.'
    },
    {
      icon: Eye,
      title: 'چگونه از اطلاعات شما استفاده می‌کنیم؟',
      content: 'از اطلاعات شما برای پردازش سفارشات، بهبود خدمات، ارسال خبرنامه (در صورت تمایل)، پاسخگویی به سوالات و بهبود تجربه کاربری استفاده می‌شود.'
    },
    {
      icon: Mail,
      title: 'ایمیل‌های تبلیغاتی',
      content: 'ما فقط با اجازه شما ایمیل‌های تبلیغاتی ارسال می‌کنیم. شما می‌توانید در هر زمان با کلیک روی لینک لغو اشتراک در انتهای ایمیل‌ها، از دریافت آنها انصراف دهید.'
    },
    {
      icon: Trash2,
      title: 'حذف اطلاعات',
      content: 'شما حق دارید درخواست حذف اطلاعات خود را بدهید. برای این کار کافی است با پشتیبانی تماس بگیرید و اطلاعات شما ظرف ۳۰ روز حذف خواهد شد.'
    },
    {
      icon: Globe,
      title: 'تغییرات در سیاست حریم خصوصی',
      content: 'ما ممکن است این سیاست را به‌روزرسانی کنیم. هرگونه تغییر در این صفحه منتشر خواهد شد. توصیه می‌کنیم به صورت دوره‌ای این صفحه را بررسی کنید.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">حریم خصوصی کاربران</h1>
        <p className="text-muted-foreground">
          آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
        </p>
        <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-sm text-muted-foreground">
          این سیاست حریم خصوصی نحوه جمع‌آوری، استفاده و محافظت از اطلاعات شما را شرح می‌دهد
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-8 p-6 bg-card rounded-xl border border-border hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contact for Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-primary/5 rounded-xl text-center"
        >
          <p className="text-muted-foreground">
            اگر سوالی در مورد حریم خصوصی دارید، با ما تماس بگیرید:
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="/contact" className="text-primary hover:underline">تماس با ما</a>
            <span className="text-muted-foreground">|</span>
            <a href="mailto:privacy@shopmart.com" className="text-primary hover:underline">
              privacy@shopmart.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}