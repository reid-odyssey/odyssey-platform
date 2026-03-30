"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { getAppUrlFromHeaders } from "@/lib/app-url";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Login Error:", error.message);
      return { error: error.message };
    }
  } catch (err) {
    console.error("Server Action Login Exception:", err);
    return { error: "An unexpected error occurred. Check server logs." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const appUrl = getAppUrlFromHeaders(await headers());

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { message: "Check your email for the confirmation link." };
}

export async function signInWithOAuth(provider: "github" | "google" | "azure" | "apple" | "keycloak") { // "azure" is often used for Microsoft, "keycloak" or similar for custom Odyssey
  const supabase = await createClient();
  const appUrl = getAppUrlFromHeaders(await headers());

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}
