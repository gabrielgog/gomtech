'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {submitted ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-zinc-400 mb-6">
              If an account exists with <span className="font-mono text-amber-500">{email}</span>, you will receive a password reset link within a few minutes.
            </p>
            <p className="text-sm text-zinc-500 mb-6">
              The link expires in 1 hour for security.
            </p>
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
            <p className="text-zinc-400 mb-6">
              Enter the email associated with your account and we will send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-zinc-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-1.5 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
              <p className="text-sm text-zinc-400">
                Remember your password?{' '}
                <Link href="/" className="text-amber-500 hover:text-amber-400">
                  Back to home
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
