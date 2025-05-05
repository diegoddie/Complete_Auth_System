import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("refreshToken");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/profile") || request.nextUrl.pathname.startsWith("/admin");

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/admin"],
};