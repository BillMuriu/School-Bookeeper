import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check for the authToken cookie for protected routes
  const token = req.cookies.get("authToken");

  // Exempt the routes: /sign-in, /sign-out, /magic-link
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-out") ||
    pathname.startsWith("/magic-link")
  ) {
    return NextResponse.next();
  }

  // Redirect to sign-in if authToken is missing
  if (!token) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow request if authToken exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!sign-in|sign-out|magic-link|api|_next/static|_next/image|favicon.ico).*)",
  ], // Exclude public routes
};
