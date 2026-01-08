import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  
  // Define the 'app' subdomain. In production, this would be "app.odyssey.com"
  // For local dev, you might use "app.localhost:3000" if you have host file setup
  // We check for "app." or "app-" to support environments like "app-dev" or "app-staging"
  const isAppSubdomain = hostname.startsWith("app.") || hostname.startsWith("app-");

  if (isAppSubdomain) {
    // If the user is on 'app.domain.com', we want them to access the Console.
    
    // 1. Rewrite root '/' to '/dashboard' (where we moved the console home)
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }

    // 2. Allow access to other console routes (project, settings, etc.)
    // Note: Since we are using Route Groups (console) and (marketing), 
    // the paths (like /login, /dashboard) are globally unique right now so 
    // no specific rewrite needed unless we want to hide marketing paths on app domain.
    
    return NextResponse.next();
  }

  // If NOT on app subdomain (e.g. www.odyssey.com or localhost:3000 today)
  // We serve the marketing site.
  
  // Since we structured the app with:
  // (marketing)/page.tsx -> /
  // (console)/dashboard/page.tsx -> /dashboard
  
  // The default behavior works perfectly for localhost without rewrites!
  
  return NextResponse.next();
}
