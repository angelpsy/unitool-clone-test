'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations('error');

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">{t('title')}</h2>
      <p className="mb-6 text-neutral-400 max-w-md">
        {t('description')}
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          {t('tryAgain')}
        </Button>
        <Button asChild>
          <Link href="/">{t('backToHome')}</Link>
        </Button>
      </div>
    </div>
  );
}
