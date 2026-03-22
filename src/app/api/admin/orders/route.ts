import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, forbidden } from '@/lib/api-auth';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function GET(request: NextRequest) {
  try {
    const payload = await requireAdmin(request);
    if (!payload) {
      return forbidden();
    }

    await connectDB();
    const orders = await Order.find({}).lean().sort({ createdAt: -1 });

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
