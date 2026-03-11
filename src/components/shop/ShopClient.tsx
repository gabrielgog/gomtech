'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';

type Category = 'all' | 'phones' | 'accessories';

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) ?? 'all';
  const [selected, setSelected] = useState<Category>(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat && ['all', 'phones', 'accessories'].includes(cat)) {
      setSelected(cat);
    }
  }, [searchParams]);

  const filtered =
    selected === 'all' ? products : products.filter((p) => p.category === selected);

  const counts = {
    all: products.length,
    phones: products.filter((p) => p.category === 'phones').length,
    accessories: products.filter((p) => p.category === 'accessories').length,
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter selected={selected} onChange={setSelected} counts={counts} />
        <p className="text-sm text-zinc-500">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
