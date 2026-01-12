import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const pathname = request.nextUrl.pathname;

  const isConsoleHost = host === "app.2x22.com" || host === "app-dev.2x22.com";
  const isMarketingHost =
    host === "2x22.com" || host === "www.2x22.com" || host === "staging.2x22.com";

  const isConsolePath =
    pathname === "/login" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/project") ||
    pathname.startsWith("/studio");

  // Keep internal/health paths untouched.
  if (pathname.startsWith("/_next/") || pathname === "/api/health") {
    return await updateSession(request);
  }

  // Console domains should not show marketing at '/'.
  // Route them into the console entrypoint; auth middleware will handle redirect to /login.
  if (isConsoleHost && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return Response.redirect(url, 307);
  }

  // Marketing domains should not expose console paths; bounce to the correct console domain.
  if (isMarketingHost && isConsolePath) {
    const targetConsoleHost = host === "staging.2x22.com" ? "app-dev.2x22.com" : "app.2x22.com";
    const url = request.nextUrl.clone();
    url.host = targetConsoleHost;
    return Response.redirect(url, 307);
  }

  // 1. Run Supabase Auth Middleware (refreshes session)
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
