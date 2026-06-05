'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { Button } from './ui/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (range: { min: number; max: number }) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceChange,
}: SidebarProps) {
  const [showFilters, setShowFilters] = useState(true);

  const handleCategoryClick = (slug: string) => {
    onCategoryChange(slug);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed top-0 right-0 h-full w-80 bg-card shadow-2xl z-50 overflow-y-auto lg:static lg:translate-x-0 lg:w-64 lg:shadow-none custom-scrollbar"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">فیلترها</h2>
            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full p-3 bg-secondary rounded-lg"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">مرتب‌سازی</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 space-y-2 overflow-hidden"
                >
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => onSortChange(option.value)}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 px-3">دسته‌بندی‌ها</h3>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium border-r-3 border-primary'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 px-3">بازه قیمت</h3>
            <div className="px-3 space-y-3">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">از ${priceRange.min}</span>
                <span className="text-muted-foreground">تا ${priceRange.max}</span>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="px-3">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => {
                onCategoryChange('all');
                onSortChange('default');
                onPriceChange({ min: 0, max: 1000 });
              }}
            >
              حذف همه فیلترها
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}