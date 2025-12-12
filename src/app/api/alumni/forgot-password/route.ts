import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Check if the email exists in your database
    // 2. Generate a password reset token
    // 3. Send an email with the reset link
    // 4. Store the token in your database with an expiration time

    // For now, we'll simulate a successful response
    // In a real implementation, you would integrate with your backend API
    
    console.log(`Password reset requested for email: ${email}`)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      { 
        success: true,
        message: 'If the email is valid, a new password has been sent.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}