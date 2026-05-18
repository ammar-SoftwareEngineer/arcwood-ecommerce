"use server";

import crypto from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { sendResetEmail } from "@/lib/mail/resend";

export async function forgetPasswordAction(email: string, locale: string) {
  const supabase = getSupabase();
  const normalizedEmail = email.trim().toLowerCase();

  const { data: user, error: findError } = await supabase
    .from("users")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (findError) {
    console.error("forgetPasswordAction:", findError.message);
    return { ok: true as const };
  }

  if (!user) {
    return { ok: true as const };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  const { error: updateError } = await supabase
    .from("users")
    .update({ reset_token: token, reset_token_expiry: expiry })
    .eq("id", user.id);

  if (updateError) {
    console.error("forgetPasswordAction update:", updateError.message);
    return {
      ok: false as const,
      error: "Could not send the reset link. Please try again.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  const resetLink = `${baseUrl}/${locale}/reset-password?token=${token}`;

  const mail = await sendResetEmail(normalizedEmail, resetLink);
  if (!mail.ok) {
    return {
      ok: false as const,
      error: "Could not send the reset link. Please try again.",
    };
  }

  return { ok: true as const };
}
