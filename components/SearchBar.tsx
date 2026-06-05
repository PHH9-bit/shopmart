'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { Product } from '@/types';
import { mockProducts } from '@/lib/products';

interface SearchBarProps {
  onClose?: () => void;
  isModal?: boolean;
}

// تابع نرمالایز کردن متن فارسی برای جستجو
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[آا]/g, 'ا')
    .replace(/[يی]/g, 'ی')
    .replace(/[كک]/g, 'ک')
    .replace(/[ةه]/g, 'ه')
    .replace(/[إأ]/g, 'ا')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ی')
    .replace(/[‌]/g, '')
    .trim();
};

// تابع امتیازدهی به نتایج جستجو
const getSearchScore = (product: Product, query: string) => {
  const normalizedQuery = normalizeText(query);
  const normalizedTitle = normalizeText(product.title);
  const normalizedCategory = normalizeText(
    product.category === "men's clothing" ? "پوشاک مردانه" :
    product.category === "women's clothing" ? "پوشاک زنانه" :
    product.category === "jewelery" ? "جواهرات" :
    product.category === "electronics" ? "الکترونیک" : product.category
  );
  
  let score = 0;
  
  // تطابق کامل عنوان
  if (normalizedTitle === normalizedQuery) {
    score += 100;
  }
  // عنوان با query شروع بشه
  else if (normalizedTitle.startsWith(normalizedQuery)) {
    score += 80;
  }
  // query توی عنوان باشه
  else if (normalizedTitle.includes(normalizedQuery)) {
    score += 60;
  }
  // کلمه به کلمه چک کن
  else {
    const queryWords = normalizedQuery.split(' ');
    const titleWords = normalizedTitle.split(' ');
    
    for (const qWord of queryWords) {
      if (qWord.length < 2) continue;
      
      for (const tWord of titleWords) {
        if (tWord.includes(qWord)) {
          score += 30;
        }
        if (tWord === qWord) {
          score += 20;
        }
      }
    }
  }
  
  // تطابق در دسته‌بندی
  if (normalizedCategory.includes(normalizedQuery)) {
    score += 40;
  }
  
  // امتیاز بر اساس محبوبیت
  score += (product.rating.rate * 2);
  
  return score;
};

export default function SearchBar({ onClose, isModal = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      
      // دیلِی برای جلوگیری از درخواست‌های زیاد
      const timer = setTimeout(() => {
        // جستجو در محصولات محلی
        const filtered = mockProducts.filter((product) => {
          const normalizedQuery = normalizeText(query);
          const normalizedTitle = normalizeText(product.title);
          const normalizedCategory = normalizeText(
            product.category === "men's clothing" ? "پوشاک مردانه" :
            product.category === "women's clothing" ? "پوشاک زنانه" :
            product.category === "jewelery" ? "جواهرات" :
            product.category === "electronics" ? "الکترونیک" : product.category
          );
          
          // چک کردن عنوان و دسته‌بندی
          return normalizedTitle.includes(normalizedQuery) || 
                 normalizedCategory.includes(normalizedQuery);
        });
        
        // مرتب‌سازی بر اساس امتیاز
        const scoredResults = filtered
          .map(product => ({
            product,
            score: getSearchScore(product, query)
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 8)
          .map(item => item.product);
        
        setResults(scoredResults);
        setShowResults(true);
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleClose = () => {
    setShowResults(false);
    setQuery('');
    onClose?.();
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const normalizedSearch = normalizeText(search);
    const normalizedText = normalizeText(text);
    
    if (normalizedText.includes(normalizedSearch)) {
      const index = normalizedText.indexOf(normalizedSearch);
      const originalIndex = text.toLowerCase().indexOf(search.toLowerCase());
      if (originalIndex >= 0) {
        return (
          <>
            {text.slice(0, originalIndex)}
            <mark className="bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white px-0.5 rounded">
              {text.slice(originalIndex, originalIndex + search.length)}
            </mark>
            {text.slice(originalIndex + search.length)}
          </>
        );
      }
    }
    return text;
  };

  return (
    <div className={isModal ? 'w-full' : 'relative'}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی محصولات (مثال: کیف، لباس، گوشی...)"
          className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          autoFocus={isModal}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {showResults && query.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden ${
              isModal ? 'relative mt-2' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">محصولی با عبارت "{query}" یافت نشد</p>
                <p className="text-xs text-muted-foreground mt-1">
                  پیشنهاد: از کلمات کلیدی متفاوت استفاده کنید
                </p>
              </div>
            ) : (
              <div>
                <div className="p-2 border-b border-border bg-secondary/30">
                  <span className="text-xs text-muted-foreground">
                    {results.length} نتیجه برای "{query}"
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 p-3 hover:bg-secondary transition-colors group"
                    >
                      <div className="relative w-12 h-12 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-1 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition">
                          {highlightText(product.title, query)}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-primary">
                            {(product.price / 1000).toLocaleString('fa-IR')} هزار تومان
                          </p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">
                            {product.category === "men's clothing" ? "پوشاک مردانه" :
                             product.category === "women's clothing" ? "پوشاک زنانه" :
                             product.category === "jewelery" ? "جواهرات" :
                             product.category === "electronics" ? "الکترونیک" : product.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ⭐ {product.rating.rate}
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/products?search=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="block text-center py-2 text-sm text-primary hover:bg-secondary transition-colors border-t border-border"
                >
                  مشاهده همه نتایج ({results.length})
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}