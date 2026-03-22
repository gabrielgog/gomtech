'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store';

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [orderId, setOrderId] = useState<string | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    async function verifyPayment() {
      if (!reference) {
        setStatus('error');
        return;
      }

      try {
        const res = await fetch(
          `/api/payments/paystack/verify?reference=${reference}`
        );

        if (!res.ok) {
          setStatus('error');
          return;
        }

        const data = await res.json();
        setOrderId(data.orderId);
        setStatus('success');

        // Clear cart after successful payment
        clearCart();

        // Redirect to order confirmation after 2 seconds
        setTimeout(() => {
          router.push(`/orders/${data.orderId}`);
        }, 2000);
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
      }
    }

    verifyPayment();
  }, [reference, router]);

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-zinc-400 mb-8">
            Your payment has been verified. Redirecting to order confirmation...
          </p>
          <p className="text-sm text-zinc-500">Order ID: {orderId}</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Payment Verification Failed
          </h1>
          <p className="text-zinc-400 mb-8">
            We couldn't verify your payment. Please try again or contact support.
          </p>
          <a
            href="/shop"
            className="inline-block px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
          >
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-amber-500" />
        <h1 className="text-3xl font-bold text-white mb-2">
          Processing Payment
        </h1>
        <p className="text-zinc-400">
          Please wait while we verify your payment...
        </p>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4 text-amber-500" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Processing Payment
            </h1>
            <p className="text-zinc-400">
              Please wait while we verify your payment...
            </p>
          </div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
