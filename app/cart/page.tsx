'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid3x3, List, X, Search, ChevronDown } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { mockProducts, getMaxPrice, getMinPrice } from '@/lib/products';

const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

const CATEGORIES = [
  { id: 'all', name: 'همه محصولات', slug: 'all', icon: '📦', categoryName: null },
  { id: 'electronics', name: 'الکترونیک', slug: 'electronics', icon: '💻', categoryName: 'electronics' },
  { id: 'jewelery', name: 'جواهرات', slug: 'jewelery', icon: '💎', categoryName: 'jewelery' },
  { id: "men's clothing", name: 'پوشاک مردانه', slug: "men's clothing", icon: '👔', categoryName: "men's clothing" },
  { id: "women's clothing", name: 'پوشاک زنانه', slug: "women's clothing", icon: '👗', categoryName: "women's clothing" },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'پیش‌فرض' },
  { value: 'price_asc', label: 'ارزان‌ترین' },
  { value: 'price_desc', label: 'گران‌ترین' },
  { value: 'rating', label: 'محبوب‌ترین' },
];

const translateCategory = (category: string) => {
  switch (category) {
    case "men's clothing": return 'پوشاک مردانه';
    case "women's clothing": return 'پوشاک زنانه';
    case 'jewelery': return 'جواهرات';
    case 'electronics': return 'الکترونیک';
    default: return category;
  }
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: getMinPrice(), max: getMaxPrice() });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();

  // خواندن category از URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam === 'jewelery') setSelectedCategory('jewelery');
    else if (categoryParam === 'electronics') setSelectedCategory('electronics');
    else if (categoryParam === 'mens-clothing') setSelectedCategory("men's clothing");
    else if (categoryParam === 'womens-clothing') setSelectedCategory("women's clothing");
    else setSelectedCategory('all');
  }, [searchParams]);

  useEffect(() => {
    setProducts(mockProducts as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortBy, priceRange, searchTerm]);

  const getCategoryProductCount = (categorySlug: string) => {
    if (categorySlug === 'all') return products.length;
    const category = CATEGORIES.find(c => c.slug === categorySlug);
    if (!category || !category.categoryName) return 0;
    return products.filter(p => p.category === category.categoryName).length;
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      const category = CATEGORIES.find(c => c.slug === selectedCategory);
      if (category && category.categoryName) {
        filtered = filtered.filter(p => p.category === category.categoryName);
      }
    }

    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      router.push('/products');
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-secondary h-40 sm:h-64 rounded-xl mb-2 sm:mb-4" />
              <div className="bg-secondary h-3 sm:h-4 rounded w-3/4 mb-1 sm:mb-2" />
              <div className="bg-secondary h-3 sm:h-4 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-4 sm:py-8 px-3 sm:px-4">
      {/* Header */}
      <div className="mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">همه محصولات</h1>
        <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} محصول یافت شد</p>
      </div>

      {/* Mobile Filter Bar - برای موبایل */}
      <div className="flex flex-wrap items-center gap-2 mb-4 lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-sm"
        >
          <Filter className="w-3.5 h-3.5" />
          فیلتر
        </button>
        
        <div className="relative flex-1">
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-7 px-2 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-2 py-1.5 rounded-lg border border-border bg-background text-sm"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <div className="flex bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}`}
          >
            <Grid3x3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold mb-3">دسته‌بندی</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => {
                  const count = getCategoryProductCount(cat.slug);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition ${
                        selectedCategory === cat.slug 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold mb-3">بازه قیمت (هزار تومان)</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={Math.floor(getMinPrice() / 1000)}
                  max={Math.ceil(getMaxPrice() / 1000)}
                  value={priceRange.max / 1000}
                  onChange={(e) => setPriceRange({ 
                    min: priceRange.min, 
                    max: Number(e.target.value) * 1000 
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs">
                  <span>{formatPrice(priceRange.min)}</span>
                  <span>تا</span>
                  <span>{formatPrice(priceRange.max)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('default');
                setPriceRange({ min: getMinPrice(), max: getMaxPrice() });
                setSearchTerm('');
                router.push('/products');
              }}
              className="w-full px-4 py-2 rounded-lg border border-border text-sm hover:bg-secondary transition"
            >
              حذف همه فیلترها
            </button>
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-1">
          {/* Desktop Toolbar */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-9 px-3 py-2 rounded-lg border border-border bg-background text-sm w-56"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold">محصولی یافت نشد</h3>
              <p className="text-sm text-muted-foreground mt-2">لطفاً فیلترهای دیگری را امتحان کنید</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'
              : 'space-y-3 sm:space-y-4'
            }>
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group">
                        <Link href={`/products/${product.id}`}>
                          <div className="relative aspect-square bg-gray-50 dark:bg-gray-800/50">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            />
                          </div>
                          <div className="p-2 sm:p-4">
                            <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">
                              {translateCategory(product.category)}
                            </div>
                            <h3 className="font-semibold line-clamp-2 text-xs sm:text-sm mb-1 sm:mb-2 group-hover:text-primary transition">
                              {product.title}
                            </h3>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-bold text-primary">
                                {formatPrice(product.price)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addItem(product);
                                }}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-lg text-[11px] sm:text-sm hover:bg-primary hover:text-white transition"
                              >
                                خرید
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-xl border border-border hover:shadow-lg transition w-full">
                        <Link href={`/products/${product.id}`} className="flex gap-3 sm:gap-4 flex-1">
                          <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex-shrink-0">
                            <Image src={product.image} alt={product.title} fill className="object-contain p-1 sm:p-2" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{product.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 sm:mt-1">{product.description}</p>
                            <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                              <span className="text-xs sm:text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                            </div>
                          </div>
                        </Link>
                        <button
                          onClick={() => addItem(product)}
                          className="px-2 sm:px-3 py-1 sm:py-2 bg-primary text-white rounded-lg text-[11px] sm:text-sm whitespace-nowrap"
                        >
                          افزودن به سبد
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card z-50 p-4 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">فیلترها</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-secondary rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-3">دسته‌بندی</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map(cat => {
                      const count = getCategoryProductCount(cat.slug);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            handleCategoryClick(cat.slug);
                            setShowFilters(false);
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm ${
                            selectedCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">بازه قیمت (هزار تومان)</h3>
                  <input
                    type="range"
                    min={Math.floor(getMinPrice() / 1000)}
                    max={Math.ceil(getMaxPrice() / 1000)}
                    value={priceRange.max / 1000}
                    onChange={(e) => setPriceRange({ 
                      min: priceRange.min, 
                      max: Number(e.target.value) * 1000 
                    })}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs">
                    <span>{formatPrice(priceRange.min)}</span>
                    <span>تا</span>
                    <span>{formatPrice(priceRange.max)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange({ min: getMinPrice(), max: getMaxPrice() });
                    setShowFilters(false);
                    router.push('/products');
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-secondary text-center text-sm"
                >
                  حذف فیلترها
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
