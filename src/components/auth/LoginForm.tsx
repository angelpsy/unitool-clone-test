'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FormError } from '@/components/ui/FormError';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { useAuth } from '@/features/auth/useAuth';
import { Credentials } from '@/types';

export function LoginForm() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const { login, isLoggingIn } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const formSchema = z.object({
    email: z.string()
      .min(1, { message: t('errors.required') })
      .email({ message: t('errors.emailFormat') }),
    password: z.string()
      .min(1, { message: t('errors.required') })
  }) satisfies z.ZodType<Credentials>;

  const form = useForm<Credentials>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: Credentials) => {
    setFormError(null);

    const result = await login(data);

    if (!result.success) {
      setFormError(result.error || 'Unknown error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(formError) && (
            <FormError error={formError} />
          )}

          <Button
            type="submit"
            variant="secondary"
            size="full-width"
            disabled={form.formState.isSubmitting || isLoggingIn}
          >
            {isLoggingIn ? tCommon('loading') : t('submitLogin')}
          </Button>

          <div className="text-center text-sm text-gray-300">
            <span>{t('dontHaveAccount')}</span>{' '}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 hover:underline">
              {t('register')}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}