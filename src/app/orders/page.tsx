'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Search } from 'lucide-react';

interface Order {
  id: string;
  customer: { name: string; email: string; phone: string };
  items: Array<{ productId: string; name: string; quantity: number }>;
  subtotal: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Load authenticated user's orders
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      fetchUserOrders();
    }
  }, [isAuthenticated, user?.email]);

  async function fetchUserOrders() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) {
        setError('Failed to fetch orders');
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError('Error loading orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGuestSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchAttempted(true);
    setLoading(true);
    setError('');

    if (!guestEmail.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/guest-orders?email=${encodeURIComponent(guestEmail)}`
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to fetch orders');
        setOrders([]);
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);

      if (data.orders.length === 0) {
        setError(`No orders found for ${guestEmail}`);
      }
    } catch (err) {
      setError('Error loading orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated && !searchAttempted) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Link>

          <h1 className="text-4xl font-bold text-white mb-10">My Orders</h1>

          {!isAuthenticated && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Search Orders by Email
                </h2>
                <p className="text-zinc-400 mb-6">
                  Enter the email address associated with your order to view your order history.
                </p>
              </div>

              <form onSubmit={handleGuestSearch} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? 'Searching...' : 'Search Orders'}
                </Button>
              </form>

              <div className="border-t border-zinc-800 pt-6">
                <p className="text-sm text-zinc-400 mb-4">
                  Don&apos;t have an account yet?
                </p>
                <Link href="/" className="text-amber-500 hover:text-amber-400">
                  Create an account to track all your orders in one place
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <h1 className="text-4xl font-bold text-white mb-10">My Orders</h1>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500 mx-auto"></div>
            <p className="text-zinc-400 mt-4">Loading orders...</p>
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-lg border border-red-800 bg-red-900/20 p-4 text-red-400">
            {error}
          </div>
        )}

        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-4">
              No orders yet
            </h2>
            <p className="text-zinc-400 mb-8">
              Start shopping to create your first order!
            </p>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-600 hover:bg-zinc-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg mb-1">
                      Order #{order.id.substring(0, 8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'paid'
                        ? 'bg-green-900/20 text-green-400'
                        : order.status === 'fulfilled'
                        ? 'bg-blue-900/20 text-blue-400'
                        : 'bg-yellow-900/20 text-yellow-400'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="mb-4 border-t border-zinc-800 pt-4">
                  <p className="text-sm text-zinc-400 mb-2">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-zinc-300">
                    {order.items.map((item) => item.name).join(', ')}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total:</span>
                  <span className="text-lg font-bold text-amber-500">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
