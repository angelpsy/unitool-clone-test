import Link from 'next/link';
import { ReactNode } from 'react';
import { UserMenuMobile } from './UserMenuMobile';

export interface HeaderProps {
  userMenuSlot?: ReactNode;
  langSwitcherSlot?: ReactNode;
  themeSwitcherSlot?: ReactNode;
}

export function Header({ userMenuSlot, langSwitcherSlot, themeSwitcherSlot }: HeaderProps) {
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-white">
          Chat App
        </Link>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <UserMenuMobile />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          {userMenuSlot}
          <div className="ml-4">{langSwitcherSlot}</div>
          <div className="ml-4">{themeSwitcherSlot}</div>
        </nav>
      </div>
    </header>
  );
}
