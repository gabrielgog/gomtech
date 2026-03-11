import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryBanner from '@/components/home/CategoryBanner';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 3600;

function FeaturedSkeleton() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 bg-zinc-800" />
          <Skeleton className="h-8 w-48 bg-zinc-800" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Skeleton className="aspect-square bg-zinc-800" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-3 w-16 bg-zinc-800" />
              <Skeleton className="h-5 w-full bg-zinc-800" />
              <Skeleton className="h-5 w-3/4 bg-zinc-800" />
              <Skeleton className="h-6 w-24 bg-zinc-800 mt-3" />
              <Skeleton className="h-9 w-full bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <CategoryBanner />
    </>
  );
}
