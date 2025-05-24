export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface ErrorResponse {
  message?: string;
  error?: string;
  status: number;
}

export type Locale = 'ru' | 'en';

export interface Profile extends User {
  subscriptions: string[];
}

export interface ProfileResponse {
  profile: Profile;
}
