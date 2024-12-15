import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/operations"]; // Define protected routes here

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip middleware for non-protected routes
  if (!PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for the authToken cookie
  const token = req.cookies.get("authToken");

  if (!token) {
    // Redirect to sign-in if authToken is missing
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow request if authToken exists
  return NextResponse.next();
}

export const config = {
  matcher: PROTECTED_ROUTES, // Apply middleware only to protected routes
};
