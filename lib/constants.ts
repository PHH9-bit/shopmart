export const CATEGORIES = [
  { id: 'all', name: 'همه محصولات', slug: 'all', icon: '📦', color: 'bg-gray-500' },
  { id: 'electronics', name: 'الکترونیک', slug: 'electronics', icon: '💻', color: 'bg-blue-500' },
  { id: 'jewelery', name: 'جواهرات', slug: 'jewelery', icon: '💎', color: 'bg-purple-500' },
  { id: "men's clothing", name: 'پوشاک مردانه', slug: 'mens-clothing', icon: '👔', color: 'bg-green-500' },
  { id: "women's clothing", name: 'پوشاک زنانه', slug: 'womens-clothing', icon: '👗', color: 'bg-pink-500' },
];

export const SORT_OPTIONS = [
  { value: 'default', label: 'پیش‌فرض', icon: '🔥' },
  { value: 'price_asc', label: 'ارزان‌ترین', icon: '💰' },
  { value: 'price_desc', label: 'گران‌ترین', icon: '💎' },
  { value: 'rating', label: 'محبوب‌ترین', icon: '⭐' },
];

export const SHIPPING_COST = 10;
export const FREE_SHIPPING_THRESHOLD = 100;
export const TAX_RATE = 0.09;

export const BANNERS = [
  { id: 1, title: 'تخفیف ویژه تابستانه', subtitle: 'تا ۵۰٪ تخفیف', image: '/images/banner1.jpg', color: 'from-orange-500 to-red-500' },
  { id: 2, title: 'جدیدترین محصولات', subtitle: 'با کیفیت تضمینی', image: '/images/banner2.jpg', color: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'ارسال رایگان', subtitle: 'برای خرید بالای ۱۰۰ دلار', image: '/images/banner3.jpg', color: 'from-green-500 to-emerald-500' },
];