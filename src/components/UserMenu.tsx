'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/useAuth';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { UserCircle, LogIn } from 'lucide-react';

export function UserMenu() {
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const tAuth = useTranslations('auth');
  const tCommon = useTranslations('common');
  const tChat = useTranslations('chat');

  const handleLogout = async () => {
    await logout();
  };

  if (!isAuthenticated || !user) {
    return (
      <Button asChild variant="ghost" className="text-white hover:bg-neutral-700 hover:text-white">
        <Link href="/auth/login">
          <LogIn className="h-5 w-5" />
          {tAuth('login')}
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center text-white hover:bg-neutral-700 hover:text-white border-neutral-600">
          <UserCircle className="h-6 w-6" />
          <span>{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-neutral-800 border-neutral-700 text-neutral-200">
        <DropdownMenuLabel className="text-neutral-400 px-2 py-1.5">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-700" />
        <DropdownMenuItem asChild className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer text-neutral-200 focus:text-white">
          <Link href="/profile">{tCommon('profile')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer text-neutral-200 focus:text-white">
          <Link href="/chat">{tChat('title')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer text-neutral-200 focus:text-white"
        >
          {isLoggingOut ? tCommon('loading') : tAuth('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
