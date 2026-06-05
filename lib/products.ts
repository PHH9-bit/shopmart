export const mockProducts = [
  // ========== ELECTRONICS (6 محصول) ==========
  {
    id: 9,
    title: "هارد اکسترنال وسترن دیجیتال 2 ترابایت",
    price: 1150000,
    description: "درایو اکسترنال 2 ترابایتی وسترن دیجیتال با رابط USB 3.0، سرعت انتقال بالا، سازگار با ویندوز و مک، مناسب برای پشتیبان‌گیری و ذخیره‌سازی اطلاعات.",
    category: "electronics",
    image: "/images/products/external-hard-2tb.png",
    rating: { rate: 4.5, count: 205 }
  },
  {
    id: 10,
    title: "اس اس دی سندیسک 1 ترابایت",
    price: 1960000,
    description: "SSD 1 ترابایتی سندیسک، سرعت خواندن تا 560 مگابایت بر ثانیه، مناسب برای بازی و اجرای سنگین برنامه‌ها.",
    category: "electronics",
    image: "/images/products/ssd-sandisk-1tb.png",
    rating: { rate: 2.9, count: 470 }
  },
  {
    id: 11,
    title: "اس اس دی سیلیکون پاور 256 گیگابایت",
    price: 1960000,
    description: "SSD 256 گیگابایتی سیلیکون پاور با فناوری 3D NAND، سرعت بالا، مناسب برای لپ‌تاپ و کامپیوترهای شخصی.",
    category: "electronics",
    image: "/images/products/ssd-silicon-power-256gb.png",
    rating: { rate: 4.8, count: 319 }
  },
  {
    id: 12,
    title: "هارد گیمینگ وسترن دیجیتال 4 ترابایت",
    price: 2050000,
    description: "هارد اکسترنال 4 ترابایتی مخصوص پلی‌استیشن 4، سرعت بالا، مناسب برای ذخیره بازی‌های سنگین.",
    category: "electronics",
    image: "/images/products/hard-gaming-western-4tb.png",
    rating: { rate: 4.8, count: 400 }
  },
  {
    id: 13,
    title: "مانیتور 21.5 اینچی ایسر",
    price: 10780000,
    description: "مانیتور 21.5 اینچ ایسر با کیفیت فول اچ‌دی، صفحه نمایش IPS، زاویه دید عالی، مناسب برای کارهای اداری و خانگی.",
    category: "electronics",
    image: "/images/products/monitor-21.5-inch.png",
    rating: { rate: 2.9, count: 250 }
  },
  {
    id: 14,
    title: "مانیتور گیمینگ سامسونگ 49 اینچ خمیده",
    price: 18000000,
    description: "مانیتور 49 اینچ خمیده سامسونگ با نسبت 32:9، مناسب برای گیمینگ حرفه‌ای، نرخ بروزرسانی 144 هرتز.",
    category: "electronics",
    image: "/images/products/monitor-49-inch-samsung.png",
    rating: { rate: 2.2, count: 140 }
  },

  // ========== JEWELERY (4 محصول) ==========
  {
    id: 5,
    title: "دستبند طلا و نقره اژدها",
    price: 12510000,
    description: "دستبند ناگا با طرح اژدها، تلفیقی از طلا و نقره، طراحی منحصر به فرد، مناسب برای هدیه و مجالس خاص.",
    category: "jewelery",
    image: "/images/products/dragon-silgold.png",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "دستبند میکروپاو طلای جامد",
    price: 3020000,
    description: "دستبند طلای جامد با طراحی میکروپاو، ظریف و شیک، ضمانت بازگشت و تعویض کالا.",
    category: "jewelery",
    image: "/images/products/micropa-solidgold.png",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 7,
    title: "گردنبند پرنسسی",
    price: 180000,
    description: "گردنبند کلاسیک عروسی با طرح پرنسسی، مناسب برای هدیه و نامزدی، طراحی زیبا و شیک.",
    category: "jewelery",
    image: "/images/products/diamond-princes.png",
    rating: { rate: 3.0, count: 400 }
  },
  {
    id: 8,
    title: "گوشواره استیل رزگلد",
    price: 198000,
    description: "گوشواره استیل با روکش رزگلد، ضد حساسیت و سبک، مناسب برای استفاده روزمره.",
    category: "jewelery",
    image: "/images/products/steel-rosegold.png",
    rating: { rate: 1.9, count: 100 }
  },

  // ========== MEN'S CLOTHING (4 محصول) ==========
  {
    id: 1,
    title: "کوله‌پشتی فجرآون",
    price: 1979000,
    description: "کوله‌پشتی عالی برای استفاده روزمره و پیاده‌روی. دارای جیب‌های متعدد و مقاوم در برابر آب.",
    category: "men's clothing",
    image: "/images/products/fjaven-backpack.png",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "تیشرت اسپرت مردانه",
    price: 445000,
    description: "تیشرت اسپرت با طراحی اسلیم، آستین بلند، مناسب برای فصول بهار و پاییز.",
    category: "men's clothing",
    image: "/images/products/sport-t-shirt.png",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "ژاکت پنبه‌ای مردانه",
    price: 985000,
    description: "ژاکت عالی برای فصل‌های بهار، پاییز و زمستان. دارای کیفیت بالا و طراحی شیک.",
    category: "men's clothing",
    image: "/images/products/cotton-jacket.png",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "تیشرت اسلیم فیت مردانه",
    price: 289000,
    description: "جنس با کیفیت و طراحی مدرن. مناسب فصل تابستان.",
    category: "men's clothing",
    image: "/images/products/slimfit-t-shirt.png",
    rating: { rate: 2.1, count: 430 }
  },

  // ========== WOMEN'S CLOTHING (6 محصول) ==========
  {
    id: 15,
    title: "کت برفی زنانه ۳ کاره",
    price: 1025000,
    description: "کت استاندارد، مناسب برای زمستان و ورزش‌های زمستانی. ضد آب و باد.",
    category: "women's clothing",
    image: "/images/products/snowy-jacket.png",
    rating: { rate: 2.6, count: 235 }
  },
  {
    id: 16,
    title: "کت چرم زنانه با کلاه",
    price: 539000,
    description: "بدنه از پلی‌یورتان، آستر از پلی‌استر، کیفیت عالی. مناسب فصل پاییز و زمستان.",
    category: "women's clothing",
    image: "/images/products/leather-jacket.png",
    rating: { rate: 2.9, count: 340 }
  },
  {
    id: 17,
    title: "کت بارانی زنانه راه راه",
    price: 719000,
    description: "سبک و مناسب برای سفر و استفاده روزمره. مقاوم در برابر آب و باد.",
    category: "women's clothing",
    image: "/images/products/striped-raincoat.png",
    rating: { rate: 3.8, count: 679 }
  },
  {
    id: 18,
    title: "بلوز یقه هفتی زنانه",
    price: 177000,
    description: "95٪ ریون 5٪ اسپاندکس، کیفیت عالی و طراحی شیک.",
    category: "women's clothing",
    image: "/images/products/boat-neck-blouse.png",
    rating: { rate: 4.7, count: 130 }
  },
  {
    id: 19,
    title: "بلوز آستین کوتاه زنانه",
    price: 143000,
    description: "100٪ پلی‌استر، قابل شستشو با ماشین، طرح مدرن. مناسب فصل تابستان.",
    category: "women's clothing",
    image: "/images/products/short-sleeve-blouse.png",
    rating: { rate: 4.5, count: 146 }
  },
  {
    id: 20,
    title: "تیشرت زنانه نخی کژوال",
    price: 233000,
    description: "95٪ پنبه 5٪ اسپاندکس، آستین کوتاه، طرح حروف انگلیسی. بسیار نرم و راحت.",
    category: "women's clothing",
    image: "/images/products/cotton-t-shirt.png",
    rating: { rate: 3.6, count: 145 }
  }
];

// پیدا کردن گران‌ترین قیمت
export const getMaxPrice = () => {
  return Math.max(...mockProducts.map(p => p.price));
};

// پیدا کردن ارزان‌ترین قیمت
export const getMinPrice = () => {
  return Math.min(...mockProducts.map(p => p.price));
};