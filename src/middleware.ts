import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@modules/auth/services';

import { PUBLIC_ROUTES, ROOT, SIGN_IN, SIGN_UP } from '@libs/consts/routes';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await getSession();
  const isAuthenticated = !!session?.user;

  const isAuthRoute = [SIGN_IN, SIGN_UP].some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isAuthenticated && isAuthRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    const url = new URL(ROOT, nextUrl);
    return Response.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|fonts|favicon.ico).*)']
};
