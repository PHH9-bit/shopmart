'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// تابع فرمت قیمت به هزار تومان
const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

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

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-1">
            {translateCategory(product.category)}
          </div>
          
          <h3 className="font-semibold line-clamp-2 text-sm mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          {/* حذف کامل بخش امتیاز و تعداد نظرات */}

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="افزودن به سبد خرید"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}