import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/google-sheets';
import ProductCard from '@/components/shop/ProductCard';

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Hand-picked
          </span>
          <h2 className="mt-1 text-3xl font-bold text-white">Featured Products</h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
