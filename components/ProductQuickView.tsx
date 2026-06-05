'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} عدد ${product.title.slice(0, 40)}... اضافه شد`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" showCloseButton={true}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square bg-secondary/30 rounded-xl overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div>
            <div className="text-sm text-primary mb-1">{product.category}</div>
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground">({product.rating.count} نظر)</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
            {product.price > 100 && (
              <div className="text-sm text-green-500 mt-1">✨ ارسال رایگان</div>
            )}
          </div>

          <div>
            <p className="text-muted-foreground line-clamp-3">{product.description}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">تعداد:</span>
            <div className="flex items-center gap-3 border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-secondary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-secondary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddToCart} className="flex-1 gap-2">
              <ShoppingCart className="w-4 h-4" />
              افزودن به سبد خرید
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="!p-3"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="outline" className="!p-3">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}