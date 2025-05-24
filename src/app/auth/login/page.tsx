import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Login | Unitool Chat',
  description: 'Login to your Unitool Chat account to start chatting with others.',
};

export default async function LoginPage() {
  const t = await getTranslations('auth');
  
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6 text-white">{t('login')}</h1>
      <LoginForm />
    </>
  );
}