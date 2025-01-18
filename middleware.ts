// middleware.ts
import { apiMiddleware } from "./apiMiddleware";
import { authMiddleware } from "./authMiddleware";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Apply the CORS and security middleware (API routes only)
  if (pathname.startsWith("/api")) {
    return await apiMiddleware(request); // Apply only if the path is in /api
  }

  // Apply the Auth middleware (Frontend routes)
  return await authMiddleware(request);
}

// Global matcher configuration (for both API and frontend routes)
export const config = {
  matcher: [
    "/api/:path*", // Apply to all /api routes (CORS and security)
    "/((?!_next|static|favicon.ico).*)", // Apply to frontend routes (excluding Next.js internals and static files)
  ],
};
