// apiMiddleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function apiMiddleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  console.log("Incoming request URL (API Middleware):", pathname);

  const BASE_URL =
    process.env.BASE_URL || "https://www.cleanme.e-vlasotince.info/";

  const response = NextResponse.next();

  // Handle CORS for API routes
  if (pathname.startsWith("/api")) {
    response.headers.set("Access-Control-Allow-Origin", BASE_URL);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    if (request.method === "OPTIONS") {
      console.log("Preflight request detected:", request.url);
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": BASE_URL,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Add security headers (applied to all routes)
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "microphone=(), camera=()");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none';"
    );
  }

  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply only to API routes
};
