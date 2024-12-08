import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  console.log("Incoming request URL:", url);

  // Only apply middleware to /api routes
  if (!url.startsWith("/api")) {
    return NextResponse.next();
  }

  console.log(process.env.BASE_URL);

  const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

  // Define CORS headers
  const response = NextResponse.next();
  response.headers.set(
    "Access-Control-Allow-Origin",
    BASE_URL // Allow requests from your frontend
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Allow cookies and credentials

  if (request.method === "OPTIONS") {
    console.log("Preflight request detected:", request.url);
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": process.env.BASE_URL || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
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
