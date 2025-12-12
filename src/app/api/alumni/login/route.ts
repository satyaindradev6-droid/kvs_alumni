import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface AlumniUser {
  alumni_id: number;
  email_id: string;
  password: string;
  name: string;
}

// Simple password comparison (replace with bcrypt in production)
async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  // For development: direct comparison
  // In production, use: return await bcrypt.compare(plainPassword, hashedPassword);
  return plainPassword === hashedPassword;
}

// Generate a simple JWT token (replace with proper JWT library in production)
function generateToken(userId: number, email: string): string {
  // For development: simple token
  // In production, use jsonwebtoken library
  const payload = {
    id: userId,
    email,
    timestamp: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, type = 'student' } = body;

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

    // TODO: Replace with actual database query
    // For now, this is a mock implementation
    console.log('Login attempt:', { email, type });

    // Query database for user
    const result = await db.query(
      'SELECT alumni_id, email_id, password, name FROM alumni WHERE email_id = $1',
      [email]
    );

    // Check if user exists
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = result.rows[0] as AlumniUser;

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.alumni_id, user.email_id);

    // Return success response
    return NextResponse.json(
      {
        message: 'Login successful',
        id: user.alumni_id,
        token,
        email: user.email_id,
        name: user.name,
        type,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
