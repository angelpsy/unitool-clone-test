import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export interface TokenPayload {
  userId: string;
  email: string;
  expiresAt: Date | string;
}

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  console.error('JWT_SECRET environment variable is not set!');
  throw new Error('JWT_SECRET environment variable is required');
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encryptToken(payload: TokenPayload) {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decryptToken(token: string | undefined = '') {
  try {
    if (!token) {
      return null;
    }
    
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as TokenPayload;
  } catch (error) {
    console.log('Failed to verify token:', error);
    return null;
  }
}

export async function setTokenCookie(userId: string, email: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const token = await encryptToken({ userId, email, expiresAt });
  
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
  
  return token;
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function removeTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}
