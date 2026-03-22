import { Mail, Phone, MapPin, CheckCircle, Clock, Shield, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'About',
  description: 'The Tech You Trust. Quality technology, carefully curated. Authentic smartphones, tablets, and accessories from brands you trust.',
};

const VALUES = [
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Every product is 100% genuine and sourced directly from authorized partners. No compromises on quality.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'Fast, secure shipping to your doorstep. Track your order every step of the way.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Promise',
    description: 'Not satisfied? Full refund or exchange within 7 days. Complete peace of mind with every purchase.',
  },
  {
    icon: Clock,
    title: 'Trusted Support',
    description: 'Our team is ready to help. Expert advice on products and seamless assistance with your orders.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          About Us
        </span>
        <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
          The Tech You Trust
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          Gomtech delivers quality technology you can rely on. We curate authentic smartphones, tablets, laptops, and accessories from trusted brands. Every product is selected for excellence, authenticity, and value. We believe premium technology should be accessible, transparent, and trustworthy.
        </p>
      </div>

      <Separator className="my-16 bg-zinc-800" />

      {/* Values */}
      <section>
        <h2 className="mb-10 text-center text-2xl font-bold text-white">Why Choose Gomtech</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3">
                <Icon className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-16 bg-zinc-800" />

      {/* Contact */}
      <section className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
          <p className="mt-3 text-zinc-400">
            Questions about a product? Need help with an order? We are here to support you.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-4">
              <div className="inline-flex rounded-lg bg-amber-500/10 p-2.5">
                <Phone className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium text-zinc-200">Call or WhatsApp</p>
                <a
                  href="tel:+23407066138808"
                  className="mt-0.5 text-sm text-zinc-500 hover:text-white transition-colors"
                >
                    +23407066138808
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="inline-flex rounded-lg bg-amber-500/10 p-2.5">
                <Mail className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium text-zinc-200">Email Us</p>
                <a
                  href="mailto:hello@gomtech.app"
                  className="mt-0.5 text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  hello@gomtech.app
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h3 className="mb-6 text-lg font-semibold text-white">Send a Message</h3>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us more..."
                className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
