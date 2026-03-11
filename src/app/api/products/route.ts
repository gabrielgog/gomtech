import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/google-sheets';

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as 'phones' | 'accessories' | null;

  const products = await getProducts();

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return NextResponse.json({ products: filtered, total: filtered.length });
}
