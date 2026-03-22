'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductData {
  id: string;
  name: string;
  price: number;
  category: 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories';
  description: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
}

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        if (!res.ok) {
          notFound();
          return;
        }
        const data = await res.json();
        setProduct(data.product);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 bg-zinc-800" />
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <Skeleton className="h-10 w-full bg-zinc-800" />
          <Skeleton className="h-10 w-full bg-zinc-800" />
          <Skeleton className="h-32 w-full bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  async function handleSubmit(updatedProduct: any) {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to update product');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Product</h1>
        <p className="text-zinc-400 mt-2">{product.name}</p>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <ProductForm initialProduct={product} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
