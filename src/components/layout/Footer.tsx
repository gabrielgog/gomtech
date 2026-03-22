import Link from 'next/link';
import { Smartphone, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-white">
              <Smartphone className="h-5 w-5 text-amber-500" />
              <span className="text-lg tracking-tight">
                Gom<span className="text-amber-500">tech</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Nigeria&apos;s premium destination for smartphones and accessories. Authentic products,
              unbeatable prices, exceptional service.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop All', href: '/shop' },
                { label: 'Phones', href: '/shop?category=phones' },
                { label: 'Accessories', href: '/shop?category=accessories' },
                { label: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-300">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>Dutse ultra modern market</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                <a href="tel:+23407066138808" className="hover:text-white transition-colors">
                    +23407066138808.
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                <a href="mailto:hello@gomtech.ng" className="hover:text-white transition-colors">
                  hello@gomtech.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Gomtech. All rights reserved.</p>
          {/*<p>Built with Next.js · Powered by Google Sheets</p>*/}
        </div>
      </div>
    </footer>
  );
}
