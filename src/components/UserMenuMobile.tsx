'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/useAuth';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, LogIn, MessageSquare, User, Sun, Moon, LogOut, Images } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/Sidebar';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';

export function UserMenuMobile() {
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const { setTheme, theme } = useTheme();
  const locale = useLocale();
  const tAuth = useTranslations('auth');
  const tCommon = useTranslations('common');
  const tChat = useTranslations('chat');
  const tLanguage = useTranslations('language');
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleLocaleChange = (newLocale: Locale) => {
    setIsTransitioning(true);
    setUserLocale(newLocale);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const LANG_LABELS: Record<string, string> = {
    en: tLanguage('en'),
    ru: tLanguage('ru'),
  };

  return (
    <SidebarProvider>
      <SidebarTrigger asChild className="text-white border-neutral-700 hover:bg-neutral-700 hover:text-white md:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SidebarTrigger>
      
      <Sidebar className="bg-neutral-900 border-r border-neutral-800">
        <SidebarHeader className="border-b border-neutral-800 p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-white">
              Chat App
            </Link>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          {isAuthenticated && user ? (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <div className="px-4 py-2 text-sm text-neutral-400">
                      {user.email}
                    </div>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/profile" className="flex items-center text-white">
                        <User className="mr-2 h-5 w-5" />
                        <span>{tCommon('profile')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/chat" className="flex items-center text-white">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        <span>{tChat('title')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/explore" className="flex items-center text-white">
                        <Images className="mr-2 h-5 w-5" />
                        <span>{tCommon('explore')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center text-red-400 hover:text-red-300"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      <span>{isLoggingOut ? tCommon('loading') : tAuth('logout')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ) : (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/auth/login" className="flex items-center text-white">
                        <LogIn className="mr-2 h-5 w-5" />
                        <span>{tAuth('login')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
        
        <SidebarFooter className="border-t border-neutral-800 p-4 space-y-4">
          {/* Theme Switcher */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-400">{tCommon('toggle_theme')}</h3>
            <div className="flex space-x-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('light')}
                className="flex-1 text-white"
              >
                <Sun className="h-4 w-4 mr-1" />
                {tCommon('theme_light')}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('dark')}
                className="flex-1 text-white"
              >
                <Moon className="h-4 w-4 mr-1" />
                {tCommon('theme_dark')}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-400">{tLanguage('switch')}</h3>
            <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value as Locale)}
              disabled={isTransitioning}
              className="w-full bg-neutral-800 border border-neutral-700 text-white rounded p-2"
            >
              {Object.entries(LANG_LABELS).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
