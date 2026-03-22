'use client';

import Link from 'next/link';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/auth-store';
import RegisterModal from '@/components/auth/RegisterModal';

interface PageProps {
  params: { id: string };
}

interface OrderData {
  id: string;
  customer: { name: string; email: string; phone: string };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }>;
  shippingAddress: any;
  subtotal: number;
  status: string;
  createdAt: string;
}

export default function OrderConfirmationPage({ params }: PageProps) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        if (!res.ok) {
          setError('Order not found');
          return;
        }
        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        setError('Failed to load order');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500 mx-auto"></div>
          <p className="text-zinc-400 mt-4">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{error || 'Order Not Found'}</h1>
          <Link href="/shop" className="text-amber-500 hover:text-amber-400">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = order.status === 'paid';

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          {isPaid ? (
            <>
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-4xl font-bold text-white mb-2">
                Order Confirmed!
              </h1>
              <p className="text-zinc-400">
                Thank you for your purchase. We'll process your order shortly.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">
                Order Pending
              </h1>
              <p className="text-zinc-400">
                Your order has been created but payment is still pending.
              </p>
            </>
          )}
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 space-y-8">
          {/* Order Info */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Order Details
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-zinc-400">Order ID</p>
                <p className="font-mono text-white">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Status</p>
                <p className="font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === 'paid'
                        ? 'bg-green-900/20 text-green-400'
                        : 'bg-yellow-900/20 text-yellow-400'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Order Date</p>
                <p className="text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total</p>
                <p className="text-xl font-bold text-amber-500">
                  {formatPrice(order.subtotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border-t border-zinc-800 pt-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Shipping To
            </h2>
            <div className="text-white space-y-2">
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-zinc-400">{order.customer.email}</p>
              <p className="text-zinc-400">{order.customer.phone}</p>
              {order.shippingAddress && (
                <>
                  <p className="text-zinc-400">
                    {order.shippingAddress.street}
                  </p>
                  <p className="text-zinc-400">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-zinc-800 pt-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Items Ordered
            </h2>
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b border-zinc-800 last:border-b-0"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-zinc-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-zinc-800 pt-8">
            <div className="flex justify-between text-white">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-green-500 text-sm mt-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white mt-4 pt-4 border-t border-zinc-800">
              <span>Total</span>
              <span className="text-amber-500">
                {formatPrice(order.subtotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Create Account Prompt for Guests */}
        {isPaid && !isAuthenticated && (
          <div className="mt-8 rounded-lg border border-amber-800 bg-amber-900/20 p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              Create an Account to Track Your Orders
            </h3>
            <p className="text-zinc-400 mb-4">
              Sign up now to access your order history and get exclusive benefits.
            </p>
            <Button
              onClick={() => setShowRegisterModal(true)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Create Account
            </Button>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-700">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          {isAuthenticated && (
            <Button asChild variant="outline" className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <Link href="/orders">View All Orders</Link>
            </Button>
          )}
        </div>

        <RegisterModal
          open={showRegisterModal}
          onOpenChange={setShowRegisterModal}
          onLoginClick={() => setShowRegisterModal(false)}
          prefilledEmail={order.customer.email}
          prefilledName={order.customer.name}
        />
      </div>
    </div>
  );
}
