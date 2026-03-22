'use client';

import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  async function handleSubmit(product: any) {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create product');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Add Product</h1>
        <p className="text-zinc-400 mt-2">Create a new product</p>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
