import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import OrdersTable from '@/components/admin/OrdersTable';

export const dynamic = 'force-dynamic';

async function getOrders() {
  await connectDB();
  const orders = await Order.find({}).lean().sort({ createdAt: -1 });
  return orders.map((o: any) => ({
    id: o._id.toString(),
    customerName: o.customer.name,
    customerEmail: o.customer.email,
    subtotal: o.subtotal,
    status: o.status,
    items: o.items,
    createdAt: new Date(o.createdAt).toLocaleDateString(),
  }));
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-zinc-400 mt-2">Manage customer orders</p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
