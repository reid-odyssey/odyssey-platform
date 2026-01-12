import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    let supabaseResponse = NextResponse.next({
      request,
    });

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

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are missing in middleware!");

      // Degrade gracefully: allow public pages to render; protect console routes by redirect.
      const isProtectedRoute =
        pathname.startsWith("/project") ||
        pathname.startsWith("/studio") ||
        pathname.startsWith("/dashboard");

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
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            );
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

    // If user is logged in and visits root, redirect to dashboard
    if (user && pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (err: any) {
    // Never break app boot for internal asset/data requests.
    if (request.nextUrl.pathname.startsWith("/_next/")) {
      return NextResponse.next({ request });
    }

    console.error("Middleware Error:", err);
    return new NextResponse(
      JSON.stringify({
        error: "Critical Middleware Error",
        message: err?.message,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
