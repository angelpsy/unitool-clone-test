import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { Credentials } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: Credentials = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    const result = await login(body);

    if ('status' in result && result.status !== 200) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
