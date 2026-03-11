'use client';

import Image from 'next/image';
import ProductPlaceholder from '@/components/ui/ProductPlaceholder';
import { Product } from '@/types';

interface ProductImagesProps {
  product: Product;
}

function isPlaceholder(url: string) {
  return url.startsWith('/placeholder');
}

export default function ProductImages({ product }: ProductImagesProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">
      <div className="relative aspect-square">
        {isPlaceholder(product.imageUrl) ? (
          <ProductPlaceholder category={product.category} />
        ) : (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>
    </div>
  );
}
