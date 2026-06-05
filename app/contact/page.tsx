'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('پیام شما با موفقیت ارسال شد');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, title: 'آدرس', text: 'تهران، خیابان ولیعصر، پلاک ۱۲۳', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950' },
    { icon: Phone, title: 'تلفن', text: '۰۲۱-۱۲۳۴۵۶۷۸', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
    { icon: Mail, title: 'ایمیل', text: 'info@shopmart.com', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950' },
    { icon: Clock, title: 'ساعت کاری', text: 'شنبه تا پنجشنبه ۹ تا ۱۸', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">تماس با ما</h1>
          <p className="text-muted-foreground">
            ما همیشه آماده پاسخگویی به سوالات و شنیدن نظرات شما هستیم
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-xl border border-border ${item.bg}`}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold mb-6">ارسال پیام</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">نام کامل *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="نام و نام خانوادگی"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ایمیل *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">موضوع *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="موضوع پیام"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">پیام شما *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="متن پیام خود را بنویسید..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>در حال ارسال...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      ارسال پیام
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="h-80 bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                <p className="text-muted-foreground">نقشه گوگل - تهران، خیابان ولیعصر</p>
                <p className="text-sm text-muted-foreground">برای مشاهده نقشه، لطفاً API key را اضافه کنید</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}