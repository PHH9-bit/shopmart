'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'تخفیف ویژه تابستانه',
    subtitle: 'تا ۵۰٪ تخفیف',
    description: 'با کد SUMMER50 از تخفیف‌های ویژه بهره‌مند شوید',
    image: '/images/promo/slide-1.png',
    buttonText: 'مشاهده محصولات',
    buttonLink: '/products',
  },
  {
    id: 2,
    title: 'جشنواره پوشاک پاییزه',
    subtitle: 'جدیدترین مدل‌ها',
    description: 'خرید با تخفیف ۳۰٪ و ارسال رایگان',
    image: '/images/promo/slide-2.png',
    buttonText: 'خرید کنید',
    buttonLink: '/products?category=mens-clothing',
  },
  {
    id: 3,
    title: 'الکترونیک با کیفیت',
    subtitle: 'محصولات اورجینال',
    description: 'ضمانت اصالت کالا و ۷ روز بازگشت',
    image: '/images/promo/slide-3.png',
    buttonText: 'مشاهده محصولات',
    buttonLink: '/products?category=electronics',
  },
  {
    id: 4,
    title: 'جواهرات لوکس',
    subtitle: 'هدیه‌های خاص',
    description: 'طراحی اختصاصی و تحویل سریع',
    image: '/images/promo/slide-4.png',
    buttonText: 'مشاهده جواهرات',
    buttonLink: '/products?category=jewelery',
  },
];

export default function PromoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-xl mx-4 md:mx-0 my-4">
      <div className="relative h-[300px] md:h-[350px] lg:h-[450px] w-full">
        
        {currentSlide.image ? (
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={currentIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900" />
        )}

        {/* لایه نیمه شفاف برای خوانایی متن */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container-custom h-full flex items-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white px-4 md:px-0"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm mb-4"
            >
              {currentSlide.subtitle}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3"
            >
              {currentSlide.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base mb-6 text-white/90 max-w-lg"
            >
              {currentSlide.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href={currentSlide.buttonLink}>
                <button className="px-5 py-2.5 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm md:text-base">
                  {currentSlide.buttonText}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* دکمه قبلی - سمت راست (چون سایت راست‌چینه) */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 backdrop-blur-sm z-20"
        aria-label="اسلاید قبلی"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      
      {/* دکمه بعدی - سمت چپ */}
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 backdrop-blur-sm z-20"
        aria-label="اسلاید بعدی"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentIndex === index
                ? 'w-6 h-1.5 bg-white rounded-full'
                : 'w-1.5 h-1.5 bg-white/50 rounded-full hover:bg-white/80'
            }`}
            aria-label={`رفتن به اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}