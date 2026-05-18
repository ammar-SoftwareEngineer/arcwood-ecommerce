"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/lib/nextAuth";
import { getSupabase } from "@/lib/supabase";

export async function createUserAccount({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const supabase = getSupabase();
  const normalizedEmail = email.trim().toLowerCase();

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existing) {
    return {
      ok: false as const,
      error: "An account with this email already exists. Please sign in.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const { error } = await supabase.from("users").insert({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  if (error) {
    console.error("createUserAccount:", error.message);
    return {
      ok: false as const,
      error: "We could not create your account. Please try again.",
    };
  }

  return { ok: true as const };
}

export async function registerAction({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const result = await createUserAccount({ name, email, password });

    if (!result.ok) {
      return result;
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { ok: true as const };
  } catch {
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}
