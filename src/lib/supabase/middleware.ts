import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    let supabaseResponse = NextResponse.next({
      request,
    });

    const isProtectedRoute =
      pathname.startsWith("/project") ||
      pathname.startsWith("/studio") ||
      pathname.startsWith("/dashboard");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Never run auth middleware for internal Next.js asset/data routes.
    if (pathname.startsWith("/_next/")) {
      return supabaseResponse;
    }

    // Allow health checks even if auth/env is misconfigured.
    if (pathname === "/api/health") {
      return supabaseResponse;
    }

    // Public routes don't need Supabase session refresh.
    // This prevents a Supabase outage/misbehavior from taking the entire site down.
    if (!isProtectedRoute) {
      return supabaseResponse;
    }

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are missing in middleware!");

      // Degrade gracefully: allow public pages to render; protect console routes by redirect.
      if (isProtectedRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }

      return supabaseResponse;
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (
      !user &&
      !pathname.startsWith("/login") &&
      !pathname.startsWith("/auth") &&
      // Public: '/', marketing. Protected: console/studio/dashboard.
      (pathname.startsWith("/project") || pathname.startsWith("/studio") || pathname.startsWith("/dashboard"))
    ) {
      // no user, potentially respond by redirecting the user to the login page
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (err: any) {
    const pathname = request.nextUrl.pathname;
    const isProtectedRoute =
      pathname.startsWith("/project") ||
      pathname.startsWith("/studio") ||
      pathname.startsWith("/dashboard");

    console.error("Middleware Error:", err);

    // If auth middleware fails, protect private routes, but never take down public pages.
    if (isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next({ request });
  }
}
