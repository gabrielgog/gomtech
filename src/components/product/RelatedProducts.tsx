import { getProducts } from '@/lib/db/products';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/types';

interface RelatedProductsProps {
  currentProduct: Product;
}

export default async function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-2xl font-bold text-white">You may also like</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
