import { NextRequest, NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';

type RegistrationBody = {
  username: string;
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegistrationBody;
    let { username, email, password } = body;

    // Trim whitespace from username and email
    username = typeof username === 'string' ? username.trim() : '';
    email = typeof email === 'string' ? email.trim() : '';

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate username length
    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // TODO: In a real application, you would:
    // 1. Hash the password using bcrypt or similar
    // 2. Store the user in a database
    // 3. Check for duplicate usernames/emails
    // 4. Send a verification email
    // 5. Create a session or return a JWT token

    // For now, we'll just simulate a successful registration
    // This is a placeholder implementation
    logger.info('User registration attempt', { username, email });

    return NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          username,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error('Registration error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
