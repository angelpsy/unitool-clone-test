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

export function RegistrationForm() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const { register: registerUser, isRegistering } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const formSchema = z.object({
    email: z.string()
      .min(1, { message: t('errors.required') })
      .email({ message: t('errors.emailFormat') }),
    password: z.string()
      .min(6, { message: t('errors.passwordLength') }),
    confirmPassword: z.string()
      .min(1, { message: t('errors.required') })
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('errors.passwordMatch'),
    path: ['confirmPassword'],
  });

  type RegistrationFormData = Credentials & { confirmPassword: string };

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setFormError(null);

    const { email, password } = data;
    const result = await registerUser({ email, password });

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirmPassword')}</FormLabel>
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
            disabled={form.formState.isSubmitting || isRegistering}
          >
            {isRegistering ? tCommon('loading') : t('submitRegister')}
          </Button>

          <div className="text-center text-sm text-gray-300">
            <span>{t('alreadyHaveAccount')}</span>{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 hover:underline">
              {t('login')}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}