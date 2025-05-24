'use client';

import { useTranslations } from 'next-intl';
import { ProfileInfo } from '@/components/profile/ProfileInfo';

const ProfilePage = () => {
  const t = useTranslations('profile');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <ProfileInfo />
    </div>
  );
};

export default ProfilePage;