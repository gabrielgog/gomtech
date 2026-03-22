import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import { verifyWebhookSignature } from '@/lib/paystack';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature') || '';

    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    await connectDB();

    const event = JSON.parse(body);

    // Handle charge.success event
    if (event.event === 'charge.success' && event.data) {
      const reference = event.data.reference;

      // Extract order ID from reference
      const orderId = reference.split('_')[1];

      // Find order
      const order = await Order.findById(orderId);
      if (!order) {
        console.warn(`Order not found for reference: ${reference}`);
        return NextResponse.json({ success: true }); // Still return 200 to acknowledge
      }

      // Idempotent: only process if still pending
      if (order.status === 'pending') {
        order.status = 'paid';

        // Decrement stock
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

        console.log(`Order ${orderId} marked as paid via webhook`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
