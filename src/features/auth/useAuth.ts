'use client';

import { useRouter } from 'next/navigation';
import { useIsAuthenticated } from '../user/userStore';
import { Credentials } from '@/types';
import { useUser } from '../user/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types';

const registerUser = async (credentials: Credentials): Promise<User> => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data.user;
};

const loginUser = async (credentials: Credentials): Promise<User> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data.user;
};

const logoutUser = async (): Promise<void> => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({ message: 'Logout failed' }));
    throw new Error(data.message || 'Logout failed');
  }
};

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();
  const isAuthenticated = useIsAuthenticated();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (userData) => {
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      router.push('/profile');
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      router.push('/profile');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      router.push('/auth/login');
    },
  });

  const register = async (credentials: Credentials) => {
    try {
      await registerMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, error: registerMutation.error?.message || (error as Error).message };
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, error: loginMutation.error?.message || (error as Error).message };
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error) {
      return { success: false, error: logoutMutation.error?.message || (error as Error).message };
    }
  };

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}