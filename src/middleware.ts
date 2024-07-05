import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Provider as ltijs } from 'ltijs'

ltijs.setup(
  'LTIKEY',
  { url: 'mongodb://localhost:27017/lti' },
  { cookies: { secure: false, sameSite: '' } },
)

export function middleware(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello from /keys',
    headers: request.headers,
  })
}

export const config = {
  matcher: ['/keys'],
}
