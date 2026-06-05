'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'چگونه می‌توانم سفارش خود را ثبت کنم؟',
      answer: 'برای ثبت سفارش کافیست محصول مورد نظر را به سبد خرید اضافه کنید، سپس اطلاعات ارسال و پرداخت را تکمیل کنید و نهایتاً سفارش خود را نهایی کنید.'
    },
    {
      question: 'هزینه ارسال چقدر است؟',
      answer: 'هزینه ارسال برای خریدهای بالای ۱۰۰ دلار رایگان است. در غیر این صورت، هزینه ارسال ۱۰ دلار می‌باشد.'
    },
    {
      question: 'مدت زمان ارسال چقدر است؟',
      answer: 'سفارشات معمولاً ظرف ۲۴ ساعت پردازش شده و بسته به موقعیت مکانی، بین ۲ تا ۵ روز کاری تحویل داده می‌شوند.'
    },
    {
      question: 'آیا امکان بازگشت کالا وجود دارد؟',
      answer: 'بله، شما تا ۷ روز پس از دریافت کالا می‌توانید در صورت عدم رضایت، کالا را بازگردانید.'
    },
    {
      question: 'چگونه می‌توانم سفارش خود را پیگیری کنم؟',
      answer: 'پس از ثبت سفارش، کد رهگیری برای شما ارسال می‌شود که می‌توانید از طریق آن وضعیت سفارش خود را پیگیری کنید.'
    },
    {
      question: 'آیا محصولات اصل هستند؟',
      answer: 'بله، تمام محصولات ارائه شده در شاپ‌مارت ۱۰۰٪ اصل و با ضمانت اصالت کالا می‌باشند.'
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">سوالات متداول</h1>
        <p className="text-muted-foreground">
          پاسخ سوالات خود را پیدا کنید. اگر سوال شما در اینجا نیست، با ما تماس بگیرید.
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو در سوالات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence>
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full p-5 text-right hover:bg-secondary/30 transition"
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-border">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground">هیچ سوالی با عبارت "{searchTerm}" یافت نشد</p>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl"
      >
        <p className="text-muted-foreground mb-4">هنوز سوالی دارید؟</p>
        <a href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          تماس با پشتیبانی
        </a>
      </motion.div>
    </div>
  );
}