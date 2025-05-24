import { useQuery } from '@tanstack/react-query';
import { ProfileResponse } from '@/types';

const fetchProfile = async (): Promise<ProfileResponse> => {
  const response = await fetch('/api/me');
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch profile');
  }
  
  return response.json();
};

export const useProfile = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ProfileResponse, Error>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  return {
    profile: data?.profile,
    isLoading,
    isError,
    error,
    fetchProfile: refetch,
  };
};
