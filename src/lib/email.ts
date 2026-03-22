/**
 * Email service using Resend
 */

import { Resend } from 'resend';

let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY environment variable');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export interface OrderEmailData {
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingAddress: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  paymentReference: string;
}

export interface PasswordResetEmailData {
  email: string;
  name: string;
  resetUrl: string;
}

export interface AdminOrderNotificationData {
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingAddress: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

/**
 * Send order confirmation email
 * TODO: Integrate with Nodemailer, SendGrid, or Resend
 * Example with Resend:
 * import { Resend } from 'resend';
 * const resend = new Resend(process.env.RESEND_API_KEY);
 */
export async function sendOrderConfirmationEmail(
  data: OrderEmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await getResendClient().emails.send({
      from: 'Gomtech <noreply@gomtech.app>',
      to: data.customerEmail,
      subject: `Order Confirmation - ${data.orderNumber}`,
      html: generateOrderEmailHTML(data),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('✅ Order confirmation email sent to:', data.customerEmail);
    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send order confirmation email:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Email HTML template for order confirmation
 * TODO: Make this more styled/branded
 */
function generateOrderEmailHTML(data: OrderEmailData): string {
  const itemsHTML = data.items
    .map(
      (item) =>
        `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${(item.price / 100).toLocaleString('en-NG')}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .order-number { font-size: 24px; font-weight: bold; margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f3f4f6; padding: 10px; text-align: left; font-weight: bold; }
          .total-row { background: #f3f4f6; font-weight: bold; padding: 10px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed</h1>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>
            <p>Thank you for your order! We're processing it now.</p>

            <div class="order-number">Order #${data.orderNumber}</div>

            <h3>Order Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total-row">
              Total: ₦${(data.subtotal / 100).toLocaleString('en-NG')}
            </div>

            <h3>Shipping Address:</h3>
            <p>
              ${data.shippingAddress.street || ''}<br>
              ${data.shippingAddress.city || ''}, ${data.shippingAddress.state || ''} ${data.shippingAddress.postalCode || ''}<br>
              ${data.shippingAddress.country || ''}
            </p>

            <p>We'll send you a tracking number once your order ships.</p>
            <p>Questions? <a href="mailto:support@gomtech.app">Contact support</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  data: PasswordResetEmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await getResendClient().emails.send({
      from: 'Gomtech <noreply@gomtech.app>',
      to: data.email,
      subject: 'Reset Your Gomtech Password',
      html: generatePasswordResetEmailHTML(data),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('✅ Password reset email sent to:', data.email);
    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send password reset email:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Email HTML template for password reset
 */
function generatePasswordResetEmailHTML(data: PasswordResetEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          .warning { background: #fef08a; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>We received a request to reset the password for your Gomtech account.</p>

            <a href="${data.resetUrl}" class="button">Reset Password</a>

            <p style="margin-top: 20px;">Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background: white; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
              ${data.resetUrl}
            </p>

            <div class="warning">
              <strong>This link expires in 1 hour.</strong> If you didn't request this, you can ignore this email.
            </div>

            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              For security reasons, never share this link with anyone.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Send admin notification for new order
 */
export async function sendAdminOrderNotification(
  data: AdminOrderNotificationData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await getResendClient().emails.send({
      from: 'Gomtech <noreply@gomtech.app>',
      to: 'gomtechguru@gmail.com',
      subject: `New Order - ${data.orderNumber}`,
      html: generateAdminOrderEmailHTML(data),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('✅ Admin notification sent for order:', data.orderNumber);
    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to send admin notification:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Email HTML template for admin order notification
 */
function generateAdminOrderEmailHTML(data: AdminOrderNotificationData): string {
  const itemsHTML = data.items
    .map(
      (item) =>
        `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${(item.price / 100).toLocaleString('en-NG')}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f97316; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .order-number { font-size: 20px; font-weight: bold; color: #f97316; margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f3f4f6; padding: 10px; text-align: left; font-weight: bold; }
          .total-row { background: #f3f4f6; font-weight: bold; padding: 10px; }
          .customer-info { background: #f0f0f0; padding: 10px; border-radius: 4px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Order Received</h1>
          </div>
          <div class="content">
            <div class="order-number">Order #${data.orderNumber}</div>

            <h3>Customer Information:</h3>
            <div class="customer-info">
              <p><strong>Name:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Phone:</strong> ${data.customerPhone}</p>
            </div>

            <h3>Order Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total-row">
              Total: ₦${(data.subtotal / 100).toLocaleString('en-NG')}
            </div>

            <h3>Shipping Address:</h3>
            <p>
              ${data.shippingAddress.street || ''}<br>
              ${data.shippingAddress.city || ''}, ${data.shippingAddress.state || ''} ${data.shippingAddress.postalCode || ''}<br>
              ${data.shippingAddress.country || ''}
            </p>

            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              Login to admin panel to view and manage this order.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
