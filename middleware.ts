import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_PREFIX = "/account";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ACCOUNT_PREFIX)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
