'use client';

import { create } from 'zustand';
import { User } from '@/types';

interface UserState {
  user: User | null;
  isInit: boolean;
  setUser: (user: User | null) => void;
  reset: () => void;
  init: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isInit: false,
  setUser: (user) => set({ user }),
  reset: () => set({ user: null }),
  init: () => set({ isInit: true })
}));

export const useIsAuthenticated = () => useUserStore((state) => !!state.user);