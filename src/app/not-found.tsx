import Link from 'next/link';
import {useTranslations} from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-4xl font-bold mb-4 text-white">404</h2>
      <h3 className="text-2xl font-semibold mb-4 text-white">{t('title')}</h3>
      <p className="mb-6 text-neutral-400 max-w-md">
        {t('description')}
      </p>
      <Button asChild>
        <Link href="/">{t('backToHome')}</Link>
      </Button>
    </div>
  );
}
