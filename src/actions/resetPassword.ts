"use server";

import bcrypt from "bcryptjs";
import { getSupabase } from "@/lib/supabase";

export async function resetPasswordAction(token: string, password: string) {
  const supabase = getSupabase();

  const { data: user, error: findError } = await supabase
    .from("users")
    .select("id, reset_token_expiry")
    .eq("reset_token", token)
    .maybeSingle();

  if (findError || !user) {
    return {
      ok: false as const,
      error: "This reset link is invalid. Request a new one.",
    };
  }

  if (!user.reset_token_expiry) {
    return {
      ok: false as const,
      error: "This reset link is invalid. Request a new one.",
    };
  }

  if (new Date(user.reset_token_expiry) < new Date()) {
    return {
      ok: false as const,
      error: "This reset link has expired. Request a new one.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const { error: updateError } = await supabase
    .from("users")
    .update({
      password: hashedPassword,
      reset_token: null,
      reset_token_expiry: null,
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("resetPasswordAction:", updateError.message);
    return {
      ok: false as const,
      error: "We could not update your password. Please try again.",
    };
  }

  return { ok: true as const };
}
