import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.next();
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/auth/is-authenticated`,
      {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return NextResponse.next();
    }

    const isAuthenticated: boolean = await res.json();

    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/application-table', request.url));
    }
  } catch (error) {
    console.error('Authentication check failed:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/register', '/login', '/'],
};
