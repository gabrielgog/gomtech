'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
}

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
      console.error(error);
    }
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-800/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-300">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-400">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400 capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{product.stock}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.featured ? (
                      <span className="text-amber-500 font-medium">Yes</span>
                    ) : (
                      <span className="text-zinc-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      >
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="border-red-900 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
