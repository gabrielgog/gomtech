import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, forbidden } from '@/lib/api-auth';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

interface RouteProps {
  params: { id: string };
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
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // If transitioning to paid, decrement stock
    if (status === 'paid' && order.status === 'pending') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } }
        );
      }
    }

    order.status = status;
    await order.save();

    return NextResponse.json({
      order: {
        id: order._id.toString(),
        ...order.toObject(),
      },
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
