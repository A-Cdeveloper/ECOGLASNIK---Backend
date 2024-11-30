import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  console.log("Incoming request URL:", url);

  // Only apply middleware to /api routes
  if (!url.startsWith("/api")) {
    return NextResponse.next();
  }

  // Define CORS headers
  const response = NextResponse.next();
  response.headers.set(
    "Access-Control-Allow-Origin",
    process.env.BASE_URL || "*" // Allow requests from your frontend
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Allow cookies and credentials

  // If it's a preflight request (OPTIONS), just return the CORS headers
  if (request.method === "OPTIONS") {
    console.log("Preflight request detected:", request.url); // Debug log for OPTIONS requests
    return response;
  }

  // Manually applying Helmet headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "microphone=(), camera=()");

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none';"
  );

  return response; // Continue processing the request
}

export const config = {
  matcher: "/api/:path*", // Apply this middleware to all /api/* routes
};
