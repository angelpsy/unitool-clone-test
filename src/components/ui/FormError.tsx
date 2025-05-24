'use client';

import { cn } from '@/lib/utils';

interface FormErrorProps {
  error: string | null;
  className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  return (
    <div className={cn(
      "p-3 bg-red-900/50 text-red-200 rounded border border-red-800",
      className
    )}>
      {error}
    </div>
  );
}
