'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import ProductPlaceholder from '@/components/ui/ProductPlaceholder';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  const total = totalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col bg-zinc-950 text-zinc-100 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingBag className="h-5 w-5 text-amber-500" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-zinc-700" />
            <div>
              <p className="text-lg font-semibold text-zinc-300">Your cart is empty</p>
              <p className="mt-1 text-sm text-zinc-500">
                Start adding some great products!
              </p>
            </div>
            <Button
              onClick={closeCart}
              asChild
              className="mt-2 bg-amber-500 text-zinc-950 hover:bg-amber-400"
            >
              <Link href="/shop">Browse Shop</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Item list */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <ProductPlaceholder category={product.category} />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium leading-tight text-zinc-100">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-sm text-amber-500">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        {/* Remove */}
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-zinc-600 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Footer */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-semibold text-white">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-zinc-500">Shipping and taxes calculated at checkout.</p>
              <Button className="w-full bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold">
                Checkout
              </Button>
              <Button
                variant="ghost"
                className="w-full text-zinc-400 hover:text-white"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
