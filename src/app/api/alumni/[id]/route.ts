import { NextRequest, NextResponse } from 'next/server';
import { tryBackendRequest } from '@/lib/backend-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization');

    console.log(`Fetching alumni profile ${id} from backend`);

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest(`/api/alumni/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Failed to fetch alumni profile' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData, { status: 200 });

  } catch (error) {
    console.error('Alumni profile API error:', error);
    
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const token = request.headers.get('authorization');

    console.log(`Updating alumni profile ${id} in backend`);

    // Try backend request with fallback
    const { response: backendResponse, data: backendData } = await tryBackendRequest(`/api/alumni/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Failed to update alumni profile' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData, { status: backendResponse.status });

  } catch (error) {
    console.error('Alumni profile update API error:', error);
    
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