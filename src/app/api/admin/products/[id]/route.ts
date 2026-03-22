import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, forbidden } from '@/lib/api-auth';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

interface RouteProps {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const payload = await requireAdmin(request);
    if (!payload) {
      return forbidden();
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await Product.findById(params.id).lean();

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      product: {
        id: product._id.toString(),
        ...product,
      },
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteProps) {
  try {
    const payload = await requireAdmin(request);
    if (!payload) {
      return forbidden();
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const { name, price, category, description, imageUrl, stock, featured } =
      await request.json();

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (price !== undefined) updates.price = Math.round(price);
    if (category !== undefined) updates.category = category;
    if (description !== undefined) updates.description = description;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (stock !== undefined) updates.stock = stock;
    if (featured !== undefined) updates.featured = featured;

    const product = await Product.findByIdAndUpdate(params.id, updates, {
      new: true,
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      product: {
        id: product._id.toString(),
        ...product.toObject(),
      },
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  try {
    const payload = await requireAdmin(request);
    if (!payload) {
      return forbidden();
    }

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
