import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import "./globals.css";
import { Header } from "@/components/Header";
import { UserMenu } from "@/components/UserMenu";
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ClientInitializer } from '@/components/ClientInitializer';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen flex flex-col text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ClientInitializer />
            <NextIntlClientProvider locale={locale}>
              <Header
                langSwitcherSlot={<LanguageSwitcher />}
                userMenuSlot={<UserMenu />}
                themeSwitcherSlot={<ThemeSwitcher />}
              />
              <ProtectedRoute>
                {children}
              </ProtectedRoute>
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
