'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Smartphone, LogOut, User } from 'lucide-react';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  shift,
} from '@floating-ui/react';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

export default function Navbar() {
  const router = useRouter();
  const { totalItems, openCart } = useCartStore();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const itemCount = totalItems();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Floating UI for user menu
  const { refs, floatingStyles, context } = useFloating({
    open: showUserMenu,
    onOpenChange: setShowUserMenu,
    middleware: [offset(8), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleRegisterClick = () => {
    console.log('Register button clicked, setting registerOpen to true');
    setRegisterOpen(true);
  };

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    clearAuth();
    setShowUserMenu(false);
  }

  return (
    <>
      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onRegisterClick={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
      <RegisterModal
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onLoginClick={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-white">
            <Smartphone className="h-6 w-6 text-amber-500" />
            <span className="text-xl tracking-tight">
              Gom<span className="text-amber-500">tech</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              About
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-400 hover:text-white"
              onClick={openCart}
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 p-0 text-[10px] font-bold text-zinc-950">
                  {itemCount > 99 ? '99+' : itemCount}
                </Badge>
              )}
            </Button>

            {/* Auth section */}
            {isAuthenticated ? (
              <>
                <Button
                  ref={refs.setReference}
                  {...getReferenceProps()}
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white"
                >
                  <User className="h-5 w-5" />
                </Button>

                {showUserMenu && (
                  <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="w-48 rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg z-50"
                  >
                    <div className="px-4 py-3 border-b border-zinc-800">
                      <p className="text-sm font-medium text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-zinc-400">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        router.push('/orders');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 flex items-center gap-2 border-t border-zinc-800 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLoginOpen(true)}
                  className="text-zinc-400 hover:text-white"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={handleRegisterClick}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
