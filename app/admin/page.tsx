'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2, Eye, Search, Loader2, LogOut } from 'lucide-react';
import { Product } from '@/types';
import { mockProducts } from '@/lib/products';
import toast from 'react-hot-toast';
import Image from 'next/image';

const formatPrice = (price: number) => {
  return (price / 1000).toLocaleString('fa-IR') + ' هزار تومان';
};

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    setProducts(mockProducts as Product[]);
    setLoading(false);
  }, []);

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
    toast.success('محصول با موفقیت حذف شد');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('با موفقیت خارج شدید');
      router.push('/login');
    } catch (error) {
      toast.error('خطا در خروج');
    }
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">پنل مدیریت</h1>
          <p className="text-muted-foreground mt-1">مدیریت محصولات فروشگاه</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/new">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              <Plus className="w-4 h-4" />
              افزودن محصول جدید
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 pr-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-semibold">تصویر</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">نام محصول</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">دسته‌بندی</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">قیمت</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border hover:bg-secondary/20 transition"
                >
                  <td className="px-4 py-3">
                    <div className="relative w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <Image src={product.image} alt={product.title} fill className="object-contain p-1" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium line-clamp-1">{product.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <button className="p-2 rounded-lg hover:bg-secondary transition" title="ویرایش">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                      </Link>
                      <Link href={`/products/${product.id}`} target="_blank">
                        <button className="p-2 rounded-lg hover:bg-secondary transition" title="مشاهده">
                          <Eye className="w-4 h-4 text-green-500" />
                        </button>
                      </Link>
                      <button
                        onClick={() => setShowDeleteConfirm(product.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">محصولی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-2">حذف محصول</h3>
            <p className="text-muted-foreground mb-6">آیا از حذف این محصول اطمینان دارید؟</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                حذف
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}