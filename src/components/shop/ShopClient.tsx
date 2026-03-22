'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';

type Category = 'all' | 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories';

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) ?? 'all';
  const [selected, setSelected] = useState<Category>(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    const validCategories = ['all', 'phones', 'tablets', 'laptops', 'smartwatches', 'headphones', 'chargers', 'cases', 'screen-protectors', 'accessories'];
    if (cat && validCategories.includes(cat)) {
      setSelected(cat);
    }
  }, [searchParams]);

  const filtered =
    selected === 'all' ? products : products.filter((p) => p.category === selected);

  const counts = {
    all: products.length,
    phones: products.filter((p) => p.category === 'phones').length,
    tablets: products.filter((p) => p.category === 'tablets').length,
    laptops: products.filter((p) => p.category === 'laptops').length,
    smartwatches: products.filter((p) => p.category === 'smartwatches').length,
    headphones: products.filter((p) => p.category === 'headphones').length,
    chargers: products.filter((p) => p.category === 'chargers').length,
    cases: products.filter((p) => p.category === 'cases').length,
    'screen-protectors': products.filter((p) => p.category === 'screen-protectors').length,
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
