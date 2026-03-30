import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAppUrlFromRequest } from "@/lib/app-url";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appUrl = getAppUrlFromRequest(request);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      console.log("Auth callback success for code:", code.substring(0, 5) + "...");
      return NextResponse.redirect(`${appUrl}${safeNext}`);
    } else {
      console.error("Auth Callback Error Details:", error);
    }
  } else {
    console.error("Auth Callback: No code provided");
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${appUrl}/auth/auth-code-error`);
}
