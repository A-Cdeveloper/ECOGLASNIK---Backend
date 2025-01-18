// authMiddleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  //console.log("Incoming request URL (Auth Middleware):", pathname);

  // Allow access to the homepage (login page), static assets, and Next.js internals
  if (
    pathname === "/" || // Allow access to the homepage (login page)
    pathname.startsWith("/public/") || // Exclude public files (static assets)
    pathname.startsWith("/_next/") || // Exclude Next.js internals
    pathname.startsWith("/favicon.ico") // Exclude favicon
  ) {
    return NextResponse.next();
  }

  // Protect frontend routes (exclude API routes)
  if (!pathname.startsWith("/api")) {
    // Exclude API routes
    const token = request.cookies.get("superAdminToken"); // Check for token in cookies
    //console.log("Token in cookies:", token);

    // If no token and the user is NOT on the login page, redirect to the login page
    if (!token) {
      //console.log("No authentication token found. Redirecting to homepage...");
      url.pathname = "/"; // Redirect to the login page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Matcher for frontend routes excluding API and static files
export const config = {
  matcher: "/((?!_next|static|favicon.ico|api).*)", // Apply to all frontend routes except _next, static, favicon, and api
};
