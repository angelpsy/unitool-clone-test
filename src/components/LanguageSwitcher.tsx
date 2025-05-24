'use client';

import {useTransition, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import { Button } from '@/components/ui/Button';
import {Locale} from '@/i18n/config';
import {setUserLocale} from '@/services/locale';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const LANG_LABELS: Record<string, string> = {
    en: t('en'),
    ru: t('ru'),
  };

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
    setOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <Button
        variant="outline"
        className="min-w-[100px] text-white border-neutral-700"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LANG_LABELS[locale]}
        <span className="ml-2">▼</span>
      </Button>
      {open && (
        <ul
          className="absolute z-10 mt-2 w-full rounded-md bg-neutral-900 border border-neutral-700 shadow-lg focus:outline-none"
          role="listbox"
        >
          {Object.entries(LANG_LABELS).map(([code, label]) => (
            <li
              key={code}
              className={`text-white border-neutral-700 px-4 py-2 cursor-pointer hover:bg-neutral-800 ${locale === code ? 'font-bold text-primary' : ''}`}
              onClick={() => {
                onChange(code as 'en' | 'ru');
                setOpen(false);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
