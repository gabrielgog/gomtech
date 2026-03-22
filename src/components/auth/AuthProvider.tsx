'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/auth-store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Rehydrate auth from server cookie on mount
    async function rehydrateAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          const setAuth = useAuthStore.getState().setAuth;
          // Get token from localStorage if it exists
          const token = localStorage.getItem('auth-storage')
            ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.token
            : '';
          setAuth(data.user, token || '');
        }
      } catch {
        // User not authenticated
      }
    }

    rehydrateAuth();
  }, []);

  return <>{children}</>;
}
