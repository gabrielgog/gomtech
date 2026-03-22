'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPrice } from '@/lib/utils';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled';
  items: any[];
  createdAt: string;
}

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  async function handleStatusChange(orderId: string, newStatus: string) {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      alert('Error updating order');
      console.error(error);
    } finally {
      setUpdating(null);
    }
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-900/20 text-yellow-400 border-yellow-800',
    paid: 'bg-blue-900/20 text-blue-400 border-blue-800',
    fulfilled: 'bg-green-900/20 text-green-400 border-green-800',
    cancelled: 'bg-red-900/20 text-red-400 border-red-800',
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-800/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Items
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Total
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-400">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {order.customerEmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {formatPrice(order.subtotal)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value)
                      }
                      disabled={updating === order.id}
                    >
                      <SelectTrigger
                        className={`w-32 border ${statusColors[order.status]}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {order.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
