'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import ShippingForm from '@/components/checkout/ShippingForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-amber-500 hover:text-amber-400">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  async function handleShippingSubmit(data: any) {
    setLoading(true);

    try {
      // Create order
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!orderRes.ok) {
        const error = await orderRes.json();
        throw new Error(error.error || 'Failed to create order');
      }

      const orderData = await orderRes.json();
      const orderId = orderData.order.id;

      // Initialize payment
      const paymentRes = await fetch(
        '/api/payments/paystack/initialize',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            email: data.customer.email,
            amount: orderData.order.subtotal,
          }),
        }
      );

      if (!paymentRes.ok) {
        const error = await paymentRes.json();
        throw new Error(error.error || 'Failed to initialize payment');
      }

      const paymentData = await paymentRes.json();
      router.push(paymentData.authorizationUrl);
    } catch (error) {
      setLoading(false);
      alert(
        error instanceof Error ? error.message : 'An error occurred'
      );
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <h1 className="text-4xl font-bold text-white mb-10">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
              <ShippingForm onSubmit={handleShippingSubmit} loading={loading} />
            </div>
          </div>

          <div>
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
