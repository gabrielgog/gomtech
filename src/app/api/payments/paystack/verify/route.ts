import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import { verifyTransaction } from '@/lib/paystack';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Missing reference' },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const paystackRes = await verifyTransaction(reference);

    if (!paystackRes.status) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Extract order ID from reference (format: order_<id>_<timestamp>)
    const orderId = reference.split('_')[1];

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // If not already paid, update to paid and decrement stock
    if (order.status === 'pending') {
      order.status = 'paid';

      // Decrement stock for each item
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } }
        );
      }

      await order.save();

      // Send order confirmation email to customer
      const orderNumber = order._id.toString().substring(0, 8).toUpperCase();
      await sendOrderConfirmationEmail({
        orderNumber,
        orderId: order._id.toString(),
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        items: order.items,
        subtotal: order.subtotal,
        shippingAddress: order.shippingAddress,
        paymentReference: reference,
      });

      // Send admin notification
      await sendAdminOrderNotification({
        orderNumber,
        orderId: order._id.toString(),
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone,
        items: order.items,
        subtotal: order.subtotal,
        shippingAddress: order.shippingAddress,
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
