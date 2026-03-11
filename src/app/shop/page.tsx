import { Suspense } from 'react';
import { getProducts } from '@/lib/google-sheets';
import ShopClient from '@/components/shop/ShopClient';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 3600;

export const metadata = {
  title: 'Shop',
  description: 'Browse our full range of smartphones and accessories.',
};

function ShopSkeleton() {
  return (
    <div>
      <div className="mb-8 flex gap-2">
        {[80, 100, 130].map((w) => (
          <Skeleton key={w} style={{ width: w }} className="h-9 rounded-full bg-zinc-800" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Skeleton className="aspect-square bg-zinc-800" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-3 w-16 bg-zinc-800" />
              <Skeleton className="h-5 w-full bg-zinc-800" />
              <Skeleton className="h-6 w-24 bg-zinc-800 mt-3" />
              <Skeleton className="h-9 w-full bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function ShopContent() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Shop</h1>
        <p className="mt-2 text-zinc-400">Authentic phones and accessories, delivered to you.</p>
      </div>
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
