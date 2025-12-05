import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Helper function to hash password (you should install bcrypt: npm install bcrypt @types/bcrypt)
async function hashPassword(password: string): Promise<string> {
  // For now, return plain password
  // In production, use bcrypt:
  // const bcrypt = require('bcrypt');
  // return await bcrypt.hash(password, 10);
  return password;
}

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

    // Hash password before storing
    const hashedPassword = await hashPassword(body.password);

    // Database insertion
    // Uncomment and modify based on your database (PostgreSQL example)
    /*
    const result = await db.query(
      `INSERT INTO alumni_students (
        name, email_id, password, mobile_no, father_name,
        admission_no, state_id, school_id, tc_year, tc_class,
        gender, dob, profile_image, public_display, ro_id,
        relationship_status, wedding_anniversary, add1, add2, add3, add4,
        role, about_me, experties, facebook, twitter, linkedin,
        whatsapp, blog, contribution, status, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
        'active', NOW(), NOW()
      )
      RETURNING alumni_id, uuid, name, email_id, public_url`,
      [
        body.name,
        body.email_id,
        hashedPassword,
        body.mobile_no || null,
        body.father_name || null,
        body.admission_no || null,
        body.state_id || null,
        body.school_id || null,
        body.tc_year || null,
        body.tc_class || null,
        body.gender || null,
        body.dob || null,
        body.profile_image || null,
        body.public_display !== undefined ? body.public_display : true,
        body.ro_id || null,
        body.relationship_status || null,
        body.wedding_anniversary || null,
        body.add1 || null,
        body.add2 || null,
        body.add3 || null,
        body.add4 || null,
        body.role || null,
        body.about_me || null,
        body.experties || null,
        body.facebook || null,
        body.twitter || null,
        body.linkedin || null,
        body.whatsapp || null,
        body.blog || null,
        body.contribution || null,
      ]
    );

    const newAlumni = result.rows[0];
    */

    // For development: Log the data and simulate success
    console.log('Registration data received:', {
      name: body.name,
      email: body.email_id,
      mobile: body.mobile_no,
      father_name: body.father_name,
      admission_no: body.admission_no,
      state_id: body.state_id,
      school_id: body.school_id,
      tc_year: body.tc_year,
      tc_class: body.tc_class,
      ro_id: body.ro_id,
      public_display: body.public_display,
    });

    // Simulate successful response
    const newAlumni = {
      alumni_id: Math.floor(Math.random() * 10000),
      uuid: crypto.randomUUID(),
      name: body.name,
      email_id: body.email_id,
      public_url: `alumni/${crypto.randomUUID()}`,
    };

    // Return success response
    return NextResponse.json(
      {
        message: 'Registration successful! Please check your email for verification.',
        data: newAlumni,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === '23505' || error.message?.includes('duplicate')) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
