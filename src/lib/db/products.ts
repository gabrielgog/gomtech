import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { Product as IProduct } from '@/types';

async function getProducts(): Promise<IProduct[]> {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    price: p.price,
    category: p.category,
    description: p.description,
    imageUrl: p.imageUrl,
    stock: p.stock,
    featured: p.featured,
  }));
}

async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;
  return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    price: product.price,
    category: product.category,
    description: product.description,
    imageUrl: product.imageUrl,
    stock: product.stock,
    featured: product.featured,
  };
}

async function getFeaturedProducts(): Promise<IProduct[]> {
  await connectDB();
  const products = await Product.find({ featured: true }).lean();
  return products.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    price: p.price,
    category: p.category,
    description: p.description,
    imageUrl: p.imageUrl,
    stock: p.stock,
    featured: p.featured,
  }));
}

async function getProductsByCategory(
  category: 'phones' | 'tablets' | 'laptops' | 'smartwatches' | 'headphones' | 'chargers' | 'cases' | 'screen-protectors' | 'accessories'
): Promise<IProduct[]> {
  await connectDB();
  const products = await Product.find({ category }).lean();
  return products.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    price: p.price,
    category: p.category,
    description: p.description,
    imageUrl: p.imageUrl,
    stock: p.stock,
    featured: p.featured,
  }));
}

export {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
};
