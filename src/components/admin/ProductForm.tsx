'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Product {
  id?: string;
  name: string;
  price: number; // in kobo
  category: 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories';
  description: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
}

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: any) => Promise<void>;
}

export default function ProductForm({
  initialProduct,
  onSubmit,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Product>(
    initialProduct || {
      name: '',
      price: 0,
      category: 'phones',
      description: '',
      imageUrl: '',
      stock: 0,
      featured: false,
    }
  );

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      setForm({ ...form, imageUrl: data.imageUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(form);
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            Product Name *
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="bg-zinc-900 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-zinc-300">
            Category *
          </Label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories' })}>
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="phones">Phones</SelectItem>
              <SelectItem value="tablets">Tablets</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="smartwatches">Smartwatches</SelectItem>
              <SelectItem value="headphones">Headphones</SelectItem>
              <SelectItem value="chargers">Chargers</SelectItem>
              <SelectItem value="cases">Cases</SelectItem>
              <SelectItem value="screen-protectors">Screen Protectors</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-zinc-300">
            Price (NGN) *
          </Label>
          <Input
            id="price"
            type="number"
            step="100"
            value={form.price / 100} // Display as NGN
            onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) * 100 })} // Store as kobo
            required
            className="bg-zinc-900 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock" className="text-zinc-300">
            Stock *
          </Label>
          <Input
            id="stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
            required
            className="bg-zinc-900 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-zinc-300">
            Product Image *
          </Label>

          {form.imageUrl && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-zinc-800 mb-4">
              <Image
                src={form.imageUrl}
                alt="Product preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex gap-2">
            <label className="flex-1 cursor-pointer">
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700 text-sm text-zinc-300 hover:text-white transition-colors">
                <Upload className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </div>
              <input
                id="imageUrl"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-zinc-500">
            Max 5MB. Or paste URL below:
          </p>
          <Input
            type="url"
            placeholder="Or enter image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="bg-zinc-900 border-zinc-800 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-zinc-300">
          Description *
        </Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={4}
          className="bg-zinc-900 border-zinc-800 text-white resize-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="featured"
          checked={form.featured}
          onCheckedChange={(checked) =>
            setForm({ ...form, featured: checked === true })
          }
          className="border-zinc-700"
        />
        <Label htmlFor="featured" className="text-zinc-300 cursor-pointer">
          Featured Product
        </Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          {loading
            ? 'Saving...'
            : initialProduct
            ? 'Update Product'
            : 'Create Product'}
        </Button>
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
