import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_PREFIX = "/account";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith(ACCOUNT_PREFIX)) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("better-auth.session_token")?.value;

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
