'use client';

import Image from 'next/image';
import { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  items: CartItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 h-fit sticky top-8">
      <h3 className="text-lg font-semibold text-white mb-6">Order Summary</h3>

      <div className="space-y-4 border-b border-zinc-800 pb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
              <p className="text-sm text-amber-500 font-semibold mt-1">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 py-6 border-b border-zinc-800">
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Shipping</span>
          <span className="text-green-500">Free</span>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total</span>
          <span className="text-2xl font-bold text-amber-500">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
