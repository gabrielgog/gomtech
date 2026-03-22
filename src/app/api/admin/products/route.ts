import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, forbidden } from '@/lib/api-auth';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    return NextResponse.json({
      products: products.map((p: Record<string, unknown>) => ({
        id: (p._id as Record<string, unknown>).toString(),
        ...p,
      })),
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await requireAdmin(request);
    if (!payload) {
      return forbidden();
    }

    await connectDB();

    const { name, price, category, description, imageUrl, stock, featured } =
      await request.json();

    if (!name || price === undefined || !category || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const slug = slugify(name);
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price: Math.round(price), // Ensure integer kobo
      category,
      description,
      imageUrl,
      stock: stock || 0,
      featured: featured || false,
      slug,
    });

    return NextResponse.json(
      {
        product: {
          id: product._id.toString(),
          ...product.toObject(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
