'use client'

import { useUser } from '@/features/user/useUser';


export function ClientInitializer() {
  useUser();

  return null
}