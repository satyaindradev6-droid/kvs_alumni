import { NextRequest, NextResponse } from 'next/server';
import { tryBackendRequest } from '@/lib/backend-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email_id || !body.password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email_id)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Forwarding registration request to backend');

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Registration failed' },
        { status: backendResponse.status }
      );
    }

    // Return the backend response
    return NextResponse.json(backendData, { status: backendResponse.status });

  } catch (error) {
    console.error('Registration API error:', error);
    
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
