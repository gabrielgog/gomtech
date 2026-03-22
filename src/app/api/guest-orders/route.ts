import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find all orders by customer email (case-insensitive)
    const orders = await Order.find(
      { 'customer.email': { $regex: `^${email}$`, $options: 'i' } }
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      orders: orders.map((order: any) => ({
        id: order._id.toString(),
        ...order,
      })),
      total: orders.length,
    });
  } catch (error) {
    console.error('Get guest orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
