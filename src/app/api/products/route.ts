import { NextResponse } from 'next/server';
import { getProducts, getProductsByCategory } from '@/lib/db/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories' | null;

  const products = category ? await getProductsByCategory(category) : await getProducts();

  return NextResponse.json({ products, total: products.length });
}
