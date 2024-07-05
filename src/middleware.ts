import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello from /keys',
    headers: request.headers,
  })
}

export const config = {
  matcher: ['/keys'],
}
