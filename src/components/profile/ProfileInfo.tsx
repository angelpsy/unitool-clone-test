'use client';

import { useTranslations } from 'next-intl';
import { useProfile } from '@/features/profile/useProfile';
import { Button } from '@/components/ui/Button';

export const ProfileInfo = () => {
  const t = useTranslations('profile');
  const { profile, isLoading, isError, error, fetchProfile } = useProfile();

  if (isLoading) {
    return <div className="flex justify-center p-4">{t('loading')}</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        <p>{t('error')}: {error?.message}</p>
        <Button 
          onClick={() => fetchProfile()} 
          className="mt-2"
        >
          {t('retry')}
        </Button>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-4">{t('noProfileData')}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{t('profileInfo')}</h2>
      
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('emailLabel')}
          </label>
          <p className="mt-1">{profile.email}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('registrationDate')}
          </label>
          <p className="mt-1">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('subscriptions')}
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.subscriptions.map((sub) => (
              <span
                key={sub}
                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-xs"
              >
                {t(`subscription.${sub}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
