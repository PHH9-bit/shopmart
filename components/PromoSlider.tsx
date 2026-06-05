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
  imageDesktop: string;
  imageMobile: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'تخفیف ویژه تابستانه',
    subtitle: 'تا ۵۰٪ تخفیف',
    description: 'با کد SUMMER50 از تخفیف‌های ویژه بهره‌مند شوید',
    imageDesktop: '/images/promo/slide-1-desktop.png',
    imageMobile: '/images/promo/slide-1-mobile.png',
    buttonText: 'مشاهده محصولات',
    buttonLink: '/products',
  },
  {
    id: 2,
    title: 'جشنواره پوشاک پاییزه',
    subtitle: 'جدیدترین مدل‌ها',
    description: 'خرید با تخفیف ۳۰٪ و ارسال رایگان',
    imageDesktop: '/images/promo/slide-2-desktop.png',
    imageMobile: '/images/promo/slide-2-mobile.png',
    buttonText: 'خرید کنید',
    buttonLink: '/products?category=mens-clothing',
  },
  {
    id: 3,
    title: 'الکترونیک با کیفیت',
    subtitle: 'محصولات اورجینال',
    description: 'ضمانت اصالت کالا و ۷ روز بازگشت',
    imageDesktop: '/images/promo/slide-3-desktop.png',
    imageMobile: '/images/promo/slide-3-mobile.png',
    buttonText: 'مشاهده محصولات',
    buttonLink: '/products?category=electronics',
  },
  {
    id: 4,
    title: 'جواهرات لوکس',
    subtitle: 'هدیه‌های خاص',
    description: 'طراحی اختصاصی و تحویل سریع',
    imageDesktop: '/images/promo/slide-4-desktop.png',
    imageMobile: '/images/promo/slide-4-mobile.png',
    buttonText: 'مشاهده جواهرات',
    buttonLink: '/products?category=jewelery',
  },
];

export default function PromoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص موبایل یا دسکتاپ
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const currentImage = isMobile ? currentSlide.imageMobile : currentSlide.imageDesktop;

  return (
    <div className="relative w-full overflow-hidden rounded-none md:rounded-xl mx-0 my-0 md:my-4">
      {/* ارتفاع متفاوت برای موبایل و دسکتاپ */}
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full">
        
        {/* تصویر با سایز مناسب هر دستگاه */}
        {currentImage ? (
          <div className="absolute inset-0">
            <Image
              src={currentImage}
              alt={currentSlide.title}
              fill
              className="object-contain md:object-cover"
              sizes="100vw"
              priority={currentIndex === 0}
              style={{ objectPosition: 'center' }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900" />
        )}

        {/* لایه نیمه شفاف - در موبایل کمتر برای نمایش بهتر عکس */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/30" />

        {/* محتوا - موقعیت متفاوت در موبایل */}
        <div className="relative z-10 container-custom h-full flex items-center px-4 sm:px-6 md:px-8">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-full md:max-w-2xl text-white ${
              isMobile ? 'text-center w-full' : 'text-right'
            }`}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-3 py-1 md:px-4 bg-black/50 backdrop-blur-sm rounded-full text-xs md:text-sm mb-2 md:mb-4 ${
                isMobile ? 'mx-auto' : ''
              }`}
            >
              {currentSlide.subtitle}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 leading-tight ${
                isMobile ? 'text-center' : ''
              }`}
            >
              {currentSlide.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xs sm:text-sm md:text-base mb-3 md:mb-6 text-white/80 md:text-white/90 max-w-lg ${
                isMobile ? 'mx-auto text-center' : ''
              }`}
            >
              {currentSlide.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={isMobile ? 'text-center' : ''}
            >
              <Link href={currentSlide.buttonLink}>
                <button className={`px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm md:text-base ${
                  isMobile ? 'mx-auto' : ''
                }`}>
                  {currentSlide.buttonText}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* دکمه‌های ناوبری */}
      <button
        onClick={prevSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 backdrop-blur-sm z-20"
        aria-label="اسلاید قبلی"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 backdrop-blur-sm z-20"
        aria-label="اسلاید بعدی"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </button>

      {/* نقطه‌ها */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentIndex === index
                ? 'w-5 sm:w-7 h-1 sm:h-1.5 bg-white rounded-full'
                : 'w-1.5 sm:w-2 h-1 sm:h-1.5 bg-white/50 rounded-full hover:bg-white/80'
            }`}
            aria-label={`رفتن به اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
