'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, Heart, Truck, Headphones, Clock, CreditCard } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'اعتماد', desc: 'شفافیت و صداقت در همه چیز' },
    { icon: Award, title: 'کیفیت', desc: 'محصولات درجه یک و با ضمانت' },
    { icon: Users, title: 'مشتری مداری', desc: 'رضایت شما اولویت ماست' },
    { icon: Heart, title: 'تعهد', desc: 'پایبندی به وعده‌ها' },
  ];

  const stats = [
    { value: '۵۰,۰۰۰+', label: 'مشتری راضی' },
    { value: '۱۰,۰۰۰+', label: 'محصول متنوع' },
    { value: '۵۰۰+', label: 'برند معتبر' },
    { value: '۴.۸/۵', label: 'امتیاز مشتریان' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          درباره شاپ‌مارت
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          شاپ‌مارت متولد ۱۴۰۰ با هدف ارائه بهترین تجربه خرید آنلاین. ما معتقدیم خرید اینترنتی باید آسان، امن و لذت‌بخش باشد.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-xl border border-border p-8"
        >
          <h2 className="text-2xl font-bold mb-4">🎯 ماموریت ما</h2>
          <p className="text-muted-foreground leading-relaxed">
            دسترسی آسان و عادلانه همه ایرانیان به بهترین کالاها با قیمت مناسب، همراه با تجربه خریدی بی‌نقص.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-xl border border-border p-8"
        >
          <h2 className="text-2xl font-bold mb-4">👁️ چشم‌انداز ما</h2>
          <p className="text-muted-foreground leading-relaxed">
            تبدیل شدن به بزرگترین پلتفرم تجارت الکترونیک ایران با نوآوری در خدمات و تجربه کاربری.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl"
          >
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <h2 className="text-2xl font-bold text-center mb-8">ارزش‌های ما</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition"
          >
            <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
            <p className="text-sm text-muted-foreground">{value.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-center mb-8">چرا شاپ‌مارت؟</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Truck, title: 'ارسال سریع', desc: 'تحویل در کمترین زمان' },
          { icon: Shield, title: 'تضمین اصالت', desc: 'کالاهای ۱۰۰٪ اصل' },
          { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما' },
          { icon: Clock, title: 'بازگشت آسان', desc: '۷ روز ضمانت بازگشت' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-card rounded-xl border border-border"
          >
            <feature.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}