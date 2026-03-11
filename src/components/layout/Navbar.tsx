'use client';

import Link from 'next/link';
import { ShoppingCart, Smartphone } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const { totalItems, openCart } = useCartStore();
  const itemCount = totalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <Smartphone className="h-6 w-6 text-amber-500" />
          <span className="text-xl tracking-tight">
            Gom<span className="text-amber-500">tech</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Cart button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:text-white"
          onClick={openCart}
          aria-label={`Open cart, ${itemCount} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 p-0 text-[10px] font-bold text-zinc-950"
            >
              {itemCount > 99 ? '99+' : itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
