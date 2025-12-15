import { NextRequest, NextResponse } from 'next/server';
import { tryBackendRequest } from '@/lib/backend-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, type = 'alumni' } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Forwarding login request to backend:', { email, type });

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        type,
      }),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Login failed' },
        { status: backendResponse.status }
      );
    }

    // Return the backend response
    return NextResponse.json(backendData, { status: 200 });

  } catch (error) {
    console.error('Login API error:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { message: 'Backend server is not available on all endpoints. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
