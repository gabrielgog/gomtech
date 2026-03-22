import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import ProductsTable from '@/components/admin/ProductsTable';

export const dynamic = 'force-dynamic';

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    stock: p.stock,
    category: p.category,
    featured: p.featured,
  }));
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-zinc-400 mt-2">Manage your product inventory</p>
        </div>
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}
