import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/google-sheets';
import ProductImages from '@/components/product/ProductImages';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      {/* Main product layout */}
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </div>

      {/* Related products */}
      <Suspense fallback={<Skeleton className="mt-20 h-64 w-full rounded-2xl bg-zinc-800" />}>
        <RelatedProducts currentProduct={product} />
      </Suspense>
    </div>
  );
}
