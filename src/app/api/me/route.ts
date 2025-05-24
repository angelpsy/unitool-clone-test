import { NextResponse } from 'next/server';
import { Profile, ProfileResponse, ErrorResponse } from '@/types';
import { findUserByEmail } from '@/lib/auth';
import { getTokenFromCookies, decryptToken } from '@/lib/auth-token';

export async function GET() {
  const token = await getTokenFromCookies();

  if (!token) {
    return NextResponse.json<ErrorResponse>({ error: 'Unauthorized', status: 401 }, { status: 401 });
  }

  try {
    const decryptedPayload = await decryptToken(token);

    if (!decryptedPayload || !decryptedPayload.email) {
      return NextResponse.json<ErrorResponse>({ error: 'Invalid token', status: 401 }, { status: 401 });
    }

    const userEmail = decryptedPayload.email;
    const user = await findUserByEmail(userEmail);

    if (!user) {
      return NextResponse.json<ErrorResponse>({ error: 'User not found', status: 404 }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    const userProfile: Profile = {
      ...userWithoutPassword,
      subscriptions: ['free'],
    };

    return NextResponse.json<ProfileResponse>({ profile: userProfile });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json<ErrorResponse>({ error: 'Invalid token', status: 401 }, { status: 401 });
  }
}
