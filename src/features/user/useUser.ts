'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from './userStore';
import { User } from '@/types';
import { useEffect } from 'react';

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/current-user');

    if (response.status === 401) {
      return null;
    }
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch current user' }));
      throw new Error(errorData.message || 'Failed to fetch current user');
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error('Error in getCurrentUser fetch:', error);
    throw error;
  }
};

export const useUser = () => {
  const store = useUserStore();
  const setUser = useUserStore((state) => state.setUser);
  const init = useUserStore((state) => state.init);
  const isUserInit = useUserStore((state) => state.isInit);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const {
    data: userFromQuery,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refetch
  } = useQuery<User | null, Error, User | null, readonly ['currentUser']>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isFetching && !isUserInit) {
      init();
    }
  }, [isFetching, isUserInit, init]);

  useEffect(() => {
    if (isSuccess) {
      // I'm not sure if this is the best use of zustand store, but for example is ok
      setUser(userFromQuery);
    }
  }, [isSuccess, userFromQuery, setUser]);

  useEffect(() => {
    if (isError) {
      setUser(null);
    }
  }, [isError, setUser]);

  return {
    user,
    isUserInit,
    isLoadingUser: isLoading || isFetching,
    isUserError: isError,
    userError: error,
    setUser,
    reset: () => {
      store.setUser(null);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    refetchUser: refetch,
    logout: () => {
      store.setUser(null);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  };
};