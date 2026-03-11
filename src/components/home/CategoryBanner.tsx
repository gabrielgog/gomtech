import Link from 'next/link';
import { Smartphone, Headphones, ArrowRight } from 'lucide-react';

export default function CategoryBanner() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Phones panel */}
        <Link
          href="/shop?category=phones"
          className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all hover:border-amber-500/50"
        >
          <div className="pointer-events-none absolute right-8 top-8 text-zinc-800 transition-transform group-hover:scale-110 group-hover:text-zinc-700">
            <Smartphone className="h-32 w-32" />
          </div>
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Category
            </span>
            <h3 className="mt-2 text-3xl font-bold text-white">Smartphones</h3>
            <p className="mt-2 max-w-xs text-sm text-zinc-400">
              iPhone, Samsung, Google Pixel, and more. The world&apos;s best phones, all in one
              place.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-500 group-hover:gap-3 transition-all">
              Shop Phones <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Accessories panel */}
        <Link
          href="/shop?category=accessories"
          className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all hover:border-amber-500/50"
        >
          <div className="pointer-events-none absolute right-8 top-8 text-zinc-800 transition-transform group-hover:scale-110 group-hover:text-zinc-700">
            <Headphones className="h-32 w-32" />
          </div>
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Category
            </span>
            <h3 className="mt-2 text-3xl font-bold text-white">Accessories</h3>
            <p className="mt-2 max-w-xs text-sm text-zinc-400">
              Cases, chargers, earbuds, and screen protectors — everything your device needs.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-500 group-hover:gap-3 transition-all">
              Shop Accessories <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
