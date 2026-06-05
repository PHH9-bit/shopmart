# 🛍️ شاپ‌مارت | فروشگاه آنلاین کامل با Next.js

یک فروشگاه آنلاین مدرن و حرفه‌ای با قابلیت‌های کامل فروشگاهی، احراز هویت با کد یکبارمصرف (OTP)، پنل مدیریت محصولات، خبرنامه و سیستم سبد خرید پیشرفته.

## ✨ ویژگی‌های کلیدی

- **معماری مدرن**: ساخته شده با **Next.js 15 (App Router)**، **TypeScript** و **Tailwind CSS 4**
- **احراز هویت بدون رمز عبور**: ورود و ثبت‌نام با استفاده از کد تایید ۶ رقمی ارسال شده به ایمیل (SMTP)
- **پنل مدیریت کامل**: امکان افزودن، ویرایش و حذف محصولات (دسترسی فقط برای ادمین)
- **سبد خرید پیشرفته**: اضافه کردن، حذف و تغییر تعداد محصولات همراه با ذخیره‌سازی در `localStorage`
- **سیستم خبرنامه**: ثبت‌نام کاربران و ذخیره ایمیل‌ها در فایل JSON
- **اسلایدر تبلیغاتی و دسته‌بندی**: نمایش زیبا و جذاب در صفحه اصلی
- **جستجو و فیلتر پیشرفته**: جستجوی محصولات با قابلیت نرمالایز کردن متن فارسی
- **طراحی واکنش‌گرا و تم**: ظاهر کاملاً ریسپانسیو برای موبایل و دسکتاپ، همراه با قابلیت سوییچ بین تم روشن/تاریک
- **تجربه کاربری روان**: انیمیشن‌های نرم با `Framer Motion` و نمایش پیام‌های `Toast`

## 🛠️ تکنولوژی‌های استفاده شده

| تکنولوژی | کاربرد |
|-----------|--------|
| [Next.js 15](https://nextjs.org/) | فریمورک اصلی |
| [TypeScript](https://www.typescriptlang.org/) | تایپ‌سازی قوی |
| [Tailwind CSS](https://tailwindcss.com/) | استایل‌دهی |
| [Zustand](https://zustand-demo.pmnd.rs/) | مدیریت سبد خرید |
| [Framer Motion](https://www.framer.com/motion/) | انیمیشن‌ها |
| [Lucide React](https://lucide.dev/) | آیکون‌ها |
| [nodemailer](https://nodemailer.com/) | ارسال ایمیل |
| [jsonwebtoken](https://jwt.io/) | احراز هویت |

## 📁 ساختار پروژه

```
shop-master/
├── app/                    # صفحات اصلی (App Router)
│   ├── admin/              # پنل مدیریت (محافظت شده)
│   ├── api/                # مسیرهای API
│   │   ├── auth/           # احراز هویت (ارسال/تایید کد، خروج)
│   │   └── newsletter/     # خبرنامه
│   ├── cart/               # صفحه سبد خرید
│   ├── checkout/           # صفحه تسویه حساب
│   ├── login/              # صفحه ورود با کد ایمیل
│   ├── products/           # صفحات محصولات (لیست و جزئیات)
│   ├── about/              # درباره ما
│   ├── contact/            # تماس با ما
│   ├── faq/                # سوالات متداول
│   ├── privacy/            # حریم خصوصی
│   ├── terms/              # قوانین و مقررات
│   ├── layout.tsx          # layout اصلی
│   ├── page.tsx            # صفحه اصلی
│   └── globals.css         # استایل‌های سراسری
├── components/             # کامپوننت‌های قابل استفاده مجدد
│   ├── layout/             # هدر و فوتر
│   ├── ui/                 # کامپوننت‌های UI کوچک
│   ├── ProductCard.tsx     # کارت محصول
│   ├── Hero.tsx            # بخش هیرو
│   ├── CategorySlider.tsx  # اسلایدر دسته‌بندی
│   ├── PromoSlider.tsx     # اسلایدر تبلیغاتی
│   └── SearchBar.tsx       # نوار جستجو
├── context/                # Context API
│   ├── ThemeContext.tsx    # مدیریت تم روشن/تاریک
│   └── CartContext.tsx     # مدیریت سبد خرید
├── lib/                    # داده‌ها و ابزارها
│   ├── products.ts         # محصولات نمونه (فارسی)
│   └── constants.ts        # مقادیر ثابت
├── public/                 # فایل‌های استاتیک
│   └── images/             # تصاویر محصولات و اسلایدرها
├── store/                  # مدیریت Zustand
├── types/                  # تعریف تایپ‌های TypeScript
├── middleware.ts           # محافظت از مسیر ادمین
├── .env.local              # متغیرهای محیطی (حساس)
├── subscribers.json        # ذخیره ایمیل‌های خبرنامه
└── login-logs.json         # ذخیره تاریخچه ورود کاربران
```

## 🚀 راه‌اندازی و اجرا

### پیش‌نیازها
- Node.js نسخه 18 یا بالاتر
- npm، yarn یا pnpm

### مراحل نصب

1. **کلون مخزن**
```bash
git clone https://github.com/your-username/shopmart.git
cd shopmart
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **تنظیم متغیرهای محیطی**
   
   یک فایل `.env.local` در ریشه پروژه ایجاد کنید و اطلاعات زیر را وارد کنید:

```env
# SMTP Settings (برای ارسال کد تایید)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# JWT Secret
JWT_SECRET=your_super_secret_key

# Admin Email
ADMIN_EMAIL=your-admin-email@gmail.com
```

4. **اجرای پروژه در حالت توسعه**
```bash
npm run dev
```

سپس در مرورگر به آدرس `http://localhost:3000` بروید.

## 🔑 دسترسی به پنل مدیریت

برای ورود به پنل ادمین (`/admin`):

1. در صفحه ورود (`/login`)، ایمیل ادمین (تنظیم شده در `.env.local`) را وارد کنید
2. کد تایید ۶ رقمی ارسال شده به ایمیل را وارد کنید
3. پس از تایید، به طور خودکار به پنل مدیریت هدایت می‌شوید

### قابلیت‌های پنل مدیریت:
- ✅ مشاهده لیست تمام محصولات
- ✅ افزودن محصول جدید
- ✅ ویرایش محصولات موجود
- ✅ حذف محصولات
- ✅ مشاهده آمار فروش (قابل توسعه)

## 📬 سیستم خبرنامه

کاربران می‌توانند با وارد کردن ایمیل خود در فوتر سایت، در خبرنامه عضو شوند. ایمیل‌ها در فایل `subscribers.json` ذخیره می‌شوند.

**مشاهده لیست اعضا (فقط ادمین):**
```
http://localhost:3000/api/newsletter?token=admin123
```

## 📱 صفحات موجود در سایت

| مسیر | صفحه | توضیح |
|------|------|-------|
| `/` | صفحه اصلی | اسلایدر تبلیغاتی + دسته‌بندی + محصولات |
| `/products` | لیست محصولات | فیلتر، جستجو و مرتب‌سازی |
| `/products/[id]` | جزئیات محصول | اطلاعات کامل + محصولات مرتبط |
| `/cart` | سبد خرید | مدیریت محصولات انتخاب شده |
| `/checkout` | تسویه حساب | تکمیل اطلاعات و پرداخت |
| `/login` | ورود | احراز هویت با کد ایمیل |
| `/admin` | پنل مدیریت | مدیریت محصولات |
| `/about` | درباره ما | اطلاعات فروشگاه |
| `/contact` | تماس با ما | فرم ارتباطی |
| `/faq` | سوالات متداول | پاسخ به سوالات رایج |
| `/privacy` | حریم خصوصی | سیاست‌های حفظ اطلاعات |
| `/terms` | قوانین و مقررات | شرایط استفاده از سایت |

## 🎨 تصاویر اسلایدرها

برای اسلایدر تبلیغاتی و دسته‌بندی، تصاویر را در پوشه زیر قرار دهید:

```
public/images/promo/     # تصاویر اسلایدر تبلیغاتی
public/images/categories/ # تصاویر دسته‌بندی‌ها
```

## 🔧 عیب‌یابی مشکلات رایج

### خطای `Module not found`
```bash
rm -rf .next node_modules/.cache
npm install
npm run dev
```

### خطای `Cannot update a component`
این خطا معمولاً به دلیل `toast` داخل `setItems` است که در آخرین نسخه برطرف شده.

### خطای SMTP در ارسال کد
مطمئن شوید:
- `.env.local` به درستی تنظیم شده
- از `App Password` گوگل استفاده کرده‌اید (نه رمز عادی)
- `lesssecureapps` غیرفعال است

## 📦 ساخت نسخه نهایی برای دیپلوی

```bash
npm run build
```

سپس برای اجرای نسخه ساخته شده:

```bash
npm run start
```

## 🌐 دیپلوی روی Vercel

1. کدهای پروژه را در گیت‌هاب آپلود کنید
2. در [Vercel](https://vercel.com) ثبت‌نام کرده و مخزن را import کنید
3. متغیرهای محیطی (`.env.local`) را در تنظیمات Vercel اضافه کنید
4. Deploy را بزنید

## 👨‍💻 توسعه‌دهنده

**پویان حیدری (Pouyan Heydari)**

- **وبسایت شخصی**: [https://pouyan-ai.ir](https://pouyan-ai.ir)
- **برند**: Pouyan-AI
- **تخصص**: طراح سایت و توسعه‌دهنده حرفه‌ای فرانت‌اند با React و Next.js

این پروژه فروشگاهی کامل با استفاده از Next.js 15، TypeScript، Tailwind CSS و بهینه‌سازی‌های پیشرفته سئو و کارایی، توسط بنده طراحی و پیاده‌سازی شده است.

## 📜 مجوز

این پروژه تحت مجوز **MIT** منتشر شده است.

```
MIT License

Copyright (c) 2024 پویان حیدری (Pouyan Heydari) - Pouyan-AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following condition:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

**استفاده از کدها با ذکر نام طراح (پویان حیدری - Pouyan-AI) آزاد است.**

---

<div align="center">
ساخته شده با ❤️ توسط <a href="https://pouyan-ai.ir">پویان حیدری</a> | Pouyan-AI
</div>