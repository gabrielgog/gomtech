'use client';

import { ShoppingCart, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-red-400">
        <XCircle className="h-4 w-4" /> Out of Stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-orange-400">
        <AlertTriangle className="h-4 w-4" /> Only {stock} left in stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-green-400">
      <CheckCircle className="h-4 w-4" /> In Stock ({stock} available)
    </span>
  );
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCartStore();

  return (
    <div className="flex flex-col gap-6">
      {/* Category + featured */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="border-zinc-700 text-zinc-400 capitalize">
          {product.category}
        </Badge>
        {product.featured && (
          <Badge className="bg-amber-500 text-zinc-950 hover:bg-amber-500">Featured</Badge>
        )}
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{product.name}</h1>

      {/* Price */}
      <p className="text-4xl font-bold text-amber-500">{formatPrice(product.price)}</p>

      {/* Stock */}
      <StockBadge stock={product.stock} />

      {/* Description */}
      <div className="border-t border-zinc-800 pt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          Description
        </h2>
        <p className="leading-relaxed text-zinc-300">{product.description}</p>
      </div>

      {/* Add to cart */}
      <Button
        size="lg"
        className="mt-2 bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold"
        onClick={() => addItem(product)}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>

      {/* Guarantees */}
      <ul className="space-y-2 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
        <li className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" /> 100% authentic product guaranteed
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" /> Fast delivery across Nigeria
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" /> 7-day return policy
        </li>
      </ul>
    </div>
  );
}
