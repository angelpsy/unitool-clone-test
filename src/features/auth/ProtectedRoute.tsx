'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { useUser } from '../user/useUser';

const PUBLIC_PATHS = ['/auth/login', '/auth/register'];

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { isUserInit: isUserInit } = useUser();
  const router = useRouter();
  const pathname = usePathname() || '';

  useEffect(() => {
    if (!isUserInit) return;
    if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
      router.push('/auth/login');
    }

    if (isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
      router.push('/profile');
    }
  }, [isAuthenticated, pathname, router, isUserInit]);

  if (!isUserInit || (!isAuthenticated && !PUBLIC_PATHS.includes(pathname) || isAuthenticated && PUBLIC_PATHS.includes(pathname))) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
}