import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import Order from '@/lib/models/Order';
import StatsCard from '@/components/admin/StatsCard';
import { formatPrice } from '@/lib/utils';
import { Package, ShoppingCart, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
  await connectDB();

  const productCount = await Product.countDocuments();
  const orders = await Order.find({}).lean();
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const revenue = paidOrders.reduce((sum, o) => sum + o.subtotal, 0);

  return {
    productCount,
    orderCount: orders.length,
    revenue,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Welcome to the admin dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Products"
          value={stats.productCount.toString()}
          icon={Package}
        />
        <StatsCard
          title="Orders"
          value={stats.orderCount.toString()}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Revenue"
          value={formatPrice(stats.revenue)}
          icon={DollarSign}
        />
      </div>
    </div>
  );
}
