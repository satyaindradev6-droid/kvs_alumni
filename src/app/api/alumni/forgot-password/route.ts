import { NextRequest, NextResponse } from 'next/server';
import { tryBackendRequest } from '@/lib/backend-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    console.log('Forwarding forgot password request to backend');

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Password reset failed' },
        { status: backendResponse.status }
      );
    }

    // Return the backend response
    return NextResponse.json(backendData, { status: backendResponse.status });

  } catch (error) {
    console.error('Forgot password API error:', error);
    
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