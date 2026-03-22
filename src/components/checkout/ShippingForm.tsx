'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export default function ShippingForm({
  onSubmit,
  loading = false,
}: ShippingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Shipping Information</h3>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-zinc-300">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="mt-1 bg-zinc-900 border-zinc-800 text-white"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-zinc-300">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* Address Info */}
      <div className="space-y-4 border-t border-zinc-800 pt-6">
        <div>
          <Label htmlFor="street" className="text-zinc-300">
            Street Address
          </Label>
          <Input
            id="street"
            type="text"
            required
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            className="mt-1 bg-zinc-900 border-zinc-800 text-white"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="city" className="text-zinc-300">
              City
            </Label>
            <Input
              id="city"
              type="text"
              required
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="mt-1 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-zinc-300">
              State
            </Label>
            <Input
              id="state"
              type="text"
              required
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="mt-1 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="postalCode" className="text-zinc-300">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              type="text"
              required
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              className="mt-1 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-zinc-300">
              Country
            </Label>
            <Input
              id="country"
              type="text"
              disabled
              value={formData.country}
              className="mt-1 bg-zinc-800 border-zinc-800 text-zinc-500"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </Button>
    </form>
  );
}
