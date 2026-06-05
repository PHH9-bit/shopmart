'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    name: 'الکترونیک',
    slug: 'electronics',
    image: '/images/categories/electronics.png',
    productCount: 6,
    link: '/products?category=electronics',
  },
  {
    id: 'jewelery',
    name: 'جواهرات',
    slug: 'jewelery',
    image: '/images/categories/jewelery.png',
    productCount: 4,
    link: '/products?category=jewelery',
  },
  {
    id: "men's clothing",
    name: 'پوشاک مردانه',
    slug: "men's clothing",
    image: '/images/categories/mens-clothing.png',
    productCount: 4,
    link: '/products?category=mens-clothing',
  },
  {
    id: "women's clothing",
    name: 'پوشاک زنانه',
    slug: "women's clothing",
    image: '/images/categories/womens-clothing.png',
    productCount: 4,
    link: '/products?category=womens-clothing',
  },
];

const FALLBACK_IMAGE = '/images/categories/fallback.png';

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(1.2); // تغییر: نمایش بخشی از کارت بعدی
      else if (width < 768) setItemsPerView(2);
      else if (width < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // محاسبه حداکثر ایندکس بر اساس تعداد کل و تعداد آیتم در هر ویو
  const maxIndex = Math.max(0, Math.ceil(categories.length - itemsPerView));
  
  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleImageError = (categoryId: string) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }));
  };

  // محاسبه عرض هر آیتم بر حسب درصد
  const itemWidth = 100 / itemsPerView;

  return (
    <div className="container-custom py-12 sm:py-16 px-3 sm:px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-10">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">دسته‌بندی‌ها</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">بر اساس نیاز خود جستجو کنید</p>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-1.5 sm:p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-1.5 sm:p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: `-${currentIndex * itemWidth}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex"
          style={{ width: `${(categories.length / itemsPerView) * 100}%` }}
        >
          {categories.map((category, index) => {
            const isHovered = hoveredId === category.id;
            const imageSrc = imageErrors[category.id] ? FALLBACK_IMAGE : category.image;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ width: `${itemWidth}%` }}
                className="px-1.5 sm:px-3"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={category.link}>
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
                      <motion.div
                        className="relative w-full h-full"
                        animate={{
                          y: isHovered ? -10 : 0,
                          scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Image
                          src={imageSrc}
                          alt={category.name}
                          fill
                          className="object-contain p-3 sm:p-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                          }}
                          onError={() => handleImageError(category.id)}
                          unoptimized={imageErrors[category.id]}
                        />
                      </motion.div>

                      {/* Product Count Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium whitespace-nowrap"
                      >
                        {category.productCount} محصول
                      </motion.div>
                    </div>

                    {/* Category Name */}
                    <motion.div
                      className="text-center mt-2 sm:mt-4"
                      animate={{
                        y: isHovered ? 3 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
        {[...Array(maxIndex + 1)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-300 ${
              currentIndex === i 
                ? 'w-4 sm:w-6 h-1 sm:h-1.5 bg-primary rounded-full' 
                : 'w-1.5 sm:w-1.5 h-1 sm:h-1.5 bg-secondary rounded-full hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
