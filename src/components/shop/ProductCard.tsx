'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProductPlaceholder from '@/components/ui/ProductPlaceholder';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

function isPlaceholder(url: string) {
  // Only treat local /placeholder paths as placeholders
  // External URLs (including placeholder.com) should render normally
  return url.startsWith('/placeholder');
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-black/40">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden">
        {isPlaceholder(product.imageUrl) ? (
          <ProductPlaceholder category={product.category} />
        ) : (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <Badge className="bg-amber-500 text-zinc-950 hover:bg-amber-500">Featured</Badge>
          )}
          {isLowStock && (
            <Badge variant="destructive">Only {product.stock} left</Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          {product.category}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 font-semibold text-zinc-100 transition-colors hover:text-amber-400">
            {product.name}
          </h3>
        </Link>
        <p className="mt-auto pt-3 text-lg font-bold text-amber-500">
          {formatPrice(product.price)}
        </p>
        <Button
          className="mt-3 w-full bg-zinc-800 text-zinc-100 hover:bg-amber-500 hover:text-zinc-950 transition-colors"
          onClick={() => addItem(product)}
          disabled={isOutOfStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
