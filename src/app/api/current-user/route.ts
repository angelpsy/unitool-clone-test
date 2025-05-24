import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/auth';
import { decryptToken, getTokenFromCookies, TokenPayload } from '@/lib/auth-token';
import { User } from '@/types';

export async function GET() {
  try {
    const token = await getTokenFromCookies();
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const tokenPayload = (await decryptToken(token)) as TokenPayload | null;
    if (!tokenPayload || typeof tokenPayload.email !== 'string') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findUserByEmail(tokenPayload.email);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword as User, { status: 200 });
  } catch (error) {
    console.error('Error in /api/current-user:', error);
    if (
      error instanceof Error &&
      (error.message.includes('expired') ||
        error.message.includes('invalid') ||
        error.message.includes('malformed'))
    ) {
      return NextResponse.json({ message: `Unauthorized: ${error.message}` }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}