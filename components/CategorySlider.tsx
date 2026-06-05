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

// عکس پیش‌فرض در صورت عدم وجود عکس
const FALLBACK_IMAGE = '/images/categories/fallback.png';

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerView);
  
  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleImageError = (categoryId: string) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }));
  };

  return (
    <div className="container-custom py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">دسته‌بندی‌ها</h2>
          <p className="text-muted-foreground text-sm mt-1">بر اساس نیاز خود جستجو کنید</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
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
                style={{ width: `${100 / categories.length}%` }}
                className="px-3"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={category.link}>
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
                      {/* Animated Image */}
                      <motion.div
                        className="relative w-full h-full"
                        animate={{
                          y: isHovered ? -20 : 0,
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Image
                          src={imageSrc}
                          alt={category.name}
                          fill
                          className="object-contain p-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
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
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                      >
                        {category.productCount} محصول
                      </motion.div>
                    </div>

                    {/* Category Name */}
                    <motion.div
                      className="text-center mt-4"
                      animate={{
                        y: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
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
      <div className="flex justify-center gap-2 mt-8">
        {[...Array(maxIndex + 1)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === i 
                ? 'w-6 bg-primary' 
                : 'w-1.5 bg-secondary hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
}