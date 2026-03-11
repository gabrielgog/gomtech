import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 text-center">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(251,191,36,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
        <Star className="h-3.5 w-3.5 fill-current" />
        Nigeria&apos;s Premium Phone Store
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
        Your Next Phone{' '}
        <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Awaits
        </span>
      </h1>

      {/* Subheading */}
      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
        Discover the latest iPhones, Samsung Galaxy, Google Pixel, and premium accessories.
        Authentic products, competitive prices, delivered to your door across Nigeria.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="bg-amber-500 px-8 text-zinc-950 hover:bg-amber-400 font-semibold"
        >
          <Link href="/shop">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-zinc-700 bg-transparent text-zinc-300 hover:border-zinc-500 hover:text-white px-8"
        >
          <Link href="/shop?category=phones">Browse Phones</Link>
        </Button>
      </div>

      {/* Social proof */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">500+</span>
          <span>Products Sold</span>
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">100%</span>
          <span>Authentic</span>
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">48h</span>
          <span>Nigeria&apos;s Delivery</span>
        </div>
      </div>
    </section>
  );
}