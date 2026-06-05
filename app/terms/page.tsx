'use client';

import { motion } from 'framer-motion';
import { 
  FileText, ShoppingBag, Truck, RefreshCw, CreditCard, 
  AlertCircle, CheckCircle, XCircle, Clock, UserCheck, Shield 
} from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const terms = [
    {
      icon: ShoppingBag,
      title: 'ثبت سفارش',
      items: [
        'پس از ثبت سفارش، ایمیل تاییدیه برای شما ارسال می‌شود',
        'امکان ویرایش یا لغو سفارش تا ۱ ساعت پس از ثبت وجود دارد',
        'در صورت عدم موجودی کالا، سفارش شما لغو و مبلغ بازگردانده می‌شود'
      ]
    },
    {
      icon: CreditCard,
      title: 'پرداخت و قیمت‌ها',
      items: [
        'قیمت محصولات به تومان و شامل مالیات می‌باشد',
        'شاپ‌مارت حق تغییر قیمت‌ها را بدون اطلاع قبلی دارد',
        'پرداخت فقط از طریق درگاه‌های معتبر بانکی انجام می‌شود'
      ]
    },
    {
      icon: Truck,
      title: 'ارسال سفارش',
      items: [
        'سفارشات تا ۲۴ ساعت کاری بعد از ثبت، ارسال می‌شوند',
        'هزینه ارسال بر اساس شهر مقصد محاسبه می‌شود',
        'ارسال برای خریدهای بالای ۱۰۰ دلار رایگان است'
      ]
    },
    {
      icon: RefreshCw,
      title: 'بازگشت کالا',
      items: [
        'امکان بازگشت کالا تا ۷ روز پس از تحویل وجود دارد',
        'کالا باید در بسته‌بندی اصلی و بدون استفاده باشد',
        'هزینه بازگشت کالا به عهده خریدار است'
      ]
    },
    {
      icon: UserCheck,
      title: 'حساب کاربری',
      items: [
        'مسئولیت حفظ امنیت حساب کاربری بر عهده شماست',
        'در صورت فعالیت غیرمجاز، سریعاً به پشتیبانی اطلاع دهید',
        'شاپ‌مارت حق مسدود کردن حساب‌های متخلف را دارد'
      ]
    },
    {
      icon: AlertCircle,
      title: 'تضمین و گارانتی',
      items: [
        'تمامی کالاها دارای ضمانت اصالت و سلامت فیزیکی هستند',
        'کالاهای الکترونیک دارای گارانتی رسمی می‌باشند',
        'در صورت وجود مشکل، کالا تعویض یا وجه بازگردانده می‌شود'
      ]
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
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">قوانین و مقررات</h1>
        <p className="text-muted-foreground">
          آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
        </p>
        <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg text-sm text-yellow-600 dark:text-yellow-400">
          لطفاً قبل از استفاده از خدمات شاپ‌مارت، این قوانین را مطالعه کنید
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-card rounded-xl border border-border"
        >
          <p className="text-muted-foreground leading-relaxed">
            استفاده از وب‌سایت شاپ‌مارت به معنی پذیرش کامل قوانین و مقررات زیر است. 
            لطفاً این قوانین را با دقت مطالعه فرمایید. در صورت عدم موافقت با هر یک از موارد، 
            لطفاً از این وب‌سایت استفاده نکنید.
          </p>
        </motion.div>

        {/* Terms Sections */}
        {terms.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6 p-6 bg-card rounded-xl border border-border hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <ul className="space-y-2 mr-6">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-red-500/5 rounded-xl border border-red-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-500 mb-2">سلب مسئولیت</h3>
              <p className="text-sm text-muted-foreground">
                شاپ‌مارت هیچ مسئولیتی در قبال مشکلات ناشی از اینترنت، اختلال در شبکه، 
                خطاهای بانکی یا مشکلات فنی ندارد. همچنین مسئولیت استفاده نادرست از 
                اطلاعات حساب کاربری بر عهده کاربر است.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-primary/5 rounded-xl text-center"
        >
          <p className="text-muted-foreground">
            برای اطلاعات بیشتر یا سوالات قانونی، با ما تماس بگیرید:
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/contact" className="text-primary hover:underline">تماس با ما</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/privacy" className="text-primary hover:underline">حریم خصوصی</Link>
            <span className="text-muted-foreground">|</span>
            <a href="mailto:legal@shopmart.com" className="text-primary hover:underline">
              legal@shopmart.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}