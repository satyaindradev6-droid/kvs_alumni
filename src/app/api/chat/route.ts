import { NextRequest, NextResponse } from 'next/server';
import { tryBackendRequest } from '@/lib/backend-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = request.headers.get('authorization');

    console.log('Fetching chat history from backend');

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest(`/api/chat/history?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Failed to fetch chat history' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData, { status: 200 });

  } catch (error) {
    console.error('Chat history API error:', error);
    
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    console.log('Sending message to backend');

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest('/api/chat/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Failed to send message' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData, { status: backendResponse.status });

  } catch (error) {
    console.error('Send message API error:', error);
    
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