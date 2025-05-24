"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from 'next-intl';

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const t = useTranslations('common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-white border-neutral-700 hover:bg-neutral-700 hover:text-white">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('toggle_theme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="mr-2 h-4 w-4" />
          {t('theme_light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon className="mr-2 h-4 w-4" />
          {t('theme_dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <LaptopIcon className="mr-2 h-4 w-4" />
          {t('theme_system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
