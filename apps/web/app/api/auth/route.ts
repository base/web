// src/app/api/secure/route.ts

import { NextResponse, type NextRequest } from 'next/server';

// --- Constants for Readability and Maintainability ---

// HTTP Status Code for Unauthorized access requiring authentication.
const STATUS_UNAUTHORIZED = 401; 
// The default response message body.
const AUTH_REQUIRED_MESSAGE = 'Authentication Required.';
// The realm parameter specifies the protected area/resource (part of the WWW-Authenticate header).
const BASIC_AUTH_REALM = 'Secure Area';


/**
 * Handles GET requests to the secure API route.
 * It immediately responds with a 401 Unauthorized status, prompting the client 
 * (usually a browser) to provide Basic Authentication credentials.
 * * @param request The incoming Next.js Request object (optional, not strictly needed for this logic).
 * @returns A NextResponse object with a 401 status and the WWW-Authenticate header.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Construct the WWW-Authenticate header value, specifying the Basic scheme and realm.
  const wwwAuthenticateHeader = `Basic realm="${BASIC_AUTH_REALM}"`;

  // Return the 401 Unauthorized response with necessary headers.
  return new NextResponse(AUTH_REQUIRED_MESSAGE, {
    status: STATUS_UNAUTHORIZED,
    headers: {
      // Content type for the body message
      'Content-Type': 'text/plain; charset=utf-8', 
      // Mandatory header to trigger Basic Auth dialog in clients
      'WWW-Authenticate': wwwAuthenticateHeader, 
    },
  });
}
