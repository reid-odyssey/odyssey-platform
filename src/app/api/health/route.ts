import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasSupabaseAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return NextResponse.json(
    {
      ok: true,
      timestamp: new Date().toISOString(),
      env: {
        NEXT_PUBLIC_SUPABASE_URL: hasSupabaseUrl,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: hasSupabaseAnonKey,
      },
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    }
  );
}
