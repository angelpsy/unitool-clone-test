import { RegistrationForm } from '@/components/auth/RegistrationForm';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Register | Unitool Chat',
  description: 'Create a new account on Unitool Chat to start chatting with others.',
};

export default async function RegisterPage() {
  const t = await getTranslations('auth');
  
  return (
    <>
        <h1 className="text-2xl font-bold text-center mb-6">{t('register')}</h1>
        <RegistrationForm />
    </>
  );
}