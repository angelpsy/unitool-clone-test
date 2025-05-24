import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/auth';
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const result = await register(body);

    if ('status' in result && result.status !== 200 && result.status !== 201) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
