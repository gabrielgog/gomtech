import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import { requireAuth } from '@/lib/api-auth';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get authenticated user
    const payload = await requireAuth(request);
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let orders;

    // Admin sees all orders
    if (payload.role === 'admin') {
      orders = await Order.find({}).lean().sort({ createdAt: -1 });
    } else {
      // Customer sees only their own orders
      orders = await Order.find({ userId: payload.userId })
        .lean()
        .sort({ createdAt: -1 });
    }

    return NextResponse.json({
      orders: orders.map((o: any) => ({
        id: o._id.toString(),
        ...o,
      })),
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const {
      customer,
      shippingAddress,
      items,
    } = await request.json();

    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate and get product details
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).lean();
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      orderItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: item.quantity,
      });

      subtotal += product.price * item.quantity;
    }

    // Get optional user ID from token
    let userId: string | null = null;
    const payload = await requireAuth(request);
    if (payload) {
      userId = payload.userId;
    }

    // Create order
    const order = await Order.create({
      customer,
      shippingAddress,
      items: orderItems,
      subtotal,
      status: 'pending',
      userId: userId ? new mongoose.Types.ObjectId(userId) : null,
    });

    return NextResponse.json(
      {
        order: {
          id: order._id.toString(),
          ...order.toObject(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
