import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/lib/auth-token';

export async function POST() {
  try {
    await removeTokenCookie();

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
