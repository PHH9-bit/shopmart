'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Star, ShoppingCart, Truck, Shield, 
  RefreshCw, ChevronLeft, Minus, Plus,
  Heart, Share2
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/lib/products';
import toast from 'react-hot-toast';

// تابع فرمت قیمت به هزار تومان
const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

// ترجمه دسته‌بندی
const translateCategory = (category: string) => {
  switch (category) {
    case "men's clothing":
      return 'پوشاک مردانه';
    case "women's clothing":
      return 'پوشاک زنانه';
    case 'jewelery':
      return 'جواهرات';
    case 'electronics':
      return 'الکترونیک';
    default:
      return category;
  }
};

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping'>('details');
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const data = mockProducts.find(p => p.id === Number(id));
        if (data) {
          setProduct(data as Product);
          
          // محصولات مرتبط از همان دسته
          const related = mockProducts
            .filter(p => p.category === data.category && p.id !== data.id)
            .slice(0, 4);
          setRelatedProducts(related as Product[]);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('مشکلی در بارگذاری محصول پیش آمد');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      toast.success(`${quantity} عدد ${product.title.slice(0, 40)}... به سبد خرید اضافه شد`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="container-custom py-20">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary h-96 rounded-xl" />
            <div className="space-y-4">
              <div className="bg-secondary h-8 w-3/4 rounded" />
              <div className="bg-secondary h-4 w-1/2 rounded" />
              <div className="bg-secondary h-24 rounded" />
              <div className="bg-secondary h-12 w-1/3 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-4">محصول یافت نشد</h1>
        <Link href="/products" className="text-primary hover:underline">
          بازگشت به صفحه محصولات
        </Link>
      </div>
    );
  }

  const galleryImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto pb-2">
        <Link href="/" className="hover:text-primary">خانه</Link>
        <ChevronLeft className="w-4 h-4 shrink-0" />
        <Link href="/products" className="hover:text-primary">محصولات</Link>
        <ChevronLeft className="w-4 h-4 shrink-0" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary whitespace-nowrap">
          {translateCategory(product.category)}
        </Link>
        <ChevronLeft className="w-4 h-4 shrink-0" />
        <span className="text-foreground line-clamp-1">{product.title}</span>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-background rounded-2xl overflow-hidden">
            <Image
              src={galleryImages[selectedImage]}
              alt={product.title}
              fill
              className="object-contain p-8 transition-transform duration-500"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex gap-3 justify-center">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 bg-secondary/30 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/50'
                }`}
              >
                <Image src={img} alt={`${product.title} - ${index + 1}`} fill className="object-contain p-2" />
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full w-fit">
            {translateCategory(product.category)}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          
          {/* فقط وضعیت موجودی - بدون امتیاز و تعداد نظرات */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              ✓ موجود در انبار
            </div>
          </div>
          
          {/* Price */}
          <div className="border-t border-border pt-6">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl md:text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-muted-foreground line-through">
                {formatPrice(product.price * 1.2)}
              </span>
              <span className="text-sm text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">-۲۰٪</span>
            </div>
            {product.price > 1800000 ? (
              <div className="text-sm text-green-500 mt-1">✨ ارسال رایگان</div>
            ) : (
              <div className="text-sm text-muted-foreground mt-1">
                + {formatPrice(180000)} هزینه ارسال
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">توضیحات محصول</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold">تعداد:</span>
            <div className="flex items-center gap-3 border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-secondary transition-colors rounded-r-lg"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                className="p-2 hover:bg-secondary transition-colors rounded-l-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-muted-foreground">حداکثر ۹۹ عدد</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              افزودن به سبد خرید
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              خرید سریع
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-3 border border-border rounded-lg hover:bg-secondary transition-colors ${isWishlisted ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('لینک محصول کپی شد');
              }}
              className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
            <div className="text-center p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition">
              <Truck className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">ارسال سریع</p>
              <p className="text-xs text-muted-foreground">۲۴ ساعته</p>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition">
              <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">ضمانت اصالت</p>
              <p className="text-xs text-muted-foreground">۱۰۰٪ اصل</p>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition">
              <RefreshCw className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">بازگشت کالا</p>
              <p className="text-xs text-muted-foreground">۷ روز ضمانت</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="flex gap-4 border-b border-border overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-4 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'details' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            توضیحات کامل
            {activeTab === 'details' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 px-4 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === 'shipping' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            شیوه ارسال
            {activeTab === 'shipping' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>

        <div className="p-6 bg-card rounded-xl mt-4 border border-border">
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-lg">مشخصات محصول</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="flex justify-between p-3 bg-secondary/20 rounded-lg">
                  <span className="text-muted-foreground">دسته‌بندی</span>
                  <span className="font-medium">{translateCategory(product.category)}</span>
                </div>
                <div className="flex justify-between p-3 bg-secondary/20 rounded-lg">
                  <span className="text-muted-foreground">شناسه محصول</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl">
                <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">زمان ارسال</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    سفارشات تا ۲۴ ساعت آینده پردازش و ارسال می‌شوند. زمان تحویل بسته به موقعیت مکانی بین ۲ تا ۵ روز کاری متغیر است.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">هزینه ارسال</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    ارسال به سراسر ایران با هزینه {formatPrice(180000)} - ارسال رایگان برای خرید بالای {formatPrice(1800000)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">محصولات مرتبط</h2>
            <Link href="/products" className="text-primary hover:underline text-sm">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => router.push(`/products/${related.id}`)}
              >
                <div className="relative h-40 mb-4 bg-secondary/30 rounded-lg overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition">
                  {related.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">{formatPrice(related.price)}</span>
                  {/* حذف امتیاز و تعداد نظرات از محصولات مرتبط */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}